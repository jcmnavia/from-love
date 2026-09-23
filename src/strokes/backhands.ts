import { sequence } from '../engine/pose'
import type { Stroke } from '../engine/types'

// Backhand-side stances for a right-hander: left foot back, right foot steps across.
const BH_FEET = {
  lFoot: { p: [-0.4, 0, -0.08] as [number, number, number], turn: -65, heel: 0 },
  rFoot: { p: [0.2, 0, 0.18] as [number, number, number], turn: -35, heel: 10 },
}

// A left-handed forehand with the right hand along for the ride: shoulders ~90–95° at the top,
// hip–shoulder separation ~20–25° (less than the forehand because the front arm limits the
// backswing), contact in front of the front (right) hip, racket drop → contact ≈ 0.15 s.
// racketNormal is the palm side of the right hand, so the hitting face is its opposite.
const twoHandedKeys = sequence()
  .key(0.0)
  // grip change and early turn: the left hand slides down onto the grip, the face starts to close
  .key(0.2, {
    pelvis: [-0.02, 0.89, -0.01],
    pelvisRot: [-20, 8, 0],
    chestRot: [-14, 12, 0],
    rHand: [-0.14, 1.08, 0.26],
    rPole: [0.7, -0.6, -0.3],
    lAttach: 1,
    lPole: [-0.8, -0.5, -0.3],
    racketDir: [-0.05, 0.85, 0.52],
    racketNormal: [-0.55, 0.3, -0.78],
    lFoot: { p: [-0.38, 0, -0.04], turn: -45, heel: 6 },
    rFoot: { p: [0.22, 0, 0.1], turn: -20, heel: 10 },
  })
  // unit turn complete: neutral stance set, both hands beside the left hip, tip up
  .key(0.45, {
    pelvis: [-0.07, 0.86, -0.03],
    pelvisRot: [-46, 9, -2],
    chestRot: [-30, 10, 0],
    rHand: [-0.3, 1.08, 0.06],
    rPole: [0.6, -0.7, -0.4],
    lPole: [-0.9, -0.2, -0.4],
    racketDir: [-0.2, 0.93, 0.3],
    racketNormal: [0.4, 0.35, -0.85],
    ...BH_FEET,
  })
  // top of the backswing: sunk ~10 cm into the left leg, hands by the left hip pocket, face closed
  .key(0.8, {
    pelvis: [-0.14, 0.8, -0.05],
    pelvisRot: [-66, 11, -5],
    chestRot: [-26, 10, 2],
    rHand: [-0.3, 0.98, -0.2],
    rPole: [0.5, -0.7, -0.5],
    lPole: [-0.9, 0.0, -0.45],
    racketDir: [-0.3, 0.85, -0.44],
    racketNormal: [0.85, 0.25, -0.45],
    rFoot: { heel: 0 },
  })
  // hips fire first, the hands start down
  .key(0.98, {
    pelvis: [-0.09, 0.82, 0.0],
    pelvisRot: [-46, 11, -3],
    chestRot: [-28, 8, 4],
    rHand: [-0.37, 0.94, -0.11],
    rPole: [0.4, -0.85, -0.35],
    lPole: [-0.9, -0.1, -0.4],
    racketDir: [-0.45, 0.25, -0.86],
    racketNormal: [0.6, 0.72, -0.35],
    lFoot: { heel: 8 },
  })
  // racket drop: hitting face toward the court, tip below the hands and trailing
  .key(1.06, {
    pelvis: [-0.04, 0.85, 0.04],
    pelvisRot: [-24, 10, -1],
    chestRot: [-24, 6, 5],
    rHand: [-0.31, 0.97, 0.05],
    rPole: [0.35, -0.9, -0.3],
    lPole: [-0.85, -0.35, -0.4],
    racketDir: [-0.4, -0.3, -0.87],
    racketNormal: [0.15, 0.9, -0.4],
    lFoot: { turn: -55, heel: 20 },
  })
  // forward swing: the left arm drives like a forehand, racket still ~70° behind the hands
  .key(1.12, {
    pelvis: [0.0, 0.88, 0.08],
    pelvisRot: [-4, 9, 2],
    chestRot: [-16, 5, 6],
    rHand: [-0.23, 1.03, 0.25],
    rPole: [0.3, -0.9, -0.1],
    lPole: [-0.8, -0.5, -0.3],
    racketDir: [-0.62, -0.25, -0.74],
    racketNormal: [-0.35, 0.5, -0.79],
    lFoot: { turn: -45, heel: 32 },
  })
  // contact: in front of the right hip at waist height, both arms extended, hips slightly open,
  // shoulders square, weight over the front foot, hitting face a few degrees closed
  .key(1.17, {
    pelvis: [0.06, 0.91, 0.1],
    pelvisRot: [12, 8, 3],
    chestRot: [-4, 4, 8],
    rHand: [-0.09, 1.1, 0.4],
    rPole: [0.2, -0.95, 0.15],
    lPole: [-0.75, -0.55, -0.3],
    racketDir: [-0.9, -0.08, 0.43],
    racketNormal: [-0.35, 0.1, -0.93],
    lFoot: { turn: -30, heel: 40 },
  })
  // extension: both hands push toward the target before the roll
  .key(1.28, {
    pelvis: [0.08, 0.93, 0.12],
    pelvisRot: [26, 6, 3],
    chestRot: [8, 2, 7],
    rHand: [-0.02, 1.24, 0.46],
    rPole: [0.3, -0.85, 0.4],
    lPole: [-0.65, -0.4, 0.4],
    racketDir: [-0.42, 0.62, 0.66],
    racketNormal: [-0.82, 0.3, -0.48],
    lFoot: { p: [-0.38, 0.02, -0.02], turn: -15, heel: 55 },
  })
  // two-handed wiper: the left forearm rolls, tip up and over toward the right shoulder
  .key(1.44, {
    pelvis: [0.09, 0.93, 0.13],
    pelvisRot: [36, 5, 2],
    chestRot: [26, 0, 5],
    rHand: [0.1, 1.36, 0.46],
    rPole: [0.5, -0.5, 0.7],
    lPole: [-0.5, -0.1, 0.8],
    racketDir: [0.45, 0.72, 0.53],
    racketNormal: [-0.72, 0.55, -0.42],
    lFoot: { p: [-0.32, 0.03, 0.12], turn: 0, heel: 60 },
  })
  // over the right shoulder
  .key(1.58, {
    pelvis: [0.09, 0.925, 0.14],
    pelvisRot: [38, 4, 1],
    chestRot: [32, 0, 3],
    rHand: [0.26, 1.42, 0.26],
    rPole: [0.7, -0.2, 0.7],
    lPole: [-0.35, 0.05, 0.9],
    racketDir: [0.6, 0.3, -0.74],
    racketNormal: [-0.75, 0.45, -0.45],
    lFoot: { p: [-0.26, 0.01, 0.24], turn: 6, heel: 35 },
  })
  // finish: racket over the right shoulder, back (left) foot swung through
  .key(1.75, {
    pelvis: [0.09, 0.92, 0.14],
    pelvisRot: [38, 4, 1],
    chestRot: [34, 0, 2],
    rHand: [0.3, 1.34, 0.12],
    rPole: [0.8, -0.1, 0.6],
    lPole: [-0.3, 0.1, 0.95],
    racketDir: [0.6, -0.3, -0.74],
    racketNormal: [-0.75, 0.3, -0.6],
    lFoot: { p: [-0.22, 0, 0.3], turn: 10, heel: 20 },
  })
  // recovery: racket comes down in front, left hand slides back up to the throat, feet reset
  .key(2.05, {
    pelvis: [0.04, 0.9, 0.06],
    pelvisRot: [14, 6, 0],
    chestRot: [8, 12, 0],
    rHand: [0.06, 1.06, 0.3],
    rPole: [0.6, -0.7, -0.2],
    lAttach: 1.5,
    lPole: [-0.6, -0.8, -0.2],
    racketDir: [0.5, 0.35, 0.79],
    racketNormal: [-0.5, 0.6, 0.6],
    rFoot: { p: [0.3, 0, 0.04], turn: 12, heel: 8 },
    lFoot: { p: [-0.3, 0, 0.04], turn: -12, heel: 8 },
  })
  .ready(2.3)
  .done()

