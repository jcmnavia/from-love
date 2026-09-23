import { sequence } from '../engine/pose'
import type { ArmKey, Stroke } from '../engine/types'

/**
 * Shared body of the backhand slice; the drop shot is the same swing until the forward swing, then
 * the racket decelerates into a softer, shorter finish. Continental grip, closed stance, hands high
 * by the left ear at the top, then a forward-and-slightly-down path with the arm long and the face
 * open ~15–20° at contact (hitting face = opposite of the palm-side racketNormal). Forward swing
 * ≈ 0.2 s, slower than a drive.
 */
function sliceKeys(soft: boolean) {
  const seq = sequence()
    .key(0.0)
    // grip change to continental, early turn
    .key(0.2, {
      pelvis: [-0.02, 0.89, -0.01],
      pelvisRot: [-22, 8, 0],
      chestRot: [-18, 12, 0],
      rHand: [-0.12, 1.15, 0.26],
      rPole: [0.7, -0.6, -0.3],
      racketDir: [-0.1, 0.85, 0.52],
      racketNormal: [-0.55, 0.3, -0.78],
      lFoot: { p: [-0.38, 0, -0.06], turn: -50, heel: 6 },
      rFoot: { p: [0.2, 0, 0.14], turn: -25, heel: 10 },
    })
    // closed stance set, racket taken back high with the left hand on the throat
    .key(0.45, {
      pelvis: [-0.06, 0.87, -0.03],
      pelvisRot: [-48, 9, -2],
      chestRot: [-38, 11, 0],
      rHand: [-0.34, 1.28, 0.08],
      rPole: [0.6, -0.4, -0.6],
      lPole: [-0.9, -0.3, -0.3],
      racketDir: [-0.15, 0.9, 0.4],
      racketNormal: [0.4, 0.3, -0.87],
      lFoot: { p: [-0.4, 0, -0.1], turn: -70, heel: 0 },
      rFoot: { p: [0.2, 0, 0.22], turn: -45, heel: 10 },
    })
    // load: hands by the left ear, racket head above the ball, weight on the back foot, face a touch open
    .key(0.8, {
      pelvis: [-0.12, 0.83, -0.04],
      pelvisRot: [-66, 10, -4],
      chestRot: [-40, 10, 2],
      rHand: [-0.26, 1.4, -0.3],
      rPole: [0.4, -0.3, -0.85],
      lPole: [-0.9, 0.1, -0.4],
      racketDir: [-0.35, 0.65, -0.65],
      racketNormal: [0.6, -0.4, -0.7],
      rFoot: { heel: 0 },
    })
    // forward swing begins: left hand releases and goes back, racket comes forward and down
    .key(1.0, {
      pelvis: [-0.08, 0.85, 0.0],
      pelvisRot: [-52, 10, -2],
      chestRot: [-38, 8, 3],
      rHand: [-0.36, 1.2, -0.1],
      rPole: [0.3, -0.6, -0.75],
      lHand: [-0.3, 1.15, -0.32],
      lAttach: 0,
      lPole: [-0.6, -0.6, -0.5],
      racketDir: [-0.6, 0.45, -0.66],
      racketNormal: [0.4, -0.5, -0.77],
      lFoot: { heel: 10 },
    })
    // arm straightening, racket approaching the ball on a shallow downward path
    .key(1.08, {
      pelvis: [-0.04, 0.87, 0.05],
      pelvisRot: [-40, 9, 0],
      chestRot: [-32, 6, 5],
      rHand: [-0.4, 1.06, 0.18],
      rPole: [0.25, -0.85, -0.45],
      lHand: [-0.18, 1.1, -0.42],
      racketDir: [-0.85, 0.15, -0.5],
      racketNormal: [0.0, -0.5, -0.87],
      lFoot: { turn: -60, heel: 22 },
    })
  if (soft) {
    seq
      // touch: the racket slows, the face opens further, the ball is caught more than struck
      .key(1.18, {
        pelvis: [0.0, 0.89, 0.1],
        pelvisRot: [-26, 8, 2],
        chestRot: [-28, 5, 6],
        rHand: [-0.32, 1.0, 0.44],
        rPole: [0.2, -0.95, 0.15],
        lHand: [-0.07, 1.13, -0.4],
        racketDir: [-0.9, 0.1, 0.42],
        racketNormal: [-0.25, -0.55, -0.8],
        lFoot: { turn: -50, heel: 30 },
      })
      .key(1.35, {
        pelvis: [0.02, 0.9, 0.12],
        pelvisRot: [-22, 7, 2],
        chestRot: [-26, 3, 6],
        rHand: [-0.2, 0.99, 0.56],
        rPole: [0.3, -0.9, 0.3],
        lHand: [-0.01, 1.18, -0.4],
        racketDir: [-0.85, 0.25, 0.46],
        racketNormal: [-0.3, -0.6, -0.74],
      })
      // short finish, face still open, then a step forward to cover the reply
      .key(1.65, {
        pelvis: [0.03, 0.91, 0.16],
        pelvisRot: [-16, 7, 0],
        chestRot: [-18, 3, 4],
        rHand: [-0.14, 1.02, 0.6],
        rPole: [0.5, -0.8, 0.3],
        lHand: [0.04, 1.2, -0.36],
        racketDir: [-0.75, 0.45, 0.5],
        racketNormal: [-0.5, -0.55, -0.67],
        lFoot: { heel: 30 },
      })
      .key(1.95, {
        pelvis: [0.0, 0.9, 0.3],
        pelvisRot: [-6, 7, 0],
        chestRot: [-6, 12, 0],
        rHand: [0.04, 1.04, 0.62],
        rPole: [0.6, -0.7, -0.2],
        lHand: [-0.12, 1.1, 0.66],
        lAttach: 1.5,
        lPole: [-0.6, -0.8, -0.2],
        racketDir: [-0.25, 0.55, 0.8],
        racketNormal: [-0.9, -0.15, -0.4],
        lFoot: { p: [-0.32, 0, 0.14], turn: -20, heel: 25 },
        rFoot: { p: [0.26, 0, 0.36], turn: 0, heel: 6 },
      })
      .ready(2.2, {
        pelvis: [0, 0.9, 0.35],
        rHand: [0.1, 1.02, 0.69],
        lHand: [-0.1, 1.08, 0.75],
        lFoot: { p: [-0.3, 0, 0.37] },
        rFoot: { p: [0.3, 0, 0.37] },
      })
  } else {
    seq
      // contact: in front of the front hip, arm long, face open ~20°, racket path nearly level
      .key(1.15, {
        pelvis: [0.0, 0.89, 0.1],
        pelvisRot: [-26, 8, 2],
        chestRot: [-28, 5, 6],
        rHand: [-0.32, 1.02, 0.49],
        rPole: [0.2, -0.95, 0.15],
        lHand: [-0.07, 1.13, -0.4],
        racketDir: [-0.9, 0.05, 0.43],
        racketNormal: [-0.3, -0.35, -0.89],
        lFoot: { turn: -50, heel: 30 },
      })
      // extension: racket long toward the target, left arm stretching back
      .key(1.3, {
        pelvis: [0.02, 0.9, 0.12],
        pelvisRot: [-22, 7, 2],
        chestRot: [-26, 3, 6],
        rHand: [-0.12, 1.0, 0.66],
        rPole: [0.4, -0.9, 0.2],
        lHand: [-0.01, 1.18, -0.4],
        racketDir: [-0.75, 0.25, 0.62],
        racketNormal: [-0.4, -0.5, -0.77],
      })
      // finish: racket in front and a little above waist height, face still open, weight forward
      .key(1.6, {
        pelvis: [0.03, 0.91, 0.12],
        pelvisRot: [-16, 6, 0],
        chestRot: [-16, 2, 4],
        rHand: [0.14, 1.06, 0.62],
        rPole: [0.7, -0.6, 0.3],
        lHand: [0.05, 1.2, -0.38],
        racketDir: [-0.35, 0.6, 0.72],
        racketNormal: [-0.75, -0.4, -0.5],
        lFoot: { heel: 20 },
      })
      // recover: racket back to the front, left hand to the throat, feet reset
      .key(1.95, {
        pelvis: [0.0, 0.9, 0.06],
        pelvisRot: [-6, 6, 0],
        chestRot: [-6, 12, 0],
        rHand: [0.02, 1.06, 0.36],
        rPole: [0.6, -0.7, -0.2],
        lHand: [-0.14, 1.12, 0.42],
        lAttach: 1.5,
        lPole: [-0.6, -0.8, -0.2],
        racketDir: [-0.25, 0.55, 0.8],
        racketNormal: [-0.9, -0.1, -0.4],
        rFoot: { p: [0.3, 0, 0.04], turn: 12, heel: 8 },
        lFoot: { p: [-0.3, 0, 0.04], turn: -12, heel: 8 },
      })
      .ready(2.2)
  }
  return seq.done()
}

