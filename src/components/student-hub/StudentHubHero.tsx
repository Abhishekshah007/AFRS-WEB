// StudentHubHero.tsx
import { HeroStagger, HeroStaggerItem } from '@/components/motion/HeroStagger'
import { StudentHubSearch } from '@/components/student-hub/StudentHubSearch'

export function StudentHubHero() {
  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28">
      {/* Radial glow — top center, very soft lavender */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, #e8eaff 0%, #f5f6ff 40%, #ffffff 75%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <HeroStagger>
          {/* Badge */}
          <HeroStaggerItem>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 shadow-sm">
              Student Portal
            </span>
          </HeroStaggerItem>

          {/* Headline */}
          <HeroStaggerItem>
            <h1 className="mt-6 text-[42px] sm:text-[56px] lg:text-[64px] font-extrabold leading-[1.08] tracking-[-0.025em]">
              <span className="text-[#111827]">Student </span>
              <span className="text-[#5B5FE8]">Resource Hub</span>
            </h1>
          </HeroStaggerItem>

          {/* Body */}
          <HeroStaggerItem>
            <p className="mt-5 mx-auto max-w-[520px] text-[15px] sm:text-[16px] leading-[1.75] text-slate-500 text-center text-balance">
              Access a comprehensive library of forensic science materials, research papers, case
              studies, and exam preparation tools designed to accelerate your learning journey.
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
