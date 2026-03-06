import { useState, useMemo, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, MapPin, CalendarDays, ChevronRight, ChevronLeft, ChevronDown, Check, X } from 'lucide-react'
import { allEvents } from '@/data/computed'
import { EVENT_KIND_LABEL, EVENT_AUDIENCE_LABEL, EVENT_FORMAT_LABEL, FORMAT_ORDER } from '@/data/constants'
import type { EventKind, EventAudience, EventFormat, Event } from '@/data/constants'
import { formatEventDate } from '@/lib/utils'

const PAGE_SIZE = 9

// ─── 행사 상태 판별 ──────────────────────────────────────────────────
function getEventRibbon(event: Event): { label: string; className: string } | null {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const toDate = (s: string) => { const d = new Date(s); d.setHours(0,0,0,0); return d }

  const eventStart = toDate(event.eventDate.start)
  const eventEnd   = toDate(event.eventDate.end ?? event.eventDate.start)

  // 행사 당일
  if (today >= eventStart && today <= eventEnd)
    return { label: '오늘 진행중', className: 'bg-blue-600 text-white' }

  // 행사 종료
  if (today > eventEnd) return null

  // 행사 전
  if (!event.recruitDate) return null

  const recruitStart = toDate(event.recruitDate.start)
  const recruitEnd   = toDate(event.recruitDate.end ?? event.recruitDate.start)

  if (today < recruitStart)
    return { label: '곧 접수 시작', className: 'bg-amber-500 text-white' }

  if (today <= recruitEnd)
    return { label: '접수 중', className: 'bg-emerald-500 text-white' }

  return { label: '접수 종료 · 당일날 봐요', className: 'bg-slate-700 text-white' }
}

// ─── 필터 데이터 ────────────────────────────────────────────────────
const ALL_YEARS = [...new Set(
  allEvents.map(e => new Date(e.eventDate.start).getFullYear())
)].sort((a, b) => b - a)

const KIND_OPTIONS:     Array<{ key: EventKind;     label: string }> = [
  { key: 'regular', label: EVENT_KIND_LABEL.regular },
  { key: 'ongoing', label: EVENT_KIND_LABEL.ongoing },
]
const AUDIENCE_OPTIONS: Array<{ key: EventAudience; label: string }> = [
  { key: 'open',     label: EVENT_AUDIENCE_LABEL.open     },
  { key: 'members',  label: EVENT_AUDIENCE_LABEL.members  },
  { key: 'regular',  label: EVENT_AUDIENCE_LABEL.regular  },
  { key: 'operator', label: EVENT_AUDIENCE_LABEL.operator },
]
const FORMAT_OPTIONS:   Array<{ key: EventFormat;   label: string }> = [
  { key: 'offline',  label: EVENT_FORMAT_LABEL.offline  },
  { key: 'online',   label: EVENT_FORMAT_LABEL.online   },
  { key: 'recorded', label: EVENT_FORMAT_LABEL.recorded },
]

