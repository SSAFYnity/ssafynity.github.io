import { motion } from 'framer-motion'
import { BadgeCheck, Megaphone, CalendarDays, Users, UserRound, ShieldCheck, AlertTriangle } from 'lucide-react'
import { Container } from '@/components/Container'

import { Card } from '@/components/Card'
import { HeroLabel } from '@/components/HeroLabel'
const BENEFITS = [
  {
    icon:  BadgeCheck,
    title: '공식 인증',
    desc:  'SSAFYnity 공식 소속 동아리로 등록되어 신뢰도 있는 활동이 가능합니다. 동문회 명의를 활용해 멤버 모집과 외부 활동에 유리한 환경을 갖출 수 있습니다.',
  },
  {
    icon:  Megaphone,
    title: '공식 채널 홍보',
    desc:  '카카오톡 채널, SNS 등 SSAFYnity 공식 채널을 통해 동아리 활동 소식과 멤버 모집 공고를 홍보할 수 있습니다.',
  },
  {
    icon:  CalendarDays,
    title: '행사 연계',
    desc:  'SSAFYnity 주요 행사에서 동아리 소개 코너 또는 부스를 운영할 기회가 주어집니다. 많은 동문들과 한자리에서 만날 수 있습니다.',
  },
  {
    icon:  Users,
    title: '멤버 모집',
    desc:  '동문회 회원을 대상으로 공식적인 멤버 모집을 진행할 수 있습니다. 등록 리스트 페이지를 통해 동아리가 상시 노출됩니다.',
  },
]

export default function ClubsBenefitsPage() {
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
              관심사로 이어지는
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">
              SSAFYnity 동아리 안내
            </p>
            <p className="text-sm text-slate-500 leading-relaxed break-keep">
              SSAFYnity 동아리는 SSAFY 동문들이 관심사를 기반으로 자율적으로 모인 소모임입니다.<br />
              등록 자격, 유지 조건, 소속 동아리 혜택을 확인해보세요.
            </p>
          </motion.div>
                </Container>
      </section>

      {/* 등록 자격 */}
      <section className="bg-slate-50 pt-8 pb-14 lg:pt-10 lg:pb-16 border-b border-slate-100">
                <Container maxWidth="3xl" className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Eligibility</p>
            <h2 className="text-lg font-extrabold text-slate-900">등록 자격</h2>
          </motion.div>
          <div className="flex flex-col gap-3">
            {[
              { icon: ShieldCheck, title: '동문회원 전용', desc: <>모든 구성원이<br className="sm:hidden" /> SSAFYnity 동문회원이어야 합니다.</>, delay: 0 },
              { icon: UserRound,   title: '최소 인원',    desc: '5명 이상',  delay: 0.06 },
            ].map(({ icon: Icon, title, desc, delay }) => (
              <Card as={motion.div}
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay }}
                className="flex items-start gap-4 bg-white rounded-2xl border border-slate-100 px-6 py-4"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-800 mb-0.5">{title}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed text-right">
            동아리는 자율적으로 운영되며,<br className="sm:hidden" /> SSAFYnity는 내부 활동·운영 방식에 관여하지 않습니다.
          </p>
                </Container>
      </section>

      {/* 유지 조건 */}
      <section className="bg-white pt-8 pb-14 lg:pt-10 lg:pb-16 border-b border-slate-100">
                <Container maxWidth="3xl" className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Requirements</p>
            <h2 className="text-lg font-extrabold text-slate-900">유지 조건</h2>
          </motion.div>

          <div className="flex flex-col gap-3">
            {[
              { icon: ShieldCheck,  title: '동문회원 전용', desc: <>모든 구성원이<br className="sm:hidden" /> SSAFYnity 동문회원이어야 합니다.</>, delay: 0 },
              { icon: CalendarDays, title: '최소 활동',     desc: '반기 1회 이상 활동을 유지해야 합니다.',                                    delay: 0.06 },
              { icon: UserRound,    title: '최소 인원',     desc: '5인 이상의 구성원을 유지해야 합니다.',                                      delay: 0.12 },
            ].map(({ icon: Icon, title, desc, delay }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay }}
                className="flex items-start gap-4 bg-slate-50 rounded-2xl border border-slate-100 px-6 py-4"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-800 mb-0.5">{title}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="flex flex-col gap-3"
          >
            <p className="text-xs font-black text-amber-500 uppercase tracking-widest">정식 동아리 취소 조건</p>
            {[
              '구성원이 5인 미만으로 감소한 경우',
              '반기(6개월) 동안 활동 내역이 확인되지 않는 경우',
              'SSAFYnity 동문회원 외 인원이 구성원에 포함된 경우',
              '동문회 가치에 반하거나 사회적·법적으로 문제가 될 수 있는 활동을 한 경우',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-2xl border border-slate-100 px-5 py-4">
                <div className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed break-keep">{item}</p>
              </div>
            ))}
          </motion.div>
                </Container>
      </section>

      {/* 혜택 */}
      <section className="bg-slate-50 pt-8 pb-14 lg:pt-10 lg:pb-16 border-b border-slate-100">
                <Container maxWidth="3xl" className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Benefits</p>
            <h2 className="text-lg font-extrabold text-slate-900">소속 동아리 혜택</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
              <Card as={motion.div}
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-base font-extrabold text-slate-900 mb-2">{title}</p>
                  <p className="text-sm text-slate-500 leading-relaxed break-keep">{desc}</p>
                </div>
              </Card>
            ))}
          </div>
                </Container>
      </section>


    </div>
  )
}
