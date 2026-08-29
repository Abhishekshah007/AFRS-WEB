import Link from 'next/link'
import { TYPOGRAPHY } from '../design'

export function ProgramCtaSection() {
  return (
    <div className="rounded-3xl bg-brand-100 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 shadow-xl">
      <p className={`${TYPOGRAPHY.label} text-brand-600`}>Get In Touch</p>

      <p className="mt-4 text-sm sm:text-base text-slate-800 max-w-2xl leading-relaxed">
        Need professional forensic assistance, expert opinion, training opportunities, or research
        collaboration? Contact AFSL today and connect with our forensic experts.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-700 px-6 text-sm font-bold text-white transition"
        >
          Contact AFSL
        </Link>

        <Link
          href="/services"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-brand-600/20 bg-brand-600 hover:bg-brand-700 px-6 text-sm font-bold text-white transition gap-2"
        >
          <span aria-hidden>🔬</span>
          Explore Our Services
        </Link>
      </div>
    </div>
  )
}
