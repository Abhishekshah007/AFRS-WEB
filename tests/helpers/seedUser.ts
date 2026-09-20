import { getPayload } from 'payload'
import config from '../../src/payload.config.js'

/** Must be superAdmin — Users collection create/read-all requires admin access. */
export const testUser = {
  name: 'Test User',
  email: 'dev@payloadcms.com',
  password: 'test',
  role: 'superAdmin' as const,
}

/**
 * Seeds a test user for e2e admin tests.
 */
export async function seedTestUser(): Promise<void> {
  const payload = await getPayload({ config })

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })

  await payload.create({
    collection: 'users',
    data: testUser,
    draft: false,
  })
}

/**
 * Cleans up test user after tests
 */
export async function cleanupTestUser(): Promise<void> {
  const payload = await getPayload({ config })

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })
}
