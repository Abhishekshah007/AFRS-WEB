import type { ListItem } from '@/components/about/types'
import { aboutTokens } from '@/components/about/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type ValuesSectionProps = {
  uniqueItems: ListItem[]
  activityItems: ListItem[]
}

function CheckList({ items }: { items: ListItem[] }) {
  return (
    <ul className="space-y-4" role="list">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--about-primary)] text-white text-xs font-bold"
            aria-hidden
          >
            ✓
          </span>
          <span className="text-sm text-slate-700 leading-relaxed">{item.text}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * Two-column “What Makes Us Unique” / “Our Core Activities” lists.
 */
export function ValuesSection({ uniqueItems, activityItems }: ValuesSectionProps) {
  const panels = [
    {
      title: 'What Makes Us Unique',
      icon: '✦',
      items: uniqueItems,
    },
    {
      title: 'Our Core Activities',
      icon: '◈',
      items: activityItems,
    },
  ]

  return (
    <section className={`${aboutTokens.sectionY} bg-white`} aria-labelledby="values-heading">
      <div className={aboutTokens.container}>
        <AnimateOnScroll stagger>
          <div className="grid gap-8 lg:grid-cols-2">
            {panels.map((panel) => (
              <div
                key={panel.title}
                className={`${aboutTokens.radiusCard} border border-blue-100 bg-[var(--about-primary-soft)]/40 p-6 sm:p-8`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--about-primary)] text-white text-lg"
                    aria-hidden
                  >
                    {panel.icon}
                  </span>
                  <h2 className={`${aboutTokens.heading} text-lg sm:text-xl`}>{panel.title}</h2>
                </div>
                <CheckList items={panel.items} />
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
