import { Matrix4, Quaternion, Vector3 } from 'three'
import type { Rig } from './rig'

/**
 * An anatomical model of one arm on the rig: the elbow is a hinge, the forearm
 * pronates about its own axis and the wrist flexes/extends and deviates. It reads those
 * angles off any posed rig and writes an arm back from them, so a mocap arm can be bent
 * toward a pro's positions without ever leaving the joints' real ranges.
 *
 * Conventions (all angles in radians):
 *  - chest frame: the Spine2 bone's orientation with author axes (x = player's right, y up, z forward)
 *  - hand: the wrist (Hand bone) relative to the shoulder (Arm bone), chest frame, metres
 *  - swivel: where the elbow points around the shoulder→wrist line; 0 = toward the chest's down
 *    direction, + = turning about that line (right-hand rule)
 *  - pron: forearm pronation, 0 = thumb up with the elbow flexed 90°, + = thumb turning in
 *  - ext: wrist extension (+ = back of the hand toward the forearm), dev: radial deviation (+ = toward the thumb)
 */
export interface ArmPose {
  hand: Vector3
  swivel: number
  flex: number
  pron: number
  ext: number
  dev: number
}

/** a racket orientation to reach (world directions; `normal` optional) with the hand's grip */
export interface RacketAim {
  dir: Vector3
  normal: Vector3 | null
  grip: { q: Quaternion }
  /** wrist angles to stay close to (the previous key's), so consecutive keys do not flip the forearm */
  near?: { pron: number; ext: number; dev: number } | null
}

export const emptyArmPose = (): ArmPose => ({ hand: new Vector3(), swivel: 0, flex: 0, pron: 0, ext: 0, dev: 0 })

const DEG = Math.PI / 180
/** anatomical limits, radians */
export const ARM_LIMITS = {
  ext: [-70 * DEG, 85 * DEG],
  dev: [-40 * DEG, 25 * DEG],
  pron: [-85 * DEG, 100 * DEG],
} as const

/** share of the pronation carried by the forearm bone (the rest twists the hand); spreads the skin twist */
const FOREARM_TWIST_SHARE = 0.5
const E1 = new Vector3(1, 0, 0)
const E2 = new Vector3(0, 1, 0)

const v1 = new Vector3()
const v2 = new Vector3()
const v3 = new Vector3()
const q1 = new Quaternion()
const q2 = new Quaternion()
const m1 = new Matrix4()

function basis(x: Vector3, y: Vector3, z: Vector3, out: Quaternion) {
  return out.setFromRotationMatrix(m1.makeBasis(x, y, z))
}

/** world ↔ chest frame (author axes) */
function toChest(chest: Quaternion, v: Vector3, out: Vector3) {
  out.copy(v).applyQuaternion(q2.copy(chest).invert())
  out.z = -out.z
  return out
}
function fromChest(chest: Quaternion, v: Vector3, out: Vector3) {
  return out.set(v.x, v.y, -v.z).applyQuaternion(chest)
}

export type Side = 'Left' | 'Right'

export class Arm {
  readonly side: Side
  readonly l1: number
  readonly l2: number
  private iChest: number
  private iArm: number
  private iFore: number
  private iHand: number
  private iIndex: number
  private iPinky: number
  /** bone rest orientation relative to its anatomical frame */
  private kArm = new Quaternion()
  private kFore = new Quaternion()
  /** hand orientation in the forearm's zero-pronation frame, at rest */
  private hRest = new Quaternion()
  private hRestInv = new Quaternion()
  /** pronation of the rest pose, and the rest's radial / palm axes in the forearm frame */
  private pRest = 0
  private rC = new Vector3()
  private pC = new Vector3()
  /** hinge axis in the upper arm's local frame (fallback when the elbow is straight) */
  private hingeLocal = new Vector3()
  /** +1 for the right arm, −1 for the left: pronation turns the thumb toward the body on either side */
  private sgn: number
  private chest = new Quaternion()
  private tmpA = new Quaternion()
  private tmpF = new Quaternion()
  private tmpH = new Quaternion()

