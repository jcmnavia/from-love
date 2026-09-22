/**
 * Retargets the exemplars chosen by select.ts onto the Rocketbox skeleton and writes public/motion/<strokeId>.json
 * in the format of docs/research/refactor-design.md.
 *
 *   npx -y tsx scripts/mocap/retarget.ts
 *
 * Method (direction-based, rest-pose compensated). The BVH rest pose has identity joint rotations (T-pose, arms
 * along ±X, hands pointing down), the Rocketbox rest is an A-pose. For every target bone b driven by source joint j:
 *
 *   Q_b(t) = G · W_j(t) · Δ_b · Q_b,rest
 *
 * W_j is the source joint's world rotation (= rotation from its rest, since the BVH rest is identity), Q_b,rest the
 * target bone's rest world rotation, and Δ_b the smallest rotation that turns the target bone's rest aim axis (toward
 * its child) onto the source segment's rest direction. So the bone's aim axis follows the source segment direction
 * exactly, and the twist about that axis is the source segment's own twist. G rotates the lab about Y so the net
 * is at +Z. Chest is spread over Spine / Spine1 / Spine2 as 25 / 60 / 100 % (cumulative) of its rotation relative
 * to the pelvis, i.e. 25 / 35 / 40 % per bone.
 *
 * Frames: everything is computed in the MODEL frame (metres, y up, faces +Z, right side at −X), which is also the
 * frame of the GLB armature's local rotations. `hips` is written in the AUTHOR frame: author = (−X, Y, Z) of the
 * model frame (x = player's right, z = toward the net). The runtime's studio world is rotY(180°) · model, so
 * author → studio world is (x, y, −z).
 */
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { Quaternion, Vector3 } from 'three'
import { AIM_CHILD, BONES, loadRig, pose, posOf, rotOf, type Rig } from './rig'
import { SELECTION, type Selection } from './selection'
import { cleaned } from './strokes'
import { fk, type Pose, type Src } from './source'

export const OUT_DIR = new URL('../../public/motion/', import.meta.url).pathname
const FPS = 60

type Aim = { from: string; to: string | 'end' }
interface Map_ {
  /** source joint whose world rotation drives the bone */
  joint: string
  /** source segment whose direction the bone's aim axis follows */
  aim: Aim
  /** spine: fraction of the Chest-relative-to-Hips rotation */
  chestShare?: number
}

export const MAP: Record<string, Map_> = {
  Hips: { joint: 'Hips', aim: { from: 'Hips', to: 'Chest' } },
  Spine: { joint: 'Chest', aim: { from: 'Chest', to: 'Neck' }, chestShare: 0.25 },
  Spine1: { joint: 'Chest', aim: { from: 'Chest', to: 'Neck' }, chestShare: 0.6 },
  Spine2: { joint: 'Chest', aim: { from: 'Chest', to: 'Neck' }, chestShare: 1 },
  Neck: { joint: 'Neck', aim: { from: 'Neck', to: 'Head' } },
  Head: { joint: 'Head', aim: { from: 'Head', to: 'end' } },
  ...Object.fromEntries(
    (['Left', 'Right'] as const).flatMap((s) => [
      [`${s}Shoulder`, { joint: `${s}Collar`, aim: { from: `${s}Collar`, to: `${s}Shoulder` } }],
      [`${s}Arm`, { joint: `${s}Shoulder`, aim: { from: `${s}Shoulder`, to: `${s}Elbow` } }],
      [`${s}ForeArm`, { joint: `${s}Elbow`, aim: { from: `${s}Elbow`, to: `${s}Wrist` } }],
      [`${s}Hand`, { joint: `${s}Wrist`, aim: { from: `${s}Wrist`, to: 'end' } }],
      [`${s}UpLeg`, { joint: `${s}Hip`, aim: { from: `${s}Hip`, to: `${s}Knee` } }],
      [`${s}Leg`, { joint: `${s}Knee`, aim: { from: `${s}Knee`, to: `${s}Ankle` } }],
      [`${s}Foot`, { joint: `${s}Ankle`, aim: { from: `${s}Ankle`, to: 'end' } }],
    ]),
  ),
}

