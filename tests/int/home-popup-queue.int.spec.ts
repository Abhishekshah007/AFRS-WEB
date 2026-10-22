import { act, createElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

import { HomePopupSequence } from '../../src/components/home/HomePopupSequence'
import { revalidatePlanForCollection } from '../../src/lib/cache/revalidateMap'
import {
  HOME_POPUP_LIMIT,
  HOME_POPUP_STORAGE_KEY,
  buildHomePopupSlides,
  countHomePopupSlots,
  homePopupFingerprint,
} from '../../src/lib/popups/homePopupQueue'
import type { Event as AfrsEvent, SitePopup } from '../../src/payload-types'

const now = new Date('2026-10-22T08:00:00.000Z')

function poster(overrides: Partial<SitePopup> & Pick<SitePopup, 'id'>): SitePopup {
  return {
    title: `Poster ${overrides.id}`,
    image: { id: overrides.id, url: `/posters/${overrides.id}.jpg` },
    published: true,
    order: overrides.id,
    updatedAt: '2026-10-01T00:00:00.000Z',
    createdAt: '2026-10-01T00:00:00.000Z',
    ...overrides,
  } as SitePopup
}

function eventDoc(overrides: Partial<AfrsEvent> & Pick<AfrsEvent, 'id' | 'startDate'>): AfrsEvent {
  return {
    title: `Event ${overrides.id}`,
    slug: `event-${overrides.id}`,
    published: true,
    showInHomePopup: true,
    registrationOpen: true,
    updatedAt: '2026-10-02T00:00:00.000Z',
    createdAt: '2026-10-02T00:00:00.000Z',
    ...overrides,
  } as AfrsEvent
}

describe('homepage popup queue', () => {
  it('plays posters by sort order, then upcoming events, and stops at five', () => {
    const posters = [
      poster({ id: 2, order: 20, title: 'Later poster' }),
      poster({ id: 1, order: 1, title: 'First poster' }),
      poster({ id: 3, order: 3, title: 'Second poster' }),
      poster({ id: 4, order: 4, title: 'Third poster' }),
    ]
    const events = [
      eventDoc({ id: 10, startDate: '2026-11-02T00:00:00.000Z', title: 'Later workshop' }),
      eventDoc({ id: 9, startDate: '2026-11-01T00:00:00.000Z', title: 'Soon workshop' }),
    ]

    const slides = buildHomePopupSlides(posters, events, now)

    expect(slides.map((slide) => slide.title)).toEqual([
      'First poster',
      'Second poster',
      'Third poster',
      'Later poster',
      'Soon workshop',
    ])
    expect(slides).toHaveLength(HOME_POPUP_LIMIT)
    expect(slides[4]).toMatchObject({
      kind: 'event',
      ctaLabel: 'Apply',
      href: '/events/event-9/register',
    })
  })

  it('drops unpublished posters, unsafe links, completed events, and closed registration', () => {
    const slides = buildHomePopupSlides(
      [
        poster({ id: 1, published: false }),
        poster({ id: 2, linkUrl: 'javascript:alert(1)' }),
        poster({ id: 3, linkUrl: '/courses' }),
      ],
      [
        eventDoc({
          id: 8,
          startDate: '2020-01-01T00:00:00.000Z',
          endDate: '2020-01-02T00:00:00.000Z',
          showInHomePopup: true,
        }),
        eventDoc({
          id: 7,
          startDate: '2026-12-01T00:00:00.000Z',
          registrationOpen: false,
          venue: 'AFRS Campus',
        }),
      ],
      now,
    )

    expect(slides.map((slide) => slide.id)).toEqual(['2', '3', '7'])
    expect(slides[0]).toMatchObject({ kind: 'poster', href: undefined })
    expect(slides[1]).toMatchObject({ kind: 'poster', href: '/courses' })
    expect(slides[2]).toMatchObject({
      kind: 'event',
      ctaLabel: 'View event',
      href: '/events/event-7',
      venue: 'AFRS Campus',
    })
  })

  it('counts only live posters and upcoming or ongoing opted-in events', () => {
    const total = countHomePopupSlots(
      [poster({ id: 1 }), poster({ id: 2, published: false })],
      [
        eventDoc({ id: 3, startDate: '2026-12-01T00:00:00.000Z' }),
        eventDoc({
          id: 4,
          startDate: '2020-01-01T00:00:00.000Z',
          endDate: '2020-01-02T00:00:00.000Z',
        }),
        eventDoc({ id: 5, startDate: '2026-12-01T00:00:00.000Z', showInHomePopup: false }),
      ],
      now,
    )

    expect(total).toBe(2)
  })

  it('changes the fingerprint when the set or a poster timestamp changes', () => {
    const first = buildHomePopupSlides([poster({ id: 1, order: 2 }), poster({ id: 2, order: 1 })], [], now)
    const reordered = buildHomePopupSlides(
      [poster({ id: 1, order: 1 }), poster({ id: 2, order: 2 })],
      [],
      now,
    )
    const edited = buildHomePopupSlides(
      [poster({ id: 1, order: 2, updatedAt: '2026-10-22T00:00:00.000Z' }), poster({ id: 2, order: 1 })],
      [],
      now,
    )

    expect(homePopupFingerprint(first)).not.toBe(homePopupFingerprint(reordered))
    expect(homePopupFingerprint(first)).not.toBe(homePopupFingerprint(edited))
  })

  it('revalidates the homepage when a poster is saved', () => {
    expect(revalidatePlanForCollection('sitePopups')).toMatchObject({
      paths: ['/'],
    })
  })
})

describe('homepage popup sequence', () => {
  let root: Root | null = null
  let container: HTMLDivElement | null = null

  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.open = true
    }
    HTMLDialogElement.prototype.close = function close() {
      this.open = false
    }
  })

  afterEach(() => {
    act(() => {
      root?.unmount()
    })
    container?.remove()
    root = null
    container = null
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    window.localStorage.clear()
  })

  function renderSequence() {
    const slides = buildHomePopupSlides(
      [
        poster({ id: 1, title: 'First poster' }),
        poster({ id: 2, title: 'Second poster', order: 2 }),
      ],
      [],
      now,
    )
    const fingerprint = homePopupFingerprint(slides)
    act(() => {
      root?.unmount()
    })
    container?.remove()
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    act(() => {
      root?.render(createElement(HomePopupSequence, { slides, fingerprint }))
    })
    return fingerprint
  }

  it('keeps one dialog open, advances on close, then remembers the finished set', () => {
    const fingerprint = renderSequence()

    const dialog = document.querySelector('dialog')
    expect(dialog).toBeTruthy()
    expect(dialog?.open).toBe(true)
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.textContent).toContain('First poster')
    expect(document.body.textContent).toContain('1 of 2')

    act(() => {
      document.querySelector<HTMLButtonElement>('button[aria-label="Close"]')?.click()
    })

    expect(document.querySelector('dialog')?.open).toBe(true)
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.textContent).toContain('Second poster')
    expect(window.localStorage.getItem(HOME_POPUP_STORAGE_KEY)).toBeNull()

    const cancel = new Event('cancel', { cancelable: true })
    act(() => {
      document.querySelector('dialog')?.dispatchEvent(cancel)
    })

    expect(cancel.defaultPrevented).toBe(true)
    expect(document.querySelector('dialog')).toBeNull()
    expect(document.body.style.overflow).toBe('')
    expect(window.localStorage.getItem(HOME_POPUP_STORAGE_KEY)).toBe(fingerprint)

    renderSequence()
    expect(document.querySelector('dialog')).toBeNull()
  })
})
