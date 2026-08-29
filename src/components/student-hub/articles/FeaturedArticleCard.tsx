import Link from 'next/link'
import { getArticleHref } from '@/components/student-hub/articles/links'
import type { FeaturedArticle } from '@/components/student-hub/articles/types'
import { studentHubTokens } from '@/components/student-hub/tokens'
import Image from 'next/image'

export type FeaturedArticleCardProps = Readonly<{
  article: FeaturedArticle
}>

function formatDate(iso?: string) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

/**
 * Editor’s Choice horizontal feature card.
 */
export function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
  const imageSrc = article.imageSrc ?? article.coverUrl

  return (
    <article
      className={`${studentHubTokens.radiusCard} overflow-hidden bg-white shadow-lg border border-slate-100 grid md:grid-cols-2 card-pop`}
      aria-labelledby="featured-article-title"
    >
      <div className="relative min-h-55 md:min-h-full bg-[#1b5e20] flex items-center justify-center p-8 overflow-hidden">
        <span className="absolute top-4 left-4 z-10 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          Editor&apos;s Choice
        </span>

        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="relative z-10 text-center text-white/90" aria-hidden>
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 text-4xl">
              📄
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider opacity-80">
              Featured Article
            </p>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-8 flex flex-col">
        <p className="text-xs font-semibold text-[var(--articles-primary)] flex items-center gap-2">
          <span aria-hidden>📖</span>
          {article.readTimeMinutes} min read
          {article.publishedDate && (
            <>
              <span className="text-slate-300">•</span>
              {formatDate(article.publishedDate)}
            </>
          )}
        </p>
        <h2
          id="featured-article-title"
          className="mt-3 text-xl sm:text-2xl font-extrabold text-[var(--hub-text)] leading-snug"
        >
          {article.title}
        </h2>
        <p className={`mt-3 text-sm flex-1 ${studentHubTokens.body} text-justify`}>
          {article.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[var(--articles-accent)] text-white flex items-center justify-center text-sm font-bold">
              {article.authorName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{article.authorName}</p>
              {article.authorTitle && (
                <p className="text-xs text-slate-500">{article.authorTitle}</p>
              )}
            </div>
          </div>
          <Link
            href={getArticleHref(article.slug)}
            className="text-sm font-bold text-[var(--articles-primary)] hover:underline shrink-0"
          >
            Read More <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
