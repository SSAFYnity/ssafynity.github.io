import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Users, Activity, Clock, UserCheck, UserPlus, MessageCircle, ExternalLink, Github, FileText, Link as LinkIcon } from 'lucide-react'
import { allClubs, type ContactIconKey } from '@/data/computed'
import { CLUB_CATEGORIES, MODE_CONFIG, type ModeKey } from '@/data/constants'
import { Pill } from '@/components/Pill'
import { Container } from '@/components/Container'
import { Kicker } from '@/components/Kicker'
import { Card } from '@/components/Card'


const CONTACT_ICON_CONFIG: Record<ContactIconKey, React.ElementType> = {
  apply:   UserPlus,
  direct:  MessageCircle,
  kakao:   MessageCircle,
  discord: MessageCircle,
  github:  Github,
  notion:  FileText,
  link:    LinkIcon,
}

function FieldText({ value }: { value: string | string[] }) {
  if (Array.isArray(value)) {
    return (
      <div className="flex flex-col gap-1.5 pt-0.5">
        {value.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0 mt-2" />
            <p className="text-sm text-slate-500 leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    )
  }
  return <p className="text-sm text-slate-500 leading-relaxed">{value}</p>
}

export default function ClubDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const club = allClubs.find(c => c.slug === slug)

  if (!club) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-6">
        <p className="text-sm font-extrabold text-slate-700">동아리를 찾을 수 없습니다.</p>
        <p className="text-xs text-slate-400">주소를 확인하거나 목록으로 돌아가주세요.</p>
        <Link
          to="/clubs"
          className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-black hover:bg-blue-700 transition-colors"
        >
          전체 동아리 보기
        </Link>
      </div>
    )
  }

  const { label: categoryLabel } = CLUB_CATEGORIES[club.category]

  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-white pt-24 pb-10 lg:pt-28 lg:pb-14 border-b border-slate-100">
                <Container maxWidth="5xl">
          <Link
            to="/clubs"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-500 transition-colors mb-8"
          >
            <ArrowLeft size={13} />
            전체 동아리
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <Pill className="bg-blue-50 text-blue-600 w-fit">{categoryLabel}</Pill>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
              {club.name}
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed break-keep max-w-xl">
              {club.shortDesc}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-500">
                <Calendar size={11} className="shrink-0" />
                {club.since}년 개설
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-500">
                <Users size={11} className="shrink-0" />
                {club.memberCount}명
              </span>
              {club.modes?.map(m => (
                <span key={m} className={`px-3 py-1.5 rounded-full text-xs font-black ${MODE_CONFIG[m as ModeKey].className}`}>
                  {MODE_CONFIG[m as ModeKey].label}
                </span>
              ))}
            </div>
          </motion.div>
                </Container>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="bg-slate-50 pt-8 pb-14 lg:pt-10 lg:pb-16 border-b border-slate-100">
                <Container maxWidth="5xl">
          <div className="grid lg:grid-cols-[1fr_280px] gap-8 items-start">

            {/* 좌측 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              {/* About */}
              <div className="flex flex-col gap-3">
                <Kicker className="text-[10px] font-black text-blue-600 uppercase tracking-widest">About</Kicker>
                <p className="text-sm text-slate-600 leading-relaxed break-keep whitespace-pre-line">
                  {club.desc}
                </p>
                {club.keywords && club.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {club.keywords.map(k => (
                      <span key={k} className="px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-medium text-slate-400">
                        #{k}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Highlights — About 바로 아래 (선택) */}
              {club.achievements && club.achievements.length > 0 && (
                <div className="flex flex-col gap-3">
                  <Kicker className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Highlights</Kicker>
                  <div className="flex flex-col gap-2">
                    {club.achievements.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2" />
                        <p className="text-sm text-slate-600 leading-relaxed break-keep">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 활동 방식 / 정기 일정 / 모집 대상 */}
              <div className="flex flex-col gap-2">
                                <Card className="bg-white rounded-2xl border border-slate-100 px-5 py-4 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Activity size={14} className="text-blue-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-black text-slate-700">활동 방식</p>
                    <FieldText value={club.activities} />
                  </div>
                                </Card>
                {club.schedule && (
                                    <Card className="bg-white rounded-2xl border border-slate-100 px-5 py-4 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock size={14} className="text-blue-600" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-black text-slate-700">정기 일정</p>
                      <FieldText value={club.schedule} />
                    </div>
                                    </Card>
                )}
                {club.target && (
                                    <Card className="bg-white rounded-2xl border border-slate-100 px-5 py-4 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <UserCheck size={14} className="text-blue-600" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-black text-slate-700">모집 대상</p>
                      <FieldText value={club.target} />
                    </div>
                                    </Card>
                )}
              </div>

              {/* 가입 절차 (선택) */}
              {club.joinProcess && club.joinProcess.length > 0 && (
                <div className="flex flex-col gap-3">
                  <Kicker className="text-[10px] font-black text-blue-600 uppercase tracking-widest">How to Join</Kicker>
                  <div className="flex flex-col gap-2">
                    {club.joinProcess.map((step, i) => (
                      <Card key={i} className="flex items-start gap-3 px-5 py-4">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-sm text-slate-500 leading-relaxed break-keep">{step}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* 유의사항 (선택) */}
              {club.notes && club.notes.length > 0 && (
                <div className="flex flex-col gap-3">
                  <Kicker className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Notice</Kicker>
                  <div className="flex flex-col gap-2">
                    {club.notes.map((note, i) => (
                      <Card key={i} className="flex items-start gap-3 px-5 py-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2" />
                        <p className="text-sm text-slate-600 leading-relaxed break-keep">{note}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* 우측: 사이드 정보 카드 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-24 flex flex-col gap-3"
            >
                            <Card className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-5">
                {/* Stats */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">개설 연도</span>
                    <span className="font-black text-slate-700">{club.since}년</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">멤버 수</span>
                    <span className="font-black text-slate-700">{club.memberCount}명</span>
                  </div>
                  {club.fee !== undefined && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">회비</span>
                      <span className="font-black text-slate-700">{club.fee}</span>
                    </div>
                  )}
                  {club.modes && club.modes.length > 0 && (
                    <div className="flex items-center justify-between text-xs gap-2">
                      <span className="text-slate-400 shrink-0">활동 형태</span>
                      <div className="flex flex-wrap justify-end gap-1">
                        {club.modes.map(m => (
                          <span key={m} className={`text-[10px] font-black px-2 py-0.5 rounded-full ${MODE_CONFIG[m as ModeKey].className}`}>
                            {MODE_CONFIG[m as ModeKey].label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {club.region && (
                    <div className="flex items-center justify-between text-xs gap-3">
                      <span className="text-slate-400 shrink-0">활동 지역</span>
                      <span className="font-black text-slate-700 text-right">{club.region}</span>
                    </div>
                  )}
                </div>

                {/* Links (선택) */}
                {club.links && club.links.length > 0 && (
                  <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
                    <p className="text-[10px] font-black text-slate-400 tracking-widest mb-0.5">Links</p>
                    {club.links.map(link => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-xs px-3 py-2 rounded-xl border border-slate-100 text-slate-500 hover:border-blue-200 hover:text-blue-600 transition-colors"
                      >
                        {link.label}
                        <ExternalLink size={10} className="shrink-0 text-slate-300" />
                      </a>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-col gap-2">
                  {club.contacts.map((c, i) => {
                    const Icon = c.icon ? CONTACT_ICON_CONFIG[c.icon] : ExternalLink
                    return (
                      <a
                        key={i}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-colors ${
                          i === 0
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'border border-blue-200 text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {c.label}
                        <Icon size={14} />
                      </a>
                    )
                  })}
                </div>
                            </Card>
            </motion.div>

          </div>
                </Container>
      </section>

      {/* 활동 사진 갤러리 */}
      {club.images.length > 0 && (
        <section className="bg-white pt-8 pb-14 lg:pt-10 lg:pb-16 border-b border-slate-100">
                    <Container maxWidth="5xl" className="flex flex-col gap-5">
            <Kicker className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Gallery</Kicker>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {club.images.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="aspect-square rounded-2xl overflow-hidden bg-slate-100"
                >
                  <img
                    src={src}
                    alt={`${club.name} 활동사진 ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
                    </Container>
        </section>
      )}

    </div>
  )
}
