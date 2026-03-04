// src/data/operator/2024.ts
// 3대 SSAFYnity 운영진 (2024년)
// concurrent: true — 해당 팀에서 겸직으로 활동하는 멤버

export const operator2024 = {
  generation:   3,
  year:         2024,
  memberCount:  19,
  note:         '비상대책위원회 체제로 운영',
  groups: [
    {
      name: '임원진',
      desc: '동문회 전체 운영 방향을 수립하고 대표 업무를 수행합니다.',
      members: [
        { role: '회장',       vacant: true },
        { role: '기획팀장',   name: '김00' },
        { role: '인사팀장',   name: '당현아', cohort: 5, campus: '서울' },
        { role: '소통팀장',   name: '백00' },
        { role: '재무팀장',   name: '안00' },
        { role: '컨텐츠팀장', name: '박00' },
      ],
    },
    {
      name: '기획팀',
      desc: '동문회 행사의 기획·준비·운영 전반을 담당합니다.',
      members: [
        { role: '팀장', name: '김00' },
        { role: '팀원', name: '김00' },
        { role: '팀원', name: '임00' },
        { role: '팀원', name: '송00' },
        { role: '팀원', name: '김00' },
      ],
    },
    {
      name: '인사팀',
      desc: '운영진 채용과 내부 조직 관리를 담당합니다.',
      members: [
        { role: '팀장', name: '당현아', cohort: 5, campus: '서울' },
        { role: '팀원', name: '권00' },
        { role: '팀원', name: '박00' },
        { role: '팀원', name: '최00' },
      ],
    },
    {
      name: '소통팀',
      desc: '회원과의 소통 창구 운영 및 커뮤니티 관리를 담당합니다.',
      members: [
        { role: '팀장', name: '백00' },
        { role: '팀원', name: '김00' },
        { role: '팀원', name: '김00' },
        { role: '팀원', name: '채00' },
      ],
    },
    {
      name: '재무팀',
      desc: '동문회 예산 편성과 회계 관리를 담당합니다.',
      members: [
        { role: '팀장', name: '안00' },
        { role: '팀원', name: '손00' },
        { role: '팀원', name: '신00' },
        { role: '팀원', name: '김00' },
      ],
    },
    {
      name: '컨텐츠팀',
      desc: '동문회 콘텐츠 기획과 제작을 담당합니다.',
      members: [
        { role: '팀장', name: '박00' },
        { role: '팀원', name: '고00' },
        { role: '팀원', name: '김00', concurrent: true },
        { role: '팀원', name: '당현아', cohort: 5, campus: '서울', concurrent: true },
        { role: '팀원', name: '박00', concurrent: true },
      ],
    },
    {
      name: '디자인팀',
      desc: '행사·홍보물의 시각 디자인과 브랜딩을 담당합니다.',
      members: [
        { role: '팀원', name: '김00', concurrent: true },
        { role: '팀원', name: '김00', concurrent: true },
        { role: '팀원', name: '당현아', cohort: 5, campus: '서울', concurrent: true },
        { role: '팀원', name: '박00', concurrent: true },
        { role: '팀원', name: '채00', concurrent: true },
      ],
    },
  ],
} as const
