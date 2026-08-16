import { AcademicResourcesSection } from '@/components/student-hub/AcademicResourcesSection'
import { ExamExcellenceSection } from '@/components/student-hub/ExamExcellenceSection'
import { QuizCareerSection } from '@/components/student-hub/QuizCareerSection'
import { StudentHubHero } from '@/components/student-hub/StudentHubHero'
import { studentHubTokens } from '@/components/student-hub/tokens'
import { VisitorCounterBar } from '@/components/student-hub/VisitorCounterBar'
import { SiteGallerySection } from '@/components/gallery/SiteGallerySection'
import type { SiteGalleryItem } from '@/components/gallery/SiteGallerySection'
import type { ExamPrepCardData, ResourceCardData } from '@/components/student-hub/types'

export type StudentHubViewProps = {
  resources: ResourceCardData[]
  exams: ExamPrepCardData[]
  totalVisitors: number
  galleryItems: SiteGalleryItem[]
}

/**
 * Full Student Resource Hub page composition.
 */
export function StudentHubView({
  resources,
  exams,
  totalVisitors,
  galleryItems,
}: StudentHubViewProps) {
  return (
    <div className="student-hub-page bg-white">
      <StudentHubHero />
      <AcademicResourcesSection resources={resources} />
      <ExamExcellenceSection exams={exams} />
      <QuizCareerSection />
      <SiteGallerySection items={galleryItems} className={studentHubTokens.surface} />
      <VisitorCounterBar totalVisitors={totalVisitors} />
    </div>
  )
}
