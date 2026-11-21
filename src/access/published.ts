import type { Access } from 'payload'

import { isStaffUser } from '../config/adminRoles'

/** Visitors (and student accounts) see only published documents; staff see all. */
export const publishedRead: Access = ({ req: { user } }) => {
  if (isStaffUser(user)) return true
  return { published: { equals: true } }
}
