import Image from 'next/image'
import Link from 'next/link'
import type { ArticleDetailData } from '@/components/student-hub/articles/detail/types'
import { studentHubTokens } from '@/components/student-hub/tokens'

export type ArticleBodyProps = {
  article: ArticleDetailData
}

export function ArticleBody({ article }: ArticleBodyProps) {
  const hasStructuredHtml = Boolean(article.htmlBody?.trim())

  return (
    <div className="article-body">
      {hasStructuredHtml ? (
        <div
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: article.htmlBody as string }}
        />
      ) : (
        <>
          {article.bodyIntro ? (
            <p className={`text-base sm:text-lg ${studentHubTokens.body}`}>{article.bodyIntro}</p>
          ) : null}
          {article.bodyParagraphs.map((paragraph, index) => (
            <p key={`p-${index}`} className={`mt-5 text-sm sm:text-base ${studentHubTokens.body}`}>
              {paragraph}
            </p>
          ))}
          {article.blockquote ? (
            <blockquote className="mt-8 rounded-2xl bg-sky-50 border-l-4 border-[var(--articles-primary)] px-6 py-6">
              <p className="mt-2 text-base italic text-slate-700 leading-relaxed">
                {article.blockquote.text}
              </p>
              {article.blockquote.attribution ? (
                <footer className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  — {article.blockquote.attribution}
                </footer>
              ) : null}
            </blockquote>
          ) : null}
        </>
      )}

      {article.figure?.src ? (
        <figure className="mt-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900">
            <Image
              src={article.figure.src}
              alt={article.figure.alt}
              fill
              sizes="(max-width: 768px) 100vw, 65vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
          {article.figure.caption ? (
            <figcaption className="mt-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-xs text-slate-500 italic">
              {article.figure.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      {article.tags.length > 0 ? (
        <div className="mt-10 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/student-hub/articles?q=${encodeURIComponent(tag.replace('#', ''))}`}
              className="rounded-full bg-slate-100 hover:bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition"
            >
              {tag.startsWith('#') ? tag : `#${tag}`}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}
