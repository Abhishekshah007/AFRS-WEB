'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Monitor, Building2, CheckCircle2 } from 'lucide-react'

type Achiever = {
  id: string
  name: string
  title: string
  photoUrl: string
}

type EventCard = {
  id: number | string
  slug: string
  title: string
  eventType?: string | null
  startDateLabel: string
  registrationOpen?: boolean | null
}

type Props = {
  achievers: Achiever[]
  featured: {
    slug: string
    startDateLabel: string
    startTime?: string | null
    venue?: string | null
    registrationOpen?: boolean | null
  } | null
  events: EventCard[]
  content?: Partial<UgcNetExperienceContent>
}

const floatTransition = {
  duration: 5,
  repeat: Infinity,
  repeatType: 'mirror' as const,
  ease: 'easeInOut' as const,
}

const onlineFeatures = [
  'Interactive Q&A Sessions',
  '24/7 Access to Digital Library',
  'AI-Powered Performance Tracking',
  'Weekly E-Reports for Parents/Self',
]

const offlineFeatures = [
  'Face-to-Face Faculty Interaction',
  'In-person Doubt Clearing Camps',
  'Printed High-Yield Study Modules',
  'Simulated Exam Center Experience',
]

type UgcNetExperienceContent = {
  heroEyebrow: string
  heroTitlePrefix: string
  heroTitleHighlight: string
  heroDescription: string
  heroCtaLabel: string
  heroMetricEyebrow: string
  heroMetricValue: string
  achieversEyebrow: string
  achieversTitle: string
  statsValue: string
  statsDescription: string
  ecosystemEyebrow: string
  ecosystemTitle: string
  onlineTitle: string
  onlineDescription: string
  onlineCtaLabel: string
  offlineTitle: string
  offlineDescription: string
  offlineCtaLabel: string
  eventTitle: string
  eventDescription: string
  eventDateLabel: string
  eventTimeLabel: string
  eventVenueLabel: string
  eventCtaLabel: string
  emptyEventText: string
}

const defaultContent: UgcNetExperienceContent = {
  heroEyebrow: 'Providing Knowledge Since 2022',
  heroTitlePrefix: 'Master Paper 1 & 2 of',
  heroTitleHighlight: 'UGC NET Forensic Science',
  heroDescription:
    'Join our expert-led online and offline training programs, mock tests, and personalized guidance for forensic science aspirants.',
  heroCtaLabel: 'Join Batch',
  heroMetricEyebrow: 'Upcoming Exam',
  heroMetricValue: '120 Days Remaining',
  achieversEyebrow: 'The Hall of Fame',
  achieversTitle: 'Our Qualified Achievers',
  statsValue: '2+',
  statsDescription: 'Batches every year with consistent results',
  ecosystemEyebrow: 'Choose Your Path',
  ecosystemTitle: 'Hybrid Learning Ecosystem',
  onlineTitle: 'Online Live Classes',
  onlineDescription:
    'Access world-class forensic coaching from anywhere with interactive live sessions with recorded backups.',
  onlineCtaLabel: 'Enroll Online',
  offlineTitle: 'Offline Classroom Program',
  offlineDescription:
    'Immersive face-to-face instruction at our state-of-the-art Delhi & Chandigarh centers.',
  offlineCtaLabel: 'Visit Center',
  eventTitle: 'All-India Mock Test Series',
  eventDescription:
    'The ultimate diagnostic tool. Mirroring the exact difficulty and interface of the NTA UGC NET exam. Join 10k+ aspirants this Sunday.',
  eventDateLabel: 'Next Test Date',
  eventTimeLabel: 'Standard Time',
  eventVenueLabel: 'Venue',
  eventCtaLabel: 'Register for Test',
  emptyEventText: 'New events will be published shortly.',
}

