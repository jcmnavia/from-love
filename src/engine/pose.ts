import { Matrix4, Quaternion, Vector3 } from 'three'
import type { Keyframe, Pose, PoseInput, V3 } from './types'

// athletic ready stance: feet wider than the shoulders, knees bent (hips ~12 cm below standing, as in the
// captured players' recovery stance), trunk inclined ~24° forward
export const READY: Pose = {
  pelvis: [0, 0.86, 0],
  pelvisRot: [0, 10, 0],
  chestRot: [0, 14, 0],
  rHand: [0.1, 1.02, 0.34],
  rPole: [0.5, -0.8, -0.3],
  lHand: [-0.1, 1.08, 0.4],
  lAttach: 2,
  lPole: [-0.5, -0.8, -0.3],
  racketDir: [-0.25, 0.5, 0.83],
  racketNormal: [-0.95, 0, -0.3],
  lFoot: { p: [-0.35, 0, 0.02], turn: -12, heel: 8 },
  rFoot: { p: [0.35, 0, 0.02], turn: 12, heel: 8 },
}

export function mergePose(base: Pose, o: PoseInput): Pose {
  return {
    ...base,
    ...o,
    lFoot: { ...base.lFoot, ...(o.lFoot ?? {}) },
    rFoot: { ...base.rFoot, ...(o.rFoot ?? {}) },
  } as Pose
}

/** Builds a keyframe list where every key inherits whatever the previous key left untouched. */
export function sequence(start: Pose = READY) {
  const keys: Keyframe[] = []
  let current = start
  const api = {
    key(t: number, o: PoseInput = {}) {
      current = mergePose(current, o)
      keys.push({ t, pose: current })
      return api
    },
    /** return to the ready position */
    ready(t: number, o: PoseInput = {}) {
      current = mergePose(READY, o)
      keys.push({ t, pose: current })
      return api
    },
    done: () => keys,
  }
  return api
}

const N = 38

function flatten(p: Pose, out: Float64Array, o: number) {
  let i = o
  const put = (a: readonly number[]) => {
    for (const v of a) out[i++] = v
  }
  put(p.pelvis)
  put(p.pelvisRot)
  put(p.chestRot)
  put(p.rHand)
  put(p.rPole)
  put(p.lHand)
  out[i++] = p.lAttach
  put(p.lPole)
  put(p.racketDir)
  put(p.racketNormal)
  put(p.lFoot.p)
  out[i++] = p.lFoot.turn
  out[i++] = p.lFoot.heel
  put(p.rFoot.p)
  out[i++] = p.rFoot.turn
  out[i++] = p.rFoot.heel
}

function unflatten(a: Float64Array, p: Pose) {
  let i = 0
  const take = (v: number[]) => {
    v[0] = a[i++]
    v[1] = a[i++]
    v[2] = a[i++]
  }
  take(p.pelvis)
  take(p.pelvisRot)
  take(p.chestRot)
  take(p.rHand)
  take(p.rPole)
  take(p.lHand)
  p.lAttach = a[i++]
  take(p.lPole)
  take(p.racketDir)
  take(p.racketNormal)
  take(p.lFoot.p)
  p.lFoot.turn = a[i++]
  p.lFoot.heel = a[i++]
  take(p.rFoot.p)
  p.rFoot.turn = a[i++]
  p.rFoot.heel = a[i++]
}

export function emptyPose(): Pose {
  return JSON.parse(JSON.stringify(READY)) as Pose
}

/** channel offsets inside a flattened pose (see `flatten`) */
const CH_L_ATTACH = 18
const CH_FEET = 28 // lFoot + rFoot, 28..37

/**
 * Channels that must never overshoot: the feet (a planted foot may not drift
 * between two identical keys, a heel may not dip below the floor) and the
 * left-hand attach blend (0..2). Everything else uses limited Bessel tangents so
 * the hands and trunk keep their speed through a key instead of braking into it.
 */
const isMonotone = (c: number) => c === CH_L_ATTACH || c >= CH_FEET

/** author-frame racket orientation as a quaternion [x, y, z, w]: y = handle → tip, z = string face */
function racketQuat(dir: V3, normal: V3, out: Float64Array, o: number) {
  const d = new Vector3(...dir).normalize()
  const n = new Vector3(...normal)
  n.addScaledVector(d, -n.dot(d))
  if (n.lengthSq() < 1e-8) n.set(0, 0, 1).addScaledVector(d, -d.z)
  n.normalize()
  const x = new Vector3().crossVectors(d, n)
  const q = new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(x, d, n))
  out[o] = q.x
  out[o + 1] = q.y
  out[o + 2] = q.z
  out[o + 3] = q.w
}

/**
 * Bessel tangent (the slope of the parabola through three neighbouring keys,
 * which stays accurate when keys are unevenly spaced) limited to three times
 * the smaller adjacent slope so the hand cannot overshoot next to a cluster of
 * close keys. Unlike a monotone tangent it is not zeroed at an extremum, so
 * the hand keeps moving through the top of the backswing instead of stopping.
 */
