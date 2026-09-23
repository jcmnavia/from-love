import { Matrix4, Quaternion, Vector3 } from 'three'
import { Arm, emptyArmPose, type ArmPose } from './arm'
import type { Rig } from './rig'
import type { Grip } from './solved'

/** gap between the two grip centres along the handle: the hands touch */
const HAND_GAP = 0.095

/**
 * Where the racket sits in the left hand for a two-handed backhand: a left-handed eastern forehand grip,
 * the palm behind the handle and facing the same way as the backhand face (the racket's −z), built from
 * the rest skeleton's knuckles like the right hand's grip in solved.ts.
 */
export function makeLeftGrip(rig: Rig): Grip {
  rig.resetLocal()
  rig.pose(null)
  const P = (n: string) => rig.pos[rig.find(n)]
  const hand = P('LeftHand')
  const f = P('LeftHandMiddle1').clone().sub(hand)
  const knuckleLen = f.length()
  f.normalize()
  const across = P('LeftHandIndex1').clone().sub(P('LeftHandPinky1')).normalize()
  const n = f.clone().cross(across).normalize()
  const toBody = P('Hips').clone().setY(hand.y).sub(hand)
  if (n.dot(toBody) < 0) n.negate()
  const dir = across.clone().addScaledVector(f, 0.27).normalize()
  n.addScaledVector(dir, -n.dot(dir)).normalize()
  const z = n.clone().negate()
  const racketWorld = new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(dir.clone().cross(z), dir, z))
  const inv = rig.quat[rig.find('LeftHand')].clone().invert()
  const centre = hand.clone().addScaledVector(f, knuckleLen * 0.55).addScaledVector(n, 0.02)
  return { q: inv.clone().multiply(racketWorld), p: centre.sub(hand).applyQuaternion(inv) }
}

/** Puts the left hand on the handle just above the right hand (two-handed strokes), blending from the capture. */
export class LeftHandOnGrip {
  readonly arm: Arm
  private grip: Grip
  private base: ArmPose = emptyArmPose()
  private pose: ArmPose = emptyArmPose()
  private target = new Quaternion()
  private centre = new Vector3()
  private wrist = new Vector3()
  private v = new Vector3()

  constructor(rig: Rig) {
    this.arm = new Arm(rig, 'Left')
    this.grip = makeLeftGrip(rig)
  }

  /**
   * `racketQ` is the racket's world orientation and `rightCentre` the right hand's grip centre (world);
   * `weight` 0 keeps the capture's left arm, 1 closes the hand on the handle `gap` metres above the right
   * hand (a hand width for two-handers, ~0.2 m to cradle the throat before a one-handed swing).
   */
  apply(rig: Rig, racketQ: Quaternion, rightCentre: Vector3, weight: number, gap = HAND_GAP) {
    if (weight <= 0) return
    const b = this.arm.measure(rig, this.base)
    const p = this.pose
    this.centre.copy(rightCentre).addScaledVector(this.v.set(0, 1, 0).applyQuaternion(racketQ), gap)
    this.target.copy(racketQ).multiply(this.grip.q.clone().invert())
    // two passes: the wrist may not reach the exact orientation, so place the hand for the one it reached
    let hand: Quaternion = this.target
    for (let pass = 0; pass < 2; pass++) {
      this.wrist.copy(this.centre).sub(this.v.copy(this.grip.p).applyQuaternion(hand))
      this.arm.fromShoulder(rig, this.wrist, p.hand)
      p.swivel = b.swivel
      if (pass === 0) {
        p.pron = b.pron
        p.ext = b.ext
        p.dev = b.dev
        this.arm.apply(rig, p, this.target)
        hand = this.arm.handQ(rig).clone()
      } else this.arm.apply(rig, p)
    }
    if (weight < 1) {
      const w = weight
      p.hand.lerpVectors(b.hand, p.hand, w)
      p.swivel = b.swivel
      p.pron = b.pron + (p.pron - b.pron) * w
      p.ext = b.ext + (p.ext - b.ext) * w
      p.dev = b.dev + (p.dev - b.dev) * w
      this.arm.apply(rig, p)
    }
  }
}
