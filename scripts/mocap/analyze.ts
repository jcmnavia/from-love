/**
 * Splits every raw take into individual strokes and scores them, so the best
 * exemplar per stroke type can be picked for retargeting.
 *   npx tsx scripts/mocap/analyze.ts
 */
import { readdirSync } from 'node:fs'
import { Vector3 } from 'three'
import { loadTake } from './bvh'

const dir = new URL('../../data/mocap-raw/', import.meta.url).pathname
for (const file of readdirSync(dir).filter((f) => f.endsWith('.bvh')).sort()) {
  const take = loadTake(dir + file)
  const J = (n: string) => take.joints.indexOf(n)
  const wr = J('RightWrist'), wl = J('LeftWrist'), hips = J('Hips'), head = J('Head')
  // marker glitches show up as single-frame teleports; a 7-frame median per axis removes them
  const med = (j: number) =>
    take.positions.map((_, f) => {
      const win = take.positions.slice(Math.max(0, f - 3), f + 4).map((p) => p[j])
      const m = (k: 'x' | 'y' | 'z') => win.map((v) => v[k]).sort((a, b) => a - b)[win.length >> 1]
      return new Vector3(m('x'), m('y'), m('z'))
    })
  const glitches = (j: number) => take.positions.filter((p, f) => f && p[j].distanceTo(take.positions[f - 1][j]) > 0.12).length
  const speed = (j: number) => {
    const m = med(j)
    return m.map((p, f) => (f ? p.distanceTo(m[f - 1]) * take.fps : 0))
  }
  const sr = speed(wr), sl = speed(wl)
  const sum = (a: number[]) => a.reduce((x, y) => x + y, 0)
  const hand = sum(sr) >= sum(sl) ? 'R' : 'L'
  const s = hand === 'R' ? sr : sl
  const w = hand === 'R' ? wr : wl
  const max = Math.max(...s)
  // peaks: local maxima above 45 % of the take's max, at least 1.2 s apart
  const peaks: number[] = []
  for (let f = 3; f < s.length - 3; f++) {
    if (s[f] < 0.45 * max || s[f] < Math.max(...s.slice(f - 3, f + 4))) continue
    if (peaks.length && f - peaks.at(-1)! < 1.2 * take.fps) {
      if (s[f] > s[peaks.at(-1)!]) peaks[peaks.length - 1] = f
      continue
    }
    peaks.push(f)
  }
  const rows = peaks.map((f) => {
    const p = take.positions[f]
    const handsGap = p[wr].distanceTo(p[wl])
    // marker noise: RMS of the third difference of the wrist over ±0.5 s, relative to peak speed
    let jit = 0, n = 0
    for (let k = f - 50; k < f + 50; k++) {
      if (k < 3 || k >= take.frames) continue
      const a = take.positions[k][w], b = take.positions[k - 1][w], c = take.positions[k - 2][w], d = take.positions[k - 3][w]
      const j3 = a.clone().sub(b.clone().multiplyScalar(3)).add(c.clone().multiplyScalar(3)).sub(d)
      jit += j3.lengthSq(); n++
    }
    return `${(f / take.fps).toFixed(2)}s v=${s[f].toFixed(1)} gap=${handsGap.toFixed(2)} wristY=${p[w].y.toFixed(2)} headY=${p[head].y.toFixed(2)} noise=${(Math.sqrt(jit / n) * 1000).toFixed(1)}`
  })
  const hipY = take.positions[0][hips].y
  const bad = take.joints.reduce((n, _, j) => n + glitches(j), 0)
  console.log(`${take.name.padEnd(24)} hand=${hand} strokes=${peaks.length} max=${max.toFixed(1)}m/s glitchFrames=${bad} hipY0=${hipY.toFixed(2)}`)
  for (const r of rows) console.log('    ' + r)
}
