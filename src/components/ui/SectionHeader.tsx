import React from 'react'
import { DESIGN_SYSTEM } from '@/lib/design-system'

export type SectionHeaderProps = {
  title: string
  subtitle?: string
  eyebrow?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  accent?: boolean
}

/**
 * A standardized section header component that ensures typographic consistency
 * across the entire application.
 */
export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = 'center',
  light = false,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  accent = true,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const maxW = align === 'center' ? 'max-w-3xl' : 'max-w-2xl'
  
  const textColor = light ? 'text-white' : 'text-slate-900'
  const subtitleColor = light ? 'text-white/80' : 'text-slate-500'
  const eyebrowColor = light ? 'text-white/70' : 'text-indigo-600'

  return (
    <header className={`${alignClass} ${maxW} mb-12 lg:mb-16 ${className}`}>
      {eyebrow && (
        <span className={`block mb-3 ${DESIGN_SYSTEM.typography.label} ${eyebrowColor}`}>
          {eyebrow}
        </span>
      )}
      
      {align === 'center' && accent && (
        <span
          className="mx-auto mb-6 block h-1.5 w-12 rounded-full bg-indigo-600"
          aria-hidden
        />
      )}

      <h2 className={`${DESIGN_SYSTEM.typography.h2} ${textColor} ${titleClassName}`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`mt-4 ${DESIGN_SYSTEM.typography.bodyLarge} ${subtitleColor} ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </header>
  )
}
