import { READY, mergePose, sequence } from '../engine/pose'
import type { PoseInput, Stroke } from '../engine/types'
import { FOREHAND_ARM_KEYS } from './forehand'

/** Ready position at the net: racket head higher, hands further out. */
const NET_READY = mergePose(READY, {
  pelvis: [0, 0.92, 0],
  rHand: [0.12, 1.2, 0.4],
  lHand: [-0.1, 1.22, 0.45],
  racketDir: [-0.1, 0.8, 0.55],
  racketNormal: [-0.95, 0, -0.25],
})

/** NET_READY carried forward by `dz` metres (hands and feet move with the pelvis). */
const netReadyAt = (dz: number): PoseInput => ({
  pelvis: [0, 0.92, dz],
  rHand: [0.12, 1.2, 0.4 + dz],
  lHand: [-0.1, 1.22, 0.45 + dz],
  lFoot: { p: [-0.3, 0, 0.02 + dz] },
  rFoot: { p: [0.3, 0, 0.02 + dz] },
})

// Volleys: shoulder turn ~45°, racket set no further back than the shoulder, the opposite foot
// steps across so it lands at contact, contact ~0.5 m in front of the front shoulder with the
// racket head above the wrist and the face ~15° open, then a punch of ~0.35 m. Racket speed at
// contact ~8–12 m/s; the incoming ball ~20–25 m/s.
const forehandVolleyKeys = sequence(NET_READY)
  .key(0.0)
  // the face opens toward the net as the hands start right
  .key(0.15, {
    pelvis: [0.03, 0.91, -0.01],
    pelvisRot: [14, 10, 0],
    chestRot: [12, 10, 0],
    rHand: [0.28, 1.26, 0.28],
    rPole: [0.85, -0.3, -0.3],
    lHand: [-0.02, 1.16, 0.42],
    lAttach: 0.8,
    racketDir: [0.1, 0.9, 0.4],
    racketNormal: [-0.5, 0.4, 0.75],
    rFoot: { turn: 30 },
  })
  // shoulder turn: racket set beside the right shoulder, tip up, elbow in front of the body
  .key(0.3, {
    pelvis: [0.05, 0.9, -0.02],
    pelvisRot: [28, 10, 0],
    chestRot: [22, 10, 0],
    rHand: [0.42, 1.3, 0.1],
    rPole: [0.9, -0.2, -0.4],
    lHand: [0.04, 1.1, 0.4],
    lAttach: 0,
    lPole: [-0.6, -0.8, 0.2],
    racketDir: [0.25, 0.85, -0.4],
    racketNormal: [0.6, 0.4, 0.7],
    rFoot: { turn: 45 },
  })
  // the left foot crosses in the air as the racket starts forward
  .key(0.44, {
    pelvis: [0.0, 0.9, 0.06],
    pelvisRot: [22, 12, 0],
    chestRot: [16, 10, 0],
    rHand: [0.42, 1.18, 0.26],
    rPole: [0.85, -0.4, -0.3],
    lHand: [-0.1, 1.06, 0.42],
    racketDir: [0.45, 0.75, -0.1],
    racketNormal: [0.1, 0.4, 0.9],
    lFoot: { p: [-0.16, 0.06, 0.3], turn: 5, heel: 25 },
    rFoot: { heel: 15 },
  })
  // contact: front foot lands, ball met in front of the front shoulder, head above the wrist, face slightly open
  .key(0.55, {
    pelvis: [-0.05, 0.9, 0.15],
    pelvisRot: [14, 14, 0],
    chestRot: [10, 10, 0],
    rHand: [0.36, 1.02, 0.42],
    rPole: [0.8, -0.5, -0.2],
    lHand: [-0.2, 1.02, 0.4],
    racketDir: [0.65, 0.5, 0.55],
    racketNormal: [-0.4, 0.3, 0.86],
    lFoot: { p: [-0.05, 0, 0.5], turn: 10, heel: 5 },
    rFoot: { heel: 25 },
  })
  // punch: short and firm, forward and a little down, face still open
  .key(0.75, {
    pelvis: [-0.08, 0.9, 0.22],
    pelvisRot: [6, 14, 0],
    chestRot: [2, 10, 0],
    rHand: [0.28, 0.92, 0.66],
    rPole: [0.7, -0.6, 0.0],
    lHand: [-0.25, 1.02, 0.35],
    racketDir: [0.55, 0.4, 0.73],
    racketNormal: [-0.45, 0.4, 0.8],
  })
  // racket straight back up, left hand finds the throat, back foot closes in
  .key(1.0, {
    pelvis: [-0.04, 0.91, 0.25],
    pelvisRot: [0, 10, 0],
    chestRot: [0, 12, 0],
    rHand: [0.18, 1.14, 0.6],
    rPole: [0.6, -0.7, -0.2],
    lHand: [-0.1, 1.2, 0.55],
    lAttach: 1.5,
    lPole: [-0.5, -0.8, -0.2],
    racketDir: [0.0, 0.8, 0.6],
    racketNormal: [-0.7, 0.25, 0.65],
    rFoot: { p: [0.3, 0, 0.3], turn: 12, heel: 8 },
  })
  .key(1.6, mergePose(NET_READY, netReadyAt(0.27)))
  .done()

