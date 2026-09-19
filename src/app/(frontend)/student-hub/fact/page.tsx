import { getExamPrepAchievers, getFactPageContent } from '@/components/student-hub/content'
import { UgcNetPageView } from '@/components/student-hub/UgcNetPageView'
import { getPublishedGallerySlides } from '@/lib/queries/gallery'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'FACT Forensic Aptitude Test Preparation',
  description:
    'Preparation support for the Forensic Aptitude and Caliber Test (FACT), including practice modules and guided learning.',
  path: '/student-hub/fact',
})

export default async function FactPage() {
  const [content, achievers, gallerySlides] = await Promise.all([
    getFactPageContent(),
    getExamPrepAchievers('fact'),
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
