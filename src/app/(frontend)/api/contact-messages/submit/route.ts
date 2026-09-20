import { jsonError } from '@/lib/apiResponses'
import { getPayloadClient } from '@/lib/payload'
import { enforcePublicApiGuards } from '@/lib/security/publicApiGuards'
import { PUBLIC_RATE_LIMITS } from '@/lib/security/rateLimit'
import type { SubmissionFormType } from '@/fields/submissionExport'

type ContactSubmitBody = {
  fullName?: string
  mobile?: string
  email?: string
  subject?: string
  message?: string
  formType?: SubmissionFormType
  caseType?: string
  serviceSlug?: string
  turnstileToken?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactSubmitBody

    const blocked = await enforcePublicApiGuards(req, {
      rateLimit: PUBLIC_RATE_LIMITS.contact,
      turnstileToken: body.turnstileToken,
    })
    if (blocked) return blocked

    const fullName = body.fullName?.trim() || ''
    const email = body.email?.trim().toLowerCase() || ''
    const message = body.message?.trim() || ''

    if (!fullName || !email || !message) {
      return jsonError('Please fill Full Name, Email, and Message.', 400)
    }

    if (!EMAIL_RE.test(email)) {
      return jsonError('Please enter a valid email address.', 400)
    }

    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contactMessages',
      data: {
        fullName,
        email,
        mobile: body.mobile?.trim() || undefined,
        subject: body.subject?.trim() || undefined,
        message,
        formType: body.formType || 'contact',
        caseType: body.caseType?.trim() || undefined,
        serviceSlug: body.serviceSlug?.trim() || undefined,
        status: 'new',
      },
      overrideAccess: true,
    })

    return Response.json({
      ok: true,
      message: 'Message sent successfully. We will contact you soon.',
    })
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : 'Unable to send your message.',
      500,
    )
  }
}
