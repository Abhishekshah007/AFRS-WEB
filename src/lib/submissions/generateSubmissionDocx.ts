import { Document, Packer, Paragraph, TextRun } from 'docx'

type DocxLine = { label: string; value?: string | number | boolean | null }

function formatValue(value: DocxLine['value']): string {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return String(value)
}

export async function buildSubmissionDocx(title: string, lines: DocxLine[]): Promise<Buffer> {
  const children: Paragraph[] = [
    new Paragraph({
      children: [new TextRun({ text: title, bold: true, size: 32 })],
      spacing: { after: 240 },
    }),
    new Paragraph({
      children: [new TextRun({ text: `Generated: ${new Date().toLocaleString('en-IN')}`, italics: true })],
      spacing: { after: 360 },
    }),
  ]

  for (const line of lines) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${line.label}: `, bold: true }),
          new TextRun({ text: formatValue(line.value) }),
        ],
        spacing: { after: 120 },
      }),
    )
  }

  const doc = new Document({
    sections: [{ children }],
  })

  return Packer.toBuffer(doc)
}

export function slugifyExportName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}
