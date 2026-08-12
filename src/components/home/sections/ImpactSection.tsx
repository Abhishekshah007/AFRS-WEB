import type { ImpactStat } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { TYPOGRAPHY, UI } from '../design'
import { CONTAINER, defaultImpactStats, SECTION } from './constants'

export function ImpactSection({ impactStats }: { impactStats: PaginatedDocs<ImpactStat> }) {
  const items = impactStats.docs.length ? impactStats.docs : defaultImpactStats

  const cardColors = [
    'bg-[#4F86E8]', // blue
    'bg-[#EF4444]', // red
    'bg-[#F97316]', // orange
    'bg-[#10B981]', // emerald (green)
    'bg-[#F97316]', // orange
  ]

  return (
    <section className={`${SECTION} ${UI.sectionSurface} section-glow-top`}>
      <div className={CONTAINER}>
        <SectionHeader
          title="Our Achievements"
          subtitle="Making a difference in forensic science education"
        />

        <AnimateOnScroll stagger className="grid gap-4 md:grid-cols-5">
          {items.map((item, index) => (
            <div
              key={item.label}
              className={`
                ${cardColors[index]}
                h-[110px]
                rounded-[16px]
                shadow-[0_8px_20px_rgba(15,23,42,0.08)]
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-4
              `}
            >
              <div className="text-3xl sm:text-4xl leading-none font-extrabold text-white">
                {item.value}
              </div>

              <div className={`mt-2 ${TYPOGRAPHY.label} text-white/95`}>{item.label}</div>
            </div>
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  )
}
