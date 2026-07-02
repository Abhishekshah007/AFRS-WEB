import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import type { CatalogItem, DirectorateMember } from '@/components/services/types'
import { ServicesPageView } from '@/components/services/ServicesPageView'
import type { Media, Scientist, Service, SiteSetting } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AFSL - Applied Forensic Sciences Laboratory',
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
    name: 'Mr. Rakesh Mia',
    designation: 'Lab Director',
    initials: 'RM',
    photo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1762611530/s1bhfnkxkbyor6bhjrnv.jpg',
    bio: 'Senior forensic scientist with expertise in analytical chemistry.',
  },
  {
    name: 'Mr. Vijay Panchal',
    designation: 'Deputy Director',
    initials: 'VP',
    photo:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1762258620/WhatsApp_Image_2025-11-04_at_12.33.03_AM_fywjbh.jpg',
    bio: 'Crime scene investigation and evidence documentation specialist.',
  },
]

const fallbackTeam: DirectorateMember[] = [
  {
    name: 'Ms. Megha Jain',
    designation: 'Digital Forensic Expert',
    initials: 'MJ',
    photo: 'https://res.cloudinary.com/drrzakkgo/image/upload/v1763141455/xpvpfqfee6ppp875xdd5.jpg',
  },
  {
    name: 'Dr. Shrutika Singla',
    designation: 'Fire & Arson Expert',
    initials: 'SS',
    photo:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1762258621/WhatsApp_Image_2025-11-04_at_12.37.51_AM_h1kedk.jpg',
  },
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
        phone: site?.phone || '+91-9926692487',
        email: site?.email || 'afslforensicservices@gmail.com',
        address:
          site?.address ||
          `8/1 2nd floor, Moti Tabela,
Near Collectorate office, Indore,
Madhya Pradesh, India`,
        mapEmbedUrl: site?.mapEmbedUrl,
      }}
      totalVisitors={site?.totalVisitors || 200}
    />
  )
}
