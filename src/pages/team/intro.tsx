import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Zap, Users, Clock, Layers, Wifi, Scale } from 'lucide-react'
import { currentOperator } from '@/data/computed'

const PRINCIPLES = [
  {
    icon:  Heart,
    title: '재능기부',
    desc:  '보수 없이 역량과 시간을 나누는 자발적 기여로 운영됩니다.',
  },
  {
    icon:  Zap,
    title: '강점 기반 팀 선택',
    desc:  '하고 싶은 일, 잘하는 것을 살려 원하는 팀에 합류합니다.',
  },
  {
    icon:  Users,
    title: '팀별 + 공통 업무',
    desc:  '팀 전문 업무와 행사 운영 등 공통 업무를 함께 맡습니다.',
  },
]

const HOW_WE_WORK = [
  {
    icon:  Clock,
    label: '참여 방식',
    desc:  '본업이 있는 개개인이기에\n퇴근 후·주말 여가 시간을 자율적으로 활용합니다.',
  },
  {
    icon:  Layers,
    label: '협업 툴',
    desc:  '팀별 업무 계정이 따로 존재하며,\nNotion으로 기록하고, Discord로 회의·소통합니다.',
  },
  {
    icon:  Wifi,
    label: '온라인 주력 활동',
    desc:  '대회의·회식 등 특별한 자리에서만 오프라인으로 만납니다.',
  },
  {
    icon:  Scale,
    label: '의사결정',
    desc:  '팀 자율 결정을 권장하며, 회장이 방향성을 최종 확인합니다.',
  },
]

export default function TeamIntroPage() {
  const memberCount = currentOperator.memberCount ?? new Set(
    currentOperator.groups.flatMap(g =>
      g.members.filter(m => !m.vacant).map(m => m.name)
    )
  ).size
  const teamCount   = currentOperator.groups.filter(g => g.name !== '임원진').length

  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-white pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="flex flex-col lg:flex-row lg:items-end gap-12">

            {/* 좌: 텍스트 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-slate-200 text-slate-500 rounded-full mb-8 bg-slate-50">
                <span className="text-[10px] font-black uppercase tracking-widest">✦ Staff Introduction</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-5">
                자율로 완성하는<br />
                <span className="text-blue-600">성장의 선순환</span>
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed break-keep max-w-lg">
                소중한 IT 네트워크를 함께 만들어가고자 하는 동문들이
                재능기부로 모인 자율 조직입니다.
              </p>
            </motion.div>

            {/* 우: 숫자 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-8 shrink-0"
            >
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest mb-1">현 기수 운영진</p>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{memberCount}</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest mb-1">전담 팀</p>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{teamCount}</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 활동 원칙 */}
      <section className="bg-slate-50 py-16 lg:py-20 border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Why We Do It</p>
            <h2 className="text-lg font-extrabold text-slate-900 mb-8">활동 원칙</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {PRINCIPLES.map((item, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-800 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed break-keep">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 업무 방식 */}
      <section className="bg-slate-900 py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">How We Work</p>
            <h2 className="text-lg font-extrabold text-white mb-8">업무 방식</h2>
            <div className="grid sm:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
              {HOW_WE_WORK.map((item, i) => (
                <div key={i} className="bg-slate-900 p-6 flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/15 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-white mb-1">{item.label}</p>
                    <p className="text-sm text-slate-400 leading-relaxed break-keep whitespace-pre-line">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl text-center">
          <p className="text-sm text-slate-500 mb-4">함께 싸피니티를 만들어가고 싶으신가요?</p>
          <Link
            to="/team/apply"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                       bg-blue-600 text-white text-sm font-black tracking-wide
                       hover:bg-blue-700 transition-colors"
          >
            운영진 지원하기
          </Link>
        </div>
      </section>

    </div>
  )
}
