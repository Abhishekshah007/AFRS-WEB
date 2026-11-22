'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { ArrowLeft, X } from 'lucide-react'
import type { ArchiveItem, GalleryThumb, ResourcePerson } from '@/components/programmes/types'
import { programmesTokens } from '@/components/programmes/tokens'
import {
  COURSES_PATH,
  RESOURCE_PERSONS_PATH,
  modalViewFromPath,
  resourcePersonPath,
} from '@/components/programmes/resourcePersonLinks'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

export type ResourceArchiveGalleryProps = {
  resourcePersons: ResourcePerson[]
  archive: ArchiveItem[]
  gallery: GalleryThumb[]
  galleryViewAllHref?: string
  /** Modal to show on first render (set by the crawlable resource person URLs). */
  initialModal?: ResourcePersonModalView
}

export type ResourcePersonModalView = { kind: 'all' } | { kind: 'person'; slug: string }

function isModalDialog(dialog: HTMLDialogElement): boolean {
  try {
    return dialog.matches(':modal')
  } catch {
    return false
  }
}

/** Let ctrl/cmd/shift/middle-clicks open the profile URL in a new tab as usual. */
function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

/**
 * Renders a person trigger as a real link when the person has a profile URL, so search
 * engines can discover each profile, while a normal click still opens the modal in place.
 */
function PersonTrigger({
  href,
  onOpen,
  className,
  children,
}: {
  href?: string
  onOpen: () => void
  className: string
  children: ReactNode
}) {
  if (!href) {
    return (
      <button type="button" onClick={onOpen} className={className}>
        {children}
      </button>
    )
  }

  return (
    <a
      href={href}
      onClick={(event) => {
        if (!isPlainLeftClick(event)) return
        event.preventDefault()
        onOpen()
      }}
      className={className}
    >
      {children}
    </a>
  )
}

/**
 * Three-column widgets: resource persons, event archive, and gallery preview.
 */
