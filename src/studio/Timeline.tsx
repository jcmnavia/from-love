import { useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import type { Stroke } from '@/engine/types'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'
import { useStudio } from './store'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const SPEEDS = [0.1, 0.25, 0.5, 1]

export function Timeline({ stroke }: { stroke: Stroke }) {
  const tr = useT()
  const t = useStudio((s) => s.t)
  const playing = useStudio((s) => s.playing)
  const speed = useStudio((s) => s.speed)
  const set = useStudio((s) => s.set)
  const track = useRef<HTMLDivElement>(null)
  const dur = stroke.duration
  const shown = Math.min(t, dur)

  const scrubTo = useCallback(
    (clientX: number) => {
      const el = track.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const f = Math.min(Math.max((clientX - r.left) / r.width, 0), 1)
      set({ t: f * dur, playing: false })
    },
    [dur, set],
  )

  const onPointerDown = (e: React.PointerEvent) => {
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    scrubTo(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons & 1) scrubTo(e.clientX)
  }
  const step = (d: number) => set({ t: Math.min(Math.max(shown + d, 0), dur), playing: false })

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="icon-sm" onClick={() => set({ playing: !playing })} aria-label={playing ? tr('tl.pause') : tr('tl.play')}>
          {playing ? <Pause /> : <Play />}
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon-sm" onClick={() => step(-1 / 30)} aria-label={tr('tl.back')}>
              <ChevronLeft />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{tr('tl.back')}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon-sm" onClick={() => step(1 / 30)} aria-label={tr('tl.forward')}>
              <ChevronRight />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{tr('tl.forward')}</TooltipContent>
        </Tooltip>
        <div className="ml-1 text-sm tabular-nums">
          {shown.toFixed(2)} <span className="text-muted-foreground">/ {dur.toFixed(2)} s</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{tr('tl.speed')}</span>
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            spacing={0}
            value={String(speed)}
            onValueChange={(v) => v && set({ speed: Number(v) })}
            aria-label={tr('tl.speed')}
          >
            {SPEEDS.map((s) => (
              <ToggleGroupItem key={s} value={String(s)} className="tabular-nums">
                {s}×
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div
        ref={track}
        role="slider"
        aria-label={tr('tl.label')}
        aria-valuemin={0}
        aria-valuemax={dur}
        aria-valuenow={Number(shown.toFixed(2))}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') step(-1 / 30)
          if (e.key === 'ArrowRight') step(1 / 30)
          if (e.key === ' ') {
            e.preventDefault()
            set({ playing: !playing })
          }
        }}
        className="relative h-10 cursor-ew-resize touch-none overflow-hidden rounded-lg border bg-muted outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {stroke.phases.map((p) => {
          const active = shown >= p.t0 && shown < p.t1
          return (
            <div
              key={p.id}
              title={p.name}
              className={cn(
                'absolute inset-y-0 flex items-center overflow-hidden border-r px-2 text-xs whitespace-nowrap transition-colors',
                active ? 'bg-primary/25 font-medium text-foreground' : 'text-muted-foreground',
              )}
              style={{ left: `${(p.t0 / dur) * 100}%`, width: `${((p.t1 - p.t0) / dur) * 100}%` }}
            >
              <span className="truncate">{p.name}</span>
            </div>
          )
        })}
        {stroke.ball && (
          <div
            className="absolute inset-y-0 w-px bg-foreground/50"
            style={{ left: `${(stroke.ball.contactT / dur) * 100}%` }}
            title={tr('tl.contact')}
            aria-hidden="true"
          />
        )}
        <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-foreground" style={{ left: `${(shown / dur) * 100}%` }} aria-hidden="true" />
      </div>
    </div>
  )
}
