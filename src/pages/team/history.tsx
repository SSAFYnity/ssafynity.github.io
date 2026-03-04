import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Globe, ClipboardList, Megaphone, Wrench, MessageCircle, UserPlus, Receipt, Wallet, FileText, Palette, ExternalLink, type LucideIcon } from 'lucide-react'
import { allOperators } from '@/data/computed'


const TEAM_ICONS: Record<string, LucideIcon> = {
  '기획국': ClipboardList, '기획팀': ClipboardList,
  '홍보국': Megaphone,    '홍보팀': Megaphone,
  '운영국': Wrench,
  '소통국': MessageCircle, '소통팀': MessageCircle,
  '인사관리국': UserPlus,  '인사팀': UserPlus,
  '경영지원국': Receipt,
  '재무팀': Wallet,
  '컨텐츠팀': FileText,
  '디자인팀': Palette,
  '대외협력팀': Globe,
}

const generations = [...allOperators].reverse()

export default function TeamHistoryPage() {
  const [activeTab, setActiveTab] = useState(0)
  const current = generations[activeTab]

  const LEADERSHIP_GROUPS = ['임원진']

  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-white pt-24 pb-16 lg:pt-28 lg:pb-20 border-b border-slate-100">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-slate-200 text-slate-500 rounded-full mb-8 bg-slate-50">
              <span className="text-[10px] font-black uppercase tracking-widest">✦ Alumni Staff History</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-5">
              싸피니티를 지켜온<br />
              <span className="text-blue-600">소중한 발자취</span>
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed break-keep max-w-lg">
              1기부터 현재까지, 열정으로 커뮤니티의 기반을 닦아온 역대 운영진을 소개합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 탭 + 콘텐츠 */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            {/* 탭 네비게이션 */}
            <div className="lg:w-1/5 shrink-0">
              <p className="text-xs text-slate-400 mb-3 flex items-center gap-1.5">
                <span className="text-[10px] font-black text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded shrink-0">임원진</span>
                동문회 운영의 최종 결정권자
              </p>
              <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                {generations.map((gen, i) => (
                  <button
                    key={gen.generation}
                    onClick={() => setActiveTab(i)}
                    className={`flex-shrink-0 px-5 py-4 rounded-xl border transition-all duration-200 text-left ${
                      activeTab === i
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200 hover:bg-white'
                    }`}
                  >
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${activeTab === i ? 'text-blue-200' : 'text-slate-400'}`}>
                      {gen.year}
                    </p>
                    <p className="text-base font-extrabold">{gen.generation}기 {gen.generation <= 2 ? '집행부' : '운영진'}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 콘텐츠 */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl border border-slate-100 p-8 lg:p-10"
                >
                  {/* 헤더 + 성과 */}
                  {(() => {
                    const executives = current.groups.find(g => g.name === '임원진')
                    const councilMembers = executives?.members.filter(m => m.council && !m.vacant) ?? []
                    return (
                      <div className="mb-6 pb-6 border-b border-slate-100">
                        <div className="flex sm:items-start justify-between gap-6 mb-4">
                          <div className="flex flex-col gap-1.5">
                            <h2 className="text-2xl font-extrabold text-slate-900">{current.generation}기 싸피니티</h2>
                            <p className="text-xs font-black text-blue-600 uppercase tracking-widest">{current.year} Edition</p>
                            {current.note && (
                              <p className="text-xs text-slate-400">{current.note}</p>
                            )}
                          </div>
                          {councilMembers.length > 0 && (
                            <div className="flex flex-wrap gap-2 shrink-0">
                              {councilMembers.map((m, i) => {
                                const inner = (
                                  <>
                                    <p className="text-[10px] font-black text-blue-700 bg-blue-100 inline-block px-1.5 py-0.5 rounded mb-1">{m.role}</p>
                                    <p className="text-sm font-extrabold text-slate-800 whitespace-nowrap">
                                      <span className="inline-flex items-center gap-1">
                                        {m.name ?? '(공석)'}
                                        {'url' in m && m.url && <ExternalLink className="w-3 h-3 text-blue-400 shrink-0" />}
                                      </span>
                                    </p>
                                    {'cohort' in m && m.cohort != null && (
                                      <p className="text-[10px] text-slate-400 mt-0.5">{m.cohort}기{('campus' in m && m.campus != null) ? ` · ${m.campus}` : ''}</p>
                                    )}
                                  </>
                                )
                                return 'url' in m && m.url ? (
                                  <a key={i} href={m.url} target="_blank" rel="noopener noreferrer"
                                    className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-center hover:border-blue-200 hover:bg-blue-50 transition-colors">
                                    {inner}
                                  </a>
                                ) : (
                                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-center">
                                    {inner}
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                          {current.achievements && current.achievements.length > 0 && (
                            <div className="flex-1">
                              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">주요 성과</p>
                              <ul className="flex flex-col gap-1.5">
                                {current.achievements.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                    <span className="text-blue-400 font-black mt-0.5 shrink-0">·</span>
                                    {item.text}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="flex gap-2 self-end sm:shrink-0">
                            {current.memberCount != null && (
                              <div className="rounded-xl px-4 py-3 text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">총원</p>
                                <p className="text-sm font-extrabold text-slate-800">{current.memberCount}<span className="text-xs font-black text-slate-400 ml-0.5">명</span></p>
                              </div>
                            )}
                            {current.teamCount != null && (
                              <div className="rounded-xl px-4 py-3 text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{current.generation <= 2 ? '국 수' : '팀 수'}</p>
                                <p className="text-sm font-extrabold text-slate-800">{current.teamCount}<span className="text-xs font-black text-slate-400 ml-0.5">{current.generation <= 2 ? '국' : '팀'}</span></p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })()}

                  {/* 전담 팀 */}
                  {(() => {
                    const teams = current.groups.filter(g => !LEADERSHIP_GROUPS.includes(g.name))
                    if (teams.length === 0) return null
                    return (
                      <div>
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">{current.generation <= 2 ? '전담 국' : '전담 팀'}</p>
                        <div className={`grid sm:grid-cols-2 gap-3 ${teams.length % 3 === 1 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
                          {teams.map((group, i) => {
                            const activeMembers = group.members.filter(m => !m.vacant)
                            return (
                              <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                    {(() => { const Icon = TEAM_ICONS[group.name] ?? Users; return <Icon className="w-3.5 h-3.5 text-blue-600" /> })()}
                                  </div>
                                  <h3 className="text-sm font-extrabold text-slate-800">{group.name}</h3>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  {activeMembers.map((m, mi) => {
                                    const isExec = m.role.endsWith('장')
                                    return (
                                    <div key={mi} className="flex items-center gap-2 flex-wrap">
                                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded shrink-0 inline-block w-12 text-center ${isExec ? 'text-blue-700 bg-blue-100' : 'text-blue-600 bg-blue-50'}`}>{m.role}</span>
                                      {'url' in m && m.url ? (
                                        <a href={m.url} target="_blank" rel="noopener noreferrer"
                                          className="text-xs font-extrabold text-slate-800 hover:text-blue-600 hover:underline transition-colors">
                                          {m.name}
                                        </a>
                                      ) : (
                                        <span className="text-xs font-extrabold text-slate-800">{m.name ?? '(공석)'}</span>
                                      )}
                                      <span className="w-3 h-3 shrink-0 flex items-center justify-center">
                                        {'url' in m && m.url && <ExternalLink className="w-3 h-3 text-blue-300" />}
                                      </span>
                                      {'cohort' in m && m.cohort != null && (
                                        <span className="text-[10px] text-slate-400">{m.cohort}기{('campus' in m && m.campus != null) ? ` · ${m.campus}` : ''}</span>
                                      )}
                                    </div>
                                  )})}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-950 py-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl text-center">
          <h2 className="text-xl font-extrabold text-white mb-3">함께 역사를 만들어갈 다음 주인공을 기다립니다.</h2>
          <p className="text-sm text-blue-200 mb-8">여러분의 기여가 SSAFYnity 동문회의 내일을 바꿉니다.</p>
          <Link
            to="/team/apply"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                       bg-white text-blue-950 text-sm font-black tracking-wide
                       hover:bg-blue-100 transition-colors"
          >
            운영진 지원하기
          </Link>
        </div>
      </section>

    </div>
  )
}