export function UgcNetExperience({ achievers, featured, events: _events, content }: Props) {
  const page = { ...defaultContent, ...content }

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-brand text-white relative overflow-hidden">
        <motion.div
          animate={{ x: [-20, 20], y: [0, -25] }}
          transition={floatTransition}
          className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-brand-200/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [20, -20], y: [0, 20] }}
          transition={{ ...floatTransition, duration: 6.5 }}
          className="absolute top-16 right-0 h-72 w-72 rounded-full bg-brand-900/30 blur-3xl"
        />

        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.9fr] md:py-16 lg:px-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow — matches screenshot exactly */}
            <p className="inline-flex rounded-full border border-white/30 bg-white/15 text-[11px] uppercase tracking-widest font-bold px-4 py-1.5 text-white/90">
              {page.heroEyebrow}
            </p>

            <h1 className="mt-5 text-[28px] leading-[1.1] font-extrabold tracking-tight sm:text-[40px] lg:text-[52px] lg:leading-[1.05]">
              {page.heroTitlePrefix}{' '}
              <span className="text-brand-200"> {page.heroTitleHighlight}</span>
            </h1>
            <p className="mt-5 text-white/85 max-w-xl leading-relaxed text-[15px]">
              {page.heroDescription}
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link
                href="#events"
                className="h-11 px-6 rounded-xl bg-white text-brand-700 text-sm font-bold inline-flex items-center shadow-lg shadow-brand-900/20 hover:bg-white/90 transition"
              >
                {page.heroCtaLabel} →
              </Link>
            </div>
          </motion.div>

          {/* Hero card — dark with real image feel */}
          <motion.div
            whileHover={{ rotateX: 6, rotateY: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="rounded-2xl bg-[#13306E] border border-white/20 p-4 sm:p-5 shadow-2xl"
          >
            <div className="relative h-[220px] overflow-hidden rounded-xl border border-white/10 bg-[#0a1628] sm:h-[300px]">
              {/* Dark overlay pattern simulating lab microscope image */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    'radial-gradient(ellipse at 60% 30%, rgba(80,100,180,0.45) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(30,50,120,0.6) 0%, transparent 60%)',
                }}
              />
              {/* Subtle grid lines */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.6, repeat: Infinity }}
                className="absolute bottom-4 left-4 right-4 rounded-lg bg-[#0B1F4E]/90 border border-white/10 p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.16em] text-blue-200">
                  {page.heroMetricEyebrow}
                </p>
                <p className="mt-1 text-2xl font-extrabold text-white">{page.heroMetricValue}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ACHIEVERS ── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-14">
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-bold">
          {page.achieversEyebrow}
        </p>
        <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-slate-900 sm:text-[36px]">
          {page.achieversTitle}
        </h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievers.map((achiever, idx) => (
            <motion.article
              key={achiever.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              whileHover={{ y: -8 }}
              className="rounded-xl overflow-hidden bg-slate-900 text-white min-h-[230px] relative shadow-md cursor-pointer"
            >
              {achiever.photoUrl ? (
                <>
                  <Image
                    src={achiever.photoUrl}
                    alt={achiever.name}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-900 to-slate-950" />
              )}
              <div className="relative h-full flex items-end p-3 min-h-[230px]">
                <div>
                  <p className="text-sm font-semibold leading-tight">{achiever.name}</p>
                  {achiever.title && (
                    <p className="text-xs text-white/75 mt-0.5">{achiever.title}</p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}

          {/* Stats card */}
          <motion.article
            whileHover={{ scale: 1.03 }}
            className="rounded-xl bg-[#192B57] text-white min-h-[230px] flex items-center justify-center p-6 shadow-md"
          >
            <div className="text-center">
              <p className="text-5xl font-extrabold">{page.statsValue}</p>
              <p className="text-sm text-white/75 mt-3 leading-snug">{page.statsDescription}</p>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ── HYBRID LEARNING ECOSYSTEM ── (was missing entirely) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pb-16">
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-bold">
            {page.ecosystemEyebrow}
          </p>
          <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-slate-900 sm:text-[34px]">
            {page.ecosystemTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Online card */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="rounded-2xl bg-[#0f1c38] p-6 text-white shadow-xl sm:p-8"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 mb-6">
              <Monitor className="h-5 w-5 text-blue-300" />
            </div>
            <h3 className="text-[20px] font-extrabold mb-3">{page.onlineTitle}</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-6">{page.onlineDescription}</p>
            <ul className="space-y-2.5 mb-8">
              {onlineFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/80">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-bold text-blue-300 hover:text-white transition"
            >
              {page.onlineCtaLabel} →
            </Link>
          </motion.div>

          {/* Offline card */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="rounded-2xl bg-[#0f1c38] p-6 text-white shadow-xl sm:p-8"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 mb-6">
              <Building2 className="h-5 w-5 text-blue-300" />
            </div>
            <h3 className="text-[20px] font-extrabold mb-3">{page.offlineTitle}</h3>
            <p className="text-white/65 text-sm leading-relaxed mb-6">{page.offlineDescription}</p>
            <ul className="space-y-2.5 mb-8">
              {offlineFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-white/80">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center text-sm font-bold text-blue-300 hover:text-white transition"
            >
              {page.offlineCtaLabel} →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── EVENTS / MOCK TEST ── */}
      {/* ── EVENTS / MOCK TEST ── */}
      <section id="events" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 text-white shadow-xl sm:p-10"
          style={{
            background: 'linear-gradient(135deg, #2e3a52 0%, #3a4560 50%, #2c3a58 100%)',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-8">
            {/* Left content */}
            <div className="flex-1 min-w-0">
              {/* Heading with clock icon inline */}
              <div className="flex items-center gap-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" d="M12 6v6l3.5 2" />
                </svg>
                <h2 className="text-[22px] sm:text-[26px] font-extrabold tracking-tight text-white">
                  {page.eventTitle}
                </h2>
              </div>

              <p className="text-[14px] text-white/60 leading-relaxed max-w-lg">
                {page.eventDescription}
              </p>

              {/* Date + Time labels */}
              {featured ? (
                <div className="mt-7 flex flex-wrap gap-10">
                  <div>
                    <p className="text-[22px] sm:text-[26px] font-extrabold text-white leading-none">
                      {featured.startDateLabel}
                    </p>
                    <p className="mt-1.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-white/40">
                      {page.eventDateLabel}
                    </p>
                  </div>
                  {featured.startTime && (
                    <div>
                      <p className="text-[22px] sm:text-[26px] font-extrabold text-white leading-none">
                        {featured.startTime}
                      </p>
                      <p className="mt-1.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-white/40">
                        {page.eventTimeLabel}
                      </p>
                    </div>
                  )}
                  {featured.venue && (
                    <div>
                      <p className="text-[22px] sm:text-[26px] font-extrabold text-white leading-none">
                        {featured.venue}
                      </p>
                      <p className="mt-1.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-white/40">
                        {page.eventVenueLabel}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-5 text-sm text-white/50">{page.emptyEventText}</p>
              )}
            </div>

            {/* Register button */}
            {featured && (
              <Link
                href={
                  featured.registrationOpen === false
                    ? `/events/${featured.slug}`
                    : `/events/${featured.slug}/register`
                }
                className="shrink-0 inline-flex items-center gap-3 rounded-xl bg-white/95 hover:bg-white px-7 h-[52px] text-[13px] font-bold text-slate-800 shadow-lg transition-all hover:shadow-xl"
              >
                {page.eventCtaLabel}
                {/* Dots/grid icon matching screenshot */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-slate-500"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <circle cx="3" cy="3" r="1.5" />
                  <circle cx="8" cy="3" r="1.5" />
                  <circle cx="13" cy="3" r="1.5" />
                  <circle cx="3" cy="8" r="1.5" />
                  <circle cx="8" cy="8" r="1.5" />
                  <circle cx="13" cy="8" r="1.5" />
                  <circle cx="3" cy="13" r="1.5" />
                  <circle cx="8" cy="13" r="1.5" />
                  <circle cx="13" cy="13" r="1.5" />
                </svg>
              </Link>
            )}
          </div>

          {/* Event sub-cards — only if there are more events
          {events.length > 1 && (
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 border-t border-white/10 pt-7">
              {events.map((event) => (
                <motion.article
                  key={event.id}
                  whileHover={{ y: -4 }}
                  className="rounded-xl bg-white/8 border border-white/10 p-4"
                >
                  <p className="text-[10px] uppercase tracking-wider text-blue-300 font-extrabold">
                    {event.eventType || 'Event'}
                  </p>
                  <h3 className="mt-2 font-bold leading-snug text-sm text-white">{event.title}</h3>
                  <p className="mt-2 text-xs text-white/55">{event.startDateLabel}</p>
                  <Link
                    href={
                      event.registrationOpen === false
                        ? `/events/${event.slug}`
                        : `/events/${event.slug}/register`
                    }
                    className="mt-4 inline-flex text-xs font-bold text-white/80 hover:text-white transition"
                  >
                    View / Register →
                  </Link>
                </motion.article>
              ))}
            </div>
          )} */}
        </motion.div>
      </section>
    </>
  )
}
