import { SiteGallerySection } from '@/components/gallery/SiteGallerySection'
import { getGalleryForPage } from '@/lib/queries/gallery'

export async function GallerySection() {
  const items = await getGalleryForPage('home')
  return <SiteGallerySection items={items} size="compact" />
}
