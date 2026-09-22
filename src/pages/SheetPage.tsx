import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { StrokeScene } from '../studio/StrokeScene'
import { useStudio, type CamPreset, type PlayerModel } from '../studio/store'
import { strokeById } from '../strokes'

/** Development aid: every phase of a stroke frozen side by side from one camera. */
export function SheetPage() {
  const { strokeId } = useParams()
  const [params] = useSearchParams()
  const stroke = strokeById(strokeId)
  const preset = (params.get('cam') as CamPreset | null) ?? 'three-quarter'
  const model = params.get('model') as PlayerModel | null
  useEffect(() => {
    if (model === 'skinned' || model === 'mannequin') useStudio.setState({ model })
  }, [model])
  if (!stroke) return <main>Unknown stroke</main>
  return (
    <main style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, padding: 4, background: '#000' }}>
      {stroke.phases.map((p) => (
        <div key={p.id} style={{ position: 'relative', aspectRatio: '4 / 3' }}>
          <StrokeScene stroke={stroke} fixedT={p.keyT} preset={preset} />
          <div style={{ position: 'absolute', left: 8, top: 6, fontSize: 13, color: '#fff' }}>
            {p.name} · {p.keyT.toFixed(2)}s
          </div>
        </div>
      ))}
    </main>
  )
}
