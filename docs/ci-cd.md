# CI/CD

**CI** runs on GitHub Actions. **CD** (deploy) is handled by [Vercel](./deployment.md) when you push to `main` or open a PR (preview).

## Workflows

| Workflow | When | What it does |
|----------|------|----------------|
| [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) | Every PR + push to `main` / `dev` | `tsc`, lint, `payload migrate`, integration tests, `pnpm build` |
| [`.github/workflows/e2e.yml`](../.github/workflows/e2e.yml) | Push to `main`, or manual | Playwright admin smoke tests |
| [`.github/workflows/migrate-production.yml`](../.github/workflows/migrate-production.yml) | Manual only | `payload migrate` on production DB |

## One-time GitHub setup

1. **Enable Actions** on the repository (Settings → Actions).
2. **Branch protection** on `main` (recommended before client handover):
   - Require a pull request before merging.
   - Require status check **CI / verify** to pass.
3. **Production environment** (for manual migrations):
   - Settings → Environments → **New environment** → name: `production`.
   - Add secrets: `DATABASE_URL`, `PAYLOAD_SECRET` (same values as Vercel production).
   - Optional: required reviewers before the migrate workflow runs.

## Vercel (CD)

1. Import `Abhishekshah007/AFRS-WEB` in Vercel.
2. **Production branch:** `main`.
3. **Preview:** enable for PRs (use a separate preview `DATABASE_URL` when possible).
4. Build: `pnpm build` · Install: `pnpm install`.

No deploy step is duplicated in GitHub Actions — Vercel builds after merge.

## Tool versions

CI uses **Node 22** (see workflow) and **pnpm** from `packageManager` in `package.json` (`pnpm/action-setup` reads it automatically — do not also set `version:` in the workflow).

## Local parity

```bash
# Same static checks as CI (no database):
pnpm run ci:check

# Full CI locally (needs Postgres + .env):
pnpm payload migrate && pnpm test:int && pnpm build
```

## Release flow

1. Feature branch → PR → wait for **CI** green.
2. Merge to `main` → Vercel production deploy starts.
3. If you changed Payload schema/collections, run **Migrate production database** workflow (or `pnpm payload migrate` locally with production `DATABASE_URL`).
4. After admin component path changes: `pnpm generate:importmap` and commit.
5. Smoke-test live site ([deployment checklist](./deployment.md#6-post-deploy-verification)).

## Related

- [Deployment](./deployment.md)
- [Environment variables](./environment.md)
