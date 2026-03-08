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

export const preClubs: PreClub[] = [
  {
    id:          1,
    category:    '기술·개발',
    shortDesc:   '주말마다 모여 함께 사이드 프로젝트를 진행할 팀원을 찾습니다.\n기획부터 배포까지 함께 완성하는 경험을 원하는 분이라면 기술 스택 무관하게 환영합니다.',
    memberCount: 2,
    since:       '2026-02',
  },
  {
    id:          2,
    category:    '스포츠·운동',
    shortDesc:   '주중 저녁 풋살을 함께할 분들을 모집합니다. 실력 무관 환영.',
    memberCount: 3,
    since:       '2026-02',
  },
  {
    id:          3,
    category:    '친목·여행',
    shortDesc:   '분기마다 국내외 여행을 함께 계획하고 떠날 동문을 찾습니다. 행선지 선정부터 숙소, 일정까지 구성원이 함께 결정합니다. 여행 경험이 없어도 괜찮고, 우선 같이 떠나는 것을 즐기는 분이라면 누구나 환영합니다.',
    memberCount: 1,
    since:       '2026-03',
  },
  {
    id:          4,
    category:    '게임·취미',
    shortDesc:   '주말마다 보드게임 카페에서 함께 즐길 동문을 모집합니다. 초보도 환영합니다. 게임 종류는 전략, 파티, 추리 등 구성원 취향에 맞춰 그날그날 정하고, 부담 없이 즐기는 분위기를 지향합니다.',
    memberCount: 5,
    since:       '2026-01',
    achievedAt:  '2026-03',
  },
  {
    id:          5,
    category:    '창작·예술',
    shortDesc:   '사진 찍는 걸 좋아하는 동문들과 함께 출사를 다니고 서로의 사진을 공유하는 모임입니다. 카메라 기종이나 실력과 무관하게 사진이라는 매체를 즐기는 분이라면 환영합니다.',
    memberCount: 2,
    since:       '2026-03',
  },
  {
    id:          6,
    category:    '스포츠·운동',
    shortDesc:   '주말 아침 한강에서 함께 러닝할 동문을 모집합니다. 5km~10km 구간을 편하게 달릴 수 있는 분을 찾고 있으며, 페이스는 구성원에 맞춰 조율합니다.',
    memberCount: 3,
    since:       '2026-03',
  },
  {
    id:          7,
    category:    '기술·개발',
    shortDesc:   '알고리즘 스터디를 원하는 동문을 모집합니다. 주 1회 온라인으로 모여 문제를 풀고 풀이를 공유합니다.',
    memberCount: 4,
    since:       '2026-02',
  },
  {
    id:          8,
    category:    '봉사',
    shortDesc:   '월 1회 지역 봉사활동을 함께할 동문을 찾습니다. 아동 교육, 환경 정화 등 활동 유형은 구성원 논의로 결정합니다. 꾸준히 참여하실 수 있는 분이라면 누구든 환영합니다.',
    memberCount: 2,
    since:       '2026-03',
  },
  {
    id:          9,
    category:    '게임·취미',
    shortDesc:   '리그 오브 레전드를 함께 즐길 동문을 모집합니다. 랭크 게임보다는 내전이나 칼바람 위주로 가볍게 즐기는 모임입니다.',
    memberCount: 5,
    since:       '2026-02',
    achievedAt:  '2026-03',
  },
]
