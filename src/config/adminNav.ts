import type { AdminRole } from '@/config/adminRoles'

export type AdminNavEntityRef = {
  type: 'collection' | 'global'
  slug: string
}

export type AdminNavSection = {
  id: string
  label: string
  hint: string
  /** Shown expanded by default in the sidebar */
  defaultOpen: boolean
  /** Primary = daily work; secondary = occasional / setup */
  tier: 'primary' | 'secondary'
  roles: AdminRole[]
  entities: AdminNavEntityRef[]
}

/**
 * Sidebar layout (independent of Payload `admin.group`).
 * Super Admins can hide more items per role in **Staff menu access** global.
 */
export const AFRS_NAV_SECTIONS: AdminNavSection[] = [
  {
    id: 'inbox',
    label: 'Inbox',
    hint: 'Form submissions — check often',
    defaultOpen: true,
    tier: 'primary',
    roles: ['superAdmin', 'contentEditor', 'eventManager'],
    entities: [
      { type: 'collection', slug: 'contactMessages' },
      { type: 'collection', slug: 'courseRegistrations' },
      { type: 'collection', slug: 'eventRegistrations' },
    ],
  },
  {
    id: 'daily',
    label: 'Daily content',
    hint: 'Notices, articles, gallery — publish when ready',
    defaultOpen: true,
    tier: 'primary',
    roles: ['superAdmin', 'contentEditor'],
    entities: [
      { type: 'collection', slug: 'notices' },
      { type: 'collection', slug: 'articles' },
      { type: 'collection', slug: 'galleryItems' },
      { type: 'collection', slug: 'testimonials' },
      { type: 'collection', slug: 'services' },
      { type: 'collection', slug: 'scientists' },
      { type: 'collection', slug: 'impactStats' },
      { type: 'collection', slug: 'partnersLogo' },
      { type: 'collection', slug: 'aboutCertifications' },
    ],
  },
  {
    id: 'pages',
    label: 'Page copy',
    hint: 'Headings and text on main site pages',
    defaultOpen: false,
    tier: 'secondary',
    roles: ['superAdmin', 'contentEditor'],
    entities: [
      { type: 'global', slug: 'homePage' },
      { type: 'global', slug: 'aboutPage' },
      { type: 'global', slug: 'servicesPage' },
      { type: 'global', slug: 'studentHubContent' },
      { type: 'global', slug: 'siteSettings' },
      { type: 'global', slug: 'headerSettings' },
      { type: 'global', slug: 'footerSettings' },
    ],
  },
  {
    id: 'programmes',
    label: 'Courses & events',
    hint: 'Programmes, events, registration forms',
    defaultOpen: true,
    tier: 'primary',
    roles: ['superAdmin', 'eventManager'],
    entities: [
      { type: 'collection', slug: 'events' },
      { type: 'collection', slug: 'resourcePersons' },
      { type: 'global', slug: 'programmesCatalog' },
      { type: 'global', slug: 'registrationForm' },
    ],
  },
  {
    id: 'media',
    label: 'Files',
    hint: 'Upload images before linking elsewhere',
    defaultOpen: false,
    tier: 'secondary',
    roles: ['superAdmin', 'contentEditor', 'eventManager'],
    entities: [{ type: 'collection', slug: 'media' }],
  },
  {
    id: 'system',
    label: 'Staff & access',
    hint: 'Accounts and menu permissions — Super Admin only',
    defaultOpen: false,
    tier: 'secondary',
    roles: ['superAdmin'],
    entities: [
      { type: 'collection', slug: 'users' },
      { type: 'global', slug: 'adminAccess' },
    ],
  },
]

export const ALL_NAV_ENTITY_KEYS = new Set(
  AFRS_NAV_SECTIONS.flatMap((section) =>
    section.entities.map((entity) => `${entity.type}:${entity.slug}`),
  ),
)
