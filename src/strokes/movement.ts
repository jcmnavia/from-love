import { READY, sequence } from '../engine/pose'
import type { PoseInput, Stroke, V3 } from '../engine/types'

const rot = (v: V3, turn: number): V3 => {
  const a = (turn * Math.PI) / 180
  return [v[0] * Math.cos(a) + v[2] * Math.sin(a), v[1], -v[0] * Math.sin(a) + v[2] * Math.cos(a)]
}
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]

/** Ready-position hands and racket carried along with a pelvis that has moved and turned. */
function carried(pelvis: V3, turn: number): PoseInput {
  const rel = (h: V3): V3 => add(pelvis, rot([h[0] - READY.pelvis[0], h[1] - READY.pelvis[1], h[2] - READY.pelvis[2]], turn))
  return {
    rHand: rel(READY.rHand),
    lHand: rel(READY.lHand),
    racketDir: rot(READY.racketDir, turn),
    racketNormal: rot(READY.racketNormal, turn),
    rPole: rot(READY.rPole, turn),
    lPole: rot(READY.lPole, turn),
  }
}

// Movement patterns keep the racket in the ready position; the lesson is in the feet.

const splitStepKeys = sequence()
  .key(0.0)
  .key(0.2, { pelvis: [0, 0.86, 0], lFoot: { heel: 25 }, rFoot: { heel: 25 } })
  .key(0.4, {
    ...carried([0, 1.0, 0.02], 0),
    pelvis: [0, 1.0, 0.02],
    lFoot: { p: [-0.33, 0.12, 0.03], heel: 35 },
    rFoot: { p: [0.33, 0.12, 0.03], heel: 35 },
  })
  .key(0.58, {
    ...carried([0, 0.85, 0.02], 0),
    pelvis: [0, 0.85, 0.02],
    pelvisRot: [0, 10, 0],
    chestRot: [0, 16, 0],
    lFoot: { p: [-0.38, 0, 0.03], turn: -10, heel: 5 },
    rFoot: { p: [0.38, 0, 0.03], turn: 12, heel: 5 },
  })
  .key(0.85, {
    ...carried([0.2, 0.87, 0.02], 25),
    pelvis: [0.2, 0.87, 0.02],
    pelvisRot: [25, 10, 0],
    chestRot: [15, 14, 0],
    lFoot: { p: [-0.3, 0.02, 0.03], turn: 20, heel: 40 },
    rFoot: { p: [0.78, 0, -0.02], turn: 60, heel: 0 },
  })
  .key(1.15, {
    ...carried([0.5, 0.88, 0.0], 10),
    pelvis: [0.5, 0.88, 0.0],
    pelvisRot: [10, 8, 0],
    chestRot: [5, 14, 0],
    lFoot: { p: [0.2, 0, 0.02], turn: 0, heel: 8 },
    rFoot: { p: [0.8, 0, 0.0], turn: 15, heel: 8 },
  })
  .key(1.5, {
    ...carried([0.25, 0.88, 0.0], -10),
    pelvis: [0.25, 0.88, 0.0],
    pelvisRot: [-10, 8, 0],
    chestRot: [-5, 14, 0],
    lFoot: { p: [-0.1, 0, 0.02], turn: -30, heel: 0 },
    rFoot: { p: [0.6, 0.02, 0.0], turn: -10, heel: 40 },
  })
  .ready(2.2)
  .done()

