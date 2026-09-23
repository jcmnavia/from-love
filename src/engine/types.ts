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

/**
 * A pro's right-arm position at one instant of a mocap stroke. The clip's arm is warped through these
 * (hand and elbow as smooth offsets on top of the capture, the wrist as interpolated joint angles), so
 * the capture keeps its timing and texture while the racket goes where a pro's goes.
 */
export interface ArmKey {
  /** seconds relative to contact */
  t: number
  /**
   * wrist relative to the right shoulder, court frame (x = right, y = up, z = toward the net), metres;
   * 'clip' pins the capture's own hand here (no offset)
   */
  hand?: V3 | 'clip'
  /** or a shift of the capture's own wrist (court frame, metres), e.g. to raise a contact point */
  handShift?: V3
  /** elbow relative to the right shoulder (same frame as `hand`); sets where the elbow points, not the reach */
  elbow?: V3
  /** frame of `hand`, `elbow` and `racket`: the court (default) or the chest (x = right, y = up, z = the way the chest faces) */
  frame?: 'court' | 'chest'
  /** where the elbow points around the shoulder→wrist line, degrees (0 = down, see engine/rig/arm.ts) */
  swivel?: number
  /** forearm pronation, wrist extension, radial deviation, degrees */
  wrist?: V3
  /**
   * or a racket orientation (court frame: handle → tip, and the normal of the palm-side string face, which on
   * backhands faces away from the ball) the wrist reaches for within its limits; without `normal` the racket
   * only has to point along `dir`
   */
  racket?: { dir: V3; normal?: V3 }
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
  /** id of a retargeted mocap clip in public/motion; when present it drives the body instead of `keys` */
  clip?: string
  /**
   * Racket orientation at contact (author frame: handle → tip, and the string face's normal).
   * Mocap has no racket, so the grip is calibrated once per clip to match this at contact;
   * the rest of the swing then follows the captured hand.
   */
  contactRacket?: { dir: V3; normal: V3 }
  /**
   * Forearm roll (pronation +, degrees) added to a mocap clip, keyed in seconds relative to contact.
   * Optical mocap without hand markers misses most of the forearm rotation that drives the wiper
   * finish and the serve's pronation; this restores it on top of the captured motion.
   */
  forearmRoll?: [number, number][]
  /** pro arm and racket positions the clip's right arm is warped through (replaces contactRacket / forearmRoll) */
  armKeys?: ArmKey[]
  /**
   * Shoulder-turn correction for a mocap clip, degrees (+ = more turned toward the right side), keyed in
   * seconds relative to contact and spread over the three spine bones; the head keeps its direction.
   */
  trunkYaw?: [number, number][]
  /** the free (left) arm's keys: hand and elbow positions (and optional wrist angles), warped like `armKeys` */
  leftArmKeys?: ArmKey[]
  /** left hand on the handle above the right (two-handed strokes): weight keys [t from contact, 0..1] */
  leftGrip?: [number, number][]
  /** where the left hand holds, metres up the shaft from the right hand's grip (default: touching, 0.095) */
  leftGripAt?: number
}
