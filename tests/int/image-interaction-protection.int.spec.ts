import { act, createElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

import { ImageInteractionProtection } from '@/components/site/ImageInteractionProtection'

describe('site image interaction protection', () => {
  let root: Root | null = null
  let container: HTMLDivElement | null = null

  beforeAll(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true
  })

  afterEach(() => {
    act(() => {
      root?.unmount()
    })
    container?.remove()
    root = null
    container = null
  })

  function renderProtection() {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    act(() => {
      root?.render(createElement(ImageInteractionProtection))
    })
  }

  it('prevents image context menus and dragging without blocking normal context menus', () => {
    renderProtection()

    const image = document.createElement('img')
    document.body.appendChild(image)
    const imageMenu = new MouseEvent('contextmenu', { bubbles: true, cancelable: true })
    const imageDrag = new Event('dragstart', { bubbles: true, cancelable: true })
    const textMenu = new MouseEvent('contextmenu', { bubbles: true, cancelable: true })

    image.dispatchEvent(imageMenu)
    image.dispatchEvent(imageDrag)
    document.body.dispatchEvent(textMenu)

    expect(imageMenu.defaultPrevented).toBe(true)
    expect(imageDrag.defaultPrevented).toBe(true)
    expect(textMenu.defaultPrevented).toBe(false)

    image.remove()
  })
})
