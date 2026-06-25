import type { LucideIcon } from 'lucide-react'

export type ResourceCardData = {
  id: string
  title: string
  description: string
  ctaLabel: string
  href: string
  icon: string
  iconBg: string
  iconColor: string
  featured?: boolean
}

export type ExamPrepCardData = {
  id: string
  badge: string
  title: string
  subtitle: string
  description: string
  ctaLabel: string
  href: string
  watermark: string
}
