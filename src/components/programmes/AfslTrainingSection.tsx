import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import type { TrainingOption } from '@/components/programmes/types'
import { programmesTokens } from '@/components/programmes/tokens'
import { tagToneClass } from '@/components/programmes/content'
import { iconMap } from '../ui/iconMap'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { BookOpen } from 'lucide-react'

export type AfslTrainingSectionProps = {
  options: TrainingOption[]
  checklist: string[]
}

export function AfslTrainingSection({ options, checklist }: AfslTrainingSectionProps) {
  return (
    <section
      id="afsl-training"
      className={`${programmesTokens.sectionY} bg-[var(--prog-surface)] scroll-mt-24`}
      aria-labelledby="afsl-training-heading"
    >
      <div className={programmesTokens.container}>
        <div className="grid gap-6 lg:grid-cols-[300px_1fr] items-start">
          {/* ── Left panel — white card ── */}
          <AnimateOnScroll direction="left">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_1px_6px_rgba(0,0,0,0.05)] h-full flex flex-col">
              {/* Eyebrow pill */}
              <span className="inline-flex w-fit rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-indigo-500">
                Laboratory Division
              </span>

              {/* Heading */}
              <h2
                id="afsl-training-heading"
                className="mt-4 text-[24px] font-extrabold text-slate-900 leading-[1.2] tracking-tight"
              >
                AFSL Training &amp;
                <br />
                Internship
              </h2>

              {/* Body */}
              <p className="mt-4 text-[13px] text-slate-500 leading-relaxed">
                Our laboratory division offers hands-on experience and rigorous training in
                state-of-the-art forensic facilities. Designed for students and professionals
                looking to gain practical expertise.
              </p>

              {/* Checklist */}
              <ul className="mt-5 space-y-3 flex-1">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13px] text-slate-700">
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-emerald-500"
                      strokeWidth={2.2}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA — full width solid blue */}
              <Link
                href="/courses/training"
                className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-[var(--prog-primary)] hover:bg-[var(--prog-primary-hover)] text-white text-[13px] font-bold transition-colors shadow-md shadow-indigo-500/20"
              >
                Apply for Training
              </Link>
            </div>
          </AnimateOnScroll>

          {/* ── Right grid — 3×2 cards ── */}
          <AnimateOnScroll stagger>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {options.map((opt) => {
                const Icon = iconMap[opt.icon] ?? BookOpen
                return (
                  <li key={opt.id}>
                    <Link
                      href={opt.href}
                      className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow h-full group"
                    >
                      {/* Tag pill — top right */}
                      <span
                        className={`absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tagToneClass[opt.tagTone]}`}
                      >
                        {opt.tag}
                      </span>

                      {/* Icon */}
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100"
                        aria-hidden
                      >
                        <Icon className="h-5 w-5 text-slate-400" strokeWidth={1.6} />
                      </span>

                      {/* Title + subtitle */}
                      <h3 className="mt-5 text-[14px] font-extrabold text-slate-900 leading-snug group-hover:text-[var(--prog-primary)] transition-colors pr-12">
                        {opt.title}
                      </h3>
                      <p className="mt-1 text-[12px] text-slate-400 leading-snug">{opt.summary}</p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
