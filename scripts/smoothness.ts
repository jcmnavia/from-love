/**
 * Scans every stroke for visible glitches: racket-direction angular speed and hand speed sampled at 240 Hz,
 * flagging spikes (a sample far above both neighbours' trend) and implausible peaks away from contact.
 *
 *   npx -y tsx scripts/smoothness.ts [strokeId ...]
 */
import { readFileSync, existsSync } from 'node:fs'
import { Vector3 } from 'three'
import { StrokeRuntime } from '../src/engine/runtime'
import { retime } from '../src/engine/rig/clips'
import { createSolved } from '../src/engine/solver'
import { STROKES } from '../src/strokes'
import type { ClipData } from '../src/engine/rig/clip'

const only = process.argv.slice(2)
const HZ = 240
for (const authored of STROKES) {
  if (only.length && !only.includes(authored.id)) continue
  const path = authored.clip ? `public/motion/${authored.clip}.json` : ''
  const clip = path && existsSync(path) ? (JSON.parse(readFileSync(path, 'utf8')) as ClipData) : null
  const stroke = clip ? retime(authored, clip) : authored
  const rt = new StrokeRuntime(stroke, clip)
  const s = createSolved(), ball = new Vector3()
  const n = Math.floor(rt.duration * HZ)
  const dirs: Vector3[] = [], hands: Vector3[] = [], elbows: Vector3[] = []
  for (let i = 0; i <= n; i++) {
    rt.evaluate(i / HZ, s, ball)
    dirs.push(s.racketDir.clone()); hands.push(s.wristR.clone()); elbows.push(s.elbowL.clone())
  }
  const ang = dirs.slice(1).map((d, i) => (d.angleTo(dirs[i]) * 180 / Math.PI) * HZ) // °/s
  const hv = hands.slice(1).map((h, i) => h.distanceTo(hands[i]) * HZ) // m/s
  const lv = elbows.slice(1).map((h, i) => h.distanceTo(elbows[i]) * HZ)
  const contact = stroke.ball?.contactT ?? rt.duration / 2
  const issues: string[] = []
  const spikes = (v: number[], label: string, floor: number) => {
    for (let i = 2; i < v.length - 2; i++) {
      const around = (v[i - 2] + v[i + 2]) / 2
      if (v[i] > floor && v[i] > 2.5 * around + floor * 0.5) issues.push(`${label} spike ${v[i].toFixed(0)} at ${(i / HZ).toFixed(3)}s (around ${around.toFixed(0)})`)
    }
  }
  spikes(ang, 'racket °/s', 400)
  spikes(hv, 'hand m/s', 1.5)
  spikes(lv, 'left elbow m/s', 1.5)
  const peakAng = Math.max(...ang), peakAt = ang.indexOf(peakAng) / HZ
  const peakHand = Math.max(...hv)
  // a clip loops: compare the last and first poses
  rt.evaluate(0, s, ball); const d0 = s.racketDir.clone(), h0 = s.wristR.clone()
  rt.evaluate(rt.duration, s, ball)
  const loop = `loop gap ${(d0.angleTo(s.racketDir) * 180 / Math.PI).toFixed(0)}° / ${(h0.distanceTo(s.wristR) * 100).toFixed(0)} cm`
  console.log(`${authored.id.padEnd(22)} ${clip ? 'clip' : 'keys'}  peak racket ${peakAng.toFixed(0)}°/s at ${peakAt.toFixed(2)}s (contact ${contact.toFixed(2)}), peak hand ${peakHand.toFixed(1)} m/s, ${loop}${issues.length ? '\n    ' + issues.slice(0, 8).join('\n    ') + (issues.length > 8 ? `\n    … ${issues.length - 8} more` : '') : ''}`)
}
