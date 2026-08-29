import { CategoryListingView } from '@/components/programmes/CategoryListingView'
import { getTrainingCategories, getTrainingCategory } from '@/components/programmes/catalog'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { clipMeta } from '@/lib/seo/site'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = await getTrainingCategories()
  return categories.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = await getTrainingCategory(category)
  if (!cat) return { title: 'Training not found', robots: { index: false, follow: false } }
  return buildPageMetadata({
    title: cat.title,
    description: clipMeta(cat.summary, 160),
    path: `/courses/training/${cat.slug}`,
  })
}

export default async function TrainingCategoryPage({ params }: Props) {
  const { category } = await params
  const cat = await getTrainingCategory(category)
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
      intro={cat.intro}
      body={cat.body}
      highlightsTitle={cat.highlightsTitle}
      highlightsNote={cat.highlightsNote}
      whoCanApply={cat.whoCanApply}
      outcomesTitle={cat.outcomesTitle}
      outcomes={cat.outcomes}
      vision={cat.vision}
      missionTitle={cat.missionTitle}
      missionItems={cat.missionItems}
      extraSections={cat.extraSections}
      disclaimer={cat.disclaimer}
    />
  )
}
