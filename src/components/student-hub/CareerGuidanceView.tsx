import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, Compass, GraduationCap, Microscope } from 'lucide-react'
import { studentHubTokens } from '@/components/student-hub/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'
import type { CareerGuidancePageContent } from '@/components/student-hub/career-guidance/types'

type Props = {
  content: CareerGuidancePageContent
}

function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <header className="max-w-3xl">
      <h2 className={`text-2xl sm:text-3xl ${studentHubTokens.heading}`}>{title}</h2>
      {description && (
        <p className={`mt-4 text-[15px] leading-relaxed ${studentHubTokens.body}`}>{description}</p>
      )}
    </header>
  )
}

function CtaLink({
  href,
  label,
  variant = 'primary',
}: {
  href: string
  label: string
  variant?: 'primary' | 'secondary' | 'light' | 'ghost'
}) {
  const className =
    variant === 'primary'
      ? 'inline-flex h-11 items-center rounded-xl bg-brand-600 px-6 text-sm font-bold text-white transition hover:bg-brand-700'
      : variant === 'light'
        ? 'inline-flex h-11 items-center rounded-xl bg-white px-6 text-sm font-bold text-slate-900 transition hover:bg-brand-50'
        : variant === 'ghost'
          ? 'inline-flex h-11 items-center rounded-xl border border-white/20 px-6 text-sm font-bold text-white transition hover:bg-white/10'
          : 'inline-flex h-11 items-center rounded-xl border border-slate-200 px-6 text-sm font-bold text-slate-700 transition hover:border-brand-200 hover:text-brand-700'

  if (href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}

function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function CareerGuidanceView({ content }: Props) {
  return (
    <div className="student-hub-page bg-white">
      <section className="hub-hero-glow career-hero">
        <div className={`relative z-10 ${studentHubTokens.container}`}>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:gap-20">
            <div className="career-hero-copy">
              <span className="inline-flex items-center rounded-full border border-[var(--hub-primary)]/20 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--hub-primary)] shadow-sm backdrop-blur">
                {content.heroEyebrow}
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-[var(--hub-text)] sm:text-5xl lg:text-[clamp(3rem,5vw,4.5rem)]">
                {content.heroTitle}{' '}
                <span className="text-[var(--hub-primary)]">{content.heroHighlight}</span>
              </h1>
              <div className="mt-7 max-w-2xl space-y-4 text-[15px] leading-[1.8] text-slate-600">
                <p>{content.heroDescription}</p>
                <p>{content.heroBody}</p>
              </div>
              <p className="mt-5 max-w-xl border-l-2 border-[var(--hub-primary)]/40 pl-4 text-sm font-semibold leading-relaxed text-slate-700">
                {content.heroNote}
              </p>
              <div className="mt-8">
                <CtaLink href={content.heroCtaHref} label={content.heroCtaLabel} />
              </div>
            </div>

            <div className="career-hero-panel relative mx-auto w-full max-w-[430px] lg:mr-0">
              <div className="career-hero-panel-grid" aria-hidden />
              <div className="relative z-10 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--hub-primary)]">
                      Your pathway
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--hub-text)]">
                      Learn with direction.
                    </h2>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--hub-primary)] text-white shadow-lg shadow-[var(--hub-primary)]/20">
                    <Compass className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <div className="mt-8 space-y-3">
                  <div className="career-path-step">
                    <span className="career-path-icon">
                      <GraduationCap className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <strong>Academic foundation</strong>
                      <small>Choose the right direction</small>
                    </span>
                    <ArrowUpRight
                      className="ml-auto h-4 w-4 text-[var(--hub-primary)]"
                      aria-hidden
                    />
                  </div>
                  <div className="career-path-step">
                    <span className="career-path-icon">
                      <Microscope className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <strong>Practical skills</strong>
                      <small>Build confidence through practice</small>
                    </span>
                    <ArrowUpRight
                      className="ml-auto h-4 w-4 text-[var(--hub-primary)]"
                      aria-hidden
                    />
                  </div>
                  <div className="career-path-step career-path-step-active">
                    <span className="career-path-icon">
                      <Compass className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <strong>Professional growth</strong>
                      <small>Plan your next opportunity</small>
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 text-white" aria-hidden />
                  </div>
                </div>
                <div className="mt-7 flex items-center gap-3 border-t border-slate-200 pt-5 text-xs font-semibold text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                  Structured guidance for every stage
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-slate-100 bg-white">
        <div
          className={`${studentHubTokens.container} flex items-center gap-2 py-3 text-xs text-slate-500`}
        >
          <Link href="/student-hub" className="hover:text-[var(--hub-primary)]">
            Student Hub
          </Link>
          <span aria-hidden>/</span>
          <span className="font-semibold text-slate-700">Career Guidance</span>
        </div>
      </div>

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

      <section id="careers" className={`${studentHubTokens.sectionY} bg-white`}>
        <div className={studentHubTokens.container}>
          <AnimateOnScroll>
            <SectionHeading title={content.careersTitle} description={content.careersDescription} />
          </AnimateOnScroll>
          <ChipList items={content.careerPathways} />
          <div className="mt-8">
            <CtaLink
              href={content.careersCtaHref}
              label={`${content.careersCtaLabel} →`}
              variant="secondary"
            />
          </div>
        </div>
      </section>

      <section id="specialisations" className={`${studentHubTokens.sectionY} bg-slate-50`}>
        <div className={studentHubTokens.container}>
          <SectionHeading
            title={content.specialisationTitle}
            description={content.specialisationDescription}
          />
          <ChipList items={content.specialisations} />
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink
              href={content.specialisationPrimaryCtaHref}
              label={content.specialisationPrimaryCtaLabel}
            />
            <CtaLink
              href={content.specialisationSecondaryCtaHref}
              label={content.specialisationSecondaryCtaLabel}
              variant="secondary"
            />
          </div>
        </div>
      </section>

      <section id="academic" className={`${studentHubTokens.sectionY} bg-white`}>
        <div className={studentHubTokens.container}>
          <SectionHeading title={content.academicTitle} description={content.academicDescription} />
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.academicSteps.map((step, index) => (
              <li
                key={step}
                className="rounded-2xl border border-slate-200 bg-[var(--hub-surface)] p-6"
              >
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-600">
                  Step {index + 1}
                </p>
                <p className="mt-2 text-base font-extrabold text-slate-900">{step}</p>
              </li>
            ))}
          </ol>
          <p className={`mt-6 text-sm ${studentHubTokens.body}`}>{content.academicNote}</p>
        </div>
      </section>

      <section id="skills" className={`${studentHubTokens.sectionY} bg-slate-50`}>
        <div className={studentHubTokens.container}>
          <SectionHeading title={content.skillsTitle} description={content.skillsIntro} />
          <p className={`mt-6 text-sm font-semibold text-slate-700`}>{content.skillsDescription}</p>
          <ChipList items={content.skills} />
          <div className="mt-8">
            <CtaLink href={content.skillsCtaHref} label={content.skillsCtaLabel} />
          </div>
        </div>
      </section>

      <section id="internships" className={`${studentHubTokens.sectionY} bg-white`}>
        <div className={studentHubTokens.container}>
          <SectionHeading title={content.internshipsTitle} description={content.internshipsIntro} />
          <p className={`mt-6 text-sm font-semibold text-slate-700`}>
            {content.internshipsDescription}
          </p>
          <ChipList items={content.internships} />
          <p className={`mt-6 text-sm ${studentHubTokens.body}`}>{content.internshipsNote}</p>
          <div className="mt-8">
            <CtaLink href={content.internshipsCtaHref} label={content.internshipsCtaLabel} />
          </div>
        </div>
      </section>

      <section id="exams" className={`${studentHubTokens.sectionY} bg-slate-50`}>
        <div className={studentHubTokens.container}>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading title={content.examsTitle} description={content.examsDescription} />
              <ul className="mt-8 space-y-3">
                {content.exams.map((exam) => (
                  <li key={exam} className="flex gap-3 text-sm text-slate-700">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                    {exam}
                  </li>
                ))}
              </ul>
              <p className={`mt-6 text-sm ${studentHubTokens.body}`}>{content.examsNote}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {content.examLinks.map((link) => (
                  <CtaLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    variant="secondary"
                  />
                ))}
              </div>
            </div>

            <div id="research">
              <SectionHeading
                title={content.researchTitle}
                description={content.researchDescription}
              />
              <ChipList items={content.researchItems} />
              <div className="mt-8">
                <CtaLink href={content.researchCtaHref} label={content.researchCtaLabel} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${studentHubTokens.sectionY} bg-white`}>
        <div className={studentHubTokens.container}>
          <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6 sm:p-10">
            <SectionHeading title={content.finderTitle} description={content.finderIntro} />
            <p className={`mt-4 max-w-3xl text-[15px] leading-relaxed ${studentHubTokens.body}`}>
              {content.finderDescription}
            </p>
            <p className="mt-8 text-center text-sm font-bold uppercase tracking-[0.12em] text-brand-700">
              {content.finderFormula}
            </p>
            <p className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
              Recommended Learning & Development Pathway
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-xs leading-relaxed text-slate-500">
              {content.finderDisclaimer}
            </p>
          </div>
        </div>
      </section>

      <section
        id="guidance"
        className={`${studentHubTokens.sectionY} bg-[var(--hub-navy)] text-white`}
      >
        <div
          className={`${studentHubTokens.container} grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start`}
        >
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">{content.consultationTitle}</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
              {content.consultationDescription}
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {content.consultationTopics.map((topic) => (
                <li key={topic} className="flex gap-3 text-sm text-white/85">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-300" aria-hidden />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${studentHubTokens.radiusCard} bg-white/10 p-8 backdrop-blur`}>
            <h3 className="text-xl font-extrabold">Book a session</h3>
            <dl className="mt-6 space-y-4">
              {content.consultationDetails.map((detail) => (
                <div key={detail.label}>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
                    {detail.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-white">{detail.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <CtaLink
                href={content.consultationCtaHref}
                label={content.consultationCtaLabel}
                variant="light"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${studentHubTokens.sectionY} bg-white`}>
        <div className={studentHubTokens.container}>
          <SectionHeading title={content.journeyTitle} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.journeySteps.map((step, index) => (
              <article
                key={step.label}
                className="rounded-2xl border border-slate-200 bg-[var(--hub-surface)] p-5"
              >
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-600">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 text-lg font-extrabold text-slate-900">{step.label}</h3>
                <p className={`mt-2 text-sm ${studentHubTokens.body}`}>{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${studentHubTokens.sectionY} bg-slate-50`}>
        <div className={studentHubTokens.container}>
          <SectionHeading
            title={content.resourcesTitle}
            description={content.resourcesDescription}
          />
          <ChipList items={content.resources} />
          <div className="mt-8">
            <CtaLink href={content.resourcesCtaHref} label={content.resourcesCtaLabel} />
          </div>
        </div>
      </section>

      <section id="faqs" className={`${studentHubTokens.sectionY} bg-white`}>
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

      <section id="book" className={`${studentHubTokens.sectionY} bg-[var(--hub-navy)] text-white`}>
        <div className={`${studentHubTokens.container} text-center`}>
          <h2 className="text-2xl font-extrabold sm:text-3xl">{content.bottomCtaTitle}</h2>
          <p className="mt-4 text-sm font-semibold text-brand-200">{content.bottomCtaIntro}</p>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/70">
            Let AFRS help you plan your next step in Forensic Science.{' '}
            {content.bottomCtaDescription}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {content.bottomCtas.map((cta, index) => (
              <CtaLink
                key={`${cta.href}-${cta.label}`}
                href={cta.href}
                label={cta.label}
                variant={index === 0 ? 'light' : 'ghost'}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-8">
        <div className={studentHubTokens.container}>
          <p className="text-xs leading-relaxed text-slate-500">{content.disclaimer}</p>
        </div>
      </section>
    </div>
  )
}
