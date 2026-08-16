import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { ArticleSection } from '@/components/student-hub/articles/detail/types'

type LexicalEditorState = Parameters<typeof convertLexicalToHTML>[0]['data']

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  children?: LexicalNode[]
  [key: string]: unknown
}

type LexicalRoot = {
  root?: {
    children?: LexicalNode[]
    [key: string]: unknown
  }
  [key: string]: unknown
}

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

export function slugifyHeading(text: string): string {
  const slug = text
    .toLowerCase()
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || 'section'
}

function uniqueSlug(base: string, used: Set<string>): string {
  let slug = base
  let n = 2
  while (used.has(slug)) {
    slug = `${base}-${n++}`
  }
  used.add(slug)
  return slug
}

function nodeText(nodes: LexicalNode[] | undefined): string {
  if (!nodes?.length) return ''
  return nodes
    .map((node) => {
      if (node.text) return node.text
      if (node.type === 'linebreak') return '\n'
      if (node.children?.length) return nodeText(node.children)
      return ''
    })
    .join('')
}

function looksLikeHeading(text: string): boolean {
  const line = text.replace(/\s+/g, ' ').trim()
  if (!line || line.length > 80) return false
  if (/[.!]$/.test(line)) return false
  if (line.endsWith('?') || line.endsWith(':')) return true

  const words = line.split(' ')
  if (words.length === 0 || words.length > 12) return false

  const significant = words.filter((word) => !/^(a|an|the|and|or|of|in|on|for|to|is)$/i.test(word))
  if (significant.length === 0) return false
  const titled = significant.filter((word) => /^[A-Z0-9]/.test(word))
  return titled.length >= Math.ceil(significant.length * 0.6)
}

function cloneNode<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

/**
 * Word/PDF paste often lands as one paragraph with line breaks.
 * Split those into real paragraphs and promote heading-like lines.
 */
export function normalizePastedLexical(value: LexicalRoot | null | undefined): LexicalRoot | null {
  if (!value?.root?.children?.length) return value ?? null

  const data = cloneNode(value)
  const nextChildren: LexicalNode[] = []

  for (const node of data.root!.children!) {
    if (node.type !== 'paragraph' || !node.children?.some((child) => child.type === 'linebreak')) {
      nextChildren.push(node)
      continue
    }

    const chunks: LexicalNode[][] = [[]]
    for (const child of node.children) {
      if (child.type === 'linebreak') {
        chunks.push([])
        continue
      }
      chunks[chunks.length - 1].push(child)
    }

    for (const chunk of chunks) {
      const text = nodeText(chunk).trim()
      if (!text) continue
      if (looksLikeHeading(text)) {
        nextChildren.push({
          type: 'heading',
          tag: 'h2',
          children: chunk,
          version: 1,
          direction: 'ltr',
          format: '',
          indent: 0,
        })
      } else {
        nextChildren.push({
          ...node,
          children: chunk,
        })
      }
    }
  }

  data.root!.children = nextChildren
  return data
}

export function renderArticleHtml(value: LexicalRoot | null | undefined): {
  html: string
  sections: ArticleSection[]
} {
  const normalized = normalizePastedLexical(value)
  if (!normalized?.root?.children?.length) {
    return { html: '', sections: [] }
  }

  const used = new Set<string>()
  const sections: ArticleSection[] = []

  try {
    const html = convertLexicalToHTML({
      data: normalized as unknown as LexicalEditorState,
      disableContainer: true,
      converters: ({ defaultConverters }) => ({
        ...defaultConverters,
        heading: ({ node, nodesToHTML, providedStyleTag }) => {
          const children = nodesToHTML({ nodes: node.children }).join('')
          const rawTag = HEADING_TAGS.has(node.tag) ? node.tag : 'h2'
          const tag = rawTag === 'h1' ? 'h2' : rawTag
          const title = nodeText(node.children as LexicalNode[]).replace(/\s+/g, ' ').trim()
          const id = uniqueSlug(slugifyHeading(title), used)
          if (title) sections.push({ id, title })
          return `<${tag}${providedStyleTag} id="${id}">${children}</${tag}>`
        },
      }),
    })

    return { html, sections }
  } catch {
    return { html: '', sections: [] }
  }
}
