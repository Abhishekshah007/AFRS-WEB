import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import type { EducationProgramme } from '@/components/programmes/types'
import { programmesTokens } from '@/components/programmes/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { resolveIcon } from '@/components/ui/iconMap'

export type AfRsEducationSectionProps = {
  programmes: EducationProgramme[]
}

/**
 * AFRS Education programme cards.
 */
export function AfRsEducationSection({ programmes }: AfRsEducationSectionProps) {
  return (
    <section
      id="afrs-education"
      className={`${programmesTokens.sectionY} bg-[var(--prog-surface)] scroll-mt-24`}
      aria-labelledby="afrs-education-heading"
    >
      <div className={programmesTokens.container}>
        <AnimateOnScroll>
          <header className="flex items-center gap-3 mb-10">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50"
              aria-hidden
            >
              <GraduationCap className="h-5 w-5 text-brand-500" strokeWidth={1.8} />
            </span>
            <div>
              <h2
                id="afrs-education-heading"
                className="text-[20px] font-extrabold text-slate-900 tracking-tight"
              >
                AFRS Education
              </h2>
              <p className="text-[13px] text-slate-400 mt-0.5">
                Certificate programmes, internships, capsule modules, police training and research pathways.
              </p>
            </div>
          </header>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {programmes.map((prog) => {
              const Icon = resolveIcon(prog.icon)
              return (
                <li key={prog.id}>
                  <article className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.05)] h-full flex flex-col">
                    {/* Icon */}
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5 text-brand-400" strokeWidth={1.8} />
                    </span>

                    {/* Title */}
                    <h3 className="mt-5 text-[15px] font-extrabold text-slate-900 leading-snug tracking-tight">
                      {prog.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-[13px] text-slate-500 leading-relaxed flex-1">
                      {prog.description}
                    </p>
                    <Link
                      href={prog.href}
                      className="mt-6 inline-flex items-center text-[13px] font-bold text-brand-500 hover:text-brand-700 transition-colors"
                    >
                      {' '}
                      <span className="mt-5 text-sm font-bold text-[var(--prog-primary)] group-hover:underline">
                        View programmes <span aria-hidden>→</span>
                      </span>
                    </Link>
                  </article>
                </li>
              )
            })}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
