import { Quaternion, Vector3 } from 'three'
import { PoseTrack, emptyPose } from './pose'
import { createSolved, solve, toWorld, type ArmBends, type Solved } from './solver'
import type { Stroke } from './types'
import { ClipTrack, type ClipData } from './rig/clip'
import { Rig } from './rig/rig'
import { ArmWarp } from './rig/warp'
import { keyed, turnTrunk } from './rig/trunk'
import { FingerCurl } from './rig/hand'
import { LeftHandOnGrip, captureLeftGrip, makeLeftGrip } from './rig/twohand'
import { ArmClearance } from './rig/clearance'
import { Arm } from './rig/arm'
import { clearPose } from './clearPose'
import { calibrateGrip, makeGrip, rigToSolved, type Grip } from './rig/solved'

const G = 9.81
const BALL_R = 0.033
const TRAIL_SAMPLES = 240
/** the elbow bend directions are baked at this rate and low-pass filtered */
const BEND_HZ = 240
/** standard deviation (s) of the zero-phase Gaussian applied to the elbow swivel */
const BEND_SIGMA = 0.04
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
  /** baked, smoothed elbow bend directions: 3 floats per sample per arm */
  private bendR: Float32Array
  /** baked, smoothed hand offsets (author frame) that keep keyframed arms out of the trunk and head */
  private clearR: Float32Array
  private clearL: Float32Array
  private bendL: Float32Array
  private bends: ArmBends = { r: new Vector3(), l: new Vector3() }
  /** mocap mode: the clip drives the real skeleton; the keyframe track is unused */
  readonly clip: ClipTrack | null = null
  readonly rig: Rig | null = null
  private grip: Grip | null = null
  /** pro arm keys warping the clip's right arm */
  private warp: ArmWarp | null = null
  private leftWarp: ArmWarp | null = null
  private fingers: { right: FingerCurl; left: FingerCurl } | null = null
  private leftGrip: LeftHandOnGrip | null = null
  /** keeps the arms out of the trunk (baked once the rest of the pose is set up) */
  private clear: { right: ArmClearance; left: ArmClearance } | null = null
  private qTmp = new Quaternion()
  private vTmp = new Vector3()
  private vA = new Vector3()
  private vB = new Vector3()
  private vC = new Vector3()
  /** which way the left hand's (fingers × across) normal points relative to the palm */
  private palmSign = 1
  /** bones the mesh copies from the rig: the clip's plus the fingers this runtime curls */
  readonly animated: string[] = []
  private outDir = new Vector3(0, 0, -1)
  private bounceP = new Vector3()
  private bounceV = new Vector3()

  constructor(stroke: Stroke, clip?: ClipData | null) {
    this.stroke = stroke
    this.track = new PoseTrack(stroke.keys)
    this.duration = stroke.duration
    if (clip) {
      this.rig = new Rig()
      this.clip = new ClipTrack(clip, this.rig)
      this.grip = makeGrip(this.rig, stroke.grips[0]?.id ?? 'semi-western')
      this.duration = this.clip.duration
      const want = stroke.contactRacket
      this.fingers = { right: new FingerCurl(this.rig, 'Right'), left: new FingerCurl(this.rig, 'Left') }
      {
        // palm side of the left hand: the side facing the body in the rest pose
        const rig = this.rig
        rig.resetLocal()
        rig.pose(null)
        const P = (n: string) => rig.pos[rig.find(n)]
        const hand = P('LeftHand')
        const n = P('LeftHandMiddle1').clone().sub(hand).cross(P('LeftHandIndex1').clone().sub(P('LeftHandPinky1')))
        this.palmSign = n.dot(P('Hips').clone().setY(hand.y).sub(hand)) >= 0 ? 1 : -1
      }
      this.animated = [...clip.bones, ...this.fingers.right.bones, ...this.fingers.left.bones]
      if (stroke.leftArmKeys?.length)
        this.leftWarp = new ArmWarp(this.rig, (t) => this.basePose(t), clip.events.contact, null, stroke.leftArmKeys, 'Left', this.duration)
      if (stroke.armKeys?.length)
        this.warp = new ArmWarp(this.rig, (t) => this.basePose(t), clip.events.contact, this.grip, stroke.armKeys, 'Right', this.duration)
      else if (want) {
        const hand = this.rig.find('RightHand')
        const qs = [-0.02, -0.01, 0, 0.01, 0.02].map((dt) => {
          this.clip!.apply(this.rig!, clip.events.contact + dt)
          return this.rig!.quat[hand].clone()
        })
        this.grip = calibrateGrip(this.grip, qs, want.dir, want.normal)
      }
      if (stroke.leftGrip?.length) {
        // the left hand holds the handle the way the capture's left hand holds it, sampled where the stroke
        // keeps both hands on the racket
        const rig = this.rig, contact = clip.events.contact
        const pose = (t: number) => {
          this.basePose(t)
          this.warp?.apply(rig, t)
        }
        const samples: number[] = []
        for (let t = 0; t <= this.duration; t += 0.05) if (keyed(stroke.leftGrip, t - contact) > 0.99) samples.push(t)
        this.leftGrip = new LeftHandOnGrip(rig, captureLeftGrip(rig, this.grip, pose, samples, makeLeftGrip(rig)))
      }
      {
        const rig = this.rig
        const clear = { right: new ArmClearance(new Arm(rig, 'Right')), left: new ArmClearance(new Arm(rig, 'Left')) }
        clear.right.bake(rig, this.duration, (t) => this.armPose(t))
        this.clear = { right: clear.right, left: new ArmClearance(new Arm(rig, 'Left')) }
        clear.left.bake(rig, this.duration, (t) => this.armPose(t, true), (t) => this.onGripAt(t) > 0.5)
        this.clear = clear
      }
    }

    const scratch = createSolved()
    // pass 1: bake the raw elbow bend directions, then smooth them so the elbow swivels
    // continuously instead of whipping round where the arm lines up with its pole
    const nb = this.clip ? 2 : Math.max(2, Math.round(this.duration * BEND_HZ) + 1)
    const rawR = new Float32Array(nb * 3)
    const rawL = new Float32Array(nb * 3)
    const rawDR = new Float32Array(nb * 3)
    const rawDL = new Float32Array(nb * 3)
    for (let i = 0; i < nb; i++) {
      if (!this.clip) {
        // keep the arms out of the trunk and head: record how far the hands had to move, then bake the
        // bends from the cleared pose (both are smoothed below, so corrections fade in and out)
        const t = (i / (nb - 1)) * this.duration
        const pose = this.track.sample(t, this.pose)
        const r0 = [...pose.rHand], l0 = [...pose.lHand]
        for (let k = 0; k < 3; k++) {
          solve(pose, scratch)
          if (!clearPose(pose, scratch)) break
        }
        rawDR.set([pose.rHand[0] - r0[0], pose.rHand[1] - r0[1], pose.rHand[2] - r0[2]], i * 3)
        rawDL.set([pose.lHand[0] - l0[0], pose.lHand[1] - l0[1], pose.lHand[2] - l0[2]], i * 3)
        solve(pose, scratch)
      }
      rawR.set([scratch.bendR.x, scratch.bendR.y, scratch.bendR.z], i * 3)
      rawL.set([scratch.bendL.x, scratch.bendL.y, scratch.bendL.z], i * 3)
    }
    this.bendR = gaussian3(rawR, nb, (BEND_SIGMA * (nb - 1)) / this.duration)
    this.bendL = gaussian3(rawL, nb, (BEND_SIGMA * (nb - 1)) / this.duration)
    this.clearR = gaussian3(rawDR, nb, (BEND_SIGMA * (nb - 1)) / this.duration)
    this.clearL = gaussian3(rawDL, nb, (BEND_SIGMA * (nb - 1)) / this.duration)

    for (let i = 0; i < TRAIL_SAMPLES; i++) {
      const t = (i / (TRAIL_SAMPLES - 1)) * this.duration
      this.solveAt(t, scratch)
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
      this.solveAt(ball.contactT, scratch)
      this.contact = scratch.racketHead.clone()
      const points: { t: number; p: Vector3 }[] = ball.waypoints.map((w, i) => {
        if (w.p === 'lHand') {
          const next = ball.waypoints[i + 1]
          const target = next && next.p !== 'lHand' ? { t: next.t, p: toWorld(next.p, new Vector3()) } : { t: ball.contactT, p: this.contact! }
          const release = this.rig ? this.tossRelease(w.t, target) : w.t
          this.solveAt(release, scratch)
          this.heldUntil = release
          return { t: release, p: this.heldBall(scratch, new Vector3()) }
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

  /**
   * Where the ball sits while held in the left hand: in the fingers, just off the palm. Mocap: from the rig's hand
   * bones (the palm's own normal); keyframed bodies: above the wrist.
   */
  private heldBall(s: Solved, out: Vector3) {
    const rig = this.rig
    if (!rig) return out.copy(s.wristL).setY(s.wristL.y + 0.06)
    const P = (n: string) => rig.pos[rig.find(n)]
    const hand = P('LeftHand')
    const f = this.vA.copy(P('LeftHandMiddle1')).sub(hand)
    const across = this.vB.copy(P('LeftHandIndex1')).sub(P('LeftHandPinky1'))
    const n = this.vC.copy(f).cross(across).normalize().multiplyScalar(this.palmSign)
    return out.copy(hand).addScaledVector(f, 0.95).addScaledVector(n, 0.045)
  }

  /**
   * The toss's release: the moment near `nominal` when the hand's upward velocity best matches the velocity the
   * ball needs to reach `target` on a ballistic path, so the ball leaves the fingers instead of jumping out of them.
   */
  private tossRelease(nominal: number, target: { t: number; p: Vector3 }) {
    const s = createSolved()
    const at = (t: number, out: Vector3) => {
      this.solveAt(t, s)
      return this.heldBall(s, out)
    }
    const a = new Vector3(), b = new Vector3()
    let best = nominal, cost = Infinity
    for (let t = nominal - 0.25; t <= nominal + 0.12; t += 1 / 120) {
      const d = target.t - t
      if (d < 0.4) break
      at(t - 1 / 240, a)
      at(t + 1 / 240, b)
      const hand = b.clone().sub(a).multiplyScalar(120)
      const p = a.add(b).multiplyScalar(0.5)
      const need = target.p.clone().sub(p).divideScalar(d)
      need.y += 0.5 * G * d
      const c = need.distanceTo(hand)
      if (c < cost) { cost = c; best = t }
    }
    return best
  }

  /** the clip at `t` with the stroke's trunk correction, before the arm warp */
  private basePose(t: number) {
    this.clip!.apply(this.rig!, t)
    const yaw = this.stroke.trunkYaw
    if (yaw?.length) turnTrunk(this.rig!, keyed(yaw, t - this.clip!.data.events.contact))
  }

  /** forearm roll (radians) added at `t` on top of the clip, smoothstep between keys */
  private rollAt(t: number) {
    const keys = this.stroke.forearmRoll
    if (!keys?.length || !this.clip) return 0
    const x = t - this.clip.data.events.contact
    if (x <= keys[0][0]) return (keys[0][1] * Math.PI) / 180
    for (let i = 0; i < keys.length - 1; i++) {
      const [t0, a0] = keys[i]
      const [t1, a1] = keys[i + 1]
      if (x <= t1) {
        const u = (x - t0) / (t1 - t0)
        return ((a0 + (a1 - a0) * u * u * (3 - 2 * u)) * Math.PI) / 180
      }
    }
    return (keys[keys.length - 1][1] * Math.PI) / 180
  }

  /** the body at `t` without gaze: from the clip on the real skeleton, or from the keyframes */
  /** how much the left hand is on the racket at clip time `t` (0..1) */
  private onGripAt(t: number) {
    return this.leftGrip && this.clip ? keyed(this.stroke.leftGrip!, t - this.clip.data.events.contact) : 0
  }

  /**
   * Poses the rig's arms at clip time `t`: the capture, the arm warps and the right arm's clearance; with `left`,
   * also the left hand on the grip (the left arm's clearance comes after).
   */
  private armPose(t: number, left = false) {
    const rig = this.rig!
    this.basePose(t)
    this.leftWarp?.apply(rig, t)
    if (this.warp) this.warp.apply(rig, t)
    else {
      const roll = this.rollAt(t)
      if (roll) rig.twistLocal(rig.find('RightHand'), roll)
    }
    if (!left) return
    this.clear?.right.apply(rig, t)
    // two-handers: the left hand closes on the handle just above the right
    if (this.leftGrip) {
      const hq = rig.quat[rig.find('RightHand')]
      const racket = this.qTmp.copy(hq).multiply(this.grip!.q)
      const centre = this.vTmp.copy(this.grip!.p).applyQuaternion(hq).add(rig.pos[rig.find('RightHand')])
      this.leftGrip.apply(rig, racket, centre, this.onGripAt(t), this.stroke.leftGripAt)
    }
  }

  private solveAt(t: number, out: Solved) {
    if (this.clip && this.rig && this.grip) {
      this.armPose(t, true)
      const onGrip = this.onGripAt(t)
      this.clear?.left.apply(this.rig, t, 1 - onGrip)
      // the capture has no fingers: close the racket hand on the handle, relax the other
      this.fingers!.right.apply(this.rig, 1)
      this.fingers!.left.apply(this.rig, 0.35 + 0.65 * onGrip)
      rigToSolved(this.rig, this.grip, out)
    } else {
      solve(this.sampleCleared(t), out, null, this.bendsAt(t))
    }
    return out
  }

  /** the keyframed pose at `t` with the baked hand offsets that keep the arms out of the trunk (see clearPose) */
  private sampleCleared(t: number) {
    const pose = this.track.sample(t, this.pose)
    const n = this.clearR.length / 3
    const f = Math.min(Math.max(t / this.duration, 0), 1) * (n - 1)
    const i = Math.min(Math.floor(f), n - 2)
    const u = f - i
    const at = (a: Float32Array, c: number) => a[i * 3 + c] * (1 - u) + a[i * 3 + 3 + c] * u
    pose.rHand = [pose.rHand[0] + at(this.clearR, 0), pose.rHand[1] + at(this.clearR, 1), pose.rHand[2] + at(this.clearR, 2)]
    pose.lHand = [pose.lHand[0] + at(this.clearL, 0), pose.lHand[1] + at(this.clearL, 1), pose.lHand[2] + at(this.clearL, 2)]
    return pose
  }

  /** Samples the pose at `t`, resolves the head gaze against the ball, and returns the solved skeleton. */
  evaluate(t: number, out: Solved, ballOut: Vector3): { ballVisible: boolean; held?: boolean } {
    const ballVisible = this.ballAt(t, ballOut)
    if (this.clip) {
      // captured motion already carries the player's real head and eye line
      this.solveAt(t, out)
      if (this.stroke.ball && this.heldUntil >= 0 && t < this.heldUntil) {
        this.heldBall(out, ballOut)
        return { ballVisible: true, held: true }
      }
      return { ballVisible }
    }
    this.sampleCleared(t)
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
    solve(this.pose, out, gaze, this.bendsAt(t))
    if (spec && this.heldUntil >= 0 && t < this.heldUntil) {
      ballOut.copy(out.wristL).y += 0.06
      return { ballVisible: true, held: true }
    }
    return { ballVisible }
  }

  /** smoothed elbow bend directions at time `t` (linear between baked samples) */
  private bendsAt(t: number): ArmBends {
    const n = this.bendR.length / 3
    const f = Math.min(Math.max(t / this.duration, 0), 1) * (n - 1)
    const i = Math.min(Math.floor(f), n - 2)
    const u = f - i
    const read = (a: Float32Array, out: Vector3) =>
      out.set(
        a[i * 3] * (1 - u) + a[i * 3 + 3] * u,
        a[i * 3 + 1] * (1 - u) + a[i * 3 + 4] * u,
        a[i * 3 + 2] * (1 - u) + a[i * 3 + 5] * u,
      )
    read(this.bendR, this.bends.r)
    read(this.bendL, this.bends.l)
    return this.bends
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

/** zero-phase Gaussian low-pass over a series of 3-vectors (edges clamped); `sigma` is in samples */
function gaussian3(src: Float32Array, n: number, sigma: number): Float32Array {
  const out = new Float32Array(src.length)
  const r = Math.max(1, Math.ceil(sigma * 3))
  const w: number[] = []
  for (let k = -r; k <= r; k++) w.push(Math.exp(-(k * k) / (2 * sigma * sigma)))
  for (let i = 0; i < n; i++) {
    let x = 0, y = 0, z = 0, sum = 0
    for (let k = -r; k <= r; k++) {
      const j = Math.min(Math.max(i + k, 0), n - 1)
      const wk = w[k + r]
      x += src[j * 3] * wk
      y += src[j * 3 + 1] * wk
      z += src[j * 3 + 2] * wk
      sum += wk
    }
    out[i * 3] = x / sum
    out[i * 3 + 1] = y / sum
    out[i * 3 + 2] = z / sum
  }
  return out
}
