import Image from 'next/image'
import { aboutTokens } from '@/components/about/tokens'

export type StoryBlockProps = {
  badge: string
  badgeVariant?: 'violet' | 'blue'
  title: string
  body: string
  highlight: { icon: string; text: string }
  imageSrc: string
  imageAlt: string
  /** Image on the right when true (desktop). */
  imageRight?: boolean
  id?: string
}

/**
 * Alternating vision / mission / purpose row with optional image flip.
 */
export function StoryBlock({
  badge,
  badgeVariant = 'violet',
  title,
  body,
  highlight,
  imageSrc,
  imageAlt,
  imageRight = true,
  id,
}: StoryBlockProps) {
  const badgeClass =
    badgeVariant === 'blue'
      ? 'bg-blue-100 text-[var(--about-primary)]'
      : 'bg-violet-100 text-violet-700'

  const textCol = (
    <div className="flex flex-col justify-center">
      <span
        className={`inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${badgeClass}`}
      >
        {badge}
      </span>
      <h2 className={`mt-4 ${aboutTokens.heading} text-2xl sm:text-[28px] leading-tight`}>
        {title}
      </h2>
      <p className={`mt-4 text-sm sm:text-base text-left md:text-justify ${aboutTokens.body}`}>
        {body}
      </p>
      <div
        className={`mt-6 flex items-start gap-3 ${aboutTokens.radiusCard} border border-slate-100 bg-white p-4 shadow-sm max-w-md`}
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--about-primary-soft)] text-lg"
          aria-hidden
        >
          {highlight.icon}
        </span>
        <p className="pt-1 text-sm font-medium leading-snug text-left text-slate-700 md:text-justify">
          {highlight.text}
        </p>
      </div>
    </div>
  )

  const imageCol = (
    <div
      className={`relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden ${aboutTokens.radiusImage} bg-slate-100 shadow-md`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  )

  return (
    <article
      id={id}
      className={`grid items-center gap-6 sm:gap-8 md:grid-cols-2 md:gap-12 lg:gap-16 ${aboutTokens.sectionY}`}
    >
      {imageRight ? (
        <>
          {textCol}
          {imageCol}
        </>
      ) : (
        <>
          <div className="md:order-2">{textCol}</div>
          <div className="md:order-1">{imageCol}</div>
        </>
      )}
    </article>
  )
}
