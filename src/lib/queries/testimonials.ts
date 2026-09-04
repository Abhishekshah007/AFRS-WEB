import type { Where } from 'payload'

export type TestimonialPlacement = 'afrs' | 'afsl'

export const testimonialDisplayOptions = [
  { label: 'AFRS Home', value: 'afrs' },
  { label: 'AFSL Forensic Services', value: 'afsl' },
  { label: 'Both AFRS & AFSL', value: 'both' },
] as const

export type TestimonialDisplayOn = (typeof testimonialDisplayOptions)[number]['value']

/** Published testimonials that should appear on the given site section. */
export function testimonialPlacementWhere(placement: TestimonialPlacement): Where {
  return {
    and: [
      { published: { equals: true } },
      {
        or: [{ displayOn: { equals: placement } }, { displayOn: { equals: 'both' } }],
      },
    ],
  }
}
