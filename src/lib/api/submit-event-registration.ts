import { getThrownErrorMessage, getThrownErrorStatus, jsonError } from '@/lib/apiResponses'
import { getFormValue, readUploadFile } from '@/lib/api/form-data'
import { validateCustomResponses } from '@/lib/forms/dynamicFormTypes'
import type { DynamicFormSection } from '@/lib/forms/dynamicFormTypes'
import {
  extractContactFields,
  validateContactFields,
} from '@/lib/registration/extractContactFields'
import { normalizeDynamicSections } from '@/lib/registration/normalizeDynamicSections'
import { categoriesToFeeTiers, resolveRegistrationConfig } from '@/lib/registration/resolveConfig'
import { getPayloadClient } from '@/lib/payload'
import { resolveEventSlug } from '@/lib/utils/slugify'
import { buildEventConfirmationUrl } from '@/lib/registration/confirmationToken'
import { logCmsError } from '@/lib/resilience/logger'
import { enforcePublicApiGuards } from '@/lib/security/publicApiGuards'
import { PUBLIC_RATE_LIMITS } from '@/lib/security/rateLimit'
import { createLocalReq } from 'payload'
import type { File as PayloadFile } from 'payload'
import type { Event as AfrsEvent, RegistrationForm } from '@/payload-types'

async function createMediaFile(
  payload: Awaited<ReturnType<typeof getPayloadClient>>,
  upload: PayloadFile,
  alt: string,
) {
  const fileReq = await createLocalReq({}, payload)
  fileReq.file = upload
  return payload.create({
    collection: 'media',
    data: { alt },
    file: upload,
    req: fileReq,
    overrideAccess: true,
  })
}

