import { getUgcNetAchievers } from '@/components/student-hub/content'
import { UgcNetPageView } from '@/components/student-hub/UgcNetPageView'
import { defaultFactPageContent } from '@/data/defaults/student-hub/fact'
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
  const [achievers, gallerySlides] = await Promise.all([
    getUgcNetAchievers(),
    getPublishedGallerySlides(),
  ])

  return (
    <div className="student-hub-page min-h-screen hub-surface">
      <UgcNetPageView
        content={defaultFactPageContent}
        achievers={achievers}
        gallerySlides={gallerySlides}
      />
    </div>
  )
}
