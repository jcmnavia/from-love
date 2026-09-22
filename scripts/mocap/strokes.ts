/**
 * Stroke detection and scoring on cleaned Tennis-MoCap takes (shared by select.ts and retarget.ts).
 * Detection is the analyze.ts logic (peaks of the driving wrist's speed, ≥ 1.2 s apart, above 45 % of the take's
 * max) run on the repaired + filtered channels instead of a median-filtered copy.
 */
import { readdirSync } from 'node:fs'
import { Vector3 } from 'three'
import { RAW_DIR, cleanTake, fkAll, speeds, type Cleaned } from './source'

export interface StrokeSpec {
  id: string
  take: string
  /** the wrist that drives the stroke (right-handed player) */
  drive: 'RightWrist' | 'LeftWrist'
  pre: number
  post: number
  /**
   * contact time relative to the drive wrist's peak speed (s). Forehand: peak wrist linear velocity is −37 ± 5 ms
   * before impact (Landlinger 2010). Two-handed backhand: the top (left) hand peaks at impact (Stępień 2011).
   * Serve / smash: shoulder IR and wrist flexion peak at or just before impact, so contact is at / just after the
   * hand-speed peak; refined to the wrist's highest point within 0…40 ms after the peak (`contactAtTop`). Volleys: a short punch with the hand held firm through contact; +10 ms.
   */
  contactLag: number
  /** overhead strokes: contact is where the extended arm peaks in height, searched 0…40 ms after the speed peak */
  contactAtTop?: boolean
}

export const SPECS: StrokeSpec[] = [
  { id: 'forehand', take: 'Derecha', drive: 'RightWrist', pre: 1.1, post: 0.8, contactLag: 0.035 },
  { id: 'backhand-two-handed', take: 'Reves', drive: 'LeftWrist', pre: 1.1, post: 0.8, contactLag: 0 },
  { id: 'serve', take: 'Servicio', drive: 'RightWrist', pre: 1.9, post: 0.9, contactLag: 0, contactAtTop: true },
  { id: 'smash', take: 'Remate', drive: 'RightWrist', pre: 1.4, post: 0.9, contactLag: 0, contactAtTop: true },
  { id: 'forehand-volley', take: 'VDerecha', drive: 'RightWrist', pre: 1.1, post: 0.8, contactLag: 0.01 },
  { id: 'backhand-volley', take: 'VReves', drive: 'RightWrist', pre: 1.1, post: 0.8, contactLag: 0.01 },
]

export const PLAYERS: Record<string, { sex: 'M' | 'F' }> = {
  jarua: { sex: 'M' }, jduribe: { sex: 'M' }, jgacosta: { sex: 'M' }, lvargas: { sex: 'F' },
}

export function takesFor(spec: StrokeSpec): string[] {
  const re = new RegExp(`^[a-z]+_${spec.take}(_\\d+seg)?\\.bvh$`)
  return readdirSync(RAW_DIR).filter((f) => re.test(f)).sort()
}

export interface Stroke {
  spec: StrokeSpec
  file: string
  player: string
  /** frame of peak drive-wrist speed (100 Hz) */
  peak: number
  /** contact time in the take (s) */
  contact: number
  /** clip window in the take (s) */
  t0: number
  t1: number
  vPeak: number
  /** peak drive-wrist speed before filtering (glitches repaired) */
  vPeakUnfiltered: number
  /** repaired frames inside the window */
  repairedFrames: number
  /** frames still flagged after cleaning inside the window */
  residualFrames: number
  /** RMS third difference of the unfiltered drive wrist over the window, mm/frame³ */
  noise: number
  /** RMS distance (m) of this stroke's wrists-relative-to-hips trajectory from the take's median stroke */
  atypical: number
  /** window fits inside the take (and away from its garbage end) */
  inRange: boolean
  /** horizontal direction of the drive wrist at contact (unit, lab frame) */
  hitDir: Vector3
  /** angle (deg) between hitDir and the take's net direction */
  offLine: number
  score: number
}

const cache = new Map<string, Cleaned>()
export function cleaned(file: string) {
  if (!cache.has(file)) cache.set(file, cleanTake(file))
  return cache.get(file)!
}

/** mean speed over all joints (m/s): the "calm stance" measure */
export function bodySpeed(c: Cleaned): number[] {
  const n = c.poses.length, J = c.clean.joints.length
  const out = new Array(n).fill(0)
  for (let j = 0; j < J; j++) {
    const sp = speeds(c.poses.map((p) => p.P[j]), c.clean.fps)
    for (let f = 0; f < n; f++) out[f] += sp[f] / J
  }
  return out
}

