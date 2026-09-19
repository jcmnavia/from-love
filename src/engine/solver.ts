import { Euler, Matrix4, Quaternion, Vector3 } from 'three'
import type { FootPose, Pose, V3 } from './types'

export const BODY = {
  hipHalf: 0.1,
  hipDrop: 0.06,
  thigh: 0.45,
  shin: 0.43,
  ankle: 0.08,
  waist: 0.13,
  spine: 0.13,
  chest: 0.3,
  shoulderHalf: 0.2,
  shoulderDrop: 0.035,
  neck: 0.09,
  headUp: 0.12,
  upperArm: 0.3,
  forearm: 0.27,
}

export const RACKET = {
  length: 0.685,
  /** distance from the hand to the butt cap */
  butt: 0.07,
  /** distance from the hand to the centre of the string bed */
  sweet: 0.46,
  gripPoint: 0.12,
  throatPoint: 0.27,
}

const DEG = Math.PI / 180

export interface Solved {
  pelvis: Vector3
  abdomen: Vector3
  chestBase: Vector3
  chest: Vector3
  neck: Vector3
  head: Vector3
  pelvisQ: Quaternion
  midQ: Quaternion
  chestQ: Quaternion
  headQ: Quaternion
  shoulderL: Vector3
  shoulderR: Vector3
  elbowL: Vector3
  elbowR: Vector3
  wristL: Vector3
  wristR: Vector3
  hipL: Vector3
  hipR: Vector3
  kneeL: Vector3
  kneeR: Vector3
  ankleL: Vector3
  ankleR: Vector3
  footQL: Quaternion
  footQR: Quaternion
  racketQ: Quaternion
  racketHead: Vector3
  racketTip: Vector3
  racketDir: Vector3
  racketNormal: Vector3
  /** hand orientations: y = wrist → fingers, z = palm normal (the racket hand follows the racket face) */
  handQR: Quaternion
  handQL: Quaternion
  /** -1 = all weight on the left foot, +1 = all on the right, derived from where the pelvis sits between the feet */
  weight: number
}

export function createSolved(): Solved {
  const v = () => new Vector3()
  const q = () => new Quaternion()
  return {
    pelvis: v(), abdomen: v(), chestBase: v(), chest: v(), neck: v(), head: v(),
    pelvisQ: q(), midQ: q(), chestQ: q(), headQ: q(),
    shoulderL: v(), shoulderR: v(), elbowL: v(), elbowR: v(), wristL: v(), wristR: v(),
    hipL: v(), hipR: v(), kneeL: v(), kneeR: v(), ankleL: v(), ankleR: v(),
    footQL: q(), footQR: q(), racketQ: q(),
    racketHead: v(), racketTip: v(), racketDir: v(), racketNormal: v(),
    handQR: q(), handQL: q(), weight: 0,
  }
}

/** how far the pelvis is nudged toward the loaded foot (metres, at full weight transfer) */
const WEIGHT_SHIFT = 0.025
/** share of the trunk twist taken by the abdomen; the chest takes the rest */
const ABDOMEN_TWIST = 0.4

/** author frame → world frame (the figure faces -Z in world space) */
export const toWorld = (a: V3, out: Vector3) => out.set(a[0], a[1], -a[2])

const euler = new Euler()
function bodyQuat(rot: V3, out: Quaternion) {
  euler.set(-rot[1] * DEG, -rot[0] * DEG, -rot[2] * DEG, 'YXZ')
  return out.setFromEuler(euler)
}

const tmpA = new Vector3()
const tmpB = new Vector3()
const tmpC = new Vector3()
const tmpD = new Vector3()
const tmpQ = new Quaternion()
const basis = new Matrix4()

/** Analytic two-bone IK. Writes the mid joint and the (reach-clamped) end joint. */
function ik2(root: Vector3, target: Vector3, l1: number, l2: number, pole: Vector3, mid: Vector3, end: Vector3) {
  const dir = tmpA.copy(target).sub(root)
  let d = dir.length()
  if (d < 1e-5) {
    dir.set(0, -1, 0)
    d = 1e-5
  }
  dir.divideScalar(d)
  // never lock the joint dead straight: a real elbow or knee keeps a few degrees of flexion at full reach
  const max = (l1 + l2) * 0.985
  const min = Math.abs(l1 - l2) + 0.02
  const dc = Math.min(Math.max(d, min), max)
  end.copy(root).addScaledVector(dir, dc)
  const a = (l1 * l1 - l2 * l2 + dc * dc) / (2 * dc)
  const h = Math.sqrt(Math.max(l1 * l1 - a * a, 0))
  const perp = tmpB.copy(pole).addScaledVector(dir, -pole.dot(dir))
  if (perp.lengthSq() < 1e-8) perp.set(0, 0, 1).addScaledVector(dir, -dir.z)
  perp.normalize()
  mid.copy(root).addScaledVector(dir, a).addScaledVector(perp, h)
}