/** source segment direction in a pose (world) */
export function srcDir(s: Src, p: Pose, aim: Aim): Vector3 {
  const a = s.joints.indexOf(aim.from)
  const b = aim.to === 'end' ? p.E[a]! : p.P[s.joints.indexOf(aim.to)]
  return b.clone().sub(p.P[a]).normalize()
}

/** mirror a source take left ↔ right (reflection across the lab's YZ plane) */
export function mirrorSrc(s: Src): Src {
  const swap = (n: string) => n.replace(/^Left/, '#').replace(/^Right/, 'Left').replace(/^#/, 'Right')
  const q = s.joints.map((n) => {
    const t = s.q[s.joints.indexOf(swap(n))].slice()
    for (let f = 0; f < s.frames; f++) { t[f * 4 + 1] = -t[f * 4 + 1]; t[f * 4 + 2] = -t[f * 4 + 2] }
    return t
  })
  const root = s.root.slice()
  for (let f = 0; f < s.frames; f++) root[f * 3] = -root[f * 3]
  return { ...s, q, root }
}

export interface RigInfo {
  rig: Rig
  restQ: Map<string, Quaternion>
  restAim: Map<string, Vector3>
  restLocal: Map<string, Quaternion>
  /** aim axis in the bone's own local frame */
  localAim: Map<string, Vector3>
  parent: Map<string, string | null>
  legLength: number
  restFootY: number
}

export function rigInfo(): RigInfo {
  const rig = loadRig()
  const restQ = new Map<string, Quaternion>(), restAim = new Map<string, Vector3>(), restLocal = new Map<string, Quaternion>()
  const parent = new Map<string, string | null>()
  const localAim = new Map<string, Vector3>()
  const W = (n: string) => rig.rest[rig.index.get(`mixamorig:${n}`)!]
  for (const full of BONES) {
    const b = full.replace('mixamorig:', '')
    const i = rig.index.get(full)!
    restQ.set(b, rotOf(rig.rest[i]))
    restAim.set(b, posOf(W(AIM_CHILD[b])).sub(posOf(rig.rest[i])).normalize())
    restLocal.set(b, rig.nodes[i].r.clone())
    localAim.set(b, rig.nodes[rig.index.get(`mixamorig:${AIM_CHILD[b]}`)!].t.clone().normalize())
    const pn = rig.nodes[rig.nodes[i].parent].name
    parent.set(b, pn.startsWith('mixamorig:') ? pn.replace('mixamorig:', '') : null)
  }
  const d = (a: string, b: string) => posOf(W(a)).distanceTo(posOf(W(b)))
  const legLength = (d('LeftUpLeg', 'LeftLeg') + d('LeftLeg', 'LeftFoot') + d('RightUpLeg', 'RightLeg') + d('RightLeg', 'RightFoot')) / 2
  return { rig, restQ, restAim, restLocal, localAim, parent, legLength, restFootY: posOf(W('LeftFoot')).y }
}

export const rotY = (net: [number, number]) => new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), -Math.atan2(net[0], net[1]))

export interface Retargeted {
  sel: Selection
  src: Src
  G: Quaternion
  scale: number
  /** per 100 Hz source frame in the window: bone → world rotation (model frame) */
  world: Map<string, Quaternion>[]
  /** per 60 Hz output frame */
  local: Map<string, Quaternion>[]
  hips: Vector3[]
  /** source time (s, in the take) of each output frame */
  times: number[]
}

