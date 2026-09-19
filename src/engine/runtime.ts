import { Vector3 } from 'three'
import { PoseTrack, emptyPose } from './pose'
import { createSolved, solve, toWorld, type Solved } from './solver'
import type { Stroke } from './types'

const G = 9.81
const BALL_R = 0.033
const TRAIL_SAMPLES = 240
/** coefficient of restitution of a tennis ball on a hard court, and the horizontal speed kept through a bounce */
const BOUNCE_COR = 0.73
const BOUNCE_SLIDE = 0.78
/** the eyes settle on the contact zone this long before the hit, hold on it, then release toward the target */
const GAZE_SETTLE = 0.12
const GAZE_HOLD = 0.24
const GAZE_RELEASE = 0.3

interface Segment {
  t0: number
  t1: number
  p0: Vector3
  v0: Vector3
}

/** Everything derived from a stroke definition that the scene needs each frame. */
export class StrokeRuntime {
  readonly stroke: Stroke
  readonly track: PoseTrack
  readonly duration: number
  readonly trail: Vector3[] = []
  readonly handTrail: Vector3[] = []
  readonly trailTimes: number[] = []
  /** racket-head speed (m/s) per trail sample */
  readonly headSpeed: number[] = []
  readonly peakSpeed: number
  readonly contact: Vector3 | null = null
  private segments: Segment[] = []
  private heldUntil = -1
  private pose = emptyPose()
  private gaze = new Vector3()
  private outDir = new Vector3(0, 0, -1)
  private bounceP = new Vector3()
  private bounceV = new Vector3()

