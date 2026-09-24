import { Quaternion, Vector3 } from 'three'
import { emptyArmPose, type Arm, type ArmPose } from './arm'
import type { Rig } from './rig'
import { Curve } from './warp'

const DEG = Math.PI / 180

/**
 * Keeps an arm out of the trunk. The capture's arms, and the arm warp on top of them, can pass through the chest
 * (a racket arm folded across the body, a free arm swinging in). The trunk is an elliptical cylinder in its own frame
 * (Rocketbox: ~0.14 m half-width, ~0.10 m half-depth, from above the hips to below the neck); the fix turns the elbow
 * around the shoulder–wrist line and, when the hand itself is inside, pushes the hand out, keeping the hand's (and
 * racket's) orientation. The corrections are baked over the whole stroke and smoothed, so they fade in and out
 * instead of popping.
 */
export const TRUNK = { a: 0.14, b: 0.1 }
const R = { upperArm: 0.05, foreArm: 0.042, hand: 0.05 }
const SMOOTH = 0.035 // s
const HZ = 120

const v1 = new Vector3()
const v2 = new Vector3()
const v3 = new Vector3()

interface Frame {
  origin: Vector3
  axis: Vector3
  lat: Vector3
  dep: Vector3
  len: number
}

function trunkFrame(rig: Rig, out: Frame) {
  const P = (n: string) => rig.pos[rig.find(n)]
  out.origin.copy(P('Hips'))
  out.axis.copy(P('Neck')).sub(out.origin)
  out.len = out.axis.length()
  out.axis.divideScalar(out.len)
  out.lat.copy(P('RightArm')).sub(P('LeftArm'))
  out.lat.addScaledVector(out.axis, -out.lat.dot(out.axis)).normalize()
  out.dep.copy(out.axis).cross(out.lat)
  return out
}

/** penetration depth (m) of a sphere of radius r at p into the trunk, and the outward direction */
function depthAt(f: Frame, p: Vector3, r: number, outward?: Vector3) {
  const q = v1.copy(p).sub(f.origin)
  const h = q.dot(f.axis)
  if (h < 0.06 || h > f.len - 0.05) return 0
  const x = q.dot(f.lat), z = q.dot(f.dep)
  const ang = Math.atan2(z, x)
  const rad = (TRUNK.a * TRUNK.b) / Math.hypot(TRUNK.b * Math.cos(ang), TRUNK.a * Math.sin(ang))
  const d = rad + r - Math.hypot(x, z)
  if (outward && d > 0) outward.copy(f.lat).multiplyScalar(Math.cos(ang)).addScaledVector(f.dep, Math.sin(ang)).normalize()
  return Math.max(d, 0)
}

export class ArmClearance {
  private swivel: Curve | null = null
  private push: [Curve, Curve, Curve] | null = null
  private frame: Frame = { origin: new Vector3(), axis: new Vector3(), lat: new Vector3(), dep: new Vector3(), len: 1 }
  private pose: ArmPose = emptyArmPose()
  private hand = new Quaternion()

  private readonly arm: Arm

  constructor(arm: Arm) {
    this.arm = arm
  }

  /** worst penetration of the arm (upper arm below the shoulder, forearm, hand) into the trunk */
  private depth(rig: Rig, outward?: Vector3) {
    const f = trunkFrame(rig, this.frame)
    const P = (n: string) => rig.pos[rig.find(n)]
    const side = this.arm.side
    const S = P(side + 'Arm'), E = P(side + 'ForeArm'), W = P(side + 'Hand')
    let worst = 0
    for (let i = 5; i <= 10; i++) worst = Math.max(worst, depthAt(f, v2.copy(S).lerp(E, i / 10), R.upperArm))
    for (let i = 0; i <= 8; i++) worst = Math.max(worst, depthAt(f, v2.copy(E).lerp(W, i / 8), R.foreArm))
    const hand = v3.copy(P(side + 'HandMiddle1')).sub(W).multiplyScalar(0.6).add(W)
    const dh = depthAt(f, hand, R.hand, outward)
    return { worst: Math.max(worst, dh), hand: dh }
  }

