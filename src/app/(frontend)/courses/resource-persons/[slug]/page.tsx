import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/seo/JsonLd'
import {
  findSiteResourcePersonBySlug,
  resourcePersonPath,
} from '@/lib/queries/resource-persons'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { breadcrumbList, resourcePersonSchema, withContext } from '@/lib/seo/schema'

import { CoursesPageContent } from '../../CoursesPageContent'

type Props = {
  params: Promise<{ slug: string }>
}

function profileDescription(name: string, title: string, bio?: string | null): string {
  if (bio?.trim()) return bio.trim()
  const role = title ? `${title}, ` : ''
  return `${name}, ${role}resource person at Applied Forensic Research Sciences (AFRS) for forensic science courses, training and workshops.`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const person = await findSiteResourcePersonBySlug(slug)
  if (!person?.slug) return { title: 'Resource person not found', robots: { index: false } }

  return buildPageMetadata({
    title: person.title
      ? `${person.name} — ${person.title} | Resource Person`
      : `${person.name} | Resource Person`,
    description: profileDescription(person.name, person.title, person.bio),
    path: resourcePersonPath(person.slug),
    image: person.photoUrl,
  })
}

/**
 * Crawlable profile URL for one resource person. Renders the normal Courses page with
 * that person's modal open, so visitors see the existing design and search engines get
 * the person's name, designation and bio in the server HTML.
 */
export default async function ResourcePersonPage({ params }: Props) {
  const { slug } = await params
  const person = await findSiteResourcePersonBySlug(slug)
  if (!person?.slug) notFound()

  const path = resourcePersonPath(person.slug)

  return (
    <>
      <JsonLd
        data={withContext([
          resourcePersonSchema({ ...person, path }),
          breadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Courses', path: '/courses' },
            { name: 'Resource Persons', path: '/courses/resource-persons' },
            { name: person.name, path },
          ]),
        ])}
      />
      <CoursesPageContent initialModal={{ kind: 'person', slug: person.slug }} />
    </>
  )
}
