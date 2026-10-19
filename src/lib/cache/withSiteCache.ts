import { unstable_cache } from 'next/cache'

import type { SiteCacheTag } from '@/lib/cache/siteCacheTags'

/** Wrap a CMS loader with Next.js data cache + tags (invalidate on admin save). */
export function withSiteCache<T>(
  cacheKey: string,
  tags: SiteCacheTag[],
  loader: () => Promise<T>,
): () => Promise<T> {
  return unstable_cache(loader, [cacheKey], {
    tags: [...tags],
    revalidate: false,
  })
}
