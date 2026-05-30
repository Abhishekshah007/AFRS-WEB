export type ServiceDetailData = {
  slug: string
  title: string
  excerpt: string
  contentPlain: string
  bannerUrl: string
  category?: string | null
}

export type HelpCardItem = {
  id: string
  icon: string
  title: string
  description: string
  bullets?: string[]
  wide?: boolean
  imageUrl?: string
}

export type GallerySlide = {
  id: string
  src: string
  alt: string
  caption: string
}

export type SiteContactInfo = {
  phone: string
  email: string
}
