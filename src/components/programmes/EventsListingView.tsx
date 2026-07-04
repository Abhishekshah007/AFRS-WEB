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
  completed: HubEventCard[]
  initialSchedule: 'upcoming' | 'ongoing' | 'completed'
  initialNature?: 'national' | 'international' | 'all'
  initialType?: string
}

type Tab = 'upcoming' | 'ongoing' | 'completed'

/**
 * Full-page Online Events Hub with filters and Figma-aligned cards.
 */
export function EventsListingView({
  upcoming,
  ongoing,
  completed,
  initialSchedule,
  initialNature = 'all',
  initialType,
}: EventsListingViewProps) {
  const [tab, setTab] = useState<Tab>(initialSchedule)

  const filtered = useMemo(() => {
    const list = tab === 'upcoming' ? upcoming : tab === 'ongoing' ? ongoing : completed
    return list.filter((evt) => {
      if (initialNature !== 'all' && evt.eventNature !== initialNature) return false
      if (initialType && evt.eventType !== initialType) return false
      return true
    })
  }, [tab, upcoming, ongoing, completed, initialNature, initialType])

  const filterLabel = [
    initialNature !== 'all' ? initialNature : null,
    initialType ?? null,
    tab === 'upcoming' ? 'upcoming' : tab === 'ongoing' ? 'ongoing' : 'completed',
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="programmes-page bg-white min-h-screen">
      <SubPageHero
        breadcrumbs={[{ label: 'Programmes', href: '/courses' }, { label: 'Online Events Hub' }]}
        eyebrow="Connect, Learn, and Grow"
        title="Online Events Hub"
        description="Register for workshops, conferences, faculty development programmes, and training sessions with global experts."
        icon="📅"
      />

      <section className={`${programmesTokens.sectionY}`}>
        <div className={programmesTokens.container}>
          <AnimateOnScroll>
            <div className="mb-8 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--prog-primary)]">
                    Event archive and registration
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold text-slate-950">
                    {tab === 'completed'
                      ? 'Completed Events Archive'
                      : tab === 'ongoing'
                        ? 'Ongoing Programmes'
                        : 'Upcoming Registrations'}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    {tab === 'completed'
                      ? 'Browse completed AFRS events, workshops, webinars, and conferences from the archive.'
                      : 'Find active and upcoming forensic learning opportunities with the current filters applied.'}
                  </p>
                </div>
                {(initialNature !== 'all' || initialType) && (
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-500">
                    Filtered:{' '}
                    <span className="font-semibold capitalize text-slate-800">{filterLabel}</span>
                    {' · '}
                    <Link
                      href="/courses/events"
                      className="font-bold text-[var(--prog-primary)] hover:underline"
                    >
                      Clear
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="flex justify-center mb-10">
              <div
                className="inline-flex p-1 rounded-full bg-slate-100/90 border border-slate-200/80"
                role="tablist"
                aria-label="Event schedule"
              >
                {(['upcoming', 'ongoing', 'completed'] as const).map((key) => (
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
                    {key === 'upcoming'
                      ? 'Upcoming Events'
                      : key === 'ongoing'
                        ? 'Ongoing Events'
                        : 'Archive'}
                  </button>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {filtered.length === 0 ? (
            <p className="text-center text-sm text-slate-500 py-12">
              No events match this filter.{' '}
              <Link
                href="/courses/events"
                className="font-bold text-[var(--prog-primary)] hover:underline"
              >
                View all events
              </Link>{' '}
              or{' '}
              <Link
                href="/contact"
                className="font-bold text-[var(--prog-primary)] hover:underline"
              >
                contact us
              </Link>
              .
            </p>
          ) : (
            <AnimateOnScroll stagger>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filtered.map((evt) => (
                  <li key={evt.id}>
                    <EventHubCard
                      event={evt}
                      ctaLabel={tab === 'completed' ? 'View Details' : 'Register Now'}
                    />
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
          )}

          <div className="text-center mt-12">
            <Link
              href="/courses#online-events"
              className="text-sm font-bold text-[var(--prog-primary)] hover:underline"
            >
              ← Back to Programmes page
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
