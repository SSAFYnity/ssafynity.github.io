import { motion } from 'framer-motion'
import { Crown, Users, CalendarDays, MessageSquare, Megaphone, MessageCircle, CalendarPlus, Target } from 'lucide-react'
import { currentOperator } from '@/data/computed'
import { Container } from '@/components/Container'

import { HeroLabel } from '@/components/HeroLabel'
const COMMON_TASKS = [
  {
    icon:  CalendarDays,
    title: '현장 스탭',
    desc:  '온·오프라인 행사 진행 시 팀 구분 없이 현장 관리를 담당합니다.',
  },
  {
    icon:  MessageSquare,
    title: '정기 공유 및 기록',
    desc:  '운영 내용을 기록해 기수를 넘어 조직이 이어지도록 합니다.',
  },
  {
    icon:  MessageCircle,
    title: 'VoC 수집',
    desc:  '회원의 목소리를 꾸준히 모아 운영에 반영합니다.',
  },
]

const OPT_TASKS = [
  {
    icon:  Megaphone,
    title: '커뮤니티 관리',
    desc:  '동문 커뮤니티 채널을 함께 모니터링하고 소통에 참여합니다.',
  },
  {
    icon:  CalendarPlus,
    title: '이벤트성 모임 주최',
    desc:  '소규모 비정기 모임을 직접 열고 진행합니다.',
  },
  {
    icon:  Target,
    title: 'TF 참여',
    desc:  '단발성 조직이 필요할 때 희망 인원이 참여합니다.',
  },
]

export default function TeamOrganizationPage() {
  const teams = currentOperator.groups.filter(g => g.name !== '임원진')

  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-white pt-24 pb-16 lg:pt-28 lg:pb-20 border-b border-slate-100">
                <Container maxWidth="5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroLabel>Operator Organization</HeroLabel>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-5">
              함께 만드는<br className="hidden sm:block" />
              <span className="text-blue-600">조직 구조</span>
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed break-keep max-w-lg">
              SSAFYnity는 역할에 따라 나뉜 팀들이 유기적으로 협력해 동문회를 운영합니다.
            </p>
          </motion.div>
                </Container>
      </section>

      {/* 리더십 */}
      <section className="bg-slate-50 py-16 lg:py-20">
                <Container maxWidth="5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Leadership</p>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">리더십</h2>
            <p className="text-sm text-slate-500 leading-relaxed break-keep mb-8">
              회장과 팀장은 동문회 운영기관의 임원진으로, 보궐 시 상호 대리할 수 있습니다.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Crown className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 mb-1.5">회장</h3>
                  <p className="text-sm text-slate-500 leading-relaxed break-keep">
                    동문회 전체 운영 방향을 확정하고 대외적으로 SSAFYnity를 대표합니다.
                    팀 간 의사결정의 최종 조율 역할을 맡습니다.
                  </p>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 mb-1.5">팀장</h3>
                  <p className="text-sm text-slate-500 leading-relaxed break-keep">
                    각 팀의 업무를 총괄하고, 팀 간 협조가 필요할 때 해당 팀의 대표로 의사를 전달합니다.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
                </Container>
      </section>

      {/* 전담 팀 */}
      <section className="bg-white py-16 lg:py-20 border-t border-slate-100">
                <Container maxWidth="5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Teams</p>
            <h2 className="text-lg font-extrabold text-slate-900 mb-4">전담 팀</h2>
            <p className="text-sm text-slate-500 leading-relaxed break-keep mb-8">운영진은 팀 단위로 모집되며, 소속 팀이 기본 업무 단위가 됩니다. 팀 구성은 기수마다 필요성에 따라 변동됩니다.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map((team, i) => (
                <div key={i} className="border border-slate-100 rounded-2xl p-6">
                  <p className="text-xs font-black text-blue-600 tracking-widest mb-2 uppercase">{team.nameEn ?? 'Team'}</p>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2">{team.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed break-keep">{team.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
                </Container>
      </section>

      {/* 공통 업무 + 개인희망 업무 */}
      <section className="bg-slate-50 py-16 lg:py-20 border-t border-slate-100">
                <Container maxWidth="5xl">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* 공통 업무 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Common Tasks</p>
              <h2 className="text-lg font-extrabold text-slate-900 mb-6">공통 업무</h2>
              <p className="text-sm text-slate-500 leading-relaxed break-keep mb-6">
                팀 구분 없이 전체 운영진이 함께 참여하는 업무입니다.
              </p>
              <div className="flex flex-col gap-3">
                {COMMON_TASKS.map((item, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-800 mb-0.5">{item.title}</p>
                      <p className="text-sm text-slate-500 leading-relaxed break-keep">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 개인희망 업무 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Optional Tasks</p>
              <h2 className="text-lg font-extrabold text-slate-900 mb-6">개인희망 업무</h2>
              <p className="text-sm text-slate-500 leading-relaxed break-keep mb-6">
                팀 업무 외에 개인 관심과 역량에 따라 자발적으로 맡을 수 있는 업무입니다.
              </p>
              <div className="flex flex-col gap-3">
                {OPT_TASKS.map((item, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-800 mb-0.5">{item.title}</p>
                      <p className="text-sm text-slate-500 leading-relaxed break-keep">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
                </Container>
      </section>

    </div>
  )
}
