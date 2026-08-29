import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo/site'

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteUrl()
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/search', '/courses/register'],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  }
}
