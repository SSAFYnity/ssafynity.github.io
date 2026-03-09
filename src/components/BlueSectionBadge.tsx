import type { ReactNode } from 'react'

import { Kicker } from '@/components/Kicker'

type BlueSectionBadgeProps = {
  className?: string
  children: ReactNode
}

export function BlueSectionBadge({ className, children }: BlueSectionBadgeProps) {
  const base = 'inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-full'
  const merged = className ? `${base} ${className}` : base

  return (
    <div className={merged}>
      <Kicker as="span">{children}</Kicker>
    </div>
  )
}