import { useEffect, useMemo, useState } from 'react'
import type { Stroke } from '../engine/types'
import type { ClipData } from '../engine/rig/clip'
import { loadClip, retime } from '../engine/rig/clips'

/**
 * The stroke as it should be played: when it has a mocap clip, the clip is
 * fetched and the stroke re-timed onto it; until then (or if the clip fails)
 * the authored keyframes play. Returns `ready: false` while a clip is loading
 * so callers can avoid showing the keyframed version for a split second.
 */
export function useMotion(stroke: Stroke): { stroke: Stroke; clip: ClipData | null; ready: boolean } {
  const [state, setState] = useState<{ id: string; clip: ClipData | null } | null>(null)
  useEffect(() => {
    if (!stroke.clip) return
    let alive = true
    loadClip(stroke.clip).then(
      (clip) => alive && setState({ id: stroke.id, clip }),
      (err) => {
        console.warn('[useMotion]', err)
        if (alive) setState({ id: stroke.id, clip: null })
      },
    )
    return () => {
      alive = false
    }
  }, [stroke.clip, stroke.id])
  const clip = stroke.clip && state?.id === stroke.id ? state.clip : null
  // memoised so the runtime (built per stroke object) is not rebuilt on every render
  const played = useMemo(() => (clip ? retime(stroke, clip) : stroke), [stroke, clip])
  if (!stroke.clip) return { stroke, clip: null, ready: true }
  if (!state || state.id !== stroke.id) return { stroke, clip: null, ready: false }
  return { stroke: played, clip, ready: true }
}
