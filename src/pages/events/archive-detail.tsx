import { useParams, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, MapPin, CalendarDays, Users, Globe, Monitor, Tv, ExternalLink } from 'lucide-react'
import { allEvents } from '@/data/computed'
import { EVENT_KIND_LABEL, EVENT_AUDIENCE_LABEL, EVENT_FORMAT_LABEL, FORMAT_ORDER } from '@/data/constants'
import { formatEventDate, formatRecruitDate } from '@/lib/utils'

const FORMAT_ICON = { offline: MapPin, online: Monitor, recorded: Tv }

export default function EventsArchiveDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { state } = useLocation()
  const event = allEvents.find(e => e.slug === slug)

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
            className="flex flex-col gap-10"
          >

            {/* 뒤로가기 */}
            <Link
              to={backTo}
              className="inline-flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-blue-500 transition-colors w-fit"
            >
              <ChevronLeft size={14} /> {backLabel}
            </Link>

            {/* 메인 레이아웃: 좌 정보 + 우 이미지 */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 lg:items-start">

              {/* 좌: 텍스트 + 정보 */}
              <div className="flex-1 min-w-0 flex flex-col gap-8">

                {/* 배지 + 제목 + 요약 */}
                <div className="flex flex-col gap-3">
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

                <hr className="border-slate-100" />

                {/* 행사 정보 */}
                <div className="flex flex-col gap-5">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">행사 정보</p>

                  <div className="flex flex-col gap-4">

                    {/* 일시 */}
                    <div className="flex gap-3">
                      <CalendarDays size={15} className="text-blue-400 shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-0.5">
                        <p className="text-xs font-black text-slate-400">일시</p>
                        <p className="text-sm font-medium text-slate-700">{formatEventDate(event.eventDate)}</p>
                      </div>
                    </div>

                    {/* 장소 */}
                    {(event.location || event.locationUrl) && (
                      <div className="flex gap-3">
                        <MapPin size={15} className="text-blue-400 shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1.5">
                          <p className="text-xs font-black text-slate-400">장소</p>
                          {event.location && <p className="text-sm font-medium text-slate-700">{event.location}</p>}
                          {event.locationUrl && (
                            <div className="flex flex-wrap gap-2">
                              {event.locationUrl.naver && (
                                <a href={event.locationUrl.naver} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full
                                              bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                                  네이버지도 <ExternalLink size={9} />
                                </a>
                              )}
                              {event.locationUrl.kakao && (
                                <a href={event.locationUrl.kakao} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full
                                              bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors">
                                  카카오맵 <ExternalLink size={9} />
                                </a>
                              )}
                              {event.locationUrl.google && (
                                <a href={event.locationUrl.google} target="_blank" rel="noopener noreferrer"
                                   className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full
                                              bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors">
                                  구글지도 <ExternalLink size={9} />
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
                        <Monitor size={15} className="text-blue-400 shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1.5">
                          <p className="text-xs font-black text-slate-400">진행 방식</p>
                          <div className="flex flex-wrap gap-2">
                            {[...event.format].sort((a, b) => FORMAT_ORDER.indexOf(a) - FORMAT_ORDER.indexOf(b)).map(f => {
                              const Icon = FORMAT_ICON[f]
                              return (
                                <span key={f} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600
                                                          px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
                                  <Icon size={12} className="text-blue-400" />
                                  {EVENT_FORMAT_LABEL[f]}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 접수 기간 */}
                    {event.recruitDate && (
                      <div className="flex gap-3">
                        <CalendarDays size={15} className="text-blue-400 shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-0.5">
                          <p className="text-xs font-black text-slate-400">접수 기간</p>
                          <p className="text-sm font-medium text-slate-700">{formatRecruitDate(event.recruitDate)}</p>
                        </div>
                      </div>
                    )}

                    {/* 참여 현황 */}
                    {(event.capacity != null || event.registrants != null || event.attendees != null) && (() => {
                      const sumBreakdown = (p: NonNullable<typeof event.attendees>) =>
                        (p.members ?? 0) + (p.regular ?? 0) + (p.external ?? 0) + (p.operator ?? 0) + (p.partner ?? 0) + (p.invited ?? 0)
                      const breakdown = (p: NonNullable<typeof event.attendees>) => <>
                        {p.regular   != null && <span>정회원 {p.regular.toLocaleString()}명</span>}
                        {p.members   != null && <span>일반회원 {p.members.toLocaleString()}명</span>}
                        {p.external  != null && <span>외부인 {p.external.toLocaleString()}명</span>}
                        {p.operator  != null && <span>운영진 {p.operator.toLocaleString()}명</span>}
                        {p.partner   != null && <span>관계자 {p.partner.toLocaleString()}명</span>}
                        {p.invited   != null && <span>초청인원 {p.invited.toLocaleString()}명</span>}
                      </>
                      return (
                        <div className="flex gap-3">
                          <Users size={15} className="text-blue-400 shrink-0 mt-0.5" />
                          <div className="flex flex-col gap-2">
                            <p className="text-xs font-black text-slate-400">참여 현황</p>
                            <div className="flex flex-col gap-1.5">
                              {event.capacity != null && (
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                                  <span className="w-8 text-xs font-black text-slate-400">정원</span>
                                  <span className="font-bold text-slate-700">{event.capacity.toLocaleString()}명</span>
                                </div>
                              )}
                              {event.registrants != null && (
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                                  <span className="w-8 text-xs font-black text-slate-400">접수</span>
                                  <span className="font-bold text-slate-700">{sumBreakdown(event.registrants).toLocaleString()}명</span>
                                  <span className="flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-slate-400">{breakdown(event.registrants)}</span>
                                </div>
                              )}
                              {event.attendees != null && (
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                                  <span className="w-8 text-xs font-black text-slate-400">참여</span>
                                  <span className="font-bold text-slate-700">{sumBreakdown(event.attendees).toLocaleString()}명</span>
                                  <span className="flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-slate-400">{breakdown(event.attendees)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })()}

                  </div>
                </div>
              </div>

              {/* 우: 이미지 */}
              <div className="lg:w-80 shrink-0">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                  {event.img
                    ? <img src={event.img} alt={event.title} className="w-full h-full object-cover" />
                    : <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                        <span className="text-6xl font-black text-slate-200">{year}</span>
                      </div>
                  }
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
