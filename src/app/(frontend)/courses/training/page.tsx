import { CategoryIndexView } from '@/components/programmes/CategoryIndexView'
import { trainingCategories } from '@/components/programmes/catalog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AFSL Training & Internship',
  description: 'Online and lab-based training, internships, dissertation support, and research programmes at AFSL.',
}

export default function TrainingIndexPage() {
  return (
    <CategoryIndexView
      breadcrumbs={[
        { label: 'Programmes', href: '/courses' },
        { label: 'AFSL Training' },
      ]}
      eyebrow="Dedicated Training Center"
      title="AFSL Training & Internship"
      description="Select a track to explore all available programmes and application pathways."
      items={trainingCategories.map((c) => ({
        slug: c.slug,
        icon: c.icon,
        title: c.title,
        summary: c.summary,
        href: `/courses/training/${c.slug}`,
        tag: c.tag,
      }))}
    />
  )
}
