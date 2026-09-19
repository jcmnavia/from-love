import type { Stroke, StrokeCategory } from '../engine/types'
import { forehand } from './forehand'
import { backhandOneHanded, backhandTwoHanded } from './backhands'
import { serve } from './serve'
import { dropShot, slice } from './slice'
import { backSmash, backhandVolley, forehandVolley, smash, swingVolley } from './net'
import { returnOfServe, tweener } from './specialty'
import { crossover, shuffle, splitStep } from './movement'

export const STROKES: Stroke[] = [
  forehand,
  backhandTwoHanded,
  backhandOneHanded,
  slice,
  returnOfServe,
  serve,
  forehandVolley,
  backhandVolley,
  swingVolley,
  smash,
  dropShot,
  backSmash,
  tweener,
  splitStep,
  shuffle,
  crossover,
]

export const CATEGORY_LABEL: Record<StrokeCategory, string> = {
  groundstroke: 'Groundstrokes',
  serve: 'Serve',
  net: 'Net play',
  specialty: 'Specialty shots',
  movement: 'Movement',
}

export const strokeById = (id: string | undefined) => STROKES.find((s) => s.id === id)
