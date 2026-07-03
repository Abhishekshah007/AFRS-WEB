import { AboutPageView } from '@/components/about/AboutPageView'
import { ABOUT_IMAGES } from '@/components/about/tokens'
import type { AchievementStat, CertificationItem, LeaderProfile } from '@/components/about/types'
import type { AboutSectionText } from '@/components/about/types'
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
  {
    icon: '🔬',
    title: 'AFPS Team',
    description: 'Applied Forensic Professional Standards aligned training and assessment.',
  },
  {
    icon: '📋',
    title: 'ISO Protocols',
    description: 'Laboratory workflows following international quality management principles.',
  },
  {
    icon: '🏛',
    title: 'Academic MoUs',
    description: 'Partnerships with universities for research and internship programmes.',
  },
  {
    icon: '⚖️',
    title: 'Legal Expert Panel',
    description: 'Court-qualified experts for testimony and case consultancy.',
  },
]

const defaultUnique = [
  {
    text: 'Research-led curriculum mapped to real case workflows',
    description: 'Training aligned with investigation, evidence handling, and reporting standards.',
  },
  {
    text: 'ISO-minded laboratory practices and chain-of-custody focus',
    description: 'Quality processes that support credible and defensible forensic outcomes.',
  },
  {
    text: 'Hybrid learning — online theory with offline practicals',
    description: 'Flexible delivery without compromising hands-on forensic competency.',
  },
  {
    text: 'Mentorship from practicing forensic scientists',
    description: 'Guidance from professionals actively engaged in casework and research.',
  },
  {
    text: 'Nationwide network of students and professionals',
    description: 'A growing community connecting learners, experts, and institutions.',
  },
]

const defaultActivities = [
  {
    text: 'Certificate programmes and short-term forensic courses',
    description: 'Structured learning pathways for students and working professionals.',
  },
  {
    text: 'Crime scene and laboratory internship placements',
    description: 'Practical exposure under supervision in real forensic environments.',
  },
  {
    text: 'Forensic consultancy for agencies and legal teams',
    description: 'Expert support for investigations, examinations, and case strategy.',
  },
  {
    text: 'Workshops, webinars, and national conferences',
    description: 'Regular platforms for knowledge exchange and professional networking.',
  },
  {
    text: 'Published research and collaborative investigations',
    description: 'Contributions to forensic science through applied research and publications.',
  },
]

const defaultAchievements: AchievementStat[] = [
  { value: '500+', label: 'Members', tone: 'blue', numericEnd: 500, suffix: '+' },
  { value: '400+', label: 'Students', tone: 'purple', numericEnd: 400, suffix: '+' },
  { value: '95+', label: 'Events', tone: 'orange', numericEnd: 95, suffix: '+' },
  { value: '1', label: 'National Network', tone: 'green', numericEnd: 1, suffix: '' },
  { value: '1000+', label: 'Followers', tone: 'red', numericEnd: 1000, suffix: '+' },
]

