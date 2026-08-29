import Link from 'next/link'
import type { Service } from '@/payload-types'
import type { PaginatedDocs } from 'payload'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CONTAINER, SECTION, serviceIcons } from './constants'
import type { SectionText } from './types'

export function ServicesSection({
  sectionText,
  services,
}: {
  sectionText: SectionText
  services: PaginatedDocs<Service>
}) {
  const items =
    services.docs.length > 0
      ? services.docs.map((s, i) => ({
          label: s.title,
          href: `/services/${s.slug}`,
          color: serviceIcons[i % serviceIcons.length].color,
        }))
      : serviceIcons.map((s) => ({ label: s.label, href: '/services', color: s.color }))

  return (
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <SectionHeader
          title={sectionText.servicesHeading || 'Our Key Services & Programs'}
          subtitle={
            sectionText.servicesDescription ||
            'Comprehensive forensic solutions tailored for academic growth and professional expertise.'
          }
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center text-center card-pop"
            >
              <div
                className={`h-20 w-20 sm:h-24 sm:w-24 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm ${item.color} group-hover:scale-105 transition-transform`}
              >
                ◈
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-800 leading-snug group-hover:text-brand-600 transition-colors">
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