export const forehandVolley: Stroke = {
  id: 'forehand-volley',
  clip: 'forehand-volley',
  contactRacket: { dir: [0.55, 0.65, 0.35], normal: [-0.35, 0.25, 0.9] },
  // the captured player turned the shoulders ~80°, a groundstroke's turn; a volley takes ~50°
  trunkYaw: [[-1.23, 0], [-0.7, -8], [-0.4, -22], [-0.2, -25], [-0.05, -8], [0.05, 0]],
  // A volley, not a small groundstroke: the head stays above the wrist from the ready position through the
  // short take-back beside the shoulder, the face open to the ball, then a punch toward the target that stops
  // in front instead of wrapping across the body.
  armKeys: [
    { t: -1.23, racket: { dir: [-0.25, 0.75, 0.6] } },
    { t: -0.73, racket: { dir: [0.1, 0.9, 0.4] } },
    { t: -0.3, hand: 'clip', racket: { dir: [0.3, 0.85, -0.2], normal: [-0.3, 0.35, 0.88] } },
    { t: -0.13, racket: { dir: [0.4, 0.8, 0.1], normal: [-0.35, 0.3, 0.88] } },
    { t: 0, hand: 'clip', racket: { dir: [0.55, 0.65, 0.35], normal: [-0.35, 0.25, 0.9] } },
    { t: 0.12, hand: [0.2, -0.2, 0.5], racket: { dir: [0.45, 0.6, 0.65], normal: [-0.35, 0.4, 0.85] } },
    { t: 0.3, hand: [0.1, -0.28, 0.4], racket: { dir: [0.1, 0.8, 0.6] } },
    { t: 0.6, hand: 'clip' },
    { t: 0.95, racket: { dir: [-0.25, 0.75, 0.6] } },
  ],
  name: 'Forehand volley',
  category: 'net',
  level: 'beginner',
  tagline: 'No swing. Turn, step, punch. The racket head stays above the wrist and the ball does the work.',
  description:
    'A volley is a block or punch hit before the ball bounces, from around the service line to the net. With a continental grip the racket head stays above the hand, the shoulders turn to take the racket back no further than the back shoulder, and the left foot steps across toward the ball as the racket moves forward and slightly down through contact. The face is a touch open so the ball clears the net with underspin. The follow-through is short: the ball is already fast, your job is direction and depth.',
  grips: [{ id: 'continental', note: 'Bevel 2. One grip for both volleys means no grip change at the net where there is no time for one.' }],
  duration: 1.6,
  origin: [0.3, 9.4],
  keys: forehandVolleyKeys,
  ball: {
    contactT: 0.55,
    waypoints: [{ t: 0.05, p: [0.5, 1.5, 12.5] }],
    out: [-2.5, 0.2, 14],
  },
  phases: [
    { id: 'ready', name: 'Net ready position', t0: 0, t1: 0.15, keyT: 0.02, focus: 'racket',
      summary: 'Higher than the baseline ready: racket head at chin height, hands out in front, weight forward on the toes.',
      cues: ['Racket head at chin height', 'Hands well in front', 'Weight on the toes'] },
    { id: 'turn', name: 'Shoulder turn', t0: 0.15, t1: 0.4, keyT: 0.3, focus: 'shoulders',
      summary: 'The shoulders turn and take the racket back, no further than the back shoulder, tip up. The elbow stays in front of the body.',
      cues: ['Turn, don’t swing', 'Racket stops at the shoulder', 'Elbow in front of the body'] },
    { id: 'step-contact', name: 'Step and contact', t0: 0.4, t1: 0.65, keyT: 0.55, focus: 'racket',
      summary: 'The left foot steps across toward the ball and lands as the racket meets it. Contact in front of the front shoulder, racket head above the wrist, face slightly open.',
      cues: ['Step with the opposite foot', 'Contact in front of the shoulder', 'Racket head above the wrist'] },
    { id: 'punch', name: 'Punch through', t0: 0.65, t1: 0.9, keyT: 0.75, focus: 'racket',
      summary: 'A short, firm follow-through forward and a little down; the racket travels less than half a metre after contact.',
      cues: ['Short, firm follow-through', 'Squeeze the grip at contact', 'Strings finish facing the target'] },
    { id: 'recover', name: 'Recover forward', t0: 0.9, t1: 1.6, keyT: 1.2, focus: 'body',
      summary: 'Bring the racket straight back to the net ready position while moving forward to close the net.',
      cues: ['Racket back up immediately', 'Close in a step', 'Split step as the opponent hits'] },
  ],
  commonErrors: [
    { error: 'Swinging like a groundstroke and dumping the ball in the net.', fix: 'Practise volleys with the back against a fence so the racket cannot go back.' },
    { error: 'Racket head drops below the wrist on low balls.', fix: 'Bend the knees to get down, keep the racket head level with or above the wrist.' },
    { error: 'Stepping with the same-side foot.', fix: 'Say “left foot” out loud on every forehand volley until the cross-step is automatic.' },
  ],
  drills: [
    'Fence volleys: stand with your back to the fence and volley a partner’s soft feeds.',
    'Catch drill: without a racket, catch feeds in front of the shoulder with a cross-step.',
    'Volley-volley: two players at the service lines keeping a rally up without a bounce.',
  ],
  proTags: ['volley'],
}

// racketNormal is the palm side, so on the backhand the hitting face is its opposite.
const backhandVolleyKeys = sequence(NET_READY)
  .key(0.0)
  // both hands take the racket left, face closing slightly
  .key(0.15, {
    pelvis: [-0.03, 0.91, -0.01],
    pelvisRot: [-14, 10, 0],
    chestRot: [-14, 10, 0],
    rHand: [-0.14, 1.26, 0.3],
    rPole: [0.7, -0.5, -0.4],
    racketDir: [-0.15, 0.9, 0.4],
    racketNormal: [-0.5, 0.2, -0.85],
    lFoot: { turn: -30 },
  })
  // shoulder turn: racket set by the left shoulder, tip up, left hand still on the throat
  .key(0.3, {
    pelvis: [-0.05, 0.9, -0.02],
    pelvisRot: [-28, 10, 0],
    chestRot: [-26, 10, 0],
    rHand: [-0.3, 1.3, 0.14],
    rPole: [0.7, -0.3, -0.5],
    lPole: [-0.9, -0.2, -0.3],
    racketDir: [-0.25, 0.85, -0.4],
    racketNormal: [0.3, 0.3, -0.9],
    lFoot: { turn: -45 },
  })
  // right foot crosses in the air, left hand releases and starts back
  .key(0.44, {
    pelvis: [0.0, 0.9, 0.06],
    pelvisRot: [-22, 12, 0],
    chestRot: [-18, 10, 0],
    rHand: [-0.34, 1.16, 0.3],
    rPole: [0.4, -0.85, -0.3],
    lHand: [-0.28, 1.12, -0.06],
    lAttach: 0,
    lPole: [-0.6, -0.7, -0.3],
    racketDir: [-0.5, 0.75, -0.05],
    racketNormal: [0.0, 0.3, -0.95],
    rFoot: { p: [0.14, 0.06, 0.3], turn: -5, heel: 25 },
    lFoot: { heel: 15 },
  })
  // contact: right foot lands, ball met in front of the front shoulder, knuckles to the target, face slightly open
  .key(0.55, {
    pelvis: [0.04, 0.9, 0.15],
    pelvisRot: [-14, 14, 0],
    chestRot: [-12, 10, 0],
    rHand: [-0.3, 1.04, 0.46],
    rPole: [0.3, -0.9, 0.0],
    lHand: [-0.2, 1.08, -0.26],
    racketDir: [-0.65, 0.5, 0.55],
    racketNormal: [0.4, -0.3, -0.86],
    rFoot: { p: [0.05, 0, 0.5], turn: -10, heel: 5 },
    lFoot: { heel: 25 },
  })
  // punch: short, firm, the two arms moving apart
  .key(0.75, {
    pelvis: [0.06, 0.9, 0.22],
    pelvisRot: [-8, 14, 0],
    chestRot: [-6, 10, 0],
    rHand: [-0.16, 0.96, 0.68],
    rPole: [0.4, -0.9, 0.1],
    lHand: [-0.12, 1.08, -0.4],
    racketDir: [-0.55, 0.45, 0.7],
    racketNormal: [0.45, -0.4, -0.8],
  })
  // both hands back on the racket, racket up, a step closer to the net
  .key(1.0, {
    pelvis: [0.04, 0.91, 0.25],
    pelvisRot: [0, 10, 0],
    chestRot: [0, 12, 0],
    rHand: [0.04, 1.14, 0.6],
    rPole: [0.6, -0.7, -0.2],
    lHand: [-0.1, 1.2, 0.55],
    lAttach: 1.5,
    lPole: [-0.5, -0.8, -0.2],
    racketDir: [-0.1, 0.8, 0.6],
    racketNormal: [-0.5, -0.1, -0.86],
    lFoot: { p: [-0.3, 0, 0.3], turn: -12, heel: 8 },
  })
  .key(1.6, mergePose(NET_READY, netReadyAt(0.27)))
  .done()

