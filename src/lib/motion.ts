// src/lib/motion.ts
// 사이트 전반에서 공유하는 framer-motion 애니메이션 프리셋.

/**
 * Hero 섹션 fade-up — 페이지 진입 시 opacity 0→1, y 20→0.
 * motion.div 등에 스프레드해서 사용: <motion.div {...HERO_FADE_UP}>
 */
export const HERO_FADE_UP = {
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
} as const
