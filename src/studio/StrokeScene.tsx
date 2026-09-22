import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, Line, OrbitControls } from '@react-three/drei'
import { ACESFilmicToneMapping, BackSide, Color, Group, MathUtils, Mesh, PCFShadowMap, Vector3 } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import type { Line2 } from 'three-stdlib'
import { StrokeRuntime } from '../engine/runtime'
import { createSolved, kneeAngle, lineTurn, type Solved } from '../engine/solver'
import type { FocusId, Stroke } from '../engine/types'
import { Court, SURFACES } from './Court'
import { PlayerRig } from './PlayerRig'
import { SkinnedPlayer } from './SkinnedPlayer'
import { useStudio, type CamPreset } from './store'

const PRESETS: Record<CamPreset, [number, number, number]> = {
  side: [6, 0.35, -0.3],
  front: [0.4, 0.5, -6.2],
  behind: [-0.5, 1.1, 6.2],
  top: [0.01, 7.5, 0.4],
  'three-quarter': [4.2, 1.1, -4.4],
}

const FOCUS_SCALE: Record<FocusId, number> = { body: 1, shoulders: 0.4, hips: 0.4, racket: 0.36, feet: 0.45, head: 0.28 }

function focusPoint(focus: FocusId, s: Solved, out: Vector3) {
  switch (focus) {
    case 'shoulders': return out.copy(s.neck)
    case 'hips': return out.copy(s.pelvis)
    case 'racket': return out.copy(s.racketHead).lerp(s.wristR, 0.35)
    case 'feet': return out.copy(s.ankleL).lerp(s.ankleR, 0.5)
    case 'head': return out.copy(s.head)
    default: return out.set(s.pelvis.x, 1.0, s.pelvis.z)
  }
}

function CameraRig({ solved, preset }: { solved: Solved; preset?: CamPreset }) {
  const controls = useRef<OrbitControlsImpl>(null)
  const { camera } = useThree()
  const desired = useRef<Vector3 | null>(null)
  const target = useRef(new Vector3(0, 1, 0))
  const lastTarget = useRef(new Vector3(0, 1, 0))
  const seen = useRef({ cam: -1, zoom: 0, focus: '' as string })
  const tmp = useMemo(() => new Vector3(), [])
  const offset = useMemo(() => new Vector3(), [])

  useFrame((_, dt) => {
    const st = useStudio.getState()
    const c = controls.current
    if (!c) return
    const flip = st.leftHanded ? -1 : 1
    focusPoint(st.focus, solved, tmp)
    tmp.x *= flip

    const k = 1 - Math.exp(-7 * dt)
    target.current.lerp(tmp, seen.current.cam < 0 ? 1 : k)
    // carry the camera with the followed joint so framing holds during the swing
    offset.copy(target.current).sub(lastTarget.current)
    camera.position.add(offset)
    lastTarget.current.copy(target.current)
    c.target.copy(target.current)

    if (seen.current.cam !== st.cam.nonce || seen.current.focus !== st.focus) {
      const presetChanged = seen.current.cam !== st.cam.nonce
      const first = seen.current.cam < 0
      seen.current.cam = st.cam.nonce
      seen.current.focus = st.focus
      const name = preset ?? st.cam.preset
      const p = PRESETS[name]
      const dir = presetChanged
        ? new Vector3(p[0] * flip, p[1], p[2])
        : camera.position.clone().sub(target.current)
      const base = new Vector3(...PRESETS[name]).length()
      dir.setLength(base * FOCUS_SCALE[st.focus])
      desired.current = target.current.clone().add(dir)
      if (first) {
        camera.position.copy(desired.current)
        desired.current = null
      }
    }
    if (seen.current.zoom !== st.zoom.nonce) {
      seen.current.zoom = st.zoom.nonce
      const dir = (desired.current ?? camera.position).clone().sub(target.current)
      dir.setLength(MathUtils.clamp(dir.length() * (st.zoom.dir > 0 ? 0.72 : 1.38), 0.5, 22))
      desired.current = target.current.clone().add(dir)
    }
    if (desired.current) {
      desired.current.add(offset)
      camera.position.lerp(desired.current, 1 - Math.exp(-6 * dt))
      if (camera.position.distanceTo(desired.current) < 0.01) desired.current = null
    }
    c.update()
  })

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enableDamping
      dampingFactor={0.12}
      minDistance={0.45}
      maxDistance={24}
      maxPolarAngle={Math.PI / 2 - 0.02}
      onStart={() => (desired.current = null)}
    />
  )
}

