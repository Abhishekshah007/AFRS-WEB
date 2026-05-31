import Image from 'next/image'
import Link from 'next/link'
import { HeroStagger, HeroStaggerItem } from '@/components/motion/HeroStagger'
import { serviceDetailTokens } from '@/components/service-detail/tokens'

export type ServiceDetailHeroProps = {
  title: string
  description: string
  bannerUrl: string
}

/**
 * Full-bleed hero with forensic illustration overlay on case imagery.
 */
export function ServiceDetailHero({ title, description, bannerUrl }: ServiceDetailHeroProps) {
  return (
   <>
         <Image
        src={bannerUrl}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover hero-ken-burns absolute inset-0 z-0"
        aria-hidden
      />
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-slate-900/92 via-slate-900/70 to-slate-900/40 pointer-events-none" />

      <HeroStagger className="max-w-2xl relative">
        <HeroStaggerItem>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-blue-300">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/40">
                /
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Services
                </Link>
              </li>
            </ol>
          </nav>
        </HeroStaggerItem>
        <HeroStaggerItem>
          <h1
            id="service-hero-title"
            className="mt-6 text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-tight tracking-tight text-balance"
          >
            {title}
          </h1>
        </HeroStaggerItem>
        <HeroStaggerItem>
          <p className="mt-4 text-sm sm:text-base text-white/90 leading-relaxed">{description}</p>
        </HeroStaggerItem>
        <HeroStaggerItem>
          <Link
            href="#consult-expert"
            className={`mt-8 inline-block ${serviceDetailTokens.ctaOrange} hover:scale-105 transition-transform duration-300`}
          >
            Get Started
          </Link>
        </HeroStaggerItem>
      </HeroStagger>
    </>
  )
}
