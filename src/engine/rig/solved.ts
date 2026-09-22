import { Matrix4, Quaternion, Vector3 } from 'three'
import { RACKET, type Solved } from '../solver'
import type { Rig } from './rig'

/**
 * Where the racket sits in the right hand, derived once from the rest
 * skeleton's knuckles so it follows the real hand of the model:
 * the handle runs across the palm from the heel of the hand toward the index
 * knuckle, tilted ~20° up from perpendicular to the forearm (a neutral wrist
 * with a racket), and the strings are parallel to the palm for an eastern
 * forehand grip. Other grips turn the racket about its handle by whole bevels
 * (45° each): continental −1, semi-western +1, western +2.
 */
export interface Grip {
  /** racket frame (y = handle → tip, z = string face) relative to the hand bone */
  q: Quaternion
  /** grip centre in the hand bone's local frame */
  p: Vector3
}

export const BEVEL_OFFSET: Record<string, number> = {
  continental: -1,
  'eastern-forehand': 0,
  eastern: 0,
  'semi-western': 1,
  western: 2,
  'eastern-backhand': -2,
  'extreme-eastern-backhand': -3,
  'two-handed-backhand': -1,
}

export function makeGrip(rig: Rig, gripId: string): Grip {
  rig.resetLocal()
  rig.pose(null)
  const P = (n: string) => rig.pos[rig.find(n)]
  const hand = P('RightHand')
  const f = P('RightHandMiddle1').clone().sub(hand)
  const knuckleLen = f.length()
  f.normalize()
  const across = P('RightHandIndex1').clone().sub(P('RightHandPinky1')).normalize()
  // palm normal: the side of the hand that faces the body in the rest pose
  let n = f.clone().cross(across).normalize()
  const toBody = P('Hips').clone().setY(hand.y).sub(hand)
  if (n.dot(toBody) < 0) n.negate()
  const dir = across.clone().addScaledVector(f, -0.36).normalize()
  n.addScaledVector(dir, -n.dot(dir)).normalize()
  // turn the face about the handle by the grip's bevel offset
  const bevels = BEVEL_OFFSET[gripId] ?? 0
  n = n.applyAxisAngle(dir, (bevels * Math.PI) / 4)
  const x = dir.clone().cross(n)
  const racketWorld = new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(x, dir, n))
  const handQ = rig.quat[rig.find('RightHand')]
  const inv = handQ.clone().invert()
  const centre = hand.clone().addScaledVector(f, knuckleLen * 0.55).addScaledVector(n, 0.02)
  return {
    q: inv.clone().multiply(racketWorld),
    p: centre.sub(hand).applyQuaternion(inv),
  }
}

/**
 * Calibrates the grip so the racket has orientation (`dir`, `normal`, author frame) at the rig's
 * current pose, averaging the hand orientation over the supplied poses to damp marker noise.
 */
export function calibrateGrip(grip: Grip, handQs: Quaternion[], dirAuthor: [number, number, number], normalAuthor: [number, number, number]): Grip {
  const d = new Vector3(dirAuthor[0], dirAuthor[1], -dirAuthor[2]).normalize()
  const n = new Vector3(normalAuthor[0], normalAuthor[1], -normalAuthor[2])
  n.addScaledVector(d, -n.dot(d)).normalize()
  const want = new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(d.clone().cross(n), d, n))
  // average hand orientation (quaternions are close, so a normalised sign-aligned sum is enough)
  const avg = new Quaternion(0, 0, 0, 0)
  for (const q of handQs) {
    const s = avg.x * q.x + avg.y * q.y + avg.z * q.z + avg.w * q.w < 0 ? -1 : 1
    avg.set(avg.x + s * q.x, avg.y + s * q.y, avg.z + s * q.z, avg.w + s * q.w)
  }
  avg.normalize()
  return { q: avg.invert().multiply(want), p: grip.p.clone() }
}

const v1 = new Vector3()
const v2 = new Vector3()

/** Fills the studio's `Solved` view (joints, body orientations, racket) from a posed rig. */
export function rigToSolved(rig: Rig, grip: Grip, out: Solved): Solved {
  const at = (n: string) => rig.find(n)
  const P = (n: string) => rig.pos[at(n)]
  out.pelvis.copy(P('Hips'))
  out.abdomen.copy(P('Spine'))
  out.chestBase.copy(P('Spine1'))
  out.chest.copy(P('Spine2'))
  out.neck.copy(P('Neck'))
  rig.delta(at('Hips'), out.pelvisQ)
  rig.delta(at('Spine1'), out.midQ)
  rig.delta(at('Spine2'), out.chestQ)
  rig.delta(at('Head'), out.headQ)
  // the Head bone sits at the base of the skull; the head's centre is ~8 cm above it
  out.head.copy(P('Head')).add(v1.set(0, 0.08, 0.01).applyQuaternion(out.headQ))
  out.shoulderL.copy(P('LeftArm'))
  out.shoulderR.copy(P('RightArm'))
  out.elbowL.copy(P('LeftForeArm'))
  out.elbowR.copy(P('RightForeArm'))
  out.wristL.copy(P('LeftHand'))
  out.hipL.copy(P('LeftUpLeg'))
  out.hipR.copy(P('RightUpLeg'))
  out.kneeL.copy(P('LeftLeg'))
  out.kneeR.copy(P('RightLeg'))
  out.ankleL.copy(P('LeftFoot'))
  out.ankleR.copy(P('RightFoot'))
  rig.delta(at('LeftFoot'), out.footQL)
  rig.delta(at('RightFoot'), out.footQR)

  // racket: rigidly in the right hand through the grip
  const hq = rig.quat[at('RightHand')]
  out.racketQ.copy(hq).multiply(grip.q)
  out.wristR.copy(grip.p).applyQuaternion(hq).add(P('RightHand'))
  out.racketDir.set(0, 1, 0).applyQuaternion(out.racketQ)
  out.racketNormal.set(0, 0, 1).applyQuaternion(out.racketQ)
  out.racketHead.copy(out.wristR).addScaledVector(out.racketDir, RACKET.sweet)
  out.racketTip.copy(out.wristR).addScaledVector(out.racketDir, RACKET.length - RACKET.butt)
  out.handQR.copy(out.racketQ)
  rig.delta(at('LeftHand'), out.handQL)

  // elbow bend directions, for anything that still reads them
  for (const [s, e, w, bend] of [
    [out.shoulderR, out.elbowR, out.wristR, out.bendR],
    [out.shoulderL, out.elbowL, out.wristL, out.bendL],
  ] as const) {
    const axis = v1.copy(w).sub(s).normalize()
    bend.copy(e).sub(s).addScaledVector(axis, -v2.copy(e).sub(s).dot(axis))
    if (bend.lengthSq() > 1e-8) bend.normalize()
  }

  // weight: where the pelvis sits between the feet
  const lf = out.ankleL
  const rf = out.ankleR
  const dx = rf.x - lf.x
  const dz = rf.z - lf.z
  const len2 = dx * dx + dz * dz
  out.weight = len2 > 1e-4 ? Math.min(Math.max((((out.pelvis.x - lf.x) * dx + (out.pelvis.z - lf.z) * dz) / len2) * 2 - 1, -1), 1) : 0
  return out
}
