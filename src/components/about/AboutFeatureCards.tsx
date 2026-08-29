import type { CSSProperties } from 'react'
import {
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  FlaskConical,
  Globe,
  GraduationCap,
  Handshake,
  Lightbulb,
  Microscope,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { aboutTokens } from '@/components/about/tokens'
import { SectionHeader } from '@/components/about/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

const iconCycle: LucideIcon[] = [
  Microscope,
  ShieldCheck,
  GraduationCap,
  Target,
  FlaskConical,
  Scale,
  BookOpen,
  Briefcase,
  Globe,
  Users,
  Award,
  Lightbulb,
  Handshake,
  Sparkles,
  BadgeCheck,
]

const accentCycle = [
  { bg: 'bg-brand-50', text: 'text-brand-600', bar: '#3B010B' },
  { bg: 'bg-brand-100', text: 'text-brand-700', bar: '#560B18' },
  { bg: 'bg-brand-50', text: 'text-brand-500', bar: '#75162D' },
  { bg: 'bg-brand-200/40', text: 'text-brand-600', bar: '#F2D9A0' },
  { bg: 'bg-brand-100', text: 'text-brand-500', bar: '#75162D' },
  { bg: 'bg-brand-50', text: 'text-brand-700', bar: '#560B18' },
]

type AboutFeatureCardsProps = {
  id: string
  title: string
  subtitle?: string
  items: string[]
  variant?: 'grid' | 'compact'
  surface?: 'white' | 'alt'
}

export function AboutFeatureCards({
  id,
  title,
  subtitle,
  items,
  variant = 'grid',
  surface = 'white',
}: AboutFeatureCardsProps) {
  if (!items?.length) return null

  const surfaceClass = surface === 'alt' ? aboutTokens.sectionAlt : 'bg-white'

  return (
    <section className={`${aboutTokens.sectionY} ${surfaceClass} section-glow-top`} aria-labelledby={id}>
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <SectionHeader id={id} title={title} subtitle={subtitle} align="left" />
        </AnimateOnScroll>

        <AnimateOnScroll stagger className={variant === 'compact' ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
          {items.map((item, index) => {
            const Icon = iconCycle[index % iconCycle.length]
            const accent = accentCycle[index % accentCycle.length]

            return (
              <article
                key={item}
                className="about-feature-card card-pop group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
                style={{ '--card-accent': accent.bar } as CSSProperties}
              >
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${accent.bg} ${accent.text} shadow-sm ring-1 ring-white/80`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </div>
                <h3 className="mt-4 text-sm font-bold leading-snug text-slate-900 group-hover:text-[var(--about-primary)] transition-colors">
                  {item}
                </h3>
              </article>
            )
          })}
        </AnimateOnScroll>
      </div>
    </section>
  )
}
