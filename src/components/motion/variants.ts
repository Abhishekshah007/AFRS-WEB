/** Shared Framer Motion variants — springy Gen-Z feel. */
export const springSnappy = { type: 'spring' as const, stiffness: 380, damping: 28, mass: 0.8 }
export const springSoft = { type: 'spring' as const, stiffness: 120, damping: 22, mass: 0.9 }
export const easeOutExpo = [0.16, 1, 0.3, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: springSoft,
  },
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -36, filter: 'blur(8px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: springSoft },
}

export const fadeRight = {
  hidden: { opacity: 0, x: 36, filter: 'blur(8px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: springSoft },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: springSoft },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
}

export const pageEnter = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: easeOutExpo },
  },
}

export const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}

export const heroItem = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: easeOutExpo },
  },
}
