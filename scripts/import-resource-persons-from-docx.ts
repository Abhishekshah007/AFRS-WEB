import 'dotenv/config'

import path from 'node:path'
import { getPayload } from 'payload'

import config from '../src/payload.config'
import {
  buildPhotoFilename,
  parseResourcePersonsDocx,
} from './lib/parseResourcePersonsDocx'

const dryRun = process.argv.includes('--dry-run')
const replaceExisting = process.argv.includes('--replace')
const defaultTitle = 'Resource Person'

function initialsFromName(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.replace(/^[^a-zA-Z]+/, '')[0]?.toUpperCase() ?? '')
    .join('')
}

function getDocxPath(): string {
  const arg = process.argv.find((value) => value.endsWith('.docx') && !value.startsWith('--'))
  if (!arg) {
    throw new Error(
      'Usage: pnpm import:resource-persons "<path-to.docx>" [--dry-run] [--replace]',
    )
  }

  return path.resolve(arg)
}

async function run(): Promise<void> {
  const docxPath = getDocxPath()
  const rows = parseResourcePersonsDocx(docxPath)

  if (rows.length === 0) {
    throw new Error(`No rows found in ${docxPath}. Expected a table with names and photos.`)
  }

  console.log(`Parsed ${rows.length} resource persons from ${docxPath}`)

  if (dryRun) {
    rows.slice(0, 5).forEach((row, index) => {
      console.log(`${index + 1}. ${row.name} (${row.mimeType}, ${row.imageBuffer.length} bytes)`)
    })
    if (rows.length > 5) {
      console.log(`... and ${rows.length - 5} more`)
    }
    return
  }

  const payload = await getPayload({ config })

  if (replaceExisting) {
    const existing = await payload.find({
      collection: 'resourcePersons',
      limit: 500,
      depth: 0,
    })

    for (const doc of existing.docs) {
      await payload.delete({
        collection: 'resourcePersons',
        id: doc.id,
      })
    }

    console.log(`Removed ${existing.docs.length} existing resource person records`)
  }

  let created = 0

  for (const [index, row] of rows.entries()) {
    const order = index + 1
    const filename = buildPhotoFilename(row.name, order, row.imagePath)

    const media = await payload.create({
      collection: 'media',
      data: {
        alt: `${row.name} — AFRS resource person`,
      },
      file: {
        data: row.imageBuffer,
        mimetype: row.mimeType,
        name: filename,
        size: row.imageBuffer.length,
      },
    })

    await payload.create({
      collection: 'resourcePersons',
      data: {
        name: row.name,
        title: defaultTitle,
        bio: `${row.name} is an AFRS resource person supporting forensic science education, applied training, and professional knowledge sharing.`,
        photo: media.id,
        published: true,
        order,
      },
    })

    created += 1
    console.log(`✅ ${order}/${rows.length} ${row.name}`)
  }

  console.log(`Import complete. Created ${created} resource persons.`)
}

run().catch((error) => {
  console.error('Resource person import failed')
  console.error(error)
  process.exit(1)
})
