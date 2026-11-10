import { describe, expect, it } from 'vitest'
import { getResourcePersonDirectoryEntry } from '@/components/programmes/resourcePersonDirectory'

describe('resource person directory', () => {
  it('matches names despite honorific and punctuation differences', () => {
    expect(getResourcePersonDirectoryEntry('Sayeed Ahmed')).toEqual({
      name: 'Dr. Sayeed Ahmed',
      designation: 'Deputy Director, CFSL',
    })
  })

  it('uses the spreadsheet designation while preserving an existing honorific', () => {
    expect(getResourcePersonDirectoryEntry('Ms. Kamini Bhoir')).toEqual({
      name: 'Ms. Kamini Bhoir',
      designation: 'Forensic Expert',
    })
  })

  it('does not guess honorifics that are missing from the source', () => {
    expect(getResourcePersonDirectoryEntry('Rakesh Gupta')).toEqual({
      name: 'Rakesh Gupta',
      designation: 'Former Joint Director (Admin); Forensic Expert',
    })
  })

  it('returns no directory data for an unmatched name', () => {
    expect(getResourcePersonDirectoryEntry('Unlisted Person')).toBeUndefined()
  })
})
