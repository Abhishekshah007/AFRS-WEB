'use client'

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
    <svg className="h-3.5 w-3.5 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" aria-hidden>
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
}

/**
 * Online Events Hub card — Figma layout with nature badge, type pill, and Register CTA.
 */
export function EventHubCard({ event }: EventHubCardProps) {
  const typeClass = eventTypeBadgeClass[event.eventType] ?? 'bg-slate-600 text-white'
  const natureClass = eventNatureBadgeClass[event.eventNature]

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={springSnappy}
      className={`${programmesTokens.radiusCard} border border-slate-100 bg-white shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col h-full`}
    >
      <div className={`relative flex h-[148px] items-center justify-center ${eventVisualClass[event.visualTone]}`}>
        <span
          className={`absolute top-3 right-3 rounded-md border px-2 py-0.5 text-[9px] font-extrabold tracking-wide ${natureClass}`}
        >
          {eventNatureLabel(event.eventNature)}
        </span>
        <span className="text-5xl opacity-70 select-none" aria-hidden>
          {event.visualIcon}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className={`rounded-md px-2.5 py-0.5 text-[10px] font-bold ${typeClass}`}>
            {event.eventTypeLabel}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <CalendarIcon />
            <time dateTime={event.startDate}>{formatCardDate(event.startDate)}</time>
          </span>
        </div>

        <h3 className="mt-3 font-extrabold text-slate-900 text-[15px] leading-snug">{event.title}</h3>
        <p className={`mt-2 text-xs leading-relaxed flex-1 ${programmesTokens.body}`}>{event.description}</p>

        <Link
          href={`/events/${event.slug}`}
          className="mt-5 block w-full text-center rounded-xl border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50 py-2.5 text-sm font-bold transition shadow-sm"
        >
          Register Now
        </Link>
      </div>
    </motion.article>
  )
}
