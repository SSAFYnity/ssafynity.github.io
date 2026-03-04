// src/data/operator/{year}.ts
// {N}대 SSAFYnity 운영진 ({year}년)
//
// 추가 후 할 일:
//   1. computed.ts에 import 추가
//   2. allOperators 배열에 추가
//
// vacancies: 현재 모집 인원. 0이면 지원 불가로 표시됨. 미표시 시 undefined 유지.
// council:   회장단 여부 (임원진 섹션 상단 카드로 표시됨)
// concurrent: 겸직 멤버 (다른 팀과 중복 활동)
// vacant:    공석 (이름 없이 역할만 표시)
// url:       대표 URL — 본인 동의 시에만 기재

export const operator{year} = {
  generation:   0,           // 기수 번호
  year:         0000,        // 연도
  memberCount:  0,           // 총 운영진 수 (수동 입력)
  teamCount:    0,           // 전담 팀 수 (임원진 제외)
  // note: '',               // 특이사항 (비상대책위 등)
  // achievements: [         // 주요 성과 (최대 3개)
  //   { text: '' },
  // ],
  groups: [
    {
      name: '임원진',
      desc: '운영진 및 팀을 대표하는 인원으로, 동문회의 전체 운영 방향을 최종 결정합니다.',
      members: [
        { role: '회장', name: '홍00', cohort: 0, campus: '', council: true },
        { role: '○○팀장', name: '홍00', cohort: 0, campus: '' },
      ],
    },
    {
      name: '○○팀',
      desc: '',
      vacancies: 0,          // 모집 인원 (apply 페이지에 표시)
      members: [
        { role: '팀장', name: '홍00', cohort: 0, campus: '' },
        { role: '팀원', name: '홍00', cohort: 0, campus: '' },
      ],
    },
  ],
} as const
