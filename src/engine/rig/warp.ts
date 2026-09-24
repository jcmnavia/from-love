import { Matrix4, Quaternion, Vector3 } from 'three'
import type { ArmKey, V3 } from '../types'
import { emptyArmPose, Arm, type ArmPose, type Side } from './arm'
import type { Rig } from './rig'
import type { Grip } from './solved'

const DEG = Math.PI / 180

/** Cubic Hermite through (t, v) keys with limited Bessel tangents (no overshoot on monotone runs); held at the ends. */
export class Curve {
  private t: number[]
  private v: number[]
  private m: number[]

  constructor(t: number[], v: number[]) {
    this.t = t
    this.v = v
    const n = t.length
    this.m = t.map((_, i) => {
      if (n < 2) return 0
      if (i === 0 || i === n - 1) return 0
      const h0 = t[i] - t[i - 1], h1 = t[i + 1] - t[i]
      const d0 = (v[i] - v[i - 1]) / h0, d1 = (v[i + 1] - v[i]) / h1
      let m = (h1 * d0 + h0 * d1) / (h0 + h1)
      if (d0 * d1 <= 0) m = 0
      else {
        const lim = 3 * Math.min(Math.abs(d0), Math.abs(d1))
        if (Math.abs(m) > lim) m = Math.sign(m) * lim
      }
      return m
    })
  }

  get empty() {
    return this.t.length === 0
  }

  at(x: number) {
    const { t, v, m } = this
    const n = t.length
    if (!n) return 0
    if (x <= t[0]) return v[0]
    if (x >= t[n - 1]) return v[n - 1]
    let lo = 0, hi = n - 1
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1
      if (t[mid] <= x) lo = mid
      else hi = mid
    }
    const i = lo
    const h = t[i + 1] - t[i]
    const s = (x - t[i]) / h
    const s2 = s * s, s3 = s2 * s
    return (2 * s3 - 3 * s2 + 1) * v[i] + (s3 - 2 * s2 + s) * h * m[i] + (-2 * s3 + 3 * s2) * v[i + 1] + (s3 - s2) * h * m[i + 1]
  }
}

/** racket orientation (court/author frame) → the hand orientation that holds it with `grip` */
export function handForRacket(dir: V3, normal: V3, grip: Grip, out: Quaternion) {
  const d = new Vector3(dir[0], dir[1], -dir[2]).normalize()
  const n = new Vector3(normal[0], normal[1], -normal[2])
  n.addScaledVector(d, -n.dot(d)).normalize()
  out.setFromRotationMatrix(new Matrix4().makeBasis(d.clone().cross(n), d, n))
  return out.multiply(grip.q.clone().invert())
}

/**
 * Warps a clip's right arm through a pro's arm keys (motion warping: Witkin & Popović 1995).
 * The hand position and elbow swivel keep the capture's motion plus a smooth offset that lands exactly
 * on each key; the wrist and forearm follow interpolated joint angles, with racket keys turned into
 * the angles that reach them at that instant.
 */
export class ArmWarp {
  readonly arm: Arm
  private dx: Curve
  private dy: Curve
  private dz: Curve
  private dSwivel: Curve
  private pron: Curve
  private ext: Curve
  private dev: Curve
  private pose: ArmPose = emptyArmPose()
  private base: ArmPose = emptyArmPose()
  private baseSwivel: Curve | null = null

