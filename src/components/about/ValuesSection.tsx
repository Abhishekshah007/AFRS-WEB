import { Activity, BookOpen, CheckCircle2, FlaskConical, Sparkles, Users } from 'lucide-react'
import type { ListItem } from '@/components/about/types'
import { aboutTokens } from '@/components/about/tokens'
import { SectionHeader } from '@/components/about/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type ValuesSectionProps = {
  uniqueItems: ListItem[]
  activityItems: ListItem[]
}

const uniqueIcons = [Sparkles, BookOpen, Users, Activity, CheckCircle2]
const activityIcons = [FlaskConical, Activity, BookOpen, Users, CheckCircle2]

function ValuePanel({
  title,
  subtitle,
  items,
  icons,
  accent,
}: Readonly<{
  title: string
  subtitle: string
  items: ListItem[]
  icons: (typeof Activity)[]
  accent: 'indigo' | 'blue'
}>) {
  const headerIcon = accent === 'indigo' ? Sparkles : Activity
  const HeaderIcon = headerIcon
  const panelGradient =
    accent === 'indigo'
      ? 'from-indigo-500/10 via-white to-violet-50/40'
      : 'from-blue-500/10 via-white to-cyan-50/40'

  return (
    <article
      className={`relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br ${panelGradient} p-6 sm:p-8 shadow-[0_10px_30px_rgba(15,23,42,0.06)] card-pop`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--about-primary)] text-white shadow-md">
          <HeaderIcon className="h-6 w-6" strokeWidth={2.2} />
        </div>
        <div>
          <h2 className={`${aboutTokens.heading} text-xl sm:text-2xl`}>{title}</h2>
          <p className={`mt-2 text-sm ${aboutTokens.body}`}>{subtitle}</p>
        </div>
      </div>

      <ul className="mt-8 grid gap-3 sm:grid-cols-1">
        {items.map((item, i) => {
          const Icon = icons[i % icons.length]
          return (
            <li
              key={`${item.text}-${i}`}
              className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--about-primary-soft)] text-[var(--about-primary)]"
                aria-hidden
              >
                <Icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="text-sm leading-relaxed text-slate-700">{item.text}</span>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export function ValuesSection({ uniqueItems, activityItems }: Readonly<ValuesSectionProps>) {
  return (
    <section
      className={`${aboutTokens.sectionY} bg-white section-glow-top`}
      aria-labelledby="values-heading"
    >
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <SectionHeader
            id="values-heading"
            title="What Sets AFRS Apart"
            subtitle="Our unique strengths and core activities that define how we serve students, professionals, and institutions."
            align="left"
          />
        </AnimateOnScroll>

        <AnimateOnScroll stagger className="grid gap-8 lg:grid-cols-2">
          <ValuePanel
            title="What Makes Us Unique"
            subtitle="Differentiators that shape our forensic education and research ecosystem."
            items={uniqueItems}
            icons={uniqueIcons}
            accent="indigo"
          />
          <ValuePanel
            title="Our Core Activities"
            subtitle="Programmes and services that translate forensic science into real-world impact."
            items={activityItems}
            icons={activityIcons}
            accent="blue"
          />
        </AnimateOnScroll>
      </div>
    </section>
  )
}
