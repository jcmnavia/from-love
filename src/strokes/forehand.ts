import { sequence } from '../engine/pose'
import type { Stroke } from '../engine/types'

// Timing follows high-speed video of ATP forehands: ~0.8 s of preparation, hips fire ~0.2 s before
// contact, racket drop → contact ≈ 0.15 s, then a long relaxed finish. Angles: shoulders ~95–100°
// at the top of the backswing, hip–shoulder separation peaking ~30–35° as the hips fire, hips
// ~10° open at contact with the shoulders square, contact ~0.5 m in front of the front hip.
const keys = sequence()
  .key(0.0)
  // early unit turn: both hands still on the racket, the face rolls over the top (never edge-on)
  .key(0.2, {
    pelvis: [0.02, 0.89, -0.01],
    pelvisRot: [20, 8, 0],
    chestRot: [14, 12, 0],
    rHand: [0.24, 1.1, 0.24],
    rPole: [0.8, -0.4, -0.3],
    racketDir: [0.0, 0.85, 0.53],
    racketNormal: [-0.3, -0.6, -0.74],
    rFoot: { p: [0.38, 0, -0.04], turn: 45, heel: 6 },
    lFoot: { p: [-0.22, 0, 0.1], turn: 20, heel: 10 },
  })
  // unit turn complete: sideways to the net, racket tip up, left hand leaving the throat
  .key(0.45, {
    pelvis: [0.07, 0.86, -0.03],
    pelvisRot: [46, 9, 2],
    chestRot: [30, 10, 0],
    rHand: [0.4, 1.22, 0.0],
    rPole: [0.9, -0.1, -0.45],
    lHand: [0.3, 1.24, 0.34],
    lAttach: 0.6,
    lPole: [-0.3, -0.9, 0.2],
    racketDir: [0.22, 0.93, 0.28],
    racketNormal: [0.9, -0.2, -0.38],
    rFoot: { p: [0.42, 0, -0.08], turn: 62, heel: 0 },
    lFoot: { p: [-0.2, 0, 0.12], turn: 26, heel: 4 },
  })
  // top of the backswing: loaded into the right leg (pelvis sinks ~10 cm and drifts over the back foot),
  // left arm stretched across parallel to the baseline, racket head above the hand, face closed
  .key(0.8, {
    pelvis: [0.15, 0.8, -0.05],
    pelvisRot: [64, 11, 5],
    chestRot: [32, 10, -2],
    rHand: [0.52, 1.2, -0.4],
    rPole: [0.9, 0.2, -0.45],
    lHand: [0.62, 1.28, 0.3],
    lAttach: 0,
    lPole: [-0.2, -0.9, 0.35],
    racketDir: [0.3, 0.85, -0.44],
    racketNormal: [0.9, -0.15, -0.4],
    lFoot: { heel: 0 },
  })
  // hips fire while the shoulders wait: separation peaks, the hand starts down, face turning toward the court
  .key(0.98, {
    pelvis: [0.09, 0.82, 0.0],
    pelvisRot: [44, 11, 3],
    chestRot: [34, 8, -4],
    rHand: [0.56, 0.95, -0.36],
    rPole: [0.9, -0.05, -0.45],
    lHand: [0.36, 1.26, 0.48],
    racketDir: [0.45, 0.25, -0.86],
    racketNormal: [0.6, -0.72, -0.3],
    rFoot: { heel: 8 },
  })
  // racket drop and lag: tip below the hand, strings facing the court, racket trailing behind the hand
  .key(1.06, {
    pelvis: [0.04, 0.85, 0.04],
    pelvisRot: [22, 10, 1],
    chestRot: [30, 6, -5],
    rHand: [0.51, 0.94, -0.15],
    rPole: [0.85, -0.25, -0.45],
    lHand: [0.06, 1.18, 0.5],
    lPole: [-0.6, -0.7, 0.2],
    racketDir: [0.38, -0.3, -0.87],
    racketNormal: [0.22, -0.9, 0.36],
    rFoot: { turn: 58, heel: 20 },
  })
  // forward swing: shoulders release, racket still ~60° behind the hand, face closing toward square
  .key(1.12, {
    pelvis: [-0.01, 0.88, 0.08],
    pelvisRot: [2, 9, -2],
    chestRot: [20, 5, -6],
    rHand: [0.48, 0.99, 0.19],
    rPole: [0.8, -0.4, -0.4],
    lHand: [-0.08, 1.1, 0.42],
    racketDir: [0.62, -0.25, -0.74],
    racketNormal: [0.4, -0.5, 0.77],
    rFoot: { turn: 48, heel: 32 },
  })
  // contact: ~0.5 m in front of the front hip at waist height, hips ~10° open, shoulders square,
  // weight over the front foot, racket level and a few degrees closed
  .key(1.17, {
    pelvis: [-0.06, 0.91, 0.1],
    pelvisRot: [-12, 8, -3],
    chestRot: [4, 4, -8],
    rHand: [0.38, 1.08, 0.46],
    rPole: [0.7, -0.55, -0.3],
    lHand: [-0.2, 1.05, 0.3],
    racketDir: [0.9, -0.08, 0.43],
    racketNormal: [-0.42, -0.12, 0.9],
    rFoot: { turn: 32, heel: 40 },
  })
  // extension: the hand keeps driving through toward the target before anything rolls
  .key(1.28, {
    pelvis: [-0.08, 0.93, 0.12],
    pelvisRot: [-26, 6, -3],
    chestRot: [-8, 2, -7],
    rHand: [0.26, 1.2, 0.62],
    rPole: [0.65, -0.35, 0.4],
    lHand: [-0.28, 1.02, 0.18],
    racketDir: [0.42, 0.62, 0.66],
    racketNormal: [-0.82, -0.3, 0.48],
    rFoot: { p: [0.38, 0.02, -0.02], turn: 15, heel: 55 },
  })
  // windshield wiper: forearm rolls, the tip goes up and over, back heel well up
  .key(1.44, {
    pelvis: [-0.09, 0.93, 0.13],
    pelvisRot: [-36, 5, -2],
    chestRot: [-26, 0, -5],
    rHand: [-0.04, 1.4, 0.5],
    rPole: [0.5, -0.1, 0.8],
    lHand: [-0.3, 1.1, 0.12],
    lPole: [-0.7, -0.6, 0.2],
    racketDir: [-0.45, 0.72, 0.53],
    racketNormal: [-0.72, -0.55, 0.42],
    rFoot: { p: [0.32, 0.03, 0.12], turn: 0, heel: 60 },
  })
  // over the shoulder: the tip passes above the left shoulder on its way back
  .key(1.58, {
    pelvis: [-0.09, 0.925, 0.14],
    pelvisRot: [-38, 4, -1],
    chestRot: [-32, 0, -3],
    rHand: [-0.22, 1.46, 0.3],
    rPole: [0.35, 0.05, 0.9],
    lHand: [-0.3, 1.18, 0.1],
    racketDir: [-0.6, 0.3, -0.74],
    racketNormal: [-0.75, -0.45, 0.45],
    rFoot: { p: [0.26, 0.01, 0.24], turn: -6, heel: 35 },
  })
  // finish: racket over the left shoulder, elbow pointing at the target, back foot swung through
  .key(1.75, {
    pelvis: [-0.09, 0.92, 0.14],
    pelvisRot: [-38, 4, -1],
    chestRot: [-34, 0, -2],
    rHand: [-0.3, 1.38, 0.16],
    rPole: [0.3, 0.1, 0.95],
    lHand: [-0.3, 1.24, 0.1],
    racketDir: [-0.6, -0.3, -0.74],
    racketNormal: [-0.75, -0.3, 0.6],
    rFoot: { p: [0.22, 0, 0.3], turn: -10, heel: 20 },
  })
  // recovery: the racket comes down in front, both hands find it, the feet reset
  .key(2.05, {
    pelvis: [-0.04, 0.9, 0.06],
    pelvisRot: [-14, 6, 0],
    chestRot: [-8, 12, 0],
    rHand: [-0.05, 1.08, 0.3],
    rPole: [0.6, -0.7, -0.2],
    lHand: [-0.18, 1.14, 0.36],
    lAttach: 1.2,
    lPole: [-0.6, -0.8, -0.2],
    racketDir: [-0.7, 0.2, 0.68],
    racketNormal: [0.1, -0.75, -0.65],
    rFoot: { p: [0.3, 0, 0.04], turn: 12, heel: 8 },
    lFoot: { p: [-0.3, 0, 0.04], turn: -12, heel: 8 },
  })
  .ready(2.3)
  .done()

