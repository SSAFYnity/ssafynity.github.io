import type { ElementType } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ExternalLink, CheckCircle2, Heart, Zap, Gift, Network, Users, Layers } from 'lucide-react'
import { siteData } from '@/data/siteData'
import { computed, currentOperator } from '@/data/computed'
import { Container } from '@/components/Container'
import { HeroLabel } from '@/components/HeroLabel'
import { Kicker } from '@/components/Kicker'
import { Card } from '@/components/Card'
import { trackEvent } from '@/lib/analytics'

const QUALIFICATIONS = [
  <><strong className="text-slate-800">SSAFYnity 동문회원</strong>이라면 기수·캠퍼스 무관하게 지원 가능합니다.</>,
  <>취업 준비·재직 여부에 관계없이 참여할 수 있지만, <strong className="text-slate-800">상당한 시간 할애</strong>가 필요합니다.</>,
  <>주 업무 소통이 온라인으로 이루어지는 만큼, <strong className="text-slate-800">연락망을 자주 확인</strong>할 수 있는 분일수록 좋습니다.</>,
  <>특별한 스펙보다, <strong className="text-slate-800">기여하고 싶다는 마음</strong>이 중요합니다.</>,
]

const BENEFITS = [
  { icon: Network, title: '동문 네트워크',  desc: `${computed.totalMembers.toLocaleString()}명 이상의 동문과 직접 소통하며 업계 선후배를 가장 가까이에서 만날 수 있습니다.` },
  { icon: Gift,    title: '활동 굿즈 제공', desc: '운영진으로 함께한 시간을 기념하는 굿즈를 제공합니다. 작지만 소중한 감사의 표시입니다.' },
  { icon: Zap,     title: '실전 경험',      desc: '수천 명 규모의 동문 단체를 직접 운영해보는 흔치 않은 경험을 쌓을 수 있습니다.' },
  { icon: Heart,   title: '의미 있는 기여', desc: '내가 기여한 노력이 수천 명의 동문에게 직접 닿습니다. 커뮤니티의 성장이 곧 나의 성장입니다.' },
]

type OperatorInfoLinkCardProps = {
  to: string
  title: string
  desc: string
  BgIcon: ElementType
}