export async function submitEventRegistration(req: Request) {
  const contentType = req.headers.get('content-type') || ''
  if (!contentType.includes('multipart/form-data')) {
    return jsonError('Invalid submission format.', 400)
  }

  const formData = await req.formData()

  const blocked = await enforcePublicApiGuards(req, {
    rateLimit: PUBLIC_RATE_LIMITS.registration,
    turnstileToken: getFormValue(formData, 'turnstileToken'),
  })
  if (blocked) return blocked

  const eventSlug = getFormValue(formData, 'eventSlug')
  if (!eventSlug) return jsonError('Event is required.', 400)

  const payload = await getPayloadClient()
  const [eventResult, registrationForm] = await Promise.all([
    payload.find({
      collection: 'events',
      where: { slug: { equals: eventSlug }, published: { equals: true } },
      limit: 1,
      depth: 0,
      overrideAccess: false,
    }),
    payload.findGlobal({
      slug: 'registrationForm',
      depth: 0,
      overrideAccess: false,
    }) as Promise<RegistrationForm>,
  ])

  const evt = eventResult.docs[0] as AfrsEvent | undefined
  if (!evt) return jsonError('Event not found.', 404)
  const resolvedEventSlug = resolveEventSlug(evt.slug, eventSlug)
  if (!resolvedEventSlug) return jsonError('Event is missing a valid slug.', 400)
  if (evt.registrationOpen === false) {
    return jsonError('Registration is closed for this event.', 400)
  }

  const sections = normalizeDynamicSections(evt.registrationSections as DynamicFormSection[])
  if (!sections.length) {
    return jsonError('This event registration form is not configured yet.', 400)
  }

  const feeTiers = categoriesToFeeTiers(evt.registrationCategories || [])
  const config = resolveRegistrationConfig({
    settings: evt.registrationSettings,
    globalForm: registrationForm,
    feeTiersOverride: feeTiers,
  })

  const agreedToTerms = getFormValue(formData, 'agreedToTerms') === 'true'
  if (config.requireAgreement && !agreedToTerms) {
    return jsonError('You must agree to the registration instructions.', 400)
  }

  const customResponses: Record<string, string> = {}
  const customFiles: Record<string, File | null> = {}
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('custom_') && !(value instanceof File)) {
      customResponses[key.replace(/^custom_/, '')] = String(value)
    }
    if (key.startsWith('customFile_') && value instanceof File && value.size > 0) {
      customFiles[key.replace(/^customFile_/, '')] = value
    }
  }

  const customError = validateCustomResponses(sections, customResponses, customFiles)
  if (customError) return jsonError(customError, 400)

  const contact = extractContactFields(sections, customResponses)
  const contactError = validateContactFields(contact)
  if (contactError) return jsonError(contactError, 400)

  const registrationCategoryId = getFormValue(formData, 'registrationCategoryId')
  const selected = feeTiers.find((tier) => tier.id === registrationCategoryId) || feeTiers[0]
  const includeKit = getFormValue(formData, 'includeKit') === 'true'
  const basePrice = Number(selected?.amount || 0)
  const kitPrice = includeKit && evt.includeKitOption ? Number(evt.kitPrice || 0) : 0
  const totalAmount = basePrice + kitPrice
  const isFree = config.registrationType === 'free' || totalAmount <= 0

  const transactionId = getFormValue(formData, 'transactionId')
  const transactionDate = getFormValue(formData, 'transactionDate')
  const transactionTime = getFormValue(formData, 'transactionTime')
  const paymentModeRaw = getFormValue(formData, 'paymentMode')
  const paymentMode =
    paymentModeRaw === 'upi' || paymentModeRaw === 'bank' || paymentModeRaw === 'paypal'
      ? paymentModeRaw
      : undefined

  if (!isFree && config.requirePaymentProof) {
    if (!transactionId) return jsonError('Transaction reference is required.', 400)
    if (!transactionDate) return jsonError('Transaction date is required.', 400)
    if (!transactionTime) return jsonError('Transaction time is required.', 400)
  }

  for (const field of sections.flatMap((section) => section.fields ?? [])) {
    if (field.fieldType !== 'file') continue
    const upload = await readUploadFile(formData, `customFile_${field.name}`)
    if (!upload) {
      if (field.required) return jsonError(`${field.label} is required.`, 400)
      continue
    }
    const media = await createMediaFile(payload, upload, `${evt.title} — ${field.label}`)
    customResponses[field.name] = String(media.id)
  }

  const transactionProof = await readUploadFile(formData, 'transactionProof')
  if (!isFree && config.requirePaymentProof && !transactionProof) {
    return jsonError('Please upload your payment screenshot / proof.', 400)
  }

  let transactionProofId: number | undefined
  if (transactionProof) {
    const proofMedia = await createMediaFile(
      payload,
      transactionProof,
      `${evt.title} — payment proof`,
    )
    transactionProofId = typeof proofMedia.id === 'number' ? proofMedia.id : undefined
  }

  const reference = `AFRS-${Date.now()}`

  const created = await payload.create({
    collection: 'eventRegistrations',
    data: {
      event: evt.id,
      eventSlug: resolvedEventSlug,
      eventTitle: evt.title,
      fullName: contact.fullName,
      email: contact.email,
      countryCode: contact.countryCode || '+91',
      mobileNumber: contact.mobileNumber,
      organization: contact.organization || 'Not provided',
      designation: contact.designation || 'Participant',
      areaOfInterest: contact.areaOfInterest || 'General',
      registrationCategoryId: String(selected?.id || 'free'),
      registrationCategoryName: selected?.label || 'General',
      registrationCategoryPrice: basePrice,
      feeTierLabel: selected?.label,
      feeTierCurrency: selected?.currency === 'USD' ? 'USD' : 'INR',
      participantRegion:
        getFormValue(formData, 'participantRegion') === 'international'
          ? 'international'
          : 'indian',
      agreedToTerms,
      includeKit,
      kitPrice,
      totalAmount,
      customResponses,
      transactionId: transactionId || undefined,
      transactionDate: transactionDate || undefined,
      transactionTime: transactionTime || undefined,
      paymentMode,
      transactionProof: transactionProofId,
      paymentProvider: 'manual',
      paymentStatus: isFree ? 'notRequired' : 'pending',
      registrationStatus: isFree ? 'confirmed' : 'initiated',
      paymentReference: isFree ? undefined : reference,
    },
    overrideAccess: true,
  })

  const saved = await payload.findByID({
    collection: 'eventRegistrations',
    id: created.id,
    depth: 0,
    overrideAccess: true,
  }).catch(() => null)

  if (!saved) {
    logCmsError('submitEventRegistration', new Error('Registration created but not persisted'), {
      id: created.id,
      eventSlug: resolvedEventSlug,
    })
    return jsonError(
      'Registration could not be saved. Please try again or contact AFRS support.',
      500,
    )
  }

  return Response.json({
    ok: true,
    registrationId: saved.id,
    eventSlug: resolvedEventSlug,
    redirectTo: buildEventConfirmationUrl(saved.id, resolvedEventSlug),
    message: isFree
      ? 'Registration received. A confirmation email will be sent shortly.'
      : 'Registration received. Our team will verify your payment and confirm your seat.',
  })
}

export function submitEventRegistrationErrorResponse(error: unknown) {
  logCmsError('submitEventRegistration', error)
  return jsonError(getThrownErrorMessage(error), getThrownErrorStatus(error))
}
