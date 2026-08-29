import Image from 'next/image'
import Link from 'next/link'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { DESIGN_SYSTEM } from '@/lib/design-system'

export type SiteGalleryItem = {
  key: string
  label: string
  image: string
}

export type SiteGallerySectionProps = {
  items: SiteGalleryItem[]
  title?: string
  subtitle?: string
  className?: string
}

export function SiteGallerySection({
  items,
  title = 'AFRS India Gallery',
  subtitle = 'Explore snapshots from our laboratories, workshops, and field sessions.',
  className = 'bg-white',
}: Readonly<SiteGallerySectionProps>) {
  if (items.length === 0) return null

  return (
    <section className={`${DESIGN_SYSTEM.sectionY} ${className} section-glow-top`}>
      <div className={DESIGN_SYSTEM.container}>
        <SectionHeader title={title} subtitle={subtitle} />
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
              className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-brand-600 text-brand-600 hover:bg-brand-50 px-10 text-sm font-bold transition"
            >
              View More Gallery
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
