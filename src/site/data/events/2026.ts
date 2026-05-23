// 2026년 행사 목록
// [업데이트 필요] 행사 확정 시 항목 추가

import type { Event } from '@/data/constants'

export const events2026: Event[] = [
  {
    slug:        '2026-online-tetris-tournament',
    title:       '온라인 테트리스 대회',
    eventDate:   { start: '2026-05-31', startTime: '22:00' },
    recruitDate: { start: '2026-05-23', end: '2026-05-30' },
    format:      ['online'],
    kind:        'special',
    audience:    'members',
    summary:     '정회원과 일반회원이 함께 참여하는 온라인 테트리스 대회',
    img:         '/events/2026-online-tetris-tournament.png',
    formUrl:     'https://forms.gle/PGmSAYTmFthqiRUc8',
    capacity:    'unlimited',
    notices: {
      fee: {
        regular: '무료',
        members: 2000,
        note:    '상품 및 행사 진행비\n접수 내역 확인 및 참가비 입금까지 완료되어야 최종 신청이 완료됩니다',
      },
      refund: [
        '행사 3일 이내 취소 시 환불 불가',
        '환불 가능 기간 내 요청 시 전액 환불',
        '환불 대상자는 행사 종료 후 일괄 처리됩니다',
      ],
      custom: [
        {
          title: '상품 안내',
          body:  '1등: OpenAI 3만원권\n2등: 배민 1만원권',
        },
        {
          title: '유의사항',
          body:  '상품 규모는 접수 인원에 따라 확대 또는 축소될 수 있습니다.',
        },
      ],
    },
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
