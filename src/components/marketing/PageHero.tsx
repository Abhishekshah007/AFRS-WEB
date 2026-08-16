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
                  <Link href={primaryCta.href} className="inline-flex h-11 items-center justify-center px-6 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 text-sm font-bold transition shadow-sm">
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

export type SubPageHeroProps = {
  breadcrumbs: BreadcrumbItem[]
  eyebrow?: string
  title: string
  description: string
  icon?: string
}

export function SubPageHero({ breadcrumbs, eyebrow, title, description, icon }: SubPageHeroProps) {
  return (
    <div className="programmes-sub-hero relative w-full overflow-hidden text-white">
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-white/10 blur-[80px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10 py-12 sm:py-16">
        <nav className="text-xs text-white/70 flex flex-wrap gap-1.5 items-center mb-8" aria-label="Breadcrumb">
          {breadcrumbs.map((item, i) => (
            <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden className="text-white/40">/</span>}
              {item.href ? <Link href={item.href} className="hover:text-white transition-colors duration-150">{item.label}</Link> : <span className="font-semibold text-white">{item.label}</span>}
            </span>
          ))}
        </nav>

        <HeroStagger className="max-w-3xl">
          <div className="flex items-start gap-5">
            {icon && <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-3xl border border-white/20 backdrop-blur-md shadow-lg shadow-black/10" aria-hidden>{icon}</span>}
            <div className="min-w-0">
              {eyebrow && <HeroStaggerItem><p className="text-[11px] font-bold uppercase tracking-widest text-amber-300/90">{eyebrow}</p></HeroStaggerItem>}
              <HeroStaggerItem><h1 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight text-balance">{title}</h1></HeroStaggerItem>
              <HeroStaggerItem><p className="mt-3 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed">{description}</p></HeroStaggerItem>
            </div>
          </div>
        </HeroStagger>
      </div>

      <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-black/5" />
    </div>
  )
}
