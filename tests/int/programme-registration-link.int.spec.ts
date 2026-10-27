import { describe, expect, it } from 'vitest'
import { getProgrammeCta } from '@/components/programmes/registrationLink'

const programme = {
  id: 'internship-1',
  title: 'Forensic Internship',
  description: 'Practical training',
  duration: '1 month',
  mode: 'Online',
}

describe('programme registration links', () => {
  it('keeps the existing interest form when no event is scheduled', () => {
    const cta = getProgrammeCta(programme, {
      type: 'training',
      categorySlug: 'online-internship',
      categoryTitle: 'Online Internship',
    })

    expect(cta.label).toBe('Register Interest')
    expect(cta.href).toContain('/courses/register?')
    expect(cta.href).toContain('categorySlug=online-internship')
    expect(cta.href).toContain('programmeId=internship-1')
  })

  it('opens the scheduled event and changes the call to action', () => {
    const cta = getProgrammeCta(
      { ...programme, eventSlug: 'forensic-internship-november' },
      {
        type: 'training',
        categorySlug: 'online-internship',
        categoryTitle: 'Online Internship',
      },
    )

    expect(cta).toEqual({
      href: '/events/forensic-internship-november',
      label: 'Register Now',
    })
  })

  it('does not use an invalid CMS slug as a route', () => {
    const cta = getProgrammeCta(
      { ...programme, eventSlug: '../external-site' },
      { type: 'education', categoryTitle: 'Online Training' },
    )

    expect(cta.label).toBe('Register Interest')
    expect(cta.href).toContain('/courses/register?')
  })
})
