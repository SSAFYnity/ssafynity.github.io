import { motion } from 'framer-motion'
import { Users, Globe, CalendarX, RefreshCw, Lock, Check, Minus } from 'lucide-react'
import { EVENT_KIND } from '@/data/constants'
import { HeroSection } from '@/components/HeroSection'
import { HeroLabel } from '@/components/HeroLabel'

const REGULAR_EVENTS = [
  {
    icon:  Users,
    type:  '동문친목',
    badge: 'Members Only',
    desc:  '동문들 간의 교류와 친목을 목적으로 열리는 행사입니다. 오직 동문회 회원만 참여할 수 있으며, 동문회의 정체성을 가장 잘 담고 있는 자리입니다.',
    tags:  ['정회원', '일반회원'],
  },
  {
    icon:  Globe,
    type:  '공개 IT',
    badge: 'Open to All',
    desc:  'IT 업계 종사자·관심자 누구나 참여할 수 있는 개방형 행사입니다. SSAFY 동문과 외부 IT 인재가 함께 교류하며 커뮤니티의 영역을 넓힙니다.',
    tags:  ['정회원', '일반회원', '외부인'],
  },
]

const ONGOING_FEATURES = [
  {
    icon:  RefreshCw,
    title: '최소 6주 간격',
    desc:  '정기적인 만남을 보장하기 위해 최소 6주에 한 번 이상 개최됩니다.',
  },
  {
    icon:  CalendarX,
    title: '정기행사 없는 달',
    desc:  '정기행사가 열리는 달에는 상시 행사를 진행하지 않습니다.',
  },
  {
    icon:  Lock,
    title: '정회원 전용',
    desc:  '상시 행사는 기본적으로 정회원만 참여할 수 있습니다. 극소수 공석에 한해 일반회원에게 개방될 수 있습니다.',
  },
]

const ELIGIBILITY = [
  {
    label: '정기 · 동문친목',
    member:   true,
    general:  true,
    outsider: false,
  },
  {
    label: '정기 · 공개 IT',
    member:   true,
    general:  true,
    outsider: true,
  },
  {
    label: '상시 행사',
    member:   true,
    general:  'partial' as const,
    outsider: false,
  },
]

function EligibilityCell({ value }: { value: boolean | 'partial' }) {
  if (value === true)      return <Check className="w-4 h-4 text-blue-500 mx-auto" />
  if (value === 'partial') return <span className="text-[10px] font-black text-amber-500 mx-auto block text-center">일부 공석</span>
  return <Minus className="w-4 h-4 text-slate-300 mx-auto" />
}

export default function EventsIntroducePage() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
<HeroSection
  sectionClassName="bg-white pt-24 pb-16 lg:pt-28 lg:pb-20 border-b border-slate-100"
  containerClassName="container mx-auto px-6 lg:px-12 max-w-3xl"
>
<HeroLabel>Events</HeroLabel>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-5">
              동문과 함께하는<br />
              <span className="text-blue-600">싸피니티의 행사</span>
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed break-keep max-w-lg">
              싸피니티는 동문 간의 교류와 성장을 위해 정기적으로 행사를 운영합니다.<br />
              행사의 종류와 참여 자격을 미리 확인해보세요.
            </p>
</HeroSection>

      {/* 정기 행사 */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Regular Events</p>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">정기 행사</h2>
            <p className="text-sm text-slate-500 leading-relaxed break-keep whitespace-pre-line">
              {EVENT_KIND.regular.desc}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {REGULAR_EVENTS.map(({ icon: Icon, type, badge, desc, tags }, i) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 shrink-0">{badge}</span>
                </div>
                <div>
                  <p className="text-base font-extrabold text-slate-900 mb-2">{type}</p>
                  <p className="text-sm text-slate-500 leading-relaxed break-keep">{desc}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-slate-100">
                  {tags.map(tag => (
                    <span key={tag} className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 상시 행사 */}
      <section className="bg-white py-16 lg:py-20 border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Ongoing Events</p>
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">상시 행사</h2>
            <p className="text-sm text-slate-500 leading-relaxed break-keep whitespace-pre-line">
              {EVENT_KIND.ongoing.desc}
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {ONGOING_FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-4 bg-slate-50 rounded-2xl border border-slate-100 px-6 py-4"
              >
                <Icon className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-extrabold text-slate-800 mb-0.5">{title}</p>
                  <p className="text-sm text-slate-500 leading-relaxed break-keep">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 참여 자격 */}
      <section className="bg-slate-50 py-16 lg:py-20 border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Eligibility</p>
            <h2 className="text-lg font-extrabold text-slate-900 mb-6">참여 자격</h2>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-6 py-4 text-xs font-black text-slate-500">행사 유형</th>
                    <th className="px-4 py-4 text-xs font-black text-slate-500 text-center">정회원</th>
                    <th className="px-4 py-4 text-xs font-black text-slate-500 text-center">일반회원</th>
                    <th className="px-4 py-4 text-xs font-black text-slate-500 text-center">외부인</th>
                  </tr>
                </thead>
                <tbody>
                  {ELIGIBILITY.map(({ label, member, general, outsider }, i) => (
                    <tr key={label} className={i < ELIGIBILITY.length - 1 ? 'border-b border-slate-100' : ''}>
                      <td className="px-6 py-4 font-extrabold text-slate-800 text-sm">{label}</td>
                      <td className="px-4 py-4"><EligibilityCell value={member} /></td>
                      <td className="px-4 py-4"><EligibilityCell value={general} /></td>
                      <td className="px-4 py-4"><EligibilityCell value={outsider} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed break-keep text-right">
              정회원은 모든 행사에 우선 신청 기회가 주어집니다. 자세한 신청 방법은 각 행사 공지를 확인해주세요.
            </p>
          </motion.div>
        </div>
      </section>


    </div>
  )
}
