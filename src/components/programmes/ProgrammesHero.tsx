import Link from 'next/link'
import { HeroStagger, HeroStaggerItem } from '@/components/motion/HeroStagger'
import { programmesTokens } from '@/components/programmes/tokens'

const quickLinks = [
  {
    label: 'AFRS Education',
    href: '#afrs-education',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0121 13c0 5.523-4.477 10-9 10S3 18.523 3 13c0-.615.073-1.213.211-1.788L12 14z" />
      </svg>
    ),
  },
  {
    label: 'AFSL Training',
    href: '#afsl-training',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    label: 'Online Events',
    href: '/courses/events',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
        <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
        <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" />
      </svg>
    ),
  },
]

/**
 * Blue hero with academy badge and anchor quick-nav pills.
 */
export function ProgrammesHero() {
  return (
    <div className="w-full text-center text-white px-6 py-16 sm:py-20 lg:py-24 bg-[#4F75F4]">
      <HeroStagger>
        {/* Badge */}
        <HeroStaggerItem>
          <span className="inline-flex rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-white/95">
            Portal Access
          </span>
        </HeroStaggerItem>

        {/* Title */}
        <HeroStaggerItem>
          <h1
            id="programmes-hero-title"
            className="mt-5 text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-[1.1] tracking-tight text-balance"
          >
            Forensic Programmes &amp; Events
          </h1>
        </HeroStaggerItem>

        {/* Subtitle */}
        <HeroStaggerItem>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-white/85 leading-relaxed">
            Explore our comprehensive range of educational courses, laboratory training, and global
            forensic events.
          </p>
        </HeroStaggerItem>

        {/* Quick-nav pills */}
        <HeroStaggerItem>
          <nav
            className="mt-10 flex flex-wrap justify-center gap-3"
            aria-label="Programme sections"
          >
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-[var(--prog-primary)] shadow-md shadow-black/10 hover:scale-[1.03] hover:shadow-lg transition-all duration-200"
              >
                <span aria-hidden className="text-current">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </HeroStaggerItem>
      </HeroStagger>
    </div>
  )
}