  /**
   * `base` poses the rig at clip time `t` with everything but the arm warp (the clip, trunk corrections);
   * `contact` is the clip's contact time the keys are relative to.
   */
  constructor(rig: Rig, base: (t: number) => void, contact: number, grip: Grip | null, keys: ArmKey[], side: Side = 'Right', duration = 0) {
    this.arm = new Arm(rig, side)
    const at = (k: ArmKey) => contact + k.t
    const sorted = [...keys].sort((a, b) => a.t - b.t)
    if (duration > 0) this.baseSwivel = this.smoothSwivel(rig, base, duration)
    const measured = (t: number) => {
      base(t)
      const m = this.arm.measure(rig, emptyArmPose())
      if (this.baseSwivel) m.swivel = this.baseSwivel.at(t)
      return m
    }
    const chestAt = () => this.arm.chestQ(rig, new Quaternion())
    /** a key's hand/elbow vector in the chest frame of the rig as posed now */
    const inChest = (k: ArmKey, v: V3) => {
      if (k.frame === 'chest') return new Vector3(...v)
      const c = new Vector3(v[0], v[1], -v[2]).applyQuaternion(chestAt().invert())
      c.z = -c.z
      return c
    }
    const hk = sorted.filter((k) => k.hand || k.handShift)
    const hOff = hk.map((k) => {
      const m = measured(at(k))
      if (k.hand === 'clip') return [0, 0, 0]
      if (k.handShift) {
        // a direction in the court frame, turned into the chest frame (no shoulder offset)
        const d = new Vector3(k.handShift[0], k.handShift[1], -k.handShift[2]).applyQuaternion(chestAt().invert())
        return [d.x, d.y, -d.z]
      }
      const c = inChest(k, k.hand!)
      return [c.x - m.hand.x, c.y - m.hand.y, c.z - m.hand.z]
    })
    const ht = hk.map(at)
    this.dx = new Curve(ht, hOff.map((o) => o[0]))
    this.dy = new Curve(ht, hOff.map((o) => o[1]))
    this.dz = new Curve(ht, hOff.map((o) => o[2]))
    // 'clip' hands pin the elbow to the capture too
    const sk = sorted.filter((k) => k.swivel !== undefined || k.elbow || k.hand === 'clip')
    this.dSwivel = new Curve(
      sk.map(at),
      sk.map((k) => {
        if (k.hand === 'clip' && k.swivel === undefined && !k.elbow) return 0
        const t = at(k)
        const m = measured(t)
        let want = (k.swivel ?? 0) * DEG
        if (k.elbow) {
          // the swivel that points the elbow at the key's elbow, around the (warped) shoulder→wrist line
          const hand = new Vector3(m.hand.x + this.dx.at(t), m.hand.y + this.dy.at(t), m.hand.z + this.dz.at(t))
          want = this.arm.swivelFor(rig, hand, inChest(k, k.elbow))
        }
        let d = want - m.swivel
        while (d > Math.PI) d -= 2 * Math.PI
        while (d < -Math.PI) d += 2 * Math.PI
        return d
      }),
    )
    // wrist: explicit angles, or the angles that reach a racket orientation with the warped arm at that time
    // racket keys need the racket hand's grip; the free hand only takes explicit wrist angles
    const wk = sorted.filter((k) => k.wrist || (k.racket && grip))
    let prev: { pron: number; ext: number; dev: number; w?: number } | null = null
    let prevT = -Infinity
    // where a key leaves the elbow free, the solver may turn it (swivel) so the wrist stays natural
    const pinned = new Set(sk.map(at))
    const extraSwivel: [number, number][] = []
    const angles = wk.map((k) => {
      const free = k.racket && !k.wrist && !pinned.has(at(k))
      // continuity: a wrist can turn ~600°/s in a relaxed preparation, so nearby keys must stay close
      if (prev) prev.w = Math.min(0.004 / Math.max(at(k) - prevT, 0.01), 0.08)
      prevT = at(k)
      const r = this.keyAngles(k, rig, base, at(k), grip, prev, free)
      if (r.swivel !== undefined) extraSwivel.push([at(k), this.dSwivel.at(at(k)) + r.swivel])
      prev = { pron: r.angles[0], ext: r.angles[1], dev: r.angles[2] }
      return r.angles
    })
    if (extraSwivel.length) {
      const pts = new Map<number, number>()
      for (const k of sk) pts.set(at(k), this.dSwivel.at(at(k)))
      for (const [t, v] of extraSwivel) if (!pts.has(t)) pts.set(t, v)
      const ts = [...pts.keys()].sort((a, b) => a - b)
      this.dSwivel = new Curve(ts, ts.map((t) => pts.get(t)!))
    }
    const wt = wk.map(at)
    this.pron = new Curve(wt, angles.map((a) => a[0]))
    this.ext = new Curve(wt, angles.map((a) => a[1]))
    this.dev = new Curve(wt, angles.map((a) => a[2]))
  }

