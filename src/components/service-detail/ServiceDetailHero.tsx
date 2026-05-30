import Image from 'next/image'
import Link from 'next/link'
import { serviceDetailTokens } from '@/components/service-detail/tokens'

export type ServiceDetailHeroProps = {
  title: string
  description: string
  bannerUrl: string
}

/**
 * Full-bleed hero with crime-scene imagery, breadcrumbs, and orange CTA.
 */
export function ServiceDetailHero({ title, description, bannerUrl }: ServiceDetailHeroProps) {
  return (
    <section className="relative min-h-[420px] md:min-h-[480px] flex items-end overflow-hidden" aria-labelledby="service-hero-title">
      <Image
        src={bannerUrl}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/30" />

      <div className={`${serviceDetailTokens.container} relative z-10 w-full pb-12 md:pb-16 pt-28 md:pt-32`}>
        <nav aria-label="Breadcrumb" className="reveal-up">
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

        <div className="mt-6 max-w-2xl reveal-up-d1">
          <h1 id="service-hero-title" className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-tight tracking-tight">
            {title}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">{description}</p>
          <Link href="#consult-expert" className={`mt-8 ${serviceDetailTokens.ctaOrange}`}>
            Get Started
          </Link>
        </div>
      </div>
    </section>
  )
}
