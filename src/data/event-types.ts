/**
 * Built-in event types. These seed the CMS "Event types" collection (see the
 * 20261121_130000_cms_taxonomies migration) and are used as display fallbacks
 * for demo content. Editors add new types in the CMS, not here.
 */
export const DEFAULT_EVENT_TYPES = [
  { label: 'Workshop', slug: 'workshop' },
  { label: 'Conference', slug: 'conference' },
  { label: 'Training', slug: 'training' },
  { label: 'Faculty Development Program', slug: 'fdp', shortLabel: 'FDP' },
  { label: 'Internship', slug: 'internship' },
  { label: 'Professional Training Program', slug: 'professional-training-program' },
  { label: 'Professional Internship Program', slug: 'professional-internship-program' },
  { label: 'Professional Workshop Program', slug: 'professional-workshop-program' },
  { label: 'Capsule Training Program', slug: 'capsule-training-program' },
  { label: 'Police Training Program', slug: 'police-training-program' },
  { label: 'Certificate Course', slug: 'certificate-course' },
  { label: 'Foundation Certificate Course', slug: 'foundation-certificate-course' },
] as const satisfies readonly { label: string; slug: string; shortLabel?: string }[]
