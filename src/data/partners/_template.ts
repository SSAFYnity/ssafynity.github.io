// 협력사 파일 템플릿
// 파일명: {slug}.ts (영문 소문자+하이픈, 예: some-company.ts)
// 생성 후 computed.ts에 import + allPartners에 추가

import type { PartnerType, PartnerCategory, Status } from '@/data/constants'

export const partner: {
  slug:      string
  name:      string
  category:  PartnerCategory
  types:     PartnerType[]
  status:    Status
  period?:   { start: string; end?: string }
  desc:      string
  logo:      string
  url:       string
} = {
  slug:     '[업데이트 필요]',
  name:     '[업데이트 필요]',
  category: 'sponsor',     // 'sponsor'(후원사) | 'alliance'(제휴사) | 'founding'(창립 파트너)
  types:    ['financial'], // 후원사: financial, goods / 제휴사: promotion, talent, operations / 창립: founding
  status:   'active',      // 'active' | 'inactive'
  period:   { start: 'YYYY.MM' },  // founding은 생략. end 없으면 현재 진행 중, 종료 시 end: 'YYYY.MM' 추가
  desc:     '[업데이트 필요]',
  // keywords: ['별칭1', '별칭2'],  // 선택: name/desc로 검색 안 되는 별칭
  logo:     '',            // 예: /partners/some-company.png
  url:      '[업데이트 필요]',
}
