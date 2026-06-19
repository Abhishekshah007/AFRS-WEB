import Link from 'next/link'
import { aboutTokens } from '@/components/about/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

/**
 * Individual + corporate membership plan cards.
 */
export function MembershipSection() {
  const plans = [
    {
      title: 'Life Time Membership',
      description:
        'Unlimited access to AFRS resources, accredited training, and community support with a single one-time fee.',
      href: '/contact',
      badge: 'Best Value',
      dark: true,
    },
    {
      title: 'One Year Membership',
      description:
        'Flexible annual membership for professionals and students seeking a structured forensic development pathway.',
      href: '/contact',
      badge: 'Popular',
      dark: false,
    },
  ]

  const benefits = [
    'Certified forensic training programmes',
    'Practical case-based learning and lab access',
    'Expert mentorship from practicing investigators',
    'Exclusive network of students and law enforcement partners',
  ]

  return (
    <section
      className={`${aboutTokens.sectionY} ${aboutTokens.sectionAlt}`}
      aria-labelledby="membership-heading"
    >
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <div className="flex items-center gap-3 mb-8">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--about-primary) text-white"
              aria-hidden
            >
              ◈
            </span>
            <h2
              id="membership-heading"
              className={`${aboutTokens.heading} text-2xl sm:text-[28px]`}
            >
              Membership Plans
            </h2>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <div className="grid gap-5">
              {plans.map((plan) => (
                <Link
                  key={plan.title}
                  href={plan.href}
                  className={`group block overflow-hidden rounded-[28px] p-8 transition shadow-lg ${
                    plan.dark
                      ? 'bg-(--about-footer) text-white hover:bg-slate-900'
                      : 'bg-white border border-slate-200 text-(--about-text) shadow-sm hover:border-(--about-primary)/30'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
                        {plan.badge}
                      </p>
                      <h3 className="mt-4 text-2xl font-extrabold leading-tight">{plan.title}</h3>
                    </div>
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-bold transition ${
                        plan.dark ? 'text-(--about-footer)' : 'text-(--about-primary)'
                      }`}
                      aria-hidden
                    >
                      ✓
                    </span>
                  </div>
                  <p
                    className={`mt-6 text-sm leading-relaxed ${plan.dark ? 'text-slate-200/90' : 'text-slate-600'}`}
                  >
                    {plan.description}
                  </p>
                  <span
                    className={`mt-6 inline-flex items-center gap-2 text-sm font-bold transition ${
                      plan.dark ? 'text-white' : 'text-(--about-primary)'
                    }`}
                  >
                    Get Started <span aria-hidden>→</span>
                  </span>
                </Link>
              ))}
            </div>

            <article
              className={`${aboutTokens.radiusCard} border border-slate-200 bg-white p-8 shadow-sm`}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--about-primary) text-white text-lg">
                  ?
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--about-primary)">
                    Why AFRS?
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold text-(--about-text)">
                    The membership advantage
                  </h3>
                </div>
              </div>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-(--about-primary) text-xs text-white">
                      ✓
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
