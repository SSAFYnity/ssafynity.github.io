// 2026년 행사 목록
// [업데이트 필요] 행사 확정 시 항목 추가

import type { Event } from '@/data/constants'

export const events2026: Event[] = [
  {
    slug:        '2026-online-tetris-tournament',
    title:       '온라인 테트리스 대회',
    eventDate:   { start: '2026-05-31', startTime: '22:00', endTime: '22:30' },
    recruitDate: { start: '2026-05-23', end: '2026-05-30' },
    format:      ['online'],
    kind:        'special',
    audience:    'members',
    summary:     '정회원과 일반회원이 함께 참여하는 온라인 테트리스 대회',
    img:         '/events/2026-online-tetris-tournament.png',
    formUrl:     'https://forms.gle/PGmSAYTmFthqiRUc8',
    capacity:    'unlimited',
    registrants: { regular: 4, members: 6 },
    attendees:   { regular: 4, members: 3, operator: 1 },
    notices: {
      fee: {
        regular: '무료',
        members: 2000,
        note:    '상품 및 행사 진행비\n접수 내역 확인 및 참가비 입금까지 완료되어야 최종 신청이 완료됩니다',
      },
      refund: [
        '행사 3일 이내 취소 시 환불 불가',
        '환불 가능 기간 내 요청 시 전액 환불',
        '환불 대상자는 행사 종료 후 일괄 처리됩니다',
      ],
      custom: [
        {
          title: '상품 안내',
          body:  '1등: OpenAI 3만원권\n2등: 배민 1만원권',
        },
        {
          title: '유의사항',
          body:  '상품 규모는 접수 인원에 따라 확대 또는 축소될 수 있습니다.',
        },
      ],
      resultsCustom: [
        {
          title: '라이브 시청',
          body:  '최대 동시접속자 12명',
        },
      ],
    },
  },
  {
    slug:      '2026-night-of-ssafynity',
    title:     '제4회 싸피인의 밤',
    eventDate: { start: '2026-06-27', startTime: '13:30', endTime: '22:00' },
    recruitDate: { start: '2026-05-30', end: '2026-06-26' },
    location:  '아일랜드 이너프 강남점',
    locationUrl: { naver: 'https://naver.me/xGIPXKSS', kakao: 'https://place.map.kakao.com/1459847323' },
    format:    ['offline'],
    kind:      'regular',
    audience:  'members',
    summary:   '초록 또는 카키 드레스코드로 함께하는 상반기 동문회원 친목행사',
    img:       '/events/2026-night-of-ssafynity.png',
    gallery: [
      '/events/2026-night-of-ssafynity-02.png',
      '/events/2026-night-of-ssafynity-03.png',
      '/events/2026-night-of-ssafynity-04.png',
      '/events/2026-night-of-ssafynity-05.png',
    ],
    formUrl:   'https://forms.gle/XPDarz4j5hnUf89K9',
    capacity:  100,
    registrants: { regular: 18, members: 41 },
    attendees: { regular: 14, members: 39, operator: 9, partner: 4 },
    notices: {
      fee: {
        regular: '무료',
        members: 20000,
        note:    '참가비는 대관비, 주류, 다과 및 행사 진행비로 사용됩니다.\n접수 내역 확인 및 참가비 입금까지 완료되어야 최종 신청이 완료됩니다',
      },
      refund: [
        '행사 3일 이내 취소 시 환불 불가',
        '환불 대상자는 행사 종료 후 일괄 처리됩니다',
      ],
      checklist: [
        '본 행사는 동문회원만 신청 가능합니다.',
        '아직 회원이 아니라면 동문회 가입신청도 함께 작성해주세요.',
        '행사 당일 전 정회원으로 등록이 완료되면 정회원으로 참여 가능합니다.',
      ],
      custom: [
        {
          title: '타임테이블',
          body:  '13:30 - 14:00 입장 및 접수\n14:00 - 14:20 오프닝\n14:20 - 17:30 [1부] Logic & Play\n17:30 - 18:00 Break Time\n18:00 - 21:30 [2부] Networking\n21:30 - 22:00 클로징',
        },
        {
          title: '드레스코드',
          body:  '이번 행사의 메인 컬러는 초록색과 카키색입니다.\n드레스 포인트 컬러 또는 아이템으로 활용해주세요.\n\n상의, 양말, 시계 스트랩처럼 작은 포인트도 좋습니다.\n농담 반 진담 반으로 IDE 주석 색상까지는 인정하지만,\n노트북 인증은 선택입니다.',
        },
        {
          title: '입퇴장 안내',
          body:  '빠른 퇴실 및 늦은 입실이 가능합니다.\n운영 준비를 위해 신청 단계에서 관련 수요를 함께 조사하고 있습니다.',
        },
        {
          title: '음주 안내',
          body:  '주류가 제공되는 행사입니다.\n즐거운 자리가 될 수 있도록 과음에 주의해주시고,\n음주 후 운전은 절대 금지되며 귀가 시 안전에 유의해주세요.',
        },
      ],
    },
  },
  {
    slug:      '2026-metcha-chameleon-tournament',
    title:     '멧챠 카멜레온 대전',
    eventDate: { start: '2026-08-30', startTime: '20:00' },
    recruitDate: { start: '2026-08-21', end: '2026-08-28' },
    formUrl:   'https://forms.gle/EpfAMxMAvKq3FxPG7',
    format:    ['online'],
    kind:      'ongoing',
    audience:  'regular',
    summary:   '정회원이 디스코드에서 함께 참여하고 유튜브 생중계로 진행하는 온라인 게임 행사',
    img:       '/events/2026-metcha-chameleon-tournament.png',
    notices: {
      fee: {
        regular: '무료',
      },
      checklist: [
        '본 행사는 정회원만 참여 가능합니다.',
        '접수 마감 전까지 정회원 승인이 완료되면 행사에 참여할 수 있습니다.',
      ],
      custom: [
        {
          title: '진행 플랫폼',
          body:  '디스코드와 유튜브 생중계로 진행됩니다.',
        },
      ],
    },
  },
  {
    slug:      '2026-hangang-chicken',
    title:     '9월 정회원 한강치킨모임',
    eventDate: { start: '2026-09-20', startTime: '15:00', endTime: '19:00' },
    location:  '뚝섬한강공원',
    registrationChannel: '정회원 단톡방',
    format:    ['offline'],
    kind:      'ongoing',
    audience:  'regular',
    summary:   '뚝섬한강공원에서 치킨과 함께하는 정회원 전용 모임',
    img:       '/events/2026-hangang-chicken.png',
    notices: {
      checklist: ['이번 행사는 정회원만 참여할 수 있습니다.'],
      items: ['운영진 제공 항목 외 필요한 물품은 개인이 지참해 주세요.'],
      custom: [
        {
          title: '운영진 제공',
          body: '돗자리를 준비하고 치킨 비용을 지원합니다.',
        },
        {
          title: '참여 신청 및 상세 안내',
          body: '별도 접수 링크 없이 정회원 단톡방에서 참여 신청을 받습니다.\n상세 안내도 정회원 단톡방에 공지합니다.',
        },
        {
          title: '집결 위치',
          body: '뚝섬한강공원 내 정확한 집결 위치는 정회원 단톡방에서 실시간으로 소통하며 안내합니다.',
        },
        {
          title: '진행 시간',
          body: '공식 진행 시간은 15:00부터 19:00까지입니다.\n공식 시간 전후의 자유 모임은 선택 참여입니다.',
        },
      ],
    },
  },
  {
    slug:      '2026-ssafynale',
    title:     '제4회 SSAFYnale',
    speakerFormUrl: 'https://forms.gle/7LnEzCgAuhRUfGAj6',
    formUrl: 'https://forms.gle/yx8C633ozorbJ6pD9',
    eventDate: {
      start:     '2026-11-22',
      startTime: '13:00',
    },
    recruitDate: { start: '2026-10-21', end: '2026-11-21' },
    location: '역삼 멀티캠퍼스 18층 대강의장',
    locationUrl: {
      naver: 'https://naver.me/x5GzwAww',
      kakao: 'https://place.map.kakao.com/21414107',
      google: 'https://maps.app.goo.gl/7cw8g2vDrjxw1AQU9',
    },
    format:   ['offline'],
    kind:     'regular',
    audience: 'open',
    summary:  'AI LOVE IT - 아이 러브 잇 · IT를 사랑하는 마음, 아이처럼 배우고, AI처럼 성장하다.',
    capacity: 150,
    notices: {
      fee: {
        regular: '무료',
        members: 5000,
        external: 10000,
        note: '대관비, 다과, 음료, 상품 및 행사 진행비\n접수 내역 확인 및 참가비 입금까지 완료되어야 최종 신청이 완료됩니다',
      },
      refund: [
        '2026년 11월 15일까지 취소 시 수수료를 제외한 전액 환불',
        '2026년 11월 16일부터 환불 불가',
        '환불 대상자는 행사 종료 후 일괄 처리됩니다',
      ],
      custom: [
        {
          title: '참여 안내',
          items: [
            '현재는 발표자 목록 공개 전 사전 접수 기간입니다.',
            '발표자·세부 주제는 확정 후 안내합니다.',
            '참여자 신청 시 Google 로그인이 필요합니다.',
            '권장 청중: 개발 분야 취업준비생~현업 8년차 이하',
            '접수 우선순위: 정회원 → 일반회원 → 외부 참가자',
            '각 우선순위 내 선착순 접수, 정원 충원 시 조기 마감',
            '참가비·입금·환불은 비용·환불 탭에서 확인',
          ],
        },
        {
          title: '발표자 모집',
          items: [
            '지원 자격: SSAFYnity 동문회원 또는 개발 실무 경력 7년 이상',
            '모집 주제: AI 경험 우선, 다른 실무 경험도 환영',
            '모집 마감: 발표자 정원 충원 시',
            '발표 시간(예정): 동문회원 50분(질의응답 포함), 시니어 60분',
            '시니어 질의응답 포함 여부·개인별 시간은 추후 안내',
            '발표 방식: 프레젠테이션·데모 시연 가능, 라이브 코딩 지양',
          ],
        },
        {
          title: '발표 준비·촬영',
          items: [
            '제목·주제: 접수 후 수정 불가',
            '발표 자료: 접수 시 제출 불필요',
            '작성 방법: 운영진이 제공하는 구글 프레젠테이션 사용',
            '자료 제출: 11월 20일(금)까지',
            '촬영·녹화: 사진·영상 원본을 발표자에게 제공',
            'SNS 공개: 공개 전 발표자 확인',
          ],
        },
        {
          title: '프로그램 (예정)',
          items: [
            '13:00–13:20 오프닝',
            '13:20–13:40 안내·이동',
            '13:40–17:40 발표·세미나',
            '17:50–18:40 자유 네트워킹',
            '18:50–19:00 클로징',
            '발표자·주제 추후 공개, 프로그램·시간 변경 가능',
            '행사 종료 후 회식은 자율 참석',
          ],
        },
        {
          title: '현장 이용',
          items: [
            '발표 중: 입장·퇴실 제한',
            '늦은 입장·조기 퇴실: 발표 외 시간에 가능',
            '사전에 타임테이블을 확인해주세요.',
            '별도 주차장이 제공되지 않습니다. 가급적 대중교통을 이용해주세요.',
          ],
        },
        {
          title: '문의',
          items: [
            '이메일: ssafynity@gmail.com',
            '카카오톡: https://pf.kakao.com/_GdeRX',
          ],
        },
      ],
    },
  },
]