export function retarget(sel: Selection, info: RigInfo): Retargeted {
  const c = cleaned(sel.file)
  const src = sel.mirror ? mirrorSrc(c.clean) : c.clean
  const poses = sel.mirror ? Array.from({ length: src.frames }, (_, f) => fk(src, f)) : c.poses
  const G = rotY(sel.net)
  const J = (n: string) => src.joints.indexOf(n)
  const legSrc = (['Left', 'Right'] as const).reduce((a, s) => a + src.offset[J(`${s}Knee`)].length() + src.offset[J(`${s}Ankle`)].length(), 0) / 2
  const scale = info.legLength / legSrc

  // Δ per bone from the rest aims
  const delta = new Map<string, Quaternion>()
  const rest0 = poseAtRest(src)
  for (const full of BONES) {
    const b = full.replace('mixamorig:', '')
    if (b === 'Hips') { delta.set(b, new Quaternion()); continue }
    delta.set(b, new Quaternion().setFromUnitVectors(info.restAim.get(b)!, srcDir(src, rest0, MAP[b].aim)))
  }

  const [t0, t1] = sel.window
  const f0 = Math.floor(t0 * src.fps), f1 = Math.min(Math.ceil(t1 * src.fps) + 1, src.frames - 1)
  const world: Map<string, Quaternion>[] = []
  const localSrc: Map<string, Quaternion>[] = []
  const hipsSrc: Vector3[] = []
  for (let f = f0; f <= f1; f++) {
    const p = poses[f]
    const Wh = p.R[J('Hips')], Wc = p.R[J('Chest')]
    const rel = Wh.clone().invert().multiply(Wc)
    const m = new Map<string, Quaternion>()
    for (const full of BONES) {
      const b = full.replace('mixamorig:', '')
      const map = MAP[b]
      const Wj = map.chestShare !== undefined ? Wh.clone().multiply(new Quaternion().slerp(rel, map.chestShare)) : p.R[J(map.joint)]
      m.set(b, G.clone().multiply(Wj).multiply(delta.get(b)!).multiply(info.restQ.get(b)!))
    }
    shareWristTwist(m, info)
    world.push(m)
    const l = new Map<string, Quaternion>()
    for (const [b, q] of m) {
      const par = info.parent.get(b)
      l.set(b, par ? m.get(par)!.clone().invert().multiply(q) : q.clone())
    }
    // hemisphere continuity for slerp / the runtime's slerp
    if (localSrc.length) for (const [b, q] of l) if (q.dot(localSrc.at(-1)!.get(b)!) < 0) q.set(-q.x, -q.y, -q.z, -q.w)
    localSrc.push(l)
    hipsSrc.push(p.P[J('Hips')].clone().multiplyScalar(scale).applyQuaternion(G))
  }

  // resample to 60 Hz
  const n = Math.floor((t1 - t0) * FPS + 1e-6) + 1
  const local: Map<string, Quaternion>[] = [], hips: Vector3[] = [], times: number[] = []
  for (let k = 0; k < n; k++) {
    const t = t0 + k / FPS
    const u = t * src.fps - f0
    const i = Math.min(Math.floor(u), localSrc.length - 2), w = u - i
    const l = new Map<string, Quaternion>()
    for (const [b, q] of localSrc[i]) l.set(b, q.clone().slerp(localSrc[i + 1].get(b)!, w))
    local.push(l)
    hips.push(hipsSrc[i].clone().lerp(hipsSrc[i + 1], w))
    times.push(t)
  }

  // ground the feet: shift hips so the lower foot sits at the rest foot height (median over the clip),
  // and put the feet midpoint of the first frame at the origin (x, z)
  const feet = (k: number, h: Vector3) => {
    const m = pose(info.rig, prefixed(local[k]), h)
    return ['LeftFoot', 'RightFoot'].map((b) => posOf(m[info.rig.index.get(`mixamorig:${b}`)!]))
  }
  const low = hips.map((h, k) => Math.min(...feet(k, h).map((v) => v.y))).sort((a, b) => a - b)
  const dy = info.restFootY - low[low.length >> 1]
  const [l0, r0] = feet(0, hips[0].clone().setY(hips[0].y + dy))
  const mid = l0.clone().add(r0).multiplyScalar(0.5)
  for (const h of hips) { h.x -= mid.x; h.z -= mid.z; h.y += dy }
  return { sel, src, G, scale, world, local, hips, times }
}

function poseAtRest(s: Src): Pose {
  const r = { ...s, q: s.q.map(() => Float64Array.from([0, 0, 0, 1])), root: Float64Array.from([0, 0, 0]), frames: 1 }
  return fk(r, 0)
}

/**
 * The BVH elbow carries no pronation, so the whole forearm roll lands in the hand bone (up to ~150°), which candy-
 * wraps the wrist skin (Rocketbox has no forearm twist bone). Move half of the hand's twist about the forearm axis
 * into the forearm: the forearm turns about its own aim axis (no joint moves) and the hand keeps its world rotation.
 */
