import {
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  FileSearch,
  Microscope,
  Network,
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { TYPOGRAPHY, UI } from '../design'
import { CONTAINER, SECTION } from './constants'

export function AchievementsSection() {
  const items = [
    {
      title: 'Skill Development',
      description:
        'Gain hands-on expertise in methodologies like DNA profiling and digital forensics.',
      icon: BrainCircuit,
      bg: 'bg-violet-100',
      iconColor: 'text-violet-600',
    },
    {
      title: 'Career Guidance',
      description: 'Personalized mentorship to navigate career paths in private and govt sectors.',
      icon: BriefcaseBusiness,
      bg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Practical Exposure',
      description: 'Bridge theory with access to state-of-the-art laboratory tools and methods.',
      icon: Microscope,
      bg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Mentorship & Networking',
      description: 'Connect with a global community of forensic experts and researchers.',
      icon: Network,
      bg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Real-World Case Studies',
      description: 'Learn from actual forensic cases to understand complex problem-solving.',
      icon: FileSearch,
      bg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Recognition',
      description: 'Earn industry-recognized certifications.',
      icon: BadgeCheck,
      bg: 'bg-pink-100',
      iconColor: 'text-pink-600',
    },
  ]

  return (
    <section
      className={`${SECTION} ${UI.sectionSurface} section-glow-top relative overflow-hidden`}
    >
      <div className={CONTAINER}>
        <SectionHeader
          title="The AFRS Impact"
          subtitle="Our holistic approach ensures every student and professional gains more than just knowledge."
        />
        <AnimateOnScroll
          stagger
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.title} className={`${UI.cardInteractive} p-8 card-pop`}>
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
                >
                  <Icon className={`h-7 w-7 ${item.iconColor}`} />
                </div>

                <h3 className={`mt-7 ${TYPOGRAPHY.cardTitle} text-slate-900`}>{item.title}</h3>

                <p className={`mt-5 ${UI.body} text-slate-500`}>{item.description}</p>
              </div>
            )
          })}
        </AnimateOnScroll>
      </div>

      {/* Decorative fingerprint */}
      <div className="pointer-events-none absolute bottom-0 right-0 opacity-[0.04]">
        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="130" cy="130" r="20" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="45" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="70" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="95" stroke="currentColor" strokeWidth="10" />
        </svg>
      </div>
    </section>
  )
}
