import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { GalleryThumb } from '@/components/programmes/types'
import { DESIGN_SYSTEM } from '@/lib/design-system'

export type SiteGalleryPreviewSectionProps = {
  photos: GalleryThumb[]
  viewAllHref: string
  viewAllLabel?: string
  title?: string
  subtitle?: string
  className?: string
}

function previewGridClass(count: number): string {
  if (count <= 1) return 'mx-auto max-w-md grid-cols-1'
  if (count === 2) return 'mx-auto max-w-2xl grid-cols-2'
  if (count === 3) return 'mx-auto max-w-4xl grid-cols-2 lg:grid-cols-3'
  return 'mx-auto max-w-5xl grid-cols-2 lg:grid-cols-4'
}

export function SiteGalleryPreviewSection({
  photos,
  viewAllHref,
  viewAllLabel = 'View all photos',
  title = 'AFRS India Gallery',
  subtitle = 'Explore snapshots from our laboratories, workshops, and field sessions.',
  className = 'bg-white',
}: Readonly<SiteGalleryPreviewSectionProps>) {
  if (photos.length === 0) return null

  return (
    <section className={`${DESIGN_SYSTEM.sectionY} ${className} section-glow-top`}>
      <div className={DESIGN_SYSTEM.container}>
        <SectionHeader title={title} subtitle={subtitle} />
        <AnimateOnScroll stagger className={`grid gap-4 ${previewGridClass(photos.length)}`}>
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-square overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm card-pop"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 280px"
                className="object-cover"
              />
            </div>
          ))}
        </AnimateOnScroll>
        <div className="mt-8 flex justify-center">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
