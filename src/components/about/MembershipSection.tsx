'use client'

import { useId, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { BadgeCheck, CheckCircle2, Crown, Sparkles } from 'lucide-react'
import { aboutTokens } from '@/components/about/tokens'
import { SectionHeader } from '@/components/about/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import type { MembershipPlan } from '@/components/about/types'

export type MembershipSectionProps = {
  reasons?: string[]
  title?: string
  subtitle?: string
  plans?: MembershipPlan[]
  ctaLabel?: string
  advantageEyebrow?: string
  advantageTitle?: string
}

const defaultPlans: MembershipPlan[] = [
  {
    title: 'Professional Membership ',
    description:
      'Annual membership for professionals seeking to enhance their forensic expertise and stay updated with the latest advancements in the field.',
    href: '/contact',
    badge: 'Best Value',
    dark: true,
  },
  {
    title: 'Senior Membership',
    description:
      'Annual membership for professionals and students seeking a structured forensic development pathway.',
    href: '/contact',
    badge: 'Popular',
    dark: false,
  },
  {
    title: 'Academic Department Membership ',
    description:
      'Annual membership for academic departments and institutions committed to advancing forensic science education and research.',
    href: '/contact',
    badge: 'Popular',
    dark: false,
  },
]

export function MembershipSection({
  reasons,
  title = 'Membership Plans',
  subtitle = `AFRS Membership is designed to create a vibrant community of students, researchers, professionals, academicians, and institutions committed to the advancement of forensic science.
Membership provides opportunities for professional networking, knowledge sharing, collaborative research, leadership development, and continued engagement with emerging trends and best practices.
AFRS provides the following types of membership:`,
  plans = defaultPlans,
  ctaLabel = `Let's Talk 💬`,
  advantageEyebrow = 'Why AFRS?',
  advantageTitle = 'The membership advantage',
}: Readonly<MembershipSectionProps>) {
  const tabIdPrefix = useId()
  const [activeIndex, setActiveIndex] = useState(0)
  const activePlan = plans[activeIndex] ?? plans[0]

  const benefits =
    reasons && reasons.length > 0
      ? reasons
      : [
          'Certified forensic training programmes',
          'Practical case-based learning and lab access',
          'Expert mentorship from practicing investigators',
          'Exclusive network of students and law enforcement partners',
        ]

  if (!activePlan) return null

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const delta = event.key === 'ArrowRight' ? 1 : -1
    const nextIndex = (index + delta + plans.length) % plans.length
    setActiveIndex(nextIndex)
    const nextTab = document.getElementById(`${tabIdPrefix}-tab-${nextIndex}`)
    nextTab?.focus()
  }

  return (
    <section
      className={`${aboutTokens.sectionY} ${aboutTokens.sectionAlt} section-glow-top`}
      aria-labelledby="membership-heading"
    >
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <SectionHeader id="membership-heading" title={title} subtitle={subtitle} align="left" />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
            <div>
              <div
                className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="tablist"
                aria-label="Membership plans"
              >
                {plans.map((plan, index) => {
                  const selected = index === activeIndex
                  return (
                    <button
                      key={plan.title}
                      type="button"
                      role="tab"
                      id={`${tabIdPrefix}-tab-${index}`}
                      aria-selected={selected}
                      aria-controls={`${tabIdPrefix}-panel-${index}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveIndex(index)}
                      onKeyDown={(event) => onTabKeyDown(event, index)}
                      className={`min-w-[9.5rem] flex-1 shrink-0 rounded-2xl px-4 py-3 text-left text-sm font-bold transition sm:min-w-0 ${
                        selected
                          ? 'bg-[var(--about-footer)] text-white shadow-[0_10px_24px_rgba(15,23,42,0.16)]'
                          : 'border border-slate-200 bg-white text-slate-600 hover:border-[var(--about-primary)]/40 hover:text-[var(--about-primary)]'
                      }`}
                    >
                      {plan.title.trim()}
                    </button>
                  )
                })}
              </div>

              {plans.map((plan, index) => {
                const selected = index === activeIndex
                const isDark = Boolean(plan.dark)
                return (
                  <article
                    key={plan.title}
                    id={`${tabIdPrefix}-panel-${index}`}
                    role="tabpanel"
                    aria-labelledby={`${tabIdPrefix}-tab-${index}`}
                    hidden={!selected}
                    className={`mt-5 overflow-hidden rounded-[22px] p-6 transition card-pop sm:rounded-[28px] sm:p-8 ${
                      isDark
                        ? 'bg-[var(--about-footer)] text-white shadow-[0_20px_40px_rgba(15,23,42,0.18)]'
                        : 'border border-slate-200 bg-white text-[var(--about-text)] shadow-[0_10px_28px_rgba(15,23,42,0.06)]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p
                          className={`text-xs font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-slate-300' : 'text-[var(--about-primary)]'}`}
                        >
                          {plan.badge}
                        </p>
                        <h3 className="mt-4 text-2xl font-extrabold leading-tight">{plan.title.trim()}</h3>
                      </div>
                      <span
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                          isDark
                            ? 'bg-white text-[var(--about-footer)]'
                            : 'bg-[var(--about-primary-soft)] text-[var(--about-primary)]'
                        }`}
                        aria-hidden
                      >
                        {isDark ? <Crown className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                      </span>
                    </div>
                    <p
                      className={`mt-6 text-sm leading-relaxed ${isDark ? 'text-slate-200/90' : 'text-slate-600'}`}
                    >
                      {plan.description}
                    </p>
                    <Link
                      href={plan.href}
                      className={`mt-6 inline-flex items-center gap-2 text-sm font-bold transition ${
                        isDark ? 'text-white hover:text-slate-200' : 'text-[var(--about-primary)] hover:opacity-80'
                      }`}
                    >
                      {ctaLabel} <span aria-hidden>→</span>
                    </Link>
                  </article>
                )
              })}
            </div>

            <article className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white p-8 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
              <div
                className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 to-blue-500"
                aria-hidden
              />
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--about-primary)] text-white">
                  <BadgeCheck className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--about-primary)]">
                    {advantageEyebrow}
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-[var(--about-text)]">
                    {advantageTitle}
                  </h3>
                </div>
              </div>
              <ul className="mt-8 space-y-3">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-emerald-600"
                      aria-hidden
                    >
                      <CheckCircle2 className="h-5 w-5" strokeWidth={2.2} />
                    </span>
                    <p className="text-sm leading-relaxed text-slate-700">{benefit}</p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
