// src/data/siteData.ts
// 이 파일만 수정하면 전체 사이트에 반영됩니다.
// 매년 운영진이 교체되므로 [업데이트 필요] 항목을 확인하세요.
// 업데이트 위치 검색: grep -n "\[업데이트 필요\]" src/data/siteData.ts

export const siteData = {

  // ─── 브랜드 정보 ───────────────────────────────────────────────
  brand: {
    name: 'SSAFYnity',
    slogan: '싸피 수료생들이 직접 운영하는 동문회',
    email: 'ssafynity@gmail.com',
  },

  // ─── 통계 ──────────────────────────────────────────────────────
  stats: {
    totalMembers:   0,      // [업데이트 필요] 전체 회원 수
    regularMembers: 0,      // [업데이트 필요] 정회원 수
    cohorts:        0,      // [업데이트 필요] 참여 기수 수
  },
  impactStats: {
    employedCompanies: 0,   // [업데이트 필요] 취업 기업 수
    avgSalary: '0억',       // [업데이트 필요]
  },

  // ─── SNS 채널 ──────────────────────────────────────────────────
  sns: [
    { name: 'Gmail',     url: 'mailto:ssafynity@gmail.com',                            desc: '공식 이메일',     color: '#EA4335', icon: 'gmail'     },
    { name: 'GitHub',    url: 'https://github.com/SSAFYnity',                          desc: '오픈소스 기여',   color: '#181717', icon: 'github'    },
    { name: 'KakaoTalk', url: 'http://pf.kakao.com/_GdeRX',                            desc: '공식 오픈카톡',    color: '#FEE500', icon: 'kakao'     },
    { name: 'Instagram', url: 'https://www.instagram.com/ssafynity/',                  desc: '활동 사진 공유',   color: '#E1306C', icon: 'instagram' },
    { name: 'LinkedIn',  url: 'https://www.linkedin.com/company/ssafynity',            desc: '커리어 네트워킹', color: '#0077B5', icon: 'linkedin'  },
    { name: 'Discord',   url: '[업데이트 필요]',                                        desc: '실시간 소통',     color: '#5865F2', icon: 'discord'   },
  ],

  // ─── Google Forms 링크 ─────────────────────────────────────────
  forms: {
    membership: 'https://forms.gle/wudsF4nfsFYYXpLs6', // 동문회 가입 신청 Forms URL
    regular:    'https://forms.gle/QMXe2VxNk9pc7ZRaA', // 정회원 등록 Forms URL
    // newsletter: '[업데이트 필요]', // 소식 수신 신청 Forms URL
    // teamApply:  '[업데이트 필요]', // 운영진 모집 Forms URL
    // eventApply: '[업데이트 필요]', // 행사 신청 Forms URL
  },

  // ─── 네비게이션 메뉴 ───────────────────────────────────────────
  menu: [
    { label: '싸피니티', items: [
      { label: '동문회 소개', path: '/about/story' },
      { label: '가치관',      path: '/about/values' },
      { label: '후원·협력사', path: '/about/partners' },
    ]},
    { label: '운영진', items: [
      { label: '운영진 소개', path: '/team/intro' },
      { label: '조직 안내',   path: '/team/organization' },
      { label: '역대 운영진', path: '/team/history' },
    ]},
    { label: '행사', items: [
      { label: '행사 안내', path: '/events/apply' },
      { label: '행사 일정', path: '/events/upcoming' },
      { label: '역대 행사', path: '/events/archive' },
    ]},
    { label: '동아리', items: [
      { label: '동아리 혜택', path: '/clubs/benefits' },
      { label: '등록 리스트', path: '/clubs' },
    ]},
    { label: '참여하기', items: [
      { label: '동문회 가입',    path: '/join/membership' },
      { label: '정회원 혜택',    path: '/join/benefits' },
      { label: '동아리 신청',    path: '/clubs/apply' },
      { label: '운영진 모집',    path: '/team/apply' },
      { label: '후원·제휴 문의', path: '/join/inquiry' },
      // { label: '소식 수신', path: '', external: true }, // [업데이트 필요] forms.newsletter URL 생성 후 입력
    ]},
    { label: '커뮤니티', items: [
      { label: '공지사항', path: 'https://ssafynity.github.io/blog/공지', external: true },
      { label: '블로그',   path: 'https://ssafynity.github.io/blog', external: true },
      { label: 'SNS',      path: '/community/sns' },
      { label: 'FAQ',      path: '/community/faq' },
    ]},
  ],

  // ─── 연혁 타임라인 ─────────────────────────────────────────────
  milestones: [
    { year: 2021, label: '싸피니티의 탄생',        desc: '[업데이트 필요]' },
    { year: 2022, label: '공식 카페 운영, 1,000명 돌파', desc: '[업데이트 필요]' },
    { year: 2023, label: '제1회 네트워킹 데이',     desc: '[업데이트 필요]' },
    { year: 2024, label: '비영리 사단법인 등록',    desc: '[업데이트 필요]' },
    { year: 2025, label: '생태계의 확장',           desc: '[업데이트 필요]' },
  ],

  // ─── 행사 ──────────────────────────────────────────────────────
  // 상세 데이터는 src/data/events/{year}.ts 참조
  // 새 연도 추가 시: 파일 생성 후 eventYears 배열에 연도 추가
  upcomingEventYear: 2026,        // [업데이트 필요] 다가오는 행사가 있는 연도
  eventYears: [
    2022, // [업데이트 필요]
  ],

  // ─── 파트너 & 협력사 ───────────────────────────────────────────
  // 상세 데이터는 src/data/partners/{slug}.ts 참조
  // 새 파트너 추가 시: 파일 생성 후 아래 배열에 slug 추가
  partnerSlugs: [
    '[업데이트 필요]', // 예: 'some-company'
  ],

  // ─── 멤버십 ────────────────────────────────────────────────────
  membership: {
    regular: {
      title: '일반 회원',
      fee: '무료',
      desc: 'SSAFY 수료생이라면 누구나 가입 가능',
    },
    premium: {
      title: '정회원',
      fee: '30,000원 / 1년',
      desc: '연회비를 납부한 공식 정회원',
      features: [
        '모든 정기행사 최우선 입장',
        '모든 정기행사 무료 입장',
        '정회원 전용 소통망 운영',
        '연 1회 정회원 전용 굿즈 제공',
        '모든 동문회 공지 최우선 공지',
        '모든 행사의 일부 선택권(날짜 등) 제공',
      ],
    },
  },

  // ─── 운영진 기수 목록 ──────────────────────────────────────────
  // 상세 데이터는 src/data/operator/{year}.ts 참조
  // 새 기수 추가 시: 파일 생성 후 아래 배열에 한 줄 추가
  teamGenerations: [
    { generation: 1, year: 2022 }, // [업데이트 필요]
  ],

  // ─── 동아리 목록 ───────────────────────────────────────────────
  // 상세 데이터는 src/data/clubs/{slug}.ts 참조
  // 새 동아리 추가 시: 파일 생성 후 아래 배열에 slug 추가
  clubSlugs: [
    '[업데이트 필요]', // 예: 'algorithm-study'
  ],

  // ─── FAQ ───────────────────────────────────────────────────────
  // 상세 데이터는 src/data/faqs.ts 참조

  // ─── 공지사항 미리보기 (메인 홈) ──────────────────────────────
  // 상세 데이터는 src/data/announcements.ts 참조

} as const
