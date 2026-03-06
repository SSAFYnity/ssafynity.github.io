import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { EventDateRange, RecruitDateRange } from "@/data/constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
