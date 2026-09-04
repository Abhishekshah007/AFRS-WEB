import { galleryImages } from '@/components/home/sections/constants'
import type { SiteGalleryItem } from '@/components/gallery/SiteGallerySection'
import { defaultGallerySlides } from '@/components/service-detail/buildServiceContent'
import type { GallerySlide } from '@/components/service-detail/types'
import { SERVICE_DETAIL_IMAGES } from '@/components/service-detail/tokens'
import { resolveMediaUrl } from '@/lib/cms'
import { getPayloadClient } from '@/lib/payload'
import type { GalleryItem, Media } from '@/payload-types'

const FALLBACK_ITEMS: SiteGalleryItem[] = ['Lab', 'Training', 'Tech', 'Events'].map(
  (label, index) => ({
    key: label,
    label,
    image: galleryImages[index % galleryImages.length],
  }),
)

export function mapGalleryDocs(docs: GalleryItem[]): SiteGalleryItem[] {
  if (docs.length === 0) return FALLBACK_ITEMS

  return docs.map((item, index) => ({
    key: String(item.id),
    label: item.label || item.title || 'Gallery',
    image: resolveMediaUrl(item.image, galleryImages[index % galleryImages.length]),
  }))
}

export async function getFeaturedGalleryItems(limit = 4): Promise<SiteGalleryItem[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'galleryItems',
    where: { published: { equals: true }, featured: { equals: true } },
    limit,
    sort: 'order',
    depth: 1,
    overrideAccess: false,
  })

  return mapGalleryDocs(docs as GalleryItem[])
}

export async function getPublishedGallerySlides(limit = 8): Promise<GallerySlide[]> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'galleryItems',
      where: { published: { equals: true } },
      sort: 'order',
      limit,
      depth: 1,
      overrideAccess: false,
    })

    if (!docs.length) return defaultGallerySlides()

    const fallbacks = defaultGallerySlides()
    return (docs as GalleryItem[]).map((item, index) => ({
      id: String(item.id),
      src: resolveMediaUrl(
        item.image as number | Media | null | undefined,
        fallbacks[index % fallbacks.length]?.src ?? SERVICE_DETAIL_IMAGES.galleryLab,
      ),
      alt: item.title ?? item.label,
      caption: item.label ?? item.title ?? 'Gallery',
    }))
  } catch {
    return defaultGallerySlides()
  }
}
