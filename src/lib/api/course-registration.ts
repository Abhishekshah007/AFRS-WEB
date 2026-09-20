import { jsonError } from '@/lib/apiResponses'
import { getFormValue, readUploadFile } from '@/lib/api/form-data'
import { buildCourseConfirmationUrl } from '@/lib/registration/confirmationToken'
import { enforcePublicApiGuards } from '@/lib/security/publicApiGuards'
import { PUBLIC_RATE_LIMITS } from '@/lib/security/rateLimit'
import { getPayloadClient } from '@/lib/payload'
import { createLocalReq } from 'payload'

type CompleteCourseRegistrationBody = {
  registrationId?: string
  transactionId?: string
  transactionDate?: string
  transactionTime?: string
  paymentMode?: 'upi' | 'bank' | 'paypal'
}

export async function completeCourseRegistration(req: Request) {
  const contentType = req.headers.get('content-type') || ''
  const formData = contentType.includes('multipart/form-data') ? await req.formData() : null

  const blocked = await enforcePublicApiGuards(req, {
    rateLimit: PUBLIC_RATE_LIMITS.registration,
    turnstileToken: formData ? getFormValue(formData, 'turnstileToken') : undefined,
  })
  if (blocked) return blocked

  const body: CompleteCourseRegistrationBody = formData
    ? {
        registrationId: getFormValue(formData, 'registrationId'),
        transactionId: getFormValue(formData, 'transactionId'),
        transactionDate: getFormValue(formData, 'transactionDate'),
        transactionTime: getFormValue(formData, 'transactionTime'),
        paymentMode: getFormValue(
          formData,
          'paymentMode',
        ) as CompleteCourseRegistrationBody['paymentMode'],
      }
    : ((await req.json().catch(() => ({}))) as CompleteCourseRegistrationBody)

  const uploadFile = formData ? await readUploadFile(formData, 'transactionProof') : undefined

  if (!body.registrationId) return jsonError('Registration id is required.', 400)
  if (!body.transactionId) return jsonError('Transaction reference is required.', 400)
  if (!body.transactionDate) return jsonError('Transaction date is required.', 400)
  if (!body.transactionTime) return jsonError('Transaction time is required.', 400)
  if (!uploadFile && formData) return jsonError('Transaction proof upload is required.', 400)

  const payload = await getPayloadClient()
  const existing = await payload.findByID({
    collection: 'courseRegistrations',
    id: body.registrationId,
    depth: 0,
    overrideAccess: true,
  })

  if (!existing) return jsonError('Registration not found.', 404)
  if (existing.paymentStatus === 'paid') {
    return jsonError('This registration has already been verified.', 400)
  }

  const localReq = await createLocalReq({ req: { url: req.url, headers: req.headers } }, payload)
  if (uploadFile) localReq.file = uploadFile

  const reference =
    existing.paymentReference || `AFRS-${Date.now()}-${String(existing.id).slice(-4)}`

  const updated = await payload.update({
    collection: 'courseRegistrations',
    id: existing.id,
    data: {
      transactionId: body.transactionId,
      transactionDate: body.transactionDate || undefined,
      transactionTime: body.transactionTime || undefined,
      paymentMode: body.paymentMode || undefined,
      paymentProvider: 'manual',
      paymentStatus: 'pending',
      registrationStatus: 'initiated',
      paymentReference: reference,
    },
    req: localReq,
    overrideAccess: true,
  })

  return Response.json({
    ok: true,
    registrationId: updated.id,
    paymentReference: reference,
    message:
      'Payment details submitted. Our team will verify your transaction and confirm your registration.',
    redirectTo: buildCourseConfirmationUrl(updated.id),
  })
}
