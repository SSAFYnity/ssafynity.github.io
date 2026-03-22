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
        { role: '기획팀장',    name: '김병완', cohort: 6, campus: '광주', url: 'https://www.linkedin.com/in/lactea94' },
        { role: '재무팀장',    name: '이준호', cohort: 8, campus: '대전', url: 'https://github.com/LJH5' },
        { role: '홍보팀장',    name: '고준수', cohort: 8, campus: '광주', url: 'https://www.instagram.com/kojunsu1004' },
        { role: '대외협력팀장', name: '박진우', cohort: 11, campus: '광주', url: 'https://github.com/jjinwo0' },
      ],
    },
    {
      name: '기획팀',
      desc: '동문회 행사의 기획·준비 전반을 담당합니다.',
      members: [
        { role: '팀장', name: '김병완', cohort: 6, campus: '광주', url: 'https://www.linkedin.com/in/lactea94' },
        { role: '팀원', name: '김00' },
        { role: '팀원', name: '박동준', cohort: 6, campus: '부울경' },
      ],
    },
    {
      name: '재무팀',
      desc: '동문회 예산 편성과 회계 관리를 담당합니다.',
      members: [
        { role: '팀장', name: '이준호', cohort: 8, campus: '대전', url: 'https://github.com/LJH5' },
        { role: '팀원', name: '권경민', cohort: 7, campus: '서울', url: 'https://rudalsd.tistory.com' },
        { role: '팀원', name: '손승운', cohort: 7, campus: '구미', url: 'https://www.linkedin.com/in/승운-손-2384652ba' },
        { role: '팀원', name: '안재영', cohort: 6, campus: '서울' },
        { role: '팀원', name: '이도훈', cohort: 10, campus: '광주' },
      ],
    },
    {
      name: '홍보팀',
      desc: 'SNS 채널 운영과 온·오프라인 홍보·디자인 물품을 담당합니다.',
      members: [
        { role: '팀장', name: '고준수', cohort: 8, campus: '광주', url: 'https://www.instagram.com/kojunsu1004' },
        { role: '팀원', name: '이가빈', cohort: 5, campus: '서울' },
      ],
    },
    {
      name: '대외협력팀',
      desc: '외부 기관·기업과의 협력 및 파트너십 구축을 담당합니다.',
      members: [
        { role: '팀장', name: '박진우', cohort: 11, campus: '광주', url: 'https://github.com/jjinwo0' },
        { role: '팀원', name: '박00' },
        { role: '팀원', name: '윤일준', cohort: 7, campus: '대전' },
      ],
    },
  ],
} as const
