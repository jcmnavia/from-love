/**
 * How natural each mocap stroke's racket arm is: time the wrist spends bent near its anatomical limits, the fastest
 * changes of forearm roll and wrist bend, and the fastest twist of the racket face about its own handle.
 *
 *   npx -y tsx scripts/naturalness.ts [strokeId ...]
 */
import { readFileSync, existsSync } from 'node:fs'
import { Quaternion, Vector3 } from 'three'
import { StrokeRuntime } from '../src/engine/runtime'
import { retime } from '../src/engine/rig/clips'
import { createSolved } from '../src/engine/solver'
import { STROKES } from '../src/strokes'
import { Arm, emptyArmPose } from '../src/engine/rig/arm'
import type { ClipData } from '../src/engine/rig/clip'

const only = process.argv.slice(2)
const HZ = 120, D = 180 / Math.PI
for (const authored of STROKES) {
  if (only.length && !only.includes(authored.id)) continue
  if (!authored.clip) continue
  const path = `public/motion/${authored.clip}.json`
  if (!existsSync(path)) continue
  const clip = JSON.parse(readFileSync(path, 'utf8')) as ClipData
  const stroke = retime(authored, clip)
  const rt = new StrokeRuntime(stroke, clip) as unknown as { rig: import('../src/engine/rig/rig').Rig; duration: number; evaluate: StrokeRuntime['evaluate'] }
  const arm = new Arm(rt.rig, 'Right')
  const s = createSolved(), ball = new Vector3(), p = emptyArmPose()
  const n = Math.floor(rt.duration * HZ)
  const rows: { t: number; pron: number; ext: number; dev: number; flex: number; q: Quaternion; dir: Vector3 }[] = []
  for (let i = 0; i <= n; i++) {
    const t = i / HZ
    rt.evaluate(t, s, ball)
    arm.measure(rt.rig, p)
    rows.push({ t, pron: p.pron * D, ext: p.ext * D, dev: p.dev * D, flex: p.flex * D, q: s.racketQ.clone(), dir: s.racketDir.clone() })
  }
  let hard = 0, soft = 0
  for (const r of rows) {
    if (r.ext > 80 || r.ext < -65 || r.dev < -37 || r.dev > 22 || r.pron > 95 || r.pron < -80) hard++
    else if (r.ext > 78 || r.ext < -38 || r.dev < -33 || r.dev > 15 || r.pron > 88 || r.pron < -78) soft++
  }
  // how closely the racket keys are reached (degrees between the key's and the achieved handle / face)
  const keyErr: string[] = []
  for (const k of stroke.armKeys ?? []) {
    if (!k.racket) continue
    rt.evaluate(clip.events.contact + k.t, s, ball)
    const d = new Vector3(k.racket.dir[0], k.racket.dir[1], -k.racket.dir[2]).normalize()
    let e = `${(s.racketDir.angleTo(d) * D).toFixed(0)}`
    if (k.racket.normal) {
      const nn = new Vector3(k.racket.normal[0], k.racket.normal[1], -k.racket.normal[2])
      nn.addScaledVector(d, -nn.dot(d)).normalize()
      e += `/${(s.racketNormal.angleTo(nn) * D).toFixed(0)}`
    }
    keyErr.push(e)
  }
  const rate = (k: 'pron' | 'ext' | 'dev') => {
    let m = 0, at = 0
    for (let i = 1; i < rows.length; i++) { const v = Math.abs(rows[i][k] - rows[i - 1][k]) * HZ; if (v > m) { m = v; at = rows[i].t } }
    return `${m.toFixed(0)}@${at.toFixed(2)}`
  }
  // racket twist about its own handle (face roll), separate from the handle's swing
  let twist = 0, twistAt = 0
  for (let i = 1; i < rows.length; i++) {
    const rel = rows[i - 1].q.clone().invert().multiply(rows[i].q)
    const tw = Math.abs(2 * Math.atan2(rel.y, rel.w)) * D * HZ
    const twn = tw > 180 * HZ ? 360 * HZ - tw : tw
    if (twn > twist) { twist = twn; twistAt = rows[i].t }
  }
  const contact = stroke.ball?.contactT ?? 0
  // away from the hit (outside contact −0.2…+0.25 s) nothing should spin fast: the preparation and recovery are slow
  const calm = (t: number) => t < contact - 0.2 || t > contact + 0.25
  const fast: string[] = []
  for (let i = 1; i < rows.length; i++) {
    if (!calm(rows[i].t)) continue
    const rel = rows[i - 1].q.clone().invert().multiply(rows[i].q)
    let tw = Math.abs(2 * Math.atan2(rel.y, rel.w)) * D
    if (tw > 180) tw = 360 - tw
    const sw = rows[i - 1].dir.angleTo(rows[i].dir) * D
    if (tw * HZ > 500 || sw * HZ > 700) fast.push(`${rows[i].t.toFixed(2)}s twist ${(tw * HZ).toFixed(0)} swing ${(sw * HZ).toFixed(0)}`)
  }
  console.log(`${authored.id.padEnd(20)} wrist at limit ${((hard / rows.length) * 100).toFixed(0).padStart(3)}% strained ${((soft / rows.length) * 100).toFixed(0).padStart(3)}% | max °/s pron ${rate('pron')} ext ${rate('ext')} dev ${rate('dev')} | face twist ${twist.toFixed(0)}°/s @${twistAt.toFixed(2)} (contact ${contact.toFixed(2)})${keyErr.length ? `\n    key errors ° (handle/face): ${keyErr.join(' ')}` : ''}${fast.length ? `\n    fast away from contact (${fast.length}): ${fast.filter((_, i) => i % Math.ceil(fast.length / 6) === 0).join(' | ')}` : ''}`)
}
