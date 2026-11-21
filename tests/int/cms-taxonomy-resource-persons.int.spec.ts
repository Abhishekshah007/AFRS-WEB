import { describe, expect, it } from 'vitest'

import { modalViewFromPath, resourcePersonPath } from '@/components/programmes/resourcePersonLinks'
import { getCategoryTagClass } from '@/components/student-hub/articles/categoryStyles'
import { mapEventToHubCard } from '@/components/programmes/mapEvent'
import {
  assignResourcePersonSlugs,
  mapCmsResourcePerson,
  resolveResourcePersonTitle,
} from '@/lib/queries/resource-persons'
import { resolveArticleCategory, resolveEventType } from '@/lib/taxonomy'
import type { Event as AfrsEvent, ResourcePerson } from '@/payload-types'

describe('resource persons: CMS is the source of truth', () => {
  it('keeps the designation an editor typed in the CMS', () => {
    // "Sayeed Ahmed" is in the bundled spreadsheet as "Deputy Director, CFSL".
    expect(resolveResourcePersonTitle('Sayeed Ahmed', 'Director, State FSL')).toBe(
      'Director, State FSL',
    )
  })

  it('uses the spreadsheet designation only when the CMS has the placeholder', () => {
    expect(resolveResourcePersonTitle('Sayeed Ahmed', 'Resource Person')).toBe(
      'Deputy Director, CFSL',
    )
    expect(resolveResourcePersonTitle('Unlisted Person', 'Resource Person')).toBe('')
  })

  it('keeps the CMS name instead of the spreadsheet spelling', () => {
    const person = mapCmsResourcePerson({
      id: 5,
      name: 'Sayeed Ahmed',
      title: 'Resource Person',
      updatedAt: '',
      createdAt: '',
    } as ResourcePerson)
    expect(person.name).toBe('Sayeed Ahmed')
    expect(person.title).toBe('Deputy Director, CFSL')
  })
})

describe('resource person profile URLs', () => {
  it('derives unique slugs from names', () => {
    const people = assignResourcePersonSlugs([
      { name: 'Dr. Kamini Bhoir' },
      { name: 'Rakesh Gupta' },
      { name: 'Rakesh Gupta' },
    ])
    expect(people.map((p) => p.slug)).toEqual(['dr-kamini-bhoir', 'rakesh-gupta', 'rakesh-gupta-2'])
  })

  it('maps URLs to the modal they open', () => {
    expect(modalViewFromPath('/courses')).toBeNull()
    expect(modalViewFromPath('/courses/resource-persons')).toEqual({ kind: 'all' })
    expect(modalViewFromPath('/courses/resource-persons/')).toEqual({ kind: 'all' })
    expect(modalViewFromPath(resourcePersonPath('dr-kamini-bhoir'))).toEqual({
      kind: 'person',
      slug: 'dr-kamini-bhoir',
    })
    expect(modalViewFromPath('/courses/resource-persons/a/b')).toBeNull()
  })
})

describe('CMS-managed article categories', () => {
  it('reads slug and label from the populated category', () => {
    expect(
      resolveArticleCategory({
        id: 30,
        slug: 'bloodstainAnalysis',
        label: 'Bloodstain Pattern Analysis',
        updatedAt: '',
        createdAt: '',
      }),
    ).toEqual({ slug: 'bloodstainAnalysis', label: 'Bloodstain Pattern Analysis' })
  })

  it('falls back to General for unpopulated values', () => {
    expect(resolveArticleCategory(12)).toEqual({ slug: 'general', label: 'General' })
    expect(resolveArticleCategory(null)).toEqual({ slug: 'general', label: 'General' })
  })

  it('keeps existing tag colours and gives new categories a palette colour', () => {
    expect(getCategoryTagClass('biologySerology')).toBe('bg-brand-50 text-brand-700')
    expect(getCategoryTagClass('brandNewTopic')).toMatch(/^bg-/)
    expect(getCategoryTagClass('brandNewTopic')).toBe(getCategoryTagClass('brandNewTopic'))
  })
})

describe('CMS-managed event types', () => {
  it('uses the short badge label when set', () => {
    expect(
      resolveEventType({
        id: 4,
        slug: 'fdp',
        label: 'Faculty Development Program',
        shortLabel: 'FDP',
        updatedAt: '',
        createdAt: '',
      }),
    ).toEqual({ slug: 'fdp', label: 'Faculty Development Program', badgeLabel: 'FDP' })
  })

  it('shows a newly added event type on event cards', () => {
    const card = mapEventToHubCard({
      id: 1,
      title: 'Hands-on Bootcamp',
      slug: 'hands-on-bootcamp',
      startDate: '2026-12-01T00:00:00.000Z',
      eventType: {
        id: 99,
        slug: 'bootcamp',
        label: 'Forensic Bootcamp',
        updatedAt: '',
        createdAt: '',
      },
      updatedAt: '',
      createdAt: '',
    } as AfrsEvent)
    expect(card.eventType).toBe('bootcamp')
    expect(card.eventTypeLabel).toBe('Forensic Bootcamp')
  })

  it('treats events without a type as workshops on cards (previous behaviour)', () => {
    const card = mapEventToHubCard({
      id: 2,
      title: 'Untyped',
      slug: 'untyped',
      startDate: '2026-12-01T00:00:00.000Z',
      updatedAt: '',
      createdAt: '',
    } as AfrsEvent)
    expect(card.eventType).toBe('workshop')
    expect(card.eventTypeLabel).toBe('Workshop')
  })
})

describe('About page leadership & committee cards', () => {
  it('shows only what the CMS record holds (no hard-coded photo or bio)', async () => {
    const { toFounderProfile } = await import('@/lib/queries/about')
    const card = toFounderProfile({
      id: 3,
      name: 'Mr. Abhishek Shah',
      designation: 'Treasurer',
      photo: null,
      bio: null,
      isCommitteeMember: true,
      updatedAt: '',
      createdAt: '',
    } as unknown as import('@/payload-types').Founder)
    expect(card.photoUrl).toBeUndefined()
    expect(card.bio).toBeNull()
    expect(card.designation).toBe('Treasurer')
    expect(card.initials).toBe('AS')
  })
})
