import type { HubEventCard } from '@/components/programmes/types'
import { formatEventType, resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import type { Event as AfrsEvent, Media } from '@/payload-types'
import { eventTypeDisplayLabel } from '@/components/programmes/eventStyles'

const VISUAL_TONES: HubEventCard['visualTone'][] = ['blue', 'orange', 'purple']
const EVENT_ICONS: Record<string, string> = {
  workshop: '👥',
  conference: '🌐',
  training: '🎓',
  webinar: '💻',
}

export function mapEventToHubCard(evt: AfrsEvent, index = 0): HubEventCard {
  const type = evt.eventType ?? 'workshop'
  const nature =
    evt.eventNature === 'international' || evt.eventNature === 'national'
      ? evt.eventNature
      : 'national'

  const bannerUrl =
    evt.banner != null
      ? resolveMediaUrl(evt.banner as number | Media | null | undefined, '')
      : undefined

  return {
    id: String(evt.id),
    slug: evt.slug,
    title: evt.title,
    description: evt.excerpt ?? richTextToPlain(evt.description, 140),
    eventType: type,
    eventTypeLabel: eventTypeDisplayLabel(type) || formatEventType(type),
    eventNature: nature,
    startDate: evt.startDate,
    visualTone: VISUAL_TONES[index % VISUAL_TONES.length],
    visualIcon: EVENT_ICONS[type] ?? '📅',
    bannerUrl: bannerUrl || undefined,
    registrationOpen: evt.registrationOpen,
  }
}

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setUTCHours(0, 0, 0, 0)
  return d
}

export function isEventUpcoming(evt: AfrsEvent, now = new Date()): boolean {
  return startOfDay(new Date(evt.startDate)) > startOfDay(now)
}

export function isEventOngoing(evt: AfrsEvent, now = new Date()): boolean {
  const start = new Date(evt.startDate)
  if (start > now) return false
  if (evt.endDate) return new Date(evt.endDate) >= now
  const weekAgo = new Date(now)
  weekAgo.setDate(weekAgo.getDate() - 7)
  return start >= weekAgo
}

export function isEventCompleted(evt: AfrsEvent, now = new Date()): boolean {
  const start = new Date(evt.startDate)
  if (evt.endDate) return new Date(evt.endDate) < now

  const weekAgo = new Date(now)
  weekAgo.setDate(weekAgo.getDate() - 7)
  return start < weekAgo
}
