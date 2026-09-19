import { Vector3 } from 'three'
import { STROKES } from '../src/strokes/index'
import { StrokeRuntime } from '../src/engine/runtime'
import { createSolved, BODY } from '../src/engine/solver'
import { emptyPose } from '../src/engine/pose'
const [id, ...ts] = process.argv.slice(2)
const s = STROKES.find((x) => x.id === id)!
const rt = new StrokeRuntime(s); const sv = createSolved(); const pose = emptyPose(); const ball = new Vector3()
const f = (n: number) => n.toFixed(2)
const L = BODY.upperArm + BODY.forearm
for (const tt of (ts.length ? ts.map(Number) : s.keys.map((k) => k.t))) {
  rt.evaluate(tt, sv, ball); rt.track.sample(tt, pose)
  const shR = sv.shoulderR, shL = sv.shoulderL
  const tR = new Vector3(pose.rHand[0], pose.rHand[1], -pose.rHand[2]); let tL = new Vector3(pose.lHand[0], pose.lHand[1], -pose.lHand[2]); if (pose.lAttach > 0.5) { const along = 0.12 + 0.15 * Math.max(pose.lAttach - 1, 0); tL = sv.wristR.clone().addScaledVector(sv.racketDir, along) }
  const sug = (sh: Vector3, t: Vector3) => { const d = t.clone().sub(sh); const l = d.length(); const k = 0.93 * L / l; const p = sh.clone().addScaledVector(d, k); return `[${f(p.x)}, ${f(p.y)}, ${f(-p.z)}]` }
  console.log(`t=${tt} shR=(${f(shR.x)},${f(shR.y)},${f(-shR.z)}) tgtR ${f(tR.distanceTo(shR) / L)} → 93%: ${sug(shR, tR)} | shL=(${f(shL.x)},${f(shL.y)},${f(-shL.z)}) tgtL ${f(tL.distanceTo(shL) / L)} → ${sug(shL, tL)}`)
}
