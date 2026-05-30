/**
 * Student Hub design tokens (Figma: 375 / 768 / 1440).
 */
export const studentHubTokens = {
  container: 'max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0',
  sectionY: 'py-14 md:py-16 lg:py-20',
  heading: 'text-[var(--hub-text)] font-extrabold tracking-tight',
  body: 'text-[var(--hub-text-muted)] leading-relaxed',
  radiusCard: 'rounded-2xl',
  radiusPill: 'rounded-full',
  linkCta: 'text-xs font-bold uppercase tracking-wider text-[var(--hub-primary)] hover:underline inline-flex items-center gap-1',
} as const
