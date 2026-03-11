import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BadgeCheck, CheckCircle2, ChevronRight, Clock, ExternalLink, Mail, Send, ShieldCheck, XCircle } from 'lucide-react'
import { siteData } from '@/data/siteData'
import { ROUTES } from '@/lib/routes'
import { Container } from '@/components/Container'
import { HeroLabel } from '@/components/HeroLabel'
import { Kicker } from '@/components/Kicker'
import { Card } from '@/components/Card'

const PROCESS = [
  {
    icon: Send,
    title: '폼 제출',
    desc: '가입 신청 폼을 제출합니다.',
  },
  {
    icon: ShieldCheck,
    title: '검증',
    desc: '가입 조건을 확인합니다.',
  },
  {
    icon: BadgeCheck,
    title: '승인',
    desc: '승인 처리 후 회원으로 등록됩니다.',
  },
  {
    icon: Mail,
    title: '메일 안내',
    desc: '가입 완료 및 안내를 메일로 전달드립니다.',
  },
] as const

export default function JoinMembershipPage() {
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
            <HeroLabel>동문회 가입</HeroLabel>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-2">
              함께 만들어가는 동문 네트워크
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">SSAFYnity Membership</p>
            <p className="text-sm text-slate-500 leading-relaxed break-keep max-w-xl">
              SSAFYnity는 SSAFY 수료생들이 직접 운영하는 비영리 동문 커뮤니티입니다.<br />
              가입을 완료하면 행사 신청, 커뮤니티 참여 등 다양한 활동을 함께할 수 있습니다.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="bg-slate-50 py-14 lg:py-20">
        <Container maxWidth="3xl" className="flex flex-col gap-12">
          {/* Eligibility */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Kicker className="text-blue-600 mb-4">가입 대상</Kicker>
            <Card className="p-6 lg:p-8 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-extrabold text-slate-800 mb-1">가입 가능</p>
                  <p className="text-sm text-slate-600 leading-relaxed break-keep">
                    아래 두 조건 중 <strong className="text-slate-800">하나</strong>라도 해당하면 가입할 수 있습니다.
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-emerald-500 font-black mt-0.5">·</span>
                      SSAFY <strong className="text-slate-800">취업 조기 퇴소자</strong>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-emerald-500 font-black mt-0.5">·</span>
                      SSAFY <strong className="text-slate-800">수료생</strong>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-extrabold text-slate-800 mb-1">가입 불가</p>
                  <p className="text-sm text-slate-600 leading-relaxed break-keep">
                    아쉽지만 <strong className="text-slate-800">취업 외 퇴소</strong> 또는 <strong className="text-slate-800">강제 퇴소</strong>의 경우 가입이 불가합니다.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <Kicker className="text-blue-600 mb-4">가입 절차</Kicker>
            <p className="text-xs text-slate-500 leading-relaxed break-keep mb-4">폼 제출 → 검증 → 승인 → 메일 안내</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {PROCESS.map(({ icon: Icon, title, desc }) => (
                <Card key={title} className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-extrabold text-slate-900 mb-1">{title}</p>
                    <p className="text-sm text-slate-500 leading-relaxed break-keep">{desc}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mt-3 p-6 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-extrabold text-slate-800 mb-1">처리 기간</p>
                  <p className="text-sm text-slate-600 leading-relaxed break-keep">
                    가입 처리는 <strong className="text-slate-800">늦어도 1주일 이내</strong>로 완료됩니다.<br />
                    행사 신청에 영향을 줄 수 있으니, 참여를 계획하고 있다면 <strong className="text-slate-800">미리 가입</strong>을 권장합니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-extrabold text-slate-800 mb-1">개인정보 동의</p>
                  <p className="text-sm text-slate-600 leading-relaxed break-keep">
                    개인정보 수집 및 이용 동의는 <strong className="text-slate-800">가입 신청 폼 내부</strong>에서 안내됩니다.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Membership Types */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Kicker className="text-blue-600 mb-4">회원 유형</Kicker>
            <div className="grid sm:grid-cols-2 gap-3">
              <Card className="p-6 flex flex-col gap-2">
                <p className="text-sm font-extrabold text-slate-900">{siteData.membership.regular.title}</p>
                <p className="text-xs font-black text-slate-400">{siteData.membership.regular.fee}</p>
                <p className="text-sm text-slate-600 leading-relaxed break-keep">{siteData.membership.regular.desc}</p>
                <div className="mt-3 text-xs text-slate-500 leading-relaxed break-keep">
                  가입이 승인되면 <strong className="text-slate-800">무조건 일반회원</strong>으로 등록됩니다.
                </div>
              </Card>

              <Card className="p-6 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-extrabold text-slate-900">{siteData.membership.premium.title}</p>
                  <Link
                    to={ROUTES.joinPremium}
                    className="shrink-0 text-slate-400 hover:text-blue-700 transition-colors"
                    aria-label="정회원 안내 보기"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
                <p className="text-xs font-black text-slate-400">{siteData.membership.premium.fee}</p>
                <p className="text-sm text-slate-600 leading-relaxed break-keep">{siteData.membership.premium.desc}</p>
                <div className="mt-3 text-xs text-slate-500 leading-relaxed break-keep">
                  정회원을 희망하는 경우 <strong className="text-slate-800">별도 신청</strong>이 필요합니다.
                </div>
              </Card>
            </div>
          </motion.div>
        </Container>
      </section>
      {/* CTA */}
      <section className="bg-blue-950 py-16">
        <Container maxWidth="3xl" className="flex flex-col items-center text-center gap-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-white leading-snug">
            지금 바로 SSAFYnity에 합류해보세요.
          </h2>
          <a
            href={siteData.forms.membership}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-blue-950 text-base font-black tracking-wide hover:bg-blue-100 transition-colors shadow-lg shadow-blue-950/30"
          >
            가입 신청하기
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-xs text-blue-300">새 탭에서 신청 폼이 열립니다</p>
        </Container>
      </section>
    </div>
  )
}