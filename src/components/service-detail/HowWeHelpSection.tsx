import type { HelpCardItem } from '@/components/service-detail/types'
import { HelpCard } from '@/components/service-detail/HelpCard'
import { serviceDetailTokens } from '@/components/service-detail/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type HowWeHelpSectionProps = {
  items: HelpCardItem[]
}

/**
 * Centered header + responsive grid of help cards (wide card spans 2 cols on desktop).
 */
export function HowWeHelpSection({ items }: HowWeHelpSectionProps) {
  return (
    <section
      className={`${serviceDetailTokens.sectionY} ${serviceDetailTokens.pageBg}`}
      aria-labelledby="how-we-help-heading"
    >
      <div className={serviceDetailTokens.container}>
        <AnimateOnScroll>
          <header className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <h2 id="how-we-help-heading" className={`${serviceDetailTokens.heading} text-2xl sm:text-[30px]`}>
              How We Can Help
            </h2>
            <p className={`mt-3 text-sm sm:text-base ${serviceDetailTokens.body}`}>
              Comprehensive forensic support from scene to courtroom — delivered by certified experts using
              validated protocols.
            </p>
          </header>
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {items.map((item) => (
              <li key={item.id} className={item.wide ? 'md:col-span-2 lg:col-span-2' : undefined}>
                <HelpCard item={item} />
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
