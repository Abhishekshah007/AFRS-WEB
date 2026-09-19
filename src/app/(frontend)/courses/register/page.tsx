import { CourseRegistrationForm } from '@/components/programmes/CourseRegistrationForm'
import { normalizeDynamicSections } from '@/lib/registration/normalizeDynamicSections'
import { resolveRegistrationConfig } from '@/lib/registration/resolveConfig'
import { findProgrammeRegistrationContext } from '@/lib/queries/programme-registration'
import type { DynamicFormSection } from '@/lib/forms/dynamicFormTypes'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'Course Registration',
  description: 'Register interest in AFRS forensic education and AFSL training programmes.',
  path: '/courses/register',
  index: false,
})

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

export default async function CourseRegisterPage({ searchParams }: Props) {
  const params = await searchParams
  const context = await findProgrammeRegistrationContext(params.programmeId)
  const registrationForm = context?.registrationForm

  const config = resolveRegistrationConfig({
    settings: context?.match?.registrationSettings,
    globalForm: registrationForm,
  })

  const customSections = normalizeDynamicSections(
    registrationForm?.sections as DynamicFormSection[],
  )

  return (
    <CourseRegistrationForm
      config={config}
      customSections={customSections}
      details={{
        programmeType: normaliseType(params.type),
        categorySlug: params.categorySlug || context?.match?.categorySlug,
        categoryTitle: params.categoryTitle || context?.match?.categoryTitle,
        programmeId: params.programmeId,
        programmeTitle: params.programmeTitle || 'General AFRS Programme',
        programmeDuration: params.duration,
        programmeMode: params.mode,
      }}
    />
  )
}
