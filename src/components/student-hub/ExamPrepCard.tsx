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
    <article className="relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md card-pop sm:min-h-[280px] sm:p-8">
      <span
        className="absolute right-4 top-4 text-6xl opacity-[0.08] pointer-events-none select-none"
        aria-hidden
      >
        {exam.watermark}
      </span>
      <span className="inline-flex w-fit rounded-full bg-brand-400/20 border border-brand-300/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-200">
        {exam.badge}
      </span>
      <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-white">{exam.title}</h3>
      <p className="mt-1 text-sm font-semibold text-brand-300">{exam.subtitle}</p>
      <p className="mt-4 text-sm text-white/65 leading-relaxed flex-1">{exam.description}</p>
      <Link
        href={exam.href}
        className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-white hover:text-brand-200 transition"
      >
        {exam.ctaLabel} <span aria-hidden>→</span>
      </Link>
    </article>
  )
}


