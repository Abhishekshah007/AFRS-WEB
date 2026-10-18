export type DeliveryMode = 'online' | 'offline' | 'hybrid'

export function parseDeliveryMode(value?: string | null): DeliveryMode {
  const normalized = (value || '').toLowerCase()
  if (normalized.includes('offline') && !normalized.includes('online')) return 'offline'
  if (normalized === 'offline') return 'offline'
  if (normalized === 'online') return 'online'
  if (normalized.includes('online') && normalized.includes('offline')) return 'hybrid'
  if (normalized.includes('online')) return 'online'
  if (normalized.includes('offline')) return 'hybrid'
  return 'hybrid'
}

/** PayPal is for online / international programmes only — never for offline delivery. */
export function shouldOfferPayPal(
  participantRegion: 'indian' | 'international',
  deliveryMode: DeliveryMode,
): boolean {
  if (participantRegion !== 'international') return false
  if (deliveryMode === 'offline') return false
  return true
}
