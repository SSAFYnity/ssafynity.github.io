// src/components/SearchBar.tsx
// 버튼 제출 방식 검색 바. Enter 키 또는 검색 버튼으로 onSubmit 호출.
// 사용처: clubs/index.tsx, clubs/pre.tsx

import { Search } from 'lucide-react'

interface SearchBarProps {
  value:        string
  onChange:     (v: string) => void
  onSubmit:     () => void
  placeholder?: string
}

export function SearchBar({ value, onChange, onSubmit, placeholder = '검색' }: SearchBarProps) {
  return (
    <div className="flex items-center gap-1.5 flex-1 min-w-[120px]">
      <div className="relative flex-1">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSubmit()}
          placeholder={placeholder}
          className="pl-7 pr-4 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200
                     text-slate-700 placeholder:text-slate-400 outline-none
                     focus:border-blue-300 transition-colors w-full"
        />
      </div>
      <button
        onClick={onSubmit}
        className="flex items-center gap-1 pl-3 pr-3.5 py-1.5 rounded-full text-xs font-black bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0"
      >
        <Search size={11} /> 검색
      </button>
    </div>
  )
}
