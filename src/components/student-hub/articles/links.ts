export function getArticleHref(slug: string) {
  return `/student-hub/articles/${encodeURIComponent(slug)}`
}
