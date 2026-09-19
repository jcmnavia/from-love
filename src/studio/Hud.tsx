import { useT } from '@/i18n'
import { useStudio } from './store'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const deg = (v: number) => `${Math.round(v)}°`

function Chip({ value, label, help }: { value: string; label: string; help: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex cursor-help items-baseline gap-1.5 rounded-md border bg-card px-2.5 py-1.5 text-sm" tabIndex={0}>
          <span className="font-semibold tabular-nums">{value}</span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-64 text-pretty">{help}</TooltipContent>
    </Tooltip>
  )
}

/** Live biomechanics readout for the current frame, as a row of stat chips. */
export function Hud({ movementOnly }: { movementOnly: boolean }) {
  const t = useT()
  const m = useStudio((s) => s.metrics)
  const kmh = m.headSpeed * 3.6
  const face = m.faceTilt > 2 ? t('hud.face.open') : m.faceTilt < -2 ? t('hud.face.closed') : t('hud.face.square')
  return (
    <div className="flex flex-wrap gap-2" aria-live="off">
      <Chip value={deg(m.shoulderTurn)} label={t('hud.shoulderTurn')} help={t('hud.shoulderTurn.help')} />
      <Chip value={deg(m.hipTurn)} label={t('hud.hipTurn')} help={t('hud.hipTurn.help')} />
      <Chip value={deg(m.separation)} label={t('hud.separation')} help={t('hud.separation.help')} />
      <Chip value={deg(Math.min(m.kneeFront, m.kneeBack))} label={t('hud.knee')} help={t('hud.knee.help')} />
      {!movementOnly && (
        <>
          <Chip value={`${kmh.toFixed(0)} km/h`} label={t('hud.headSpeed')} help={t('hud.headSpeed.help')} />
          <Chip value={`${Math.abs(m.faceTilt).toFixed(0)}° ${face}`} label={t('hud.face')} help={t('hud.face.help')} />
        </>
      )}
    </div>
  )
}
