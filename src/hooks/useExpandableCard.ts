// src/hooks/useExpandableCard.ts
// 그리드 카드 펼치기/접기 로직.
// 사용처: PartnerCard (about/partners.tsx), PreClubCard (clubs/pre.tsx)

import { useState, useEffect, useRef } from 'react'
import type React from 'react'

/**
 * 설명 overflow 감지 + 접힌 높이 측정 + 펼치기/접기 상태를 묶음 제공.
 *
 * - descRef   : 클램핑된 설명 요소에 부착 (overflow 측정 기준)
 * - measureRef: 숨겨진 비클램프 측정 요소에 부착 (선택, 없으면 descRef로 대체)
 * - cardRef   : 카드 루트 요소에 부착 (접힌 높이 측정)
 * - wrapperStyle: 그리드 셀 래퍼의 style 속성에 적용 (확장 시 높이 고정)
 *
 * @example
 * // 링크 카드 (motion.a)
 * const { expanded, isOverflow, wrapperStyle, descRef, cardRef, toggle } = useExpandableCard<HTMLAnchorElement>()
 *
 * // 일반 카드 (motion.div), 숨긴 측정 요소 사용
 * const { expanded, isOverflow, wrapperStyle, descRef, measureRef, cardRef, toggle } = useExpandableCard<HTMLDivElement>()
 */
export function useExpandableCard<T extends HTMLElement = HTMLDivElement>() {
  const [expanded,        setExpanded]       = useState(false)
  const [isOverflow,      setIsOverflow]     = useState(false)
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null)

  const descRef    = useRef<HTMLParagraphElement>(null)
  const measureRef = useRef<HTMLParagraphElement>(null)
  const cardRef    = useRef<T>(null)

  // overflow 감지: measureRef가 있으면 그걸로, 없으면 descRef 자체로 측정
  useEffect(() => {
    const vis = descRef.current
    const msr = measureRef.current
    if (!vis) return

    const compute = () => (msr ? msr.scrollHeight > vis.clientHeight : vis.scrollHeight > vis.clientHeight + 1)
    const raf = requestAnimationFrame(() => setIsOverflow(compute()))
    return () => cancelAnimationFrame(raf)
  }, [])

  // 접힌 상태 카드 높이 측정 (그리드 셀 고정용)
  useEffect(() => {
    if (cardRef.current && collapsedHeight === null) {
      setCollapsedHeight(cardRef.current.offsetHeight)
    }
  }, [collapsedHeight])

  // 클릭 시 기본 동작(링크 이동 등) 차단 후 토글
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setExpanded(v => !v)
  }

  // 확장 시 그리드 셀에 적용할 고정 높이 style
  const wrapperStyle: React.CSSProperties | undefined =
    expanded && collapsedHeight ? { height: collapsedHeight } : undefined

  return { expanded, isOverflow, wrapperStyle, descRef, measureRef, cardRef, toggle }
}


