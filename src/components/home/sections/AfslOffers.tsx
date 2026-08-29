import Image from 'next/image'
import Link from 'next/link'

export function AfslOffers() {
  return (
    <div>
      <div className="rounded-3xl bg-brand-100 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 shadow-xl">
        {/* Two-column layout */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — text */}

          <div>
            <h2 className="text-slate-900 text-xl sm:text-2xl lg:text-[28px] font-extrabold leading-snug max-w-xl">
              Forensic Science Training, Internship &amp; Research Programs
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-700 max-w-xl leading-relaxed">
              AFSL provides structured internship programs designed to give students practical
              exposure in forensic science disciplines — including crime scene investigation,
              fingerprint analysis, digital forensics, and more.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-600 hover:bg-brand-700 px-6 text-sm font-bold text-white transition"
              >
                Explore Training Programs
              </Link>

              <Link
                href="/internship"
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
                Apply for Internship
              </Link>
            </div>
          </div>

          {/* Right — image */}

          <div className="relative w-full h-[260px] sm:h-[300px] rounded-xl overflow-hidden">
            <Image
              src="https://res.cloudinary.com/drrzakkgo/image/upload/v1763210329/ChatGPT_Image_Nov_15_2025_05_30_55_PM_gicx5y.png"
              alt="AFRS forensic training session"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
