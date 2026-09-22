/** Centralized admin sidebar groups — single source of truth for nav organization. */
export const ADMIN_GROUPS = {
  CONTENT: 'Website content',
  EVENTS: 'Events & registrations',
  INBOX: 'Inbox',
  SYSTEM: 'Accounts & files',
  SITE_SETTINGS: 'Site-wide settings',
  PAGES: 'Page copy',
  PROGRAMMES: 'Courses & training',
  STUDENT_HUB: 'Student Hub',
} as const

export type AdminGroup = (typeof ADMIN_GROUPS)[keyof typeof ADMIN_GROUPS]
