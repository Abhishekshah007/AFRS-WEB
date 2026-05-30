import { StudentHubView } from '@/components/student-hub/StudentHubView'
import { defaultAcademicResources, defaultExamPrep } from '@/components/student-hub/content'
import { getPayloadClient } from '@/lib/payload'
import type { SiteSetting } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Student Resource Hub',
  description:
    'Forensic learning materials, research papers, exam preparation, quizzes, and career guidance for AFRS students.',
}

export default async function StudentHubPage() {
  const payload = await getPayloadClient()
  const site = (await payload.findGlobal({ slug: 'siteSettings', depth: 0 })) as SiteSetting

  return (
    <StudentHubView
      resources={defaultAcademicResources}
      exams={defaultExamPrep}
      totalVisitors={site?.totalVisitors ?? 25847}
    />
  )
}
