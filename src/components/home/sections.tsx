import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { formatEventDate, formatEventType, resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import AFRSLogo from '../../../public/assets/afsl-logo.png'
import type {
  Event as AfrsEvent,
  GalleryItem,
  HomePage,
  ImpactStat,
  Media,
  Scientist,
  Service,
  Testimonial,
} from '@/payload-types'
import {
  BrainCircuit,
  BriefcaseBusiness,
  Microscope,
  Network,
  FileSearch,
  BadgeCheck,
  LibraryBig,
  Rss,
  Landmark,
  GraduationCap,
  Briefcase,
  Search,
  FlaskConical,
  ShieldCheck,
  Binoculars,
} from 'lucide-react'
import type { PaginatedDocs } from 'payload'
import { TYPOGRAPHY, UI } from './design'

/* ─── shared assets & layout ─── */
export const heroPanelImage =
  'https://res.cloudinary.com/drrzakkgo/image/upload/v1781617023/WhatsApp_Image_2026-06-16_at_6.35.45_PM_jfmudj.jpg'
export const eventCardImages = [
  'https://www.appliedforensicresearchsciences.in/static/media/carousel-10.6bcf7e5d176fb7d57b28.jpeg',
  'https://www.appliedforensicresearchsciences.in/static/media/carousel-6.37510e2cbc3800979dc5.jpeg',
  'https://www.appliedforensicresearchsciences.in/static/media/carousel-7.526a8153933073ab1327.jpeg',
]
export const aboutImage =
  'https://www.appliedforensicresearchsciences.in/static/media/carousel-9.49c91d30b5585ee2a892.jpeg'
export const galleryImages = [
  'https://res.cloudinary.com/drrzakkgo/image/upload/v1777273424/WhatsApp_Image_2026-04-15_at_11.53.12_PM_u2uvdf.jpg',
  'https://res.cloudinary.com/drrzakkgo/image/upload/v1777273424/WhatsApp_Image_2026-04-15_at_11.54.13_PM_gzfbix.jpg',
  'https://res.cloudinary.com/drrzakkgo/image/upload/v1777658711/d8sz7npdnmpz7pqeb78v.jpg',
  'https://www.figma.com/api/mcp/asset/e7944166-77e9-4951-b26b-6b9f94d7b9a2',
]

const CONTAINER = UI.container
const SECTION = UI.section

type SectionText = NonNullable<HomePage['sectionText']>
type HeroData = NonNullable<HomePage['hero']>

import { SectionHeader } from '@/components/ui/SectionHeader'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { ForensicBackground } from './ForensicBackground'
import { VisitorCounterBar } from '../student-hub/VisitorCounterBar'

const defaultImpactStats = [
  {
    value: '4000+',
    label: 'Students Trained',
    tone: 'blue',
    description: 'Hands-on forensic education across India.',
  },
  {
    value: '250+',
    label: 'Case Consultations',
    tone: 'red',
    description: 'Expert support for investigations and reporting.',
  },
  {
    value: '06+',
    label: 'Book Published',
    tone: 'orange',
    description: 'From crime scene to digital forensics.',
  },
  {
    value: '150+',
    label: 'Research Papers',
    tone: 'emerald',
    description: 'Collaboration with institutions nationwide.',
  },
  {
    value: '350+',
    label: 'Expert Sessions',
    tone: 'orange',
    description: 'Regular training and certification programs.',
  },
]

const fallbackScientists: Pick<Scientist, 'name' | 'designation' | 'bio'>[] = [
  {
    name: 'Mr. Rakesh Mia',
    designation: 'Forensic Science Expert',
    bio: 'Specialized in analytical forensics, evidence interpretation, and academic mentoring.',
  },
  {
    name: 'Mr. Vijay',
    designation: 'Investigation Specialist',
    bio: 'Focused on practical case workflows, documentation standards, and lab methodology.',
  },
]

const serviceIcons = [
  { label: 'Forensic Investigation', color: 'bg-indigo-100 text-indigo-600', accent: '#6366f1' },
  { label: 'Fingerprint Analysis', color: 'bg-blue-100 text-blue-600', accent: '#3b82f6' },
  { label: 'Questioned Documents', color: 'bg-violet-100 text-violet-600', accent: '#8b5cf6' },
  { label: 'Cyber Forensics', color: 'bg-cyan-100 text-cyan-700', accent: '#06b6d4' },
  { label: 'DNA Profiling', color: 'bg-emerald-100 text-emerald-600', accent: '#10b981' },
  { label: 'Forensic Training', color: 'bg-orange-100 text-orange-600', accent: '#f97316' },
]

/* ─── 1. Hero ─── */
export function HeroSection({ heroData }: { heroData: HeroData }) {
  const heroImageSrc = resolveMediaUrl(
    (heroData as HeroData & { heroImage?: number | Media | null })?.heroImage,
    heroPanelImage,
  )

  return (
    <section
      className="relative overflow-hidden text-white pt-16 pb-20 lg:pt-20 lg:pb-24 forensic-grid"
      style={{ background: UI.heroGradient }}
    >
      <ForensicBackground />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-white rounded-t-[2rem]" />
      <div className={`${CONTAINER} relative grid gap-10 lg:grid-cols-2 lg:gap-16 items-center`}>
        <div className="reveal-up">
          <h1 className={UI.titleLarge}>
            {heroData.title || 'Where Evidence Speaks. Science Answers.'}
          </h1>
          <p className={`mt-6 ${TYPOGRAPHY.bodyLarge} text-white/85 max-w-xl`}>
            {heroData.description ||
              "India's premier hub for forensic education, research & professional services"}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={heroData.primaryCTAUrl || '/courses'}
              className="inline-flex h-12 items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 px-8 text-sm font-bold shadow-lg shadow-black/20 transition"
            >
              {heroData.primaryCTALabel || 'Explore Now'}
            </Link>
            <Link
              href={heroData.secondaryCTAUrl || '/contact'}
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-white bg-white/95 text-slate-900 hover:bg-white px-8 text-sm font-bold transition"
            >
              {heroData.secondaryCTALabel || 'Contact Now'}
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/90">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Accredited Programs
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Expert Professionals
            </span>
          </div>
        </div>
        <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto reveal-up">
          <div className="rounded-[2.5rem] border border-white/25 bg-white/10 p-4 shadow-2xl backdrop-blur-sm">
            <div className="relative h-[280px] sm:h-[380px] lg:h-[420px] rounded-[2rem] overflow-hidden">
              <Image
                src={heroImageSrc}
                alt="AFRS facility"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function AFRSFeatureCards({
  sectionText,
  events,
}: {
  sectionText: SectionText
  events: PaginatedDocs<AfrsEvent>
}) {
  const items = [
    {
      icon: GraduationCap,
      label: 'Professional Training Programs',
      href: '/courses',
      description:
        'Structured forensic science courses designed for students and professionals seeking practical skills and certification.',
    },
    {
      icon: Briefcase,
      label: 'Internship Opportunities',
      href: '/courses',
      description:
        'Hands-on forensic internships providing real-world experience in laboratory and field settings under expert mentorship.',
    },
    {
      icon: Binoculars,
      label: 'Research Projects',
      href: '/courses',
      description:
        'Engage in cutting-edge forensic research initiatives that contribute to the advancement of the field.',
    },
    {
      icon: Search,
      label: 'Case Consultation',
      href: '/services',
      description:
        'Professional forensic consultation for complex investigations and evidence analysis.',
    },
    {
      icon: FlaskConical,
      label: 'Lab Services',
      href: '/services',
      description: 'Full-spectrum forensic laboratory analysis with certified expert reports.',
    },
    {
      icon: ShieldCheck,
      label: 'Certification',
      href: '/courses',
      description: 'Industry-recognized certifications for forensic professionals and researchers.',
    },
  ]
  return (
    <section
      className={`${SECTION} section-aura-services section-glow-top relative overflow-hidden`}
    >
      <div className={`${CONTAINER} relative z-10`}>
        <SectionHeader
          title={sectionText.featuredCardsHeading || 'Our Key Services & Programs'}
          subtitle={
            sectionText.servicesDescription ||
            'Comprehensive forensic solutions tailored for academic growth and professional expertise.'
          }
        />
        <AnimateOnScroll stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const iconStyle = serviceIcons[index % serviceIcons.length]

            return (
              <Link
                key={item.label}
                href={item.href}
                className="elevated-card card-pop group block rounded-2xl p-6"
                style={{ '--card-accent': iconStyle.accent } as CSSProperties}
              >
                <div>
                  <div
                    className={`inline-flex items-center justify-center rounded-xl px-3 py-2.5 shadow-sm ${iconStyle.color}`}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900 leading-snug group-hover:text-indigo-700 transition-colors">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </Link>
            )
          })}
        </AnimateOnScroll>
      </div>
      <div className="pointer-events-none absolute -bottom-10 -left-8 opacity-[0.035] text-indigo-900">
        <svg width="220" height="220" viewBox="0 0 260 260" fill="none" aria-hidden>
          <circle cx="130" cy="130" r="20" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="45" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="70" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="95" stroke="currentColor" strokeWidth="10" />
        </svg>
      </div>
    </section>
  )
}

