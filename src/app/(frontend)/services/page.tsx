import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { resolveMediaUrl, richTextToPlain } from '@/lib/cms'
import type { Media, Scientist, Service, SiteSetting } from '@/payload-types'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { CountUp } from '@/components/ui/CountUp'
import { ContactForm } from '@/components/contact/ContactForm'

const CONTAINER = 'max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16'

const heroBg = 'https://www.figma.com/api/mcp/asset/f687555a-eb14-43e7-bcb9-cd2446819882'
const aboutImage = 'https://www.figma.com/api/mcp/asset/e7944166-77e9-4951-b26b-6b9f94d7b9a2'
const galleryImages = [
  'https://www.figma.com/api/mcp/asset/4c42ae20-cfcd-4d2a-96e1-bc17321dcca2',
  'https://www.figma.com/api/mcp/asset/7dec6922-f8ad-4b52-a009-324a572ca5b5',
  'https://www.figma.com/api/mcp/asset/15fda17c-7851-45c2-93fc-d1e48269eba9',
]

export default async function ServicesPage() {
  const payload = await getPayloadClient()

  const [services, scientists, siteData] = await Promise.all([
    payload.find({ collection: 'services', where: { published: { equals: true } }, sort: 'order', limit: 50, depth: 1 }),
    payload.find({ collection: 'scientists', where: { published: { equals: true } }, sort: 'order', limit: 4, depth: 1 }),
    payload.findGlobal({ slug: 'siteSettings' }),
  ])

  const site = siteData as SiteSetting
  const totalVisitors = site?.totalVisitors ?? 25847

  /* ── static lab capabilities ── */
  const labCapabilities = [
    { icon: '🔬', label: 'Laboratory Vision', desc: 'State-of-the-art forensic analysis labs equipped for real-case investigation workflows and evidence examination.' },
    { icon: '🧬', label: 'Sterilization', desc: 'ISO-compliant sterilization protocols ensuring chain of custody integrity and contamination-free processing.' },
  ]

  const labDirectors = [
    { name: 'Mr. Aborande', title: 'Lab Director I', initials: 'AR' },
    { name: 'Mr. Vijay', title: 'Lab Director II', initials: 'VJ' },
  ]

  const fallbackServices = [
    { id: 1, title: 'Crime Scene Investigation', slug: 'crime-scene', icon: '🕵️', desc: 'Systematic evidence collection, documentation, and analysis from complex crime scenes.', banner: galleryImages[0] },
    { id: 2, title: 'Forensic Photography', slug: 'photography', icon: '📷', desc: 'High-fidelity photographic documentation of physical evidence for court admissibility.', banner: galleryImages[1] },
    { id: 3, title: 'DNA Profiling', slug: 'dna', icon: '🧬', desc: 'Advanced biological profiling for victim identification and suspect elimination.', banner: galleryImages[2] },
  ]

  const catalogItems = services.docs.length > 0
    ? services.docs.map((s) => {
        const srv = s as Service
        return {
          id: srv.id,
          title: srv.title,
          slug: srv.slug,
          icon: '◈',
          desc: srv.excerpt || richTextToPlain(srv.content, 110),
          banner: resolveMediaUrl(srv.banner as number | Media | null | undefined, galleryImages[0]),
        }
      })
    : fallbackServices

  const professionalHits = [
    'Fingerprint Analysis & AFIS Matching',
    'Questioned Document Examination',
    'Digital & Cyber Forensics',
    'Ballistics & Firearms Identification',
    'Toxicology & Drug Analysis',
    'Forensic Odontology',
  ]

  const trainingItems = [
    { label: 'Online Training', status: 'Live' },
    { label: 'Lab-based Mentorship', status: 'Available' },
    { label: 'Online Internship', status: 'Open' },
    { label: 'Lab-based Internship', status: 'Available' },
    { label: 'Dissertation Support', status: 'Available' },
    { label: 'Research Articles', status: 'Rolling' },
  ]

  const fallbackScientists = [
    { name: 'Mr. Rakesh Mia', designation: 'Forensic Expert', bio: 'Specialized in analytical forensics and academic mentoring.', initials: 'RM' },
    { name: 'Mr. Vijay Kumar', designation: 'Investigation Specialist', bio: 'Crime scene workflows and documentation standards.', initials: 'VK' },
    { name: 'Dr. A. Sharma', designation: 'Forensic Pathologist', bio: 'Expert in post-mortem examination and cause of death analysis.', initials: 'AS' },
  ]

  return (
    <div className="bg-white">
      {/* ── 1. HERO ── */}
      <section
        className="relative overflow-hidden scanlines"
        style={{ background: 'linear-gradient(160deg,#0f0c2e 0%,#1a103c 40%,#2d1a5e 70%,#1e1354 100%)' }}
      >
        {/* animated orbs */}
        <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-violet-700/20 blur-3xl pointer-events-none float-soft" />
        <div className="absolute top-10 right-10 w-56 h-56 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none float-soft" style={{ animationDelay: '2s' }} />

        <div className={`${CONTAINER} relative py-16 lg:py-24 grid gap-10 lg:grid-cols-[1fr_420px] items-center`}>
          <div className="text-white">
            <span className="inline-flex rounded-full bg-violet-500/25 border border-violet-400/30 px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-violet-200 reveal-up">
              AFRS LABORATORY
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.1] tracking-tight reveal-up-d1">
              Future-Ready<br />
              <span className="text-violet-300">Forensic</span>
            </h1>
            <p className="mt-5 text-base text-white/75 leading-relaxed max-w-lg reveal-up-d2">
              AFSL delivers world-class forensic laboratory services — from crime scene investigation to digital evidence analysis — backed by ISO-compliant methodology and expert professionals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 reveal-up-d3">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-700 px-7 text-sm font-bold text-white shadow-lg shadow-violet-900/40 transition pulse-ring"
              >
                Consult an Expert →
              </Link>
              <Link
                href="#service-catalog"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/8 hover:bg-white/15 px-7 text-sm font-bold text-white transition"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* floating card */}
          <AnimateOnScroll direction="right" className="w-full">
            <div className="relative rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-4 shadow-2xl grad-border glow-hover">
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden">
                <Image src={heroBg} alt="AFRS Lab facility" fill priority sizes="420px" className="object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-3 -right-3 rounded-xl bg-orange-500 text-white px-3 py-1.5 text-xs font-bold shadow-lg">
                ISO Certified Lab
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 2. About the Lab ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className={CONTAINER}>
          <AnimateOnScroll>
            <div className="grid gap-8 lg:grid-cols-[1fr_340px] items-start">
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-7 sm:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-9 w-9 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold">✦</div>
                  <p className="text-sm font-bold text-slate-900">About AFSL Laboratory</p>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The Applied Forensic Science Laboratory (AFSL) is a specialized unit that bridges academic forensic research with industry-standard investigation techniques. Our facilities feature cutting-edge instruments for fingerprint analysis, digital evidence recovery, chemical toxicology, and biological profiling, all operated by certified forensic scientists.
                </p>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  With a commitment to evidence integrity and methodological rigor, AFSL also serves as a practical training hub for students and professionals seeking real-world forensic experience under expert supervision.
                </p>
              </div>
              <div className="space-y-4">
                {labCapabilities.map((cap) => (
                  <div key={cap.label} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm card-pop glow-hover">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{cap.icon}</span>
                      <p className="font-bold text-slate-900 text-sm">{cap.label}</p>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{cap.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 3. Lab Directors ── */}
      <section className="py-12 bg-slate-50/70">
        <div className={CONTAINER}>
          <AnimateOnScroll>
            <h2 className="text-2xl font-extrabold text-slate-900 text-center mb-10">Laboratory Directorate</h2>
          </AnimateOnScroll>
          <AnimateOnScroll stagger direction="scale">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {labDirectors.map((d) => (
                <div key={d.name} className="rounded-2xl border border-slate-100 bg-white p-7 text-center shadow-sm card-pop">
                  <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-violet-200">
                    {d.initials}
                  </div>
                  <p className="mt-4 font-extrabold text-slate-900">{d.name}</p>
                  <p className="text-xs font-semibold text-violet-600 mt-1">{d.title}</p>
                  <div className="mt-4 flex justify-center gap-2 flex-wrap">
                    {['LinkedIn', 'Email'].map((s) => (
                      <span key={s} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-500">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 4. Forensic Service Catalog ── */}
      <section id="service-catalog" className="py-16 lg:py-20 bg-white">
        <div className={CONTAINER}>
          <AnimateOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-[30px] font-extrabold text-slate-900">Forensic Service Catalog</h2>
              <p className="mt-3 text-slate-500">Professional forensic capabilities for investigation, education, and evidence reporting.</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalogItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/services/${item.slug}`}
                  className="group rounded-3xl border border-slate-100 bg-white overflow-hidden shadow-sm card-pop glow-hover"
                >
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    {item.banner ? (
                      <Image
                        src={item.banner}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-indigo-50" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-extrabold text-slate-900 group-hover:text-violet-600 transition-colors">{item.title}</h3>
                    {item.desc && <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-3">{item.desc}</p>}
                    <div className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-violet-600">
                      Explore Service <span aria-hidden>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 5. Expert Scientists ── */}
      <section className="py-16 lg:py-20 bg-slate-50/70">
        <div className={CONTAINER}>
          <AnimateOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-[30px] font-extrabold text-slate-900">AFSL Professional Hits</h2>
              <p className="mt-3 text-slate-500">Meet the forensic scientists and investigators behind AFRS's analytical excellence.</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(scientists.docs.length > 0 ? scientists.docs : fallbackScientists).map((sci, i) => {
                const s = sci as (typeof fallbackScientists)[0] | Scientist
                const photo = 'photo' in s ? resolveMediaUrl(s.photo as number | Media | null | undefined, '') : ''
                const initials = ('initials' in s ? (s as typeof fallbackScientists[0]).initials : null)
                  || (s.name?.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() ?? '??')

                return (
                  <div key={i} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm card-pop">
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                        {photo ? (
                          <Image src={photo} alt={s.name} width={56} height={56} className="h-full w-full object-cover" />
                        ) : initials}
                      </div>
                      <div>
                        <p className="font-extrabold text-slate-900">{s.name}</p>
                        <p className="text-xs font-semibold text-violet-600 mt-0.5">{s.designation}</p>
                        {s.bio && <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-3">{s.bio}</p>}
                      </div>
                    </div>
                    <div className="mt-5 flex gap-2">
                      {['View Profile', 'Contact'].map((a) => (
                        <span key={a} className="rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-[10px] font-bold text-slate-500 cursor-pointer hover:text-violet-600 transition">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </AnimateOnScroll>

          {/* professional hit tags */}
          <AnimateOnScroll className="mt-12">
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-900 mb-5">Specialisation Areas</h3>
              <div className="flex flex-wrap gap-3">
                {professionalHits.map((hit) => (
                  <span key={hit} className="rounded-full border border-violet-200 bg-violet-50 text-violet-700 px-4 py-2 text-sm font-semibold card-pop hover:bg-violet-100 transition cursor-default">
                    {hit}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 6. Training & Internship ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className={CONTAINER}>
          <div className="grid gap-8 lg:grid-cols-2">
            <AnimateOnScroll direction="left">
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-7 sm:p-10 h-full">
                <p className="text-xs font-bold text-violet-600 uppercase tracking-widest">TRAINING & INTERNSHIP</p>
                <h2 className="mt-3 text-2xl font-extrabold text-slate-900">AFSL Training &amp; Internship</h2>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  Structured practical exposure under forensic scientists. Choose from lab-based or remote options across all major forensic disciplines.
                </p>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trainingItems.map((t) => (
                    <li key={t.label} className="flex items-center justify-between rounded-xl bg-white border border-slate-100 px-4 py-3 text-sm card-pop">
                      <span className="font-semibold text-slate-800">{t.label}</span>
                      <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${
                        t.status === 'Live' ? 'bg-emerald-100 text-emerald-700'
                        : t.status === 'Open' ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-500'
                      }`}>{t.status}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/courses"
                  className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-700 text-white px-7 text-sm font-bold transition shadow-lg shadow-violet-200"
                >
                  Apply for Training
                </Link>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right">
              <div className="rounded-3xl bg-[#0f172a] text-white p-7 sm:p-10 h-full shadow-xl">
                <p className="text-xs font-bold text-violet-300 uppercase tracking-widest">RESOURCES & PROPOSALS</p>
                <h2 className="mt-3 text-2xl font-extrabold">Research &amp; Resources</h2>
                <p className="mt-4 text-white/75 text-sm leading-relaxed">
                  Download lab brochures, program guides, and forensic career resources. Submit research proposals for collaborative investigation opportunities.
                </p>
                <div className="mt-8 space-y-3">
                  {['Lab Brochure (PDF)', 'Program Guide 2026', 'Research Proposal Form', 'Internship Handbook'].map((r) => (
                    <Link
                      key={r}
                      href="/contact"
                      className="flex items-center justify-between rounded-xl bg-white/8 hover:bg-white/12 border border-white/10 px-5 py-3.5 text-sm transition card-pop group"
                    >
                      <span className="font-semibold">{r}</span>
                      <span className="text-violet-300 group-hover:translate-x-1 transition-transform">↓</span>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ── 7. Lab Intake / Inquiry Form ── */}
      <section className="py-16 lg:py-20 bg-slate-50/70">
        <div className={CONTAINER}>
          <AnimateOnScroll>
            <div className="text-center max-w-xl mx-auto mb-10">
              <p className="text-xs font-bold text-violet-600 uppercase tracking-widest">LABORATORY INTAKE</p>
              <h2 className="mt-3 text-2xl font-extrabold text-slate-900">Submit a Case Inquiry</h2>
              <p className="mt-3 text-slate-500">Our forensic team will review your inquiry and respond within 24 hours.</p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll>
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <ContactForm />

              <div className="space-y-5">
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <p className="font-bold text-slate-900 mb-4 text-sm">Find Us</p>
                  <div className="rounded-xl overflow-hidden h-52 bg-slate-100 relative">
                    {(site as SiteSetting & { mapEmbedUrl?: string })?.mapEmbedUrl ? (
                      <iframe
                        title="AFRS Lab location"
                        src={(site as SiteSetting & { mapEmbedUrl?: string }).mapEmbedUrl!}
                        loading="lazy"
                        className="w-full h-full border-0"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                        Map – configure in Site Settings
                      </div>
                    )}
                  </div>
                  <address className="mt-5 not-italic text-sm text-slate-600 space-y-2">
                    <p>{site?.address || '123, Forensic Lane, Vijay Nagar, Indore, Madhya Pradesh 452010'}</p>
                    <p className="font-semibold">{site?.phone || '+91-9926892487'}</p>
                    <p>{site?.email || 'afrlscience@gmail.com'}</p>
                  </address>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── 8. Visitor Counter ── */}
      <section
        className="py-10 text-white text-center"
        style={{ background: 'linear-gradient(90deg,#1d4ed8 0%,#6d28d9 100%)' }}
      >
        <div className={CONTAINER}>
          <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">TOTAL VISITORS</p>
          <p className="text-4xl sm:text-5xl font-extrabold">
            <CountUp end={totalVisitors} />
          </p>
        </div>
      </section>
    </div>
  )
}