export function ResourceArchiveGallery({
  resourcePersons,
  archive,
  gallery,
  galleryViewAllHref = '/gallery',
  initialModal,
}: ResourceArchiveGalleryProps) {
  const findBySlug = useCallback(
    (slug: string) => resourcePersons.find((person) => person.slug === slug) ?? null,
    [resourcePersons],
  )
  const [selectedPerson, setSelectedPerson] = useState<ResourcePerson | null>(() =>
    initialModal?.kind === 'person' ? findBySlug(initialModal.slug) : null,
  )
  const [showAllPeople, setShowAllPeople] = useState(initialModal?.kind === 'all')
  const [canReturnToPeopleList, setCanReturnToPeopleList] = useState(false)
  const isModalOpen = Boolean(selectedPerson) || showAllPeople
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  /** True when this page pushed the modal URL, so closing can step back in history. */
  const pushedHistoryRef = useRef(false)
  const modalTitleId = useId()

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!isModalOpen || !dialog) return

    const htmlOverflow = document.documentElement.style.overflow
    const bodyOverflow = document.body.style.overflow
    // Profile URLs are server-rendered with the dialog already open (so the details are
    // in the HTML); reopen it as a true modal for focus trapping and the top layer.
    if (dialog.open && !isModalDialog(dialog)) dialog.close()
    if (!dialog.open) dialog.showModal()
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.documentElement.style.overflow = htmlOverflow
      document.body.style.overflow = bodyOverflow
      if (dialog.open) dialog.close()
    }
  }, [isModalOpen])

  // Keep the modal in sync with browser back/forward between profile URLs.
  useEffect(() => {
    function onPopState() {
      const view = modalViewFromPath(window.location.pathname)
      if (!view) {
        pushedHistoryRef.current = false
        setSelectedPerson(null)
        setShowAllPeople(false)
        setCanReturnToPeopleList(false)
        return
      }
      if (view.kind === 'all') {
        setSelectedPerson(null)
        setShowAllPeople(true)
        return
      }
      const person = findBySlug(view.slug)
      if (person) {
        setShowAllPeople(false)
        setSelectedPerson(person)
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [findBySlug])

  function showUrl(path: string) {
    if (window.location.pathname === path) return
    if (modalViewFromPath(window.location.pathname)) {
      window.history.replaceState(window.history.state, '', path)
    } else {
      window.history.pushState(window.history.state, '', path)
      pushedHistoryRef.current = true
    }
  }

  function openPerson(person: ResourcePerson, fromList: boolean) {
    setCanReturnToPeopleList(fromList)
    setShowAllPeople(false)
    setSelectedPerson(person)
    if (person.slug) showUrl(resourcePersonPath(person.slug))
  }

  function openAllPeople() {
    setSelectedPerson(null)
    setShowAllPeople(true)
    if (hasProfileUrls) showUrl(RESOURCE_PERSONS_PATH)
  }

  function closeModal() {
    setSelectedPerson(null)
    setShowAllPeople(false)
    setCanReturnToPeopleList(false)
    if (!modalViewFromPath(window.location.pathname)) return
    if (pushedHistoryRef.current) {
      pushedHistoryRef.current = false
      window.history.back()
    } else {
      window.history.replaceState(window.history.state, '', COURSES_PATH)
    }
  }

  const hasProfileUrls = resourcePersons.some((person) => person.slug)

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
                {resourcePersons.slice(0, 3).map((person) => (
                  <li key={person.id}>
                    <PersonTrigger
                      href={person.slug ? resourcePersonPath(person.slug) : undefined}
                      onOpen={() => openPerson(person, false)}
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
                        {person.title && (
                          <span className="block text-xs text-slate-500 truncate">
                            {person.title}
                          </span>
                        )}
                      </span>
                      <span
                        className="text-slate-400 group-hover:text-[var(--prog-primary)] transition"
                        aria-hidden
                      >
                        →
                      </span>
                    </PersonTrigger>
                  </li>
                ))}
              </ul>
              <PersonTrigger
                href={hasProfileUrls ? RESOURCE_PERSONS_PATH : undefined}
                onOpen={openAllPeople}
                className="mt-4 inline-flex text-sm font-bold text-[var(--prog-primary)] hover:underline"
              >
                View All →
              </PersonTrigger>
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
                  href={galleryViewAllHref}
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
        <dialog
          ref={dialogRef}
          // Rendered open so the server HTML of profile URLs contains the details; the
          // layout effect above upgrades it to a real modal on the client.
          open
          aria-labelledby={modalTitleId}
          aria-modal="true"
          className="fixed inset-0 z-50 m-0 h-full w-full max-h-none max-w-none border-0 bg-transparent p-0"
          onCancel={(event) => {
            event.preventDefault()
            closeModal()
          }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={closeModal}
            aria-label="Close resource person modal"
          />
          <div className="relative mx-auto my-6 max-h-[calc(100dvh-3rem)] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/10">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:text-slate-900"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {selectedPerson ? (
              <PersonModalProfile
                person={selectedPerson}
                titleId={modalTitleId}
                onBack={canReturnToPeopleList ? openAllPeople : undefined}
              />
            ) : (
              <div className="p-6 sm:p-8">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--prog-primary)]">
                  Resource Persons
                </p>
                <h3 id={modalTitleId} className="mt-2 text-2xl font-extrabold text-slate-950">
                  AFRS faculty and experts
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {resourcePersons.map((person) => (
                    <PersonTrigger
                      key={person.id}
                      href={person.slug ? resourcePersonPath(person.slug) : undefined}
                      onOpen={() => openPerson(person, true)}
                      className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:border-[var(--prog-primary)]/30 hover:bg-white"
                    >
                      <PersonAvatar person={person} size="md" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-extrabold text-slate-900">
                          {person.name}
                        </span>
                        {person.title && (
                          <span className="mt-1 block truncate text-xs text-slate-500">
                            {person.title}
                          </span>
                        )}
                      </span>
                    </PersonTrigger>
                  ))}
                </div>
              </div>
            )}
          </div>
        </dialog>
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

function PersonModalProfile({
  person,
  titleId,
  onBack,
}: {
  person: ResourcePerson
  titleId: string
  onBack?: () => void
}) {
  return (
    <div className="grid gap-0 overflow-hidden md:grid-cols-[220px_1fr]">
      <div className="bg-slate-50 p-8">
        <PersonAvatar person={person} size="lg" />
        {person.title && (
          <p className="mt-5 text-xs font-extrabold tracking-[0.18em] text-justify text-[var(--prog-primary)]">
            {person.title}
          </p>
        )}
      </div>
      <div className="p-6 sm:p-8">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--prog-primary)] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to resource persons
          </button>
        )}
        <h3 id={titleId} className="pr-10 text-2xl font-extrabold leading-tight text-slate-950">
          {person.name}
        </h3>
        <div className="mt-1 h-px bg-slate-100" />
        <p className="mt-6 text-sm leading-7 text-slate-600 text-justify">
          {person.bio ||
            'AFRS resource person supporting forensic science education, applied training, and professional knowledge sharing.'}
        </p>
      </div>
    </div>
  )
}
