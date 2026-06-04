import Image from 'next/image'
import Link from 'next/link'
import { formatEventDate, formatEventType, resolveMediaUrl, richTextToPlain } from '@/lib/cms'
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
} from 'lucide-react'
import type { PaginatedDocs } from 'payload'

/* ─── shared assets & layout ─── */
export const heroPanelImage =
  'https://res.cloudinary.com/drrzakkgo/image/upload/v1777273424/WhatsApp_Image_2026-04-18_at_11.31.12_AM_hdi2gq.jpg'
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

const CONTAINER = 'max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16'
const SECTION = 'py-16 lg:py-20'

type SectionText = NonNullable<HomePage['sectionText']>
type HeroData = NonNullable<HomePage['hero']>

function SectionHeader({
  title,
  subtitle,
  light = false,
}: {
  title: string
  subtitle?: string
  light?: boolean
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
      <h2
        className={`text-2xl sm:text-[30px] font-extrabold leading-tight tracking-tight ${light ? 'text-white' : 'text-slate-900'}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base leading-relaxed ${light ? 'text-white/75' : 'text-slate-500'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

const defaultImpactStats = [
  {
    value: '300+',
    label: 'Events Hosted',
    tone: 'blue',
  },
  {
    value: '400+',
    label: 'Educational Videos',
    tone: 'purple',
  },
  {
    value: '06+',
    label: 'Books Published',
    tone: 'orange',
  },
  {
    value: '1',
    label: 'Virtual Museum',
    tone: 'emerald',
  },
  {
    value: '100+',
    label: 'Expert Sessions',
    tone: 'red',
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
  { label: 'Forensic Investigation', color: 'bg-indigo-100 text-indigo-600' },
  { label: 'Fingerprint Analysis', color: 'bg-blue-100 text-blue-600' },
  { label: 'Questioned Documents', color: 'bg-violet-100 text-violet-600' },
  { label: 'Cyber Forensics', color: 'bg-cyan-100 text-cyan-700' },
  { label: 'DNA Profiling', color: 'bg-emerald-100 text-emerald-600' },
  { label: 'Forensic Training', color: 'bg-orange-100 text-orange-600' },
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
      style={{ background: 'linear-gradient(117.28deg, #6366F1 0%, #3B82F6 100%)' }}
    >
      {/* <ForensicBackground
        trail={0.03}
        particleCount={55}
        enableClick
        clickRadius={120}
        clickStrength={1}
      /> */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-white rounded-t-[2rem]" />
      <div className={`${CONTAINER} relative grid gap-10 lg:grid-cols-2 lg:gap-16 items-center`}>
        <div className="reveal-up">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold leading-[1.15] tracking-tight">
            {heroData.title || 'Welcome to Applied Forensic Research Sciences'}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
            {heroData.description ||
              'Your portal to advanced training, research-led education, and world-class forensic professional services.'}
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
      icon: '📚',
      label: 'Professional Training Programs',
      href: '/courses',
      description:
        'Structured forensic science courses designed for students and professionals seeking practical skills and certification.',
    },
    {
      icon: '🔬',
      label: 'Internship Opportunities',
      href: '/courses',
      description:
        'Hands-on forensic internships providing real-world experience in laboratory and field settings under expert mentorship.',
    },
    {
      icon: '📋',
      label: 'Research Projects',
      href: '/courses',
      description:
        'Engage in cutting-edge forensic research initiatives that contribute to the advancement of the field.',
    },
    {
      icon: '🔍',
      label: 'Case Consultation',
      href: '/services',
      description:
        'Professional forensic consultation for complex investigations and evidence analysis.',
    },
    {
      icon: '🧪',
      label: 'Lab Services',
      href: '/services',
      description: 'Full-spectrum forensic laboratory analysis with certified expert reports.',
    },
    {
      icon: '🎓',
      label: 'Certification',
      href: '/courses',
      description: 'Industry-recognized certifications for forensic professionals and researchers.',
    },
  ]
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <SectionHeader
          title={sectionText.featuredCardsHeading || 'Our Key Services & Programs'}
          subtitle={
            sectionText.servicesDescription ||
            'Comprehensive forensic solutions tailored for academic growth and professional expertise.'
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
            >
              <div>
                <div
                  className={`inline-flex items-center justify-center rounded-lg px-3 py-2 text-xl ${serviceIcons[index % serviceIcons.length].color}`}
                >
                  {item.icon}
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 leading-snug">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
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
    },
    {
      icon: '🌀',
      title: 'Fingerprint Examination Course',
    },
    {
      icon: '🧬',
      title: 'Forensic Biology & Serology Training',
    },
    {
      icon: '📄',
      title: 'Questioned Document Examination',
    },
    {
      icon: '💻',
      title: 'Multimedia & Digital Forensics',
    },
  ]
  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className={CONTAINER}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-[36px] font-extrabold text-slate-900">
            Forensic Training Programs
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base">
            Specialized certification courses for future forensic professionals
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {trainingPrograms.slice(0, 3).map((program) => (
            <div
              key={program.title}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 text-xl">
                {program.icon}
              </div>

              <h3 className="text-sm font-semibold text-slate-900 leading-snug">{program.title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {trainingPrograms.slice(3, 5).map((program) => (
            <div
              key={program.title}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 text-xl">
                {program.icon}
              </div>

              <h3 className="text-sm font-semibold text-slate-900 leading-snug">{program.title}</h3>
            </div>
          ))}

          <div className="flex items-center justify-center">
            <Link
              href="/courses"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-8 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition"
            >
              View All Programs
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── 2. Program CTA banner ─── */
export function ProgramCtaSection() {
  return (
    // <section className={`${SECTION} bg-white -mt-6 relative z-10`}>
    <div className={CONTAINER}>
      <div className="rounded-3xl bg-[#C8D6FC] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 text-white shadow-xl">
        <h2 className=" text-black text-xl sm:text-2xl lg:text-[28px] font-extrabold leading-snug max-w-3xl">
          Forensic Science Training, Internship &amp; Research Programs | AFRS India
        </h2>
        <p className="mt-4 text-sm sm:text-base text-black max-w-2xl leading-relaxed">
          AFSL provides structured internship programs designed to provide students with practical
          exposure in forensic science disciplines including crime scene investigation, fingerprint
          analysis, and digital forensics and many more.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/courses"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-700 px-6 text-sm font-bold transition"
          >
            Explore Our Training Program
          </Link>
          <Link
            href="/courses"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/30 bg-[#FB923C] hover:bg-white/10 px-6 text-sm font-bold transition gap-2"
          >
            <span aria-hidden>📋</span>
            Apply for Forensic Internship
          </Link>
        </div>
      </div>
    </div>
    // </section>
  )
}

/* ─── 3. Internship featured ─── */
export function InternshipFeatureSection() {
  return (
    <section className={`${SECTION} bg-white`}>
      <div className={`${CONTAINER} grid gap-12 lg:grid-cols-2 items-center`}>
        <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-lg aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
          <Image
            src={heroPanelImage}
            alt="Forensic internship training"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute bottom-4 right-4 rounded-xl bg-white px-4 py-2 shadow-lg text-xs font-bold text-indigo-600">
            Certified Courses
          </div>
        </div>
        <div>
          <span className="inline-flex rounded-full bg-violet-100 text-violet-700 px-4 py-1 text-xs font-bold uppercase tracking-wider">
            Internship Program
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            Forensic Science Internship Program | AFRS India
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Join our highly structured internship programs designed to provide genuine practical
            exposure. Gain first-hand experience in professional laboratory settings and field
            investigations under senior scientists.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              'Real laboratory exposure',
              'Mentor-led training tracks',
              'Case-oriented practical sessions',
              'Certification and evaluation',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-slate-600">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
          <Link
            href="/courses"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 px-8 text-white text-sm font-bold transition"
          >
            Read More
          </Link>
        </div>
      </div>
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
    <section className={`${SECTION} bg-slate-50/80`}>
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
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <SectionHeader
          title={sectionText.eventsHeading || 'Upcoming Events'}
          subtitle={
            sectionText.eventsDescription ||
            'Join our forensic science training programs and workshops'
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <article
                key={afrsEvent.id}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm card-pop"
              >
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
                  <h3 className="mt-4 text-xl font-bold text-slate-900">{afrsEvent.title}</h3>
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
        </div>
      </div>
    </section>
  )
}

/* ─── 6. About ─── */
export function AboutSection({ sectionText }: { sectionText: SectionText }) {
  return (
    <section className={`${SECTION} bg-slate-50/60`}>
      <div className={`${CONTAINER} grid gap-12 lg:grid-cols-2 items-center`}>
        <div>
          <h2 className="text-2xl sm:text-[30px] font-extrabold text-slate-900 leading-tight">
            {sectionText.aboutHeading || 'About AFRS'}
          </h2>
          <p className="mt-6 text-slate-600 leading-relaxed">
            {sectionText.aboutDescription1 ||
              'Applied Forensic Research Sciences (AFRS) is a premier organization established with a vision to revolutionize the forensic science landscape through research, training, and specialized services.'}
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {sectionText.aboutDescription2 ||
              'We bridge the gap between academic theory and practical application, providing students and professionals with the tools they need to excel in forensic investigation.'}
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white px-8 text-sm font-bold transition"
          >
            Read More
          </Link>
        </div>
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
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/90">
              Years of Experience
            </p>
          </div>
        </div>
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
    <section className="bg-[#F8FAFC] py-[88px] lg:py-[110px]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid items-center gap-[64px] lg:grid-cols-[1fr_460px]">
          {/* LEFT CONTENT */}
          <div className="max-w-[560px]">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full bg-[#EEF2FF] px-4 py-2">
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6366F1]">
                Career Catalyst
              </span>
            </div>

            {/* Heading */}
            <h2 className="mt-7 text-[56px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0F172A]">
              Forensic Science Internship Program in India
            </h2>

            {/* Description */}
            <p className="mt-8 max-w-[540px] text-[22px] leading-[1.8] text-[#64748B]">
              Join our highly structured internship programs designed to provide genuine practical
              exposure. Gain first-hand experience in professional laboratory settings and field
              investigations under the supervision of senior scientists.
            </p>

            {/* Features */}
            <div className="mt-10 grid gap-y-7 gap-x-10 sm:grid-cols-2">
              {internshipFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-4">
                  <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[10px] bg-[#DDF7E7]">
                    <BadgeCheck className="h-[18px] w-[18px] text-[#10B981]" strokeWidth={2.2} />
                  </div>

                  <p className="text-[20px] font-semibold leading-[1.45] text-[#334155]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12">
              <Link
                href="/courses"
                className="inline-flex h-[72px] min-w-[166px] items-center justify-center rounded-[18px] bg-[#F97316] px-10 text-[28px] font-bold text-white shadow-[0_20px_35px_rgba(249,115,22,0.28)] transition hover:bg-[#EA580C]"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="overflow-hidden rounded-[24px] border-[10px] border-white bg-white shadow-[0_32px_60px_rgba(15,23,42,0.18)]">
              <div className="relative aspect-[1/1] w-full">
                <Image
                  src="https://res.cloudinary.com/drrzakkgo/image/upload/v1777273424/WhatsApp_Image_2026-04-18_at_11.31.12_AM_hdi2gq.jpg"
                  alt="Forensic Internship Program"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
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
    'bg-[#6366F1]', // indigo
    'bg-[#F97316]', // orange
    'bg-[#10B981]', // emerald
    'bg-[#EF4444]', // red
  ]

  return (
    <section className="bg-[#F8FAFC] py-20 lg:py-24">
      <div className={CONTAINER}>
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-[42px] font-extrabold tracking-[-0.02em] text-[#0F172A]">
            Our Achievements
          </h2>

          <p className="mt-3 text-[18px] text-slate-500">
            Making a difference in forensic science education
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          {items.map((item, index) => (
            <div
              key={'id' in item && item.id ? String(item.id) : `${item.label}-${index}`}
              className={`
                ${cardColors[index % cardColors.length]}
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
              <div className="text-[34px] leading-none font-extrabold text-white">{item.value}</div>

              <div className="mt-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/95">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 8. Future of forensics ─── */
export function FutureSection() {
  return (
    <section className={`${SECTION} bg-slate-50/60`}>
      <div className={`${CONTAINER} grid gap-10 lg:grid-cols-2 items-center`}>
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
        <div>
          <h2 className="text-2xl sm:text-[32px] font-extrabold text-slate-900 leading-tight">
            Exploring the Future of Forensics
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Explore our latest research breakthroughs and educational highlights. At AFRS, we use
            state-of-the-art technology to solve complex problems and train the next generation of
            forensic experts.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
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
  ]

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-24">
      <div className={CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[36px] font-extrabold tracking-tight text-slate-900">
            The AFRS Impact
          </h2>

          <p className="mt-4 text-[20px] leading-relaxed text-slate-500">
            Our holistic approach ensures every student and professional gains more than just
            knowledge.
          </p>
        </div>
        {/* 3 columns per row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
                >
                  <Icon className={`h-7 w-7 ${item.iconColor}`} />
                </div>

                <h3 className="mt-7 text-[18px] font-bold leading-[1.2] text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-5 text-[15px] leading-8 text-slate-500">{item.description}</p>
              </div>
            )
          })}
        </div>
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

/* ─── 10. Trusted partner ─── */
export function TrustedPartnerSection() {
  const cards = [
    { title: 'DNA Analysis', icon: '🧬' },
    { title: 'Fingerprint Analysis', icon: '🔍' },
    { title: 'Crime Forensics', icon: '🕵️' },
    { title: 'Expert Opinion', icon: '📋' },
  ]

  return (
    <section
      className={`${SECTION} text-white`}
      style={{ background: 'linear-gradient(117.28deg, #6366F1 0%, #3B82F6 100%)' }}
    >
      <div className={CONTAINER}>
        <SectionHeader
          light
          title="Applied Forensic Science Laboratory (AFSL)"
          subtitle="Scientific Assistance Towards Justice"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 text-center card-pop min-h-[140px] flex flex-col items-center justify-center"
            >
              <span className="text-3xl" aria-hidden>
                {card.icon}
              </span>
              <p className="mt-4 text-sm font-bold leading-snug">{card.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <ProgramCtaSection />
      </div>
    </section>
  )
}

/* ─── 11. Experts + resources sidebar ─── */
export function ExpertsSection({ scientists }: { scientists: PaginatedDocs<Scientist> }) {
  const experts = scientists.docs.length ? scientists.docs : fallbackScientists

  return (
    <section className={`${SECTION} bg-white`}>
      <div className={`${CONTAINER} grid gap-10 xl:grid-cols-[1fr_340px] items-start`}>
        <div>
          <h2 className="text-2xl sm:text-[30px] font-extrabold text-slate-900">
            Our Expert Scientists
          </h2>
          <p className="mt-3 text-slate-500">
            Leading professionals driving forensic innovation and research excellence.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {experts.map((expert, index) => {
              const photoUrl =
                'photo' in expert
                  ? resolveMediaUrl(expert.photo as Media | number | null | undefined, '')
                  : ''
              const initial = expert.name?.trim().split(/\s+/).pop()?.[0]?.toUpperCase() || '?'
              const cardKey =
                'id' in expert && expert.id ? String(expert.id) : `${expert.name}-${index}`

              return (
                <div
                  key={cardKey}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm card-pop flex gap-4"
                >
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
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-600 p-8 text-white shadow-lg">
          <h3 className="text-xl font-bold">Case Submission</h3>
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
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <SectionHeader
          title="Testimonials"
          subtitle="Voices from students and professionals who trained with AFRS."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.docs.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm card-pop text-center"
            >
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
        </div>
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
    { label: 'E-Library', href: '/articles', icon: '▶' },
    { label: 'Blog', href: '/articles', icon: '🎙' },
    { label: 'Virtual Museum', href: '/events', icon: '📡' },
    { label: 'Youtube Channel', href: '/articles', icon: '📰' },
  ]

  return (
    <section
      className={`${SECTION} text-white`}
      style={{ background: 'linear-gradient(117.28deg, #6366F1 0%, #3B82F6 100%)' }}
    >
      <div className={CONTAINER}>
        <SectionHeader
          light
          title="Quick Links"
          subtitle="Access our resources and stay updated."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 text-center card-pop hover:bg-white/15 transition min-h-[120px] flex flex-col items-center justify-center gap-3"
            >
              <span className="text-2xl" aria-hidden>
                {item.icon}
              </span>
              <span className="font-bold text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
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
    <section className={`${SECTION} bg-white`}>
      <div className={`${CONTAINER} max-w-3xl`}>
        <SectionHeader
          title="Latest News & Articles"
          subtitle="Stay updated with AFRS announcements and publications."
        />
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
    <section className={`${SECTION} bg-slate-50/80`}>
      <div className={`${CONTAINER} max-w-3xl`}>
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Quick answers about programs, registration, and services."
        />
        <div className="space-y-3">
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
        </div>
      </div>
    </section>
  )
}

/* ─── 17. Community stats banner ─── */
export function CommunityBannerSection({ totalVisitors }: { totalVisitors?: number }) {
  const count = typeof totalVisitors === 'number' ? totalVisitors.toLocaleString('en-IN') : '25,000'

  return (
    <section
      className="py-10 text-white text-center"
      style={{ background: 'linear-gradient(117.28deg, #6366F1 0%, #3B82F6 100%)' }}
    >
      <div className={CONTAINER}>
        <p>Total Visitors: {count}</p>
      </div>
    </section>
  )
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
    <section className={`${SECTION} bg-white`}>
      <div className={CONTAINER}>
        <SectionHeader
          title="AFRS India Gallery"
          subtitle="Explore snapshots from our laboratories, workshops, and field sessions."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-10 text-sm font-bold transition"
          >
            View More Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
