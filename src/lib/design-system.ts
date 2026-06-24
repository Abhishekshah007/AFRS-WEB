/**
 * Global design system tokens for the AFRS Web App.
 * These align with the professional, forensic, and academic aesthetic of the project.
 * 
 * Typography Strategy:
 * - Headings: DM Sans (strong, scientific, modern with character)
 * - Body: Inter (readable, clean, professional)
 */
export const DESIGN_SYSTEM = {
  // Common layout containers
  container: 'max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8',
  containerNarrow: 'max-w-[800px] mx-auto px-4 sm:px-6',

  // Spacing
  sectionY: 'py-16 md:py-20 lg:py-24',
  sectionYSmall: 'py-12 md:py-14 lg:py-16',

  // Typography (DM Sans for headings, Inter for body)
  typography: {
    // Large Hero Headings (h1) — DM Sans
    h1: 'text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]',

    // Section Headings (h2) — DM Sans
    h2: 'text-3xl sm:text-[32px] lg:text-[40px] font-extrabold tracking-[-0.02em] leading-[1.15]',

    // Sub-section Headings (h3) — DM Sans
    h3: 'text-xl sm:text-2xl font-bold tracking-tight leading-snug',

    // Large Body Text — Inter
    bodyLarge: 'text-lg sm:text-xl leading-relaxed',

    // Standard Body Text — Inter
    body: 'text-base leading-relaxed',

    // Small/Muted Body Text — Inter
    bodySmall: 'text-sm leading-relaxed',

    // Labels / Eyebrows — Inter
    label: 'text-[11px] sm:text-xs font-bold uppercase tracking-widest',
  },

  // Interactive Elements
  radius: {
    card: 'rounded-2xl',
    cardLarge: 'rounded-3xl',
    button: 'rounded-xl',
    pill: 'rounded-full',
  },

  // Transitions
  transition: 'transition-all duration-300 ease-in-out',
} as const
