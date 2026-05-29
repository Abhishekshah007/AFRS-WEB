import Link from 'next/link'

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
    <section
      className="relative overflow-hidden py-14 lg:py-20 text-white"
      style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 60%, #93c5fd 100%)' }}
    >
      <div className="absolute inset-0 forensic-grid" />
      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 text-center">
        {eyebrow && (
          <span className="inline-flex rounded-full bg-white/15 backdrop-blur px-4 py-1 text-xs font-bold uppercase tracking-wider">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && <p className="mt-4 text-base sm:text-lg text-white/85 max-w-3xl mx-auto">{subtitle}</p>}
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex h-12 items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 px-8 text-sm font-bold shadow-lg shadow-black/20 transition"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-white/90 bg-white/10 hover:bg-white/20 px-8 text-sm font-bold transition"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

