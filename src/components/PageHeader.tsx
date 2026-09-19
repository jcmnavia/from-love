import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Calm page opener: one title, one short paragraph, optional aside on the right. */
export function PageHeader({
  title,
  description,
  aside,
  className,
}: {
  title: string
  description?: string
  aside?: ReactNode
  className?: string
}) {
  return (
    <header className={cn('mx-auto w-full max-w-7xl px-4 pt-10 pb-6 sm:px-6 sm:pt-14 sm:pb-8', className)}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-prose">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          {description && <p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p>}
        </div>
        {aside && <div className="shrink-0 md:w-64">{aside}</div>}
      </div>
    </header>
  )
}

export function PageBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6', className)}>{children}</div>
}
