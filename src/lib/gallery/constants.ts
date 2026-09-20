export const GALLERY_CATEGORIES = [
  { value: 'lab', label: 'Lab' },
  { value: 'training', label: 'Training' },
  { value: 'events', label: 'Events' },
  { value: 'other', label: 'Other' },
] as const

/** Categories shown on the clickable category hub (Lab / Training / Events). */
export const GALLERY_HUB_CATEGORIES = GALLERY_CATEGORIES.filter(
  (item) => item.value !== 'other',
)

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number]['value']

export const GALLERY_BRANDS = [
  { value: 'afrs', label: 'AFRS' },
  { value: 'afsl', label: 'AFSL' },
  { value: 'both', label: 'Both AFRS & AFSL' },
] as const

export type GalleryBrand = (typeof GALLERY_BRANDS)[number]['value']

export const GALLERY_EXAM_PROGRAMS = [
  { value: 'ugc-net', label: 'UGC NET' },
  { value: 'fact', label: 'FACT' },
  { value: 'cuet', label: 'CUET' },
] as const

export type GalleryExamProgram = (typeof GALLERY_EXAM_PROGRAMS)[number]['value']

export function isGalleryCategory(value: string | undefined): value is GalleryCategory {
  return GALLERY_CATEGORIES.some((item) => item.value === value)
}

export function galleryCategoryLabel(value: GalleryCategory): string {
  return GALLERY_CATEGORIES.find((item) => item.value === value)?.label ?? value
}

export function galleryHref(category?: GalleryCategory, brand?: GalleryBrand): string {
  const params = new URLSearchParams()
  if (category && category !== 'other') params.set('category', category)
  if (brand && brand !== 'afrs') params.set('brand', brand)
  const query = params.toString()
  return query ? `/gallery?${query}` : '/gallery'
}

export type GalleryPagePreset = {
  categories: GalleryCategory[]
  brand: GalleryBrand
}

/** Page-specific gallery hub presets (Phase 3). */
export const GALLERY_PAGE_PRESETS = {
  home: {
    categories: ['lab', 'training', 'events'],
    brand: 'afrs',
  },
  about: {
    categories: ['lab', 'training', 'events'],
    brand: 'afrs',
  },
  afsl: {
    categories: ['lab'],
    brand: 'afsl',
  },
  studentHub: {
    categories: ['training', 'events'],
    brand: 'afrs',
  },
  courses: {
    categories: ['events'],
    brand: 'afrs',
  },
  events: {
    categories: ['lab', 'training', 'events'],
    brand: 'afrs',
  },
} as const satisfies Record<string, GalleryPagePreset>

export type GalleryPagePresetKey = keyof typeof GALLERY_PAGE_PRESETS

export function isGalleryBrand(value: string | undefined): value is GalleryBrand {
  return GALLERY_BRANDS.some((item) => item.value === value)
}

export function serviceGalleryHref(serviceSlug: string): string {
  return `/gallery?service=${encodeURIComponent(serviceSlug)}`
}

export function parseGalleryServiceSlug(value: string | undefined): string | undefined {
  const slug = value?.trim()
  return slug ? slug : undefined
}