const defaultSectionText: AboutSectionText = {
  aboutHeading: 'About AFRS',
  aboutDescription1:
    'Applied Forensic Research Sciences (AFRS) is a multidisciplinary organization dedicated to advancing forensic science through education, research, training, and professional development. Recognized by MSME, NITI Aayog, and ISO 9001:2015 certified, AFRS fosters innovation, collaboration, and knowledge exchange in the forensic community.',
  aboutDescription2:
    'AFRS engages with a diverse range of domains — including traditional forensic sciences, digital forensics, forensic medicine, psychology, criminology and legal studies. Our objective is to empower individuals through quality education, promote a culture of scientific inquiry and nurture a community grounded in integrity, objectivity and academic excellence. We emphasize accessible, inclusive and practical-oriented learning, enabling learners to understand real-world forensic challenges with clarity and competence.',
  founderMessage:
    'At AFRS, we believe that forensic science is far more than a scientific discipline — it is a cornerstone of truth, justice, and public confidence. The rapidly evolving nature of crime, technology, and legal systems demands continuous innovation, professional competence, and scientific excellence. AFRS was established to address this need by creating a platform that integrates research, education, professional development, and collaborative engagement. Our vision extends beyond conventional learning. We aspire to build a community that inspires critical thinking, scientific inquiry, ethical responsibility, and professional leadership. Through our initiatives, we aim to contribute meaningfully to the advancement of forensic science while empowering individuals and institutions to achieve excellence in their respective fields. We invite professionals, researchers, students, and organizations worldwide to join us in shaping the future of forensic science.',
  visionBody:
    'At Applied Forensic Research Sciences (AFRS), our vision is to be a trusted, credible and inspiring leader in the field of forensic education and research—one that enables individuals to achieve both their immediate learning objectives and long-term professional aspirations. We are committed to providing high-quality academic resources, hands-on training, expert consultancy and accessible learning opportunities that create meaningful and lasting impact.',
  missionBody:
    'At Applied Forensic Research Sciences (AFRS), our mission is to empower individuals with a comprehensive and practical understanding of forensic science while increasing meaningful awareness of the diverse and continuously evolving nature of crime globally. We are dedicated to bridging the gap between education, research and real-world practice by fostering a collaborative platform where students, professionals, academicians, industries and other stakeholders can engage, share knowledge, and contribute to the advancement of forensic science and justice.',
  purposeBody:
    'As India’s first registered student-centered organization dedicated exclusively to Forensic Science, Applied Forensic Research Sciences (AFRS) was established with the vision of building a vibrant, inclusive, and dynamic learning ecosystem for students and professionals in the field. Our purpose is to create meaningful pathways for academic growth, practical exposure and professional development.',
  expertiseItems: [
    'Digital & Cyber Forensics',
    'Audio and Video Forensics',
    'Questioned Document Examination',
    'Handwriting & Signature Analysis',
    'Fingerprint Examination',
    'Crime Scene Investigation',
    'Forensic Photography & Imaging',
    'Research Methodology',
    'Expert Witness Services',
    'Forensic Consultation & Advisory Services',
    'Capacity Building & Professional Training',
  ],
  whyChooseItems: [
    'Student-centric and affordable learning opportunities',
    'Exposure to multidisciplinary areas of forensic science',
    'Guidance from experienced academicians and professionals',
    'Focus on practical understanding through case discussions and interactive sessions',
    'Opportunities for academic networking and collaborative learning',
    'Encouragement for research and scientific writing',
    'Commitment to ethical and evidence-based practices',
    'Regular educational activities aimed at skill development and professional growth',
  ],
  qualityEthicsItems: [
    'Upholding academic integrity and ethical conduct',
    'Promoting evidence-based and scientifically sound practices',
    'Maintaining professionalism, transparency, and accountability',
    'Ensuring quality and relevance in educational activities',
    'Encouraging responsible research and publication practices',
    'Respecting confidentiality and privacy where applicable',
    'Fostering an inclusive and collaborative learning environment',
    'Pursuing continuous improvement through feedback and innovation',
    'Delivering programs with integrity, credibility, and professional responsibility',
  ],
  researchItems: [
    'Research awareness and scientific inquiry among students and professionals. ',

    'Scientific writing and publication-related guidance.',
    'Review articles, case-based discussions, and academic communication. ',
    'Exposure to emerging technologies and contemporary developments in forensic science. ',
    'Interdisciplinary interaction and collaborative learning opportunities. ',
    'Knowledge dissemination through webinars, workshops, conferences and educational resources. ',
    'Critical thinking and evidence-based approaches to problem-solving. ',
    'Development of research skills and academic competencies. ',
    'Encouragement of ethical and responsible research practices. ',
    'Exchange of ideas among researchers, academicians, and forensic professionals',
  ],
  partnershipItems: [
    'Universities and academic institutions',
    'Research organizations',
    'Government bodies',
    'Professional associations',
    'Industry stakeholders',
    'International collaborators',
  ],
  futureRoadmapItems: [
    'Establishment of advanced research initiatives',
    'Expansion of national and international collaborations',
    'Development of specialized professional certification programmes',
    'Promotion of interdisciplinary scientific research',
    'Strengthening forensic capacity-building initiatives',
    'Advancement of technology-driven forensic solutions',
  ],
  membershipReasons: [
    'Conduct national/international workshops monthly to grow knowledge and exchange views.',
    'Run research/review paper competitions, workshops, and publication support for UGC & ISBN resources.',
    'Enable members to organize events, seminars, and courses under their own name with certificates and expert signatures.',
    'Offer career guidance, counselling, and college recommendations tailored to individual interests.',
    'Provide expert mentorship from professors, laboratory scientists, and advisory committee members.',
  ],
}

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
    designation: 'Founder, AFRS',
    bio: 'Specialized in analytical forensics, evidence interpretation, and academic mentoring.',
    initials: 'RM',
  },
  {
    id: '2',
    name: 'Mr. Vijay',
    designation: 'Co-Founder, AFRS',
    bio: 'Focused on practical case workflows, documentation standards, and lab methodology.',
    initials: 'VJ',
  },
]

const fallbackCommittee: LeaderProfile[] = [
  {
    id: 'megha-jain',
    name: 'Ms. Megha Jain',
    designation: 'Secretary',
    initials: 'MJ',
    photoUrl:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1763141455/xpvpfqfee6ppp875xdd5.jpg',
    bio: 'Managing administrative excellence and organizational correspondence.',
  },

  {
    id: 'shrutika-sagnal',
    name: 'Dr. Shrutika Singla',
    designation: 'Joint Secretary',
    initials: 'SS',
    photoUrl:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1762258621/WhatsApp_Image_2025-11-04_at_12.37.51_AM_h1kedk.jpg',
    bio: 'Supporting operations and coordinating departmental activities.',
  },
  {
    id: 'abhishek-shah',
    name: 'Mr. Abhishek Shah',
    designation: 'Treasurer',
    initials: 'AS',
    photoUrl:
      'https://res.cloudinary.com/drrzakkgo/image/upload/v1762611909/b9xixjf0rlnquhherrh5.jpg',
    bio: 'Overseeing financial health and resource allocation for projects.',
  },
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
  const sectionText = {
    ...defaultSectionText,
    ...(home?.sectionText ?? {}),
  }
  const heroImage = resolveMediaUrl(
    (home?.hero as { heroImage?: number | Media | null })?.heroImage,
    ABOUT_IMAGES.hero,
  )

  const allLeaders =
    scientists.docs.length > 0
      ? (scientists.docs as Scientist[]).map((s, i) => toLeader(s, i))
      : [...fallbackLeaders, ...fallbackCommittee]

  const featuredLeaders = allLeaders.slice(0, Math.max(2, Math.min(4, allLeaders.length)))
  const committee = allLeaders.length > 2 ? allLeaders.slice(2, 7) : fallbackCommittee

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
      expertiseItems={sectionText.expertiseItems ?? []}
      whyChooseItems={sectionText.whyChooseItems ?? []}
      qualityEthicsItems={sectionText.qualityEthicsItems ?? []}
      researchItems={sectionText.researchItems ?? []}
      partnershipItems={sectionText.partnershipItems ?? []}
      futureRoadmapItems={sectionText.futureRoadmapItems ?? []}
      membershipReasons={sectionText.membershipReasons ?? []}
      heroImage={heroImage}
    />
  )
}
