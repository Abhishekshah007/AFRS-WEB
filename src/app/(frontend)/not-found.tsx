import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-500">404</p>
      <h1 className="mt-3 text-3xl font-extrabold text-brand-ink">This page is not available</h1>
      <p className="mt-4 text-slate-600">
        The address may have changed. Return to the homepage or browse programmes and services.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white">
          Home
        </Link>
        <Link href="/courses" className="rounded-xl border border-brand px-5 py-2.5 text-sm font-bold text-brand">
          Programmes
        </Link>
        <Link href="/services" className="rounded-xl border border-brand px-5 py-2.5 text-sm font-bold text-brand">
          Services
        </Link>
      </div>
    </div>
  )
}
