import type { HelpCardItem } from '@/components/service-detail/types'
import { HelpCard } from '@/components/service-detail/HelpCard'
import { serviceDetailTokens } from '@/components/service-detail/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type HowWeHelpSectionProps = {
  items: HelpCardItem[]
  title?: string
  subtitle?: string
}

/**
 * Stacked full-width help rows — one capability per row.
 */
export function HowWeHelpSection({
  items,
  title = 'How We Can Help',
  subtitle = 'Comprehensive forensic support from scene to courtroom — delivered by certified experts using validated protocols.',
}: HowWeHelpSectionProps) {
  if (!items.length) return null

  return (
    <section
      className={`${serviceDetailTokens.sectionY} ${serviceDetailTokens.pageBg}`}
      aria-labelledby="how-we-help-heading"
    >
      <div className={serviceDetailTokens.container}>
        <AnimateOnScroll>
          <header className="mb-10 w-full max-w-none md:mb-14">
            <h2
              id="how-we-help-heading"
              className={`${serviceDetailTokens.heading} text-2xl sm:text-[30px]`}
            >
              {title}
            </h2>
            {subtitle ? (
              <p className={`mt-3 max-w-none text-sm sm:text-base ${serviceDetailTokens.body}`}>
                {subtitle}
              </p>
            ) : null}
          </header>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <ul className="grid grid-cols-1 gap-6">
            {items.map((item, index) => (
              <li key={item.id}>
                <HelpCard item={item} index={index} />
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
