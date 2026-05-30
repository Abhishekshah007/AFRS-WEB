import type { ArticleCategory } from '@/components/student-hub/articles/types'

export const categoryLabels: Record<ArticleCategory, string> = {
  toxicology: 'Toxicology',
  ballistics: 'Ballistics',
  psychology: 'Psychology',
  dna: 'DNA',
  digitalForensics: 'Digital Forensics',
  odontology: 'Forensic Odontology',
  general: 'General',
}

export const categoryTagStyles: Record<ArticleCategory, string> = {
  toxicology: 'bg-sky-100 text-sky-700',
  ballistics: 'bg-violet-100 text-violet-700',
  psychology: 'bg-pink-100 text-pink-700',
  dna: 'bg-emerald-100 text-emerald-700',
  digitalForensics: 'bg-indigo-100 text-indigo-700',
  odontology: 'bg-teal-100 text-teal-700',
  general: 'bg-slate-100 text-slate-700',
}

export function getCategoryLabel(category: string): string {
  if (category in categoryLabels) return categoryLabels[category as ArticleCategory]
  return category
}

export function getCategoryTagClass(category: string): string {
  if (category in categoryTagStyles) return categoryTagStyles[category as ArticleCategory]
  return categoryTagStyles.general
}
