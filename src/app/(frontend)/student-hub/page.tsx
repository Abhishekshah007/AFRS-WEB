import { PageHero } from '@/components/marketing/PageHero'
import Link from 'next/link'

export default function StudentHubPage() {
  return (
    <div>
      <PageHero
        eyebrow="STUDENT CORNER"
        title="Student Resource Hub"
        subtitle="Access a comprehensive collection of forensic learning materials, research papers, and career guidance."
        primaryCta={{ label: 'Explore Articles', href: '/articles' }}
        secondaryCta={{ label: 'Browse Courses', href: '/courses' }}
      />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8 card-pop">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Academic Resources</p>
              <h2 className="mt-3 text-2xl font-extrabold text-slate-900">Learn faster, practice smarter</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Curated content for forensic students: articles, papers, case studies, and practical learning modules.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-4">
                {[
                  ['Articles', '/articles'],
                  ['Research Papers', '/research'],
                  ['Case Studies', '/articles'],
                  ['E-Library', '/student-hub'],
                ].map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="rounded-2xl bg-white border border-slate-100 p-4 text-sm font-bold text-slate-800 hover:text-indigo-600 transition card-pop"
                  >
                    {label} →
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#0f172a] p-8 text-white card-pop">
              <p className="text-xs font-bold uppercase tracking-wider text-white/70">Exam Excellence</p>
              <h2 className="mt-3 text-2xl font-extrabold">UGC NET (Forensic Science)</h2>
              <p className="mt-3 text-white/80 leading-relaxed">
                Structured preparation: mock tests, topic lists, and guided study plans.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 border border-white/15 p-5">
                  <p className="font-bold">Mock Test Series</p>
                  <p className="mt-2 text-sm text-white/75">Timed tests + performance insights.</p>
                </div>
                <div className="rounded-2xl bg-white/10 border border-white/15 p-5">
                  <p className="font-bold">Career Guidance</p>
                  <p className="mt-2 text-sm text-white/75">Roadmaps, internships, and roles.</p>
                </div>
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 px-7 text-sm font-bold transition"
              >
                Talk to a Mentor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

