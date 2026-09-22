/**
 * The Rocketbox target skeleton (public/models/player.glb = Rocketbox Sports_Male_04), read straight from the GLB JSON chunk (GLTFLoader cannot run in Node because the
 * file embeds textures). Model frame: metres, y up, the character faces +Z, its right side is at −X.
 */
import { readFileSync } from 'node:fs'
import { Matrix4, Quaternion, Vector3 } from 'three'

export const GLB = new URL('../../public/models/player.glb', import.meta.url).pathname

export interface RigNode {
  name: string
  parent: number
  t: Vector3
  r: Quaternion
  s: Vector3
}

export interface Rig {
  nodes: RigNode[]
  index: Map<string, number>
  /** rest world matrices (model frame, metres) */
  rest: Matrix4[]
}

export function loadRig(path = GLB): Rig {
  const buf = readFileSync(path)
  const j = JSON.parse(buf.subarray(20, 20 + buf.readUInt32LE(12)).toString())
  const parent: number[] = new Array(j.nodes.length).fill(-1)
  j.nodes.forEach((n: { children?: number[] }, i: number) => (n.children ?? []).forEach((c) => (parent[c] = i)))
  const nodes: RigNode[] = j.nodes.map((n: { name?: string; translation?: number[]; rotation?: number[]; scale?: number[] }, i: number) => ({
    name: n.name ?? `node${i}`,
    parent: parent[i],
    t: new Vector3(...(n.translation ?? [0, 0, 0])),
    r: new Quaternion(...(n.rotation ?? [0, 0, 0, 1])),
    s: new Vector3(...(n.scale ?? [1, 1, 1])),
  }))
  const index = new Map(nodes.map((n, i) => [n.name, i]))
  const rig: Rig = { nodes, index, rest: [] }
  rig.rest = pose(rig, new Map())
  return rig
}

/**
 * World matrices for a pose: `local` overrides node rotations by name, `hips` (model frame, metres) overrides the
 * Hips bone world position (converted into its parent's space). Nodes are in parent-before-child order in this file,
 * but we resolve recursively to be safe.
 */
export function pose(rig: Rig, local: Map<string, Quaternion>, hips?: Vector3): Matrix4[] {
  const out: (Matrix4 | undefined)[] = new Array(rig.nodes.length)
  const hipsIdx = rig.index.get('mixamorig:Hips')!
  const get = (i: number): Matrix4 => {
    if (out[i]) return out[i]!
    const n = rig.nodes[i]
    const pm = n.parent >= 0 ? get(n.parent) : new Matrix4()
    let t = n.t
    if (i === hipsIdx && hips) t = hips.clone().applyMatrix4(pm.clone().invert())
    const m = new Matrix4().compose(t, local.get(n.name) ?? n.r, n.s)
    return (out[i] = pm.clone().multiply(m))
  }
  for (let i = 0; i < rig.nodes.length; i++) get(i)
  return out as Matrix4[]
}

export const posOf = (m: Matrix4) => new Vector3().setFromMatrixPosition(m)
export const rotOf = (m: Matrix4) => {
  const p = new Vector3(), q = new Quaternion(), s = new Vector3()
  m.decompose(p, q, s)
  return q
}

/** The bones the clips drive (fingers, toes and face stay at rest). */
export const BONES = [
  'Hips', 'Spine', 'Spine1', 'Spine2', 'Neck', 'Head',
  'LeftShoulder', 'LeftArm', 'LeftForeArm', 'LeftHand',
  'RightShoulder', 'RightArm', 'RightForeArm', 'RightHand',
  'LeftUpLeg', 'LeftLeg', 'LeftFoot',
  'RightUpLeg', 'RightLeg', 'RightFoot',
].map((b) => `mixamorig:${b}`)

/** child that defines each bone's aim axis */
export const AIM_CHILD: Record<string, string> = {
  Hips: 'Spine', Spine: 'Spine1', Spine1: 'Spine2', Spine2: 'Neck', Neck: 'Head', Head: 'HeadTop_End',
  LeftShoulder: 'LeftArm', LeftArm: 'LeftForeArm', LeftForeArm: 'LeftHand', LeftHand: 'LeftHandMiddle1',
  RightShoulder: 'RightArm', RightArm: 'RightForeArm', RightForeArm: 'RightHand', RightHand: 'RightHandMiddle1',
  LeftUpLeg: 'LeftLeg', LeftLeg: 'LeftFoot', LeftFoot: 'LeftToeBase',
  RightUpLeg: 'RightLeg', RightLeg: 'RightFoot', RightFoot: 'RightToeBase',
}
