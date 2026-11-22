import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { Event as AfrsEvent } from '@/payload-types'

const events: AfrsEvent[] = []

vi.mock('@/lib/payload', () => ({
  getPayloadClient: vi.fn(async () => ({
    find: vi.fn(async () => ({ docs: events })),
  })),
}))
vi.mock('@/components/programmes/content.server', () => ({
  getDefaultHubEvents: vi.fn(async () => []),
}))

const { countCompletedEvents, fetchProgrammeHubEvents, parseEventTypes } = await import(
  '@/lib/programmeEvents'
)
const { DEFAULT_ARCHIVE_ROWS, archiveRowHref } = await import('@/lib/queries/programme-pages')

const NOW = new Date('2026-11-22T10:00:00.000Z')
let nextId = 1

function evt(partial: Partial<AfrsEvent> & { type?: string }): AfrsEvent {
  const { type, ...rest } = partial
  return {
    id: nextId++,
    title: 'Event',
    slug: `event-${nextId}`,
    startDate: '2026-10-01T00:00:00.000Z',
    endDate: '2026-10-05T00:00:00.000Z',
    eventNature: 'national',
    eventType: type
      ? { id: 1, slug: type, label: type, updatedAt: '', createdAt: '' }
      : undefined,
    published: true,
    updatedAt: '',
    createdAt: '',
    ...rest,
  } as AfrsEvent
}

const row = (label: string) => DEFAULT_ARCHIVE_ROWS.find((r) => r.label === label)!

beforeEach(() => {
  events.length = 0
})

describe('archive: finished events are filed automatically', () => {
  it('has Workshops, Training Programs and Internships rows that group related types', async () => {
    events.push(
      evt({ type: 'workshop' }),
      evt({ type: 'professional-workshop-program' }),
      evt({ type: 'training' }),
      evt({ type: 'police-training-program' }),
      evt({ type: 'internship' }),
      evt({ type: 'professional-internship-program' }),
    )
    const count = (label: string) =>
      countCompletedEvents({ types: row(label).eventTypeSlugs }, NOW)
    expect(await count('Workshops')).toBe(2)
    expect(await count('Training Programs')).toBe(2)
    expect(await count('Internships')).toBe(2)
  })

  it('counts exactly what the Archive tab lists (manual Schedule status respected)', async () => {
    events.push(
      // Marked Completed by hand before its end date: listed AND counted.
      evt({ type: 'workshop', endDate: '2026-12-30T00:00:00.000Z', scheduleStatus: 'completed' }),
      // Forced Ongoing after its dates: neither listed nor counted.
      evt({ type: 'workshop', scheduleStatus: 'ongoing' }),
      // Ends today: still ongoing today on both.
      evt({ type: 'workshop', endDate: '2026-11-22T00:00:00.000Z' }),
    )
    const filter = { types: ['workshop'] }
    const { completed } = await fetchProgrammeHubEvents({ type: ['workshop'] })
    const listed = completed.length
    expect(await countCompletedEvents(filter)).toBe(listed)
    expect(listed).toBe(1)
  })

  it('counts events without a type as workshops and without nature as national (like the cards)', async () => {
    events.push(evt({ eventNature: null }), evt({ eventNature: 'international', type: 'conference' }))
    expect(await countCompletedEvents({ types: ['workshop'] }, NOW)).toBe(1)
    expect(await countCompletedEvents({ nature: 'national' }, NOW)).toBe(1)
    expect(await countCompletedEvents({ nature: 'international' }, NOW)).toBe(1)
  })

  it('keeps newer events when there are more than 48 (newest finished first)', async () => {
    for (let day = 1; day <= 60; day += 1) {
      const start = new Date(Date.UTC(2026, 0, day))
      events.push(
        evt({
          title: `Day ${day}`,
          startDate: start.toISOString(),
          endDate: start.toISOString(),
        }),
      )
    }
    const { completed } = await fetchProgrammeHubEvents()
    expect(completed).toHaveLength(60)
    expect(completed[0].title).toBe('Day 60')
  })

  it('links archive rows to the matching events', () => {
    expect(archiveRowHref(row('Internships'))).toBe(
      '/courses/events?schedule=completed&type=internship%2Cprofessional-internship-program',
    )
    expect(parseEventTypes('internship,professional-internship-program')).toEqual([
      'internship',
      'professional-internship-program',
    ])
  })
})
