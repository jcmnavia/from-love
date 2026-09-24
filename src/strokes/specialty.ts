import { sequence } from '../engine/pose'
import type { PoseInput, Stroke, V3 } from '../engine/types'
import { FOREHAND_ARM_KEYS } from './forehand'

// The lob passes about a metre over the player's head and bounces behind them. They turn, sprint back
// beside the ball's path, overtake it and plant wide so it drops just behind the feet, then swing the
// racket down between the legs like a pendulum and flick it back over (Federer, US Open 2009).

/** one foot's plants while sprinting away from the net: [mid-stance time, x, z] */
type Plant = [number, number, number]
const STANCE = 0.11 // ground contact per step at a sprint
const RUN_Z0 = -0.6 // hips when the sprint reaches speed (0.45 s)
const RUN_V = 5 // m/s
const runZ = (t: number) => RUN_Z0 - RUN_V * (t - 0.45)
const LEFT_PLANTS: Plant[] = [
  [0.525, -0.35, runZ(0.525) - 0.05],
  [0.965, -0.35, runZ(0.965) - 0.05],
  [1.405, -0.3, runZ(1.405) - 0.05],
]
const RIGHT_PLANTS: Plant[] = [
  [0.745, -0.55, runZ(0.745) - 0.05],
  [1.185, -0.55, runZ(1.185) - 0.05],
  [1.55, -0.38, -6.1], // braking step
]
/** a foot on its plant, or swinging to the next one (lifted, heel up), at time `t` */
function runFoot(plants: Plant[], t: number, from: [number, number], fromT: number, turn: number) {
  let prev: [number, number, number] = [fromT, from[0], from[1]]
  for (const [pt, x, z] of plants) {
    const on = pt - STANCE / 2, off = pt + STANCE / 2
    if (t < on) {
      const u = Math.min(Math.max((t - prev[0]) / (on - prev[0]), 0), 1)
      const e = u * u * (3 - 2 * u)
      return { p: [prev[1] + (x - prev[1]) * e, 0.3 * Math.sin(Math.PI * u), prev[2] + (z - prev[2]) * e] as V3, turn, heel: 60 * Math.sin(Math.PI * u) }
    }
    if (t <= off) return { p: [x, 0, z] as V3, turn, heel: ((t - on) / STANCE) * 25 }
    prev = [off, x, z]
  }
  return { p: [prev[1], 0, prev[2]] as V3, turn, heel: 10 }
}
const runPose = (t: number): PoseInput => {
  const z = runZ(t)
  const phase = Math.sin(((t - 0.525) / 0.44) * 2 * Math.PI) // +1 when the left foot is planted
  return {
    pelvis: [-0.45, 0.9 - 0.03 * Math.abs(phase), z],
    pelvisRot: [180, 14, 0],
    chestRot: [8 * phase, 10, 0],
    // the racket carried up by the right shoulder, the left arm swinging against the legs
    rHand: [-0.66, 1.26, z - 0.1],
    rPole: [-0.6, -0.6, 0.3],
    lHand: [-0.12, 1.02, z + 0.28 * phase],
    lAttach: 0,
    lPole: [0.6, -0.6, 0.3],
    racketDir: [-0.15, 0.85, 0.5],
    racketNormal: [-0.95, 0, 0.3],
    lFoot: runFoot(LEFT_PLANTS, t, [-0.35, 0.02], 0.3, 180),
    rFoot: runFoot(RIGHT_PLANTS, t, [0.2, -0.35], 0.34, 180),
  }
}

// relative to the final plant (hips at z −6.4)
const Z = -5.95
const tweenerSeq = sequence()
  .key(0.0)
  // read the lob and split as it is struck
  .key(0.18, { pelvis: [0, 0.8, 0.02], lFoot: { p: [-0.4, 0, 0.03], heel: 5 }, rFoot: { p: [0.4, 0, 0.03], heel: 5 } })
  // turn to the right and drop-step back
  .key(0.34, {
    pelvis: [-0.15, 0.86, -0.2],
    pelvisRot: [100, 10, 0],
    chestRot: [20, 8, 0],
    rHand: [0.12, 1.25, -0.4],
    rPole: [0.3, -0.8, 0.5],
    lHand: [0.05, 1.08, -0.05],
    lAttach: 0,
    racketDir: [0.2, 0.95, -0.2],
    racketNormal: [0.2, 0, -0.98],
    lFoot: { p: [-0.35, 0.02, 0.02], turn: 40, heel: 30 },
    rFoot: { p: [0.2, 0, -0.35], turn: 120, heel: 0 },
  })
