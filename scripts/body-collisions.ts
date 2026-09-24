/**
 * Body self-intersection check at 120 Hz: arms against the trunk (an elliptical cylinder in the trunk's own frame),
 * the head and the thighs; the legs against each other. Radii approximate the Rocketbox mesh.
 *
 *   npx -y tsx scripts/body-collisions.ts [strokeId ...] [--times]
 */
import { readFileSync, existsSync } from 'node:fs'
import { Vector3 } from 'three'
import { StrokeRuntime } from '../src/engine/runtime'
import { retime } from '../src/engine/rig/clips'
import { createSolved, type Solved } from '../src/engine/solver'
import { STROKES } from '../src/strokes'
import type { ClipData } from '../src/engine/rig/clip'

const R = { upperArm: 0.05, foreArm: 0.04, hand: 0.045, thigh: 0.08, shin: 0.055, head: 0.1 }
/** trunk half-width (left–right) and half-depth, metres */
const TRUNK = { a: 0.14, b: 0.1 }

const closest = (a: Vector3, b: Vector3, c: Vector3, d: Vector3) => {
  // closest distance between segments ab and cd (sampled; segments are short)
  let best = Infinity
  for (let i = 0; i <= 8; i++) {
    const p = a.clone().lerp(b, i / 8)
    const cd = d.clone().sub(c)
    const t = Math.min(Math.max(p.clone().sub(c).dot(cd) / Math.max(cd.lengthSq(), 1e-9), 0), 1)
    best = Math.min(best, p.distanceTo(c.clone().addScaledVector(cd, t)))
  }
  return best
}

/** how deep points of segment ab (radius r), from fraction f0 on, go inside the trunk */
function trunkDepth(s: Solved, a: Vector3, b: Vector3, r: number, f0 = 0) {
  const axis = s.neck.clone().sub(s.pelvis)
  const len = axis.length()
  axis.divideScalar(len)
  const lat = s.shoulderR.clone().sub(s.shoulderL)
  lat.addScaledVector(axis, -lat.dot(axis)).normalize()
  const dep = axis.clone().cross(lat)
  let worst = 0
  for (let i = 0; i <= 10; i++) {
    const f = f0 + ((1 - f0) * i) / 10
    const p = a.clone().lerp(b, f).sub(s.pelvis)
    const h = p.dot(axis)
    if (h < 0.05 || h > len - 0.06) continue
    const x = p.dot(lat), z = p.dot(dep)
    // radial distance to the ellipse along the point's direction
    const ang = Math.atan2(z, x)
    const rad = (TRUNK.a * TRUNK.b) / Math.hypot(TRUNK.b * Math.cos(ang), TRUNK.a * Math.sin(ang))
    const d = rad + r - Math.hypot(x, z)
    if (d > worst) worst = d
  }
  return worst
}

export function bodyHits(s: Solved) {
  const hits: [string, number][] = []
  const add = (name: string, depth: number) => { if (depth > 0.015) hits.push([name, depth]) }
  for (const [side, sh, el, wr] of [
    ['right', s.shoulderR, s.elbowR, s.wristR],
    ['left', s.shoulderL, s.elbowL, s.wristL],
  ] as const) {
    add(`${side} upper arm in trunk`, trunkDepth(s, sh, el, R.upperArm, 0.45))
    add(`${side} forearm in trunk`, trunkDepth(s, el, wr, R.foreArm))
    add(`${side} hand in trunk`, trunkDepth(s, wr, wr, R.hand))
    add(`${side} forearm in head`, R.foreArm + R.head - closest(el, wr, s.head, s.head))
    for (const [leg, hip, knee] of [['left', s.hipL, s.kneeL], ['right', s.hipR, s.kneeR]] as const)
      add(`${side} forearm in ${leg} thigh`, R.foreArm + R.thigh - closest(el, wr, hip.clone().lerp(knee, 0.15), knee))
  }
  add('right forearm in left forearm', 2 * R.foreArm - closest(s.elbowR, s.wristR, s.elbowL, s.wristL))
  add('thighs', 2 * R.thigh - closest(s.hipL.clone().lerp(s.kneeL, 0.3), s.kneeL, s.hipR.clone().lerp(s.kneeR, 0.3), s.kneeR))
  add('shins', 2 * R.shin - closest(s.kneeL, s.ankleL, s.kneeR, s.ankleR))
  add('left shin in right thigh', R.shin + R.thigh - closest(s.kneeL, s.ankleL, s.hipR.clone().lerp(s.kneeR, 0.3), s.kneeR))
  add('right shin in left thigh', R.shin + R.thigh - closest(s.kneeR, s.ankleR, s.hipL.clone().lerp(s.kneeL, 0.3), s.kneeL))
  return hits
}

if (process.argv[1]?.endsWith('body-collisions.ts')) {
  const args = process.argv.slice(2)
  const only = args.filter((a) => !a.startsWith('--'))
  const HZ = 120
  for (const authored of STROKES) {
    if (only.length && !only.includes(authored.id)) continue
    const path = authored.clip ? `public/motion/${authored.clip}.json` : ''
    const clip = path && existsSync(path) ? (JSON.parse(readFileSync(path, 'utf8')) as ClipData) : null
    const stroke = clip ? retime(authored, clip) : authored
    const rt = new StrokeRuntime(stroke, clip)
    const s = createSolved(), ball = new Vector3()
    const worst = new Map<string, { depth: number; t: number; frames: number }>()
    let frames = 0
    for (let i = 0; i <= rt.duration * HZ; i++) {
      const t = i / HZ
      rt.evaluate(t, s, ball)
      const hits = bodyHits(s)
      if (hits.length) frames++
      for (const [name, d] of hits) {
        const w = worst.get(name) ?? { depth: 0, t, frames: 0 }
        w.frames++
        if (d > w.depth) { w.depth = d; w.t = t }
        worst.set(name, w)
      }
    }
    const list = [...worst.entries()].sort((a, b) => b[1].depth - a[1].depth)
    console.log(`${authored.id.padEnd(20)} ${frames ? `${((frames / (rt.duration * HZ)) * 100).toFixed(0)}% of frames: ${list.map(([n, w]) => `${n} ${(w.depth * 100).toFixed(0)}cm @${w.t.toFixed(2)} (${w.frames}f)`).join('; ')}` : 'clear'}`)
  }
}
