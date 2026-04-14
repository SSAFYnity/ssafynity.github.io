import { useState } from 'react'
import { motion } from 'framer-motion'
import { siteData } from '@/data/siteData'
import { Container } from '@/components/Container'
import { ResponsiveText } from '@/components/ResponsiveText'

import { HeroLabel } from '@/components/HeroLabel'
import { BlueSectionBadge } from '@/components/BlueSectionBadge'
type Milestone = (typeof siteData.milestones)[number]
type CohortStat = (typeof siteData.cohortStats)[number]
type CampusStat = (typeof siteData.campusStats)[number]

function groupByYear(milestones: readonly Milestone[]) {
  return milestones.reduce((acc, m) => {
    ;(acc[m.year] ??= []).push(m as Milestone & { month?: number })
    return acc
  }, {} as Record<number, (Milestone & { month?: number })[]>)
}

export default function AboutStoryPage() {
  const [distributionTab, setDistributionTab] = useState<'cohort' | 'campus'>('cohort')
  const grouped = groupByYear(siteData.milestones)
  const cohortStats = [...siteData.cohortStats].sort((a, b) => a.cohort - b.cohort)
  const campusStats = [...siteData.campusStats].sort((a, b) => b.count - a.count)
  const highestCohortCount = Math.max(...cohortStats.map(item => item.count))
  const highestCampusCount = Math.max(...campusStats.map(item => item.count))
  const firstCohort = cohortStats[0]
  const latestCohort = cohortStats[cohortStats.length - 1]
  const largestCohort = cohortStats.reduce((largest, item) => item.count > largest.count ? item : largest, cohortStats[0] as CohortStat)
  const largestCampus = campusStats.reduce((largest, item) => item.count > largest.count ? item : largest, campusStats[0] as CampusStat)
  const totalMembers = cohortStats.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="flex flex-col">

      {/* Hero + 단체 소개 */}
      <section className="bg-white pt-24 pb-10 lg:pt-28 lg:pb-14">
                <Container maxWidth="3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroLabel>동문회 소개</HeroLabel>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.2] text-slate-900 mb-2">
              {siteData.brand.slogan}
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">
              SSAFYnity 싸피니티
            </p>
            <p className="text-sm text-slate-400 font-medium mb-14 text-right">
              2022년 창설 · SSAFY 수료생 동문회
            </p>

            <div className="space-y-6 text-slate-600 leading-[1.9] text-[1.05rem]">
              <p>
                짧게는 몇 달, 길게는 1년을 함께 교육받으며 쌓은 인연.
                해를 거듭할수록 사회 곳곳에서 마주치는 싸피 수료생들이 늘어가고,
                그 소중한 인연과 경험을 계속해서 이어갈 소통망의 필요성이 싸피니티의 시작이었습니다.
              </p>
              <p>
                동문회의 필요성에 공감하는 수료생들이 모여 첫 운영진을 구성했고,
                모든 운영·기획·설계는 수료생들의 재능기부로 이루어지고 있습니다.
                싸피니티는 어떠한 영리 목적도 없는{' '}
                <strong className="text-slate-800 font-semibold">비영리 동문 단체</strong>로,
                온전히 회원들의 자발적인 참여로 운영됩니다.
              </p>
              <blockquote className="border-l-2 border-blue-400/50 pl-5 text-slate-500 italic">
                사회의 든든한 동료이자, 어디에 있든 오래 이어갈 좋은 친구로 — 그 연을 함께 만들어가길 바랍니다.
              </blockquote>
              <p className="text-right text-sm font-bold text-slate-400">
                — SSAFYnity 운영진 일동
              </p>
            </div>
          </motion.div>
                </Container>
      </section>

      {/* 동문 구성 */}
      <section className="bg-slate-50 py-20 lg:py-24 border-t border-slate-100">
                <Container maxWidth="3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <BlueSectionBadge className="mb-6">Members</BlueSectionBadge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              함께하는 동문의
              <span className="block text-blue-600">회원 분포</span>
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed break-keep text-pretty max-w-2xl">
              SSAFYnity는 특정 기수에 머물지 않고 여러 기수가 함께 이어가는 공동체입니다.
              기수와 캠퍼스를 넘나드는 참여가 쌓이며 지금의 동문 네트워크를 만들고 있습니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] border border-slate-200 bg-white p-5 sm:p-7 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1.5">Member Distribution</p>
                <p className="text-sm text-slate-500">총 {totalMembers.toLocaleString()}명의 동문이 어떤 기수와 캠퍼스에서 함께하고 있는지 보여줍니다.</p>
              </div>
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setDistributionTab('cohort')}
                  className={`rounded-full px-4 py-2 text-xs font-black transition-colors ${
                    distributionTab === 'cohort'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  기수
                </button>
                <button
                  type="button"
                  onClick={() => setDistributionTab('campus')}
                  className={`rounded-full px-4 py-2 text-xs font-black transition-colors ${
                    distributionTab === 'campus'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  캠퍼스
                </button>
              </div>
                </div>

            {distributionTab === 'cohort' ? (
              <>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <p className="text-sm text-slate-500">SSAFY {firstCohort.cohort}기부터 {latestCohort.cohort}기까지의 기수별 동문회 가입 인원입니다.</p>
                  <p className="hidden sm:block text-xs text-slate-400">{largestCohort.cohort}기가 가장 많은 참여를 보이고 있습니다.</p>
                </div>
                <div className="space-y-3">
                  {cohortStats.map((item) => {
                    const ratio = (item.count / highestCohortCount) * 100
                    return (
                      <div key={item.cohort} className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-extrabold text-slate-900">{item.cohort}기</span>
                        </div>
                        <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500"
                            style={{ width: `${Math.max(ratio, 6)}%` }}
                          />
                        </div>
                        <div className="min-w-[3.5rem] text-right">
                          <span className="text-sm font-black text-slate-900">{item.count}</span>
                          <span className="ml-1 text-xs font-bold text-slate-400">명</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <p className="text-sm text-slate-500">서울, 대전, 광주, 구미, 부울경 기준 캠퍼스별 동문회 가입 인원입니다.</p>
                  <p className="hidden sm:block text-xs text-slate-400">{largestCampus.campus} 캠퍼스가 가장 큰 비중을 차지합니다.</p>
                </div>
                <div className="space-y-3">
                  {campusStats.map((item) => {
                    const ratio = (item.count / highestCampusCount) * 100

                    return (
                      <div key={item.campus} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-extrabold text-slate-900">{item.campus}</span>
                        </div>
                        <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500"
                            style={{ width: `${Math.max(ratio, 6)}%` }}
                          />
                        </div>
                        <div className="min-w-[3.5rem] text-right">
                          <span className="text-sm font-black text-slate-900">{item.count}</span>
                          <span className="ml-1 text-xs font-bold text-slate-400">명</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </motion.div>
                </Container>
      </section>

      {/* 연혁 타임라인 */}
      <section className="bg-slate-50 py-20 lg:py-28 border-t border-slate-100">
                <Container maxWidth="3xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <BlueSectionBadge className="mb-6">History</BlueSectionBadge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              싸피니티의 <span className="text-blue-600">발자취</span>
            </h2>
          </motion.div>

          {/* 연도별 그룹 타임라인 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
            className="space-y-12"
          >
            {Object.entries(grouped)
              .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
              .map(([year, items]) => (
              <motion.div
                key={year}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
                className="grid grid-cols-[4rem_1fr] md:grid-cols-[5rem_1fr] gap-x-8"
              >
                {/* 연도 */}
                <div className="pt-0.5 text-right">
                  <span className="text-lg font-black text-blue-600">{year}</span>
                </div>

                {/* 항목들 */}
                <div>
                  {[...items].sort((a, b) => (b.month ?? 0) - (a.month ?? 0)).map((m, i) => (
                    <div key={i} className="flex gap-5">
                      {/* 점 + 세로선 */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-blue-600 ring-[3px] ring-slate-50 mt-[6px]" />
                        {i < items.length - 1 && (
                          <div className="w-px flex-1 bg-slate-200 mt-1.5" />
                        )}
                      </div>
                      {/* 내용 */}
                      <div className={i < items.length - 1 ? 'flex-1 pb-7' : 'flex-1'}>
                        {'month' in m && m.month != null && (
                          <span className="text-[10px] font-black text-blue-400 tracking-widest uppercase">
                            {m.month}월
                          </span>
                        )}
                        <h3 className="text-base font-extrabold text-slate-900 mt-0.5 mb-1">{m.label}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed break-keep text-pretty"><ResponsiveText text={m.desc} /></p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

                </Container>
      </section>


    </div>
  )
}
