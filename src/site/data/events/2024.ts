// 2024년 행사 목록

import type { Event } from '@/data/constants'

export const events2024: Event[] = [
  {
    slug:      '2024-night-of-ssafynity',
    title:     '싸피인의 밤',
    eventDate:   { start: '2024-02-17', startTime: '14:30', endTime: '18:00' },
    recruitDate: { start: '2024-01-29', end: '2024-02-14' },
    location:    '합정티라미수 합정본점',
    locationUrl: { naver: 'https://naver.me/5xjpDrhV', kakao: 'https://place.map.kakao.com/1843841774', google: 'https://maps.app.goo.gl/xqxSgP24FTNBSHVs8' },
    format:      ['offline'],
    kind:      'regular',
    audience:  'members',
    summary:   '한 해를 마무리하며 동문들과 함께하는 네트워킹 파티',
    notices: {
      fee: {
        regular:  '무료',
        members:  25000,
        note:     '참가비는 대관비, 주류, 다과 및 행사 진행비로 사용됩니다.\n접수 내역 확인 및 참가비 입금까지 완료되어야 최종 신청이 완료됩니다',
      },
      refund: [
        '행사 3일 이내 취소 시 환불 불가',
        '환불 가능 기간 내 요청 시 500원 수수료를 제외한 전액 환불',
        '환불 대상자는 행사 종료 후 일괄 처리됩니다',
      ],
      custom: [
        {
          title: '제공 사항',
          body:  '테이블 단위 주류와 다과가 제공됩니다.',
        },
        {
          title: '드레스코드',
          body:  '이번 행사의 메인 컬러는 푸른색입니다.\n드레스 포인트 컬러 또는 아이템으로 활용해주세요.',
        },
        {
          title: '사전 접수 이벤트',
          body:  '행사 신청 시 아래 항목을 함께 제출할 수 있습니다.\n· 태어난 연도\n· 작년 가장 감사했던 일화\n· 올해의 목표/다짐',
        },
        {
          title: '음주 안내',
          body:  '주류가 제공되는 행사입니다.\n즐거운 자리가 될 수 있도록 과음에 주의해주시고,\n귀가 시 안전에 유의해주세요.',
        },
      ],
    },
    img:       '/events/2024-night-of-ssafynity.jpeg',
    capacity:    80,
    registrants: { members: 23, regular: 34, operator: 15, partner: 7 },
    attendees:   { members: 20, regular: 29, operator: 15, partner: 7 },
  },
  {
    slug:      '2024-operator-spring-mt',
    title:     '3대 운영진 MT',
    eventDate:   { start: '2024-03-02', startTime: '17:00', end: '2024-03-03', endTime: '11:00' },
    location:    '클래드 파티룸',
    locationUrl: { naver: 'https://naver.me/GyYnOapW', google: 'https://maps.app.goo.gl/JjMHCGbuZBLLDcDA6' },
    format:      ['offline'],
    audience:  'operator',
    summary:   '1박 2일 운영진 워크숍 및 친목 도모',
    notices: {
      custom: [
        {
          title: '비용 안내',
          body:  '이 행사는 동문회비를 사용하지 않습니다.\n참여를 희망하는 운영진에 한해 개인 자부담으로 진행됩니다.',
        },
      ],
    },
    note:      '동문회비 미사용, 운영진 자부담으로 진행',
    img:       '/events/2024-operator-spring-mt.png',
    internal:  true,
    capacity:    19,
    registrants: { operator: 7 },
    attendees:   { operator: 7 },
  },
  {
    slug:      '2024-member-mt',
    title:     '정회원 MT',
    eventDate:   { start: '2024-04-27', startTime: '12:00', end: '2024-04-28', endTime: '13:00' },
    recruitDate: { start: '2024-03-29', end: '2024-04-05' },
    location:    '용인 엘펜션L',
    locationUrl: { naver: 'https://naver.me/xLsJTi1W', kakao: 'https://place.map.kakao.com/538536799' },
    format:      ['offline'],
    kind:      'ongoing',
    audience:  'regular',
    summary:   '1박 2일 정회원 워크숍 및 친목 도모',
    notices: {
      items: [
        '편한 복장',
        '세면도구 등 1박에 필요한 개인 용품',
      ],
      custom: [
        {
          title: '비용 안내',
          body:  '행사 비용 일부는 동문회비로 지원됩니다.\n나머지 금액은 참여자들이 균등하게 분담합니다.',
        },
      ],
    },
    img:       '/events/2024-member-mt.jpg',
    capacity:    20,
    registrants: { regular: 25, operator: 5 },
    attendees:   { regular: 25, operator: 5 },
  },
  {
    slug:      '2024-ssafynale',
    title:     '제 2회 SSAFYnale',
    eventDate:   { start: '2024-06-22', startTime: '13:00', endTime: '18:00' },
    recruitDate: { start: '2024-05-01', end: '2024-06-21' },
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
        note:     '참가비는 대관비, 다과, 음료, 상품 및 행사 진행비로 사용됩니다.\n접수 내역 확인 및 참가비 입금까지 완료되어야 최종 신청이 완료됩니다',
      },
      refund: [
        '행사 7일 전까지 취소 시 수수료를 제외한 전액 환불',
        '행사 7일 이내 취소 시 환불 불가',
        '환불 대상자는 행사 종료 후 일괄 처리됩니다',
      ],
      custom: [
        {
          title: '이번 행사 슬로건',
          body:  '\'연결\', 함께 성장하는 개발자\n화합과 성장의 교차로',
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
    img:       '/events/2024-ssafynale.jpg',
    capacity:    100,
    registrants: { members: 53, regular: 22, external: 70, operator: 15, partner: 3, invited: 4 },
    attendees:   { members: 47, regular: 21, external: 67, operator: 15, partner: 3, invited: 4 },
  },
  {
    slug:        '2024-job-challenge-1',
    title:       '취준챌린지 1기',
    eventDate:   { start: '2024-07-15', end: '2024-08-31' },
    recruitDate: { start: '2024-07-04', end: '2024-07-12' },
    location:    'SSAFYnity GitHub · Discord',
    format:      ['online'],
    kind:        'special',
    audience:    'members',
    summary:     '취업 준비 중인 동문 회원이 함께하는 온라인 자기계발 챌린지',
    img:         '/events/Job-Preparation-Challenge-1st.jpg',
    capacity:    'unlimited',
    registrants: { members: 83, regular: 5, operator: 1 },
    completions: { members: 57, regular: 3 },
    notices: {
      fee: {
        regular: '무료',
        members: '무료',
      },
      refund: ['해당사항 없음'],
      custom: [
        {
          title: '챌린지 구성',
          body:  '기상인증 · 알고리즘 · 모각코 파트로 진행됩니다.\n원하는 파트를 1개 이상 자유롭게 선택해 참여할 수 있습니다.',
        },
        {
          title: '노쇼 방지',
          body:  '신청한 파트에 단 한 번도 참여하지 않은 경우,\n다음 챌린지 참여가 제한됩니다.',
        },
        {
          title: '리워드 안내',
          body:  '우수 참여자에게 리워드가 제공됩니다.',
        },
        {
          title: '우수 수료자 선정 기준',
          body:  '신청자 상위 10%를 우수 수료자로 선정합니다.\n· 파트별 인증 성공 횟수\n· 참여한 챌린지 수\n· 파트 우선순위: 알고리즘 > 기상인증 > 모각코',
        },
        {
          title: '정회원 혜택',
          body:  '정회원 참가자에게 OPIc 무료 수강권이 제공됩니다.',
        },
      ],
    },
  },
  {
    slug:        '2024-job-challenge-2',
    title:       '취준챌린지 2기',
    eventDate:   { start: '2024-09-01', end: '2024-09-30' },
    recruitDate: { start: '2024-08-23', end: '2024-08-31' },
    location:    'SSAFYnity GitHub · Discord',
    format:      ['online'],
    kind:        'special',
    audience:    'members',
    summary:     '취업 준비 중인 동문 회원이 함께하는 온라인 자기계발 챌린지',
    img:         '/events/Job-Preparation-Challenge-2nd.jpg',
    capacity:    'unlimited',
    registrants: { members: 43, operator: 1 },
    completions: { members: 42 },
    notices: {
      fee: {
        regular: '무료',
        members: '무료',
      },
      refund: ['해당사항 없음'],
      custom: [
        {
          title: '챌린지 구성',
          body:  '기상인증 · 알고리즘 · 모각코 파트로 진행됩니다.\n원하는 파트를 1개 이상 자유롭게 선택해 참여할 수 있습니다.',
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
          body:  '신청자 상위 10%를 우수 수료자로 선정합니다.\n· 파트별 인증 성공 횟수\n· 참여한 챌린지 수\n· 파트 우선순위: 알고리즘 > 기상인증 > 모각코',
        },
      ],
    },
  },
  {
    slug:      '2024-sports-day',
    title:     '제 3회 가을체육대회',
    eventDate:   { start: '2024-09-28', startTime: '14:00', endTime: '18:00' },
    recruitDate: { start: '2024-09-03', end: '2024-09-25' },
    location:    '이촌한강공원 축구장',
    locationUrl: { naver: 'https://naver.me/F42zPlDa', kakao: 'https://place.map.kakao.com/24210639', google: 'https://maps.app.goo.gl/rqNJNAAZNfaiyWP4A' },
    format:     ['offline'],
    kind:       'regular',
    audience:   'members',
    summary:    '동문들과 함께하는 가을 체육 행사',
    notices: {
      fee: {
        regular:  '무료',
        members:  10000,
        note:     '참가비는 다과, 음료, 상품 및 행사 진행비로 사용됩니다.\n접수 내역 확인 및 참가비 입금까지 완료되어야 최종 신청이 완료됩니다',
      },
      refund: [
        '행사 3일 이내 취소 시 환불 불가',
        '환불 가능 기간 내 요청 시 500원 수수료를 제외한 전액 환불',
        '환불 대상자는 행사 종료 후 일괄 처리됩니다',
      ],
      checklist: [
        '본 행사는 SSAFYnity 회원만 참여 가능합니다.',
        '공원 입구에서 축구장까지 도보 이동이 있으니 여유 있게 도착해주세요.',
      ],
      items: [
        '간편한 운동 복장',
        '선크림 등 자외선 차단 용품',
      ],
      custom: [
        {
          title: '우천 안내',
          body:  '우천 시 일정이 변경될 수 있습니다.\n변경 사항은 추후 공지드립니다.',
        },
        {
          title: '취소 안내',
          body:  '팀전으로 진행되는 행사 특성상,\n참여가 어려울 경우 반드시 사전에 연락 부탁드립니다.',
        },
        {
          title: '뒷풀이 안내',
          body:  '행사 후 희망자에 한해 뒷풀이 회식이 진행됩니다.\n음주 가능성이 있으니 차량 이용 예정이신 분은 참고해주세요.',
        },
      ],
    },
    img:        '/events/2024-sports-day.png',
    capacity:    50,
    registrants: { members: 7, regular: 11, operator: 15 },
    attendees:   { members: 3, regular: 9, operator: 15 },
  },
  {
    slug:        '2024-job-challenge-3',
    title:       '취준챌린지 3기',
    eventDate:   { start: '2024-11-04', end: '2024-12-13' },
    recruitDate: { start: '2024-10-28', end: '2024-10-31' },
    location:    'SSAFYnity GitHub · Discord',
    format:      ['online'],
    kind:        'special',
    audience:    'members',
    summary:     '취업 준비 중인 동문 회원이 함께하는 온라인 자기계발 챌린지',
    img:         '/events/Job-Preparation-Challenge-3rd.jpg',
    capacity:    'unlimited',
    registrants: { members: 38, regular: 2, operator: 1 },
    completions: { members: 24, regular: 2 },
    notices: {
      fee: {
        regular: '무료',
        members: '무료',
      },
      refund: ['해당사항 없음'],
      custom: [
        {
          title: '챌린지 구성',
          body:  '기상인증 · 알고리즘 · 모각코 파트로 진행됩니다.\n원하는 파트를 1개 이상 자유롭게 선택해 참여할 수 있습니다.',
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
          body:  '신청자 상위 10%를 우수 수료자로 선정합니다.\n· 파트별 인증 성공 횟수\n· 참여한 챌린지 수\n· 파트 우선순위: 알고리즘 > 기상인증 > 모각코',
        },
      ],
    },
  },
  {
    slug:      '2024-seminar',
    title:     '제 2회 세미나',
    eventDate:   { start: '2024-11-30', startTime: '14:00', endTime: '18:00' },
    recruitDate: { start: '2024-11-13', end: '2024-11-29' },
    location:    '멀티캠퍼스 역삼 18층',
    locationUrl: { naver: 'https://naver.me/x5GzwAww', kakao: 'https://place.map.kakao.com/21414107', google: 'https://maps.app.goo.gl/7cw8g2vDrjxw1AQU9' },
    format:      ['offline'],
    kind:        'regular',
    audience:    'open',
    summary:     '현직 시니어 전문가를 초청한 커리어·기술 세미나',
    notices: {
      fee: {
        regular:  '무료',
        members:  10000,
        external: 20000,
        note:     '참가비는 대관비 및 연사 초청비로 사용됩니다.\n접수 내역 확인 및 참가비 입금까지 완료되어야 최종 신청이 완료됩니다',
      },
      refund: [
        '행사 3일 이내 취소 시 환불 불가',
        '환불 가능 기간 내 요청 시 500원 수수료를 제외한 전액 환불',
        '환불 대상자는 행사 종료 후 일괄 처리됩니다',
      ],
      custom: [
        {
          title: '1부 / 2부 운영 안내',
          body:  '인원 제한으로 1부·2부로 나뉘며 발표 내용은 동일합니다.\n희망 부를 선택할 수 있으나 상황에 따라 배정이 변경될 수 있습니다.',
        },
        {
          title: '사전 질문 접수',
          body:  '행사 신청 시 연사님께 미리 질문을 제출할 수 있습니다.',
        },
        {
          title: '회식 안내',
          body:  '행사 종료 후 희망자를 대상으로 팀을 매칭해드립니다.\n회식은 팀별로 자체적으로 진행 및 정산해주시면 됩니다.',
        },
        {
          title: '취소/변경 안내',
          body:  '팀 배정이 있는 행사 특성상,\n취소 및 변경은 행사 3일 전까지 사전에 알려주시면 감사하겠습니다.',
        },
        {
          title: '주차 안내',
          body:  '별도 주차장이 제공되지 않습니다. 가급적 대중교통을 이용해주세요.',
        },
      ],
    },
    img:       '/events/2024-seminar.jpg',
    capacity:    100,
    registrants: { members: 65, regular: 22, external: 36, operator: 8, partner: 2, invited: 4 },
    attendees:   { members: 51, regular: 20, external: 30, operator: 8, partner: 2, invited: 4 },
  },
]
