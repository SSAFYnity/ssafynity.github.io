import { siteData } from '@/data/siteData'

export type EventBlogRecord = {
  journalPath?: string
  reviewPath?: string
}

function getBlogBaseUrl() {
  if (import.meta.env.DEV) {
    return siteData.sites.development.blog
  }

  return siteData.sites.production.blog
}

const eventBlogRecords: Record<string, EventBlogRecord> = {
  '2022-founding-ceremony': { journalPath: '/blog/journal/2022-06-14-launch-ceremony/' },
  '2022-operator-mt': { journalPath: '/blog/journal/2022-08-10-executive-mt/' },
  '2022-open-talk': { journalPath: '/blog/journal/2022-08-29-open-talk/' },
  '2022-sports-day': { journalPath: '/blog/journal/2022-10-24-fall-sports-day/' },
  '2023-night-of-ssafynity': { journalPath: '/blog/journal/2023-01-19-night-of-ssafynity/' },
  '2023-operator-spring-mt': { journalPath: '/blog/journal/2023-04-09-spring-executive-mt/' },
  '2023-ssafynale': { journalPath: '/blog/journal/2023-06-14-ssafynale/' },
  '2023-sports-day': { journalPath: '/blog/journal/2023-09-25-fall-sports-day/' },
  '2023-seminar': { journalPath: '/blog/journal/2023-11-27-first-seminar/' },
  '2024-night-of-ssafynity': { journalPath: '/blog/journal/2024-02-26-night-of-ssafynity/' },
  '2024-sports-day': { journalPath: '/blog/journal/2024-10-25-fall-sports-day/' },
  '2025-night-of-ssafynity': { journalPath: '/blog/journal/2025-04-06-night-of-ssafynity/' },
} as const

export function getEventBlogRecord(slug: string): EventBlogRecord {
  const record = eventBlogRecords[slug]

  if (!record) return {}

  const baseUrl = getBlogBaseUrl()

  return {
    journalPath: record.journalPath ? `${baseUrl}${record.journalPath.replace('/blog', '')}` : undefined,
    reviewPath: record.reviewPath ? `${baseUrl}${record.reviewPath.replace('/blog', '')}` : undefined,
  }
}
