'use client'

import { X } from 'lucide-react'
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'

import { setLenisStopped } from '@/components/motion/lenisController'
import {
  HOME_POPUP_STORAGE_KEY,
  type HomePopupSlide,
} from '@/lib/popups/homePopupQueue'

type HomePopupSequenceProps = {
  slides: HomePopupSlide[]
  fingerprint: string
}

const dismissalListeners = new Set<() => void>()
let sessionDismissed: string | null = null

function subscribeToDismissal(onStoreChange: () => void) {
  dismissalListeners.add(onStoreChange)
  return () => {
    dismissalListeners.delete(onStoreChange)
  }
}

function popupIsDismissed(fingerprint: string): boolean {
  try {
    return window.localStorage.getItem(HOME_POPUP_STORAGE_KEY) === fingerprint
  } catch {
    return sessionDismissed === fingerprint
  }
}

function dismissPopup(fingerprint: string) {
  sessionDismissed = fingerprint
  try {
    window.localStorage.setItem(HOME_POPUP_STORAGE_KEY, fingerprint)
  } catch {
    // Private mode can block storage. The in-memory flag still ends this view.
  }
  dismissalListeners.forEach((listener) => listener())
}

export function HomePopupSequence({ slides, fingerprint }: HomePopupSequenceProps) {
  const dismissed = useSyncExternalStore(
    subscribeToDismissal,
    () => popupIsDismissed(fingerprint),
    () => true,
  )
  const [index, setIndex] = useState(0)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const slide = slides[index]
  const open = !dismissed && slides.length > 0 && Boolean(slide)

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (!open || !dialog) return

    if (!dialog.open) dialog.showModal()
    const htmlOverflow = document.documentElement.style.overflow
    const bodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    setLenisStopped(true)
    closeRef.current?.focus()

    return () => {
      document.documentElement.style.overflow = htmlOverflow
      document.body.style.overflow = bodyOverflow
      setLenisStopped(false)
      if (dialog.open) dialog.close()
    }
  }, [open])

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [index, open])

  if (!open || !slide) return null

  function closeCurrent() {
    if (index >= slides.length - 1) {
      dismissPopup(fingerprint)
      return
    }
    setIndex((current) => current + 1)
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="home-popup-dialog"
      aria-labelledby={titleId}
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault()
        closeCurrent()
      }}
    >
      <div className="flex max-h-[calc(100dvh-2rem)] w-fit max-w-full flex-col items-end gap-3">
        <div className="flex w-full items-center justify-between gap-3">
          <p className="text-sm font-medium text-white" aria-live="polite">
            {index + 1} of {slides.length}
          </p>
          <button
            ref={closeRef}
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Close"
            onClick={closeCurrent}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 w-full overflow-auto">
          {slide.kind === 'poster' ? (
            <PosterSlide slide={slide} titleId={titleId} />
          ) : (
            <EventSlide slide={slide} titleId={titleId} />
          )}
        </div>
      </div>
    </dialog>,
    document.body,
  )
}

function PosterSlide({
  slide,
  titleId,
}: {
  slide: Extract<HomePopupSlide, { kind: 'poster' }>
  titleId: string
}) {
  const image = (
    // Poster art is authored at many aspect ratios; contain it instead of cropping.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={slide.imageUrl}
      alt=""
      className="mx-auto block max-h-[calc(100dvh-7.5rem)] w-auto max-w-full rounded-xl object-contain"
    />
  )

  return (
    <div>
      <h2 id={titleId} className="sr-only">
        {slide.title}
      </h2>
      {slide.href ? (
        <a
          href={slide.href}
          aria-label={slide.title}
          className="block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  )
}

function EventSlide({
  slide,
  titleId,
}: {
  slide: Extract<HomePopupSlide, { kind: 'event' }>
  titleId: string
}) {
  return (
    <article className="w-full max-w-lg overflow-hidden rounded-2xl bg-white text-slate-900 shadow-2xl">
      {slide.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={slide.imageUrl}
          alt=""
          className="max-h-[50dvh] w-full object-contain bg-slate-100"
        />
      ) : null}
      <div className="space-y-4 p-5 sm:p-6">
        <div className="space-y-1">
          <h2 id={titleId} className="text-xl font-semibold leading-snug text-brand-800 sm:text-2xl">
            {slide.title}
          </h2>
          <p className="text-sm text-slate-600">{slide.whenLabel}</p>
          {slide.venue ? <p className="text-sm text-slate-600">{slide.venue}</p> : null}
        </div>
        <a
          href={slide.href}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          {slide.ctaLabel}
        </a>
      </div>
    </article>
  )
}