// still turning: the racket stays out on the right side so it clears the body
tweenerSeq.key(0.4, {
  pelvis: [-0.3, 0.88, -0.4],
  pelvisRot: [140, 12, 0],
  chestRot: [10, 10, 0],
  rHand: [-0.3, 1.26, -0.66],
  rPole: [-0.3, -0.8, 0.5],
  lHand: [-0.05, 1.05, -0.3],
  racketDir: [-0.1, 0.95, 0.2],
  racketNormal: [-0.7, 0, -0.7],
})
const RUN_KEYS = Array.from({ length: 18 }, (_, i) => 0.45 + i * 0.055)
for (const t of RUN_KEYS) tweenerSeq.key(Math.round(t * 1000) / 1000, runPose(t))
const tweenerKeys = tweenerSeq
  // braking step on the right foot, then the left lands wide: the ball is about to drop just behind the feet
  .key(1.5, {
    pelvis: [-0.3, 0.87, -5.75],
    pelvisRot: [180, 12, 0],
    chestRot: [0, 10, 0],
    rHand: [-0.52, 1.26, -6.0],
    lHand: [0.05, 1.02, -5.7],
    lFoot: { p: [-0.1, 0.14, -5.7], turn: 180, heel: 55 },
    rFoot: { p: [-0.38, 0, -6.1], turn: 190, heel: 0 },
  })
  .key(1.58, {
    pelvis: [-0.15, 0.84, -6.05],
    pelvisRot: [180, 14, 0],
    chestRot: [-5, 12, 0],
    rHand: [-0.3, 1.25, -6.4],
    rPole: [-0.8, 0.1, -0.3],
    lHand: [0.3, 1.0, -6.1],
    racketDir: [0.1, 0.95, -0.3],
    racketNormal: [0.9, 0, 0.35],
    lFoot: { p: [0.2, 0.14, -6.35], turn: 175, heel: 40 },
    rFoot: { p: [-0.38, 0, -6.1], turn: 190, heel: 5 },
  })
  // the racket comes up in front of the body, tip up
  .key(1.64, {
    pelvis: [0, 0.82, -6.33],
    pelvisRot: [180, 18, 0],
    chestRot: [-5, 16, 0],
    rHand: [-0.24, 1.3, -0.82 + Z],
    rPole: [-0.8, 0.1, -0.3],
    lHand: [0.3, 1.0, -0.2 + Z],
    racketDir: [0.1, 0.95, -0.3],
    racketNormal: [0.9, 0, 0.35],
    lFoot: { p: [0.36, 0, -6.6], turn: 170, heel: 0 },
    rFoot: { p: [-0.38, 0, -6.1], turn: 190, heel: 10 },
  })
  // (Federer, US Open 2009: a wide base, the trunk bent well forward over the ball, the left arm out for balance)
  .key(1.77, {
    pelvis: [0, 0.8, -0.45 + Z],
    pelvisRot: [180, 30, 0],
    chestRot: [0, 42, 0],
    rHand: [-0.16, 0.9, -0.7 + Z],
    rPole: [-0.8, -0.2, -0.2],
    lHand: [0.62, 1.02, -0.4 + Z],
    racketDir: [0.05, -0.6, -0.8],
    racketNormal: [0.0, -0.8, 0.6],
  })
  .key(1.82, {
    pelvis: [0, 0.78, -0.45 + Z],
    pelvisRot: [180, 32, 0],
    chestRot: [0, 46, 0],
    rHand: [-0.1, 0.74, -0.62 + Z],
    rPole: [-0.8, -0.3, -0.2],
    lHand: [0.64, 0.98, -0.36 + Z],
    racketDir: [0.05, -0.98, 0.15],
    racketNormal: [0.05, 0.15, 0.98],
  })
  // contact behind the feet, between the legs; the wrist flicks the racket up and back toward the net
  .key(1.9, {
    pelvis: [0, 0.79, -0.45 + Z],
    lHand: [0.64, 1.0, -0.34 + Z],
    rHand: [-0.06, 0.76, -0.44 + Z],
    rPole: [-0.8, -0.4, -0.2],
    racketDir: [0.05, -0.8, 0.6],
    racketNormal: [0.05, 0.6, 0.8],
  })
  .key(2.1, {
    pelvis: [0, 0.86, -0.45 + Z],
    pelvisRot: [175, 6, 0],
    chestRot: [-20, 2, 0],
    rHand: [-0.02, 0.96, -0.12 + Z],
    rPole: [-0.7, -0.5, 0.3],
    lHand: [0.5, 1.05, -0.4 + Z],
    racketDir: [0.1, -0.3, 0.95],
    racketNormal: [0.1, 0.95, 0.3],
  })
  // spin back toward the net
  .key(2.45, {
    pelvis: [0, 0.88, -0.42 + Z],
    pelvisRot: [110, 5, 0],
    chestRot: [-30, 5, 0],
    rHand: [0.29, 1.04, -0.63 + Z],
    rPole: [-0.45, -0.8, -0.37],
    lHand: [0.41, 1.1, -0.46 + Z],
    lPole: [-0.11, -0.8, 0.57],
    racketDir: [0.86, 0.5, -0.05],
    racketNormal: [0.05, 0.1, 0.99],
    lFoot: { p: [0.25, 0, -0.55 + Z], turn: 100, heel: 10 },
    rFoot: { p: [-0.25, 0, -0.35 + Z], turn: 120, heel: 20 },
  })
  .key(2.75, {
    pelvis: [0, 0.86, -0.4 + Z],
    pelvisRot: [30, 8, 0],
    chestRot: [-10, 12, 0],
    rHand: [0.26, 1.02, -0.16 + Z],
    rPole: [0.28, -0.8, -0.51],
    lHand: [0.11, 1.08, 0.0 + Z],
    lAttach: 2,
    lPole: [-0.58, -0.8, 0.0],
    racketDir: [0.2, 0.5, 0.84],
    racketNormal: [-0.97, 0, 0.21],
    lFoot: { p: [-0.2, 0, -0.5 + Z], turn: 0, heel: 6 },
    rFoot: { p: [0.28, 0, -0.34 + Z], turn: 20, heel: 10 },
  })
  .ready(3.05, {
    pelvis: [0, 0.86, -0.4 + Z],
    rHand: [0.1, 1.02, -0.06 + Z],
    lHand: [-0.1, 1.08, 0.0 + Z],
    lFoot: { p: [-0.35, 0, -0.38 + Z] },
    rFoot: { p: [0.35, 0, -0.38 + Z] },
  })
  .done()

