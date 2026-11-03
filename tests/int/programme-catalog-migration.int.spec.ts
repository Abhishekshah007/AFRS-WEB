import { describe, expect, it, vi } from 'vitest'
import type { Payload, PayloadRequest } from 'payload'

import { migrateProgrammeCatalogToCollections } from '@/lib/migrations/programmeCatalogDataMigration'
import type { ProgrammesCatalog } from '@/payload-types'

describe('programme catalogue data migration', () => {
  it('moves category copy, stable programme IDs, and registration settings into records', async () => {
    const legacy = {
      educationCategories: [
        {
          slug: 'education-category',
          icon: 'Video',
          title: 'Education category',
          summary: 'Education summary',
          intro: 'Education intro',
          programmes: [
            {
              id: 'education-programme-1',
              organization: 'afsl',
              title: 'Education programme',
              description: 'Programme description',
              duration: '1 month',
              mode: 'Online',
              eventSlug: 'scheduled-event',
              registration: {
                registrationType: 'paid_manual',
                participantRegion: 'both',
                feeTiers: [{ label: 'Students', amount: 125, currency: 'INR' }],
                useGlobalPaymentDetails: false,
                paymentInstructions: { accountName: 'AFSL' },
                useGlobalInstructions: false,
                instructions: 'Read before registering',
                requireAgreement: true,
              },
            },
          ],
        },
      ],
      trainingCategories: [
        {
          slug: 'education-category',
          icon: 'FlaskConical',
          title: 'Training category',
          tag: 'On-site',
          tagTone: 'green',
          summary: 'Training summary',
          body: 'Full training page copy',
          whoCanApply: [{ text: 'Students' }],
          outcomes: [{ text: 'Practical skills' }],
          missionItems: [{ text: 'Build expertise' }],
          extraSections: [
            {
              title: 'Resources',
              note: 'Read more',
              items: [{ text: 'Study guide' }],
            },
          ],
          programmes: [],
        },
      ],
    } as unknown as ProgrammesCatalog

    const created: Array<{ collection: string; data: Record<string, unknown> }> = []
    let id = 1
    const payload = {
      findGlobal: vi.fn().mockResolvedValue(legacy),
      find: vi.fn().mockResolvedValue({ docs: [], hasNextPage: false }),
      create: vi.fn(
        async ({ collection, data }: { collection: string; data: Record<string, unknown> }) => {
          created.push({ collection, data })
          return { ...data, id: id++ }
        },
      ),
      updateGlobal: vi.fn().mockResolvedValue({}),
    } as unknown as Payload
    const req = {} as PayloadRequest

    await migrateProgrammeCatalogToCollections(payload, req)

    const category = created.find(
      (record) => record.collection === 'programmeCategories' && record.data.kind === 'training',
    )
    expect(category?.data).toMatchObject({
      kind: 'training',
      title: 'Training category',
      body: 'Full training page copy',
      whoCanApply: [{ text: 'Students' }],
      outcomes: [{ text: 'Practical skills' }],
      missionItems: [{ text: 'Build expertise' }],
      extraSections: [{ title: 'Resources', note: 'Read more', items: [{ text: 'Study guide' }] }],
    })

    const programme = created.find((record) => record.collection === 'programmes')
    expect(programme?.data).toMatchObject({
      programmeId: 'education-programme-1',
      category: 1,
      organization: 'afsl',
      eventSlug: 'scheduled-event',
      registration: {
        registrationType: 'paid_manual',
        feeTiers: [{ label: 'Students', amount: 125, currency: 'INR' }],
        paymentInstructions: { accountName: 'AFSL' },
        instructions: 'Read before registering',
      },
    })
    expect(payload.updateGlobal).toHaveBeenCalledWith(
      expect.objectContaining({
        data: { educationCategories: [], trainingCategories: [] },
        req,
      }),
    )
  })
})
