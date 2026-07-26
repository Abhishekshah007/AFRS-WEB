/** Centralized admin sidebar groups — single source of truth for nav organization. */
export const ADMIN_GROUPS = {
  CONTENT: 'Content',
  EVENTS: 'Events & Programmes',
  INBOX: 'Inbox',
  SYSTEM: 'System',
  SITE_SETTINGS: 'Site Settings',
  PAGES: 'Pages',
  PROGRAMMES: 'Programmes',
  STUDENT_HUB: 'Student Hub',
} as const

export type AdminGroup = (typeof ADMIN_GROUPS)[keyof typeof ADMIN_GROUPS]