export const backhandVolley: Stroke = {
  id: 'backhand-volley',
  clip: 'backhand-volley',
  contactRacket: { dir: [-0.55, 0.65, 0.35], normal: [-0.35, -0.25, -0.9] },
  // (racket normals are the palm-side face, which on a backhand faces away from the ball)
  // Head up throughout: take-back to the left shoulder with the face open, contact in front, a short punch
  // toward the target (the capture swept the arm down and across to the right after contact).
  armKeys: [
    { t: -0.97, hand: [-0.18, -0.35, 0.3], racket: { dir: [-0.2, 0.75, 0.6] } },
    { t: -0.5, hand: [-0.3, -0.25, 0.2], racket: { dir: [-0.3, 0.85, 0.3] } },
    { t: -0.2, hand: 'clip', racket: { dir: [-0.35, 0.85, -0.3], normal: [-0.3, -0.3, -0.9] } },
    { t: -0.07, racket: { dir: [-0.45, 0.8, 0.1], normal: [-0.35, -0.3, -0.88] } },
    { t: 0, hand: 'clip', racket: { dir: [-0.55, 0.65, 0.35], normal: [-0.35, -0.25, -0.9] } },
    { t: 0.12, hand: [-0.3, -0.25, 0.42], racket: { dir: [-0.45, 0.6, 0.65], normal: [-0.35, -0.4, -0.85] } },
    { t: 0.3, hand: [-0.2, -0.3, 0.38], racket: { dir: [-0.1, 0.8, 0.6] } },
    { t: 0.78, hand: [-0.18, -0.35, 0.3], racket: { dir: [-0.2, 0.75, 0.6] } },
  ],
  name: 'Backhand volley',
  category: 'net',
  level: 'beginner',
  tagline: 'One hand, a firm wrist and the left hand pulling back the other way.',
  description:
    'Even most two-handed players volley the backhand with one hand: the reach is longer and the racket is easier to keep above the wrist. The left hand holds the throat during the turn and releases as the racket goes forward, moving back to balance the body and keep the shoulders sideways. The right foot steps across, and contact happens in front of the front shoulder with the racket head up and the face slightly open.',
  grips: [{ id: 'continental', note: 'Bevel 2. Knuckles face the target at contact.' }],
  duration: 1.6,
  origin: [-0.3, 9.4],
  keys: backhandVolleyKeys,
  ball: {
    contactT: 0.55,
    waypoints: [{ t: 0.05, p: [-0.5, 1.5, 12.5] }],
    out: [2.5, 0.2, 14],
  },
  phases: [
    { id: 'ready', name: 'Net ready position', t0: 0, t1: 0.15, keyT: 0.02, focus: 'racket',
      summary: 'Racket head at chin height, left hand cradling the throat, weight on the toes.',
      cues: ['Racket up', 'Left hand on the throat', 'Toes, not heels'] },
    { id: 'turn', name: 'Shoulder turn', t0: 0.15, t1: 0.4, keyT: 0.3, focus: 'shoulders',
      summary: 'Shoulders turn left with both hands still on the racket; the racket sets by the left shoulder, tip up.',
      cues: ['Both hands take it back', 'Racket by the shoulder, no further', 'Knuckles toward the net'] },
    { id: 'step-contact', name: 'Step and contact', t0: 0.4, t1: 0.65, keyT: 0.55, focus: 'racket',
      summary: 'Right foot across, left hand releases and moves back, racket moves forward to meet the ball in front of the front shoulder.',
      cues: ['Right foot steps across', 'Left hand lets go and goes back', 'Contact in front, head above wrist'] },
    { id: 'punch', name: 'Punch through', t0: 0.65, t1: 0.9, keyT: 0.75, focus: 'racket',
      summary: 'Short follow-through forward and slightly down, wrist firm, the two arms moving apart.',
      cues: ['Firm wrist', 'Arms separate', 'Short finish'] },
    { id: 'recover', name: 'Recover forward', t0: 0.9, t1: 1.6, keyT: 1.2, focus: 'body',
      summary: 'Both hands back on the racket, racket back up, a step closer to the net.',
      cues: ['Racket up first', 'Close the net', 'Split step'] },
  ],
  commonErrors: [
    { error: 'Left hand stays on the racket and the volley becomes a two-handed push with no reach.', fix: 'Release the left hand as the racket starts forward; feel it move backward.' },
    { error: 'Wrist flicks and the ball floats.', fix: 'Squeeze the grip just before contact; the racket face should not change angle through the hit.' },
  ],
  drills: [
    'Shadow the volley with the left hand holding a ball: the ball must move back as the racket moves forward.',
    'Alternating volleys: partner feeds forehand, backhand, forehand; you cross-step every time.',
  ],
  proTags: ['volley'],
}

