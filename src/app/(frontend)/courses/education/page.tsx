import { CategoryIndexView } from '@/components/programmes/CategoryIndexView'
import { getEducationCategories } from '@/components/programmes/catalog'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = buildPageMetadata({
  title: 'AFRS Education Programmes',
  description:
    'Browse AFRS one-month online training, internships, professional certificates, capsule modules, police training and research programmes.',
  path: '/courses/education',
})

export default async function EducationIndexPage() {
  const categories = await getEducationCategories()

  return (
    <CategoryIndexView
      breadcrumbs={[
        { label: 'Programmes', href: '/courses' },
        { label: 'AFRS Education' },
      ]}
      eyebrow="AFRS Academy"
      title="AFRS Education"
      description="Choose a learning track to view all programmes, durations, and application options."
      items={categories.map((c) => ({
        slug: c.slug,
        icon: c.icon,
        title: c.title,
        summary: c.summary,
        href: `/courses/education/${c.slug}`,
      }))}
    />
  )
}
