/**
 * Racket-through-body check: at 120 Hz, the racket (grip centre → tip, and the head's ring) against the head,
 * trunk and legs as capsules. Reports where the racket passes inside the body.
 *
 *   npx -y tsx scripts/collisions.ts [strokeId ...]
 */
import { readFileSync, existsSync } from 'node:fs'
import { Vector3 } from 'three'
import { StrokeRuntime } from '../src/engine/runtime'
import { retime } from '../src/engine/rig/clips'
import { createSolved, RACKET } from '../src/engine/solver'
import { STROKES } from '../src/strokes'
import type { ClipData } from '../src/engine/rig/clip'

const segDist = (p: Vector3, a: Vector3, b: Vector3) => {
  const ab = b.clone().sub(a), t = Math.min(Math.max(p.clone().sub(a).dot(ab) / ab.lengthSq(), 0), 1)
  return p.distanceTo(a.clone().addScaledVector(ab, t))
}
const only = process.argv.slice(2)
const HZ = 120
for (const authored of STROKES) {
  if (only.length && !only.includes(authored.id)) continue
  const path = authored.clip ? `public/motion/${authored.clip}.json` : ''
  const clip = path && existsSync(path) ? (JSON.parse(readFileSync(path, 'utf8')) as ClipData) : null
  const stroke = clip ? retime(authored, clip) : authored
  const rt = new StrokeRuntime(stroke, clip)
  const s = createSolved(), ball = new Vector3()
  const hits: string[] = []
  let count = 0
  for (let i = 0; i <= rt.duration * HZ; i++) {
    const t = i / HZ
    rt.evaluate(t, s, ball)
    // points along the frame (skip the handle inside the hand) and around the head's ring
    const pts: Vector3[] = []
    for (let k = 0; k <= 8; k++) pts.push(s.wristR.clone().addScaledVector(s.racketDir, 0.18 + (k / 8) * (RACKET.length - RACKET.butt - 0.18)))
    const side = s.racketDir.clone().cross(s.racketNormal).normalize()
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2
      pts.push(s.racketHead.clone().addScaledVector(side, 0.13 * Math.cos(a)).addScaledVector(s.racketDir, 0.17 * Math.sin(a)))
    }
    const bodies: [string, Vector3, Vector3, number][] = [
      ['head', s.head, s.head, 0.1],
      ['trunk', s.pelvis, s.neck, 0.13],
      ['left thigh', s.hipL, s.kneeL, 0.07],
      ['right thigh', s.hipR, s.kneeR, 0.07],
      ['left shin', s.kneeL, s.ankleL, 0.05],
      ['right shin', s.kneeR, s.ankleR, 0.05],
      ['left upper arm', s.shoulderL, s.elbowL, 0.045],
    ]
    for (const [name, a, b, r] of bodies) {
      const d = Math.min(...pts.map((p) => segDist(p, a, b)))
      if (d < r) {
        count++
        if (!hits.length || !hits[hits.length - 1].startsWith(name) || hits.length < 12) hits.push(`${name} ${((r - d) * 100).toFixed(0)}cm @${t.toFixed(2)}`)
      }
    }
  }
  console.log(`${authored.id.padEnd(20)} ${count ? `${count} frames inside: ${hits.slice(0, 10).join(', ')}` : 'clear'}`)
}
