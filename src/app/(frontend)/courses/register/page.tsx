import { CourseRegistrationForm } from '@/components/programmes/CourseRegistrationForm'
import type { Metadata } from 'next'
import type { RegistrationForm as RegistrationFormType } from '@/payload-types'
import { getPayloadClient } from '@/lib/payload'
import type { RegistrationFormConfig } from '@/components/programmes/RegistrationFormRenderer'

export const metadata: Metadata = {
  title: 'Course Registration',
  description: 'Register interest for AFRS forensic education and training programmes.',
}

type Props = Readonly<{
  searchParams: Promise<{
    type?: string
    categorySlug?: string
    categoryTitle?: string
    programmeId?: string
    programmeTitle?: string
    duration?: string
    mode?: string
  }>
}>

function normaliseType(value?: string): 'education' | 'training' | 'other' {
  if (value === 'education' || value === 'training') return value
  return 'other'
}

function normaliseRegistrationFormConfig(
  registrationForm: RegistrationFormType | null,
): RegistrationFormConfig | null {
  if (!registrationForm) return null

  return {
    formTitle: registrationForm.formTitle,
    formSubtitle: registrationForm.formSubtitle,
    sections:
      registrationForm.sections?.map((section) => ({
        title: section.title,
        description: section.description ?? undefined,
        fields:
          section.fields?.map((field) => ({
            name: field.name,
            label: field.label,
            fieldType: field.fieldType,
            required: field.required ?? undefined,
            placeholder: field.placeholder ?? undefined,
            options: field.options ?? undefined,
            rows: field.rows ?? undefined,
            accept: field.accept ?? undefined,
          })) ?? undefined,
      })) ?? [],
    paymentInstructions: registrationForm.paymentInstructions
      ? {
          title: registrationForm.paymentInstructions.title ?? undefined,
          accountName: registrationForm.paymentInstructions.accountName ?? undefined,
          accountNumber: registrationForm.paymentInstructions.accountNumber ?? undefined,
          ifsc: registrationForm.paymentInstructions.ifsc ?? undefined,
          swift: registrationForm.paymentInstructions.swift ?? undefined,
          branchAddress: registrationForm.paymentInstructions.branchAddress ?? undefined,
          upiId: registrationForm.paymentInstructions.upiId ?? undefined,
          note: registrationForm.paymentInstructions.note ?? undefined,
        }
      : undefined,
    paymentMethods:
      registrationForm.paymentMethods?.map((method) => ({
        title: method.title,
        description: method.description ?? undefined,
        qrCode: method.qrCode ?? undefined,
        link: method.link ?? undefined,
      })) ?? [],
  }
}

export default async function CourseRegisterPage({ searchParams }: Props) {
  const params = await searchParams
  const payload = await getPayloadClient()
  const registrationForm = (await payload.findGlobal({
    slug: 'registrationForm',
    depth: 1,
    overrideAccess: false,
  })) as RegistrationFormType | null

  const config = normaliseRegistrationFormConfig(registrationForm)

  return (
    <CourseRegistrationForm
      config={config}
      details={{
        programmeType: normaliseType(params.type),
        categorySlug: params.categorySlug,
        categoryTitle: params.categoryTitle,
        programmeId: params.programmeId,
        programmeTitle: params.programmeTitle || 'General AFRS Programme',
        programmeDuration: params.duration,
        programmeMode: params.mode,
      }}
    />
  )
}
