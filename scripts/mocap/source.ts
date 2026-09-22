/**
 * Tennis-MoCap source takes as channel data (local quaternions + root position), with forward kinematics,
 * glitch repair and zero-phase low-pass filtering done on the channels so positions and rotations stay consistent.
 */
import { readFileSync } from 'node:fs'
import { Quaternion, Vector3 } from 'three'
import { BVHLoader } from 'three/examples/jsm/loaders/BVHLoader.js'

export const RAW_DIR = new URL('../../data/mocap-raw/', import.meta.url).pathname

export interface Src {
  name: string
  fps: number
  frames: number
  joints: string[]
  parent: number[]
  /** joint offset from its parent, metres, BVH rest (identity rotations) */
  offset: Vector3[]
  /** end-site offset in the joint's frame, if the joint has one */
  end: (Vector3 | null)[]
  /** local quaternions, 4 × frames per joint (x, y, z, w) */
  q: Float64Array[]
  /** root (Hips) position, metres, 3 × frames */
  root: Float64Array
}

export function loadSrc(file: string): Src {
  const text = readFileSync(file.includes('/') ? file : RAW_DIR + file, 'utf8')
  const { skeleton, clip } = new BVHLoader().parse(text)
  const bones = skeleton.bones.filter((b) => b.name !== 'ENDSITE')
  const joints = bones.map((b) => b.name)
  const frames = Number(/Frames:\s*(\d+)/.exec(text)![1])
  const frameTime = Number(/Frame Time:\s*([\d.]+)/.exec(text)![1])
  const parent = bones.map((b) => bones.indexOf(b.parent as never))
  const offset = bones.map((b) => b.position.clone().multiplyScalar(0.01))
  const end = bones.map((b) => {
    const e = b.children.find((c) => c.name === 'ENDSITE')
    return e ? e.position.clone().multiplyScalar(0.01) : null
  })
  const q = joints.map((n) => Float64Array.from(clip.tracks.find((t) => t.name === `${n}.quaternion`)!.values))
  const root = Float64Array.from(clip.tracks.find((t) => t.name === `${joints[0]}.position`)!.values, (v) => v * 0.01)
  for (const t of q) if (t.length !== frames * 4) throw new Error('track length')
  return { name: file.split('/').pop()!.replace('.bvh', ''), fps: 1 / frameTime, frames, joints, parent, offset, end, q, root }
}

export function cloneSrc(s: Src): Src {
  return { ...s, q: s.q.map((t) => t.slice()), root: s.root.slice() }
}

export const getQ = (s: Src, j: number, f: number, out = new Quaternion()) =>
  out.set(s.q[j][f * 4], s.q[j][f * 4 + 1], s.q[j][f * 4 + 2], s.q[j][f * 4 + 3])

export interface Pose {
  /** world rotation per joint */
  R: Quaternion[]
  /** world position per joint (metres) */
  P: Vector3[]
  /** world end-site position per joint (null when the joint has none) */
  E: (Vector3 | null)[]
}

export function fk(s: Src, f: number): Pose {
  const R: Quaternion[] = [], P: Vector3[] = [], E: (Vector3 | null)[] = []
  for (let j = 0; j < s.joints.length; j++) {
    const lq = getQ(s, j, f)
    const p = s.parent[j]
    if (p < 0) {
      R.push(lq)
      P.push(new Vector3(s.root[f * 3], s.root[f * 3 + 1], s.root[f * 3 + 2]))
    } else {
      R.push(R[p].clone().multiply(lq))
      P.push(s.offset[j].clone().applyQuaternion(R[p]).add(P[p]))
    }
    E.push(s.end[j] ? s.end[j]!.clone().applyQuaternion(R[j]).add(P[j]) : null)
  }
  return { R, P, E }
}

export const fkAll = (s: Src) => Array.from({ length: s.frames }, (_, f) => fk(s, f))