  /** a key's wrist angles: given outright, or the reachable angles closest to its racket orientation */
  private keyAngles(
    k: ArmKey,
    rig: Rig,
    base: (t: number) => void,
    t: number,
    grip: Grip | null,
    near: { pron: number; ext: number; dev: number; w?: number } | null,
    freeElbow: boolean | undefined,
  ): { angles: V3; swivel?: number } {
    if (k.wrist) return { angles: k.wrist.map((a) => a * DEG) as V3 }
    base(t)
    const p = this.warped(rig, t, false)
    // court (author) or chest frame → world
    const chest = k.frame === 'chest' ? this.arm.chestQ(rig, new Quaternion()) : null
    const world = (v: V3) => {
      const w = new Vector3(v[0], v[1], -v[2])
      return chest ? w.applyQuaternion(chest) : w
    }
    const dir = world(k.racket!.dir).normalize()
    const nk = k.racket!.normal
    const normal = nk ? world(nk).addScaledVector(dir, -world(nk).dot(dir)).normalize() : null
    const aim = { dir, normal, grip: grip!, near }
    if (!freeElbow) {
      this.arm.apply(rig, p, aim, true)
      return { angles: [p.pron, p.ext, p.dev] }
    }
    // turn the elbow around the shoulder–wrist line to find the most natural wrist for this racket, staying near
    // the capture's own elbow (`off` is how far the swivel keys already turn it here)
    const s0 = p.swivel
    const off = this.dSwivel.at(t)
    let best = 0, cost = Infinity
    const tryAt = (d: number) => {
      p.swivel = s0 + d
      this.arm.apply(rig, p, aim, true)
      const c = this.arm.aimCost + 0.08 * (off + d) ** 2
      if (c < cost) { cost = c; best = d }
    }
    for (let o = -90; o <= 90; o += 10) tryAt(o * DEG - off)
    const b0 = best
    for (let d = -8; d <= 8; d += 2) tryAt(b0 + d * DEG)
    p.swivel = s0 + best
    this.arm.apply(rig, p, aim, true)
    return { angles: [p.pron, p.ext, p.dev], swivel: best }
  }

  /**
   * The capture's elbow swivel over the clip, unwrapped and smoothed. The swivel is only well defined while
   * the elbow is bent: with a nearly straight arm it jumps between the bone's hinge and the geometric bend, and
   * following it frame by frame spins the forearm (and the racket) through a straight-arm contact. Frames are
   * weighted by how bent the elbow is, so straight-arm moments inherit the swivel from either side.
   */
  private smoothSwivel(rig: Rig, base: (t: number) => void, duration: number) {
    const HZ = 120, SIGMA = 0.025
    const n = Math.floor(duration * HZ) + 1
    const ts: number[] = [], sw: number[] = [], w: number[] = []
    const m = emptyArmPose()
    for (let i = 0; i < n; i++) {
      const t = Math.min(i / HZ, duration)
      base(t)
      this.arm.measure(rig, m)
      let v = m.swivel
      if (i > 0) {
        while (v - sw[i - 1] > Math.PI) v -= 2 * Math.PI
        while (v - sw[i - 1] < -Math.PI) v += 2 * Math.PI
      }
      ts.push(t)
      sw.push(v)
      w.push(Math.min(Math.max((m.flex - 12 * DEG) / (25 * DEG), 0), 1) ** 2 + 1e-3)
    }
    const r = Math.ceil(3 * SIGMA * HZ)
    const out = sw.map((_, i) => {
      let a = 0, b = 0
      for (let j = Math.max(0, i - r); j <= Math.min(n - 1, i + r); j++) {
        const g = Math.exp(-(((j - i) / HZ) ** 2) / (2 * SIGMA * SIGMA)) * w[j]
        a += g * sw[j]
        b += g
      }
      return a / b
    })
    return new Curve(ts, out)
  }

  /** the capture's arm at `t` (rig already posed by the clip) plus the hand and swivel offsets */
  private warped(rig: Rig, t: number, wrist: boolean) {
    const b = this.arm.measure(rig, this.base)
    const p = this.pose
    p.hand.set(b.hand.x + this.dx.at(t), b.hand.y + this.dy.at(t), b.hand.z + this.dz.at(t))
    p.swivel = (this.baseSwivel ? this.baseSwivel.at(t) : b.swivel) + this.dSwivel.at(t)
    p.pron = wrist && !this.pron.empty ? this.pron.at(t) : b.pron
    p.ext = wrist && !this.ext.empty ? this.ext.at(t) : b.ext
    p.dev = wrist && !this.dev.empty ? this.dev.at(t) : b.dev
    return p
  }

  /** warps the rig's right arm at clip time `t`; the rig must already be posed by the clip */
  apply(rig: Rig, t: number) {
    this.arm.apply(rig, this.warped(rig, t, true))
  }
}
