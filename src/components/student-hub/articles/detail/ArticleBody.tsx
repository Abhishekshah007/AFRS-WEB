import Image from 'next/image'
import Link from 'next/link'
import type { ArticleDetailData } from '@/components/student-hub/articles/detail/types'
import { studentHubTokens } from '@/components/student-hub/tokens'

export type ArticleBodyProps = {
  article: ArticleDetailData
}

/**
 * Main article prose: intro, sections, blockquote, figure, and hashtag row.
 */
export function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <div className="article-body">
      <p className={`text-base sm:text-lg ${studentHubTokens.body}`}>{article.bodyIntro}</p>

      {article.bodyParagraphs.slice(0, 1).map((p, i) => (
        <p key={`p-${i}`} className={`mt-5 text-sm sm:text-base ${studentHubTokens.body}`}>
          {p}
        </p>
      ))}

      {article.sections[0] && (
        <>
          <h2
            id={article.sections[0].id}
            className="mt-10 text-xl font-extrabold text-[var(--articles-primary)] scroll-mt-28"
          >
            {article.sections[0].title}
          </h2>
          {article.bodyParagraphs.slice(1, 2).map((p, i) => (
            <p key={`s0-${i}`} className={`mt-4 text-sm sm:text-base ${studentHubTokens.body}`}>
              {p}
            </p>
          ))}
        </>
      )}

      {article.blockquote && (
        <blockquote className="mt-8 rounded-2xl bg-sky-50 border-l-4 border-[var(--articles-primary)] px-6 py-6">
          <span className="text-4xl text-[var(--articles-primary)]/40 leading-none font-serif" aria-hidden>
            &ldquo;
          </span>
          <p className="mt-2 text-base italic text-slate-700 leading-relaxed">{article.blockquote.text}</p>
          {article.blockquote.attribution && (
            <footer className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
              — {article.blockquote.attribution}
            </footer>
          )}
        </blockquote>
      )}

      {article.sections[1] && (
        <>
          <h2
            id={article.sections[1].id}
            className="mt-10 text-xl font-extrabold text-[var(--articles-primary)] scroll-mt-28"
          >
            {article.sections[1].title}
          </h2>
          {article.bodyParagraphs.slice(2, 3).map((p, i) => (
            <p key={`s1-${i}`} className={`mt-4 text-sm sm:text-base ${studentHubTokens.body}`}>
              {p}
            </p>
          ))}
        </>
      )}

      {article.figure && (
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
          <figcaption className="mt-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 text-xs text-slate-500 italic">
            {article.figure.caption}
          </figcaption>
        </figure>
      )}

      {article.sections.slice(2).map((section, idx) => (
        <div key={section.id}>
          <h2 id={section.id} className="mt-10 text-xl font-extrabold text-[var(--articles-primary)] scroll-mt-28">
            {section.title}
          </h2>
          {article.bodyParagraphs.slice(3 + idx).slice(0, 1).map((p, i) => (
            <p key={`${section.id}-${i}`} className={`mt-4 text-sm sm:text-base ${studentHubTokens.body}`}>
              {p}
            </p>
          ))}
        </div>
      ))}

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
    </div>
  )
}
