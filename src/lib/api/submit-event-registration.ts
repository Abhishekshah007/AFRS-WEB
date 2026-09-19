import { jsonError } from '@/lib/apiResponses'
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
import { createLocalReq } from 'payload'
import type { Event as AfrsEvent, RegistrationForm } from '@/payload-types'

export async function submitEventRegistration(req: Request) {
  const contentType = req.headers.get('content-type') || ''
  if (!contentType.includes('multipart/form-data')) {
    return jsonError('Invalid submission format.', 400)
  }

  const formData = await req.formData()
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
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith('custom_') || value instanceof File) continue
    customResponses[key.replace(/^custom_/, '')] = String(value)
  }

  const customError = validateCustomResponses(sections, customResponses)
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
  const paymentMode = getFormValue(formData, 'paymentMode') as 'upi' | 'bank' | 'paypal' | ''

  if (!isFree && config.requirePaymentProof) {
    if (!transactionId) return jsonError('Transaction reference is required.', 400)
    if (!transactionDate) return jsonError('Transaction date is required.', 400)
    if (!transactionTime) return jsonError('Transaction time is required.', 400)
  }

  const localReq = await createLocalReq({ req: { url: req.url, headers: req.headers } }, payload)

  for (const field of sections.flatMap((section) => section.fields ?? [])) {
    if (field.fieldType !== 'file') continue
    const upload = await readUploadFile(formData, `customFile_${field.name}`)
    if (!upload) {
      if (field.required) return jsonError(`${field.label} is required.`, 400)
      continue
    }
    const fileReq = await createLocalReq({ req: { url: req.url, headers: req.headers } }, payload)
    fileReq.file = upload
    const media = await payload.create({
      collection: 'media',
      data: { alt: `${evt.title} — ${field.label}` },
      file: upload,
      req: fileReq,
      overrideAccess: true,
    })
    customResponses[field.name] = String(media.id)
  }

  const transactionProof = await readUploadFile(formData, 'transactionProof')
  if (transactionProof) localReq.file = transactionProof

  const reference = `AFRS-${Date.now()}`

  const created = await payload.create({
    collection: 'eventRegistrations',
    data: {
      event: evt.id,
      eventSlug: evt.slug,
      eventTitle: evt.title,
      fullName: contact.fullName,
      email: contact.email,
      countryCode: contact.countryCode,
      mobileNumber: contact.mobileNumber,
      organization: contact.organization,
      designation: contact.designation,
      areaOfInterest: contact.areaOfInterest,
      registrationCategoryId: String(selected?.id || 'free'),
      registrationCategoryName: selected?.label || 'General',
      registrationCategoryPrice: basePrice,
      feeTierLabel: selected?.label,
      feeTierCurrency: selected?.currency || 'INR',
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
      paymentMode: paymentMode || undefined,
      paymentProvider: 'manual',
      paymentStatus: isFree ? 'notRequired' : 'pending',
      registrationStatus: isFree ? 'confirmed' : 'initiated',
      paymentReference: isFree ? undefined : reference,
    },
    req: localReq,
    overrideAccess: true,
  })

  return Response.json({
    ok: true,
    registrationId: created.id,
    eventSlug: evt.slug,
    redirectTo: `/events/${evt.slug}/register/confirmation/${created.id}`,
    message: isFree
      ? 'Registration received. A confirmation email will be sent shortly.'
      : 'Registration received. Our team will verify your payment and confirm your seat.',
  })
}
