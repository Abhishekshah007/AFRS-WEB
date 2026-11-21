import Image from 'next/image'
import Link from 'next/link'
import type { AfslSectionContent } from '@/lib/queries/home-sections'

export function AfslOffers({ content }: { content: AfslSectionContent['offers'] }) {
  return (
    <div>
      <div className="interactive-panel card-pop rounded-3xl bg-brand-100 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 shadow-xl overflow-hidden">
        {/* Two-column layout */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — text */}

          <div>
            <h2 className="text-slate-900 text-xl sm:text-2xl lg:text-[28px] font-extrabold leading-snug max-w-xl">
              {content.title}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-700 max-w-xl leading-relaxed">
              {content.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={content.primaryHref}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-700 px-6 text-sm font-bold text-white transition"
              >
                {content.primaryLabel}
              </Link>

              <Link
                href={content.secondaryHref}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-700 hover:bg-brand px-6 text-sm font-bold text-white transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {content.secondaryLabel}
              </Link>
            </div>
          </div>

          {/* Right — image */}

          <div className="relative w-full h-65 sm:h-75 rounded-xl overflow-hidden bg-[#f5ead0]">
            <Image
              src={content.imageUrl}
              alt={content.imageAlt}
              fill
              className="h-full w-full object-contain sm:object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
