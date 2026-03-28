export const clubDoljabiClimbing = {
  slug: 'doljabi-climbing',
  name: '돌잡이',
  category: 'sports' as const,
  shortDesc: '클라이밍을 함께 즐기고 친목을 다지는 모임',
  desc: '서울 및 수도권에서 활동하는 SSAFYnity 클라이밍 동아리입니다.\n클라이밍을 좋아하는 분은 물론, 처음 시작해보고 싶은 분도 부담 없이 함께할 수 있습니다.\n정기 모임과 자율 모임을 통해 꾸준히 만나며 자연스럽게 친목도 쌓아가고 있습니다.',
  activities: [
    '정기 클라이밍 활동',
    '활동 후 뒷풀이',
    '친목 중심 MT',
  ],
  memberCount: 24,
  keywords: ['클라이밍', '볼더링', '운동', '친목'],
  modes: ['offline'] as const,
  fee: {
    summary: '없음',
    detail: '회비는 없으며, 클라이밍 이용료와 뒷풀이 비용은 참여한 활동 기준으로 개별 부담합니다.',
  },
  schedule: ['월 1회 정기 모임', '상시 자율 모임'],
  region: '서울 및 수도권',
  joinProcess: [
    '오픈카톡으로 회장에게 가입 문의',
    '간단한 자기소개 및 활동 안내 확인',
    '일정에 맞춰 정기 모임 또는 자율 모임 참여',
  ],
  notes: [
    '클라이밍이 처음인 분도 부담 없이 참여할 수 있습니다.',
    '안전 수칙을 우선으로 하며, 활동 전 기본 안내를 확인합니다.',
  ],
  achievements: [
    '2023년 6월부터 운영 중',
    '월 1회 정기 모임과 자율 모임을 병행',
  ],
  links: [
    { label: '스피릿 등록', url: 'https://spiri7.com/crew/d1C7BvBbbtPebiE4quj4CNzV' },
  ],
  contacts: [
    { label: '회장에게 가입 문의하기', url: 'https://open.kakao.com/o/sVxHJguc', icon: 'apply' as const },
  ],
  since: '2023-06',
  images: [] as string[],
}
