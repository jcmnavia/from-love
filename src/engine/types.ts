// Author frame used by every pose: x = toward the player's right, y = up,
// z = toward the net. Distances in metres, angles in degrees, time in seconds.
export type V3 = [number, number, number]

export interface FootPose {
  p: V3
  /** toes rotated toward the player's right (+) or left (-) */
  turn: number
  /** heel lift, 0 = flat */
  heel: number
}

export interface Pose {
  pelvis: V3
  /** [turn (+ = toward the right), lean (+ = forward), side (+ = tilt right)] */
  pelvisRot: V3
  /** same convention, relative to the pelvis — turn here is hip–shoulder separation */
  chestRot: V3
  rHand: V3
  rPole: V3
  lHand: V3
  /** 0 = free left hand, 1 = on the grip above the right hand, 2 = cradling the throat */
  lAttach: number
  lPole: V3
  /** handle → tip */
  racketDir: V3
  /** palm-side string face */
  racketNormal: V3
  lFoot: FootPose
  rFoot: FootPose
}

export type PoseInput = Partial<Omit<Pose, 'lFoot' | 'rFoot'>> & {
  lFoot?: Partial<FootPose>
  rFoot?: Partial<FootPose>
}

export interface Keyframe {
  t: number
  pose: Pose
}

export type FocusId = 'body' | 'shoulders' | 'hips' | 'racket' | 'feet' | 'head'

export interface Phase {
  id: string
  name: string
  t0: number
  t1: number
  /** the instant worth freezing on when the learner jumps to this phase */
  keyT: number
  summary: string
  cues: string[]
  focus: FocusId
}

export interface BallWaypoint {
  t: number
  p: V3 | 'lHand'
}

export interface BallSpec {
  contactT: number
  /** ordered points the ball passes through before contact; ballistic in between */
  waypoints: BallWaypoint[]
  /** outgoing velocity in m/s */
  out: V3
}

export type StrokeCategory = 'groundstroke' | 'serve' | 'net' | 'specialty' | 'movement'

export interface GripRef {
  id: string
  note: string
}

export interface Stroke {
  id: string
  name: string
  aka?: string
  category: StrokeCategory
  level: 'beginner' | 'intermediate' | 'advanced'
  tagline: string
  description: string
  grips: GripRef[]
  duration: number
  keys: Keyframe[]
  phases: Phase[]
  ball?: BallSpec
  commonErrors: { error: string; fix: string }[]
  drills: string[]
  /** ids used to pull matching notes out of the pro dataset */
  proTags: string[]
  /** where on court the player stands, [x, z] from the centre of the baseline (author frame) */
  origin?: [number, number]
}
