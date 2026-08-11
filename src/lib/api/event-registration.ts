import { jsonError } from '@/lib/apiResponses'
import { getFormValue, readUploadFile } from '@/lib/api/form-data'
import { getPayloadClient } from '@/lib/payload'
import { createLocalReq } from 'payload'

type CompleteEventRegistrationBody = {
  registrationId?: string
  transactionId?: string
  transactionDate?: string
  transactionTime?: string
}

export async function completeEventRegistration(req: Request) {
  const contentType = req.headers.get('content-type') || ''
  const formData = contentType.includes('multipart/form-data') ? await req.formData() : null

  const body: CompleteEventRegistrationBody = formData
    ? {
        registrationId: getFormValue(formData, 'registrationId'),
        transactionId: getFormValue(formData, 'transactionId'),
        transactionDate: getFormValue(formData, 'transactionDate'),
        transactionTime: getFormValue(formData, 'transactionTime'),
      }
    : ((await req.json().catch(() => ({}))) as CompleteEventRegistrationBody)

  if (!body.registrationId) return jsonError('Registration id is required.', 400)
  if (!body.transactionId) return jsonError('Transaction reference is required.', 400)

  const payload = await getPayloadClient()
  const existing = await payload.findByID({
    collection: 'eventRegistrations',
    id: body.registrationId,
    depth: 0,
    overrideAccess: true,
  })

  if (!existing) return jsonError('Registration not found.', 404)
  if (existing.paymentStatus === 'paid') {
    return jsonError('This registration has already been verified.', 400)
  }

  const uploadFile = formData ? await readUploadFile(formData, 'transactionProof') : undefined
  const localReq = await createLocalReq({ req: { url: req.url, headers: req.headers } }, payload)
  if (uploadFile) localReq.file = uploadFile

  const reference = existing.paymentReference || `AFRS-${Date.now()}-${String(existing.id).slice(-4)}`

  const updated = await payload.update({
    collection: 'eventRegistrations',
    id: existing.id,
    data: {
      transactionId: body.transactionId,
      transactionDate: body.transactionDate || undefined,
      transactionTime: body.transactionTime || undefined,
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
    eventSlug: updated.eventSlug,
    message:
      'Payment details submitted. Our team will verify your transaction and confirm your registration.',
    redirectTo: `/events/${updated.eventSlug}/register/confirmation/${updated.id}`,
  })
}
