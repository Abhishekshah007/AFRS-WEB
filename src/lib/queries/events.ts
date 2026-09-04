import { isEventCompleted, isEventOngoing, isEventUpcoming } from '@/components/programmes/mapEvent'
import type { Event as AfrsEvent } from '@/payload-types'
import type { Payload, Where } from 'payload'

export function startOfDayUtc(date = new Date()): Date {
  const d = new Date(date)
  d.setUTCHours(0, 0, 0, 0)
  return d
}

/** Broad window for DB query — refined in JS for upcoming/ongoing. */
export function activeEventsWhere(): Where {
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  weekAgo.setUTCHours(0, 0, 0, 0)
  const today = startOfDayUtc().toISOString()

  return {
    and: [
      { published: { equals: true } },
      {
        or: [
          { startDate: { greater_than_equal: weekAgo.toISOString() } },
          { endDate: { greater_than_equal: today } },
        ],
      },
    ],
  }
}

export function filterActiveEvents(events: AfrsEvent[], now = new Date()): AfrsEvent[] {
  return events
    .filter((evt) => (isEventUpcoming(evt, now) || isEventOngoing(evt, now)) && !isEventCompleted(evt, now))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
}

export async function fetchActiveEvents(
  payload: Payload,
  { limit = 12, depth = 1 }: { limit?: number; depth?: number } = {},
) {
  const result = await payload.find({
    collection: 'events',
    where: activeEventsWhere(),
    sort: 'startDate',
    limit: Math.max(limit * 3, 24),
    depth,
    overrideAccess: false,
  })

  const docs = filterActiveEvents(result.docs as AfrsEvent[]).slice(0, limit)

  return {
    ...result,
    docs,
    totalDocs: docs.length,
  }
}
