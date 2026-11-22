import type { Metadata } from 'next'
import { absoluteUrl, BRAND_LEGAL, BRAND_SHORT, clipMeta, DEFAULT_OG_IMAGE, getSiteUrl } from './site'

type PageMetaInput = {
  title: string
  description: string
  path: string
  image?: string | null
  index?: boolean
  type?: 'website' | 'article'
  publishedTime?: string | null
  modifiedTime?: string | null
  authors?: string[]
  keywords?: string[]
}

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  index = true,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  keywords,
}: PageMetaInput): Metadata {
  const desc = clipMeta(description, 160)
  const url = absoluteUrl(path)
  const ogImage = image && image.length > 0 ? image : DEFAULT_OG_IMAGE
  const ogImageAbs = ogImage.startsWith('http') ? ogImage : absoluteUrl(ogImage)

  return {
    title,
    description: desc,
    keywords: keywords?.length ? keywords : undefined,
    alternates: { canonical: path },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        }
      : { index: false, follow: false },
    openGraph: {
      type,
      siteName: BRAND_LEGAL,
      locale: 'en_IN',
      url,
      title: `${title} | ${BRAND_SHORT}`,
      description: desc,
      images: [{ url: ogImageAbs, alt: title }],
      ...(type === 'article'
        ? {
            publishedTime: publishedTime || undefined,
            modifiedTime: modifiedTime || undefined,
            authors: authors?.length ? authors : undefined,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${BRAND_SHORT}`,
      description: desc,
      images: [ogImageAbs],
    },
  }
}

/**
 * Site-relative URL of the generated article image (/api/og/article). The same image is
 * used as the social share preview and as the on-site cover until an editor uploads one.
 */
export function articleGeneratedImagePath(
  title: string,
  category?: string | null,
  categoryLabel?: string | null,
): string {
  const params = new URLSearchParams({ title, category: category || 'general' })
  if (categoryLabel?.trim()) params.set('label', categoryLabel.trim())
  return `/api/og/article?${params.toString()}`
}

/** True for the generated /api/og/article image (serve as-is; it is already optimised and CDN-cached). */
export function isGeneratedArticleImage(url: string | null | undefined): boolean {
  return Boolean(url?.startsWith('/api/og/article'))
}

export function articleShareImageUrl(
  title: string,
  category?: string | null,
  categoryLabel?: string | null,
): string {
  return absoluteUrl(articleGeneratedImagePath(title, category, categoryLabel))
}

/**
 * Share-friendly version of an event poster: whole image kept (no crop), at most
 * 1200px, compressed JPEG. Large original posters (several MB) are often skipped by
 * WhatsApp's link preview, which then shows no thumbnail.
 */
export function optimizePosterSocialImage(imageUrl: string): string {
  const match = imageUrl.match(/^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/)
  if (!match) return imageUrl
  const [baseUrl, assetPath] = match.slice(1)
  if (assetPath.split('/')[0].includes(',')) return imageUrl
  return `${baseUrl}f_jpg,q_auto:good,w_1200,h_1200,c_limit/${assetPath}`
}

export function optimizeArticleSocialImage(imageUrl: string): string {
  const match = imageUrl.match(
    /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/,
  )
  if (!match) return imageUrl

  const [baseUrl, assetPath] = match.slice(1)
  if (assetPath.split('/')[0].includes(',')) return imageUrl

  return `${baseUrl}f_jpg,q_auto:good,w_1200,h_630,c_fill/${assetPath}`
}

export function rootMetadataBase() {
  return new URL(getSiteUrl())
}