// ─── 멀티 셀렉트 드롭박스 ────────────────────────────────────────────
function MultiSelectDropdown<T extends string>({
  label, options, selected, onChange,
}: {
  label:    string
  options:  Array<{ key: T; label: string }>
  selected: T[]
  onChange: (v: T[]) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggle = (key: T) => {
    onChange(selected.includes(key) ? selected.filter(k => k !== key) : [...selected, key])
  }

  const displayLabel = selected.length === 0
    ? label
    : selected.length === 1
      ? options.find(o => o.key === selected[0])?.label ?? label
      : `${label} ${selected.length}개`

  const active = selected.length > 0

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 pl-3.5 pr-2.5 py-1.5 rounded-full text-xs font-black border transition-colors
          ${active
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
          }`}
      >
        {displayLabel}
        <ChevronDown size={11} className={active ? 'text-blue-200' : 'text-slate-400'} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-20 w-max py-1">
          {options.map(o => (
            <button
              key={o.key}
              onClick={() => toggle(o.key)}
              className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap"
            >
              <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors shrink-0
                ${selected.includes(o.key) ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}
              >
                {selected.includes(o.key) && <Check size={9} className="text-white" />}
              </span>
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── 이벤트 카드 ────────────────────────────────────────────────────
function EventCard({ event }: { event: Event }) {
  const year   = new Date(event.eventDate.start).getFullYear()
  const hasImg = !!event.img
  const ribbon = getEventRibbon(event)

  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      <Link
        to={`/events/archive/${event.slug}`}
        className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden
                   hover:border-blue-200 hover:shadow-md transition-all duration-200"
      >
        {/* 이미지 */}
        <div className="relative aspect-video overflow-hidden bg-slate-100 shrink-0">
          {hasImg
            ? <img
                src={event.img}
                alt={event.title}
                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
              />
            : <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                <span className="text-4xl font-black text-slate-200">{year}</span>
              </div>
          }

          {/* 상태 리본 */}
          {ribbon && (
            <div className={`absolute bottom-0 left-0 right-0 py-2 text-center text-xs font-black tracking-wide ${ribbon.className}`}>
              {ribbon.label}
            </div>
          )}

          {/* 뱃지 */}
          <div className="absolute top-2 right-2 flex flex-wrap justify-end gap-1">
            {event.kind && (
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/90 text-blue-600 shadow-md ring-1 ring-black/5">
                {EVENT_KIND_LABEL[event.kind]}
              </span>
            )}
            {event.audience && (
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/90 text-slate-500 shadow-md ring-1 ring-black/5">
                {EVENT_AUDIENCE_LABEL[event.audience]}
              </span>
            )}
            {[...(event.format ?? [])].sort((a, b) => FORMAT_ORDER.indexOf(a) - FORMAT_ORDER.indexOf(b)).map(f => (
              <span key={f} className="text-[10px] font-black px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/90 text-slate-400 shadow-md ring-1 ring-black/5">
                {EVENT_FORMAT_LABEL[f]}
              </span>
            ))}
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="flex flex-col gap-2.5 px-5 pt-5 pb-4 flex-1">
          {/* 제목 */}
          <p className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
            {event.title}
          </p>

          {/* 날짜 · 장소 */}
          <div className="flex flex-col gap-1 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={11} className="shrink-0" />
              <span className="truncate">{formatEventDate(event.eventDate)}</span>
            </div>
            <div className="flex items-center gap-1.5 min-h-[1rem]">
              {event.location && <><MapPin size={11} className="shrink-0" /><span className="truncate">{event.location}</span></>}
            </div>
          </div>

          {/* 요약 */}
          <div className="relative group/summary flex items-end gap-1 mt-auto pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 leading-relaxed break-keep line-clamp-1 flex-1">
              {event.summary}
            </p>
            <ChevronRight size={13} className="shrink-0 text-slate-300 group-hover:text-blue-400 transition-colors mb-0.5" />
            <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-full
                            bg-slate-800 text-white text-xs rounded-lg px-3 py-2 leading-relaxed break-keep
                            opacity-0 group-hover/summary:opacity-100 transition-opacity duration-150 z-10 shadow-lg">
              {event.summary}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── 페이지 ─────────────────────────────────────────────────────────
export default function EventsArchivePage() {
  const [years,      setYears]      = useState<string[]>([])
  const [kinds,      setKinds]      = useState<EventKind[]>([])
  const [audiences,  setAudiences]  = useState<EventAudience[]>([])
  const [formats,    setFormats]    = useState<EventFormat[]>([])
  const [inputValue, setInputValue] = useState('')
  const [query,      setQuery]      = useState('')
  const [page,       setPage]       = useState(0)

  const applySearch = () => setQuery(inputValue)

  useEffect(() => { setPage(0) }, [years, kinds, audiences, formats, query])

  const filtered = useMemo(() => {
    const kw = query.trim().toLowerCase()
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const twoWeeksBefore = (dateStr: string) => {
      const d = new Date(dateStr); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - 14); return d
    }
    return allEvents
      .filter(e => {
        const eventEnd = new Date(e.eventDate.end ?? e.eventDate.start); eventEnd.setHours(0,0,0,0)
        if (today > eventEnd) return true                      // 지난 행사는 항상 노출
        if (!e.recruitDate) return e.audience === 'operator'  // 접수 없는 운영진 행사는 노출, 나머지 숨김
        return today >= twoWeeksBefore(e.recruitDate.start)  // 접수 2주 전부터 노출
      })
      .filter(e => years.length === 0 || years.includes(String(new Date(e.eventDate.start).getFullYear())))
      .filter(e => kinds.length     === 0  || (e.kind     != null && kinds.includes(e.kind)))
      .filter(e => audiences.length === 0  || (e.audience != null && audiences.includes(e.audience)))
      .filter(e => formats.length   === 0  || (e.format ?? []).some(f => formats.includes(f)))
      .filter(e => !kw
        || e.title.toLowerCase().includes(kw)
        || e.summary.toLowerCase().includes(kw)
        || (e.keywords ?? []).some(k => k.toLowerCase().includes(kw))
      )
      .sort((a, b) => b.eventDate.start.localeCompare(a.eventDate.start))
  }, [years, kinds, audiences, formats, query])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const resetAll = () => {
    setYears([]); setKinds([]); setAudiences([]); setFormats([]); setQuery(''); setInputValue('')
  }

  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-white pt-24 pb-10 lg:pt-28 lg:pb-14 border-b border-slate-100">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-slate-200 text-slate-500 rounded-full mb-8 bg-slate-50">
              <span className="text-[10px] font-black uppercase tracking-widest">✦ Event Archive</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-2">
              함께해온 모든 순간
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">
              역대 행사
            </p>
            <p className="text-sm text-slate-500 leading-relaxed break-keep">
              싸피니티가 지금까지 개최한 모든 행사를 한눈에 확인해보세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 목록 */}
      <section className="bg-slate-50 pt-6 pb-14 lg:pt-8 lg:pb-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">

          {/* 필터 */}
          <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 flex flex-col mb-5">

            {/* 컨트롤 행 */}
            <div className="flex flex-wrap items-center gap-2">

              {/* 멀티 셀렉트 */}
              <MultiSelectDropdown
                label="연도 및 기수"
                options={ALL_YEARS.map(y => ({ key: String(y), label: `${y}년 ${y - 2021}대` }))}
                selected={years}
                onChange={setYears}
              />

              <MultiSelectDropdown label="종류"   options={KIND_OPTIONS}     selected={kinds}     onChange={setKinds}     />
              <MultiSelectDropdown label="대상"   options={AUDIENCE_OPTIONS} selected={audiences} onChange={setAudiences} />
              <MultiSelectDropdown label="방식"   options={FORMAT_OPTIONS}   selected={formats}   onChange={setFormats}   />

              <div className="hidden sm:block w-px h-5 bg-slate-200 mx-1" />

              {/* 검색 */}
              <div className="flex items-center gap-1.5 flex-1 min-w-[140px]">
                <div className="relative flex-1">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && applySearch()}
                    placeholder="행사 검색"
                    className="pl-7 pr-4 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200
                               text-slate-700 placeholder:text-slate-400 outline-none
                               focus:border-blue-300 transition-colors w-full"
                  />
                </div>
                <button
                  onClick={applySearch}
                  className="flex items-center gap-1 pl-3 pr-3.5 py-1.5 rounded-full text-xs font-black
                             bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0"
                >
                  <Search size={11} /> 검색
                </button>
              </div>

              {/* 초기화 */}
              {(years.length > 0 || kinds.length > 0 || audiences.length > 0 || formats.length > 0 || query) && (
                <button
                  onClick={resetAll}
                  className="text-[10px] font-black text-slate-400 hover:text-blue-500 transition-colors shrink-0"
                >
                  초기화
                </button>
              )}
            </div>

            {/* 활성 필터 뱃지 행 */}
            {(years.length > 0 || kinds.length > 0 || audiences.length > 0 || formats.length > 0 || query) && (
              <div className="flex flex-wrap gap-1.5 pt-2.5 mt-2.5 border-t border-slate-100">
                {years.map(y => (
                  <span key={y} className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600">
                    {y}년 {Number(y) - 2021}대
                    <button onClick={() => setYears(years.filter(v => v !== y))} className="flex items-center hover:text-blue-800 transition-colors">
                      <X size={9} />
                    </button>
                  </span>
                ))}
                {kinds.map(k => (
                  <span key={k} className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600">
                    {EVENT_KIND_LABEL[k]}
                    <button onClick={() => setKinds(kinds.filter(v => v !== k))} className="flex items-center hover:text-blue-800 transition-colors">
                      <X size={9} />
                    </button>
                  </span>
                ))}
                {audiences.map(a => (
                  <span key={a} className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600">
                    {EVENT_AUDIENCE_LABEL[a]}
                    <button onClick={() => setAudiences(audiences.filter(v => v !== a))} className="flex items-center hover:text-blue-800 transition-colors">
                      <X size={9} />
                    </button>
                  </span>
                ))}
                {formats.map(f => (
                  <span key={f} className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600">
                    {EVENT_FORMAT_LABEL[f]}
                    <button onClick={() => setFormats(formats.filter(v => v !== f))} className="flex items-center hover:text-blue-800 transition-colors">
                      <X size={9} />
                    </button>
                  </span>
                ))}
                {query && (
                  <span className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded-full text-[10px] font-black bg-blue-50 text-blue-600">
                    {query}
                    <button onClick={() => setQuery('')} className="flex items-center hover:text-blue-800 transition-colors">
                      <X size={9} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* 카드 그리드 */}
          {filtered.length > 0 ? (
            <>
              <motion.div
                key={`${years}-${kinds}-${audiences}-${formats}-${query}-${page}`}
                initial="hidden"
                animate="visible"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                {paginated.map(e => <EventCard key={e.slug} event={e} />)}
              </motion.div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    disabled={page === 0}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200
                               text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-colors
                               disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-400"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => { setPage(i); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-black transition-colors
                        ${page === i
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-500'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    disabled={page === totalPages - 1}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200
                               text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-colors
                               disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-400"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <p className="text-sm text-slate-400">조건에 맞는 행사가 없습니다.</p>
              <button
                onClick={resetAll}
                className="text-xs font-black text-blue-500 hover:text-blue-700 transition-colors"
              >
                필터 초기화
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  )
}
