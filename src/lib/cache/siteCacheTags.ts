/** Next.js cache tags for CMS-driven frontend data. Invalidate via revalidateTag on save. */
export const SITE_CACHE_TAGS = {
  all: 'cms',
  layout: 'cms:layout',
  home: 'cms:home',
  notices: 'cms:notices',
  services: 'cms:services',
  about: 'cms:about',
  events: 'cms:events',
  courses: 'cms:courses',
  studentHub: 'cms:student-hub',
  gallery: 'cms:gallery',
  articles: 'cms:articles',
  search: 'cms:search',
} as const

export type SiteCacheTag = (typeof SITE_CACHE_TAGS)[keyof typeof SITE_CACHE_TAGS]
