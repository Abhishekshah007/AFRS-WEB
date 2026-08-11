import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl } from '@/lib/cms'
import type { GalleryItem, Media } from '@/payload-types'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { PageHero } from '@/components/marketing/PageHero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Virtual Museum',
  description: 'Explore AFRS forensic science facilities, training activities, and research events through our virtual gallery.',
}

import { FALLBACK_BANNER_IMAGE } from '@/lib/constants/assets'

const categories = [
  { value: 'all', label: 'All' },
  { value: 'lab', label: 'Lab' },
  { value: 'training', label: 'Training' },
  { value: 'tech', label: 'Technology' },
  { value: 'events', label: 'Events' },
  { value: 'other', label: 'Other' },
]

export default async function GalleryPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'galleryItems',
    where: { published: { equals: true } },
    sort: 'order',
    limit: 60,
    depth: 1,
    overrideAccess: false,
  })

  return (
    <div>
      <PageHero
        eyebrow="VIRTUAL MUSEUM"
        title="Gallery — AFRS in Action"
        subtitle="A visual journey through our forensic science labs, training events, and community initiatives."
      />

      <div className="bg-white border-b border-slate-100 sticky top-[68px] z-40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex gap-1 py-2 overflow-x-auto no-scrollbar">
            {categories.map((cat, i) => (
              <span
                key={cat.value}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold cursor-pointer transition ${
                  i === 0 ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          {docs.length === 0 ? (
            <p className="text-center text-slate-400 py-20">
              Gallery content coming soon. Check back later.
            </p>
          ) : (
            <AnimateOnScroll stagger>
              <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {docs.map((item) => {
                  const g = item as GalleryItem
                  const src = resolveMediaUrl(g.image as number | Media | null | undefined, FALLBACK_BANNER_IMAGE)
                  return (
                    <div
                      key={g.id}
                      className="relative break-inside-avoid rounded-2xl overflow-hidden group card-pop"
                    >
                      <div className="relative">
                        <Image
                          src={src}
                          alt={g.title ?? g.label}
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <div>
                            <p className="text-white font-bold text-sm leading-tight">{g.title}</p>
                            {g.label && g.label !== g.title && (
                              <p className="text-white/70 text-xs mt-0.5">{g.label}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>
    </div>
  )
}
