import { ROUTES } from '@/lib/routes'

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
    vision: '연결이 성장을 만들고, 성장이 다시 기여로 돌아오는 선순환\n싸피니티가 지향하는 공동체의 모습입니다.',
  },

  // ─── 핵심 가치 (/about/values) ────────────────────────────────
  values: [
    {
      icon: 'globe',
      title: '연결',
      desc: '기수와 지역을 넘어 싸피 수료생들을 잇습니다. 함께였기에 가능한 관계를 사회에서도 계속 이어갑니다.',
    },
    {
      icon: 'trending-up',
      title: '성장',
      desc: '연결을 통해 서로의 커리어와 삶이 나아집니다. 함께이기에 혼자보다 더 멀리, 더 단단하게 성장합니다.',
    },
    {
      icon: 'heart',
      title: '자발적 기여',
      desc: '받은 도움을 다음 기수에게 되돌려주는 선순환. 강요 없이 자발적으로 이어가는 공동체의 힘입니다.',
    },
  ],

  // ─── 통계 ──────────────────────────────────────────────────────
  // [업데이트 필요] 새 기수 합류 시 cohortStats에 항목 추가
  // 함께하는 동문 수 / 참여 기수 수는 cohortStats 기반으로 computed.ts에서 자동 계산
  // 누적 행사 횟수 / 누적 참가자 수 / 운영 연수 / 동아리 수 / 파트너사 수도 computed.ts에서 자동 계산
  stats: [
    { label: '정회원', value: '43', suffix: '명' }, // [업데이트 필요] 매 기수 시작 시 수동 수정
  ],

  // ─── SSAFY 기수별 동문 수 ───────────────────────────────────
  // [업데이트 필요] 새 기수 합류 시 항목 추가
  // cohort: SSAFY 기수 번호, count: 해당 기수 동문회 가입 인원
  cohortStats: [
    { cohort:  1, count: 166 },
    { cohort:  2, count: 178 },
    { cohort:  3, count: 237 },
    { cohort:  4, count: 177 },
    { cohort:  5, count: 305 },
    { cohort:  6, count: 512 },
    { cohort:  7, count: 566 },
    { cohort:  8, count: 559 },
    { cohort:  9, count: 497 },
    { cohort: 10, count: 379 },
    { cohort: 11, count: 215 },
    { cohort: 12, count: 354 },
    { cohort: 13, count: 243 },
    { cohort: 14, count:  25 },
  ],

