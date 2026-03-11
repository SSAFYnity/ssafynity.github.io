import { motion } from 'framer-motion'
import {
  ExternalLink,
  CalendarDays, Users, Star,
  Crown, MessageCircle, Package, Bell, CalendarCheck,
  ChevronRight,
} from 'lucide-react'

import { siteData } from '@/data/siteData'
import { Container } from '@/components/Container'
import { HeroLabel } from '@/components/HeroLabel'
import { Kicker } from '@/components/Kicker'
import { Card } from '@/components/Card'

// ─── 데이터 ─────────────────────────────────────────────────────────
const WHY_ITEMS = [
  {
    icon: CalendarDays,
    title: ['행사를 빠지지 않고', '참여하는 분'],
    desc: '정기행사를 즐겨 찾는다면, 무료 입장 혜택 하나만으로도 연회비 이상의 가치를 가져갈 수 있어요.',
  },
  {
    icon: Users,
    title: ['동문 인연을', '소중히 여기는 분'],
    desc: '같은 SSAFY 출신과 더 깊이 교류하고 싶다면, 정회원 전용 소통망이 그 연결고리가 됩니다.',
  },
  {
    icon: Star,
    title: ['동문회를 함께', '만들어가고 싶은 분'],
    desc: 'SSAFYnity가 더 좋아지길 바라고, 그 과정에 직접 기여하고 싶다면 정회원으로 함께해 주세요.',
  },
]

const BENEFIT_ITEMS = [
  { icon: Crown,         title: '정기행사 최우선 접수',  desc: ['모든 정기행사를',               '일반회원보다 먼저 접수할 수 있습니다.'] },
  { icon: Star,          title: '정기행사 무료 입장',    desc: ['연 2회 정기행사를',             '무료로 참여할 수 있습니다.'] },
  { icon: MessageCircle, title: '정회원 전용 소통망',    desc: ['정회원 전용 채널에서',           '더 가까이 소통하고 교류합니다.'] },
  { icon: Package,       title: '전용 굿즈 연 1회',      desc: ['정회원 전용 특별 굿즈를',       '연 1회 받을 수 있습니다.'] },
  { icon: Bell,          title: '모든 공지 최우선 수신', desc: ['동문회 소식과 공지를',           '일반회원보다 먼저 받아볼 수 있습니다.'] },
  { icon: CalendarCheck, title: '행사 일정 선택권',      desc: ['일부 행사의 날짜 등 세부 사항에', '대한 선택 옵션이 제공됩니다.'] },
]

const APPLY_STEPS = ['동문회 가입', '정회원 신청', '회비 납부', '가입 완료']

// ─── 공통 애니메이션 ──────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 16 },
  whileInView:{ opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.6, delay },
})

