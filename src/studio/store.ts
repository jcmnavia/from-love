import { create } from 'zustand'
import type { FocusId } from '../engine/types'

export type CamPreset = 'side' | 'front' | 'behind' | 'top' | 'three-quarter'
export type SurfaceId = 'hard' | 'clay' | 'grass' | 'indoor'
/** which body to render: the procedural mannequin or a skinned humanoid mesh */
export type PlayerModel = 'mannequin' | 'skinned'

export interface Metrics {
  shoulderTurn: number
  hipTurn: number
  separation: number
  kneeFront: number
  kneeBack: number
  headSpeed: number
  faceTilt: number
  handHeight: number
}

interface StudioState {
  t: number
  playing: boolean
  speed: number
  focus: FocusId
  cam: { preset: CamPreset; nonce: number }
  zoom: { dir: number; nonce: number }
  leftHanded: boolean
  surface: SurfaceId
  showTrail: boolean
  showCoil: boolean
  showBall: boolean
  xray: boolean
  model: PlayerModel
  metrics: Metrics
  set: (s: Partial<StudioState>) => void
  setCam: (preset: CamPreset) => void
  nudgeZoom: (dir: number) => void
}

export const useStudio = create<StudioState>((set) => ({
  t: 0,
  playing: true,
  speed: 0.5,
  focus: 'body',
  cam: { preset: 'three-quarter', nonce: 0 },
  zoom: { dir: 0, nonce: 0 },
  leftHanded: false,
  surface: 'hard',
  showTrail: true,
  showCoil: true,
  showBall: true,
  xray: false,
  model: 'mannequin',
  metrics: {
    shoulderTurn: 0, hipTurn: 0, separation: 0, kneeFront: 180, kneeBack: 180,
    headSpeed: 0, faceTilt: 0, handHeight: 0,
  },
  set: (s) => set(s),
  setCam: (preset) => set((st) => ({ cam: { preset, nonce: st.cam.nonce + 1 } })),
  nudgeZoom: (dir) => set((st) => ({ zoom: { dir, nonce: st.zoom.nonce + 1 } })),
}))
