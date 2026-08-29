export type ServiceDetailData = {
  slug: string
  title: string
  excerpt: string
  contentPlain: string
  bannerUrl: string
  category?: string | null
  helpHeading?: string | null
  helpIntro?: string | null
}

export type HelpCardItem = {
  id: string
  title: string
  description: string
  bullets?: string[]
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