export const WRIST_TWIST_TO_FOREARM = 0.5
function shareWristTwist(m: Map<string, Quaternion>, info: RigInfo) {
  for (const side of ['Left', 'Right']) {
    const fa = m.get(`${side}ForeArm`)!, hand = m.get(`${side}Hand`)!
    const axis = info.localAim.get(`${side}ForeArm`)!
    const e = fa.clone().invert().multiply(hand).multiply(info.restLocal.get(`${side}Hand`)!.clone().invert())
    if (e.w < 0) e.set(-e.x, -e.y, -e.z, -e.w) // shortest arc, so |tau| ≤ 180°
    const tau = 2 * Math.atan2(e.x * axis.x + e.y * axis.y + e.z * axis.z, e.w)
    fa.multiply(new Quaternion().setFromAxisAngle(axis, WRIST_TWIST_TO_FOREARM * tau))
  }
}

export const prefixed = (m: Map<string, Quaternion>) => new Map([...m].map(([k, v]) => [`mixamorig:${k}`, v]))

// ---------------------------------------------------------------- events and feet

export interface Events { start: number; backswingEnd: number; forwardStart: number; contact: number; finish: number; end: number }

export function events(r: Retargeted, info: RigInfo): Events {
  const { sel, times } = r
  const n = times.length, dt = 1 / FPS
  const end = (n - 1) * dt
  const contact = sel.contact - sel.window[0]
  const m = r.local.map((l, k) => pose(info.rig, prefixed(l), toModel(r.hips[k])))
  const P = (b: string) => m.map((w) => posOf(w[info.rig.index.get(`mixamorig:${b}`)!]))
  const hand = P('RightHand'), hips = P('Hips')
  const kc = Math.round(contact / dt)
  const clampK = (t: number) => Math.min(Math.max(Math.round(t / dt), 0), n - 1)
  const vel = hand.map((_, k) => hand[Math.min(k + 1, n - 1)].clone().sub(hand[Math.max(k - 1, 0)]).divideScalar(((Math.min(k + 1, n - 1) - Math.max(k - 1, 0)) || 1) * dt))
  const speed = vel.map((v) => v.length())
  const vpk = Math.max(...speed.slice(Math.max(kc - 10, 0), kc + 10))
  let kb: number
  if (sel.id === 'serve') {
    // trophy position ≈ deepest knee bend (lowest hips) before the swing (literature: ≈ −350 ms for the serve)
    kb = clampK(contact - 0.8)
    for (let k = kb; k <= clampK(contact - 0.15); k++) if (hips[k].y < hips[kb].y) kb = k
  } else {
    // racket-side hand furthest back (lowest author z, i.e. away from the net) before contact; for the smash this
    // is the end of the turn-and-point preparation (no deep knee bend in these takes)
    kb = clampK(contact - 0.9)
    for (let k = kb; k <= clampK(contact - 0.05); k++) if (hand[k].z < hand[kb].z) kb = k
  }
  // forward swing: the final rise of hand speed into contact starts at the last frame below 15 % of the peak
  // (forehand literature: first forward racket movement ≈ −259 ms)
  let kf = kc
  while (kf > kb && speed[kf - 1] >= 0.15 * vpk) kf--
  const backswingEnd = kb * dt, forwardStart = Math.max(kf, kb) * dt
  // finish: the follow-through has died down (hand speed under 20 % of its peak), else the calmest later frame
  let kfin = -1
  for (let k = kc + Math.round(0.15 / dt); k < n; k++) if (speed[k] < 0.2 * vpk) { kfin = k; break }
  if (kfin < 0) {
    kfin = Math.min(kc + Math.round(0.2 / dt), n - 1)
    for (let k = kfin; k < n; k++) if (speed[k] < speed[kfin]) kfin = k
  }
  const r3 = (x: number) => Math.round(x * 1000) / 1000
  return { start: 0, backswingEnd: r3(backswingEnd), forwardStart: r3(forwardStart), contact: r3(contact), finish: r3(kfin * dt), end: r3(end) }
}

