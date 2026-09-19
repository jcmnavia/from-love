import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { Mesh, Vector3 } from 'three'
import { COURT, Court, SURFACES as SURFACE_COLORS } from '@/studio/Court'
import type { SurfaceId } from '@/studio/store'
import { useT } from '@/i18n'
import { Label as FormLabel } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

/** Bounce behaviour per surface: how much speed survives the bounce and how high it comes up. */
const BOUNCE: Record<SurfaceId, { speedKeep: number; restitution: number }> = {
  grass: { speedKeep: 0.78, restitution: 0.62 },
  hard: { speedKeep: 0.7, restitution: 0.75 },
  indoor: { speedKeep: 0.74, restitution: 0.72 },
  clay: { speedKeep: 0.58, restitution: 0.82 },
}

const G = 9.81
const SURFACE_IDS: SurfaceId[] = ['hard', 'clay', 'grass', 'indoor']

function BouncingBall({ surface }: { surface: SurfaceId }) {
  const ref = useRef<Mesh>(null)
  const clock = useRef(0)
  const b = BOUNCE[surface]
  // launched from the far baseline toward the near one at a realistic rally speed
  const start = useMemo(() => new Vector3(0, 1.1, -COURT.length + 0.5), [])
  useFrame((_, dt) => {
    clock.current += dt * 0.55
    const v0z = 19
    const v0y = 2.4
    let t = clock.current
    const tBounce = (v0y + Math.sqrt(v0y * v0y + 2 * G * start.y)) / G
    const zBounce = start.z + v0z * tBounce
    const x = 0
    let y: number
    let z: number
    if (t < tBounce) {
      y = start.y + v0y * t - 0.5 * G * t * t
      z = start.z + v0z * t
    } else {
      const vyAfter = (v0y - G * tBounce) * -b.restitution
      const vzAfter = v0z * b.speedKeep
      const tt = t - tBounce
      y = 0.033 + vyAfter * tt - 0.5 * G * tt * tt
      z = zBounce + vzAfter * tt
      if (y < 0.033 || z > 2.5) {
        clock.current = 0
        t = 0
        y = start.y
        z = start.z
      }
    }
    ref.current?.position.set(x, Math.max(y, 0.033), z)
  })
  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.066, 20, 16]} />
      <meshStandardMaterial color="#d9f03a" emissive="#9db31c" emissiveIntensity={0.3} />
    </mesh>
  )
}

function Label({ position, text }: { position: [number, number, number]; text: string }) {
  return (
    <Html position={position} center style={{ pointerEvents: 'none' }}>
      <div className="rounded bg-black/55 px-1.5 py-0.5 font-sans text-[11px] whitespace-nowrap text-white tabular-nums">{text}</div>
    </Html>
  )
}

export function CourtViewer({ surface, labels }: { surface: SurfaceId; labels: boolean }) {
  const t = useT()
  const half = COURT.length / 2
  return (
    <Canvas shadows style={{ position: 'absolute', inset: 0 }} camera={{ fov: 40, position: [12, 9, 14], near: 0.1, far: 200 }}>
      <color attach="background" args={[SURFACE_COLORS[surface].sky]} />
      <hemisphereLight args={['#dfeaff', '#3a4a3a', 0.9]} />
      <directionalLight
        position={[10, 18, 6]}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
      />
      <group position={[0, 0, half]}>
        <Court surface={surface} />
        <BouncingBall surface={surface} />
        {labels && (
          <>
            <Label position={[0, 0.3, 0.9]} text={t('court.label.baseline')} />
            <Label position={[0, 0.3, -half + COURT.service + 0.5]} text={t('court.label.serviceLine')} />
            <Label position={[0, 0.5, -half - 0.9]} text={t('court.label.net')} />
            <Label position={[COURT.doubles / 2 + 0.6, 0.3, -half / 2]} text={t('court.label.alley')} />
            <Label position={[COURT.singles / 2 - 0.9, 0.3, -half + 3.2]} text={t('court.label.serviceBox')} />
            <Label position={[0, 0.3, -half + 9.2]} text={t('court.label.noMansLand')} />
            <Label position={[0.9, 0.3, -0.05]} text={t('court.label.centreMark')} />
          </>
        )}
      </group>
      <OrbitControls target={[0, 0, 0]} enablePan={false} maxPolarAngle={Math.PI / 2 - 0.04} minDistance={4} maxDistance={45} />
    </Canvas>
  )
}

export function CourtExplorer() {
  const t = useT()
  const [surface, setSurface] = useState<SurfaceId>('hard')
  const [labels, setLabels] = useState(true)
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          spacing={0}
          value={surface}
          onValueChange={(v) => v && setSurface(v as SurfaceId)}
          aria-label={t('court.surface')}
        >
          {SURFACE_IDS.map((s) => (
            <ToggleGroupItem key={s} value={s}>
              {t(`surface.${s}`)}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <div className="ml-auto flex items-center gap-2">
          <Switch id="court-labels" checked={labels} onCheckedChange={setLabels} />
          <FormLabel htmlFor="court-labels" className="text-sm">
            {t('court.showDimensions')}
          </FormLabel>
        </div>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
        <CourtViewer surface={surface} labels={labels} />
      </div>
      <p className="text-sm text-muted-foreground">
        {t('court.bounceNote', { surface: t(`surface.${surface}`).toLowerCase(), behaviour: t(`court.bounce.${surface}`) })}
      </p>
    </div>
  )
}
