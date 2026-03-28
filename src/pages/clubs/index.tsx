import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, ChevronDown, Check, X } from 'lucide-react'
import { allClubs } from '@/data/computed'
import { CLUB_CATEGORIES, CLUB_CATEGORY_KEYS, MODE_CONFIG, type ClubCategoryKey, type ModeKey } from '@/data/constants'
import type { Club } from '@/data/computed'
import { Container } from '@/components/Container'
import { MultiSelectDropdown } from '@/components/MultiSelectDropdown'
import { SortDropdown } from '@/components/SortDropdown'
import { SearchBar } from '@/components/SearchBar'
import { useDropdown } from '@/hooks/useDropdown'
import { formatClubSince } from '@/lib/utils'

import { Card } from '@/components/Card'
import { HeroLabel } from '@/components/HeroLabel'
const ALL = '전체'


const MODE_OPTIONS: Array<{ key: ModeKey; label: string }> = [
  { key: 'online',  label: MODE_CONFIG.online.label },
  { key: 'offline', label: MODE_CONFIG.offline.label },
]

// ─── 정렬 ────────────────────────────────────────────
type SortKey = 'name-asc' | 'member-desc' | 'member-asc' | 'since-desc' | 'since-asc'

const SORT_DEFAULT: SortKey = 'name-asc'

const SORT_OPTIONS: Array<{ key: SortKey; label: string }> = [
  { key: "name-asc",    label: "가나다순" },
  { key: "member-desc", label: "멤버 많은 순" },
  { key: "member-asc",  label: "멤버 적은 순" },
  { key: "since-desc",  label: "개설 최신순" },
  { key: "since-asc",   label: "개설 오래된 순" },
]

function applySortKey(clubs: Club[], sort: SortKey): Club[] {
  return [...clubs].sort((a, b) => {
    switch (sort) {
      case 'name-asc':    return a.name.localeCompare(b.name, 'ko')
      case 'member-desc': return b.memberCount - a.memberCount
      case 'member-asc':  return a.memberCount - b.memberCount
      case 'since-desc':  return b.since.localeCompare(a.since)
      case 'since-asc':   return a.since.localeCompare(b.since)
    }
  })
}

// ─── 카테고리 드롭다운 ────────────────────────────────

