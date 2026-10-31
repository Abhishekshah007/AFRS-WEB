import { NextResponse } from 'next/server'
import { hasRequiredFields, jsonError } from '@/lib/apiResponses'
import { isValidEmailAddress, validateCustomResponses } from '@/lib/forms/dynamicFormTypes'
import type { DynamicFormSection } from '@/lib/forms/dynamicFormTypes'
import { findProgrammeRegistrationContext } from '@/lib/queries/programme-registration'
import { buildCourseConfirmationUrl } from '@/lib/registration/confirmationToken'
import { getPayloadClient } from '@/lib/payload'
import { enforcePublicApiGuards } from '@/lib/security/publicApiGuards'
import { PUBLIC_RATE_LIMITS } from '@/lib/security/rateLimit'

type InitiatePayload = {
  programmeType?: string
  categorySlug?: string
  categoryTitle?: string
  programmeId?: string
  programmeTitle?: string
  programmeDuration?: string
  programmeMode?: string
  fullName?: string
  email?: string
  countryCode?: string
  mobileNumber?: string
  organization?: string
  designation?: string
  qualification?: string
  preferredBatch?: string
  message?: string
  customResponses?: Record<string, string>
  turnstileToken?: string
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as InitiatePayload

    const blocked = await enforcePublicApiGuards(req, {
      rateLimit: PUBLIC_RATE_LIMITS.registration,
      turnstileToken: body.turnstileToken,
    })
    if (blocked) return blocked

    if (!hasRequiredFields(body, ['programmeTitle', 'fullName', 'email', 'mobileNumber'])) {
      return jsonError('Missing required fields.', 400)
    }
    if (!isValidEmailAddress(body.email)) {
      return jsonError('Please enter a valid email address.', 400)
    }

    const payload = await getPayloadClient()
    const context = await findProgrammeRegistrationContext(body.programmeId)
    const registrationForm = context?.registrationForm

    const sections = (registrationForm?.sections || []) as DynamicFormSection[]
    const customResponses = body.customResponses || {}
    const customError = validateCustomResponses(sections, customResponses)
    if (customError) return jsonError(customError, 400)

    const created = await payload.create({
      collection: 'courseRegistrations',
      data: {
        programmeType:
          body.programmeType === 'education' || body.programmeType === 'training'
            ? body.programmeType
            : 'other',
        categorySlug: body.categorySlug || context?.match?.categorySlug || undefined,
        categoryTitle: body.categoryTitle || context?.match?.categoryTitle || undefined,
        programmeId: body.programmeId || context?.match?.programmeId || undefined,
        programmeTitle: body.programmeTitle,
        programmeDuration: body.programmeDuration || undefined,
        programmeMode: body.programmeMode || undefined,
        fullName: body.fullName,
        email: body.email.trim(),
        countryCode: body.countryCode || '+91',
        mobileNumber: body.mobileNumber,
        address: undefined,
        organization: body.organization || undefined,
        designation: body.designation || undefined,
        qualification: body.qualification || undefined,
        preferredBatch: body.preferredBatch || undefined,
        message: body.message || undefined,
        requestOnly: true,
        feeTierLabel: undefined,
        feeTierCurrency: undefined,
        participantRegion: undefined,
        agreedToTerms: false,
        customResponses: Object.keys(customResponses).length ? customResponses : undefined,
        totalAmount: 0,
        paymentProvider: 'manual',
        paymentStatus: 'notRequired',
        registrationStatus: 'initiated',
      },
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      registrationId: created.id,
      registrationStatus: created.registrationStatus,
      totalAmount: 0,
      isFree: true,
      message:
        'Your request has been received. Our team will contact you when the batch schedule is confirmed. No payment is due now.',
      redirectTo: buildCourseConfirmationUrl(created.id),
    })
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : 'Unable to initiate course registration.',
      500,
    )
  }
}
