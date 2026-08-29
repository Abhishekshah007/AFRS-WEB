import Link from 'next/link'
import type { CSSProperties } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { TYPOGRAPHY } from '../design'
import { CONTAINER, SECTION } from './constants'

export function ForensicTrainingProgram() {
  const trainingPrograms = [
    {
      icon: '🎯',
      title: 'Crime Scene Investigation Training',
      accent: '#3B010B',
    },
    {
      icon: '🌀',
      title: 'Fingerprint Examination Course',
      accent: '#75162D',
    },
    {
      icon: '🧬',
      title: 'Forensic Biology & Serology Training',
      accent: '#560B18',
    },
    {
      icon: '📄',
      title: 'Questioned Document Examination',
      accent: '#F2D9A0',
    },
    {
      icon: '💻',
      title: 'Multimedia & Digital Forensics',
      accent: '#F2E5C6',
    },
  ]
  return (
    <section
      className={`${SECTION} section-aura-training section-glow-top relative overflow-hidden`}
    >
      <div className={`${CONTAINER} relative z-10`}>
        <SectionHeader
          eyebrow="Specialized Courses"
          title="Forensic Training Programs"
          subtitle="Specialized certification courses for future forensic professionals"
        />

        <AnimateOnScroll stagger className="grid gap-5 md:grid-cols-3">
          {trainingPrograms.slice(0, 3).map((program) => (
            <div
              key={program.title}
              className="training-card card-pop flex items-center gap-4 rounded-2xl p-5"
              style={{ '--card-accent': program.accent } as CSSProperties}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm ring-1 ring-slate-100">
                {program.icon}
              </div>

              <h3 className={`${TYPOGRAPHY.small} font-semibold text-slate-900 leading-snug`}>
                {program.title}
              </h3>
            </div>
          ))}
        </AnimateOnScroll>

        <AnimateOnScroll stagger className="mt-5 grid gap-5 md:grid-cols-3">
          {trainingPrograms.slice(3, 5).map((program) => (
            <div
              key={program.title}
              className="training-card card-pop flex items-center gap-4 rounded-2xl p-5"
              style={{ '--card-accent': program.accent } as CSSProperties}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm ring-1 ring-slate-100">
                {program.icon}
              </div>

              <h3 className={`${TYPOGRAPHY.small} font-semibold text-slate-900 leading-snug`}>
                {program.title}
              </h3>
            </div>
          ))}

          <div className="flex items-center justify-center">
            <Link
              href="/courses"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-8 text-sm font-semibold text-white shadow-[0_12px_28px_-8px_rgba(59,1,11,0.45)] hover:shadow-[0_16px_36px_-8px_rgba(117,22,45,0.55)] transition"
            >
              View All Programs
              <span aria-hidden>→</span>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
      <img
        src="/assets/svg/chemistry-burner.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-6 top-1/2 h-44 w-44 -translate-y-1/2 opacity-[0.06]"
      />
    </section>
  )
}
