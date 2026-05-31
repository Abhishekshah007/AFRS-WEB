'use client'

import { motion } from 'motion/react'
import { heroItem, heroStagger } from '@/components/motion/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type HeroStaggerProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Staggered hero text/CTA entrance — drop into any hero section.
 */
export function HeroStagger({ children, className = '' }: HeroStaggerProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={heroStagger}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  )
}

export function HeroStaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div className={className} variants={heroItem}>
      {children}
    </motion.div>
  )
}
