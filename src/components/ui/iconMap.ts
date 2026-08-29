import {
  Award,
  BarChart2,
  Beaker,
  BookCopy,
  BookOpen,
  Box,
  ClipboardList,
  FileSearch,
  FileStack,
  FileText,
  Fingerprint,
  FlaskConical,
  FolderOpen,
  Globe,
  GraduationCap,
  Laptop,
  Library,
  Microscope,
  Monitor,
  Newspaper,
  PenLine,
  PlayCircle,
  Rss,
  ScrollText,
  Shield,
  Timer,
  Users,
  Video,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const iconMap: Record<string, LucideIcon> = {
  FileText,
  FlaskConical,
  FolderOpen,
  Rss,
  BookCopy,
  PlayCircle,
  Microscope,
  Monitor,
  Award,
  Timer,
  BookOpen,
  GraduationCap,
  Globe,
  Library,
  FileStack,
  Laptop,
  BarChart2,
  Shield,
  Beaker,
  Newspaper,
  PenLine,
  ScrollText,
  Video,
  Users,
  Box,
  ClipboardList,
  FileSearch,
  Fingerprint,
}

const fallbackIcon = BookOpen

export function resolveIcon(name?: string | null): LucideIcon {
  if (!name?.trim()) return fallbackIcon
  const direct = iconMap[name]
  if (direct) return direct

  const normalised = name.trim().toLowerCase()
  const match = Object.entries(iconMap).find(([key]) => key.toLowerCase() === normalised)
  return match?.[1] ?? fallbackIcon
}