  constructor(rig: Rig, side: Side = 'Right') {
    this.side = side
    this.sgn = side === 'Right' ? 1 : -1
    this.iChest = rig.find('Spine2')
    this.iArm = rig.find(side + 'Arm')
    this.iFore = rig.find(side + 'ForeArm')
    this.iHand = rig.find(side + 'Hand')
    this.iIndex = rig.find(side + 'HandIndex1')
    this.iPinky = rig.find(side + 'HandPinky1')
    rig.resetLocal()
    rig.pose(null)
    const S = rig.pos[this.iArm], E = rig.pos[this.iFore], W = rig.pos[this.iHand]
    this.l1 = S.distanceTo(E)
    this.l2 = E.distanceTo(W)
    const uA = E.clone().sub(S).normalize()
    const uF = W.clone().sub(E).normalize()
    // hinge: the rest pose's own elbow bend when it has one, else flexing toward the front (world −z at rest)
    const n = uA.clone().cross(uF)
    if (n.length() < 0.2 || n.normalize().dot(uA.clone().cross(new Vector3(0, 0, -1)).normalize()) < 0.5)
      n.copy(uA).cross(new Vector3(0, 0, -1)).normalize()
    this.hingeLocal.copy(n).applyQuaternion(rig.quat[this.iArm].clone().invert())
    const A = this.armBasis(uA, n, new Quaternion())
    this.kArm.copy(A).invert().multiply(rig.quat[this.iArm])
    const B = this.foreBasis(uF, n, new Quaternion())
    this.kFore.copy(B).invert().multiply(rig.quat[this.iFore])
    this.hRest.copy(B).invert().multiply(rig.quat[this.iHand])
    this.hRestInv.copy(this.hRest).invert()
    // rest pronation from the hand's radial axis (pinky → index knuckles)
    const neutral = n.clone().cross(uF).normalize()
    const r = rig.pos[this.iIndex].clone().sub(rig.pos[this.iPinky])
    r.addScaledVector(uF, -r.dot(uF)).normalize()
    // pronation turns the thumb toward the body: −n on the right (n points out), +n on the left
    this.pRest = Math.atan2(-this.sgn * r.dot(n), r.dot(neutral))
    // radial and palm axes of the rest hand, in canonical forearm coordinates (e1 = neutral, e2 = along the forearm)
    this.rC.copy(E1).applyAxisAngle(E2, -this.sgn * this.pRest)
    this.pC.copy(this.rC).cross(E2).multiplyScalar(this.sgn).normalize()
  }

  /** a world point relative to this arm's shoulder, in the chest frame (the `hand` convention) */
  fromShoulder(rig: Rig, world: Vector3, out: Vector3) {
    return toChest(this.chestQ(rig, this.chest), v1.copy(world).sub(rig.pos[this.iArm]), out)
  }

  /** the hand bone's world orientation on the posed rig */
  handQ(rig: Rig) {
    return rig.quat[this.iHand]
  }

  /**
   * The wrist angles, within the joint limits, that bring the racket closest to `aim` (direction first,
   * face second) for a forearm frame `B`: a coarse grid over pronation × extension × deviation refined twice,
   * with a light pull toward a relaxed wrist so equally good answers resolve to the natural one.
   */
  private aim(B: Quaternion, aim: RacketAim, pose: ArmPose) {
    const dirT = aim.dir, nT = aim.normal
    const gq = aim.grip.q
    const h = new Quaternion(), r = new Quaternion(), d = new Vector3(), nv = new Vector3()
    const cost = (pr: number, ex: number, dv: number) => {
      r.copy(B).multiply(this.compose(pr, ex, dv, h)).multiply(gq)
      const ed = Math.acos(Math.min(Math.max(d.set(0, 1, 0).applyQuaternion(r).dot(dirT), -1), 1))
      let c = ed * ed
      if (nT) {
        const en = Math.acos(Math.min(Math.max(nv.set(0, 0, 1).applyQuaternion(r).dot(nT), -1), 1))
        c += 0.5 * en * en
      }
      c += 0.03 * (ex * ex + dv * dv) + 0.01 * pr * pr
      const nr = aim.near
      if (nr) c += 0.05 * ((pr - nr.pron) ** 2 + 0.3 * (ex - nr.ext) ** 2 + 0.3 * (dv - nr.dev) ** 2)
      return c
    }
    const L = ARM_LIMITS
    let best = { pr: 0, ex: 0, dv: 0, c: Infinity }
    const scan = (pr0: number, pr1: number, ex0: number, ex1: number, dv0: number, dv1: number, n: number) => {
      for (let i = 0; i <= n; i++) {
        const pr = pr0 + ((pr1 - pr0) * i) / n
        for (let j = 0; j <= n; j++) {
          const ex = ex0 + ((ex1 - ex0) * j) / n
          for (let k = 0; k <= n; k++) {
            const dv = dv0 + ((dv1 - dv0) * k) / n
            const c = cost(pr, ex, dv)
            if (c < best.c) best = { pr, ex, dv, c }
          }
        }
      }
    }
    scan(L.pron[0], L.pron[1], L.ext[0], L.ext[1], L.dev[0], L.dev[1], 16)
    for (const span of [12 * DEG, 3 * DEG]) {
      const b = best
      const lim = (x: number, [lo, hi]: readonly [number, number]) => [Math.max(lo, x - span), Math.min(hi, x + span)] as const
      const [p0, p1] = lim(b.pr, L.pron), [e0, e1] = lim(b.ex, L.ext), [d0, d1] = lim(b.dv, L.dev)
      scan(p0, p1, e0, e1, d0, d1, 8)
    }
    pose.pron = best.pr
    pose.ext = best.ex
    pose.dev = best.dv
  }

