import type { HubEventCard } from '@/components/programmes/types'

export const tagToneClass: Record<'blue' | 'green' | 'purple' | 'orange' | 'slate', string> = {
  blue: 'bg-brand-100 text-brand-700',
  green: 'bg-brand-50 text-brand-600',
  purple: 'bg-brand-200/50 text-brand-500',
  orange: 'bg-brand-200/60 text-brand-700',
  slate: 'bg-slate-100 text-slate-600',
}

export const eventVisualClass: Record<HubEventCard['visualTone'], string> = {
  blue: 'bg-brand-50',
  orange: 'bg-brand-100',
  purple: 'bg-brand-200/40',
}
