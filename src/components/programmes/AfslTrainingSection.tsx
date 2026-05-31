import Link from 'next/link'
import type { TrainingOption } from '@/components/programmes/types'
import { tagToneClass, trainingChecklist } from '@/components/programmes/content'
import { programmesTokens } from '@/components/programmes/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type AfslTrainingSectionProps = {
  options: TrainingOption[]
}

/**
 * AFSL Training & Internship — copy column + 3×2 option grid.
 */
export function AfslTrainingSection({ options }: AfslTrainingSectionProps) {
  return (
    <section
      id="afsl-training"
      className={`${programmesTokens.sectionY} bg-slate-50/80 scroll-mt-24`}
      aria-labelledby="afsl-training-heading"
    >
      <div className={programmesTokens.container}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
          <AnimateOnScroll direction="left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--prog-primary)]">
              Dedicated Training Center
            </span>
            <h2 id="afsl-training-heading" className={`mt-3 ${programmesTokens.heading} text-2xl sm:text-[28px]`}>
              AFSL Training &amp; Internship
            </h2>
            <p className={`mt-4 text-sm ${programmesTokens.body}`}>
              Practical exposure under certified forensic scientists — choose virtual modules, laboratory placements, or
              academic dissertation support aligned with your career goals.
            </p>
            <ul className="mt-6 space-y-3">
              {trainingChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]" aria-hidden>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/courses/training"
                className="inline-flex h-12 items-center justify-center px-8 rounded-xl bg-[var(--prog-primary)] hover:bg-[var(--prog-primary-hover)] text-white text-sm font-bold transition shadow-md"
              >
                Browse Training Tracks
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center px-8 rounded-xl border border-slate-200 text-slate-700 hover:bg-white text-sm font-bold transition"
              >
                Apply for Training
              </Link>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" stagger>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {options.map((opt) => (
                <li key={opt.id}>
                  <Link
                    href={opt.href}
                    className={`relative block ${programmesTokens.radiusCard} border border-slate-100 bg-white p-4 shadow-sm card-pop group`}
                  >
                    <span
                      className={`absolute top-3 right-3 rounded-full px-2 py-0.5 text-[9px] font-bold ${tagToneClass[opt.tagTone]}`}
                    >
                      {opt.tag}
                    </span>
                    <span className="text-2xl" aria-hidden>
                      {opt.icon}
                    </span>
                    <p className="mt-3 text-sm font-bold text-slate-900 leading-snug group-hover:text-[var(--prog-primary)] transition">
                      {opt.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
