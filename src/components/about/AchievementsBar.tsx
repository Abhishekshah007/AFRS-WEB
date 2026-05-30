import type { AchievementStat } from '@/components/about/types'
import { aboutTokens } from '@/components/about/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CountUp } from '@/components/ui/CountUp'
import { SectionHeader } from '@/components/about/SectionHeader'

const toneClasses: Record<AchievementStat['tone'], string> = {
  blue: 'bg-[var(--about-stat-blue)]',
  purple: 'bg-[var(--about-stat-purple)]',
  orange: 'bg-[var(--about-stat-orange)]',
  green: 'bg-[var(--about-stat-green)]',
  red: 'bg-[var(--about-stat-red)]',
}

export type AchievementsBarProps = {
  stats: AchievementStat[]
}

/**
 * Colored stat tiles — numbers animate when scrolled into view.
 */
export function AchievementsBar({ stats }: AchievementsBarProps) {
  return (
    <section className={`${aboutTokens.sectionY} bg-white`} aria-labelledby="achievements-heading">
      <div className={aboutTokens.container}>
        <AnimateOnScroll>
          <SectionHeader
            id="achievements-heading"
            title="Our Achievements"
            subtitle="Milestones that reflect our scale, consistency, and forensic impact."
          />
        </AnimateOnScroll>

        <AnimateOnScroll stagger>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <li key={stat.label}>
                <div
                  className={`${toneClasses[stat.tone]} ${aboutTokens.radiusCard} py-8 px-4 text-center text-white card-pop min-h-[120px] flex flex-col justify-center`}
                >
                  <p className="text-2xl sm:text-3xl font-extrabold tabular-nums">
                    {stat.numericEnd != null ? (
                      <CountUp end={stat.numericEnd} suffix={stat.suffix ?? ''} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="mt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/90">
                    {stat.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
