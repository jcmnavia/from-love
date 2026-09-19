import {
  BufferGeometry, CapsuleGeometry, CylinderGeometry, Float32BufferAttribute, Group, LineBasicMaterial,
  LineSegments, Mesh, MeshStandardMaterial, Quaternion, SphereGeometry, TorusGeometry, Vector3,
} from 'three'
import type { Solved } from '../engine/solver'
import { RACKET } from '../engine/solver'

const UP = new Vector3(0, 1, 0)
const dirTmp = new Vector3()

export const KIT = {
  skin: '#c98f6b',
  shirt: '#f4f6f1',
  shorts: '#16324f',
  shoe: '#fbfbf7',
  cap: '#16324f',
  frame: '#1b1b1f',
  grip: '#f2f2ee',
  strings: '#e8f57a',
}

class Seg {
  mesh: Mesh
  private cut: number
  constructor(rStart: number, rEnd: number, mat: MeshStandardMaterial, cut = 1) {
    this.mesh = new Mesh(new CylinderGeometry(rEnd, rStart, 1, 20, 1), mat)
    this.mesh.castShadow = true
    this.cut = cut
  }
  update(a: Vector3, b: Vector3) {
    dirTmp.copy(b).sub(a)
    const len = dirTmp.length() * this.cut
    dirTmp.normalize()
    this.mesh.position.copy(a).addScaledVector(dirTmp, len / 2)
    this.mesh.quaternion.setFromUnitVectors(UP, dirTmp)
    this.mesh.scale.set(1, len, 1)
  }
}

function ball(r: number, mat: MeshStandardMaterial, sx = 1, sy = 1, sz = 1) {
  const m = new Mesh(new SphereGeometry(r, 28, 20), mat)
  m.scale.set(sx, sy, sz)
  m.castShadow = true
  return m
}

export function buildRacket(frameMat: MeshStandardMaterial, gripMat: MeshStandardMaterial) {
  // local +Y runs handle → tip, local +Z is the string-bed normal, origin at the hand
  const g = new Group()
  const handle = new Mesh(new CylinderGeometry(0.0165, 0.0175, 0.2, 8), gripMat)
  handle.position.y = -RACKET.butt + 0.1
  handle.rotation.y = Math.PI / 8
  const cap = new Mesh(new CylinderGeometry(0.021, 0.021, 0.012, 8), frameMat)
  cap.position.y = -RACKET.butt
  cap.rotation.y = Math.PI / 8
  g.add(handle, cap)

  const headCy = RACKET.sweet
  const rx = 0.125
  const ry = 0.165
  const hoop = new Mesh(new TorusGeometry(1, 0.085, 10, 48), frameMat)
  hoop.scale.set(rx, ry, rx * 1.1)
  hoop.position.y = headCy
  g.add(hoop)

  const throatTop = headCy - ry * 0.93
  const throatStart = -RACKET.butt + 0.2
  for (const side of [-1, 1]) {
    const a = new Vector3(0, throatStart, 0)
    const b = new Vector3(side * rx * 0.62, throatTop + 0.035, 0)
    const bar = new Mesh(new CylinderGeometry(0.0085, 0.0095, 1, 8), frameMat)
    const d = b.clone().sub(a)
    bar.scale.y = d.length()
    bar.position.copy(a).addScaledVector(d, 0.5)
    bar.quaternion.setFromUnitVectors(UP, d.normalize())
    g.add(bar)
  }

  const pts: number[] = []
  const mains = 16
  const crosses = 19
  for (let i = 0; i < mains; i++) {
    const x = ((i + 0.5) / mains - 0.5) * 2 * rx * 0.92
    const h = ry * Math.sqrt(Math.max(1 - (x / rx) ** 2, 0))
    pts.push(x, headCy - h, 0, x, headCy + h, 0)
  }
  for (let i = 0; i < crosses; i++) {
    const y = ((i + 0.5) / crosses - 0.5) * 2 * ry * 0.94
    const w = rx * Math.sqrt(Math.max(1 - (y / ry) ** 2, 0))
    pts.push(-w, headCy + y, 0, w, headCy + y, 0)
  }
  const geo = new BufferGeometry()
  geo.setAttribute('position', new Float32BufferAttribute(pts, 3))
  g.add(new LineSegments(geo, new LineBasicMaterial({ color: KIT.strings, transparent: true, opacity: 0.85 })))
  g.traverse((o) => {
    if ((o as Mesh).isMesh) o.castShadow = true
  })
  return g
}

