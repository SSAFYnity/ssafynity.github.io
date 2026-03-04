// 사이트 전반에서 공유하는 상수 및 레이블 매핑

// ─── 행사 타입 ──────────────────────────────────────────────────────
export type EventDate = {
  start:          string   // 행사 시작일 (YYYY-MM-DD)
  end?:           string   // 행사 종료일 — 양일 이상일 때만 기재
  recruitStart?:  string   // 모집 시작일
  recruitEnd?:    string   // 모집 마감일
}

export type Event = {
  title:        string
  date:         EventDate
  location:     string
  category:     string
  summary:      string
  img:          string
  upcoming:     boolean
  formUrl:      string
  participants: number
  internal?:    boolean  // true면 행사 일정에서 제외, 역대 행사에는 표시
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
