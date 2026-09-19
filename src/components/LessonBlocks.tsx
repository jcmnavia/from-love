import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import type { Block, Lesson } from '@/content/types'
import { LESSON_SOURCES } from '@/content/sources'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { SourcesList } from './SourcesList'

/** Renders prose with **bold** spans and blank-line paragraphs. */
export function Rich({ text }: { text: string }) {
  const paras = text.split(/\n\s*\n/)
  return (
    <>
      {paras.map((p, i) => (
        <p key={i}>
          {p.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
            part.startsWith('**') ? <b key={j}>{part.slice(2, -2)}</b> : <Fragment key={j}>{part}</Fragment>,
          )}
        </p>
      ))}
    </>
  )
}

export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'text':
      return (
        <div className="lesson-prose">
          <Rich text={block.body} />
        </div>
      )
    case 'list':
      return (
        <div className="lesson-prose">
          <ul>
            {block.items.map((it) => (
              <li key={it}>
                <Rich text={it} />
              </li>
            ))}
          </ul>
        </div>
      )
    case 'table':
      return (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                {block.columns.map((c) => (
                  <TableHead key={c}>{c}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {block.rows.map((r, i) => (
                <TableRow key={i}>
                  {r.map((c, j) => (
                    <TableCell key={j} className={cn('whitespace-normal', j === 0 && 'font-medium')}>
                      {c}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    case 'callout':
      return (
        <aside className="max-w-prose rounded-lg border border-l-4 border-l-primary bg-muted/40 px-4 py-3">
          <b className="block text-sm font-semibold">{block.title}</b>
          <div className="lesson-prose mt-1 text-[15px] leading-6">
            <Rich text={block.body} />
          </div>
        </aside>
      )
    case 'steps':
      return (
        <ol className="max-w-prose space-y-3">
          {block.steps.map((s, i) => (
            <li key={s.title} className="flex gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold tabular-nums text-secondary-foreground">
                {i + 1}
              </span>
              <div className="text-[15px] leading-6">
                <b className="font-semibold">{s.title}</b>
                <span className="block text-foreground/85">{s.body}</span>
              </div>
            </li>
          ))}
        </ol>
      )
    case 'link':
      return (
        <div>
          <Button asChild variant="outline" size="sm">
            <Link to={block.to}>
              {block.label}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      )
  }
}

/**
 * Summary first, then the first block; the rest sits behind "Continue reading"
 * so a long lesson never lands as a wall of text.
 */
export function LessonView({ lesson, extraSources = [] }: { lesson: Lesson; extraSources?: string[] }) {
  const t = useT()
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [lesson.id])

  const long = lesson.blocks.length > 2
  const head = long ? lesson.blocks.slice(0, 1) : lesson.blocks
  const rest = long ? lesson.blocks.slice(1) : []
  const sources = [...(LESSON_SOURCES[lesson.id] ?? []), ...extraSources]

  return (
    <article className="min-w-0" id={lesson.id}>
      <header className="max-w-prose">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="font-medium">
            {t(`level.${lesson.level}`)}
          </Badge>
          <span className="tabular-nums">{t('lesson.minutes', { n: lesson.minutes })}</span>
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{lesson.title}</h2>
        <p className="mt-3 text-base leading-7 text-muted-foreground">{lesson.summary}</p>
      </header>

      <div className="mt-8 space-y-6">
        {head.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </div>

      {rest.length > 0 && (
        <Collapsible open={open} onOpenChange={setOpen} className="mt-6">
          <CollapsibleTrigger asChild>
            <Button variant="outline" aria-expanded={open}>
              {open ? t('lesson.showLess') : t('lesson.continue', { n: rest.length })}
              <ChevronDown data-icon="inline-end" className={cn('transition-transform', open && 'rotate-180')} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-6 space-y-6">
            {rest.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      <SourcesList ids={sources} className="mt-10 border-t pt-6" />
    </article>
  )
}
