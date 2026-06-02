import Link from 'next/link'
import type { ArticleListItem } from '@/components/student-hub/articles/types'
import { formatArticleDate } from '@/components/student-hub/articles/detail/buildArticleDetail'
import { getArticleHref } from '@/components/student-hub/articles/links'
import { studentHubTokens } from '@/components/student-hub/tokens'

export type ReadNextSectionProps = {
  nextArticle: ArticleListItem | null
}

/**
 * Full-width “Up Next” CTA before the global footer.
 */
export function ReadNextSection({ nextArticle }: ReadNextSectionProps) {
  if (!nextArticle) return null

  const date = formatArticleDate(nextArticle.publishedDate)

  return (
    <section className="bg-slate-50/90 border-t border-slate-100 py-12 md:py-14" aria-labelledby="read-next-heading">
      <div className={`${studentHubTokens.container} max-w-3xl text-center`}>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--articles-primary)]">Up Next</p>
        <h2 id="read-next-heading" className="mt-3 text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
          {nextArticle.title}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          {date && `${date} · `}
          {nextArticle.readTimeMinutes} min read
        </p>
        <Link
          href={getArticleHref(nextArticle.slug)}
          className="mt-6 inline-flex h-12 w-full max-w-md items-center justify-center rounded-xl bg-[var(--articles-primary)] hover:bg-[var(--articles-primary-hover)] text-white text-sm font-bold transition shadow-md"
        >
          Read Next Article <span aria-hidden className="ml-1">→</span>
        </Link>
      </div>
    </section>
  )
}