export const splitStep: Stroke = {
  id: 'split-step',
  name: 'Split step and first step',
  category: 'movement',
  level: 'beginner',
  tagline: 'A small hop that lands as the opponent hits. It turns standing into moving.',
  description:
    'The split step is the foundation of all tennis movement. Just before the opponent strikes the ball you hop a few centimetres off the ground and land on the balls of both feet, wider than the shoulders, knees bent. Landing at the moment of their contact means your muscles are already loaded when you read the ball, and the first step explodes off the outside foot. Without it, every ball feels a step too far.',
  grips: [],
  duration: 2.2,
  keys: splitStepKeys,
  phases: [
    { id: 'ready', name: 'Ready position', t0: 0, t1: 0.25, keyT: 0.05, focus: 'feet',
      summary: 'Feet wider than the shoulders, knees bent, weight forward, racket in front.',
      cues: ['Wider than the shoulders', 'Weight on the balls of the feet', 'Racket up in front'] },
    { id: 'hop', name: 'The hop', t0: 0.25, t1: 0.5, keyT: 0.4, focus: 'feet',
      summary: 'A small hop, a few centimetres only, started as the opponent swings forward.',
      cues: ['Small hop, not a jump', 'Start it as they swing', 'Stay relaxed'] },
    { id: 'land', name: 'Landing', t0: 0.5, t1: 0.7, keyT: 0.58, focus: 'feet',
      summary: 'Land on both feet, wide and low, exactly as the opponent makes contact. This is when you read the ball.',
      cues: ['Land as they hit', 'Wide and low', 'Eyes on their contact point'] },
    { id: 'first-step', name: 'First step', t0: 0.7, t1: 1.3, keyT: 0.85, focus: 'feet',
      summary: 'Push off the foot furthest from the ball and step with the near foot toward the ball; the shoulders begin to turn at the same time.',
      cues: ['Push off the far foot', 'Turn the shoulders as you step', 'Stay low'] },
    { id: 'recover', name: 'Recover', t0: 1.3, t1: 2.2, keyT: 1.5, focus: 'feet',
      summary: 'Shuffle back toward the middle and split again for the next ball.',
      cues: ['Shuffle, don’t walk', 'Face the net while moving', 'Split again'] },
  ],
  commonErrors: [
    { error: 'Splitting too early and standing still when the ball arrives.', fix: 'Hop when the opponent’s racket starts forward; land at contact.' },
    { error: 'Jumping too high.', fix: 'Think of a skip, not a jump; feet barely leave the ground.' },
  ],
  drills: [
    'Coach or partner claps at random; split on the clap and sprint two steps in the direction they point.',
    'Shadow points: split on every imagined contact for a full minute.',
  ],
  proTags: ['footwork'],
}

const shuffleKeys = sequence()
  .key(0.0)
  .key(0.25, {
    ...carried([0.18, 0.9, 0], 0),
    pelvis: [0.18, 0.9, 0],
    lFoot: { p: [-0.22, 0.02, 0.02], heel: 30 },
    rFoot: { p: [0.62, 0, 0.02], turn: 15, heel: 0 },
  })
  .key(0.5, {
    ...carried([0.42, 0.9, 0], 0),
    pelvis: [0.42, 0.9, 0],
    lFoot: { p: [0.12, 0, 0.02], turn: -10, heel: 5 },
    rFoot: { p: [0.72, 0.02, 0.02], turn: 15, heel: 30 },
  })
  .key(0.75, {
    ...carried([0.65, 0.9, 0], 0),
    pelvis: [0.65, 0.9, 0],
    lFoot: { p: [0.35, 0.02, 0.02], heel: 30 },
    rFoot: { p: [1.15, 0, 0.02], turn: 15, heel: 0 },
  })
  .key(1.0, {
    ...carried([0.85, 0.88, 0], 0),
    pelvis: [0.85, 0.88, 0],
    lFoot: { p: [0.55, 0, 0.02], turn: -10, heel: 5 },
    rFoot: { p: [1.15, 0, 0.02], turn: 15, heel: 5 },
  })
  .key(1.3, {
    ...carried([0.7, 0.9, 0], 0),
    pelvis: [0.7, 0.9, 0],
    lFoot: { p: [0.25, 0, 0.02], turn: -15, heel: 0 },
    rFoot: { p: [1.1, 0.02, 0.02], turn: 15, heel: 30 },
  })
  .key(1.55, {
    ...carried([0.42, 0.9, 0], 0),
    pelvis: [0.42, 0.9, 0],
    lFoot: { p: [0.05, 0.02, 0.02], heel: 30 },
    rFoot: { p: [0.72, 0, 0.02], turn: 10, heel: 0 },
  })
  .key(1.8, {
    ...carried([0.15, 0.9, 0], 0),
    pelvis: [0.15, 0.9, 0],
    lFoot: { p: [-0.25, 0, 0.02], turn: -12, heel: 5 },
    rFoot: { p: [0.45, 0.02, 0.02], turn: 12, heel: 30 },
  })
  .ready(2.1)
  .done()

