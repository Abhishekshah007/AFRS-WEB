import { describe, expect, it } from 'vitest'
import { isEventRegistrationOpen } from '@/lib/registration/isEventRegistrationOpen'

describe('event registration availability', () => {
  it('keeps registration open through the start date by default', () => {
    const event = {
      registrationOpen: true,
      startDate: '2026-11-12T00:00:00.000Z',
    }

    expect(isEventRegistrationOpen(event, new Date('2026-11-12T23:59:59.000Z'))).toBe(true)
    expect(isEventRegistrationOpen(event, new Date('2026-11-13T00:00:00.000Z'))).toBe(false)
  })

  it('allows registration during or after the event until the configured close date', () => {
    const event = {
      registrationOpen: true,
      registrationCloseDate: '2026-11-20T00:00:00.000Z',
      startDate: '2026-11-12T00:00:00.000Z',
    }

    expect(isEventRegistrationOpen(event, new Date('2026-11-15T12:00:00.000Z'))).toBe(true)
    expect(isEventRegistrationOpen(event, new Date('2026-11-21T00:00:00.000Z'))).toBe(false)
  })

  it('respects the manual registration switch regardless of the close date', () => {
    const event = {
      registrationOpen: false,
      registrationCloseDate: '2026-11-20T00:00:00.000Z',
      startDate: '2026-11-12T00:00:00.000Z',
    }

    expect(isEventRegistrationOpen(event, new Date('2026-11-15T12:00:00.000Z'))).toBe(false)
  })
})
