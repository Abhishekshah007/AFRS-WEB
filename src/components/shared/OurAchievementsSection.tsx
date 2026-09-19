import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type AchievementDisplayItem = {
  value: string
  label: string
  tone?: string | null
}

const CARD_BACKGROUNDS = [
  'bg-[#4F86E8]',
  'bg-[#EF4444]',
  'bg-[#F97316]',
  'bg-[#10B981]',
  'bg-[#C9924A]',
] as const

const TONE_BACKGROUNDS: Record<string, string> = {
  blue: 'bg-[#4F86E8]',
  indigo: 'bg-[#4F86E8]',
  red: 'bg-[#EF4444]',
  purple: 'bg-[#EF4444]',
  orange: 'bg-[#F97316]',
  emerald: 'bg-[#10B981]',
  green: 'bg-[#10B981]',
}

function cardBackground(tone: string | null | undefined, index: number): string {
  if (tone && TONE_BACKGROUNDS[tone]) return TONE_BACKGROUNDS[tone]
  return CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length]
}

type OurAchievementsSectionProps = {
  items: AchievementDisplayItem[]
  className?: string
  title?: string
  subtitle?: string
}

/**
 * Colorful achievement stat row — shared by home and about pages.
 */
export function OurAchievementsSection({
  items,
  className = 'py-16 sm:py-20 bg-[var(--brand-surface)] section-glow-top',
  title = 'Our Achievements',
  subtitle = 'Making a difference in forensic science education',
}: OurAchievementsSectionProps) {
  if (items.length === 0) return null

  return (
    <section className={className} aria-labelledby="our-achievements-heading">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-16">
        <SectionHeader id="our-achievements-heading" title={title} subtitle={subtitle} />

        <AnimateOnScroll stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className={`${cardBackground(item.tone, index)} flex h-[110px] flex-col items-center justify-center rounded-2xl px-4 text-center shadow-[0_8px_20px_rgba(15,23,42,0.08)]`}
            >
              <p className="text-3xl font-extrabold leading-none text-white sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-white/95 sm:text-xs">
                {item.label}
              </p>
            </div>
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  )
}
