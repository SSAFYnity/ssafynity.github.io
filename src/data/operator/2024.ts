// src/data/operator/2024.ts
// 3대 SSAFYnity 운영진 (2024년)
// concurrent: true — 해당 팀에서 겸직으로 활동하는 멤버

export const operator2024 = {
  generation:   3,
  year:         2024,
  memberCount:  19,
  teamCount:    5,
  note:         '회장 사퇴로 인한 임원진 비상대책위원회 체제 운영',
  achievements: [
    { text: '자주적 운영 기반 조직 개편: 집행부→운영진, 국→팀' },
    { text: '정기행사 이원화: 동문 친목 행사·오픈 IT 행사' },
    { text: '최초 외부 활동: SSAFYnale 컨퍼런스 개최·인프콘 참석' },
  ],
  groups: [
    {
      name: '임원진',
      desc: '운영진 및 팀을 대표하는 인원으로, 동문회의 전체 운영 방향을 최종 결정합니다.',
      members: [
        { role: '회장', vacant: true, council: true },
        { role: '기획팀장',   name: '김병완', cohort: 6, campus: '광주', url: 'https://www.linkedin.com/in/lactea94' },
        { role: '인사팀장',   name: '당현아', cohort: 5, campus: '서울', url: 'https://github.com/hadevyi' },
        { role: '소통팀장',   name: '백정훈', cohort: 3, campus: '구미', url: 'https://open.kakao.com/o/s6XqPBPb' },
        { role: '재무팀장',   name: '안00' },
        { role: '컨텐츠팀장', name: '박지은', cohort: 3, campus: '구미', url: 'https://www.instagram.com/jjiiiiinie' },
      ],
    },
    {
      name: '기획팀',
      desc: '동문회 행사의 기획·준비 전반을 담당합니다.',
      members: [
        { role: '팀장', name: '김병완', cohort: 6, campus: '광주', url: 'https://www.linkedin.com/in/lactea94' },
        { role: '팀원', name: '김00' },
        { role: '팀원', name: '임00' },
        { role: '팀원', name: '송00' },
        { role: '팀원', name: '김00' },
      ],
    },
    {
      name: '인사팀',
      desc: '동문회 인적관리와 내부 조직 관리를 담당합니다.',
      members: [
        { role: '팀장', name: '당현아', cohort: 5, campus: '서울', url: 'https://github.com/hadevyi' },
        { role: '팀원', name: '권경민', cohort: 7, campus: '서울', url: 'https://rudalsd.tistory.com' },
        { role: '팀원', name: '박동준', cohort: 6, campus: '부울경' },
        { role: '팀원', name: '최소희', cohort: 6, campus: '부울경', url: 'https://www.linkedin.com/in/huisso' },
      ],
    },
    {
      name: '소통팀',
      desc: '회원과의 소통 창구 운영 및 커뮤니티 관리를 담당합니다.',
      members: [
        { role: '팀장', name: '백정훈', cohort: 3, campus: '구미', url: 'https://open.kakao.com/o/s6XqPBPb' },
        { role: '팀원', name: '김00' },
        { role: '팀원', name: '김종혁', cohort: 8, campus: '구미' },
        { role: '팀원', name: '채00' },
      ],
    },
    {
      name: '재무팀',
      desc: '동문회 예산 편성과 회계 관리를 담당합니다.',
      members: [
        { role: '팀장', name: '안00' },
        { role: '팀원', name: '손승운', cohort: 7, campus: '구미', url: 'https://www.linkedin.com/in/승운-손-2384652ba' },
        { role: '팀원', name: '신00' },
        { role: '팀원', name: '김00' },
      ],
    },
    {
      name: '컨텐츠팀',
      desc: '동문회 콘텐츠 기획과 제작을 담당합니다.',
      members: [
        { role: '팀장', name: '박지은', cohort: 3, campus: '구미', url: 'https://www.instagram.com/jjiiiiinie' },
        { role: '팀원', name: '고준수', cohort: 8, campus: '광주', url: 'https://www.instagram.com/kojunsu1004' },
        { role: '팀원', name: '김00', concurrent: true },
        { role: '팀원', name: '당현아', cohort: 5, campus: '서울', url: 'https://github.com/hadevyi', concurrent: true },
        { role: '팀원', name: '박동준', cohort: 6, campus: '부울경', concurrent: true },
      ],
    },
    {
      name: '디자인팀',
      desc: '행사·홍보물의 시각 디자인과 브랜딩을 담당합니다.',
      members: [
        { role: '팀원', name: '김병완', cohort: 6, campus: '광주', url: 'https://www.linkedin.com/in/lactea94', concurrent: true },
        { role: '팀원', name: '김00', concurrent: true },
        { role: '팀원', name: '당현아', cohort: 5, campus: '서울', url: 'https://github.com/hadevyi', concurrent: true },
        { role: '팀원', name: '박동준', cohort: 6, campus: '부울경', concurrent: true },
        { role: '팀원', name: '채00', concurrent: true },
      ],
    },
  ],
} as const
