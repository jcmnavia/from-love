import { useEffect } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { StrokeScene } from '@/studio/StrokeScene'
import { isPlayerModel, useStudio, type CamPreset } from '@/studio/store'
import type { FocusId, Stroke } from '@/engine/types'
import { useMotion } from '@/studio/useMotion'
import { useContent } from '@/i18n/content'
import { useT } from '@/i18n'
import { StrokeList, StrokeSelect } from '@/studio/StrokeList'
import { Timeline } from '@/studio/Timeline'
import { Hud } from '@/studio/Hud'
import { StudioToolbar } from '@/studio/Controls'
import { CoachPanel } from '@/studio/CoachPanel'
import { Badge } from '@/components/ui/badge'

export function StudioPage() {
  const t = useT()
  const { strokeId } = useParams()
  const [params] = useSearchParams()
  const { strokes } = useContent()
  const authored = strokes.find((s) => s.id === strokeId)
  const set = useStudio((s) => s.set)
  const setCam = useStudio((s) => s.setCam)

  // ?t=1.13&cam=side&focus=racket&pause=1 lets a lesson open on an exact instant
  useEffect(() => {
    const tParam = params.get('t')
    const cam = params.get('cam') as CamPreset | null
    const focus = params.get('focus') as FocusId | null
    const patch: Record<string, unknown> = { t: 0, playing: true, focus: 'body' }
    if (tParam !== null) patch.t = Number(tParam)
    if (params.get('pause')) patch.playing = false
    if (focus) patch.focus = focus
    if (params.get('lefty')) patch.leftHanded = true
    const model = params.get('model')
    if (isPlayerModel(model)) patch.model = model
    set(patch)
    if (cam) setCam(cam)
  }, [params, set, setCam, strokeId])

  useEffect(() => {
    if (authored) document.title = `${authored.name} · ${t('brand')}`
  }, [authored, t])

  if (!strokeId) return <Navigate to="/studio/forehand" replace />
  if (!authored) return <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 text-muted-foreground sm:px-6">{t('studio.missing')}</main>
  return <StudioView authored={authored} />
}

/** The studio for one stroke, with timings taken from its mocap clip when it has one. */
function StudioView({ authored }: { authored: Stroke }) {
  const t = useT()
  const { stroke } = useMotion(authored)
  return (
    <main className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_340px]">
      <div className="lg:hidden">
        <StrokeSelect activeId={stroke.id} />
      </div>
      <StrokeList activeId={stroke.id} className="hidden lg:block" />

      <section className="min-w-0 space-y-4">
        <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{stroke.name}</h1>
          <Badge variant="secondary">{t(`level.${stroke.level}`)}</Badge>
          <p className="w-full text-sm text-muted-foreground sm:w-auto">{stroke.tagline}</p>
        </header>
        <div className="relative aspect-4/3 overflow-hidden rounded-xl border bg-muted sm:aspect-16/10">
          <StrokeScene stroke={authored} />
        </div>
        <StudioToolbar hasBall={Boolean(stroke.ball)} />
        <Timeline stroke={stroke} />
        <Hud movementOnly={stroke.category === 'movement'} />
      </section>

      <CoachPanel stroke={stroke} className="lg:col-start-2 xl:col-start-3" />
    </main>
  )
}
