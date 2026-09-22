import {
  Bone, BufferGeometry, Float32BufferAttribute, Group, LineBasicMaterial, LineSegments, Matrix4,
  MeshStandardMaterial, Object3D, Quaternion, SkinnedMesh, Vector3,
} from 'three'
import { GLTFLoader, SkeletonUtils } from 'three-stdlib'
import type { Solved } from '../engine/solver'
import { KIT, buildRacket } from './PlayerRig'
import type { Rig } from '../engine/rig/rig'

/**
 * A skinned humanoid (Mixamo skeleton, e.g. the three.js `Xbot.glb`) posed every
 * frame from the analytic solver's `Solved` output.
 *
 * Retargeting strategy, per bone, top-down:
 *   trunk / head / feet  → world quaternion copied from the solver (pelvisQ, chestQ, headQ, footQ)
 *   clavicles            → follow the chest, swing a little toward the arm
 *   arms / legs          → two-bone IK from the *mesh's* joint to the solver's wrist/ankle,
 *                          bending toward the solver's elbow/knee, so the hand lands exactly
 *                          where the racket is and the feet stay on the court
 *   right hand           → racketQ × grip offset; half of its roll is fed back into the forearm
 *
 * All math happens in the frame of `group` (never in true world space) so the
 * scene's left-handed mirror (scale.x = -1) keeps working.
 */

export type SkinnedKind = 'player' | 'athlete'
/**
 * player: Microsoft Rocketbox Sports_Male_04 (MIT, see public/models/LICENSE-rocketbox.txt), bones renamed to Mixamo's.
 * athlete: built by scripts/build-athlete.ts from the Mixamo X Bot, painted as a tennis player.
 */
const MODEL_URL: Record<SkinnedKind, string> = { player: '/models/player.glb', athlete: '/models/athlete.glb' }
const TARGET_HEIGHT = 1.83
/** the character rests facing +Z; our player faces -Z */
const FACE = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI)
/** the solver's wrist is really the fist centre: a few centimetres past the wrist along the metacarpals and into the palm */
const FIST_ALONG = 0.055
const FIST_PALM = 0.02
/** palm normal in the (Mixamo) hand-bone frame: T-pose palms face down */
const PALM = new Vector3(0, -1, 0)
const HIPS_LIFT = 0.02

const B = {
  hips: 'mixamorig:Hips', spine: 'mixamorig:Spine', spine1: 'mixamorig:Spine1', spine2: 'mixamorig:Spine2',
  neck: 'mixamorig:Neck', head: 'mixamorig:Head',
  shoulderL: 'mixamorig:LeftShoulder', armL: 'mixamorig:LeftArm', foreArmL: 'mixamorig:LeftForeArm', handL: 'mixamorig:LeftHand',
  shoulderR: 'mixamorig:RightShoulder', armR: 'mixamorig:RightArm', foreArmR: 'mixamorig:RightForeArm', handR: 'mixamorig:RightHand',
  upLegL: 'mixamorig:LeftUpLeg', legL: 'mixamorig:LeftLeg', footL: 'mixamorig:LeftFoot',
  upLegR: 'mixamorig:RightUpLeg', legR: 'mixamorig:RightLeg', footR: 'mixamorig:RightFoot',
  headTop: 'mixamorig:HeadTop_End', toeL: 'mixamorig:LeftToe_End',
} as const
type BoneKey = keyof typeof B

interface BoneInfo {
  bone: Bone
  parent: BoneInfo | null
  /** rest-pose orientation in the (unrotated) model frame */
  restQ: Quaternion
  /** rest-pose local orientation relative to the parent */
  restLocalQ: Quaternion
  /** unit vector, in bone-local space, pointing down the bone toward its main child */
  axis: Vector3
  /** length of the bone toward its main child, in model units */
  length: number
  /** current orientation and origin in the `group` frame */
  q: Quaternion
  p: Vector3
}

