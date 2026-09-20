import Image from 'next/image'
import { notFound } from 'next/navigation'
import { resolveMediaUrl } from '@/lib/cms'
import type { GalleryItem, Media } from '@/payload-types'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { PageHero } from '@/components/marketing/PageHero'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import {
  GalleryCategoryNav,
  parseGalleryPageCategory,
} from '@/components/gallery/GalleryCategoryNav'
import { getGalleryPageItems, resolvePublishedServiceBySlug } from '@/lib/queries/gallery'
import {
  GALLERY_BRANDS,
  galleryCategoryLabel,
  isGalleryBrand,
  parseGalleryServiceSlug,
} from '@/lib/gallery/constants'

export const metadata: Metadata = buildPageMetadata({
  title: 'AFRS Gallery',
  description:
    'Photographs from AFRS laboratories, forensic training sessions, workshops and research activities.',
  path: '/gallery',
})

import { FALLBACK_BANNER_IMAGE } from '@/lib/constants/assets'

type Props = {
  searchParams: Promise<{ category?: string; brand?: string; service?: string }>
}

function brandLabel(brand: string): string {
  return GALLERY_BRANDS.find((item) => item.value === brand)?.label ?? brand.toUpperCase()
}

export default async function GalleryPage({ searchParams }: Props) {
  const { category: categoryParam, brand: brandParam, service: serviceParam } = await searchParams
  const activeCategory = parseGalleryPageCategory(categoryParam)
  const serviceSlug = parseGalleryServiceSlug(serviceParam)
  const service = serviceSlug ? await resolvePublishedServiceBySlug(serviceSlug) : null

  if (serviceSlug && !service) notFound()

  const activeBrand = service ? 'afsl' : isGalleryBrand(brandParam) ? brandParam : 'afrs'

  const docs = await getGalleryPageItems({
    brand: activeBrand,
    category: activeCategory === 'all' ? undefined : activeCategory,
    serviceId: service?.id,
  })

  const filterParts = [
    service ? service.title : null,
    activeBrand !== 'afrs' ? brandLabel(activeBrand) : null,
    activeCategory === 'all' ? (service ? 'All categories' : 'All categories') : galleryCategoryLabel(activeCategory),
  ].filter(Boolean)

  const heroTitle = service
    ? `Gallery — ${service.title}`
    : activeBrand === 'afsl'
      ? 'Gallery — AFSL Laboratory'
      : 'Gallery — AFRS in Action'

  return (
    <div>
      <PageHero
        eyebrow="VIRTUAL MUSEUM"
        title={heroTitle}
        subtitle="A visual journey through our forensic science labs, training events, and community initiatives."
      />

      <GalleryCategoryNav
        activeCategory={activeCategory}
        brand={activeBrand}
        serviceSlug={service?.slug}
      />

      <section className="py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          <p className="mb-6 text-sm font-semibold text-slate-500">
            Showing: <span className="text-slate-800">{filterParts.join(' · ')}</span>
          </p>

          {docs.length === 0 ? (
            <p className="text-center text-slate-400 py-20">
              No gallery images for this selection yet. Try another filter or check back later.
            </p>
          ) : (
            <AnimateOnScroll stagger>
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {docs.map((item) => {
                  const g = item as GalleryItem
                  const src = resolveMediaUrl(
                    g.image as number | Media | null | undefined,
                    FALLBACK_BANNER_IMAGE,
                  )
                  return (
                    <div
                      key={g.id}
                      className="relative break-inside-avoid rounded-2xl overflow-hidden group card-pop"
                    >
                      <div className="relative">
                        <Image
                          src={src}
                          alt={g.title ?? g.label}
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div>
                            <p className="text-white font-bold text-sm leading-tight">{g.title}</p>
                            {g.label && g.label !== g.title && (
                              <p className="text-white/70 text-xs mt-0.5">{g.label}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>
    </div>
  )
}
