import { DESIGN_SYSTEM } from '@/lib/design-system'

/**
 * Student Hub design tokens (Figma: 375 / 768 / 1440).
 */
export const studentHubTokens = {
  container: DESIGN_SYSTEM.container,
  sectionY: DESIGN_SYSTEM.sectionYSmall,
  heading: `text-[var(--hub-text)] ${DESIGN_SYSTEM.typography.h2}`,
  body: `text-[var(--hub-text-muted)] ${DESIGN_SYSTEM.typography.body}`,
  radiusCard: DESIGN_SYSTEM.radius.card,
  radiusPill: DESIGN_SYSTEM.radius.pill,
  surface: 'hub-surface',
  linkCta: `text-xs font-bold uppercase tracking-wider text-[var(--hub-primary)] hover:underline inline-flex items-center gap-1`,
} as const
