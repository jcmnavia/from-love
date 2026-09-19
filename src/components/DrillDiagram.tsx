import type { Drill } from '@/content/types'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'

/** Top-down half court (baseline at the bottom, net at the top) with a movement pattern. */
export function DrillDiagram({ pattern, className }: { pattern: NonNullable<Drill['pattern']>; className?: string }) {
  const t = useT()
  // court metres → svg units: x from -6.5..6.5, z from -1 (behind baseline) .. 12.5 (net + a bit)
  const W = 260
  const H = 270
  const sx = (x: number) => ((x + 6.5) / 13) * W
  const sz = (z: number) => H - ((z + 1) / 13.5) * H
  const d =
    pattern.points.map((p, i) => `${i ? 'L' : 'M'}${sx(p[0]).toFixed(1)} ${sz(p[1]).toFixed(1)}`).join(' ') + (pattern.loop ? ' Z' : '')
  const line = { strokeWidth: 1.4, fill: 'none', className: 'stroke-foreground/60' }
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={t('drill.diagramLabel')}
      className={cn('block h-auto w-full rounded-lg border bg-muted/40 text-foreground', className)}
    >
      <rect x={sx(-5.485)} y={sz(11.885)} width={sx(5.485) - sx(-5.485)} height={sz(0) - sz(11.885)} {...line} className="fill-court-hard/15 stroke-foreground/60" />
      <line x1={sx(-4.115)} y1={sz(0)} x2={sx(-4.115)} y2={sz(11.885)} {...line} />
      <line x1={sx(4.115)} y1={sz(0)} x2={sx(4.115)} y2={sz(11.885)} {...line} />
      <line x1={sx(-4.115)} y1={sz(5.485)} x2={sx(4.115)} y2={sz(5.485)} {...line} />
      <line x1={sx(0)} y1={sz(5.485)} x2={sx(0)} y2={sz(11.885)} {...line} />
      <line x1={sx(0)} y1={sz(0)} x2={sx(0)} y2={sz(0.3)} {...line} />
      <line x1={sx(-6.4)} y1={sz(11.885)} x2={sx(6.4)} y2={sz(11.885)} strokeWidth={3} className="stroke-foreground/80" />
      {pattern.cones?.map((c, i) => (
        <polygon
          key={i}
          points={`${sx(c[0])},${sz(c[1]) - 6} ${sx(c[0]) - 5},${sz(c[1]) + 4} ${sx(c[0]) + 5},${sz(c[1]) + 4}`}
          className="fill-court-clay"
        />
      ))}
      <path d={d} strokeWidth={2.4} fill="none" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="6 4" className="stroke-primary" />
      {pattern.points.map((p, i) => (
        <g key={i}>
          <circle cx={sx(p[0])} cy={sz(p[1])} r={i === 0 ? 7 : 5} className={i === 0 ? 'fill-foreground' : 'fill-primary'} />
          {i === 0 && (
            <text x={sx(p[0])} y={sz(p[1]) + 3.5} textAnchor="middle" fontSize="9" fontWeight="700" className="fill-background" fontFamily="Inter, sans-serif">
              S
            </text>
          )}
        </g>
      ))}
    </svg>
  )
}