// A forehand hit out of the air while moving in: shorter backswing, full shoulder turn (~85°),
// contact at chest height ~0.5 m in front, a flatter path than a groundstroke, forward momentum.
const swingVolleyKeys = sequence()
  .key(0.0, { pelvis: [0, 0.94, 0] })
  // early turn while stepping in, face rolling over the top
  .key(0.2, {
    pelvis: [0.02, 0.92, 0.03],
    pelvisRot: [22, 8, 0],
    chestRot: [16, 10, 0],
    rHand: [0.26, 1.24, 0.24],
    rPole: [0.85, -0.3, -0.3],
    racketDir: [0.0, 0.88, 0.48],
    racketNormal: [-0.3, -0.55, -0.78],
    rFoot: { p: [0.38, 0, -0.02], turn: 45, heel: 6 },
    lFoot: { p: [-0.2, 0, 0.14], turn: 20, heel: 12 },
  })
  // racket set high at shoulder height, left hand leaving the throat
  .key(0.4, {
    pelvis: [0.05, 0.91, 0.06],
    pelvisRot: [44, 8, 1],
    chestRot: [30, 10, 0],
    rHand: [0.4, 1.4, 0.04],
    rPole: [0.9, 0.1, -0.4],
    lHand: [0.3, 1.3, 0.36],
    lAttach: 0.5,
    lPole: [-0.3, -0.9, 0.2],
    racketDir: [0.2, 0.93, 0.3],
    racketNormal: [0.9, -0.15, -0.4],
    rFoot: { p: [0.4, 0, -0.02], turn: 62, heel: 5 },
    lFoot: { p: [-0.18, 0, 0.18], turn: 28, heel: 10 },
  })
  // compact top of the backswing, still on the toes, left arm across
  .key(0.7, {
    pelvis: [0.1, 0.88, 0.1],
    pelvisRot: [56, 10, 4],
    chestRot: [30, 8, -2],
    rHand: [0.46, 1.42, -0.3],
    rPole: [0.9, 0.3, -0.45],
    lHand: [0.56, 1.32, 0.34],
    lAttach: 0,
    lPole: [-0.2, -0.9, 0.3],
    racketDir: [0.25, 0.86, -0.44],
    racketNormal: [0.9, -0.1, -0.4],
  })
  // hips open, hand starts down, only slightly below the ball
  .key(0.88, {
    pelvis: [0.06, 0.9, 0.18],
    pelvisRot: [36, 11, 2],
    chestRot: [30, 8, -4],
    rHand: [0.6, 1.18, -0.44],
    rPole: [0.85, -0.1, -0.5],
    lHand: [0.24, 1.3, 0.5],
    racketDir: [0.45, 0.2, -0.87],
    racketNormal: [0.6, -0.7, -0.35],
    rFoot: { heel: 15 },
  })
  // lag: racket ~70° behind the hand, face closing toward square, flatter path
  .key(1.0, {
    pelvis: [0.0, 0.94, 0.26],
    pelvisRot: [6, 11, 0],
    chestRot: [22, 6, -6],
    rHand: [0.46, 1.16, 0.2],
    rPole: [0.8, -0.35, -0.45],
    lHand: [-0.06, 1.2, 0.42],
    racketDir: [0.66, -0.15, -0.74],
    racketNormal: [0.4, -0.4, 0.82],
    rFoot: { turn: 45, heel: 35 },
  })
  // contact: chest high, ~0.5 m in front, weight onto the front foot, racket accelerating through
  .key(1.05, {
    pelvis: [-0.03, 0.96, 0.32],
    pelvisRot: [-12, 10, -2],
    chestRot: [4, 4, -8],
    rHand: [0.36, 1.3, 0.48],
    rPole: [0.7, -0.5, -0.3],
    lHand: [-0.2, 1.1, 0.3],
    racketDir: [0.9, -0.1, 0.42],
    racketNormal: [-0.4, -0.15, 0.9],
    rFoot: { p: [0.36, 0.05, 0.05], turn: 25, heel: 50 },
  })
  // extension through the ball
  .key(1.14, {
    pelvis: [-0.05, 0.96, 0.38],
    pelvisRot: [-26, 8, -3],
    chestRot: [-8, 2, -7],
    rHand: [0.2, 1.42, 0.6],
    rPole: [0.65, -0.3, 0.4],
    lHand: [-0.28, 1.06, 0.2],
    racketDir: [0.45, 0.55, 0.7],
    racketNormal: [-0.8, -0.3, 0.5],
    rFoot: { p: [0.36, 0.06, 0.2], turn: 10, heel: 55 },
  })
  // wiper over the left shoulder while the back foot swings through
  .key(1.28, {
    pelvis: [-0.07, 0.96, 0.44],
    pelvisRot: [-34, 6, -3],
    chestRot: [-22, 0, -5],
    rHand: [-0.06, 1.5, 0.5],
    rPole: [0.5, -0.1, 0.8],
    lHand: [-0.3, 1.1, 0.2],
    racketDir: [-0.45, 0.72, 0.53],
    racketNormal: [-0.72, -0.55, 0.42],
    rFoot: { p: [0.34, 0.04, 0.4], turn: 0, heel: 45 },
  })
  // finish, landing forward on the way to the net
  .key(1.5, {
    pelvis: [-0.06, 0.94, 0.54],
    pelvisRot: [-34, 6, -2],
    chestRot: [-30, 0, -3],
    rHand: [-0.3, 1.4, 0.36],
    rPole: [0.3, 0.1, 0.95],
    lHand: [-0.3, 1.24, 0.34],
    racketDir: [-0.6, -0.3, -0.74],
    racketNormal: [-0.75, -0.3, 0.6],
    rFoot: { p: [0.26, 0, 0.72], turn: -5, heel: 12 },
    lFoot: { p: [-0.2, 0.02, 0.44], turn: 5, heel: 30 },
  })
  // racket comes down in front as the left foot steps up; net-ready at the finish
  .key(1.78, {
    pelvis: [-0.02, 0.92, 0.68],
    pelvisRot: [-12, 8, 0],
    chestRot: [-8, 12, 0],
    rHand: [0.0, 1.1, 0.96],
    rPole: [0.6, -0.7, -0.2],
    lHand: [-0.14, 1.16, 1.0],
    lAttach: 1.4,
    lPole: [-0.6, -0.8, -0.2],
    racketDir: [-0.55, 0.3, 0.78],
    racketNormal: [0.1, -0.75, -0.65],
    lFoot: { p: [-0.28, 0, 0.72], turn: -10, heel: 8 },
    rFoot: { p: [0.3, 0, 0.74], turn: 8, heel: 8 },
  })
  .ready(2.0, {
    pelvis: [0, 0.92, 0.75],
    rHand: [0.1, 1.02, 1.09],
    lHand: [-0.1, 1.08, 1.15],
    lFoot: { p: [-0.3, 0, 0.77] },
    rFoot: { p: [0.3, 0, 0.77] },
  })
  .done()

