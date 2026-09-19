'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { UnifiedRegistrationFlow } from '@/components/registration/UnifiedRegistrationFlow'
import type { ResolvedRegistrationConfig } from '@/domain/registration/types'
import type { DynamicFormSection } from '@/lib/forms/dynamicFormTypes'

type CourseRegistrationDetails = {
  programmeType: 'education' | 'training' | 'other'
  categorySlug?: string
  categoryTitle?: string
  programmeId?: string
  programmeTitle: string
  programmeDuration?: string
  programmeMode?: string
}

type Props = Readonly<{
  details: CourseRegistrationDetails
  config: ResolvedRegistrationConfig
  customSections?: DynamicFormSection[]
}>

export function CourseRegistrationForm({ details, config, customSections = [] }: Props) {
  const sidebar = (
    <>
      <Link
        href="/courses"
        className="text-xs font-bold text-slate-500 hover:text-[var(--prog-primary)]"
      >
        ← Back to Programmes
      </Link>

      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-[var(--prog-primary)] to-brand-500 p-6 text-white">
          <BookOpen className="h-8 w-8" />
          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-white/75">
            Course Registration
          </p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight">{details.programmeTitle}</h1>
        </div>
        <div className="space-y-3 p-5 text-sm text-slate-600">
          {details.categoryTitle ? (
            <p>
              <span className="font-bold text-slate-900">Category:</span> {details.categoryTitle}
            </p>
          ) : null}
          {details.programmeDuration ? (
            <p>
              <span className="font-bold text-slate-900">Duration:</span>{' '}
              {details.programmeDuration}
            </p>
          ) : null}
          {details.programmeMode ? (
            <p>
              <span className="font-bold text-slate-900">Mode:</span> {details.programmeMode}
            </p>
          ) : null}
        </div>
      </article>
    </>
  )

  return (
    <div className="programmes-page min-h-screen bg-[var(--prog-surface)]">
      <UnifiedRegistrationFlow
        variant="course"
        config={config}
        feeTiers={config.feeTiers}
        customSections={customSections}
        sidebar={sidebar}
        backLink={{ href: '/courses', label: 'Back to Programmes' }}
        initiateEndpoint="/api/course-registrations/initiate"
        completeEndpoint="/api/course-registrations/complete"
        confirmationPath={(id) => `/courses/register/confirmation/${id}`}
        buildInitiatePayload={({
          form,
          selectedTier,
          participantRegion,
          customResponses,
          agreedToTerms,
        }) => ({
          programmeType: details.programmeType,
          categorySlug: details.categorySlug || '',
          categoryTitle: details.categoryTitle || '',
          programmeId: details.programmeId || '',
          programmeTitle: details.programmeTitle,
          programmeDuration: details.programmeDuration || '',
          programmeMode: details.programmeMode || '',
          fullName: form.fullName,
          email: form.email,
          countryCode: form.countryCode,
          mobileNumber: form.mobileNumber,
          organization: form.organization,
          designation: form.designation,
          qualification: form.qualification,
          preferredBatch: form.preferredBatch,
          message: form.message,
          feeTierId: selectedTier?.id,
          feeTierLabel: selectedTier?.label,
          feeTierCurrency: selectedTier?.currency,
          participantRegion,
          agreedToTerms,
          customResponses,
        })}
      />
    </div>
  )
}
