import Image from 'next/image'
import Link from 'next/link'
import {
  Award,
  BadgeCheck,
  Beaker,
  Box,
  BriefcaseBusiness,
  ClipboardList,
  FileSearch,
  Fingerprint,
  FlaskConical,
  Gavel,
  GraduationCap,
  MapPin,
  Microscope,
  Phone,
  ShieldCheck,
  User,
  Users,
} from 'lucide-react'
import { LabInquiryForm } from '@/components/services/LabInquiryForm'
import type { CatalogItem, DirectorateMember, SiteContact } from '@/components/services/types'

const CONTAINER = 'mx-auto w-full max-w-[1120px] px-6 sm:px-8'

const certifications = [
  { label: '11+', caption: 'Certifications' },
  { label: 'ISO', caption: 'ISO Certified' },
  { label: '24/7', caption: 'Forensic Access' },
]

const memberCards = ['Member 01', 'Member 02', 'Member 03', 'Member 04', 'Member 05', 'Member 06']

const kitCards = [
  {
    title: 'CSI Investigation Kit',
    note: 'Complete field processing kit for crime scenes',
    icon: Box,
    price: 'From 200.00',
  },
  {
    title: 'Latent FP Kit',
    note: 'Magnetic and fluorescent powder system',
    icon: Fingerprint,
    price: 'After Enquiry',
  },
  {
    title: 'FP Collection Kit',
    note: 'Standardized cards and lifting tapes',
    icon: ClipboardList,
    price: 'From 200.00',
  },
  {
    title: 'GD Analysis Kit',
    note: 'Magnification and light source document examination',
    icon: FileSearch,
    price: 'Enquiry',
  },
]

const quickKits = [
  { title: 'Fire & Arson Kit', icon: FlaskConical, note: 'Evidence cans and sampling tools' },
  { title: 'ALS Multi-kit', icon: Beaker, note: 'Forensic light source field kit' },
  { title: 'Biology Collection', icon: Users, note: 'Swab, tube and PPE collection system' },
]

const legalLinks = [
  'Medico Legal Property Report',
  'Cross Examination Training',
  'Research & Lab Projects',
  'Expert Opinion (CrPC 45A)',
  'Internship & Training',
  'Insurance Forensics Panel',
]

const researchItems = [
  {
    num: '01',
    title: 'Lorem Ipsum sat',
    desc: 'Advanced evidence operations workbook and investigation protocols',
  },
  {
    num: '02',
    title: 'Lorem Ipsum sat',
    desc: 'Research-ready analytical workflows for students and professionals',
  },
  {
    num: '03',
    title: 'Lorem ipsum',
    desc: 'Case reporting guides and court submission documentation',
  },
]

const defaultServices = [
  {
    id: 'csi',
    title: 'CSI Services',
    slug: 'csi-services',
    desc: 'Comprehensive field processing, evidence documentation, and specialized examination of complex crime scene scenarios using advanced 3D scanning and photography.',
    banner: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  },
  {
    id: 'fingerprint',
    title: 'Fingerprint Analysis',
    slug: 'fingerprint-analysis',
    desc: 'Latent print development using chemical and fluorescent methods, international certification procedures, and expert comparison using AFIS-grade standards.',
    banner: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=800&q=80',
  },
  {
    id: 'documents',
    title: 'Questioned Documents',
    slug: 'questioned-documents',
    desc: 'Detailed forensic examination of handwriting, signatures, ink, paper, and digital alterations using ESDA and electrostatic detection apparatus for uncompromised accuracy.',
    banner: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
  },
] satisfies CatalogItem[]

type Props = {
  catalogItems: CatalogItem[]
  directors: DirectorateMember[]
  teamMembers: DirectorateMember[]
  site: SiteContact
  totalVisitors: number
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#6d28d9]">
      {children}
    </p>
  )
}

function PersonPhoto({ member, large = false }: { member: DirectorateMember; large?: boolean }) {
  return (
    <div
      className={`shrink-0 overflow-hidden rounded-[10px] border border-[#edf1f8] bg-white ${
        large ? 'h-[80px] w-[80px]' : 'h-10 w-10'
      }`}
    >
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.name}
          width={large ? 80 : 40}
          height={large ? 80 : 40}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[11px] font-black text-[#6d28d9]">
          {member.initials}
        </div>
      )}
    </div>
  )
}

