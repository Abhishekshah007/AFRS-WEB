import Image from 'next/image'
import Link from 'next/link'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CountUp } from '@/components/ui/CountUp'
import { HeroInquiryCard } from '@/components/services/HeroInquiryCard'
import { LabInquiryForm } from '@/components/services/LabInquiryForm'
import type { CatalogItem, DirectorateMember, SiteContact } from '@/components/services/types'

const CONTAINER = 'max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16'

const certifications = [
  { label: 'ISO 17025', abbr: 'ISO' },
  { label: 'NABL Accredited', abbr: 'NABL' },
  { label: 'MoEF Certified', abbr: 'MoEF' },
  { label: 'FSSAI Partner', abbr: 'FSS' },
  { label: 'BIS Standards', abbr: 'BIS' },
  { label: 'Govt. Approved', abbr: 'GOV' },
]

const professionalKits = [
  { icon: '🧪', title: 'Narcotic Kit', price: 'View kit' },
  { icon: '📱', title: 'Mobile Forensic Kit', price: 'View kit' },
  { icon: '💻', title: 'Cyber Forensic Kit', price: 'View kit' },
  { icon: '🧬', title: 'DNA Collection Kit', price: 'View kit' },
]

const kitBanners = [
  { title: 'DNA Collection', desc: 'Sterile sampling protocols' },
  { title: 'Evidence Collection', desc: 'Chain-of-custody ready' },
  { title: 'Sexual Assault Kit', desc: 'Medico-legal compliance' },
]

const legalServices = [
  'Cyber Crime Investigation',
  'Fingerprint & AFIS Analysis',
  'Questioned Document Examination',
  'Ballistics & Firearms ID',
  'DNA & Biological Profiling',
  'Expert Court Testimony',
]

const researchItems = [
  {
    num: '01',
    title: 'Forensic Toxicology Research',
    desc: 'Novel detection methods for controlled substances in biological matrices.',
  },
  {
    num: '02',
    title: 'Digital Evidence Standards',
    desc: 'Developing admissibility frameworks for mobile and cloud forensics.',
  },
  {
    num: '03',
    title: 'Crime Scene Reconstruction',
    desc: '3D modelling and trajectory analysis for complex investigations.',
  },
]

type Props = {
  catalogItems: CatalogItem[]
  directors: DirectorateMember[]
  teamMembers: DirectorateMember[]
  site: SiteContact
  totalVisitors: number
}

