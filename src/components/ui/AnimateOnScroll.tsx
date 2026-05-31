'use client'

import { Children, isValidElement, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  scaleIn,
  staggerContainer,
} from '@/components/motion/variants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Direction = 'up' | 'left' | 'right' | 'scale'

interface Props {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  stagger?: boolean
}

const directionVariants = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  scale: scaleIn,
}

/**
 * Scroll-triggered reveal — upgraded with Motion spring + blur for site-wide juice.
 * Drop-in replacement; all existing usages get the upgrade automatically.
 */
export function AnimateOnScroll({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  stagger = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px -40px 0px', amount: 0.15 })
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  const itemVariant = directionVariants[direction]

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      >
        {Children.map(children, (child, i) =>
          isValidElement(child) ? (
            <motion.div key={i} variants={itemVariant}>
              {child}
            </motion.div>
          ) : (
            child
          ),
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={itemVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}
