// 2023년 행사 목록

import type { Event } from '@/data/constants'

export const events2023: Event[] = [
  {
    slug:        '2023-night-of-ssafynity',
    title:       '제 1회 싸피인의 밤',
    eventDate:   { start: '2023-01-14', startTime: '17:00', endTime: '20:00' },
    recruitDate: { start: '2022-12-29', end: '2023-01-09' },
    location:    '커피라운지55 본점',
    locationUrl: { naver: 'https://naver.me/x67yRSv3', kakao: 'https://place.map.kakao.com/1033004668', google: 'https://maps.app.goo.gl/bfbCkEM2Sw7FgDgW9' },
    format:      ['offline'],
    kind:        'regular',
    audience:    'members',
    summary:     '새 운영진과 동문들이 함께하는 신년 네트워킹 파티',
    notices: {
      fee: {
        regular:  '무료',
        members:  10000,
        note:     '참가비는 대관비, 주류, 다과 및 행사 진행비로 사용됩니다.\n접수 내역 확인 및 참가비 입금까지 완료되어야 최종 신청이 완료됩니다',
      },
      refund: [
        '행사 3일 전까지 취소 시 전액 환불',
        '환불 대상자는 행사 종료 후 일괄 처리됩니다',
      ],
      custom: [
        {
          title: '제공 사항',
          body:  '테이블 단위 주류, 현장 파티 음식 및 뷔페, 사진 소품 등이 제공됩니다.',
        },
        {
          title: '드레스코드',
          body:  '이번 행사의 메인 컬러는 연분홍입니다.\n드레스 포인트 컬러 또는 아이템으로 활용해주세요.',
        },
        {
          title: '사전 접수 이벤트',
          body:  '행사 신청 시, 아래 이벤트에 함께 접수할 수 있습니다.\n· 장기자랑 희망자 신청\n· 감사 인사 사연 접수',
        },
        {
          title: '음주 안내',
          body:  '주류가 제공되는 행사입니다.\n즐거운 자리가 될 수 있도록 과음에 주의해주시고,\n귀가 시 안전에 유의해주세요.',
        },
      ],
    },
    note:        '정회원 제도 도입 전 행사',
    capacity:    80,
    registrants: { members: 80, operator: 8, partner: 12, invited: 9 },
    attendees:   { members: 83, operator: 8, partner: 12, invited: 9 },
    img:         '/events/2023-night-of-ssafynity.jpeg',
  },
  {
    slug:      '2023-operator-spring-mt',
    title:     '2대 집행부 MT',
    eventDate: { start: '2023-03-25', startTime: '17:00', end: '2023-03-26', endTime: '11:00' },
    format:    ['offline'],
    audience:  'operator',
    summary:   '1박 2일 집행부 워크숍 및 친목 도모',
    notices: {
      custom: [
        {
          title: '비용 안내',
          body:  '이 행사는 동문회비를 사용하지 않습니다.\n참여를 희망하는 집행부원에 한해 개인 자부담으로 진행됩니다.',
        },
      ],
    },
    note:      '동문회비 미사용, 운영진 자부담으로 진행',
    capacity:    51,
    registrants: { operator: 12 },
    attendees:   { operator: 12 },
    img:       '/events/2023-operator-spring-mt.jpeg',
    internal:  true,
  },
  {
    slug:      '2023-ssafynale',
    title:     '제 1회 SSAFYnale',
    eventDate:   { start: '2023-06-10', startTime: '13:00', endTime: '18:00' },
    recruitDate: { start: '2023-04-24', end: '2023-06-07' },
    location:  '멀티캠퍼스 역삼 18층',
    locationUrl: { naver: 'https://naver.me/x5GzwAww', kakao: 'https://place.map.kakao.com/21414107', google: 'https://maps.app.goo.gl/7cw8g2vDrjxw1AQU9' },
    format:    ['offline', 'recorded'],
    kind:      'regular',
    audience:  'members',
    summary:   '동문회원이 직접 발표자로 나서 성장과 고민을 공유하는 IT 컨퍼런스',
    notices: {
      fee: {
        regular: '무료',
        members: '무료',
      },
      refund: [
        '해당사항 없음',
      ],
      custom: [
        {
          title: '이번 행사 슬로건',
          body:  '시작, 개발자로서의 걸음\n개발자로서의 걸음을 미리 돌아보고 오시면 더욱 풍성하게 즐기실 수 있어요.',
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
          body:  '발표자 모두 만 4년차 이하의 주니어 개발자입니다.\n취업준비생부터 만 4년차 이하의 주니어분께 특히 추천드립니다.',
        },
        {
          title: '주차 안내',
          body:  '별도 주차장이 제공되지 않습니다. 가급적 대중교통을 이용해주세요.',
        },
      ],
    },
    img:       '/events/2023-ssafynale.png',
    capacity:    60,
    registrants: { members: 46, regular: 6, operator: 14, partner: 2, invited: 3 },
    attendees:   { members: 30, regular: 5, operator: 14, partner: 2, invited: 3 },
  },
  {
    slug:      '2023-sports-day',
    title:     '제 2회 가을체육대회',
    eventDate:   { start: '2023-09-23', startTime: '13:00', endTime: '17:00' },
    recruitDate: { start: '2023-08-31', end: '2023-09-21' },
    location:    '뚝섬한강공원 축구장1',
    locationUrl: { naver: 'https://naver.me/Fmf7LdIy', kakao: 'https://place.map.kakao.com/11586006' },
    format:      ['offline'],
    kind:        'regular',
    audience:  'members',
    summary:   '동문들과 함께하는 가을 체육 행사',
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
    img:       '/events/2023-sports-day.png',
    capacity:    50,
    registrants: { members: 24, regular: 7, operator: 10, partner: 1 },
    attendees:   { members: 19, regular: 7, operator: 10, partner: 1 },
  },
  {
    slug:      '2023-seminar',
    title:     '제 1회 세미나',
    eventDate:   { start: '2023-11-25', startTime: '14:00', endTime: '18:00' },
    recruitDate: { start: '2023-10-31', end: '2023-11-24' },
    location:    '멀티캠퍼스 역삼 18층',
    locationUrl: { naver: 'https://naver.me/x5GzwAww', kakao: 'https://place.map.kakao.com/21414107', google: 'https://maps.app.goo.gl/7cw8g2vDrjxw1AQU9' },
    format:    ['offline'],
    kind:      'regular',
    audience:  'open',
    summary:   '현직 시니어 전문가를 초청한 커리어·기술 세미나',
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
    img:       '/events/2023-seminar.jpg',
    capacity:    100,
    registrants: { members: 47, regular: 8, external: 37, operator: 7, partner: 2, invited: 4 },
    attendees:   { members: 45, regular: 8, external: 32, operator: 7, partner: 2, invited: 4 },
  },
]
