import type { Access } from 'payload'

/** Anonymous users see only published documents; authenticated users see all. */
export const publishedRead: Access = ({ req: { user } }) => {
  if (user) return true
  return { published: { equals: true } }
}
