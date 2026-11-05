import { describe, expect, it } from 'vitest'

import { getDefaultArticleDetail } from '@/components/student-hub/articles/content'
import { articleShareImageUrl, optimizeArticleSocialImage } from '@/lib/seo/metadata'

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

  it('optimizes Cloudinary article covers for social previews', () => {
    expect(
      optimizeArticleSocialImage(
        'https://res.cloudinary.com/example/image/upload/afrs/payload/media/article-cover.png',
      ),
    ).toBe(
      'https://res.cloudinary.com/example/image/upload/f_jpg,q_auto:good,w_1200,h_630,c_fill/afrs/payload/media/article-cover.png',
    )
  })

  it('does not alter non-Cloudinary or already transformed image URLs', () => {
    const localImage = '/api/media/file/article-cover.png'
    const transformedImage =
      'https://res.cloudinary.com/example/image/upload/w_1200,c_fill/afrs/article-cover.png'

    expect(optimizeArticleSocialImage(localImage)).toBe(localImage)
    expect(optimizeArticleSocialImage(transformedImage)).toBe(transformedImage)
  })

  it('provides a detail page for the fallback featured article', () => {
    const article = getDefaultArticleDetail('ai-driven-digital-forensics')

    expect(article?.title).toBe('Advancements in Digital Forensics: AI-Driven Evidence Analysis')
    expect(article?.bodyIntro).toBeTruthy()
  })
})
