// 2022년 행사 목록

import type { Event } from '@/data/constants'

export const events2022: Event[] = [
  {
    slug:        '2022-founding-ceremony',
    title:       'SSAFYnity 발대식',
    eventDate:   { start: '2022-06-09', startTime: '19:00', endTime: '21:00'  },
    recruitDate: { start: '2022-05-16', end: '2022-06-01' },
    location:    '멀티캠퍼스 역삼 18층',
    locationUrl: { naver: 'https://naver.me/x5GzwAww', kakao: 'https://place.map.kakao.com/21414107', google: 'https://maps.app.goo.gl/7cw8g2vDrjxw1AQU9' },
    kind:        'special',
    audience:    'members',
    format:      ['online', 'offline'],
    summary:     '싸피니티 공식 출범을 알리는 첫 번째 행사',
    notices: {
      fee: {
        members: '무료',
      },
      refund: [
        '해당사항 없음',
      ],
      checklist: [
        '입장 시 이름·기수·캠퍼스 등 접수 정보를 확인합니다.',
        '도착 후 18층 프론트 데스크로 먼저 방문해주세요.',
        '행사 후 희망자에 한해 네트워킹 시간이 진행됩니다.',
      ],
      custom: [
        {
          title: '주차 안내',
          body:  '별도 주차장이 제공되지 않습니다. 가급적 대중교통을 이용해주세요.',
        },
      ],
    },
    note:        '2022년은 정회원 개념이 없었음',
    img:         '/events/2022-founding-ceremony.jpg',
  },
  {
    slug:      '2022-operator-mt',
    title:     '1대 집행부 MT',
    eventDate: { start: '2022-07-30', startTime: '17:00', end: '2022-07-31', endTime: '11:00' },
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
    note:      '동문회비 미사용, 운영진 자부담으로 진행 / 2022년은 정회원 개념이 없었음',
    img:       '/events/2022-operator-mt.jpg',
    internal:  true,
  },
  {
    slug:        '2022-open-talk',
    title:       '여름 세미나 - 오픈토크',
    eventDate:   { start: '2022-08-27', startTime: '15:00', endTime: '17:00' },
    recruitDate: { start: '2022-08-09', end: '2022-08-15' },
    location:    '멀티캠퍼스 역삼 18층',
    locationUrl: { naver: 'https://naver.me/x5GzwAww', kakao: 'https://place.map.kakao.com/21414107', google: 'https://maps.app.goo.gl/7cw8g2vDrjxw1AQU9' },
    kind:        'special',
    audience:    'members',
    format:      ['offline', 'online'],
    summary:     '현직 IT CTO가 말하는 IT 트렌드 이야기',
    notices: {
      fee: {
        members: '무료',
      },
      refund: [
        '해당사항 없음',
      ],
      checklist: [
        '입장 전 1층 접수 데스크에서 명찰을 수령해주세요.',
        '코로나19 방역 지침에 따라 마스크를 반드시 착용해주세요.',
      ],
      custom: [
        {
          title: '행사 후 프로그램',
          body:  '추첨을 통해 연사님과의 Q&A 시간이 진행됩니다.\n참석자 간 네트워킹도 별도로 진행됩니다.',
        },
        {
          title: '주차 안내',
          body:  '별도 주차장이 제공되지 않습니다. 가급적 대중교통을 이용해주세요.',
        },
      ],
    },
    note:        '2022년은 정회원 개념이 없었음',
    img:         '/events/2022-open-talk.jpg',
  },
  {
    slug:        '2022-sports-day',
    title:       '제1회 SSAFYnity 가을 운동회',
    eventDate:   { start: '2022-10-22', startTime: '14:00', endTime: '18:00' },
    recruitDate: { start: '2022-10-06', end: '2022-10-19' },
    location:    '뚝섬한강공원 축구장2',
    locationUrl: { naver: 'https://naver.me/5T4WaXr3', kakao: 'https://place.map.kakao.com/25888468'},
    format:      ['offline'],
    kind:        'regular',
    audience:    'members',
    summary:     '동문들과 함께하는 가을 체육 행사',
    notices: {
      fee: {
        members: '무료',
      },
      refund: [
        '해당사항 없음',
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
    note:        '2022년은 정회원 개념이 없었음',
    img:         '/events/2022-sports-day.png',
  },
]