// scratch: tX/qX for the public methods, sX for the private helpers, ikX for ik2
/** one download shared by every scene on the page (the contact sheet mounts several) */
const modelPromises: Partial<Record<SkinnedKind, Promise<Group>>> = {}
function loadModel(kind: SkinnedKind) {
  modelPromises[kind] ??= new Promise((resolve, reject) => {
    new GLTFLoader().load(MODEL_URL[kind], (gltf) => resolve(gltf.scene), undefined, reject)
  })
  return modelPromises[kind].then((scene) => SkeletonUtils.clone(scene) as Group)
}

/** finger curl (degrees) for the three joints of each finger: racket hand grips, free hand relaxes */
const CURL = { grip: [52, 74, 42], relaxed: [22, 34, 22] }

const tA = new Vector3()
const tB = new Vector3()
const tC = new Vector3()
const tD = new Vector3()
const qA = new Quaternion()
const qB = new Quaternion()
const qC = new Quaternion()
const sV1 = new Vector3()
const sV2 = new Vector3()
const sQ1 = new Quaternion()
const sQ2 = new Quaternion()
const ikA = new Vector3()
const ikB = new Vector3()
const IDENT = new Quaternion()

function ik2(root: Vector3, target: Vector3, l1: number, l2: number, pole: Vector3, mid: Vector3, end: Vector3) {
  const dir = ikA.copy(target).sub(root)
  let d = dir.length()
  if (d < 1e-5) {
    dir.set(0, -1, 0)
    d = 1e-5
  }
  dir.divideScalar(d)
  const dc = Math.min(Math.max(d, Math.abs(l1 - l2) + 0.01), (l1 + l2) * 0.999)
  end.copy(root).addScaledVector(dir, dc)
  const a = (l1 * l1 - l2 * l2 + dc * dc) / (2 * dc)
  const h = Math.sqrt(Math.max(l1 * l1 - a * a, 0))
  const perp = ikB.copy(pole).sub(root)
  perp.addScaledVector(dir, -perp.dot(dir))
  if (perp.lengthSq() < 1e-8) perp.set(0, 0, -1).addScaledVector(dir, dir.z)
  perp.normalize()
  mid.copy(root).addScaledVector(dir, a).addScaledVector(perp, h)
}

/** twist component of `q` about the unit axis `axis` */
function twistAbout(q: Quaternion, axis: Vector3, out: Quaternion) {
  const d = q.x * axis.x + q.y * axis.y + q.z * axis.z
  out.set(axis.x * d, axis.y * d, axis.z * d, q.w)
  if (out.lengthSq() < 1e-10) return out.identity()
  return out.normalize()
}

export class SkinnedPlayer {
  readonly kind: SkinnedKind
  group = new Group()
  racket: Group
  ready = false
  private bones: Partial<Record<BoneKey, BoneInfo>> = {}
  private unit = 1
  private toArmature = new Matrix4()
  private armatureQ = new Quaternion()
  private mats: MeshStandardMaterial[] = []
  private meshes: SkinnedMesh[] = []
  private skel: LineSegments
  private skelPos: Float32BufferAttribute
  private xray = false
  /** racket frame → right-hand bone frame (tune here if the grip looks off) */
  private grip = new Quaternion()
  private gripInv = new Quaternion()
  private disposed = false
  private clipConj = new Matrix4()
  private clipConjQ = new Quaternion()
  private boneByName: (name: string) => Bone | undefined = () => undefined
  private clipBones: { bone: Bone; k: number; root: boolean }[] | null = null
  private clipFor: object | null = null

