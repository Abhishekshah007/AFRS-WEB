import { AcademicResourcesSection } from '@/components/student-hub/AcademicResourcesSection'
import { ExamExcellenceSection } from '@/components/student-hub/ExamExcellenceSection'
import { QuizCareerSection } from '@/components/student-hub/QuizCareerSection'
import { StudentHubHero } from '@/components/student-hub/StudentHubHero'
import { VisitorCounterBar } from '@/components/student-hub/VisitorCounterBar'
import type { ExamPrepCardData, ResourceCardData } from '@/components/student-hub/types'

export type StudentHubViewProps = {
  resources: ResourceCardData[]
  exams: ExamPrepCardData[]
  totalVisitors: number
}

/**
 * Full Student Resource Hub page composition.
 */
export function StudentHubView({ resources, exams, totalVisitors }: StudentHubViewProps) {
  return (
    <div className="student-hub-page bg-white">
      <StudentHubHero />
      <AcademicResourcesSection resources={resources} />
      <ExamExcellenceSection exams={exams} />
      <QuizCareerSection />
      <VisitorCounterBar totalVisitors={totalVisitors} />
    </div>
  )
}
