import type { ArticleListItem, FeaturedArticle } from '@/components/student-hub/articles/types'

export type ArticleSection = {
  id: string
  title: string
}

export type ArticleBlockquote = {
  text: string
  attribution: string
}

export type ArticleFigure = {
  src: string
  caption: string
  alt: string
}

export type ArticleDetailData = FeaturedArticle & {
  secondaryTag?: string
  tags: string[]
  sections: ArticleSection[]
  htmlBody?: string
  bodyIntro: string
  bodyParagraphs: string[]
  blockquote?: ArticleBlockquote
  figure?: ArticleFigure
  authorBio: string
}

export type RelatedArticlePreview = ArticleListItem & {
  tagLabel?: string
}
