import Link from 'next/link'
import { aboutTokens } from '@/components/about/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

/**
 * Individual + corporate membership plan cards.
 */
export function MembershipSection() {
  const plans = [
    {
      title: 'Individual Membership',
      description: 'For students, researchers, and forensic professionals seeking network access and resources.',
      href: '/contact',
      dark: true,
    },
    {
      title: 'Corporate Membership',
      description: 'For institutions, agencies, and firms requiring training, consultancy, and lab partnerships.',
      href: '/contact',
      dark: false,
    },
  ]

  return (
    <section className={`${aboutTokens.sectionY} ${aboutTokens.sectionAlt}`} aria-labelledby="membership-heading">
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <div className="flex items-center gap-3 mb-8">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--about-primary)] text-white"
              aria-hidden
            >
              ◈
            </span>
            <h2 id="membership-heading" className={`${aboutTokens.heading} text-2xl sm:text-[28px]`}>
              Membership Plans
            </h2>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <div className="grid gap-5 md:grid-cols-2">
            {plans.map((plan) => (
              <Link
                key={plan.title}
                href={plan.href}
                className={`group flex items-center justify-between gap-6 ${aboutTokens.radiusCard} p-6 sm:p-8 transition card-pop ${
                  plan.dark
                    ? 'bg-[var(--about-footer)] text-white hover:bg-slate-900'
                    : 'bg-white border border-slate-200 text-[var(--about-text)] hover:border-[var(--about-primary)]/30'
                }`}
              >
                <div>
                  <h3 className="font-extrabold text-lg">{plan.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${plan.dark ? 'text-white/70' : aboutTokens.body}`}>
                    {plan.description}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-2xl transition-transform group-hover:translate-x-1 ${
                    plan.dark ? 'text-white' : 'text-[var(--about-primary)]'
                  }`}
                  aria-hidden
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
