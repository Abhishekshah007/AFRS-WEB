import Image from 'next/image'
import Link from 'next/link'
import { resolveMediaUrl } from '@/lib/cms'
import type { Media } from '@/payload-types'
import { TYPOGRAPHY, UI } from '../design'
import { ForensicBackground } from '../ForensicBackground'
import { CONTAINER, heroPanelImage } from './constants'
import type { HeroData } from './types'

export function HeroSection({ heroData }: { heroData: HeroData }) {
  const heroImageSrc = resolveMediaUrl(
    (heroData as HeroData & { heroImage?: number | Media | null })?.heroImage,
    heroPanelImage,
  )

  return (
    <section
      className="relative overflow-hidden text-white pt-16 pb-20 lg:pt-20 lg:pb-24 forensic-grid"
      style={{ background: UI.heroGradient }}
    >
      <ForensicBackground />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-white rounded-t-[2rem]" />
      <div className={`${CONTAINER} relative grid gap-10 lg:grid-cols-2 lg:gap-16 items-center`}>
        <div className="reveal-up">
          <h1 className={UI.titleLarge}>
            {heroData.title || 'Where Evidence Speaks. Science Answers.'}
          </h1>
          <p className={`mt-6 ${TYPOGRAPHY.bodyLarge} text-white/85 max-w-xl`}>
            {heroData.description ||
              "India's premier hub for forensic education, research & professional services"}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={heroData.primaryCTAUrl || '/courses'}
              className="inline-flex h-12 items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 px-8 text-sm font-bold shadow-lg shadow-black/20 transition"
            >
              {heroData.primaryCTALabel || 'Explore Now'}
            </Link>
            <Link
              href={heroData.secondaryCTAUrl || '/contact'}
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-white bg-white/95 text-slate-900 hover:bg-white px-8 text-sm font-bold transition"
            >
              {heroData.secondaryCTALabel || 'Contact Now'}
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/90">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Accredited Programs
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Expert Professionals
            </span>
          </div>
        </div>
        <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto reveal-up">
          <div className="rounded-[2.5rem] border border-white/25 bg-white/10 p-4 shadow-2xl backdrop-blur-sm">
            <div className="relative h-[280px] sm:h-[380px] lg:h-[420px] rounded-[2rem] overflow-hidden">
              <Image
                src={heroImageSrc}
                alt="AFRS forensic science laboratory and training facility in Indore"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
