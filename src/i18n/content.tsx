import { useMemo } from 'react'
import { useLocale, type Locale } from './index'
import type { BallType, Drill, Grip, JuniorSize, Lesson, PathStage, RacquetSpec, StringSpec, Surface } from '../content/types'
import type { Stroke } from '../engine/types'
import * as enSurfaces from '../content/surfaces'
import * as enBalls from '../content/balls'
import * as enGrips from '../content/grips'
import * as enRacquets from '../content/racquets'
import * as enDrills from '../content/drills'
import * as enPath from '../content/path'
import * as enLF from '../content/lessons-fundamentals'
import * as enLE from '../content/lessons-equipment'
import * as enLM from '../content/lessons-movement'
import * as esSurfaces from '../content/es/surfaces'
import * as esBalls from '../content/es/balls'
import * as esGrips from '../content/es/grips'
import * as esRacquets from '../content/es/racquets'
import * as esDrills from '../content/es/drills'
import * as esPath from '../content/es/path'
import * as esLF from '../content/es/lessons-fundamentals'
import * as esLE from '../content/es/lessons-equipment'
import * as esLM from '../content/es/lessons-movement'
import { STROKES } from '../strokes'
import { STROKE_TEXT_ES } from '../strokes/es'
import { PLAYERS, type ProPlayer } from '../data/players'
import playersEs from '../data/players/es.json'

export interface LocalizedContent {
  lessons: Lesson[]
  drills: Drill[]
  path: PathStage[]
  surfaces: Surface[]
  balls: BallType[]
  grips: Grip[]
  racquets: RacquetSpec[]
  juniorSizes: JuniorSize[]
  strings: StringSpec[]
  strokes: Stroke[]
  players: ProPlayer[]
}

type PlayerOverride = Partial<Pick<ProPlayer, 'techniqueNotes' | 'lesson'>>

function build(locale: Locale): LocalizedContent {
  const e = locale === 'es'
  const overrides = playersEs as Record<string, PlayerOverride>
  return {
    lessons: [
      ...(e ? esLF.FUNDAMENTAL_LESSONS : enLF.FUNDAMENTAL_LESSONS),
      ...(e ? esLE.EQUIPMENT_LESSONS : enLE.EQUIPMENT_LESSONS),
      ...(e ? esLM.MOVEMENT_LESSONS : enLM.MOVEMENT_LESSONS),
    ],
    drills: e ? esDrills.DRILLS : enDrills.DRILLS,
    path: e ? esPath.PATH : enPath.PATH,
    surfaces: e ? esSurfaces.SURFACES : enSurfaces.SURFACES,
    balls: e ? esBalls.BALLS : enBalls.BALLS,
    grips: e ? esGrips.GRIPS : enGrips.GRIPS,
    racquets: e ? esRacquets.RACQUET_TYPES : enRacquets.RACQUET_TYPES,
    juniorSizes: e ? esRacquets.JUNIOR_SIZES : enRacquets.JUNIOR_SIZES,
    strings: (e ? esRacquets.STRING_TYPES : enRacquets.STRING_TYPES) as StringSpec[],
    strokes: e
      ? STROKES.map((s) => {
          const tx = STROKE_TEXT_ES[s.id]
          if (!tx) return s
          const { phases, ...rest } = tx
          return { ...s, ...rest, phases: s.phases.map((p, i) => ({ ...p, ...(phases[i] ?? {}) })) }
        })
      : STROKES,
    players: e ? PLAYERS.map((p) => ({ ...p, ...(overrides[p.id] ?? {}) })) : PLAYERS,
  }
}

const cache: Partial<Record<Locale, LocalizedContent>> = {}

/** All teaching content in the active language. Spanish falls back to English wherever a translation is missing. */
export function useContent(): LocalizedContent {
  const { locale } = useLocale()
  return useMemo(() => (cache[locale] ??= build(locale)), [locale])
}
