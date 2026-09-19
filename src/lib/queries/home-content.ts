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

export function resolveHomeFaqs(homePage?: HomePage | null): HomeFaqItem[] {
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

  return defaultHomeFaqs.map(({ question, answer }) => ({ q: question, a: answer }))
}

export function mapHomeNotices(notices: Notice[]): HomeNoticeBoardItem[] {
  if (notices.length === 0) {
    return defaultHomeNoticeBoardItems.map((item, index) => ({
      id: `fallback-${index}`,
      title: item.title,
      date: item.date,
      href: item.href,
    }))
  }

  return notices.map((notice) => ({
    id: notice.id,
    title: notice.title,
    date: formatNoticeDate(notice.noticeDate),
    href: notice.href?.trim() || '/notices',
  }))
}
