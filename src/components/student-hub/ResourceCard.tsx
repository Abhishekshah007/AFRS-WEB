import Link from 'next/link'
import type { ResourceCardData } from '@/components/student-hub/types'
import { studentHubTokens } from '@/components/student-hub/tokens'

export type ResourceCardProps = {
  resource: ResourceCardData
}

/**
 * Academic resource tile with tinted icon, copy, and browse CTA.
 */
export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article
      className={`${studentHubTokens.radiusCard} border border-slate-100 bg-white p-6 shadow-sm card-pop h-full flex flex-col`}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${resource.iconBg}`}
        aria-hidden
      >
        {resource.icon}
      </span>
      <h3 className="mt-4 text-base font-extrabold text-[var(--hub-text)]">{resource.title}</h3>
      <p className={`mt-2 text-sm flex-1 ${studentHubTokens.body}`}>{resource.description}</p>
      <Link href={resource.href} className={`mt-5 ${studentHubTokens.linkCta}`}>
        {resource.ctaLabel} <span aria-hidden>→</span>
      </Link>
    </article>
  )
}
