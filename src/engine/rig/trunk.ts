import { Quaternion, Vector3 } from 'three'
import type { Rig } from './rig'

const UP = new Vector3(0, 1, 0)
const SPINE: [string, number][] = [
  ['Spine', 0.3],
  ['Spine1', 0.3],
  ['Spine2', 0.4],
]
const qa = new Quaternion()
const qb = new Quaternion()

/**
 * Turns the upper body about the vertical by `deg` (+ = shoulders further toward the player's right),
 * spread over the spine; the neck turns back by the same amount so the head keeps looking where it was.
 */
export function turnTrunk(rig: Rig, deg: number) {
  if (!deg) return
  // world yaw about +Y moves the right shoulder toward the net (−z), i.e. opens the shoulders
  const total = (-deg * Math.PI) / 180
  for (const [name, share] of [...SPINE, ['Neck', -1] as [string, number]]) {
    const i = rig.find(name)
    const p = rig.parent[i]
    // local' = parentWorld⁻¹ · R · world, with R a turn about world up
    const world = qa.copy(rig.quat[i])
    const turned = qb.setFromAxisAngle(UP, total * share).multiply(world)
    rig.local[i].copy(rig.quat[p]).invert().multiply(turned)
    rig.repose()
  }
}

/** smoothstep-interpolated value of `[t, v]` keys at `x` (held at the ends) */
export function keyed(keys: [number, number][], x: number) {
  if (x <= keys[0][0]) return keys[0][1]
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, a] = keys[i]
    const [t1, b] = keys[i + 1]
    if (x <= t1) {
      const u = (x - t0) / (t1 - t0)
      return a + (b - a) * u * u * (3 - 2 * u)
    }
  }
  return keys[keys.length - 1][1]
}