export const tweener: Stroke = {
  id: 'tweener',
  name: 'Tweener',
  aka: 'The Gran Willy',
  category: 'specialty',
  level: 'advanced',
  tagline: 'Named after Guillermo Vilas. Back to the net, ball dropping between the legs, racket straight down and through.',
  description:
    'When a lob has beaten you and bounced behind you, turning around costs too much time: the tweener lets you hit it while still running away from the net. Sprint past the ball so it is dropping just behind and between your feet, plant with the feet wide, take the racket up in front of you and swing it straight down between the legs like a pendulum, the face pointing back toward the net. The wrist flicks at the bottom and the ball lobs back over. Vilas made it famous in the 1970s, Federer, Kyrgios and Monfils turned it into a weapon. It is a shot of last resort, and the alternative, a turn-and-lob, is usually the higher-percentage play.',
  grips: [{ id: 'continental', note: 'Bevel 2 so the face can open toward the net as the racket swings between the legs.' }],
  duration: 3.05,
  // starts inside the service line; the sprint ends ~0.7 m behind the baseline
  origin: [0, 5.7],
  keys: tweenerKeys,
  ball: {
    contactT: 1.9,
    // the lob is still rising 2 m in front, passes ~3.2 m up over the player and bounces 3.5 m behind them
    waypoints: [
      { t: 0.0, p: [0.2, 3.42, 2.04] },
      { t: 0.95, p: [0.1, 0.03, -3.5] },
    ],
    out: [0.3, 5.5, 9.0],
  },
  phases: [
    { id: 'chase', name: 'Chase the lob', t0: 0, t1: 1.45, keyT: 0.35, focus: 'body',
      summary: 'The lob goes over your head. Turn and sprint straight back beside its path with the eyes on the ball over your shoulder, and run past where it will drop, not to it.',
      cues: ['Turn and sprint, don’t backpedal', 'Run past the bounce', 'Eyes on the ball'] },
    { id: 'plant', name: 'Plant and lift', t0: 1.45, t1: 1.7, keyT: 1.55, focus: 'feet',
      summary: 'Feet land wide with the ball about to drop just behind them. The racket comes up in front of you, tip up.',
      cues: ['Wide base', 'Ball between the feet', 'Racket up like a pendulum at the top'] },
    { id: 'swing', name: 'Pendulum down', t0: 1.7, t1: 1.85, keyT: 1.8, focus: 'racket',
      summary: 'The racket swings straight down in front of the body and back between the legs; the face turns to point toward the net.',
      cues: ['Straight down, no loop', 'Face opens toward the net', 'Stay low, chest forward'] },
    { id: 'contact', name: 'Contact and flick', t0: 1.85, t1: 2.0, keyT: 1.9, focus: 'racket',
      summary: 'Contact at knee height between the legs; the wrist flicks upward so the ball lobs back over the net.',
      cues: ['Contact between the knees', 'Flick up with the wrist', 'Bend the knees, not the back'] },
    { id: 'turn', name: 'Turn and recover', t0: 2.0, t1: 3.05, keyT: 2.45, focus: 'body',
      summary: 'Spin back toward the net immediately and get the racket up; the reply will come fast.',
      cues: ['Turn straight away', 'Recover forward', 'Ready for a smash reply'] },
  ],
  commonErrors: [
    { error: 'Hitting the ball into your own legs.', fix: 'Run further past the ball; contact should come as it drops behind your hips, not in front.' },
    { error: 'Trying it when a normal lob is available.', fix: 'If you can turn sideways and hit a backhand lob, do that. The tweener is for when there is no time.' },
  ],
  drills: [
    'Self-feed: bounce a ball high behind you, let it drop, and hit it between the legs against a fence.',
    'Partner lobs from the net over your head; alternate a turn-and-lob with a tweener to feel when each is available.',
  ],
  proTags: ['tweener'],
}

