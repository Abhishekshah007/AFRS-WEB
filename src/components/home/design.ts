export const UI = {
  container: 'max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8',

  section: 'py-24',

  sectionSmall: 'py-16',

  card:
    'rounded-[24px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,.08)]',

  cardSmall:
    'rounded-[18px] bg-white border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,.06)]',

  cardInteractive:
    'rounded-[24px] bg-white border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,.08)] hover:shadow-[0_20px_40px_rgba(15,23,42,.12)] transition',

  heroGradient: 'linear-gradient(117.28deg, #6366F1 0%, #3B82F6 100%)',

  afslGradient: 'linear-gradient(117.28deg, #6366F1 0%, #3B82F6 100%)',

  quickLinksGradient: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',

  title:
    'text-[32px] lg:text-[40px] font-extrabold tracking-[-0.02em] text-slate-900 leading-[1.15]',

  titleLarge:
    'text-[48px] lg:text-[56px] font-extrabold tracking-[-0.03em] text-slate-900 leading-[1.08]',

  subtitle:
    'mt-4 text-[18px] leading-[1.8] text-slate-500',

  body:
    'text-[16px] leading-[1.85] text-slate-600',

  bodyLarge:
    'text-[18px] leading-[1.85] text-slate-600',

  bodySmall:
    'text-[14px] leading-[1.7] text-slate-500',

  labelSmall: 'text-[12px] uppercase tracking-wider font-semibold text-slate-500',

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
  hero: 'text-[48px] lg:text-[56px] font-extrabold leading-[1.08] tracking-[-0.03em]',

  sectionTitle:
    'text-[32px] lg:text-[40px] font-extrabold leading-[1.15] tracking-[-0.02em]',

  cardTitle:
    'text-[18px] lg:text-[20px] font-bold leading-[1.35]',

  body:
    'text-[16px] leading-[1.8] text-slate-600',

  bodyLarge:
    'text-[18px] leading-[1.8] text-slate-600',

  small:
    'text-[14px] leading-[1.7] text-slate-500',

  label:
    'text-[12px] font-semibold uppercase tracking-[0.12em]',
}