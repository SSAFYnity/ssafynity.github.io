// 동아리 파일 템플릿
// 파일명: {slug}.ts (영문 소문자+하이픈, 예: algorithm-study.ts)
// 생성 후 siteData.ts의 clubSlugs 배열에 slug 추가

export const club = {
  slug:        '[업데이트 필요]', // 파일명과 동일하게 (영문 소문자+하이픈, 예: futsal-club)
  name:        '[업데이트 필요]',
  category:    '[업데이트 필요]' as const, // ClubCategoryKey: tech | sports | art | hobby | social | volunteer (src/data/constants.ts 참조)
  shortDesc:   '[업데이트 필요]', // 카드에 표시되는 한 줄 소개
  desc:        '[업데이트 필요]', // 상세 페이지 긴 설명
  activities:  '[업데이트 필요]', // string 또는 string[]. 예: '매주 수요일 온라인' | ['온라인 미팅 (격주)', '오프라인 스프린트 (분기)']
  memberCount: 0,                 // [업데이트 필요]
  contacts: [
    { label: '가입 신청하기', url: '[업데이트 필요]', icon: 'apply' as const },
    // { label: '대표자 연락하기', url: '[업데이트 필요]', icon: 'kakao' as const },
    // icon 종류: apply | direct | kakao | discord | github | notion | link
    // 첫 번째 항목이 primary(파란 채움) 버튼, 이후는 outline 버튼
  ],
  since:       '[업데이트 필요]', // 예: '2024'
  images:      [] as string[],
  // ── 선택 필드 ──────────────────────────────────────────────
  // keywords:  ['키워드1', '키워드2'],          // 검색 보조 + 상세 페이지 태그 표시
  // modes:     ['offline'] as const,            // 활동 형태: 'online' | 'offline' (복수 가능, 예: ['online', 'offline'])
  // fee:       '없음',                          // 회비 (예: '없음', '월 5,000원')
  // target:    'SSAFY 수료생 누구나',           // 모집 대상 (string 또는 string[])
  // schedule:    '매주 토요일 오전 10시',                  // 정기 일정 (string 또는 string[])
  // region:      '서울·경기',                            // 활동 지역 (예: '서울·경기', '전국 (온라인)')
  // joinProcess: ['오픈카톡 참여', '자기소개', '승인'],   // 가입 절차 단계
  // notes:        ['비용은 개인 부담', '3회 미참석 탈퇴'],          // 유의사항
  // achievements: ['서비스 3개 배포', '누적 참여자 30명+'],          // 주요 성과 (About 아래 Highlights 섹션)
  // links:        [{ label: 'GitHub', url: 'https://github.com/...' }], // 추가 링크 (사이드바)
}
