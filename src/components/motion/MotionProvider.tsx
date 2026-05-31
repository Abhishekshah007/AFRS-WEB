'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type MotionProviderProps = {
  children: React.ReactNode
}

/**
 * Initializes buttery Lenis smooth scroll (disabled when user prefers reduced motion).
 */
export function MotionProvider({ children }: MotionProviderProps) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    document.documentElement.classList.add('lenis', 'lenis-smooth')

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [reduced])

  return children
}
