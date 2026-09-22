/**
 * Validates public/motion/*.json two ways:
 *  1. our own FK of the Rocketbox rest skeleton (GLB node TRS) with the clip's rotations, against the cleaned source
 *     segment directions (same net rotation G): angular error per mapped segment;
 *  2. the runtime that will play the clips (src/engine/rig: Rig + ClipTrack, studio world = rotY(180°) · model):
 *     orientation sanity checks, peak hand speed, hips height, foot sliding while planted.
 *
 *   npx -y tsx scripts/mocap/validate.ts [--md]
 */
import { readFileSync, statSync } from 'node:fs'
import { Quaternion, Vector3 } from 'three'
import { Rig } from '../../src/engine/rig/rig'
import { ClipTrack, type ClipData } from '../../src/engine/rig/clip'
import { AIM_CHILD, pose, posOf } from './rig'
import { MAP, OUT_DIR, loadSelection, mirrorSrc, rigInfo, rotY, srcDir, toModel } from './retarget'
import { cleaned } from './strokes'
import { fk, fkAll, speeds } from './source'

const md = process.argv.includes('--md')
const info = rigInfo()
const rows: string[][] = []
let failures = 0
const fail = (msg: string) => { failures++; console.log('  FAIL ' + msg) }

for (const sel of loadSelection()) {
  const path = `${OUT_DIR}${sel.id}.json`
  const text = readFileSync(path, 'utf8')
  const clip = JSON.parse(text) as ClipData
  const size = statSync(path).size
  const nan = [...clip.hips, ...clip.rot].filter((v) => !Number.isFinite(v)).length
  const nb = clip.bones.length
  if (clip.rot.length !== 4 * nb * clip.frames || clip.hips.length !== 3 * clip.frames) fail(`${sel.id}: array lengths`)
  if (nan) fail(`${sel.id}: ${nan} non-finite values`)

  // ---- 1. direction error vs the cleaned source
  const c = cleaned(sel.file)
  const src = sel.mirror ? mirrorSrc(c.clean) : c.clean
  const poses = sel.mirror ? fkAll(src) : c.poses
  const G = rotY(sel.net)
  const errs: number[] = []
  const ours: Vector3[][] = []
  const perBone = new Map<string, number>()
  for (let k = 0; k < clip.frames; k++) {
    const local = new Map<string, Quaternion>()
    for (let b = 0; b < nb; b++) {
      const o = (k * nb + b) * 4
      local.set(clip.bones[b], new Quaternion(clip.rot[o], clip.rot[o + 1], clip.rot[o + 2], clip.rot[o + 3]).normalize())
    }
    const hips = toModel(new Vector3(clip.hips[k * 3], clip.hips[k * 3 + 1], clip.hips[k * 3 + 2]))
    const m = pose(info.rig, local, hips)
    const P = (n: string) => posOf(m[info.rig.index.get(`mixamorig:${n}`)!])
    ours.push(['Hips', 'Head', 'RightHand', 'LeftHand', 'LeftFoot', 'RightFoot'].map((n) => P(n).set(-P(n).x, P(n).y, -P(n).z)))
    // source pose at this output time (FK of the slerped channels would be exact; nearest-two lerp of directions is
    // within a fraction of a degree at 100 Hz)
    const u = (sel.window[0] + k / clip.fps) * src.fps
    const i = Math.floor(u), w = u - i
    const pa = poses[i], pb = poses[Math.min(i + 1, src.frames - 1)]
    for (const [bone, map] of Object.entries(MAP)) {
      if (bone === 'Hips' || bone === 'Spine' || bone === 'Spine1') continue
      const dt = P(AIM_CHILD[bone]).sub(P(bone)).normalize()
      const ds = srcDir(src, pa, map.aim).lerp(srcDir(src, pb, map.aim), w).normalize().applyQuaternion(G)
      const e = (Math.acos(Math.min(1, Math.max(-1, dt.dot(ds)))) * 180) / Math.PI
      errs.push(e)
      perBone.set(bone, Math.max(perBone.get(bone) ?? 0, e))
    }
  }
  const mean = errs.reduce((a, b) => a + b, 0) / errs.length
  const max = Math.max(...errs)
  const worst = [...perBone].sort((a, b) => b[1] - a[1])[0]

  // ---- 2. the runtime
  const rig = new Rig()
  const track = new ClipTrack(clip, rig)
  const I = (n: string) => rig.find(n)
  const hand: Vector3[] = [], hipsY: number[] = []
  const feet: Record<string, Vector3[]> = { Left: [], Right: [] }
  let headBelow = 0, fkGap = 0
  const sample = (t: number) => { track.apply(rig, t); return rig }
  for (let k = 0; k < clip.frames; k++) {
    sample(k / clip.fps)
    hand.push(rig.pos[I('RightHand')].clone())
    hipsY.push(rig.pos[I('Hips')].y)
    feet.Left.push(rig.pos[I('LeftFoot')].clone()); feet.Right.push(rig.pos[I('RightFoot')].clone())
    if (rig.pos[I('Head')].y <= rig.pos[I('Hips')].y + 0.3) headBelow++
    ;['Hips', 'Head', 'RightHand', 'LeftHand', 'LeftFoot', 'RightFoot'].forEach((n, q) => (fkGap = Math.max(fkGap, rig.pos[I(n)].distanceTo(ours[k][q]))))
  }
  if (fkGap > 0.002) fail(`${sel.id}: runtime FK differs from the GLB FK by ${(fkGap * 1000).toFixed(1)} mm`)
  if (headBelow) fail(`${sel.id}: head not above hips in ${headBelow} frames`)
  const hs = speeds(hand, clip.fps)
  let kpk = 0
  hs.forEach((v, k) => { if (v > hs[kpk]) kpk = k })
  // source peak for comparison (drive wrist, filtered and unfiltered)
  const w = src.joints.indexOf('RightWrist')
  const f0 = Math.round(sel.window[0] * 100), f1 = Math.round(sel.window[1] * 100)
  const sFilt = speeds(poses.slice(f0, f1 + 1).map((p) => p.P[w]), 100)
  const rawSrc = sel.mirror ? mirrorSrc(c.repaired) : c.repaired
  const sRaw = speeds(Array.from({ length: f1 - f0 + 1 }, (_, k) => fk(rawSrc, f0 + k).P[w]), 100)
  const filtDrop = 1 - Math.max(...sFilt) / Math.max(...sRaw)
  if (filtDrop > 0.1) fail(`${sel.id}: filtering drops the peak wrist speed by ${(filtDrop * 100).toFixed(1)} %`)

  // orientation checks in studio world (player faces −Z, right at +X)
  const at = (t: number) => {
    sample(t)
    const p = rig.pos[I('Hips')]
    const h = rig.pos[I('RightHand')].clone().sub(p), l = rig.pos[I('LeftHand')].clone().sub(p)
    return { h, l, head: rig.pos[I('Head')].y - p.y }
  }
  const c0 = at(clip.events.contact)
  const s0 = at(0)
  const checks: string[] = []
  checks.push(`t=0 hands rel. pelvis R (${s0.h.x.toFixed(2)}, ${s0.h.y.toFixed(2)}, ${s0.h.z.toFixed(2)}) L (${s0.l.x.toFixed(2)}, ${s0.l.y.toFixed(2)}, ${s0.l.z.toFixed(2)})`)
  if (sel.id === 'forehand' || sel.id === 'forehand-volley') {
    if (c0.h.x <= 0) fail(`${sel.id}: at contact the racket hand is not on the +X (right) side of the pelvis`)
    if (c0.h.z >= 0) fail(`${sel.id}: at contact the racket hand is not in front (−Z) of the pelvis`)
  }
  if (sel.id === 'backhand-two-handed' || sel.id === 'backhand-volley') {
    if (c0.h.z >= 0) fail(`${sel.id}: at contact the racket hand is not in front (−Z) of the pelvis`)
  }
  if (sel.id === 'serve' || sel.id === 'smash') {
    if (c0.h.y < c0.head) fail(`${sel.id}: at contact the racket hand is not above the head`)
  }
  checks.push(`runtime vs GLB FK ${(fkGap * 1000).toFixed(2)} mm`)
  checks.push(`contact hand rel. pelvis (x,y,z) = (${c0.h.x.toFixed(2)}, ${c0.h.y.toFixed(2)}, ${c0.h.z.toFixed(2)}) m`)
  // pelvis heading at contact, degrees from facing the net (positive = turned toward the player's left)
  sample(clip.events.contact)
  // delta is the change from the rest orientation, which faces the net (−Z in studio world)
  const fwdRest = new Vector3(0, 0, -1).applyQuaternion(rig.delta(I('Hips'), new Quaternion()))
  const pelvisDeg = (Math.atan2(-fwdRest.x, -fwdRest.z) * 180) / Math.PI

  // foot sliding while planted (horizontal drift from the plant's first frame)
  let slide = 0
  for (const side of ['Left', 'Right'] as const) {
    const iv = clip.feet?.[`${side.toLowerCase()}Planted` as 'leftPlanted'] ?? []
    for (const [a, b] of iv) {
      const ka = Math.round(a * clip.fps), kb = Math.round(b * clip.fps)
      for (let k = ka; k <= kb; k++) {
        const d = feet[side][k].clone().sub(feet[side][ka]); d.y = 0
        slide = Math.max(slide, d.length())
      }
    }
  }
  // the same measure on the (scaled) source ankles, to separate retarget-induced sliding from the take's own pivots
  let srcSlide = 0
  const scale = info.legLength / ((['Left', 'Right'] as const).reduce((a, sd) => a + src.offset[src.joints.indexOf(`${sd}Knee`)].length() + src.offset[src.joints.indexOf(`${sd}Ankle`)].length(), 0) / 2)
  for (const side of ['Left', 'Right'] as const) {
    const j = src.joints.indexOf(`${side}Ankle`)
    for (const [a, b] of clip.feet?.[`${side.toLowerCase()}Planted` as 'leftPlanted'] ?? []) {
      const pa = poses[Math.round((sel.window[0] + a) * 100)].P[j]
      for (let f = Math.round((sel.window[0] + a) * 100); f <= Math.round((sel.window[0] + b) * 100); f++) {
        const d = poses[f].P[j].clone().sub(pa); d.y = 0
        srcSlide = Math.max(srcSlide, d.length() * scale)
      }
    }
  }
  const e = clip.events
  if (!(e.start <= e.backswingEnd && e.backswingEnd <= e.forwardStart && e.forwardStart < e.contact && e.contact < e.finish && e.finish <= e.end)) fail(`${sel.id}: events out of order ${JSON.stringify(e)}`)

  const row = [
    sel.id, `${sel.file.replace('.bvh', '')} ${sel.window[0].toFixed(2)}–${sel.window[1].toFixed(2)} s`, String(clip.frames),
    mean.toFixed(2), `${max.toFixed(2)} (${worst[0]})`, `${hs[kpk].toFixed(2)} @ ${(kpk / clip.fps).toFixed(2)} s`,
    `${e.contact.toFixed(2)}`, `${(filtDrop * 100).toFixed(1)} %`, `${Math.min(...hipsY).toFixed(2)}–${Math.max(...hipsY).toFixed(2)}`,
    `${(slide * 100).toFixed(1)} (src ${(srcSlide * 100).toFixed(1)})`, `${pelvisDeg.toFixed(0)}°`, String(nan), `${(size / 1024).toFixed(0)} KB`,
  ]
  rows.push(row)
  if (!md) {
    console.log(`${sel.id}: dir err mean ${row[3]}°, max ${row[4]}°, peak R hand ${row[5]} (contact ${row[6]} s), filter drop ${row[7]}, hips y ${row[8]} m, plant slide ${row[9]} cm, pelvis at contact ${row[10]}, NaN ${nan}, ${row[12]}`)
    console.log(`  ${checks.join('; ')}; events ${JSON.stringify(e)}; plants L ${JSON.stringify(clip.feet?.leftPlanted)} R ${JSON.stringify(clip.feet?.rightPlanted)}`)
  }
}

if (md) {
  const H = ['clip', 'source', 'frames', 'dir err mean °', 'dir err max °', 'peak R-hand speed', 'contact s', 'filter peak drop', 'hips y m', 'max plant slide cm', 'pelvis vs net at contact', 'NaN', 'size']
  console.log(`| ${H.join(' | ')} |\n| ${H.map(() => '---').join(' | ')} |`)
  for (const r of rows) console.log(`| ${r.join(' | ')} |`)
}
console.log(failures ? `\n${failures} check(s) failed` : '\nall checks passed')
process.exitCode = failures ? 1 : 0
