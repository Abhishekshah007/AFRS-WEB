import { describe, expect, it } from 'vitest'

import { getDefaultArticleDetail } from '@/components/student-hub/articles/content'
import { articleShareImageUrl } from '@/lib/seo/metadata'

describe('Article social image URL', () => {
  it('creates an absolute, article-specific OG image URL', () => {
    const imageUrl = new URL(
      articleShareImageUrl('Digital Evidence: A Practical Guide', 'digitalForensics'),
    )

    expect(imageUrl.pathname).toBe('/api/og/article')
    expect(imageUrl.searchParams.get('title')).toBe('Digital Evidence: A Practical Guide')
    expect(imageUrl.searchParams.get('category')).toBe('digitalForensics')
  })

  it('uses the general category when no category is provided', () => {
    const imageUrl = new URL(articleShareImageUrl('Forensic Research'))

    expect(imageUrl.searchParams.get('category')).toBe('general')
  })

  it('provides a detail page for the fallback featured article', () => {
    const article = getDefaultArticleDetail('ai-driven-digital-forensics')

    expect(article?.title).toBe('Advancements in Digital Forensics: AI-Driven Evidence Analysis')
    expect(article?.bodyIntro).toBeTruthy()
  })
})
