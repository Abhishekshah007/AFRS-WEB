import Link from 'next/link'
import Image from 'next/image'
import type { ArticleDetailData } from '@/components/student-hub/articles/detail/types'
import { formatArticleDate } from '@/components/student-hub/articles/detail/buildArticleDetail'
import { getCategoryTagClass } from '@/components/student-hub/articles/categoryStyles'
import { ArticleShareActions } from '@/components/student-hub/articles/detail/ArticleShareActions'
import { studentHubTokens } from '@/components/student-hub/tokens'

export type ArticleDetailHeroProps = {
  article: ArticleDetailData
}

/**
 * Article header: tags, title, author row, actions, and hero visual.
 */
export function ArticleDetailHero({ article }: ArticleDetailHeroProps) {
  const tagClass = getCategoryTagClass(article.category)
  const dateLabel = formatArticleDate(article.publishedDate)

  return (
    <header className="pb-8 border-b border-slate-100">
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${tagClass}`}>
          {article.categoryLabel}
        </span>
        {article.secondaryTag && (
          <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide bg-sky-100 text-sky-700">
            {article.secondaryTag}
          </span>
        )}
      </div>

      <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-[var(--hub-text)] leading-tight tracking-tight">
        {article.title}
      </h1>

      <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-[var(--articles-accent)] text-white flex items-center justify-center text-lg font-bold overflow-hidden shrink-0">
            {article.authorAvatarUrl ? (
              <Image src={article.authorAvatarUrl} alt="" width={48} height={48} className="h-full w-full object-cover" />
            ) : (
              article.authorName.charAt(0)
            )}
          </div>
          <div>
            <p className="font-bold text-slate-900">{article.authorName}</p>
            <p className="text-sm text-slate-500">
              {dateLabel && `${dateLabel} · `}
              {article.readTimeMinutes} min read
            </p>
          </div>
        </div>
        <ArticleShareActions articleSlug={article.slug} title={article.title} />
      </div>

      <div className="mt-8 relative aspect-[21/9] sm:aspect-[2.5/1] rounded-2xl overflow-hidden bg-[#1b5e20]">
        {article.coverUrl ? (
          <Image src={article.coverUrl} alt="" fill sizes="(max-width: 1024px) 100vw, 70vw" className="object-cover" priority />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/80" aria-hidden>
            <div className="text-center">
              <svg viewBox="0 0 64 64" className="mx-auto w-24 h-24 stroke-white fill-none stroke-2">
                <path d="M8 48 L32 12 L56 48 Z" />
                <rect x="20" y="38" width="24" height="14" rx="2" />
              </svg>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider opacity-70">Featured article</p>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
