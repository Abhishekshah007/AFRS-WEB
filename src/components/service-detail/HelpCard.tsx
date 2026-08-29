import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import type { HelpCardItem } from '@/components/service-detail/types'
import { serviceDetailTokens } from '@/components/service-detail/tokens'

export type HelpCardProps = {
  item: HelpCardItem
  index: number
}

/**
 * Full-width capability row: copy on the left, thumbnail on the right.
 */
export function HelpCard({ item, index }: HelpCardProps) {
  const step = String(index + 1).padStart(2, '0')

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
      <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(108px,0.8fr)] sm:grid-cols-[minmax(0,1.15fr)_minmax(180px,0.85fr)] md:grid-cols-[minmax(0,1.15fr)_minmax(240px,0.85fr)]">
        <div className="flex flex-col justify-center px-4 py-5 sm:px-8 sm:py-8 lg:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--svc-primary)] sm:text-[11px]">
            Capability {step}
          </p>
          <h3 className="mt-2 text-base font-extrabold tracking-tight text-[var(--svc-text)] sm:mt-3 sm:text-xl md:text-2xl">
            {item.title}
          </h3>
          {item.description ? (
            <p className={`mt-3 text-sm text-left sm:mt-4 sm:text-base md:text-justify ${serviceDetailTokens.body}`}>
              {item.description}
            </p>
          ) : null}
          {item.bullets && item.bullets.length > 0 ? (
            <ul className="mt-5 space-y-2.5">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--svc-primary)]"
                    strokeWidth={2.2}
                    aria-hidden
                  />
                  <span className="leading-relaxed text-left md:text-justify">{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="relative min-h-[140px] self-stretch bg-slate-100 sm:min-h-[180px]">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={`${item.title} thumbnail`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-100 via-brand-50 to-brand-200/40" />
          )}
        </div>
      </div>
    </article>
  )
}
