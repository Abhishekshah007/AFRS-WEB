import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Maintenance',
  robots: { index: false, follow: false },
}

export default function MaintenancePage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-500">Maintenance</p>
      <h1 className="mt-3 text-3xl font-extrabold text-brand-ink">We will be back shortly</h1>
      <p className="mt-4 text-slate-600">
        AFRS is undergoing scheduled maintenance. Please check again in a few minutes.
      </p>
      <p className="mt-6 text-sm text-slate-500">
        Urgent help:{' '}
        <a href="tel:+919926692487" className="font-semibold text-brand-700">
          +91-9926692487
        </a>{' '}
        ·{' '}
        <a href="mailto:afrsciences@gmail.com" className="font-semibold text-brand-700">
          afrsciences@gmail.com
        </a>
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="rounded-xl border border-brand px-5 py-2.5 text-sm font-bold text-brand"
        >
          Refresh homepage
        </Link>
      </div>
    </div>
  )
}
