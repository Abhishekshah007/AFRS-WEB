import { containsHtml, sanitizeSafeHtml } from '@/lib/cms'

type Props = {
  html: string
  className?: string
}

/**
 * Renders CMS text that may include a small allow-list of HTML tags (links, emphasis).
 */
export function CmsInlineHtml({ html, className }: Props) {
  if (!html) return null
  if (!containsHtml(html)) return <span className={className}>{html}</span>

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizeSafeHtml(html) }}
    />
  )
}
