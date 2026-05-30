import { CountUp } from '@/components/ui/CountUp'

export type ArticlesStatsBarProps = {
  totalPublished: number
}

/**
 * Total articles published banner above global footer.
 */
export function ArticlesStatsBar({ totalPublished }: ArticlesStatsBarProps) {
  return (
    <section className="articles-stats-bar py-8 text-white text-center" aria-label="Total articles published">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col items-center gap-2">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/90">
          <span className="text-lg" aria-hidden>
            📄
          </span>
          Total Articles Published
        </span>
        <p className="text-4xl sm:text-5xl font-extrabold tabular-nums">
          <CountUp end={totalPublished} suffix="+" />
        </p>
      </div>
    </section>
  )
}
