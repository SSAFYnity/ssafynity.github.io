import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Globe, TrendingUp, Lightbulb,
  Code2, CalendarDays,
  Megaphone, Users, BookOpen, BellRing, BarChart2,
  Gift, Building2, MessageCircle,
  CheckCircle2, ChevronRight,
  Mail, ArrowRight, ArrowLeftRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { siteData } from '@/data/siteData'
import { computed } from '@/data/computed'
import { PARTNER_TYPES, type PartnerType } from '@/data/constants'
import { Container } from '@/components/Container'
import { HeroLabel } from '@/components/HeroLabel'
import { Kicker } from '@/components/Kicker'
import { Card } from '@/components/Card'

// ─── 데이터 ─────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon: Globe,
    en: 'Connection',
    title: '연결',
    desc: 'SSAFY 수료 이후에도 이어지는 네트워크',
    points: ['기수 간 단절 해소', '지역 간 교류', '개발자 네트워크 확장'],
  },
  {
    icon: TrendingUp,
    en: 'Growth',
    title: '성장',
    desc: '함께 성장하는 개발자 커뮤니티',
    points: ['커리어 정보 공유', '기술 교류', '멘토링 & 경험 공유'],
  },
  {
    icon: Lightbulb,
    en: 'Opportunity',
    title: '기회',
    desc: '개발자와 기업이 만나는 접점',
    points: ['채용 / 브랜딩 기회', '협업 및 제휴 기회', 'IT 인재 풀 연결'],
  },
] as const

const IT_ROLES = ['Backend', 'Frontend', 'AI / Data', 'Infra / DevOps']

const EVENT_DIRECTIONS = [
  'SSAFY 수료생 네트워킹 강화',
  '기업과 개발자의 만남 확대',
  '커리어 & 기술 교류의 장',
]

const EFFECTS = [
  {
    icon: Megaphone,
    title: '광범위한 홍보 효과',
    desc: '4,000명 이상의 IT 인재에게 서비스와 브랜드를 직접 알릴 수 있습니다.',
  },
  {
    icon: BarChart2,
    title: '브랜드 인지도 향상',
    desc: '개발자 커뮤니티 내 긍정적인 브랜드 이미지를 쌓을 수 있습니다.',
  },
  {
    icon: Users,
    title: '인재 발굴 기회',
    desc: '검증된 IT 인재 풀과의 접점으로 잠재적인 채용 기회를 열 수 있습니다.',
  },
  {
    icon: BookOpen,
    title: '외부 인사이트 공유',
    desc: '동문들을 대상으로 기술 트렌드와 산업 인사이트를 직접 전달할 수 있습니다.',
  },
  {
    icon: BellRing,
    title: '내부 연락망 전체 홍보',
    desc: '디스코드, 정회원 단톡 등 내부 채널 전체를 통해 공식 홍보가 진행됩니다.',
  },
] as const

// ─── 후원·제휴 개념 정의 ────────────────────────────────────────────
const PARTNERSHIP_TYPES = [
  {
    key: 'sponsor',
    label: '후원',
    icon: ArrowRight,
    direction: '파트너 → SSAFYnity',
    containerStyle: 'bg-blue-50',
    iconColor: 'text-blue-600',
    tagStyle: 'bg-blue-100 text-blue-700',
    desc: '파트너가 SSAFYnity에 일방적으로 자원·역량을 제공하는 방식입니다. 별도의 반대급부 없이 순수하게 지원합니다.',
    points: ['운영 독립성 보장', '간단한 절차 (2단계)', '유연한 지원 범위'],
  },
  {
    key: 'alliance',
    label: '제휴',
    icon: ArrowLeftRight,
    direction: '파트너 ↔ SSAFYnity',
    containerStyle: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    tagStyle: 'bg-emerald-100 text-emerald-700',
    desc: 'SSAFYnity와 파트너가 서로 주고받는 상호 협력 방식입니다. 양측 모두에게 실질적인 가치를 제공합니다.',
    points: ['상호 이익 구조', '공동 활동·행사 협력', '협약서 체결'],
  },
] as const

// ─── 참여 범위 아이콘 매핑 (PARTNER_TYPES 키 기준) ──────────────────
const PARTICIPATION_ICONS: Partial<Record<PartnerType, LucideIcon>> = {
  financial:  TrendingUp,
  goods:      Gift,
  promotion:  Megaphone,
  talent:     Code2,
  operations: Building2,
}