  /** anatomical upper-arm frame: x = hinge axis, y = along the bone, z = x × y */
  private armBasis(uA: Vector3, n: Vector3, out: Quaternion) {
    return basis(n, uA, v3.copy(n).cross(uA), out)
  }

  /** forearm zero-pronation frame: x = neutral radial direction (n × uF), y = along the forearm, z = palm side */
  private foreBasis(uF: Vector3, n: Vector3, out: Quaternion) {
    const x = v1.copy(n).cross(uF).normalize()
    return basis(x, uF, v2.copy(x).cross(uF).normalize(), out)
  }

  /** chest orientation (world) of the posed rig */
  chestQ(rig: Rig, out: Quaternion) {
    return rig.delta(this.iChest, out)
  }

  /** Reads the arm's anatomical pose off a posed rig. */
  measure(rig: Rig, out: ArmPose): ArmPose {
    const S = rig.pos[this.iArm], E = rig.pos[this.iFore], W = rig.pos[this.iHand]
    const chest = this.chestQ(rig, this.chest)
    toChest(chest, v1.copy(W).sub(S), out.hand)
    const d = W.distanceTo(S)
    const u = new Vector3().copy(W).sub(S).divideScalar(d)
    const uA = new Vector3().copy(E).sub(S).normalize()
    const uF = new Vector3().copy(W).sub(E).normalize()
    out.flex = Math.acos(Math.min(Math.max(uA.dot(uF), -1), 1))
    // elbow direction off the shoulder→wrist line; the bone's hinge when the arm is straight
    const eGeo = uA.clone().addScaledVector(u, -uA.dot(u))
    const nBone = this.hingeLocal.clone().applyQuaternion(rig.quat[this.iArm])
    const eBone = u.clone().cross(nBone)
    eBone.addScaledVector(u, -eBone.dot(u)).normalize()
    const wGeo = Math.min(Math.max((out.flex - 10 * DEG) / (10 * DEG), 0), 1)
    const ePerp = eBone.multiplyScalar(1 - wGeo).addScaledVector(eGeo.normalize(), wGeo).normalize()
    out.swivel = this.swivelOf(chest, u, ePerp)
    // hinge the rest of the arm hangs on: the one the swivel implies
    const n = ePerp.clone().cross(u).normalize()
    n.addScaledVector(uF, -n.dot(uF)).normalize()
    const B = this.foreBasis(uF, n, q1)
    const hRel = q2.copy(B).invert().multiply(rig.quat[this.iHand])
    const { pron, ext, dev } = this.decompose(hRel)
    out.pron = pron
    out.ext = ext
    out.dev = dev
    return out
  }

  /** the swivel that points the elbow toward `elbow` for a wrist at `hand` (both chest frame, from the shoulder) */
  swivelFor(rig: Rig, hand: Vector3, elbow: Vector3) {
    const chest = this.chestQ(rig, this.chest)
    const u = fromChest(chest, hand, new Vector3()).normalize()
    const e = fromChest(chest, elbow, new Vector3())
    e.addScaledVector(u, -e.dot(u)).normalize()
    return this.swivelOf(chest, u, e)
  }

  private swivelRef(chest: Quaternion, u: Vector3) {
    const ref = fromChest(chest, v1.set(0, -1, -0.25), new Vector3())
    ref.addScaledVector(u, -ref.dot(u))
    if (ref.lengthSq() < 1e-4) ref.copy(fromChest(chest, v1.set(0, 0, -1), v2)).addScaledVector(u, -v2.dot(u))
    return ref.normalize()
  }

  private swivelOf(chest: Quaternion, u: Vector3, ePerp: Vector3) {
    const ref = this.swivelRef(chest, u)
    const side = v3.copy(u).cross(ref)
    return Math.atan2(ePerp.dot(side), ePerp.dot(ref))
  }

  /** hand orientation in the zero-pronation forearm frame → pronation, extension, deviation */
  private decompose(hRel: Quaternion) {
    // hRel = T(twist about e2) · S(swing) · hRest; (T·S)⁻¹ = S⁻¹·T⁻¹ is swing·twist form
    const q = q1.copy(hRel).multiply(this.hRestInv).invert()
    const tw = new Quaternion(0, q.y, 0, q.w)
    if (tw.lengthSq() < 1e-12) tw.set(0, 0, 0, 1)
    tw.normalize()
    const sw = q.clone().multiply(tw.clone().invert())
    const theta = -2 * Math.atan2(tw.y, tw.w) // T = tw⁻¹, rotation about e2 by theta
    const S = sw.invert()
    const d = v1.copy(E2).applyQuaternion(S)
    let pron = this.pRest - this.sgn * theta
    while (pron > Math.PI) pron -= 2 * Math.PI
    while (pron < -Math.PI) pron += 2 * Math.PI
    return {
      pron,
      ext: Math.atan2(-d.dot(this.pC), d.dot(E2)),
      dev: Math.atan2(d.dot(this.rC), d.dot(E2)),
    }
  }

