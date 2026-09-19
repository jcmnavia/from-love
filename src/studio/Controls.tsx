import { Minus, Plus, SlidersHorizontal } from 'lucide-react'
import type { FocusId } from '@/engine/types'
import { useT } from '@/i18n'
import { useStudio, type CamPreset, type PlayerModel, type SurfaceId } from './store'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const CAMS: CamPreset[] = ['three-quarter', 'side', 'front', 'behind', 'top']
const FOCI: FocusId[] = ['body', 'shoulders', 'hips', 'racket', 'feet', 'head']
const SURFACES: SurfaceId[] = ['hard', 'clay', 'grass', 'indoor']
const MODELS: PlayerModel[] = ['mannequin', 'skinned']

/** Compact toolbar under the canvas: camera, zoom target, zoom, and a "More" menu for overlays. */
export function StudioToolbar({ hasBall }: { hasBall: boolean }) {
  const t = useT()
  const s = useStudio()
  return (
    <div className="flex flex-wrap items-center gap-2">
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        spacing={0}
        value={s.cam.preset}
        onValueChange={(v) => v && s.setCam(v as CamPreset)}
        aria-label={t('studio.camera')}
        className="max-w-full overflow-x-auto"
      >
        {CAMS.map((id) => (
          <ToggleGroupItem key={id} value={id} className="whitespace-nowrap">
            {t(`cam.${id}`)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Select value={s.focus} onValueChange={(v) => s.set({ focus: v as FocusId })}>
        <SelectTrigger size="sm" className="w-52" aria-label={t('studio.zoomTo')}>
          <span className="text-muted-foreground">{t('studio.zoomTo')}</span>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FOCI.map((id) => (
            <SelectItem key={id} value={id}>
              {t(`focus.${id}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon-sm" className="rounded-r-none" onClick={() => s.nudgeZoom(1)} aria-label={t('studio.zoomIn')}>
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('studio.zoomIn')}</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon-sm" className="-ml-px rounded-l-none" onClick={() => s.nudgeZoom(-1)} aria-label={t('studio.zoomOut')}>
              <Minus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{t('studio.zoomOut')}</TooltipContent>
        </Tooltip>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto">
            <SlidersHorizontal data-icon="inline-start" />
            {t('studio.more')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{t('studio.overlays')}</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={s.showTrail} onCheckedChange={(v) => s.set({ showTrail: v })}>
            {t('overlay.trail')}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={s.showCoil} onCheckedChange={(v) => s.set({ showCoil: v })}>
            {t('overlay.coil')}
          </DropdownMenuCheckboxItem>
          {hasBall && (
            <DropdownMenuCheckboxItem checked={s.showBall} onCheckedChange={(v) => s.set({ showBall: v })}>
              {t('overlay.ball')}
            </DropdownMenuCheckboxItem>
          )}
          <DropdownMenuCheckboxItem checked={s.xray} onCheckedChange={(v) => s.set({ xray: v })}>
            {t('overlay.skeleton')}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={s.leftHanded} onCheckedChange={(v) => s.set({ leftHanded: v })}>
            {t('overlay.leftHanded')}
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{t('studio.body')}</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={s.model} onValueChange={(v) => s.set({ model: v as PlayerModel })}>
            {MODELS.map((m) => (
              <DropdownMenuRadioItem key={m} value={m}>
                {t(`model.${m}`)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>{t('studio.surface')}</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={s.surface} onValueChange={(v) => s.set({ surface: v as SurfaceId })}>
            {SURFACES.map((id) => (
              <DropdownMenuRadioItem key={id} value={id}>
                {t(`surface.${id}`)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