export const swingVolley: Stroke = {
  id: 'swing-volley',
  // the forehand's captured body and Sinner-keyed arm with the whole forward swing lifted: contact at chest
  // height in front of the body instead of at the hip
  clip: 'forehand',
  trunkYaw: [[-1.46, 0], [-1.2, -5], [-0.9, -10], [-0.7, -12], [-0.55, -18], [-0.4, -22], [-0.3, -18], [-0.2, -10], [-0.12, -2], [-0.08, 0]],
  armKeys: [
    ...FOREHAND_ARM_KEYS.filter((k) => !(k.t >= -0.28 && k.t <= 0.1 && k.hand === 'clip')),
    { t: -0.45, handShift: [0, 0, 0] },
    { t: -0.27, handShift: [0, 0.12, 0] },
    { t: -0.1, handShift: [0, 0.22, 0] },
    { t: 0, handShift: [0, 0.3, 0.02] },
    { t: 0.1, handShift: [0, 0.2, 0] },
    { t: 0.3, handShift: [0, 0, 0] },
  ],
  name: 'Swing volley',
  aka: 'Drive volley',
  category: 'net',
  level: 'advanced',
  tagline: 'A full topspin forehand taken out of the air on a floating ball while moving forward.',
  description:
    'When an opponent floats a ball high and slow, the swing volley lets you take it out of the air around the service line with a full groundstroke swing instead of waiting for the bounce. It is a forehand with a slightly abbreviated backswing, contact at chest height in front of the body, and momentum carrying you forward to the net. Because there is no bounce to read, the timing comes from the shoulder turn: turn early, wait, then release.',
  grips: [
    { id: 'semi-western', note: 'Your normal forehand grip: this is a groundstroke hit in the air, not a volley.' },
  ],
  duration: 2.0,
  origin: [0.4, 6.3],
  keys: swingVolleyKeys,
  ball: {
    contactT: 1.05,
    waypoints: [{ t: 0.02, p: [0.7, 2.3, 13] }],
    out: [-1.6, 1.4, 25],
  },
  phases: [
    { id: 'read', name: 'Read and move in', t0: 0, t1: 0.5, keyT: 0.4, focus: 'body',
      summary: 'Recognise the floater early and move forward with the shoulders already turning, racket set high.',
      cues: ['Decide early', 'Move forward through the turn', 'Racket set at shoulder height'] },
    { id: 'load', name: 'Compact backswing', t0: 0.5, t1: 0.85, keyT: 0.7, focus: 'shoulders',
      summary: 'Shorter than a baseline forehand but with a full shoulder turn; the left arm points across for balance.',
      cues: ['Shorter backswing, same shoulder turn', 'Hands high', 'Stay on the toes'] },
    { id: 'drop', name: 'Drop and lag', t0: 0.85, t1: 1.02, keyT: 0.96, focus: 'racket',
      summary: 'The racket drops below the ball as the hips open; the swing path is flatter than a groundstroke because the ball is already high.',
      cues: ['Hips lead', 'Drop the racket only slightly below the ball', 'Flatter path'] },
    { id: 'contact', name: 'Contact', t0: 1.02, t1: 1.1, keyT: 1.05, focus: 'racket',
      summary: 'Chest-high contact well in front, weight moving forward onto the front foot, racket accelerating through the ball.',
      cues: ['Contact between chest and shoulder height', 'Hit through, not up', 'Weight into the shot'] },
    { id: 'finish', name: 'Finish and close', t0: 1.1, t1: 2.0, keyT: 1.5, focus: 'body',
      summary: 'Extension, then a wiper finish over the left shoulder while the back foot swings through, carrying you to the net where the racket comes back up ready for the next ball.',
      cues: ['Finish over the shoulder', 'Momentum carries you forward', 'Ready at the net immediately'] },
  ],
  commonErrors: [
    { error: 'Mistiming: hitting late because the ball never slowed down with a bounce.', fix: 'Practise on soft high feeds; say “turn” when the ball leaves the feeder’s hand, “hit” at contact.' },
    { error: 'Over-hitting a ball that only needs to be placed.', fix: 'Aim at the open court with 70 percent power; placement wins the point, not pace.' },
  ],
  drills: [
    'High floating feeds from the far baseline; take each out of the air from the service line into a corner.',
    'Approach-and-swing: hit an approach, move in, swing volley the floating reply, then finish with a volley.',
  ],
  proTags: ['swing-volley'],
}

