# Deployment Guide

Deploy the AFRS web app to **Vercel** with **PostgreSQL**, **Cloudinary**, and **Resend**. This is the recommended production stack.

## Pre-deploy checklist

- [ ] All code merged and tested locally (`pnpm build`, `pnpm test`)
- [ ] Production env vars prepared ([environment.md](./environment.md))
- [ ] PostgreSQL database provisioned (Neon, Supabase, or Vercel Postgres)
- [ ] Cloudinary account configured with upload preset / API keys
- [ ] Resend domain verified; `RESEND_FROM_EMAIL` uses that domain
- [ ] Cloudflare Turnstile site created for production domain
- [ ] Custom domain DNS ready (if using `afrs.in` or similar)

## 1. Connect repository to Vercel

1. Import the GitHub/GitLab repo in [Vercel](https://vercel.com).
2. **Framework preset:** Next.js (auto-detected).
3. **Install command:** `pnpm install`
4. **Build command:** `pnpm build`
5. **Node.js:** 20.x or 22.x (see `engines` in `package.json`).

## 2. Set environment variables

Add every **required** variable from [environment.md](./environment.md) under **Settings → Environment Variables**.

Minimum production set:

```env
PAYLOAD_SECRET=
DATABASE_URL=
NEXT_PUBLIC_SITE_URL=https://your-domain.com
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
RESEND_FROM_EMAIL=AFRS <noreply@your-domain.com>
SUBMISSION_NOTIFY_EMAIL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Optional but recommended: `GROQ_API_KEY` or `GEMINI_API_KEY` for chatbot.

## 3. Run database migrations

Schema changes are tracked in `src/migrations/`. Apply them to the **production** database before or immediately after the first deploy.

**From your local machine** (with production `DATABASE_URL` in env):

```bash
pnpm payload migrate
```

Confirm pending migrations include recent entries (e.g. `20260921_010000_gallery_placement_fields`).

> Payload runs migrations against `DATABASE_URL`. Double-check you are pointing at production intentionally.

## 4. Deploy

Push to your production branch (e.g. `main`) or click **Deploy** in Vercel.

First deploy may take several minutes (Payload schema pull + Next.js build).

## 5. Custom domain

### Vercel

1. **Project → Settings → Domains** → Add `afrs.in` and `www.afrs.in`.
2. Vercel shows required DNS records.

### Hostinger (or other DNS provider)

Typical setup:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | Vercel IP (shown in Vercel domain settings) |
| `CNAME` | `www` | `cname.vercel-dns.com` |

Or use Vercel nameservers on the domain registrar for simpler management.

After DNS propagates, set:

```env
NEXT_PUBLIC_SITE_URL=https://afrs.in
```

Redeploy so SEO metadata and email links use the correct URL.

## 6. Post-deploy verification

Run through this list on the live site:

| Check | URL / action |
|-------|----------------|
| Homepage loads | `/` |
| Admin login | `/admin` |
| Forgot password email | Admin → forgot password (Resend) |
| Media upload | Admin → Media → upload image |
| Gallery | `/gallery` and filters |
| AFSL services | `/services` |
| Contact form | `/contact` + Turnstile |
| Event registration | Pick a published event → register |
| Maintenance bypass | Set `MAINTENANCE_MODE=true` → public redirects to `/maintenance`, `/admin` still works |

## 7. Maintenance mode

During cutover or emergency maintenance:

```env
MAINTENANCE_MODE=true
```

Redeploy. Public pages redirect to `/maintenance`. These paths stay available:

- `/admin`
- `/api/*`
- Static assets

Set back to `false` when done.

## 8. Cloudinary (if migrating existing media)

If this is a fresh deploy with Cloudinary already configured locally, skip this.

Otherwise see [cloudinary-migration.md](./cloudinary-migration.md):

```bash
pnpm payload migrate
pnpm migrate:cloudinary -- --dry-run
pnpm migrate:cloudinary
```

## Troubleshooting

### Build fails on Vercel (memory)

The build script already sets `--max-old-space-size=8000`. If it still fails, increase Vercel function memory or build machine tier.

### “No email adapter” warning

Should not appear after Resend is configured in `payload.config.ts`. Ensure `RESEND_API_KEY` is set in Vercel.

### 404 / 500 on nested routes in dev

Clear Next cache: `pnpm devsafe` (local) or redeploy (production).

### Gallery / schema errors after deploy

Run `pnpm payload migrate` against production DB.

### Turnstile fails on forms

Production domain must match the Turnstile site configuration in Cloudflare.

### Images not loading

Verify Cloudinary env vars and that `res.cloudinary.com` is allowed (already in `next.config.ts`).

## Rollback

1. In Vercel, **Deployments** → select previous successful deployment → **Promote to Production**.
2. Database migrations are not auto-reversed; only roll back app code unless you have a DB backup plan.

## Ongoing releases

1. Develop on feature branch → PR → merge to `main`.
2. Run new migrations if schema changed: `pnpm payload migrate`.
3. After schema changes: `pnpm generate:types` (commit if types changed).
4. Vercel auto-deploys on push.
5. Smoke-test production using section 6 above.

## Related docs

- [Environment variables](./environment.md)
- [CMS editor guide](./cms-editor-guide.md) — share with content team after go-live
- [Architecture map](./architecture-map.md)