function solveLeg(
  hip: Vector3,
  foot: FootPose,
  pelvisQ: Quaternion,
  side: number,
  knee: Vector3,
  ankle: Vector3,
  footQ: Quaternion,
) {
  const heel = foot.heel * DEG
  const yaw = foot.turn * DEG
  euler.set(-heel, -yaw, 0, 'YXZ')
  footQ.setFromEuler(euler)
  const target = tmpC.set(foot.p[0], foot.p[1] + BODY.ankle + Math.sin(heel) * 0.16, -foot.p[2])
  // heel lift pivots on the ball of the foot, so the ankle also travels forward a touch
  target.x += Math.sin(yaw) * (1 - Math.cos(heel)) * 0.12
  target.z -= Math.cos(yaw) * (1 - Math.cos(heel)) * 0.12
  const pole = tmpD.set(Math.sin(yaw), 0.15, -Math.cos(yaw)).multiplyScalar(0.65)
  pole.add(tmpA.set(side * 0.18, 0, -0.35).applyQuaternion(pelvisQ))
  ik2(hip, target, BODY.thigh, BODY.shin, pole, knee, ankle)
}

/**
 * Pose (targets in the author frame) → world-space joint positions and
 * orientations. `gaze` is a world-space point for the head to track.
 */
export function solve(pose: Pose, out: Solved, gaze?: Vector3 | null): Solved {
  bodyQuat(pose.pelvisRot, out.pelvisQ)
  bodyQuat(pose.chestRot, tmpQ)
  out.chestQ.copy(out.pelvisQ).multiply(tmpQ)
  // two-segment spine: the abdomen takes 40 % of the hip–shoulder twist, the chest the remaining 60 %
  out.midQ.copy(out.pelvisQ).slerp(out.chestQ, ABDOMEN_TWIST)

  toWorld(pose.pelvis, out.pelvis)
  // weight transfer: where the pelvis sits between the feet tells us which leg is loaded; a real
  // player's hips drift a little further over the loaded foot than the authored centre suggests
  {
    const lx = pose.lFoot.p[0]
    const lz = -pose.lFoot.p[2]
    const dx = pose.rFoot.p[0] - lx
    const dz = -pose.rFoot.p[2] - lz
    const len2 = dx * dx + dz * dz
    if (len2 > 1e-4) {
      const u = ((out.pelvis.x - lx) * dx + (out.pelvis.z - lz) * dz) / len2
      const w = Math.min(Math.max(u * 2 - 1, -1), 1)
      out.weight = w
      const inv = 1 / Math.sqrt(len2)
      out.pelvis.x += dx * inv * w * WEIGHT_SHIFT
      out.pelvis.z += dz * inv * w * WEIGHT_SHIFT
    } else {
      out.weight = 0
    }
  }
  out.abdomen.copy(out.pelvis).add(tmpA.set(0, BODY.waist, 0).applyQuaternion(out.pelvisQ))
  out.chestBase.copy(out.abdomen).add(tmpA.set(0, BODY.spine, 0).applyQuaternion(out.midQ))
  out.chest.copy(out.chestBase).add(tmpA.set(0, BODY.chest * 0.5, 0).applyQuaternion(out.chestQ))
  out.neck.copy(out.chestBase).add(tmpA.set(0, BODY.chest, 0).applyQuaternion(out.chestQ))

  out.hipL.copy(out.pelvis).add(tmpA.set(-BODY.hipHalf, -BODY.hipDrop, 0).applyQuaternion(out.pelvisQ))
  out.hipR.copy(out.pelvis).add(tmpA.set(BODY.hipHalf, -BODY.hipDrop, 0).applyQuaternion(out.pelvisQ))
  solveLeg(out.hipL, pose.lFoot, out.pelvisQ, -1, out.kneeL, out.ankleL, out.footQL)
  solveLeg(out.hipR, pose.rFoot, out.pelvisQ, 1, out.kneeR, out.ankleR, out.footQR)

  // racket orientation
  toWorld(pose.racketDir, out.racketDir).normalize()
  toWorld(pose.racketNormal, out.racketNormal)
  out.racketNormal.addScaledVector(out.racketDir, -out.racketNormal.dot(out.racketDir)).normalize()
  const rx = tmpA.copy(out.racketDir).cross(out.racketNormal)
  basis.makeBasis(rx, out.racketDir, out.racketNormal)
  out.racketQ.setFromRotationMatrix(basis)

  // right arm — the shoulder girdle gives a few centimetres toward the target
  const shoulderY = BODY.chest - BODY.shoulderDrop
  const rTarget = toWorld(pose.rHand, tmpC)
  out.shoulderR.copy(out.chestBase).add(tmpA.set(BODY.shoulderHalf, shoulderY, 0).applyQuaternion(out.chestQ))
  out.shoulderR.add(tmpA.copy(rTarget).sub(out.shoulderR).normalize().multiplyScalar(0.035))
  const rPole = toWorld(pose.rPole, tmpD)
  ik2(out.shoulderR, rTarget.clone(), BODY.upperArm, BODY.forearm, rPole.clone(), out.elbowR, out.wristR)

  out.racketHead.copy(out.wristR).addScaledVector(out.racketDir, RACKET.sweet)
  out.racketTip.copy(out.wristR).addScaledVector(out.racketDir, RACKET.length - RACKET.butt)

  // left arm — free, on the grip (two-hander) or cradling the throat
  const lTarget = toWorld(pose.lHand, tmpC)
  const attach = Math.min(Math.max(pose.lAttach, 0), 2)
  if (attach > 0.001) {
    const along = RACKET.gripPoint + (RACKET.throatPoint - RACKET.gripPoint) * Math.max(attach - 1, 0)
    const point = tmpD.copy(out.wristR).addScaledVector(out.racketDir, along)
    lTarget.lerp(point, Math.min(attach, 1))
  }
  out.shoulderL.copy(out.chestBase).add(tmpA.set(-BODY.shoulderHalf, shoulderY, 0).applyQuaternion(out.chestQ))
  out.shoulderL.add(tmpA.copy(lTarget).sub(out.shoulderL).normalize().multiplyScalar(0.035))
  const lPole = toWorld(pose.lPole, new Vector3())
  ik2(out.shoulderL, lTarget.clone(), BODY.upperArm, BODY.forearm, lPole, out.elbowL, out.wristL)

  // hands: the racket hand's palm follows the string face, knuckles across the handle; the free
  // hand hangs off its forearm with the palm turned toward the body
  {
    const fingers = tmpA.copy(out.racketDir).cross(out.racketNormal).negate() // across the handle
    basis.makeBasis(tmpB.copy(out.racketDir), fingers, out.racketNormal)
    out.handQR.setFromRotationMatrix(basis)
    if (attach > 0.5) {
      out.handQL.copy(out.handQR)
    } else {
      const fore = tmpA.copy(out.wristL).sub(out.elbowL).normalize()
      const up = tmpB.copy(out.wristL).sub(out.shoulderL).cross(fore)
      if (up.lengthSq() < 1e-6) up.set(0, 1, 0)
      const palm = tmpD.copy(out.chestBase).sub(out.wristL)
      palm.addScaledVector(fore, -palm.dot(fore))
      if (palm.lengthSq() < 1e-6) palm.copy(up)
      palm.normalize()
      const side = tmpB.copy(fore).cross(palm).normalize()
      basis.makeBasis(side, fore, palm)
      out.handQL.setFromRotationMatrix(basis)
    }
  }

  // head: track the gaze point, limited to what a neck can do relative to the chest
  out.head.copy(out.neck).add(tmpA.set(0, BODY.neck + BODY.headUp, 0).applyQuaternion(out.chestQ))
  if (gaze) {
    const local = tmpA.copy(gaze).sub(out.head).applyQuaternion(tmpQ.copy(out.chestQ).invert())
    let yaw = Math.atan2(-local.x, -local.z)
    let pitch = Math.atan2(local.y, Math.hypot(local.x, local.z))
    yaw = Math.min(Math.max(yaw, -80 * DEG), 80 * DEG)
    pitch = Math.min(Math.max(pitch, -45 * DEG), 60 * DEG)
    euler.set(pitch, yaw, 0, 'YXZ')
    out.headQ.copy(out.chestQ).multiply(tmpQ.setFromEuler(euler))
  } else {
    // keep the eyes level and toward the net even when the trunk coils
    euler.set(0, 0, 0, 'YXZ')
    out.headQ.copy(out.pelvisQ).slerp(out.chestQ, 0.35)
    out.headQ.slerp(tmpQ.setFromEuler(euler), 0.6)
  }
  return out
}

/** signed yaw (degrees, + = turned toward the right) of the line from a to b, measured from square-on */
export function lineTurn(left: Vector3, right: Vector3) {
  const dx = right.x - left.x
  const dz = right.z - left.z
  return Math.atan2(dz, dx) / DEG
}

export function kneeAngle(hip: Vector3, knee: Vector3, ankle: Vector3) {
  const a = tmpA.copy(hip).sub(knee).normalize()
  const b = tmpB.copy(ankle).sub(knee).normalize()
  return Math.acos(Math.min(Math.max(a.dot(b), -1), 1)) / DEG
}
