/**
 * Extracts the rest skeleton of public/models/player.glb into
 * src/engine/rig/skeleton.json so the engine can pose the body with forward
 * kinematics (swing trail, ball contact, HUD) without loading the mesh.
 *
 *   npx tsx scripts/rig-skeleton.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { Matrix4, Quaternion, Vector3 } from 'three'

const root = new URL('..', import.meta.url).pathname
const buf = readFileSync(root + 'public/models/player.glb')
const gltf = JSON.parse(buf.slice(20, 20 + buf.readUInt32LE(12)).toString())
const nodes: { name: string; children?: number[]; translation?: number[]; rotation?: number[]; scale?: number[] }[] = gltf.nodes
const parent: number[] = []
nodes.forEach((n, i) => n.children?.forEach((c) => (parent[c] = i)))
const local = (i: number) =>
  new Matrix4().compose(new Vector3(...(nodes[i].translation ?? [0, 0, 0])), new Quaternion(...(nodes[i].rotation ?? [0, 0, 0, 1])), new Vector3(...(nodes[i].scale ?? [1, 1, 1])))
const world = (i: number): Matrix4 => (parent[i] === undefined ? local(i) : world(parent[i]).multiply(local(i)))

const joints: number[] = gltf.skins[0].joints
const hips = joints.find((j) => /Hips$/.test(nodes[j].name))!
const round = (v: number[]) => v.map((x) => Math.round(x * 1e6) / 1e6)
const bones = joints.map((j) => ({
  name: nodes[j].name,
  parent: joints.indexOf(parent[j]),
  t: round(nodes[j].translation ?? [0, 0, 0]),
  r: round(nodes[j].rotation ?? [0, 0, 0, 1]),
  s: round(nodes[j].scale ?? [1, 1, 1]),
}))
const armature = parent[hips] === undefined ? new Matrix4() : world(parent[hips])
writeFileSync(
  root + 'src/engine/rig/skeleton.json',
  JSON.stringify({ source: 'public/models/player.glb (Microsoft Rocketbox Sports_Male_04, MIT)', armature: round(armature.elements), bones }),
)
const hw = new Vector3().setFromMatrixPosition(world(hips))
console.log(`bones ${bones.length}, hips at ${hw.toArray().map((v) => v.toFixed(3))}, armature scale ${new Vector3().setFromMatrixScale(armature).x.toFixed(4)}`)
