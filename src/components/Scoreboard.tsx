import { useState } from 'react'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type Format = 'standard' | 'no-ad' | 'fast4'
type T = (key: string, vars?: Record<string, string | number>) => string

interface State {
  points: [number, number]
  games: [number, number]
  sets: [number, number][]
  server: 0 | 1
  tiebreak: boolean
  tbPointsPlayed: number
  finished: boolean
  log: string[]
}

const FORMATS: Format[] = ['standard', 'no-ad', 'fast4']

const fresh = (t: T): State => ({
  points: [0, 0],
  games: [0, 0],
  sets: [],
  server: 0,
  tiebreak: false,
  tbPointsPlayed: 0,
  finished: false,
  log: [t('score.log.new')],
})

function calls(t: T) {
  return [t('score.love'), '15', '30', '40']
}

function gameCall(s: State, t: T): string {
  if (s.tiebreak) {
    const [a, b] = s.points
    return t('score.call.tiebreak', { a, b })
  }
  const C = calls(t)
  const sv = s.points[s.server]
  const rc = s.points[1 - s.server]
  if (sv >= 3 && rc >= 3) {
    if (sv === rc) return t('score.call.deuce')
    return sv > rc ? t('score.call.advServer') : t('score.call.advReceiver')
  }
  if (sv === 0 && rc === 0) return t('score.call.loveAll')
  if (sv === rc) return t('score.call.all', { n: C[sv] })
  return `${C[sv]}–${C[rc]}`
}

export function Scoreboard() {
  const t = useT()
  const NAMES = [t('score.you'), t('score.opponent')]
  const [format, setFormat] = useState<Format>('standard')
  const [s, setS] = useState<State>(() => fresh(t))
  const gamesToSet = format === 'fast4' ? 4 : 6
  const setsToWin = 2

  function point(w: 0 | 1) {
    if (s.finished) return
    const n: State = {
      ...s,
      points: [...s.points] as [number, number],
      games: [...s.games] as [number, number],
      sets: [...s.sets],
      log: [...s.log],
    }
    const l = 1 - w
    n.points[w]++

    let gameWon: 0 | 1 | null = null
    if (n.tiebreak) {
      n.tbPointsPlayed++
      const target = format === 'fast4' ? 5 : 7
      if (n.points[w] >= target && n.points[w] - n.points[l] >= (format === 'fast4' ? 1 : 2)) gameWon = w
      // in a tiebreak the serve changes after the first point, then every two points
      if (gameWon === null && n.tbPointsPlayed % 2 === 1) n.server = (1 - n.server) as 0 | 1
    } else if (format === 'no-ad' && n.points[w] === 4) {
      gameWon = w
    } else if (n.points[w] >= 4 && n.points[w] - n.points[l] >= 2) {
      gameWon = w
    }

    if (gameWon === null) {
      n.log.unshift(t('score.log.point', { who: NAMES[w], call: gameCall(n, t) }))
      setS(n)
      return
    }

    n.games[w]++
    n.points = [0, 0]
    const wasTb = n.tiebreak
    n.tiebreak = false
    n.tbPointsPlayed = 0
    const [ga, gb] = n.games
    let setWon: 0 | 1 | null = null
    if (wasTb) setWon = w
    else if (n.games[w] >= gamesToSet && n.games[w] - n.games[l] >= 2) setWon = w
    else if (ga === gamesToSet && gb === gamesToSet) n.tiebreak = true

    // change of server every game (a tiebreak's first server is the receiver of the previous game)
    n.server = (1 - n.server) as 0 | 1

    if (setWon !== null) {
      n.sets.push([ga, gb])
      n.games = [0, 0]
      const won = n.sets.filter(([a, b]) => (setWon === 0 ? a > b : b > a)).length
      n.log.unshift(t('score.log.set', { who: NAMES[setWon], a: ga, b: gb }))
      if (won >= setsToWin) {
        n.finished = true
        n.log.unshift(t('score.log.match', { who: NAMES[setWon] }))
      }
    } else if (n.tiebreak) {
      n.log.unshift(
        t('score.log.tiebreak', {
          who: NAMES[w],
          a: ga,
          b: gb,
          target: format === 'fast4' ? 5 : 7,
          rule: format === 'fast4' ? t('score.log.suddenDeath') : t('score.log.winByTwo'),
        }),
      )
    } else {
      const odd = (ga + gb) % 2 === 1
      n.log.unshift(t('score.log.game', { who: NAMES[w], server: NAMES[n.server], a: ga, b: gb }) + (odd ? ` ${t('score.log.changeEnds')}` : ''))
    }
    setS(n)
  }

  const call = s.finished ? t('score.matchOver') : gameCall(s, t)
  const show = (i: 0 | 1) => {
    if (s.tiebreak) return String(s.points[i])
    const a = s.points[i]
    const b = s.points[1 - i]
    if (a >= 3 && b >= 3) return a > b ? t('score.ad') : '40'
    return a === 0 ? '0' : calls(t)[a]
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          spacing={0}
          value={format}
          onValueChange={(v) => {
            if (!v) return
            setFormat(v as Format)
            setS(fresh(t))
          }}
          aria-label={t('score.format')}
        >
          {FORMATS.map((f) => (
            <ToggleGroupItem key={f} value={f}>
              {t(`score.format.${f}`)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setS(fresh(t))}>
          {t('score.newMatch')}
        </Button>
      </div>

      <p className="text-lg font-medium" aria-live="polite">
        {t('score.umpire', { call })}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {([0, 1] as const).map((i) => {
          const serving = s.server === i && !s.finished
          return (
            <Card key={i} className={cn(serving && 'border-primary/60')}>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{NAMES[i]}</span>
                  {serving && <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs">{t('score.serving')}</span>}
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-semibold tracking-tight tabular-nums">{show(i)}</span>
                  <span className="text-sm text-muted-foreground tabular-nums">{t('score.games', { n: s.games[i] })}</span>
                </div>
                {s.sets.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground tabular-nums">
                    {s.sets.map((set, k) => (
                      <span key={k}>{t('score.setN', { n: k + 1, v: set[i] })}</span>
                    ))}
                  </div>
                )}
                <Button variant={i === 0 ? 'default' : 'secondary'} onClick={() => point(i)} disabled={s.finished}>
                  {t('score.pointTo', { who: NAMES[i] })}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <ScrollArea className="h-36 rounded-lg border">
        <ol className="space-y-1 p-3 text-sm text-muted-foreground">
          {s.log.slice(0, 12).map((l, i) => (
            <li key={i} className={cn(i === 0 && 'text-foreground')}>
              {l}
            </li>
          ))}
        </ol>
      </ScrollArea>
    </div>
  )
}
