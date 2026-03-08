// src/data/preClubs.ts
// 예비 동아리 목록. 정식 동아리와 달리 단일 파일로 관리합니다.
// 예비 동아리는 상세 페이지가 없으며, id를 신청 시 참조 번호로 활용합니다.
//
// [업데이트 필요] 예비 동아리 신청이 들어오면 항목을 추가하세요.
// 정식 동아리로 전환되면 해당 항목을 제거하세요.

/** 정식 동아리 전환을 위한 최소 인원 기준 (SSAFYnity 동문회 규정) */
export const PRE_CLUB_MIN_MEMBERS = 5

export type PreClub = {
  id:          number    // 예비 동아리 번호 (신청 시 참조)
  category:    string    // 카테고리 (동아리 신청 페이지 기준)
  shortDesc:   string    // 한 줄 소개 — 어떤 모임인지 간략히
  memberCount: number    // 현재 모인 인원
  since:       string    // 등록 연월 (예: '2026-03')
  achievedAt?: string    // 최소 인원 달성 연월 (달성 시 기재)
}

export const preClubs: PreClub[] = []
