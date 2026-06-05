import { SectionHeader as SharedSectionHeader } from '@/components/ui/SectionHeader'
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
 * Now wraps the shared UI component for consistency.
 */
export function SectionHeader({
  title,
  subtitle,
  align = 'center',
  light = false,
  id,
}: SectionHeaderProps) {
  return (
    <SharedSectionHeader
      title={title}
      subtitle={subtitle}
      align={align}
      light={light}
      className={id}
      titleClassName={aboutTokens.heading}
      subtitleClassName={aboutTokens.body}
      accent={align === 'center'}
    />
  )
}
