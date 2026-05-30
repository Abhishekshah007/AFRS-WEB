import Link from 'next/link'
import type { EducationProgramme } from '@/components/programmes/types'
import { programmesTokens } from '@/components/programmes/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type AfRsEducationSectionProps = {
  programmes: EducationProgramme[]
}

/**
 * Four-card AFRS Education grid.
 */
export function AfRsEducationSection({ programmes }: AfRsEducationSectionProps) {
  return (
    <section id="afrs-education" className={`${programmesTokens.sectionY} bg-white scroll-mt-24`} aria-labelledby="afrs-education-heading">
      <div className={programmesTokens.container}>
        <AnimateOnScroll>
          <header className="flex items-start gap-3 mb-10 max-w-2xl">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--prog-primary-soft)] text-xl" aria-hidden>
              🔍
            </span>
            <div>
              <h2 id="afrs-education-heading" className={`${programmesTokens.heading} text-2xl sm:text-[28px]`}>
                AFRS Education
              </h2>
              <p className={`mt-2 text-sm ${programmesTokens.body}`}>
                Certificate programmes and professional courses designed for students, investigators, and laboratory staff.
              </p>
            </div>
          </header>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programmes.map((prog) => (
              <li key={prog.id}>
                <article className={`${programmesTokens.radiusCard} border border-slate-100 bg-white p-6 shadow-sm card-pop h-full flex flex-col`}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-50 text-xl border border-slate-100" aria-hidden>
                    {prog.icon}
                  </span>
                  <h3 className="mt-4 font-extrabold text-slate-900 text-sm leading-snug">{prog.title}</h3>
                  <p className={`mt-2 text-xs flex-1 ${programmesTokens.body}`}>{prog.description}</p>
                  <Link
                    href={prog.href}
                    className="mt-5 text-sm font-bold text-[var(--prog-primary)] hover:underline"
                  >
                    Apply Now <span aria-hidden>→</span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
