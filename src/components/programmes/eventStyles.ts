import type { HubEventCard } from '@/components/programmes/types'

/** Display label for event type pills (Figma uses "FDP" for training programmes). */
export function eventTypeDisplayLabel(eventType: string): string {
  const map: Record<string, string> = {
    workshop: 'Workshop',
    conference: 'Conference',
    training: 'FDP',
    webinar: 'Webinar',
  }
  return map[eventType] ?? eventType.charAt(0).toUpperCase() + eventType.slice(1)
}

export const eventTypeBadgeClass: Record<string, string> = {
  workshop: 'bg-emerald-500 text-white',
  conference: 'bg-orange-500 text-white',
  training: 'bg-pink-500 text-white',
  webinar: 'bg-violet-500 text-white',
}

export const eventNatureBadgeClass: Record<NonNullable<HubEventCard['eventNature']>, string> = {
  national: 'border-violet-300 bg-white/90 text-violet-700',
  international: 'border-blue-300 bg-white/90 text-blue-700',
}

export function eventNatureLabel(nature: HubEventCard['eventNature']): string {
  if (nature === 'international') return 'INTERNATIONAL'
  if (nature === 'national') return 'NATIONAL'
  return 'NATIONAL'
}