// ─── SNS 채널 ──────────────────────────────────────────────────
  sns: [
    { name: 'Gmail', url: 'mailto:ssafynity@gmail.com', desc: '공지·행사 확정·일반 문의', color: '#EA4335', icon: 'gmail', showInFooter: true },
    { name: 'Gmail(대외협력)', url: 'mailto:ssafynity.ext@gmail.com', desc: '대외협력(제휴·후원 문의)', color: '#EA4335', icon: 'gmail', showInFooter: false },
    { name: '카카오톡 채널', url: 'https://pf.kakao.com/_GdeRX', desc: '공식 계정', color: '#FEE500', icon: 'kakao', showInFooter: true },
    { name: '카카오톡 오픈카톡', url: '', desc: '정회원 전용', color: '#FEE500', icon: 'kakao', showInFooter: false },
    { name: '디스코드', url: 'https://discord.gg/BzSF9xMfX6', desc: '실시간 소통', color: '#5865F2', icon: 'discord', showInFooter: true },
    { name: '인스타그램', url: 'https://www.instagram.com/ssafynity/', desc: '활동 사진 공유', color: '#E1306C', icon: 'instagram', showInFooter: true },
    { name: '링크드인', url: 'https://www.linkedin.com/company/ssafynity', desc: '커리어 네트워킹', color: '#0077B5', icon: 'linkedin', showInFooter: true },
    { name: '깃허브', url: 'https://github.com/SSAFYnity', desc: '오픈소스 기여', color: '#181717', icon: 'github', showInFooter: false },
  ],

  // ─── Google Forms 링크 ─────────────────────────────────────────
  forms: {
    membership: 'https://forms.gle/wudsF4nfsFYYXpLs6', // 동문회 가입 신청 Forms URL
    regular:    'https://forms.gle/QMXe2VxNk9pc7ZRaA', // 정회원 등록 Forms URL
    // newsletter: '[업데이트 필요]', // 소식 수신 신청 Forms URL
    teamApply:  'https://forms.gle/mGXTcSgbzc3W4URk9', // 운영진 모집 Forms URL
    // eventApply: '[업데이트 필요]', // 행사 신청 Forms URL
  },

  // ─── 네비게이션 메뉴 ───────────────────────────────────────────
  menu: [
    { label: '싸피니티', items: [
      { label: '동문회 소개', path: ROUTES.aboutStory },
      { label: '가치관',      path: ROUTES.aboutValues },
      { label: '후원·협력사', path: ROUTES.aboutPartners },
    ]},
    { label: '운영진', items: [
      { label: '운영진 소개', path: ROUTES.operatorIntroduce },
      { label: '조직 안내',   path: ROUTES.operatorOrganization },
      { label: '역대 운영진', path: ROUTES.operatorHistory },
    ]},
    { label: '행사', items: [
      { label: '동문회 행사 안내', path: ROUTES.eventsIntroduce },
      { label: '올해 행사 일정',   path: ROUTES.eventsUpcoming },
      { label: '역대 모든 행사',   path: ROUTES.eventsArchive },
    ]},
    { label: '동아리', items: [
      { label: '동아리 안내', path: ROUTES.clubsIntro },
      { label: '정식 동아리', path: ROUTES.clubs },
      { label: '예비 동아리', path: ROUTES.clubsPre },
    ]},
    { label: '커뮤니티', items: [
      // { label: '공지사항', path: 'https://ssafynity.github.io/blog/공지', external: true }, // [업데이트 필요] 블로그 오픈 후 노출
      // { label: '블로그',   path: 'https://ssafynity.github.io/blog', external: true },       // [업데이트 필요] 블로그 오픈 후 노출
      { label: 'SNS',      path: ROUTES.communitySns },
      { label: 'FAQ',      path: ROUTES.communityFaq },
    ]},
    { label: '신청·문의', items: [
      { label: '동문회 가입',    path: ROUTES.joinMembership },
      { label: '정회원 안내',    path: ROUTES.joinPremium },
      { label: '동아리 신청',    path: ROUTES.clubsApply },
      { label: '운영진 모집',    path: ROUTES.operatorApply },
      { label: '후원·제휴 문의', path: ROUTES.joinPartnership },
      // { label: '소식 수신', path: '', external: true }, // [업데이트 필요] forms.newsletter URL 생성 후 입력
    ]},
  ],

  // ─── 연혁 타임라인 ─────────────────────────────────────────────
  // month: 선택 필드 (1~12). 모르면 생략
  milestones: [
    { year: 2022, month:  3, label: '운영진 킥오프',     desc: '동문회의 필요성에 공감한 인원들이 모여 독립 단체로 출범을 준비' },
    { year: 2022, month:  6, label: '동문회 발대식',     desc: '싸피니티 공식 창설 및 첫 발대식 개최' },
    { year: 2023, month:  1, label: '정회원 제도 시작',  desc: '연회비 납부 정회원 멤버십 도입' },
    { year: 2023, month:  1, label: '제1회 싸피인의 밤', desc: '동문들과 함께하는 첫 번째 대규모 네트워킹 파티' },
    { year: 2023, month:  3, label: '동아리 제도 시작',  desc: '관심사 기반 동문 소모임 제도 도입' },
    { year: 2023, month:  3, label: '동문 1,000명 돌파', desc: '창설 1년도 채 되지 않아 동문 1,000명 돌파' },
    { year: 2023, month:  6, label: '제1회 SSAFYnale',  desc: '싸피니티 대표 연례 행사의 시작' },
    { year: 2024, month:  6, label: '동문 2,000명 돌파', desc: '꾸준한 기수 참여로 동문 2,000명 돌파' },
    { year: 2024, month:  8, label: '인프콘 2024 참여',  desc: '첫 외부 행사 초청 — 싸피니티를 외부에 공식 소개한 첫 자리' },
    { year: 2025, month:  1, label: '동문 3,000명 돌파', desc: '동문 커뮤니티 3,000명 규모로 성장' },
    { year: 2025, month: 12, label: '동문 4,000명 돌파', desc: '14개 기수, 4,000명 이상의 동문이 함께하는 공동체로 성장' },
  ],

  // ─── 행사 ──────────────────────────────────────────────────────
  // 상세 데이터는 src/data/events/{year}.ts 참조
  // 새 연도 추가 시: 파일 생성 후 eventYears 배열에 연도 추가
  upcomingEventYear: 2026,        // [업데이트 필요] 다가오는 행사가 있는 연도
  eventYears: [2022, 2023, 2024, 2025, 2026],

  // ─── 협력사 ────────────────────────────────────────────────────────
  // 상세 데이터는 src/data/partners/{slug}.ts 참조
  // 새 협력사 추가 시: partners/{slug}.ts 생성 후 computed.ts의 allPartners에 추가

  // ─── 멤버십 ────────────────────────────────────────────────────
  membership: {
    regular: {
      title: '일반 회원',
      fee: '무료',
      desc: '가입 대상 조건 2개 중 1개에 해당하면 가입 가능',
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
    { generation: 1, year: 2022 },
    { generation: 2, year: 2023 },
    { generation: 3, year: 2024 },
    { generation: 4, year: 2025 },
    { generation: 5, year: 2026 },
  ],

  // ─── 동아리 목록 ───────────────────────────────────────────────
  // 상세 데이터는 src/data/clubs/{slug}.ts 참조
  // 새 동아리 추가 시: 파일 생성 후 아래 배열에 slug 추가
  clubSlugs: [
    'doljabi-climbing',
  ],

  // ─── FAQ ───────────────────────────────────────────────────────
  // 상세 데이터는 src/data/faqs.ts 참조

} as const
