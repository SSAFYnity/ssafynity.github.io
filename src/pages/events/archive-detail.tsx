import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, MapPin, CalendarDays, Users, Globe, Monitor, Tv, ExternalLink } from 'lucide-react'
import { allEvents } from '@/data/computed'
import { EVENT_KIND_LABEL, EVENT_AUDIENCE_LABEL, EVENT_FORMAT_LABEL, FORMAT_ORDER } from '@/data/constants'
import { formatEventDate, formatRecruitDate } from '@/lib/utils'

const FORMAT_ICON = { offline: MapPin, online: Monitor, recorded: Tv }

export default function EventsArchiveDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const event = allEvents.find(e => e.slug === slug)

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-slate-400 text-sm">행사를 찾을 수 없습니다.</p>
        <Link to="/events/archive" className="text-xs font-black text-blue-500 hover:text-blue-700">
          ← 역대 행사로 돌아가기
        </Link>
      </div>
    )
  }

  const year = new Date(event.eventDate.start).getFullYear()

  return (
    <div className="flex flex-col">

      {/* 히어로 이미지 */}
      <div className="w-full bg-slate-100 aspect-[3/1] overflow-hidden">
        {event.img
          ? <img src={event.img} alt={event.title} className="w-full h-full object-cover object-top" />
          : <div className="w-full h-full bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
              <span className="text-8xl font-black text-slate-200">{year}</span>
            </div>
        }
      </div>

      {/* 본문 */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >

            {/* 뒤로가기 */}
            <Link
              to="/events/archive"
              className="inline-flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-blue-500 transition-colors w-fit"
            >
              <ChevronLeft size={14} /> 역대 행사
            </Link>

            {/* 뱃지 + 제목 */}
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
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">행사 정보</p>

              <div className="grid sm:grid-cols-2 gap-4">

                {/* 일시 */}
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-black text-slate-400">일시</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <CalendarDays size={14} className="text-blue-400 shrink-0" />
                    <span>{formatEventDate(event.eventDate)}</span>
                  </div>
                </div>

                {/* 장소 */}
                {(event.location || event.locationUrl) && (
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-black text-slate-400">장소</p>
                    <div className="flex items-start gap-2 text-sm font-medium text-slate-700">
                      <MapPin size={14} className="text-blue-400 shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1.5">
                        {event.location && <span>{event.location}</span>}
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
                  </div>
                )}

                {/* 진행 방식 */}
                {event.format && event.format.length > 0 && (
                  <div className="flex flex-col gap-1">
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
                )}

                {/* 접수 기간 */}
                {event.recruitDate && (
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-black text-slate-400">접수 기간</p>
                    <p className="text-sm font-medium text-slate-700">
                      {formatRecruitDate(event.recruitDate)}
                    </p>
                  </div>
                )}

                {/* 참여 현황 */}
                {(event.capacity != null || event.participants != null) && (
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-black text-slate-400">참여 현황</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-slate-700">
                      {event.capacity != null && (
                        <span>정원 {event.capacity.toLocaleString()}명</span>
                      )}
                      {event.participants != null && (() => {
                        const p = event.participants
                        const total = (p.regular ?? 0) + (p.members ?? 0) + (p.external ?? 0)
                        return <>
                          {total > 0 && <span className="font-bold">총 {total.toLocaleString()}명</span>}
                          {p.regular  != null && <span>정회원 {p.regular.toLocaleString()}명</span>}
                          {p.members  != null && <span>일반회원 {p.members.toLocaleString()}명</span>}
                          {p.external != null && <span>외부인 {p.external.toLocaleString()}명</span>}
                        </>
                      })()}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </motion.div>
        </div>
      </section>

    </div>
  )
}