export const backhandTwoHanded: Stroke = {
  id: 'backhand-two-handed',
  clip: 'backhand-two-handed',
  contactRacket: { dir: [-0.95, -0.15, 0.25], normal: [0.25, -0.06, 0.97] },
  leftGrip: [[-2, 1]],
  // the capture coils the shoulders to ~148°; ease the peak to ~118°
  trunkYaw: [[-1.4, 0], [-0.95, 0], [-0.75, 10], [-0.55, 20], [-0.4, 28], [-0.3, 28], [-0.2, 18], [-0.1, 6], [-0.03, 0]],
  name: 'Two-handed backhand',
  category: 'groundstroke',
  level: 'beginner',
  tagline: 'Two hands, one unit. The left arm drives like a left-handed forehand while the right guides.',
  description:
    'The two-handed backhand is the most common backhand in the modern game because it is stable, easy to time on high balls and forgiving on the return. The right hand holds a continental grip at the bottom, the left hand an eastern forehand grip above it. Think of it as a left-handed forehand with the right hand along for the ride: the trunk coils, the racket drops below the ball, and both arms extend through contact before the wiper finish over the right shoulder.',
  grips: [
    { id: 'two-handed-backhand', note: 'Right hand continental (bevel 2), left hand eastern forehand (bevel 3 for the left hand). Hands touching.' },
  ],
  duration: 2.3,
  keys: twoHandedKeys,
  ball: {
    contactT: 1.17,
    waypoints: [
      { t: 0.02, p: [-0.2, 1.15, 14.5] },
      { t: 0.7, p: [-0.62, 0.03, 4.0] },
    ],
    out: [1.2, 4.2, 25],
  },
  phases: [
    { id: 'ready', name: 'Ready and grip change', t0: 0, t1: 0.25, keyT: 0.12, focus: 'racket',
      summary: 'Out of the split step the left hand turns the racket so the right hand lands on a continental grip while the left settles into an eastern forehand grip above it.',
      cues: ['Left hand does the grip change', 'Hands touch, no gap', 'Racket head stays above the wrists'] },
    { id: 'unit-turn', name: 'Unit turn', t0: 0.25, t1: 0.6, keyT: 0.45, focus: 'shoulders',
      summary: 'Hips and shoulders turn left together; the right foot steps across into a neutral stance. Both hands take the racket back as a unit, tip up.',
      cues: ['Turn with the hips, not the arms', 'Right foot steps across the body', 'Right shoulder under the chin'] },
    { id: 'backswing', name: 'Backswing and load', t0: 0.6, t1: 0.92, keyT: 0.8, focus: 'hips',
      summary: 'Hips sink about 10 cm into the back (left) leg, hands by the left hip pocket with the tip up, shoulders turned further than the hips.',
      cues: ['Sit into the back leg', 'Hands stay close to the body', 'Tip of the racket points at the back fence'] },
    { id: 'drop', name: 'Racket drop', t0: 0.92, t1: 1.09, keyT: 1.05, focus: 'racket',
      summary: 'The hips open toward the net while the racket drops below the ball, hitting face down and the tip trailing the hands. The left arm is about to take over.',
      cues: ['Hips first', 'Racket below the ball', 'Left elbow tucked, ready to drive'] },
    { id: 'contact', name: 'Contact', t0: 1.09, t1: 1.22, keyT: 1.17, focus: 'racket',
      summary: 'Contact in front of the front (right) hip, waist high, both arms extending, racket level, hips slightly open and shoulders square to the net, weight over the front foot.',
      cues: ['Meet the ball in front of the front hip', 'Left arm drives through like a forehand', 'Head still'] },
    { id: 'extension', name: 'Extension', t0: 1.22, t1: 1.55, keyT: 1.3, focus: 'racket',
      summary: 'Both hands keep going toward the target, then the left forearm rolls and the tip climbs: the two-handed wiper.',
      cues: ['Push both hands to the target', 'Then roll: tip up and over', 'Back heel comes up'] },
    { id: 'finish', name: 'Finish and recover', t0: 1.55, t1: 2.3, keyT: 1.75, focus: 'body',
      summary: 'Racket over the right shoulder, chest to the net, back leg swings through. Then the racket comes down in front and the left hand slides back to the throat.',
      cues: ['Finish high and relaxed', 'Right elbow points at the target', 'Shuffle back to the middle'] },
  ],
  commonErrors: [
    { error: 'The right arm dominates and pulls across the body, sending the ball wide.', fix: 'Hit left-hand-only forehands for a few minutes before adding the right hand back on.' },
    { error: 'Contact too far back, jammed against the body.', fix: 'Step across with the right foot earlier and hit the ball as it rises past the front hip.' },
    { error: 'Standing tall on high balls.', fix: 'Take the ball earlier on the rise, or step back and let it drop into the strike zone. Two-handers can also lift the contact point with bent elbows.' },
  ],
  drills: [
    'Left-hand forehands: 20 balls hitting the backhand side with the left hand only, then add the right hand.',
    'Two-ball drop feeds: a partner drops balls at the front hip; hit cross-court into a target zone past the service line.',
    'Return-of-serve blocks: shorten the backswing and block 10 serves into the deuce court.',
  ],
  proTags: ['backhand-2h'],
}

