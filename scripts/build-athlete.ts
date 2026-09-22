/**
 * Builds public/models/athlete.glb: a tennis player on the Mixamo skeleton.
 *
 *   npx tsx scripts/build-athlete.ts
 *
 * Source: the rigged Mixamo "X Bot" (public/models/Xbot.glb). The robot's two
 * uniform materials are replaced by one vertex-coloured material painted by
 * anatomy: every vertex is classified by the bone that drives it most and by
 * how far along that bone it sits, giving skin, a short-sleeved shirt, shorts
 * to mid-thigh, socks, shoes with a dark sole and hair. The joint rings share
 * the colour of their region, so the body reads as one continuous figure.
 * Animations and UVs are dropped; the skeleton, bind pose and bone names are
 * untouched, so the studio's retargeting (src/studio/SkinnedPlayer.ts) drives
 * it exactly like the source model.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { Bone, BufferAttribute, Color, MeshStandardMaterial, SkinnedMesh, Vector3, type Object3D } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'

// GLTFExporter's binary path reads Blobs through FileReader, which Node lacks
class NodeFileReader {
  result: ArrayBuffer | null = null
  onloadend: (() => void) | null = null
  readAsArrayBuffer(blob: Blob) {
    blob.arrayBuffer().then((b) => {
      this.result = b
      this.onloadend?.()
    })
  }
}
;(globalThis as unknown as { FileReader: unknown }).FileReader = NodeFileReader

const PALETTE = {
  skin: '#dca783',
  hair: '#3a2a1f',
  shirt: '#f3f5f0',
  shorts: '#2b4f7c',
  sock: '#f7f7f4',
  shoe: '#e9ecef',
  sole: '#2a2e35',
}
type Region = keyof typeof PALETTE

const root = new URL('..', import.meta.url).pathname
const src = readFileSync(root + 'public/models/Xbot.glb')
const gltf = await new GLTFLoader().parseAsync(src.buffer.slice(src.byteOffset, src.byteOffset + src.byteLength), '')
const scene = gltf.scene
scene.updateMatrixWorld(true)

const norm = (n: string) => n.replace(/[^A-Za-z0-9]/g, '').toLowerCase().replace(/^mixamorig/, '')
const bones = new Map<string, Bone>()
scene.traverse((o: Object3D) => {
  if ((o as Bone).isBone) bones.set(norm(o.name), o as Bone)
})
const at = (name: string) => bones.get(norm(name))!.getWorldPosition(new Vector3())

/** 0 at bone `a`, 1 at bone `b`, for point p projected on the segment */
const along = (p: Vector3, a: Vector3, b: Vector3) => {
  const ab = b.clone().sub(a)
  return p.clone().sub(a).dot(ab) / ab.lengthSq()
}

const hips = at('Hips')
const head = at('Head')
const headTop = at('HeadTop_End')
const H = headTop.y - head.y

function classify(p: Vector3, bone: string): Region {
  const side = bone.startsWith('left') ? 'Left' : bone.startsWith('right') ? 'Right' : ''
  const part = side ? bone.slice(side.length) : bone
  if (part === 'head' || part === 'headtopend') {
    // Mixamo characters face +Z: hair covers the crown and the back of the skull
    const up = (p.y - head.y) / H
    if (up > 0.58 || (up > 0.12 && p.z < head.z - 0.03)) return 'hair'
    return 'skin'
  }
  if (part === 'neck') return 'skin'
  if (part.startsWith('spine') || part === 'shoulder') return 'shirt'
  if (part === 'hips') return p.y < hips.y - 0.03 ? 'shorts' : 'shirt'
  if (part === 'arm') return along(p, at(side + 'Arm'), at(side + 'ForeArm')) < 0.42 ? 'shirt' : 'skin'
  if (part === 'forearm' || part.startsWith('hand')) return 'skin'
  if (part === 'upleg') return along(p, at(side + 'UpLeg'), at(side + 'Leg')) < 0.6 ? 'shorts' : 'skin'
  if (part === 'leg') return along(p, at(side + 'Leg'), at(side + 'Foot')) > 0.76 ? 'sock' : 'skin'
  if (part === 'foot' || part.startsWith('toe')) return p.y < 0.024 ? 'sole' : 'shoe'
  return 'shirt'
}

const material = new MeshStandardMaterial({ name: 'Athlete', vertexColors: true, roughness: 0.68, metalness: 0 })
const counts: Partial<Record<Region, number>> = {}
scene.traverse((o: Object3D) => {
  const sm = o as SkinnedMesh
  if (!sm.isSkinnedMesh) return
  const g = sm.geometry
  const pos = g.getAttribute('position')
  const ji = g.getAttribute('skinIndex')
  const jw = g.getAttribute('skinWeight')
  const colors = new Float32Array(pos.count * 3)
  const c = new Color()
  const p = new Vector3()
  for (let i = 0; i < pos.count; i++) {
    let best = 0
    for (let k = 1; k < 4; k++) if (jw.getComponent(i, k) > jw.getComponent(i, best)) best = k
    const bone = norm(sm.skeleton.bones[ji.getComponent(i, best)].name)
    sm.getVertexPosition(i, p).applyMatrix4(sm.matrixWorld)
    const region = classify(p, bone)
    counts[region] = (counts[region] ?? 0) + 1
    c.set(PALETTE[region]).convertSRGBToLinear()
    colors.set([c.r, c.g, c.b], i * 3)
  }
  g.setAttribute('color', new BufferAttribute(colors, 3))
  g.deleteAttribute('uv')
  sm.material = material
  sm.name = /joint/i.test(sm.name) ? 'Athlete_Joints' : 'Athlete_Body'
})

const glb = (await new GLTFExporter().parseAsync(scene, { binary: true, animations: [] })) as ArrayBuffer
writeFileSync(root + 'public/models/athlete.glb', Buffer.from(glb))
console.log('regions', counts, 'size', (glb.byteLength / 1024 / 1024).toFixed(2), 'MB')
