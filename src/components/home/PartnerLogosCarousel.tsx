'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { resolveMediaUrl } from '@/lib/cms'
import type { Media } from '@/payload-types'

type Item = {
  id?: number | string
  name?: string
  logo?: number | Media | null
}

export default function PartnerLogosCarousel({ items }: { items: Item[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el || items.length === 0) return

    // Ensure there is enough content by duplicating items visually (we already render doubled list)
    let raf = 0
    const speed = 0.5 // pixels per frame

    const step = () => {
      if (!el) return
      el.scrollLeft = el.scrollLeft + speed
      // when we've scrolled past half (we duplicated items), jump back
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0
      }
      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [items])

  const rendered = items.length ? [...items, ...items] : []

  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex items-center gap-8"
        style={{
          WebkitOverflowScrolling: 'auto',
          // allow horizontal scroll without showing scrollbar
          overflowX: 'auto',
        }}
      >
        {rendered.map((it, i) => {
          const src = resolveMediaUrl(it.logo as any, '/assets/svg/afsl-logo.png')
          return (
            <div
              key={`${String(it.id ?? it.name)}-${i}`}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: 200 }}
            >
              <Image
                src={src}
                alt={it.name || 'Partner logo'}
                width={160}
                height={60}
                className="object-contain"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
