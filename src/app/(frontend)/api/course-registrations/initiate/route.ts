import { NextResponse } from 'next/server'
import { hasRequiredFields, jsonError } from '@/lib/apiResponses'
import { validateCustomResponses } from '@/lib/forms/dynamicFormTypes'
import type { DynamicFormSection } from '@/lib/forms/dynamicFormTypes'
import { resolveRegistrationConfig } from '@/lib/registration/resolveConfig'
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
  feeTierId?: string
  feeTierLabel?: string
  feeTierCurrency?: 'INR' | 'USD'
  participantRegion?: 'indian' | 'international'
  agreedToTerms?: boolean
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

    const payload = await getPayloadClient()
    const context = await findProgrammeRegistrationContext(body.programmeId)
    const registrationForm = context?.registrationForm

    const config = resolveRegistrationConfig({
      settings: context?.match?.registrationSettings,
      globalForm: registrationForm,
    })

    if (config.requireAgreement && !body.agreedToTerms) {
      return jsonError('You must agree to the registration instructions.', 400)
    }

    const sections = (registrationForm?.sections || []) as DynamicFormSection[]
    const customResponses = body.customResponses || {}
    const customError = validateCustomResponses(sections, customResponses)
    if (customError) return jsonError(customError, 400)

    const visibleTiers =
      body.participantRegion === 'international'
        ? config.feeTiers.filter((tier) => tier.currency === 'USD')
        : body.participantRegion === 'indian'
          ? config.feeTiers.filter((tier) => tier.currency === 'INR')
          : config.feeTiers

    const selectedTier = visibleTiers.find((tier) => tier.id === body.feeTierId) || visibleTiers[0]

    const totalAmount = Number(selectedTier?.amount || 0)
    const isFree = config.registrationType === 'free' || totalAmount <= 0

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
        email: body.email,
        countryCode: body.countryCode || '+91',
        mobileNumber: body.mobileNumber,
        address: undefined,
        organization: body.organization || undefined,
        designation: body.designation || undefined,
        qualification: body.qualification || undefined,
        preferredBatch: body.preferredBatch || undefined,
        message: body.message || undefined,
        feeTierLabel: selectedTier?.label || body.feeTierLabel,
        feeTierCurrency: selectedTier?.currency || body.feeTierCurrency || 'INR',
        participantRegion: body.participantRegion || 'indian',
        agreedToTerms: Boolean(body.agreedToTerms),
        customResponses: Object.keys(customResponses).length ? customResponses : undefined,
        totalAmount,
        paymentProvider: 'manual',
        paymentStatus: isFree ? 'notRequired' : 'pending',
        registrationStatus: isFree ? 'confirmed' : 'initiated',
      },
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      registrationId: created.id,
      registrationStatus: created.registrationStatus,
      totalAmount,
      isFree,
      message: isFree
        ? 'Registration received. A confirmation email will be sent shortly.'
        : 'Registration initiated. Please complete payment details.',
      redirectTo: isFree ? buildCourseConfirmationUrl(created.id) : undefined,
    })
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : 'Unable to initiate course registration.',
      500,
    )
  }
}
