// 2026년 행사 목록
// [업데이트 필요] 행사 확정 시 항목 추가

import type { Event } from '@/data/constants'

export const events2026: Event[] = [

  // ── [TEST] 상태 1: 접수 없는 행사 (내부 행사) ──────────────────────
  {
    slug:      '2026-test-no-recruit',
    title:     '[TEST 1] 접수 없는 행사',
    eventDate:   { start: '2026-03-15', startTime: '14:00', endTime: '18:00' },
    format:    ['offline'],
    kind:      'regular',
    audience:  'operator',
    summary:   '접수 기간 없이 진행되는 내부 행사 (운영진 한정).',
  },

  // ── [TEST] 상태 2a: 접수 전 (2주 초과 → 역대 행사 미노출, 올해 행사 노출) ──
  {
    slug:      '2026-test-before-recruit-hidden',
    title:     '[TEST 2a] 접수 전 (2주 초과, 역대 행사 미노출)',
    eventDate:   { start: '2026-04-24', startTime: '15:00', endTime: '19:00' },
    recruitDate: { start: '2026-03-25', end: '2026-04-22' },
    format:    ['offline'],
    kind:      'regular',
    audience:  'members',
    summary:   '접수 시작이 2주 넘게 남아 역대 행사 탭에서 미노출, 올해 행사 탭엔 노출.',
  },

  // ── [TEST] 상태 2b: 접수 전 (2주 이내 → 역대 행사·올해 행사 모두 노출) ──
  {
    slug:      '2026-test-before-recruit-visible',
    title:     '[TEST 2b] 접수 전 (2주 이내, 역대 행사 노출)',
    eventDate:   { start: '2026-04-09', startTime: '15:00', endTime: '19:00' },
    recruitDate: { start: '2026-03-15', end: '2026-04-07' },
    format:    ['offline'],
    kind:      'regular',
    audience:  'members',
    summary:   '접수 시작이 2주 이내라 역대 행사 탭에서도 노출.',
  },

  // ── [TEST] 상태 3: 접수 중 (행사 전) ──────────────────────────────
  {
    slug:      '2026-test-recruiting',
    title:     '[TEST 3] 접수 중인 행사',
    eventDate:   { start: '2026-03-20', startTime: '18:00', endTime: '21:00' },
    recruitDate: { start: '2026-02-20', end: '2026-03-10' },
    format:    ['offline'],
    kind:      'regular',
    audience:  'open',
    summary:   '현재 접수 기간이 진행 중인 행사.',
    capacity:  100,
  },

  // ── [TEST] 상태 4: 접수 종료, 행사 전 ─────────────────────────────
  {
    slug:      '2026-test-recruit-closed',
    title:     '[TEST 4] 접수 종료, 행사 대기 중',
    eventDate:   { start: '2026-03-10', startTime: '13:00', endTime: '17:00' },
    recruitDate: { start: '2026-02-01', end: '2026-02-28' },
    format:    ['online'],
    kind:      'regular',
    audience:  'open',
    summary:   '접수는 마감됐고 아직 행사 당일이 되지 않은 상태.',
    capacity:  50,
  },

  // ── [TEST] 상태 5: 행사 당일 ───────────────────────────────────────
  {
    slug:      '2026-test-today',
    title:     '[TEST 5] 오늘 행사',
    eventDate:   { start: '2026-03-06', startTime: '10:00', endTime: '18:00' },
    recruitDate: { start: '2026-02-10', end: '2026-03-04' },
    format:    ['offline', 'online'],
    kind:      'regular',
    audience:  'open',
    summary:   '오늘 진행 중인 행사.',
    capacity:  80,
  },

  // ── [TEST] 상태 6: 행사 종료, 데이터 미취합 ───────────────────────
  {
    slug:      '2026-test-past-no-data',
    title:     '[TEST 6] 행사 종료 (데이터 미취합)',
    eventDate:   { start: '2026-02-15', startTime: '13:00', endTime: '17:00' },
    recruitDate: { start: '2026-01-21', end: '2026-02-14' },
    format:    ['offline'],
    kind:      'regular',
    audience:  'members',
    summary:   '행사는 끝났지만 참여자 현황이 아직 집계되지 않은 상태.',
    capacity:  60,
  },

  // ── [TEST] 상태 7: 완전 마무리 ────────────────────────────────────
  {
    slug:      '2026-test-completed',
    title:     '[TEST 7] 완전 마무리된 행사',
    eventDate:   { start: '2026-02-01', startTime: '14:00', endTime: '18:00' },
    recruitDate: { start: '2026-01-06', end: '2026-01-31' },
    format:    ['offline'],
    kind:      'regular',
    audience:  'open',
    summary:   '행사도 끝나고 참여자 현황까지 모두 취합 완료된 상태.',
    capacity:  80,
    registrants: { members: 30, regular: 20, external: 15, operator: 10, partner: 2 },
    attendees:   { members: 28, regular: 18, external: 12, operator: 10, partner: 2 },
  },

  // ── [TEST] 상태 8a: 계획중 — 월만 확정 ───────────────────────────
  {
    slug:      '2026-test-planning-month',
    title:     '[TEST 8a] 계획중 (월만 확정)',
    eventDate:   { start: '2026-11-01', precision: 'month' },
    format:    ['offline'],
    kind:      'regular',
    audience:  'open',
    summary:   '날짜가 아직 확정되지 않은 계획중 행사 — 월만 알려진 케이스.',
  },

  // ── [TEST] 상태 8b: 계획중 — 후보 날짜 여러 개 ────────────────────
  {
    slug:      '2026-test-planning-candidates',
    title:     '[TEST 8b] 계획중 (후보 날짜)',
    eventDate:   { start: '2026-12-06', candidates: ['2026-12-06', '2026-12-13', '2026-12-20'] },
    format:    ['offline'],
    kind:      'regular',
    audience:  'open',
    summary:   '날짜가 아직 확정되지 않은 계획중 행사 — 후보 날짜 복수 케이스.',
  },

  // ── [TEST] 다일 행사 (eventDate.end 있음) ──────────────────────────
  {
    slug:      '2026-test-multiday',
    title:     '[TEST 9] 다일 행사 (이틀)',
    eventDate:   { start: '2026-05-09', end: '2026-05-10', startTime: '10:00', endTime: '18:00' },
    recruitDate: { start: '2026-04-20', end: '2026-05-08' },
    format:    ['offline'],
    kind:      'regular',
    audience:  'open',
    summary:   '이틀에 걸쳐 진행되는 다일 행사.',
    capacity:  100,
  },

  // ── [TEST] 장소 정보 포함 ───────────────────────────────────────────
  {
    slug:      '2026-test-with-location',
    title:     '[TEST 10] 장소 정보 포함 행사',
    eventDate:   { start: '2026-06-06', startTime: '14:00', endTime: '18:00' },
    recruitDate: { start: '2026-05-18', end: '2026-06-05' },
    location:    '멀티캠퍼스 역삼 18층',
    locationUrl: {
      naver:  'https://naver.me/x5GzwAww',
      kakao:  'https://place.map.kakao.com/21414107',
      google: 'https://maps.app.goo.gl/7cw8g2vDrjxw1AQU9',
    },
    format:    ['offline'],
    kind:      'regular',
    audience:  'open',
    summary:   '지도 링크 렌더링 테스트용 행사.',
    capacity:  80,
  },

]
