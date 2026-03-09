import type { ElementType, ReactNode } from 'react'

type KickerProps<T extends ElementType> = {
  as?: T
  className?: string
  children: ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

export function Kicker<T extends ElementType = 'p'>({ as, className, children, ...rest }: KickerProps<T>) {
  const Comp = (as ?? 'p') as ElementType
  const base = 'text-[10px] font-black uppercase tracking-widest'
  const merged = className ? `${base} ${className}` : base

  return (
    <Comp className={merged} {...(rest as unknown as Record<string, unknown>)}>
      {children}
    </Comp>
  )
}
