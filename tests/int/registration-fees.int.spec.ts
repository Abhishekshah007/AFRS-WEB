import { describe, expect, it } from 'vitest'
import { categoriesToFeeTiers, feeTiersForRegion } from '@/lib/registration/resolveConfig'

describe('event registration fee categories', () => {
  it('keeps Indian and international categories in their own participant groups', () => {
    const tiers = categoriesToFeeTiers(
      [{ id: 'indian-student', categoryName: 'Students', price: 300, currency: 'INR' }],
      [{ id: 'international-student', categoryName: 'Students', price: 10, currency: 'USD' }],
    )

    expect(feeTiersForRegion(tiers, 'indian').map((tier) => tier.id)).toEqual(['indian-student'])
    expect(feeTiersForRegion(tiers, 'international').map((tier) => tier.id)).toEqual([
      'international-student',
    ])
  })

  it('allows events to omit international categories', () => {
    const tiers = categoriesToFeeTiers([
      { id: 'indian-student', categoryName: 'Students', price: 300, currency: 'INR' },
    ])

    expect(feeTiersForRegion(tiers, 'indian')).toHaveLength(1)
    expect(feeTiersForRegion(tiers, 'international')).toEqual([])
  })
})
