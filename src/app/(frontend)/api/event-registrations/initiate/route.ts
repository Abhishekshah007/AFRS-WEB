import { NextResponse } from 'next/server'
import { hasRequiredFields, jsonError } from '@/lib/apiResponses'
import { validateCustomResponses } from '@/lib/forms/dynamicFormTypes'
import type { DynamicFormSection } from '@/lib/forms/dynamicFormTypes'
import { categoriesToFeeTiers, resolveRegistrationConfig } from '@/lib/registration/resolveConfig'
import { getPayloadClient } from '@/lib/payload'
import type { Event as AfrsEvent, RegistrationForm } from '@/payload-types'

type InitiatePayload = {
  eventSlug?: string
  fullName?: string
  email?: string
  countryCode?: string
  mobileNumber?: string
  organization?: string
  designation?: string
  areaOfInterest?: string
  registrationCategoryId?: string
  feeTierLabel?: string
  feeTierCurrency?: 'INR' | 'USD'
  participantRegion?: 'indian' | 'international'
  includeKit?: boolean
  agreedToTerms?: boolean
  customResponses?: Record<string, string>
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as InitiatePayload
    const payload = await getPayloadClient()

    if (
      !hasRequiredFields(body, [
        'eventSlug',
        'fullName',
        'email',
        'mobileNumber',
        'organization',
        'designation',
        'areaOfInterest',
      ])
    ) {
      return jsonError('Missing required fields.', 400)
    }

    const [eventResult, registrationForm] = await Promise.all([
      payload.find({
        collection: 'events',
        where: { slug: { equals: body.eventSlug }, published: { equals: true } },
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

    const feeTiers = categoriesToFeeTiers(evt.registrationCategories || [])
    const config = resolveRegistrationConfig({
      settings: evt.registrationSettings,
      globalForm: registrationForm,
      feeTiersOverride: feeTiers,
    })

    if (config.requireAgreement && !body.agreedToTerms) {
      return jsonError('You must agree to the registration instructions.', 400)
    }

    const sections = (evt.registrationSections || []) as DynamicFormSection[]
    const customResponses = body.customResponses || {}
    const customError = validateCustomResponses(sections, customResponses)
    if (customError) return jsonError(customError, 400)

    const selected = feeTiers.find((tier) => tier.id === body.registrationCategoryId) || feeTiers[0]
    if (!selected && config.registrationType !== 'free') {
      return jsonError('Invalid registration category.', 400)
    }

    const basePrice = Number(selected?.amount || 0)
    const kitPrice = body.includeKit && evt.includeKitOption ? Number(evt.kitPrice || 0) : 0
    const totalAmount = basePrice + kitPrice
    const isFree = config.registrationType === 'free' || totalAmount <= 0

    const created = await payload.create({
      collection: 'eventRegistrations',
      data: {
        event: evt.id,
        eventSlug: evt.slug,
        eventTitle: evt.title,
        fullName: body.fullName,
        email: body.email,
        countryCode: body.countryCode || '+91',
        mobileNumber: body.mobileNumber,
        organization: body.organization,
        designation: body.designation,
        areaOfInterest: body.areaOfInterest,
        registrationCategoryId: String(selected?.id || 'free'),
        registrationCategoryName: selected?.label || body.feeTierLabel || 'General',
        registrationCategoryPrice: basePrice,
        feeTierLabel: selected?.label || body.feeTierLabel,
        feeTierCurrency: selected?.currency || body.feeTierCurrency || 'INR',
        participantRegion: body.participantRegion || 'indian',
        agreedToTerms: Boolean(body.agreedToTerms),
        includeKit: Boolean(body.includeKit),
        kitPrice,
        totalAmount,
        customResponses: Object.keys(customResponses).length ? customResponses : undefined,
        paymentProvider: 'manual',
        paymentStatus: isFree ? 'notRequired' : 'pending',
        registrationStatus: isFree ? 'confirmed' : 'initiated',
      },
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      registrationId: created.id,
      eventSlug: evt.slug,
      totalAmount,
      isFree,
      message: isFree
        ? 'Registration received. A confirmation email will be sent shortly.'
        : 'Registration initiated. Please complete payment details.',
    })
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : 'Unable to initiate registration.',
      500,
    )
  }
}
