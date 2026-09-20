# Environment Variables

Copy `.env.example` to `.env` locally. In production, set the same keys in **Vercel → Project → Settings → Environment Variables**.

## Required (production)

| Variable | Example | Purpose |
|----------|---------|---------|
| `PAYLOAD_SECRET` | long random string (32+ chars) | Payload auth, JWT signing, registration confirmation tokens |
| `DATABASE_URL` | `postgresql://user:pass@host/db?sslmode=require` | PostgreSQL connection |
| `NEXT_PUBLIC_SITE_URL` | `https://afrs.in` | Canonical public URL (SEO, emails, confirmation links) |
| `CLOUDINARY_CLOUD_NAME` | your cloud name | Media uploads & delivery |
| `CLOUDINARY_API_KEY` | API key | Cloudinary auth |
| `CLOUDINARY_API_SECRET` | API secret | Cloudinary auth |
| `RESEND_API_KEY` | `re_…` | Payload admin email + form notifications |
| `RESEND_FROM_EMAIL` | `AFRS <noreply@afrs.in>` | Verified sender (name + address) |
| `SUBMISSION_NOTIFY_EMAIL` | `office@afrs.in` | Inbox for contact/registration alerts |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare site key | Public CAPTCHA widget |
| `TURNSTILE_SECRET_KEY` | Cloudflare secret key | Server-side CAPTCHA verification |

> **Turnstile:** Do not use test keys (`1x000…`) in production. Create real keys in Cloudflare Turnstile for your domain.

> **Resend:** The `RESEND_FROM_EMAIL` domain must be verified in the [Resend dashboard](https://resend.com/domains).

## Recommended (production)

| Variable | Purpose |
|----------|---------|
| `SITE_NOTIFY_EMAIL` | Fallback notify address if `SUBMISSION_NOTIFY_EMAIL` is unset |
| `GROQ_API_KEY` or `GEMINI_API_KEY` | Powers the site chatbot (at least one required for chat) |
| `CLOUDINARY_MEDIA_PREFIX` | Cloudinary folder prefix (default: `afrs/payload/media`) — keep stable after go-live |

## Optional

| Variable | Default | Purpose |
|----------|---------|---------|
| `MAINTENANCE_MODE` | `false` | Set to `true` to show maintenance page (admin + API stay up) |
| `GROQ_CHAT_MODEL` | `llama-3.3-70b-versatile` | Groq model for chatbot |
| `GEMINI_CHAT_MODEL` | `gemini-2.0-flash` | Gemini model for chatbot |
| `SITE_URL` | — | Fallback if `NEXT_PUBLIC_SITE_URL` is unset (server-only) |

## Local development only

| Variable | Notes |
|----------|-------|
| Turnstile test keys | Included in `.env.example` — always pass in dev |
| `RESEND_*` | Emails skip silently in dev if keys are missing (logged to console) |
| `DATABASE_URL` | Use a local Postgres or a dev branch on Neon/Supabase |

## Vercel setup tips

1. Add variables for **Production**, **Preview**, and **Development** environments as needed.
2. Preview deployments should use a separate database or read-only credentials when possible.
3. After changing env vars, **redeploy** for server code to pick them up.
4. `NEXT_PUBLIC_*` vars are embedded at build time — redeploy after changing them.

## Security checklist

- Never commit `.env` (already in `.gitignore`).
- Use a unique `PAYLOAD_SECRET` per environment.
- Rotate keys if they were ever committed or shared.
- Production Turnstile + Resend must use production domains, not test/sandbox senders.

## Related

- [Deployment guide](./deployment.md)
- [Cloudinary migration](./cloudinary-migration.md)
