import { motion } from 'framer-motion'
import { siteData } from '@/data/siteData'

type Milestone = (typeof siteData.milestones)[number]

function groupByYear(milestones: readonly Milestone[]) {
  return milestones.reduce((acc, m) => {
    ;(acc[m.year] ??= []).push(m as Milestone & { month?: number })
    return acc
  }, {} as Record<number, (Milestone & { month?: number })[]>)
}

export default function AboutStoryPage() {
  const grouped = groupByYear(siteData.milestones)

  return (
    <div className="flex flex-col">

      {/* Hero + 단체 소개 */}
      <section className="bg-white pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-slate-200 text-slate-500 rounded-full mb-8 bg-slate-50">
              <span className="text-[10px] font-black uppercase tracking-widest">✦ 동문회 소개</span>
            </div>
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
                첫 운영진 구성은 싸피 사무국의 도움으로 시작됐지만,
                이후 모든 운영·기획·설계는 수료생들의 재능기부로 이루어지고 있습니다.
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
        </div>
      </section>

      {/* 연혁 타임라인 */}
      <section className="bg-slate-50 py-20 lg:py-28 border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-full mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest">History</span>
            </div>
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
            {Object.entries(grouped).map(([year, items]) => (
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
                  {items.map((m, i) => (
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
                        <p className="text-sm text-slate-500 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>


    </div>
  )
}
