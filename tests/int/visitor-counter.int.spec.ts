import { createElement } from 'react'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CountUp } from '@/components/ui/CountUp'

// Minimal IntersectionObserver that reports "visible" as soon as an element is observed.
class VisibleObserver {
  constructor(private readonly callback: IntersectionObserverCallback) {}
  observe() {
    this.callback([{ isIntersecting: true } as IntersectionObserverEntry], this as never)
  }
  disconnect() {}
  unobserve() {}
  takeRecords() {
    return []
  }
}

describe('visitor counter animation', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('IntersectionObserver', VisibleObserver)
    ;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
  })
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('moves on to the live total when it arrives after the first animation', async () => {
    const container = document.createElement('div')
    const root = createRoot(container)

    // Server-rendered value (starting total only), already on screen.
    await act(async () => root.render(createElement(CountUp, { end: 1008 })))
    await act(async () => vi.advanceTimersByTime(2500))
    expect(container.textContent).toBe('1,008')

    // Live total from /api/visitors/track arrives later.
    await act(async () => root.render(createElement(CountUp, { end: 2913 })))
    await act(async () => vi.advanceTimersByTime(2500))
    expect(container.textContent).toBe('2,913')

    await act(async () => root.unmount())
  })
})
