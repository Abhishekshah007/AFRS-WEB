'use client'

import { OfficialBannerShell } from '@/components/banner/OfficialBannerShell'
import { HeroStagger, HeroStaggerItem } from '@/components/motion/HeroStagger'
import { ShimmerLink } from '@/components/motion/ShimmerLink'

export function PageHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}) {
  return (
    <OfficialBannerShell
      variant="indigo"
      ariaLabelledBy="page-hero-title"
      className="text-white"
      contentClassName="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 text-center official-banner-content-pad py-14 lg:py-24"
    >
      <HeroStagger>
        {eyebrow && (
          <HeroStaggerItem>
            <span className="inline-flex rounded-full bg-white/15 backdrop-blur-md border border-amber-400/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              {eyebrow}
            </span>
          </HeroStaggerItem>
        )}
        <HeroStaggerItem>
          <h1
            id="page-hero-title"
            className="mt-4 text-3xl sm:text-4xl lg:text-[52px] font-extrabold tracking-tight leading-[1.1] text-balance"
          >
            {title}
          </h1>
        </HeroStaggerItem>
        {subtitle && (
          <HeroStaggerItem>
            <p className="mt-5 text-base sm:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </HeroStaggerItem>
        )}
        {(primaryCta || secondaryCta) && (
          <HeroStaggerItem>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              {primaryCta && (
                <ShimmerLink href={primaryCta.href} variant="primary">
                  {primaryCta.label}
                </ShimmerLink>
              )}
              {secondaryCta && (
                <ShimmerLink href={secondaryCta.href} variant="ghost">
                  {secondaryCta.label}
                </ShimmerLink>
              )}
            </div>
          </HeroStaggerItem>
        )}
      </HeroStagger>
    </OfficialBannerShell>
  )
}
