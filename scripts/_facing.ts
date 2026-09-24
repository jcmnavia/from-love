import { readFileSync } from 'node:fs'
import { Vector3, Quaternion } from 'three'
import { Rig } from '../src/engine/rig/rig'
import { ClipTrack, type ClipData } from '../src/engine/rig/clip'
for (const id of process.argv.slice(2)) {
  const clip = JSON.parse(readFileSync(`public/motion/${id}.json`, 'utf8')) as ClipData
  const rig = new Rig(); const tr = new ClipTrack(clip, rig)
  const out: string[] = []
  for (const t of [0, clip.events.backswingEnd, clip.events.contact, clip.events.finish]) {
    tr.apply(rig, t)
    const q = rig.delta(rig.find('Spine2'), new Quaternion())
    const f = new Vector3(0, 0, -1).applyQuaternion(q) // world forward at rest is −z (toward the net)
    const L = rig.pos[rig.find('LeftArm')], R = rig.pos[rig.find('RightArm')]
    out.push(`t${t.toFixed(2)} chest faces author (x ${f.x.toFixed(2)}, z ${(-f.z).toFixed(2)}) ${(Math.atan2(f.x, -f.z) * 57.3).toFixed(0)}° (+ = toward the right); right shoulder author z ${(-R.z).toFixed(2)} vs left ${(-L.z).toFixed(2)}`)
  }
  console.log(id + '\n  ' + out.join('\n  '))
}
