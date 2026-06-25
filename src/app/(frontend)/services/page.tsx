import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import type { CatalogItem, DirectorateMember } from '@/components/services/types'
import { ServicesPageView } from '@/components/services/ServicesPageView'
import type { Media, Scientist, Service, SiteSetting } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forensic Service AFSL',
  description:
    'Future-ready forensic laboratory services — DNA analysis, cyber forensics, questioned documents, training, and expert legal consultancy.',
}

const fallbackBanners = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=800&q=80',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
]

const fallbackCatalog: CatalogItem[] = [
  {
    id: 'dna',
    title: 'DNA Analysis',
    slug: 'dna-analysis',
    desc: 'Advanced biological profiling for victim identification, paternity, and suspect elimination with court-admissible reporting.',
    banner: fallbackBanners[0],
  },
  {
    id: 'docs',
    title: 'Questioned Documents',
    slug: 'questioned-documents',
    desc: 'Handwriting, typeface, ink analysis, and alteration detection using standard forensic protocols.',
    banner: fallbackBanners[1],
  },
  {
    id: 'fp',
    title: 'Fingerprint Analysis',
    slug: 'fingerprint-analysis',
    desc: 'Latent print development, AFIS matching, and comparative examination for criminal investigations.',
    banner: fallbackBanners[2],
  },
]

const fallbackDirectors: DirectorateMember[] = [
  {
    name: 'Mr. Jaiswal',
    designation: 'Lab Director',
    initials: 'MJ',
    bio: 'Senior forensic scientist with expertise in analytical chemistry.',
  },
  {
    name: 'Mr. Vijay',
    designation: 'Deputy Director',
    initials: 'MV',
    bio: 'Crime scene investigation and evidence documentation specialist.',
  },
]

const fallbackTeam: DirectorateMember[] = [
  { name: 'Dr. Sharma', designation: 'Forensic Pathologist', initials: 'DS' },
  { name: 'Dr. Patel', designation: 'Toxicologist', initials: 'DP' },
  { name: 'Dr. Khan', designation: 'Digital Forensics', initials: 'DK' },
  { name: 'Dr. Mehta', designation: 'Document Expert', initials: 'DM' },
  { name: 'Dr. Singh', designation: 'Ballistics', initials: 'DS' },
  { name: 'Dr. Rao', designation: 'Odontology', initials: 'DR' },
]

function toMember(sci: Scientist): DirectorateMember {
  const photo = resolveMediaUrl(sci.photo as number | Media | null | undefined, '')
  const initials =
    sci.name
      ?.split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? '??'
  return {
    name: sci.name,
    designation: sci.designation ?? 'Forensic Scientist',
    bio: sci.bio,
    photo: photo || undefined,
    initials,
  }
}

export default async function ServicesPage() {
  const payload = await getPayloadClient()

  const [services, scientists, siteData] = await Promise.all([
    payload.find({
      collection: 'services',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 50,
      depth: 1,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'scientists',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 10,
      depth: 1,
      overrideAccess: false,
    }),
    payload.findGlobal({ slug: 'siteSettings', depth: 0 }),
  ])

  const site = siteData as SiteSetting

  const catalogItems: CatalogItem[] =
    services.docs.length > 0
      ? services.docs.map((s, i) => {
          const srv = s as Service
          return {
            id: srv.id,
            title: srv.title,
            slug: srv.slug,
            desc: srv.excerpt || richTextToPlain(srv.content, 120),
            banner: resolveMediaUrl(
              srv.banner as number | Media | null | undefined,
              fallbackBanners[i % fallbackBanners.length],
            ),
          }
        })
      : fallbackCatalog

  const allScientists =
    scientists.docs.length > 0
      ? (scientists.docs as Scientist[]).map((sci) => toMember(sci))
      : [...fallbackDirectors, ...fallbackTeam]

  const directors = allScientists.slice(0, 2)
  const teamMembers = allScientists.length > 2 ? allScientists.slice(2, 8) : fallbackTeam

  return (
    <ServicesPageView
      catalogItems={catalogItems}
      directors={directors.length >= 2 ? directors : fallbackDirectors}
      teamMembers={teamMembers}
      site={{
        phone: site?.phone || '+91-0000000000',
        email: site?.email || 'info@afrs.org.in',
        address: site?.address || 'AFRS Campus, India',
        mapEmbedUrl: site?.mapEmbedUrl,
      }}
      totalVisitors={site?.totalVisitors || 2600}
    />
  )
}
