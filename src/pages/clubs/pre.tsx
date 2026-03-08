import { useState, useMemo, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import { allPreClubs, PRE_CLUB_MIN_MEMBERS } from '@/data/computed'
import type { PreClub } from '@/data/computed'

const FILTERS = ['전체', '모집 중', '최소 인원 달성'] as const
type Filter = typeof FILTERS[number]

// text-sm(14px) * leading-relaxed(1.625) * 3줄 = 68.25px
const DESC_3LINE_HEIGHT = '4.265625rem'

function PreClubCard({ club, index }: { club: PreClub; index: number }) {
  const isFull = club.memberCount >= PRE_CLUB_MIN_MEMBERS
  const descRef = useRef<HTMLParagraphElement>(null)
  const measureRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isOverflow, setIsOverflow] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null)

  useEffect(() => {
    const visible = descRef.current
    const measure = measureRef.current
    if (!visible || !measure) return
    setIsOverflow(measure.scrollHeight > visible.clientHeight)
  }, [])

  useEffect(() => {
    if (cardRef.current && collapsedHeight === null) {
      setCollapsedHeight(cardRef.current.offsetHeight)
    }
  }, [collapsedHeight])

  const toggleClass = isFull
    ? 'text-slate-500 hover:text-slate-600'
    : 'text-blue-500 hover:text-blue-600'

  const toggle = () => setExpanded(e => !e)

  const renderBottom = () => (
    <>
      {!isFull && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">현재 인원</span>
            <span className="font-black text-slate-700">
              {club.memberCount} / {PRE_CLUB_MIN_MEMBERS}명
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-400 rounded-full transition-all"
              style={{ width: `${Math.min((club.memberCount / PRE_CLUB_MIN_MEMBERS) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
      {isFull && club.achievedAt ? (
        <div className="flex flex-col gap-1 border-t border-slate-200 pt-3 -mt-1">
          <p className="text-xs text-slate-500 leading-relaxed break-keep">
            최소 인원이 모였습니다.<br />구성원 논의 후 정식 동아리 전환을 준비합니다.
          </p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-slate-400">{club.since} 등록 · {club.achievedAt} 달성</p>
            {isOverflow && (
              <button onClick={toggle} className={`text-[11px] transition-colors shrink-0 ${toggleClass}`}>
                {expanded ? '접기' : '소개 더 보기'}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
          <span>{club.since} 등록</span>
          {isOverflow && (
            <button onClick={toggle} className={`text-[11px] transition-colors shrink-0 ${toggleClass}`}>
              {expanded ? '접기' : '소개 더 보기'}
            </button>
          )}
        </div>
      )}
    </>
  )

  return (
    // 그리드 셀: 확장 시 collapsed 높이로 고정해 레이아웃 유지
    <div className="relative" style={expanded && collapsedHeight ? { height: collapsedHeight } : undefined}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        className={`rounded-2xl p-6 flex flex-col gap-4 ${
          expanded ? 'absolute inset-x-0 top-0 z-20' : ''
        } ${
          isFull
            ? `bg-slate-100 opacity-60 ${expanded ? 'border-2 border-slate-300' : 'border border-slate-200'}`
            : `bg-white ${expanded ? 'border-2 border-blue-200' : 'border border-slate-100'}`
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
              isFull ? 'bg-slate-200 text-slate-500' : 'bg-blue-50 text-blue-600'
            }`}>
              {club.category}
            </span>
            {isFull && (
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-200 text-slate-500">
                최소 인원 달성
              </span>
            )}
          </div>
          <div className="relative group shrink-0">
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 cursor-default">
              #{String(club.id).padStart(3, '0')}
            </span>
            {!isFull && (
              <div className="absolute right-0 top-full mt-1.5 w-44 bg-slate-800 text-white text-[11px] leading-relaxed rounded-xl px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 break-keep">
                이 예비 동아리에 참여하고 싶다면, 번호를 기억해두세요.
              </div>
            )}
          </div>
        </div>

        <div className="relative" style={{ minHeight: DESC_3LINE_HEIGHT }}>
          <p
            ref={descRef}
            className={`text-sm text-slate-600 leading-relaxed break-keep ${expanded ? 'whitespace-pre-line' : 'line-clamp-3'}`}
          >
            {club.shortDesc}
          </p>
          <p ref={measureRef} aria-hidden className="text-sm leading-relaxed break-keep whitespace-pre-line absolute top-0 left-0 right-0 invisible pointer-events-none">
            {club.shortDesc}
          </p>
        </div>

        {renderBottom()}
      </motion.div>
    </div>
  )
}

export default function ClubsPrePage() {
  const [filter, setFilter] = useState<Filter>('모집 중')

  const sorted = useMemo(() => (
    [...allPreClubs].sort((a, b) => {
      const aFull = a.memberCount >= PRE_CLUB_MIN_MEMBERS
      const bFull = b.memberCount >= PRE_CLUB_MIN_MEMBERS
      if (aFull === bFull) return a.id - b.id
      return aFull ? 1 : -1
    })
  ), [])

  const filtered = useMemo(() => {
    if (filter === '모집 중')   return sorted.filter(c => c.memberCount < PRE_CLUB_MIN_MEMBERS)
    if (filter === '최소 인원 달성') return sorted.filter(c => c.memberCount >= PRE_CLUB_MIN_MEMBERS)
    return sorted
  }, [sorted, filter])

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
              <span className="text-[10px] font-black uppercase tracking-widest">✦ Clubs</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-2">
              함께할 사람을 찾고 있어요
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">
              예비 동아리
            </p>
            <div className="flex items-end justify-between gap-4">
              <p className="text-sm text-slate-500 leading-relaxed break-keep">
                아직 인원이 부족하지만 동아리를 만들고 싶은 동문들의 모집 공간입니다.<br />
                5인 이상이 모이면 SSAFYnity가 단체 채팅방을 개설하고 정식 동아리 전환을 안내합니다.
              </p>
              <Link
                to="/clubs/apply"
                className="text-xs font-black text-blue-600 hover:text-blue-700 transition-colors shrink-0 pb-0.5"
              >
                예비 동아리 참여 · 등록 →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 목록 */}
      <section className="bg-slate-50 pt-8 pb-20 lg:pt-10">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl flex flex-col gap-6">
          {allPreClubs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-sm font-extrabold text-slate-700">등록된 예비 동아리가 없습니다</p>
              <p className="text-sm text-slate-400 break-keep">관심사가 있다면 직접 예비 동아리를 열어보세요.</p>
              <Link
                to="/clubs/apply"
                className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-black hover:bg-blue-700 transition-colors"
              >
                예비 동아리 등록하기
              </Link>
            </motion.div>
          ) : (
            <>
              {/* 필터 탭 */}
              <div className="flex gap-2">
                {FILTERS.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-colors ${
                      filter === f
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-200 hover:text-blue-600'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* 카드 그리드 */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((club, i) => (
                  <PreClubCard key={club.id} club={club} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

    </div>
  )
}
