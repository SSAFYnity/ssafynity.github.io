import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Code2, Dumbbell, Palette, Gamepad2, Globe, Heart, X, ShieldCheck, Users } from 'lucide-react'
import { CLUB_CATEGORIES, CLUB_CATEGORY_KEYS, type ClubCategoryKey } from '@/data/constants'
import type { LucideIcon } from 'lucide-react'
import { Container } from '@/components/Container'
import { HeroLabel } from '@/components/HeroLabel'
import { Card } from '@/components/Card'
import { Kicker } from '@/components/Kicker'
import { siteData } from '@/data/siteData'
import { trackEvent } from '@/lib/analytics'

const CATEGORY_UI: Record<ClubCategoryKey, { icon: LucideIcon; examples: string[] }> = {
  tech:      { icon: Code2,    examples: ['사이드 프로젝트', 'CS 스터디'] },
  sports:    { icon: Dumbbell, examples: ['풋살', '야구', '클라이밍', '등산'] },
  art:       { icon: Palette,  examples: ['음악', '미술', '사진', '글쓰기', '춤'] },
  hobby:     { icon: Gamepad2, examples: ['E-sport', '보드게임', '방탈출'] },
  social:    { icon: Globe,    examples: ['여행', '맛집', '지역 모임'] },
  volunteer: { icon: Heart,    examples: [] },
}

const REJECTIONS = [
  '특정 종교·정치적 성향을 목적으로 하는 모임',
  '영리·상업적 목적의 활동 (홍보, 판매, 투자 권유 등)',
  '특정 개인이나 단체를 비방하거나 명예를 훼손하는 활동',
  '이미 등록된 동아리와 목적·활동이 실질적으로 동일한 경우',
  '동문회 전체를 대상으로 한 자율 참여식 주제 (예: 모각코, 1일 1커밋 인증, 미라클 모닝 등)',
]

const APPLY_TYPES = [
  {
    icon: ShieldCheck,
    type: '정식 동아리',
    desc: '5인 이상 구성이 완료된 경우 신청서를 제출해주세요. 검토 후 공식 동아리 리스트에 등록됩니다.',
    note: '동아리 가입은 동아리 별 상세 페이지에서 확인하세요.',
    path: '/clubs',
    pathLabel: '정식 동아리 목록 보기',
    applyLabel: '정식 동아리 신청하기',
    applyUrl: siteData.forms.clubOfficial,
  },
  {
    icon: Users,
    type: '예비 동아리',
    desc: '관심사는 있지만 아직 인원이 부족한 경우, 아래 신청서로 관심을 등록해주세요. 5인 이상 모이면 SSAFYnity가 단체 채팅방을 개설해드립니다.',
    note: '이후 정식 동아리 전환 신청이 가능합니다.',
    path: '/clubs/pre',
    pathLabel: '예비 동아리 목록 보기',
    applyLabel: '예비 동아리 등록하기',
    applyUrl: siteData.forms.clubPre,
  },
]

export default function ClubsApplyPage() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-white pt-24 pb-10 lg:pt-28 lg:pb-14 border-b border-slate-100">
        <Container maxWidth="3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroLabel>Clubs</HeroLabel>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-2">
              동아리를 만들고 싶다면
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">Club Application</p>
            <p className="text-sm text-slate-500 leading-relaxed break-keep text-pretty max-w-xl">
              SSAFYnity에 동아리를 등록하면 공식 지원을 받으며 동문들과 함께 활동할 수 있습니다. 신청 전 아래 카테고리와 유의사항을 먼저 확인해주세요.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* 카테고리 */}
      <section className="bg-slate-50 pt-8 pb-14 lg:pt-10 lg:pb-16 border-b border-slate-100">
        <Container maxWidth="3xl" className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Kicker className="text-blue-600 mb-2">Categories</Kicker>
            <h2 className="text-lg font-extrabold text-slate-900 mb-1">동아리 카테고리</h2>
            <p className="text-sm text-slate-500 break-keep">신청서 카테고리란에 아래 분류 중 하나를 기재해주세요. 모호한 경우 신청 시 별도로 남겨주세요.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CLUB_CATEGORY_KEYS.map((key, i) => {
              const { label } = CLUB_CATEGORIES[key]
              const { icon: Icon, examples } = CATEGORY_UI[key]
              return (
                <Card
                  key={key}
                  as={motion.div}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="p-4 flex flex-col gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-sm font-extrabold text-slate-900">{label}</p>
                  {examples.length > 0 && (
                    <p className="text-xs text-slate-400 leading-relaxed break-keep">{examples.join(', ')} 등</p>
                  )}
                </Card>
              )
            })}
          </div>
        </Container>
      </section>

      {/* 등록 불가 유형 */}
      <section className="bg-white pt-8 pb-14 lg:pt-10 lg:pb-16 border-b border-slate-100">
        <Container maxWidth="3xl" className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Kicker className="text-red-400 mb-2">Not Eligible</Kicker>
            <h2 className="text-lg font-extrabold text-slate-900">등록 불가 유형</h2>
          </motion.div>
          <div className="flex flex-col gap-2">
            {REJECTIONS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex items-start gap-3 bg-slate-50 rounded-2xl border border-slate-100 px-5 py-4"
              >
                <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-red-400" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed break-keep">{item}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-slate-400 text-right break-keep">※ 세부 기준은 추후 공지될 예정입니다.</p>
        </Container>
      </section>

      {/* 신청 경로 */}
      <section className="bg-slate-50 pt-8 pb-14 lg:pt-10 lg:pb-20">
        <Container maxWidth="3xl" className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Kicker className="text-blue-600 mb-2">How to Apply</Kicker>
            <h2 className="text-lg font-extrabold text-slate-900">신청 경로</h2>
            <p className="text-sm text-slate-500 mt-1 break-keep">상황에 맞는 신청 경로를 선택해주세요.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {APPLY_TYPES.map(({ icon: Icon, type, desc, note, path, pathLabel, applyLabel, applyUrl }, i) => (
              <Card
                key={type}
                as={motion.div}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-base font-extrabold text-slate-900">{type}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm text-slate-500 leading-relaxed break-keep">{desc}</p>
                  <p className="text-xs text-slate-400 break-keep">{note}</p>
                </div>
                <div className="mt-auto flex flex-col gap-2">
                  <Link
                    to={path}
                    className="w-full py-2.5 rounded-xl border border-blue-200 text-blue-600 text-sm font-black text-center hover:bg-blue-50 transition-colors"
                  >
                    {pathLabel}
                  </Link>
                  <a
                    href={applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackEvent('click_club_apply', {
                        club_type: type === '정식 동아리' ? 'official' : 'pre',
                        cta_label: applyLabel,
                        destination_url: applyUrl,
                      })
                    }}
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-black text-center hover:bg-blue-700 transition-colors"
                  >
                    {applyLabel}
                  </a>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-xs text-slate-400 break-keep text-right">신청 후 별도 안내가 없다면 SSAFYnity 이메일로 문의해주세요.</p>
        </Container>
      </section>

    </div>
  )
}
