# Local Development

## Prerequisites

- **Node.js** 20+ or 22+ (`engines` in `package.json`)
- **pnpm** 9 or 10 (`corepack enable` then `corepack prepare pnpm@latest --activate`)
- **PostgreSQL** database (local Docker, Neon free tier, or Supabase)

## First-time setup

```bash
git clone <repo-url>
cd afrs-webapp
pnpm install
cp .env.example .env
```

Edit `.env` with your values. Minimum to run locally:

```env
PAYLOAD_SECRET=any-long-random-string-for-local
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Cloudinary, Resend, and Turnstile are optional locally — the app degrades gracefully (placeholder images, skipped emails, test Turnstile keys).

Start the dev server:

```bash
pnpm dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

Create the first admin user when prompted.

## Useful commands

```bash
pnpm devsafe          # Clear .next cache + dev (use after weird 404/500 errors)
pnpm build            # Test production build
pnpm lint             # ESLint
pnpm test:int         # Vitest integration tests
pnpm test:e2e         # Playwright (needs dev server or webServer config)
pnpm generate:types   # After changing Payload collections/globals
pnpm payload migrate  # Apply DB migrations
```

## Database migrations

When pulling new code with migrations in `src/migrations/`:

```bash
pnpm payload migrate
```

## Schema changes workflow

1. Edit collection/global in `src/collections/` or `src/globals/`.
2. Create a migration if needed (Payload CLI or hand-written in `src/migrations/`).
3. Register migration in `src/migrations/index.ts`.
4. Run `pnpm payload migrate`.
5. Run `pnpm generate:types`.
6. Commit schema + migration + updated `payload-types.ts`.

## Media uploads

With Cloudinary credentials in `.env`, admin uploads go to Cloudinary. Without them, behavior depends on adapter config — set Cloudinary keys for parity with production.

See [cloudinary-migration.md](./cloudinary-migration.md) for one-time migration from local files.

## Bulk import scripts

**Resource persons** from Word document:

```bash
pnpm import:resource-persons -- path/to/file.docx
```

## Testing registration emails locally

Set in `.env`:

```env
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=AFRS <onboarding@resend.dev>
SUBMISSION_NOTIFY_EMAIL=your-email@example.com
```

Use Resend’s sandbox sender for dev testing.

## Windows notes

- Use `pnpm devsafe` instead of `rm -rf .next`.
- PowerShell: `Remove-Item -Recurse -Force .next` also works.

## Related

- [Environment variables](./environment.md)
- [Deployment](./deployment.md)
