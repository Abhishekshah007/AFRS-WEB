'use client'

import { useEffect, useState } from 'react'
import { CountUp } from '@/components/ui/CountUp'
import { VISITOR_COUNT_EVENT } from '@/lib/site/visitorCountEvent'

export type VisitorCounterBarProps = {
  totalVisitors: number
}

/**
 * Full-width visitor count strip above the global footer.
 */
export function VisitorCounterBar({ totalVisitors }: VisitorCounterBarProps) {
  const [trackedTotal, setTrackedTotal] = useState(totalVisitors)

  useEffect(() => {
    const updateCount = (event: Event) => {
      const count = (event as CustomEvent<number>).detail
      if (Number.isFinite(count) && count >= 0) setTrackedTotal(count)
    }

    window.addEventListener(VISITOR_COUNT_EVENT, updateCount)
    return () => window.removeEventListener(VISITOR_COUNT_EVENT, updateCount)
  }, [])

  return (
    <section
      className="hub-visitor-bar py-8 text-white text-center"
      aria-label="Total site visitors"
    >
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col items-center gap-2">
        <span className="flex items-center gap-2 text-2xl font-bold uppercase tracking-widest text-white/85">
          <span className="text-lg" aria-hidden>
            👥
          </span>
          Total Visitors
        </span>
        <p className="text-4xl sm:text-5xl font-extrabold tabular-nums">
          <CountUp end={Math.max(totalVisitors, trackedTotal)} />
        </p>
      </div>
    </section>
  )
}
