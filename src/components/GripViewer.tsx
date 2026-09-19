import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import type { Grip } from '@/content/types'
import { useContent } from '@/i18n/content'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

/**
 * Octagonal handle seen from the butt cap. Bevel 1 is on top when the racket
 * is held edge-on (strings perpendicular to the ground), then the numbers run
 * clockwise for a right-hander. Highlighted bevels show where the base
 * knuckle of the index finger and the heel pad sit for the selected grip.
 */
function Handle({ grip }: { grip: Grip }) {
  const r = 0.16
  const faces = Array.from({ length: 8 }, (_, i) => i + 1)
  return (
    <group rotation={[0, 0, 0]}>
      <mesh position={[0, 0, -0.9]} rotation={[Math.PI / 2, Math.PI / 8, 0]}>
        <cylinderGeometry args={[r, r, 1.8, 8]} />
        <meshStandardMaterial color="#5b6678" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0, 0.005]} rotation={[Math.PI / 2, Math.PI / 8, 0]}>
        <cylinderGeometry args={[r * 1.08, r * 1.08, 0.03, 8]} />
        <meshStandardMaterial color="#1b1b1f" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.85, -2.9]}>
        <torusGeometry args={[0.55, 0.035, 10, 48]} />
        <meshStandardMaterial color="#1b1b1f" />
      </mesh>
      <mesh position={[0, 0.85, -2.9]} scale={[0.9, 1.15, 1]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial color="#e6f556" transparent opacity={0.25} side={2} />
      </mesh>
      {faces.map((n) => {
        const a = Math.PI / 2 - ((n - 1) * Math.PI) / 4
        const nx = Math.cos(a)
        const ny = Math.sin(a)
        const isKnuckle = n === grip.indexKnuckle
        const isHeel = n === grip.heelPad
        const color = isKnuckle ? '#d9f03a' : isHeel ? '#fbfbf5' : undefined
        return (
          <group key={n}>
            {color && (
              <mesh position={[nx * r * 0.985, ny * r * 0.985, -0.6]} rotation={[0, 0, a - Math.PI / 2]}>
                <boxGeometry args={[0.132, 0.012, 1.15]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} />
              </mesh>
            )}
            <Html position={[nx * r * 1.55, ny * r * 1.55, 0.02]} center style={{ pointerEvents: 'none' }}>
              <div
                className={cn(
                  'grid size-7 place-items-center rounded-full font-sans text-sm font-semibold tabular-nums',
                  isKnuckle ? 'bg-[#d9f03a] text-[#0e1c2c]' : isHeel ? 'bg-white text-[#0e1c2c]' : 'bg-black/60 text-white',
                )}
              >
                {n}
              </div>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

export function GripExplorer({ initial = 'semi-western' }: { initial?: string }) {
  const t = useT()
  const { grips } = useContent()
  const [id, setId] = useState(initial)
  const grip = grips.find((g) => g.id === id) ?? grips[0]
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div className="space-y-3">
        <div className="relative aspect-4/3 overflow-hidden rounded-lg border bg-muted">
          <Canvas style={{ position: 'absolute', inset: 0 }} camera={{ fov: 35, position: [0.7, 0.5, 1.15] }}>
            <color attach="background" args={['#1d4732']} />
            <hemisphereLight args={['#ffffff', '#223', 1]} />
            <directionalLight position={[2, 3, 3]} intensity={1.6} />
            <Handle grip={grip} />
            <OrbitControls enablePan={false} minDistance={0.6} maxDistance={4} target={[0, 0.05, -0.2]} />
          </Canvas>
        </div>
        <div className="flex items-center gap-1.5" aria-label={t('grip.bevels')}>
          {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
            <span
              key={n}
              className={cn(
                'grid size-7 place-items-center rounded-md border text-xs font-medium tabular-nums',
                n === grip.indexKnuckle && 'border-primary bg-primary text-primary-foreground',
                n === grip.heelPad && 'border-foreground bg-foreground text-background',
              )}
            >
              {n}
            </span>
          ))}
        </div>
        <p className="max-w-prose text-sm leading-6 text-muted-foreground">{t('grip.legend')}</p>
      </div>

      <div className="min-w-0">
        <label className="text-xs font-medium text-muted-foreground" htmlFor="grip-select">
          {t('grip.choose')}
        </label>
        <Select value={grip.id} onValueChange={setId}>
          <SelectTrigger id="grip-select" className="mt-1.5 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {grips.map((g) => (
              <SelectItem key={g.id} value={g.id}>
                {g.name}
                <span className="ml-1 text-muted-foreground tabular-nums">
                  {t('grip.knuckleHeel', { k: g.indexKnuckle, h: g.heelPad })}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <h3 className="mt-5 text-xl font-semibold tracking-tight">{grip.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{grip.feel}</p>
        <h4 className="mt-5 text-xs font-medium text-muted-foreground">{t('grip.howToFind')}</h4>
        <p className="mt-1 text-sm leading-6">{grip.howToFind}</p>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-medium text-muted-foreground">{t('grip.goodFor')}</h4>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-sm leading-6">
              {grip.pros.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium text-muted-foreground">{t('grip.watchOut')}</h4>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-sm leading-6">
              {grip.cons.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-muted-foreground">
          {t('grip.usedBy', { players: grip.usedBy.join(', '), strokes: grip.strokes.join(', ').replaceAll('-', ' ') })}
        </p>
      </div>
    </div>
  )
}
