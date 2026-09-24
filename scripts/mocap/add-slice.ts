/**
 * Adds a backhand-slice selection: slices come from the Tennis-MoCap low backhand volleys, the only captured
 * one-handed backhands (the Reves takes are all two-handed). A low backhand volley is a slice in miniature:
 * continental grip, high-to-low swing, shoulders kept sideways, free arm going back.
 *
 *   npx -y tsx scripts/mocap/add-slice.ts <file> <contact s> [id]
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { SPECS, detect, netDirection, takesFor } from './strokes'
import { SELECTION, type Selection } from './selection'

const [file, contactS, id = 'backhand-slice'] = process.argv.slice(2)
const spec = SPECS.find((s) => s.id === 'backhand-volley')!
const strokes = detect(spec, file)
const st = strokes.reduce((a, b) => (Math.abs(b.contact - Number(contactS)) < Math.abs(a.contact - Number(contactS)) ? b : a))
const player = file.split('_')[0]
const own = netDirection(strokes)
const fh = SPECS.find((s) => s.id === 'forehand-volley')!
const other = takesFor(fh).find((t) => t.startsWith(player + '_'))!
const net = own.clone().add(netDirection(detect(fh, other))).normalize()
const sel: Selection = {
  id, file, player, peak: st.peak, contact: +st.contact.toFixed(3),
  window: [+(st.contact - 1.05).toFixed(2), +(st.contact + 0.85).toFixed(2)],
  net: [+net.x.toFixed(5), +net.z.toFixed(5)], netMethod: `mean volley contact-hand directions of ${player}`,
  mirror: false, vPeak: +st.vPeak.toFixed(2), score: 0,
}
const all: Selection[] = JSON.parse(readFileSync(SELECTION, 'utf8')).filter((s: Selection) => s.id !== id)
all.push(sel)
writeFileSync(SELECTION, JSON.stringify(all, null, 2) + '\n')
console.log(sel)
