import { NextResponse } from 'next/server'
import { hasRequiredFields, jsonError } from '@/lib/apiResponses'
import { getPayloadClient } from '@/lib/payload'
import { createLocalReq } from 'payload'

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
  address?: string
  organization?: string
  designation?: string
  qualification?: string
  experienceLevel?: 'student' | 'beginner' | 'professional' | 'faculty'
  preferredBatch?: string
  message?: string
  transactionId?: string
  transactionDate?: string
  transactionTime?: string
}

function getFormValue(formData: FormData, fieldName: string, defaultValue = ''): string {
  const raw = formData.get(fieldName)
  return typeof raw === 'string' ? raw : defaultValue
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || ''
    const formData = contentType.includes('multipart/form-data')
      ? await req.formData()
      : null

    const body = formData
      ? {
        programmeType: getFormValue(formData, 'programmeType', 'other'),
        categorySlug: getFormValue(formData, 'categorySlug'),
        categoryTitle: getFormValue(formData, 'categoryTitle'),
        programmeId: getFormValue(formData, 'programmeId'),
        programmeTitle: getFormValue(formData, 'programmeTitle'),
        programmeDuration: getFormValue(formData, 'programmeDuration'),
        programmeMode: getFormValue(formData, 'programmeMode'),
        fullName: getFormValue(formData, 'fullName'),
        email: getFormValue(formData, 'email'),
        countryCode: getFormValue(formData, 'countryCode', '+91'),
        mobileNumber: getFormValue(formData, 'mobileNumber'),
        address: getFormValue(formData, 'address'),
        organization: getFormValue(formData, 'organization'),
        designation: getFormValue(formData, 'designation'),
        qualification: getFormValue(formData, 'qualification'),
        experienceLevel: getFormValue(formData, 'experienceLevel', 'student') as
          | 'student'
          | 'beginner'
          | 'professional'
          | 'faculty',
        preferredBatch: getFormValue(formData, 'preferredBatch'),
        message: getFormValue(formData, 'message'),
        transactionId: getFormValue(formData, 'transactionId'),
        transactionDate: getFormValue(formData, 'transactionDate'),
        transactionTime: getFormValue(formData, 'transactionTime'),
      }
      : await req.json().catch(() => ({}))

    if (!hasRequiredFields(body, ['programmeTitle', 'fullName', 'email', 'mobileNumber'])) {
      return jsonError('Missing required fields.', 400)
    }

    const file = formData?.get('transactionProof')
    let uploadFile
    if (file instanceof File) {
      const buffer = Buffer.from(await file.arrayBuffer())
      uploadFile = {
        name: file.name,
        mimetype: file.type || 'application/octet-stream',
        size: file.size,
        data: buffer,
      }
    }

    const payload = await getPayloadClient()
    const localReq = await createLocalReq({ req: { url: req.url, headers: req.headers } }, payload)
    if (uploadFile) {
      localReq.file = uploadFile
    }

    const created = await payload.create({
      collection: 'courseRegistrations',
      data: {
        programmeType: body.programmeType || 'other',
        categorySlug: body.categorySlug || undefined,
        categoryTitle: body.categoryTitle || undefined,
        programmeId: body.programmeId || undefined,
        programmeTitle: body.programmeTitle,
        programmeDuration: body.programmeDuration || undefined,
        programmeMode: body.programmeMode || undefined,
        fullName: body.fullName,
        email: body.email,
        countryCode: body.countryCode || '+91',
        mobileNumber: body.mobileNumber,
        address: body.address || undefined,
        organization: body.organization || undefined,
        designation: body.designation || undefined,
        qualification: body.qualification || undefined,
        experienceLevel: body.experienceLevel || 'student',
        preferredBatch: body.preferredBatch || undefined,
        message: body.message || undefined,
        transactionId: body.transactionId || undefined,
        transactionDate: body.transactionDate || undefined,
        transactionTime: body.transactionTime || undefined,
        totalAmount: 0,
        paymentProvider: 'manual',
        paymentStatus: 'pending',
        registrationStatus: 'initiated',
      },
      req: localReq,
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      registrationId: created.id,
      registrationStatus: created.registrationStatus,
    })
  } catch (error) {
    return jsonError(
      error instanceof Error ? error.message : 'Unable to initiate course registration.',
      500,
    )
  }
}