// Compact forehand return: the incoming ball is a serve, so the backswing is short and the swing is
// a block. Split step lands as the server hits, full shoulder turn but the hands stay beside the body.
const returnKeys = sequence()
  .key(0.0, { pelvis: [0, 0.9, 0] })
  // hop
  .key(0.22, {
    pelvis: [0, 0.98, 0.02],
    lFoot: { p: [-0.32, 0.1, 0.02], heel: 30 },
    rFoot: { p: [0.32, 0.1, 0.02], heel: 30 },
  })
  // land wide and low, turning already, face rolling over
  .key(0.32, {
    pelvis: [0.02, 0.86, 0.0],
    pelvisRot: [18, 10, 0],
    chestRot: [14, 12, 0],
    rHand: [0.26, 1.1, 0.24],
    rPole: [0.85, -0.3, -0.3],
    racketDir: [0.05, 0.88, 0.47],
    racketNormal: [-0.3, -0.6, -0.74],
    lFoot: { p: [-0.34, 0, 0.02], turn: 0, heel: 5 },
    rFoot: { p: [0.38, 0, -0.03], turn: 40, heel: 0 },
  })
  // compact unit turn: shoulders fully turned, racket beside the body, left hand across
  .key(0.45, {
    pelvis: [0.06, 0.85, 0.0],
    pelvisRot: [40, 10, 2],
    chestRot: [30, 10, 0],
    rHand: [0.42, 1.14, -0.1],
    rPole: [0.9, -0.2, -0.4],
    lHand: [0.36, 1.2, 0.36],
    lAttach: 0,
    lPole: [-0.3, -0.9, 0.3],
    racketDir: [0.25, 0.9, -0.3],
    racketNormal: [0.9, -0.15, -0.4],
    lFoot: { p: [-0.34, 0, 0.02], turn: 15, heel: 5 },
    rFoot: { p: [0.4, 0, -0.04], turn: 55, heel: 0 },
  })
  // short drop: hips already opening
  .key(0.66, {
    pelvis: [0.04, 0.85, 0.03],
    pelvisRot: [26, 10, 1],
    chestRot: [30, 7, -3],
    rHand: [0.48, 0.96, -0.14],
    rPole: [0.85, -0.3, -0.4],
    lHand: [0.1, 1.16, 0.46],
    racketDir: [0.4, -0.25, -0.88],
    racketNormal: [0.25, -0.9, 0.35],
    rFoot: { heel: 15 },
  })
  // block coming forward, racket lagging a little
  .key(0.82, {
    pelvis: [-0.01, 0.88, 0.08],
    pelvisRot: [4, 9, -1],
    chestRot: [18, 5, -5],
    rHand: [0.46, 1.0, 0.2],
    rPole: [0.75, -0.45, -0.35],
    lHand: [-0.1, 1.06, 0.36],
    lPole: [-0.6, -0.7, 0.2],
    racketDir: [0.68, -0.15, -0.72],
    racketNormal: [0.42, -0.35, 0.84],
    rFoot: { turn: 40, heel: 30 },
  })
  // block contact: well in front, firm wrist, face square
  .key(0.88, {
    pelvis: [-0.05, 0.9, 0.1],
    pelvisRot: [-10, 8, -2],
    chestRot: [4, 4, -7],
    rHand: [0.38, 1.08, 0.44],
    rPole: [0.7, -0.55, -0.3],
    lHand: [-0.2, 1.04, 0.3],
    racketDir: [0.9, -0.05, 0.43],
    racketNormal: [-0.4, -0.08, 0.91],
    rFoot: { turn: 28, heel: 40 },
  })
  // compact extension
  .key(1.0, {
    pelvis: [-0.07, 0.92, 0.12],
    pelvisRot: [-24, 6, -3],
    chestRot: [-8, 2, -6],
    rHand: [0.22, 1.22, 0.6],
    rPole: [0.6, -0.3, 0.5],
    lHand: [-0.28, 1.02, 0.18],
    racketDir: [0.35, 0.6, 0.72],
    racketNormal: [-0.8, -0.3, 0.5],
    rFoot: { p: [0.38, 0.02, 0.0], turn: 12, heel: 55 },
  })
  // wiper: tip up and over toward the left shoulder
  .key(1.12, {
    pelvis: [-0.07, 0.92, 0.13],
    pelvisRot: [-30, 5, -2],
    chestRot: [-20, 0, -4],
    rHand: [-0.02, 1.4, 0.46],
    rPole: [0.5, -0.1, 0.8],
    lHand: [-0.3, 1.1, 0.14],
    racketDir: [-0.5, 0.7, 0.5],
    racketNormal: [-0.72, -0.55, 0.42],
    rFoot: { p: [0.32, 0.03, 0.14], turn: 0, heel: 55 },
  })
  // short finish over the shoulder
  .key(1.25, {
    pelvis: [-0.07, 0.92, 0.14],
    pelvisRot: [-32, 4, -2],
    chestRot: [-26, 0, -3],
    rHand: [-0.2, 1.36, 0.28],
    rPole: [0.3, 0.1, 0.95],
    lHand: [-0.28, 1.2, 0.14],
    racketDir: [-0.6, -0.2, -0.78],
    racketNormal: [-0.75, -0.3, 0.6],
    rFoot: { p: [0.24, 0, 0.3], turn: -10, heel: 25 },
  })
  // recovery toward the middle: racket down in front, left hand back on the throat
  .key(1.6, {
    pelvis: [-0.03, 0.9, 0.06],
    pelvisRot: [-12, 6, 0],
    chestRot: [-6, 12, 0],
    rHand: [-0.04, 1.08, 0.3],
    rPole: [0.6, -0.7, -0.2],
    lHand: [-0.16, 1.14, 0.36],
    lAttach: 1.3,
    lPole: [-0.6, -0.8, -0.2],
    racketDir: [-0.6, 0.3, 0.74],
    racketNormal: [0.1, -0.75, -0.65],
    rFoot: { p: [0.3, 0, 0.04], turn: 12, heel: 8 },
    lFoot: { p: [-0.3, 0, 0.04], turn: -12, heel: 8 },
  })
  .ready(1.9)
  .done()