  constructor(kind: SkinnedKind = 'player') {
    this.kind = kind
    const mat = (color: string, roughness: number) => {
      const m = new MeshStandardMaterial({ color, roughness, metalness: 0.02 })
      this.mats.push(m)
      return m
    }
    this.racket = buildRacket(mat(KIT.frame, 0.35), mat(KIT.grip, 0.9))
    this.racket.visible = false
    this.group.add(this.racket)

    const geo = new BufferGeometry()
    this.skelPos = new Float32BufferAttribute(new Float32Array(20 * 2 * 3), 3)
    geo.setAttribute('position', this.skelPos)
    this.skel = new LineSegments(geo, new LineBasicMaterial({ color: '#e6f556', depthTest: false, transparent: true }))
    this.skel.renderOrder = 10
    this.skel.visible = false
    this.skel.frustumCulled = false
    this.group.add(this.skel)

    // racket +Z (palm-side string face) is the palm (hand -Y). Racket +Y (handle→tip)
    // starts along the metacarpals (hand -X) and is then rolled about the palm normal
    // so the handle crosses the fist diagonally from the heel to the index knuckle,
    // exiting between thumb and index like an eastern grip.
    const m = new Matrix4().makeBasis(new Vector3(0, 0, 1), new Vector3(-1, 0, 0), new Vector3(0, -1, 0))
    this.grip.setFromRotationMatrix(m)
    this.grip.multiply(qA.setFromAxisAngle(new Vector3(0, 1, 0), 0.6))
    this.gripInv.copy(this.grip).invert()

    loadModel(kind).then(
      (scene) => {
        if (!this.disposed) this.setup(scene)
      },
      (err) => console.error('[SkinnedPlayer] failed to load', MODEL_URL[kind], err),
    )
  }

