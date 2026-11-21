import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getSiteResourcePersons, RESOURCE_PERSONS_PATH } from '@/lib/queries/resource-persons'
import { buildPageMetadata } from '@/lib/seo/metadata'

import { CoursesPageContent } from '../CoursesPageContent'

export const metadata: Metadata = buildPageMetadata({
  title: 'Resource Persons — Forensic Science Faculty & Experts',
  description:
    'Meet the AFRS resource persons: forensic science faculty, scientists and experts who teach our courses, training programmes and workshops.',
  path: RESOURCE_PERSONS_PATH,
})

/** Courses page with the "All resource persons" modal open; links to every profile URL. */
export default async function ResourcePersonsPage() {
  const { fromCms } = await getSiteResourcePersons()
  if (!fromCms) redirect('/courses')
  return <CoursesPageContent initialModal={{ kind: 'all' }} />
}
