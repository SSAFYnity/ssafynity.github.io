import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { HERO_FADE_UP } from '@/lib/motion'
import { cn } from '@/lib/utils'

type HeroSectionProps = {
  children: ReactNode
  sectionClassName: string
  containerClassName: string
  motionClassName?: string
  motionProps?: Record<string, unknown>
}

export function HeroSection({
  children,
  sectionClassName,
  containerClassName,
  motionClassName,
  motionProps,
}: HeroSectionProps) {
  return (
    <section className={sectionClassName}>
      <div className={containerClassName}>
        <motion.div {...HERO_FADE_UP} {...motionProps} className={cn(motionClassName)}>
          {children}
        </motion.div>
      </div>
    </section>
  )
}
