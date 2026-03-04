// src/data/operator/2023.ts
// 2대 SSAFYnity 집행부 (2023년)

export const operator2023 = {
  generation:   2,
  year:         2023,
  memberCount:  17,
  teamCount:    5,
  achievements: [
    { text: '연 4회 분기별 정기행사 정례화' },
    { text: '집행부 수료생 전원 구성 원칙 확립' },
    { text: '독립 단체 운영을 위한 정회원 제도 도입' },
  ],
  groups: [
    {
      name: '임원진',
      desc: '운영진 및 팀을 대표하는 인원으로, 동문회의 전체 운영 방향을 최종 결정합니다.',
      members: [
        { role: '회장',  name: '황00', council: true },
        { role: '부회장', name: '이00', council: true },
        { role: '기획국장',    name: '당현아', cohort: 5, campus: '서울', url: 'https://github.com/hadevyi' },
        { role: '소통국장',    name: '권00' },
        { role: '홍보국장',    name: '신00' },
        { role: '인사관리국장', name: '이00' },
        { role: '경영지원국장', name: '윤00' },
      ],
    },
    {
      name: '기획국',
      desc: '동문회 행사의 기획·준비·운영 전반을 담당합니다.',
      members: [
        { role: '국장', name: '당현아', cohort: 5, campus: '서울', url: 'https://github.com/hadevyi' },
        { role: '국원', name: '김00' },
        { role: '국원', name: '차00' },
      ],
    },
    {
      name: '소통국',
      desc: '회원과의 소통 창구 운영 및 커뮤니티 관리를 담당합니다.',
      members: [
        { role: '국장', name: '권00' },
        { role: '국원', name: '김00' },
        { role: '국원', name: '김00' },
      ],
    },
    {
      name: '홍보국',
      desc: 'SNS 채널 운영과 온·오프라인 홍보를 담당합니다.',
      members: [
        { role: '국장', name: '신00' },
        { role: '국원', name: '박00' },
        { role: '국원', name: '조00' },
      ],
    },
    {
      name: '인사관리국',
      desc: '운영진 채용과 내부 조직 관리를 담당합니다.',
      members: [
        { role: '국장', name: '이00' },
        { role: '국원', name: '박00' },
        { role: '국원', name: '윤00' },
        { role: '국원', name: '한00' },
      ],
    },
    {
      name: '경영지원국',
      desc: '동문회 행정 및 재무 지원을 담당합니다.',
      members: [
        { role: '국장', name: '윤00' },
        { role: '국원', name: '손00' },
      ],
    },
  ],
} as const