  private setup(scene: Group) {
    // athlete: one vertex-coloured material painted into the model; player: keep the model's own
    // textured materials (cloned per instance so x-ray can make one scene transparent)
    const painted = this.kind === 'athlete' ? new MeshStandardMaterial({ vertexColors: true, roughness: 0.66, metalness: 0.0 }) : null
    if (painted) this.mats.push(painted)
    scene.traverse((o) => {
      if ((o as SkinnedMesh).isSkinnedMesh) {
        const sm = o as SkinnedMesh
        sm.castShadow = true
        sm.receiveShadow = true
        sm.frustumCulled = false
        if (painted) sm.material = painted
        else {
          const own = (Array.isArray(sm.material) ? sm.material : [sm.material]).map((m) => {
            const c = m.clone() as MeshStandardMaterial
            c.metalness = 0
            this.mats.push(c)
            return c
          })
          sm.material = own.length === 1 ? own[0] : own
        }
        this.meshes.push(sm)
      }
    })

    // GLTFLoader strips characters such as ':' from node names, so match on a normalised form
    const norm = (n: string) => n.replace(/[^A-Za-z0-9_]/g, '').toLowerCase()
    const byName = new Map<string, Object3D>()
    scene.traverse((o) => byName.set(norm(o.name), o))
    const find = (name: string) => byName.get(norm(name)) as Bone | undefined
    const hips = find(B.hips)
    if (!hips) {
      console.error('[SkinnedPlayer] no Hips bone in', MODEL_URL)
      return
    }
    const armature = hips.parent as Object3D
    scene.updateMatrixWorld(true)

    // model height → world scale
    const top = find(B.headTop)?.getWorldPosition(new Vector3()).y ?? 1.8
    const toe = find(B.toeL)?.getWorldPosition(new Vector3()).y ?? 0
    const height = top - Math.min(toe, 0)
    // the Rocketbox player is already metric and must match the engine's rig exactly; the X Bot is resized
    const scale = this.kind === 'player' ? 1 : TARGET_HEIGHT / height
    scene.scale.setScalar(scale)
    scene.updateMatrixWorld(true)
    armature.updateMatrixWorld(true)
    // armature → group frame (scene sits at the group origin), and its inverse for placing the hips
    const armMat = armature.matrixWorld.clone()
    this.toArmature.copy(armMat).invert()
    armMat.decompose(tA, this.armatureQ, tB)
    this.unit = tB.x
    // clip playback: the engine's rig applies rotY(180°) above the armature, the mesh does not, so
    // rotations and the hips position are conjugated into the mesh armature's frame once here
    this.clipConj.copy(this.toArmature).multiply(new Matrix4().makeRotationY(Math.PI)).multiply(armMat)
    this.clipConj.decompose(tA, this.clipConjQ, tB)
    this.boneByName = (name: string) => find(name)

    const register = (key: BoneKey, parentKey: BoneKey | null, childName?: string) => {
      const bone = find(B[key])
      if (!bone) return
      const parent = parentKey ? this.bones[parentKey] ?? null : null
      const restQ = bone.getWorldQuaternion(new Quaternion()).premultiply(qA.copy(this.armatureQ).invert())
      const child = childName ? find(childName) : undefined
      const axis = child ? child.position.clone() : new Vector3(0, 1, 0)
      const length = child ? axis.length() * this.unit : 0
      if (child) axis.normalize()
      this.bones[key] = {
        bone, parent, restQ, restLocalQ: bone.quaternion.clone(), axis, length,
        q: new Quaternion(), p: new Vector3(),
      }
    }
    register('hips', null, B.spine)
    register('spine', 'hips', B.spine1)
    register('spine1', 'spine', B.spine2)
    register('spine2', 'spine1', B.neck)
    register('neck', 'spine2', B.head)
    register('head', 'neck', B.headTop)
    for (const s of ['L', 'R'] as const) {
      register(`shoulder${s}`, 'spine2', B[`arm${s}`])
      register(`arm${s}`, `shoulder${s}`, B[`foreArm${s}`])
      register(`foreArm${s}`, `arm${s}`, B[`hand${s}`])
      register(`hand${s}`, `foreArm${s}`, `mixamorig:${s === 'L' ? 'Left' : 'Right'}HandMiddle1`)
      register(`upLeg${s}`, 'hips', B[`leg${s}`])
      register(`leg${s}`, `upLeg${s}`, B[`foot${s}`])
      register(`foot${s}`, `leg${s}`, `mixamorig:${s === 'L' ? 'Left' : 'Right'}ToeBase`)
    }

    // fingers: fixed curl, set once (the update loop never touches them)
    for (const side of ['Left', 'Right'] as const) {
      const curl = side === 'Right' ? CURL.grip : CURL.relaxed
      const sign = side === 'Right' ? 1 : -1
      for (const finger of ['Index', 'Middle', 'Ring', 'Pinky']) {
        curl.forEach((deg, i) => {
          const b = find(`mixamorig:${side}Hand${finger}${i + 1}`)
          if (b) b.quaternion.setFromAxisAngle(tA.set(0, 0, 1), sign * deg * (Math.PI / 180))
        })
      }
      // thumb wraps the other way, over the fingers
      for (let i = 1; i <= 3; i++) {
        const b = find(`mixamorig:${side}HandThumb${i}`)
        if (b) b.quaternion.setFromAxisAngle(tA.set(0, 1, 0), sign * (i === 1 ? 0.35 : 0.5))
      }
    }

    this.group.add(scene)
    this.racket.visible = true
    this.ready = true
    this.setXray(this.xray)
  }

  setXray(on: boolean) {
    this.xray = on
    for (const m of this.mats) {
      m.transparent = on
      m.opacity = on ? 0.28 : 1
      m.depthWrite = !on
      m.needsUpdate = true
    }
    this.skel.visible = on && this.ready
  }

  dispose() {
    this.disposed = true
    for (const m of this.mats) m.dispose()
  }

  /** orientation copied from the solver: world = bodyQ × FACE × rest */
  private setAbsolute(key: BoneKey, bodyQ: Quaternion) {
    const b = this.bones[key]
    if (!b) return
    b.q.copy(bodyQ).multiply(FACE).multiply(b.restQ)
    this.commit(b)
  }

  /** the bone keeps its rest angle to the parent, then swings so its axis points along `dir` */
  private setDirection(key: BoneKey, dir: Vector3) {
    const b = this.bones[key]
    if (!b) return
    const parentQ = b.parent ? b.parent.q : this.armatureQ
    const ref = sQ1.copy(parentQ).multiply(b.restLocalQ)
    const cur = sV1.copy(b.axis).applyQuaternion(ref)
    sQ2.setFromUnitVectors(cur, sV2.copy(dir).normalize())
    b.q.copy(sQ2).multiply(ref)
    this.commit(b)
  }

