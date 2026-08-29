import { MapPin } from 'lucide-react'
import { aboutTokens } from '@/components/about/tokens'
import { SectionHeader } from '@/components/about/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

type AboutRoadmapSectionProps = {
  items: string[]
  title?: string
  subtitle?: string
  eyebrow?: string
  cardTitle?: string
  cardBody?: string
}

export function AboutRoadmapSection({
  items,
  title = 'Future Roadmap',
  subtitle = 'What AFRS is building next for forensic education, research, and professional excellence.',
  eyebrow = '2026 & Beyond',
  cardTitle = 'Building the next generation of forensic science',
  cardBody = 'Our roadmap focuses on research depth, international collaboration, and technology-led forensic capacity building across India.',
}: AboutRoadmapSectionProps) {
  if (!items?.length) return null

  return (
    <section
      className={`${aboutTokens.sectionY} bg-white`}
      aria-labelledby="future-roadmap-heading"
    >
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <SectionHeader
            id="future-roadmap-heading"
            title={title}
            subtitle={subtitle}
            align="left"
          />
        </AnimateOnScroll>

        <div className="mt-12 grid gap-8 lg:grid-cols-[300px_1fr] lg:items-start">
          {/* ── Left card ── */}
          <AnimateOnScroll direction="left">
            <div className="rounded-3xl border border-brand-100 bg-brand-50 p-7 shadow-sm">
              {/* Icon square */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--about-primary)] text-white shadow-md shadow-brand-300/40">
                <MapPin className="h-5 w-5" strokeWidth={2} />
              </div>

              {/* Eyebrow */}
              <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--about-primary)]">
                {eyebrow}
              </p>

              {/* Title */}
              <h3 className="mt-2 text-[22px] font-extrabold text-slate-900 leading-[1.25] tracking-tight">
                {cardTitle}
              </h3>

              {/* Body */}
              <p className="mt-4 text-[13px] text-slate-500 leading-relaxed">{cardBody}</p>
            </div>
          </AnimateOnScroll>

          {/* ── Numbered list ── */}
          <AnimateOnScroll stagger>
            <ol className="space-y-5">
              {items.map((item, index) => (
                <li key={item} className="flex items-center gap-5">
                  {/* Number bubble — no absolute positioning, pure flex */}
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--about-primary)] text-[13px] font-extrabold text-white shadow-sm shadow-brand-300/40"
                    aria-hidden
                  >
                    {index + 1}
                  </span>

                  {/* Text */}
                  <p className="text-[14px] font-medium text-slate-700 leading-relaxed">{item}</p>
                </li>
              ))}
            </ol>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
