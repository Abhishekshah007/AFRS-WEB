import Image from 'next/image'
import Link from 'next/link'
import { TYPOGRAPHY } from '../design'

const CONTACT_IMAGE =
  'https://res.cloudinary.com/drrzakkgo/image/upload/v1789644470/afrs/payload/media/AFRS%20SITE%20IMAGEs/HomeScreenAFSLAboutSection_j2xg1v.png'

export function ProgramCtaSection() {
  return (
    <div className="interactive-panel card-pop rounded-3xl bg-brand-100 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <p className={`${TYPOGRAPHY.label} text-brand-600`}>Get In Touch</p>

          <p className="mt-4 text-sm sm:text-base text-slate-800 max-w-xl leading-relaxed">
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

        <div className="relative w-full min-h-[220px] sm:min-h-[260px] rounded-xl overflow-hidden bg-[#f5ead0] ring-1 ring-brand-900/5">
          <Image
            src={CONTACT_IMAGE}
            alt="Connect with AFRS forensic experts"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
        </div>
      </div>
    </div>
  )
}