  constructor(stroke: Stroke) {
    this.stroke = stroke
    this.track = new PoseTrack(stroke.keys)
    this.duration = stroke.duration

    const scratch = createSolved()
    for (let i = 0; i < TRAIL_SAMPLES; i++) {
      const t = (i / (TRAIL_SAMPLES - 1)) * this.duration
      solve(this.track.sample(t, this.pose), scratch)
      this.trail.push(scratch.racketTip.clone())
      this.handTrail.push(scratch.wristR.clone())
      this.trailTimes.push(t)
    }
    const dt = this.duration / (TRAIL_SAMPLES - 1)
    const raw: number[] = []
    for (let i = 0; i < TRAIL_SAMPLES; i++) {
      const a = this.trail[Math.max(i - 1, 0)]
      const b = this.trail[Math.min(i + 1, TRAIL_SAMPLES - 1)]
      raw.push(a.distanceTo(b) / (2 * dt))
    }
    // median-of-three takes the sampling jitter out without flattening the real peak
    for (let i = 0; i < TRAIL_SAMPLES; i++) {
      const a = raw[Math.max(i - 1, 0)]
      const b = raw[i]
      const c = raw[Math.min(i + 1, TRAIL_SAMPLES - 1)]
      this.headSpeed.push(Math.max(Math.min(a, b), Math.min(Math.max(a, b), c)))
    }
    this.peakSpeed = Math.max(...this.headSpeed)

    const ball = stroke.ball
    if (ball) {
      solve(this.track.sample(ball.contactT, this.pose), scratch)
      this.contact = scratch.racketHead.clone()
      const points: { t: number; p: Vector3 }[] = ball.waypoints.map((w) => {
        if (w.p === 'lHand') {
          solve(this.track.sample(w.t, this.pose), scratch)
          this.heldUntil = w.t
          return { t: w.t, p: scratch.wristL.clone().add(new Vector3(0, 0.06, 0)) }
        }
        return { t: w.t, p: toWorld(w.p, new Vector3()) }
      })
      points.push({ t: ball.contactT, p: this.contact })
      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i]
        const b = points[i + 1]
        const d = b.t - a.t
        const v0 = b.p.clone().sub(a.p).divideScalar(d)
        v0.y += 0.5 * G * d
        this.segments.push({ t0: a.t, t1: b.t, p0: a.p, v0 })
      }
      const outV = toWorld(ball.out, new Vector3())
      this.outDir.set(outV.x, 0, outV.z).normalize()
      this.segments.push({
        t0: ball.contactT,
        t1: Infinity,
        p0: this.contact,
        v0: outV,
      })
    }
  }

  /** Samples the pose at `t`, resolves the head gaze against the ball, and returns the solved skeleton. */
  evaluate(t: number, out: Solved, ballOut: Vector3): { ballVisible: boolean } {
    const ballVisible = this.ballAt(t, ballOut)
    this.track.sample(t, this.pose)
    let gaze: Vector3 | null = null
    const spec = this.stroke.ball
    if (spec && this.contact) {
      // eyes follow the ball in, settle on the contact zone just before the hit so the head is still
      // through contact, hold there for a beat, then release smoothly along the outgoing ball
      const dtC = t - spec.contactT
      if (dtC <= 0) {
        if (ballVisible) {
          gaze = this.gaze.copy(ballOut)
          if (dtC > -GAZE_SETTLE) {
            const s = smooth(1 + dtC / GAZE_SETTLE)
            gaze.lerp(this.contact, s)
          }
        }
      } else if (dtC < GAZE_HOLD) {
        gaze = this.gaze.copy(this.contact)
      } else if (dtC < GAZE_HOLD + GAZE_RELEASE) {
        const s = smooth((dtC - GAZE_HOLD) / GAZE_RELEASE)
        // a point far down the outgoing flight, so the eyes lift toward the target rather than snapping
        gaze = this.gaze.copy(this.contact).addScaledVector(this.outDir, 6 * s)
        gaze.y = this.contact.y + (this.contact.y > 1.6 ? -0.4 : 0.6) * s
      }
    }
    solve(this.pose, out, gaze)
    if (spec && this.heldUntil >= 0 && t < this.heldUntil) {
      ballOut.copy(out.wristL).y += 0.06
      return { ballVisible: true }
    }
    return { ballVisible }
  }

  private ballAt(t: number, out: Vector3): boolean {
    if (!this.segments.length) return false
    if (t < this.segments[0].t0) return this.heldUntil >= 0
    let seg = this.segments[0]
    for (const s of this.segments) if (t >= s.t0) seg = s
    let tau = t - seg.t0
    out.copy(seg.p0).addScaledVector(seg.v0, tau)
    out.y -= 0.5 * G * tau * tau
    if (seg.t1 === Infinity && out.y < BALL_R) {
      // bounces after the hit so a drop shot, a lob or a serve reads correctly: each bounce keeps
      // BOUNCE_COR of the vertical speed and BOUNCE_SLIDE of the horizontal speed, then the ball rolls
      const p = this.bounceP.copy(seg.p0)
      const v = this.bounceV.copy(seg.v0)
      let remaining = tau
      for (let n = 0; n < 6; n++) {
        const a = 0.5 * G
        const b = -v.y
        const c = BALL_R - p.y
        const tb = (-b + Math.sqrt(Math.max(b * b - 4 * a * c, 0))) / (2 * a)
        if (tb >= remaining) break
        p.x += v.x * tb
        p.z += v.z * tb
        p.y = BALL_R
        v.y = -(v.y - G * tb) * BOUNCE_COR
        v.x *= BOUNCE_SLIDE
        v.z *= BOUNCE_SLIDE
        remaining -= tb
        if (v.y < 0.6) {
          // too little bounce left: roll and slow down
          const k = Math.exp(-remaining * 0.8)
          out.set(p.x + (v.x * (1 - k)) / 0.8, BALL_R, p.z + (v.z * (1 - k)) / 0.8)
          return true
        }
      }
      out.copy(p).addScaledVector(v, remaining)
      out.y = Math.max(out.y - 0.5 * G * remaining * remaining, BALL_R)
    }
    return true
  }

  /**
   * Racket-head speed around `t`. Uses the peak inside a short window: the
   * monotone interpolation brings each component to rest at its own extreme
   * (contact is usually the top of the hand's path), which would otherwise
   * show a misleading dip at the exact instant learners care about most.
   */
  speedAt(t: number, window = 0.05) {
    const toIndex = (x: number) => Math.min(Math.max(Math.round((x / this.duration) * (TRAIL_SAMPLES - 1)), 0), TRAIL_SAMPLES - 1)
    let best = 0
    for (let i = toIndex(t - window); i <= toIndex(t + window); i++) best = Math.max(best, this.headSpeed[i])
    // blend toward the instantaneous value so the readout still falls off away from the hit
    const here = this.headSpeed[toIndex(t)]
    return here + (best - here) * 0.7
  }
}

const smooth = (x: number) => {
  const s = Math.min(Math.max(x, 0), 1)
  return s * s * (3 - 2 * s)
}
