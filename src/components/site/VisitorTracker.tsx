'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { VISITOR_COUNT_EVENT } from '@/lib/site/visitorCountEvent'

type VisitorTrackingResponse = {
  uniqueVisitors: number
}

/** Set after this browser has been counted; the server cookie keeps it unique anyway. */
const COUNTED_KEY = 'afrs_visitor_counted_v1'

function alreadyCounted(): boolean {
  try {
    return window.localStorage.getItem(COUNTED_KEY) === '1'
  } catch {
    return false
  }
}

function markCounted(): void {
  try {
    window.localStorage.setItem(COUNTED_KEY, '1')
  } catch {
    // Private mode / blocked storage: the httpOnly cookie still prevents double counting.
  }
}

/**
 * Registers a new unique visitor once per browser (previously on every page navigation,
 * which made /api/visitors/track one of the most expensive serverless routes). Pages
 * render the full total on the server, so returning visitors need no request at all.
 */
export function VisitorTracker({ startingTotal }: { startingTotal: number }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || alreadyCounted()) return

    void fetch('/api/visitors/track', {
      method: 'POST',
      credentials: 'same-origin',
      cache: 'no-store',
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Visitor tracking failed with status ${response.status}`)
        }

        return (await response.json()) as VisitorTrackingResponse
      })
      .then(({ uniqueVisitors }) => {
        if (!Number.isFinite(uniqueVisitors) || uniqueVisitors < 0) {
          throw new Error('Visitor tracking returned an invalid count')
        }
        markCounted()

        window.dispatchEvent(
          new CustomEvent(VISITOR_COUNT_EVENT, {
            detail: startingTotal + uniqueVisitors,
          }),
        )
      })
      .catch((error: unknown) => {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[VisitorTracker] Unable to update the visitor counter:', error)
        }
      })
  }, [pathname, startingTotal])

  return null
}
