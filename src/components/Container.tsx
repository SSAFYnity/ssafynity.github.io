import type { ReactNode } from 'react'

type ContainerMaxWidth = '3xl' | '5xl' | '7xl'

type ContainerProps = {
  maxWidth: ContainerMaxWidth
  className?: string
  children: ReactNode
}

const MAX_WIDTH_CLASS: Record<ContainerMaxWidth, string> = {
  '3xl': 'max-w-3xl',
  '5xl': 'max-w-5xl',
  '7xl': 'max-w-7xl',
}

export function Container({ maxWidth, className, children }: ContainerProps) {
  const base = `container mx-auto px-6 lg:px-12 ${MAX_WIDTH_CLASS[maxWidth]}`
  const merged = className ? `${base} ${className}` : base

  return <div className={merged}>{children}</div>
}
