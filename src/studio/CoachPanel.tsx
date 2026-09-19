import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Stroke } from '@/engine/types'
import type { ProPlayer } from '@/data/players'
import { useContent } from '@/i18n/content'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'
import { useStudio } from './store'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

/** Notes from the (localized) pro dataset that teach one of the given stroke tags, spread across eras. */
function proNotes(players: ProPlayer[], tags: string[], limit = 8) {
  const out: { player: ProPlayer; note: string; stroke: string }[] = []
  for (const player of players) {
    for (const n of player.techniqueNotes) if (tags.includes(n.stroke)) out.push({ player, note: n.note, stroke: n.stroke })
  }
  out.sort((a, b) => b.player.slams - a.player.slams || a.player.rankInDecade - b.player.rankInDecade)
  const seen = new Map<string, number>()
  const spread = out.filter((o) => {
    const c = seen.get(o.player.decade) ?? 0
    if (c >= 2) return false
    seen.set(o.player.decade, c + 1)
    return true
  })
  return spread.sort((a, b) => a.player.decade.localeCompare(b.player.decade)).slice(0, limit)
}

export function CoachPanel({ stroke, className }: { stroke: Stroke; className?: string }) {
  const tr = useT()
  const { grips, players } = useContent()
  const t = useStudio((s) => s.t)
  const set = useStudio((s) => s.set)
  const shown = Math.min(t, stroke.duration)
  const found = stroke.phases.findIndex((p) => shown >= p.t0 && shown < p.t1)
  const idx = found === -1 ? stroke.phases.length - 1 : found
  const phase = stroke.phases[idx]
  const pros = useMemo(() => proNotes(players, stroke.proTags), [players, stroke])

  const jump = (i: number) => {
    const p = stroke.phases[i]
    if (p) set({ t: p.keyT, playing: false, focus: p.focus })
  }

  return (
    <aside className={cn('min-w-0 space-y-4', className)} aria-label={tr('coach.label')}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-muted-foreground tabular-nums">
              {tr('coach.phaseOf', { n: idx + 1, total: stroke.phases.length })}
            </span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon-xs" onClick={() => jump(idx - 1)} disabled={idx === 0} aria-label={tr('coach.prevPhase')}>
                <ChevronLeft />
              </Button>
              <Button variant="outline" size="icon-xs" onClick={() => jump(idx + 1)} disabled={idx === stroke.phases.length - 1} aria-label={tr('coach.nextPhase')}>
                <ChevronRight />
              </Button>
            </div>
          </div>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">{phase.name}</h2>
          <p className="text-sm leading-6 text-muted-foreground">{phase.summary}</p>
        </CardHeader>
        <CardContent>
          <h3 className="text-xs font-medium text-muted-foreground">{tr('coach.cues')}</h3>
          <ul className="mt-2 space-y-2">
            {phase.cues.slice(0, 3).map((c) => (
              <li key={c} className="flex gap-2.5 text-sm leading-6">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <ol className="mt-4 flex flex-wrap gap-1.5" aria-label={tr('coach.phases')}>
            {stroke.phases.map((p, i) => (
              <li key={p.id}>
                <button
                  onClick={() => jump(i)}
                  aria-current={i === idx ? 'step' : undefined}
                  className={cn(
                    'rounded-md border px-2 py-1 text-xs transition-colors',
                    i === idx ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {p.name}
                </button>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Accordion type="multiple" className="rounded-xl border bg-card px-4">
        <AccordionItem value="about">
          <AccordionTrigger>{tr('coach.about')}</AccordionTrigger>
          <AccordionContent className="text-sm leading-6 text-foreground/85">{stroke.description}</AccordionContent>
        </AccordionItem>
        {stroke.grips.length > 0 && (
          <AccordionItem value="grip">
            <AccordionTrigger>{tr('coach.grip')}</AccordionTrigger>
            <AccordionContent className="space-y-3">
              {stroke.grips.map((g) => {
                const grip = grips.find((x) => x.id === g.id)
                return (
                  <div key={g.id} className="text-sm leading-6">
                    <b className="font-medium">{grip?.name ?? g.id}</b>
                    <span className="block text-foreground/85">{g.note}</span>
                  </div>
                )
              })}
              <Button asChild variant="link" size="sm" className="px-0">
                <Link to="/learn/grips">
                  {tr('coach.seeGrips')}
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>
        )}
        <AccordionItem value="errors">
          <AccordionTrigger>{tr('coach.errors')}</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {stroke.commonErrors.map((e) => (
              <div key={e.error} className="text-sm leading-6">
                <b className="font-medium">{e.error}</b>
                <span className="block text-foreground/85">{e.fix}</span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="drills">
          <AccordionTrigger>{tr('coach.drills')}</AccordionTrigger>
          <AccordionContent className="space-y-3">
            <ol className="space-y-2">
              {stroke.drills.map((d, i) => (
                <li key={d} className="flex gap-3 text-sm leading-6">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold tabular-nums">{i + 1}</span>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
            <Button asChild variant="link" size="sm" className="px-0">
              <Link to="/move">
                {tr('coach.moreDrills')}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="pros" className="border-b-0">
          <AccordionTrigger>{tr('coach.pros')}</AccordionTrigger>
          <AccordionContent className="space-y-3">
            {pros.length === 0 && <p className="text-sm text-muted-foreground">{tr('coach.noPros')}</p>}
            {pros.map((p) => (
              <div key={p.player.id + p.stroke} className="text-sm leading-6">
                <div className="flex items-baseline gap-2">
                  <b className="font-medium">{p.player.name}</b>
                  <span className="text-xs text-muted-foreground tabular-nums">{p.player.decade}</span>
                </div>
                <p className="text-foreground/85">{p.note}</p>
              </div>
            ))}
            <Button asChild variant="link" size="sm" className="px-0">
              <Link to="/pros">
                {tr('coach.allPros', { n: players.length })}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}
