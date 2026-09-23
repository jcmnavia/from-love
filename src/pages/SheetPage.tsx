import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { StrokeScene } from '../studio/StrokeScene'
import { isPlayerModel, useStudio, type CamPreset } from '../studio/store'
import { strokeById } from '../strokes'
import { useMotion } from '../studio/useMotion'
import type { Stroke } from '../engine/types'

/**
 * Development aid: a stroke frozen at several instants, side by side from one camera.
 *
 *   /sheet/forehand?cam=front                    every phase's freeze frame
 *   /sheet/forehand?times=0.48,0.77,0.97&camoff=-1.2,0.35,-9&clean=1&cols=5
 *        chosen instants (seconds on the played timeline), a camera placed at an offset from the
 *        player (world metres: +x = player's right, −z = toward the net) and no overlays; used to
 *        line renders up against reference footage (scripts/video/compare.py)
 */
export function SheetPage() {
  const { strokeId } = useParams()
  const [params] = useSearchParams()
  const stroke = strokeById(strokeId)
  const preset = (params.get('cam') as CamPreset | null) ?? 'three-quarter'
  const model = params.get('model')
  const num = (s: string | null) => (s ? s.split(',').map(Number) : null)
  const times = num(params.get('times'))
  const off = num(params.get('camoff'))
  const camOffset = off?.length === 3 ? (off as [number, number, number]) : undefined
  const cols = Number(params.get('cols') ?? 4)
  const clean = params.get('clean') === '1'
  useEffect(() => {
    if (isPlayerModel(model)) useStudio.setState({ model })
  }, [model])
  if (!stroke) return <main>Unknown stroke</main>
  return <Sheet authored={stroke} preset={preset} times={times} camOffset={camOffset} cols={cols} clean={clean} />
}

function Sheet(props: { authored: Stroke; preset: CamPreset; times: number[] | null; camOffset?: [number, number, number]; cols: number; clean: boolean }) {
  const { authored, preset, times, camOffset, cols, clean } = props
  const { stroke, ready } = useMotion(authored)
  if (!ready) return <main style={{ background: '#000', minHeight: '100vh' }} />
  const shots = times ? times.map((t) => ({ id: String(t), label: t.toFixed(3) + 's', t })) : stroke.phases.map((p) => ({ id: p.id, label: `${p.name} · ${p.keyT.toFixed(2)}s`, t: p.keyT }))
  return (
    <main data-sheet-ready="1" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 4, padding: 4, background: '#000' }}>
      {shots.map((s) => (
        <div key={s.id} style={{ position: 'relative', aspectRatio: '4 / 3' }}>
          <StrokeScene stroke={authored} fixedT={s.t} preset={preset} camOffset={camOffset} clean={clean} />
          <div style={{ position: 'absolute', left: 8, top: 6, fontSize: 13, color: '#fff' }}>{s.label}</div>
        </div>
      ))}
    </main>
  )
}