// The biggest shoulder turn of any groundstroke: shoulders ~115–125° at the top (back almost to
// the net), hips ~65°, separation ~30°. The left hand stays on the throat until the forward swing,
// the arm is straight before contact, contact ~0.6 m in front of the front foot with the
// shoulders still ~40° sideways, and the arms open like wings. Drop → contact ≈ 0.15 s.
const oneHandedKeys = sequence()
  .key(0.0)
  // grip change with the left hand on the throat, early turn, face starting to close
  .key(0.2, {
    pelvis: [-0.02, 0.89, -0.01],
    pelvisRot: [-22, 8, 0],
    chestRot: [-18, 12, 0],
    rHand: [-0.12, 1.12, 0.26],
    rPole: [0.7, -0.6, -0.3],
    racketDir: [-0.1, 0.85, 0.52],
    racketNormal: [-0.55, 0.3, -0.78],
    lFoot: { p: [-0.38, 0, -0.06], turn: -50, heel: 6 },
    rFoot: { p: [0.2, 0, 0.14], turn: -25, heel: 10 },
  })
  // closed stance set; shoulders well past the hips, racket up by the left shoulder
  .key(0.45, {
    pelvis: [-0.07, 0.86, -0.03],
    pelvisRot: [-48, 9, -2],
    chestRot: [-40, 11, 0],
    rHand: [-0.36, 1.2, 0.1],
    rPole: [0.6, -0.5, -0.55],
    lPole: [-0.9, -0.3, -0.3],
    racketDir: [-0.2, 0.93, 0.3],
    racketNormal: [0.4, 0.35, -0.85],
    lFoot: { p: [-0.4, 0, -0.1], turn: -70, heel: 0 },
    rFoot: { p: [0.2, 0, 0.22], turn: -45, heel: 10 },
  })
  // top of the backswing: back nearly to the net, chin on the front shoulder, racket head above the hand,
  // weight sunk into the back leg
  .key(0.8, {
    pelvis: [-0.14, 0.8, -0.05],
    pelvisRot: [-74, 11, -5],
    chestRot: [-40, 10, 2],
    rHand: [-0.26, 1.16, -0.28],
    rPole: [0.4, -0.5, -0.75],
    lPole: [-0.9, 0.1, -0.4],
    racketDir: [-0.3, 0.7, -0.65],
    racketNormal: [0.75, 0.4, -0.5],
    rFoot: { heel: 0 },
  })
  // hips start to open, the racket head drops, the left hand is about to let go
  .key(0.98, {
    pelvis: [-0.09, 0.82, 0.0],
    pelvisRot: [-56, 11, -3],
    chestRot: [-40, 8, 3],
    rHand: [-0.34, 0.97, -0.2],
    rPole: [0.4, -0.7, -0.6],
    racketDir: [-0.45, 0.2, -0.87],
    racketNormal: [0.5, 0.8, -0.35],
    lFoot: { heel: 8 },
  })
  // release: racket below the ball, left hand flies back, arm straightening
  .key(1.06, {
    pelvis: [-0.05, 0.85, 0.04],
    pelvisRot: [-36, 10, -1],
    chestRot: [-36, 6, 5],
    rHand: [-0.37, 0.95, 0.03],
    rPole: [0.3, -0.9, -0.3],
    lHand: [-0.26, 0.98, -0.4],
    lAttach: 0,
    lPole: [-0.6, -0.7, -0.4],
    racketDir: [-0.42, -0.3, -0.86],
    racketNormal: [0.15, 0.9, -0.4],
    lFoot: { turn: -60, heel: 20 },
  })
  // forward swing: straight arm, racket still ~70° behind the hand, left arm going back
  .key(1.12, {
    pelvis: [-0.02, 0.88, 0.08],
    pelvisRot: [-24, 9, 0],
    chestRot: [-26, 5, 6],
    rHand: [-0.34, 0.99, 0.31],
    rPole: [0.25, -0.95, -0.1],
    lHand: [-0.15, 1.07, -0.39],
    racketDir: [-0.66, -0.25, -0.71],
    racketNormal: [-0.3, 0.55, -0.78],
    lFoot: { turn: -52, heel: 30 },
  })
  // contact: a full step in front of the front foot, arm straight, shoulders ~40° sideways,
  // left arm stretched behind for counterbalance, hitting face a few degrees closed
  .key(1.17, {
    pelvis: [0.0, 0.91, 0.1],
    pelvisRot: [-16, 8, 1],
    chestRot: [-24, 4, 8],
    rHand: [-0.26, 1.03, 0.55],
    rPole: [0.2, -0.95, 0.2],
    lHand: [-0.05, 1.13, -0.35],
    lPole: [-0.5, -0.8, -0.3],
    racketDir: [-0.9, -0.05, 0.43],
    racketNormal: [-0.35, 0.1, -0.93],
    lFoot: { turn: -45, heel: 36 },
  })
  // extension: the racket climbs along the target line, arms spreading
  .key(1.3, {
    pelvis: [0.02, 0.93, 0.12],
    pelvisRot: [-12, 6, 2],
    chestRot: [-20, 2, 6],
    rHand: [-0.14, 1.28, 0.66],
    rPole: [0.5, -0.6, 0.6],
    lHand: [0.0, 1.19, -0.37],
    racketDir: [-0.45, 0.8, 0.4],
    racketNormal: [-0.6, 0.15, -0.78],
    lFoot: { heel: 30 },
  })
  // finish: racket high above the right shoulder, edge to the sky, back arm level behind
  .key(1.65, {
    pelvis: [0.02, 0.94, 0.12],
    pelvisRot: [-6, 4, 0],
    chestRot: [-14, 0, 2],
    rHand: [0.16, 1.5, 0.42],
    rPole: [0.8, -0.3, 0.5],
    lHand: [0.02, 1.23, -0.39],
    racketDir: [0.15, 0.95, -0.25],
    racketNormal: [-0.9, 0.1, -0.4],
    lFoot: { heel: 20 },
  })
  // hold the pose a beat, then the racket comes down and the left hand returns to the throat
  .key(2.05, {
    pelvis: [0.0, 0.9, 0.06],
    pelvisRot: [-6, 6, 0],
    chestRot: [-6, 12, 0],
    rHand: [0.0, 1.1, 0.34],
    rPole: [0.6, -0.7, -0.2],
    lHand: [-0.16, 1.14, 0.38],
    lAttach: 1.4,
    lPole: [-0.6, -0.8, -0.2],
    racketDir: [-0.15, 0.6, 0.78],
    racketNormal: [-0.95, 0.1, -0.3],
    rFoot: { p: [0.3, 0, 0.04], turn: 12, heel: 8 },
    lFoot: { p: [-0.3, 0, 0.04], turn: -12, heel: 8 },
  })
  .ready(2.3)
  .done()