// ─── 페이지 ─────────────────────────────────────────────────────
export default function JoinPremiumPage() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-white pt-24 pb-14 lg:pt-28 lg:pb-20 border-b border-slate-100">
        <Container maxWidth="3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroLabel>동문회 정회원</HeroLabel>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-2">
              정회원 안내
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">SSAFYnity Premium Membership</p>
            <p className="text-sm text-slate-500 leading-relaxed break-keep max-w-xl">
              정회원은 연회비를 납부한 공식 정회원으로, SSAFYnity의 운영과 행사 진행에 큰 힘이 됩니다.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <Container maxWidth="3xl" className="flex flex-col gap-16">

          {/* ① 정회원이 있는 이유 */}
          <motion.div {...fadeUp(0)}>
            <Kicker className="text-blue-600 mb-2">이런 분께 권해요</Kicker>
            <p className="text-sm text-slate-500 leading-relaxed break-keep mb-6">
              아래 중 하나라도 해당된다면, 정회원이 딱 맞습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {WHY_ITEMS.map(({ icon: Icon, title, desc }, i) => (
                <Card key={i} className="p-5 lg:p-6 flex flex-row sm:flex-col items-start gap-4 sm:gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex flex-col gap-2 sm:gap-0">
                    <p className="text-sm font-extrabold text-slate-900 leading-snug">
                      <span className="text-slate-400 font-semibold">{title[0]}</span>
                      <br />
                      {title[1]}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed break-keep sm:mt-2">{desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* ② 일반회원 vs 정회원 비교 */}
          <motion.div {...fadeUp(0.05)}>
            <Kicker className="text-blue-600 mb-4">일반회원 vs 정회원</Kicker>
            <Card className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="px-3 py-3 sm:px-6 sm:py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-1/3">항목</th>
                      <th className="px-3 py-3 sm:px-6 sm:py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-1/3">
                        {siteData.membership.regular.title}
                      </th>
                      <th className="px-3 py-3 sm:px-6 sm:py-4 text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50/40 w-1/3">
                        {siteData.membership.premium.title}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-xs font-black text-slate-700">회비</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm text-slate-500">{siteData.membership.regular.fee}</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm font-bold text-slate-700 bg-blue-50/20">{siteData.membership.premium.fee}</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-xs font-black text-slate-700">가입 조건</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm text-slate-500">{siteData.membership.regular.desc}</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm text-slate-500 bg-blue-50/20">동문회 가입 승인된 일반회원</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-xs font-black text-slate-700">행사 접수</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm text-slate-500">일반 선착순</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm font-bold text-blue-600 bg-blue-50/20">최우선 접수</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-xs font-black text-slate-700">정기행사 참가비</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm text-slate-500">유료</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm font-bold text-blue-600 bg-blue-50/20">무료</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-xs font-black text-slate-700">공지 수신</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm text-slate-500">기본 안내</td>
                      <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm font-bold text-blue-600 bg-blue-50/20">최우선 수신</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* ③ 정회원 혜택 6개 */}
          <motion.div {...fadeUp(0.1)}>
            <Kicker className="text-blue-600 mb-4">정회원 혜택</Kicker>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BENEFIT_ITEMS.map(({ icon: Icon, title, desc }, i) => (
                <Card key={i} className="p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="w-[18px] h-[18px] text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900 mb-1">{title}</p>
                    <p className="text-xs text-slate-500 leading-snug break-keep">
                      {desc[0]}<br />{desc[1]}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* ④ 상시 신청 */}
          <motion.div {...fadeUp(0.15)}>
            <Kicker className="text-blue-600 mb-4">상시 신청</Kicker>
            <Card className="p-6 lg:p-8 flex flex-col gap-6">

              <p className="text-sm text-slate-600 leading-relaxed break-keep">
                정회원은 <strong className="text-slate-800">동문회 가입 승인 이후</strong> 언제든지 신청할 수 있습니다.
                별도의 모집 기간 없이 상시로 운영됩니다.
              </p>

              {/* 신청 단계 */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5">
                {APPLY_STEPS.map((step, i) => (
                  <div key={i} className="flex items-center gap-1.5 flex-1">
                    <div className="flex flex-col items-center gap-0.5 flex-1 text-center px-3 py-3 rounded-xl bg-slate-50">
                      <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">STEP {i + 1}</span>
                      <span className="text-xs font-extrabold text-slate-700">{step}</span>
                    </div>
                    {i < APPLY_STEPS.length - 1 && (
                      <ChevronRight className="hidden sm:block w-4 h-4 text-slate-300 shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {/* 연회비 하이라이트 */}
              <div className="flex items-center justify-between px-5 py-4 rounded-2xl bg-blue-50">
                <p className="text-sm font-extrabold text-slate-800">연회비</p>
                <p className="text-sm font-black text-blue-600">{siteData.membership.premium.fee}</p>
              </div>

              <p className="text-xs text-slate-400 text-center">
                하단 버튼에서 바로 정회원 신청을 진행할 수 있습니다.
              </p>

            </Card>
          </motion.div>

        </Container>
      </section>

      {/* CTA */}
      <section className="bg-blue-950 py-16">
        <Container maxWidth="3xl" className="flex flex-col items-center text-center gap-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-white leading-snug">정회원으로 SSAFYnity를<br className="sm:hidden" /> 함께 만들어주세요.</h2>
          <a
            href={siteData.forms.regular}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-blue-950 text-base font-black tracking-wide hover:bg-blue-100 transition-colors shadow-lg shadow-blue-950/30"
          >
            정회원 신청하기
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-xs text-blue-300">새 탭에서 신청 폼이 열립니다</p>
        </Container>
      </section>

    </div>
  )
}
