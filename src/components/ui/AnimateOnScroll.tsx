'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right' | 'scale'

interface Props {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  stagger?: boolean
}

export function AnimateOnScroll({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  stagger = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const dirClass =
      direction === 'left' ? 'sr-left'
      : direction === 'right' ? 'sr-right'
      : direction === 'scale' ? 'sr-scale'
      : ''

    el.classList.add('sr', ...(dirClass ? [dirClass] : []))
    if (stagger) el.classList.add('stagger')
    if (delay) el.style.transitionDelay = `${delay}ms`

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [direction, delay, stagger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
