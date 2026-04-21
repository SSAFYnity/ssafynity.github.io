// 2026년 행사 목록
// [업데이트 필요] 행사 확정 시 항목 추가

import type { Event } from '@/data/constants'

export const events2026: Event[] = [
  {
    slug:      '2026-ongoing-event-may',
    title:     '5월 상시행사 (변동 가능성 있음)',
    eventDate: { start: '2026-05-01', precision: 'month' },
    format:    ['online'],
    kind:      'ongoing',
    audience:  'regular',
    summary:   '2026년 5월 중 진행 예정인 정회원 전용 상시 행사',
  },
  {
    slug:      '2026-first-regular-event',
    title:     '상반기 정기행사 - 동문회원 친목행사',
    eventDate: { start: '2026-06-27' },
    recruitDate: { start: '2026-05-27', end: '2026-06-26' },
    format:    ['offline'],
    kind:      'regular',
    audience:  'members',
    summary:   '2026년 6월 27일 진행 예정인 상반기 정기행사',
  },
  {
    slug:      '2026-ongoing-event-august',
    title:     '8월 상시행사 (변동 가능성 있음)',
    eventDate: { start: '2026-08-01', precision: 'month' },
    format:    ['offline'],
    kind:      'ongoing',
    audience:  'regular',
    summary:   '2026년 8월 중 진행 예정인 정회원 전용 상시 행사',
  },
  {
    slug:      '2026-ongoing-event-september',
    title:     '9월 상시행사 (변동 가능성 있음)',
    eventDate: { start: '2026-09-01', precision: 'month' },
    format:    ['offline'],
    kind:      'ongoing',
    audience:  'regular',
    summary:   '2026년 9월 중 진행 예정인 정회원 전용 상시 행사',
  },
  {
    slug:      '2026-second-half-regular-event',
    title:     '하반기 정기행사 - IT 공개 행사',
    eventDate: {
      start:      '2026-11-07',
      candidates: ['2026-11-07', '2026-11-14', '2026-11-21', '2026-11-28'],
    },
    format:   ['offline'],
    kind:     'regular',
    audience: 'open',
    summary:  '2026년 11월 중 진행 예정인 하반기 정기행사',
  },
]
