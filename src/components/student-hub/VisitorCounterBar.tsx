import { CountUp } from '@/components/ui/CountUp'

export type VisitorCounterBarProps = {
  totalVisitors: number
  icon?: string
}

/**
 * Full-width visitor count strip above the global footer.
 */
export function VisitorCounterBar({ totalVisitors, icon = '👥' }: VisitorCounterBarProps) {
  return (
    <section
      className="hub-visitor-bar py-8 text-white text-center"
      aria-label="Total site visitors"
    >
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col items-center gap-2">
        <span className="flex items-center gap-2 text-2xl font-bold uppercase tracking-widest text-white/85">
          <span className="text-lg" aria-hidden>
            {icon}
          </span>
          Total Visitors
        </span>
        <p className="text-4xl sm:text-5xl font-extrabold tabular-nums">
          <CountUp end={totalVisitors} />
        </p>
      </div>
    </section>
  )
}
