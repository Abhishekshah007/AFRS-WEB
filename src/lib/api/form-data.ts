import type { File as PayloadFile } from 'payload'

export function getFormValue(formData: FormData, fieldName: string, defaultValue = ''): string {
  const raw = formData.get(fieldName)
  return typeof raw === 'string' ? raw.trim() : defaultValue
}

export async function readUploadFile(formData: FormData, fieldName: string): Promise<PayloadFile | undefined> {
  const file = formData.get(fieldName)
  if (!(file instanceof File) || file.size === 0) return undefined

  const buffer = Buffer.from(await file.arrayBuffer())
  return {
    name: file.name,
    mimetype: file.type || 'application/octet-stream',
    size: file.size,
    data: buffer,
  }
}
