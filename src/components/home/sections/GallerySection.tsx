import Image from 'next/image'
import Link from 'next/link'
import { resolveMediaUrl } from '@/lib/cms'
import type { GalleryItem } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CONTAINER, galleryImages, SECTION } from './constants'

export function GallerySection({ galleryItems }: { galleryItems: PaginatedDocs<GalleryItem> }) {
  const items = galleryItems.docs.length
    ? galleryItems.docs.map((item, index) => ({
        key: String(item.id),
        label: item.label || item.title || 'Gallery',
        image: resolveMediaUrl(item.image, galleryImages[index % galleryImages.length]),
      }))
    : ['Lab', 'Training', 'Tech', 'Events'].map((label, index) => ({
        key: label,
        label,
        image: galleryImages[index % galleryImages.length],
      }))

  return (
    <section className={`${SECTION} bg-white section-glow-top`}>
      <div className={CONTAINER}>
        <SectionHeader
          title="AFRS India Gallery"
          subtitle="Explore snapshots from our laboratories, workshops, and field sessions."
        />
        <AnimateOnScroll stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="group relative overflow-hidden rounded-2xl aspect-square card-pop"
            >
              <Image
                src={item.image}
                alt={`${item.label} gallery`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/40 transition" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-lg border border-white/40 bg-white/20 backdrop-blur px-4 py-1.5 text-white text-sm font-semibold">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </AnimateOnScroll>
        <AnimateOnScroll>
          <div className="mt-10 text-center">
            <Link
              href="/gallery"
              className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-10 text-sm font-bold transition"
            >
              View More Gallery
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
