// src/hooks/useDropdown.ts
// 드롭다운 열림/닫힘 상태와 외부 클릭 감지를 함께 관리하는 훅.
// 사용처: SortDropdown, FilterDropdown, CategoryDropdown, MultiSelectDropdown 등
import { useState, useEffect, useRef } from 'react'

/**
 * ?쒕∼?ㅼ슫 open ?곹깭 + ?몃? ?대┃ ???リ린 濡쒖쭅??臾띠쓬 ?쒓났.
 *
 * @example
 * const { open, setOpen, ref } = useDropdown<HTMLDivElement>()
 * return <div ref={ref}>...</div>
 */
export function useDropdown<T extends HTMLElement = HTMLDivElement>() {
  const [open, setOpen] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [])

  return { open, setOpen, ref }
}
