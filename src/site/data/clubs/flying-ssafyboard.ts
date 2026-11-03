export const clubFlyingSsafyboard = {
  slug: 'flying-ssafyboard',
  name: '날아라 싸피보드',
  category: 'hobby' as const,
  shortDesc: '보드게임을 함께 알아가며 즐기는 모임',
  desc: '서울 및 수도권에서 함께 모여 보드게임을 즐기는 동아리입니다.\n보드게임을 잘 모르는 분들도 같이 이것저것 해보면서 알아가고 즐기는 모임입니다.',
  activities: ['함께 모여 다양한 보드게임 즐기기'],
  // 대표 1명과 창단 멤버 9명을 합산하며 개인 식별 정보는 저장하지 않습니다.
  memberCount: 10,
  keywords: ['boardgame', '보드게임'],
  modes: ['offline'] as const,
  fee: {
    summary: '없음',
    detail: '회비는 없으며, 활동에 참여할 때만 참여 인원끼리 비용을 나누어 부담합니다.',
  },
  region: '서울 및 수도권',
  joinProcess: ['오픈카톡으로 회장에게 가입 문의 후 가입할 수 있습니다. 상시 모집합니다.'],
  notes: ['보드게임을 잘 모르는 분들도 같이 알아가며 활동할 수 있습니다.'],
  contacts: [
    { label: '오픈카톡으로 가입 문의하기', url: 'https://open.kakao.com/o/gRwLyDUi', icon: 'kakao' as const },
  ],
  since: '2026-10',
  images: [] as string[],
}