export function ServicesPageView({
  catalogItems: _catalogItems,
  directors,
  teamMembers,
  site,
  totalVisitors,
}: Props) {
  const services = defaultServices
  const serviceOptions = services.map((c) => c.title)
  const people = teamMembers.length ? teamMembers.slice(0, 6) : directors

  return (
    <div className="afsl-page bg-white text-[#071329]">
      <section className="afsl-hero-ui relative overflow-hidden text-white">
        <div className="afsl-diagonal-lines absolute inset-0" aria-hidden />
        <div
          className={`${CONTAINER} grid min-h-[520px] items-center gap-10 py-16 lg:grid-cols-[1fr_470px]`}
        >
          <div className="max-w-[570px]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/55">
              Internal Evidence, AFSL
            </p>
            <h1 className="mt-5 text-[44px] font-black leading-[0.98] tracking-[-0.01em] sm:text-[64px] lg:text-[76px]">
              Future-Ready <span className="block text-[#ffbd18]">Forensic</span>
            </h1>
            <p className="mt-7 max-w-[500px] text-[15px] font-medium leading-7 text-white/72">
              The Applied Forensic Science Laboratory (AFSL) integrates high-tech analytical
              methodologies with investigative excellence to serve the modern justice system.
            </p>
            <Link
              href="#service-catalog"
              className="mt-8 inline-flex h-12 items-center rounded-[6px] bg-white px-7 text-[13px] font-extrabold text-[#141a2d] shadow-sm"
            >
              Laboratory Catalog +
            </Link>
          </div>

          <div className="rounded-[22px] bg-[#ded4e8] p-10 shadow-[0_22px_60px_rgba(9,8,24,0.24)]">
            <div className="rounded-[6px] bg-[#222735] px-7 py-5 shadow-xl">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-[#62c47a]">
                Lab Status
              </p>
              <div className="mt-1 flex items-center justify-between gap-4">
                <p className="text-[12px] font-bold text-[#62c47a]">Operational & Certified</p>
                <ShieldCheck className="h-4 w-4 text-white/35" />
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Link
                href="#service-catalog"
                className="rounded-[6px] bg-[#5d20b7] px-7 py-3 text-[12px] font-extrabold text-white shadow-lg shadow-violet-900/25"
              >
                Our Service Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef3f9] py-20">
        <div className={CONTAINER}>
          <div>
            <div className="rounded-[28px] bg-white p-8 shadow-[0_18px_55px_rgba(33,44,68,0.06)] lg:p-10">
              <div className="grid gap-10 lg:grid-cols-[1fr_480px]">
                <div>
                  <Eyebrow>Scientific Infrastructure</Eyebrow>
                  <h2 className="mt-3 text-[31px] font-black tracking-[-0.01em]">
                    About AFSL Laboratory
                  </h2>
                  <p className="mt-5 max-w-[480px] text-[14px] font-medium leading-7 text-[#536176]">
                    Applied Forensic Science Laboratory (AFSL) functions as the specialized
                    scientific arm of the AFRS. We are dedicated to the pursuit of objective truth
                    through meticulous evidence examination and innovative research.
                  </p>
                  <p className="mt-5 max-w-[480px] text-[14px] font-medium leading-7 text-[#536176]">
                    Equipped with state-of-the-art instrumentation and led by veteran experts, AFSL
                    provides a bridge between crime scene realities and courtroom conclusions.
                  </p>
                  <div className="mt-8 grid max-w-[420px] grid-cols-3 gap-4">
                    {certifications.map((stat) => (
                      <div
                        key={stat.caption}
                        className="border-t border-[#dfe7f2] pt-4 text-center"
                      >
                        <p className="text-[18px] font-black text-[#551dae]">{stat.label}</p>
                        <p className="mt-1 text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#9aa7b8]">
                          {stat.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative min-h-[330px] rounded-[14px] bg-white shadow-[0_24px_50px_rgba(24,31,43,0.16)]">
                  <div className="absolute right-[-16px] top-[-18px] flex h-16 w-16 items-center justify-center rounded-[14px] bg-[#5b1eb2] text-white shadow-xl">
                    <Award className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className={CONTAINER}>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <article className="min-h-[285px] rounded-[16px] bg-[#081326] p-8 text-white shadow-[0_18px_45px_rgba(6,14,29,0.18)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-white/10">
                  <Microscope className="h-5 w-5" />
                </div>
                <h3 className="mt-8 text-[21px] font-black">Laboratory Vision</h3>
                <p className="mt-4 max-w-[420px] text-[13px] font-medium leading-6 text-white/65">
                  To redefine forensic diagnostics through computational intelligence and absolute
                  scientific neutrality, becoming the premier global destination for high-complexity
                  evidence analysis.
                </p>
                <div className="mt-7 h-1 w-10 rounded-full bg-[#7434d3]" />
              </article>
            </div>
            <div>
              <article className="min-h-[285px] rounded-[16px] border border-[#e5ebf4] bg-[#f8fafd] p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#6d28d9] text-white">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <h3 className="mt-8 text-[21px] font-black">Our Mission</h3>
                <p className="mt-4 max-w-[420px] text-[13px] font-medium leading-6 text-[#5e6978]">
                  Equipping justice stakeholders with robust, peer-reviewed forensic data using
                  advanced technology, uncompromised integrity, and standardized scientific
                  protocols.
                </p>
                <div className="mt-7 h-1 w-10 rounded-full bg-[#7434d3]" />
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef3f9] py-20">
        <div className={CONTAINER}>
          <div>
            <div className="text-center">
              <Eyebrow>The Experts</Eyebrow>
              <h2 className="mt-3 text-[29px] font-black">Laboratory Directorate</h2>
            </div>
          </div>
          <div className="mx-auto mt-10 grid max-w-[900px] gap-8 md:grid-cols-2">
            {directors.slice(0, 2).map((person) => (
              <div key={person.name}>
                <article className="flex min-h-[170px] items-center gap-8 rounded-[18px] bg-white px-8 shadow-sm">
                  <PersonPhoto member={person} large />
                  <div>
                    <h3 className="text-[17px] font-black">{person.name}</h3>
                    <p className="mt-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#6d28d9]">
                      {person.designation}
                    </p>
                    <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#a0aab8]">
                      Credentials +
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <div>
            <p className="mt-14 text-center text-[10px] font-black uppercase tracking-[0.45em] text-[#9ba8ba]">
              Laboratory Members
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {memberCards.map((fallback, index) => {
              const person = people[index]
              return (
                <div key={person?.name || fallback}>
                  <article className="rounded-[8px] bg-white px-4 py-5 text-center shadow-[0_8px_22px_rgba(35,45,62,0.08)]">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#edf3fa] text-[#a9b6c6]">
                      {person ? <PersonPhoto member={person} /> : <User className="h-4 w-4" />}
                    </div>
                    <p className="mt-4 text-[11px] font-black">{person?.name || fallback}</p>
                    <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.12em] text-[#9ba8ba]">
                      {person?.designation || 'Forensic Unit'}
                    </p>
                  </article>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="service-catalog" className="bg-white py-20">
        <div className={CONTAINER}>
          <div className="mb-9 flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Core Competence</Eyebrow>
              <h2 className="mt-2 text-[31px] font-black">Forensic Service Catalog</h2>
            </div>
            <div className="hidden items-center gap-5 text-[9px] font-black uppercase tracking-[0.16em] text-[#8c98aa] sm:flex">
              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-[#6d28d9]" /> Analytical
              </span>
              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-[#c7d0dd]" /> Investigative
              </span>
            </div>
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {services.map((item, index) => (
              <div key={item.id}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group block overflow-hidden rounded-[16px] border border-[#dce4ef] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-[185px] overflow-hidden">
                    <Image
                      src={item.banner}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071329]/85 via-[#071329]/12 to-transparent" />
                    <span className="absolute bottom-5 left-5 flex h-8 w-8 items-center justify-center rounded-[6px] bg-[#6d28d9] text-white">
                      {index === 1 ? (
                        <Fingerprint className="h-4 w-4" />
                      ) : index === 2 ? (
                        <FileSearch className="h-4 w-4" />
                      ) : (
                        <Microscope className="h-4 w-4" />
                      )}
                    </span>
                    <h3 className="absolute bottom-5 left-16 right-5 text-[16px] font-black text-white">
                      {item.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="min-h-[92px] text-[12px] font-medium leading-6 text-[#627086]">
                      {item.desc}
                    </p>
                    <span className="mt-5 flex h-10 items-center justify-center rounded-[5px] border border-[#6d28d9] text-[10px] font-black uppercase tracking-[0.12em] text-[#4f1aa0]">
                      View Details +
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div>
            <div className="mt-8 grid gap-8 rounded-[20px] bg-[#081326] p-8 text-white lg:grid-cols-[1fr_2fr] lg:p-10">
              <div>
                <h3 className="text-[25px] font-black leading-tight">Expert Legal Consultancy</h3>
                <p className="mt-4 max-w-[300px] text-[13px] font-medium leading-6 text-white/65">
                  Specialized legal support for judicial and corporate entities.
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex rounded-[6px] bg-[#6420c3] px-7 py-3 text-[12px] font-extrabold"
                >
                  Legal Intake
                </Link>
              </div>
              <ul className="grid content-center gap-x-10 gap-y-5 sm:grid-cols-2">
                {legalLinks.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[12px] font-bold text-white/78"
                  >
                    <Gavel className="h-4 w-4 text-[#7434d3]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef3f9] py-20">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-[740px] text-center">
            <Eyebrow>Proprietary Equipment</Eyebrow>
            <h2 className="mt-2 text-[34px] font-black">AFSL Professional Kits</h2>
            <p className="mt-4 text-[14px] font-medium leading-6 text-[#687487]">
              Engineered for field professionals and academic researchers. Each kit conforms to
              international forensic standards.
            </p>
          </div>
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {kitCards.map((kit) => {
              const Icon = kit.icon
              return (
                <div key={kit.title}>
                  <article className="min-h-[280px] rounded-[15px] border border-[#dfe7f2] bg-white p-8 shadow-sm">
                    <Icon className="h-10 w-10 text-[#d4c8ee]" strokeWidth={1.8} />
                    <h3 className="mt-14 text-[13px] font-black uppercase tracking-[0.03em]">
                      {kit.title}
                    </h3>
                    <p className="mt-3 min-h-[40px] text-[11px] font-medium leading-5 text-[#7b8799]">
                      {kit.note}
                    </p>
                    <div className="mt-6 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.12em]">
                      <span className="text-[#a5afbd]">{kit.price}</span>
                      <Link href="/contact" className="text-[#6d28d9]">
                        Order
                      </Link>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {quickKits.map((kit) => {
              const Icon = kit.icon
              return (
                <div key={kit.title}>
                  <Link
                    href="/contact"
                    className="flex h-[86px] items-center gap-5 rounded-[12px] bg-[#081326] px-7 text-white shadow-sm"
                  >
                    <Icon className="h-5 w-5 text-[#ffbd18]" />
                    <span>
                      <span className="block text-[13px] font-black uppercase tracking-[0.04em]">
                        {kit.title}
                      </span>
                      <span className="mt-1 block text-[10px] font-medium text-white/55">
                        {kit.note}
                      </span>
                    </span>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#071120] py-20 text-white">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1fr_1fr]`}>
          <div>
            <div className="space-y-6">
              <h2 className="text-[24px] font-black">Training & Internship</h2>
              {[
                [
                  'Corporate Training',
                  'Bespoke programs for law enforcement, insurance adjusters, and legal firms on evidence preservation and digital threat vectors.',
                  'View Modules +',
                ],
                [
                  'Student & Internships',
                  'Hands-on laboratory experience for aspiring forensic scientists. Accredited programs covering 12 scientific disciplines.',
                  'Apply Now +',
                ],
              ].map(([title, desc, cta], index) => (
                <article
                  key={title}
                  className={`rounded-[8px] bg-[#101d33] p-7 ${index === 0 ? 'border-l-4 border-[#6d28d9]' : 'border-l-4 border-[#10b8f0]'}`}
                >
                  <h3 className="text-[15px] font-black">{title}</h3>
                  <p className="mt-3 max-w-[430px] text-[12px] font-medium leading-6 text-white/58">
                    {desc}
                  </p>
                  <Link
                    href="/courses"
                    className="mt-5 inline-block text-[12px] font-black text-[#b38cff]"
                  >
                    {cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
          <div>
            <article className="rounded-[10px] bg-[#1d2a47] p-9">
              <h2 className="text-[24px] font-black">Research and Projects</h2>
              <ol className="mt-10 space-y-8">
                {researchItems.map((item) => (
                  <li key={item.num} className="grid grid-cols-[52px_1fr] gap-6">
                    <span className="text-[30px] font-black text-white/42">{item.num}</span>
                    <span>
                      <span className="block text-[15px] font-black">{item.title}</span>
                      <span className="mt-2 block text-[12px] font-medium leading-5 text-white/48">
                        {item.desc}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </section>

      <section id="lab-inquiry" className="bg-white py-20">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1fr_520px] lg:items-center`}>
          <div>
            <div>
              <Eyebrow>Case Registration</Eyebrow>
              <h2 className="mt-2 max-w-[460px] text-[34px] font-black leading-tight">
                Laboratory Intake & Case Enquiry
              </h2>
              <p className="mt-6 max-w-[490px] text-[14px] font-medium leading-7 text-[#5f6d80]">
                Registered agencies and legal professionals can submit evidence and initiate case
                files through this portal. For emergency forensic support, please use our priority
                helpline.
              </p>
              <div className="mt-10 space-y-5">
                <a
                  href={`tel:${site.phone?.replace(/\s/g, '')}`}
                  className="flex max-w-[430px] items-center gap-5 rounded-[8px] bg-[#f4f7fb] px-6 py-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6d28d9] text-white">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#a1acba]">
                      Priority Helpline
                    </span>
                    <span className="mt-1 block text-[16px] font-black">{site.phone}</span>
                  </span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex max-w-[430px] items-center gap-5 rounded-[8px] bg-[#f4f7fb] px-6 py-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#42a5f5] text-white">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#a1acba]">
                      Report Verification
                    </span>
                    <span className="mt-1 block text-[16px] font-black">{site.email}</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="rounded-[18px] bg-[#f4f7fb] p-7 shadow-[0_18px_40px_rgba(18,31,47,0.14)]">
              <LabInquiryForm
                serviceOptions={
                  serviceOptions.length > 0 ? serviceOptions : ['General forensic inquiry']
                }
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef3f9] py-12">
        <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[1fr_360px]`}>
          <div>
            <div className="overflow-hidden rounded-[16px] border border-[#d4deea] bg-white shadow-sm">
              <div className="afsl-static-map relative h-[255px]">
                <div className="absolute left-[45%] top-[42%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                  <MapPin className="h-8 w-8 fill-[#ef4444] text-[#ef4444] drop-shadow" />
                  <span className="mt-1 rounded bg-white/90 px-2 py-1 text-[10px] font-black text-[#071329] shadow-sm">
                    Indore
                  </span>
                </div>
                <span className="absolute bottom-4 left-4 rounded bg-white/95 px-3 py-2 text-[10px] font-bold text-[#4d5a6d] shadow-sm">
                  Open in Map +
                </span>
              </div>
            </div>
          </div>
          <div>
            <article className="flex min-h-[255px] flex-col justify-center rounded-[18px] bg-[#5b1eb2] p-9 text-white shadow-[0_18px_45px_rgba(74,29,150,0.28)]">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/58">
                Total Laboratory Visitors
              </p>
              <p className="mt-5 text-[48px] font-black tabular-nums">
                {totalVisitors.toLocaleString('en-IN')}
              </p>
              <div className="mt-8 flex gap-3">
                {[MapPin, GraduationCap].map((Icon, index) => (
                  <span
                    key={index}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
