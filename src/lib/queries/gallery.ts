import { galleryImages } from '@/components/home/sections/constants'
import type { SiteGalleryItem } from '@/components/gallery/SiteGallerySection'
import type { GalleryThumb } from '@/components/programmes/types'
import { defaultGallerySlides } from '@/components/service-detail/buildServiceContent'
import type { GallerySlide } from '@/components/service-detail/types'
import { SERVICE_DETAIL_IMAGES } from '@/components/service-detail/tokens'
import { resolveMediaUrl } from '@/lib/cms'
import {
  type GalleryBrand,
  type GalleryCategory,
  type GalleryPagePreset,
  type GalleryPagePresetKey,
  GALLERY_HUB_CATEGORIES,
  GALLERY_PAGE_PRESETS,
  galleryCategoryLabel,
  galleryHref,
  isGalleryBrand,
  isGalleryCategory,
} from '@/lib/gallery/constants'
import { getPayloadClient } from '@/lib/payload'
import { safeQuery } from '@/lib/resilience/safeQuery'
import type { GalleryItem, Media } from '@/payload-types'
import type { Where } from 'payload'

function buildFallbackHubItems(categories: GalleryCategory[], brand: GalleryBrand): SiteGalleryItem[] {
  return categories.map((category, index) => ({
    key: category,
    label: galleryCategoryLabel(category),
    image: fallbackImageForCategory(category, index),
    href: galleryHref(category, brand),
  }))
}

function fallbackImageForCategory(category: GalleryCategory, index: number): string {
  const hubIndex = GALLERY_HUB_CATEGORIES.findIndex((item) => item.value === category)
  const resolvedIndex = hubIndex >= 0 ? hubIndex : index
  return galleryImages[resolvedIndex % galleryImages.length]
}

export function buildGalleryBrandWhere(brand: GalleryBrand = 'afrs'): Where {
  if (brand === 'both') return {}

  return {
    or: [{ brand: { equals: brand } }, { brand: { equals: 'both' } }],
  }
}

export function buildGalleryCategoryWhere(category?: GalleryCategory): Where | null {
  if (!category || !isGalleryCategory(category)) return null
  return { category: { equals: category } }
}

export function buildPublishedGalleryWhere(options?: {
  brand?: GalleryBrand
  category?: GalleryCategory
  categories?: GalleryCategory[]
  serviceId?: number
  skipBrand?: boolean
}): Where {
  const clauses: Where[] = [{ published: { equals: true } }]

  if (options?.serviceId) {
    clauses.push({ service: { equals: options.serviceId } })
  }

  const skipBrand = options?.skipBrand ?? Boolean(options?.serviceId)
  if (!skipBrand) {
    const brandClause = buildGalleryBrandWhere(options?.brand ?? 'afrs')
    if (brandClause.or) clauses.push(brandClause)
  }

  if (options?.categories?.length) {
    clauses.push({ category: { in: options.categories } })
  } else {
    const categoryClause = buildGalleryCategoryWhere(options?.category)
    if (categoryClause) clauses.push(categoryClause)
  }

  return clauses.length === 1 ? clauses[0] : { and: clauses }
}

function mapDocToHubItem(
  doc: GalleryItem,
  category: GalleryCategory,
  index: number,
  brand: GalleryBrand,
): SiteGalleryItem {
  return {
    key: String(doc.id),
    label: galleryCategoryLabel(category),
    image: resolveMediaUrl(
      doc.image as number | Media | null | undefined,
      fallbackImageForCategory(category, index),
    ),
    href: galleryHref(category, brand),
  }
}

function mapDocToSlide(doc: GalleryItem, index: number, fallbacks: GallerySlide[]): GallerySlide {
  return {
    id: String(doc.id),
    src: resolveMediaUrl(
      doc.image as number | Media | null | undefined,
      fallbacks[index % fallbacks.length]?.src ?? SERVICE_DETAIL_IMAGES.galleryLab,
    ),
    alt: doc.title ?? doc.label,
    caption: doc.label ?? doc.title ?? 'Gallery',
  }
}

