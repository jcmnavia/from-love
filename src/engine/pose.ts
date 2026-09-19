import type { Keyframe, Pose, PoseInput } from './types'

export const READY: Pose = {
  pelvis: [0, 0.9, 0],
  pelvisRot: [0, 6, 0],
  chestRot: [0, 14, 0],
  rHand: [0.1, 1.02, 0.34],
  rPole: [0.5, -0.8, -0.3],
  lHand: [-0.1, 1.08, 0.4],
  lAttach: 2,
  lPole: [-0.5, -0.8, -0.3],
  racketDir: [-0.25, 0.5, 0.83],
  racketNormal: [-0.95, 0, -0.3],
  lFoot: { p: [-0.3, 0, 0.02], turn: -12, heel: 8 },
  rFoot: { p: [0.3, 0, 0.02], turn: 12, heel: 8 },
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

/**
 * Monotone cubic (Fritsch–Carlson) sampler over a keyframe list. Monotone so a
 * planted foot never drifts between two identical keys, and every local
 * extremum (top of the backswing, end of the follow-through) eases naturally.
 */
export class PoseTrack {
  readonly times: number[]
  private values: Float64Array
  private tangents: Float64Array
  private scratch = new Float64Array(N)

  constructor(keys: Keyframe[]) {
    const n = keys.length
    this.times = keys.map((k) => k.t)
    this.values = new Float64Array(n * N)
    this.tangents = new Float64Array(n * N)
    keys.forEach((k, i) => flatten(k.pose, this.values, i * N))

    const t = this.times
    for (let c = 0; c < N; c++) {
      for (let i = 1; i < n - 1; i++) {
        const h0 = t[i] - t[i - 1]
        const h1 = t[i + 1] - t[i]
        const d0 = (this.values[i * N + c] - this.values[(i - 1) * N + c]) / h0
        const d1 = (this.values[(i + 1) * N + c] - this.values[i * N + c]) / h1
        if (d0 * d1 <= 0) continue
        const w1 = 2 * h1 + h0
        const w2 = h1 + 2 * h0
        this.tangents[i * N + c] = (w1 + w2) / (w1 / d0 + w2 / d1)
      }
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
    const a = i * N
    const b = (i + 1) * N
    for (let c = 0; c < N; c++) {
      this.scratch[c] =
        h00 * this.values[a + c] +
        h10 * h * this.tangents[a + c] +
        h01 * this.values[b + c] +
        h11 * h * this.tangents[b + c]
    }
    unflatten(this.scratch, out)
    return out
  }
}
