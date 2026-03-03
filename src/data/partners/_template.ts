// 협력사 파일 템플릿
// 파일명: {slug}.ts (영문 소문자+하이픈, 예: some-company.ts)
// 생성 후 computed.ts에 import + allPartners에 추가

import type { PartnerType, Status } from '@/data/constants'

export const partner: {
  slug:   string
  name:   string
  types:  PartnerType[]
  status: Status
  desc:   string
  logo:   string
  url:    string
} = {
  slug:   '[업데이트 필요]',
  name:   '[업데이트 필요]',
  types:  ['financial'],   // 'founding' | 'financial' | 'goods' | 'promotion' | 'talent' | 'operations'
  status: 'active',        // 'active' | 'inactive'
  desc:   '[업데이트 필요]',
  // keywords: ['별칭1', '별칭2'],  // 선택: name/desc로 검색 안 되는 별칭
logo:   '',              // 예: /partners/some-company.png
  url:    '[업데이트 필요]',
}
