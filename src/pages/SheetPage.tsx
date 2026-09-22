import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { StrokeScene } from '../studio/StrokeScene'
import { isPlayerModel, useStudio, type CamPreset } from '../studio/store'
import { strokeById } from '../strokes'
import { useMotion } from '../studio/useMotion'
import type { Stroke } from '../engine/types'

/** Development aid: every phase of a stroke frozen side by side from one camera. */
export function SheetPage() {
  const { strokeId } = useParams()
  const [params] = useSearchParams()
  const stroke = strokeById(strokeId)
  const preset = (params.get('cam') as CamPreset | null) ?? 'three-quarter'
  const model = params.get('model')
  useEffect(() => {
    if (isPlayerModel(model)) useStudio.setState({ model })
  }, [model])
  if (!stroke) return <main>Unknown stroke</main>
  return <Sheet authored={stroke} preset={preset} />
}

function Sheet({ authored, preset }: { authored: Stroke; preset: CamPreset }) {
  const { stroke, ready } = useMotion(authored)
  if (!ready) return <main style={{ background: '#000', minHeight: '100vh' }} />
  return (
    <main style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, padding: 4, background: '#000' }}>
      {stroke.phases.map((p) => (
        <div key={p.id} style={{ position: 'relative', aspectRatio: '4 / 3' }}>
          <StrokeScene stroke={authored} fixedT={p.keyT} preset={preset} />
          <div style={{ position: 'absolute', left: 8, top: 6, fontSize: 13, color: '#fff' }}>
            {p.name} · {p.keyT.toFixed(2)}s
          </div>
        </div>
      ))}
    </main>
  )
}
