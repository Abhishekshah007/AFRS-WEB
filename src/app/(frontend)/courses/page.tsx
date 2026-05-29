import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { formatEventDate, resolveMediaUrl } from '@/lib/cms'
import type { Event as AfrsEvent, Media } from '@/payload-types'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import { PageHero } from '@/components/marketing/PageHero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forensic Education & Training',
  description: 'Explore AFRS certificate programmes, short-term training, internships, and forensic workshops.',
}

const fallbackBanner = 'https://www.figma.com/api/mcp/asset/4c42ae20-cfcd-4d2a-96e1-bc17321dcca2'

const staticProgrammes = [
  {
    title: 'Certificate in Forensic Document Examination',
    duration: '3 months',
    mode: 'Hybrid',
    level: 'Beginner',
    icon: '📄',
    description: 'Covers handwriting, typeface, ink analysis, and alteration detection using standard forensic protocols.',
  },
  {
    title: 'Certificate in Digital Forensics',
    duration: '3 months',
    mode: 'Online',
    level: 'Intermediate',
    icon: '💻',
    description: 'Mobile device examination, hard drive imaging, network forensics, and legal aspects of digital evidence.',
  },
  {
    title: 'Certificate in Forensic Ballistics',
    duration: '2 months',
    mode: 'Offline',
    level: 'Intermediate',
    icon: '🔬',
    description: 'Firearm identification, wound pattern analysis, and trajectory reconstruction — practical lab sessions included.',
  },
  {
    title: 'Short-Term Internship Programme',
    duration: '4-6 weeks',
    mode: 'Offline',
    level: 'Open to all',
    icon: '🏛',
    description: 'Work directly in the AFSL laboratory under guidance of senior forensic scientists on real case material.',
  },
]

const levelColors: Record<string, string> = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-indigo-100 text-indigo-700',
  'Open to all': 'bg-orange-100 text-orange-700',
}

export default async function CoursesPage() {
  const payload = await getPayloadClient()

  const { docs: trainingEvents } = await payload.find({
    collection: 'events',
    where: {
      and: [
        { published: { equals: true } },
        { eventType: { equals: 'training' } },
        { startDate: { greater_than_equal: new Date().toISOString() } },
      ],
    },
    sort: 'startDate',
    limit: 6,
    depth: 1,
    overrideAccess: false,
  })

  return (
    <div>
      <PageHero
        eyebrow="FORENSIC EDUCATION"
        title="Programmes & Training"
        subtitle="Structured certificate programmes, short-term internships, and specialised workshops designed for students, professionals, and investigators."
        primaryCta={{ label: 'Browse Upcoming Events', href: '/events' }}
        secondaryCta={{ label: 'Contact Admissions', href: '/contact' }}
      />

      {/* Programmes grid */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          <AnimateOnScroll>
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Our Programmes</span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">Certificate Programmes & Internships</h2>
              <p className="mt-3 text-slate-500">Industry-aligned, practically-focused programmes developed in collaboration with forensic practitioners.</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {staticProgrammes.map((prog) => (
                <div key={prog.title} className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 card-pop">
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-2xl mb-4">
                    {prog.icon}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${levelColors[prog.level] ?? 'bg-slate-100 text-slate-600'}`}>
                      {prog.level}
                    </span>
                    <span className="rounded-full px-3 py-1 text-[10px] font-bold bg-slate-100 text-slate-600 capitalize">{prog.mode}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{prog.title}</h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">{prog.description}</p>
                  <p className="mt-4 text-xs font-bold text-indigo-600">Duration: {prog.duration}</p>
                  <Link
                    href="/contact"
                    className="mt-4 block text-center text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl py-2.5 transition"
                  >
                    Enquire →
                  </Link>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Live training events from CMS */}
      {trainingEvents.length > 0 && (
        <section className="py-14 bg-slate-50/70">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
            <AnimateOnScroll>
              <div className="max-w-2xl mb-10">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Live Schedule</span>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900">Upcoming Training Sessions</h2>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll stagger>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingEvents.map((item) => {
                  const evt = item as AfrsEvent
                  const banner = resolveMediaUrl(evt.banner as number | Media | null | undefined, fallbackBanner)
                  return (
                    <Link key={evt.id} href={`/events/${evt.slug}`} className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden card-pop group">
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={banner}
                          alt={evt.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-indigo-600 font-semibold">{formatEventDate(evt.startDate)}</p>
                        <h3 className="mt-1.5 font-extrabold text-slate-900 text-sm leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                          {evt.title}
                        </h3>
                        {evt.venue && <p className="mt-1 text-xs text-slate-400">📍 {evt.venue}</p>}
                        <span className="mt-3 inline-flex text-xs font-bold text-indigo-600">
                          View Details →
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </AnimateOnScroll>

            <div className="text-center mt-8">
              <Link href="/events" className="inline-flex h-12 items-center justify-center rounded-full border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-8 text-sm font-bold transition">
                View All Events
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-white">
        <AnimateOnScroll>
          <div className="max-w-3xl mx-auto text-center px-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Ready to Advance Your Forensic Career?</h2>
            <p className="mt-4 text-slate-500">Get in touch with our admissions team for guidance on the right programme for your goals.</p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 text-sm font-bold transition">
                Contact Admissions
              </Link>
              <Link href="/services" className="inline-flex h-12 items-center justify-center rounded-full border-2 border-slate-200 text-slate-700 hover:bg-slate-50 px-8 text-sm font-bold transition">
                Explore AFSL Lab Services
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </div>
  )
}
