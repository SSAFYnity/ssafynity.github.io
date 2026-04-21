import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { EventDateRange, RecruitDateRange } from "@/data/constants"
import type { Event as SiteEvent } from "@/data/computed"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── 행사 상태 ────────────────────────────────────────────────────────
export type EventStatus =
  | 'past'
  | 'today-upcoming'
  | 'today-ongoing'
  | 'recruiting'
  | 'recruit-closed'
  | 'before-recruit'
  | 'no-recruit'
  | 'planning'

export const EVENT_STATUS_CONFIG: Record<EventStatus, { label: string; className: string }> = {
  'past':           { label: '종료',     className: 'bg-slate-100 text-slate-400' },
  'today-upcoming': { label: '오늘 시작', className: 'bg-orange-500 text-white' },
  'today-ongoing':  { label: '진행 중',  className: 'bg-blue-600 text-white' },
  'recruiting':     { label: '접수 중',  className: 'bg-emerald-500 text-white' },
  'recruit-closed': { label: '접수 마감', className: 'bg-slate-700 text-white' },
  'before-recruit': { label: '접수 예정', className: 'bg-amber-500 text-white' },
  'no-recruit':     { label: '운영진',   className: 'bg-slate-100 text-slate-500' },
  'planning':       { label: '계획중',   className: 'bg-slate-200 text-slate-500' },
}

export function getEventStatus(event: SiteEvent): EventStatus {
  const now   = new Date()
  const today = new Date(now); today.setHours(0, 0, 0, 0)
  const toDate = (s: string) => { const d = new Date(s); d.setHours(0, 0, 0, 0); return d }

  const eventStartDate = toDate(event.eventDate.start)
  const eventEndDate   = toDate(event.eventDate.end ?? event.eventDate.start)

  if (today > eventEndDate) return 'past'

  if (today >= eventStartDate && today <= eventEndDate) {
    if (!event.eventDate.startTime) return 'today-ongoing'

    const [sh, sm] = event.eventDate.startTime.split(':').map(Number)
    const eventStartDt = new Date(event.eventDate.start)
    eventStartDt.setHours(sh, sm, 0, 0)

    const endDateStr = event.eventDate.end ?? event.eventDate.start
    const [eh, em]   = (event.eventDate.endTime ?? '23:59').split(':').map(Number)
    const eventEndDt = new Date(endDateStr)
    eventEndDt.setHours(eh, em, 0, 0)

    if (now < eventStartDt)  return 'today-upcoming'
    if (now <= eventEndDt)   return 'today-ongoing'
    return 'past'
  }

  if (!event.recruitDate) return event.audience === 'operator' ? 'no-recruit' : 'planning'

  const recruitStart = toDate(event.recruitDate.start)
  const recruitEnd   = toDate(event.recruitDate.end ?? event.recruitDate.start)

  if (today < recruitStart) return 'before-recruit'
  if (today <= recruitEnd)  return 'recruiting'
  return 'recruit-closed'
}

// ─── 날짜 포매팅 ──────────────────────────────────────────────────────
const DAY_KO = ['일', '월', '화', '수', '목', '금', '토'] as const

/**
 * "2024-04-27" → "2024.04.27 (토)"
 */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const yyyy = d.getFullYear()
  const mm   = String(d.getMonth() + 1).padStart(2, '0')
  const dd   = String(d.getDate()).padStart(2, '0')
  const day  = DAY_KO[d.getDay()]
  return `${yyyy}.${mm}.${dd} (${day})`
}

/**
 * 하루:  "2024.04.27 (토)"
 * 양일+: "2024.04.27 (토) – 04.28 (일)"  ← 연도는 시작일에만 표시
 */
export function formatDateRange(start: string, end?: string): string {
  if (!end) return formatDate(start)
  const e   = new Date(end)
  const mm  = String(e.getMonth() + 1).padStart(2, '0')
  const dd  = String(e.getDate()).padStart(2, '0')
  const day = DAY_KO[e.getDay()]
  return `${formatDate(start)} – ${mm}.${dd} (${day})`
}

/**
 * 행사 날짜 + 시각 포매팅
 * 월만 확정:           "2026년 9월 중"
 * 후보 날짜:           "9/13 · 9/20 · 9/27 중 1일"
 * 단일, 시각 있으면:   "2024.04.27 (토) 15:00 – 16:40"
 * 단일, 시각 없으면:   "2024.04.27 (토)"
 * 다일, 시각 있으면:   "2024.04.27 (토) 12:00 – 04.28 (일) 13:00"
 * 다일, 시각 없으면:   "2024.04.27 (토) – 04.28 (일)"
 */
export function formatEventDate(range: EventDateRange): string {
  // 월만 확정
  if (range.precision === 'month') {
    const d = new Date(range.start)
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 중`
  }
  // 후보 날짜
  if (range.candidates && range.candidates.length > 0) {
    const parts = range.candidates.map(c => {
      const d = new Date(c)
      return `${d.getMonth() + 1}/${d.getDate()}`
    })
    return `${parts.join(' · ')} 중 1일`
  }
  // 다일 + 시각: 각 날짜에 시각을 붙여 표시
  if (range.end && range.startTime) {
    const e   = new Date(range.end)
    const mm  = String(e.getMonth() + 1).padStart(2, '0')
    const dd  = String(e.getDate()).padStart(2, '0')
    const day = DAY_KO[e.getDay()]
    const endPart = range.endTime
      ? `${mm}.${dd} (${day}) ${range.endTime}`
      : `${mm}.${dd} (${day})`
    return `${formatDate(range.start)} ${range.startTime} – ${endPart}`
  }
  // 단일 또는 다일 시각 없음
  const date = formatDateRange(range.start, range.end)
  if (!range.startTime) return date
  const time = range.endTime
    ? `${range.startTime} – ${range.endTime}`
    : range.startTime
  return `${date} ${time}`
}

/**
 * 접수 기간 포매팅 — startTime 기본 '00:00', endTime 기본 '23:59'
 * "2024.04.01 (월) 00:00 – 04.15 (월) 23:59"
 */
export function formatRecruitDate(range: RecruitDateRange): string {
  const startTime = range.startTime ?? '00:00'
  const endTime   = range.endTime   ?? '23:59'
  const s = formatDate(range.start)
  if (!range.end) return `${s} ${startTime} – ${endTime}`
  const e   = new Date(range.end)
  const mm  = String(e.getMonth() + 1).padStart(2, '0')
  const dd  = String(e.getDate()).padStart(2, '0')
  const day = DAY_KO[e.getDay()]
  return `${s} ${startTime} – ${mm}.${dd} (${day}) ${endTime}`
}

/**
 * 동아리 개설 시점 포매팅
 * "2023-06" → "2023년 6월"
 * "2023"    → "2023년"
 */
export function formatClubSince(since: string): string {
  const [year, month] = since.split('-')
  if (!month) return `${year}년`
  return `${year}년 ${Number(month)}월`
}
