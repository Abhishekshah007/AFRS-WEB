'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EventHubCard } from '@/components/programmes/EventHubCard'
import type { HubEventCard } from '@/components/programmes/types'

type Props = {
  events: HubEventCard[]
  viewAllHref: string
  ariaLabel: string
  className?: string
}

export function EventCardsCarousel({ events, viewAllHref, ariaLabel, className = '' }: Props) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [canScrollBack, setCanScrollBack] = useState(false)
  const [canScrollForward, setCanScrollForward] = useState(false)

  const updateScrollControls = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    setCanScrollBack(track.scrollLeft > 1)
    setCanScrollForward(track.scrollLeft + track.clientWidth < track.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    updateScrollControls()
    const observer = new ResizeObserver(updateScrollControls)
    observer.observe(track)
    return () => observer.disconnect()
  }, [events.length, updateScrollControls])

  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return

    track.scrollBy({
      left: direction * track.clientWidth * 0.85,
      behavior: 'smooth',
    })
  }

  return (
    <div className={className}>
      {events.length > 1 ? (
        <div className="mb-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={!canScrollBack}
            aria-label={`Show previous ${ariaLabel}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={!canScrollForward}
            aria-label={`Show next ${ariaLabel}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <ul
        ref={trackRef}
        onScroll={updateScrollControls}
        tabIndex={0}
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-slate-100"
      >
        {events.map((event) => (
          <li
            key={event.id}
            className="w-[86%] shrink-0 snap-start sm:w-[calc((100%_-_1.5rem)/2)] lg:w-[calc((100%_-_3rem)/3)]"
          >
            <EventHubCard event={event} />
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <Link
          href={viewAllHref}
          className="inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-bold text-[var(--prog-primary)] transition hover:bg-slate-50 hover:underline"
        >
          View all events →
        </Link>
      </div>
    </div>
  )
}
