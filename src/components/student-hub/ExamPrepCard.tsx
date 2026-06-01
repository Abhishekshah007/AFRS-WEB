import Link from 'next/link'
import type { ExamPrepCardData } from '@/components/student-hub/types'

export type ExamPrepCardProps = {
  exam: ExamPrepCardData
}

/**
 * Glass-style exam preparation card for the dark excellence section.
 */
export function ExamPrepCard({ exam }: ExamPrepCardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 sm:p-8 card-pop min-h-[280px] flex flex-col">
      <span
        className="absolute right-4 top-4 text-6xl opacity-[0.08] pointer-events-none select-none"
        aria-hidden
      >
        {exam.watermark}
      </span>
      <span className="inline-flex w-fit rounded-full bg-indigo-400/20 border border-indigo-300/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-200">
        {exam.badge}
      </span>
      <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-white">{exam.title}</h3>
      <p className="mt-1 text-sm font-semibold text-indigo-300">{exam.subtitle}</p>
      <p className="mt-4 text-sm text-white/65 leading-relaxed flex-1">{exam.description}</p>
      <Link
        href={exam.id === 'ugc-net' ? '/student-hub/ugc-net' : exam.href}
        className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-white hover:text-indigo-200 transition"
      >
        {exam.ctaLabel} <span aria-hidden>→</span>
      </Link>
    </article>
  )
}


