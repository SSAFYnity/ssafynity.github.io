import { Link } from 'react-router-dom'
import { ArrowRight, Star, Heart, Trophy, Zap, Users, MessageCircle, Globe, BookOpen, Smile, BadgeCheck } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { siteData } from '@/data/siteData'
import { computed, allPartners } from '@/data/computed'

const STATS = [
  { label: '함께하는 동문', value: computed.totalMembers,    suffix: '명' },
  { label: '정회원',        value: siteData.stats[0].value, suffix: siteData.stats[0].suffix },
  { label: '누적 행사 횟수', value: computed.totalEvents,    suffix: '회' },
  { label: '운영 연수',     value: computed.operationYears, suffix: '년' },
]

const FEATURES = [
  {
    icon: Globe,
    iconBg: 'bg-blue-500',
    title: '네트워크 확장',
    desc: '전국 수료생들과 연결되고 현업 동문 네트워크를 넓혀가세요. 기수와 지역을 넘어 이어지는 관계.',
    to: '/community/sns',
  },
  {
    icon: Trophy,
    iconBg: 'bg-violet-400',
    title: '기술적 교류',
    desc: '세미나, 스터디, 행사를 통해 함께 성장하는 기회를 만들어가세요. 배움은 수료 이후에도 계속됩니다.',
    to: '/events/upcoming',
  },
  {
    icon: Zap,
    iconBg: 'bg-emerald-400',
    title: '운영진 기여',
    desc: '싸피니티를 직접 만들어가는 운영진으로 합류해보세요. 받은 도움을 다음 기수에게 되돌려주는 선순환.',
    to: '/team/apply',
  },
  {
    icon: BookOpen,
    iconBg: 'bg-rose-400',
    title: '동아리 활동',
    desc: '알고리즘, 독서, 사이드 프로젝트까지 — 관심사가 같은 동문들과 함께하는 소모임을 만들어가세요.',
    to: '/clubs',
  },
  {
    icon: Smile,
    iconBg: 'bg-amber-400',
    title: '친목 행사',
    desc: '운동회, 포트락 파티, SSAFYnale까지. 함께 웃고 즐기는 자리가 우리를 더 단단하게 만듭니다.',
    to: '/events/archive',
  },
  {
    icon: BadgeCheck,
    iconBg: 'bg-sky-500',
    title: '정회원 혜택',
    desc: '연회비를 납부한 정회원에게는 모든 행사 무료 입장, 최우선 공지, 전용 굿즈 등 특별한 혜택이 주어집니다.',
    to: '/join/benefits',
  },
]

function PartnerCard({ p }: { p: typeof allPartners[number] }) {
  return (
    <div className="flex flex-col items-center gap-3 w-40 shrink-0">
      <div className="w-full h-20 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
        {p.logo
          ? <img src={p.logo} alt={p.name} className="max-h-10 max-w-[120px] object-contain" />
          : <span className="text-xs text-slate-400 font-bold">LOGO</span>
        }
      </div>
      <span className="text-[11px] text-slate-500 font-bold text-center leading-tight">{p.name}</span>
    </div>
  )
}

const containerVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12 } },
}
const itemVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center" style={{ backgroundColor: '#edf1f8' }}>

        <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10 py-28 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* 왼쪽: 텍스트 */}
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              {/* 배지 */}
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-slate-400/50 text-slate-600 rounded-full mb-10 bg-white/40">
                  <span className="text-[10px] font-black uppercase tracking-widest">✦ SSAFY 수료생 동문 네트워크</span>
                </div>
              </motion.div>

              {/* 타이틀 */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.06] mb-8"
              >
                <span className="text-slate-900">우리의 이야기가</span><br />
                <span className="text-blue-600">계속되는 공간</span>
              </motion.h1>

              {/* 서브카피 */}
              <motion.p
                variants={itemVariants}
                className="text-base text-slate-600 leading-relaxed max-w-md mb-10"
              >
                {siteData.brand.slogan}.<br />
                서로의 성장을 돕는 가장{' '}
                <strong className="text-slate-800 font-semibold">안정적이고 전문적인</strong> 커뮤니티입니다.
              </motion.p>

              {/* CTA */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/about/story"
                  className="px-7 py-4 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-blue-200"
                >
                  싸피니티란?
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/community/sns"
                  className="px-7 py-4 border-2 border-slate-800 text-slate-800 rounded-xl font-bold text-sm hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center"
                >
                  커뮤니티 둘러보기
                </Link>
              </motion.div>
            </motion.div>

            {/* 오른쪽: 플로팅 카드 */}
            <div className="hidden lg:block relative h-[420px]">

              {/* 중심 큰 원 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[148px] h-[148px] bg-teal-400 rounded-full flex items-center justify-center shadow-2xl"
              >
                <Users size={60} className="text-white" strokeWidth={1.5} />
              </motion.div>

              {/* 핑크 하트 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, rotate: -5 }}
                transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[10%] right-[18%] w-[76px] h-[76px] bg-pink-300 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Heart size={32} className="text-white" strokeWidth={1.8} />
              </motion.div>

              {/* 노란 별 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, rotate: 6 }}
                transition={{ duration: 0.65, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[3%] right-[2%] w-[76px] h-[76px] bg-amber-300 rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Star size={32} className="text-white" strokeWidth={1.8} />
              </motion.div>

              {/* 보라 트로피 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, rotate: -3 }}
                transition={{ duration: 0.65, delay: 0.50, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[35%] left-[6%] w-[64px] h-[64px] bg-violet-400 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Trophy size={26} className="text-white" strokeWidth={1.8} />
              </motion.div>

              {/* 초록 번개 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, rotate: 4 }}
                transition={{ duration: 0.65, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-[26%] left-[18%] w-[64px] h-[64px] bg-emerald-400 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Zap size={26} className="text-white" strokeWidth={1.8} />
              </motion.div>

              {/* 흰 말풍선 */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, rotate: 3 }}
                transition={{ duration: 0.65, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-[12%] right-[12%] w-[76px] h-[76px] bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100"
              >
                <MessageCircle size={30} className="text-slate-400" strokeWidth={1.8} />
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-20 lg:py-28 border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row"
          >
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="flex-1 py-8 sm:py-0 sm:px-10 border-b last:border-b-0 sm:border-b-0 sm:border-l sm:first:border-l-0 sm:first:pl-0 border-slate-200"
              >
                <span className="text-[11px] font-black uppercase tracking-widest text-blue-600/60 block mb-2">
                  {stat.label}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-5xl font-black text-slate-900">{stat.value}</span>
                  <span className="text-xl font-bold text-slate-400">{stat.suffix}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="bg-white py-20 lg:py-28 border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

          {/* 섹션 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-full mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest">Our Ecosystem</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              동료들과 함께 만드는<br />
              <span className="text-blue-600">성장 생태계</span>
            </h2>
          </motion.div>

          {/* 카드 그리드 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }}
              >
                <Link
                  to={f.to}
                  className="group flex flex-col h-full bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon size={22} className="text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-3">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">{f.desc}</p>
                  <div className="flex items-center gap-1.5 mt-6 text-blue-600 text-sm font-bold group-hover:gap-2.5 transition-all duration-300">
                    자세히 보기 <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Partners */}
      <section className="bg-slate-50 py-20 lg:py-28 border-t border-slate-100">

        {/* 섹션 헤더 — 중앙 정렬 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 px-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-full mb-5">
            <span className="text-[10px] font-black uppercase tracking-widest">후원 · 협력사</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            우리의 비전에 공감하는<br />
            <span className="text-blue-600">후원·협력사</span>
          </h2>
        </motion.div>

        {/* 파트너 로고 목록 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={allPartners.length >= 6 ? 'relative overflow-hidden' : 'container mx-auto px-6 lg:px-12 max-w-7xl'}
        >
          {allPartners.length >= 6 ? (
            <>
              {/* 좌우 페이드 */}
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="flex gap-6 w-max py-4"
              >
                {[...allPartners, ...allPartners, ...allPartners, ...allPartners].map((p, i) => (
                  <PartnerCard key={i} p={p} />
                ))}
              </motion.div>
            </>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 py-4">
              {allPartners.map((p, i) => (
                <PartnerCard key={i} p={p} />
              ))}
            </div>
          )}
        </motion.div>

        {/* 파트너십 자세히 보기 */}
        <div className="text-center mt-10">
          <Link
            to="/about/partners"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            후원·협력사 자세히 보기 <ArrowRight size={14} />
          </Link>
        </div>

      </section>

    </div>
  )
}