/** all tracked points per frame: joints then end sites (for glitch detection and speeds) */
export function points(pose: Pose): Vector3[] {
  return [...pose.P, ...(pose.E.filter(Boolean) as Vector3[])]
}

// ---------------------------------------------------------------- glitch repair

/** Frames where any joint or end site deviates from its 7-frame median by more than `dev + perSpeed × v`
 *  (v = local speed of the median track, so the fast whip near impact is not mistaken for a glitch), or jumps
 *  more than `jump` in one frame while also deviating. Flagged frames are dilated by one frame each side. */
export function glitchFrames(poses: Pose[], dev = 0.035, perSpeed = 0.004, jump = 0.12): boolean[] {
  const pts = poses.map(points)
  const n = pts.length, m = pts[0].length
  const hit = new Array<boolean>(n).fill(false)
  const tmp: number[] = []
  for (let k = 0; k < m; k++) {
    const med = pts.map((_, f) => {
      const v = new Vector3()
      for (const ax of ['x', 'y', 'z'] as const) {
        tmp.length = 0
        for (let i = Math.max(0, f - 3); i <= Math.min(n - 1, f + 3); i++) tmp.push(pts[i][k][ax])
        tmp.sort((a, b) => a - b)
        v[ax] = tmp[tmp.length >> 1]
      }
      return v
    })
    const vm = speeds(med, 100)
    for (let f = 0; f < n; f++) {
      const d = pts[f][k].distanceTo(med[f])
      const thr = dev + perSpeed * vm[f]
      const j = f ? pts[f][k].distanceTo(pts[f - 1][k]) : 0
      if (d > thr || (j > jump + vm[f] / 100 && d > thr / 2)) hit[f] = true
    }
  }
  return hit.map((_, f) => hit[f] || (f > 0 && hit[f - 1]) || (f < n - 1 && hit[f + 1]))
}

/** Replace bad frames by slerp / lerp between the nearest good frames (held at the take ends). */
export function repair(s: Src, bad: boolean[]): number {
  const a = new Quaternion(), b = new Quaternion()
  let count = 0
  for (let f = 0; f < s.frames; f++) {
    if (!bad[f]) continue
    let g0 = f - 1
    while (g0 >= 0 && bad[g0]) g0--
    let g1 = f
    while (g1 < s.frames && bad[g1]) g1++
    for (let k = f; k < g1; k++) {
      const i0 = g0 >= 0 ? g0 : g1, i1 = g1 < s.frames ? g1 : g0
      const t = i0 === i1 ? 0 : (k - i0) / (i1 - i0)
      for (let j = 0; j < s.joints.length; j++) {
        getQ(s, j, i0, a); getQ(s, j, i1, b)
        a.slerp(b, t)
        s.q[j].set([a.x, a.y, a.z, a.w], k * 4)
      }
      for (let c = 0; c < 3; c++) s.root[k * 3 + c] = s.root[i0 * 3 + c] * (1 - t) + s.root[i1 * 3 + c] * t
      count++
    }
    f = g1 - 1
  }
  return count
}

// ---------------------------------------------------------------- filtering

/** 2nd-order Butterworth low-pass, applied forward and backward (zero phase, effective 4th order). */
export function filtfilt(x: Float64Array | number[], fc: number, fs: number): Float64Array {
  const K = Math.tan((Math.PI * fc) / fs), Q = Math.SQRT1_2
  const norm = 1 / (1 + K / Q + K * K)
  const b0 = K * K * norm, b1 = 2 * b0, b2 = b0
  const a1 = 2 * (K * K - 1) * norm, a2 = (1 - K / Q + K * K) * norm
  const n = x.length, pad = Math.min(n - 1, 60)
  // odd reflection padding keeps the ends from ringing
  const y = new Float64Array(n + 2 * pad)
  for (let i = 0; i < pad; i++) y[i] = 2 * x[0] - x[pad - i]
  for (let i = 0; i < n; i++) y[pad + i] = x[i]
  for (let i = 0; i < pad; i++) y[pad + n + i] = 2 * x[n - 1] - x[n - 2 - i]
  const run = (v: Float64Array) => {
    const out = new Float64Array(v.length)
    let x1 = v[0], x2 = v[0], y1 = v[0], y2 = v[0]
    for (let i = 0; i < v.length; i++) {
      const o = b0 * v[i] + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
      x2 = x1; x1 = v[i]; y2 = y1; y1 = o
      out[i] = o
    }
    return out
  }
  const f = run(y).reverse()
  const r = run(f).reverse()
  return r.slice(pad, pad + n)
}

