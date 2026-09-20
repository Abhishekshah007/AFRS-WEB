# AFRS Web App

Public website and CMS for **Applied Forensic Research Sciences (AFRS)** and **AFSL** laboratory services.

Built with **Next.js 16**, **Payload CMS 3**, **PostgreSQL**, **Cloudinary**, and **Resend**.

## Live URLs

| URL | Purpose |
|-----|---------|
| `/` | AFRS homepage |
| `/admin` | Payload CMS admin panel |
| `/services` | AFSL forensic services |
| `/student-hub` | Student resources & exam prep |
| `/gallery` | Full photo gallery with filters |

Configure the canonical site URL with `NEXT_PUBLIC_SITE_URL` (see [Environment variables](./docs/environment.md)).

## Documentation

| Guide | Audience | Description |
|-------|----------|-------------|
| [**Deployment**](./docs/deployment.md) | DevOps / deploy | Vercel checklist, migrations, domain, go-live |
| [**Environment variables**](./docs/environment.md) | DevOps / deploy | Every `.env` key explained |
| [**Local development**](./docs/local-development.md) | Developers | First-time setup on your machine |
| [**CMS editor guide**](./docs/cms-editor-guide.md) | Content team | Galleries, pages, events, forms |
| [**Architecture map**](./docs/architecture-map.md) | Developers | Code layout and data flows |
| [**Cloudinary migration**](./docs/cloudinary-migration.md) | DevOps | One-time media migration to Cloudinary |

## Quick start (local)

```bash
pnpm install
cp .env.example .env   # fill in values — see docs/environment.md
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Admin: [http://localhost:3000/admin](http://localhost:3000/admin).

If nested routes return 404/500 after crashes, clear the cache:

```bash
pnpm devsafe
```

## Common commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server |
| `pnpm devsafe` | Clear `.next` cache, then dev (Windows-safe) |
| `pnpm build` | Production build |
| `pnpm start` | Run production server locally |
| `pnpm lint` | ESLint |
| `pnpm test` | Integration + E2E tests |
| `pnpm generate:types` | Regenerate `payload-types.ts` after schema changes |
| `pnpm payload migrate` | Run pending DB migrations |
| `pnpm import:resource-persons` | Bulk import resource persons from Word doc |

## Tech stack

- **Framework:** Next.js App Router + React 19
- **CMS:** Payload 3 (Lexical editor, Postgres adapter)
- **Database:** PostgreSQL (Neon, Supabase, or Vercel Postgres)
- **Media:** Cloudinary via `@payloadcms/plugin-cloud-storage`
- **Email:** Resend (`@payloadcms/email-resend` + custom notification helpers)
- **Forms:** Cloudflare Turnstile (production)
- **Hosting:** Vercel (recommended)

## Project structure

```text
src/
├── app/(frontend)/     Public pages & API routes
├── app/(payload)/      Admin panel & Payload REST/GraphQL
├── collections/        CMS collections
├── globals/            CMS globals (Home, About, Site Settings, …)
├── components/         React UI by feature area
├── lib/                Queries, email, security, CMS helpers
└── migrations/         Postgres schema migrations
```

See [architecture-map.md](./docs/architecture-map.md) for dependency chains.

## Before you deploy

1. Read [deployment.md](./docs/deployment.md) end-to-end.
2. Set all **required** variables in Vercel (see [environment.md](./docs/environment.md)).
3. Run `pnpm payload migrate` against the production database.
4. Verify Resend domain + Turnstile production keys.
5. Run `pnpm build` and `pnpm test` locally.

## Support for developers

Payload docs: [payloadcms.com/docs](https://payloadcms.com/docs)

AI / agent rules for this repo: [AGENTS.md](./AGENTS.md)
