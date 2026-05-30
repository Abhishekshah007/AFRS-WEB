import Link from 'next/link'
import Image from 'next/image'
import type { ArticleListItem } from '@/components/student-hub/articles/types'
import { getCategoryTagClass } from '@/components/student-hub/articles/categoryStyles'
import { studentHubTokens } from '@/components/student-hub/tokens'

export type ArticleCardProps = {
  article: ArticleListItem
}

/**
 * Publication card for the recent articles grid.
 */
export function ArticleCard({ article }: ArticleCardProps) {
  const tagClass = getCategoryTagClass(article.category)

  return (
    <article className={`${studentHubTokens.radiusCard} border border-slate-100 bg-white overflow-hidden shadow-sm card-pop h-full flex flex-col`}>
      <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200">
        {article.coverUrl ? (
          <Image src={article.coverUrl} alt="" fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" loading="lazy" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30" aria-hidden>
            📄
          </div>
        )}
        <span className={`absolute top-3 left-3 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${tagClass}`}>
          {article.categoryLabel}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2">
          <Link href={`/student-hub/articles/${article.slug}`} className="hover:text-[var(--articles-primary)] transition">
            {article.title}
          </Link>
        </h3>
        <p className={`mt-2 text-xs flex-1 line-clamp-2 ${studentHubTokens.body}`}>{article.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>By {article.authorName}</span>
          <span className="flex items-center gap-1">
            <span aria-hidden>🕒</span>
            {article.readTimeMinutes} min
          </span>
        </div>
      </div>
    </article>
  )
}
