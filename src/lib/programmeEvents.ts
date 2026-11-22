import { cache } from 'react'

import { getDefaultHubEvents } from '@/components/programmes/content.server'
import {
  isEventCompleted,
  isEventOngoing,
  isEventUpcoming,
  mapEventToHubCard,
} from '@/components/programmes/mapEvent'
import type { HubEventCard } from '@/components/programmes/types'
import { getPayloadClient } from '@/lib/payload'
import { resolveEventType } from '@/lib/taxonomy'
import type { Event as AfrsEvent } from '@/payload-types'

export type ProgrammeEventsQuery = {
  nature?: 'national' | 'international'
  /** One event type slug, or several (an archive row can group related types). */
  type?: string | string[]
  /** Max cards per tab (upcoming / ongoing / completed). */
  limit?: number
}

export type EventFilter = {
  nature?: 'national' | 'international'
  types?: string[]
}

/** Safety cap on published events loaded per request (far above today's volume). */
const MAX_EVENTS = 1000

/**
 * Every published event, once per request. Previously the hub loaded only the 48 (or 24)
 * *oldest* events, so newer ones silently disappeared once that many existed. Selecting
 * only card fields keeps this cheap.
 */
export const loadPublishedEvents = cache(async (): Promise<AfrsEvent[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'events',
    where: { published: { equals: true } },
    sort: 'startDate',
    limit: MAX_EVENTS,
    depth: 1,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      description: true,
      banner: true,
      eventType: true,
      eventNature: true,
      startDate: true,
      endDate: true,
      scheduleStatus: true,
      registrationOpen: true,
      registrationCloseDate: true,
    },
    overrideAccess: false,
  })
  return docs as AfrsEvent[]
})

/** Normalise `?type=a,b` / ['a','b'] / 'a' into a slug list (empty = any type). */
export function parseEventTypes(type: string | string[] | null | undefined): string[] {
  const values = Array.isArray(type) ? type : (type ?? '').split(',')
  return values.map((value) => value.trim()).filter(Boolean)
}

/**
 * Same defaults the event cards use: no type shows as "workshop", no nature as
 * "national" — so counts, filters and cards always agree.
 */
export function eventMatchesFilter(evt: AfrsEvent, filter: EventFilter): boolean {
  if (filter.nature) {
    const nature = evt.eventNature === 'international' ? 'international' : 'national'
    if (nature !== filter.nature) return false
  }
  if (filter.types?.length) {
    const typeSlug = resolveEventType(evt.eventType)?.slug ?? 'workshop'
    if (!filter.types.includes(typeSlug)) return false
  }
  return true
}

/** Completed events matching a filter, using the exact rule the Archive tab uses. */
export async function countCompletedEvents(filter: EventFilter, now = new Date()): Promise<number> {
  const events = await loadPublishedEvents()
  return events.filter((evt) => isEventCompleted(evt, now) && eventMatchesFilter(evt, filter))
    .length
}

export async function fetchProgrammeHubEvents(query: ProgrammeEventsQuery = {}) {
  const now = new Date()
  const filter: EventFilter = { nature: query.nature, types: parseEventTypes(query.type) }
  const all = (await loadPublishedEvents()).filter((evt) => eventMatchesFilter(evt, filter))

  const limit = query.limit ?? Number.POSITIVE_INFINITY
  const upcomingRaw = all.filter((e) => isEventUpcoming(e, now)).slice(0, limit)
  const ongoingRaw = all.filter((e) => isEventOngoing(e, now)).slice(0, limit)
  // Newest finished events first.
  const completedRaw = all
    .filter((e) => isEventCompleted(e, now))
    .reverse()
    .slice(0, limit)

  const toCards = (list: AfrsEvent[]) => list.map((e, i) => mapEventToHubCard(e, i))

  let upcoming: HubEventCard[] = toCards(upcomingRaw)
  const ongoing: HubEventCard[] = toCards(ongoingRaw)
  const completed: HubEventCard[] = toCards(completedRaw)

  if (upcoming.length === 0 && !filter.nature && !filter.types?.length) {
    upcoming = await getDefaultHubEvents()
  }

  return { upcoming, ongoing, completed, all }
}
