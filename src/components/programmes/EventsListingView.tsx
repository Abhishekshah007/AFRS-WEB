'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { HubEventCard } from '@/components/programmes/types'
import { EventHubCard } from '@/components/programmes/EventHubCard'
import { SubPageHero } from '@/components/programmes/SubPageHero'
import { programmesTokens } from '@/components/programmes/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type EventsListingViewProps = {
  upcoming: HubEventCard[]
  ongoing: HubEventCard[]
  initialSchedule: 'upcoming' | 'ongoing'
  initialNature?: 'national' | 'international' | 'all'
  initialType?: string
}

type Tab = 'upcoming' | 'ongoing'

/**
 * Full-page Online Events Hub with filters and Figma-aligned cards.
 */
export function EventsListingView({
  upcoming,
  ongoing,
  initialSchedule,
  initialNature = 'all',
  initialType,
}: EventsListingViewProps) {
  const [tab, setTab] = useState<Tab>(initialSchedule)

  const filtered = useMemo(() => {
    const list = tab === 'upcoming' ? upcoming : ongoing
    return list.filter((evt) => {
      if (initialNature !== 'all' && evt.eventNature !== initialNature) return false
      if (initialType && evt.eventType !== initialType) return false
      return true
    })
  }, [tab, upcoming, ongoing, initialNature, initialType])

  const filterLabel = [
    initialNature !== 'all' ? initialNature : null,
    initialType ?? null,
    tab === 'upcoming' ? 'upcoming' : 'ongoing',
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="programmes-page bg-white min-h-screen">
      <SubPageHero
        breadcrumbs={[
          { label: 'Programmes', href: '/courses' },
          { label: 'Online Events Hub' },
        ]}
        eyebrow="Connect, Learn, and Grow"
        title="Online Events Hub"
        description="Register for workshops, conferences, faculty development programmes, and training sessions with global experts."
        icon="📅"
      />

      <section className={`${programmesTokens.sectionY}`}>
        <div className={programmesTokens.container}>
          {(initialNature !== 'all' || initialType) && (
            <p className="text-center text-xs text-slate-500 mb-6">
              Filtered: <span className="font-semibold capitalize">{filterLabel}</span>
              {' · '}
              <Link href="/courses/events" className="text-[var(--prog-primary)] font-bold hover:underline">
                Clear filters
              </Link>
            </p>
          )}

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

          {filtered.length === 0 ? (
            <p className="text-center text-sm text-slate-500 py-12">
              No events match this filter.{' '}
              <Link href="/courses/events" className="font-bold text-[var(--prog-primary)] hover:underline">
                View all events
              </Link>{' '}
              or{' '}
              <Link href="/contact" className="font-bold text-[var(--prog-primary)] hover:underline">
                contact us
              </Link>
              .
            </p>
          ) : (
            <AnimateOnScroll stagger>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filtered.map((evt) => (
                  <li key={evt.id}>
                    <EventHubCard event={evt} />
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
          )}

          <div className="text-center mt-12">
            <Link href="/courses#online-events" className="text-sm font-bold text-[var(--prog-primary)] hover:underline">
              ← Back to Programmes page
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
