import type { Article } from '@/payload-types'
import type { ArticleDetailData } from '@/components/student-hub/articles/detail/types'
import { mapFeaturedArticle } from '@/components/student-hub/articles/mapArticle'
import { richTextToPlain } from '@/lib/cms'

const defaultFigure = {
  src: '',
  caption: '',
  alt: '',
}

/** Rich default body when CMS content is empty — matches Student Hub article detail mockup. */
export function buildArticleDetail(doc: Article): ArticleDetailData {
  const base = mapFeaturedArticle(doc)
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
    sections: [],
    bodyIntro:
      plain.split('\n\n')[0] ||
      doc.excerpt ||
      'Artificial intelligence is reshaping how forensic laboratories triage, correlate, and validate digital evidence across complex investigations.',
    bodyParagraphs: plain
      ? plain.split('\n\n').slice(1)
      : [
          'Digital forensics once relied on manual keyword searches and linear timeline reconstruction. Today, machine-assisted workflows can surface hidden correlations across devices, cloud accounts, and network logs in minutes rather than weeks.',
          'At AFRS, we integrate AI as an investigative accelerator — not a replacement for expert judgment. Every automated finding passes through human validation, chain-of-custody review, and documented methodology before it reaches a case file or courtroom.',
        ],
    blockquote: doc.pullQuote?.text
      ? {
          text: doc.pullQuote.text,
          attribution: doc.pullQuote.attribution ?? '',
        }
      : undefined,

    authorBio:
      doc.authorBio ??
      `${doc.authorName} is a ${doc.authorTitle ?? 'forensic specialist'} with extensive experience in cybercrime investigations, digital evidence validation, and academic mentoring at AFRS.`,

    richTextBody: doc.content,
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
