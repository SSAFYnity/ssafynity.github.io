// src/data/operator/2023.ts
// 2대 SSAFYnity 운영진 (2023년)

export const operator2023 = {
  generation:   2,
  year:         2023,
  memberCount:  17,
  teamCount:    5,
  groups: [
    {
      name: '임원진',
      desc: '동문회 전체 운영 방향을 수립하고 대표 업무를 수행합니다.',
      members: [
        { role: '회장',        name: '황00' },
        { role: '부회장',      name: '이00' },
        { role: '기획팀장',    name: '당현아', cohort: 5, campus: '서울' },
        { role: '소통팀장',    name: '권00' },
        { role: '홍보팀장',    name: '신00' },
        { role: '인사관리팀장', name: '이00' },
        { role: '경영지원팀장', name: '윤00' },
      ],
    },
    {
      name: '기획팀',
      desc: '동문회 행사의 기획·준비·운영 전반을 담당합니다.',
      members: [
        { role: '팀장', name: '당현아', cohort: 5, campus: '서울' },
        { role: '팀원', name: '김00' },
        { role: '팀원', name: '차00' },
      ],
    },
    {
      name: '소통팀',
      desc: '회원과의 소통 창구 운영 및 커뮤니티 관리를 담당합니다.',
      members: [
        { role: '팀장', name: '권00' },
        { role: '팀원', name: '김00' },
        { role: '팀원', name: '김00' },
      ],
    },
    {
      name: '홍보팀',
      desc: 'SNS 채널 운영과 온·오프라인 홍보를 담당합니다.',
      members: [
        { role: '팀장', name: '신00' },
        { role: '팀원', name: '박00' },
        { role: '팀원', name: '조00' },
      ],
    },
    {
      name: '인사관리팀',
      desc: '운영진 채용과 내부 조직 관리를 담당합니다.',
      members: [
        { role: '팀장', name: '이00' },
        { role: '팀원', name: '박00' },
        { role: '팀원', name: '윤00' },
        { role: '팀원', name: '한00' },
      ],
    },
    {
      name: '경영지원팀',
      desc: '동문회 행정 및 재무 지원을 담당합니다.',
      members: [
        { role: '팀장', name: '윤00' },
        { role: '팀원', name: '손00' },
      ],
    },
  ],
} as const
