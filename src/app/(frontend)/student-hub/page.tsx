import { StudentHubView } from '@/components/student-hub/StudentHubView'
import { getStudentHubContent } from '@/components/student-hub/content'
import { getPayloadClient } from '@/lib/payload'
import { getFeaturedGalleryItems } from '@/lib/queries/gallery'
import type { SiteSetting } from '@/payload-types'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'Forensic Science Student Resources',
  description:
    'Study resources for forensic science students: articles, exam preparation for UGC NET, FACT and CUET, quizzes and career guidance.',
  path: '/student-hub',
})

export default async function StudentHubPage() {
  const payload = await getPayloadClient()
  const [site, content, galleryItems] = await Promise.all([
    payload.findGlobal({ slug: 'siteSettings', depth: 0 }) as Promise<SiteSetting>,
    getStudentHubContent(),
    getFeaturedGalleryItems(4),
  ])

  return (
    <StudentHubView
      resources={content.resources}
      exams={content.exams}
      totalVisitors={site?.totalVisitors ?? 25847}
      galleryItems={galleryItems}
    />
  )
}
