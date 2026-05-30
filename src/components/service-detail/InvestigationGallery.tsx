'use client'

import Image from 'next/image'
import { useCallback, useRef } from 'react'
import type { GallerySlide } from '@/components/service-detail/types'
import { serviceDetailTokens } from '@/components/service-detail/tokens'

export type InvestigationGalleryProps = {
  slides: GallerySlide[]
}

/**
 * Bento gallery with horizontal scroll controls for keyboard and pointer users.
 */
export function InvestigationGallery({ slides }: InvestigationGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollBy = useCallback((direction: 'prev' | 'next') => {
    const el = scrollRef.current
    if (!el) return
    const amount = direction === 'next' ? 320 : -320
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }, [])

  if (slides.length === 0) return null

  const [main, ...rest] = slides
  const topRight = rest[0]
  const midRight = rest[1]
  const bottomWide = rest[2]

  return (
    <section className={`${serviceDetailTokens.sectionY} bg-white`} aria-labelledby="gallery-heading">
      <div className={serviceDetailTokens.container}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 id="gallery-heading" className={`${serviceDetailTokens.heading} text-2xl sm:text-[28px]`}>
              Investigation Gallery
            </h2>
            <p className={`mt-2 text-sm ${serviceDetailTokens.body}`}>
              A glimpse into our laboratory, field work, and analytical workflows.
            </p>
          </div>
          <div className="flex gap-2" role="group" aria-label="Gallery navigation">
            <button
              type="button"
              onClick={() => scrollBy('prev')}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--svc-primary)] text-[var(--svc-primary)] hover:bg-[var(--svc-primary-soft)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label="Scroll gallery left"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy('next')}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--svc-primary)] text-[var(--svc-primary)] hover:bg-[var(--svc-primary-soft)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label="Scroll gallery right"
            >
              →
            </button>
          </div>
        </div>

        {/* Desktop bento */}
        <div className="hidden md:grid md:grid-cols-12 md:grid-rows-2 gap-4 md:h-[400px]">
          <GalleryTile slide={main} className="md:col-span-5 md:row-span-2 min-h-[240px]" sizes="40vw" priority={false} />
          {topRight && (
            <GalleryTile slide={topRight} className="md:col-span-3 min-h-[180px]" sizes="25vw" />
          )}
          {midRight && (
            <GalleryTile slide={midRight} className="md:col-span-4 min-h-[180px]" sizes="30vw" />
          )}
          {bottomWide && (
            <GalleryTile slide={bottomWide} className="md:col-span-7 min-h-[180px]" sizes="45vw" />
          )}
        </div>

        {/* Mobile horizontal scroll */}
        <div
          ref={scrollRef}
          className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4"
          tabIndex={0}
          role="region"
          aria-label="Investigation gallery scroll"
        >
          {slides.map((slide) => (
            <div key={slide.id} className="relative shrink-0 w-[85vw] max-w-sm aspect-[4/3] snap-center overflow-hidden rounded-2xl">
              <Image src={slide.src} alt={slide.alt} fill sizes="85vw" className="object-cover" loading="lazy" />
              <GalleryCaption caption={slide.caption} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryTile({
  slide,
  className,
  sizes,
  priority,
}: {
  slide: GallerySlide
  className: string
  sizes: string
  priority?: boolean
}) {
  return (
    <figure className={`relative overflow-hidden rounded-2xl ${className}`}>
      <Image src={slide.src} alt={slide.alt} fill sizes={sizes} className="object-cover" loading="lazy" priority={priority} />
      <GalleryCaption caption={slide.caption} />
    </figure>
  )
}

function GalleryCaption({ caption }: { caption: string }) {
  return (
    <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
      <span className="text-sm font-bold text-white">{caption}</span>
    </figcaption>
  )
}
