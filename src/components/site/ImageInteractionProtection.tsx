'use client'

import { useEffect } from 'react'

function isImageTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest('img, picture'))
}

export function ImageInteractionProtection() {
  useEffect(() => {
    const preventImageContextMenu = (event: MouseEvent) => {
      if (isImageTarget(event.target)) event.preventDefault()
    }

    const preventImageDrag = (event: DragEvent) => {
      if (isImageTarget(event.target)) event.preventDefault()
    }

    document.addEventListener('contextmenu', preventImageContextMenu, true)
    document.addEventListener('dragstart', preventImageDrag, true)

    return () => {
      document.removeEventListener('contextmenu', preventImageContextMenu, true)
      document.removeEventListener('dragstart', preventImageDrag, true)
    }
  }, [])

  return null
}
