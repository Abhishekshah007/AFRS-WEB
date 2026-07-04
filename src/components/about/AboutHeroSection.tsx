import Image from 'next/image'
import Link from 'next/link'
import { aboutTokens, ABOUT_IMAGES } from '@/components/about/tokens'

export type AboutHeroSectionProps = {
  eyebrow?: string
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
  imageSrc?: string
  imageAlt?: string
}

/**
 * Full-width blue hero with two-column layout (copy left, image right).
 */
export function AboutHeroSection({
  eyebrow = 'About AFRS',
  title,
  subtitle,
  ctaLabel = 'Download Programme',
  ctaHref = '#vision',
  imageSrc = ABOUT_IMAGES.hero,
  imageAlt = 'AFRS forensic research laboratory',
}: Readonly<AboutHeroSectionProps>) {
  return (
    <section
      className="relative overflow-hidden text-white about-hero"
      aria-labelledby="about-hero-heading"
    >
      <div className={`${aboutTokens.container} relative z-10 py-16 md:py-20 lg:py-24`}>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="reveal-up max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">{eyebrow}</p>
            <h1
              id="about-hero-heading"
              className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.12] tracking-tight"
            >
              {title}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxe text-justify">
              {subtitle}
            </p>
            <Link href={ctaHref} className={`mt-8 ${aboutTokens.primaryBtn}`}>
              {ctaLabel}
            </Link>
          </div>

          <div className="relative reveal-up-d1">
            <div
              className={`relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden ${aboutTokens.radiusImage} shadow-2xl ring-1 ring-white/20`}
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
