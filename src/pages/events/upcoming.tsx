import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CalendarDays, MapPin, Monitor, Tv } from 'lucide-react'
import { allEvents } from '@/data/computed'
import { EVENT_KIND_LABEL, EVENT_FORMAT_LABEL, FORMAT_ORDER } from '@/data/constants'
import type { Event } from '@/data/constants'
import { formatEventDate } from '@/lib/utils'
import { siteData } from '@/data/siteData'

const YEAR = siteData.upcomingEventYear
const MONTH_KO = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
const FORMAT_ICON = { offline: MapPin, online: Monitor, recorded: Tv }

type EventStatus = 'past' | 'today' | 'recruiting' | 'recruit-closed' | 'before-recruit' | 'no-recruit' | 'planning'

function getStatus(event: Event): EventStatus {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const toDate = (s: string) => { const d = new Date(s); d.setHours(0, 0, 0, 0); return d }

  const eventStart = toDate(event.eventDate.start)
  const eventEnd   = toDate(event.eventDate.end ?? event.eventDate.start)

  if (today > eventEnd)                              return 'past'
  if (today >= eventStart && today <= eventEnd)      return 'today'
  if (!event.recruitDate)                            return event.audience === 'operator' ? 'no-recruit' : 'planning'

  const recruitStart = toDate(event.recruitDate.start)
  const recruitEnd   = toDate(event.recruitDate.end ?? event.recruitDate.start)

  if (today < recruitStart)  return 'before-recruit'
  if (today <= recruitEnd)   return 'recruiting'
  return 'recruit-closed'
}

const STATUS_CONFIG: Record<EventStatus, { label: string; className: string }> = {
  'past':           { label: '종료',       className: 'bg-slate-100 text-slate-400' },
  'today':          { label: '오늘 진행중', className: 'bg-blue-600 text-white' },
  'recruiting':     { label: '접수 중',    className: 'bg-emerald-500 text-white' },
  'recruit-closed': { label: '접수 마감',  className: 'bg-slate-700 text-white' },
  'before-recruit': { label: '접수 예정',  className: 'bg-amber-500 text-white' },
  'no-recruit':     { label: '운영진',     className: 'bg-slate-100 text-slate-500' },
  'planning':       { label: '계획중',     className: 'bg-slate-200 text-slate-500' },
}

