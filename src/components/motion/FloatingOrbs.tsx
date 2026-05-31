'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type FloatingOrbsProps = {
  className?: string
  tone?: 'light' | 'dark'
}

/**
 * Hero decoration — soft floating blobs behind content.
 */
export function FloatingOrbs({ className = '', tone = 'dark' }: FloatingOrbsProps) {
  const reduced = useReducedMotion()
  if (reduced) return null

  const orbClass = tone === 'dark' ? 'hero-orb hero-orb-dark' : 'hero-orb hero-orb-light'

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <motion.div
        className={`${orbClass} hero-orb-1`}
        animate={{ y: [0, -18, 0], x: [0, 12, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${orbClass} hero-orb-2`}
        animate={{ y: [0, 22, 0], x: [0, -16, 0], scale: [1, 0.94, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${orbClass} hero-orb-3`}
        animate={{ y: [0, -12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
