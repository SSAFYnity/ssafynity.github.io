// 사이트 전반에서 공유하는 상수 및 레이블 매핑

// ─── 행사 종류 / 참여 대상 ───────────────────────────────────────────
export const EVENT_KIND_LABEL = {
  regular: '정기',
  ongoing: '상시',
} as const

export type EventKind = keyof typeof EVENT_KIND_LABEL

export const EVENT_AUDIENCE_LABEL = {
  open:     '공개',
  members:  '동문회',
  regular:  '정회원',
  operator: '운영진',
} as const

export type EventAudience = keyof typeof EVENT_AUDIENCE_LABEL

// ─── 행사 진행 방식 ──────────────────────────────────────────────────
// 복수 선택 가능 (예: ['online', 'offline', 'recorded'])
export const EVENT_FORMAT_LABEL = {
  online:   '온라인',
  offline:  '오프라인',
  recorded: '녹화제공',
} as const

export type EventFormat = keyof typeof EVENT_FORMAT_LABEL

export const FORMAT_ORDER: EventFormat[] = ['offline', 'online', 'recorded']

// ─── 행사 날짜 ──────────────────────────────────────────────────────
// 날짜 범위 — 하루면 end 생략, 여러 날이면 end 기재
export type EventDateRange = {
  start:      string   // 시작일 (YYYY-MM-DD)
  end?:       string   // 종료일 (YYYY-MM-DD) — 당일 행사면 생략
  startTime?: string   // 시작 시각 (예: '19:00')
  endTime?:   string   // 종료 시각 (예: '21:00')
}

// 접수 기간 — 시각 생략 시 기본값: startTime '00:00' / endTime '23:59'
export type RecruitDateRange = {
  start:      string   // 접수 시작일 (YYYY-MM-DD)
  end?:       string   // 접수 종료일 (YYYY-MM-DD)
  startTime?: string   // 접수 시작 시각 (기본 '00:00')
  endTime?:   string   // 접수 종료 시각 (기본 '23:59')
}

// ─── 행사 참여자 분류 ────────────────────────────────────────────────
export type ParticipantBreakdown = {
  members?:  number  // 일반회원
  regular?:  number  // 정회원
  external?: number  // 외부인
  operator?: number  // 운영진
  partner?:  number  // 관계자 (후원/협력사)
  invited?:  number  // 초청인원 (발표자/VIP)
}

export type Event = {
  slug:          string          // URL 식별자 겸 이미지 파일명 기준 (예: '2022-founding-ceremony')
  title:         string
  eventDate:     EventDateRange          // 행사 날짜 (하루 또는 여러 날)
  recruitDate?:  RecruitDateRange        // 모집 기간 (시작 ~ 마감)
  location?:     string
  locationUrl?: {
    naver?:  string
    kakao?:  string
    google?: string
  }
  format:        readonly [EventFormat, ...EventFormat[]]  // 진행 방식 (최소 1개 필수)
  kind?:         EventKind               // 정기(연 2회) / 상시(비정기 소규모)
  audience?:     EventAudience           // 동문회원 / 정회원(정회원 전용) / 공개(외부인 포함)
  keywords?:     string[]                // 검색용 태그
  summary:       string
  img:           string
  formUrl?:      string                  // 접수 폼 URL (만료되면 생략)
  capacity?:     number                  // 정원
  registrants?:  ParticipantBreakdown   // 최종 접수자
  attendees?:    ParticipantBreakdown   // 실제 참여자
  note?:         string                  // 내부 메모 (운영진 참고용, 사이트에 노출 안 됨)
  internal?:     boolean                 // true면 행사 일정에서 제외, 역대 행사에는 표시
}

// ─── 공통 상태 ──────────────────────────────────────────────────────
// 협력사, 동아리, 운영진 등 여러 곳에서 재사용
export const STATUS_LABEL = {
  active:   '현재',
  inactive: '이전',
} as const

export type Status = keyof typeof STATUS_LABEL

// ─── 협력사 유형 ────────────────────────────────────────────────────
export const PARTNER_TYPES = {
  founding:   { label: '창립 파트너', desc: '싸피니티의 모체로, SSAFY 프로그램을 주관하며 동문회의 출발점이 된 기관입니다.' },
  financial:  { label: '재정 후원',   desc: '동문회 운영에 필요한 재정을 직접 지원하는 파트너입니다.' },
  goods:      { label: '물품 후원',   desc: '행사 및 활동에 필요한 물품을 제공하는 파트너입니다.' },
  promotion:  { label: '홍보 협력',   desc: '싸피니티의 활동과 소식을 함께 알리는 홍보 협력 파트너입니다.' },
  talent:     { label: '재능 기부',   desc: '디자인·법무·기술 등 전문 역량을 무상으로 제공하는 파트너입니다.' },
  operations: { label: '운영 지원',   desc: '공간, 플랫폼, 인프라 등 동문회 운영 전반을 지원하는 파트너입니다.' },
} as const

export type PartnerType = keyof typeof PARTNER_TYPES

// 하위 호환 — label만 필요한 곳에서 사용
export const PARTNER_TYPE_LABEL: { [K in PartnerType]: string } = {
  founding:   PARTNER_TYPES.founding.label,
  financial:  PARTNER_TYPES.financial.label,
  goods:      PARTNER_TYPES.goods.label,
  promotion:  PARTNER_TYPES.promotion.label,
  talent:     PARTNER_TYPES.talent.label,
  operations: PARTNER_TYPES.operations.label,
}
