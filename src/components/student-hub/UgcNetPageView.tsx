'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { CheckCircle2, Gavel } from 'lucide-react'
import { ExamPrepGalleryCarousel } from '@/components/student-hub/ExamPrepGalleryCarousel'
import { studentHubTokens } from '@/components/student-hub/tokens'
import type { GallerySlide } from '@/components/service-detail/types'
import type { UgcNetPageContent } from '@/components/student-hub/ugc-net/types'

type Achiever = {
  id: string
  name: string
  title: string
  photoUrl: string
}

type Props = {
  content: UgcNetPageContent
  achievers: Achiever[]
  gallerySlides?: GallerySlide[]
}

const floatTransition = {
  duration: 5,
  repeat: Infinity,
  repeatType: 'mirror' as const,
  ease: 'easeInOut' as const,
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <header className="max-w-3xl">
      {eyebrow && (
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-slate-900 sm:text-[34px]">
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-[15px] leading-relaxed ${studentHubTokens.body}`}>{description}</p>
      )}
    </header>
  )
}

export function UgcNetPageView({ content, achievers, gallerySlides = [] }: Props) {
  return (
    <>
      {/* ── HERO (unchanged layout) ── */}
      <section className="relative overflow-hidden bg-brand text-white">
        <motion.div
          animate={{ x: [-20, 20], y: [0, -25] }}
          transition={floatTransition}
          className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [20, -20], y: [0, 20] }}
          transition={{ ...floatTransition, duration: 6.5 }}
          className="absolute right-0 top-16 h-72 w-72 rounded-full bg-brand-900/30 blur-3xl"
        />

        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.9fr] md:py-16 lg:px-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white/90">
              {content.heroEyebrow}
            </p>
            <h1 className="mt-5 text-[28px] font-extrabold leading-[1.1] tracking-tight sm:text-[40px] lg:text-[52px] lg:leading-[1.05]">
              {content.heroTitlePrefix}{' '}
              <span className="text-cyan-300">{content.heroTitleHighlight}</span>
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85">
              {content.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#register"
                className="inline-flex h-11 items-center rounded-xl bg-white px-6 text-sm font-bold text-brand-700 shadow-lg shadow-brand-900/20 transition hover:bg-white/90"
              >
                {content.heroCtaLabel} →
              </Link>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ rotateX: 6, rotateY: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="rounded-2xl border border-white/20 bg-[#13306E] p-4 shadow-2xl sm:p-5"
          >
            <div className="relative h-[220px] overflow-hidden rounded-xl border border-white/10 bg-[#0a1628] sm:h-[300px]">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    'radial-gradient(ellipse at 60% 30%, rgba(80,100,180,0.45) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(30,50,120,0.6) 0%, transparent 60%)',
                }}
              />
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
                className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-[#0B1F4E]/90 p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.16em] text-blue-200">
                  {content.heroMetricEyebrow}
                </p>
                <p className="mt-1 text-2xl font-extrabold text-white">{content.heroMetricValue}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick navigation */}
      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className={`${studentHubTokens.container} overflow-x-auto py-3`}>
          <ul className="flex min-w-max items-center gap-2">
            {content.quickNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-600 transition hover:border-brand-200 hover:text-brand-700"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Overview */}
      <section id="overview" className={`${studentHubTokens.sectionY} bg-white`}>
        <div className={studentHubTokens.container}>
          <SectionHeading
            title={content.overviewTitle}
            description={content.overviewSubtitle}
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <p className={`text-[15px] leading-relaxed ${studentHubTokens.body}`}>
              {content.overviewDescription}
            </p>
            <p className={`text-[15px] leading-relaxed ${studentHubTokens.body}`}>
              {content.overviewBody}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className={`${studentHubTokens.sectionY} bg-slate-50`}>
        <div className={studentHubTokens.container}>
          <SectionHeading title={content.whyChooseTitle} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.whyChooseItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Programme Structure + Benefits */}
      <section id="course" className={`${studentHubTokens.sectionY} bg-white`}>
        <div className={studentHubTokens.container}>
          <SectionHeading title={content.programmeTitle} />
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-[var(--hub-surface)] p-6 sm:p-8">
              <h3 className="text-lg font-extrabold text-slate-900">{content.paperOneTitle}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${studentHubTokens.body}`}>
                {content.paperOneDescription}
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-[var(--hub-surface)] p-6 sm:p-8">
              <h3 className="text-lg font-extrabold text-slate-900">{content.paperTwoTitle}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${studentHubTokens.body}`}>
                {content.paperTwoDescription}
              </p>
            </article>
          </div>

          <div className="mt-14">
            <SectionHeading title={content.benefitsTitle} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {content.benefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <h4 className="text-sm font-extrabold text-slate-900">{benefit.title}</h4>
                  <p className={`mt-2 text-sm leading-relaxed ${studentHubTokens.body}`}>
                    {benefit.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Approach */}
      <section id="approach" className={`${studentHubTokens.sectionY} bg-[var(--hub-navy)] text-white`}>
        <div className={studentHubTokens.container}>
          <header className="max-w-3xl">
            <h2 className="text-[26px] font-extrabold tracking-tight sm:text-[34px]">
              {content.learningTitle}
            </h2>
          </header>
          <p className="mt-6 text-center text-sm font-bold uppercase tracking-[0.2em] text-brand-200">
            {content.learningFlow}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {content.learningSteps.map((step, index) => (
              <article
                key={step.label}
                className="rounded-xl border border-white/10 bg-white/5 p-5 text-center md:text-left"
              >
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-300">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-extrabold">{step.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join + Features */}
      <section className={`${studentHubTokens.sectionY} bg-white`}>
        <div className={studentHubTokens.container}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <SectionHeading title={content.audienceTitle} />
              <ul className="mt-8 space-y-3">
                {content.audienceItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-slate-700">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-slate-500">{content.audienceNote}</p>
            </div>

            <div id="features">
              <SectionHeading title={content.featuresTitle} />
              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {content.features.map((row, index) => (
                      <tr
                        key={row.feature}
                        className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
                      >
                        <th className="w-[40%] px-4 py-3 font-extrabold text-slate-900 sm:px-5">
                          {row.feature}
                        </th>
                        <td className={`px-4 py-3 sm:px-5 ${studentHubTokens.body}`}>
                          {row.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Batch Information */}
      <section id="batch" className={`${studentHubTokens.sectionY} bg-slate-50`}>
        <div className={studentHubTokens.container}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <SectionHeading title={content.batchTitle} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.batchDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    {detail.label}
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-900">{detail.value}</p>
                </div>
              ))}
            </div>
            <Link
              href="#register"
              className="mt-8 inline-flex h-11 items-center rounded-xl bg-brand-600 px-7 text-sm font-bold text-white transition hover:bg-brand-700"
            >
              {content.batchCtaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="register" className={`${studentHubTokens.sectionY} bg-white`}>
        <div className={`${studentHubTokens.container} grid gap-10 lg:grid-cols-2`}>
          <div>
            <SectionHeading title={content.registrationTitle} />
            <ol className="mt-8 space-y-4">
              {content.registrationSteps.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-extrabold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm font-medium text-slate-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl bg-[#0f1c38] p-8 text-white">
            <h3 className="text-xl font-extrabold">{content.bottomCtaTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{content.bottomCtaDescription}</p>
            <p className="mt-4 text-sm font-semibold text-brand-200">{content.bottomCtaTagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/courses/register"
                className="inline-flex h-11 items-center rounded-xl bg-white px-6 text-sm font-bold text-slate-900 transition hover:bg-brand-50"
              >
                {content.bottomCtaPrimaryLabel}
              </Link>
              <a
                href="#batch"
                className="inline-flex h-11 items-center rounded-xl border border-white/20 px-6 text-sm font-bold text-white transition hover:bg-white/10"
              >
                {content.bottomCtaSecondaryLabel}
              </a>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center rounded-xl border border-white/20 px-6 text-sm font-bold text-white transition hover:bg-white/10"
              >
                {content.bottomCtaContactLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section id="faculty" className={`${studentHubTokens.sectionY} bg-slate-50`}>
        <div className={studentHubTokens.container}>
          <SectionHeading
            title={content.facultyTitle}
            description={content.facultyDescription}
          />
        </div>
      </section>

      {/* Resources + Support */}
      <section id="resources" className={`${studentHubTokens.sectionY} bg-white`}>
        <div className={`${studentHubTokens.container} grid gap-10 lg:grid-cols-2`}>
          <div>
            <SectionHeading title={content.resourcesTitle} />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {content.resourceItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  <Gavel className="h-4 w-4 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand-100 bg-brand-50 p-8">
            <h3 className="text-xl font-extrabold text-slate-900">{content.supportTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{content.supportDescription}</p>
          </div>
        </div>
      </section>

      {/* Achievers */}
      <section className={`${studentHubTokens.container} py-14`}>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
          {content.achieversEyebrow}
        </p>
        <h2 className="mt-2 text-[26px] font-extrabold tracking-tight text-slate-900 sm:text-[36px]">
          {content.achieversTitle}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {achievers.map((achiever, idx) => (
            <motion.article
              key={achiever.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              whileHover={{ y: -8 }}
              className="relative min-h-[230px] cursor-pointer overflow-hidden rounded-xl bg-slate-900 text-white shadow-md"
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
              <div className="relative flex min-h-[230px] h-full items-end p-3">
                <div>
                  <p className="text-sm font-semibold leading-tight">{achiever.name}</p>
                  {achiever.title && (
                    <p className="mt-0.5 text-xs text-white/75">{achiever.title}</p>
                  )}
                </div>
              </div>
            </motion.article>
          ))}

          <motion.article
            whileHover={{ scale: 1.03 }}
            className="flex min-h-[230px] items-center justify-center rounded-xl bg-[#192B57] p-6 text-white shadow-md"
          >
            <div className="text-center">
              <p className="text-5xl font-extrabold">{content.statsValue}</p>
              <p className="mt-3 text-sm leading-snug text-white/75">{content.statsDescription}</p>
            </div>
          </motion.article>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className={`${studentHubTokens.sectionY} bg-slate-50`}>
        <div className={`${studentHubTokens.container} max-w-3xl`}>
          <SectionHeading title={content.faqTitle} />
          <div className="mt-8 space-y-3">
            {content.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-semibold text-slate-800">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-lg font-light text-brand-600 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ExamPrepGalleryCarousel slides={gallerySlides} />
    </>
  )
}