  /**
   * Bakes the corrections over [0, duration]; `pose(t)` must pose the rig up to (not including) this clearance.
   * Where `pinned(t)` holds (the hand is on the racket) only the elbow turns; the hand stays where it is.
   */
  bake(rig: Rig, duration: number, pose: (t: number) => void, pinned?: (t: number) => boolean) {
    const n = Math.floor(duration * HZ) + 1
    const ts: number[] = [], sw: number[] = [], px: number[] = [], py: number[] = [], pz: number[] = []
    const out = new Vector3()
    let any = false
    for (let i = 0; i < n; i++) {
      const t = Math.min(i / HZ, duration)
      ts.push(t)
      pose(t)
      const d0 = this.depth(rig)
      if (d0.worst <= 0) {
        sw.push(0); px.push(0); py.push(0); pz.push(0)
        continue
      }
      any = true
      const p = this.arm.measure(rig, this.pose)
      this.hand.copy(this.arm.handQ(rig))
      const base = { hand: p.hand.clone(), swivel: p.swivel }
      // elbow first: the swivel (±100°, preferring small turns) that clears the arm best
      let best = 0, cost = Infinity
      const tryAt = (o: number) => {
        p.hand.copy(base.hand)
        p.swivel = base.swivel + o
        this.arm.apply(rig, p, this.hand)
        const c = this.depth(rig).worst + 0.02 * o * o
        if (c < cost) { cost = c; best = o }
      }
      for (let o = -100; o <= 100; o += 10) tryAt(o * DEG)
      const b0 = best
      for (let o = -8; o <= 8; o += 2) tryAt(b0 + o * DEG)
      p.hand.copy(base.hand)
      p.swivel = base.swivel + best
      this.arm.apply(rig, p, this.hand)
      // then the hand, straight out of the trunk, if it is still inside
      const dh = this.depth(rig, out).hand
      sw.push(best)
      if (dh > 0 && !pinned?.(t)) {
        // outward is a world direction; the arm works in the chest frame relative to the shoulder
        const chest = this.arm.chestQ(rig, new Quaternion()).invert()
        const o = out.clone().multiplyScalar(dh + 0.005).applyQuaternion(chest)
        px.push(o.x); py.push(o.y); pz.push(-o.z)
      } else {
        px.push(0); py.push(0); pz.push(0)
      }
    }
    if (!any) return
    const smooth = (a: number[]) => {
      const r = Math.ceil(3 * SMOOTH * HZ)
      return a.map((_, i) => {
        let s = 0, w = 0, peak = 0
        for (let j = Math.max(0, i - r); j <= Math.min(n - 1, i + r); j++) {
          const g = Math.exp(-(((j - i) / HZ) ** 2) / (2 * SMOOTH * SMOOTH))
          s += g * a[j]
          w += g
          if (Math.abs(a[j]) > Math.abs(peak) && Math.abs(j - i) <= r / 3) peak = a[j]
        }
        // smooth, but never undercut the correction the neighbourhood needs
        const m = s / w
        return Math.abs(peak) > Math.abs(m) && Math.sign(peak) === Math.sign(m) ? m + (peak - m) * 0.6 : m
      })
    }
    this.swivel = new Curve(ts, smooth(sw))
    this.push = [new Curve(ts, smooth(px)), new Curve(ts, smooth(py)), new Curve(ts, smooth(pz))]
  }

  /**
   * Applies the baked correction at clip time `t` (the rig posed up to this point); `push` scales the hand's part
   * (0 while the hand holds the racket, so only the elbow turns and the grip stays).
   */
  apply(rig: Rig, t: number, push = 1) {
    if (!this.swivel || !this.push) return
    const o = this.swivel.at(t)
    const px = this.push[0].at(t) * push, py = this.push[1].at(t) * push, pz = this.push[2].at(t) * push
    if (Math.abs(o) < 1e-4 && Math.abs(px) + Math.abs(py) + Math.abs(pz) < 1e-5) return
    const p = this.arm.measure(rig, this.pose)
    this.hand.copy(this.arm.handQ(rig))
    p.swivel += o
    p.hand.x += px
    p.hand.y += py
    p.hand.z += pz
    this.arm.apply(rig, p, this.hand)
  }
}
