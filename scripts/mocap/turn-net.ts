/**
 * Rotates a selection's net direction by `deg` (the whole clip turns about the vertical). Used where the net
 * estimate from contact-hand directions is off, e.g. volleys hit across the body: the right correction makes the
 * player square to the net when at rest between shots.
 *
 *   npx -y tsx scripts/mocap/turn-net.ts <id> <deg>
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { SELECTION, type Selection } from './selection'

const [id, degS] = process.argv.slice(2)
const all: Selection[] = JSON.parse(readFileSync(SELECTION, 'utf8'))
const s = all.find((x) => x.id === id)
if (!s) throw new Error(`no selection ${id}`)
const a = (Number(degS) * Math.PI) / 180
const [x, z] = s.net
s.net = [+(x * Math.cos(a) - z * Math.sin(a)).toFixed(5), +(x * Math.sin(a) + z * Math.cos(a)).toFixed(5)]
s.netMethod += `; turned ${degS}° so the player is square to the net at rest`
writeFileSync(SELECTION, JSON.stringify(all, null, 2) + '\n')
console.log(id, 'net', s.net)
