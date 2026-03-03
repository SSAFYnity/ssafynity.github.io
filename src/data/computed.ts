// src/data/computed.ts
// 여러 데이터 파일을 조합해 자동으로 계산되는 값들.
// 컴포넌트에서는 이 파일만 import해서 사용하세요.
//
// 새 연도 행사 파일 추가 시:
//   1. events/{year}.ts 생성
//   2. 아래 import 추가
//   3. allEvents spread에 추가

import { siteData } from './siteData'
import { events2022 } from './events/2022'
import { events2023 } from './events/2023'
import { events2024 } from './events/2024'
import { events2025 } from './events/2025'
import { events2026 } from './events/2026'
// 새 연도 추가 시: events/{year}.ts 생성 후 import + allEvents에 추가

// ─── 행사 전체 목록 ───────────────────────────────────────────
const allEvents = [
  ...events2022,
  ...events2023,
  ...events2024,
  ...events2025,
  ...events2026,
]

// ─── 플레이스홀더 필터 ─────────────────────────────────────────
const validClubs    = siteData.clubSlugs.filter(s => s !== '[업데이트 필요]')
const validPartners = siteData.partnerSlugs.filter(s => s !== '[업데이트 필요]')

// ─── 계산값 ───────────────────────────────────────────────────
export const computed = {
  /** 함께하는 동문 수 — cohortStats count 합산 */
  totalMembers: siteData.cohortStats.reduce((sum, c) => sum + c.count, 0),

  /** 참여 기수 수 — cohortStats 항목 수 */
  cohortCount: siteData.cohortStats.length,

  /** 운영 연수 — teamGenerations 파일 수 기준 (연도 파일 추가 시 자동) */
  operationYears: siteData.teamGenerations.length,

  /** 누적 행사 횟수 — events/{year}.ts 항목 합산 */
  totalEvents: allEvents.length,

  /** 누적 행사 참가자 수 — 각 행사의 participants 합산 */
  totalParticipants: allEvents.reduce((sum, e) => sum + e.participants, 0),

  /** 동아리 수 — clubSlugs 기준 (플레이스홀더 제외) */
  clubCount: validClubs.length,

  /** 파트너사 수 — partnerSlugs 기준 (플레이스홀더 제외) */
  partnerCount: validPartners.length,
}
