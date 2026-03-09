import type { ElementType, ReactNode } from 'react'

type CardProps<T extends ElementType> = {
  as?: T
  className?: string
  children: ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

export function Card<T extends ElementType = 'div'>({ as, className, children, ...rest }: CardProps<T>) {
  const Comp = (as ?? 'div') as ElementType
  const base = 'bg-white rounded-2xl border border-slate-100'
  const merged = className ? `${base} ${className}` : base

  return (
    <Comp className={merged} {...(rest as unknown as Record<string, unknown>)}>
      {children}
    </Comp>
  )
}
