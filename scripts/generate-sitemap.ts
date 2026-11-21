/**
 * Writes a static sitemap.xml from the live CMS, using exactly the same URL list as the
 * site's built-in /sitemap.xml route (src/app/sitemap.ts).
 *
 * Usage:
 *   pnpm generate:sitemap                          # origin from NEXT_PUBLIC_SITE_URL / default
 *   pnpm generate:sitemap -- --origin=https://afrs.in --out=seo/sitemap.xml
 *
 * Useful for Google Search Console checks, for review, or while the site is offline.
 * Read-only: it only queries the database.
 */
import 'dotenv/config'

// Never let Payload's dev-mode schema push touch the database from this read-only script.
;(process.env as Record<string, string>).NODE_ENV = 'production'

import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

function arg(name: string): string | undefined {
  const prefix = `--${name}=`
  return process.argv.find((value) => value.startsWith(prefix))?.slice(prefix.length)
}

const origin = arg('origin')
if (origin) process.env.NEXT_PUBLIC_SITE_URL = origin.replace(/\/+$/, '')
const outFile = path.resolve(arg('out') ?? 'seo/sitemap.xml')

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

async function main() {
  // Imported after NEXT_PUBLIC_SITE_URL is set so every URL uses the chosen origin.
  const { default: sitemap } = await import('../src/app/sitemap')
  const entries = await sitemap()

  const seen = new Set<string>()
  const unique = entries.filter((entry) => !seen.has(entry.url) && seen.add(entry.url))

  const body = unique
    .map((entry) => {
      const lastmod =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified
            ? new Date(entry.lastModified).toISOString()
            : undefined
      return [
        '  <url>',
        `    <loc>${escapeXml(entry.url)}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
        entry.changeFrequency ? `    <changefreq>${entry.changeFrequency}</changefreq>` : null,
        typeof entry.priority === 'number' ? `    <priority>${entry.priority.toFixed(2)}</priority>` : null,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

  mkdirSync(path.dirname(outFile), { recursive: true })
  writeFileSync(outFile, xml, 'utf8')

  const byType = new Map<string, number>()
  for (const entry of unique) {
    const section = new URL(entry.url).pathname.split('/').filter(Boolean).slice(0, 2).join('/') || '(home)'
    const key = section.startsWith('courses/resource-persons')
      ? 'courses/resource-persons'
      : section.split('/')[0] || '(home)'
    byType.set(key, (byType.get(key) ?? 0) + 1)
  }
  console.log(`Wrote ${unique.length} URLs to ${outFile}`)
  console.log(Object.fromEntries([...byType.entries()].sort()))
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