/** Low-pass every channel: `cutoff(jointName)` in Hz for the rotations, `rootHz` for the root position. */
export function lowpass(s: Src, cutoff: (joint: string) => number, rootHz: number) {
  for (let j = 0; j < s.joints.length; j++) {
    const t = s.q[j]
    // hemisphere continuity before filtering components
    for (let f = 1; f < s.frames; f++) {
      const d = t[f * 4] * t[f * 4 - 4] + t[f * 4 + 1] * t[f * 4 - 3] + t[f * 4 + 2] * t[f * 4 - 2] + t[f * 4 + 3] * t[f * 4 - 1]
      if (d < 0) for (let c = 0; c < 4; c++) t[f * 4 + c] = -t[f * 4 + c]
    }
    const fc = cutoff(s.joints[j])
    const comps = [0, 1, 2, 3].map((c) => filtfilt(Array.from({ length: s.frames }, (_, f) => t[f * 4 + c]), fc, s.fps))
    for (let f = 0; f < s.frames; f++) {
      const l = Math.hypot(comps[0][f], comps[1][f], comps[2][f], comps[3][f])
      for (let c = 0; c < 4; c++) t[f * 4 + c] = comps[c][f] / l
    }
  }
  for (let c = 0; c < 3; c++) {
    const v = filtfilt(Array.from({ length: s.frames }, (_, f) => s.root[f * 3 + c]), rootHz, s.fps)
    for (let f = 0; f < s.frames; f++) s.root[f * 3 + c] = v[f]
  }
}

/** Cut-offs: 12 Hz for the body; the arms keep more bandwidth so the whip around impact survives. */
export const BODY_HZ = 12
export const ARM_HZ = 20
export const cutoffFor = (j: string) => (/Collar|Shoulder|Elbow|Wrist/.test(j) ? ARM_HZ : BODY_HZ)

export interface Cleaned {
  raw: Src
  /** glitches repaired, not yet filtered */
  repaired: Src
  clean: Src
  /** frames repaired by interpolation */
  bad: boolean[]
  /** frames still flagged after repair (should be none) */
  residual: boolean[]
  poses: Pose[]
}

export function cleanTake(file: string): Cleaned {
  const raw = loadSrc(file)
  const s = cloneSrc(raw)
  const bad = glitchFrames(fkAll(s))
  // the last frames of many takes are garbage; always treat the final 5 as bad
  for (let f = s.frames - 5; f < s.frames; f++) bad[f] = true
  repair(s, bad)
  // a second pass catches glitches that were hidden next to bigger ones
  const bad2 = glitchFrames(fkAll(s))
  repair(s, bad2)
  for (let f = 0; f < s.frames; f++) bad[f] ||= bad2[f]
  const repaired = cloneSrc(s)
  lowpass(s, cutoffFor, BODY_HZ)
  const poses = fkAll(s)
  const residual = glitchFrames(poses)
  return { raw, repaired, clean: s, bad, residual, poses }
}

/** speed (m/s) of a point series, central differences */
export function speeds(ps: Vector3[], fps: number): number[] {
  return ps.map((_, f) => {
    const a = ps[Math.max(0, f - 1)], b = ps[Math.min(ps.length - 1, f + 1)]
    const dt = (Math.min(ps.length - 1, f + 1) - Math.max(0, f - 1)) / fps
    return a.distanceTo(b) / dt
  })
}
