import { HeroStagger, HeroStaggerItem } from '@/components/motion/HeroStagger'
import { StudentHubSearch } from '@/components/student-hub/StudentHubSearch'
import { studentHubTokens } from '@/components/student-hub/tokens'

export function StudentHubHero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f0f4ff] via-white to-white py-20 sm:py-28 lg:py-36">
      {/* Soft radial glow backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-start justify-center"
      >
        <div className="h-[500px] w-[900px] rounded-full bg-[#dde8ff] opacity-40 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <HeroStagger>
          {/* Badge */}
          <HeroStaggerItem>
            <span
              className={`inline-flex ${studentHubTokens.radiusPill} bg-[var(--hub-primary-soft)] border border-[#1e3a5f]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[var(--hub-primary)]`}
            >
              Student Portal
            </span>
          </HeroStaggerItem>

          {/* Headline */}
          <HeroStaggerItem>
            <h1
              id="hub-hero-title"
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--hub-text)] leading-[1.1] tracking-tight text-balance"
            >
              Student{' '}
              <span className="text-gradient-brand">Resource Hub</span>
            </h1>
          </HeroStaggerItem>

          {/* Subtext */}
          <HeroStaggerItem>
            <p
              className={`mt-5 mx-auto max-w-xl text-base sm:text-lg leading-relaxed ${studentHubTokens.body}`}
            >
              Access a comprehensive library of forensic science materials, research papers,
              case studies, and exam preparation tools designed to accelerate your learning
              journey.
            </p>
          </HeroStaggerItem>

          {/* Search */}
          <HeroStaggerItem>
            <div className="mt-10 flex justify-center">
              <StudentHubSearch />
            </div>
          </HeroStaggerItem>
        </HeroStagger>
      </div>
    </section>
  )
}