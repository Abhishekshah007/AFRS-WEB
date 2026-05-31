import { CategoryIndexView } from '@/components/programmes/CategoryIndexView'
import { educationCategories } from '@/components/programmes/catalog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AFRS Education Programmes',
  description: 'Browse online training, professional courses, certificates, and workshop series at AFRS.',
}

export default function EducationIndexPage() {
  return (
    <CategoryIndexView
      breadcrumbs={[
        { label: 'Programmes', href: '/courses' },
        { label: 'AFRS Education' },
      ]}
      eyebrow="AFRS Academy"
      title="AFRS Education"
      description="Choose a learning track to view all programmes, durations, and application options."
      items={educationCategories.map((c) => ({
        slug: c.slug,
        icon: c.icon,
        title: c.title,
        summary: c.summary,
        href: `/courses/education/${c.slug}`,
      }))}
    />
  )
}
