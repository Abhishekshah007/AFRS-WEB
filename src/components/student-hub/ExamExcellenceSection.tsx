import type { ExamPrepCardData } from '@/components/student-hub/types'
import { ExamPrepCard } from '@/components/student-hub/ExamPrepCard'
import { studentHubTokens } from '@/components/student-hub/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type ExamExcellenceSectionProps = {
  exams: ExamPrepCardData[]
}

/**
 * Dark “Exam Excellence Center” with glassmorphism prep cards.
 */
export function ExamExcellenceSection({ exams }: ExamExcellenceSectionProps) {
  return (
    <section
      className={`${studentHubTokens.sectionY} hub-exam-section text-white relative overflow-hidden`}
      aria-labelledby="exam-excellence-heading"
    >
      <div className={`${studentHubTokens.container} relative z-10`}>
        <AnimateOnScroll>
          <header className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">
              Prepare to Succeed
            </span>
            <h2
              id="exam-excellence-heading"
              className="mt-3 text-2xl sm:text-[32px] font-extrabold"
            >
              Exam Excellence Center
            </h2>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Structured preparation pathways, mock assessments, and expert-curated study material
              for national forensic science examinations.
            </p>
          </header>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {exams.map((exam) => (
              <li key={exam.id}>
                <ExamPrepCard exam={exam} />
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
