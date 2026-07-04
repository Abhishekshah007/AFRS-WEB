import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

type CourseRegistrationPayload = {
  programmeType?: 'education' | 'training' | 'other'
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
  experienceLevel?: 'student' | 'beginner' | 'professional' | 'faculty'
  preferredBatch?: string
  message?: string
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CourseRegistrationPayload

    if (!body.programmeTitle || !body.fullName || !body.email || !body.mobileNumber) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const payload = await getPayloadClient()
    const created = await payload.create({
      collection: 'courseRegistrations',
      data: {
        programmeType: body.programmeType || 'other',
        categorySlug: body.categorySlug,
        categoryTitle: body.categoryTitle,
        programmeId: body.programmeId,
        programmeTitle: body.programmeTitle,
        programmeDuration: body.programmeDuration,
        programmeMode: body.programmeMode,
        fullName: body.fullName,
        email: body.email,
        countryCode: body.countryCode || '+91',
        mobileNumber: body.mobileNumber,
        organization: body.organization,
        designation: body.designation,
        qualification: body.qualification,
        experienceLevel: body.experienceLevel || 'student',
        preferredBatch: body.preferredBatch,
        message: body.message,
        totalAmount: 0,
        paymentProvider: 'stripe',
        paymentStatus: 'pending',
        registrationStatus: 'initiated',
      },
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      registrationId: created.id,
      paymentStatus: created.paymentStatus,
    })
  } catch {
    return NextResponse.json({ error: 'Unable to initiate course registration.' }, { status: 500 })
  }
}
