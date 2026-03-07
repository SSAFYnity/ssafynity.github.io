// 2025년 행사 목록

import type { Event } from '@/data/constants'

export const events2025: Event[] = [
  {
    slug:        '2025-job-challenge-4',
    title:       '취준챌린지 4기',
    eventDate:   { start: '2025-01-02', end: '2025-02-14' },
    recruitDate: { start: '2024-12-22', end: '2024-12-29' },
    location:    'SSAFYnity GitHub · Discord',
    format:      ['online'],
    kind:        'special',
    audience:    'members',
    summary:     '취업 준비 중인 동문 회원이 함께하는 온라인 자기계발 챌린지',
    img:         '/events/Job-Preparation-Challenge-4th.jpg',
    capacity:    'unlimited',
    registrants: { members: 24, operator: 1 },
    completions: { members: 21 },
    notices: {
      fee: {
        regular: '무료',
        members: '무료',
      },
      refund: ['해당사항 없음'],
      custom: [
        {
          title: '챌린지 구성',
          body:  '기상인증 · 알고리즘 · 모각코 · 커밋인증 파트로 진행됩니다.\n원하는 파트를 1개 이상 자유롭게 선택해 참여할 수 있습니다.',
        },
        {
          title: '노쇼 방지',
          body:  '신청한 파트에 단 한 번도 참여하지 않은 경우,\n다음 챌린지 참여가 제한됩니다.',
        },
        {
          title: '리워드 안내',
          body:  '참여율 50% 이상 달성한 파트에 한해 챌린지 수료증이 제공됩니다.\n우수 수료자에게는 희망 직무 또는 회사 현직자와의 1:1 상담이 제공됩니다.\n단, 현직자 섭외가 어려운 경우 포트폴리오·이력서 피드백으로 대체됩니다.',
        },
        {
          title: '우수 수료자 선정 기준',
          body:  '신청자 상위 10%를 우수 수료자로 선정합니다.\n· 파트별 인증 성공 횟수\n· 참여한 챌린지 수\n· 파트 우선순위: 알고리즘 > 기상인증 > 모각코 = 커밋인증',
        },
      ],
    },
  },
  {
    slug:        '2025-job-challenge-5',
    title:       '취준챌린지 5기',
    eventDate:   { start: '2025-03-04', end: '2025-04-11' },
    recruitDate: { start: '2025-02-12', end: '2025-02-20' },
    location:    'SSAFYnity GitHub · Discord',
    format:      ['online'],
    kind:        'special',
    audience:    'members',
    summary:     '취업 준비 중인 동문 회원이 함께하는 온라인 자기계발 챌린지',
    img:         '/events/Job-Preparation-Challenge-5th.jpg',
    capacity:    'unlimited',
    registrants: { members: 42, regular: 3, operator: 1 },
    completions: { members: 38, regular: 2 },
    notices: {
      fee: {
        regular: '무료',
        members: '무료',
      },
      refund: ['해당사항 없음'],
      custom: [
        {
          title: '챌린지 구성',
          body:  '기상인증 · 알고리즘 · 모각코 · 커밋인증 파트로 진행됩니다.\n원하는 파트를 1개 이상 자유롭게 선택해 참여할 수 있습니다.',
        },
        {
          title: '노쇼 방지',
          body:  '신청한 파트에 단 한 번도 참여하지 않은 경우,\n다음 챌린지 참여가 제한됩니다.',
        },
        {
          title: '리워드 안내',
          body:  '참여율 50% 이상 달성한 파트에 한해 챌린지 수료증이 제공됩니다.\n우수 수료자에게는 희망 직무 또는 회사 현직자와의 1:1 상담이 제공됩니다.\n단, 현직자 섭외가 어려운 경우 포트폴리오·이력서 피드백으로 대체됩니다.',
        },
        {
          title: '우수 수료자 선정 기준',
          body:  '신청자 상위 10%를 우수 수료자로 선정합니다.\n· 파트별 인증 성공 횟수\n· 참여한 챌린지 수\n· 파트 우선순위: 알고리즘 > 기상인증 > 모각코 = 커밋인증',
        },
      ],
    },
  },
  {
    slug:      '2025-night-of-ssafynity',
    title:     '싸피인의 밤',
    eventDate:   { start: '2025-03-08', startTime: '16:00', endTime: '19:00' },
    recruitDate: { start: '2025-02-18', end: '2025-03-07' },
    location:    '서교플레이스 홍대점',
    locationUrl: { naver: 'https://naver.me/G8f0rfVm', kakao: 'https://place.map.kakao.com/1177615458', google: 'https://maps.app.goo.gl/oXhrtGf9fZDN97ei8' },
    format:    ['offline'],
    kind:      'regular',
    audience:  'members',
    summary:   '새 운영진과 동문들이 함께하는 신년 네트워킹 파티',
    notices: {
      fee: {
        regular:  '무료',
        members:  20000,
        note:     '참가비는 대관비, 주류, 다과 및 행사 진행비로 사용됩니다.\n접수 내역 확인 및 참가비 입금까지 완료되어야 최종 신청이 완료됩니다',
      },
      refund: [
        '행사 3일 이내 취소 시 환불 불가',
        '환불 대상자는 행사 종료 후 일괄 처리됩니다',
      ],
      custom: [
        {
          title: '제공 사항',
          body:  '테이블 단위 주류와 다과가 제공됩니다.',
        },
        {
          title: '드레스코드',
          body:  '이번 행사의 메인 컬러는 노란색입니다.\n드레스 포인트 컬러 또는 아이템으로 활용해주세요.',
        },
        {
          title: '사전 접수 이벤트',
          body:  '행사 신청 시 아래 항목을 함께 제출할 수 있습니다.\n· 2025년에 이루고자 하는 목표/다짐',
        },
        {
          title: '음주 안내',
          body:  '주류가 제공되는 행사입니다.\n즐거운 자리가 될 수 있도록 과음에 주의해주시고,\n귀가 시 안전에 유의해주세요.',
        },
      ],
    },
    img:       '/events/2025-night-of-ssafynity.jpg',
    capacity:    70,
    registrants: { members: 37, regular: 25, operator: 13, partner: 10 },
    attendees:   { members: 36, regular: 25, operator: 13, partner: 10 },
  },
  {
    slug:        '2025-job-challenge-6',
    title:       '취준챌린지 6기',
    eventDate:   { start: '2025-05-07', end: '2025-06-20' },
    recruitDate: { start: '2025-04-22', end: '2025-04-30' },
    location:    'SSAFYnity GitHub · Discord',
    format:      ['online'],
    kind:        'special',
    audience:    'members',
    summary:     '취업 준비 중인 동문 회원이 함께하는 온라인 자기계발 챌린지',
    img:         '/events/Job-Preparation-Challenge-6th.jpg',
    capacity:    'unlimited',
    registrants: { members: 24, regular: 1, operator: 1 },
    notices: {
      fee: {
        regular: '무료',
        members: '무료',
      },
      refund: ['해당사항 없음'],
      custom: [
        {
          title: '챌린지 구성',
          body:  '기상인증 · 알고리즘 · 모각코 · 커밋인증 파트로 진행됩니다.\n원하는 파트를 1개 이상 자유롭게 선택해 참여할 수 있습니다.',
        },
        {
          title: '노쇼 방지',
          body:  '신청한 파트에 단 한 번도 참여하지 않은 경우,\n다음 챌린지 참여가 제한됩니다.',
        },
        {
          title: '리워드 안내',
          body:  '참여율 50% 이상 달성한 파트에 한해 챌린지 수료증이 제공됩니다.\n우수 수료자에게는 희망 직무 또는 회사 현직자와의 1:1 상담이 제공됩니다.\n단, 현직자 섭외가 어려운 경우 포트폴리오·이력서 피드백으로 대체됩니다.',
        },
        {
          title: '우수 수료자 선정 기준',
          body:  '신청자 상위 10%를 우수 수료자로 선정합니다.\n· 파트별 인증 성공 횟수\n· 참여한 챌린지 수\n· 파트 우선순위: 알고리즘 > 기상인증 > 모각코 = 커밋인증',
        },
      ],
    },
  },
  {
    slug:      '2025-ssafynale',
    title:     '제 3회 SSAFYnale',
    eventDate:   { start: '2025-06-06', startTime: '13:00', endTime: '18:30' },
    recruitDate: { start: '2025-05-09', end: '2025-06-05' },
    location:    '멀티캠퍼스 역삼 18층',
    locationUrl: { naver: 'https://naver.me/x5GzwAww', kakao: 'https://place.map.kakao.com/21414107', google: 'https://maps.app.goo.gl/7cw8g2vDrjxw1AQU9' },
    format:      ['offline', 'recorded'],
    kind:      'regular',
    audience:  'open',
    summary:   '동문회원이 직접 발표자로 나서 성장과 고민을 공유하는 IT 컨퍼런스',
    notices: {
      fee: {
        regular:  '무료',
        members:  5000,
        external: 10000,
        note:     '접수 내역 확인 및 참가비 입금까지 완료되어야 최종 신청이 완료됩니다.',
      },
      refund: [
        '행사 7일 전까지 취소 시 수수료를 제외한 전액 환불',
        '행사 7일 이내 취소 시 환불 불가',
        '환불 대상자는 행사 종료 후 일괄 처리됩니다',
      ],
      custom: [
        {
          title: '이번 행사 슬로건',
          body:  '\'다음\', 변화의 갈림길\n끝없는 다양성 속에서의 선택과 성장',
        },
        {
          title: '입퇴장 안내',
          body:  '발표 진행 중에는 입장 및 퇴실이 제한됩니다.\n사전에 타임테이블을 확인해주세요.\n늦은 입장이나 조기 퇴실은 발표 외 시간에 자유롭게 가능합니다.',
        },
        {
          title: '사전 질문 접수',
          body:  '행사 신청 시 발표자에게 미리 질문을 제출할 수 있습니다.',
        },
        {
          title: '직무별 회식',
          body:  '행사 후 희망자에 한해 직무별 소규모 회식이 진행됩니다.\n공식 프로그램이 아니므로 비용은 참여자끼리 나눕니다.',
        },
        {
          title: '참가 권장 대상',
          body:  '발표자 모두 만 5년차 이하의 주니어 개발자입니다.\n취업준비생부터 만 5년차 이하의 주니어분께 특히 추천드립니다.\n외부인원분들도 이 점 참고하여 신청해주세요.',
        },
        {
          title: '커뮤니케이션 공간',
          body:  '발표장 외에도 참가자들이 자유롭게 소통할 수 있는 별도 공간을 제공합니다.',
        },
        {
          title: '주차 안내',
          body:  '별도 주차장이 제공되지 않습니다. 가급적 대중교통을 이용해주세요.',
        },
      ],
    },
    img:       '/events/2025-ssafynale.png',
    capacity:    100,
    registrants: { members: 16, regular: 12, external: 31, operator: 13, partner: 2 },
    attendees:   { members: 13, regular: 11, external: 29, operator: 13, partner: 2 },
  },
  {
    slug:      '2025-potluck-party',
    title:     '포트락 파티',
    eventDate:   { start: '2025-09-27', startTime: '12:00', endTime: '17:00' },
    recruitDate: { start: '2025-08-31', end: '2025-09-26' },
    location:    '플랜츠인파티룸&바베큐 신림점',
    locationUrl: { naver: 'https://naver.me/xVBxMuSZ', kakao: 'https://place.map.kakao.com/1336923719' },
    format:     ['offline'],
    kind:       'regular',
    audience:   'members',
    summary:    '각자 소개하고 싶은 음식을 나누고 게임으로 함께 즐기는 동문 친목 파티',
    notices: {
      fee: {
        regular:  '무료',
        members:  5000,
        note:     '참가비는 대관비, 주류, 다과 및 행사 진행비로 사용됩니다.\n접수 내역 확인 및 참가비 입금까지 완료되어야 최종 신청이 완료됩니다',
      },
      refund: [
        '행사 7일 전까지 취소 시 수수료를 제외한 전액 환불',
        '행사 7일 이내 취소 시 환불 불가',
        '환불 대상자는 행사 종료 후 일괄 처리됩니다',
      ],
      items: [
        '소개하고 싶은 소소한 음식',
      ],
      custom: [
        {
          title: '포트락 파티 안내',
          body:  '각자 소개하고 싶은 음식을 가져와 함께 나누는 파티입니다.\n입장 확인 후에는 자유롭게 소통하고 파티를 즐겨주세요.',
        },
      ],
    },
    img:        '/events/2025-potluck-party.jpg',
    capacity:    50,
    registrants: { members: 17, regular: 18, operator: 8 },
    attendees:   { members: 15, regular: 14, operator: 8 },
  },
  {
    slug:      '2025-career-party',
    title:     '커리어파티',
    eventDate:   { start: '2025-12-06', startTime: '13:00', endTime: '18:00' },
    recruitDate: { start: '2025-11-20', end: '2025-12-03', endTime: '23:59' },
    location:    '멀티캠퍼스 역삼 18층',
    locationUrl: { naver: 'https://naver.me/x5GzwAww', kakao: 'https://place.map.kakao.com/21414107', google: 'https://maps.app.goo.gl/7cw8g2vDrjxw1AQU9' },
    format:      ['offline'],
    kind:        'regular',
    audience:    'open',
    summary:     '직무·도메인·취미 단위로 소통하는 커리어 네트워킹 파티',
    notices: {
      fee: {
        regular:  '무료',
        members:  3000,
        external: 5000,
        note:     '참가비는 다과, 음료, 상품 및 행사 진행비로 사용됩니다.\n접수 내역 확인 및 참가비 입금까지 완료되어야 최종 신청이 완료됩니다',
      },
      refund: [
        '행사 7일 전까지 취소 시 수수료를 제외한 전액 환불',
        '행사 7일 이내 취소 시 환불 불가',
        '환불 대상자는 행사 종료 후 일괄 처리됩니다',
      ],
      custom: [
        {
          title: '행사 구성',
          body:  '1부 직무 · 2부 도메인 · 3부 취미 단위로 진행되는 네트워크 파티입니다.\n각 파트별 공간에서 자유롭게 소통하고 인적 네트워크를 넓혀보세요.',
        },
        {
          title: '참가 권장 대상',
          body:  '취업준비생부터 경력 5년차 이하의 주니어분들의 참여를 권장합니다.',
        },
        {
          title: '주차 안내',
          body:  '별도 주차장이 제공되지 않습니다. 가급적 대중교통을 이용해주세요.',
        },
      ],
    },
    img:         '/events/2025-career-party.jpg',
    capacity:    100,
    registrants: { members: 37, regular: 9, external: 36, operator: 7, partner: 2, invited: 17 },
    attendees:   { members: 31, regular: 9, external: 26, operator: 7, partner: 2, invited: 16 },
  },
]
