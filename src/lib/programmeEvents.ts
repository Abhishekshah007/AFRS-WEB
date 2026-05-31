import { defaultHubEvents } from '@/components/programmes/content'
import { mapEventToHubCard, isEventOngoing, isEventUpcoming } from '@/components/programmes/mapEvent'
import type { HubEventCard } from '@/components/programmes/types'
import { getPayloadClient } from '@/lib/payload'
import type { Event as AfrsEvent } from '@/payload-types'
import type { Where } from 'payload'

export type ProgrammeEventsQuery = {
  nature?: 'national' | 'international'
  type?: string
  limit?: number
}

function buildWhere(extra?: Where[]): Where {
  const and: Where[] = [{ published: { equals: true } }]
  if (extra?.length) and.push(...extra)
  return { and }
}

export async function fetchProgrammeHubEvents(query: ProgrammeEventsQuery = {}) {
  const payload = await getPayloadClient()
  const now = new Date()

  const filters: Where[] = []
  if (query.nature) filters.push({ eventNature: { equals: query.nature } })
  if (query.type) filters.push({ eventType: { equals: query.type } })

  const { docs } = await payload.find({
    collection: 'events',
    where: buildWhere(filters),
    sort: 'startDate',
    limit: query.limit ?? 48,
    depth: 1,
    overrideAccess: false,
  })

  const all = docs as AfrsEvent[]
  const upcomingRaw = all.filter((e) => isEventUpcoming(e, now))
  const ongoingRaw = all.filter((e) => isEventOngoing(e, now))

  const toCards = (list: AfrsEvent[]) => list.map((e, i) => mapEventToHubCard(e, i))

  let upcoming: HubEventCard[] = toCards(upcomingRaw)
  let ongoing: HubEventCard[] = toCards(ongoingRaw)

  if (upcoming.length === 0 && !query.nature && !query.type) {
    upcoming = defaultHubEvents
  }

  return { upcoming, ongoing, all }
}
