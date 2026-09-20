import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { JSDOM } from 'jsdom'

const W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
const R_NS = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
const A_NS = 'http://schemas.openxmlformats.org/drawingml/2006/main'

export type ParsedResourcePersonRow = {
  name: string
  imagePath: string
  imageBuffer: Buffer
  mimeType: string
}

function extractDocx(docxPath: string, destinationDir: string): void {
  const zipPath = join(destinationDir, 'archive.zip')
  copyFileSync(docxPath, zipPath)

  if (process.platform === 'win32') {
    execFileSync(
      'powershell',
      [
        '-NoProfile',
        '-Command',
        `Expand-Archive -LiteralPath '${zipPath.replace(/'/g, "''")}' -DestinationPath '${destinationDir.replace(/'/g, "''")}' -Force`,
      ],
      { stdio: 'pipe' },
    )
    return
  }

  execFileSync('unzip', ['-oq', zipPath, '-d', destinationDir], { stdio: 'pipe' })
}

function localName(tag: string): string {
  const index = tag.indexOf(':')
  return index >= 0 ? tag.slice(index + 1) : tag
}

function textFromElement(element: Element): string {
  const texts: string[] = []
  for (const node of element.getElementsByTagName('*')) {
    if (localName(node.tagName) === 't' && node.textContent) {
      texts.push(node.textContent)
    }
  }
  return texts.join('').trim()
}

function imageTargetFromCell(cell: Element, rels: Map<string, string>): string | null {
  for (const node of cell.getElementsByTagName('*')) {
    if (localName(node.tagName) !== 'blip') continue
    const relId = node.getAttributeNS(R_NS, 'embed') || node.getAttribute('r:embed')
    if (relId && rels.has(relId)) {
      return rels.get(relId) ?? null
    }
  }
  return null
}

function mimeTypeFromPath(imagePath: string): string {
  const lower = imagePath.toLowerCase()
  if (lower.endsWith('.png')) return 'image/png'
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg'
  if (lower.endsWith('.webp')) return 'image/webp'
  return 'application/octet-stream'
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function parseResourcePersonsDocx(docxPath: string): ParsedResourcePersonRow[] {
  const tempDir = mkdtempSync(join(tmpdir(), 'afrs-resource-persons-'))

  try {
    extractDocx(docxPath, tempDir)

    const documentXml = readFileSync(join(tempDir, 'word', 'document.xml'), 'utf8')
    const relsXml = readFileSync(join(tempDir, 'word', '_rels', 'document.xml.rels'), 'utf8')

    const rels = new Map<string, string>()
    for (const match of relsXml.matchAll(/Id="([^"]+)"[^>]+Target="([^"]+)"/g)) {
      rels.set(match[1], match[2])
    }

    const { DOMParser } = new JSDOM().window
    const doc = new DOMParser().parseFromString(documentXml, 'application/xml')
    const rows = [...doc.getElementsByTagName('*')].filter((node) => localName(node.tagName) === 'tr')

    const parsed: ParsedResourcePersonRow[] = []

    for (const row of rows) {
      const cells = [...row.getElementsByTagName('*')].filter((node) => localName(node.tagName) === 'tc')
      if (cells.length < 2) continue

      const name = textFromElement(cells[1])
      const imageTarget = imageTargetFromCell(cells[2] ?? cells[cells.length - 1], rels)

      if (!name || !imageTarget) continue

      const imagePath = join(tempDir, 'word', imageTarget.replace(/^\//, ''))
      const imageBuffer = readFileSync(imagePath)

      parsed.push({
        name,
        imagePath,
        imageBuffer,
        mimeType: mimeTypeFromPath(imageTarget),
      })
    }

    return parsed
  } finally {
    rmSync(tempDir, { recursive: true, force: true })
  }
}

export function buildPhotoFilename(name: string, order: number, imagePath: string): string {
  const ext = imagePath.toLowerCase().includes('.png') ? 'png' : 'jpg'
  const slug = slugify(name) || `person-${order}`
  return `resource-person-${String(order).padStart(2, '0')}-${slug}.${ext}`
}
