import { NextResponse } from 'next/server'
import { hasRequiredFields, jsonError } from '@/lib/apiResponses'
import { getPayloadClient } from '@/lib/payload'
import type { Event as AfrsEvent } from '@/payload-types'

type InitiatePayload = {
  eventSlug?: string
  fullName?: string
  email?: string
  countryCode?: string
  mobileNumber?: string
  organization?: string
  designation?: string
  areaOfInterest?: string
  idProofFileName?: string
  idProofFileSize?: number
  registrationCategoryId?: string
  includeKit?: boolean
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
        'registrationCategoryId',
      ])
    ) {
      return jsonError('Missing required fields.', 400)
    }

    const eventResult = await payload.find({
      collection: 'events',
      where: { slug: { equals: body.eventSlug }, published: { equals: true } },
      limit: 1,
      depth: 0,
      overrideAccess: false,
    })

    const evt = eventResult.docs[0] as AfrsEvent | undefined
    if (!evt) return jsonError('Event not found.', 404)
    if (evt.registrationOpen === false) {
      return jsonError('Registration is closed for this event.', 400)
    }

    const categories = evt.registrationCategories || []
    const selected = categories.find((cat) => String(cat.id) === body.registrationCategoryId)
    if (!selected) return jsonError('Invalid registration category.', 400)

    const basePrice = Number(selected.price || 0)
    const kitPrice = body.includeKit && evt.includeKitOption ? Number(evt.kitPrice || 0) : 0
    const totalAmount = basePrice + kitPrice

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
        idProofFileName: body.idProofFileName,
        idProofFileSize: body.idProofFileSize || 0,
        registrationCategoryId: String(selected.id),
        registrationCategoryName: selected.categoryName || 'General',
        registrationCategoryPrice: basePrice,
        includeKit: Boolean(body.includeKit),
        kitPrice,
        totalAmount,
        paymentProvider: 'manual',
        paymentStatus: 'pending',
        registrationStatus: 'initiated',
      },
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      registrationId: created.id,
      eventSlug: evt.slug,
      totalAmount,
    })
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : 'Unable to initiate registration.',
      500,
    )
  }
}
