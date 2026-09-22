/**
 * Motion quality report: samples every stroke at 240 fps through the same
 * runtime the studio uses and prints numbers that track what reads as "janky".
 *
 *   npx tsx scripts/motion-report.ts
 *
 * elbowAcc  peak elbow acceleration (m/s²): pops and swivel whips show up here
 * wristJerk RMS jerk of the wrist path (m/s³): start-stop motion between keys
 * minElbow  smallest inner elbow angle (°): below ~35° the forearm folds unnaturally
 */
import { Vector3 } from 'three'
import { STROKES } from '../src/strokes/index'
import { StrokeRuntime } from '../src/engine/runtime'
import { createSolved } from '../src/engine/solver'

const FPS = 240
const only = process.argv.slice(2)
for (const s of STROKES) {
  if (only.length && !only.includes(s.id)) continue
  const rt = new StrokeRuntime(s)
  const sv = createSolved()
  const ball = new Vector3()
  const E: Vector3[] = []
  const W: Vector3[] = []
  let minElbow = 180
  for (let i = 0; i * (1 / FPS) <= s.duration; i++) {
    rt.evaluate(i / FPS, sv, ball)
    E.push(sv.elbowR.clone())
    W.push(sv.wristR.clone())
    const a = sv.shoulderR.clone().sub(sv.elbowR).normalize()
    const b = sv.wristR.clone().sub(sv.elbowR).normalize()
    minElbow = Math.min(minElbow, (Math.acos(Math.max(-1, Math.min(1, a.dot(b)))) * 180) / Math.PI)
  }
  let maxAcc = 0
  let at = 0
  for (let i = 1; i < E.length - 1; i++) {
    const acc = E[i + 1].clone().add(E[i - 1]).sub(E[i].clone().multiplyScalar(2)).length() * FPS * FPS
    if (acc > maxAcc) [maxAcc, at] = [acc, i / FPS]
  }
  let jerk = 0
  for (let i = 2; i < W.length - 1; i++) {
    const j = W[i + 1].clone().sub(W[i].clone().multiplyScalar(3)).add(W[i - 1].clone().multiplyScalar(3)).sub(W[i - 2])
    jerk += (j.length() * FPS ** 3) ** 2
  }
  jerk = Math.sqrt(jerk / (W.length - 3))
  console.log(
    `${s.id.padEnd(20)} elbowAcc ${maxAcc.toFixed(0).padStart(6)} @${at.toFixed(2)}s  wristJerk ${jerk.toFixed(0).padStart(6)}  minElbow ${minElbow.toFixed(0)}°`,
  )
}
