'use client'

import { useEffect } from 'react'

export function ContentInteractionGuard() {
  useEffect(() => {
    const preventContextMenu = (event: MouseEvent) => {
      event.preventDefault()
    }

    const preventDrag = (event: DragEvent) => {
      event.preventDefault()
    }

    const preventCopyOrCut = (event: ClipboardEvent) => {
      event.preventDefault()
    }

    const preventClipboardShortcuts = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        ['a', 'c', 's', 'x'].includes(event.key.toLowerCase())
      ) {
        event.preventDefault()
      }
    }

    document.addEventListener('contextmenu', preventContextMenu, true)
    document.addEventListener('dragstart', preventDrag, true)
    document.addEventListener('copy', preventCopyOrCut, true)
    document.addEventListener('cut', preventCopyOrCut, true)
    document.addEventListener('keydown', preventClipboardShortcuts, true)

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu, true)
      document.removeEventListener('dragstart', preventDrag, true)
      document.removeEventListener('copy', preventCopyOrCut, true)
      document.removeEventListener('cut', preventCopyOrCut, true)
      document.removeEventListener('keydown', preventClipboardShortcuts, true)
    }
  }, [])

  return null
}
