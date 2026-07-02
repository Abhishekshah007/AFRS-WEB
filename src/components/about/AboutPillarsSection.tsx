import { FlaskConical, Handshake, Scale, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { aboutTokens } from '@/components/about/tokens'
import { SectionHeader } from '@/components/about/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

type PillarProps = {
  title: string
  eyebrow: string
  items: string[]
  icon: React.ReactNode
  gradient: string
}

function PillarPanel({ title, eyebrow, items, icon, gradient }: PillarProps) {
  return (
    <article className={`relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_10px_30px_rgba(15,23,42,0.06)] card-pop`}>
      <div className={`absolute inset-x-0 top-0 h-1.5 ${gradient}`} aria-hidden />
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--about-primary-soft)] text-[var(--about-primary)]">
          {icon}
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--about-primary)]">
            {eyebrow}
          </p>
          <h3 className="mt-1 text-xl font-extrabold text-[var(--about-text)]">{title}</h3>
        </div>
      </div>
      <ul className="mt-8 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm leading-relaxed text-slate-700"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--about-primary)] text-[10px] font-bold text-white">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

type AboutPillarsSectionProps = {
  qualityEthicsItems: string[]
  researchItems: string[]
  partnershipItems: string[]
}

export function AboutPillarsSection({
  qualityEthicsItems,
  researchItems,
  partnershipItems,
}: AboutPillarsSectionProps) {
  if (!qualityEthicsItems?.length && !researchItems?.length && !partnershipItems?.length) {
    return null
  }

  return (
    <section
      className={`${aboutTokens.sectionY} ${aboutTokens.sectionAlt} section-glow-top`}
      aria-labelledby="quality-research-heading"
    >
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <SectionHeader
            id="quality-research-heading"
            title="Research, Quality & Partnerships"
            subtitle="How AFRS strengthens forensic science through evidence-based research, ethical practice, and collaborative networks."
            align="left"
          />
        </AnimateOnScroll>

        <AnimateOnScroll stagger className="grid gap-6 lg:grid-cols-3">
          {qualityEthicsItems.length > 0 && (
            <PillarPanel
              title="Quality & Ethics"
              eyebrow="Standards"
              items={qualityEthicsItems}
              icon={<ShieldCheck className="h-6 w-6" strokeWidth={2.2} />}
              gradient="bg-gradient-to-r from-indigo-500 to-violet-500"
            />
          )}
          {researchItems.length > 0 && (
            <PillarPanel
              title="Research Focus"
              eyebrow="Innovation"
              items={researchItems}
              icon={<FlaskConical className="h-6 w-6" strokeWidth={2.2} />}
              gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
            />
          )}
          {partnershipItems.length > 0 && (
            <PillarPanel
              title="Partnerships"
              eyebrow="Collaboration"
              items={partnershipItems}
              icon={<Handshake className="h-6 w-6" strokeWidth={2.2} />}
              gradient="bg-gradient-to-r from-emerald-500 to-teal-500"
            />
          )}
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Scale, label: 'Evidence-based decisions' },
              { icon: Sparkles, label: 'Continuous improvement' },
              { icon: Users, label: 'National & global outreach' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-white/80 px-4 py-3 shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--about-primary-soft)] text-[var(--about-primary)]">
                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <span className="text-sm font-semibold text-slate-700">{label}</span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