export function detect(spec: StrokeSpec, file: string): Stroke[] {
  const c = cleaned(file)
  const s = c.clean, fps = s.fps
  const J = (n: string) => s.joints.indexOf(n)
  const w = J(spec.drive), hips = J('Hips')
  const sp = speeds(c.poses.map((p) => p.P[w]), fps)
  const lo = 10, hi = s.frames - 12
  let max = 0
  for (let f = lo; f < hi; f++) max = Math.max(max, sp[f])
  const peaks: number[] = []
  for (let f = lo + 3; f < hi - 3; f++) {
    if (sp[f] < 0.45 * max || sp[f] < Math.max(...sp.slice(f - 3, f + 4))) continue
    if (peaks.length && f - peaks.at(-1)! < 1.2 * fps) {
      if (sp[f] > sp[peaks.at(-1)!]) peaks[peaks.length - 1] = f
      continue
    }
    peaks.push(f)
  }
  const rawPoses = fkAll(c.repaired)
  const spRaw = speeds(rawPoses.map((p) => p.P[w]), fps)
  const body = bodySpeed(c)
  const player = file.split('_')[0]

  // typical-ness: wrists relative to hips at contact + k × 0.1 s
  const feat = (f: number) => {
    const v: number[] = []
    for (let k = -8; k <= 5; k++) {
      const g = Math.min(Math.max(f + k * 10, 0), s.frames - 1)
      const p = c.poses[g]
      for (const jn of ['RightWrist', 'LeftWrist']) {
        const d = p.P[J(jn)].clone().sub(p.P[hips])
        v.push(d.x, d.y, d.z)
      }
    }
    return v
  }
  const feats = peaks.map(feat)
  const median = feats[0]?.map((_, i) => {
    const col = feats.map((v) => v[i]).sort((a, b) => a - b)
    return col[col.length >> 1]
  })

  return peaks.map((pk, i) => {
    let top = pk
    if (spec.contactAtTop) for (let f = pk; f <= pk + 4; f++) if (c.poses[f].P[w].y > c.poses[top].P[w].y) top = f
    const contact = top / fps + spec.contactLag
    // calm-stance trim: search around the nominal ends for the lowest body speed (small pull toward nominal)
    const pick = (nominal: number, a: number, b: number) => {
      let best = nominal, cost = Infinity
      for (let t = nominal + a; t <= nominal + b + 1e-9; t += 0.01) {
        const f = Math.round(t * fps)
        if (f < 1 || f >= s.frames - 6) continue
        const k = body[f] + 0.4 * Math.abs(t - nominal)
        if (k < cost) { cost = k; best = t }
      }
      return Math.round(best * 100) / 100
    }
    const t0 = pick(contact - spec.pre, -0.2, 0.2)
    const t1 = pick(contact + spec.post, -0.15, 0.25)
    const f0 = Math.round(t0 * fps), f1 = Math.round(t1 * fps)
    let rep = 0, res = 0
    for (let f = Math.max(0, f0); f <= Math.min(s.frames - 1, f1); f++) { if (c.bad[f]) rep++; if (c.residual[f]) res++ }
    let jit = 0, n = 0
    for (let f = Math.max(3, f0); f <= Math.min(s.frames - 1, f1); f++) {
      const a = rawPoses[f].P[w], b = rawPoses[f - 1].P[w], cc = rawPoses[f - 2].P[w], d = rawPoses[f - 3].P[w]
      jit += a.clone().sub(b.clone().multiplyScalar(3)).add(cc.clone().multiplyScalar(3)).sub(d).lengthSq(); n++
    }
    let vr = 0
    for (let f = pk - 5; f <= pk + 5; f++) vr = Math.max(vr, spRaw[f] ?? 0)
    const fc = Math.round(contact * fps)
    const hit = c.poses[Math.min(fc + 1, s.frames - 1)].P[w].clone().sub(c.poses[Math.max(fc - 1, 0)].P[w])
    hit.y = 0
    hit.normalize()
    const atypical = Math.sqrt(feats[i].reduce((a, v, k) => a + (v - median[k]) ** 2, 0) / (feats[i].length / 3))
    return {
      spec, file, player, peak: pk, contact, t0, t1, vPeak: sp[pk], vPeakUnfiltered: vr, repairedFrames: rep, residualFrames: res,
      noise: Math.sqrt(jit / Math.max(n, 1)) * 1000, atypical, inRange: f0 >= 5 && f1 <= s.frames - 12, hitDir: hit, offLine: 0, score: 0,
    }
  })
}

/** All strokes of a type across the four players, scored and sorted best first. */
export function rank(spec: StrokeSpec): Stroke[] {
  const all = takesFor(spec).flatMap((f) => {
    const ss = detect(spec, f)
    const net = netDirection(ss)
    for (const s of ss) s.offLine = (Math.acos(Math.min(1, s.hitDir.dot(net))) * 180) / Math.PI
    return ss
  })
  const z = (get: (s: Stroke) => number) => {
    const v = all.map(get)
    const m = v.reduce((a, b) => a + b, 0) / v.length
    const sd = Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / v.length) || 1
    return (s: Stroke) => (get(s) - m) / sd
  }
  const zv = z((s) => s.vPeak), zn = z((s) => s.noise), za = z((s) => s.atypical)
  for (const s of all) {
    s.score =
      1.0 * zv(s) - 0.8 * zn(s) - 1.2 * za(s) - s.offLine / 30
      - (s.repairedFrames > 0 ? 1.5 : 0) - (s.residualFrames > 0 ? 5 : 0)
      - (PLAYERS[s.player]?.sex === 'F' ? 1.0 : 0) - (s.inRange ? 0 : 10)
  }
  return all.sort((a, b) => b.score - a.score)
}

/**
 * Net direction of a take (lab frame, horizontal unit vector): the mean horizontal drive-wrist direction at contact
 * over every stroke in the take. Players hit toward the same target through a take, and averaging removes the
 * per-stroke swing-path variation (inside-out forehands, slice volleys).
 */
export function netDirection(strokes: Stroke[]): Vector3 {
  const m = new Vector3()
  for (const s of strokes) m.add(s.hitDir)
  m.setY(0).normalize()
  // one pass of outlier rejection (strokes hit more than 45° off the mean are mis-detections or other shots)
  const k = new Vector3()
  for (const s of strokes) if (s.hitDir.dot(m) > Math.SQRT1_2) k.add(s.hitDir)
  return k.lengthSq() ? k.setY(0).normalize() : m
}
