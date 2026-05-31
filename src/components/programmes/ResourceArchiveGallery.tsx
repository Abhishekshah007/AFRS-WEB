import Image from 'next/image'
import Link from 'next/link'
import type { ArchiveItem, GalleryThumb, ResourcePerson } from '@/components/programmes/types'
import { programmesTokens } from '@/components/programmes/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type ResourceArchiveGalleryProps = {
  resourcePersons: ResourcePerson[]
  archive: ArchiveItem[]
  gallery: GalleryThumb[]
}

/**
 * Three-column widgets: resource persons, event archive, and gallery preview.
 */
export function ResourceArchiveGallery({ resourcePersons, archive, gallery }: ResourceArchiveGalleryProps) {
  return (
    <section className={`${programmesTokens.sectionY} bg-slate-50/80`} aria-labelledby="programmes-widgets-heading">
      <div className={programmesTokens.container}>
        <h2 id="programmes-widgets-heading" className="sr-only">
          Resources, archive, and gallery
        </h2>
        <AnimateOnScroll stagger>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resource persons */}
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-5">Resource Persons</h3>
              <ul className="space-y-3">
                {resourcePersons.map((person) => (
                  <li key={person.id}>
                    <Link
                      href="/about"
                      className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm card-pop group"
                    >
                      {person.photoUrl ? (
                        <Image
                          src={person.photoUrl}
                          alt=""
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--prog-primary-soft)] text-sm font-bold text-[var(--prog-primary)]">
                          {person.initials}
                        </span>
                      )}
                      <span className="flex-1 min-w-0">
                        <span className="block font-bold text-sm text-slate-900 truncate">{person.name}</span>
                        <span className="block text-xs text-slate-500 truncate">{person.title}</span>
                      </span>
                      <span className="text-slate-400 group-hover:text-[var(--prog-primary)] transition" aria-hidden>
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/about" className="mt-4 inline-flex text-sm font-bold text-[var(--prog-primary)] hover:underline">
                View All →
              </Link>
            </div>

            {/* Archive */}
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-5">Archive</h3>
              <ul className="space-y-3">
                {archive.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3.5 shadow-sm card-pop"
                    >
                      <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                      <span className="rounded-full bg-[var(--prog-primary-soft)] px-3 py-1 text-[10px] font-bold text-[var(--prog-primary)]">
                        {item.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-5">Gallery</h3>
              <div className="grid grid-cols-2 gap-3">
                {gallery.slice(0, 3).map((thumb) => (
                  <div key={thumb.id} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-100 shadow-sm">
                    <Image src={thumb.src} alt={thumb.alt} fill sizes="(max-width:768px) 50vw, 200px" className="object-cover" />
                  </div>
                ))}
                <Link
                  href="/gallery"
                  className="flex aspect-[4/3] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white text-slate-500 hover:border-[var(--prog-primary)] hover:text-[var(--prog-primary)] transition card-pop"
                >
                  <span className="text-2xl mb-1" aria-hidden>
                    🖼
                  </span>
                  <span className="text-xs font-bold">View All</span>
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
