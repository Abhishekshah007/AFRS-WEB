import type { HubEventCard } from '@/components/programmes/types'
import { formatEventType, richTextToPlain } from '@/lib/cms'
import type { Event as AfrsEvent } from '@/payload-types'
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
  }
}

export function isEventUpcoming(evt: AfrsEvent, now = new Date()): boolean {
  return new Date(evt.startDate) > now
}

export function isEventOngoing(evt: AfrsEvent, now = new Date()): boolean {
  const start = new Date(evt.startDate)
  if (start > now) return false
  if (evt.endDate) return new Date(evt.endDate) >= now
  const weekAgo = new Date(now)
  weekAgo.setDate(weekAgo.getDate() - 7)
  return start >= weekAgo
}