  /** hand orientation in the zero-pronation forearm frame from anatomical angles */
  private compose(pron: number, ext: number, dev: number, out: Quaternion) {
    const d = v1.copy(E2).addScaledVector(this.rC, Math.tan(dev)).addScaledVector(this.pC, -Math.tan(ext)).normalize()
    const S = q2.setFromUnitVectors(E2, d)
    return out.setFromAxisAngle(E2, this.sgn * (this.pRest - pron)).multiply(S).multiply(this.hRest)
  }

  /**
   * Poses the arm from a target: the wrist at `hand` (chest frame, relative to the shoulder), the elbow
   * at `swivel`, and the hand at the given anatomical angles, or — when `handWorld` is given — as close
   * to that world orientation as the wrist's limits allow (the reached angles are written back to `pose`).
   * Re-poses the rig.
   */
  apply(rig: Rig, pose: ArmPose, handWorld?: Quaternion | RacketAim | null) {
    const S = rig.pos[this.iArm].clone()
    const chest = this.chestQ(rig, this.chest)
    const reach = this.l1 + this.l2
    const dv = fromChest(chest, pose.hand, new Vector3())
    let d = dv.length()
    const u = dv.clone().divideScalar(d || 1)
    // soft reach limit: approach full extension asymptotically instead of snapping straight
    const soft = reach * 0.985
    if (d > soft) d = soft + (reach * 0.999 - soft) * (1 - Math.exp(-(d - soft) / (reach * 0.999 - soft)))
    d = Math.max(d, Math.abs(this.l1 - this.l2) + 0.02)
    const W = S.clone().addScaledVector(u, d)
    const a = (this.l1 * this.l1 - this.l2 * this.l2 + d * d) / (2 * d)
    const h = Math.sqrt(Math.max(this.l1 * this.l1 - a * a, 0))
    const ref = this.swivelRef(chest, u)
    const side = u.clone().cross(ref)
    const ePerp = ref.multiplyScalar(Math.cos(pose.swivel)).addScaledVector(side, Math.sin(pose.swivel)).normalize()
    const E = S.clone().addScaledVector(u, a).addScaledVector(ePerp, h)
    const uA = E.clone().sub(S).normalize()
    const uF = W.clone().sub(E).normalize()
    const n = ePerp.clone().cross(u).normalize()
    const nA = n.clone().addScaledVector(uA, -n.dot(uA)).normalize()
    const nF = n.clone().addScaledVector(uF, -n.dot(uF)).normalize()
    pose.flex = Math.acos(Math.min(Math.max(uA.dot(uF), -1), 1))

    const A = this.armBasis(uA, nA, this.tmpA)
    const qArm = A.clone().multiply(this.kArm)
    const B = this.foreBasis(uF, nF, this.tmpF)
    if (handWorld instanceof Quaternion) {
      // an exact hand orientation: decompose, then the limits below clamp what the wrist cannot do
      const { pron, ext, dev } = this.decompose(q1.copy(B).invert().multiply(handWorld))
      pose.pron = pron
      pose.ext = ext
      pose.dev = dev
    } else if (handWorld) this.aim(B, handWorld, pose)
    const clamp = (x: number, [lo, hi]: readonly [number, number]) => Math.min(Math.max(x, lo), hi)
    pose.pron = clamp(pose.pron, ARM_LIMITS.pron)
    pose.ext = clamp(pose.ext, ARM_LIMITS.ext)
    pose.dev = clamp(pose.dev, ARM_LIMITS.dev)
    const qHand = B.clone().multiply(this.compose(pose.pron, pose.ext, pose.dev, this.tmpH))
    const qFore = B.clone()
      .multiply(q1.setFromAxisAngle(E2, this.sgn * (this.pRest - pose.pron) * FOREARM_TWIST_SHARE))
      .multiply(this.kFore)

    const parent = rig.quat[rig.parent[this.iArm]]
    rig.local[this.iArm].copy(parent).invert().multiply(qArm)
    rig.local[this.iFore].copy(qArm).invert().multiply(qFore)
    rig.local[this.iHand].copy(qFore).invert().multiply(qHand)
    rig.repose()
    return pose
  }
}
