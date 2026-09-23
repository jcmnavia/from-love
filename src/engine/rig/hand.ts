import { Quaternion, Vector3 } from 'three'
import type { Rig } from './rig'

/** flexion per joint (knuckle, middle, tip), degrees, of a hand closed around a racket handle */
const GRIP: Record<string, [number, number, number]> = {
  Index: [48, 62, 30],
  Middle: [66, 72, 38],
  Ring: [72, 76, 38],
  Pinky: [76, 78, 38],
  Thumb: [18, 28, 24],
}

/**
 * Closes a hand's fingers (the capture has none): each finger joint flexes about the axis that folds it
 * toward the palm, found once from the rest skeleton.
 */
export class FingerCurl {
  readonly bones: string[] = []
  private joints: { i: number; axis: Vector3; deg: number }[] = []
  private q = new Quaternion()

  constructor(rig: Rig, side: 'Left' | 'Right') {
    rig.resetLocal()
    rig.pose(null)
    const P = (n: string) => rig.pos[rig.find(side + n)]
    const hand = P('Hand')
    const f = P('HandMiddle1').clone().sub(hand).normalize()
    const across = P('HandIndex1').clone().sub(P('HandPinky1')).normalize()
    // palm normal: the side of the hand facing the body at rest
    const palm = f.clone().cross(across).normalize()
    const toBody = rig.pos[rig.find('Hips')].clone().setY(hand.y).sub(hand)
    if (palm.dot(toBody) < 0) palm.negate()
    for (const [finger, degs] of Object.entries(GRIP)) {
      let axis: Vector3 | null = null
      degs.forEach((deg, j) => {
        const name = `${side}Hand${finger}${j + 1}`
        const i = rig.find(name)
        if (i < 0) return
        const child = rig.find(`${side}Hand${finger}${j + 2}`)
        if (child >= 0) {
          const dir = rig.pos[child].clone().sub(rig.pos[i]).normalize()
          // the thumb folds across the palm toward the fingers rather than straight into it
          const toward = finger === 'Thumb' ? palm.clone().addScaledVector(f, 0.6).normalize() : palm
          axis = dir.cross(toward).normalize()
        }
        if (!axis) return
        const local = axis.clone().applyQuaternion(rig.quat[i].clone().invert())
        this.joints.push({ i, axis: local, deg })
        this.bones.push(rig.names[i])
      })
    }
  }

  /** curls the fingers by `amount` (1 = around the handle); call after the clip set the rig's rotations */
  apply(rig: Rig, amount = 1) {
    for (const { i, axis, deg } of this.joints) rig.local[i].multiply(this.q.setFromAxisAngle(axis, (deg * amount * Math.PI) / 180))
    rig.repose()
  }
}
