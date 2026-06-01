'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'

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
}

const floatTransition = {
  duration: 5,
  repeat: Infinity,
  repeatType: 'mirror' as const,
  ease: 'easeInOut' as const,
}

export function UgcNetExperience({ achievers, featured, events }: Props) {
  return (
    <>
      <section className="bg-[#4E79F3] text-white relative overflow-hidden">
        <motion.div animate={{ x: [-20, 20], y: [0, -25] }} transition={floatTransition} className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        <motion.div animate={{ x: [20, -20], y: [0, 20] }} transition={{ ...floatTransition, duration: 6.5 }} className="absolute top-16 right-0 h-72 w-72 rounded-full bg-indigo-900/30 blur-3xl" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-14 lg:py-20 grid lg:grid-cols-[1.2fr_0.9fr] gap-10 items-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="inline-flex rounded-full bg-white/20 text-[11px] uppercase tracking-widest font-bold px-3 py-1">Your UGC NET Journey Starts Here</p>
            <h1 className="mt-5 text-4xl sm:text-5xl leading-[1.1] font-extrabold">Master UGC NET Forensic Science</h1>
            <p className="mt-5 text-white/90 max-w-xl leading-relaxed">Precision-engineered curriculum led by senior forensic scientists and top faculty. Achieve JR/F with India’s highest-rated forensic prep ecosystem.</p>
            <div className="mt-8 flex gap-3">
              <Link href="#events" className="h-11 px-6 rounded-xl bg-white text-indigo-700 text-sm font-bold inline-flex items-center shadow-lg shadow-indigo-900/20">Join Batch →</Link>
              <Link href="/contact" className="h-11 px-6 rounded-xl border border-white/40 text-white text-sm font-bold inline-flex items-center hover:bg-white/10 transition">Talk to Mentor</Link>
            </div>
          </motion.div>

          <motion.div whileHover={{ rotateX: 6, rotateY: -8, scale: 1.02 }} transition={{ type: 'spring', stiffness: 180, damping: 18 }} style={{ transformStyle: 'preserve-3d' }} className="rounded-2xl bg-[#13306E] border border-white/20 p-4 sm:p-5 shadow-2xl">
            <div className="rounded-xl h-[320px] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '40px 100%' }} />
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.6, repeat: Infinity }} className="absolute bottom-4 left-4 right-4 rounded-lg bg-[#0B1F4E]/90 border border-white/10 p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-blue-200">Upcoming Exam</p>
                <p className="mt-1 text-2xl font-extrabold">120 Days Remaining</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 py-14">
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 font-bold">The Hall of Fame</p>
        <h2 className="mt-2 text-4xl font-extrabold text-slate-900">Our Qualified Achievers</h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievers.map((achiever, idx) => (
            <motion.article key={achiever.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: idx * 0.04 }} whileHover={{ y: -8, rotateX: 4, rotateY: -4 }} style={{ transformStyle: 'preserve-3d' }} className="rounded-xl overflow-hidden bg-slate-900 text-white min-h-[230px] relative shadow-md">
              {achiever.photoUrl ? (
                <>
                  <Image src={achiever.photoUrl} alt={achiever.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-900 to-slate-950" />
                  <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,.25), transparent 45%)' }} />
                </>
              )}
              <div className="relative h-full flex items-end p-3">
                <div>
                  <p className="text-sm font-semibold">{achiever.name}</p>
                  {achiever.title && <p className="text-xs text-white/80 mt-0.5">{achiever.title}</p>}
                </div>
              </div>
            </motion.article>
          ))}
          <motion.article whileHover={{ scale: 1.03 }} className="rounded-xl bg-[#192B57] text-white min-h-[230px] flex items-center justify-center p-6 shadow-md">
            <div className="text-center">
              <p className="text-4xl font-extrabold">2+</p>
              <p className="text-sm text-white/80 mt-2">Batches every year with consistent results</p>
            </div>
          </motion.article>
        </div>
      </section>

      <section id="events" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 pb-16">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl bg-gradient-to-r from-[#4a556f] to-[#3f4a62] text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-indigo-200">All-India Mock Test Series</p>
              <p className="mt-3 max-w-2xl text-white/90">Join our upcoming exam-focused workshops and mock events. Register from the event card and confirm your seat instantly.</p>

              {featured ? (
                <div className="mt-5 flex flex-wrap gap-5 text-sm">
                  <span>{featured.startDateLabel}</span>
                  {featured.startTime && <span>{featured.startTime}</span>}
                  {featured.venue && <span>{featured.venue}</span>}
                </div>
              ) : (
                <p className="mt-5 text-sm text-white/70">New events will be published shortly.</p>
              )}
            </div>
            {featured && (
              <Link href={featured.registrationOpen === false ? `/events/${featured.slug}` : `/events/${featured.slug}/register`} className="h-11 px-6 rounded-xl bg-white text-slate-900 text-sm font-bold inline-flex items-center shrink-0">Register for Test →</Link>
            )}
          </div>

          {events.length > 0 && (
            <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {events.map((event) => (
                <motion.article key={event.id} whileHover={{ y: -6 }} className="rounded-xl bg-white/10 border border-white/20 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-indigo-100">{event.eventType || 'Event'}</p>
                  <h3 className="mt-2 font-bold leading-snug">{event.title}</h3>
                  <p className="mt-2 text-xs text-white/80">{event.startDateLabel}</p>
                  <Link href={event.registrationOpen === false ? `/events/${event.slug}` : `/events/${event.slug}/register`} className="mt-4 inline-flex text-xs font-bold text-white">View / Register →</Link>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </>
  )
}