export const returnOfServe: Stroke = {
  id: 'return',
  // the forehand's captured body and Sinner-keyed arm with half the backswing: the loop stays in front of
  // the body (full shoulder turn, short arm), and the finish is compact
  clip: 'forehand',
  trunkYaw: [[-1.46, 0], [-1.2, -5], [-0.9, -10], [-0.7, -12], [-0.55, -18], [-0.4, -22], [-0.3, -18], [-0.2, -10], [-0.12, -2], [-0.08, 0]],
  armKeys: FOREHAND_ARM_KEYS.map((k) =>
    k.frame === 'chest' && Array.isArray(k.hand)
      ? { ...k, hand: [k.hand[0] * 0.6, k.hand[1], k.hand[2] + 0.12] as V3, elbow: k.elbow && ([k.elbow[0] * 0.7, k.elbow[1], k.elbow[2] + 0.06] as V3) }
      : k,
  ),
  name: 'Return of serve',
  category: 'groundstroke',
  level: 'intermediate',
  tagline: 'Split as the server hits, turn, block. Half the backswing, all of the shoulder turn.',
  description:
    'The return is a forehand or backhand with the backswing cut in half, because a serve arrives in well under a second. The split step is timed to the server’s contact so you land as the ball leaves the racket. The shoulders turn fully but the hands stay in front of the body; the racket blocks through the ball with a firm wrist and a compact finish. Against a second serve the swing grows and you step in; against a first serve the goal is depth and neutralising, not winning the point outright.',
  grips: [
    { id: 'semi-western', note: 'Your forehand grip, held ready between forehand and backhand grips with the left hand ready to turn the racket.' },
  ],
  duration: 1.9,
  origin: [1.1, -0.6],
  keys: returnKeys,
  ball: {
    contactT: 0.88,
    waypoints: [
      { t: 0.02, p: [-0.6, 2.7, 24] },
      { t: 0.5, p: [1.3, 0.03, 6.0] },
    ],
    out: [-2.6, 2.6, 24],
  },
  phases: [
    { id: 'split', name: 'Split step', t0: 0, t1: 0.36, keyT: 0.22, focus: 'feet',
      summary: 'A small hop timed so you land wide and low exactly as the server makes contact.',
      cues: ['Hop as the server swings up', 'Land as they hit', 'Wide and low on landing'] },
    { id: 'turn', name: 'Unit turn, compact', t0: 0.36, t1: 0.6, keyT: 0.45, focus: 'shoulders',
      summary: 'Full shoulder turn but the racket stops beside the body, never behind it. The left hand releases and points across.',
      cues: ['Turn fully, take back half', 'Racket beside the body', 'Left hand across'] },
    { id: 'drop', name: 'Short drop', t0: 0.6, t1: 0.78, keyT: 0.68, focus: 'racket',
      summary: 'A small drop below the ball; the hips start opening as the ball comes off the bounce.',
      cues: ['Small drop', 'Hips start early', 'Read the bounce'] },
    { id: 'contact', name: 'Block contact', t0: 0.78, t1: 0.95, keyT: 0.88, focus: 'racket',
      summary: 'Contact well in front with a firm wrist and the face square; let the serve’s pace do the work.',
      cues: ['Contact in front', 'Firm wrist, square face', 'Borrow their pace'] },
    { id: 'finish', name: 'Compact finish', t0: 0.95, t1: 1.9, keyT: 1.25, focus: 'body',
      summary: 'A shorter follow-through than a rally forehand, then straight into recovery toward the middle.',
      cues: ['Short finish', 'Recover to the middle', 'Ready for the serve-plus-one'] },
  ],
  commonErrors: [
    { error: 'Full backswing, late contact, ball sprayed.', fix: 'Practise returns with the back to the fence so the racket cannot go back.' },
    { error: 'Split step too early: landed and stationary when the serve arrives.', fix: 'Hop as the server’s racket goes up, land at contact.' },
    { error: 'Trying to win the point on the return.', fix: 'Aim deep through the middle against first serves; attack only second serves.' },
  ],
  drills: [
    'Partner serves from the service line; you block returns to a deep target.',
    'Split-step timing: clap when the server hits; then replace the clap with the landing.',
    'Second-serve attack: step in a metre and drive 10 returns to a corner.',
  ],
  proTags: ['return'],
}