export const forehand: Stroke = {
  id: 'forehand',
  name: 'Forehand drive',
  aka: 'Topspin forehand',
  category: 'groundstroke',
  level: 'beginner',
  tagline: 'The shot you will hit more than any other. Hips lead, shoulders follow, the racket comes last.',
  description:
    'A modern topspin forehand hit with a semi-western grip from a semi-open stance. Power comes from the ground up: the legs load, the hips fire, the shoulders release and the arm is whipped through last. The racket head drops below the ball and brushes up through contact, which is what produces topspin and lets you swing hard while keeping the ball in.',
  grips: [
    { id: 'semi-western', note: 'Base knuckle of the index finger on bevel 4. The default for a modern topspin drive.' },
    { id: 'eastern', note: 'Bevel 3. Flatter, faster through the court, easier to time on low balls. Federer and del Potro.' },
  ],
  duration: 2.3,
  keys,
  ball: {
    contactT: 1.17,
    waypoints: [
      { t: 0.02, p: [0.2, 1.15, 14.5] },
      { t: 0.7, p: [0.72, 0.03, 4.0] },
    ],
    out: [-1.2, 4.2, 25],
  },
  phases: [
    {
      id: 'ready', name: 'Ready and split', t0: 0, t1: 0.2, keyT: 0.0,
      summary: 'Athletic base. Knees bent, weight on the balls of the feet, racket in front with the left hand on the throat.',
      cues: ['Feet wider than the shoulders', 'Racket tip up, hands relaxed in front', 'Eyes on the opponent’s racket'],
      focus: 'body',
    },
    {
      id: 'unit-turn', name: 'Unit turn', t0: 0.2, t1: 0.6, keyT: 0.45,
      summary: 'Hips and shoulders turn together, sideways to the net, while the left hand keeps hold of the racket. The feet set up in a semi-open stance and the racket tip points up.',
      cues: ['Turn the whole trunk, not just the arm', 'Left hand stays on the racket as long as possible', 'Right foot points to the side fence'],
      focus: 'shoulders',
    },
    {
      id: 'backswing', name: 'Backswing and load', t0: 0.6, t1: 0.92, keyT: 0.8,
      summary: 'Left arm stretches across the body parallel to the baseline, racket head above the hand, hips sunk about 10 cm into the right leg. Shoulders are turned past the hips.',
      cues: ['Racket head above the wrist', 'Point the left hand at the side fence', 'Feel the weight sink into the back leg'],
      focus: 'shoulders',
    },
    {
      id: 'drop', name: 'Racket drop and lag', t0: 0.92, t1: 1.09, keyT: 1.05,
      summary: 'The hips begin to open while the shoulders are still closed: this is the hip–shoulder separation that stores elastic energy. The racket falls below the ball, strings facing the ground, tip trailing the hand.',
      cues: ['Hips first, shoulders wait', 'Strings face the court (“pat the dog”)', 'Elbow stays relaxed, racket lags behind the hand'],
      focus: 'hips',
    },
    {
      id: 'contact', name: 'Contact', t0: 1.09, t1: 1.22, keyT: 1.17,
      summary: 'Ball met about half a metre in front of the front hip at waist height, hips slightly open, shoulders square, weight over the front foot and the racket roughly level. The head stays still and the eyes stay on the contact point.',
      cues: ['Contact in front, not beside you', 'Racket face barely closed, brushing low to high', 'Head still through the hit'],
      focus: 'racket',
    },
    {
      id: 'extension', name: 'Extension and wiper', t0: 1.22, t1: 1.55, keyT: 1.3,
      summary: 'The hand keeps driving toward the target after contact; only then does the forearm roll and send the racket tip up and over: the windshield wiper.',
      cues: ['Extend toward the target first', 'Then roll the forearm, tip up and over', 'Back heel comes off the ground'],
      focus: 'racket',
    },
    {
      id: 'finish', name: 'Finish and recover', t0: 1.55, t1: 2.3, keyT: 1.75,
      summary: 'Racket over the left shoulder with the elbow pointing at the target, chest to the net, back foot swung through. Then the racket comes down in front and the feet split back to ready.',
      cues: ['Elbow points where the ball went', 'Catch the racket with the left hand', 'Recover with a shuffle, never a walk'],
      focus: 'body',
    },
  ],
  commonErrors: [
    { error: 'Arming the ball: swinging with the arm while the hips stay closed.', fix: 'Start the forward swing by turning the back hip toward the net. Practise shadow swings with the racket held against your chest by both hands so only the trunk can move.' },
    { error: 'Late contact beside or behind the body.', fix: 'Set up a full step further back than feels natural. Say “bounce … hit” aloud; contact should come sooner than you think.' },
    { error: 'Racket head dropping too early, straight-arm looping.', fix: 'Keep the tip above the hand until the shoulders are fully turned; the drop happens as the hips fire, not before.' },
    { error: 'Head pulling up to watch the shot.', fix: 'Freeze your gaze on the contact spot until the follow-through is over.' },
  ],
  drills: [
    'Shadow swings with the ball drop: drop a ball in front of the front hip, let it bounce once, hit it into the fence. 3 sets of 10.',
    'Racket-on-chest turns: cross your arms over the racket and rotate hips and shoulders from unit turn to finish without moving the arms.',
    'Cone rally: aim ten balls cross-court over a cone placed on the service line; only balls clearing the net by at least a racket length count.',
  ],
  proTags: ['forehand'],
}
