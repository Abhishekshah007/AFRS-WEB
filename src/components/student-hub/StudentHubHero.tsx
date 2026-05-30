import { StudentHubSearch } from '@/components/student-hub/StudentHubSearch'
import { studentHubTokens } from '@/components/student-hub/tokens'

/**
 * Centered hero with soft glow background, badge, and integrated search.
 */
export function StudentHubHero() {
  return (
    <section className="relative overflow-hidden bg-white hub-hero-glow pt-12 pb-16 md:pt-16 md:pb-20" aria-labelledby="hub-hero-title">
      <div className={`${studentHubTokens.container} relative z-10 text-center`}>
        <span
          className={`inline-flex ${studentHubTokens.radiusPill} bg-[var(--hub-primary-soft)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[var(--hub-primary)] reveal-up`}
        >
          Student Portal
        </span>
        <h1
          id="hub-hero-title"
          className="mt-5 text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-[var(--hub-text)] leading-tight reveal-up-d1"
        >
          Student <span className="text-[var(--hub-primary)]">Resource Hub</span>
        </h1>
        <p className={`mt-4 max-w-2xl mx-auto text-sm sm:text-base ${studentHubTokens.body} reveal-up-d2`}>
          Access a comprehensive collection of forensic learning materials, research papers, exam preparation
          resources, and career guidance — curated for scholars and aspiring investigators.
        </p>
        <div className="reveal-up-d3">
          <StudentHubSearch />
        </div>
      </div>
    </section>
  )
}
