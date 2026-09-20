import Image from 'next/image'
import Link from 'next/link'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { DESIGN_SYSTEM } from '@/lib/design-system'

export type SiteGalleryItem = {
  key: string
  label: string
  image: string
  href: string
}

export type SiteGallerySize = 'default' | 'compact'

export type SiteGallerySectionProps = {
  items: SiteGalleryItem[]
  title?: string
  subtitle?: string
  className?: string
  size?: SiteGallerySize
}

function gridClasses(itemCount: number, size: SiteGallerySize): string {
  if (size === 'compact') {
    if (itemCount === 1) return 'mx-auto max-w-[280px] grid-cols-1 gap-4'
    if (itemCount === 2) return 'mx-auto max-w-lg sm:max-w-2xl grid-cols-2 gap-4'
    return 'mx-auto max-w-3xl grid-cols-2 sm:grid-cols-3 gap-4'
  }

  if (itemCount === 1) return 'lg:grid-cols-1 lg:max-w-sm gap-4'
  if (itemCount === 2) return 'lg:grid-cols-2 gap-4'
  return 'lg:grid-cols-3 gap-4'
}

export function SiteGallerySection({
  items,
  title = 'AFRS India Gallery',
  subtitle = 'Explore snapshots from our laboratories, workshops, and field sessions.',
  className = 'bg-white',
  size = 'default',
}: Readonly<SiteGallerySectionProps>) {
  if (items.length === 0) return null

  const isCompact = size === 'compact'
  const sectionPadding = isCompact ? DESIGN_SYSTEM.sectionYSmall : DESIGN_SYSTEM.sectionY

  return (
    <section className={`${sectionPadding} ${className} section-glow-top`}>
      <div className={DESIGN_SYSTEM.container}>
        <SectionHeader title={title} subtitle={subtitle} />
        <AnimateOnScroll
          stagger
          className={`grid grid-cols-2 ${gridClasses(items.length, size)}`}
        >
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`group relative overflow-hidden card-pop block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                isCompact ? 'aspect-[4/3] rounded-xl' : 'aspect-square rounded-2xl'
              }`}
              aria-label={`View ${item.label} gallery`}
            >
              <Image
                src={item.image}
                alt={`${item.label} gallery`}
                fill
                sizes={
                  isCompact
                    ? '(max-width: 640px) 45vw, 260px'
                    : '(max-width: 768px) 50vw, 25vw'
                }
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/40 transition" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`rounded-lg border border-white/40 bg-white/20 backdrop-blur text-white font-semibold ${
                    isCompact ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  )
}
