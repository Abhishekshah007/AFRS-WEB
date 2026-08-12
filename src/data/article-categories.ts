export const ARTICLE_CATEGORY_OPTIONS = [
  { label: 'Forensic Biology and Serology', value: 'biologySerology' },
  { label: 'Forensic DNA', value: 'dna' },
  { label: 'Forensic Chemistry and Toxicology', value: 'toxicology' },
  { label: 'Forensic Physics and Ballistics', value: 'ballistics' },
  { label: 'Fingerprint', value: 'fingerprint' },
  { label: 'Questioned Document and Handwriting', value: 'questionedDocument' },
  { label: 'Crime Scene Investigation and Management', value: 'crimeScene' },
  { label: 'Forensic Photography and Videography', value: 'forensicPhotography' },
  { label: 'Forensic Medicine', value: 'forensicMedicine' },
  { label: 'Forensic Pathology', value: 'forensicPathology' },
  { label: 'Multimedia Forensics', value: 'multimediaForensics' },
  { label: 'Forensic Instrumentation', value: 'forensicInstrumentation' },
  { label: 'Forensic Psychology', value: 'psychology' },
  { label: 'Forensic Odontology', value: 'odontology' },
  { label: 'Forensic Anthropology', value: 'forensicAnthropology' },
  { label: 'Digital and Cyber Forensics', value: 'digitalForensics' },
  { label: 'Artificial Intelligence (AI) & Machine Learning (ML)', value: 'aiMl' },
  { label: 'Forensic Biotechnology', value: 'forensicBiotechnology' },
  { label: 'Voice Analysis / Speaker Identification', value: 'voiceAnalysis' },
  { label: 'Forensic Accounting', value: 'forensicAccounting' },
] as const

export const CMS_ARTICLE_CATEGORY_OPTIONS = [
  ...ARTICLE_CATEGORY_OPTIONS,
  { label: 'General', value: 'general' },
] as const

export type ArticleCategoryValue = (typeof CMS_ARTICLE_CATEGORY_OPTIONS)[number]['value']

export const VISIBLE_ARTICLE_CATEGORY_COUNT = 4
