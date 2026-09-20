import { defaultHomeFaqs } from '@/data/defaults/home'

/** @deprecated Import from `@/data/defaults/home` or use CMS home page FAQs. */
export const HOME_FAQS = defaultHomeFaqs.map(({ question, answer }) => ({
  q: question,
  a: answer,
})) as { q: string; a: string }[]