export const shuffle: Stroke = {
  id: 'shuffle',
  name: 'Side shuffle',
  category: 'movement',
  level: 'beginner',
  tagline: 'The recovery step. Feet never cross, hips stay square to the net.',
  description:
    'The side shuffle is how you move short distances along the baseline and how you recover after every shot. The feet push and slide sideways without crossing, the hips and shoulders stay facing the net, and the weight stays low on the balls of the feet. It is slower than running but keeps you balanced and ready to change direction the moment the opponent hits.',
  grips: [],
  duration: 2.1,
  keys: shuffleKeys,
  phases: [
    { id: 'push', name: 'Push and step', t0: 0, t1: 0.5, keyT: 0.25, focus: 'feet',
      summary: 'Push off the inside foot; the outside foot steps sideways. The head stays level.',
      cues: ['Push from the inside foot', 'Head stays level', 'Stay low'] },
    { id: 'close', name: 'Close, don’t cross', t0: 0.5, t1: 1.0, keyT: 0.75, focus: 'feet',
      summary: 'The trailing foot slides in but never past the lead foot. Hips remain square to the net.',
      cues: ['Feet never cross', 'Hips face the net', 'Racket stays in front'] },
    { id: 'recover', name: 'Recover back', t0: 1.0, t1: 2.1, keyT: 1.55, focus: 'feet',
      summary: 'Reverse direction with the same push-and-slide back toward the middle, ending in a split step.',
      cues: ['Same rhythm back', 'Land in the ready position', 'Split step at the end'] },
  ],
  commonErrors: [
    { error: 'Bouncing up and down.', fix: 'Imagine a ceiling just above your head; move under it.' },
    { error: 'Feet clicking together or crossing.', fix: 'Keep a fist of space between the feet at the closest point.' },
  ],
  drills: [
    'Alley shuffles: shuffle across the doubles alley and back 10 times, staying low.',
    'Shuffle and shadow: shuffle two steps, shadow a forehand, shuffle back, shadow a backhand.',
  ],
  proTags: ['footwork'],
}

const crossoverKeys = sequence()
  .key(0.0)
  .key(0.25, {
    ...carried([0.15, 0.88, 0], 30),
    pelvis: [0.15, 0.88, 0],
    pelvisRot: [30, 10, 0],
    chestRot: [10, 14, 0],
    lFoot: { p: [-0.25, 0.02, 0.02], turn: 30, heel: 40 },
    rFoot: { p: [0.65, 0, -0.02], turn: 75, heel: 0 },
  })
  .key(0.5, {
    ...carried([0.55, 0.9, 0.02], 55),
    pelvis: [0.55, 0.9, 0.02],
    pelvisRot: [55, 12, 0],
    chestRot: [0, 14, 0],
    lFoot: { p: [1.0, 0.06, 0.12], turn: 60, heel: 30 },
    rFoot: { p: [0.65, 0.02, -0.02], turn: 75, heel: 45 },
  })
  .key(0.75, {
    ...carried([1.05, 0.88, 0.02], 45),
    pelvis: [1.05, 0.88, 0.02],
    pelvisRot: [45, 12, 0],
    chestRot: [-5, 14, 0],
    lFoot: { p: [1.15, 0, 0.12], turn: 40, heel: 5 },
    rFoot: { p: [1.6, 0, -0.05], turn: 70, heel: 0 },
  })
  .key(1.0, {
    ...carried([1.3, 0.88, 0.0], 10),
    pelvis: [1.3, 0.88, 0.0],
    pelvisRot: [10, 10, 0],
    chestRot: [0, 14, 0],
    lFoot: { p: [1.0, 0, 0.02], turn: 0, heel: 5 },
    rFoot: { p: [1.65, 0, 0.0], turn: 15, heel: 5 },
  })
  .key(1.3, {
    ...carried([1.05, 0.9, 0.0], -20),
    pelvis: [1.05, 0.9, 0.0],
    pelvisRot: [-20, 10, 0],
    chestRot: [0, 14, 0],
    lFoot: { p: [0.6, 0, 0.02], turn: -25, heel: 0 },
    rFoot: { p: [1.5, 0.02, 0.0], turn: -5, heel: 35 },
  })
  .key(1.6, {
    ...carried([0.6, 0.9, 0.0], -45),
    pelvis: [0.6, 0.9, 0.0],
    pelvisRot: [-45, 10, 0],
    chestRot: [10, 14, 0],
    lFoot: { p: [0.1, 0, 0.02], turn: -60, heel: 0 },
    rFoot: { p: [0.4, 0.06, 0.15], turn: -50, heel: 35 },
  })
  .key(1.9, {
    ...carried([0.15, 0.9, 0.0], -15),
    pelvis: [0.15, 0.9, 0.0],
    pelvisRot: [-15, 8, 0],
    chestRot: [0, 14, 0],
    lFoot: { p: [-0.25, 0, 0.02], turn: -12, heel: 5 },
    rFoot: { p: [0.35, 0, 0.02], turn: 0, heel: 8 },
  })
  .ready(2.3)
  .done()

