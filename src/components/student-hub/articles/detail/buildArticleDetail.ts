import type { Article } from '@/payload-types'
import type { ArticleDetailData } from '@/components/student-hub/articles/detail/types'
import { mapFeaturedArticle } from '@/components/student-hub/articles/mapArticle'
import { renderArticleHtml } from '@/lib/articleContent'
import { richTextToPlain } from '@/lib/cms'

export function buildArticleDetail(doc: Article): ArticleDetailData {
  const base = mapFeaturedArticle(doc)
  const { html, sections } = renderArticleHtml(doc.content)
  const plain = richTextToPlain(doc.content, 12000)
  const cmsTags = doc.tags?.map((t) => t.tag).filter(Boolean) as string[] | undefined

  return {
    ...base,
    coverUrl: base.coverUrl,
    secondaryTag: doc.secondaryTag ?? (doc.category === 'digitalForensics' ? 'AI in Forensics' : undefined),
    tags:
      cmsTags && cmsTags.length > 0
        ? cmsTags
        : ['#AIinForensics', '#ArtificialIntelligence', '#DigitalForensics', '#CyberCrime', '#Forensics'],
    sections,
    htmlBody: html,
    bodyIntro:
      plain.split('\n\n')[0] ||
      doc.excerpt ||
      'Artificial intelligence is reshaping how forensic laboratories triage, correlate, and validate digital evidence across complex investigations.',
    bodyParagraphs: plain ? plain.split('\n\n').slice(1) : [],
    blockquote: doc.pullQuote?.text
      ? {
          text: doc.pullQuote.text,
          attribution: doc.pullQuote.attribution ?? '',
        }
      : undefined,
    authorBio:
      doc.authorBio ??
      `${doc.authorName} is a ${doc.authorTitle ?? 'forensic specialist'} with extensive experience in cybercrime investigations, digital evidence validation, and academic mentoring at AFRS.`,
  }
}

export function formatArticleDate(iso?: string | null): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return String(iso)
  }
}
