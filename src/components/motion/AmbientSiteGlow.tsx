'use client'

import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Fixed ambient gradient orbs — subtle depth on every page without hurting readability.
 */
export function AmbientSiteGlow() {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div className="ambient-glow pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <motion.div
        className="ambient-orb ambient-orb-a"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient-orb ambient-orb-b"
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -25, 0], scale: [1, 0.92, 1.06, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="ambient-orb ambient-orb-c"
        animate={{ x: [0, 25, -35, 0], y: [0, -20, 35, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="ambient-noise" />
    </div>
  )
}