//
export function ForensicTrainingProgram() {
  const trainingPrograms = [
    {
      icon: '🎯',
      title: 'Crime Scene Investigation Training',
      accent: '#6366f1',
    },
    {
      icon: '🌀',
      title: 'Fingerprint Examination Course',
      accent: '#3b82f6',
    },
    {
      icon: '🧬',
      title: 'Forensic Biology & Serology Training',
      accent: '#10b981',
    },
    {
      icon: '📄',
      title: 'Questioned Document Examination',
      accent: '#8b5cf6',
    },
    {
      icon: '💻',
      title: 'Multimedia & Digital Forensics',
      accent: '#06b6d4',
    },
  ]
  return (
    <section
      className={`${SECTION} section-aura-training section-glow-top relative overflow-hidden`}
    >
      <div className={`${CONTAINER} relative z-10`}>
        <SectionHeader
          eyebrow="Specialized Courses"
          title="Forensic Training Programs"
          subtitle="Specialized certification courses for future forensic professionals"
        />

        <AnimateOnScroll stagger className="grid gap-5 md:grid-cols-3">
          {trainingPrograms.slice(0, 3).map((program) => (
            <div
              key={program.title}
              className="training-card card-pop flex items-center gap-4 rounded-2xl p-5"
              style={{ '--card-accent': program.accent } as CSSProperties}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm ring-1 ring-slate-100">
                {program.icon}
              </div>

              <h3 className={`${TYPOGRAPHY.small} font-semibold text-slate-900 leading-snug`}>
                {program.title}
              </h3>
            </div>
          ))}
        </AnimateOnScroll>

        <AnimateOnScroll stagger className="mt-5 grid gap-5 md:grid-cols-3">
          {trainingPrograms.slice(3, 5).map((program) => (
            <div
              key={program.title}
              className="training-card card-pop flex items-center gap-4 rounded-2xl p-5"
              style={{ '--card-accent': program.accent } as CSSProperties}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm ring-1 ring-slate-100">
                {program.icon}
              </div>

              <h3 className={`${TYPOGRAPHY.small} font-semibold text-slate-900 leading-snug`}>
                {program.title}
              </h3>
            </div>
          ))}

          <div className="flex items-center justify-center">
            <Link
              href="/courses"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-8 text-sm font-semibold text-white shadow-[0_12px_28px_-8px_rgba(79,70,229,0.45)] hover:shadow-[0_16px_36px_-8px_rgba(79,70,229,0.55)] transition"
            >
              View All Programs
              <span aria-hidden>→</span>
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
      <img
        src="/assets/svg/chemistry-burner.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-6 top-1/2 h-44 w-44 -translate-y-1/2 opacity-[0.06]"
      />
    </section>
  )
}

