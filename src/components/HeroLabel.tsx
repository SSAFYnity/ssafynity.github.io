// src/components/HeroLabel.tsx
// Hero 섹션 상단의 ✦ 뱃지. 페이지 카테고리/섹션명을 표시.
// 사용처: about, clubs, events, operator 등 전체 페이지 Hero 섹션

import type { ReactNode } from 'react'

interface HeroLabelProps {
  children: ReactNode
}

export function HeroLabel({ children }: HeroLabelProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-slate-200 text-slate-500 rounded-full mb-8 bg-slate-50">
      <span className="text-[10px] font-black uppercase tracking-widest">✦ {children}</span>
    </div>
  )
}
