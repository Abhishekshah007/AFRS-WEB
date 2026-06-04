import type { ArticleListItem, FeaturedArticle } from '@/components/student-hub/articles/types'

// Lexical types for rich text
type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
}

type LexicalRoot = {
  root?: {
    children?: LexicalNode[]
  }
}

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
  bodyIntro: string
  bodyParagraphs: string[]
  blockquote?: ArticleBlockquote
  figure?: ArticleFigure
  authorBio: string
  richTextBody?: LexicalRoot | null
}

export type RelatedArticlePreview = ArticleListItem & {
  tagLabel?: string
}
