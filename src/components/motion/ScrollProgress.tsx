'use client'

import { motion, useScroll, useSpring } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Top-of-viewport scroll progress bar — instant feedback while browsing.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]"
      style={{ scaleX }}
      aria-hidden
    />
  )
}
