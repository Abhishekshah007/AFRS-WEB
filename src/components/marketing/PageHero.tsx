import Link from 'next/link'
import { HeroStagger, HeroStaggerItem } from '@/components/motion/HeroStagger'

export type BreadcrumbItem = {
  label: string
  href?: string
}

export type PageHeroProps = {
  eyebrow?: string
  title: string
  subtitle: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export function PageHero({ eyebrow, title, subtitle, primaryCta, secondaryCta }: PageHeroProps) {
  return (
    <section className="programmes-hero relative overflow-hidden text-white">
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-white/10 blur-[80px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-16 sm:py-20">
        <HeroStagger className="max-w-3xl">
          {eyebrow && (
            <HeroStaggerItem>
              <p className="text-[11px] font-bold uppercase tracking-widest text-amber-300/90">{eyebrow}</p>
            </HeroStaggerItem>
          )}

          <HeroStaggerItem>
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.12] tracking-tight text-balance">{title}</h1>
          </HeroStaggerItem>

          <HeroStaggerItem>
            <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">{subtitle}</p>
          </HeroStaggerItem>

          {(primaryCta || secondaryCta) && (
            <HeroStaggerItem>
              <div className="mt-7 flex flex-wrap gap-3">
                {primaryCta && (
                  <Link href={primaryCta.href} className="inline-flex h-11 items-center justify-center px-6 rounded-xl bg-white text-brand-700 hover:bg-brand-50 text-sm font-bold transition shadow-sm">
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link href={secondaryCta.href} className="inline-flex h-11 items-center justify-center px-6 rounded-xl border border-white/40 text-white hover:bg-white/10 text-sm font-bold transition">
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            </HeroStaggerItem>
          )}
        </HeroStagger>
      </div>
    </section>
  )
}