  private setWorld(key: BoneKey, q: Quaternion) {
    const b = this.bones[key]
    if (!b) return
    b.q.copy(q)
    this.commit(b)
  }

  /** writes the local quaternion and the bone's group-frame origin */
  private commit(b: BoneInfo) {
    const parentQ = b.parent ? b.parent.q : this.armatureQ
    b.bone.quaternion.copy(sQ2.copy(parentQ).invert().multiply(b.q))
    if (b.parent) b.p.copy(b.bone.position).multiplyScalar(this.unit).applyQuaternion(parentQ).add(b.parent.p)
  }

  /** where the bone's main child will sit given the current orientation */
  private tip(key: BoneKey, out: Vector3) {
    const b = this.bones[key]!
    return out.copy(b.axis).multiplyScalar(b.length).applyQuaternion(b.q).add(b.p)
  }

  /**
   * Mocap playback: copy the rig's local rotations (only the bones the clip animates, so the
   * finger curl survives) and place the hips; the racket follows the rig's grip.
   */
  updateFromRig(rig: Rig, animated: readonly string[], s: Solved) {
    this.racket.position.copy(s.wristR)
    this.racket.quaternion.copy(s.racketQ)
    if (!this.ready) return
    if (this.clipFor !== animated) {
      this.clipFor = animated
      this.clipBones = animated.flatMap((name) => {
        const bone = this.boneByName(name)
        const k = rig.find(name)
        return bone && k >= 0 ? [{ bone, k, root: rig.parent[k] < 0 }] : []
      })
    }
    for (const { bone, k, root } of this.clipBones!) {
      if (root) {
        bone.quaternion.copy(this.clipConjQ).multiply(rig.local[k])
        rig.rootLocal(k, bone.position).applyMatrix4(this.clipConj)
      } else bone.quaternion.copy(rig.local[k])
    }
    if (this.skel.visible) this.drawSkeleton(s)
  }

  update(s: Solved) {
    this.racket.position.copy(s.wristR)
    this.racket.quaternion.copy(s.racketQ)
    if (!this.ready) return
    const Bn = this.bones
    const hips = Bn.hips!

    // trunk
    hips.p.copy(s.pelvis).add(tA.set(0, HIPS_LIFT, 0).applyQuaternion(s.pelvisQ))
    hips.bone.position.copy(hips.p).applyMatrix4(this.toArmature)
    this.setAbsolute('hips', s.pelvisQ)
    this.setAbsolute('spine', qB.copy(s.pelvisQ).slerp(s.chestQ, 0.3))
    this.setAbsolute('spine1', qB.copy(s.pelvisQ).slerp(s.chestQ, 0.65))
    this.setAbsolute('spine2', s.chestQ)
    this.setAbsolute('neck', qB.copy(s.chestQ).slerp(s.headQ, 0.5))
    this.setAbsolute('head', s.headQ)

    // arms
    this.solveArm('L', s.shoulderL, s.elbowL, s.wristL, null)
    this.solveArm('R', s.shoulderR, s.elbowR, s.wristR, s.racketQ)

    // legs
    this.solveLeg('L', s.kneeL, s.ankleL, s.footQL)
    this.solveLeg('R', s.kneeR, s.ankleR, s.footQR)

    if (this.skel.visible) this.drawSkeleton(s)
  }

