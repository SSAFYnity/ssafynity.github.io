import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Search, ChevronDown, Check, X } from 'lucide-react'
import { allPartners } from '@/data/computed'
import { PARTNER_TYPE_LABEL, PARTNER_CATEGORY } from '@/data/constants'
import type { PartnerCategory, PartnerType } from '@/data/constants'
import { Container } from '@/components/Container'
import { ResponsiveText } from '@/components/ResponsiveText'
import { collapseNewlines } from '@/lib/text'
import { HeroLabel } from '@/components/HeroLabel'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { SortDropdown } from '@/components/SortDropdown'
import { useDropdown } from '@/hooks/useDropdown'
import { useExpandableCard } from '@/hooks/useExpandableCard'

const ALL = '전체'

// ─── 상태 필터 ───────────────────────────────────────────────────────
type StatusFilter = 'all' | 'active' | 'inactive'
const STATUS_DEFAULT: StatusFilter = 'active'
const STATUS_LABELS: Record<StatusFilter, string> = {
  all:      '전체',
  active:   '현재',
  inactive: '이전',
}

// ─── 지원 범위 옵션 ──────────────────────────────────────────────────
const TYPE_OPTIONS: Array<{ key: PartnerType; label: string }> = [
  { key: 'financial',  label: PARTNER_TYPE_LABEL.financial  },
  { key: 'goods',      label: PARTNER_TYPE_LABEL.goods      },
  { key: 'promotion',  label: PARTNER_TYPE_LABEL.promotion  },
  { key: 'talent',     label: PARTNER_TYPE_LABEL.talent     },
  { key: 'operations', label: PARTNER_TYPE_LABEL.operations },
]

// ─── 정렬 ────────────────────────────────────────────────────────────
type SortKey = 'name-asc' | 'period-desc' | 'period-asc'
const SORT_DEFAULT: SortKey = 'name-asc'
const SORT_OPTIONS: Array<{ key: SortKey; label: string }> = [
  { key: 'name-asc',    label: '가나다순'        },
  { key: 'period-desc', label: '최신 파트너 먼저' },
  { key: 'period-asc',  label: '오래된 파트너 먼저' },
]

const CATEGORY_KEYS: PartnerCategory[] = ['founding', 'sponsor', 'alliance']

