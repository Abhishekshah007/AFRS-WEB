export type CatalogItem = {
  id: string | number
  title: string
  slug: string
  desc: string
  banner: string
}

export type DirectorateMember = {
  name: string
  designation: string
  bio?: string | null
  photo?: string
  initials: string
}

export type SiteContact = {
  phone: string
  email: string
  address: string
  mapEmbedUrl?: string | null
}
