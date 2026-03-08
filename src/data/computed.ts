// src/data/computed.ts
// 여러 데이터 파일을 조합해 자동으로 계산되는 값들.
// 컴포넌트에서는 이 파일만 import해서 사용하세요.
//
// 새 연도 행사 파일 추가 시:
//   1. events/{year}.ts 생성
//   2. 아래 import 추가
//   3. allEvents spread에 추가
//
// 새 운영진 연도 파일 추가 시:
//   1. operator/{year}.ts 생성
//   2. 아래 import 추가
//   3. allOperators 배열에 추가

import { siteData } from './siteData'
import { preClubs } from './preClubs'
export type { PreClub } from './preClubs'
export { PRE_CLUB_MIN_MEMBERS } from './preClubs'
import { club as futsalClub } from './clubs/futsal-club'
import { club as sideProjectClub } from './clubs/side-project'
import { club as bookClub } from './clubs/book-club'
// 새 정식 동아리 추가 시: clubs/{slug}.ts 생성 후 import + allClubs에 추가
import { events2022 } from './events/2022'
import type { PartnerType, Status, Event, EventDateRange, RecruitDateRange } from './constants'
import { partnerSamsung } from './partners/samsung'
import { partnerMulticampus } from './partners/multicampus'
import { partnerSsafy } from './partners/ssafy'
// 새 협력사 추가 시: partners/{slug}.ts 생성 후 import + allPartners에 추가
import { events2023 } from './events/2023'
import { events2024 } from './events/2024'
import { events2025 } from './events/2025'
import { events2026 } from './events/2026'
// 새 연도 추가 시: events/{year}.ts 생성 후 import + allEvents에 추가
import { operator2022 } from './operator/2022'
import { operator2023 } from './operator/2023'
import { operator2024 } from './operator/2024'
import { operator2025 } from './operator/2025'
import { operator2026 } from './operator/2026'
// 새 운영진 추가 시: operator/{year}.ts 생성 후 import + allOperators에 추가

// ─── 행사 전체 목록 ───────────────────────────────────────────
export type { Event, EventDateRange, RecruitDateRange }  // constants.ts에서 re-export

export const allEvents: Event[] = [
  ...events2022,
  ...events2023,
  ...events2024,
  ...events2025,
  ...events2026,
]

// ─── 운영진 전체 목록 ─────────────────────────────────────────
export type OperatorMember = {
  role:        string
  name?:       string
  cohort?:     number
  campus?:     string
  url?:        string   // 대표 URL (GitHub, LinkedIn 등) — 동의한 인원만 기재
  council?:    boolean  // 회장단 여부 (회장/부회장 등)
  concurrent?: boolean
  vacant?:     boolean
}

export type OperatorGroup = {
  name:       string
  nameEn?:    string  // 영문 팀명 (조직 안내 카드 상단 표시용)
  desc:       string
  members:    readonly OperatorMember[]
  vacancies?: number  // 현재 모집 인원 (0이면 마감, undefined면 미표시)
}

export type OperatorAchievement = {
  text: string
}

export type Operator = {
  generation:    number
  year:          number
  memberCount?:  number
  teamCount?:    number
  note?:         string
  achievements?: readonly OperatorAchievement[]  // 최대 3개까지만 작성
  groups:        readonly OperatorGroup[]
}

export const allOperators: Operator[] = [
  operator2022,
  operator2023,
  operator2024,
  operator2025,
  operator2026,
]
// 새 운영진 추가 시 여기에도 추가

export const currentOperator: Operator = allOperators[allOperators.length - 1]

// ─── 협력사 전체 목록 ─────────────────────────────────────────
export type Partner = {
  slug:      string
  name:      string
  types:     readonly PartnerType[]
  status:    Status
  desc:      string
  keywords?: string[]
  logo:      string
  url:       string
}

export const allPartners: Partner[] = [partnerSamsung, partnerMulticampus, partnerSsafy]
// 새 협력사 추가 시 여기에도 추가

// ─── 정식 동아리 타입 ─────────────────────────────────────────
export type Club = {
  slug:        string
  name:        string
  category:    string   // 기술·개발 | 스포츠·운동 | 창작·예술 | 게임·취미 | 친목·여행 | 봉사
  shortDesc:   string
  desc:        string
  activities:  string
  memberCount: number
  recruiting:  boolean
  contact:     string
  since:       string
  images:      string[]
}

export const allClubs: Club[] = [
  futsalClub,
  sideProjectClub,
  bookClub,
]
// 새 정식 동아리 추가 시: clubs/{slug}.ts 생성 후 import + 여기에 추가

// ─── 예비 동아리 목록 ─────────────────────────────────────────
export const allPreClubs = preClubs

// ─── 플레이스홀더 필터 ─────────────────────────────────────────
const validClubs = siteData.clubSlugs.filter(s => s !== '[업데이트 필요]')

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

  /** 누적 행사 참가자 수 — 각 행사의 attendees 합산 */
  totalParticipants: allEvents.reduce((sum, e) => {
    const p = e.attendees
    if (!p) return sum
    return sum + (p.members ?? 0) + (p.regular ?? 0) + (p.external ?? 0) + (p.operator ?? 0) + (p.partner ?? 0) + (p.invited ?? 0)
  }, 0),

  /** 동아리 수 — clubSlugs 기준 (플레이스홀더 제외) */
  clubCount: validClubs.length,

  /** 협력사 수 — allPartners 기준 */
  partnerCount: allPartners.length,
}
