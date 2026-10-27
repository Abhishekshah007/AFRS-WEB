'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { VISITOR_COUNT_EVENT } from '@/lib/site/visitorCountEvent'

type VisitorTrackingResponse = {
  uniqueVisitors: number
}

export function VisitorTracker({ startingTotal }: { startingTotal: number }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

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
