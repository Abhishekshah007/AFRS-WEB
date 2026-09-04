import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { Media } from '@/payload-types'

type LexicalEditorState = Parameters<typeof convertLexicalToHTML>[0]['data']

type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
}

type LexicalRoot = {
  root?: {
    children?: LexicalNode[]
  }
}

export function resolveMediaUrl(
  media: number | Media | null | undefined,
  fallback: string,
): string {
  if (media && typeof media === 'object' && media.url) {
    return media.url
  }
  return fallback
}

export function richTextToPlain(value: LexicalRoot | string | null | undefined, maxLength = 160): string {
  if (!value) return ''
  if (typeof value === 'string') return value.slice(0, maxLength)

  const walk = (nodes: LexicalNode[] | undefined): string => {
    if (!nodes?.length) return ''
    return nodes
      .map((node) => {
        if (node.text) return node.text
        if (node.children?.length) return walk(node.children)
        return ''
      })
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  const text = walk(value.root?.children)
  if (!text) return ''
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}…` : text
}

export function renderRichTextHtml(value: LexicalRoot | null | undefined): string {
  if (!value?.root) return ''
  try {
    return convertLexicalToHTML({
      data: value as unknown as LexicalEditorState,
    })
  } catch {
    return ''
  }
}

export function formatEventDate(date: string | null | undefined): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatEventType(value: string | null | undefined): string {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function isValidExternalUrl(href: string | null | undefined): boolean {
  if (!href || href === '#') return false
  return href.startsWith('/') || href.startsWith('http://') || href.startsWith('https://')
}

const SAFE_HTML_TAGS = new Set(['a', 'br', 'strong', 'em', 'b', 'i', 'u', 'p', 'span'])

export function containsHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value)
}

export function isSafeHref(href: string): boolean {
  const trimmed = href.trim()
  if (!trimmed) return false
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return true
  return /^(https?:|mailto:|tel:)/i.test(trimmed)
}

function escapeHtmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function extractHref(attrs: string): string | null {
  const match = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i)
  const href = match?.[1] ?? match?.[2] ?? match?.[3]
  return href ? href.trim() : null
}

/**
 * Allow a small set of inline tags so CMS textarea HTML (e.g. links) can render safely.
 */
export function sanitizeSafeHtml(input: string): string {
  return input.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (match, rawTag: string, attrs: string) => {
    const tag = rawTag.toLowerCase()
    if (!SAFE_HTML_TAGS.has(tag)) return ''

    const isClosing = match.startsWith('</')
    if (tag === 'br') return '<br />'
    if (isClosing) return `</${tag}>`

    if (tag === 'a') {
      const href = extractHref(attrs)
      if (!href || !isSafeHref(href)) return ''
      return `<a href="${escapeHtmlText(href)}" rel="noopener noreferrer">`
    }

    return `<${tag}>`
  })
}
