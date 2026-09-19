'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { logClientError } from '@/lib/resilience/logger'

export default function FrontendError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    logClientError('frontend-error-boundary', error, { digest: error.digest })
  }, [error])

  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-500">
        Something went wrong
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-brand-ink">We could not load this page</h1>
      <p className="mt-4 text-slate-600">
        This is usually temporary. Please try again. If the problem continues, contact AFRS support.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-brand px-5 py-2.5 text-sm font-bold text-brand"
        >
          Go to homepage
        </Link>
        <Link
          href="/contact"
          className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700"
        >
          Contact support
        </Link>
      </div>
    </div>
  )
}
