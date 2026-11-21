import { describe, expect, it } from 'vitest'

import { mapArticle, mapFeaturedArticle } from '@/components/student-hub/articles/mapArticle'
import type { Article, ArticleCategory } from '@/payload-types'

/** Populated relationship, as returned by Payload queries with depth >= 1. */
function articleCategory(slug: string): ArticleCategory {
  return {
    id: slug.length,
    slug,
    label: slug === 'general' ? 'General' : slug,
    updatedAt: '2026-08-16T00:00:00.000Z',
    createdAt: '2026-08-16T00:00:00.000Z',
  }
}

describe('Featured article mapping', () => {
    it('exposes a cover image for the featured article card', () => {
        const article = {
            id: 42,
            slug: 'feature-article',
            title: 'Featured Article',
            excerpt: 'A brief summary',
            category: articleCategory('general'),
            authorName: 'Dr. Sample',
            readTimeMinutes: 7,
            publishedDate: '2024-01-15',
            coverImage: {
                id: 999,
                url: '/test-cover.jpg',
            },
        } as Article

        const mapped = mapFeaturedArticle(article)

        expect(mapped.coverUrl).toBe('/test-cover.jpg')
        expect(mapped.imageSrc).toBe('/test-cover.jpg')
    })

    it('uses the Payload media route when a populated cover has no URL', () => {
        const article = {
            id: 43,
            slug: 'article-with-legacy-cover',
            title: 'Article With Legacy Cover',
            excerpt: 'A brief summary',
            category: articleCategory('general'),
            authorName: 'Dr. Sample',
            coverImage: {
                id: 1000,
                filename: 'cover image.jpg',
            },
        } as Article

        expect(mapArticle(article).coverUrl).toBe('/api/media/file/cover%20image.jpg')
    })

    it('falls back to the generated share image when no cover is uploaded', () => {
        const article = {
            id: 44,
            slug: 'article-without-cover',
            title: 'Bloodstain Pattern Basics',
            excerpt: 'A brief summary',
            category: {
                ...articleCategory('bloodstainAnalysis'),
                label: 'Bloodstain Pattern Analysis',
            },
            authorName: 'Dr. Sample',
            coverImage: null,
        } as Article

        const coverUrl = new URL(mapArticle(article).coverUrl!, 'https://example.test')
        expect(coverUrl.pathname).toBe('/api/og/article')
        expect(coverUrl.searchParams.get('title')).toBe('Bloodstain Pattern Basics')
        expect(coverUrl.searchParams.get('category')).toBe('bloodstainAnalysis')
        expect(coverUrl.searchParams.get('label')).toBe('Bloodstain Pattern Analysis')
    })
})
