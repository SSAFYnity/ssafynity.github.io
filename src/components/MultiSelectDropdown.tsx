// src/components/MultiSelectDropdown.tsx
// 제네릭 멀티 셀렉트 드롭다운. 선택 항목 수에 따라 라벨이 변함.
// - 0개: placeholder label
// - 1개: 선택 항목 label
// - 2개+: "label N개"
// 사용처: clubs/index.tsx, events/archive.tsx

import { ChevronDown, Check } from 'lucide-react'
import { useDropdown } from '@/hooks/useDropdown'

interface MultiSelectDropdownProps<T extends string> {
  label:    string
  options:  Array<{ key: T; label: string }>
  selected: T[]
  onChange: (v: T[]) => void
}

export function MultiSelectDropdown<T extends string>({
  label, options, selected, onChange,
}: MultiSelectDropdownProps<T>) {
  const { open, setOpen, ref } = useDropdown<HTMLDivElement>()

  const toggle = (key: T) => {
    onChange(selected.includes(key) ? selected.filter(k => k !== key) : [...selected, key])
  }

  const displayLabel = selected.length === 0
    ? label
    : selected.length === 1
      ? options.find(o => o.key === selected[0])?.label ?? label
      : `${label} ${selected.length}개`

  const active = selected.length > 0

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 pl-3.5 pr-2.5 py-1.5 rounded-full text-xs font-black border transition-colors ${
          active
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
        }`}
      >
        {displayLabel}
        <ChevronDown size={11} className={active ? 'text-blue-200' : 'text-slate-400'} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-20 w-max py-1">
          {options.map(o => (
            <button
              key={o.key}
              onClick={() => toggle(o.key)}
              className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap"
            >
              <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                selected.includes(o.key) ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
              }`}>
                {selected.includes(o.key) && <Check size={9} className="text-white" />}
              </span>
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
