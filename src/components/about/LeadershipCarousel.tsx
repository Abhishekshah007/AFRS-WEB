'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import type { LeaderProfile } from '@/components/about/types'
import { aboutTokens } from '@/components/about/tokens'

export type LeadershipCarouselProps = {
  leaders: LeaderProfile[]
}

/**
 * Paginates featured leadership cards (pairs) with prev/next controls.
 */
export function LeadershipCarousel({ leaders }: LeadershipCarouselProps) {
  const pairs: LeaderProfile[][] = []
  for (let i = 0; i < leaders.length; i += 2) {
    pairs.push(leaders.slice(i, i + 2))
  }
  if (pairs.length === 0) return null

  const [index, setIndex] = useState(0)
  const current = pairs[index] ?? pairs[0]
  const total = pairs.length

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total)
  }, [total])

  return (
    <div>
      <div
        className="grid gap-6 md:grid-cols-2"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured leadership profiles"
      >
        {current.map((leader) => (
          <article
            key={leader.id}
            className={`${aboutTokens.radiusCard} border border-slate-100 bg-white p-6 sm:p-8 shadow-sm card-pop text-center`}
          >
            <div className="relative mx-auto h-48 w-full max-w-[280px] overflow-hidden rounded-2xl bg-slate-100">
              {leader.photoUrl ? (
                <Image
                  src={leader.photoUrl}
                  alt={leader.name}
                  fill
                  sizes="280px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--about-primary)] to-indigo-800 text-4xl font-bold text-white">
                  {leader.initials}
                </div>
              )}
            </div>
            <h3 className="mt-6 text-lg font-extrabold text-[var(--about-text)]">{leader.name}</h3>
            <p className="mt-1 text-sm font-semibold text-[var(--about-primary)]">{leader.designation}</p>
            {leader.bio && (
              <p className={`mt-4 text-sm ${aboutTokens.body} line-clamp-3`}>{leader.bio}</p>
            )}
            <button
              type="button"
              className="mt-5 text-sm font-bold text-[var(--about-primary)] hover:underline"
              aria-label={`View profile for ${leader.name}`}
            >
              View Profile →
            </button>
          </article>
        ))}
      </div>

      {total > 1 && (
        <div className="mt-8 flex justify-center gap-3" role="group" aria-label="Carousel navigation">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--about-primary)] text-white shadow-md hover:bg-[var(--about-primary-hover)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--about-primary)]"
            aria-label="Previous leaders"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goNext}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--about-primary)] text-white shadow-md hover:bg-[var(--about-primary-hover)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--about-primary)]"
            aria-label="Next leaders"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