export const backhandOneHanded: Stroke = {
  id: 'backhand-one-handed',
  // The two-hander's captured body with a one-handed arm keyed from Federer's backhand (slow-motion
  // practice footage, mapped by phase): the left hand cradles the throat through the coil and lets go as
  // the forward swing starts, the right arm straightens into a contact well in front, and the arms open
  // like wings with the chest still sideways.
  clip: 'backhand-two-handed',
  leftGrip: [[-1.4, 1], [-0.24, 1], [-0.16, 0]],
  leftGripAt: 0.21,
  trunkYaw: [[-1.4, 0], [-0.1, 0], [-0.03, -15], [0.05, -35], [0.2, -42], [0.45, -30]],
  armKeys: [
    { t: -1.4, racket: { dir: [-0.1, 0.8, 0.6] } },
    // racket vertical in front of the face with both hands on it, then carried up behind the left shoulder
    { t: -1.0, frame: 'chest', hand: [-0.25, -0.25, 0.3], racket: { dir: [0, 1, 0.1] } },
    { t: -0.7, frame: 'chest', hand: [-0.35, -0.2, 0.25], racket: { dir: [0.05, 0.98, -0.1] } },
    { t: -0.45, frame: 'chest', hand: [-0.42, -0.1, 0.15], racket: { dir: [0.1, 0.95, -0.25] } },
    // the head stays up until ~0.27 s before contact, then drops behind as the hand falls to the hip
    { t: -0.27, frame: 'chest', hand: [-0.4, -0.15, 0.15] },
    { t: -0.27, racket: { dir: [-0.1, 0.8, -0.6] } },
    { t: -0.17, frame: 'chest', hand: [-0.3, -0.4, 0.25] },
    { t: -0.17, racket: { dir: [-0.2, -0.65, -0.73] } },
    { t: -0.07, hand: [-0.3, -0.5, 0.2], racket: { dir: [-0.3, -0.75, -0.55] } },
    { t: 0, hand: [-0.19, -0.33, 0.4], elbow: [-0.06, -0.13, 0.19], racket: { dir: [-0.9, -0.25, 0.35], normal: [-0.3, 0.1, -0.95] } },
    { t: 0.08, hand: [-0.02, -0.1, 0.5], racket: { dir: [-0.2, 0.7, 0.7] } },
    { t: 0.2, hand: [0.15, 0.3, 0.4], racket: { dir: [0.1, 0.95, 0.3] } },
    { t: 0.35, hand: [0.15, 0.3, 0.4], racket: { dir: [0.1, 0.95, 0.3] } },
    { t: 0.45, hand: [0.05, 0, 0.35], racket: { dir: [-0.1, 0.9, 0.4] } },
  ],
  leftArmKeys: [
    { t: -0.1, hand: 'clip' },
    { t: 0, hand: [-0.2, -0.3, -0.4] },
    { t: 0.2, hand: [-0.28, -0.35, -0.42] },
    { t: 0.35, hand: [-0.28, -0.38, -0.4] },
    { t: 0.45, hand: [-0.1, -0.35, -0.1] },
  ],
  name: 'One-handed backhand',
  category: 'groundstroke',
  level: 'intermediate',
  tagline: 'The most elegant shot in tennis. A long lever, a deep shoulder turn and a fearless contact point out in front.',
  description:
    'The one-handed topspin backhand uses an eastern backhand grip and a bigger shoulder turn than any other groundstroke, so the back of the right shoulder almost faces the net at the top of the backswing. The left hand holds the throat until the forward swing begins, then flies back for balance. The arm straightens before contact and stays straight, meeting the ball well in front, and both arms open like wings on the finish. It rewards early preparation and punishes late contact.',
  grips: [
    { id: 'eastern-backhand', note: 'Index knuckle on bevel 1 (the top). Federer, Wawrinka, Thiem, Tsitsipas.' },
    { id: 'extreme-eastern-backhand', note: 'Bevel 8. More topspin, harder on low balls. Gasquet, Kuerten.' },
  ],
  duration: 2.3,
  keys: oneHandedKeys,
  ball: {
    contactT: 1.17,
    waypoints: [
      { t: 0.02, p: [-0.15, 1.15, 14.5] },
      { t: 0.7, p: [-0.7, 0.03, 4.1] },
    ],
    out: [1.0, 4.4, 24],
  },
  phases: [
    { id: 'ready', name: 'Ready and grip change', t0: 0, t1: 0.25, keyT: 0.12, focus: 'racket',
      summary: 'The left hand on the throat rotates the racket so the right hand moves to an eastern backhand grip with the knuckle on top.',
      cues: ['Change grip with the left hand', 'Knuckle on top of the handle', 'Racket up early'] },
    { id: 'unit-turn', name: 'Unit turn', t0: 0.25, t1: 0.6, keyT: 0.45, focus: 'shoulders',
      summary: 'A closed stance: the right foot steps across and the shoulders turn until the right shoulder blade faces the net. The left hand still cradles the throat.',
      cues: ['Turn more than feels normal', 'Show your back to the opponent', 'Left hand still on the throat'] },
    { id: 'backswing', name: 'Backswing and load', t0: 0.6, t1: 0.92, keyT: 0.8, focus: 'shoulders',
      summary: 'Racket head above the hand behind the left shoulder, back almost facing the net, hips sunk into the back leg, chin over the front shoulder.',
      cues: ['Chin on the front shoulder', 'Racket head up, wrist firm', 'Weight on the back foot'] },
    { id: 'drop', name: 'Drop and release', t0: 0.92, t1: 1.09, keyT: 1.06, focus: 'racket',
      summary: 'The racket drops below the ball as the left hand lets go and starts moving backward. The arm begins to straighten.',
      cues: ['Left hand releases and goes back', 'Racket below the ball', 'Straighten the arm early'] },
    { id: 'contact', name: 'Contact', t0: 1.09, t1: 1.22, keyT: 1.17, focus: 'racket',
      summary: 'Straight arm, contact a full step in front of the front foot, shoulders still about 40 degrees sideways. The left arm extends behind for counterbalance.',
      cues: ['Contact way out in front', 'Shoulders stay sideways', 'Left arm back, like opening a door'] },
    { id: 'extension', name: 'Extension', t0: 1.22, t1: 1.5, keyT: 1.3, focus: 'racket',
      summary: 'The racket climbs steeply along the target line, the two arms stretching apart to keep the chest from opening early.',
      cues: ['Racket goes up and out', 'Arms spread like wings', 'Chest stays closed until the racket is high'] },
    { id: 'finish', name: 'Finish', t0: 1.5, t1: 2.3, keyT: 1.65, focus: 'body',
      summary: 'Racket high above the right shoulder, edge to the sky, back arm level behind. Hold it a beat, then the racket comes down and the left hand returns to the throat.',
      cues: ['Finish tall', 'Pose for the photo', 'Recover with a crossover step'] },
  ],
  commonErrors: [
    { error: 'Chest opens early and the ball flies wide or short.', fix: 'Keep the left arm going backward through contact; if the left hand comes forward, the chest opens.' },
    { error: 'Late contact, wristy scoop.', fix: 'Prepare during the bounce, not after. Hit in front of the front knee.' },
    { error: 'Arm bends at contact.', fix: 'Straighten before the forward swing begins; a bent arm collapses under pace.' },
  ],
  drills: [
    'Shadow swings holding a ball in the left hand: it must move backward as the racket moves forward.',
    'Drop feed and hold: hit, then freeze the finish for two seconds and check the wingspan.',
    'Down-the-line rally to targets from a closed stance.',
  ],
  proTags: ['backhand-1h'],
}
