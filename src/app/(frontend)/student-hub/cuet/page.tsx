import { getCuetPageContent, getExamPrepAchievers } from '@/components/student-hub/content'
import { UgcNetPageView } from '@/components/student-hub/UgcNetPageView'
import { getPublishedGallerySlides } from '@/lib/queries/gallery'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'CUET Forensic Science (SCQP13) Preparation',
  description:
    'CUET UG/PG Forensic Science (SCQP13) preparation with domain practice, mock tests and guided study support.',
  path: '/student-hub/cuet',
})

export default async function CuetPage() {
  const [content, achievers, gallerySlides] = await Promise.all([
    getCuetPageContent(),
    getExamPrepAchievers('cuet'),
    getPublishedGallerySlides(),
  ])

  return (
    <div className="student-hub-page min-h-screen hub-surface">
      <UgcNetPageView
        content={content}
        achievers={achievers}
        gallerySlides={gallerySlides}
      />
    </div>
  )
}
