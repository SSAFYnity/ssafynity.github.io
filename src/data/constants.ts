// 사이트 전반에서 공유하는 상수 및 레이블 매핑

// ─── 행사 종류 / 참여 대상 ───────────────────────────────────────────
export type EventKind = 'regular' | 'ongoing' | 'special'

export const EVENT_KIND: Record<EventKind, { label: string; desc: string }> = {
  regular: {
    label: '정기 행사',
    desc:  'SSAFYnity를 대표하는 대규모 정기 행사예요.\n연 2회(상*하반기 1회씩), 50~100명 이상 규모로 진행되는 동문회의 정체성을 담은 행사입니다',
  },
  ongoing: {
    label: '상시 행사',
    desc:  '비정기적인 소규모 행사를 상시 운영합니다.\n주로 정회원 위주의 행사로 진행되며, 일부 공석에 대해서 일반회원도 참여할 수 있어요..',
  },
  special: {
    label: '단발성 행사',
    desc:  '일회성으로 기획된 특별 행사예요.\n정기·상시 일정과 별개로, 특정 목적이나 기회에 맞춰 열리는 행사입니다.',
  },
}

// label만 필요한 곳에서 사용
export const EVENT_KIND_LABEL: { [K in EventKind]: string } = {
  regular: EVENT_KIND.regular.label,
  ongoing: EVENT_KIND.ongoing.label,
  special: EVENT_KIND.special.label,
}

export const EVENT_AUDIENCE = {
  open:     { label: '공개',    desc: '동문 여부와 관계없이 누구나 참여할 수 있어요.' },
  members:  { label: '동문회',  desc: '동문회원이라면 누구나 참여할 수 있어요.' },
  regular:  { label: '정회원',  desc: '정회원만 참여할 수 있는 행사예요.' },
  operator: { label: '운영진',  desc: '운영진만 참여하는 내부 행사예요.' },
} as const

export type EventAudience = keyof typeof EVENT_AUDIENCE

// label만 필요한 곳에서 사용
export const EVENT_AUDIENCE_LABEL: { [K in EventAudience]: string } = {
  open:     EVENT_AUDIENCE.open.label,
  members:  EVENT_AUDIENCE.members.label,
  regular:  EVENT_AUDIENCE.regular.label,
  operator: EVENT_AUDIENCE.operator.label,
}

// ─── 행사 진행 방식 ──────────────────────────────────────────────────
// 복수 선택 가능 (예: ['online', 'offline', 'recorded'])
export const EVENT_FORMAT = {
  offline:  { label: '오프라인', desc: '현장에 직접 방문하여 참여하는 행사예요.' },
  online:   { label: '온라인',   desc: '온라인으로 참여하는 행사예요. 참여 안내 및 링크는 별도 안내돼요.' },
  recorded: { label: '녹화제공', desc: '추후 녹화본을 제공해드려요. 다만, 편집시간이 소요되니 최대 1~2개월 기다려주세요!' },
} as const

export type EventFormat = keyof typeof EVENT_FORMAT

export const FORMAT_ORDER: EventFormat[] = ['offline', 'online', 'recorded']

// label만 필요한 곳에서 사용
export const EVENT_FORMAT_LABEL: { [K in EventFormat]: string } = {
  offline:  EVENT_FORMAT.offline.label,
  online:   EVENT_FORMAT.online.label,
  recorded: EVENT_FORMAT.recorded.label,
}

// ─── 행사 날짜 ──────────────────────────────────────────────────────
// 날짜 범위 — 하루면 end 생략, 여러 날이면 end 기재
export type EventDateRange = {
  start:       string    // 시작일 (YYYY-MM-DD) — precision:'month'일 땐 월의 1일, candidates 있을 땐 첫 번째 후보일 (정렬 기준)
  end?:        string    // 종료일 (YYYY-MM-DD) — 당일 행사면 생략
  startTime?:  string    // 시작 시각 (예: '19:00')
  endTime?:    string    // 종료 시각 (예: '21:00')
  precision?:  'month' | 'day'  // 생략 시 'day'. 'month'면 일 미확정 → "2026년 9월 중" 표기
  candidates?: string[]  // 후보 날짜 목록 (YYYY-MM-DD) — 있으면 "9/13 · 9/20 · 9/27 중 1일" 표기
}

// 접수 기간 — 시각 생략 시 기본값: startTime '00:00' / endTime '23:59'
export type RecruitDateRange = {
  start:      string   // 접수 시작일 (YYYY-MM-DD)
  end?:       string   // 접수 종료일 (YYYY-MM-DD)
  startTime?: string   // 접수 시작 시각 (기본 '00:00')
  endTime?:   string   // 접수 종료 시각 (기본 '23:59')
}

// ─── 행사 안내 (notices) ─────────────────────────────────────────────
export type EventFee = {
  members?:  number | string  // 일반회원 (숫자: 원, 문자: '무료', '자율' 등)
  regular?:  number | string  // 정회원
  external?: number | string  // 외부인
  operator?: number | string  // 운영진
  note?:     string           // 결제 방식 등 부가 안내 (\n 지원)
}

export type EventNotices = {
  fee?:       EventFee    // 참여비
  refund?:    string[]    // 환불 기준 (항목별, \n 지원)
  checklist?: string[]    // 필수 확인 사항 (항목별, \n 지원)
  items?:     string[]    // 준비물 (항목별, \n 지원)
  custom?:    { title: string; body: string }[]  // 기타 자유 형식 안내 (\n 지원)
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
  img?:          string
  formUrl?:      string                  // 접수 폼 URL (만료되면 생략)
  capacity?:     number | 'unlimited'    // 정원 (숫자: 명, 'unlimited': 제한 없음)
  registrants?:  ParticipantBreakdown   // 최종 접수자
  attendees?:    ParticipantBreakdown   // 실제 참여자
  completions?:  ParticipantBreakdown   // 수료자 (챌린지 등 수료 기준이 있는 행사)
  notices?:      EventNotices            // 행사 안내 (참여비·환불·준비물·필수확인 등)
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
