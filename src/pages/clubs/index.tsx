import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import { allClubs } from '@/data/computed'

export default function ClubsPage() {
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
              동문들이 만든
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">
              정식 동아리
            </p>
            <p className="text-sm text-slate-500 leading-relaxed break-keep">
              SSAFYnity 공식 소속 동아리 목록입니다.<br />
              관심 있는 동아리에 직접 연락해 가입해보세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 목록 */}
      <section className="bg-slate-50 pt-8 pb-20 lg:pt-10">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          {allClubs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-sm font-extrabold text-slate-700">등록된 정식 동아리가 없습니다</p>
              <p className="text-sm text-slate-400 break-keep">첫 번째 동아리를 만들어보세요.</p>
              <Link
                to="/clubs/apply"
                className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-black hover:bg-blue-700 transition-colors"
              >
                동아리 신청하기
              </Link>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allClubs.map((club, i) => (
                <motion.div
                  key={club.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Link
                    to={`/clubs/${club.slug}`}
                    className="flex flex-col gap-4 bg-white rounded-2xl border border-slate-100 p-6 h-full hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                        {club.category}
                      </span>
                      {club.recruiting && (
                        <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-green-50 text-green-600 shrink-0">
                          모집 중
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <p className="text-base font-extrabold text-slate-900">{club.name}</p>
                      <p className="text-sm text-slate-500 leading-relaxed break-keep">{club.shortDesc}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{club.since}년 개설</span>
                      <span>·</span>
                      <span>{club.memberCount}명</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
