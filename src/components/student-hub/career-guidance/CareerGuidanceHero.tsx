import Link from 'next/link'
import { ArrowRight, BookOpen, Compass, Users } from 'lucide-react'
import { HeroStagger, HeroStaggerItem } from '@/components/motion/HeroStagger'
import { studentHubTokens } from '@/components/student-hub/tokens'
import type { CareerGuidancePageContent } from '@/components/student-hub/career-guidance/types'

type Props = Pick<
  CareerGuidancePageContent,
  | 'heroEyebrow'
  | 'heroTitle'
  | 'heroHighlight'
  | 'heroDescription'
  | 'heroBody'
  | 'heroNote'
  | 'heroCtaLabel'
  | 'heroCtaHref'
>

const highlights = [
  { icon: Compass, label: 'Career pathways & specialisations' },
  { icon: BookOpen, label: 'Academic planning & exam prep' },
  { icon: Users, label: 'One-to-one guidance sessions' },
]

export function CareerGuidanceHero({
  heroEyebrow,
  heroTitle,
  heroHighlight,
  heroDescription,
  heroBody,
  heroNote,
  heroCtaLabel,
  heroCtaHref,
}: Props) {
  const ctaClass =
    'inline-flex h-11 items-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-bold text-white transition hover:bg-brand-700'

  return (
    <section className="career-guidance-hero relative overflow-hidden border-b border-slate-100">
      <div className={`relative z-10 ${studentHubTokens.container} py-10 sm:py-14 lg:py-16`}>
        <nav
          className="mb-8 flex items-center gap-2 text-xs text-slate-500"
          aria-label="Breadcrumb"
        >
          <Link href="/student-hub" className="transition hover:text-[var(--hub-primary)]">
            Student Hub
          </Link>
          <span aria-hidden>/</span>
          <span className="font-semibold text-slate-700">Career Guidance</span>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <HeroStagger className="text-left">
            <HeroStaggerItem>
              <span className="inline-flex items-center rounded-full border border-brand-200/80 bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">
                {heroEyebrow}
              </span>
            </HeroStaggerItem>

            <HeroStaggerItem>
              <h1 className="mt-5 text-[2rem] font-extrabold leading-[1.12] tracking-tight text-[var(--hub-text)] sm:text-4xl lg:text-[2.75rem]">
                {heroTitle} <span className="text-[var(--hub-primary)]">{heroHighlight}</span>
              </h1>
            </HeroStaggerItem>

            <HeroStaggerItem>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-[17px] text-justify">
                {heroDescription}
              </p>
            </HeroStaggerItem>

            <HeroStaggerItem>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {heroCtaHref.startsWith('#') ? (
                  <a href={heroCtaHref} className={ctaClass}>
                    {heroCtaLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                ) : (
                  <Link href={heroCtaHref} className={ctaClass}>
                    {heroCtaLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                )}
                <a
                  href="#careers"
                  className="inline-flex h-11 items-center rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-700 transition hover:border-brand-200 hover:text-brand-700"
                >
                  Explore pathways
                </a>
              </div>
            </HeroStaggerItem>
          </HeroStagger>

          <div className="career-guidance-hero-panel rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_-24px_rgba(59,1,11,0.18)] sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
              How AFRS supports you
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 text-justify">{heroBody}</p>

            <ul className="mt-6 space-y-3">
              {highlights.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-sm font-medium text-slate-700"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50/80 px-4 py-3">
              <p className="text-xs leading-relaxed text-amber-900/80">{heroNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
