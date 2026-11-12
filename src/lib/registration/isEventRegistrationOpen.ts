import type { Event as AfrsEvent } from '@/payload-types'

type RegistrationSchedule = Pick<
  AfrsEvent,
  'registrationOpen' | 'registrationCloseDate' | 'startDate'
>

function utcDateKey(value: string): string | null {
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return null
  return date.toISOString().slice(0, 10)
}

export function isEventRegistrationOpen(event: RegistrationSchedule, now = new Date()): boolean {
  if (event.registrationOpen === false) return false

  const closeDate = event.registrationCloseDate || event.startDate
  const closeDateKey = utcDateKey(closeDate)
  const todayKey = utcDateKey(now.toISOString())

  if (!closeDateKey || !todayKey) return false
  return todayKey <= closeDateKey
}
