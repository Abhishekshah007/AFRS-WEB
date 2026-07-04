'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
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
export function ResourceArchiveGallery({
  resourcePersons,
  archive,
  gallery,
}: ResourceArchiveGalleryProps) {
  const [selectedPerson, setSelectedPerson] = useState<ResourcePerson | null>(null)
  const [showAllPeople, setShowAllPeople] = useState(false)
  const isModalOpen = Boolean(selectedPerson) || showAllPeople

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  function closeModal() {
    setSelectedPerson(null)
    setShowAllPeople(false)
  }

  return (
    <section
      className={`${programmesTokens.sectionY} bg-slate-50/80`}
      aria-labelledby="programmes-widgets-heading"
    >
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
                    <button
                      type="button"
                      onClick={() => setSelectedPerson(person)}
                      className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm card-pop group"
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
                        <span className="block font-bold text-sm text-slate-900 truncate">
                          {person.name}
                        </span>
                        <span className="block text-xs text-slate-500 truncate">
                          {person.title}
                        </span>
                      </span>
                      <span
                        className="text-slate-400 group-hover:text-[var(--prog-primary)] transition"
                        aria-hidden
                      >
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setShowAllPeople(true)}
                className="mt-4 inline-flex text-sm font-bold text-[var(--prog-primary)] hover:underline"
              >
                View All →
              </button>
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
                  <div
                    key={thumb.id}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-100 shadow-sm"
                  >
                    <Image
                      src={thumb.src}
                      alt={thumb.alt}
                      fill
                      sizes="(max-width:768px) 50vw, 200px"
                      className="object-cover"
                    />
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={closeModal}
            aria-label="Close resource person modal"
          />
          <div className="relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/10">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:text-slate-900"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {selectedPerson ? (
              <PersonModalProfile person={selectedPerson} />
            ) : (
              <div className="p-6 sm:p-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--prog-primary)]">
                  Resource Persons
                </p>
                <h3 className="mt-2 text-2xl font-extrabold text-slate-950">
                  AFRS faculty and experts
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {resourcePersons.map((person) => (
                    <button
                      key={person.id}
                      type="button"
                      onClick={() => {
                        setShowAllPeople(false)
                        setSelectedPerson(person)
                      }}
                      className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:border-[var(--prog-primary)]/30 hover:bg-white"
                    >
                      <PersonAvatar person={person} size="md" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-extrabold text-slate-900">
                          {person.name}
                        </span>
                        <span className="mt-1 block truncate text-xs text-slate-500">
                          {person.title}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

function PersonAvatar({ person, size }: { person: ResourcePerson; size: 'md' | 'lg' }) {
  const dimension = size === 'lg' ? 112 : 56
  const className =
    size === 'lg' ? 'h-28 w-28 rounded-3xl text-2xl' : 'h-14 w-14 rounded-2xl text-sm'

  if (person.photoUrl) {
    return (
      <Image
        src={person.photoUrl}
        alt={person.name}
        width={dimension}
        height={dimension}
        className={`${className} shrink-0 object-cover`}
      />
    )
  }

  return (
    <span
      className={`${className} flex shrink-0 items-center justify-center bg-[var(--prog-primary-soft)] font-extrabold text-[var(--prog-primary)]`}
    >
      {person.initials}
    </span>
  )
}

function PersonModalProfile({ person }: { person: ResourcePerson }) {
  return (
    <div className="grid gap-0 overflow-hidden md:grid-cols-[220px_1fr]">
      <div className="bg-slate-50 p-8">
        <PersonAvatar person={person} size="lg" />
        <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--prog-primary)]">
          Resource Person
        </p>
      </div>
      <div className="p-6 sm:p-8">
        <h3 className="pr-10 text-2xl font-extrabold leading-tight text-slate-950">
          {person.name}
        </h3>
        <p className="mt-2 text-sm font-bold text-[var(--prog-primary)]">{person.title}</p>
        <div className="mt-6 h-px bg-slate-100" />
        <p className="mt-6 text-sm leading-7 text-slate-600">
          {person.bio ||
            'AFRS resource person supporting forensic science education, applied training, and professional knowledge sharing.'}
        </p>
      </div>
    </div>
  )
}
