/** Staff roles that can use Content Studio. */
export const ADMIN_ROLES = [
  'superAdmin',
  'contentEditor',
  'eventManager',
  'student',
] as const

export type AdminRole = (typeof ADMIN_ROLES)[number]

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  superAdmin: 'Super Admin',
  contentEditor: 'Content Editor',
  eventManager: 'Event Manager',
  student: 'Student',
}

export function getAdminRole(user: unknown): AdminRole | null {
  const role = (user as { role?: string } | null | undefined)?.role
  if (role && ADMIN_ROLES.includes(role as AdminRole)) {
    return role as AdminRole
  }
  return null
}

export function isSuperAdmin(user: unknown): boolean {
  return getAdminRole(user) === 'superAdmin'
}
