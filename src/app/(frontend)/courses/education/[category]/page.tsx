import { CategoryListingView } from '@/components/programmes/CategoryListingView'
import { getEducationCategories, getEducationCategory } from '@/components/programmes/catalog'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = await getEducationCategories()
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = await getEducationCategory(category)
  if (!cat) return { title: 'Programme Not Found' }
  return {
    title: `${cat.title} | AFRS Education`,
    description: cat.summary,
  }
}

export default async function EducationCategoryPage({ params }: Props) {
  const { category } = await params
  const cat = await getEducationCategory(category)
  if (!cat) notFound()

  return (
    <CategoryListingView
      breadcrumbs={[
        { label: 'Programmes', href: '/courses' },
        { label: 'AFRS Education', href: '/courses/education' },
        { label: cat.title },
      ]}
      eyebrow="AFRS Education"
      title={cat.title}
      summary={cat.summary}
      icon={cat.icon}
      programmes={cat.programmes}
      backHref="/courses#afrs-education"
    />
  )
}