function Stage({ stroke, autoAdvance, fixedT, preset }: { stroke: Stroke; autoAdvance: boolean; fixedT?: number; preset?: CamPreset }) {
  const runtime = useMemo(() => new StrokeRuntime(stroke), [stroke])
  const rig = useMemo(() => new PlayerRig(), [])
  const solved = useMemo(() => createSolved(), [])
  const ballPos = useMemo(() => new Vector3(), [])
  const mirror = useRef<Group>(null)
  const ball = useRef<Mesh>(null)
  const ballShadow = useRef<Mesh>(null)
  const trail = useRef<Line2>(null)
  const hipNeedle = useRef<Mesh>(null)
  const shoulderNeedle = useRef<Mesh>(null)
  const dial = useRef<Group>(null)
  const contactRing = useRef<Mesh>(null)
  const contactShadow = useRef<Group>(null)
  const xray = useStudio((s) => s.xray)
  const surface = useStudio((s) => s.surface)
  const model = useStudio((s) => s.model)
  // one skinned body at a time; switching bodies downloads the other model on demand
  const skinned = useMemo(() => (model === 'mannequin' ? null : new SkinnedPlayer(model)), [model])

  useEffect(() => {
    rig.setXray(xray)
    skinned?.setXray(xray)
  }, [rig, skinned, xray])
  useEffect(() => () => skinned?.dispose(), [skinned])

  const trailColors = useMemo(() => {
    const slow = new Color('#7fb4ff')
    const fast = new Color('#f2ff5a')
    return runtime.headSpeed.map((v) => {
      const c = slow.clone().lerp(fast, Math.min(v / Math.max(runtime.peakSpeed, 1), 1) ** 0.7)
      return [c.r, c.g, c.b] as [number, number, number]
    })
  }, [runtime])

  useFrame((_, dt) => {
    const st = useStudio.getState()
    let t = fixedT ?? st.t
    if (fixedT === undefined && st.playing && autoAdvance) {
      t += Math.min(dt, 0.05) * st.speed
      if (t > runtime.duration + 0.35) t = 0
    }
    const tt = Math.min(t, runtime.duration)
    const { ballVisible } = runtime.evaluate(tt, solved, ballPos)
    const useSkinned = !!skinned?.ready
    rig.group.visible = !useSkinned
    if (skinned) skinned.group.visible = useSkinned
    if (useSkinned) skinned.update(solved)
    else rig.update(solved)
    if (contactShadow.current) contactShadow.current.position.set(solved.pelvis.x, 0.002, solved.pelvis.z)

    if (mirror.current) mirror.current.scale.x = st.leftHanded ? -1 : 1
    if (ball.current && ballShadow.current) {
      const show = ballVisible && st.showBall
      ball.current.visible = show
      ballShadow.current.visible = show
      ball.current.position.copy(ballPos)
      ballShadow.current.position.set(ballPos.x, 0.004, ballPos.z)
      const sh = MathUtils.clamp(1 - ballPos.y / 3, 0.25, 1)
      ballShadow.current.scale.setScalar(sh)
    }
    if (trail.current) {
      trail.current.visible = st.showTrail
      const n = Math.floor((tt / runtime.duration) * (runtime.trail.length - 1))
      trail.current.geometry.instanceCount = Math.max(n, 0)
    }
    if (contactRing.current && runtime.contact && stroke.ball) {
      const near = Math.abs(tt - stroke.ball.contactT)
      contactRing.current.visible = near < 0.12 && st.showBall
      contactRing.current.position.copy(runtime.contact)
      contactRing.current.scale.setScalar(1 + near * 14)
      contactRing.current.lookAt(contactRing.current.position.clone().add(solved.racketNormal))
    }

    const hip = lineTurn(solved.hipL, solved.hipR)
    const sho = lineTurn(solved.shoulderL, solved.shoulderR)
    if (dial.current && hipNeedle.current && shoulderNeedle.current) {
      dial.current.visible = st.showCoil
      dial.current.position.set(solved.pelvis.x, 0.006, solved.pelvis.z)
      hipNeedle.current.rotation.z = -hip * MathUtils.DEG2RAD
      shoulderNeedle.current.rotation.z = -sho * MathUtils.DEG2RAD
    }

    if (fixedT !== undefined) return
    const n = solved.racketNormal
    const facing = n.z < 0 ? 1 : -1
    useStudio.setState({
      t,
      metrics: {
        shoulderTurn: sho,
        hipTurn: hip,
        separation: sho - hip,
        kneeFront: kneeAngle(solved.hipL, solved.kneeL, solved.ankleL),
        kneeBack: kneeAngle(solved.hipR, solved.kneeR, solved.ankleR),
        headSpeed: runtime.speedAt(tt),
        faceTilt: Math.asin(MathUtils.clamp(n.y * facing, -1, 1)) * MathUtils.RAD2DEG,
        handHeight: solved.wristR.y,
      },
    })
  })

  return (
    <>
      <CameraRig solved={solved} preset={preset} />
      <group ref={mirror}>
        <Court surface={surface} origin={stroke.origin} />
        <primitive object={rig.group} />
        {skinned && <primitive object={skinned.group} />}
        <ContactShadows ref={contactShadow} opacity={0.45} scale={3} blur={2.2} far={1.4} resolution={512} frames={Infinity} color="#0a1626" />
        <mesh ref={ball} castShadow>
          <sphereGeometry args={[0.033, 20, 16]} />
          <meshStandardMaterial color="#d9f03a" emissive="#9db31c" emissiveIntensity={0.35} roughness={0.8} />
        </mesh>
        <mesh ref={ballShadow} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[0.05, 16]} />
          <meshBasicMaterial color="#000" transparent opacity={0.35} />
        </mesh>
        <mesh ref={contactRing} visible={false}>
          <ringGeometry args={[0.05, 0.058, 40]} />
          <meshBasicMaterial color="#f2ff5a" transparent opacity={0.9} side={2} depthTest={false} />
        </mesh>
        <Line
          ref={trail}
          points={runtime.trail}
          vertexColors={trailColors}
          lineWidth={2.5}
          transparent
          opacity={0.9}
        />
        <group ref={dial} rotation-x={-Math.PI / 2}>
          <mesh>
            <ringGeometry args={[0.78, 0.795, 64]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.55} />
          </mesh>
          <mesh ref={hipNeedle} position-z={0.001}>
            <planeGeometry args={[1.5, 0.045]} />
            <meshBasicMaterial color="#f2ff5a" />
          </mesh>
          <mesh ref={shoulderNeedle} position-z={0.002}>
            <planeGeometry args={[1.5, 0.022]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      </group>
      <color attach="background" args={[SURFACES[surface].sky]} />
      <fog attach="fog" args={[SURFACES[surface].fog, 22, 60]} />
      <StudioEnvironment sky={SURFACES[surface].sky} ground={SURFACES[surface].apron} />
    </>
  )
}