async function findCategoryCover(
  category: GalleryCategory,
  brand: GalleryBrand,
): Promise<GalleryItem | null> {
  const payload = await getPayloadClient()
  const baseWhere = buildPublishedGalleryWhere({ brand, category })

  const featured = await payload.find({
    collection: 'galleryItems',
    where: { and: [baseWhere, { featured: { equals: true } }] },
    sort: 'order',
    limit: 1,
    depth: 1,
    overrideAccess: false,
  })

  if (featured.docs[0]) return featured.docs[0] as GalleryItem

  const fallback = await payload.find({
    collection: 'galleryItems',
    where: baseWhere,
    sort: 'order',
    limit: 1,
    depth: 1,
    overrideAccess: false,
  })

  return (fallback.docs[0] as GalleryItem | undefined) ?? null
}

export async function getCategoryHubItems(options?: GalleryPagePreset): Promise<SiteGalleryItem[]> {
  const categories = options?.categories ?? GALLERY_HUB_CATEGORIES.map((item) => item.value)
  const brand = options?.brand ?? 'afrs'
  const fallbackItems = buildFallbackHubItems(categories, brand)

  return safeQuery(
    'getCategoryHubItems',
    async () => {
      const covers = await Promise.all(
        categories.map((category) => findCategoryCover(category, brand)),
      )

      const items = categories.map((category, index) => {
        const doc = covers[index]
        if (doc) return mapDocToHubItem(doc, category, index, brand)

        return {
          key: category,
          label: galleryCategoryLabel(category),
          image: fallbackImageForCategory(category, index),
          href: galleryHref(category, brand),
        }
      })

      return items.length > 0 ? items : fallbackItems
    },
    fallbackItems,
  )
}

export async function getGalleryForPage(preset: GalleryPagePresetKey): Promise<SiteGalleryItem[]> {
  return getCategoryHubItems(GALLERY_PAGE_PRESETS[preset])
}

export async function getGalleryPreviewPhotos(
  options: GalleryPagePreset & { limit?: number },
): Promise<GalleryThumb[]> {
  return getGalleryThumbs({ ...options, limit: options.limit ?? 4 })
}

export async function getGalleryThumbs(options: GalleryPagePreset & { limit?: number }): Promise<GalleryThumb[]> {
  const docs = await getGalleryPageItems({
    brand: options.brand,
    categories: options.categories,
    limit: options.limit ?? 6,
  })

  const limit = options.limit ?? 6

  if (docs.length === 0) {
    return options.categories.slice(0, limit).flatMap((category, categoryIndex) =>
      Array.from({ length: Math.min(limit, 4) }, (_, index) => ({
        id: `${category}-${index}`,
        src: fallbackImageForCategory(category, categoryIndex + index),
        alt: galleryCategoryLabel(category),
      })),
    ).slice(0, limit)
  }

  return docs.map((item) => ({
    id: String(item.id),
    src: resolveMediaUrl(
      item.image as number | Media | null | undefined,
      fallbackImageForCategory(
        isGalleryCategory(item.category) ? item.category : 'events',
        0,
      ),
    ),
    alt: item.title,
  }))
}

export function mapGalleryDocs(docs: GalleryItem[]): SiteGalleryItem[] {
  if (docs.length === 0) {
    return buildFallbackHubItems(
      GALLERY_HUB_CATEGORIES.map((item) => item.value),
      'afrs',
    )
  }

  return docs.map((item, index) => {
    const category = isGalleryCategory(item.category)
      ? item.category
      : GALLERY_HUB_CATEGORIES[index % GALLERY_HUB_CATEGORIES.length].value
    const brand = isGalleryBrand(item.brand) ? item.brand : 'afrs'

    return mapDocToHubItem(item, category, index, brand)
  })
}

