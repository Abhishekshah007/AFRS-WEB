# Payload CMS Media And Fetch Cycle

This project uses Payload Media with a Cloudinary storage adapter. That means you upload files in the Payload admin `Media` collection, but the physical file is stored in Cloudinary, not in the local `public` folder.

## Certification Workflow

1. Open Payload admin.
2. Upload the logo/emblem in `System > Media`.
3. Add alt text for accessibility.
4. Open `Pages > About Certifications`.
5. Create a certification:
   - `title`: visible card title
   - `issuer`: optional authority name
   - `logo`: choose the uploaded Media item
   - `description`: optional note
   - `certificateUrl`: optional proof or PDF URL
   - `published`: must be enabled to show publicly
   - `order`: lower numbers show first
6. The About page fetches published records and displays the Media logo.

## Code Chain

```text
src/collections/AboutCertifications.ts
  defines CMS fields and admin list behavior

src/config/collections.ts
  registers the collection with Payload

src/payload-types.ts
  generated types after `pnpm run generate:types`

src/app/(frontend)/about/page.tsx
  fetches published certifications with depth 1

src/lib/cms.ts
  converts a Payload Media relationship into a usable URL

src/components/about/CertificationsSection.tsx
  renders the certification image/title card
```

## Fetch Pattern

```ts
const certifications = await payload.find({
  collection: 'aboutCertifications',
  where: { published: { equals: true } },
  sort: 'order',
  depth: 1,
  overrideAccess: false,
})
```

Use `depth: 1` when you need the linked Media document, because the logo field stores a relationship to `media`.

## Media Rule

Use Payload upload fields for images:

```ts
{
  name: 'logo',
  type: 'upload',
  relationTo: 'media',
  required: true,
}
```

Then render it by resolving the Media URL:

```ts
const logoUrl = resolveMediaUrl(cert.logo, '')
```

Do not place new certification images directly in `public` unless you intentionally want a static asset outside CMS control.