function shouldShowRibbon(event: Event, status: EventStatus): boolean {
  if (status === 'past' || status === 'planning') return false
  if (status === 'before-recruit') {
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const recruitStart = new Date(event.recruitDate!.start); recruitStart.setHours(0, 0, 0, 0)
    const daysUntil = (recruitStart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    return daysUntil <= 14
  }
  return true
}

export default function EventsUpcomingPage() {
  const today = new Date(); today.setHours(0, 0, 0, 0)

  const events = allEvents
    .filter(e => new Date(e.eventDate.start).getFullYear() === YEAR)
    .filter(e => {
      const eventEnd = new Date(e.eventDate.end ?? e.eventDate.start); eventEnd.setHours(0, 0, 0, 0)
      if (today > eventEnd) return true
      if (!e.recruitDate) return true
      return true
    })
    .sort((a, b) => a.eventDate.start.localeCompare(b.eventDate.start))

  const hasPlanningEvents = events.some(e => getStatus(e) === 'planning')

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
              <span className="text-[10px] font-black uppercase tracking-widest">✦ {YEAR} Annual Events</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-2">
              올 한 해, 싸피니티와 함께
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">
              {YEAR} 행사 일정
            </p>
            <p className="text-sm text-slate-500 leading-relaxed break-keep">
              {YEAR}년 싸피니티가 준비한 행사 라인업을 미리 확인하고, 원하는 행사에 참여해보세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 목록 */}
      <section className="bg-slate-50 pt-6 pb-14 lg:pt-8 lg:pb-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">

          {/* 계획중 행사 안내 — 계획중 행사가 있을 때만 노출 */}
          {hasPlanningEvents && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 mb-3">
              <span className="text-blue-400 text-base leading-none mt-0.5 shrink-0">ℹ</span>
              <p className="text-xs text-blue-600 leading-relaxed break-keep">
                운영진이 동문회 운영을 감안하여 계획한 행사 후보 중, <span className="font-bold">최종 일정은 정회원 투표로 확정</span>됩니다.
              </p>
            </div>
          )}

          {events.length === 0 ? (
            <div className="flex flex-col items-center gap-5 py-24 text-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                <CalendarDays size={24} className="text-slate-300" />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-bold text-slate-500">{YEAR}년 행사를 기획하고 있습니다.</p>
                <p className="text-xs text-slate-400 break-keep">운영진이 올해 일정을 열심히 준비 중이에요. 확정되는 대로 이 페이지에서 바로 만나볼 수 있어요.</p>
              </div>
              <Link
                to="/events/archive"
                className="text-xs font-black text-blue-500 hover:text-blue-700 transition-colors"
              >
                역대 모든 행사 보기 →
              </Link>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
              className="flex flex-col gap-2.5"
            >
              {events.map(event => {
                const status = getStatus(event)
                const cfg    = STATUS_CONFIG[status]
                const isPast = status === 'past'
                const d      = new Date(event.eventDate.start)

                return (
                  <motion.div
                    key={event.slug}
                    variants={{
                      hidden:  { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <Link
                      to={`/events/archive/${event.slug}`}
                      state={{ from: 'upcoming' }}
                      className={`relative overflow-hidden group flex items-start gap-4 bg-white border rounded-2xl px-5 py-4 pr-14
                                  hover:border-blue-200 hover:shadow-md transition-all duration-200
                                  ${isPast ? 'border-slate-100' : 'border-slate-200'}`}
                    >
                      {/* 날짜 블록 */}
                      <div className={`shrink-0 w-10 flex flex-col items-center pt-0.5 ${isPast ? 'opacity-40' : ''}`}>
                        <span className="text-[10px] font-black text-blue-500">
                          {MONTH_KO[d.getMonth()]}
                        </span>
                        <span className={`text-2xl font-black leading-none ${isPast ? 'text-slate-400' : 'text-slate-800'}`}>
                          {status === 'planning' ? '○' : String(d.getDate()).padStart(2, '0')}
                        </span>
                      </div>

                      {/* 구분선 */}
                      <div className={`w-px self-stretch shrink-0 ${isPast ? 'bg-slate-100' : 'bg-slate-200'}`} />

                      {/* 콘텐츠 */}
                      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                        {event.kind && (
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                              {EVENT_KIND_LABEL[event.kind]}
                            </span>
                          </div>
                        )}
                        <p className={`text-sm font-extrabold leading-snug group-hover:text-blue-600 transition-colors
                                      ${isPast ? 'text-slate-400' : 'text-slate-900'}`}>
                          {event.title}
                        </p>
                        <div className={`flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs ${isPast ? 'text-slate-300' : 'text-slate-400'}`}>
                          <span className="flex items-center gap-1">
                            <CalendarDays size={11} className="shrink-0" />
                            {formatEventDate(event.eventDate)}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin size={11} className="shrink-0" />
                              {event.location}
                            </span>
                          )}
                          <span className="flex items-center gap-2">
                            {[...event.format].sort((a, b) => FORMAT_ORDER.indexOf(a) - FORMAT_ORDER.indexOf(b)).map(f => {
                              const Icon = FORMAT_ICON[f]
                              return (
                                <span key={f} className="flex items-center gap-0.5">
                                  <Icon size={11} className="shrink-0" />
                                  {EVENT_FORMAT_LABEL[f]}
                                </span>
                              )
                            })}
                          </span>
                        </div>
                      </div>

                      {/* 세로 리본 — 특정 상태만 노출 */}
                      {shouldShowRibbon(event, status) && (
                        <div className={`absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center ${cfg.className}`}>
                          <span className="text-[10px] font-semibold tracking-wider [writing-mode:vertical-rl]">
                            {cfg.label}
                          </span>
                        </div>
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

        </div>
      </section>

    </div>
  )
}
