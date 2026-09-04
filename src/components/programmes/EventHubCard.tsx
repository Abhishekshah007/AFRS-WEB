'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import type { HubEventCard } from '@/components/programmes/types'
import { eventVisualClass } from '@/components/programmes/content'
import {
  eventNatureBadgeClass,
  eventNatureLabel,
  eventTypeBadgeClass,
} from '@/components/programmes/eventStyles'
import { programmesTokens } from '@/components/programmes/tokens'
import { springSnappy } from '@/components/motion/variants'

function formatCardDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function CalendarIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-slate-400"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 2v3M16 2v3M4 9h16M5 5h14a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

export type EventHubCardProps = {
  event: HubEventCard
  ctaLabel?: string
}

/**
 * Shared event card — used on /courses, home, and /events for a consistent layout.
 * Posters use object-contain so square CMS artwork is not cropped.
 */
export function EventHubCard({ event, ctaLabel = 'Register Now' }: EventHubCardProps) {
  const typeClass = eventTypeBadgeClass[event.eventType] ?? 'bg-slate-600 text-white'
  const natureClass = eventNatureBadgeClass[event.eventNature]
  const registrationOpen = event.registrationOpen !== false
  const registerHref = registrationOpen ? `/events/${event.slug}/register` : `/events/${event.slug}`
  const registerLabel = registrationOpen ? ctaLabel : 'Registration closed'

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={springSnappy}
      className={`${programmesTokens.radiusCard} flex h-full flex-col overflow-hidden border border-slate-100 bg-white shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08)]`}
    >
      <div
        className={`relative flex h-[220px] items-center justify-center overflow-hidden border-b border-slate-100 ${
          event.bannerUrl ? 'bg-slate-50' : eventVisualClass[event.visualTone]
        }`}
      >
        <span
          className={`absolute top-3 right-3 z-10 rounded-md border px-2 py-0.5 text-[9px] font-extrabold tracking-wide ${natureClass}`}
        >
          {eventNatureLabel(event.eventNature)}
        </span>

        {event.bannerUrl ? (
          <Image
            src={event.bannerUrl}
            alt={`${event.title} poster`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-3"
          />
        ) : (
          <span className="text-5xl opacity-70 select-none" aria-hidden>
            {event.visualIcon}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className={`rounded-md px-2.5 py-0.5 text-[10px] font-bold ${typeClass}`}>
            {event.eventTypeLabel}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <CalendarIcon />
            <time dateTime={event.startDate}>{formatCardDate(event.startDate)}</time>
          </span>
        </div>

        <h3 className="mt-3 text-[15px] font-extrabold leading-snug text-slate-900">{event.title}</h3>
        <p className={`mt-2 line-clamp-3 flex-1 text-xs leading-relaxed ${programmesTokens.body}`}>
          {event.description}
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <Link
            href={`/events/${event.slug}`}
            className="block w-full rounded-xl border border-slate-200 bg-white py-2.5 text-center text-sm font-bold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            Read more
          </Link>
          <Link
            href={registerHref}
            aria-disabled={!registrationOpen}
            className={`block w-full rounded-xl border py-2.5 text-center text-sm font-bold shadow-sm transition ${
              registrationOpen
                ? 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                : 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400'
            }`}
          >
            {registerLabel}
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