/** The on-court player: a smooth athletic mannequin driven joint-by-joint from a Solved skeleton. */
export class PlayerRig {
  group = new Group()
  racket: Group
  private mats: MeshStandardMaterial[] = []
  private segs: Record<string, Seg> = {}
  private parts: Record<string, Mesh> = {}
  private bones: LineSegments
  private bonePos: Float32BufferAttribute

  constructor() {
    const mat = (color: string, roughness = 0.62) => {
      const m = new MeshStandardMaterial({ color, roughness, metalness: 0.02 })
      this.mats.push(m)
      return m
    }
    const skin = mat(KIT.skin, 0.55)
    const shirt = mat(KIT.shirt, 0.8)
    const shorts = mat(KIT.shorts, 0.8)
    const shoe = mat(KIT.shoe, 0.5)
    const cap = mat(KIT.cap, 0.7)

    const S = this.segs
    for (const side of ['L', 'R']) {
      S['upperArm' + side] = new Seg(0.05, 0.04, skin)
      S['sleeve' + side] = new Seg(0.062, 0.056, shirt, 0.5)
      S['forearm' + side] = new Seg(0.041, 0.029, skin)
      S['thigh' + side] = new Seg(0.082, 0.056, skin)
      S['shortLeg' + side] = new Seg(0.095, 0.085, shorts, 0.52)
      S['shin' + side] = new Seg(0.054, 0.035, skin)
      S['sock' + side] = new Seg(0.04, 0.042, shoe, 1)
    }
    S.neck = new Seg(0.05, 0.045, skin)
    for (const s of Object.values(S)) this.group.add(s.mesh)

    const P = this.parts
    P.pelvis = ball(1, shorts, 0.175, 0.14, 0.125)
    P.abdomen = ball(1, shirt, 0.16, 0.17, 0.112)
    P.chest = ball(1, shirt, 0.2, 0.215, 0.128)
    P.head = ball(1, skin, 0.092, 0.115, 0.102)
    for (const side of ['L', 'R']) {
      P['shoulder' + side] = ball(0.066, shirt)
      P['elbow' + side] = ball(0.041, skin)
      P['hand' + side] = ball(0.043, skin, 1, 1.15, 0.8)
      P['knee' + side] = ball(0.057, skin)
      P['foot' + side] = new Mesh(new CapsuleGeometry(0.048, 0.17, 6, 16), shoe)
      P['foot' + side].castShadow = true
    }
    for (const p of Object.values(P)) this.group.add(p)

    // cap + visor make the gaze direction readable from any camera
    const crown = new Mesh(new SphereGeometry(0.1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), cap)
    crown.position.y = 0.025
    crown.scale.set(0.98, 0.95, 1.06)
    const visor = new Mesh(new CylinderGeometry(0.085, 0.085, 0.008, 24, 1, false, -Math.PI / 2.4, Math.PI / 1.2), cap)
    visor.position.set(0, 0.03, -0.085)
    visor.rotation.y = Math.PI
    visor.rotation.x = 0.12
    const nose = ball(0.016, skin)
    nose.position.set(0, -0.015, -0.1)
    P.head.add(crown, visor, nose)
    // children inherit the ellipsoid scale; undo it so the cap stays round
    for (const c of [crown, visor, nose]) {
      c.scale.multiply(new Vector3(1 / 0.092, 1 / 0.115, 1 / 0.102))
      c.position.multiply(new Vector3(1 / 0.092, 1 / 0.115, 1 / 0.102))
    }

    this.racket = buildRacket(mat(KIT.frame, 0.35), mat(KIT.grip, 0.9))
    this.group.add(this.racket)

    const geo = new BufferGeometry()
    this.bonePos = new Float32BufferAttribute(new Float32Array(16 * 2 * 3), 3)
    geo.setAttribute('position', this.bonePos)
    this.bones = new LineSegments(geo, new LineBasicMaterial({ color: '#e6f556', depthTest: false, transparent: true }))
    this.bones.renderOrder = 10
    this.bones.visible = false
    this.bones.frustumCulled = false
    this.group.add(this.bones)
  }