/** planted intervals: foot bone slower than 0.25 m/s and within 4 cm of its rest height, for ≥ 0.1 s */
export function plants(r: Retargeted, info: RigInfo) {
  const n = r.times.length, dt = 1 / FPS
  const m = r.local.map((l, k) => pose(info.rig, prefixed(l), toModel(r.hips[k])))
  const out: Record<'leftPlanted' | 'rightPlanted', [number, number][]> = { leftPlanted: [], rightPlanted: [] }
  for (const side of ['Left', 'Right'] as const) {
    const p = m.map((w) => posOf(w[info.rig.index.get(`mixamorig:${side}Foot`)!]))
    const on = p.map((v, k) => {
      const a = p[Math.max(k - 1, 0)], b = p[Math.min(k + 1, n - 1)]
      const sp = a.distanceTo(b) / (((Math.min(k + 1, n - 1) - Math.max(k - 1, 0)) || 1) * dt)
      return sp < 0.25 && v.y < info.restFootY + 0.04
    })
    // close 1–2 frame gaps
    for (let k = 1; k < n - 2; k++) if (!on[k] && on[k - 1] && (on[k + 1] || on[k + 2])) on[k] = true
    const list = out[`${side.toLowerCase()}Planted` as 'leftPlanted']
    let s = -1
    for (let k = 0; k <= n; k++) {
      if (k < n && on[k]) { if (s < 0) s = k; continue }
      if (s >= 0 && (k - 1 - s) * dt >= 0.1) list.push([Math.round(s * dt * 1000) / 1000, Math.round((k - 1) * dt * 1000) / 1000])
      s = -1
    }
  }
  return out
}

/** author (x = right, y up, z = net) → model (right at −X) */
export const toModel = (a: Vector3) => new Vector3(-a.x, a.y, a.z)
/** hips are kept in the model frame internally; this converts for output */
export const toAuthor = (m: Vector3) => new Vector3(-m.x, m.y, m.z)

// ---------------------------------------------------------------- output

const r4 = (x: number) => Math.round(x * 1e4) / 1e4 + 0 // + 0 turns −0 into 0

export function toJson(r: Retargeted, info: RigInfo) {
  const { sel } = r
  // r.hips is in the model frame; events()/plants() take author-frame hips, so convert once here
  const authorHips = r.hips.map(toAuthor)
  const rr: Retargeted = { ...r, hips: authorHips }
  const rot: number[] = []
  for (const l of r.local) for (const full of BONES) {
    const q = l.get(full.replace('mixamorig:', ''))!
    rot.push(r4(q.x), r4(q.y), r4(q.z), r4(q.w))
  }
  return {
    id: sel.id,
    fps: FPS,
    frames: r.local.length,
    source: {
      file: sel.file, window: sel.window, player: sel.player, license: 'CC BY-SA 3.0',
      attribution: 'Pulgarin-Giraldo et al. 2017, Tennis-MoCap (github.com/jdpulgarin/Tennis-MoCap); cleaned, filtered, resampled, retargeted',
    },
    bones: BONES,
    hips: authorHips.flatMap((h) => [r4(h.x), r4(h.y), r4(h.z)]),
    rot,
    events: events(rr, info),
    feet: plants(rr, info),
  }
}

export function loadSelection(): Selection[] {
  return JSON.parse(readFileSync(SELECTION, 'utf8'))
}

function main() {
  const info = rigInfo()
  mkdirSync(OUT_DIR, { recursive: true })
  const only = process.argv.slice(2)
  for (const sel of loadSelection()) {
    if (only.length && !only.includes(sel.id)) continue
    const r = retarget(sel, info)
    const json = toJson(r, info)
    const path = `${OUT_DIR}${sel.id}.json`
    writeFileSync(path, JSON.stringify(json))
    console.log(`${sel.id.padEnd(20)} ${sel.file} [${sel.window.join('–')}] ${json.frames} frames, scale ${r.scale.toFixed(3)}, ${(statSync(path).size / 1024).toFixed(0)} KB, events ${JSON.stringify(json.events)}`)
  }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop()!)) main()