/** Slice racket arm: high take-back by the left ear, forward and down, nearly level through an open-faced contact, long finish. */
export const SLICE_ARM_KEYS: ArmKey[] = [
  { t: -1.4, racket: { dir: [-0.1, 0.8, 0.6] } },
  { t: -0.9, frame: 'chest', hand: [-0.28, -0.22, 0.28], racket: { dir: [-0.05, 0.95, 0.3] } },
  { t: -0.45, frame: 'chest', hand: [-0.36, 0, 0.15] },
  { t: -0.45, racket: { dir: [0.1, 0.75, -0.65] } },
  { t: -0.2, frame: 'chest', hand: [-0.38, -0.04, 0.18] },
  { t: -0.2, racket: { dir: [0.05, 0.7, -0.7] } },
  { t: -0.08, hand: [-0.3, -0.2, 0.22], racket: { dir: [-0.45, 0.55, -0.7] } },
  { t: 0, hand: [-0.2, -0.3, 0.4], elbow: [-0.07, -0.13, 0.19], racket: { dir: [-0.85, 0.3, 0.42], normal: [-0.1, -0.34, -0.93] } },
  { t: 0.12, hand: [-0.03, -0.28, 0.55], racket: { dir: [-0.4, 0.2, 0.9], normal: [-0.1, -0.95, 0.2] } },
  { t: 0.3, hand: [0.1, -0.12, 0.5], racket: { dir: [0, 0.55, 0.83], normal: [0, -0.83, 0.55] } },
  { t: 0.45, hand: [0, -0.2, 0.4], racket: { dir: [-0.1, 0.8, 0.6] } },
]