  setXray(on: boolean) {
    for (const m of this.mats) {
      m.transparent = on
      m.opacity = on ? 0.28 : 1
      m.depthWrite = !on
      m.needsUpdate = true
    }
    this.bones.visible = on
  }

  update(s: Solved) {
    const S = this.segs
    const P = this.parts
    S.upperArmL.update(s.shoulderL, s.elbowL)
    S.upperArmR.update(s.shoulderR, s.elbowR)
    S.sleeveL.update(s.shoulderL, s.elbowL)
    S.sleeveR.update(s.shoulderR, s.elbowR)
    S.forearmL.update(s.elbowL, s.wristL)
    S.forearmR.update(s.elbowR, s.wristR)
    S.thighL.update(s.hipL, s.kneeL)
    S.thighR.update(s.hipR, s.kneeR)
    S.shortLegL.update(s.hipL, s.kneeL)
    S.shortLegR.update(s.hipR, s.kneeR)
    S.shinL.update(s.kneeL, s.ankleL)
    S.shinR.update(s.kneeR, s.ankleR)
    S.sockL.update(s.ankleL, dirTmp.copy(s.ankleL).lerp(s.kneeL, 0.22).clone())
    S.sockR.update(s.ankleR, dirTmp.copy(s.ankleR).lerp(s.kneeR, 0.22).clone())
    S.neck.update(s.neck, s.head)

    P.pelvis.position.copy(s.pelvis)
    P.pelvis.quaternion.copy(s.pelvisQ)
    P.abdomen.position.copy(s.abdomen).lerp(s.chestBase, 0.4)
    P.abdomen.quaternion.copy(s.midQ)
    P.chest.position.copy(s.chest)
    P.chest.quaternion.copy(s.chestQ)
    P.head.position.copy(s.head)
    P.head.quaternion.copy(s.headQ)
    P.shoulderL.position.copy(s.shoulderL)
    P.shoulderR.position.copy(s.shoulderR)
    P.elbowL.position.copy(s.elbowL)
    P.elbowR.position.copy(s.elbowR)
    P.handL.position.copy(s.wristL)
    P.handR.position.copy(s.wristR)
    P.handR.quaternion.copy(s.racketQ)
    P.kneeL.position.copy(s.kneeL)
    P.kneeR.position.copy(s.kneeR)
    this.placeFoot(P.footL, s.ankleL, s.footQL)
    this.placeFoot(P.footR, s.ankleR, s.footQR)

    this.racket.position.copy(s.wristR)
    this.racket.quaternion.copy(s.racketQ)

    if (this.bones.visible) {
      const pairs: [Vector3, Vector3][] = [
        [s.pelvis, s.chestBase], [s.chestBase, s.neck], [s.neck, s.head],
        [s.shoulderL, s.shoulderR], [s.hipL, s.hipR],
        [s.shoulderL, s.elbowL], [s.elbowL, s.wristL], [s.shoulderR, s.elbowR], [s.elbowR, s.wristR],
        [s.hipL, s.kneeL], [s.kneeL, s.ankleL], [s.hipR, s.kneeR], [s.kneeR, s.ankleR],
        [s.wristR, s.racketTip], [s.neck, s.shoulderL], [s.neck, s.shoulderR],
      ]
      pairs.forEach(([a, b], i) => {
        this.bonePos.setXYZ(i * 2, a.x, a.y, a.z)
        this.bonePos.setXYZ(i * 2 + 1, b.x, b.y, b.z)
      })
      this.bonePos.needsUpdate = true
    }
  }

  private placeFoot(mesh: Mesh, ankle: Vector3, q: Quaternion) {
    // capsule runs along Y by default: lay it along the foot's forward axis (-Z)
    mesh.quaternion.copy(q).multiply(FOOT_LAY)
    mesh.position.copy(ankle).add(dirTmp.set(0, -0.035, -0.065).applyQuaternion(q))
    mesh.scale.set(1, 1, 0.82)
  }
}

const FOOT_LAY = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2)
