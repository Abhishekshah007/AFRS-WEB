import Link from 'next/link'
import { GraduationCap, FlaskConical } from 'lucide-react'
import { HeroStagger, HeroStaggerItem } from '@/components/motion/HeroStagger'

const quickLinks = [
  {
    label: 'AFRS Education',
    href: '#afrs-education',
    icon: GraduationCap,
  },
  {
    label: 'AFSL Training',
    href: '#afsl-training',
    icon: FlaskConical,
  },
  // {
  //   label: 'Online Events',
  //   href: '/courses/events',
  //   icon: CalendarDays,
  // },
]

export function ProgrammesHero() {
  return (
    <div
      className="programmes-hero w-full text-center text-white px-6 py-16 sm:py-20 lg:py-24"
    >
      <HeroStagger>
        {/* Badge — solid white pill, dark text */}
        <HeroStaggerItem>
          <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[var(--prog-primary)] shadow-sm">
            Portal Access
          </span>
        </HeroStaggerItem>

        {/* Title */}
        <HeroStaggerItem>
          <h1
            id="programmes-hero-title"
            className="mt-5 text-[32px] sm:text-[42px] lg:text-[48px] font-extrabold leading-[1.1] tracking-[-0.01em] text-white text-balance mx-auto max-w-3xl"
          >
            Forensic Programmes &amp; Events
          </h1>
        </HeroStaggerItem>

        {/* Subtitle */}
        <HeroStaggerItem>
          <p className="mt-4 max-w-[420px] mx-auto text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
            Explore our comprehensive range of educational courses, laboratory training, and global
            forensic events.
          </p>
        </HeroStaggerItem>

        {/* Quick-nav pills — solid white, dark text */}
        <HeroStaggerItem>
          <nav className="mt-9 flex flex-wrap justify-center gap-3" aria-label="Programme sections">
            {quickLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-slate-700 hover:text-[var(--prog-primary)] shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                >
                  <Icon className="h-4 w-4 text-[var(--prog-primary)]" strokeWidth={1.8} aria-hidden />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </HeroStaggerItem>
      </HeroStagger>
    </div>
  )
}
