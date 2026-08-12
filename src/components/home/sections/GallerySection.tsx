import type { PaginatedDocs } from 'payload'
import { SiteGallerySection } from '@/components/gallery/SiteGallerySection'
import { mapGalleryDocs } from '@/lib/queries/gallery'
import type { GalleryItem } from '@/payload-types'

export function GallerySection({ galleryItems }: { galleryItems: PaginatedDocs<GalleryItem> }) {
  return <SiteGallerySection items={mapGalleryDocs(galleryItems.docs)} />
}
