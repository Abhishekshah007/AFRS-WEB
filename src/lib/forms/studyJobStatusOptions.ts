/** Default dropdown choices when CMS field is “current study / job status”. */
export const STUDY_JOB_STATUS_OPTIONS = [
  'School Student (10th / 12th)',
  'Undergraduate Student',
  'Postgraduate Student',
  'Research Scholar / PhD',
  'Intern / Trainee',
  'Employed — Government',
  'Employed — Private sector',
  'Self-employed / Practitioner',
  'Faculty / Academic',
  'Unemployed / Between roles',
  'Other',
].join(', ')

export function isStudyOrJobStatusField(field: { label?: string | null; name?: string | null }): boolean {
  const haystack = `${field.label || ''} ${field.name || ''}`.toLowerCase()
  return haystack.includes('study') || haystack.includes('job') || haystack.includes('employment')
}

export function isOtherSelectValue(value: string): boolean {
  return /^other\b/i.test(value.trim())
}
