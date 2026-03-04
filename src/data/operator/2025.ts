// src/data/operator/2025.ts
// 4대 SSAFYnity 운영진 (2025년)

export const operator2025 = {
  generation:   4,
  year:         2025,
  memberCount:  15,
  teamCount:    4,
  achievements: [
    { text: '운영 지속성 확보를 위한 업무 계정·도구 인수인계 체계 수립' },
    { text: '지속 가능한 운영을 위한 후원·협력사 소통 시작' },
  ],
  groups: [
    {
      name: '임원진',
      desc: '운영진 및 팀을 대표하는 인원으로, 동문회의 전체 운영 방향을 최종 결정합니다.',
      members: [
        { role: '회장', name: '당현아', cohort: 5, campus: '서울', url: 'https://github.com/hadevyi', council: true },
        { role: '기획팀장',    name: '김00' },
        { role: '재무팀장',    name: '이00' },
        { role: '홍보팀장',    name: '고00' },
        { role: '대외협력팀장', name: '박00' },
      ],
    },
    {
      name: '기획팀',
      desc: '동문회 행사의 기획·준비·운영 전반을 담당합니다.',
      members: [
        { role: '팀장', name: '김00' },
        { role: '팀원', name: '김00' },
        { role: '팀원', name: '김00' },
        { role: '팀원', name: '박00' },
      ],
    },
    {
      name: '재무팀',
      desc: '동문회 예산 편성과 회계 관리를 담당합니다.',
      members: [
        { role: '팀장', name: '이00' },
        { role: '팀원', name: '권00' },
        { role: '팀원', name: '손00' },
        { role: '팀원', name: '안00' },
        { role: '팀원', name: '이00' },
      ],
    },
    {
      name: '홍보팀',
      desc: 'SNS 채널 운영과 온·오프라인 홍보를 담당합니다.',
      members: [
        { role: '팀장', name: '고00' },
        { role: '팀원', name: '이00' },
      ],
    },
    {
      name: '대외협력팀',
      desc: '외부 기관·기업과의 협력 및 파트너십 구축을 담당합니다.',
      members: [
        { role: '팀장', name: '박00' },
        { role: '팀원', name: '박00' },
        { role: '팀원', name: '윤00' },
      ],
    },
  ],
} as const
