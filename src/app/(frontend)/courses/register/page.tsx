import { CourseRegistrationForm } from '@/components/programmes/CourseRegistrationForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Course Registration',
  description: 'Register interest for AFRS forensic education and training programmes.',
}

type Props = {
  searchParams: Promise<{
    type?: string
    categorySlug?: string
    categoryTitle?: string
    programmeId?: string
    programmeTitle?: string
    duration?: string
    mode?: string
  }>
}

function normaliseType(value?: string): 'education' | 'training' | 'other' {
  if (value === 'education' || value === 'training') return value
  return 'other'
}

export default async function CourseRegisterPage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <CourseRegistrationForm
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
