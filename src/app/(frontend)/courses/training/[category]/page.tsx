import { CategoryListingView } from '@/components/programmes/CategoryListingView'
import { getTrainingCategory, trainingCategories } from '@/components/programmes/catalog'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return trainingCategories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = getTrainingCategory(category)
  if (!cat) return { title: 'Training Not Found' }
  return {
    title: `${cat.title} | AFSL Training`,
    description: cat.summary,
  }
}

export default async function TrainingCategoryPage({ params }: Props) {
  const { category } = await params
  const cat = getTrainingCategory(category)
  if (!cat) notFound()

  return (
    <CategoryListingView
      breadcrumbs={[
        { label: 'Programmes', href: '/courses' },
        { label: 'AFSL Training', href: '/courses/training' },
        { label: cat.title },
      ]}
      eyebrow="AFSL Training & Internship"
      title={cat.title}
      summary={cat.summary}
      icon={cat.icon}
      programmes={cat.programmes}
      backHref="/courses#afsl-training"
    />
  )
}
