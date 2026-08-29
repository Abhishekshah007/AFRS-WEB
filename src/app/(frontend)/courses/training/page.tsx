import { CategoryIndexView } from '@/components/programmes/CategoryIndexView'
import { getTrainingCategories } from '@/components/programmes/catalog'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'Forensic Training & Internship Programmes',
  description:
    'AFSL forensic science training and laboratory internships for students, graduates and professionals, including dissertation and research support.',
  path: '/courses/training',
})

export default async function TrainingIndexPage() {
  const categories = await getTrainingCategories()

  return (
    <CategoryIndexView
      breadcrumbs={[
        { label: 'Programmes', href: '/courses' },
        { label: 'AFSL Training' },
      ]}
      eyebrow="Dedicated Training Center"
      title="AFSL Training & Internship"
      description="Select a track to explore all available programmes and application pathways."
      items={categories.map((c) => ({
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
