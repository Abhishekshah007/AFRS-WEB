import { aboutTokens } from '@/components/about/tokens'

export type SectionHeaderProps = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
  id?: string
}

/**
 * Reusable section title block used across About page sections.
 */
export function SectionHeader({
  title,
  subtitle,
  align = 'center',
  light = false,
  id,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const maxW = align === 'center' ? 'max-w-2xl' : 'max-w-xl'

  return (
    <header className={`${alignClass} ${maxW} mb-10 md:mb-12 lg:mb-14`} id={id}>
      {align === 'center' && (
        <span
          className="mx-auto mb-4 block h-1 w-12 rounded-full bg-[var(--about-primary)]"
          aria-hidden
        />
      )}
      <h2
        className={`${aboutTokens.heading} text-2xl sm:text-[28px] lg:text-[32px] leading-tight ${
          light ? 'text-white' : ''
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-sm sm:text-base ${aboutTokens.body} ${light ? 'text-white/80' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </header>
  )
}