// An abbreviated serve: sideways at once, racket straight up to the trophy, a shuffle back to get
// behind the ball, then legs drive, racket drops, full extension and pronation. Drop → contact ≈ 0.12 s.
const smashKeys = sequence(NET_READY)
  .key(0.0)
  // first move: drop step back with the right foot, racket rising with the face turning out
  .key(0.15, {
    pelvis: [0.05, 0.92, -0.06],
    pelvisRot: [30, 2, 0],
    chestRot: [8, -2, 0],
    rHand: [0.3, 1.4, 0.1],
    rPole: [0.95, -0.2, -0.3],
    lHand: [-0.06, 1.4, 0.42],
    lAttach: 0,
    lPole: [-0.8, -0.4, 0.4],
    racketDir: [0.0, 0.95, 0.3],
    racketNormal: [-0.2, 0.3, 0.93],
    rFoot: { p: [0.34, 0.06, -0.3], turn: 60, heel: 30 },
  })
  // sideways, racket straight up to the trophy, left hand pointing at the ball
  .key(0.3, {
    pelvis: [0.08, 0.92, -0.15],
    pelvisRot: [55, 0, 0],
    chestRot: [10, -5, 0],
    rHand: [0.4, 1.45, -0.3],
    rPole: [1, -0.3, -0.5],
    lHand: [-0.1, 1.55, 0.35],
    racketDir: [0.1, 0.95, -0.3],
    racketNormal: [0.95, 0, 0.3],
    rFoot: { p: [0.35, 0, -0.45], turn: 80, heel: 0 },
    lFoot: { p: [-0.1, 0, 0.05], turn: 40, heel: 5 },
  })
  // shuffle back a step to get behind the ball, arms stay set
  .key(0.55, {
    pelvis: [0.08, 0.92, -0.28],
    pelvisRot: [55, -3, -2],
    chestRot: [11, -8, -3],
    rHand: [0.4, 1.48, -0.44],
    lHand: [-0.1, 1.62, 0.22],
    racketDir: [0.1, 0.93, -0.35],
    lFoot: { p: [-0.1, 0.06, -0.1], turn: 40, heel: 30 },
    rFoot: { p: [0.35, 0, -0.6], turn: 80, heel: 0 },
  })
  // set: feet planted, knees bending, toss arm high, back arching
  .key(0.8, {
    pelvis: [0.06, 0.88, -0.28],
    pelvisRot: [55, -6, -4],
    chestRot: [12, -12, -6],
    rHand: [0.4, 1.5, -0.5],
    lHand: [-0.12, 1.75, 0.24],
    racketDir: [0.1, 0.9, -0.4],
    lFoot: { p: [-0.1, 0, -0.1], turn: 40, heel: 10 },
  })
  // legs drive as the racket falls down the back, pointing arm starting to tuck
  .key(1.1, {
    pelvis: [0.02, 0.93, -0.18],
    pelvisRot: [38, -4, -6],
    chestRot: [10, -10, -7],
    rHand: [0.36, 1.4, -0.36],
    rPole: [0.9, 0.5, -0.3],
    lHand: [-0.1, 1.5, 0.14],
    racketDir: [0.3, -0.5, -0.8],
    racketNormal: [0.9, 0.2, 0.4],
    lFoot: { heel: 35 },
    rFoot: { heel: 45 },
  })
  // deepest drop, feet leaving the ground, elbow leading up
  .key(1.2, {
    pelvis: [0.01, 0.99, -0.08],
    pelvisRot: [26, 2, -9],
    chestRot: [4, -4, -12],
    rHand: [0.28, 1.76, -0.22],
    rPole: [0.9, 0.5, 0.0],
    lHand: [-0.06, 1.34, 0.1],
    lPole: [-0.6, -0.6, 0.3],
    racketDir: [0.3, -0.7, -0.65],
    racketNormal: [0.75, 0.1, 0.65],
    lFoot: { p: [-0.1, 0.05, -0.08], turn: 25, heel: 60 },
    rFoot: { p: [0.22, 0.08, -0.45], turn: 65, heel: 60 },
  })
  // racket horizontal behind the head as the elbow extends
  .key(1.27, {
    pelvis: [0.0, 1.015, -0.03],
    pelvisRot: [18, 6, -9],
    chestRot: [-2, 2, -12],
    rHand: [0.2, 2.02, -0.06],
    rPole: [0.9, 0.4, 0.1],
    lHand: [0.02, 1.16, 0.13],
    racketDir: [0.55, 0.05, -0.83],
    racketNormal: [0.4, 0.1, 0.9],
    lFoot: { p: [-0.1, 0.08, -0.04], turn: 20, heel: 60 },
    rFoot: { p: [0.21, 0.11, -0.42], turn: 62, heel: 60 },
  })
  // contact: full extension, in front of and above the hitting shoulder, wrist snapping the face down
  .key(1.3, {
    pelvis: [0.0, 1.02, 0.0],
    pelvisRot: [12, 8, -8],
    chestRot: [-5, 6, -12],
    rHand: [0.12, 2.16, 0.06],
    rPole: [0.9, 0.3, 0.2],
    lHand: [0.06, 1.1, 0.14],
    lPole: [-0.6, -0.7, 0.3],
    racketDir: [0.1, 0.95, 0.3],
    racketNormal: [-0.15, -0.2, 0.96],
    lFoot: { p: [-0.1, 0.1, 0.0], turn: 15, heel: 60 },
    rFoot: { p: [0.2, 0.14, -0.4], turn: 60, heel: 60 },
  })
  // pronation, racket out to the right and down
  .key(1.42, {
    pelvis: [-0.02, 0.96, 0.12],
    pelvisRot: [0, 12, -3],
    chestRot: [-14, 12, -5],
    rHand: [-0.02, 1.6, 0.46],
    rPole: [0.8, -0.2, 0.5],
    lHand: [-0.14, 1.06, 0.1],
    racketDir: [-0.25, 0.35, 0.9],
    racketNormal: [0.7, -0.6, 0.4],
    lFoot: { p: [-0.08, 0.02, 0.16], turn: 5, heel: 30 },
    rFoot: { p: [0.22, 0.2, -0.35], turn: 30, heel: 70 },
  })
  // landing on the front foot, back leg kicked back
  .key(1.58, {
    pelvis: [-0.02, 0.92, 0.2],
    pelvisRot: [-8, 14, 0],
    chestRot: [-12, 12, -2],
    rHand: [-0.2, 1.14, 0.42],
    rPole: [0.6, -0.5, 0.65],
    lHand: [-0.22, 1.02, 0.2],
    racketDir: [-0.5, -0.35, 0.8],
    racketNormal: [0.7, -0.45, 0.55],
    lFoot: { p: [-0.08, 0, 0.16], turn: 5, heel: 6 },
    rFoot: { p: [0.22, 0.16, -0.22], turn: 20, heel: 70 },
  })
  // back foot swings through, racket finishing across the left side
  .key(1.8, {
    pelvis: [0.0, 0.9, 0.26],
    pelvisRot: [-12, 12, 0],
    chestRot: [-12, 10, 0],
    rHand: [-0.22, 0.98, 0.36],
    rPole: [0.5, -0.5, 0.7],
    lHand: [-0.26, 1.0, 0.3],
    racketDir: [-0.55, -0.5, 0.67],
    racketNormal: [0.5, -0.45, 0.74],
    rFoot: { p: [0.26, 0.02, 0.34], turn: 5, heel: 25 },
  })
  // racket back up in front, both hands meet
  .key(2.02, {
    pelvis: [0.0, 0.92, 0.26],
    pelvisRot: [-4, 8, 0],
    chestRot: [-4, 12, 0],
    rHand: [0.06, 1.1, 0.5],
    rPole: [0.6, -0.7, -0.2],
    lHand: [-0.1, 1.16, 0.55],
    lAttach: 1.5,
    lPole: [-0.6, -0.8, -0.2],
    racketDir: [-0.2, 0.7, 0.68],
    racketNormal: [-0.6, -0.3, 0.74],
    lFoot: { p: [-0.26, 0, 0.26], turn: -8, heel: 8 },
    rFoot: { p: [0.28, 0, 0.27], turn: 10, heel: 8 },
  })
  .key(2.2, mergePose(NET_READY, netReadyAt(0.25)))
  .done()