// ─── 상태 단일 선택 드롭다운 ─────────────────────────────────────────
function StatusDropdown({
  status,
  onChange,
}: {
  status: StatusFilter
  onChange: (v: StatusFilter) => void
}) {
  const { open, setOpen, ref } = useDropdown<HTMLDivElement>()
  const isFiltered = status !== 'all'  // '전체'가 아닐 때 파란 활성 스타일

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 pl-3.5 pr-2.5 py-1.5 rounded-full text-xs font-black border transition-colors ${
          isFiltered
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
        }`}
      >
        {STATUS_LABELS[status]}
        <ChevronDown size={11} className={isFiltered ? 'text-blue-200' : 'text-slate-400'} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-20 w-max py-1">
          {(['all', 'active', 'inactive'] as StatusFilter[]).map(key => (
            <button
              key={key}
              onClick={() => { onChange(key); setOpen(false) }}
              className={`flex items-center gap-2 w-full px-3.5 py-2 text-xs hover:bg-slate-50 transition-colors whitespace-nowrap ${
                status === key ? 'font-black text-blue-600' : 'font-medium text-slate-600'
              }`}
            >
              <span className="w-3 flex items-center justify-center shrink-0">
                {status === key && <Check size={9} />}
              </span>
              {STATUS_LABELS[key]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── 파트너 분류 단일 선택 드롭다운 ──────────────────────────────────
function CategoryDropdown({
  category,
  onChange,
}: {
  category: PartnerCategory | typeof ALL
  onChange: (v: PartnerCategory | typeof ALL) => void
}) {
  const { open, setOpen, ref } = useDropdown<HTMLDivElement>()

  const active = category !== ALL

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 pl-3.5 pr-2.5 py-1.5 rounded-full text-xs font-black border transition-colors ${
          active
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
        }`}
      >
        {active ? PARTNER_CATEGORY[category as PartnerCategory].label : '파트너 분류'}
        <ChevronDown size={11} className={active ? 'text-blue-200' : 'text-slate-400'} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-20 w-max py-1">
          <button
            onClick={() => { onChange(ALL); setOpen(false) }}
            className={`flex items-center gap-2 w-full px-3.5 py-2 text-xs hover:bg-slate-50 transition-colors whitespace-nowrap ${
              category === ALL ? 'font-black text-blue-600' : 'font-medium text-slate-600'
            }`}
          >
            <span className="w-3 flex items-center justify-center shrink-0">
              {category === ALL && <Check size={9} />}
            </span>
            전체
          </button>
          {CATEGORY_KEYS.map(key => (
            <button
              key={key}
              onClick={() => { onChange(key); setOpen(false) }}
              className={`flex items-center gap-2 w-full px-3.5 py-2 text-xs hover:bg-slate-50 transition-colors whitespace-nowrap ${
                category === key ? 'font-black text-blue-600' : 'font-medium text-slate-600'
              }`}
            >
              <span className="w-3 flex items-center justify-center shrink-0">
                {category === key && <Check size={9} />}
              </span>
              {PARTNER_CATEGORY[key].label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── 파트너 카드 ──────────────────────────────────────────────────────
function PartnerCard({ p }: { p: typeof allPartners[number] }) {
  const inactive     = p.status === 'inactive'
  const isFounding   = p.category === 'founding'
  const displayTypes = p.types.filter(t => t !== 'founding')
  const badgeVisible = isFounding ? [] : displayTypes.slice(0, 2)
  const badgeHidden  = isFounding ? displayTypes : displayTypes.slice(2)

  const { expanded, isOverflow, wrapperStyle, descRef, cardRef, toggle } = useExpandableCard<HTMLDivElement>()

  // 그리드 셀: 확장 시 collapsed 높이로 고정해 레이아웃 유지
  return (
    <div className="relative" style={wrapperStyle}>
      <motion.div
        ref={cardRef}
        variants={{
          hidden:  { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
        }}
        className={`group overflow-hidden border rounded-2xl flex flex-col transition-all duration-200
          ${expanded ? 'absolute inset-x-0 top-0 z-20 shadow-xl' : ''}
          ${inactive
            ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
            : `bg-white ${expanded ? 'border-blue-300' : 'border-slate-200 hover:border-blue-200 hover:shadow-md'}`
          }`}
      >
        {/* ── 상단: 로고 영역 ── */}
        <div className={`relative flex items-center justify-center h-28
          ${inactive ? 'bg-slate-100' : 'bg-slate-50'}`}>

          {/* 배지 - 우측 상단 오버레이 */}
          <div className="absolute top-3 right-3 flex flex-row items-center flex-wrap justify-end gap-1">
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${PARTNER_CATEGORY[p.category].style}`}>
              {PARTNER_CATEGORY[p.category].label}
            </span>
            {badgeVisible.map(t => (
              <span key={t} className="text-[10px] font-black tracking-widest uppercase
                             px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-400">
                {PARTNER_TYPE_LABEL[t]}
              </span>
            ))}
            {badgeHidden.length > 0 && (
              <span className="relative group/more cursor-default text-[10px] font-black
                               px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-400">
                {isFounding ? '+ALL' : `+${badgeHidden.length}`}
                <div className="absolute top-full right-0 mt-1 hidden group-hover/more:flex
                                flex-col items-end gap-1 p-2 rounded-xl bg-white border border-slate-200
                                shadow-lg z-10">
                  {badgeHidden.map(t => (
                    <span key={t} className="text-[10px] font-black tracking-widest uppercase
                                   px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 whitespace-nowrap">
                      {PARTNER_TYPE_LABEL[t]}
                    </span>
                  ))}
                </div>
              </span>
            )}
          </div>

          {/* 로고 */}
          {p.logo
            ? <img
                src={p.logo}
                alt={p.name}
                className={`h-20 sm:h-24 w-auto object-contain max-w-[90%] ${inactive ? 'grayscale opacity-40' : ''}`}
              />
            : <span className={`text-base font-black px-10 text-center leading-snug
                ${inactive ? 'text-slate-400' : 'text-slate-700'}`}>
                {p.name}
              </span>
          }
        </div>

        {/* ── 하단: 콘텐츠 영역 ── */}
        <div className="flex flex-col gap-2.5 px-5 pt-4 pb-5">

          {/* 회사명 */}
          <p className={`text-sm font-black leading-snug
            ${inactive ? 'text-slate-400' : 'text-slate-800'}`}>
            {p.name}
          </p>

          {/* 설명 */}
          <p
            ref={descRef}
            className={`text-sm leading-relaxed break-keep
              ${expanded ? '' : 'line-clamp-2'}
              ${inactive ? 'text-slate-400' : 'text-slate-500'}`}
          >
            {expanded ? <ResponsiveText text={p.desc} /> : collapseNewlines(p.desc)}
          </p>

          {/* 기간(왼쪽) + 더보기·접기 + 링크 아이콘(오른쪽) */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <p className="text-[11px] font-medium text-slate-400">
              {p.period
                ? `${p.period.start} ~ ${p.period.end ?? '현재'}`
                : '싸피니티와 함께합니다'
              }
            </p>
            <div className="flex items-center gap-2 shrink-0">
              {(isOverflow || expanded) && (
                <button
                  onClick={toggle}
                  className="text-[11px] font-medium text-slate-400 hover:text-blue-500 transition-colors"
                >
                  {expanded ? '접기' : '더보기'}
                </button>
              )}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                aria-label="사이트 열기"
                className="inline-flex"
              >
                <ExternalLink
                  size={12}
                  className={`transition-colors
                    ${inactive ? 'text-slate-300' : 'text-slate-300 group-hover:text-blue-400'}`}
                />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── 페이지 ──────────────────────────────────────────────────────────
export default function AboutPartnersPage() {
  const [query,          setQuery]          = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [status,         setStatus]         = useState<StatusFilter>(STATUS_DEFAULT)
  const [category,       setCategory]       = useState<PartnerCategory | typeof ALL>(ALL)
  const [types,          setTypes]          = useState<PartnerType[]>([])
  const [sort,           setSort]           = useState<SortKey>(SORT_DEFAULT)

  const submitSearch = () => setSubmittedQuery(query.trim())

  const kw = submittedQuery.toLowerCase()
  const filtered = allPartners
    .filter(p => status === 'all' || p.status === status)
    .filter(p => category === ALL || p.category === category)
    .filter(p => types.length === 0 || types.some(t => (p.types as readonly string[]).includes(t)))
    .filter(p =>
      !kw
      || p.name.toLowerCase().includes(kw)
      || p.desc.toLowerCase().includes(kw)
      || ('keywords' in p && (p.keywords as string[]).some(k => k.toLowerCase().includes(kw)))
    )

  // inactive는 어떤 정렬에서도 항상 뒤로
  const compareFn = (a: typeof filtered[number], b: typeof filtered[number]) => {
    if (sort === 'name-asc') return a.name.localeCompare(b.name, 'ko')
    // period 기준 — period 없는 항목은 항상 뒤로
    const aS = a.period?.start ?? ''
    const bS = b.period?.start ?? ''
    if (!aS && !bS) return 0
    if (!aS) return 1
    if (!bS) return -1
    return sort === 'period-desc' ? bS.localeCompare(aS) : aS.localeCompare(bS)
  }
  const sorted = [
    ...filtered.filter(p => p.status === 'active').sort(compareFn),
    ...filtered.filter(p => p.status === 'inactive').sort(compareFn),
  ]

  const hasFilter = status !== STATUS_DEFAULT || category !== ALL || types.length > 0 || submittedQuery !== ''
  const resetAll  = () => { setStatus(STATUS_DEFAULT); setCategory(ALL); setTypes([]); setQuery(''); setSubmittedQuery('') }

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
            <div className="flex items-end justify-between gap-4">
              <p className="text-sm text-slate-500 leading-relaxed break-keep text-pretty max-w-xl">
                <ResponsiveText text={'SSAFYnity와 함께해주신 파트너를 소개합니다.\n분류와 지원 범위를 선택해 협력 형태를 확인할 수 있습니다.'} />
              </p>
              <a
                href="/join/partnership"
                className="text-xs font-black text-blue-600 hover:text-blue-700 transition-colors shrink-0 pb-0.5"
              >
                후원 · 협력사 문의 →
              </a>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 협력사 그리드 */}
      <section className="bg-slate-50 pt-10 pb-20 lg:pt-14 lg:pb-28 border-t border-slate-100">
        <Container maxWidth="5xl">

          {/* 필터 카드 */}
          <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 flex flex-col mb-8">
            <div className="flex flex-wrap items-center gap-2">

              {/* 상태 + 파트너 분류 + 지원 범위 (같은 행 유지) */}
              <div className="flex items-center gap-2">
                <StatusDropdown status={status} onChange={setStatus} />
                <CategoryDropdown category={category} onChange={setCategory} />
                <MultiSelectDropdown label="지원 범위" options={TYPE_OPTIONS} selected={types} onChange={setTypes} />
              </div>

              {/* 구분선 */}
              <div className="hidden sm:block w-px h-5 bg-slate-200 mx-1" />

              {/* 검색 */}
              <div className="flex items-center gap-1.5 flex-1 min-w-[140px]">
                <div className="relative flex-1">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && submitSearch()}
                    placeholder="협력사 검색"
                    className="pl-7 pr-4 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200
                               text-slate-700 placeholder:text-slate-400 outline-none
                               focus:border-blue-300 transition-colors w-full"
                  />
                </div>
                <button
                  onClick={submitSearch}
                  className="flex items-center gap-1 pl-3 pr-3.5 py-1.5 rounded-full text-xs font-black bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0"
                >
                  <Search size={11} /> 검색
                </button>
              </div>

              {/* 구분선 */}
              <div className="hidden sm:block w-px h-5 bg-slate-200 mx-1" />

              {/* 정렬 */}
              <SortDropdown options={SORT_OPTIONS} value={sort} defaultKey={SORT_DEFAULT} onChange={setSort} />

              {/* 초기화 */}
              {hasFilter && (
                <button
                  onClick={resetAll}
                  className="text-[10px] font-black text-slate-400 hover:text-blue-500 transition-colors shrink-0"
                >
                  초기화
                </button>
              )}
            </div>

            {/* 활성 필터 배지 */}
            {hasFilter && (
              <div className="flex flex-wrap gap-1.5 pt-2.5 mt-2.5 border-t border-slate-100">
                {status !== STATUS_DEFAULT && (
                  <span className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600">
                    {STATUS_LABELS[status]}
                    <button onClick={() => setStatus(STATUS_DEFAULT)} className="flex items-center hover:text-blue-800 transition-colors">
                      <X size={9} />
                    </button>
                  </span>
                )}
                {category !== ALL && (
                  <span className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600">
                    {PARTNER_CATEGORY[category as PartnerCategory].label}
                    <button onClick={() => setCategory(ALL)} className="flex items-center hover:text-blue-800 transition-colors">
                      <X size={9} />
                    </button>
                  </span>
                )}
                {types.map(t => (
                  <span key={t} className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600">
                    {PARTNER_TYPE_LABEL[t]}
                    <button onClick={() => setTypes(types.filter(v => v !== t))} className="flex items-center hover:text-blue-800 transition-colors">
                      <X size={9} />
                    </button>
                  </span>
                ))}
                {submittedQuery && (
                  <span className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600">
                    {submittedQuery}
                    <button onClick={() => { setQuery(''); setSubmittedQuery('') }} className="flex items-center hover:text-blue-800 transition-colors">
                      <X size={9} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* 협력사 그리드 */}
          {sorted.length > 0 && (
            <motion.div
              key={`${status}-${category}-${types.join(',')}-${submittedQuery}`}
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
              <p className="text-sm text-slate-400">해당 조건의 협력사가 아직 없습니다.</p>
              <a
                href="/join/partnership"
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


