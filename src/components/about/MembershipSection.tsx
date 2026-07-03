import Link from 'next/link'
import { BadgeCheck, CheckCircle2, Crown, Sparkles } from 'lucide-react'
import { aboutTokens } from '@/components/about/tokens'
import { SectionHeader } from '@/components/about/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type MembershipSectionProps = {
  reasons?: string[]
}

export function MembershipSection({ reasons }: Readonly<MembershipSectionProps>) {
  const plans = [
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
      description: '',
      href: '/contact',
      badge: 'Popular',
      dark: false,
    },
  ]

  const benefits =
    reasons && reasons.length > 0
      ? reasons
      : [
          'Certified forensic training programmes',
          'Practical case-based learning and lab access',
          'Expert mentorship from practicing investigators',
          'Exclusive network of students and law enforcement partners',
        ]

  return (
    <section
      className={`${aboutTokens.sectionY} ${aboutTokens.sectionAlt} section-glow-top`}
      aria-labelledby="membership-heading"
    >
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <SectionHeader
            id="membership-heading"
            title="Membership Plans"
            subtitle="AFRS Membership is designed to create a vibrant community of students, researchers, professionals, academicians, and institutions committed to the advancement of forensic science.
Membership provides opportunities for professional networking, knowledge sharing, collaborative research, leadership development, and continued engagement with emerging trends and best practices.
AFRS provides the following types of membership: 
"
            align="left"
          />
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
            <div className="grid gap-5">
              {plans.map((plan) => (
                <Link
                  key={plan.title}
                  href={plan.href}
                  className={`group block overflow-hidden rounded-[28px] p-8 transition card-pop ${
                    plan.dark
                      ? 'bg-[var(--about-footer)] text-white shadow-[0_20px_40px_rgba(15,23,42,0.18)] hover:bg-slate-900'
                      : 'border border-slate-200 bg-white text-[var(--about-text)] shadow-[0_10px_28px_rgba(15,23,42,0.06)] hover:border-[var(--about-primary)]/30'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p
                        className={`text-xs font-semibold uppercase tracking-[0.24em] ${plan.dark ? 'text-slate-300' : 'text-[var(--about-primary)]'}`}
                      >
                        {plan.badge}
                      </p>
                      <h3 className="mt-4 text-2xl font-extrabold leading-tight">{plan.title}</h3>
                    </div>
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                        plan.dark
                          ? 'bg-white text-[var(--about-footer)]'
                          : 'bg-[var(--about-primary-soft)] text-[var(--about-primary)]'
                      }`}
                      aria-hidden
                    >
                      {plan.dark ? <Crown className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                    </span>
                  </div>
                  <p
                    className={`mt-6 text-sm leading-relaxed ${plan.dark ? 'text-slate-200/90' : 'text-slate-600'}`}
                  >
                    {plan.description}
                  </p>
                  <span
                    className={`mt-6 inline-flex items-center gap-2 text-sm font-bold transition ${
                      plan.dark ? 'text-white' : 'text-[var(--about-primary)]'
                    }`}
                  >
                    Get Started <span aria-hidden>→</span>
                  </span>
                </Link>
              ))}
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
                    Why AFRS?
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-[var(--about-text)]">
                    The membership advantage
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
