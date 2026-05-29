import type { Media } from '@/payload-types'

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
