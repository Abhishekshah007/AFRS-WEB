import Link from 'next/link'
import { HeroStagger, HeroStaggerItem } from '@/components/motion/HeroStagger'
import { resolveIcon } from '@/components/ui/iconMap'

export type BreadcrumbItem = {
  label: string
  href?: string
}

export type SubPageHeroProps = {
  breadcrumbs: BreadcrumbItem[]
  eyebrow?: string
  title: string
  description: string
  icon?: string
}

/**
 * Compact hero for programme category and events listing sub-pages.
 */
export function SubPageHero({ breadcrumbs, eyebrow, title, description, icon }: SubPageHeroProps) {
  const Icon = resolveIcon(icon)
  return (
    <div className="programmes-sub-hero relative w-full overflow-hidden text-white">
      {/* Radial glow top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-white/10 blur-[80px]"
      />
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10 py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav
          className="text-xs text-white/70 flex flex-wrap gap-1.5 items-center mb-8"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((item, i) => (
            <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden className="text-white/40">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-white transition-colors duration-150">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-white">{item.label}</span>
              )}
            </span>
          ))}
        </nav>

        {/* Hero content */}
        <HeroStagger className="max-w-3xl">
          <div className="flex items-start gap-5">
            {/* Icon box */}
            {icon && (
              <span
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-lg shadow-black/10 backdrop-blur-md"
                aria-hidden
              >
                <Icon className="h-8 w-8" strokeWidth={1.7} />
              </span>
            )}

            <div className="min-w-0">
              {/* Eyebrow */}
              {eyebrow && (
                <HeroStaggerItem>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-amber-300/90">
                    {eyebrow}
                  </p>
                </HeroStaggerItem>
              )}

              {/* Title */}
              <HeroStaggerItem>
                <h1 className="mt-1.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-[1.15] tracking-tight text-balance">
                  {title}
                </h1>
              </HeroStaggerItem>

              {/* Description */}
              <HeroStaggerItem>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed">
                  {description}
                </p>
              </HeroStaggerItem>
            </div>
          </div>
        </HeroStagger>
      </div>

      {/* Bottom fade into page content */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-black/5"
      />
    </div>
  )
}