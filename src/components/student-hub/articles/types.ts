import type { ArticleCategoryValue } from '@/data/article-categories'

export type ArticleCategory = ArticleCategoryValue

export type ArticleListItem = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: ArticleCategory
  categoryLabel: string
  authorName: string
  readTimeMinutes: number
  coverUrl?: string
  publishedDate?: string
}

export type FeaturedArticle = ArticleListItem & {
  authorTitle?: string
  authorAvatarUrl?: string
  imageSrc?: string
}

export type TopicFilter = {
  id: string
  label: string
  value: ArticleCategory | 'all'
  icon?: string
}
