import { AboutPageView } from '@/components/about/AboutPageView'
import { ABOUT_IMAGES } from '@/components/about/tokens'
import type { AchievementStat, CertificationItem, LeaderProfile } from '@/components/about/types'
import { resolveMediaUrl } from '@/lib/cms'
import { getPayloadClient } from '@/lib/payload'
import type { HomePage, ImpactStat, Media, Scientist } from '@/payload-types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about AFRS — our vision, mission, leadership, certifications, and achievements in forensic science education and research.',
}

const defaultCertifications: CertificationItem[] = [
  { icon: '🔬', title: 'AFPS Team', description: 'Applied Forensic Professional Standards aligned training and assessment.' },
  { icon: '📋', title: 'ISO Protocols', description: 'Laboratory workflows following international quality management principles.' },
  { icon: '🏛', title: 'Academic MoUs', description: 'Partnerships with universities for research and internship programmes.' },
  { icon: '⚖️', title: 'Legal Expert Panel', description: 'Court-qualified experts for testimony and case consultancy.' },
]

const defaultUnique = [
  { text: 'Research-led curriculum mapped to real case workflows' },
  { text: 'ISO-minded laboratory practices and chain-of-custody focus' },
  { text: 'Hybrid learning — online theory with offline practicals' },
  { text: 'Mentorship from practicing forensic scientists' },
  { text: 'Nationwide network of students and professionals' },
]

const defaultActivities = [
  { text: 'Certificate programmes and short-term forensic courses' },
  { text: 'Crime scene and laboratory internship placements' },
  { text: 'Forensic consultancy for agencies and legal teams' },
  { text: 'Workshops, webinars, and national conferences' },
  { text: 'Published research and collaborative investigations' },
]

const defaultAchievements: AchievementStat[] = [
  { value: '500+', label: 'Members', tone: 'blue', numericEnd: 500, suffix: '+' },
  { value: '400+', label: 'Students', tone: 'purple', numericEnd: 400, suffix: '+' },
  { value: '95+', label: 'Events', tone: 'orange', numericEnd: 95, suffix: '+' },
  { value: '1', label: 'National Network', tone: 'green', numericEnd: 1, suffix: '' },
  { value: '1000+', label: 'Followers', tone: 'red', numericEnd: 1000, suffix: '+' },
]

const toneMap: Record<string, AchievementStat['tone']> = {
  indigo: 'blue',
  blue: 'blue',
  purple: 'purple',
  orange: 'orange',
  emerald: 'green',
  green: 'green',
}

/** Parse CMS text values like "300+" into CountUp-friendly parts. */
function parseStatValue(raw: string): Pick<AchievementStat, 'value' | 'numericEnd' | 'suffix'> {
  const match = raw.trim().match(/^(\d+)(.*)$/)
  if (!match) return { value: raw }
  return {
    value: raw,
    numericEnd: Number(match[1]),
    suffix: match[2] || '',
  }
}

function toLeader(sci: Scientist, index: number): LeaderProfile {
  const photoUrl = resolveMediaUrl(sci.photo as number | Media | null | undefined, '')
  const initials =
    sci.name
      ?.split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? '??'
  return {
    id: String(sci.id ?? index),
    name: sci.name,
    designation: sci.designation ?? 'Forensic Scientist',
    bio: sci.bio,
    photoUrl: photoUrl || undefined,
    initials,
  }
}

const fallbackLeaders: LeaderProfile[] = [
  {
    id: '1',
    name: 'Mr. Rakesh Mia',
    designation: 'Forensic Science Expert',
    bio: 'Specialized in analytical forensics, evidence interpretation, and academic mentoring.',
    initials: 'RM',
  },
  {
    id: '2',
    name: 'Mr. Vijay',
    designation: 'Investigation Specialist',
    bio: 'Focused on practical case workflows, documentation standards, and lab methodology.',
    initials: 'VJ',
  },
]

const fallbackCommittee: LeaderProfile[] = [
  { id: 'c1', name: 'Dr. Sharma', designation: 'Forensic Pathologist', initials: 'DS' },
  { id: 'c2', name: 'Dr. Patel', designation: 'Toxicologist', initials: 'DP' },
  { id: 'c3', name: 'Dr. Khan', designation: 'Digital Forensics', initials: 'DK' },
  { id: 'c4', name: 'Dr. Mehta', designation: 'Document Expert', initials: 'DM' },
  { id: 'c5', name: 'Dr. Singh', designation: 'Ballistics Expert', initials: 'DS' },
]

export default async function AboutPage() {
  const payload = await getPayloadClient()

  const [homePage, scientists, impactStats] = await Promise.all([
    payload.findGlobal({ slug: 'homePage', depth: 1 }),
    payload.find({
      collection: 'scientists',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 12,
      depth: 1,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'impactStats',
      where: { published: { equals: true } },
      sort: 'order',
      limit: 5,
      depth: 0,
      overrideAccess: false,
    }),
  ])

  const home = homePage as HomePage
  const sectionText = home?.sectionText ?? {}
  const heroImage = resolveMediaUrl(
    (home?.hero as { heroImage?: number | Media | null })?.heroImage,
    ABOUT_IMAGES.hero,
  )

  const allLeaders =
    scientists.docs.length > 0
      ? (scientists.docs as Scientist[]).map((s, i) => toLeader(s, i))
      : [...fallbackLeaders, ...fallbackCommittee]

  const featuredLeaders = allLeaders.slice(0, Math.max(2, Math.min(4, allLeaders.length)))
  const committee =
    allLeaders.length > 2 ? allLeaders.slice(2, 7) : fallbackCommittee

  const achievements: AchievementStat[] =
    impactStats.docs.length > 0
      ? (impactStats.docs as ImpactStat[]).map((stat, i) => {
          const parsed = parseStatValue(stat.value ?? '0')
          const tones: AchievementStat['tone'][] = ['blue', 'purple', 'orange', 'green', 'red']
          return {
            ...parsed,
            label: stat.label ?? 'Stat',
            tone: toneMap[stat.tone ?? ''] ?? tones[i % tones.length],
          }
        })
      : defaultAchievements

  return (
    <AboutPageView
      sectionText={sectionText}
      featuredLeaders={featuredLeaders.length >= 2 ? featuredLeaders : fallbackLeaders}
      committee={committee}
      achievements={achievements}
      certifications={defaultCertifications}
      uniqueItems={defaultUnique}
      activityItems={defaultActivities}
      heroImage={heroImage}
    />
  )
}
