'use client'

import { useEffect, useRef } from 'react'

export type TestimonialCard = {
  id: string | number
  name: string
  title?: string | null
  testimonial: string
  rating?: number | null
}

type Variant = 'afrs' | 'afsl'

const variantStyles = {
  afrs: {
    card: 'rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm',
    avatar: 'bg-brand-100 text-brand-600 text-xl font-bold',
    name: 'font-bold text-slate-900',
    title: 'text-xs text-slate-400 mt-1',
    quote: 'mt-4 text-sm text-slate-600 leading-relaxed italic line-clamp-5',
    stars: 'text-amber-400 text-sm tracking-widest',
  },
  afsl: {
    card: 'rounded-[16px] border border-[#dce4ef] bg-[#FBF6EC] p-8 text-center shadow-sm',
    avatar: 'bg-[#75162D] text-lg font-black text-white',
    name: 'font-black text-[#1A0C0F]',
    title: 'mt-1 text-[11px] font-bold uppercase tracking-wide text-[#687487]',
    quote: 'mt-4 text-[13px] font-medium leading-6 text-[#5f6d80] italic line-clamp-5',
    stars: 'text-sm tracking-widest text-amber-500',
  },
} as const

function starsFor(rating?: number | null) {
  const count = Math.min(5, Math.max(1, rating || 5))
  return '★'.repeat(count)
}

function TestimonialMarqueeCard({
  item,
  styles,
  duplicate = false,
}: {
  item: TestimonialCard
  styles: (typeof variantStyles)[Variant]
  duplicate?: boolean
}) {
  return (
    <article
      className={`w-[300px] shrink-0 sm:w-[340px] ${styles.card}`}
      aria-hidden={duplicate || undefined}
    >
      <div
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${styles.avatar}`}
      >
        {item.name?.[0]?.toUpperCase() || '?'}
      </div>
      <p className={`mt-4 ${styles.name}`}>{item.name}</p>
      {item.title ? <p className={styles.title}>{item.title}</p> : null}
      <p className={styles.quote}>&ldquo;{item.testimonial}&rdquo;</p>
      <div className={`mt-4 ${styles.stars}`} aria-label={`${item.rating || 5} star rating`}>
        {starsFor(item.rating)}
      </div>
    </article>
  )
}

export function TestimonialsCarousel({
  items,
  variant = 'afrs',
}: {
  items: TestimonialCard[]
  variant?: Variant
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const styles = variantStyles[variant]

  useEffect(() => {
    const el = trackRef.current
    if (!el || items.length < 2) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let raf = 0
    const speed = 0.45

    const step = () => {
      if (!el || pausedRef.current) {
        raf = requestAnimationFrame(step)
        return
      }

      el.scrollLeft += speed
      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0
      }

      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [items])

  if (items.length === 0) return null

  const rendered = items.length > 1 ? [...items, ...items] : items

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
      onFocusCapture={() => {
        pausedRef.current = true
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          pausedRef.current = false
        }
      }}
    >
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        role="region"
        aria-label="Client testimonials"
      >
        {rendered.map((item, index) => (
          <TestimonialMarqueeCard
            key={`${item.id}-${index}`}
            item={item}
            styles={styles}
            duplicate={items.length > 1 && index >= items.length}
          />
        ))}
      </div>
    </div>
  )
}
