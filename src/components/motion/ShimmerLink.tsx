'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { springSnappy } from '@/components/motion/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type ShimmerLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'ghost' | 'white'
}

const variantClass = {
  primary: 'btn-shimmer btn-shimmer-primary',
  ghost: 'btn-shimmer btn-shimmer-ghost',
  white: 'btn-shimmer btn-shimmer-white',
}

/**
 * CTA link with magnetic hover + shimmer sweep.
 */
export function ShimmerLink({ href, children, className = '', variant = 'primary' }: ShimmerLinkProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      whileHover={reduced ? undefined : { scale: 1.04, y: -2 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={springSnappy}
      className="inline-block"
    >
      <Link href={href} className={`${variantClass[variant]} ${className}`}>
        {children}
      </Link>
    </motion.div>
  )
}
