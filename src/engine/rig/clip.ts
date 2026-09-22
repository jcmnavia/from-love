import { Quaternion } from 'three'
import type { V3 } from '../types'
import type { Rig } from './rig'

/** A retargeted mocap clip (format: docs/research/refactor-design.md, produced by scripts/mocap). */
export interface ClipData {
  id: string
  fps: number
  frames: number
  source: { file: string; window: [number, number]; player: string; license: string; attribution: string }
  bones: string[]
  hips: number[]
  rot: number[]
  events: { start: number; backswingEnd: number; forwardStart: number; contact: number; finish: number; end: number }
  feet?: { leftPlanted: [number, number][]; rightPlanted: [number, number][] }
}

const qa = new Quaternion()
const qb = new Quaternion()

/** Samples a clip onto a rig: slerped local rotations and a lerped hips position. */
export class ClipTrack {
  readonly data: ClipData
  readonly duration: number
  private map: Int16Array
  private hips: V3 = [0, 0, 0]

  constructor(data: ClipData, rig: Rig) {
    this.data = data
    this.duration = (data.frames - 1) / data.fps
    this.map = Int16Array.from(data.bones.map((n) => rig.find(n)))
  }

  /** poses `rig` at time `t` (seconds from the clip start) and returns the hips position used */
  apply(rig: Rig, t: number): V3 {
    const d = this.data
    const f = Math.min(Math.max(t * d.fps, 0), d.frames - 1)
    const i = Math.min(Math.floor(f), d.frames - 2)
    const u = f - i
    rig.resetLocal()
    const nb = d.bones.length
    for (let b = 0; b < nb; b++) {
      const k = this.map[b]
      if (k < 0) continue
      const o0 = (i * nb + b) * 4
      const o1 = o0 + nb * 4
      qa.set(d.rot[o0], d.rot[o0 + 1], d.rot[o0 + 2], d.rot[o0 + 3])
      qb.set(d.rot[o1], d.rot[o1 + 1], d.rot[o1 + 2], d.rot[o1 + 3])
      rig.local[k].slerpQuaternions(qa, qb, u)
    }
    for (let c = 0; c < 3; c++) this.hips[c] = d.hips[i * 3 + c] * (1 - u) + d.hips[(i + 1) * 3 + c] * u
    rig.pose(this.hips)
    return this.hips
  }
}
