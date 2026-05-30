'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { HubEventCard } from '@/components/programmes/types'
import { eventVisualClass } from '@/components/programmes/content'
import { programmesTokens } from '@/components/programmes/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type OnlineEventsHubProps = {
  upcoming: HubEventCard[]
  ongoing: HubEventCard[]
}

type Tab = 'upcoming' | 'ongoing'

function formatCardDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Online Events Hub with Upcoming / Ongoing tabs and event cards.
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
              Register for workshops, conferences, and training sessions hosted by AFRS faculty and guest experts.
            </p>
          </header>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div
            className="flex justify-center gap-2 mb-10"
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
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition ${
                  tab === key
                    ? 'bg-[var(--prog-primary)] text-white shadow-md'
                    : 'bg-white text-[var(--prog-primary)] border border-[var(--prog-primary)]/30 hover:bg-[var(--prog-primary-soft)]'
                }`}
              >
                {key === 'upcoming' ? 'Upcoming Events' : 'Ongoing Events'}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        {events.length === 0 ? (
          <p className="text-center text-sm text-slate-500 py-8">
            No {tab === 'upcoming' ? 'upcoming' : 'ongoing'} events at the moment. Check back soon or{' '}
            <Link href="/contact" className="font-bold text-[var(--prog-primary)] hover:underline">
              contact us
            </Link>
            .
          </p>
        ) : (
          <AnimateOnScroll stagger>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((evt) => (
                <li key={evt.id}>
                  <article className={`${programmesTokens.radiusCard} border border-slate-100 bg-white shadow-sm overflow-hidden card-pop flex flex-col h-full`}>
                    <div
                      className={`flex h-36 items-center justify-center text-5xl ${eventVisualClass[evt.visualTone]}`}
                      aria-hidden
                    >
                      {evt.visualIcon}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-bold text-slate-600 capitalize">
                          {evt.eventTypeLabel}
                        </span>
                        <time dateTime={evt.startDate} className="text-slate-500 font-medium">
                          {formatCardDate(evt.startDate)}
                        </time>
                      </div>
                      <h3 className="mt-3 font-extrabold text-slate-900 text-sm leading-snug">{evt.title}</h3>
                      <p className={`mt-2 text-xs flex-1 ${programmesTokens.body}`}>{evt.description}</p>
                      <Link
                        href={`/events/${evt.slug}`}
                        className="mt-5 block text-center rounded-xl border-2 border-[var(--prog-primary)] text-[var(--prog-primary)] hover:bg-[var(--prog-primary-soft)] py-2.5 text-sm font-bold transition"
                      >
                        Register Now
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        )}

        <div className="text-center mt-10">
          <Link
            href="/events"
            className="inline-flex h-11 items-center justify-center rounded-xl text-sm font-bold text-[var(--prog-primary)] hover:underline"
          >
            View all events →
          </Link>
        </div>
      </div>
    </section>
  )
}
