import { readdirSync } from 'node:fs'
import { cleaned } from './mocap/strokes'
import { RAW_DIR } from './mocap/source'

import { SPECS, detect, takesFor } from './mocap/strokes'
console.log('--- hops vs next contact')
for (const spec of SPECS) {
  for (const file of takesFor(spec)) {
    const contacts = detect(spec, file).map((s) => s.contact)
    const c = cleaned(file), s = c.clean
    const J = (n: string) => s.joints.indexOf(n)
    const ly = c.poses.map((p) => p.P[J('LeftAnkle')].y), ry = c.poses.map((p) => p.P[J('RightAnkle')].y)
    const lmin = [...ly].sort((a, b) => a - b)[Math.floor(ly.length * 0.05)], rmin = [...ry].sort((a, b) => a - b)[Math.floor(ry.length * 0.05)]
    let f = 0
    const out: string[] = []
    while (f < s.frames) {
      if (ly[f] - lmin > 0.035 && ry[f] - rmin > 0.035) {
        let g = f
        while (g < s.frames && ly[g] - lmin > 0.02 && ry[g] - rmin > 0.02) g++
        const t = f / s.fps, dur = (g - f) / s.fps
        const next = contacts.find((x) => x > t)
        if (dur > 0.05 && dur < 0.4 && next !== undefined && next - t < 1.6) {
          let peak = 0
          for (let k = f; k < g; k++) peak = Math.max(peak, Math.min(ly[k] - lmin, ry[k] - rmin))
          out.push(`${t.toFixed(2)} (${(dur * 1000).toFixed(0)}ms ${(peak * 100).toFixed(1)}cm) → contact +${(next - t).toFixed(2)}`)
        }
        f = g
      } else f++
    }
    if (out.length) console.log(spec.id.padEnd(20), file.padEnd(26), out.join(' | '))
  }
}
