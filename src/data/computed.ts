// src/data/computed.ts
// 여러 데이터 파일을 조합해 자동으로 계산되는 값들.
// 컴포넌트에서는 이 파일만 import해서 사용하세요.
//
// 새 연도 행사 파일 추가 시 (권장):
//   1. events/{year}.ts 생성
//   2. src/data/events/index.ts에 import 추가
//   3. src/data/events/index.ts의 allEvents spread에 추가
//
// 새 운영진 연도 파일 추가 시 (권장):
//   1. operator/{year}.ts 생성
//   2. src/data/operator/index.ts에 import 추가
//   3. src/data/operator/index.ts의 operatorData 배열에 추가

import { siteData } from './siteData'
import { preClubs } from './preClubs'
import { allEvents } from './events'
import { operatorData } from './operator'
export type { PreClub } from './preClubs'
export { PRE_CLUB_MIN_MEMBERS } from './preClubs'
// 새 정식 동아리 추가 시: clubs/{slug}.ts 생성 후 import + allClubs에 추가
import type { PartnerType, PartnerCategory, Status } from './constants'
import { partnerSsafy } from './partners/ssafy'
// 새 협력사 추가 시: partners/{slug}.ts 생성 후 import + allPartners에 추가
// 새 연도 추가 시: events/{year}.ts 생성 후 import + allEvents에 추가
// 새 운영진 추가 시: operator/{year}.ts 생성 후 import + allOperators에 추가

// ─── 행사 전체 목록 ───────────────────────────────────────────
export type { Event, EventDateRange, RecruitDateRange } from './constants'
export { allEvents }

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

export const allOperators: Operator[] = operatorData as unknown as Operator[]
// 새 운영진 추가 시: src/data/operator/index.ts에 추가

export const currentOperator: Operator = allOperators[allOperators.length - 1]

// ─── 협력사 전체 목록 ─────────────────────────────────────────
export type Partner = {
  slug:      string
  name:      string
  category:  PartnerCategory          // 파트너 본질 — 후원사 / 제휴사 / 창립 파트너
  types:     readonly PartnerType[]   // 세부 지원 방식 (복수 선택 가능)
  status:    Status
  period?:   { start: string; end?: string }  // YYYY.MM — founding은 생략, end 없으면 현재 진행 중
  desc:      string
  keywords?: string[]
  logo:      string
  url:       string
}

export const allPartners: Partner[] = [partnerSsafy]
// 새 협력사 추가 시 여기에도 추가

// ─── 정식 동아리 타입 ─────────────────────────────────────────
import { type ClubCategoryKey, type ModeKey } from '@/data/constants'

// 연락처 아이콘 종류
// apply: 가입 신청 | direct: 대표자 연락 | kakao: 카카오톡 | discord: 디스코드
// github: GitHub | notion: 노션 | link: 일반 링크
export type ContactIconKey = 'apply' | 'direct' | 'kakao' | 'discord' | 'github' | 'notion' | 'link'

export type Club = {
  slug:        string
  name:        string
  category:    ClubCategoryKey   // categories.ts 참조
  shortDesc:   string
  desc:        string
  activities:  string | string[]
  memberCount: number
  contacts:    { label: string; url: string; icon?: ContactIconKey }[]  // CTA 버튼 목록 (첫 번째가 primary)
  since:       string
  images:      string[]
  keywords?:   string[]
  modes?:       readonly ModeKey[]                  // 활동 형태 (복수 선택 가능)
  fee?:         string                           // 회비 (예: '없음', '월 5,000원')
  target?:      string | string[]               // 모집 대상 (예: 'SSAFY 수료생 누구나')
  schedule?:    string | string[]               // 정기 일정 (예: '매주 토요일 오전 10시')
  region?:      string                           // 활동 지역 (예: '서울·경기', '전국 (온라인)')
  joinProcess?: string[]                         // 가입 절차 단계 (예: ['오픈채팅 참여', '자기소개', '승인'])
  notes?:         string[]                        // 유의사항 (예: ['3회 미참석 시 탈퇴', '비용 개인 부담'])
  achievements?:  string[]                        // 주요 성과 (예: ['서비스 3개 배포', '누적 참여자 30명+'])
  links?:         { label: string; url: string }[]  // 추가 링크 (예: [{ label: 'GitHub', url: '...' }])
}

export const allClubs: Club[] = [
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
