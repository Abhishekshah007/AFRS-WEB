import { formatEventDate } from '@/lib/cms'
import { getPayloadClient } from '@/lib/payload'
import { fetchActiveEvents } from '@/lib/queries/events'
import type { Event as AfrsEvent } from '@/payload-types'

export type StudentHubEventSummary = {
  id: number | string
  slug: string
  title: string
  eventType?: string | null
  startDateLabel: string
  registrationOpen?: boolean | null
}

export type StudentHubFeaturedEvent = {
  slug: string
  startDateLabel: string
  startTime?: string | null
  venue?: string | null
  registrationOpen?: boolean | null
} | null

export type StudentHubEventsResult = {
  featured: StudentHubFeaturedEvent
  events: StudentHubEventSummary[]
}

export async function getUpcomingStudentHubEvents(limit = 4): Promise<StudentHubEventsResult> {
  const payload = await getPayloadClient()

  const eventResult = await fetchActiveEvents(payload, { limit, depth: 0 })

  const events = eventResult.docs as AfrsEvent[]
  const featuredEvent = events[0]

  return {
    featured: featuredEvent
      ? {
          slug: featuredEvent.slug,
          startDateLabel: formatEventDate(featuredEvent.startDate),
          startTime: featuredEvent.startTime,
          venue: featuredEvent.venue,
          registrationOpen: featuredEvent.registrationOpen,
        }
      : null,
    events: events.map((event) => ({
      id: event.id,
      slug: event.slug,
      title: event.title,
      eventType: event.eventType,
      startDateLabel: formatEventDate(event.startDate),
      registrationOpen: event.registrationOpen,
    })),
  }
}
