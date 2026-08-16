import { describe, expect, it } from 'vitest'

import { mapFeaturedArticle } from '@/components/student-hub/articles/mapArticle'
import type { Article } from '@/payload-types'

describe('Featured article mapping', () => {
    it('exposes a cover image for the featured article card', () => {
        const article = {
            id: 42,
            slug: 'feature-article',
            title: 'Featured Article',
            excerpt: 'A brief summary',
            category: 'general',
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
})