  private solveArm(side: 'L' | 'R', shoulder: Vector3, elbow: Vector3, wrist: Vector3, racketQ: Quaternion | null) {
    const clav = this.bones[`shoulder${side}`]
    const arm = this.bones[`arm${side}`]
    const fore = this.bones[`foreArm${side}`]
    const hand = this.bones[`hand${side}`]
    if (!clav || !arm || !fore || !hand) return

    // clavicle: follow the chest, protract a little toward where the arm is going
    const ref = qA.copy(clav.parent!.q).multiply(clav.restLocalQ)
    const restDir = tC.copy(clav.axis).applyQuaternion(ref)
    const armDir = tD.copy(elbow).sub(shoulder).normalize()
    restDir.addScaledVector(armDir, 0.22).normalize()
    this.setDirection(`shoulder${side}`, restDir)

    // hand orientation first, so the IK can aim the wrist rather than the fist
    let handQ: Quaternion | null = null
    const target = tD.copy(wrist)
    if (racketQ) {
      handQ = qB.copy(racketQ).multiply(this.gripInv)
      const fist = tC.copy(hand.axis).multiplyScalar(FIST_ALONG).addScaledVector(PALM, FIST_PALM).applyQuaternion(handQ)
      target.sub(fist)
    }

    const mid = new Vector3()
    const end = new Vector3()
    ik2(arm.p, target, arm.length, fore.length, elbow, mid, end)
    this.setDirection(`arm${side}`, tC.copy(mid).sub(arm.p))
    this.setDirection(`foreArm${side}`, tC.copy(end).sub(mid))

    if (handQ) {
      // share the hand's roll with the forearm (pronation / supination)
      const rel = qC.copy(fore.q).invert().multiply(handQ)
      twistAbout(rel, fore.axis, qA).slerp(IDENT, 0.5)
      fore.q.multiply(qA)
      this.commit(fore)
      this.setWorld(`hand${side}`, handQ)
    } else {
      this.setDirection(`hand${side}`, tC.copy(end).sub(mid))
    }
  }

  private solveLeg(side: 'L' | 'R', knee: Vector3, ankle: Vector3, footQ: Quaternion) {
    const up = this.bones[`upLeg${side}`]
    const leg = this.bones[`leg${side}`]
    if (!up || !leg) return
    const mid = new Vector3()
    const end = new Vector3()
    ik2(up.p, ankle, up.length, leg.length, knee, mid, end)
    this.setDirection(`upLeg${side}`, tC.copy(mid).sub(up.p))
    this.setDirection(`leg${side}`, tC.copy(end).sub(mid))
    this.setAbsolute(`foot${side}`, footQ)
  }

  private drawSkeleton(s: Solved) {
    const Bn = this.bones
    const seg = (a: Vector3, b: Vector3, i: number) => {
      this.skelPos.setXYZ(i * 2, a.x, a.y, a.z)
      this.skelPos.setXYZ(i * 2 + 1, b.x, b.y, b.z)
    }
    const chain: [BoneKey, BoneKey][] = [
      ['hips', 'spine'], ['spine', 'spine1'], ['spine1', 'spine2'], ['spine2', 'neck'], ['neck', 'head'],
      ['spine2', 'shoulderL'], ['shoulderL', 'armL'], ['armL', 'foreArmL'], ['foreArmL', 'handL'],
      ['spine2', 'shoulderR'], ['shoulderR', 'armR'], ['armR', 'foreArmR'], ['foreArmR', 'handR'],
      ['hips', 'upLegL'], ['upLegL', 'legL'], ['legL', 'footL'],
      ['hips', 'upLegR'], ['upLegR', 'legR'], ['legR', 'footR'],
    ]
    let i = 0
    for (const [a, b] of chain) {
      const A = Bn[a]
      const Bb = Bn[b]
      if (A && Bb) seg(A.p, Bb.p, i)
      i++
    }
    seg(Bn.head!.p, this.tip('head', tA), i++)
    seg(s.wristR, s.racketTip, i)
    this.skelPos.needsUpdate = true
  }
}

/*
 * Known gaps (see docs/3d-realism.md):
 *  - The Xbot torso is ~10 cm shorter than the solver's, so the mesh shoulders sit a
 *    little low; the arm IK compensates by extending more than the solver does.
 *  - Fingers stay in the rest pose; a closed-fist pose per grip is the next step.
 *  - Left hand follows the forearm; two-handed backhands need it on the grip too.
 */
