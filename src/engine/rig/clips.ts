import type { Stroke } from '../types'
import type { ClipData } from './clip'

/** Retargeted mocap clips live in public/motion (CC BY-SA 3.0, see public/motion/LICENSE.md). */
const cache = new Map<string, Promise<ClipData>>()

export function loadClip(id: string): Promise<ClipData> {
  let p = cache.get(id)
  if (!p) {
    p = fetch(`${import.meta.env.BASE_URL}motion/${id}.json`).then((r) => {
      if (!r.ok) throw new Error(`motion clip ${id}: HTTP ${r.status}`)
      return r.json() as Promise<ClipData>
    })
    cache.set(id, p)
  }
  return p
}

/**
 * Re-times an authored stroke onto a clip: phase boundaries, freeze instants
 * and ball waypoints are warped piecewise-linearly so that the authored
 * contact lands on the clip's measured contact and the stroke spans the clip.
 * Phase text is untouched; only times move.
 */
export function retime(stroke: Stroke, clip: ClipData): Stroke {
  const dur = (clip.frames - 1) / clip.fps
  const oldC = stroke.ball?.contactT ?? stroke.duration / 2
  const newC = clip.events.contact
  const warp = (t: number) =>
    t <= oldC ? (t / oldC) * newC : newC + ((t - oldC) / (stroke.duration - oldC)) * (dur - newC)
  const r = (t: number) => Math.round(warp(t) * 1000) / 1000
  return {
    ...stroke,
    clip: clip.id,
    duration: dur,
    phases: stroke.phases.map((p, i) => ({
      ...p,
      t0: i === 0 ? 0 : r(p.t0),
      t1: i === stroke.phases.length - 1 ? dur : r(p.t1),
      keyT: r(p.keyT),
    })),
    ball: stroke.ball && {
      ...stroke.ball,
      contactT: newC,
      waypoints: stroke.ball.waypoints.map((w) => ({ ...w, t: r(w.t) })),
    },
  }
}