function besselLimited(vals: Float64Array, stride: number, c: number, i: number, h0: number, h1: number) {
  const d0 = (vals[i * stride + c] - vals[(i - 1) * stride + c]) / h0
  const d1 = (vals[(i + 1) * stride + c] - vals[i * stride + c]) / h1
  let m = (h1 * d0 + h0 * d1) / (h0 + h1)
  if (d0 * d1 > 0) {
    const lim = 3 * Math.min(Math.abs(d0), Math.abs(d1))
    if (Math.abs(m) > lim) m = Math.sign(m) * lim
  }
  return m
}

const qTmp = new Quaternion()
const vTmp = new Vector3()

/**
 * Keyframe sampler. Cubic Hermite per channel: limited Bessel tangents for the
 * upper body (Bessel, see `besselLimited`: C1-continuous speed, arcs instead of polylines), Fritsch–Carlson
 * monotone tangents for the feet. The racket's orientation is interpolated as a
 * quaternion, so the face turns along the shortest arc and never collapses or
 * flips when the handle and face vectors pass close to each other.
 */
export class PoseTrack {
  readonly times: number[]
  private values: Float64Array
  private tangents: Float64Array
  private quats: Float64Array
  private qTangents: Float64Array
  private scratch = new Float64Array(N)

  constructor(keys: Keyframe[]) {
    const n = keys.length
    this.times = keys.map((k) => k.t)
    this.values = new Float64Array(n * N)
    this.tangents = new Float64Array(n * N)
    this.quats = new Float64Array(n * 4)
    this.qTangents = new Float64Array(n * 4)
    keys.forEach((k, i) => {
      flatten(k.pose, this.values, i * N)
      racketQuat(k.pose.racketDir, k.pose.racketNormal, this.quats, i * 4)
      // keep consecutive quaternions in the same hemisphere so interpolation takes the short way round
      if (i > 0) {
        let dot = 0
        for (let j = 0; j < 4; j++) dot += this.quats[i * 4 + j] * this.quats[(i - 1) * 4 + j]
        if (dot < 0) for (let j = 0; j < 4; j++) this.quats[i * 4 + j] *= -1
      }
    })

    const t = this.times
    for (let i = 1; i < n - 1; i++) {
      const h0 = t[i] - t[i - 1]
      const h1 = t[i + 1] - t[i]
      for (let c = 0; c < N; c++) {
        if (!isMonotone(c)) {
          this.tangents[i * N + c] = besselLimited(this.values, N, c, i, h0, h1)
          continue
        }
        const d0 = (this.values[i * N + c] - this.values[(i - 1) * N + c]) / h0
        const d1 = (this.values[(i + 1) * N + c] - this.values[i * N + c]) / h1
        if (d0 * d1 <= 0) continue
        const w1 = 2 * h1 + h0
        const w2 = h1 + 2 * h0
        this.tangents[i * N + c] = (w1 + w2) / (w1 / d0 + w2 / d1)
      }
      for (let c = 0; c < 4; c++) this.qTangents[i * 4 + c] = besselLimited(this.quats, 4, c, i, h0, h1)
    }
  }

  get duration() {
    return this.times[this.times.length - 1]
  }

  sample(time: number, out: Pose): Pose {
    const t = this.times
    const n = t.length
    const x = Math.min(Math.max(time, t[0]), t[n - 1])
    let i = 0
    while (i < n - 2 && x > t[i + 1]) i++
    const h = t[i + 1] - t[i]
    const s = h > 0 ? (x - t[i]) / h : 0
    const s2 = s * s
    const s3 = s2 * s
    const h00 = 2 * s3 - 3 * s2 + 1
    const h10 = s3 - 2 * s2 + s
    const h01 = -2 * s3 + 3 * s2
    const h11 = s3 - s2
    const herm = (vals: Float64Array, tans: Float64Array, stride: number, c: number) =>
      h00 * vals[i * stride + c] + h10 * h * tans[i * stride + c] + h01 * vals[(i + 1) * stride + c] + h11 * h * tans[(i + 1) * stride + c]
    for (let c = 0; c < N; c++) this.scratch[c] = herm(this.values, this.tangents, N, c)
    unflatten(this.scratch, out)

    qTmp.set(herm(this.quats, this.qTangents, 4, 0), herm(this.quats, this.qTangents, 4, 1), herm(this.quats, this.qTangents, 4, 2), herm(this.quats, this.qTangents, 4, 3)).normalize()
    vTmp.set(0, 1, 0).applyQuaternion(qTmp)
    out.racketDir[0] = vTmp.x
    out.racketDir[1] = vTmp.y
    out.racketDir[2] = vTmp.z
    vTmp.set(0, 0, 1).applyQuaternion(qTmp)
    out.racketNormal[0] = vTmp.x
    out.racketNormal[1] = vTmp.y
    out.racketNormal[2] = vTmp.z
    return out
  }
}
