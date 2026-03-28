// src/data/faqs.ts
// /community/faq 페이지 FAQ 데이터
// 질문/답변 추가·수정·삭제 시 이 파일만 편집하세요.

import { ROUTES } from '@/lib/routes'

export type FaqCategoryKey =
  | 'about'
  | 'membership'
  | 'events'
  | 'clubs'
  | 'channels'
  | 'partnership'
  | 'policy'
  | 'site'
  | 'operator'
  | 'etc'

type RouteKey = keyof typeof ROUTES

export type FaqCta =
  | {
      kind: 'internal'
      to: RouteKey
      label: string
      variant?: 'primary' | 'secondary'
    }
  | {
      kind: 'mailtoMain'
      label: string
      variant?: 'primary' | 'secondary'
      subject?: string
      body?: readonly string[]
    }

export type FaqAnswer = {
  paragraphs: readonly string[]
  ctas?: readonly FaqCta[]
}

export type FaqItemData = {
  q: string
  a: FaqAnswer
  keywords?: readonly string[]
}

export type FaqSectionData = {
  key: FaqCategoryKey
  title: string
  items: readonly FaqItemData[]
}

export const FAQ_SECTIONS: readonly FaqSectionData[] = [
  {
    key: 'about',
    title: '동문회',
    items: [
      {
        q: 'SSAFYnity는 어떤 단체인가요?',
        a: {
          paragraphs: [
            'SSAFYnity는 SSAFY 수료생들이 직접 운영하는 동문 커뮤니티입니다. 수료 이후에도 기수와 지역을 넘어 연결되고, 행사·동아리·커뮤니티 활동을 이어가기 위해 운영됩니다.',
          ],
          ctas: [{ kind: 'internal', to: 'aboutStory', label: '동문회 소개', variant: 'primary' }],
        },
        keywords: ['동문회', '소개', 'SSAFYnity', '운영 방향'],
      },
      {
        q: '동문회 가치관은 어디서 확인하나요?',
        a: {
          paragraphs: ['동문회의 가치관과 지향점은 아래 페이지에서 확인할 수 있습니다.'],
          ctas: [{ kind: 'internal', to: 'aboutValues', label: '가치관', variant: 'primary' }],
        },
        keywords: ['가치관', '미션', '비전'],
      },
      {
        q: '동문회에서는 어떤 활동을 하나요?',
        a: {
          paragraphs: [
            '주요 활동은 행사, 동아리, 온라인 커뮤니티 참여로 나뉩니다. 처음이라면 행사 안내와 공식 채널을 함께 보면 전체 흐름을 빠르게 이해할 수 있습니다.',
          ],
          ctas: [
            { kind: 'internal', to: 'eventsIntroduce', label: '행사 안내', variant: 'secondary' },
            { kind: 'internal', to: 'clubsIntro', label: '동아리 안내', variant: 'secondary' },
            { kind: 'internal', to: 'communitySns', label: '공식 채널', variant: 'primary' },
          ],
        },
        keywords: ['활동', '행사', '동아리', '커뮤니티'],
      },
    ],
  },
  {
    key: 'membership',
    title: '가입/정회원',
    items: [
      {
        q: '동문회에는 누가 가입할 수 있나요?',
        a: {
          paragraphs: [
            'SSAFY 수료생과 취업 조기 퇴소자는 가입할 수 있습니다. 가입 대상과 절차는 아래 페이지에서 확인할 수 있습니다.',
          ],
          ctas: [{ kind: 'internal', to: 'joinMembership', label: '동문회 가입 안내', variant: 'primary' }],
        },
        keywords: ['가입', '대상', '조건', '절차'],
      },
      {
        q: '가입할 수 없는 경우도 있나요?',
        a: {
          paragraphs: ['네. 취업 외 퇴소 또는 강제 퇴소의 경우에는 가입이 불가합니다. 애매한 사례라면 공식 메일로 문의해 주세요.'],
          ctas: [
            { kind: 'internal', to: 'joinMembership', label: '가입 안내', variant: 'secondary' },
            {
              kind: 'mailtoMain',
              label: '공식 메일',
              variant: 'primary',
              subject: '[SSAFYnity 가입 가능 여부 문의]',
              body: ['이름/기수: ', '상황 설명: '],
            },
          ],
        },
        keywords: ['가입 불가', '퇴소', '강제 퇴소', '조건'],
      },
      {
        q: '가입 신청 후 승인까지 얼마나 걸리나요?',
        a: {
          paragraphs: ['가입 처리는 늦어도 1주일 이내에 완료됩니다. 행사 참여를 계획하고 있다면 미리 가입해 두는 것을 권장합니다.'],
          ctas: [{ kind: 'internal', to: 'joinMembership', label: '가입 안내', variant: 'primary' }],
        },
        keywords: ['승인', '처리 기간', '가입 완료', '1주일'],
      },
      {
        q: '가입하면 바로 정회원이 되나요?',
        a: {
          paragraphs: ['아니요. 가입이 승인되면 먼저 일반회원으로 등록됩니다. 정회원은 일반회원이 된 뒤 별도로 신청해야 합니다.'],
          ctas: [
            { kind: 'internal', to: 'joinMembership', label: '가입 안내', variant: 'secondary' },
            { kind: 'internal', to: 'joinPremium', label: '정회원 안내', variant: 'primary' },
          ],
        },
        keywords: ['일반회원', '정회원', '가입 후', '회원 유형'],
      },
      {
        q: '정회원은 무엇이고, 어떻게 신청하나요?',
        a: {
          paragraphs: [
            '정회원은 연회비 30,000원을 납부한 공식 멤버십입니다. 동문회 가입이 승인된 일반회원이라면 언제든 상시 신청할 수 있습니다.',
          ],
          ctas: [
            { kind: 'internal', to: 'joinPremium', label: '정회원 안내', variant: 'secondary' },
            { kind: 'internal', to: 'joinMembership', label: '동문회 가입 안내', variant: 'primary' },
          ],
        },
        keywords: ['정회원', '연회비', '30,000원', '상시 신청', '혜택'],
      },
    ],
  },
  {
    key: 'events',
    title: '행사',
    items: [
      {
        q: '행사 일정은 어디서 확인하나요?',
        a: {
          paragraphs: ['예정된 행사는 ‘올해 행사 일정’ 페이지에서 확인할 수 있습니다.'],
          ctas: [{ kind: 'internal', to: 'eventsUpcoming', label: '올해 행사 일정', variant: 'primary' }],
        },
        keywords: ['일정', '행사', '캘린더'],
      },
      {
        q: '행사 참여 신청은 어디서 하나요?',
        a: {
          paragraphs: [
            '행사 신청 링크는 행사 안내 페이지와 공식 채널 공지를 통해 안내됩니다. 진행 중인 모집/신청 안내를 확인해 주세요.',
          ],
          ctas: [
            { kind: 'internal', to: 'eventsIntroduce', label: '행사 안내', variant: 'secondary' },
            { kind: 'internal', to: 'communitySns', label: '공식 채널', variant: 'primary' },
          ],
        },
        keywords: ['신청', '참여', '모집', '등록'],
      },
      {
        q: '행사 공지는 모든 채널에 똑같이 올라오나요?',
        a: {
          paragraphs: ['네. 행사 및 주요 공지사항은 공식 채널에 동일하게 업로드됩니다. 본인에게 편한 채널을 이용해 주세요.'],
        },
        keywords: ['공지', '채널', 'SNS'],
      },
      {
        q: '행사 관련 문의는 어디로 하면 되나요?',
        a: {
          paragraphs: ['행사 관련 문의는 공식 채널 또는 공식 메일로 보내 주세요.'],
          ctas: [
            { kind: 'internal', to: 'communitySns', label: '공식 채널', variant: 'secondary' },
            {
              kind: 'mailtoMain',
              label: '공식 메일',
              variant: 'primary',
              subject: '[SSAFYnity 행사 문의]',
              body: ['행사명(또는 링크): ', '문의 내용: '],
            },
          ],
        },
        keywords: ['문의', '행사', '안내'],
      },
    ],
  },
  {
    key: 'clubs',
    title: '동아리',
    items: [
      {
        q: '동아리는 어떻게 신청하나요?',
        a: {
          paragraphs: ['동아리 신청은 아래 페이지에서 진행할 수 있습니다. 운영 방식은 ‘동아리 안내’에서 먼저 확인해 주세요.'],
          ctas: [
            { kind: 'internal', to: 'clubsIntro', label: '동아리 안내', variant: 'secondary' },
            { kind: 'internal', to: 'clubsApply', label: '동아리 신청', variant: 'primary' },
          ],
        },
        keywords: ['동아리', '신청', '모집'],
      },
      {
        q: '정식 동아리와 예비 동아리는 무엇이 다른가요?',
        a: {
          paragraphs: ['운영 기준과 현재 등록된 동아리는 ‘동아리’ 메뉴에서 확인할 수 있습니다.'],
          ctas: [{ kind: 'internal', to: 'clubs', label: '정식 동아리', variant: 'secondary' }],
        },
        keywords: ['정식', '예비', '동아리'],
      },
      {
        q: '동아리 모집/공지 소식은 어디서 확인하나요?',
        a: {
          paragraphs: ['동아리 관련 공지와 소식은 공식 채널을 통해 안내됩니다.'],
          ctas: [{ kind: 'internal', to: 'communitySns', label: '공식 채널', variant: 'primary' }],
        },
        keywords: ['모집', '공지', '동아리', '채널'],
      },
      {
        q: '동아리 운영 관련 문의는 어디로 하면 되나요?',
        a: {
          paragraphs: ['동아리 관련 문의는 공식 메일로 보내 주세요.'],
          ctas: [
            {
              kind: 'mailtoMain',
              label: '공식 메일',
              variant: 'primary',
              subject: '[SSAFYnity 동아리 문의]',
              body: ['동아리명(또는 링크): ', '문의 내용: '],
            },
          ],
        },
        keywords: ['문의', '동아리', '운영'],
      },
    ],
  },
  {
    key: 'channels',
    title: '커뮤니티 채널',
    items: [
      {
        q: '공식 채널(SNS/메일)은 어디서 확인하나요?',
        a: {
          paragraphs: ['공식 채널 링크와 용도는 ‘공식 채널’ 페이지에서 확인할 수 있습니다.'],
          ctas: [{ kind: 'internal', to: 'communitySns', label: '공식 채널 보기', variant: 'primary' }],
        },
        keywords: ['공식 채널', 'SNS', '메일'],
      },
      {
        q: '카카오톡 채널은 어떤 용도로 쓰이나요?',
        a: {
          paragraphs: ['카카오톡 채널은 행사 및 가입 등 안내를 가장 빠르게 확인할 수 있는 공지 채널입니다.'],
          ctas: [{ kind: 'internal', to: 'communitySns', label: '공식 채널 보기', variant: 'primary' }],
        },
        keywords: ['카카오톡', '공지', '알림'],
      },
      {
        q: '디스코드나 오픈카톡 참여 조건은 어디서 확인하나요?',
        a: {
          paragraphs: ['디스코드/오픈카톡의 참여 조건과 이용 방식은 공식 채널 페이지에서 안내합니다.'],
          ctas: [{ kind: 'internal', to: 'communitySns', label: '공식 채널 보기', variant: 'primary' }],
        },
        keywords: ['디스코드', '오픈카톡', '참여', '조건'],
      },
      {
        q: '공지/행사 소식을 놓치지 않으려면 어떤 채널이 좋나요?',
        a: {
          paragraphs: [
            '모든 행사 및 공지사항은 각 공식 채널에 동일하게 업로드됩니다. 자주 확인하는 채널을 선택해 주세요.',
          ],
          ctas: [{ kind: 'internal', to: 'communitySns', label: '공식 채널', variant: 'primary' }],
        },
        keywords: ['공지', '행사', '알림', '채널'],
      },
    ],
  },
  {
    key: 'partnership',
    title: '후원/제휴',
    items: [
      {
        q: '후원·협력사 정보는 어디서 확인하나요?',
        a: {
          paragraphs: ['후원·협력사 정보는 아래 페이지에서 확인할 수 있습니다.'],
          ctas: [{ kind: 'internal', to: 'aboutPartners', label: '후원·협력사', variant: 'primary' }],
        },
        keywords: ['후원', '협력사', '파트너'],
      },
      {
        q: '후원/제휴 문의는 어디로 하나요?',
        a: {
          paragraphs: ['후원/제휴 관련 문의는 아래 페이지에서 안내하는 절차에 따라 진행해 주세요.'],
          ctas: [{ kind: 'internal', to: 'joinPartnership', label: '후원·제휴 문의', variant: 'primary' }],
        },
        keywords: ['후원', '제휴', '대외협력'],
      },
      {
        q: '후원/제휴 제안을 보낼 때 어떤 내용을 포함하면 좋나요?',
        a: {
          paragraphs: [
            '단체/담당자 정보, 제안 목적, 희망 협력 형태, 일정(기간), 예산 범위, 회신 가능한 연락처를 함께 보내주시면 확인에 도움이 됩니다.',
          ],
          ctas: [{ kind: 'internal', to: 'joinPartnership', label: '후원·제휴 문의', variant: 'primary' }],
        },
        keywords: ['제안', '협력', '후원', '제휴', '문의'],
      },
      {
        q: '후원/제휴 외의 협업 문의도 가능한가요?',
        a: {
          paragraphs: ['가능합니다. 다만 문의 유형이 애매하다면 공식 메일로 보내 주세요.'],
          ctas: [
            { kind: 'internal', to: 'joinPartnership', label: '후원·제휴 문의', variant: 'secondary' },
            {
              kind: 'mailtoMain',
              label: '공식 메일',
              variant: 'primary',
              subject: '[SSAFYnity 협업 문의]',
              body: ['단체/담당자: ', '제안 내용: ', '연락처: '],
            },
          ],
        },
        keywords: ['협업', '제휴', '문의', '대외협력'],
      },
    ],
  },
  {
    key: 'policy',
    title: '운영/규정',
    items: [
      {
        q: '커뮤니티에서 문제가 생기면 어떻게 신고하나요?',
        a: {
          paragraphs: [
            '커뮤니티 내 금전 요구, 욕설·비방, 음란물 등 부적절한 행위가 있다면 신고해 주세요. 확인되면 사전 통보 없이 강제 탈퇴 처리될 수 있습니다.',
          ],
          ctas: [{ kind: 'internal', to: 'communitySns', label: '공식 채널 보기', variant: 'primary' }],
        },
        keywords: ['신고', '규정', '제재', '강제 탈퇴'],
      },
      {
        q: '사칭/피싱 또는 금전 요구를 받았어요. 어떻게 하나요?',
        a: {
          paragraphs: ['공식 채널은 이 페이지에 안내된 링크만 사용해 주세요. 금전 관련 안내는 반드시 공식 문의 채널로 재확인해 주세요.'],
        },
        keywords: ['사칭', '피싱', '금전', '후원', '참가비'],
      },
      {
        q: '커뮤니티 이용 중 불쾌한 경험이 있었어요. 어떻게 해야 하나요?',
        a: {
          paragraphs: ['상황을 확인할 수 있도록 증빙(스크린샷/링크)과 함께 공식 채널로 신고해 주세요.'],
          ctas: [{ kind: 'internal', to: 'communitySns', label: '공식 채널', variant: 'primary' }],
        },
        keywords: ['신고', '비방', '욕설', '괴롭힘'],
      },
      {
        q: '운영진 공지를 사칭하는 메시지를 받았어요',
        a: {
          paragraphs: ['사칭이 의심된다면 링크를 열기 전에 공식 채널/공식 메일로 사실 여부를 확인해 주세요.'],
          ctas: [
            { kind: 'internal', to: 'communitySns', label: '공식 채널', variant: 'secondary' },
            { kind: 'mailtoMain', label: '공식 메일', variant: 'primary', subject: '[SSAFYnity 사칭 의심 제보]', body: ['내용: '] },
          ],
        },
        keywords: ['사칭', '보안', '피싱', '공지'],
      },
    ],
  },
  {
    key: 'site',
    title: '사이트 이용',
    items: [
      {
        q: '홈페이지 오류나 링크 문제는 어디로 제보하나요?',
        a: {
          paragraphs: [
            '공식 메일로 제보해 주세요. 문제가 발생한 페이지 주소와 상황(기기/브라우저)을 함께 보내주시면 확인에 도움이 됩니다.',
          ],
          ctas: [{ kind: 'mailtoMain', label: '공식 메일', variant: 'primary', subject: '[SSAFYnity 홈페이지 오류 제보]', body: ['페이지 주소: ', '상황(기기/브라우저): ', '내용: '] }],
        },
        keywords: ['오류', '버그', '링크', '접속'],
      },
      {
        q: '홈페이지에 기재된 정보 수정은 어떻게 요청하나요?',
        a: {
          paragraphs: ['수정이 필요한 항목과 근거(링크/스크린샷)를 함께 공식 메일로 보내 주세요.'],
          ctas: [{ kind: 'mailtoMain', label: '공식 메일', variant: 'secondary', subject: '[SSAFYnity 정보 수정 요청]', body: ['수정 요청 항목: ', '근거(링크/스크린샷): ', '내용: '] }],
        },
        keywords: ['수정', '정보', '업데이트'],
      },
      {
        q: '홈페이지 오류/오타/개선 제안은 어디로 알려야 하나요?',
        a: {
          paragraphs: ['공식 메일로 제보해 주시면 확인 후 반영 여부를 안내해 드립니다.'],
          ctas: [{ kind: 'mailtoMain', label: '공식 메일', variant: 'primary', subject: '[SSAFYnity 개선 제안]', body: ['페이지 주소: ', '제안 내용: '] }],
        },
        keywords: ['오류', '오타', '버그', '개선', '제안'],
      },
      {
        q: '모바일에서 화면이 깨지거나 동작이 이상해요',
        a: {
          paragraphs: ['기기/브라우저 정보를 함께 적어 공식 메일로 제보해 주세요.'],
          ctas: [{ kind: 'mailtoMain', label: '공식 메일', variant: 'primary', subject: '[SSAFYnity 모바일 이슈 제보]', body: ['기기: ', '브라우저: ', '페이지 주소: ', '내용: '] }],
        },
        keywords: ['모바일', '반응형', '레이아웃', '버그'],
      },
    ],
  },
  {
    key: 'operator',
    title: '운영진',
    items: [
      {
        q: '운영진은 어떤 일을 하나요?',
        a: {
          paragraphs: [
            '운영진은 동문회 운영과 행사 준비, 커뮤니티 관리 등을 담당합니다. 팀 구성과 역할은 아래 페이지에서 확인할 수 있습니다.',
          ],
          ctas: [{ kind: 'internal', to: 'operatorOrganization', label: '조직 안내', variant: 'primary' }],
        },
        keywords: ['운영진', '조직', '역할'],
      },
      {
        q: '운영진에 지원하려면 어떻게 하나요?',
        a: {
          paragraphs: ['운영진 모집이 열렸을 때 아래 페이지에서 지원할 수 있습니다.'],
          ctas: [{ kind: 'internal', to: 'operatorApply', label: '운영진 모집', variant: 'primary' }],
        },
        keywords: ['운영진', '지원', '모집'],
      },
      {
        q: '현재/역대 운영진은 어디서 확인하나요?',
        a: {
          paragraphs: ['현재 운영진과 역대 운영진 정보는 아래 페이지에서 확인할 수 있습니다.'],
          ctas: [
            { kind: 'internal', to: 'operatorIntroduce', label: '운영진 소개', variant: 'secondary' },
            { kind: 'internal', to: 'operatorHistory', label: '역대 운영진', variant: 'secondary' },
          ],
        },
        keywords: ['운영진 소개', '역대 운영진'],
      },
      {
        q: '운영진에게 직접 문의하고 싶어요',
        a: {
          paragraphs: ['공식 메일로 문의해 주시면 확인 후 적절한 담당으로 연결해 드립니다.'],
          ctas: [{ kind: 'mailtoMain', label: '공식 메일', variant: 'primary', subject: '[SSAFYnity 운영진 문의]', body: ['문의 내용: '] }],
        },
        keywords: ['운영진', '문의', '연락'],
      },
    ],
  },
  {
    key: 'etc',
    title: '기타',
    items: [
      {
        q: '문의 유형이 애매한데 어디로 보내면 되나요?',
        a: {
          paragraphs: ['문의 내용이 애매하다면 공식 메일로 보내 주세요. 확인 후 적절한 담당으로 연결해 드립니다.'],
          ctas: [{ kind: 'mailtoMain', label: '공식 메일', variant: 'primary', subject: '[SSAFYnity 문의]', body: ['문의 내용: '] }],
        },
        keywords: ['문의', '분류', '애매', '공식 메일', '담당'],
      },
      {
        q: '외부 행사 제안/연사 제안은 어디로 문의하나요?',
        a: {
          paragraphs: ['제안 내용이 구체화되어 있다면 후원·제휴 문의 페이지를 통해 먼저 전달해 주세요.'],
          ctas: [{ kind: 'internal', to: 'joinPartnership', label: '후원·제휴 문의', variant: 'primary' }],
        },
        keywords: ['연사', '제안', '협업', '행사'],
      },
      {
        q: '답을 찾지 못했어요. 어떻게 문의하나요?',
        a: {
          paragraphs: ['공식 채널 또는 공식 메일로 문의해 주시면 확인 후 안내해 드립니다.'],
          ctas: [
            { kind: 'internal', to: 'communitySns', label: '공식 채널', variant: 'secondary' },
            { kind: 'mailtoMain', label: '공식 메일', variant: 'primary', subject: '[SSAFYnity 문의]', body: ['문의 내용: '] },
          ],
        },
        keywords: ['문의', '공식 채널', '공식 메일'],
      },
    ],
  },
] as const

export const FAQ_CATEGORY_ORDER: readonly FaqCategoryKey[] = [
  'about',
  'membership',
  'events',
  'clubs',
  'channels',
  'partnership',
  'policy',
  'site',
  'operator',
  'etc',
] as const
