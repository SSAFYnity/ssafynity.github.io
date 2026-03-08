import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ClubsPrePage() {
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
              함께할 사람을 찾고 있나요?
            </h1>
            <p className="text-xl md:text-2xl font-black text-blue-600 mb-4">
              예비 동아리
            </p>
            <p className="text-sm text-slate-500 leading-relaxed break-keep">
              아직 인원이 부족하지만 동아리를 만들고 싶은 동문들이 멤버를 모집하는 공간입니다.<br />
              5인 이상이 모이면 정식 동아리로 전환 신청할 수 있습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 목록 */}
      <section className="bg-slate-50 pt-8 pb-14 lg:pt-10 lg:pb-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
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
            <p className="text-sm text-slate-400 break-keep">관심사가 있다면 직접 예비 동아리를 만들어보세요.</p>
            <Link
              to="/clubs/apply"
              className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-black hover:bg-blue-700 transition-colors"
            >
              동아리 신청하기
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
