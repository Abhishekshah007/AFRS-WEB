'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import RegistrationFormRenderer, { type RegistrationFormConfig } from './RegistrationFormRenderer'

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
  config: RegistrationFormConfig | null
}>

export function CourseRegistrationForm({ details, config }: Props) {
  const hiddenData = {
    programmeType: details.programmeType,
    categorySlug: details.categorySlug || '',
    categoryTitle: details.categoryTitle || '',
    programmeId: details.programmeId || '',
    programmeTitle: details.programmeTitle,
    programmeDuration: details.programmeDuration || '',
    programmeMode: details.programmeMode || '',
  }

  return (
    <div className="programmes-page min-h-screen bg-[#f4f6fb]">
      <div className="mx-auto grid w-full max-w-[1180px] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[330px_1fr] lg:px-8">
        <aside className="space-y-4">
          <Link
            href="/courses"
            className="text-xs font-bold text-slate-500 hover:text-[var(--prog-primary)]"
          >
            ← Back to Programmes
          </Link>

          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-[var(--prog-primary)] to-blue-500 p-6 text-white">
              <BookOpen className="h-8 w-8" />
              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-white/75">
                Course Registration
              </p>
              <h1 className="mt-2 text-2xl font-extrabold leading-tight">
                {details.programmeTitle}
              </h1>
            </div>
            <div className="space-y-3 p-5 text-sm text-slate-600">
              {details.categoryTitle ? (
                <p>
                  <span className="font-bold text-slate-900">Category:</span>{' '}
                  {details.categoryTitle}
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

          <article className="rounded-3xl bg-slate-950 p-5 text-white">
            <p className="font-extrabold">Registration note</p>
            <p className="mt-2 text-xs leading-5 text-white/65">
              Submit your details and transaction proof. Payment methods are configured from the CMS
              and stored as part of this registration.
            </p>
          </article>
        </aside>

        <main>
          {config ? (
            <RegistrationFormRenderer config={config} hiddenData={hiddenData} />
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-slate-700">
                Registration form configuration is not available yet.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
