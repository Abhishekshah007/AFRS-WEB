import Link from 'next/link'
import Image from 'next/image'
import type { RelatedArticlePreview } from '@/components/student-hub/articles/detail/types'
import { getCategoryTagClass } from '@/components/student-hub/articles/categoryStyles'
import { getArticleHref } from '@/components/student-hub/articles/links'

export type RelatedArticlesSidebarProps = {
  articles: RelatedArticlePreview[]
}

/**
 * Sidebar widget listing related publications.
 */
export function RelatedArticlesSidebar({ articles }: RelatedArticlesSidebarProps) {
  if (articles.length === 0) return null

  return (
    <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm" aria-labelledby="related-heading">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-[var(--articles-primary)]" aria-hidden>
          ◈
        </span>
        <h2 id="related-heading" className="text-[11px] font-bold uppercase tracking-widest text-slate-700">
          Related Articles
        </h2>
      </div>
      <ul className="space-y-5">
        {articles.map((item) => (
          <li key={item.id}>
            <article className="flex gap-3">
              <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                {item.coverUrl ? (
                  <Image src={item.coverUrl} alt="" fill sizes="64px" className="object-cover" loading="lazy" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-lg opacity-40">📄</div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span
                  className={`inline-block rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${getCategoryTagClass(item.category)}`}
                >
                  {item.tagLabel ?? item.categoryLabel}
                </span>
                <h3 className="mt-1.5 text-sm font-bold text-slate-900 leading-snug line-clamp-2">{item.title}</h3>
                <Link
                  href={getArticleHref(item.slug)}
                  className="mt-1 inline-block text-xs font-bold text-[var(--articles-primary)] hover:underline"
                >
                  Read more
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <Link
        href="/student-hub/articles"
        className="mt-5 block text-center text-xs font-bold text-[var(--articles-primary)] hover:underline"
      >
        View More Articles
      </Link>
    </aside>
  )
}