function OperatorInfoLinkCard({ to, title, desc, BgIcon }: OperatorInfoLinkCardProps) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden flex items-center justify-between bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-colors p-6"
    >
      <div className="relative z-10 flex items-center justify-between w-full">
        <div>
          <p className="text-sm font-extrabold text-slate-800 mb-1">{title}</p>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors shrink-0 ml-4" />
      </div>
      <BgIcon className="absolute -right-4 top-1/2 -translate-y-1/2 w-24 h-24 text-slate-100 group-hover:text-blue-100 transition-colors" />
    </Link>
  )
}
export default function TeamApplyPage() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-white pt-24 pb-16 lg:pt-28 lg:pb-20 border-b border-slate-100">
                <Container maxWidth="3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroLabel>Operator Recruitment</HeroLabel>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-5 text-balance">
              싸피니티를 함께<br className="hidden sm:block" />
              <span className="text-blue-600">만들어갈 분을 찾습니다</span>
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed break-keep max-w-lg">
              싸피니티 운영진은 SSAFYnity 회원 중 자원하여 동문회를 이끌어가는 사람들입니다. 보수 없이 재능과 시간을 나누는 자리이지만, 그만큼 값진 경험과 연결을 얻을 수 있습니다.
            </p>
          </motion.div>
                </Container>
      </section>

      {/* 본문 */}
      <section className="bg-slate-50 py-16 lg:py-20">
                <Container maxWidth="3xl" className="flex flex-col gap-14">

          {/* 지원 자격 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Kicker className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">지원 자격</Kicker>
                        <Card className="bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 flex flex-col gap-3">
              {QUALIFICATIONS.map((q, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 leading-relaxed break-keep">{q}</p>
                </div>
              ))}
                        </Card>
          </motion.div>

          {/* 활동 방식 링크 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Kicker className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">활동 방식</Kicker>
            <div className="flex flex-col gap-2">
              <OperatorInfoLinkCard
                to="/operator/introduce"
                title="운영진 소개"
                desc="활동 방식, 팀 구성, 업무 원칙 등 자세한 내용을 안내합니다."
                BgIcon={Users}
              />
              <OperatorInfoLinkCard
                to="/operator/organization"
                title="조직 안내"
                desc="현재 운영 중인 팀과 각 팀의 역할을 확인할 수 있습니다."
                BgIcon={Layers}
              />
            </div>
          </motion.div>

          {/* 혜택 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Kicker className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">활동 혜택</Kicker>
            <div className="grid sm:grid-cols-2 gap-3">
              {BENEFITS.map(({ icon: Icon, title, desc }) => (
                <Card key={title} className="bg-white rounded-2xl border border-slate-100 p-6">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-sm font-extrabold text-slate-800 mb-1">{title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed break-keep">{desc}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* 모집 안내 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="bg-blue-50 border border-blue-100 rounded-2xl p-6 lg:p-8"
          >
            <Kicker className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">모집 안내</Kicker>
            <ul className="flex flex-col gap-2">
              <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                <span className="text-blue-400 font-black mt-0.5 shrink-0">·</span>
                모집은 <strong className="text-slate-800">상시</strong>로 진행됩니다. 기간 제한 없이 언제든 지원할 수 있습니다.
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                <span className="text-blue-400 font-black mt-0.5 shrink-0">·</span>
                지원서 검토 후 개별 연락을 드립니다.
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                <span className="text-blue-400 font-black mt-0.5 shrink-0">·</span>
                문의는 싸피니티 공식 메일 또는 SNS 채널로 부탁드립니다.
              </li>
            </ul>
          </motion.div>

          {/* 현재 공석 */}
          {(() => {
            const teams = currentOperator.groups.filter(
              g => g.name !== '임원진' && g.vacancies !== undefined
            )
            if (teams.length === 0) return null
            return (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Kicker className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">현재 공석</Kicker>
                <div className="flex flex-col gap-2">
                  {teams.map(g => {
                    const open = g.vacancies ?? 0
                    const closed = open === 0
                    return (
                      <div
                        key={g.name}
                        className={`flex items-center justify-between rounded-2xl border px-6 py-4 ${
                          closed ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-100'
                        }`}
                      >
                        <div>
                          <p className={`text-sm font-extrabold ${closed ? 'text-slate-400' : 'text-slate-800'}`}>{g.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{g.desc}</p>
                        </div>
                        {closed ? (
                          <span className="shrink-0 ml-4 text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-400">
                            지원 불가
                          </span>
                        ) : (
                          <span className="shrink-0 ml-4 text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                            {open}명 모집 중
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })()}

</Container>
      </section>

      {/* CTA */}
      <section className="bg-blue-950 py-20">
                <Container maxWidth="3xl" className="flex flex-col items-center text-center gap-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
            싸피니티 운영진에<br className="hidden sm:block" />합류할 분을 모집합니다.
          </h2>
          <p className="text-sm text-blue-200 break-keep max-w-sm">
            여러분의 열정이 {computed.totalMembers.toLocaleString()}명 동문 커뮤니티를 더 풍성하게 만듭니다.
          </p>
          <a
            href={siteData.forms.teamApply}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent('click_operator_apply', {
                cta_label: '운영진 지원하기',
                destination_url: siteData.forms.teamApply,
              })
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-blue-950 text-base font-black tracking-wide hover:bg-blue-100 transition-colors shadow-lg shadow-blue-950/30"
          >
            운영진 지원하기
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-xs text-blue-300">새 탭에서 지원폼이 열립니다</p>
                </Container>
      </section>

    </div>
  )
}
