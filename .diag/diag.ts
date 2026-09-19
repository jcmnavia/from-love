// Diagnostics for stroke keyframes: sampled kinematics per key + continuity checks. Dev aid only.
import { Vector3 } from 'three'
import { STROKES } from '../src/strokes/index'
import { StrokeRuntime } from '../src/engine/runtime'
import { createSolved, kneeAngle, lineTurn, BODY } from '../src/engine/solver'
import { emptyPose } from '../src/engine/pose'

const ids = process.argv.slice(2)
const f = (n: number, d = 2) => (Math.abs(n) < 0.005 ? '0' : n.toFixed(d))
const ang = (a: Vector3, b: Vector3) => (Math.acos(Math.min(1, Math.max(-1, a.dot(b) / (a.length() * b.length())))) * 180) / Math.PI
const v3 = (a: number[]) => new Vector3(a[0], a[1], a[2])

for (const s of STROKES) {
  if (ids.length && !ids.includes(s.id)) continue
  const rt = new StrokeRuntime(s)
  const sv = createSolved()
  const pose = emptyPose()
  console.log(`\n=== ${s.id}  dur=${s.duration} lastKey=${s.keys[s.keys.length - 1].t} keys=${s.keys.length} contact=${s.ball?.contactT ?? '-'} peak=${f(rt.peakSpeed, 1)} m/s`)
  const ball = new Vector3()
  const times = s.keys.map((k) => k.t)
  if (s.ball && !times.includes(s.ball.contactT)) times.push(s.ball.contactT)
  times.sort((a, b) => a - b)
  console.log('   t     hip  sho  sep | pelY  pelX | kneeL kneeR | armR% armL% | hand-spine | face° | v m/s')
  for (const t of times) {
    rt.evaluate(t, sv, ball)
    rt.track.sample(t, pose)
    const hip = lineTurn(sv.hipL, sv.hipR)
    const sho = lineTurn(sv.shoulderL, sv.shoulderR)
    const kl = kneeAngle(sv.hipL, sv.kneeL, sv.ankleL)
    const kr = kneeAngle(sv.hipR, sv.kneeR, sv.ankleR)
    const reach = sv.wristR.distanceTo(sv.shoulderR) / (BODY.upperArm + BODY.forearm)
    const reachL = sv.wristL.distanceTo(sv.shoulderL) / (BODY.upperArm + BODY.forearm)
    const seg = sv.neck.clone().sub(sv.pelvis)
    const dSp = (w: Vector3) => {
      const u = Math.min(1, Math.max(0, w.clone().sub(sv.pelvis).dot(seg) / seg.lengthSq()))
      return w.distanceTo(sv.pelvis.clone().addScaledVector(seg, u))
    }
    const face = ang(sv.racketNormal, new Vector3(0, 0, -1))
    const isC = s.ball && Math.abs(t - s.ball.contactT) < 1e-6 ? '*' : ' '
    console.log(
      `${isC}${f(t)}  ${f(hip, 0).padStart(4)} ${f(sho, 0).padStart(4)} ${f(sho - hip, 0).padStart(4)} | ${f(pose.pelvis[1])} ${f(pose.pelvis[0]).padStart(5)} | ${f(kl, 0).padStart(5)} ${f(kr, 0).padStart(5)} | ${f(reach * 100, 0).padStart(4)}% ${f(reachL * 100, 0).padStart(4)}% | R${f(dSp(sv.wristR))} L${f(dSp(sv.wristL))} | ${f(face, 0).padStart(3)} | ${f(rt.speedAt(t), 1)}`,
    )
  }
  // key-to-key racket orientation jumps (a normal turning > 110° between keys flips through edge-on)
  for (let i = 1; i < s.keys.length; i++) {
    const a = s.keys[i - 1].pose
    const b = s.keys[i].pose
    const dn = ang(v3(a.racketNormal), v3(b.racketNormal))
    const dd = ang(v3(a.racketDir), v3(b.racketDir))
    if (dn > 100 || dd > 110) console.log(`   !! keys ${a && s.keys[i - 1].t}→${s.keys[i].t}: normal turns ${f(dn, 0)}°, dir turns ${f(dd, 0)}°`)
  }
  let maxNormalRate = 0
  let tAt = 0
  const prev = new Vector3()
  for (let i = 1; i < 400; i++) {
    const t = (i / 399) * s.duration
    rt.evaluate(t, sv, ball)
    if (i > 1) {
      const d = ang(prev, sv.racketNormal) / (s.duration / 399)
      if (d > maxNormalRate) {
        maxNormalRate = d
        tAt = t
      }
    }
    prev.copy(sv.racketNormal)
  }
  console.log(`   max face-normal rate ${f(maxNormalRate, 0)} deg/s at t=${f(tAt)}`)
  if (s.ball) {
    const pts = s.ball.waypoints
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i]
      const b = i + 1 < pts.length ? pts[i + 1] : { t: s.ball.contactT, p: null }
      if (a.p === 'lHand') continue
      const pb = b.p ?? (rt.contact ? [rt.contact.x, rt.contact.y, -rt.contact.z] : null)
      if (!pb || pb === 'lHand') continue
      const dt = b.t - a.t
      const dx = pb[0] - a.p[0]
      const dz = pb[2] - a.p[2]
      const dy = pb[1] - a.p[1]
      const vy0 = dy / dt + 0.5 * 9.81 * dt
      const v0 = Math.hypot(dx / dt, vy0, dz / dt)
      const vy1 = vy0 - 9.81 * dt
      const v1 = Math.hypot(dx / dt, vy1, dz / dt)
      console.log(`   ball seg ${f(a.t)}→${f(b.t)}: launch ${f(v0, 1)} m/s, arrive ${f(v1, 1)} m/s`)
    }
    console.log(`   out speed ${f(Math.hypot(...s.ball.out), 1)} m/s, contact at author (${f(rt.contact!.x)}, ${f(rt.contact!.y)}, ${f(-rt.contact!.z)})`)
  }
  for (const p of s.phases) {
    if (p.keyT < p.t0 || p.keyT > p.t1) console.log(`   !! phase ${p.id} keyT ${p.keyT} outside [${p.t0}, ${p.t1}]`)
  }
  for (let i = 1; i < s.phases.length; i++) if (Math.abs(s.phases[i].t0 - s.phases[i - 1].t1) > 1e-6) console.log(`   !! phase gap at ${s.phases[i].id}`)
  const last = s.phases[s.phases.length - 1]
  if (Math.abs(last.t1 - s.duration) > 1e-6) console.log(`   !! last phase t1 ${last.t1} != duration ${s.duration}`)
  if (Math.abs(s.keys[s.keys.length - 1].t - s.duration) > 1e-6) console.log(`   !! last key ${s.keys[s.keys.length - 1].t} != duration`)
}