/** the free arm lets go of the throat as the forward swing starts and stretches back to keep the shoulders closed */
export const SLICE_LEFT_ARM_KEYS: ArmKey[] = [
  { t: -0.14, hand: 'clip' },
  { t: 0, hand: [-0.2, -0.3, -0.35] },
  { t: 0.25, hand: [-0.3, -0.3, -0.45] },
  { t: 0.45, hand: [-0.15, -0.35, -0.1] },
]

export const slice: Stroke = {
  id: 'slice',
  // The captured backhand body with a slicer's arm: high take-back by the left ear with the face open and the
  // left hand on the throat, a forward-and-down swing that is nearly level through contact (face open ~20°),
  // and a long finish toward the target with the face still open while the shoulders stay sideways.
  clip: 'backhand-two-handed',
  leftGrip: [[-1.4, 1], [-0.2, 1], [-0.12, 0]],
  leftGripAt: 0.21,
  trunkYaw: [[-1.4, 0], [-0.05, 0], [0.05, -25], [0.2, -35], [0.45, -25]],
  armKeys: SLICE_ARM_KEYS,
  leftArmKeys: SLICE_LEFT_ARM_KEYS,
  name: 'Backhand slice',
  category: 'groundstroke',
  level: 'intermediate',
  tagline: 'High to low, through the ball, not down at it. The shot that buys time and changes rhythm.',
  description:
    'The slice backhand is hit with a continental grip and a high-to-low swing that puts underspin on the ball, making it skid and stay low. The racket starts above the ball near the left shoulder, the face opens a few degrees, and the arm drives forward and slightly down, staying long through contact. Beginners chop; good slicers drive through the ball with the racket travelling almost level at contact, and finish with both arms spread and the racket face still open.',
  grips: [
    { id: 'continental', note: 'Bevel 2. The same grip you serve and volley with, so it needs no change at the net.' },
  ],
  duration: 2.2,
  keys: sliceKeys(false),
  ball: {
    contactT: 1.15,
    waypoints: [
      { t: 0.02, p: [-0.2, 1.15, 14.5] },
      { t: 0.7, p: [-0.7, 0.03, 4.0] },
    ],
    out: [1.0, 1.4, 22],
  },
  phases: [
    { id: 'turn', name: 'Turn and take back high', t0: 0, t1: 0.6, keyT: 0.45, focus: 'shoulders',
      summary: 'Closed stance, shoulders turned, the racket taken back high near the left shoulder with the left hand on the throat and the face slightly open.',
      cues: ['Racket head above the ball', 'Left hand supports the throat', 'Face open a few degrees, not flat to the sky'] },
    { id: 'load', name: 'Load', t0: 0.6, t1: 0.92, keyT: 0.8, focus: 'racket',
      summary: 'Hands high by the left ear, elbow bent, weight on the back foot. The swing will travel down and forward from here.',
      cues: ['Hands at ear height', 'Weight back', 'Look over the front shoulder'] },
    { id: 'swing', name: 'Forward swing', t0: 0.92, t1: 1.1, keyT: 1.02, focus: 'racket',
      summary: 'The left hand releases and moves back; the racket travels forward and down toward the ball with the arm straightening.',
      cues: ['Left hand goes back', 'Drive forward more than down', 'Arm straightening'] },
    { id: 'contact', name: 'Contact', t0: 1.1, t1: 1.22, keyT: 1.15, focus: 'racket',
      summary: 'In front of the front hip with the face open about 20 degrees and the racket path nearly level. Firm wrist, arm long.',
      cues: ['Slightly open face', 'Flat through the hitting zone', 'Firm wrist, no flick'] },
    { id: 'extension', name: 'Extension', t0: 1.22, t1: 1.45, keyT: 1.3, focus: 'body',
      summary: 'The racket keeps going toward the target, staying low and long, while the left arm stretches behind to keep the shoulders closed.',
      cues: ['Long finish toward the target', 'Shoulders stay sideways', 'Arms open like a book'] },
    { id: 'finish', name: 'Finish', t0: 1.45, t1: 2.2, keyT: 1.6, focus: 'body',
      summary: 'Racket finishes in front and slightly above waist height with the face still open, weight on the front foot; then the left hand comes back to the throat and the feet reset.',
      cues: ['Face still open at the end', 'Weight forward', 'Recover and split'] },
  ],
  commonErrors: [
    { error: 'Chopping down steeply, ball floats and sits up.', fix: 'Start the racket lower and swing more forward than down; imagine sliding the strings along a table top.' },
    { error: 'Face too open, ball pops up.', fix: 'Close the face to about 20 degrees; check the finish: strings should face the net, not the sky.' },
    { error: 'Chest opens and the slice goes cross-court by accident.', fix: 'Send the left arm backward through contact.' },
  ],
  drills: [
    'Wall slices: 30 consecutive slices against a wall, aiming at a line a metre high.',
    'Table-top drill: hold the racket over a bench and slide the strings forward along it to feel the flat path.',
    'Slice-and-approach: slice deep down the line and follow it to the net.',
  ],
  proTags: ['slice'],
}

