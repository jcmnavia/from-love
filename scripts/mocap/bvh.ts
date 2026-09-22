/** Loads a BVH take with three's BVHLoader and samples world-space joint positions per frame (metres). */
import { readFileSync } from 'node:fs'
import { AnimationMixer, Bone, Object3D, Vector3 } from 'three'
import { BVHLoader } from 'three/examples/jsm/loaders/BVHLoader.js'

export interface Take {
  name: string
  fps: number
  frames: number
  joints: string[]
  /** positions[frame][joint] in metres, BVH axes (y up) */
  positions: Vector3[][]
  bones: Bone[]
  clip: ReturnType<BVHLoader['parse']>['clip']
  root: Object3D
}

export function loadTake(path: string): Take {
  const text = readFileSync(path, 'utf8')
  const { skeleton, clip } = new BVHLoader().parse(text)
  const root = new Object3D()
  root.add(skeleton.bones[0])
  const mixer = new AnimationMixer(root)
  mixer.clipAction(clip).play()
  const frameTime = Number(/Frame Time:\s*([\d.]+)/.exec(text)![1])
  const frames = Number(/Frames:\s*(\d+)/.exec(text)![1])
  const joints = skeleton.bones.map((b) => b.name)
  const positions: Vector3[][] = []
  for (let f = 0; f < frames; f++) {
    mixer.setTime(f * frameTime)
    root.updateMatrixWorld(true)
    positions.push(skeleton.bones.map((b) => b.getWorldPosition(new Vector3()).multiplyScalar(0.01)))
  }
  return { name: path.split('/').pop()!.replace('.bvh', ''), fps: 1 / frameTime, frames, joints, positions, bones: skeleton.bones, clip, root }
}
