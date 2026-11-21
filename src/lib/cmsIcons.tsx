import type { SVGProps } from 'react'
import { CMS_ICON_OPTIONS } from '@/fields/cmsIconOptions'
import {
  Award,
  BadgeCheck,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  ExternalLink,
  FileSearch,
  Fingerprint,
  FlaskConical,
  Globe,
  GraduationCap,
  Landmark,
  LibraryBig,
  Microscope,
  Network,
  Rss,
  Shield,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react'

/** YouTube mark (lucide no longer ships brand icons). Path from Simple Icons, CC0. */
function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

type IconComponent = LucideIcon | ((_props: SVGProps<SVGSVGElement>) => React.JSX.Element)

/** Icons editors can pick in the CMS (value → label + component). Keep values stable. */
export const CMS_ICONS = {
  museum: { label: 'Museum', Icon: Landmark },
  youtube: { label: 'YouTube', Icon: YoutubeIcon },
  library: { label: 'Library', Icon: LibraryBig },
  blog: { label: 'Blog / RSS', Icon: Rss },
  link: { label: 'External link', Icon: ExternalLink },
  brain: { label: 'Brain / skills', Icon: BrainCircuit },
  briefcase: { label: 'Briefcase / career', Icon: BriefcaseBusiness },
  microscope: { label: 'Microscope', Icon: Microscope },
  network: { label: 'Network', Icon: Network },
  fileSearch: { label: 'File search / case study', Icon: FileSearch },
  badge: { label: 'Badge / certificate', Icon: BadgeCheck },
  award: { label: 'Award', Icon: Award },
  graduation: { label: 'Graduation cap', Icon: GraduationCap },
  fingerprint: { label: 'Fingerprint', Icon: Fingerprint },
  flask: { label: 'Lab flask', Icon: FlaskConical },
  shield: { label: 'Shield', Icon: Shield },
  users: { label: 'People', Icon: Users },
  video: { label: 'Video', Icon: Video },
  book: { label: 'Book', Icon: BookOpen },
  globe: { label: 'Globe', Icon: Globe },
} satisfies Record<string, { label: string; Icon: IconComponent }>

export type CmsIconName = keyof typeof CMS_ICONS

// Compile-time check: every CMS select option has an icon component.
type _AllOptionsHaveIcons = (typeof CMS_ICON_OPTIONS)[number]['value'] extends CmsIconName
  ? true
  : never
export const _cmsIconsComplete: _AllOptionsHaveIcons = true

export function getCmsIcon(name: string | null | undefined, fallback: CmsIconName = 'link') {
  return (CMS_ICONS[(name ?? '') as CmsIconName] ?? CMS_ICONS[fallback]).Icon
}
