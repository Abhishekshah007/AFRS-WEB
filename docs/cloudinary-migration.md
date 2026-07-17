# Cloudinary Media Migration

## Architecture

Payload keeps the existing `media` collection and every existing upload relationship still points to `relationTo: 'media'`. The app uses the official Payload v3 `@payloadcms/plugin-cloud-storage` package with a typed Cloudinary adapter in `src/storage/cloudinary`.

When Cloudinary credentials are present, new Payload Admin uploads are sent to Cloudinary and local storage is disabled for `media`. Media responses continue to expose `url`, so existing frontend code such as `media.url`, `item.image.url`, and `resolveMediaUrl(...)` continues to work.

Cloudinary public IDs are deterministic:

```text
${CLOUDINARY_MEDIA_PREFIX}/${filename-without-extension}
```

The default prefix is `afrs/payload/media`. Originals and generated Payload sizes are uploaded separately using their existing filenames.

## Installation

Installed packages:

```bash
corepack pnpm add @payloadcms/plugin-cloud-storage@3.82.1 cloudinary@2.10.0
```

The Payload plugin version is pinned to the same version as the existing Payload packages.

## Environment Variables

Set these locally and in production:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_MEDIA_PREFIX=afrs/payload/media
```

`CLOUDINARY_MEDIA_PREFIX` is optional, but changing it after migration changes generated delivery URLs. Keep it stable.

## Migration Steps

1. Back up the Neon database.
2. Keep the existing `media/` folder intact.
3. Deploy or run the code with Cloudinary environment variables set.
4. Apply the additive Payload database migration:

```bash
corepack pnpm payload migrate
```

5. Preview the media upload migration:

```bash
corepack pnpm migrate:cloudinary -- --dry-run
```

6. Run the media upload migration:

```bash
corepack pnpm migrate:cloudinary
```

7. Re-run the same command if it is interrupted. Media records whose `url` already points at Cloudinary are skipped.
8. Run validation:

```bash
corepack pnpm run generate:types
corepack pnpm exec tsc --noEmit
corepack pnpm run build
```

## Rollback Steps

Do not delete local files immediately after migration. Rollback is:

1. Remove or unset Cloudinary environment variables.
2. Redeploy. The cloud storage plugin disables itself when credentials are absent.
3. Restore the database backup if you need to revert Media document URLs.
4. Keep `media/` in place so `/api/media/file/...` URLs can continue to resolve locally.

Cloudinary assets are not deleted by rollback. Delete them manually only after confirming the local rollback is healthy.

## Troubleshooting

- `Cloudinary credentials are required`: set all three required Cloudinary variables.
- Missing local file warnings: restore the file under `media/` and rerun the migration.
- Broken `next/image`: verify `next.config.ts` includes `res.cloudinary.com` in `images.remotePatterns`.
- Cloudinary URL points to the wrong folder: confirm `CLOUDINARY_MEDIA_PREFIX` matches the value used during migration.
- Admin upload still writes locally: confirm Cloudinary variables are present in the runtime environment and restart the Next/Payload server.

## Deployment Instructions

1. Add Cloudinary variables to Vercel or the production host.
2. Deploy the code.
3. Run the migration once from an environment that can access Neon and the local `media/` files.
4. Verify uploads, edits, deletes, relationship previews, and frontend pages.
5. Keep the local `media/` backup until production has been verified.
