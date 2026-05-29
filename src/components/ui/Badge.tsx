import * as React from 'react'

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline'

type BadgeSize = 'sm' | 'md' | 'lg'

export type BadgeProps = {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-900 text-white border-transparent',
  secondary: 'bg-gray-200 text-gray-900 border-transparent',
  success: 'bg-emerald-500 text-white border-transparent',
  warning: 'bg-amber-500 text-white border-transparent',
  danger: 'bg-red-500 text-white border-transparent',
  info: 'bg-sky-500 text-white border-transparent',
  outline: 'bg-transparent text-gray-900 border-gray-300',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
}

export function Badge({ children, variant = 'default', size = 'md', className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full border',
        'font-medium leading-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
