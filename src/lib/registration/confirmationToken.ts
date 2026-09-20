import { createHmac, timingSafeEqual } from 'crypto'

const TOKEN_PURPOSE = 'registration-confirmation-v1'

export type EventConfirmationScope = {
  kind: 'event'
  eventSlug: string
}

export type CourseConfirmationScope = {
  kind: 'course'
}

export type ConfirmationScope = EventConfirmationScope | CourseConfirmationScope

function encodeScope(scope: ConfirmationScope): string {
  return scope.kind === 'event' ? `event:${scope.eventSlug}` : 'course'
}

function getSigningSecret(): string | null {
  const secret = process.env.PAYLOAD_SECRET?.trim()
  return secret || null
}

export function createRegistrationConfirmationToken(
  registrationId: string | number,
  scope: ConfirmationScope,
): string | null {
  const secret = getSigningSecret()
  if (!secret) return null

  return createHmac('sha256', secret)
    .update(`${TOKEN_PURPOSE}:${encodeScope(scope)}:${registrationId}`)
    .digest('base64url')
}

export function verifyRegistrationConfirmationToken(
  registrationId: string | number,
  scope: ConfirmationScope,
  token: string | null | undefined,
): boolean {
  if (!token?.trim()) return false

  const expected = createRegistrationConfirmationToken(registrationId, scope)
  if (!expected) return false

  try {
    const provided = Buffer.from(token.trim())
    const reference = Buffer.from(expected)
    if (provided.length !== reference.length) return false
    return timingSafeEqual(provided, reference)
  } catch {
    return false
  }
}

export function buildEventConfirmationUrl(
  registrationId: string | number,
  eventSlug: string,
): string {
  const path = `/events/${eventSlug}/register/confirmation/${registrationId}`
  const token = createRegistrationConfirmationToken(registrationId, {
    kind: 'event',
    eventSlug,
  })

  return token ? `${path}?token=${encodeURIComponent(token)}` : path
}

export function buildCourseConfirmationUrl(registrationId: string | number): string {
  const path = `/courses/register/confirmation/${registrationId}`
  const token = createRegistrationConfirmationToken(registrationId, { kind: 'course' })
  return token ? `${path}?token=${encodeURIComponent(token)}` : path
}