/**
 * Procedural image-based lighting: an overcast sky dome, a warm key panel and a
 * cool fill, rendered once to a cubemap. No network fetch (unlike the HDRI
 * presets), so it works offline and in thumbnails.
 */
function StudioEnvironment({ sky, ground }: { sky: string; ground: string }) {
  return (
    <Environment resolution={256} frames={1} environmentIntensity={0.7}>
      <mesh scale={60}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshBasicMaterial color={sky} side={BackSide} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, -1, 0]} scale={80}>
        <planeGeometry />
        <meshBasicMaterial color={ground} />
      </mesh>
      <Lightformer form="rect" intensity={3} color="#fff4e2" position={[6, 9, -3]} scale={[6, 4, 1]} target={[0, 1, 0]} />
      <Lightformer form="rect" intensity={1.2} color="#dfe9ff" position={[-6, 4, 5]} scale={[8, 5, 1]} target={[0, 1, 0]} />
      <Lightformer form="ring" intensity={1.6} color="#e9f1ff" position={[0, 12, 0]} rotation-x={Math.PI / 2} scale={12} />
    </Environment>
  )
}

export function StrokeScene({
  stroke,
  autoAdvance = true,
  fixedT,
  preset,
}: {
  stroke: Stroke
  autoAdvance?: boolean
  /** freeze the animation at this instant (used by lesson thumbnails and contact sheets) */
  fixedT?: number
  preset?: CamPreset
}) {
  return (
    <Canvas
      shadows={{ type: PCFShadowMap }}
      style={{ position: 'absolute', inset: 0 }}
      dpr={[1, 2]}
      camera={{ fov: 32, near: 0.05, far: 120, position: [4.2, 2.1, -4.4] }}
      gl={{ antialias: true, preserveDrawingBuffer: true, toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.08 }}
    >
      <hemisphereLight args={['#dfeaff', '#3a4a3a', 0.45]} />
      <directionalLight
        position={[6, 11, -3]}
        intensity={2.4}
        color="#fff3e0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        shadow-camera-near={4}
        shadow-camera-far={24}
        shadow-bias={-0.0003}
        shadow-normalBias={0.02}
        shadow-radius={4}
      />
      <directionalLight position={[-5, 4, 6]} intensity={0.35} color="#cfdcff" />
      <Stage stroke={stroke} autoAdvance={autoAdvance} fixedT={fixedT} preset={preset} />
    </Canvas>
  )
}
