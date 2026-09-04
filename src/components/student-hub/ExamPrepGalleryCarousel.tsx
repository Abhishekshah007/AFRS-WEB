'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { GallerySlide } from '@/components/service-detail/types'
import { studentHubTokens } from '@/components/student-hub/tokens'

export type ExamPrepGalleryCarouselProps = {
  slides: GallerySlide[]
  title?: string
  subtitle?: string
}

/**
 * Horizontal snap carousel used after exam-prep FAQ sections.
 */
export function ExamPrepGalleryCarousel({
  slides,
  title = 'Gallery',
  subtitle = 'A look at AFRS coaching sessions, practice labs, and learner workshops.',
}: ExamPrepGalleryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = scrollRef.current
      if (!el || slides.length === 0) return
      const next = (index + slides.length) % slides.length
      const child = el.children[next] as HTMLElement | undefined
      child?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      setActive(next)
    },
    [slides.length],
  )

  const scrollBy = useCallback(
    (direction: 'prev' | 'next') => {
      scrollToIndex(direction === 'next' ? active + 1 : active - 1)
    },
    [active, scrollToIndex],
  )

  useEffect(() => {
    if (slides.length < 2) return
    const timer = window.setInterval(() => {
      scrollToIndex(active + 1)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [active, slides.length, scrollToIndex])

  if (slides.length === 0) return null

  return (
    <section
      id="gallery"
      className={`${studentHubTokens.sectionY} bg-white`}
      aria-labelledby="exam-gallery-heading"
    >
      <div className={studentHubTokens.container}>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="exam-gallery-heading"
              className="text-[26px] font-extrabold tracking-tight text-slate-900 sm:text-[34px]"
            >
              {title}
            </h2>
            <p className={`mt-3 max-w-2xl text-[15px] leading-relaxed ${studentHubTokens.body}`}>
              {subtitle}
            </p>
          </div>
          <div className="flex gap-2" role="group" aria-label="Gallery navigation">
            <button
              type="button"
              onClick={() => scrollBy('prev')}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-600 text-brand-700 transition hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label="Previous gallery image"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy('next')}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-600 text-brand-700 transition hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label="Next gallery image"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          role="region"
          aria-label="Exam preparation gallery"
        >
          {slides.map((slide) => (
            <figure
              key={slide.id}
              className="relative aspect-[4/3] w-[85vw] max-w-md shrink-0 snap-center overflow-hidden rounded-2xl sm:w-[420px]"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 85vw, 420px"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                <span className="text-sm font-bold text-white">{slide.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {slides.length > 1 ? (
          <div
            className="mt-5 flex justify-center gap-2"
            role="tablist"
            aria-label="Gallery slides"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Show gallery image ${index + 1}`}
                onClick={() => scrollToIndex(index)}
                className={`h-2.5 rounded-full transition ${index === active ? 'w-7 bg-brand-700' : 'w-2.5 bg-slate-300'}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
