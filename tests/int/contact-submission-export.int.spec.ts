import { beforeEach, describe, expect, it, vi } from 'vitest'

const { buildSubmissionDocx, sendSubmissionNotification, logCmsError } = vi.hoisted(() => ({
  buildSubmissionDocx: vi.fn(),
  sendSubmissionNotification: vi.fn(),
  logCmsError: vi.fn(),
}))

vi.mock('@/lib/submissions/generateSubmissionDocx', () => ({
  buildSubmissionDocx,
  slugifyExportName: vi.fn(() => 'afsl-lab-inquiry-submission'),
}))

vi.mock('@/lib/email/sendSubmissionNotification', () => ({
  flattenDocForEmail: vi.fn(() => []),
  sendSubmissionNotification,
}))

vi.mock('@/lib/resilience/logger', () => ({ logCmsError }))

import { contactSubmissionExportHook } from '@/lib/submissions/attachSubmissionExport'

describe('contact submission side effects', () => {
  const doc = {
    id: 'inquiry-1',
    fullName: 'Test Client',
    formType: 'labInquiry',
  }
  const mediaCreate = vi.fn()
  const contactUpdate = vi.fn()
  const req = {
    payload: {
      create: mediaCreate,
      update: contactUpdate,
    },
  } as unknown as Parameters<ReturnType<typeof contactSubmissionExportHook>>[0]['req']
  const runHook = contactSubmissionExportHook()

  beforeEach(() => {
    vi.clearAllMocks()
    buildSubmissionDocx.mockResolvedValue(Buffer.from('docx'))
    mediaCreate.mockResolvedValue({ id: 'media-1' })
    contactUpdate.mockResolvedValue({})
    sendSubmissionNotification.mockResolvedValue(undefined)
  })

  it('notifies the team even if the DOCX export fails', async () => {
    buildSubmissionDocx.mockRejectedValue(new Error('DOCX generation failed'))

    await expect(
      runHook({ doc, req, operation: 'create' }),
    ).resolves.toBeUndefined()

    expect(sendSubmissionNotification).toHaveBeenCalledOnce()
    expect(logCmsError).toHaveBeenCalledWith(
      'contactSubmissionExport',
      expect.any(Error),
      { collection: 'contactMessages', id: doc.id },
    )
  })

  it('keeps a saved inquiry successful if notification delivery fails', async () => {
    sendSubmissionNotification.mockRejectedValue(new Error('Email delivery failed'))

    await expect(
      runHook({ doc, req, operation: 'create' }),
    ).resolves.toBeUndefined()

    expect(mediaCreate).toHaveBeenCalledOnce()
    expect(contactUpdate).toHaveBeenCalledOnce()
    expect(logCmsError).toHaveBeenCalledWith(
      'contactSubmissionNotify',
      expect.any(Error),
      { collection: 'contactMessages', id: doc.id },
    )
  })
})
