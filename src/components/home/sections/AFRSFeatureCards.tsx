import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { Event as AfrsEvent } from '@/payload-types'
import {
  Binoculars,
  Briefcase,
  FlaskConical,
  GraduationCap,
  Search,
  ShieldCheck,
} from 'lucide-react'
import type { PaginatedDocs } from 'payload'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CONTAINER, SECTION, serviceIcons } from './constants'
import type { SectionText } from './types'

export function AFRSFeatureCards({
  sectionText,
  events,
}: {
  sectionText: SectionText
  events: PaginatedDocs<AfrsEvent>
}) {
  const items = [
    {
      icon: GraduationCap,
      label: 'Professional Training Programs',
      href: '/courses',
      description:
        'Structured forensic science courses designed for students and professionals seeking practical skills and certification.',
    },
    {
      icon: Briefcase,
      label: 'Internship Opportunities',
      href: '/courses',
      description:
        'Hands-on forensic internships providing real-world experience in laboratory and field settings under expert mentorship.',
    },
    {
      icon: Binoculars,
      label: 'Research Projects',
      href: '/courses',
      description:
        'Engage in cutting-edge forensic research initiatives that contribute to the advancement of the field.',
    },
    {
      icon: Search,
      label: 'Case Consultation',
      href: '/services',
      description:
        'Professional forensic consultation for complex investigations and evidence analysis.',
    },
    {
      icon: FlaskConical,
      label: 'Lab Services',
      href: '/services',
      description: 'Full-spectrum forensic laboratory analysis with certified expert reports.',
    },
    {
      icon: ShieldCheck,
      label: 'Certification',
      href: '/courses',
      description: 'Industry-recognized certifications for forensic professionals and researchers.',
    },
  ]
  return (
    <section
      className={`${SECTION} section-aura-services section-glow-top relative overflow-hidden`}
    >
      <div className={`${CONTAINER} relative z-10`}>
        <SectionHeader
          title={sectionText.featuredCardsHeading || 'Our Key Services & Programs'}
          subtitle={
            sectionText.servicesDescription ||
            'Comprehensive forensic solutions tailored for academic growth and professional expertise.'
          }
        />
        <AnimateOnScroll stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const iconStyle = serviceIcons[index % serviceIcons.length]

            return (
              <Link
                key={item.label}
                href={item.href}
                className="elevated-card card-pop group block rounded-2xl p-6"
                style={{ '--card-accent': iconStyle.accent } as CSSProperties}
              >
                <div>
                  <div
                    className={`inline-flex items-center justify-center rounded-xl px-3 py-2.5 shadow-sm ${iconStyle.color}`}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900 leading-snug group-hover:text-indigo-700 transition-colors">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </Link>
            )
          })}
        </AnimateOnScroll>
      </div>
      <div className="pointer-events-none absolute -bottom-10 -left-8 opacity-[0.035] text-indigo-900">
        <svg width="220" height="220" viewBox="0 0 260 260" fill="none" aria-hidden>
          <circle cx="130" cy="130" r="20" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="45" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="70" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="95" stroke="currentColor" strokeWidth="10" />
        </svg>
      </div>
    </section>
  )
}
