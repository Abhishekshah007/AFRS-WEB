'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { HubEventCard } from '@/components/programmes/types'
import { EventHubCard } from '@/components/programmes/EventHubCard'
import { programmesTokens } from '@/components/programmes/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type OnlineEventsHubProps = {
  upcoming: HubEventCard[]
  ongoing: HubEventCard[]
}

type Tab = 'upcoming' | 'ongoing'

/**
 * Homepage Online Events Hub section — Figma segmented tabs and event cards.
 */
export function OnlineEventsHub({ upcoming, ongoing }: OnlineEventsHubProps) {
  const [tab, setTab] = useState<Tab>('upcoming')
  const events = useMemo(() => (tab === 'upcoming' ? upcoming : ongoing), [tab, upcoming, ongoing])

  return (
    <section
      id="online-events"
      className={`${programmesTokens.sectionY} bg-white scroll-mt-24`}
      aria-labelledby="online-events-heading"
    >
      <div className={programmesTokens.container}>
        <AnimateOnScroll>
          <header className="text-center max-w-2xl mx-auto mb-10">
            <h2 id="online-events-heading" className={`${programmesTokens.heading} text-2xl sm:text-[28px]`}>
              Online Events Hub
            </h2>
            <p className={`mt-3 text-sm ${programmesTokens.body}`}>
              Connect, Learn, and Grow with Global Experts
            </p>
          </header>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="flex justify-center mb-10">
            <div
              className="inline-flex p-1 rounded-full bg-slate-100/90 border border-slate-200/80"
              role="tablist"
              aria-label="Event schedule"
            >
              {(['upcoming', 'ongoing'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`rounded-full px-6 py-2.5 text-sm font-bold transition min-w-[140px] ${
                    tab === key
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {key === 'upcoming' ? 'Upcoming Events' : 'Ongoing Events'}
                </button>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {events.length === 0 ? (
          <p className="text-center text-sm text-slate-500 py-8">
            No {tab === 'upcoming' ? 'upcoming' : 'ongoing'} events right now.{' '}
            <Link href="/courses/events" className="font-bold text-[var(--prog-primary)] hover:underline">
              Browse all events
            </Link>
            .
          </p>
        ) : (
          <AnimateOnScroll stagger>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {events.map((evt) => (
                <li key={evt.id}>
                  <EventHubCard event={evt} />
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        )}

        <div className="text-center mt-10">
          <Link
            href="/courses/events"
            className="inline-flex h-11 items-center justify-center rounded-xl text-sm font-bold text-[var(--prog-primary)] hover:underline"
          >
            View all events →
          </Link>
        </div>
      </div>
    </section>
  )
}
