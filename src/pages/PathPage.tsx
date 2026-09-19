import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { useContent } from '@/i18n/content'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'
import { Footer } from '@/components/Footer'
import { PageBody, PageHeader } from '@/components/PageHeader'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

const KEY = 'from-love.path'

function load(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function PathPage() {
  const t = useT()
  const { path } = useContent()
  const [done, setDone] = useState<Record<string, boolean>>(load)
  useEffect(() => {
    document.title = `${t('nav.path')} · ${t('brand')}`
  }, [t])
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(done))
    } catch {
      /* private mode: progress simply won't persist */
    }
  }, [done])

  const total = path.reduce((n, s) => n + s.items.length, 0)
  const count = Object.values(done).filter(Boolean).length
  const pct = Math.round((count / total) * 100)
  const isComplete = (n: number) => path.find((s) => s.n === n)!.items.every((_, i) => done[`${n}:${i}`])
  const level = path.filter((s) => isComplete(s.n)).length
  const current = useMemo(() => path.find((s) => !isComplete(s.n))?.n ?? path[path.length - 1].n, [path, done]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="flex-1">
      <PageHeader
        title={t('path.title')}
        description={t('path.lead')}
        aside={
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t('path.stageOf', { n: level, total: path.length - 1 })}</span>
              <span className="font-medium tabular-nums">{pct}%</span>
            </div>
            <Progress value={pct} className="mt-2" aria-label={t('path.progress')} />
          </div>
        }
      />
      <PageBody>
        <Accordion type="multiple" defaultValue={[String(current)]} className="relative">
          {path.map((s) => {
            const complete = isComplete(s.n)
            const doneHere = s.items.filter((_, i) => done[`${s.n}:${i}`]).length
            return (
              <AccordionItem key={s.n} value={String(s.n)} id={`stage-${s.n}`} className="border-b-0">
                <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4">
                  {/* rail */}
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold tabular-nums',
                        complete
                          ? 'border-primary bg-primary text-primary-foreground'
                          : s.n === current
                            ? 'border-foreground text-foreground'
                            : 'border-border text-muted-foreground',
                      )}
                      aria-hidden="true"
                    >
                      {complete ? <Check className="size-4" /> : s.n}
                    </span>
                    <span className="mt-2 w-px flex-1 bg-border" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 pb-6">
                    <AccordionTrigger className="items-center py-1.5 hover:no-underline">
                      <div className="min-w-0 text-left">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-lg font-semibold tracking-tight">{s.title}</span>
                          <Badge variant="outline" className="tabular-nums">
                            {s.range}
                          </Badge>
                          <span className="text-xs text-muted-foreground tabular-nums">
                            {t('path.itemsDone', { done: doneHere, total: s.items.length })}
                          </span>
                        </div>
                        <p className="mt-1 max-w-prose text-sm leading-6 text-muted-foreground">{s.who}</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-3">
                      <div className="grid gap-6 lg:grid-cols-2">
                        <div>
                          <h3 className="text-xs font-medium text-muted-foreground">{t('path.goals')}</h3>
                          <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-6">
                            {s.goals.map((g) => (
                              <li key={g}>{g}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium text-muted-foreground">{t('path.checklist')}</h3>
                          <ul className="mt-2 space-y-2">
                            {s.items.map((it, i) => {
                              const k = `${s.n}:${i}`
                              return (
                                <li key={k} className="flex items-start gap-2.5">
                                  <Checkbox
                                    id={k}
                                    checked={Boolean(done[k])}
                                    onCheckedChange={(v) => setDone({ ...done, [k]: v === true })}
                                    className="mt-1"
                                  />
                                  <Label htmlFor={k} className={cn('text-sm leading-6 font-normal', done[k] && 'text-muted-foreground line-through')}>
                                    {it.label}
                                  </Label>
                                  {it.to && (
                                    <Link to={it.to} className="ml-auto inline-flex shrink-0 items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground">
                                      {t('common.open')}
                                      <ArrowUpRight className="size-3" aria-hidden="true" />
                                    </Link>
                                  )}
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-6 max-w-prose rounded-lg border border-l-4 border-l-primary bg-muted/40 px-4 py-3 text-sm leading-6">
                        <b className="font-medium">{t('path.milestone')} </b>
                        {s.milestone}
                      </div>
                    </AccordionContent>
                  </div>
                </div>
              </AccordionItem>
            )
          })}
        </Accordion>
      </PageBody>
      <Footer />
    </main>
  )
}
