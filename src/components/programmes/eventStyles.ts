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
  workshop: 'bg-brand-500 text-white',
  conference: 'bg-brand-700 text-white',
  training: 'bg-brand-600 text-white',
  webinar: 'bg-brand-200 text-brand',
}

export const eventNatureBadgeClass: Record<NonNullable<HubEventCard['eventNature']>, string> = {
  national: 'border-brand-200 bg-white/90 text-brand-700',
  international: 'border-brand-500 bg-white/90 text-brand-600',
}

export function eventNatureLabel(nature: HubEventCard['eventNature']): string {
  if (nature === 'international') return 'INTERNATIONAL'
  if (nature === 'national') return 'NATIONAL'
  return 'NATIONAL'
}
