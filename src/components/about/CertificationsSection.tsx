import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Award, BadgeCheck, CheckCircle2, Shield } from 'lucide-react'
import type { CertificationItem } from '@/components/about/types'
import { aboutTokens } from '@/components/about/tokens'
import { SectionHeader } from '@/components/about/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type CertificationsSectionProps = {
  items: CertificationItem[]
  title?: string
  subtitle?: string
}

const certIconCycle = [BadgeCheck, Award, Shield, CheckCircle2]
const certAccents = [
  { bg: 'bg-indigo-50', text: 'text-indigo-600', bar: '#6366f1' },
  { bg: 'bg-blue-50', text: 'text-blue-600', bar: '#3b82f6' },
  { bg: 'bg-violet-50', text: 'text-violet-600', bar: '#8b5cf6' },
  { bg: 'bg-emerald-50', text: 'text-emerald-600', bar: '#10b981' },
]

export function CertificationsSection({
  items,
  title = 'Certification and Recognition',
  subtitle = 'AFRS maintains rigorous standards through accredited programmes, laboratory protocols, and professional memberships recognized across the forensic science community.',
}: Readonly<CertificationsSectionProps>) {
  return (
    <section
      className={`${aboutTokens.sectionY} ${aboutTokens.sectionAlt} section-glow-top`}
      aria-labelledby="certs-heading"
    >
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <SectionHeader id="certs-heading" title={title} subtitle={subtitle} align="left" />
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {items.map((item, index) => {
              const Icon = certIconCycle[index % certIconCycle.length]
              const accent = certAccents[index % certAccents.length]
              const cardBody = (
                <article
                  className="about-feature-card card-pop group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition hover:shadow-lg hover:-translate-y-1"
                  style={{ '--card-accent': accent.bar } as CSSProperties}
                >
                  <span
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{ background: accent.bar }}
                    aria-hidden
                  />
                  <div className="flex min-h-20 items-center justify-center">
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        alt={`${item.title} logo`}
                        width={112}
                        height={72}
                        className="max-h-16 w-auto object-contain transition duration-300 group-hover:scale-105"
                        sizes="112px"
                        unoptimized={item.icon.endsWith('.svg')}
                      />
                    ) : (
                      <div
                        className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${accent.bg} ${accent.text} shadow-sm ring-1 ring-white/80`}
                      >
                        <Icon className="h-7 w-7" strokeWidth={2.2} aria-hidden />
                      </div>
                    )}
                  </div>
                  <h3 className="mt-5 text-center text-sm font-extrabold leading-snug text-[var(--about-text)] transition-colors group-hover:text-[var(--about-primary)]">
                    {item.title}
                  </h3>
                  {item.issuer && (
                    <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {item.issuer}
                    </p>
                  )}
                  {item.description && (
                    <p className="mt-3 text-center text-xs leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  )}
                </article>
              )

              return (
                <li key={item.title}>
                  {item.href ? (
                    <Link href={item.href} target="_blank" rel="noreferrer" className="block h-full">
                      {cardBody}
                    </Link>
                  ) : (
                    cardBody
                  )}
                </li>
              )
            })}
          </ul>
          <p className="mt-8 text-justify text-sm sm:text-base text-[var(--about-text)]">
            AFRS recognizes the importance of quality assurance, professional recognition, and
            institutional credibility.
          </p>
          <p className="mt-4 text-justify text-sm sm:text-base text-[var(--about-text)]">
            The organization continuously strives to align its activities with recognized standards,
            professional guidelines, and best practices through relevant certifications,
            affiliations, registrations, and strategic partnerships that strengthen trust and
            accountability.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
