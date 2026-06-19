import { DESIGN_SYSTEM } from '@/lib/design-system'

/**
 * About page design tokens — align with Figma (375 / 768 / 1440 breakpoints).
 * Prefer these constants over magic numbers in section components.
 */
export const aboutTokens = {
  container: DESIGN_SYSTEM.container,
  sectionY: DESIGN_SYSTEM.sectionY,
  sectionAlt: 'bg-[var(--about-surface-alt)]',
  heading: `text-[var(--about-text)] ${DESIGN_SYSTEM.typography.h2}`,
  body: `text-[var(--about-text-muted)] ${DESIGN_SYSTEM.typography.body}`,
  radiusCard: DESIGN_SYSTEM.radius.card,
  radiusImage: DESIGN_SYSTEM.radius.card,
  radiusBtn: DESIGN_SYSTEM.radius.button,
  primaryBtn:
    'inline-flex items-center justify-center h-12 px-8 text-sm font-bold bg-white text-[var(--about-primary)] hover:bg-blue-50 transition shadow-sm',
  outlineBtn:
    'inline-flex items-center justify-center h-12 px-8 text-sm font-bold border-2 border-white/80 text-white hover:bg-white/10 transition',
} as const

export const ABOUT_IMAGES = {
  hero:
    'https://www.appliedforensicresearchsciences.in/static/media/carousel-10.6bcf7e5d176fb7d57b28.jpeg',
  vision:
    'https://res.cloudinary.com/drrzakkgo/image/upload/v1771598995/fksf2djlhilr2qbhrivx.jpg',
  mission:
    'https://www.appliedforensicresearchsciences.in/static/media/carousel-6.37510e2cbc3800979dc5.jpeg',
  purpose:
    'https://res.cloudinary.com/drrzakkgo/image/upload/v1761223493/WhatsApp_Image_2025-10-18_at_7.02.05_PM_zepm0d.jpg',
  award1:
    'https://res.cloudinary.com/drrzakkgo/image/upload/v1777273424/WhatsApp_Image_2026-04-15_at_11.53.12_PM_u2uvdf.jpg',
  award2:
    'https://res.cloudinary.com/drrzakkgo/image/upload/v1777273424/WhatsApp_Image_2026-04-15_at_11.54.13_PM_gzfbix.jpg',
  award3:
    'https://res.cloudinary.com/drrzakkgo/image/upload/v1777658711/d8sz7npdnmpz7pqeb78v.jpg',
} as const
