import { defaultHomeFaqs, defaultHomeNoticeBoardItems } from '@/data/defaults/home'
import { formatNoticeDate } from '@/lib/cms'
import type { HomePage, Notice } from '@/payload-types'

export type HomeFaqItem = {
  q: string
  a: string
}

export type HomeNoticeBoardItem = {
  id: string | number
  title: string
  date: string
  href: string
}

type ContentFallbackOptions = {
  /** Use bundled defaults only when the CMS is unavailable (not when the list is intentionally empty). */
  usePlaceholderDefaults?: boolean
}

export function resolveHomeFaqs(
  homePage?: HomePage | null,
  options?: ContentFallbackOptions,
): HomeFaqItem[] {
  const cmsFaqs = homePage?.faqs

  if (Array.isArray(cmsFaqs) && cmsFaqs.length > 0) {
    const normalized = cmsFaqs
      .map((item) => ({
        q: item.question?.trim() ?? '',
        a: item.answer?.trim() ?? '',
      }))
      .filter((item) => item.q && item.a)

    if (normalized.length > 0) {
      return normalized
    }
  }

  if (options?.usePlaceholderDefaults) {
    return defaultHomeFaqs.map(({ question, answer }) => ({ q: question, a: answer }))
  }

  return []
}

export function mapHomeNotices(
  notices: Notice[],
  options?: ContentFallbackOptions,
): HomeNoticeBoardItem[] {
  if (notices.length === 0) {
    if (options?.usePlaceholderDefaults) {
      return defaultHomeNoticeBoardItems.map((item, index) => ({
        id: `fallback-${index}`,
        title: item.title,
        date: item.date,
        href: item.href,
      }))
    }
    return []
  }

  return notices.map((notice) => ({
    id: notice.id,
    title: notice.title,
    date: formatNoticeDate(notice.noticeDate),
    href: notice.href?.trim() || '/notices',
  }))
}
