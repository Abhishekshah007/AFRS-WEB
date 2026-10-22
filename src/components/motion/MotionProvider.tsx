'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'
import { registerLenis } from '@/components/motion/lenisController'
import { useCoarsePointer } from '@/hooks/useCoarsePointer'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type MotionProviderProps = {
  children: React.ReactNode
}

/**
 * Initializes buttery Lenis smooth scroll (disabled when user prefers reduced motion).
 */
export function MotionProvider({ children }: MotionProviderProps) {
  const reduced = useReducedMotion()
  const coarsePointer = useCoarsePointer()

  useEffect(() => {
    if (reduced || coarsePointer) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    document.documentElement.classList.add('lenis', 'lenis-smooth')
    registerLenis(lenis)

    return () => {
      cancelAnimationFrame(rafId)
      registerLenis(null)
      lenis.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [reduced, coarsePointer])

  return children
}