export async function getPublishedGallerySlides(
  options?: GalleryPagePreset & { limit?: number },
): Promise<GallerySlide[]> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'galleryItems',
      where: buildPublishedGalleryWhere({
        brand: options?.brand ?? 'afrs',
        categories: options?.categories,
        category: options?.categories?.length === 1 ? options.categories[0] : undefined,
      }),
      sort: 'order',
      limit: options?.limit ?? 8,
      depth: 1,
      overrideAccess: false,
    })

    if (!docs.length) return defaultGallerySlides()

    const fallbacks = defaultGallerySlides()
    return (docs as GalleryItem[]).map((item, index) => mapDocToSlide(item, index, fallbacks))
  } catch {
    return defaultGallerySlides()
  }
}

function buildServiceFallbackSlides(options: {
  serviceTitle: string
  bannerUrl?: string
  overviewImageUrl?: string
}): GallerySlide[] {
  const slides: GallerySlide[] = []

  if (options.bannerUrl) {
    slides.push({
      id: 'service-banner',
      src: options.bannerUrl,
      alt: options.serviceTitle,
      caption: options.serviceTitle,
    })
  }

  if (options.overviewImageUrl && options.overviewImageUrl !== options.bannerUrl) {
    slides.push({
      id: 'service-overview',
      src: options.overviewImageUrl,
      alt: `${options.serviceTitle} overview`,
      caption: `${options.serviceTitle} overview`,
    })
  }

  return slides
}

export async function getServiceGallerySlides(options: {
  serviceId: number
  serviceTitle: string
  serviceSlug: string
  bannerUrl?: string
  overviewImageUrl?: string
  brand?: GalleryBrand
  limit?: number
}): Promise<GallerySlide[]> {
  const limit = options.limit ?? 8
  const brand = options.brand ?? 'afsl'
  const fallbacks = defaultGallerySlides()

  try {
    const payload = await getPayloadClient()

    const linked = await payload.find({
      collection: 'galleryItems',
      where: buildPublishedGalleryWhere({ serviceId: options.serviceId }),
      sort: 'order',
      limit,
      depth: 1,
      overrideAccess: false,
    })

    if (linked.docs.length > 0) {
      return (linked.docs as GalleryItem[]).map((item, index) => mapDocToSlide(item, index, fallbacks))
    }

    const labFallback = await payload.find({
      collection: 'galleryItems',
      where: buildPublishedGalleryWhere({ brand, category: 'lab' }),
      sort: 'order',
      limit: Math.min(limit, 4),
      depth: 1,
      overrideAccess: false,
    })

    if (labFallback.docs.length > 0) {
      return (labFallback.docs as GalleryItem[]).map((item, index) => mapDocToSlide(item, index, fallbacks))
    }
  } catch {
    // fall through to static fallbacks below
  }

  const serviceSlides = buildServiceFallbackSlides(options)
  if (serviceSlides.length > 0) return serviceSlides

  return defaultGallerySlides()
}

export async function getGalleryPageItems(options?: {
  brand?: GalleryBrand
  category?: GalleryCategory
  categories?: GalleryCategory[]
  serviceId?: number
  limit?: number
}): Promise<GalleryItem[]> {
  const payload = await getPayloadClient()
  const category =
    options?.category && isGalleryCategory(options.category) ? options.category : undefined

  const { docs } = await payload.find({
    collection: 'galleryItems',
    where: buildPublishedGalleryWhere({
      brand: options?.brand ?? 'afrs',
      category,
      categories: options?.categories,
      serviceId: options?.serviceId,
    }),
    sort: 'order',
    limit: options?.limit ?? 60,
    depth: 1,
    overrideAccess: false,
  })

  return docs as GalleryItem[]
}

export async function resolvePublishedServiceBySlug(
  slug: string,
): Promise<{ id: number; title: string; slug: string } | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug }, published: { equals: true } },
    limit: 1,
    depth: 0,
    overrideAccess: false,
  })

  const service = docs[0]
  if (!service || typeof service.slug !== 'string') return null

  return {
    id: service.id,
    title: service.title,
    slug: service.slug,
  }
}

