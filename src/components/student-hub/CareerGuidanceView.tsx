import Link from 'next/link'
import { studentHubTokens } from '@/components/student-hub/tokens'
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll'

const pathways = [
  {
    title: 'Academic & Research Track',
    description:
      'Guidance for UGC NET, doctoral programmes, teaching careers, and research fellowships in forensic science.',
  },
  {
    title: 'Laboratory & Casework Track',
    description:
      'Mentorship for AFSL internships, crime-scene practice, report writing, and laboratory quality systems.',
  },
  {
    title: 'Digital & Emerging Forensics',
    description:
      'Support for cyber forensics, multimedia analysis, AI-assisted workflows, and industry placements.',
  },
]

const mentorshipFeatures = [
  'One-to-one mentor matching with forensic practitioners',
  'Career roadmaps for undergraduate and postgraduate students',
  'Internship and training placement counselling',
  'Interview, CV, and research-statement reviews',
  'Exam-focused mentoring for UGC NET and FACT',
  'Professional ethics and courtroom communication coaching',
]

export function CareerGuidanceView() {
  return (
    <div className="student-hub-page bg-white">
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -10%, #e8eaff 0%, #f5f6ff 40%, #ffffff 75%)',
          }}
        />
        <div className={`relative z-10 ${studentHubTokens.container} text-center`}>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 shadow-sm">
            Mentorship Programmes
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-[#111827]">Student </span>
            <span className="text-[#5B5FE8]">Career Guidance</span>
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-[15px] leading-relaxed text-slate-500">
            Explore career roadmaps, internship opportunities, and mentorship programmes designed for
            forensic science graduates, researchers, and early-career professionals.
          </p>
        </div>
      </section>

      <div className="border-b border-slate-100 bg-white">
        <div className={`${studentHubTokens.container} py-3 text-xs text-slate-500 flex gap-2 items-center`}>
          <Link href="/student-hub" className="hover:text-[var(--hub-primary)]">
            Student Hub
          </Link>
          <span aria-hidden>/</span>
          <span className="font-semibold text-slate-700">Career Guidance</span>
        </div>
      </div>

      <section className={`${studentHubTokens.sectionY} bg-white`}>
        <div className={studentHubTokens.container}>
          <AnimateOnScroll>
            <header className="max-w-2xl mb-10">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--hub-primary)]">
                How mentoring works
              </p>
              <h2 className={`mt-3 ${studentHubTokens.heading} text-2xl sm:text-3xl`}>
                Structured support from classroom to career
              </h2>
              <p className={`mt-3 ${studentHubTokens.body}`}>
                AFRS mentors help students choose specialisations, prepare for competitive exams, and
                build practical experience through AFSL laboratory exposure and professional networks.
              </p>
            </header>
          </AnimateOnScroll>

          <AnimateOnScroll stagger className="grid gap-6 md:grid-cols-3">
            {pathways.map((pathway) => (
              <article
                key={pathway.title}
                className={`${studentHubTokens.radiusCard} border border-slate-200 bg-[#F8FAFC] p-7 h-full`}
              >
                <h3 className="text-lg font-extrabold text-slate-900">{pathway.title}</h3>
                <p className={`mt-3 text-sm ${studentHubTokens.body}`}>{pathway.description}</p>
              </article>
            ))}
          </AnimateOnScroll>
        </div>
      </section>

      <section className={`${studentHubTokens.sectionY} bg-[var(--hub-navy)] text-white`}>
        <div className={`${studentHubTokens.container} grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center`}>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Learn about Mentorship Programs</h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xl">
              Join a guided programme that pairs you with forensic educators and practitioners. Mentors
              review your goals, recommend training pathways, and stay with you through internships and
              applications.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {mentorshipFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-white/85">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-300" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${studentHubTokens.radiusCard} bg-white/10 p-8 backdrop-blur`}>
            <h3 className="text-xl font-extrabold">Request mentorship counselling</h3>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">
              Tell us your current course, preferred forensic discipline, and career goal. Our student
              support team will share upcoming mentorship batches and internship openings.
            </p>
            <Link
              href="/contact"
              className={`mt-8 inline-flex h-12 items-center justify-center px-8 ${studentHubTokens.radiusCard} bg-white text-[var(--hub-navy)] text-sm font-bold hover:bg-indigo-50 transition`}
            >
              Contact Career Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
