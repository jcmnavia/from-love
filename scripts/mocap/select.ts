/**
 * Splits every raw take into strokes, scores them, prints a ranked table per stroke id and writes the chosen
 * exemplar per stroke to scripts/mocap/selection.json (read by retarget.ts).
 *
 *   npx -y tsx scripts/mocap/select.ts            # top 8 per stroke
 *   npx -y tsx scripts/mocap/select.ts --all      # every detected stroke
 *   npx -y tsx scripts/mocap/select.ts --md       # markdown tables (for docs/research/mocap-pipeline.md)
 *
 * Score (higher is better), z-scores within a stroke type:
 *   + z(peak drive-wrist speed) − 0.8 z(marker noise) − 1.2 z(atypical vs the player's other strokes of the type)
 *   − off-line° / 30 − 1.5 if any frame in the window needed glitch repair − 5 if any residual glitch
 *   − 1 for the female player (prefer the high-performance males) − 10 if the window does not fit in the take.
 */
import { writeFileSync } from 'node:fs'
import { Vector3 } from 'three'
import { SPECS, cleaned, detect, netDirection, rank, takesFor, type Stroke, type StrokeSpec } from './strokes'
import { speeds } from './source'
import { SELECTION, type Selection } from './selection'

const deg = (v: Vector3) => (Math.atan2(v.x, v.z) * 180) / Math.PI

/** handedness from the player's forehand take: which wrist moves more */
function handedness(player: string): 'R' | 'L' {
  const file = takesFor(SPECS[0]).find((f) => f.startsWith(player + '_'))
  if (!file) return 'R'
  const c = cleaned(file)
  const sum = (j: string) => speeds(c.poses.map((p) => p.P[c.clean.joints.indexOf(j)]), 100).reduce((a, b) => a + b, 0)
  return sum('RightWrist') >= sum('LeftWrist') ? 'R' : 'L'
}

/**
 * Net direction for the chosen stroke. Ground strokes, serve and smash: the take's mean horizontal drive-wrist
 * direction at contact (the hand travels along the target line at impact). Volleys: the punch goes across the body
 * (forehand volleys drift to the left, backhand volleys to the right), so the forehand- and backhand-volley take
 * directions of the same player are averaged, which cancels the bias.
 */
function netFor(spec: StrokeSpec, s: Stroke): { net: Vector3; method: string } {
  const own = netDirection(detect(spec, s.file))
  if (spec.id.endsWith('volley')) {
    const other = SPECS.find((x) => x.id === (spec.id === 'forehand-volley' ? 'backhand-volley' : 'forehand-volley'))!
    const f = takesFor(other).find((t) => t.startsWith(s.player + '_'))
    if (f) {
      const o = netDirection(detect(other, f))
      return { net: own.clone().add(o).normalize(), method: `mean of ${s.file} (${deg(own).toFixed(0)}°) and ${f} (${deg(o).toFixed(0)}°) contact-hand directions` }
    }
  }
  return { net: own, method: `mean contact-hand direction over ${s.file} (${deg(own).toFixed(0)}°)` }
}

function row(s: Stroke, i: number) {
  return [
    String(i + 1), s.file.replace('.bvh', ''), s.contact.toFixed(2), `${s.t0.toFixed(2)}–${s.t1.toFixed(2)}`,
    s.vPeak.toFixed(2), s.vPeakUnfiltered.toFixed(2), String(s.repairedFrames), s.noise.toFixed(2), s.atypical.toFixed(3),
    s.offLine.toFixed(0), s.score.toFixed(2),
  ]
}
const HEAD = ['#', 'take', 'contact s', 'window s', 'v m/s', 'v raw', 'repaired', 'noise', 'atypical m', 'off-line °', 'score']

function main() {
  const all = process.argv.includes('--all'), md = process.argv.includes('--md')
  const out: Selection[] = []
  for (const spec of SPECS) {
    const ranked = rank(spec)
    const top = ranked.slice(0, all ? ranked.length : 8)
    if (md) {
      console.log(`\n**${spec.id}** (${ranked.length} strokes detected in ${takesFor(spec).length} takes)\n`)
      console.log(`| ${HEAD.join(' | ')} |\n| ${HEAD.map(() => '---').join(' | ')} |`)
      top.forEach((s, i) => console.log(`| ${row(s, i).join(' | ')} |`))
    } else {
      console.log(`\n== ${spec.id}  (${ranked.length} strokes in ${takesFor(spec).join(', ')})`)
      console.log(HEAD.map((h, i) => h.padEnd([3, 22, 10, 13, 7, 7, 9, 7, 11, 11, 6][i])).join(''))
      top.forEach((s, i) => console.log(row(s, i).map((c, k) => c.padEnd([3, 22, 10, 13, 7, 7, 9, 7, 11, 11, 6][k])).join('')))
    }
    const best = ranked[0]
    const { net, method } = netFor(spec, best)
    const mirror = handedness(best.player) === 'L'
    out.push({
      id: spec.id, file: best.file, player: best.player, peak: best.peak, contact: +best.contact.toFixed(3),
      window: [best.t0, best.t1], net: [+net.x.toFixed(5), +net.z.toFixed(5)], netMethod: method, mirror,
      vPeak: +best.vPeak.toFixed(2), score: +best.score.toFixed(2),
    })
    if (!md) console.log(`-> ${best.file} contact ${best.contact.toFixed(2)} s, window ${best.t0}–${best.t1} s, net ${deg(net).toFixed(0)}° (${method})${mirror ? ', MIRRORED (left-handed)' : ''}`)
  }
  writeFileSync(SELECTION, JSON.stringify(out, null, 2) + '\n')
  if (!md) console.log(`\nwrote ${SELECTION}`)
}

main()