export const dropShot: Stroke = {
  id: 'drop-shot',
  // the slice's preparation unchanged (disguise), then a more open face and a short, absorbing finish
  clip: 'backhand-two-handed',
  leftGrip: [[-1.4, 1], [-0.2, 1], [-0.12, 0]],
  leftGripAt: 0.21,
  trunkYaw: [[-1.4, 0], [-0.05, 0], [0.05, -25], [0.2, -35], [0.45, -25]],
  armKeys: [
    ...SLICE_ARM_KEYS.filter((k) => k.t < 0),
    { t: 0, hand: [-0.2, -0.3, 0.38], elbow: [-0.07, -0.13, 0.19], racket: { dir: [-0.85, 0.35, 0.4], normal: [-0.15, -0.6, -0.78] } },
    { t: 0.12, hand: [-0.12, -0.3, 0.44], racket: { dir: [-0.6, 0.35, 0.72], normal: [-0.2, -0.93, 0.28] } },
    { t: 0.3, hand: [-0.08, -0.28, 0.44], racket: { dir: [-0.45, 0.45, 0.77], normal: [-0.15, -0.9, 0.42] } },
    { t: 0.45, hand: [-0.05, -0.25, 0.4], racket: { dir: [-0.1, 0.8, 0.6] } },
  ],
  leftArmKeys: SLICE_LEFT_ARM_KEYS,
  name: 'Drop shot',
  category: 'specialty',
  level: 'advanced',
  tagline: 'Same preparation as the slice, then take the speed off. Disguise is the whole shot.',
  description:
    'A drop shot is a slice hit softly enough to bounce twice before the service line. The preparation must look identical to a normal slice or approach, right up to the forward swing. Then the racket decelerates into contact, the face opens more, and the follow-through is short, absorbing pace rather than adding it. Hit it from inside the baseline, when the opponent is deep or tired, and never from a defensive position.',
  grips: [{ id: 'continental', note: 'Bevel 2, held loosely so the hand can absorb the ball.' }],
  duration: 2.2,
  origin: [-0.4, 2.8],
  keys: sliceKeys(true),
  ball: {
    contactT: 1.18,
    waypoints: [
      { t: 0.02, p: [-0.15, 1.1, 10] },
      { t: 0.62, p: [-0.7, 0.03, 3.5] },
    ],
    out: [0.5, 2.7, 6.8],
  },
  phases: [
    { id: 'disguise', name: 'Disguise', t0: 0, t1: 0.92, keyT: 0.8, focus: 'shoulders',
      summary: 'Everything looks like a slice or an approach shot: same turn, same high take-back, same weight transfer.',
      cues: ['Identical preparation', 'Move forward as if to attack', 'Eyes never on the target'] },
    { id: 'soften', name: 'Soften the hand', t0: 0.92, t1: 1.1, keyT: 1.04, focus: 'racket',
      summary: 'As the racket comes forward the grip loosens and the racket slows. The face opens more than for a slice.',
      cues: ['Grip pressure drops to 2 out of 10', 'Racket decelerates', 'Face opens'] },
    { id: 'contact', name: 'Touch contact', t0: 1.1, t1: 1.27, keyT: 1.18, focus: 'racket',
      summary: 'The ball is caught more than struck; the strings cradle it with heavy underspin so it dies after the bounce.',
      cues: ['Catch it on the strings', 'Brush under the ball', 'Aim to clear the net by a metre'] },
    { id: 'finish', name: 'Short finish', t0: 1.27, t1: 2.2, keyT: 1.65, focus: 'body',
      summary: 'Short follow-through with the face still open, then move forward to cover the reply.',
      cues: ['Short follow-through', 'Follow the shot toward the net', 'Expect a lob or a re-drop'] },
  ],
  commonErrors: [
    { error: 'Telegraphed: the opponent reads it and sprints.', fix: 'Video your slice and your drop shot side by side until the first metre of the swing is identical.' },
    { error: 'Too long, sits up on the service line.', fix: 'Aim for the net to be the highest point of the arc; add underspin rather than lifting.' },
  ],
  drills: [
    'Slice or drop: a partner feeds, you alternate at random; they must guess before the bounce.',
    'Two-bounce target: land ten drop shots that bounce twice before the service line.',
  ],
  proTags: ['drop-shot'],
}
