import Image from 'next/image'
import Link from 'next/link'
import { HeroStagger, HeroStaggerItem } from '@/components/motion/HeroStagger'
import { serviceDetailTokens } from '@/components/service-detail/tokens'
import { ShieldCheck } from 'lucide-react'

export type ServiceDetailHeroProps = {
  title: string
  description: string
  bannerUrl: string
}

export function ServiceDetailHero({ title, description, bannerUrl }: ServiceDetailHeroProps) {
  return (
    <section
      className="relative h-[520px] md:h-[580px] overflow-hidden flex items-center"
      aria-labelledby="service-hero-title"
    >
      <Image
        src={bannerUrl}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover hero-ken-burns"
        aria-hidden
      />

      {/* Light misty overlay — matches the bright reference image tone */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 pointer-events-none" />
      {/* Subtle bottom fade for grounding */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent pointer-events-none" />

      <div className={`${serviceDetailTokens.container} relative z-10 w-full`}>
        <HeroStagger className="max-w-[560px]">
          {/* Eyebrow badge */}
          <HeroStaggerItem>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4F75F4]/30 bg-white/50 backdrop-blur-sm px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#4F75F4]">
              <ShieldCheck className="h-3 w-3" />
              Specialized Service
            </span>
          </HeroStaggerItem>

          {/* Title */}
          <HeroStaggerItem>
            <h1
              id="service-hero-title"
              className="mt-5 text-[38px] sm:text-[48px] lg:text-[56px] font-black text-[#071329] leading-[1.0] tracking-[-0.02em]"
            >
              {title}
            </h1>
          </HeroStaggerItem>

          {/* Description */}
          <HeroStaggerItem>
            <p className="mt-5 max-w-[440px] text-[14px] sm:text-[15px] font-medium text-[#3a4a5c] leading-[1.75]">
              {description}
            </p>
          </HeroStaggerItem>

          {/* CTA */}
          <HeroStaggerItem>
            <Link
              href="#consult-expert"
              className="mt-8 inline-flex items-center gap-2 rounded-[8px] bg-[#f59e0b] hover:bg-[#d97706] px-7 h-12 text-[13px] font-extrabold text-white shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/40"
            >
              Inquire Now
              <span aria-hidden>→</span>
            </Link>
          </HeroStaggerItem>
        </HeroStagger>
      </div>
    </section>
  )
}
