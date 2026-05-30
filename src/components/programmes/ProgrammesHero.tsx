import Link from 'next/link'
import { programmesTokens } from '@/components/programmes/tokens'

const quickLinks = [
  { label: 'AFRS Education', href: '#afrs-education', icon: '📚' },
  { label: 'AFSL Training', href: '#afsl-training', icon: '🧪' },
  { label: 'Online Events', href: '#online-events', icon: '📅' },
]

/**
 * Blue hero with academy badge and anchor quick-nav pills.
 */
export function ProgrammesHero() {
  return (
    <section className="programmes-hero text-white py-16 md:py-20 lg:py-24 text-center" aria-labelledby="programmes-hero-title">
      <div className={programmesTokens.container}>
        <span className="inline-flex rounded-full border border-white/40 bg-white/10 px-4 py-1 text-[11px] font-bold uppercase tracking-widest reveal-up">
          Aditya Academy
        </span>
        <h1 id="programmes-hero-title" className="mt-5 text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-tight reveal-up-d1">
          Forensic Programmes &amp; Events
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-white/85 leading-relaxed reveal-up-d2">
          Explore our comprehensive range of educational courses, laboratory training, and global forensic events.
        </p>
        <nav className="mt-10 flex flex-wrap justify-center gap-3 reveal-up-d3" aria-label="Programme sections">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[var(--prog-primary)] shadow-md hover:bg-blue-50 transition"
            >
              <span aria-hidden>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
