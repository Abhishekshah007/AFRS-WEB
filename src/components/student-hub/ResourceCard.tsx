import Link from 'next/link'
import type { ResourceCardData } from '@/components/student-hub/types'
import { resolveIcon } from '../ui/iconMap'

export function ResourceCard({ resource }: { resource: ResourceCardData }) {
  const Icon = resolveIcon(resource.icon)

  if (resource.featured) {
    // Wide horizontal card — "Practical Learning" layout
    return (
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_6px_rgba(0,0,0,0.06)] h-full flex flex-row items-center gap-6">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${resource.iconBg}`}
          aria-hidden
        >
          <Icon className={`h-7 w-7 ${resource.iconColor}`} strokeWidth={1.8} />
        </span>
        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="text-[17px] font-extrabold text-slate-900 tracking-tight">
            {resource.title}
          </h3>
          <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">
            {resource.description}
          </p>
          <Link
            href={resource.href}
            className="mt-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 transition-colors"
          >
            {resource.ctaLabel} →
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_6px_rgba(0,0,0,0.06)] h-full flex flex-col">
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${resource.iconBg}`}
        aria-hidden
      >
        <Icon className={`h-6 w-6 ${resource.iconColor}`} strokeWidth={1.8} />
      </span>
      <h3 className="mt-5 text-[16px] font-extrabold text-slate-900 tracking-tight">
        {resource.title}
      </h3>
      <p className="mt-2 text-[13px] text-slate-500 leading-relaxed flex-1">
        {resource.description}
      </p>
      <Link
        href={resource.href}
        className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 transition-colors"
      >
        {resource.ctaLabel}
      </Link>
    </article>
  )
}
