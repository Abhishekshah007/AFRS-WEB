import Link from 'next/link'
import { studentHubTokens } from '@/components/student-hub/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

/**
 * Side-by-side Quiz Test Zone and Student Career Guidance cards.
 */
export function QuizCareerSection() {
  return (
    <section className={`${studentHubTokens.sectionY} bg-white`} aria-labelledby="quiz-career-heading">
      <div className={studentHubTokens.container}>
        <h2 id="quiz-career-heading" className="sr-only">
          Quizzes and career guidance
        </h2>
        <AnimateOnScroll stagger>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className={`${studentHubTokens.radiusCard} hub-quiz-card p-8 sm:p-10 card-pop flex flex-col`}>
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--hub-primary)]/15 text-2xl"
                aria-hidden
              >
                📝
              </span>
              <h3 className={`mt-5 ${studentHubTokens.heading} text-xl sm:text-2xl`}>Quiz Test Zone</h3>
              <p className={`mt-3 text-sm flex-1 ${studentHubTokens.body}`}>
                Practice topic-wise quizzes and timed mock tests to reinforce forensic concepts before exams and
                interviews.
              </p>
              <Link
                href="/search?q=quiz"
                className={`mt-8 inline-flex h-12 w-fit items-center justify-center px-8 ${studentHubTokens.radiusCard} bg-[var(--hub-primary)] hover:bg-[var(--hub-primary-hover)] text-white text-sm font-bold transition`}
              >
                View All Quizzes
              </Link>
            </article>

            <article
              className={`${studentHubTokens.radiusCard} bg-[var(--hub-navy)] text-white p-8 sm:p-10 card-pop flex flex-col`}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl"
                aria-hidden
              >
                🎓
              </span>
              <h3 className="mt-5 text-xl sm:text-2xl font-extrabold">Student Career Guidance</h3>
              <p className="mt-3 text-sm text-white/70 leading-relaxed flex-1">
                Explore career roadmaps, internship opportunities, and mentorship programmes designed for forensic
                science graduates and researchers.
              </p>
              <Link
                href="/contact"
                className="mt-8 text-sm font-bold text-white underline underline-offset-4 hover:text-indigo-200 transition"
              >
                Learn about Mentorship Programs
              </Link>
            </article>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