export const smash: Stroke = {
  id: 'smash',
  clip: 'smash',
  contactRacket: { dir: [0.1, 0.97, 0.2], normal: [0, -0.35, 0.94] },
  // The serve's arm (keyed from Sinner) with the smash's abbreviated start: the racket goes straight up into
  // the trophy instead of swinging down first, then drops down the back and reaches up to contact.
  armKeys: [
    { t: -1.4, racket: { dir: [-0.1, 0.7, 0.7] } },
    { t: -1.0, hand: 'clip', racket: { dir: [0.1, 0.9, 0.3] } },
    { t: -0.7, hand: [0.25, 0.15, -0.2], elbow: [0.25, 0, -0.08], racket: { dir: [0.1, 0.9, 0.3] } },
    { t: -0.45, hand: [0.28, 0.19, -0.29], elbow: [0.25, 0, -0.1], racket: { dir: [0.1, 0.9, 0.3] } },
    { t: -0.3, hand: [0.22, 0.12, -0.22], elbow: [0.25, 0.04, -0.05], racket: { dir: [0, 0.1, -1] } },
    { t: -0.2, hand: [0.23, -0.06, -0.18], elbow: [0.26, 0.06, 0.06], racket: { dir: [-0.2, -0.95, 0.1] } },
    { t: -0.12, hand: [0.22, 0.2, -0.15], elbow: [0.2, 0.18, 0.1], racket: { dir: [0, -0.6, -0.8] } },
    { t: -0.07, hand: [0.18, 0.45, -0.05], elbow: [0.16, 0.24, 0.07], racket: { dir: [-0.1, 0.3, -0.95] } },
    { t: -0.03, hand: [0.13, 0.52, 0.08], elbow: [0.12, 0.27, 0.05], racket: { dir: [-0.5, 0.65, -0.55] } },
    { t: 0, hand: [0.14, 0.55, 0.14], elbow: [0.07, 0.28, 0.06], racket: { dir: [0.1, 0.97, 0.2], normal: [0, -0.35, 0.94] } },
    { t: 0.05, hand: 'clip', racket: { dir: [0.3, 0.55, 0.78] } },
    { t: 0.12, racket: { dir: [-0.3, -0.3, 0.9] } },
    { t: 0.25, racket: { dir: [-0.5, -0.8, 0.3] } },
    { t: 0.93, racket: { dir: [-0.1, 0.7, 0.7] } },
  ],
  name: 'Overhead smash',
  category: 'net',
  level: 'intermediate',
  tagline: 'An abbreviated serve hit on the move. Turn sideways, point at the ball, get behind it, then throw.',
  description:
    'The smash is a serve with the toss replaced by the opponent’s lob, so the hard part is footwork: turn sideways immediately, drop-step back with the right foot, and adjust with shuffles until the ball would land on your head. The left hand points at the ball to track it and keep the shoulders sideways; the racket goes straight up to the trophy position with a shortened backswing. Then it is a serve: legs drive, racket drops, full extension, pronation, and land forward.',
  grips: [{ id: 'continental', note: 'Bevel 2, like the serve. Lets you pronate and angle the smash.' }],
  duration: 2.2,
  origin: [0.2, 8.0],
  keys: smashKeys,
  ball: {
    contactT: 1.3,
    waypoints: [{ t: 0.02, p: [0.4, 1.8, 13] }],
    out: [-2.0, -4.5, 34],
  },
  phases: [
    { id: 'turn', name: 'Turn and point', t0: 0, t1: 0.5, keyT: 0.3, focus: 'shoulders',
      summary: 'As soon as the lob is read: right foot drops back, shoulders sideways, racket straight up to trophy, left hand pointing at the ball.',
      cues: ['Drop step with the right foot', 'Racket straight up, no big loop', 'Point at the ball with the left hand'] },
    { id: 'track', name: 'Track and adjust', t0: 0.5, t1: 1.0, keyT: 0.8, focus: 'feet',
      summary: 'A shuffle step back gets behind the ball; the pointing arm and racket stay set while the knees bend and the back arches.',
      cues: ['Shuffle, stay sideways', 'Ball in front of the hitting shoulder', 'Stay on the toes'] },
    { id: 'drop', name: 'Racket drop', t0: 1.0, t1: 1.25, keyT: 1.16, focus: 'racket',
      summary: 'Legs bend and drive as the racket drops behind the back; the pointing arm begins to tuck.',
      cues: ['Legs drive', 'Racket drops, elbow leads', 'Head up on the ball'] },
    { id: 'contact', name: 'Contact', t0: 1.25, t1: 1.36, keyT: 1.3, focus: 'racket',
      summary: 'Full extension, contact in front and above the hitting shoulder, wrist snapping the racket face down onto the ball.',
      cues: ['Reach up', 'Contact in front', 'Snap the face down through the ball'] },
    { id: 'finish', name: 'Pronate and land', t0: 1.36, t1: 2.2, keyT: 1.58, focus: 'body',
      summary: 'Forearm pronates, racket finishes on the left side, body lands forward and recovers to the net.',
      cues: ['Pronate', 'Land forward', 'Back to net ready'] },
  ],
  commonErrors: [
    { error: 'Ball gets behind you and you hit it into the net or long.', fix: 'First move is always the drop step back; get behind the ball, then come forward into it.' },
    { error: 'Facing the net with a forehand grip, slapping the ball.', fix: 'Turn sideways and use the continental grip; a smash is a serve.' },
    { error: 'Watching the target instead of the ball.', fix: 'Point at the ball with the left hand and keep the head up until after contact.' },
  ],
  drills: [
    'Point drill: partner lobs, you turn, point and catch the ball with the left hand at full stretch.',
    'Shadow smash from trophy position, then live lobs with progressively deeper feeds.',
    'Smash and recover: smash, touch the net with the racket, split step, next lob.',
  ],
  proTags: ['smash'],
}