export const crossover: Stroke = {
  id: 'crossover',
  name: 'Crossover step',
  category: 'movement',
  level: 'intermediate',
  tagline: 'For the wide ball. Turn the hips, cross the inside leg over, and run.',
  description:
    'When the ball is more than a couple of shuffles away, the crossover covers ground faster: the hips turn toward the ball, the inside foot crosses in front of the outside foot, and you run the remaining distance before setting up. Recovery after a wide ball usually starts with a crossover too, followed by shuffles once you are close to the middle. The skill is in the hips: turn them and the legs follow.',
  grips: [],
  duration: 2.3,
  keys: crossoverKeys,
  phases: [
    { id: 'turn', name: 'Turn the hips', t0: 0, t1: 0.35, keyT: 0.25, focus: 'hips',
      summary: 'Out of the split step the hips turn toward the ball and the outside foot opens in that direction.',
      cues: ['Hips first', 'Outside foot opens', 'Stay low'] },
    { id: 'cross', name: 'Crossover', t0: 0.35, t1: 0.65, keyT: 0.5, focus: 'feet',
      summary: 'The inside foot crosses in front of the outside foot in one long step. The upper body stays facing mostly toward the net.',
      cues: ['Cross in front, not behind', 'Long step', 'Racket up while running'] },
    { id: 'run', name: 'Run and set', t0: 0.65, t1: 1.1, keyT: 0.75, focus: 'feet',
      summary: 'One or two running steps, then the outside foot plants to set up the stroke.',
      cues: ['Run to the ball', 'Plant the outside foot', 'Load the outside leg'] },
    { id: 'recover', name: 'Recover with crossover then shuffle', t0: 1.1, t1: 2.3, keyT: 1.6, focus: 'feet',
      summary: 'Push off the outside foot, cross over toward the middle, then shuffle the last metre and split.',
      cues: ['Push off hard', 'Crossover first, shuffle last', 'Split at the end'] },
  ],
  commonErrors: [
    { error: 'Shuffling to a ball that is too far away and arriving late.', fix: 'Rule of thumb: more than two shuffles away, cross over.' },
    { error: 'Turning the whole body and losing sight of the opponent.', fix: 'Turn the hips, keep the chest and eyes toward the court.' },
  ],
  drills: [
    'Cone sprints: from the centre mark, crossover-run to a cone on the sideline, shadow a stroke, recover with crossover then shuffle. 8 each side.',
    'Spider drill with crossovers to every corner.',
  ],
  proTags: ['footwork'],
}
