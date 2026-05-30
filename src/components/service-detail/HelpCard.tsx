import Image from 'next/image'
import Link from 'next/link'
import type { HelpCardItem } from '@/components/service-detail/types'
import { serviceDetailTokens } from '@/components/service-detail/tokens'

export type HelpCardProps = {
  item: HelpCardItem
}

/**
 * Single capability card for the “How We Can Help” grid.
 */
export function HelpCard({ item }: HelpCardProps) {
  const baseClass = `${serviceDetailTokens.radiusCard} border border-slate-100 bg-white p-6 shadow-sm card-pop h-full flex flex-col`

  if (item.wide) {
    return (
      <article className={`${baseClass} lg:col-span-2 lg:flex-row lg:items-center lg:gap-8`}>
        <div className="flex-1">
          <CardContent item={item} />
        </div>
        {item.imageUrl && (
          <div className="relative mt-6 lg:mt-0 h-40 w-full lg:h-36 lg:w-44 shrink-0 overflow-hidden rounded-xl">
            <Image src={item.imageUrl} alt="" fill sizes="176px" className="object-cover" loading="lazy" />
          </div>
        )}
      </article>
    )
  }

  return (
    <article className={baseClass}>
      <CardContent item={item} />
    </article>
  )
}

function CardContent({ item }: { item: HelpCardItem }) {
  return (
    <>
      <span
        className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--svc-primary-soft)] text-lg"
        aria-hidden
      >
        {item.icon}
      </span>
      <h3 className="mt-4 text-base font-extrabold text-[var(--svc-text)]">{item.title}</h3>
      <p className={`mt-2 text-sm flex-1 ${serviceDetailTokens.body}`}>{item.description}</p>
      {item.bullets && item.bullets.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm text-[var(--svc-text-muted)] list-disc pl-4">
          {item.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      <Link
        href="#consult-expert"
        className="mt-5 inline-flex text-sm font-bold text-[var(--svc-primary)] hover:underline"
      >
        View details <span aria-hidden>→</span>
      </Link>
    </>
  )
}
