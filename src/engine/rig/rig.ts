import { Matrix4, Quaternion, Vector3 } from 'three'
import skeletonData from './skeleton.json'
import type { V3 } from '../types'

/**
 * The player's real skeleton (Microsoft Rocketbox, Mixamo bone names) as pure
 * data, posed with forward kinematics. This is the single source of truth for
 * every motion that comes from a clip: the mesh in the studio copies the same
 * local rotations onto its bones, and everything the studio measures (joint
 * positions, racket, trail) is read back from here.
 *
 * Frames: the model faces +Z with its right side at −X; the studio world faces
 * −Z with the player's right at +X, so world = rotY(180°) · model. Hips
 * positions in clips are in the author frame (x = player's right, y up,
 * z toward the net), and author → world is (x, y, −z).
 */
interface BoneData {
  name: string
  parent: number
  t: number[]
  r: number[]
  s: number[]
}

const DATA = skeletonData as { armature: number[]; bones: BoneData[] }
const FACE = new Matrix4().makeRotationY(Math.PI)

export class Rig {
  readonly names: string[]
  readonly parent: Int16Array
  readonly count: number
  /** current local rotations (start at rest) */
  readonly local: Quaternion[]
  /** world-space (studio frame) position and orientation of every bone after `pose()` */
  readonly pos: Vector3[]
  readonly quat: Quaternion[]
  /** world orientation of every bone in the rest pose, facing the net; deltas from it give body orientations */
  readonly restQuat: Quaternion[]
  private restT: Vector3[]
  private restS: Vector3[]
  private restLocal: Quaternion[]
  private world: Matrix4[]
  private root: Matrix4
  private rootInv: Matrix4
  private index = new Map<string, number>()
  /** bone indices with every parent before its children (the skin's joint list is not ordered) */
  private order: number[]
  /** last armature-local translation of each root bone */
  private rootT: Vector3[] = []
  private m = new Matrix4()
  private q = new Quaternion()
  private lastHips: V3 | null = null
  private v = new Vector3()

  constructor() {
    const bones = DATA.bones
    this.count = bones.length
    this.names = bones.map((b) => b.name)
    this.parent = Int16Array.from(bones.map((b) => b.parent))
    this.names.forEach((n, i) => this.index.set(n, i))
    const depth = (i: number): number => (this.parent[i] < 0 ? 0 : 1 + depth(this.parent[i]))
    this.order = bones.map((_, i) => i).sort((a, b) => depth(a) - depth(b))
    this.restT = bones.map((b) => new Vector3(...(b.t as V3)))
    this.restS = bones.map((b) => new Vector3(...(b.s as V3)))
    this.restLocal = bones.map((b) => new Quaternion(...(b.r as [number, number, number, number])))
    this.local = this.restLocal.map((q) => q.clone())
    this.world = bones.map(() => new Matrix4())
    this.pos = bones.map(() => new Vector3())
    this.quat = bones.map(() => new Quaternion())
    this.root = FACE.clone().multiply(new Matrix4().fromArray(DATA.armature))
    this.rootInv = this.root.clone().invert()
    this.pose(null)
    this.restQuat = this.quat.map((q) => q.clone())
  }

  /** bone index by Mixamo name, with or without the `mixamorig:` prefix; -1 if absent */
  find(name: string) {
    return this.index.get(name) ?? this.index.get('mixamorig:' + name) ?? -1
  }

  /** resets every local rotation to the rest pose */
  resetLocal() {
    this.local.forEach((q, i) => q.copy(this.restLocal[i]))
  }

  /**
   * Forward kinematics from `local`. `hipsAuthor` (metres, author frame) moves the root bone;
   * null keeps the rest position.
   */
  pose(hipsAuthor: V3 | null) {
    this.lastHips = hipsAuthor
    for (const i of this.order) {
      const p = this.parent[i]
      let t = this.restT[i]
      if (p < 0) {
        // author → world → armature-local
        t = hipsAuthor ? this.v.set(hipsAuthor[0], hipsAuthor[1], -hipsAuthor[2]).applyMatrix4(this.rootInv) : this.restT[i]
        ;(this.rootT[i] ??= new Vector3()).copy(t)
      }
      this.m.compose(t, this.local[i], this.restS[i])
      if (p < 0) this.world[i].multiplyMatrices(this.root, this.m)
      else this.world[i].multiplyMatrices(this.world[p], this.m)
      this.world[i].decompose(this.pos[i], this.quat[i], this.v)
    }
  }

  /**
   * Rotates bone `i` about its own bone axis (toward its first child) by `angle` radians, in its
   * local frame, then re-poses. Used for forearm pronation that the capture does not contain.
   */
  twistLocal(i: number, angle: number) {
    const child = this.parent.indexOf(i)
    if (child < 0) return
    const axis = this.v.copy(this.restT[child]).normalize()
    this.local[i].multiply(this.q.setFromAxisAngle(axis, angle))
    this.pose(this.lastHips)
  }

  /** world orientation change of bone `i` from its rest pose (identity = rest, facing the net) */
  delta(i: number, out: Quaternion) {
    return out.copy(this.quat[i]).multiply(this.restQuat[i].clone().invert())
  }

  /** the armature-local translation the root bone `i` was posed with (used by the mesh player) */
  rootLocal(i: number, out: Vector3) {
    return out.copy(this.rootT[i] ?? this.restT[i])
  }
}
