import { DESIGN_SYSTEM } from '@/lib/design-system'

/**
 * Programmes & Events page design tokens.
 */
export const programmesTokens = {
  container: DESIGN_SYSTEM.container,
  sectionY: DESIGN_SYSTEM.sectionYSmall,
  heading: `text-[var(--prog-text)] ${DESIGN_SYSTEM.typography.h2}`,
  body: `text-[var(--prog-text-muted)] ${DESIGN_SYSTEM.typography.body}`,
  radiusCard: DESIGN_SYSTEM.radius.card,
  radiusBtn: DESIGN_SYSTEM.radius.button,
} as const

export const PROGRAMME_IMAGES = {
  gallery1: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1777273424/WhatsApp_Image_2026-04-15_at_11.53.12_PM_u2uvdf.jpg',
  gallery2: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1777273424/WhatsApp_Image_2026-04-15_at_11.54.13_PM_gzfbix.jpg',
  gallery3: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1777658711/d8sz7npdnmpz7pqeb78v.jpg',
} as const