// founding은 창립 파트너 전용이므로 제외
const PARTICIPATION_ENTRIES = (Object.entries(PARTNER_TYPES) as [PartnerType, typeof PARTNER_TYPES[PartnerType]][])
  .filter(([key]) => key !== 'founding')

// ─── 파트너 혜택 ─────────────────────────────────────────────────────
const PARTNER_PERKS = [
  '웹사이트 공식 로고 노출',
  '행사장 배너·현수막 설치',
  '공식 블로그·SNS 소개 게시',
  '내부 연락망 전체 홍보 (디스코드, 정회원 단톡 등)',
] as const

// ─── 신청 절차 ───────────────────────────────────────────────────────
const SPONSOR_STEPS  = ['문의 접수', '회신'] as const
const ALLIANCE_STEPS = ['문의 접수', '협의 진행', '협약 체결', '진행·홍보'] as const

// ─── 공통 애니메이션 ──────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.6, delay },
})

// ─── 페이지 ─────────────────────────────────────────────────────────
export default function JoinPartnershipPage() {
  const [activeTab, setActiveTab] = useState<'후원' | '제휴'>('후원')

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
            <HeroLabel>후원·제휴 문의</HeroLabel>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-2">
              SSAFYnity와 함께해요
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">SSAFYnity Partnership</p>
            <p className="text-sm text-slate-500 leading-relaxed break-keep max-w-xl">
              SSAFYnity와 함께할 파트너를 기다립니다.<br />
              후원·제휴 관련 문의를 남겨주시면 운영진이 확인 후 회신드립니다.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <Container maxWidth="3xl" className="flex flex-col gap-16">

          {/* ① SSAFYnity란 */}
          <motion.div {...fadeUp(0)}>
            <Kicker className="text-blue-600 mb-2">SSAFYnity란</Kicker>
            <p className="text-sm text-slate-500 leading-relaxed break-keep mb-6">
              단순한 친목 모임이 아닌, 개발자 간 연결·성장·기회를 목표로 활동하는 커뮤니티입니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PILLARS.map(({ icon: Icon, en, title, desc, points }, i) => (
                <Card key={i} className="p-5 lg:p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon className="w-[18px] h-[18px] text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">{en}</p>
                      <p className="text-sm font-extrabold text-slate-900">{title}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed break-keep">{desc}</p>
                  <ul className="flex flex-col gap-1.5">
                    {points.map((pt, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* ② 커뮤니티 규모 */}
          <motion.div {...fadeUp(0.05)}>
            <Kicker className="text-blue-600 mb-4">커뮤니티 규모</Kicker>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <Card className="p-5 flex flex-col items-center text-center gap-1">
                <p className="text-xl font-black text-slate-900">
                  {computed.totalMembers.toLocaleString()}
                  <span className="text-sm font-black text-blue-600">명</span>
                </p>
                <p className="text-[11px] text-slate-500">함께하는 동문</p>
              </Card>
              <Card className="p-5 flex flex-col items-center text-center gap-1">
                <p className="text-xl font-black text-slate-900">
                  {computed.cohortCount}
                  <span className="text-sm font-black text-blue-600">기수</span>
                </p>
                <p className="text-[11px] text-slate-500">참여 기수</p>
              </Card>
              <Card className="p-5 flex flex-col items-center text-center gap-1">
                <p className="text-xl font-black text-slate-900">
                  {computed.operationYears}
                  <span className="text-sm font-black text-blue-600">년차</span>
                </p>
                <p className="text-[11px] text-slate-500">운영 연수</p>
              </Card>
            </div>
            <Card className="p-5 lg:p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-500" />
                <p className="text-xs font-extrabold text-slate-800">다양한 IT 직군 분포</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {IT_ROLES.map(role => (
                  <span key={role} className="px-3 py-1.5 rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                    {role}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">전국 단위 네트워크 기반, 지역·기수 구분 없이 활동합니다.</p>
            </Card>
          </motion.div>

          {/* ③ 행사 방향 */}
          <motion.div {...fadeUp(0.08)}>
            <Kicker className="text-blue-600 mb-4">행사 방향</Kicker>
            <Card className="p-5 lg:p-6 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-[18px] h-[18px] text-blue-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-extrabold text-slate-900">연 2회 대규모 네트워킹 행사</p>
                  <p className="text-xs text-slate-500 leading-relaxed break-keep">
                    상반기·하반기 각 1회, 전국 단위 동문 네트워킹 행사를 운영합니다.
                  </p>
                </div>
              </div>
              <div className="h-px bg-slate-100" />
              <div className="flex flex-col gap-2">
                {EVENT_DIRECTIONS.map((dir, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    {dir}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(['상반기', '하반기'] as const).map(season => (
                  <div key={season} className="flex flex-col items-center text-center px-3 py-3 rounded-xl bg-slate-50">
                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-1">{season}</span>
                    <span className="text-xs font-extrabold text-slate-700">1회</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* ④ 기대효과 */}
          <motion.div {...fadeUp(0.1)}>
            <Kicker className="text-blue-600 mb-2">후원·제휴 기대효과</Kicker>
            <p className="text-sm text-slate-500 leading-relaxed break-keep mb-6">
              SSAFYnity와 함께할 때 얻을 수 있는 실질적인 가치입니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EFFECTS.map(({ icon: Icon, title, desc }, i) => (
                <Card
                  key={i}
                  className={`p-5 flex items-start gap-4${i === EFFECTS.length - 1 ? ' sm:col-span-2' : ''}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="w-[18px] h-[18px] text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900 mb-1">{title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed break-keep">{desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* ⑤ 후원·제휴란 */}
          <motion.div {...fadeUp(0.13)}>
            <Kicker className="text-blue-600 mb-2">후원·제휴란</Kicker>
            <p className="text-sm text-slate-500 leading-relaxed break-keep mb-6">
              협력 방식은 크게 두 가지입니다. 상황과 목적에 맞게 선택할 수 있습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PARTNERSHIP_TYPES.map(({ label, icon: Icon, direction, containerStyle, iconColor, tagStyle, desc, points }) => (
                <Card key={label} className="p-5 lg:p-6 flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${containerStyle}`}>
                      <Icon className={`w-[18px] h-[18px] ${iconColor}`} />
                    </div>
                    <div>
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-black mb-1 ${tagStyle}`}>{label}</span>
                      <p className="text-[10px] font-black tracking-wide text-slate-400">{direction}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed break-keep">{desc}</p>
                  <ul className="flex flex-col gap-1.5">
                    {points.map((pt, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* ⑥ 참여 범위 */}
          <motion.div {...fadeUp(0.16)}>
            <Kicker className="text-blue-600 mb-2">참여 범위</Kicker>
            <p className="text-sm text-slate-500 leading-relaxed break-keep mb-6">
              후원사·제휴사 구분 없이 아래 범위 중 하나 이상을 선택할 수 있습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {PARTICIPATION_ENTRIES.map(([key, { label, desc }]) => {
                const Icon = PARTICIPATION_ICONS[key]
                return (
                  <Card key={key} className="p-4 lg:p-5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      {Icon && <Icon className="w-4 h-4 text-slate-500" />}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-extrabold text-slate-800">{label}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                  </Card>
                )
              })}

              {/* 그외 협의 */}
              <div className="border border-dashed border-slate-300 rounded-xl p-4 lg:p-5 flex items-start gap-3 bg-white">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-extrabold text-slate-500">그외 협의</p>
                  <p className="text-xs text-slate-400 leading-relaxed break-keep">
                    위 항목에 해당하지 않더라도 괜찮습니다. 정해진 틀 밖에서도 함께 맞는 방식을 찾겠습니다.
                  </p>
                </div>
              </div>
            </div>

            <Card className="p-4 lg:p-5">
              <p className="text-xs font-extrabold text-slate-800 mb-1">범위는 조합할 수 있어요</p>
              <p className="text-xs text-slate-500 leading-relaxed break-keep">
                예) 물품 후원 + 홍보 협력, 운영 지원 + 재능 기부 등 여러 범위를 함께 진행할 수 있습니다.
              </p>
            </Card>
          </motion.div>

          {/* ⑦ 파트너 혜택 */}
          <motion.div {...fadeUp(0.19)}>
            <Kicker className="text-blue-600 mb-2">파트너 혜택</Kicker>
            <p className="text-sm text-slate-500 leading-relaxed break-keep mb-6">
              후원사·제휴사 공통으로 제공되는 혜택입니다.
            </p>
            <Card className="p-5 lg:p-6">
              <ul className="flex flex-col gap-3">
                {PARTNER_PERKS.map((perk, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="text-sm text-slate-700">{perk}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* ⑧ 신청·절차 탭 */}
          <motion.div {...fadeUp(0.22)}>
            <Kicker className="text-blue-600 mb-4">신청 방법·절차</Kicker>

            {/* 신청 방법 */}
            <Card className="p-4 lg:p-5 mb-6">
              <p className="text-xs font-extrabold text-slate-800 mb-3">신청 방법</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5">
                {([
                  { step: 1, title: '후원·제휴 선택', sub: '아래 탭에서 1개 선택' },
                  { step: 2, title: '참여 범위 선택', sub: '위 목록에서 1개 이상' },
                  { step: 3, title: '이메일 문의',    sub: '선택 내용과 함께 전송' },
                ] as const).map(({ step, title, sub }, i, arr) => (
                  <div key={step} className="flex items-center gap-1.5 flex-1">
                    <div className="flex flex-col items-center gap-0.5 flex-1 text-center px-3 py-3 rounded-xl bg-slate-50">
                      <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">STEP {step}</span>
                      <span className="text-xs font-extrabold text-slate-700">{title}</span>
                      <span className="text-[10px] text-slate-400">{sub}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <ChevronRight className="hidden sm:block w-4 h-4 text-slate-300 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* 탭 스위처 */}
            <div className="flex gap-1 p-1 bg-slate-200 rounded-full mb-6">
              {(['후원', '제휴'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-2 rounded-full text-xs font-black transition-all ${
                    activeTab === tab
                      ? tab === '후원'
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'bg-white text-emerald-700 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 후원 탭 */}
            {activeTab === '후원' && (
              <Card className="p-5 lg:p-6 flex flex-col gap-6">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-blue-100 text-xs font-black text-blue-700 mb-2">후원</span>
                  <p className="text-xs text-slate-500 leading-relaxed break-keep">
                    파트너가 SSAFYnity에 일방적으로 자원·역량을 제공합니다. 운영진 검토 후 회신드립니다.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-800 mb-3">진행 절차</p>
                  <div className="flex items-center gap-1.5">
                    {SPONSOR_STEPS.map((step, i) => (
                      <div key={i} className="flex items-center gap-1.5 flex-1">
                        <div className="flex flex-col items-center gap-0.5 flex-1 text-center px-3 py-3 rounded-xl bg-slate-50">
                          <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">STEP {i + 1}</span>
                          <span className="text-xs font-extrabold text-slate-700">{step}</span>
                        </div>
                        {i < SPONSOR_STEPS.length - 1 && (
                          <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-extrabold text-slate-800">문의하기</p>
                  <a
                    href={`mailto:${siteData.brand.email}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-black hover:bg-blue-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {siteData.brand.email}
                  </a>
                  {/* [업데이트 필요] 접수 폼 URL 생성 후 이메일 버튼 대신 폼 버튼으로 교체 */}
                </div>
              </Card>
            )}

            {/* 제휴 탭 */}
            {activeTab === '제휴' && (
              <Card className="p-5 lg:p-6 flex flex-col gap-6">
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-xs font-black text-emerald-700 mb-2">제휴</span>
                  <p className="text-xs text-slate-500 leading-relaxed break-keep">
                    SSAFYnity와 파트너가 서로 주고받는 상호 협력 방식입니다. 협약 체결 후 공동 활동을 진행합니다.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-800 mb-3">진행 절차</p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5">
                    {ALLIANCE_STEPS.map((step, i) => (
                      <div key={i} className="flex items-center gap-1.5 flex-1">
                        <div className="flex flex-col items-center gap-0.5 flex-1 text-center px-3 py-3 rounded-xl bg-slate-50">
                          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">STEP {i + 1}</span>
                          <span className="text-xs font-extrabold text-slate-700">{step}</span>
                        </div>
                        {i < ALLIANCE_STEPS.length - 1 && (
                          <ChevronRight className="hidden sm:block w-4 h-4 text-slate-300 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-extrabold text-slate-800">문의하기</p>
                  <a
                    href={`mailto:${siteData.brand.email}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white text-sm font-black hover:bg-emerald-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    {siteData.brand.email}
                  </a>
                  {/* [업데이트 필요] 접수 폼 URL 생성 후 이메일 버튼 대신 폼 버튼으로 교체 */}
                </div>
              </Card>
            )}
          </motion.div>

        </Container>
      </section>

    </div>
  )
}
