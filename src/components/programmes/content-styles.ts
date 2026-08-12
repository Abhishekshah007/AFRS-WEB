import type { HubEventCard } from '@/components/programmes/types'

export const tagToneClass: Record<'blue' | 'green' | 'purple' | 'orange' | 'slate', string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-emerald-100 text-emerald-700',
  purple: 'bg-violet-100 text-violet-700',
  orange: 'bg-orange-100 text-orange-700',
  slate: 'bg-slate-100 text-slate-600',
}

export const eventVisualClass: Record<HubEventCard['visualTone'], string> = {
  blue: 'bg-blue-50',
  orange: 'bg-orange-50',
  purple: 'bg-violet-50',
}
