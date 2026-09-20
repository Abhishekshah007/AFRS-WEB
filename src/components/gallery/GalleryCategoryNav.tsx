import Link from 'next/link'
import {
  GALLERY_CATEGORIES,
  type GalleryBrand,
  type GalleryCategory,
  galleryHref,
  isGalleryCategory,
} from '@/lib/gallery/constants'

const FILTER_CATEGORIES = [{ value: 'all', label: 'All' }, ...GALLERY_CATEGORIES] as const

export type GalleryCategoryNavProps = {
  activeCategory?: GalleryCategory | 'all'
  brand?: GalleryBrand
  serviceSlug?: string
}

function navHref(
  category: GalleryCategory | 'all',
  brand?: GalleryBrand,
  serviceSlug?: string,
): string {
  const params = new URLSearchParams()
  if (serviceSlug) params.set('service', serviceSlug)
  if (category !== 'all') params.set('category', category)
  if (brand && brand !== 'afrs') params.set('brand', brand)

  const query = params.toString()
  return query ? `/gallery?${query}` : '/gallery'
}

export function GalleryCategoryNav({
  activeCategory = 'all',
  brand = 'afrs',
  serviceSlug,
}: GalleryCategoryNavProps) {
  return (
    <div className="bg-white border-b border-slate-100 sticky top-[68px] z-40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex gap-1 py-2 overflow-x-auto no-scrollbar">
          {FILTER_CATEGORIES.map((cat) => {
            const href = navHref(cat.value, brand, serviceSlug)
            const isActive =
              cat.value === 'all' ? activeCategory === 'all' : activeCategory === cat.value

            return (
              <Link
                key={cat.value}
                href={href}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                  isActive ? 'bg-brand-600 text-white' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function parseGalleryPageCategory(value: string | undefined): GalleryCategory | 'all' {
  if (!value || value === 'all') return 'all'
  return isGalleryCategory(value) ? value : 'all'
}
