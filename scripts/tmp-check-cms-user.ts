import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })
  const email = 'dev@payloadcms.com'
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        name: 'Test User',
        email,
        password: 'test',
        role: 'superAdmin',
      },
    })
    console.log('created')
  } else {
    console.log(`exists role=${(existing.docs[0] as { role?: string }).role}`)
  }

  process.exit(0)
}

void main()