function CategoryDropdown({
  category,
  onChange,
}: {
  category: ClubCategoryKey | typeof ALL
  onChange: (v: ClubCategoryKey | typeof ALL) => void
}) {
  const { open, setOpen, ref } = useDropdown<HTMLDivElement>()
  const active = category !== ALL

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 pl-3.5 pr-2.5 py-2 sm:py-1.5 rounded-full text-sm sm:text-xs font-black border transition-colors ${
          active
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
        }`}
      >
        {active ? CLUB_CATEGORIES[category as ClubCategoryKey].label : '카테고리'}
        <ChevronDown size={11} className={active ? 'text-blue-200' : 'text-slate-400'} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-20 w-[min(20rem,calc(100vw-2rem))] sm:w-max py-1">
          <button
            onClick={() => { onChange(ALL); setOpen(false) }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors whitespace-normal sm:whitespace-nowrap"
          >
            <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors shrink-0 ${
              category === ALL ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
            }`}>
              {category === ALL && <Check size={9} className="text-white" />}
            </span>
            {ALL}
          </button>
          {CLUB_CATEGORY_KEYS.map(key => (
            <button
              key={key}
              onClick={() => { onChange(key); setOpen(false) }}
              className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors whitespace-normal sm:whitespace-nowrap"
            >
              <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                category === key ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
              }`}>
                {category === key && <Check size={9} className="text-white" />}
              </span>
              {CLUB_CATEGORIES[key].label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── 페이지 ────────────────────────────────────────────

export default function ClubsPage() {
  const [query,          setQuery]          = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [category,       setCategory]       = useState<ClubCategoryKey | typeof ALL>(ALL)
  const [modes,          setModes]          = useState<ModeKey[]>([])
  const [sort,           setSort]           = useState<SortKey>(SORT_DEFAULT)

  const submitSearch = () => setSubmittedQuery(query.trim())

  const q = submittedQuery.toLowerCase()
  const displayed = applySortKey(
    allClubs.filter(club => {
      if (category !== ALL && club.category !== category) return false
      if (modes.length > 0 && (club.modes == null || !modes.some(m => club.modes!.includes(m)))) return false
      if (!q) return true
      return (
        club.name.toLowerCase().includes(q) ||
        club.shortDesc.toLowerCase().includes(q) ||
        club.keywords?.some(k => k.toLowerCase().includes(q))
      )
    }),
    sort,
  )

  const resetAll = () => { setCategory(ALL); setModes([]); setQuery(''); setSubmittedQuery(''); setSort(SORT_DEFAULT) }
  const hasFilter = category !== ALL || modes.length > 0 || !!submittedQuery

  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-white pt-24 pb-10 lg:pt-28 lg:pb-14 border-b border-slate-100">
                <Container maxWidth="5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroLabel>Clubs</HeroLabel>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-2">
              동문들이 만드는
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">
              정식 동아리
            </p>
            <p className="text-sm text-slate-500 leading-relaxed break-keep text-pretty max-w-xl">
              SSAFYnity 공식 소속 동아리 목록입니다. 관심 있는 동아리에 직접 연락해 가입해보세요.
            </p>
          </motion.div>
                </Container>
      </section>

      {/* 紐⑸줉 */}
      <section className="bg-slate-50 pt-6 pb-20 lg:pt-8 lg:pb-24">
                <Container maxWidth="5xl">

          {allClubs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-sm font-extrabold text-slate-700">등록된 정식 동아리가 없습니다.</p>
              <p className="text-sm text-slate-400 break-keep">첫 번째 동아리를 만들어보세요.</p>
              <Link
                to="/clubs/apply"
                className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-black hover:bg-blue-700 transition-colors"
              >
                동아리 신청하기
              </Link>
            </motion.div>
          ) : (
            <>
              {/* ?꾪꽣 移대뱶 */}
              <div className="sticky sm:static top-[calc(4.5rem+env(safe-area-inset-top))] z-40 bg-white border border-slate-200 rounded-2xl px-4 py-3 flex flex-col mb-5 shadow-sm sm:shadow-none">

                {/* 而⑦듃濡???*/}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:overflow-visible sm:flex-nowrap sm:pb-0 sm:mx-0 sm:px-0">
                  <CategoryDropdown category={category} onChange={setCategory} />
                  <MultiSelectDropdown
                    label="활동 형태"
                    options={MODE_OPTIONS}
                    selected={modes}
                    onChange={setModes}
                  />
                  <SortDropdown options={SORT_OPTIONS} value={sort} defaultKey={SORT_DEFAULT} onChange={setSort} />
                  <div className="min-w-[14rem] flex-1">
                    <SearchBar value={query} onChange={setQuery} onSubmit={submitSearch} placeholder="동아리 검색" />
                  </div>
                  {hasFilter && (
                    <button
                      onClick={resetAll}
                      className="text-[10px] font-black text-slate-400 hover:text-blue-500 transition-colors shrink-0"
                    >
                      초기화
                    </button>
                  )}
                </div>
                {hasFilter && (
                  <div className="flex flex-wrap gap-1.5 pt-2.5 mt-2.5 border-t border-slate-100">
                    {category !== ALL && (
                      <span className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600">
                        {CLUB_CATEGORIES[category as ClubCategoryKey].label}
                        <button onClick={() => setCategory(ALL)} className="flex items-center hover:text-blue-800 transition-colors">
                          <X size={9} />
                        </button>
                      </span>
                    )}
                    {modes.map(m => (
                      <span key={m} className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600">
                        {MODE_CONFIG[m].label}
                        <button onClick={() => setModes(modes.filter(v => v !== m))} className="flex items-center hover:text-blue-800 transition-colors">
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

              {/* 移대뱶 洹몃━??*/}
              {displayed.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-24 text-center">
                  <p className="text-sm text-slate-400">조건에 맞는 동아리가 없습니다.</p>
                  <button
                    onClick={resetAll}
                    className="text-xs font-black text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    필터 초기화
                  </button>
                </div>
              ) : (
                <motion.div
                  key={`${category}-${modes.join(',')}-${submittedQuery}-${sort}`}
                  initial="hidden"
                  animate="visible"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {displayed.map(club => (
                    <motion.div
                      key={club.slug}
                      variants={{
                        hidden:  { opacity: 0, y: 16 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      <Card
                        as={Link}
                        to={`/clubs/${club.slug}`}
                        className="flex flex-col gap-4 bg-white rounded-2xl border border-slate-100 p-6 h-full hover:border-blue-200 hover:shadow-sm transition-all"
                      >
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                            {CLUB_CATEGORIES[club.category].label}
                          </span>
                          {club.modes?.map(m => (
                            <span key={m} className={`text-[10px] font-black px-2.5 py-1 rounded-full ${MODE_CONFIG[m].className}`}>
                              {MODE_CONFIG[m].label}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-col gap-1.5 flex-1">
                          <p className="text-base font-extrabold text-slate-900">{club.name}</p>
                          <p className="text-sm text-slate-500 leading-relaxed break-keep text-pretty max-w-xl">{club.shortDesc}</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <span>{formatClubSince(club.since)} 개설</span>
                          <span>·</span>
                          <span>{club.memberCount}명</span>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
                </Container>
      </section>

    </div>
  )
}