export function ServicesPageView({
  catalogItems,
  directors,
  teamMembers,
  site,
  totalVisitors,
}: Props) {
  const serviceOptions = catalogItems.map((c) => c.title)
  const mapUrl = site.mapEmbedUrl

  return (
    <div className="afsl-page bg-white">
      {/* ── HERO ── */}
      <section className="afsl-hero relative overflow-hidden text-white">
        <div className="afsl-hero-grid absolute inset-0 pointer-events-none" aria-hidden />
        <div className="absolute top-20 left-[-80px] h-72 w-72 rounded-full bg-violet-500/25 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-[-40px] h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />

        <div
          className={`${CONTAINER} relative z-10 py-16 lg:py-24 grid gap-12 lg:grid-cols-[1fr_400px] items-center`}
        >
          <div>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-violet-200/90 reveal-up">
              Ultimate Modern Forensic
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.08] tracking-tight reveal-up-d1">
              Future-Ready <span className="text-[#fdb022]">Forensic</span>
            </h1>
            <p className="mt-5 max-w-lg text-base text-white/80 leading-relaxed reveal-up-d2">
              AFSL delivers high-end forensic laboratory solutions — from crime scene investigation
              to digital evidence analysis — with ISO-compliant methodology and court-ready
              reporting.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 reveal-up-d3">
              <Link
                href="#service-catalog"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-sm font-bold text-[#4c1d95] shadow-lg transition hover:bg-violet-50"
              >
                EXPLORE SERVICES
              </Link>
              <Link
                href="#lab-inquiry"
                className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-white/40 px-8 text-sm font-bold text-white transition hover:bg-white/10"
              >
                GET FREE CONSULTATION
              </Link>
            </div>
          </div>

          <div className="reveal-up-d2">
            <HeroInquiryCard
              services={catalogItems.map((c) => ({ title: c.title, slug: c.slug }))}
            />
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className={CONTAINER}>
          <AnimateOnScroll>
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a]">
                  About AFSL Laboratory
                </h2>
                <p className="mt-5 text-slate-600 text-sm leading-relaxed">
                  The Applied Forensic Science Laboratory (AFSL) bridges academic forensic research
                  with industry-standard investigation. Our facilities feature cutting-edge
                  instruments for fingerprint analysis, digital evidence recovery, chemical
                  toxicology, and biological profiling.
                </p>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  With a commitment to evidence integrity and methodological rigor, AFSL serves as a
                  practical training hub for students and professionals under certified forensic
                  scientists.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { value: 10, suffix: '+', label: 'Years of Exp' },
                    { value: 150, suffix: '+', label: 'Happy Clients' },
                    { value: 24, suffix: '/7', label: 'Lab Support' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center sm:text-left">
                      <p className="text-2xl sm:text-3xl font-extrabold text-[#7c3aed]">
                        <CountUp end={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-[4/3] rounded-[24px] bg-gradient-to-br from-slate-100 to-slate-200 shadow-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <span className="text-6xl opacity-30">🔬</span>
                  </div>
                  <div className="absolute top-4 right-4 h-12 w-12 rounded-2xl bg-[#7c3aed] text-white flex items-center justify-center text-xl shadow-lg">
                    ✦
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className="pb-16 lg:pb-20 bg-white">
        <div className={CONTAINER}>
          <AnimateOnScroll stagger>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[24px] bg-[#0f172a] p-8 sm:p-10 text-white card-pop min-h-[220px] flex flex-col">
                <div className="h-11 w-11 rounded-xl bg-white/10 flex items-center justify-center text-lg mb-5">
                  🔭
                </div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-violet-300">
                  Laboratory Vision
                </p>
                <p className="mt-4 text-sm text-white/75 leading-relaxed flex-1">
                  To be India&apos;s most trusted forensic laboratory — setting benchmarks in
                  evidence integrity, scientific accuracy, and professional training for the next
                  generation of investigators.
                </p>
                <Link
                  href="/about"
                  className="mt-6 text-sm font-bold text-[#fdb022] hover:underline"
                >
                  Read More →
                </Link>
              </div>
              <div className="rounded-[24px] border border-slate-100 bg-white p-8 sm:p-10 shadow-sm card-pop min-h-[220px] flex flex-col">
                <div className="h-11 w-11 rounded-xl bg-violet-100 text-[#7c3aed] flex items-center justify-center text-lg mb-5">
                  🎯
                </div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#7c3aed]">
                  Our Mission
                </p>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed flex-1">
                  Deliver court-admissible forensic analysis, empower law enforcement with
                  actionable insights, and advance forensic education through research-led training
                  and internship programmes.
                </p>
                <Link
                  href="/about"
                  className="mt-6 text-sm font-bold text-[#7c3aed] hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── DIRECTORATE ── */}
      <section className="py-14 lg:py-18 bg-slate-50/80">
        <div className={CONTAINER}>
          <AnimateOnScroll>
            <h2 className="text-2xl sm:text-[28px] font-extrabold text-center text-[#0f172a] mb-10">
              Laboratory Directorate
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto mb-10">
              {directors.map((d) => (
                <article
                  key={d.name}
                  className="rounded-[24px] border border-slate-100 bg-white p-8 text-center shadow-sm card-pop"
                >
                  <div className="mx-auto h-24 w-24 rounded-full overflow-hidden bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] text-white flex items-center justify-center text-2xl font-bold shadow-lg ring-4 ring-violet-100">
                    {d.photo ? (
                      <Image
                        src={d.photo}
                        alt={d.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      d.initials
                    )}
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-slate-900">{d.name}</h3>
                  <p className="text-sm font-semibold text-[#7c3aed]">{d.designation}</p>
                  <div
                    className="mt-3 flex justify-center gap-0.5 text-[#fdb022]"
                    aria-label="5 star rating"
                  >
                    {'★★★★★'.split('').map((s, i) => (
                      <span key={i} className="text-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                  {d.bio && (
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {d.bio}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Team circles */}
          <AnimateOnScroll stagger>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {teamMembers.map((m) => (
                <div key={m.name} className="text-center w-[88px] sm:w-[100px]">
                  <div className="mx-auto h-16 w-16 sm:h-[72px] sm:w-[72px] rounded-full overflow-hidden bg-slate-200 ring-2 ring-white shadow-md flex items-center justify-center text-sm font-bold text-[#7c3aed]">
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={m.name}
                        width={72}
                        height={72}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      m.initials
                    )}
                  </div>
                  <p className="mt-2 text-xs font-bold text-slate-800 line-clamp-1">{m.name}</p>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{m.designation}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Certifications */}
          <AnimateOnScroll className="mt-14">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {certifications.map((c) => (
                <div key={c.label} className="text-center">
                  <div className="mx-auto h-14 w-14 rounded-full border-2 border-violet-200 bg-white flex items-center justify-center text-[10px] font-extrabold text-[#7c3aed] shadow-sm">
                    {c.abbr}
                  </div>
                  <p className="mt-2 text-[10px] font-semibold text-slate-500 max-w-[80px]">
                    {c.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── SERVICE CATALOG ── */}
      <section id="service-catalog" className="py-16 lg:py-20 bg-white">
        <div className={CONTAINER}>
          <AnimateOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <h2 className="text-2xl sm:text-[30px] font-extrabold text-[#0f172a]">
                  Forensic Service Catalog
                </h2>
                <p className="mt-2 text-slate-500 text-sm max-w-xl">
                  Professional forensic capabilities for investigation, education, and evidence
                  reporting.
                </p>
              </div>
              <Link
                href="/contact"
                className="text-sm font-bold text-[#7c3aed] hover:underline shrink-0"
              >
                View All Services →
              </Link>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {catalogItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/services/${item.slug}`}
                  className="group flex flex-col rounded-[20px] border border-slate-100 bg-white overflow-hidden shadow-sm card-pop"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <Image
                      src={item.banner}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#7c3aed] text-white text-sm shadow-lg">
                      ◈
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-extrabold text-slate-900 group-hover:text-[#7c3aed] transition-colors">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                        {item.desc}
                      </p>
                    )}
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#7c3aed]">
                      READ MORE{' '}
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── LEGAL CONSULTANCY ── */}
      <section className="py-8 lg:py-10">
        <div className={CONTAINER}>
          <AnimateOnScroll>
            <div className="rounded-[24px] bg-[#0f172a] text-white p-8 sm:p-12 grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold">Expert Legal Consultancy</h2>
                <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-md">
                  Court-ready expert opinions and investigative support for law firms, agencies, and
                  corporate clients.
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] px-8 text-sm font-bold transition"
                >
                  LEARN MORE
                </Link>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {legalServices.map((svc) => (
                  <li key={svc} className="flex items-start gap-2.5 text-sm text-white/90">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7c3aed] text-[10px]">
                      ✓
                    </span>
                    {svc}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── PROFESSIONAL KITS ── */}
      <section className="py-16 lg:py-20 bg-slate-50/60">
        <div className={CONTAINER}>
          <AnimateOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-[30px] font-extrabold text-[#0f172a]">
                AFSL Professional Kits
              </h2>
              <p className="mt-3 text-slate-500 text-sm">
                Field-ready forensic kits designed for evidence integrity and chain-of-custody
                compliance.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {professionalKits.map((kit) => (
                <div
                  key={kit.title}
                  className="rounded-[20px] border border-slate-100 bg-white p-6 text-center shadow-sm card-pop"
                >
                  <span className="text-3xl">{kit.icon}</span>
                  <p className="mt-4 text-sm font-extrabold text-slate-900">{kit.title}</p>
                  <Link
                    href="/contact"
                    className="mt-3 inline-block text-xs font-bold text-[#7c3aed] hover:underline"
                  >
                    BUY NOW
                  </Link>
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid gap-4 md:grid-cols-3">
              {kitBanners.map((b) => (
                <div
                  key={b.title}
                  className="rounded-[16px] bg-[#0f172a] px-6 py-5 text-white card-pop hover:bg-slate-900 transition"
                >
                  <p className="font-extrabold text-sm">{b.title}</p>
                  <p className="mt-1 text-xs text-white/60">{b.desc}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── TRAINING & RESEARCH ── */}
      <section className="py-16 lg:py-20 bg-[#0f172a] text-white">
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-2">
            <AnimateOnScroll direction="left">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-violet-300">
                  Training & Internship
                </p>
                <h2 className="mt-3 text-2xl font-extrabold">Forensic Training Programmes</h2>
                <div className="mt-8 space-y-5">
                  {[
                    {
                      title: 'Corporate Training',
                      desc: 'Custom workshops for law enforcement, legal teams, and corporate security units.',
                      href: '/courses',
                    },
                    {
                      title: 'Student Internship',
                      desc: 'Hands-on lab exposure under senior forensic scientists with case documentation practice.',
                      href: '/courses',
                    },
                  ].map((block) => (
                    <div
                      key={block.title}
                      className="rounded-[20px] border border-white/10 bg-white/5 p-6 card-pop"
                    >
                      <h3 className="font-extrabold">{block.title}</h3>
                      <p className="mt-2 text-sm text-white/65 leading-relaxed">{block.desc}</p>
                      <Link
                        href={block.href}
                        className="mt-4 inline-block text-sm font-bold text-[#fdb022] hover:underline"
                      >
                        Apply Now →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-violet-300">
                  Resources & Projects
                </p>
                <h2 className="mt-3 text-2xl font-extrabold">Research and Projects</h2>
                <ol className="mt-8 space-y-6">
                  {researchItems.map((item) => (
                    <li key={item.num} className="flex gap-5">
                      <span className="text-3xl font-extrabold text-[#7c3aed]/80 tabular-nums">
                        {item.num}
                      </span>
                      <div>
                        <p className="font-extrabold">{item.title}</p>
                        <p className="mt-1 text-sm text-white/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── LAB INQUIRY ── */}
      <section id="lab-inquiry" className="py-16 lg:py-20 bg-slate-100/80">
        <div className={CONTAINER}>
          <AnimateOnScroll>
            <div className="rounded-[28px] bg-white shadow-xl border border-slate-100 overflow-hidden grid lg:grid-cols-[1fr_1.1fr]">
              <div className="p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-violet-50/80 to-white">
                <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#0f172a] leading-tight">
                  Laboratory Intake &amp; Case Inquiry
                </h2>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  Submit your case details and our forensic team will review your inquiry within 24
                  business hours.
                </p>
                <div className="mt-10 space-y-5">
                  <a
                    href={`tel:${site.phone?.replace(/\s/g, '')}`}
                    className="flex items-center gap-4 group"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7c3aed] text-white text-lg shadow-md">
                      📞
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Phone
                      </p>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-[#7c3aed] transition">
                        {site.phone}
                      </p>
                    </div>
                  </a>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-4 group">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7c3aed] text-white text-lg shadow-md">
                      ✉
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Email
                      </p>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-[#7c3aed] transition">
                        {site.email}
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="p-8 sm:p-10 lg:p-12 border-t lg:border-t-0 lg:border-l border-slate-100">
                <LabInquiryForm
                  serviceOptions={
                    serviceOptions.length > 0 ? serviceOptions : ['General forensic inquiry']
                  }
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── MAP & STATS ── */}
      <section className="py-14 lg:py-16 bg-white">
        <div className={CONTAINER}>
          <AnimateOnScroll>
            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] items-stretch">
              <div className="rounded-[24px] border border-slate-100 overflow-hidden min-h-[280px] bg-slate-100 shadow-sm">
                {mapUrl ? (
                  <iframe
                    title="AFSL laboratory location"
                    src={mapUrl}
                    loading="lazy"
                    className="h-full min-h-[280px] w-full border-0"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-full min-h-[280px] items-center justify-center text-slate-400 text-sm px-6 text-center">
                    Add a Google Maps embed URL in Site Settings → Map Embed URL
                  </div>
                )}
              </div>

              <div
                className="rounded-[24px] p-10 flex flex-col justify-center text-white text-center shadow-xl"
                style={{
                  background: 'linear-gradient(145deg, #6d28d9 0%, #4c1d95 50%, #7c3aed 100%)',
                }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                  Total Visitors
                </p>
                <p className="mt-4 text-5xl sm:text-6xl font-extrabold tabular-nums count-pop">
                  <CountUp end={totalVisitors} />
                </p>
                <p className="mt-3 text-sm text-white/75">Trusted by investigators nationwide</p>
                <div className="mt-8 flex justify-center gap-3">
                  {['🔬', '🧬', '📋', '⚖️'].map((icon) => (
                    <span
                      key={icon}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg backdrop-blur-sm"
                    >
                      {icon}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
}
