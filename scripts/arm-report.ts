/**
 * Prints the right arm of a mocap clip in anatomical terms (engine/rig/arm.ts) over time, optionally
 * with a stroke's arm warp applied, so a pro's reference positions can be keyed against it.
 *
 *   npx -y tsx scripts/arm-report.ts forehand [--warp] [--times 0,0.5,...] [--check]
 */
import { readFileSync } from 'node:fs'
import { Quaternion, Vector3 } from 'three'
import { Rig } from '../src/engine/rig/rig'
import { ClipTrack, type ClipData } from '../src/engine/rig/clip'
import { emptyArmPose, Arm } from '../src/engine/rig/arm'
import { makeGrip } from '../src/engine/rig/solved'
import { ArmWarp } from '../src/engine/rig/warp'
import { keyed, turnTrunk } from '../src/engine/rig/trunk'
import { STROKES } from '../src/strokes'

const id = process.argv[2] ?? 'forehand'
const arg = (k: string) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : undefined }
const clip = JSON.parse(readFileSync(`public/motion/${id}.json`, 'utf8')) as ClipData
const stroke = STROKES.find((s) => s.id === id)!
const rig = new Rig()
const track = new ClipTrack(clip, rig)
const grip = makeGrip(rig, stroke.grips[0]?.id ?? 'semi-western')
const arm = new Arm(rig)
const useWarp = process.argv.includes('--warp')
const base = (t: number) => {
  track.apply(rig, t)
  if (useWarp && stroke.trunkYaw?.length) turnTrunk(rig, keyed(stroke.trunkYaw, t - clip.events.contact))
}
const warp = useWarp && stroke.armKeys ? new ArmWarp(rig, base, clip.events.contact, grip, stroke.armKeys) : null
const D = 180 / Math.PI
const c = clip.events.contact
const times = arg('--times')?.split(',').map(Number) ?? Array.from({ length: Math.floor(track.duration / 0.05) + 1 }, (_, i) => i * 0.05)
const P = (n: string) => rig.pos[rig.find(n)]
const yaw = (l: Vector3, r: Vector3) => (Math.atan2(r.z - l.z, r.x - l.x) * 180) / Math.PI
const f = (x: number, w = 5, d = 0) => x.toFixed(d).padStart(w)
const torso = (() => { rig.resetLocal(); rig.pose(null); return P('Spine2').distanceTo(P('Hips')) })()
console.log(`events ${JSON.stringify(clip.events)}  upper arm ${arm.l1.toFixed(3)} forearm ${arm.l2.toFixed(3)}`)
console.log('   t   t-c | hips  sh | hand chest (x    y    z) | hand court (x    y    z) | elbow court (x    y    z) | flex swiv pron  ext  dev | racket dir court (x    y    z)  normal (x    y    z)')
const p = emptyArmPose()
let worst = 0
for (const t of times) {
  base(t)
  if (warp) warp.apply(rig, t)
  arm.measure(rig, p)
  if (process.argv.includes('--check')) {
    const before = rig.quat[rig.find('RightHand')].clone(), wBefore = P('RightHand').clone()
    arm.apply(rig, { ...p, hand: p.hand.clone() })
    const err = Math.max(before.angleTo(rig.quat[rig.find('RightHand')]) * D, wBefore.distanceTo(P('RightHand')) * 1000)
    worst = Math.max(worst, err); if (err > 0.5) console.log(`  round trip error at ${t.toFixed(3)}: ${err.toFixed(2)}`)
  }
  const hq = rig.quat[rig.find('RightHand')]
  const rq = hq.clone().multiply(grip.q)
  const dir = new Vector3(0, 1, 0).applyQuaternion(rq), nrm = new Vector3(0, 0, 1).applyQuaternion(rq)
  const hc = P('RightHand').clone().sub(P('RightArm')), ec = P('RightForeArm').clone().sub(P('RightArm'))
  console.log(`${f(t, 5, 3)} ${f(t - c, 6, 3)} | ${f(yaw(P('LeftUpLeg'), P('RightUpLeg')), 4)} ${f(yaw(P('LeftArm'), P('RightArm')), 4)} | ${f(p.hand.x, 5, 2)} ${f(p.hand.y, 5, 2)} ${f(p.hand.z, 5, 2)} | ${f(hc.x, 5, 2)} ${f(hc.y, 5, 2)} ${f(-hc.z, 5, 2)} | ${f(ec.x, 5, 2)} ${f(ec.y, 5, 2)} ${f(-ec.z, 5, 2)} | ${f(p.flex * D)} ${f(p.swivel * D)} ${f(p.pron * D)} ${f(p.ext * D)} ${f(p.dev * D)} | ${f(dir.x, 5, 2)} ${f(dir.y, 5, 2)} ${f(-dir.z, 5, 2)}  ${f(nrm.x, 5, 2)} ${f(nrm.y, 5, 2)} ${f(-nrm.z, 5, 2)}`)
}
if (process.argv.includes('--check')) console.log(`round trip worst error: ${worst.toFixed(3)} (deg or mm)`)
console.log(`torso (hips→Spine2) ${torso.toFixed(3)} m`)
void Quaternion
