import type { ElementType, ReactNode } from 'react'

type PillProps<T extends ElementType> = {
  as?: T
  className?: string
  children: ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

export function Pill<T extends ElementType = 'span'>({ as, className, children, ...rest }: PillProps<T>) {
  const Comp = (as ?? 'span') as ElementType
  const base = 'text-[10px] font-black px-2.5 py-1 rounded-full'
  const merged = className ? `${base} ${className}` : base

  return (
    <Comp className={merged} {...(rest as unknown as Record<string, unknown>)}>
      {children}
    </Comp>
  )
}
