import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

import { fallbackCommittee, fallbackLeaders } from '../data/defaults/about'

/**
 * Leadership & Executive Committee cards used to take their photo, bio, full bio and
 * social links from hard-coded profiles whenever the CMS field was empty, so editors
 * could not change or remove them. This copies those values into the matching
 * "Leadership & Committee" (founders) records — photos are uploaded to the Media
 * library — after which the About page reads only the CMS.
 *
 * Only empty CMS fields are filled; anything an editor already entered is kept.
 * A photo that cannot be downloaded fails the migration (rather than silently
 * dropping it from the live site), so it can simply be re-run.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const profiles = [...fallbackLeaders, ...fallbackCommittee]
  const { docs } = await payload.find({
    collection: 'founders',
    limit: 200,
    depth: 0,
    overrideAccess: true,
    req,
  })

  for (const doc of docs) {
    const profile = profiles.find(
      (item) => item.name.trim().toLowerCase() === doc.name.trim().toLowerCase(),
    )
    if (!profile) continue

    const data: Record<string, unknown> = {}
    if (!doc.bio?.trim() && profile.bio) data.bio = profile.bio
    if (!doc.fullBio?.trim() && profile.fullBio) data.fullBio = profile.fullBio
    if (!doc.linkedin?.trim() && profile.socials?.linkedin) data.linkedin = profile.socials.linkedin
    if (!doc.instagram?.trim() && profile.socials?.instagram) {
      data.instagram = profile.socials.instagram
    }
    if (!doc.facebook?.trim() && profile.socials?.facebook) data.facebook = profile.socials.facebook

    if (!doc.photo && profile.photoUrl) {
      const response = await fetch(profile.photoUrl)
      if (!response.ok) {
        throw new Error(
          `Could not download the photo for "${doc.name}" (${response.status}) from ${profile.photoUrl}. Re-run the migration, or upload the photo in the CMS and run it again.`,
        )
      }
      const buffer = Buffer.from(await response.arrayBuffer())
      const mimetype = response.headers.get('content-type')?.split(';')[0] || 'image/jpeg'
      const extension = mimetype.split('/')[1]?.replace('jpeg', 'jpg') || 'jpg'
      const slug = doc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

      const media = await payload.create({
        collection: 'media',
        data: { alt: doc.name },
        file: { data: buffer, mimetype, name: `${slug}.${extension}`, size: buffer.length },
        overrideAccess: true,
        req,
      })
      data.photo = media.id
    }

    if (Object.keys(data).length === 0) continue

    await payload.update({
      collection: 'founders',
      id: doc.id,
      data,
      overrideAccess: true,
      req,
    })
    payload.logger.info(`Leader profile moved to CMS: ${doc.name} (${Object.keys(data).join(', ')})`)
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Data-only migration: the copied values are ordinary CMS content now. Leaving them
  // in place is harmless even if the code is rolled back, so there is nothing to undo.
}
