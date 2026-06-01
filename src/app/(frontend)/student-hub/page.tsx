import { StudentHubView } from '@/components/student-hub/StudentHubView'
import { getStudentHubContent } from '@/components/student-hub/content'
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
  const [site, content] = await Promise.all([
    payload.findGlobal({ slug: 'siteSettings', depth: 0 }) as Promise<SiteSetting>,
    getStudentHubContent(),
  ])

  return (
    <StudentHubView
      resources={content.resources}
      exams={content.exams}
      totalVisitors={site?.totalVisitors ?? 25847}
    />
  )
}