/* ─── 4. Services (circular icon grid) ─── */
export function ServicesSection({
  sectionText,
  services,
}: {
  sectionText: SectionText
  services: PaginatedDocs<Service>
}) {
  const items =
    services.docs.length > 0
      ? services.docs.map((s, i) => ({
          label: s.title,
          href: `/services/${s.slug}`,
          color: serviceIcons[i % serviceIcons.length].color,
        }))
      : serviceIcons.map((s) => ({ label: s.label, href: '/services', color: s.color }))

  return (
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <SectionHeader
          title={sectionText.servicesHeading || 'Our Key Services & Programs'}
          subtitle={
            sectionText.servicesDescription ||
            'Comprehensive forensic solutions tailored for academic growth and professional expertise.'
          }
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center text-center card-pop"
            >
              <div
                className={`h-20 w-20 sm:h-24 sm:w-24 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm ${item.color} group-hover:scale-105 transition-transform`}
              >
                ◈
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 5. Events ─── */
export function EventsSection({
  sectionText,
  events,
}: {
  sectionText: SectionText
  events: PaginatedDocs<AfrsEvent>
}) {
  const buttonColors = [
    'bg-indigo-600 hover:bg-indigo-700',
    'bg-violet-700 hover:bg-violet-800',
    'bg-orange-500 hover:bg-orange-600',
  ]
  const badgeColors = ['bg-indigo-500', 'bg-violet-600', 'bg-orange-500']

  return (
    <section className={`${SECTION} bg-white section-glow-top`}>
      <div className={CONTAINER}>
        <SectionHeader
          title={sectionText.eventsHeading || 'Upcoming Events'}
          subtitle={
            sectionText.eventsDescription ||
            'Join our forensic science training programs and workshops'
          }
        />
        <AnimateOnScroll stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.docs.length === 0 && (
            <p className="md:col-span-3 text-center text-slate-400 py-8">
              No upcoming events — add them in the CMS.
            </p>
          )}
          {events.docs.map((afrsEvent, index) => {
            const image = resolveMediaUrl(
              afrsEvent.banner,
              eventCardImages[index % eventCardImages.length],
            )
            const summary =
              afrsEvent.excerpt ||
              richTextToPlain(afrsEvent.description, 95) ||
              'Join our focused forensic learning event designed for practical skill development.'

            return (
              <article key={afrsEvent.id} className={`${UI.card} overflow-hidden card-pop`}>
                <div className="relative h-48 bg-slate-100">
                  <Image
                    src={image}
                    alt={`${afrsEvent.title} cover`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div
                    className={`h-10 w-10 rounded-lg ${badgeColors[index % badgeColors.length]} text-white flex items-center justify-center text-sm`}
                  >
                    <span className="sr-only">{afrsEvent.eventNature}</span>
                  </div>
                  <h3 className={`mt-4 ${TYPOGRAPHY.cardTitle} text-slate-900`}>
                    {afrsEvent.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500">
                    {formatEventDate(afrsEvent.startDate)}
                    {afrsEvent.venue ? ` • ${afrsEvent.venue}` : ''}
                  </p>
                  {afrsEvent.eventType && (
                    <p className="mt-1 text-xs text-slate-400">
                      {formatEventType(afrsEvent.eventType)}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{summary}</p>
                  <Link
                    href={`/events/${afrsEvent.slug}`}
                    className={`mt-6 block text-center text-white py-2.5 rounded-lg text-sm font-bold transition ${buttonColors[index % buttonColors.length]}`}
                  >
                    {afrsEvent.registrationOpen === false ? 'View Details' : 'Register Now'}
                  </Link>
                </div>
              </article>
            )
          })}
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ─── 6. About ─── */
export function AboutSection({ sectionText }: { sectionText: SectionText }) {
  return (
    <section className={`${SECTION} ${UI.sectionSurface} section-glow-top`}>
      <div className={`${CONTAINER} grid gap-12 lg:grid-cols-2 items-center`}>
        <AnimateOnScroll direction="left">
          <SectionHeader
            align="left"
            accent={false}
            className="mb-0 max-w-none mx-0"
            title={sectionText.aboutHeading || 'About AFRS'}
          />
          <p className={`mt-6 ${UI.body}`}>
            {sectionText.aboutDescription1 ||
              'Applied Forensic Research Sciences (AFRS) is a dedicated platform committed to advancing education, research and professional development in the field of Forensic Science. Registered under the Madhya Pradesh Society Registration Act 1973, Ministry of Micro, Small & Medium Enterprises (MSME), NITI Aayog and accredited with ISO 9001:2015, Government of India, AFRS functions as a multidisciplinary organization focused on fostering collaboration, innovation and knowledge exchange.'}
          </p>
          <p className={`mt-4 ${UI.body}`}>
            {sectionText.aboutDescription2 ||
              'We bridge the gap between academic theory and practical application, providing students and professionals with the tools they need to excel in forensic investigation.'}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white px-8 text-sm font-bold transition"
          >
            Read More
          </Link>
        </AnimateOnScroll>
        <AnimateOnScroll direction="right">
          <div className="relative">
            <div className="rounded-[2rem] border-[10px] border-white shadow-2xl overflow-hidden">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={aboutImage}
                  alt="AFRS laboratory"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -right-2 -bottom-2 sm:-right-4 sm:-bottom-4 rounded-2xl bg-indigo-600 text-white px-5 py-4 shadow-xl">
              <p className="text-3xl font-extrabold leading-none">10+</p>
              <p className={`mt-1 ${TYPOGRAPHY.label} text-white/90`}>Years of Experience</p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

//
export function InternshipProgramSection() {
  const internshipFeatures = [
    'Crime Scene Investigation Training',
    'Advanced Fingerprint Analysis',
    'Digital Forensics & Data Recovery',
    'Document & Handwriting Analysis',
  ]
  return (
    <section className={`${SECTION} ${UI.sectionSurface} section-glow-top`}>
      <div className={CONTAINER}>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_460px] lg:gap-16">
          <AnimateOnScroll direction="left">
            <div className="max-w-[560px]">
              <SectionHeader
                align="left"
                accent={false}
                eyebrow="Career Catalyst"
                className="mb-0 max-w-none mx-0"
                title="Forensic Science Internship Program in India"
                subtitle="Join our highly structured internship programs designed to provide genuine practical exposure. Gain first-hand experience in professional laboratory settings and field investigations under the supervision of senior scientists."
              />

              <div className="mt-10 grid gap-y-7 gap-x-10 sm:grid-cols-2">
                {internshipFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-4">
                    <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[10px] bg-[#DDF7E7]">
                      <BadgeCheck className="h-[18px] w-[18px] text-[#10B981]" strokeWidth={2.2} />
                    </div>

                    <p className={`${TYPOGRAPHY.body} font-semibold text-slate-700`}>{feature}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link
                  href="/courses"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#F97316] px-8 text-sm font-bold text-white shadow-[0_20px_35px_rgba(249,115,22,0.28)] transition hover:bg-[#EA580C]"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right">
            <div className="relative">
              <div className="overflow-hidden rounded-[24px] border-[10px] border-white bg-white shadow-[0_32px_60px_rgba(15,23,42,0.18)]">
                <div className="relative aspect-[1/1] w-full">
                  <Image
                    src="https://res.cloudinary.com/drrzakkgo/image/upload/v1781617023/WhatsApp_Image_2026-06-16_at_6.35.45_PM_jfmudj.jpg"
                    alt="Forensic Internship Program"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}

/* ─── 7. Impact ─── */
export function ImpactSection({ impactStats }: { impactStats: PaginatedDocs<ImpactStat> }) {
  const items = impactStats.docs.length ? impactStats.docs : defaultImpactStats

  const cardColors = [
    'bg-[#4F86E8]', // blue
    'bg-[#EF4444]', // red
    'bg-[#F97316]', // orange
    'bg-[#10B981]', // emerald (green)
    'bg-[#F97316]', // orange
  ]

  return (
    <section className={`${SECTION} ${UI.sectionSurface} section-glow-top`}>
      <div className={CONTAINER}>
        <SectionHeader
          title="Our Achievements"
          subtitle="Making a difference in forensic science education"
        />

        <AnimateOnScroll stagger className="grid gap-4 md:grid-cols-5">
          {items.map((item, index) => (
            <div
              key={item.label}
              className={`
                ${cardColors[index]}
                h-[110px]
                rounded-[16px]
                shadow-[0_8px_20px_rgba(15,23,42,0.08)]
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-4
              `}
            >
              <div className="text-3xl sm:text-4xl leading-none font-extrabold text-white">
                {item.value}
              </div>

              <div className={`mt-2 ${TYPOGRAPHY.label} text-white/95`}>{item.label}</div>
            </div>
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ─── 8. Future of forensics ─── */
export function FutureSection() {
  return (
    <section className={`${SECTION} ${UI.sectionSurface} section-glow-top`}>
      <div className={`${CONTAINER} grid gap-10 lg:grid-cols-2 items-center`}>
        <AnimateOnScroll direction="left">
          <div className="relative rounded-3xl overflow-hidden bg-slate-200 aspect-[16/10] lg:min-h-[320px] card-pop">
            <Image
              src={aboutImage}
              alt="Future of forensics"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-slate-900/25" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                aria-label="Play introduction video"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/95 text-indigo-700 text-xl font-bold shadow-xl hover:scale-105 transition"
              >
                ►
              </button>
            </div>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll direction="right">
          <div>
            <SectionHeader
              align="left"
              accent={false}
              className="mb-0 max-w-none mx-0"
              title="Exploring the Future of Forensics"
            />
            <p className={`mt-5 ${UI.body}`}>
              Explore our latest research breakthroughs and educational highlights. At AFRS, we use
              state-of-the-art technology to solve complex problems and train the next generation of
              forensic experts.
            </p>
            <p className={`mt-3 ${UI.body}`}>
              Watch our introductory video to learn more about our mission and the impact we make
              globally.
            </p>
            <Link
              href="/courses"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-violet-600 hover:bg-violet-700 px-6 text-white text-sm font-bold transition"
            >
              Explore Our Courses
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ─── 9. Achievements ─── */
export function AchievementsSection() {
  const items = [
    {
      title: 'Skill Development',
      description:
        'Gain hands-on expertise in methodologies like DNA profiling and digital forensics.',
      icon: BrainCircuit,
      bg: 'bg-violet-100',
      iconColor: 'text-violet-600',
    },
    {
      title: 'Career Guidance',
      description: 'Personalized mentorship to navigate career paths in private and govt sectors.',
      icon: BriefcaseBusiness,
      bg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Practical Exposure',
      description: 'Bridge theory with access to state-of-the-art laboratory tools and methods.',
      icon: Microscope,
      bg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Mentorship & Networking',
      description: 'Connect with a global community of forensic experts and researchers.',
      icon: Network,
      bg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Real-World Case Studies',
      description: 'Learn from actual forensic cases to understand complex problem-solving.',
      icon: FileSearch,
      bg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Recognition',
      description: 'Earn industry-recognized certifications.',
      icon: BadgeCheck,
      bg: 'bg-pink-100',
      iconColor: 'text-pink-600',
    },
  ]

  return (
    <section
      className={`${SECTION} ${UI.sectionSurface} section-glow-top relative overflow-hidden`}
    >
      <div className={CONTAINER}>
        <SectionHeader
          title="The AFRS Impact"
          subtitle="Our holistic approach ensures every student and professional gains more than just knowledge."
        />
        <AnimateOnScroll
          stagger
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.title} className={`${UI.cardInteractive} p-8 card-pop`}>
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
                >
                  <Icon className={`h-7 w-7 ${item.iconColor}`} />
                </div>

                <h3 className={`mt-7 ${TYPOGRAPHY.cardTitle} text-slate-900`}>{item.title}</h3>

                <p className={`mt-5 ${UI.body} text-slate-500`}>{item.description}</p>
              </div>
            )
          })}
        </AnimateOnScroll>
      </div>

      {/* Decorative fingerprint */}
      <div className="pointer-events-none absolute bottom-0 right-0 opacity-[0.04]">
        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="130" cy="130" r="20" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="45" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="70" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="95" stroke="currentColor" strokeWidth="10" />
        </svg>
      </div>
    </section>
  )
}

/* ─── 10. AFSL SECTION ─── */

export function ProgramCtaSection() {
  return (
    <div className="rounded-3xl bg-[#C8D6FC] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 shadow-xl">
      <p className={`${TYPOGRAPHY.label} text-violet-700`}>Get In Touch</p>

      <p className="mt-4 text-sm sm:text-base text-slate-800 max-w-2xl leading-relaxed">
        Need professional forensic assistance, expert opinion, training opportunities, or research
        collaboration? Contact AFSL today and connect with our forensic experts.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-700 px-6 text-sm font-bold text-white transition"
        >
          Contact AFSL
        </Link>

        <Link
          href="/services"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 bg-[#FB923C] hover:bg-[#EA580C] px-6 text-sm font-bold text-white transition gap-2"
        >
          <span aria-hidden>🔬</span>
          Explore Our Services
        </Link>
      </div>
    </div>
  )
}

export function AfslOffers() {
  return (
    <div>
      <div className="rounded-3xl bg-[#C8D6FC] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 shadow-xl">
        {/* Two-column layout */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — text */}

          <div>
            <h2 className="text-slate-900 text-xl sm:text-2xl lg:text-[28px] font-extrabold leading-snug max-w-xl">
              Forensic Science Training, Internship &amp; Research Programs
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-700 max-w-xl leading-relaxed">
              AFSL provides structured internship programs designed to give students practical
              exposure in forensic science disciplines — including crime scene investigation,
              fingerprint analysis, digital forensics, and more.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-700 px-6 text-sm font-bold text-white transition"
              >
                Explore Training Programs
              </Link>

              <Link
                href="/internship"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-400 hover:bg-orange-500 px-6 text-sm font-bold text-white transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Apply for Internship
              </Link>
            </div>
          </div>

          {/* Right — image */}

          <div className="relative w-full h-[260px] sm:h-[300px] rounded-xl overflow-hidden">
            <Image
              src="https://res.cloudinary.com/drrzakkgo/image/upload/v1763210329/ChatGPT_Image_Nov_15_2025_05_30_55_PM_gicx5y.png"
              alt="AFRS forensic training session"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export function TrustedPartnerSection() {
  const cards = [
    { title: 'Crime Scene Investigation & Management', icon: '🕵️' },
    { title: 'Fingerprint Examination & Analysis', icon: '🔍' },
    { title: 'Questioned Document & Signature Analysis', icon: '📄' },
    { title: 'Multimedia & Digital Forensics', icon: '💻' },
    { title: '65B IEA Certificate (63(4)(C) BSA)', icon: '⚖️' },
    { title: 'Forensic Consultancy & Expert Opinion', icon: '📋' },
  ]

  return (
    <section
      className={`relative py-20 text-white overflow-hidden section-glow-top`} // Replaced ${SECTION} assuming standard padding
      style={{ background: UI.afslGradient }} // Ensure UI is imported in your actual file
    >
      {/* Huge Background Watermark for the whole section */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="130" cy="130" r="20" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="45" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="70" stroke="currentColor" strokeWidth="10" />
          <circle cx="130" cy="130" r="95" stroke="currentColor" strokeWidth="10" />
        </svg>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        {' '}
        {/* Replaced ${CONTAINER} for clarity */}
        <div className="mx-auto mb-12 flex justify-center">
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20 shadow-xl inline-block">
            <Image
              src={AFRSLogo} // Ensure AFRSLogo is imported
              alt="AFSL Logo"
              width={200}
              height={60}
              className="mx-auto"
            />
          </div>
        </div>
        <SectionHeader
          light
          title="Applied Forensic Science Laboratory (AFSL)"
          subtitle="Scientific. Reliable. Professional."
        />
        <p className="mx-auto mt-4 mb-14 max-w-3xl text-center text-base sm:text-lg leading-relaxed text-white/80">
          Applied Forensic Science Laboratory (AFSL) is committed to delivering reliable,
          scientific, and evidence-based forensic solutions that support investigations, legal
          proceedings, research, and professional development. Our multidisciplinary team provides
          expert forensic examination, analytical services, consultation, and training across
          various domains of forensic science.
        </p>
        <AnimateOnScroll stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-white/30 hover:shadow-2xl hover:shadow-white/5 min-h-[160px] flex flex-col items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span
                className="text-4xl drop-shadow-md transition-transform duration-300 group-hover:scale-110 mb-4"
                aria-hidden
              >
                {card.icon}
              </span>
              <p className="text-sm sm:text-base font-semibold leading-snug text-white/95 tracking-wide">
                {card.title}
              </p>
            </div>
          ))}
        </AnimateOnScroll>
        <AnimateOnScroll>
          <div className="mt-16 lg:mt-20">
            <AfslOffers />
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <div className="mt-10 lg:mt-12">
            <ProgramCtaSection />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ─── 11. Experts + resources sidebar ─── */
export function ExpertsSection({ scientists }: { scientists: PaginatedDocs<Scientist> }) {
  const experts = scientists.docs.length ? scientists.docs : fallbackScientists

  return (
    <section className={`${SECTION} bg-white section-glow-top`}>
      <div className={`${CONTAINER} grid gap-10 xl:grid-cols-[1fr_340px] items-start`}>
        <div>
          <SectionHeader
            align="left"
            accent={false}
            className="mb-8 max-w-none mx-0"
            title="Our Expert Scientists"
            subtitle="Leading professionals driving forensic innovation and research excellence."
          />
          <AnimateOnScroll stagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {experts.map((expert, index) => {
              const photoUrl =
                'photo' in expert
                  ? resolveMediaUrl(expert.photo as Media | number | null | undefined, '')
                  : ''
              const initial = expert.name?.trim().split(/\s+/).pop()?.[0]?.toUpperCase() || '?'
              const cardKey =
                'id' in expert && expert.id ? String(expert.id) : `${expert.name}-${index}`

              return (
                <div key={cardKey} className={`${UI.cardSmall} p-5 card-pop flex gap-4`}>
                  <div className="h-14 w-14 shrink-0 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-lg font-bold overflow-hidden">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={expert.name}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initial
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{expert.name}</h3>
                    <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                      {expert.designation}
                    </p>
                    {expert.bio && (
                      <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-3">
                        {expert.bio}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </AnimateOnScroll>
        </div>
        <AnimateOnScroll direction="right">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-600 p-8 text-white shadow-lg">
            <h3 className={TYPOGRAPHY.cardTitle}>Case Submission</h3>
            <p className="mt-4 text-sm text-white/85 leading-relaxed">
              Need professional forensic assistance? Our team is ready to help with specialized
              investigation and expert reporting for your specific case requirements.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex w-full h-12 items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 text-sm font-bold transition"
            >
              Enquire Now
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ─── 12. Testimonials ─── */
export function TestimonialsSection({
  testimonials,
}: {
  testimonials: PaginatedDocs<Testimonial>
}) {
  if (!testimonials.docs.length) return null

  return (
    <section className={`${SECTION} bg-white section-glow-top`}>
      <div className={CONTAINER}>
        <SectionHeader
          title="Testimonials"
          subtitle="Voices from students and professionals who trained with AFRS."
        />
        <AnimateOnScroll stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.docs.map((t) => (
            <div key={t.id} className={`${UI.card} p-8 card-pop text-center`}>
              <div className="mx-auto h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold">
                {t.name?.[0]?.toUpperCase() || '?'}
              </div>
              <p className="mt-4 font-bold text-slate-900">{t.name}</p>
              {t.title && <p className="text-xs text-slate-400 mt-1">{t.title}</p>}
              <p className="mt-4 text-sm text-slate-600 leading-relaxed italic">
                &ldquo;{t.testimonial}&rdquo;
              </p>
              <div
                className="mt-4 text-amber-400 text-sm tracking-widest"
                aria-label="5 star rating"
              >
                ★★★★★
              </div>
            </div>
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ─── 13. Partner logos ─── */
export function PartnerLogosSection() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-100">
      <div className={CONTAINER}>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-50">
          {['Partner', 'University', 'Institute', 'Lab', 'Research'].map((name) => (
            <div
              key={name}
              className="h-10 w-28 rounded-lg bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-wider"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 14. Media & resources ─── */
export function MediaResourcesSection() {
  const items = [
    { label: 'Virtual Museum', href: 'https://nfsmuseums.com/s', icon: Landmark },

    {
      label: 'Youtube Channel',
      href: 'https://www.youtube.com/@afrs',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M10.34 15.64L15.27 12L10.34 8.36V15.64ZM21.8 12C21.8 12.78 21.72 13.56 21.56 14.32C21.4 15.08 21.16 15.8 20.84 16.48C20.52 17.16 20.12 17.8 19.64 18.4C19.16 19 18.6 19.56 17.96 20C17.32 20.44 16.62 20.76 15.88 21C15.14 21.24 14.38 21.4 13.62 21.48C12.86 21.56 12.1 21.6 11.34 21.6C10.58 21.6 9.82 21.56 9.08 21.48C8.34 21.4 7.58 21.24 6.84 21C6.1 20.76 5.4 20.44 4.76 20C4.12 19.56 3.56 19,3.08 18.4C2.6 17.8,2,17,1,16C0,15,0,14,1,13C2,12,2,11,3,10C4,9,4,8,5,7C6,6,6,5,7,4C8,3,8,2,9,1C10,0,11,-0,12,-0Z"/></svg>`,
    },
    { label: 'E-Library', href: '/articles', icon: LibraryBig },
    { label: 'Blog', href: 'https://appliedforensicresearchscience.blogspot.com/', icon: Rss },
  ]

  return (
    <section
      className={`${SECTION} text-white section-glow-top`}
      style={{ background: 'linear-gradient(117.28deg, #6366F1 0%, #3B82F6 100%)' }}
    >
      <div className={CONTAINER}>
        <SectionHeader
          light
          title="Quick Links"
          subtitle="Access our resources and stay updated."
        />
        <AnimateOnScroll stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 text-center card-pop hover:bg-white/15 transition min-h-[120px] flex flex-col items-center justify-center gap-3"
            >
              <span className="text-2xl" aria-hidden>
                {typeof item.icon === 'string' ? (
                  <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                ) : (
                  <item.icon className="h-8 w-8" />
                )}
              </span>
              <span className="font-bold text-sm">{item.label}</span>
            </Link>
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ─── 15. Latest news list ─── */
export function LatestNewsSection() {
  const items = [
    {
      title: 'New batch for Digital Forensics certification opens soon',
      date: 'May 2026',
      href: '/articles',
    },
    {
      title: 'AFRS partners with leading universities for internship programs',
      date: 'Apr 2026',
      href: '/articles',
    },
    {
      title: 'Workshop on questioned document examination — registration live',
      date: 'Mar 2026',
      href: '/events',
    },
  ]

  return (
    <section className={`${SECTION} bg-white section-glow-top`}>
      <div className={`${CONTAINER} max-w-3xl`}>
        <SectionHeader
          title="Notice Board"
          subtitle="Stay updated with AFRS announcements and publications."
        />
        <AnimateOnScroll>
          <ul className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
            {items.map((item) => (
              <li
                key={item.title}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 hover:bg-slate-50 transition"
              >
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                </div>
                <Link
                  href={item.href}
                  className="text-sm font-bold text-indigo-600 hover:text-indigo-700 shrink-0"
                >
                  Read More →
                </Link>
              </li>
            ))}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ─── 16. FAQ ─── */
export function FaqSection() {
  const faqs = [
    {
      q: 'Who can apply for the forensic science internship program?',
      a: 'Students and graduates in forensic science, criminology, or related fields may apply through our courses page.',
    },
    {
      q: 'Are AFRS training programs accredited?',
      a: 'Our programs follow industry-standard curricula with certificates issued upon successful completion.',
    },
    {
      q: 'How do I register for upcoming workshops and events?',
      a: 'Browse upcoming events on our website and complete registration through the event detail page.',
    },
  ]

  return (
    <section className={`${SECTION} bg-white section-glow-top`}>
      <div className={`${CONTAINER} max-w-3xl`}>
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Quick answers about programs, registration, and services."
        />
        <AnimateOnScroll stagger className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-slate-100 bg-white overflow-hidden card-pop"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 text-sm font-semibold text-slate-800 list-none">
                {faq.q}
                <span className="shrink-0 h-8 w-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg font-light group-open:rotate-45 transition">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* ─── 17. Community stats banner ─── */
export function CommunityBannerSection({ totalVisitors }: { totalVisitors?: number }) {
  const count = typeof totalVisitors === 'number' ? totalVisitors.toLocaleString('en-IN') : '25,000'

  return <VisitorCounterBar totalVisitors={999} />
}

/* ─── 18. Gallery ─── */
export function GallerySection({ galleryItems }: { galleryItems: PaginatedDocs<GalleryItem> }) {
  const items = galleryItems.docs.length
    ? galleryItems.docs.map((item, index) => ({
        key: String(item.id),
        label: item.label || item.title || 'Gallery',
        image: resolveMediaUrl(item.image, galleryImages[index % galleryImages.length]),
      }))
    : ['Lab', 'Training', 'Tech', 'Events'].map((label, index) => ({
        key: label,
        label,
        image: galleryImages[index % galleryImages.length],
      }))

  return (
    <section className={`${SECTION} bg-white section-glow-top`}>
      <div className={CONTAINER}>
        <SectionHeader
          title="AFRS India Gallery"
          subtitle="Explore snapshots from our laboratories, workshops, and field sessions."
        />
        <AnimateOnScroll stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="group relative overflow-hidden rounded-2xl aspect-square card-pop"
            >
              <Image
                src={item.image}
                alt={`${item.label} gallery`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/40 transition" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-lg border border-white/40 bg-white/20 backdrop-blur px-4 py-1.5 text-white text-sm font-semibold">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </AnimateOnScroll>
        <AnimateOnScroll>
          <div className="mt-10 text-center">
            <Link
              href="/gallery"
              className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-10 text-sm font-bold transition"
            >
              View More Gallery
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
