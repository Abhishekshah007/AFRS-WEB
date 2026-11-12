import type { HubEventCard } from '@/components/programmes/types'
import { FALLBACK_BANNER_IMAGE, formatEventType, resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import { resolveEventSlug } from '@/lib/utils/slugify'
import type { Event as AfrsEvent, Media } from '@/payload-types'
import { eventTypeDisplayLabel } from '@/components/programmes/eventStyles'
import { isEventRegistrationOpen } from '@/lib/registration/isEventRegistrationOpen'

const VISUAL_TONES: HubEventCard['visualTone'][] = ['blue', 'orange', 'purple']
const EVENT_ICONS: Record<string, string> = {
  workshop: '👥',
  conference: '🌐',
  training: '🎓',
  fdp: '🎓',
  internship: '🧑‍🎓',
  webinar: '💻',
}

export function mapEventToHubCard(evt: AfrsEvent, index = 0): HubEventCard {
  const type = evt.eventType ?? 'workshop'
  const nature =
    evt.eventNature === 'international' || evt.eventNature === 'national'
      ? evt.eventNature
      : 'national'

  const bannerUrl = resolveMediaUrl(
    evt.banner as number | Media | null | undefined,
    FALLBACK_BANNER_IMAGE,
  )

  return {
    id: String(evt.id),
    slug: resolveEventSlug(evt.slug, String(evt.id)) ?? String(evt.id),
    title: evt.title,
    description: evt.excerpt ?? richTextToPlain(evt.description, 140),
    eventType: type,
    eventTypeLabel: eventTypeDisplayLabel(type) || formatEventType(type),
    eventNature: nature,
    startDate: evt.startDate,
    visualTone: VISUAL_TONES[index % VISUAL_TONES.length],
    visualIcon: EVENT_ICONS[type] ?? '📅',
    bannerUrl: bannerUrl || undefined,
    registrationOpen: isEventRegistrationOpen(evt),
  }
}

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setUTCHours(0, 0, 0, 0)
  return d
}

export function isEventUpcoming(evt: AfrsEvent, now = new Date()): boolean {
  if (evt.scheduleStatus && evt.scheduleStatus !== 'automatic') {
    return evt.scheduleStatus === 'upcoming'
  }
  return startOfDay(new Date(evt.startDate)) > startOfDay(now)
}

export function isEventOngoing(evt: AfrsEvent, now = new Date()): boolean {
  if (evt.scheduleStatus && evt.scheduleStatus !== 'automatic') {
    return evt.scheduleStatus === 'ongoing'
  }

  const today = startOfDay(now)
  const start = startOfDay(new Date(evt.startDate))
  if (start > today) return false

  if (evt.endDate) return startOfDay(new Date(evt.endDate)) >= today

  const fallbackEnd = new Date(start)
  fallbackEnd.setUTCDate(fallbackEnd.getUTCDate() + 7)
  return today <= fallbackEnd
}

export function isEventCompleted(evt: AfrsEvent, now = new Date()): boolean {
  if (evt.scheduleStatus && evt.scheduleStatus !== 'automatic') {
    return evt.scheduleStatus === 'completed'
  }

  const today = startOfDay(now)
  if (evt.endDate) return startOfDay(new Date(evt.endDate)) < today

  const fallbackEnd = startOfDay(new Date(evt.startDate))
  fallbackEnd.setUTCDate(fallbackEnd.getUTCDate() + 7)
  return fallbackEnd < today
}
