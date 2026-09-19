import { useMemo } from 'react'
import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three'
import type { SurfaceId } from './store'

export const COURT = {
  length: 23.77,
  singles: 8.23,
  doubles: 10.97,
  service: 6.4,
  netCentre: 0.914,
  netPost: 1.07,
  line: 0.05,
  baseline: 0.1,
}

export const SURFACES: Record<SurfaceId, { court: string; apron: string; line: string; sky: string; fog: string }> = {
  hard: { court: '#2b62a6', apron: '#2f7a5c', line: '#fbfbf5', sky: '#0f2b4d', fog: '#123258' },
  clay: { court: '#b9582f', apron: '#a34c28', line: '#f6efe4', sky: '#3d1d10', fog: '#4a2414' },
  grass: { court: '#4d8a3c', apron: '#3f7a31', line: '#ffffff', sky: '#173b22', fog: '#1c4528' },
  indoor: { court: '#23707a', apron: '#2a2f45', line: '#f7f7f2', sky: '#10121d', fog: '#151828' },
}

function useSurfaceTexture(surface: SurfaceId) {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 256
    const g = c.getContext('2d')!
    g.fillStyle = '#808080'
    g.fillRect(0, 0, 256, 256)
    if (surface === 'grass') {
      // mowing stripes
      g.fillStyle = 'rgba(255,255,255,0.10)'
      g.fillRect(0, 0, 256, 128)
    }
    const grain = surface === 'clay' ? 0.16 : surface === 'grass' ? 0.2 : 0.06
    for (let i = 0; i < 9000; i++) {
      const v = Math.random() > 0.5 ? 255 : 0
      g.fillStyle = `rgba(${v},${v},${v},${Math.random() * grain})`
      g.fillRect(Math.random() * 256, Math.random() * 256, 1.5, 1.5)
    }
    const t = new CanvasTexture(c)
    t.wrapS = t.wrapT = RepeatWrapping
    t.repeat.set(surface === 'grass' ? 1 : 14, surface === 'grass' ? 9 : 22)
    t.colorSpace = SRGBColorSpace
    return t
  }, [surface])
}

function Line({ x, z, w, d, color }: { x: number; z: number; w: number; d: number; color: string }) {
  return (
    <mesh position={[x, 0.003, z]} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[w, d]} />
      <meshStandardMaterial color={color} roughness={0.9} polygonOffset polygonOffsetFactor={-2} />
    </mesh>
  )
}

/**
 * Full-size court. Local origin is the centre mark of the near baseline with
 * the net toward -Z; `origin` moves the court so the player can stay at world
 * zero wherever on court the stroke happens.
 */
export function Court({ surface, origin = [0, 0] }: { surface: SurfaceId; origin?: [number, number] }) {
  const s = SURFACES[surface]
  const tex = useSurfaceTexture(surface)
  const half = COURT.length / 2
  const L = COURT.line
  const sw = COURT.singles / 2
  const dw = COURT.doubles / 2
  const netZ = -half
  return (
    <group position={[-origin[0], 0, origin[1]]}>
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.002, netZ]} receiveShadow>
        <planeGeometry args={[60, 80]} />
        <meshStandardMaterial color={s.apron} roughness={0.95} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, netZ]} receiveShadow>
        <planeGeometry args={[COURT.doubles, COURT.length]} />
        <meshStandardMaterial color={s.court} map={tex} roughness={0.92} />
      </mesh>

      {[0, -COURT.length].map((z) => (
        <Line key={z} x={0} z={z + (z === 0 ? -0.05 : 0.05)} w={COURT.doubles} d={COURT.baseline} color={s.line} />
      ))}
      {[-dw, dw, -sw, sw].map((x) => (
        <Line key={x} x={x - Math.sign(x) * L * 0.5} z={netZ} w={L} d={COURT.length} color={s.line} />
      ))}
      {[netZ + COURT.service, netZ - COURT.service].map((z) => (
        <Line key={z} x={0} z={z} w={COURT.singles} d={L} color={s.line} />
      ))}
      <Line x={0} z={netZ} w={L} d={COURT.service * 2} color={s.line} />
      <Line x={0} z={-0.15} w={L} d={0.2} color={s.line} />
      <Line x={0} z={-COURT.length + 0.15} w={L} d={0.2} color={s.line} />

      {/* net */}
      <group position={[0, 0, netZ]}>
        <mesh position={[0, COURT.netCentre / 2 + 0.02, 0]}>
          <planeGeometry args={[COURT.doubles + 1.83, COURT.netCentre]} />
          <meshStandardMaterial color="#0c0f14" transparent opacity={0.55} side={2} />
        </mesh>
        <mesh position={[0, COURT.netCentre + 0.045, 0]} castShadow>
          <boxGeometry args={[COURT.doubles + 1.83, 0.06, 0.02]} />
          <meshStandardMaterial color="#fbfbf5" roughness={0.8} />
        </mesh>
        <mesh position={[0, COURT.netCentre / 2, 0]}>
          <boxGeometry args={[0.05, COURT.netCentre, 0.012]} />
          <meshStandardMaterial color="#fbfbf5" />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * (dw + 0.914), COURT.netPost / 2, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, COURT.netPost, 12]} />
            <meshStandardMaterial color="#1c2430" metalness={0.4} roughness={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
