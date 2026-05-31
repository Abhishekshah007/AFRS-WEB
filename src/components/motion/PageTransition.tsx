'use client'

import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { pageEnter } from '@/components/motion/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type PageTransitionProps = {
  children: React.ReactNode
}

/**
 * Soft page enter on route change — gives every page a living feel.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const reduced = useReducedMotion()

  if (reduced) return <>{children}</>

  return (
    <motion.div
      key={pathname}
      initial={pageEnter.initial}
      animate={pageEnter.animate}
      exit={pageEnter.exit}
      className="page-transition-root"
    >
      {children}
    </motion.div>
  )
}
