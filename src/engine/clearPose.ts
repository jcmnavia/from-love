import { Vector3 } from 'three'
import type { Solved } from './solver'
import type { Pose, V3 } from './types'

/**
 * Keeps keyframed arms out of the trunk (the mocap strokes use engine/rig/clearance.ts on the real skeleton).
 * Given a trial solve of `pose`, a hand inside the trunk is pushed straight out, and an elbow inside it gets its
 * pole turned outward; the amounts follow the penetration depth, so the correction fades in and out smoothly.
 * The trunk is an elliptical cylinder in its own frame, the same shape as the rig's.
 */
const TRUNK = { a: 0.14, b: 0.1 }
const R = { upperArm: 0.05, foreArm: 0.042, hand: 0.05 }

const v1 = new Vector3()
const v2 = new Vector3()

interface Frame {
  origin: Vector3
  axis: Vector3
  lat: Vector3
  dep: Vector3
  len: number
}
const frame: Frame = { origin: new Vector3(), axis: new Vector3(), lat: new Vector3(), dep: new Vector3(), len: 1 }

function trunkFrame(s: Solved) {
  frame.origin.copy(s.pelvis)
  frame.axis.copy(s.neck).sub(s.pelvis)
  frame.len = frame.axis.length()
  frame.axis.divideScalar(frame.len)
  frame.lat.copy(s.shoulderR).sub(s.shoulderL)
  frame.lat.addScaledVector(frame.axis, -frame.lat.dot(frame.axis)).normalize()
  frame.dep.copy(frame.axis).cross(frame.lat)
  return frame
}

/** depth of a sphere at p inside the trunk; `outward` receives the world direction out of it */
function depthAt(f: Frame, p: Vector3, r: number, outward: Vector3) {
  const q = v1.copy(p).sub(f.origin)
  const h = q.dot(f.axis)
  if (h < 0.06 || h > f.len - 0.05) return 0
  const x = q.dot(f.lat), z = q.dot(f.dep)
  const ang = Math.atan2(z, x)
  const rad = (TRUNK.a * TRUNK.b) / Math.hypot(TRUNK.b * Math.cos(ang), TRUNK.a * Math.sin(ang))
  const d = rad + r - Math.hypot(x, z)
  if (d <= 0) return 0
  outward.copy(f.lat).multiplyScalar(Math.cos(ang)).addScaledVector(f.dep, Math.sin(ang)).normalize()
  return d
}

const toAuthor = (v: Vector3): V3 => [v.x, v.y, -v.z]

/** Adjusts `pose` (hands and poles) in place from the trial solve `s`; returns true if anything changed. */
export function clearPose(pose: Pose, s: Solved): boolean {
  const f = trunkFrame(s)
  const out = new Vector3()
  let changed = false
  for (const side of ['R', 'L'] as const) {
    const S = side === 'R' ? s.shoulderR : s.shoulderL
    const E = side === 'R' ? s.elbowR : s.elbowL
    const W = side === 'R' ? s.wristR : s.wristL
    // the elbow: worst point on the lower upper arm and upper forearm
    let de = 0
    const eOut = new Vector3()
    for (let i = 5; i <= 10; i++) {
      const d = depthAt(f, v2.copy(S).lerp(E, i / 10), R.upperArm, out)
      if (d > de) { de = d; eOut.copy(out) }
    }
    for (let i = 1; i <= 4; i++) {
      const d = depthAt(f, v2.copy(E).lerp(W, i / 8), R.foreArm, out)
      if (d > de) { de = d; eOut.copy(out) }
    }
    if (de > 0) {
      const pole = side === 'R' ? pose.rPole : pose.lPole
      const w = Math.min(de / 0.04, 1)
      const p = new Vector3(pole[0], pole[1], -pole[2]).normalize().lerp(eOut, w).normalize()
      if (side === 'R') pose.rPole = toAuthor(p)
      else pose.lPole = toAuthor(p)
      changed = true
    }
    // the hand (not while the left hand holds the racket)
    if (side === 'L' && pose.lAttach > 0.5) continue
    let dh = 0
    const hOut = new Vector3()
    for (let i = 5; i <= 8; i++) {
      const d = depthAt(f, v2.copy(E).lerp(W, i / 8), i === 8 ? R.hand : R.foreArm, out)
      if (d > dh) { dh = d; hOut.copy(out) }
    }
    // the head: a forearm or hand behind or beside it moves away from its centre
    {
      let best = Infinity
      const near = new Vector3()
      for (let i = 2; i <= 8; i++) {
        const p = v2.copy(E).lerp(W, i / 8)
        const d = p.distanceTo(s.head)
        if (d < best) { best = d; near.copy(p) }
      }
      const dd = 0.1 + R.foreArm - best
      if (dd > dh) {
        dh = dd
        hOut.copy(near).sub(s.head).normalize()
      }
    }
    if (dh > 0) {
      const hand = side === 'R' ? pose.rHand : pose.lHand
      const moved: V3 = [hand[0] + hOut.x * (dh + 0.005), hand[1] + hOut.y * (dh + 0.005), hand[2] - hOut.z * (dh + 0.005)]
      if (side === 'R') pose.rHand = moved
      else pose.lHand = moved
      changed = true
    }
  }
  return changed
}
