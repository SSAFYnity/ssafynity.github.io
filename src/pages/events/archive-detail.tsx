import { useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, MapPin, CalendarDays, Users, Globe, Monitor, ExternalLink, CircleDollarSign, RotateCcw, ClipboardCheck, Package, Info, Clock, BarChart2 } from 'lucide-react'
import { allEvents } from '@/data/computed'
import { EVENT_KIND, EVENT_KIND_LABEL, EVENT_AUDIENCE, EVENT_AUDIENCE_LABEL, EVENT_FORMAT, EVENT_FORMAT_LABEL, FORMAT_ORDER } from '@/data/constants'
import { formatEventDate, formatRecruitDate, FORMAT_ICON, getEventStatus } from '@/lib/utils'

export default function EventsArchiveDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { state } = useLocation()
  const event  = allEvents.find(e => e.slug === slug)
  const status = event ? getEventStatus(event) : 'past' as const

  const isRecruitSoon = status === 'before-recruit' && !!event?.recruitDate && (() => {
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const start = new Date(event!.recruitDate!.start); start.setHours(0, 0, 0, 0)
    return (start.getTime() - today.getTime()) / 86400000 <= 14
  })()

  const TAB_HAS_DATA = {
    notices:     true,
    fee:         isRecruitSoon || ['recruiting', 'recruit-closed', 'today-upcoming', 'today-ongoing', 'past'].includes(status),
    registrants: ['recruiting', 'recruit-closed', 'today-upcoming', 'today-ongoing', 'past'].includes(status),
    results:     status === 'past',
  }

  const [activeTab, setActiveTab] = useState<'notices' | 'fee' | 'registrants' | 'results'>('notices')

  const backTo    = state?.from === 'upcoming' ? '/events/upcoming' : '/events/archive'
  const backLabel = state?.from === 'upcoming' ? '올해 행사 일정' : '역대 행사'

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-slate-400 text-sm">행사를 찾을 수 없습니다.</p>
        <Link to={backTo} className="text-xs font-black text-blue-500 hover:text-blue-700">
          ← {backLabel}로 돌아가기
        </Link>
      </div>
    )
  }

  const year = new Date(event.eventDate.start).getFullYear()

  return (
    <div className="flex flex-col">

      <section className="bg-white pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >

            {/* 뒤로가기 */}
            <Link
              to={backTo}
              className="inline-flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-blue-500 transition-colors w-fit"
            >
              <ChevronLeft size={14} /> {backLabel}
            </Link>

            {/* 제목 (모바일 전용) */}
            <div className="lg:hidden flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {event.kind && (
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                    {EVENT_KIND_LABEL[event.kind]}
                  </span>
                )}
                {event.audience && (
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                    {event.audience === 'members'
                      ? <><Users size={10} className="inline mr-1" />{EVENT_AUDIENCE_LABEL[event.audience]}</>
                      : <><Globe  size={10} className="inline mr-1" />{EVENT_AUDIENCE_LABEL[event.audience]}</>
                    }
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 leading-snug tracking-tight">{event.title}</h1>
              <p className="text-sm text-slate-500 leading-relaxed break-keep">{event.summary}</p>
            </div>

            {/* 메인 레이아웃: 좌 사이드바 + 우 메인 */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-start">

              {/* 좌: 이미지 + 기본 정보 */}
              <div className="flex flex-col gap-6 lg:w-64 shrink-0">

                {/* 이미지 (정사각형) */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                  {event.img
                    ? <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                        <span className="text-5xl font-black text-slate-200">{year}</span>
                      </div>
                  }
                </div>

                {/* 기본 정보 */}
                <div className="flex flex-col gap-4">

                  {/* 일시 */}
                  <div className="flex gap-3">
                    <CalendarDays size={14} className="text-blue-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[10px] font-black text-slate-400">일시</p>
                      <p className="text-xs font-medium text-slate-700 leading-relaxed">{formatEventDate(event.eventDate)}</p>
                    </div>
                  </div>

                  {/* 접수 기간 */}
                  {event.recruitDate && (
                    <div className="flex gap-3">
                      <CalendarDays size={14} className="text-blue-400 shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[10px] font-black text-slate-400">접수 기간</p>
                        <p className="text-xs font-medium text-slate-700 leading-relaxed">{formatRecruitDate(event.recruitDate)}</p>
                      </div>
                    </div>
                  )}

                  {/* 장소 */}
                  {(event.location || event.locationUrl) && (
                    <div className="flex gap-3">
                      <MapPin size={14} className="text-blue-400 shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1.5">
                        <p className="text-[10px] font-black text-slate-400">장소</p>
                        {event.location && <p className="text-xs font-medium text-slate-700">{event.location}</p>}
                        {event.locationUrl && (
                          <div className="flex flex-wrap gap-1.5">
                            {event.locationUrl.naver && (
                              <a href={event.locationUrl.naver} target="_blank" rel="noopener noreferrer"
                                 className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full
                                            bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                                네이버지도 <ExternalLink size={8} />
                              </a>
                            )}
                            {event.locationUrl.kakao && (
                              <a href={event.locationUrl.kakao} target="_blank" rel="noopener noreferrer"
                                 className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full
                                            bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors">
                                카카오맵 <ExternalLink size={8} />
                              </a>
                            )}
                            {event.locationUrl.google && (
                              <a href={event.locationUrl.google} target="_blank" rel="noopener noreferrer"
                                 className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full
                                            bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors">
                                구글지도 <ExternalLink size={8} />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 진행 방식 */}
                  {event.format && event.format.length > 0 && (
                    <div className="flex gap-3">
                      <Monitor size={14} className="text-blue-400 shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1.5">
                        <p className="text-[10px] font-black text-slate-400">진행 방식</p>
                        <div className="flex flex-wrap gap-1.5">
                          {[...event.format].sort((a, b) => FORMAT_ORDER.indexOf(a) - FORMAT_ORDER.indexOf(b)).map(f => {
                            const Icon = FORMAT_ICON[f]
                            return (
                              <span key={f} className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600
                                                        px-2 py-1 rounded-full bg-slate-50 border border-slate-200">
                                <Icon size={10} className="text-blue-400" />
                                {EVENT_FORMAT_LABEL[f]}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* 우: 제목/요약 + 상태별 블록 */}
              <div className="flex-1 min-w-0 flex flex-col gap-6">

                {/* 배지 + 제목 + 요약 (데스크탑 전용) */}
                <div className="hidden lg:flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {event.kind && (
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                        {EVENT_KIND_LABEL[event.kind]}
                      </span>
                    )}
                    {event.audience && (
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
                        {event.audience === 'members'
                          ? <><Users size={10} className="inline mr-1" />{EVENT_AUDIENCE_LABEL[event.audience]}</>
                          : <><Globe  size={10} className="inline mr-1" />{EVENT_AUDIENCE_LABEL[event.audience]}</>
                        }
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug tracking-tight">
                    {event.title}
                  </h1>
                  <p className="text-sm text-slate-500 leading-relaxed break-keep">{event.summary}</p>
                </div>

                <hr className="hidden lg:block border-slate-100" />

                {/* 행사 분류 정보 */}
                <div className="flex flex-col gap-5">

                  {event.kind && (
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-extrabold text-slate-700">
                        이번 행사는 <span className="text-blue-600">{EVENT_KIND_LABEL[event.kind]}</span> 행사예요.
                      </p>
                      <ul className="pl-4 list-disc marker:text-slate-300">
                        <li className="text-sm text-slate-500 leading-relaxed break-keep whitespace-pre-line">{EVENT_KIND[event.kind].desc}</li>
                      </ul>
                    </div>
                  )}

                  {event.audience && (
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-extrabold text-slate-700">
                        참여 대상은 <span className="text-blue-600">{EVENT_AUDIENCE_LABEL[event.audience]}</span>이에요.
                      </p>
                      <ul className="pl-4 list-disc marker:text-slate-300">
                        <li className="text-sm text-slate-500 leading-relaxed break-keep whitespace-pre-line">{EVENT_AUDIENCE[event.audience].desc}</li>
                      </ul>
                    </div>
                  )}

                  {event.format && event.format.length > 0 && (() => {
                    const sorted = [...event.format].sort((a, b) => FORMAT_ORDER.indexOf(a) - FORMAT_ORDER.indexOf(b))
                    const label  = sorted.map(f => EVENT_FORMAT_LABEL[f]).join(' · ')
                    return (
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-extrabold text-slate-700">
                          <span className="text-blue-600">{label}</span>으로 진행돼요.
                        </p>
                        <ul className="flex flex-col gap-0.5 pl-4 list-disc marker:text-slate-300">
                          {sorted.map(f => (
                            <li key={f} className="text-sm text-slate-500 leading-relaxed break-keep whitespace-pre-line">{EVENT_FORMAT[f].desc}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  })()}

                  {event.capacity !== undefined && (
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-extrabold text-slate-700">
                        {event.capacity === 'unlimited'
                          ? <>정원 <span className="text-blue-600">제한이 없어요</span>.</>
                          : <>정원은 <span className="text-blue-600">{event.capacity.toLocaleString()}명</span>이에요.</>
                        }
                      </p>
                      <ul className="pl-4 list-disc marker:text-slate-300">
                        <li className="text-sm text-slate-500 leading-relaxed break-keep">
                          {event.capacity === 'unlimited'
                            ? '신청자 모두 참여할 수 있어요.'
                            : '정원 초과 시 선착순 또는 별도 기준으로 마감될 수 있어요.'
                          }
                        </li>
                        {event.capacity !== 'unlimited' && (
                          <li className="text-sm text-slate-500 leading-relaxed break-keep">장소 수용 인원 및 당일 참석하는 운영진이 통솔 가능한 범위를 고려해 정원을 제한하였습니다.</li>
                        )}
                      </ul>
                    </div>
                  )}

                </div>

              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 접수 버튼 */}
      {(() => {
        const toDate  = (s: string) => { const d = new Date(s); d.setHours(0,0,0,0); return d }
        const today   = new Date(); today.setHours(0,0,0,0)
        const diffDay = (s: string) => Math.ceil((toDate(s).getTime() - today.getTime()) / 86400000)

        const dday = status === 'before-recruit' && event.recruitDate
          ? diffDay(event.recruitDate.start)
          : status === 'recruiting' && event.recruitDate?.end
          ? diffDay(event.recruitDate.end)
          : null

        const ddayColor = status === 'before-recruit' ? 'text-amber-500' : 'text-emerald-500'
        const ddayLabel = status === 'before-recruit' ? '접수 시작까지' : '접수 마감까지'

        const btn =
          status === 'recruiting'
            ? event.formUrl
              ? <a href={event.formUrl} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 text-white text-sm font-black hover:bg-blue-700 transition-colors">
                  접수하기 <ExternalLink size={14} />
                </a>
              : <button disabled className="w-full py-3 rounded-xl bg-slate-100 text-slate-400 text-sm font-black cursor-not-allowed">접수 링크 준비 중</button>
          : status === 'before-recruit'
            ? <button disabled className="w-full py-3 rounded-xl bg-slate-100 text-slate-400 text-sm font-black cursor-not-allowed">접수 예정</button>
          : status === 'today-upcoming'
            ? <button disabled className="w-full py-3 rounded-xl bg-slate-100 text-slate-400 text-sm font-black cursor-not-allowed">오늘 {event.eventDate.startTime} 시작</button>
          : status === 'today-ongoing'
            ? <button disabled className="w-full py-3 rounded-xl bg-blue-50 text-blue-400 text-sm font-black cursor-not-allowed">행사 진행 중</button>
          : status === 'recruit-closed'
            ? <button disabled className="w-full py-3 rounded-xl bg-slate-100 text-slate-400 text-sm font-black cursor-not-allowed">접수 마감</button>
          : null

        if (!btn) return null

        return (
          <div className="bg-white border-t border-b border-slate-100">
            <div className="container mx-auto px-6 lg:px-12 max-w-5xl py-4 flex flex-col gap-2">
              {dday !== null && (
                <p className="text-xs text-slate-500">
                  {ddayLabel} <span className={`font-bold ${ddayColor}`}>{dday === 0 ? 'D-day' : `D-${dday}`}</span>
                </p>
              )}
              {btn}
            </div>
          </div>
        )
      })()}

      {/* 탭 섹션: 안내사항 / 접수자 현황 / 참여자 결과 */}
      {(() => {
        const PARTICIPANT_ORDER = ['regular', 'members', 'external', 'operator', 'partner', 'invited']
        const PARTICIPANT_LABEL: Record<string, string> = {
          members: '일반회원', regular: '정회원',  external: '외부인',
          operator: '운영진',  partner: '관계자',  invited:  '초청인원',
        }
        const FEE_LABEL: Record<string, string> = {
          members: '일반회원', regular: '정회원', external: '외부인', operator: '운영진',
        }
        const formatFee = (v: number | string) =>
          typeof v === 'number' ? `${v.toLocaleString()}원` : v

        // 안내사항 카드 구성
        const cards:    { icon: React.ElementType; title: string; content: React.ReactNode }[] = []
        const feeCards: { icon: React.ElementType; title: string; content: React.ReactNode }[] = []

        if (event.notices) {
          const { fee, refund, checklist, items, custom } = event.notices

          if (checklist?.length) cards.push({ icon: ClipboardCheck, title: '필수 확인 사항', content: (
            <ul className="pl-4 list-disc marker:text-slate-300 flex flex-col gap-1">
              {checklist.map((c, i) => <li key={i} className="text-sm text-slate-500 leading-relaxed break-keep whitespace-pre-line">{c}</li>)}
            </ul>
          )})

          if (items?.length) cards.push({ icon: Package, title: '준비물', content: (
            <ul className="pl-4 list-disc marker:text-slate-300 flex flex-col gap-1">
              {items.map((item, i) => <li key={i} className="text-sm text-slate-500 leading-relaxed break-keep whitespace-pre-line">{item}</li>)}
            </ul>
          )})

          custom?.forEach(c => cards.push({ icon: Info, title: c.title,
            content: <p className="text-sm text-slate-500 leading-relaxed break-keep whitespace-pre-line">{c.body}</p>,
          }))

          if (fee) feeCards.push({ icon: CircleDollarSign, title: '참여비', content: (
            <div className="flex flex-col gap-2">
              <ul className="flex flex-col gap-1.5">
                {(Object.entries(fee) as [string, number | string][])
                  .filter(([k]) => k !== 'note')
                  .map(([k, v]) => (
                    <li key={k} className="flex items-baseline justify-between gap-2 text-sm">
                      <span className="text-xs font-black text-slate-400">{FEE_LABEL[k] ?? k}</span>
                      <span className="font-bold text-slate-700">{formatFee(v)}</span>
                    </li>
                  ))}
              </ul>
              {fee.note && <p className="text-xs text-slate-400 whitespace-pre-line pt-1 border-t border-slate-100 text-right">{fee.note}</p>}
            </div>
          )})

          if (refund?.length) feeCards.push({ icon: RotateCcw, title: '환불 기준', content: (
            <ul className="pl-4 list-disc marker:text-slate-300 flex flex-col gap-1">
              {refund.map((r, i) => <li key={i} className="text-sm text-slate-500 leading-relaxed break-keep whitespace-pre-line">{r}</li>)}
            </ul>
          )})
        }

        const CardItem = ({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: React.ReactNode }) => (
          <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Icon size={14} className="text-blue-400 shrink-0" />
              <p className="text-xs font-black text-slate-700">{title}</p>
            </div>
            {content}
          </div>
        )

        const pending = (icon: React.ElementType, title: string, desc: string) => {
          const Icon = icon
          return (
            <div className="flex flex-col items-center justify-center py-14 gap-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                <Icon size={20} className="text-slate-300" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-slate-400">{title}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{desc}</p>
              </div>
            </div>
          )
        }


        const TABS = [
          { id: 'notices' as const,     label: '행사 안내', enabled: TAB_HAS_DATA.notices },
          { id: 'fee' as const,         label: '비용·환불', enabled: TAB_HAS_DATA.fee },
          { id: 'registrants' as const, label: '접수 현황', enabled: TAB_HAS_DATA.registrants },
          { id: 'results' as const,     label: '참여 결과', enabled: TAB_HAS_DATA.results },
        ]

        return (
          <section className="bg-slate-50 border-t border-slate-100 py-10 lg:py-14">
            <div className="container mx-auto px-6 lg:px-12 max-w-5xl flex flex-col gap-6">

              {/* 탭 버튼 */}
              <div className="flex border-b border-slate-200">
                {TABS.filter(tab => tab.enabled).map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 text-xs font-black border-b-2 -mb-px transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-blue-500'
                        : 'text-slate-400 border-transparent hover:text-slate-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* 행사 안내 */}
              {activeTab === 'notices' && (
                cards.length === 0
                  ? pending(Clock, '준비 중이에요', '행사 안내가 곧 업데이트될 예정이에요.')
                  : <div className="grid sm:grid-cols-2 gap-3">
                      {cards.map((c, i) => <CardItem key={i} {...c} />)}
                    </div>
              )}

              {/* 비용·환불 */}
              {activeTab === 'fee' && (
                feeCards.length === 0
                  ? pending(CircleDollarSign, '책정 중이에요', '참여비 및 환불 규정이 곧 업데이트될 예정이에요.')
                  : <div className="grid sm:grid-cols-2 gap-3">
                      {feeCards.map((c, i) => <CardItem key={i} {...c} />)}
                    </div>
              )}

              {/* 접수 현황 */}
              {activeTab === 'registrants' && (() => {
                if (!event.registrants) return pending(Users, '집계 중이에요', '행사 종료 후 접수 데이터가 업데이트될 예정이에요.')

                const CHART_COLORS: Record<string, string> = {
                  regular:  '#1d4ed8',
                  members:  '#60a5fa',
                  external: '#64748b',
                  operator: '#8b5cf6',
                  partner:  '#f59e0b',
                  invited:  '#10b981',
                }
                const REGISTRANT_KEYS = ['regular', 'members', 'external']
                const entries    = Object.entries(event.registrants)
                  .filter((e): e is [string, number] => typeof e[1] === 'number' && REGISTRANT_KEYS.includes(e[0]))
                  .sort((a, b) => PARTICIPANT_ORDER.indexOf(a[0]) - PARTICIPANT_ORDER.indexOf(b[0]))
                const total      = entries.reduce((s, [, v]) => s + v, 0)
                const fillRate   = typeof event.capacity === 'number' ? total / event.capacity : null

                return (
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col gap-4">

                    {/* 상단: 합계 */}
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black text-slate-700">접수자</p>
                      <span className="text-lg font-extrabold text-blue-600">{total.toLocaleString()}명</span>
                    </div>

                    {/* 리스트 */}
                    <ul className="flex flex-col gap-1.5 border-t border-slate-100 pt-4">
                      {entries.map(([k, v]) => (
                        <li key={k} className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1.5 text-xs font-black text-slate-400">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: CHART_COLORS[k] ?? '#cbd5e1' }} />
                            {PARTICIPANT_LABEL[k] ?? k}
                          </span>
                          <span className="font-bold text-slate-700">{v.toLocaleString()}명</span>
                        </li>
                      ))}
                    </ul>

                    {/* 정원 대비 스택 바 */}
                    {fillRate !== null && (
                      <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs font-black text-slate-400">정원 대비</span>
                          <span className="text-xs text-slate-400">
                            {total.toLocaleString()} / {(event.capacity as number).toLocaleString()}명&nbsp;&nbsp;
                            <span className="text-lg font-extrabold text-blue-600">{Math.round(fillRate * 100)}%</span>
                          </span>
                        </div>
                        {(() => {
                          const cap      = event.capacity as number
                          const vacancy  = cap - total
                          const tooltip  = 'absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10'
                          return (
                            <div className="w-full h-2 bg-transparent rounded-full flex">
                              {entries.map(([k, v]) => (
                                <div key={k}
                                  className="relative group h-full first:rounded-l-full"
                                  style={{ width: `${(v / cap) * 100}%`, backgroundColor: CHART_COLORS[k] ?? '#cbd5e1' }}
                                >
                                  <div className={tooltip}>{PARTICIPANT_LABEL[k]} {v.toLocaleString()}명</div>
                                </div>
                              ))}
                              {vacancy > 0 && (
                                <div className="relative group h-full flex-1 bg-slate-100 rounded-r-full">
                                  <div className={tooltip}>공석 {vacancy.toLocaleString()}석</div>
                                </div>
                              )}
                            </div>
                          )
                        })()}
                      </div>
                    )}

                  </div>
                )
              })()}

              {/* 참여자 결과 */}
              {activeTab === 'results' && (() => {
                if (!event.attendees && !event.completions) return pending(BarChart2, '집계 중이에요', '행사 종료 후 참여 결과가 업데이트될 예정이에요.')

                const REGISTRANT_KEYS = ['regular', 'members', 'external']
                const regMap = event.registrants
                  ? Object.fromEntries((Object.entries(event.registrants).filter(([, v]) => typeof v === 'number')) as [string, number][])
                  : {}
                const attMap = event.attendees
                  ? Object.fromEntries((Object.entries(event.attendees).filter(([, v]) => typeof v === 'number')) as [string, number][])
                  : {}

                const compMap = event.completions
                  ? Object.fromEntries((Object.entries(event.completions).filter(([, v]) => typeof v === 'number')) as [string, number][])
                  : {}

                const resultCard = (headerLabel: string, dataMap: Record<string, number>, colLabel: string, extra?: { label: string; value: number }[]) => {
                  const cardKeys   = [...new Set([...REGISTRANT_KEYS, ...Object.keys(dataMap)])]
                    .filter(k => regMap[k] !== undefined || dataMap[k] !== undefined)
                    .sort((a, b) => PARTICIPANT_ORDER.indexOf(a) - PARTICIPANT_ORDER.indexOf(b))
                  const grandTotal = Object.values(dataMap).reduce((s, v) => s + v, 0)
                  return (
                    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-black text-slate-700">{headerLabel}</p>
                        <span className="text-lg font-extrabold text-blue-600">{grandTotal.toLocaleString()}명</span>
                      </div>
                      {cardKeys.length > 0 && (
                        <div className="border-t border-slate-100 pt-4">
                          <table className="w-full text-xs">
                            <thead>
                              <tr>
                                <th className="text-left pb-2 font-black text-slate-400 w-1/4"></th>
                                <th className="text-right pb-2 font-black text-slate-400">접수</th>
                                <th className="text-right pb-2 font-black text-slate-400">{colLabel}</th>
                                <th className="pb-2 w-2/5"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {cardKeys.map(k => {
                                const r   = regMap[k] ?? 0
                                const a   = dataMap[k] ?? 0
                                const pct = REGISTRANT_KEYS.includes(k) && r > 0 ? (a / r) * 100 : null
                                return (
                                  <tr key={k} className="border-t border-slate-50">
                                    <td className="py-1.5 font-black text-slate-500">{PARTICIPANT_LABEL[k]}</td>
                                    <td className="py-1.5 text-right font-bold text-slate-400">{r > 0 ? `${r}명` : '-'}</td>
                                    <td className="py-1.5 text-right font-bold text-slate-700">{a > 0 ? `${a}명` : '-'}</td>
                                    <td className="py-1.5 pl-3">
                                      {pct !== null
                                        ? <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                              <div className="h-full bg-blue-400 rounded-full" style={{ width: `${pct}%` }} />
                                            </div>
                                            <span className="font-bold text-slate-500 w-9 text-right">{Math.round(pct)}%</span>
                                          </div>
                                        : <span className="text-slate-300">-</span>
                                      }
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {extra && extra.length > 0 && (
                        <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-3 mt-1">
                          {extra.map(({ label, value }) => (
                            <span key={label} className="text-xs text-slate-400">
                              {label} <span className="font-bold text-slate-500">{value}명</span> 참여
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <div className="flex flex-col gap-3">
                    {event.attendees   && resultCard('총 참여', attMap,  '참여')}
                    {event.completions && resultCard('총 수료', compMap, '수료',
                      regMap.operator ? [{ label: '운영진', value: regMap.operator }] : undefined
                    )}
                  </div>
                )
              })()}

            </div>
          </section>
        )
      })()}

    </div>
  )
}
