// src/components/SortDropdown.tsx
// 단일 선택 정렬 드롭다운. 제네릭 SortKey를 받아 어느 페이지에서도 재사용 가능.
// defaultKey와 다를 때 파란 활성 스타일로 표시.
// 사용처: clubs/index.tsx, clubs/pre.tsx

import { ArrowUpDown, ChevronDown, Check } from 'lucide-react'
import { useDropdown } from '@/hooks/useDropdown'

interface SortDropdownProps<T extends string> {
  options:    Array<{ key: T; label: string }>
  value:      T
  defaultKey: T
  onChange:   (v: T) => void
}

export function SortDropdown<T extends string>({
  options, value, defaultKey, onChange,
}: SortDropdownProps<T>) {
  const { open, setOpen, ref } = useDropdown<HTMLDivElement>()

  const active = value !== defaultKey
  const label  = options.find(o => o.key === value)?.label ?? '정렬'

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-36 flex items-center justify-between gap-1.5 pl-3 pr-2.5 py-1.5 rounded-full text-xs font-black border transition-colors ${
          active
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
        }`}
      >
        <ArrowUpDown size={11} className={active ? 'text-blue-200' : 'text-slate-400'} />
        {label}
        <ChevronDown size={11} className={active ? 'text-blue-200' : 'text-slate-400'} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-20 w-max py-1">
          {options.map(o => (
            <button
              key={o.key}
              onClick={() => { onChange(o.key); setOpen(false) }}
              className={`flex items-center gap-2 w-full px-3.5 py-2 text-xs hover:bg-slate-50 transition-colors whitespace-nowrap ${
                value === o.key ? 'font-black text-blue-600' : 'font-medium text-slate-600'
              }`}
            >
              <span className="w-3 flex items-center justify-center shrink-0">
                {value === o.key && <Check size={9} />}
              </span>
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
