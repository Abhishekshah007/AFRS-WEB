import type { CSSProperties } from 'react'
import { Award, BadgeCheck, CheckCircle2, Shield } from 'lucide-react'
import type { CertificationItem } from '@/components/about/types'
import { aboutTokens } from '@/components/about/tokens'
import { SectionHeader } from '@/components/about/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type CertificationsSectionProps = {
  items: CertificationItem[]
}

const certIconCycle = [BadgeCheck, Award, Shield, CheckCircle2]
const certAccents = [
  { bg: 'bg-indigo-50', text: 'text-indigo-600', bar: '#6366f1' },
  { bg: 'bg-blue-50', text: 'text-blue-600', bar: '#3b82f6' },
  { bg: 'bg-violet-50', text: 'text-violet-600', bar: '#8b5cf6' },
  { bg: 'bg-emerald-50', text: 'text-emerald-600', bar: '#10b981' },
]

export function CertificationsSection({ items }: Readonly<CertificationsSectionProps>) {
  return (
    <section
      className={`${aboutTokens.sectionY} ${aboutTokens.sectionAlt} section-glow-top`}
      aria-labelledby="certs-heading"
    >
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <SectionHeader
            id="certs-heading"
            title="Professional Certifications"
            subtitle="AFRS maintains rigorous standards through accredited programmes, laboratory protocols, and professional memberships recognized across the forensic science community."
            align="left"
          />
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => {
              const Icon = certIconCycle[index % certIconCycle.length]
              const accent = certAccents[index % certAccents.length]
              return (
                <li key={item.title}>
                  <article
                    className="about-feature-card card-pop group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.07)] transition hover:shadow-lg hover:-translate-y-1"
                    style={{ '--card-accent': accent.bar } as CSSProperties}
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-1.5"
                      style={{ background: accent.bar }}
                      aria-hidden
                    />
                    <div
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${accent.bg} ${accent.text} shadow-sm ring-1 ring-white/80`}
                    >
                      <Icon className="h-7 w-7" strokeWidth={2.2} aria-hidden />
                    </div>
                    <h3 className="mt-5 text-base font-extrabold leading-snug text-[var(--about-text)] group-hover:text-[var(--about-primary)] transition-colors">
                      {item.title}
                    </h3>
                    <p className={`mt-3 flex-1 text-sm leading-relaxed ${aboutTokens.body}`}>
                      {item.description}
                    </p>
                    {/* <p className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--about-primary)]">
                      Verified Standard <span aria-hidden>→</span>
                    </p> */}
                  </article>
                </li>
              )
            })}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
