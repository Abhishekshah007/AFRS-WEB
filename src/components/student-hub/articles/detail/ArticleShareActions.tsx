'use client'

export type ArticleShareActionsProps = {
  articleSlug: string
  title: string
}

/** Share/save actions — UI temporarily disabled; placeholder keeps layout stable. */
export function ArticleShareActions(_props: ArticleShareActionsProps) {
  return <div className="flex flex-wrap items-center gap-3" />
}
