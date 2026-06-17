import { DESIGN_SYSTEM } from '@/lib/design-system'

export const UI = {
  container: DESIGN_SYSTEM.container,

  section: DESIGN_SYSTEM.sectionY,

  sectionSmall: DESIGN_SYSTEM.sectionYSmall,

  sectionSurface: 'bg-[#F8FAFC]',

  transition: DESIGN_SYSTEM.transition,

  card:
    `rounded-[24px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,.08)]`,

  cardSmall:
    `rounded-[18px] bg-white border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,.06)]`,

  cardInteractive:
    `rounded-[24px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,.08)] hover:shadow-[0_20px_40px_rgba(15,23,42,.12)] transition`,

  heroGradient: 'linear-gradient(117.28deg, #6366F1 0%, #3B82F6 100%)',

  afslGradient: 'linear-gradient(117.28deg, #6366F1 0%, #3B82F6 100%)',

  quickLinksGradient: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',

  title: DESIGN_SYSTEM.typography.h2,

  titleLarge: DESIGN_SYSTEM.typography.h1,

  subtitle:
    `mt-4 ${DESIGN_SYSTEM.typography.bodyLarge} text-slate-500`,

  body:
    `${DESIGN_SYSTEM.typography.body} text-slate-600`,

  bodyLarge:
    `${DESIGN_SYSTEM.typography.bodyLarge} text-slate-600`,

  bodySmall:
    `${DESIGN_SYSTEM.typography.bodySmall} text-slate-500`,

  labelSmall: `${DESIGN_SYSTEM.typography.label} text-slate-500`,

  badge: 'inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-semibold',

  buttonPrimary:
    'inline-flex h-12 items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 px-8 text-sm font-bold shadow-lg shadow-black/20 transition',

  buttonSecondary:
    'inline-flex h-12 items-center justify-center rounded-full border-2 border-white bg-white/95 text-slate-900 hover:bg-white px-8 text-sm font-bold transition',

  buttonOutline:
    'inline-flex h-12 items-center justify-center rounded-xl border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 text-sm font-bold transition',

  buttonSmall:
    'inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-bold transition',
}

export const GRADIENT = {
  hero: UI.heroGradient,
  afsl: UI.afslGradient,
  quickLinks: UI.quickLinksGradient,
}

export const TYPOGRAPHY = {
  hero: DESIGN_SYSTEM.typography.h1,

  sectionTitle: DESIGN_SYSTEM.typography.h2,

  cardTitle: DESIGN_SYSTEM.typography.h3,

  body: DESIGN_SYSTEM.typography.body,

  bodyLarge: DESIGN_SYSTEM.typography.bodyLarge,

  small: DESIGN_SYSTEM.typography.bodySmall,

  label: DESIGN_SYSTEM.typography.label,
}