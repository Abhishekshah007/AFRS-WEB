import { CMS_ARTICLE_CATEGORY_OPTIONS } from '@/data/article-categories'

const TAG_PALETTE = [
  'bg-brand-50 text-brand-700',
  'bg-brand-100 text-brand-600',
  'bg-brand-200/50 text-brand-700',
  'bg-brand-50 text-brand-500',
  'bg-brand-100 text-brand-700',
  'bg-brand-200/40 text-brand-600',
  'bg-brand-50 text-brand-700',
  'bg-brand-100 text-brand-500',
  'bg-brand-200/60 text-brand-700',
  'bg-slate-100 text-slate-700',
]

/** Built-in categories keep the colours they always had. */
const BUILT_IN_TAG_STYLES = new Map<string, string>(
  CMS_ARTICLE_CATEGORY_OPTIONS.map((option, index) => [
    option.value,
    TAG_PALETTE[index % TAG_PALETTE.length],
  ]),
)

/** Stable palette slot for categories editors add later in the CMS. */
function hashSlug(slug: string): number {
  let hash = 0
  for (let i = 0; i < slug.length; i += 1) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  return hash
}

export function getCategoryTagClass(category: string): string {
  return (
    BUILT_IN_TAG_STYLES.get(category) ?? TAG_PALETTE[hashSlug(category) % TAG_PALETTE.length]
  )
}
