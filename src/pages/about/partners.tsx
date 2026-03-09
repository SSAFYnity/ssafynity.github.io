import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Search } from 'lucide-react'
import { allPartners } from '@/data/computed'
import { PARTNER_TYPE_LABEL } from '@/data/constants'
import type { PartnerType } from '@/data/constants'
import { Container } from '@/components/Container'

import { HeroLabel } from '@/components/HeroLabel'
const TYPE_FILTERS: Array<{ key: PartnerType | 'all'; label: string }> = [
  { key: 'all',        label: '전체' },
  { key: 'founding',   label: PARTNER_TYPE_LABEL.founding   },
  { key: 'financial',  label: PARTNER_TYPE_LABEL.financial  },
  { key: 'goods',      label: PARTNER_TYPE_LABEL.goods      },
  { key: 'promotion',  label: PARTNER_TYPE_LABEL.promotion  },
  { key: 'talent',     label: PARTNER_TYPE_LABEL.talent     },
  { key: 'operations', label: PARTNER_TYPE_LABEL.operations },
]

function PartnerCard({ p }: { p: typeof allPartners[number] }) {
  const inactive = p.status === 'inactive'
  return (
    <motion.a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={{
        hidden:  { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={`group relative border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200
        ${inactive
          ? 'bg-slate-100 border-slate-200 hover:border-slate-300 hover:shadow-sm'
          : 'bg-white border-slate-200 hover:border-blue-200 hover:shadow-md'
        }`}
    >
      {/* 외부 링크 아이콘 */}
      <ExternalLink
        size={13}
        className={`absolute top-5 right-5 transition-opacity
          ${inactive ? 'text-slate-300' : 'text-slate-300 group-hover:text-blue-400'}`}
      />

      {/* 로고 */}
      <div className="h-12 flex items-center justify-center">
        {p.logo
          ? <img src={p.logo} alt={p.name} className={`h-full w-auto object-contain ${inactive ? 'grayscale opacity-50' : ''}`} />
          : <span className={`text-base font-black ${inactive ? 'text-slate-400' : 'text-slate-700'}`}>{p.name}</span>
        }
      </div>

      {/* 유형 뱃지 */}
      {(() => {
        const isFounding = (p.types as readonly string[]).includes('founding')
        const maxVisible = isFounding ? 1 : 2
        const visible = p.types.slice(0, maxVisible)
        const hidden  = p.types.slice(maxVisible)
        return (
          <div className="flex flex-wrap gap-1.5">
            {visible.map(t => (
              <span key={t} className="text-[10px] font-black tracking-widest uppercase
                             px-2.5 py-1 rounded-full bg-slate-200 text-slate-400">
                {PARTNER_TYPE_LABEL[t]}
              </span>
            ))}
            {hidden.length > 0 && (
              <span className="relative group/more cursor-default text-[10px] font-black
                               px-2.5 py-1 rounded-full bg-slate-200 text-slate-400">
                {isFounding ? '+ALL' : `+${hidden.length}`}
                <div className="absolute bottom-full left-0 mb-2 hidden group-hover/more:flex
                                flex-wrap gap-1.5 p-2.5 rounded-xl bg-white border border-slate-200
                                shadow-lg w-max max-w-[200px] z-10">
                  {hidden.map(t => (
                    <span key={t} className="text-[10px] font-black tracking-widest uppercase
                                   px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                      {PARTNER_TYPE_LABEL[t]}
                    </span>
                  ))}
                </div>
              </span>
            )}
          </div>
        )
      })()}

      {/* 설명 */}
      <p className={`text-sm leading-relaxed break-keep whitespace-pre-line ${inactive ? 'text-slate-400' : 'text-slate-500'}`}>{p.desc}</p>
    </motion.a>
  )
}

export default function AboutPartnersPage() {
  const [activeType, setActiveType] = useState<PartnerType | 'all'>('all')
  const [query, setQuery] = useState('')

  const keyword = query.trim().toLowerCase()
  const filtered = allPartners
    .filter(p => activeType === 'all' || (p.types as readonly string[]).includes(activeType))
    .filter(p => !keyword
      || p.name.toLowerCase().includes(keyword)
      || p.desc.toLowerCase().includes(keyword)
      || ('keywords' in p && (p.keywords as string[]).some(k => k.toLowerCase().includes(keyword)))
    )

  // 현재 먼저, 이전 뒤로
  const sorted = [
    ...filtered.filter(p => p.status === 'active'),
    ...filtered.filter(p => p.status === 'inactive'),
  ]

  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-white pt-24 pb-10 lg:pt-28 lg:pb-14">
                <Container maxWidth="5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroLabel>후원·협력사</HeroLabel>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-2">
              함께 만들어가는 공동체
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">
              Our Partners
            </p>
            <p className="text-sm text-slate-500 leading-relaxed break-keep">
              비영리 동문회인 싸피니티는 후원·협력사의 지원 덕분에 더 풍성한 행사와 혜택을 동문들에게 제공할 수 있습니다.
            </p>
          </motion.div>
                </Container>
      </section>

      {/* 협력사 그리드 */}
      <section className="bg-slate-50 pt-10 pb-20 lg:pt-14 lg:pb-28 border-t border-slate-100">
                <Container maxWidth="5xl">

          {/* 유형 필터 + 검색 */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
            <div className="flex flex-wrap gap-2">
              {TYPE_FILTERS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setActiveType(prev => prev === f.key ? 'all' : f.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wide transition-colors
                    ${activeType === f.key
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600'
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative sm:flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="협력사 검색"
                className="pl-8 pr-4 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200
                           text-slate-700 placeholder:text-slate-400 outline-none
                           focus:border-blue-300 transition-colors w-full"
              />
            </div>
          </div>

          {/* 협력사 그리드 */}
          {sorted.length > 0 && (
            <motion.div
              key={activeType}
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {sorted.map(p => <PartnerCard key={p.slug} p={p} />)}
            </motion.div>
          )}

          {/* 필터 결과 없음 */}
          {sorted.length === 0 && (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <p className="text-sm text-slate-400">해당 유형의 협력사가 아직 없습니다.</p>
              <a
                href="/join/inquiry"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full
                           bg-blue-600 text-white text-xs font-black tracking-wide
                           hover:bg-blue-700 transition-colors"
              >
                후원·제휴 문의하기
              </a>
            </div>
          )}

                </Container>
      </section>

    </div>
  )
}
