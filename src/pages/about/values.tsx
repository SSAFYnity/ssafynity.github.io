import { Globe, Heart, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteData } from '@/data/siteData'
import { Container } from '@/components/Container'
import { ResponsiveText } from '@/components/ResponsiveText'
import { withBaseAsset } from '@/lib/asset'

import { HeroLabel } from '@/components/HeroLabel'
const ICON_MAP = {
  globe:         Globe,
  'trending-up': TrendingUp,
  heart:         Heart,
}

const ICON_STYLE = {
  globe:         { bg: 'bg-blue-500',    ring: 'ring-blue-100',    text: 'text-blue-500'    },
  'trending-up': { bg: 'bg-emerald-500', ring: 'ring-emerald-100', text: 'text-emerald-500' },
  heart:         { bg: 'bg-rose-400',    ring: 'ring-rose-100',    text: 'text-rose-400'    },
}

const ORBIT_POS = [
  { top: 'calc(12% - 32px)', left: 'calc(50% - 32px)' },  // 연결  (0°)
  { top: 'calc(69% - 32px)', left: 'calc(17% - 32px)' },  // 성장  (240°)
  { top: 'calc(69% - 32px)', left: 'calc(83% - 32px)' },  // 자발적 기여 (120°)
]

function ValueDescription({ desc }: { desc: string }) {
  const parts = desc.split('. ')
  if (parts.length <= 1) return <>{desc}</>

  return (
    <>
      {parts.map((part, idx) => {
        const text = idx < parts.length - 1 ? `${part}.` : part
        return (
          <span key={idx} className="block sm:inline">
            {idx > 0 && <span className="hidden sm:inline"> </span>}
            {text}
          </span>
        )
      })}
    </>
  )
}

export default function AboutValuesPage() {
  return (
    <div className="flex flex-col">

      <section className="bg-white pt-28 pb-24 lg:pt-36 lg:pb-32">
                <Container maxWidth="5xl">

          {/* 제목 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 lg:mb-20"
          >
            <HeroLabel>가치관</HeroLabel>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-2">
              싸피니티가 추구하는 것
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600">
              Our Values
            </p>
          </motion.div>

          {/* Orbit 다이어그램 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-square w-full max-w-[360px] mb-16"
          >
            {/* 궤도 링 */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50" cy="50" r="38"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="0.6"
                strokeDasharray="2 1.5"
              />
            </svg>

            {/* 중앙 로고 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                            px-4 py-3 rounded-2xl bg-white
                            shadow-md shadow-slate-200/60 border border-slate-100">
              <img src={withBaseAsset('/logo-rect.png')} alt="SSAFYnity" className="h-10 w-auto" />
            </div>

            {/* 가치관 노드 */}
            {siteData.values.map((v, i) => {
              const Icon  = ICON_MAP[v.icon as keyof typeof ICON_MAP]
              const style = ICON_STYLE[v.icon as keyof typeof ICON_STYLE]
              return (
                <div
                  key={v.title}
                  className="absolute flex flex-col items-center gap-2"
                  style={ORBIT_POS[i]}
                >
                  <div className={`w-16 h-16 rounded-full ${style.bg} ring-4 ${style.ring}
                                   flex items-center justify-center shadow-md`}>
                    <Icon size={26} className="text-white" strokeWidth={1.8} />
                  </div>
                  <span className="text-sm font-black text-slate-700 whitespace-nowrap">
                    {v.title}
                  </span>
                </div>
              )
            })}
          </motion.div>

          {/* 비전 선언문 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <p className="text-[3rem] leading-none font-black text-blue-100 select-none">"</p>
            <p className="text-lg md:text-xl font-bold text-slate-700 leading-relaxed max-w-xl mx-auto -mt-3 break-keep text-pretty">
              <ResponsiveText text={siteData.brand.vision} />
            </p>
            <div className="mt-6 w-8 h-0.5 bg-blue-300 mx-auto" />
            <p className="mt-4 text-[10px] font-black text-slate-400 tracking-[0.25em] uppercase">
              SSAFYnity Vision
            </p>
          </motion.div>

          {/* 설명 텍스트 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {siteData.values.map((v) => {
              const Icon  = ICON_MAP[v.icon as keyof typeof ICON_MAP]
              const style = ICON_STYLE[v.icon as keyof typeof ICON_STYLE]
              return (
                <motion.div
                  key={v.title}
                  variants={{
                    hidden:  { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="text-left sm:text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 mb-4">
                    <Icon size={22} className={style.text} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-black text-slate-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed break-keep text-pretty"><ValueDescription desc={v.desc} /></p>
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </section>

    </div>
  )
}