// Back almost to the net, elbow to the sky, racket hanging behind, then a fast arm extension and
// wrist snap over the ball. Power is forearm and wrist: extension → contact ≈ 0.12 s.
const backSmashKeys = sequence(NET_READY)
  .key(0.0)
  // turn starts, racket rising by the left ear
  .key(0.15, {
    pelvis: [-0.03, 0.92, -0.04],
    pelvisRot: [-35, 5, 0],
    chestRot: [-25, 5, 0],
    rHand: [-0.2, 1.45, 0.3],
    rPole: [-0.55, 0.65, 0.5],
    lHand: [-0.3, 1.14, 0.22],
    lAttach: 0,
    lPole: [-0.8, -0.5, 0.2],
    racketDir: [-0.3, 0.9, 0.2],
    racketNormal: [0.4, 0.3, -0.85],
    lFoot: { p: [-0.34, 0.05, -0.18], turn: -60, heel: 25 },
  })
  // back to the net, racket up by the left ear, elbow pointing at the ball
  .key(0.3, {
    pelvis: [-0.05, 0.92, -0.1],
    pelvisRot: [-70, 5, 0],
    chestRot: [-40, 5, 0],
    // the elbow comes up in front of the face (not over the head), the hand in front of the left shoulder
    rHand: [-0.18, 1.49, -0.29],
    rPole: [-0.8, 0.59, -0.03],
    // the free arm drops out to the left side (keyed across the body, it pressed into the chest once the body turned)
    lHand: [-0.07, 0.96, -0.39],
    lPole: [0.98, -0.07, -0.17],
    racketDir: [-0.35, 0.9, -0.2],
    racketNormal: [0.8, 0.3, -0.5],
    lFoot: { p: [-0.35, 0, -0.35], turn: -80, heel: 0 },
    rFoot: { p: [0.15, 0, 0.15], turn: -45, heel: 5 },
  })
  // the tip falls back over the shoulder
  .key(0.55, {
    pelvis: [-0.05, 0.9, -0.11],
    pelvisRot: [-73, 3, -4],
    chestRot: [-43, 0, -3],
    rHand: [-0.11, 1.46, -0.35],
    rPole: [-0.72, 0.67, -0.17],
    lHand: [-0.04, 0.92, -0.41],
    lPole: [0.99, -0.15, -0.05],
    racketDir: [-0.1, 0.3, -0.95],
    racketNormal: [0.9, 0.2, -0.4],
    lFoot: { heel: 5 },
  })
  // load: elbow high, racket head hangs down behind the back, knees bending
  .key(0.8, {
    pelvis: [-0.05, 0.88, -0.12],
    pelvisRot: [-75, 0, -8],
    chestRot: [-45, -5, -6],
    rHand: [-0.22, 1.46, -0.14],
    rPole: [-0.2, 1, -0.3],
    lHand: [0.0, 0.87, -0.41],
    lPole: [0.97, -0.23, 0.09],
    racketDir: [0.1, -0.85, -0.5],
    racketNormal: [0.9, 0.1, -0.4],
    lFoot: { heel: 10 },
  })
  // arm extending fast, tip whipping up, legs pushing (late, so the racket whips through ~90° in 70 ms)
  .key(1.08, {
    pelvis: [-0.03, 1.0, -0.08],
    pelvisRot: [-72, -3, -10],
    chestRot: [-42, -8, -14],
    rHand: [-0.1, 1.8, -0.2],
    rPole: [0.3, 0.8, -0.5],
    lHand: [-0.42, 0.98, -0.1],
    racketDir: [0.2, 0.1, -0.98],
    racketNormal: [0.9, 0.2, 0.2],
    lFoot: { heel: 45 },
    rFoot: { heel: 45 },
  })
  // contact: arm straight up, knuckles leading the face over the top of the ball
  // (a coaching demo filmed from the net: the player takes off into a scissor jump, arm fully up at contact)
  .key(1.15, {
    pelvis: [-0.02, 1.08, -0.05],
    pelvisRot: [-70, -5, -10],
    chestRot: [-40, -10, -15],
    rHand: [0.04, 2.02, -0.14],
    rPole: [0.3, 0.8, -0.5],
    lHand: [-0.46, 1.0, -0.06],
    racketDir: [0.4, 0.9, 0.1],
    racketNormal: [0.35, -0.25, 0.9],
    lFoot: { p: [-0.35, 0.12, -0.3], heel: 30 },
    rFoot: { p: [0.18, 0.08, 0.2], heel: 50 },
  })
  // snap: the face comes over the ball, racket out to the right
  .key(1.28, {
    pelvis: [-0.01, 1.04, -0.02],
    pelvisRot: [-64, 2, -6],
    chestRot: [-34, -4, -8],
    rHand: [0.28, 1.92, 0.08],
    rPole: [0.9, 0.4, 0.0],
    lHand: [-0.46, 0.98, -0.08],
    racketDir: [0.55, 0.8, 0.25],
    racketNormal: [0.4, -0.5, 0.75],
    lFoot: { p: [-0.35, 0.06, -0.3], heel: 20 },
    rFoot: { p: [0.18, 0.1, 0.2], heel: 40 },
  })
  // land with the arm still up and out to the right, racket upright, face toward the net
  .key(1.5, {
    pelvis: [0.0, 0.9, 0.0],
    pelvisRot: [-68, 6, -3],
    chestRot: [-38, 2, -4],
    rHand: [0.45, 1.72, 0.2],
    rPole: [0.9, -0.2, 0.2],
    lHand: [-0.42, 1.0, -0.06],
    racketDir: [0.55, 0.8, 0.25],
    racketNormal: [0.3, -0.45, 0.85],
    lFoot: { p: [-0.35, 0, -0.3], heel: 8 },
    rFoot: { p: [0.2, 0, 0.22], heel: 10 },
  })
  // unwind toward the net, racket coming back to the front
  .key(1.8, {
    pelvis: [0.0, 0.92, 0.04],
    pelvisRot: [-30, 8, 0],
    chestRot: [-14, 8, 0],
    rHand: [0.3, 1.1, 0.34],
    rPole: [0.8, -0.5, 0.1],
    // the free arm stays out to the left side; the left hand takes the racket back only at the ready
    lHand: [-0.5, 1.02, 0.12],
    lAttach: 0,
    lPole: [-0.6, -0.7, 0.0],
    racketDir: [0.2, 0.6, 0.78],
    racketNormal: [-0.3, -0.6, 0.74],
    lFoot: { p: [-0.32, 0, -0.1], turn: -30, heel: 6 },
    rFoot: { p: [0.28, 0, 0.1], turn: -10, heel: 10 },
  })
  .key(2.1, mergePose(NET_READY, netReadyAt(0.05)))
  .done()

export const backSmash: Stroke = {
  id: 'back-smash',
  name: 'Backhand smash',
  aka: 'Backhand overhead',
  category: 'specialty',
  level: 'advanced',
  tagline: 'The emergency overhead. Back to the net, elbow to the sky, and a snap of the wrist.',
  description:
    'When a lob goes over the left shoulder and there is no time to run around it, the backhand smash is the answer. Turn until your back almost faces the net, take the racket up by the left ear with the elbow pointing at the ball, then extend the arm and snap the wrist so the racket face comes over the top of the ball. Power comes from the forearm and wrist, not the body, so it is a placement shot: aim for the open court or an angle rather than trying to hit through the opponent.',
  grips: [
    { id: 'eastern-backhand', note: 'Bevel 1, or continental for more feel. The knuckles lead the racket over the ball.' },
  ],
  duration: 2.1,
  origin: [0.2, 8.0],
  keys: backSmashKeys,
  ball: {
    contactT: 1.15,
    waypoints: [{ t: 0.02, p: [-0.3, 1.8, 13] }],
    out: [-1.5, -1.6, 28],
  },
  phases: [
    { id: 'turn', name: 'Turn your back', t0: 0, t1: 0.55, keyT: 0.3, focus: 'shoulders',
      summary: 'The lob goes over the backhand shoulder; turn hard to the left until the back almost faces the net, racket up by the left ear.',
      cues: ['Turn all the way', 'Racket up early', 'Left foot back, right foot across'] },
    { id: 'load', name: 'Elbow to the sky', t0: 0.55, t1: 1.0, keyT: 0.8, focus: 'racket',
      summary: 'The elbow points at the ball with the racket head hanging down behind the back; the hitting face is turned toward the back fence.',
      cues: ['Point the elbow at the ball', 'Racket hangs behind the back', 'Watch the ball over the shoulder'] },
    { id: 'contact', name: 'Extend and snap', t0: 1.0, t1: 1.22, keyT: 1.15, focus: 'racket',
      summary: 'The arm extends straight up and the wrist snaps so the knuckles lead the face over the top of the ball; contact above and slightly behind the right shoulder.',
      cues: ['Straighten the arm fast', 'Knuckles lead', 'Snap over the ball'] },
    { id: 'finish', name: 'Finish and turn back', t0: 1.22, t1: 2.1, keyT: 1.5, focus: 'body',
      summary: 'The racket finishes to the right side, low; the body unwinds and turns back to face the net.',
      cues: ['Short finish to the right', 'Unwind to face the net', 'Recover to ready'] },
  ],
  commonErrors: [
    { error: 'Not turning enough, so the ball is hit with a weak flat push.', fix: 'Turn until you can see the ball over your right shoulder; the back must face the net.' },
    { error: 'Trying to hit hard with the body, losing the timing.', fix: 'Hit at 60 percent with the wrist snap; aim at the open court.' },
  ],
  drills: [
    'Partner lobs over the left shoulder from close range; catch the ball with the right hand above the right shoulder to learn the contact point.',
    'Shadow the elbow-up position and snap 20 times, then hit soft lobs.',
  ],
  proTags: ['back-smash', 'smash'],
}
