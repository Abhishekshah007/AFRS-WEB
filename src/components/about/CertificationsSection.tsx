import Link from 'next/link'
import type { CertificationItem } from '@/components/about/types'
import { aboutTokens } from '@/components/about/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type CertificationsSectionProps = {
  items: CertificationItem[]
}

/**
 * Four-column certification cards with icon, title, and read-more link.
 */
export function CertificationsSection({ items }: CertificationsSectionProps) {
  return (
    <section className={`${aboutTokens.sectionY} ${aboutTokens.sectionAlt}`} aria-labelledby="certs-heading">
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end mb-10 md:mb-12">
            <h2 id="certs-heading" className={`${aboutTokens.heading} text-2xl sm:text-[28px]`}>
              Professional Certifications
            </h2>
            <p className={`text-sm sm:text-base ${aboutTokens.body}`}>
              AFRS maintains rigorous standards through accredited programmes, laboratory protocols, and
              professional memberships recognized across the forensic science community.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((item) => (
              <li key={item.title}>
                <article
                  className={`${aboutTokens.radiusCard} bg-white border border-slate-100 p-6 shadow-sm card-pop h-full flex flex-col`}
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--about-primary-soft)] text-xl"
                    aria-hidden
                  >
                    {item.icon}
                  </span>
                  <h3 className="mt-4 font-extrabold text-[var(--about-text)] text-sm leading-snug">{item.title}</h3>
                  <p className={`mt-2 text-xs flex-1 ${aboutTokens.body}`}>{item.description}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[var(--about-primary)] hover:underline"
                  >
                    Read More <span aria-hidden>→</span>
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
