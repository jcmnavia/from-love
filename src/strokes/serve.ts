import { sequence } from '../engine/pose'
import type { Stroke } from '../engine/types'

// Rhythm and angles after Elliott & Reid (ITF Biomechanics of Advanced Tennis) and Bahamonde: a
// slow ~1.2 s wind-up, front-knee flexion ~60–70° (knee angle ~110–115°) at the trophy, toss apex
// ~0.3 m above contact, racket drop → impact ≈ 0.1–0.15 s, hitting shoulder ~35° above the other
// at impact, contact ~0.3 m in front of the front foot, landing on the front foot ~0.25 s later.
const keys = sequence()
  // stance: sideways, front foot at ~45° to the baseline, back foot parallel to it (platform)
  .key(0.0, {
    pelvis: [0.1, 0.98, -0.18],
    pelvisRot: [60, 2, 0],
    chestRot: [5, 2, 0],
    rHand: [0.22, 1.0, -0.1],
    rPole: [0.8, -0.5, -0.3],
    lHand: [-0.02, 0.98, 0.22],
    lAttach: 2,
    lPole: [-0.5, -0.8, 0.2],
    racketDir: [-0.3, 0.1, 0.95],
    racketNormal: [-0.85, 0.2, -0.3],
    lFoot: { p: [-0.12, 0, 0.05], turn: 45, heel: 0 },
    rFoot: { p: [0.3, 0, -0.42], turn: 78, heel: 0 },
  })
  // bottom of the pendulum: both arms hang, racket edge leading, weight starting back
  .key(0.28, {
    pelvis: [0.13, 0.98, -0.22],
    pelvisRot: [60, 0, 0],
    chestRot: [5, 0, 0],
    rHand: [0.26, 0.95, -0.3],
    rPole: [0.9, -0.3, -0.2],
    lHand: [0.06, 0.98, -0.02],
    lAttach: 0,
    lPole: [-0.4, -0.9, 0.1],
    racketDir: [-0.05, -0.75, 0.66],
    racketNormal: [-0.95, -0.2, 0.2],
  })
  // rock back: racket arm swings behind, toss arm begins to lift, weight on the back foot
  .key(0.55, {
    pelvis: [0.16, 0.97, -0.26],
    pelvisRot: [60, -2, 0],
    chestRot: [6, -3, 0],
    rHand: [0.34, 0.98, -0.62],
    rPole: [0.9, -0.2, -0.35],
    lHand: [0.0, 1.02, 0.2],
    lPole: [-0.6, -0.7, 0.3],
    racketDir: [0.2, -0.3, -0.93],
    racketNormal: [-0.5, 0.4, 0.75],
  })
  // release: toss arm straight at eye height, racket arm climbing behind with the elbow bending,
  // knees starting to bend
  .key(0.85, {
    pelvis: [0.12, 0.92, -0.22],
    pelvisRot: [60, -7, 0],
    chestRot: [10, -9, -4],
    rHand: [0.48, 1.04, -0.48],
    rPole: [0.9, 0.2, -0.4],
    lHand: [-0.12, 1.45, 0.36],
    lPole: [-0.7, -0.4, 0.5],
    racketDir: [0.3, 0.55, -0.78],
    racketNormal: [0.3, 0.5, 0.8],
  })
  // trophy: toss arm pointing at the ball, racket tip up with the elbow high, knees ~110°,
  // hips pushed toward the net so the body forms a bow, shoulders tilted (front shoulder low)
  .key(1.25, {
    pelvis: [0.06, 0.86, -0.1],
    pelvisRot: [58, -12, -6],
    chestRot: [18, -14, -8],
    rHand: [0.38, 1.48, -0.32],
    rPole: [1, -0.3, -0.5],
    lHand: [-0.15, 1.78, 0.4],
    lPole: [-0.8, -0.3, 0.4],
    racketDir: [0.1, 0.95, -0.3],
    racketNormal: [0.95, 0, 0.3],
    lFoot: { heel: 15 },
    rFoot: { heel: 20 },
  })
  // the tip tips back over the shoulder as the legs begin to extend
  .key(1.35, {
    pelvis: [0.05, 0.89, -0.07],
    pelvisRot: [50, -10, -7],
    chestRot: [18, -14, -9],
    rHand: [0.4, 1.5, -0.3],
    rPole: [0.95, 0.1, -0.4],
    lHand: [-0.13, 1.7, 0.36],
    racketDir: [0.35, 0.3, -0.89],
    racketNormal: [0.93, 0.1, 0.35],
    lFoot: { heel: 30 },
    rFoot: { heel: 40 },
  })
  // leg drive: hips rise and turn, the racket head falls down the back
  .key(1.44, {
    pelvis: [0.03, 0.93, -0.04],
    pelvisRot: [42, -8, -8],
    chestRot: [16, -14, -9],
    rHand: [0.36, 1.42, -0.2],
    rPole: [0.9, 0.5, -0.3],
    lHand: [-0.1, 1.55, 0.32],
    racketDir: [0.35, -0.8, -0.5],
    racketNormal: [0.9, 0.2, 0.4],
    lFoot: { heel: 45 },
    rFoot: { p: [0.2, 0.04, -0.3], heel: 60 },
  })
  // deepest racket drop: feet leaving the ground, elbow leading up, tip pointing at the back fence
  .key(1.55, {
    pelvis: [0.01, 1.0, 0.06],
    pelvisRot: [28, 0, -10],
    chestRot: [6, -6, -13],
    rHand: [0.28, 1.76, -0.08],
    rPole: [0.9, 0.5, 0.0],
    lHand: [-0.06, 1.38, 0.24],
    lPole: [-0.6, -0.6, 0.3],
    racketDir: [0.3, -0.7, -0.65],
    racketNormal: [0.75, 0.1, 0.65],
    lFoot: { p: [-0.11, 0.06, 0.1], turn: 30, heel: 60 },
    rFoot: { p: [0.16, 0.1, -0.26], turn: 62, heel: 60 },
  })
  // racket horizontal behind the head, elbow extending
  .key(1.59, {
    pelvis: [0.0, 1.035, 0.11],
    pelvisRot: [20, 4, -10],
    chestRot: [-2, 0, -15],
    rHand: [0.2, 2.04, 0.06],
    rPole: [0.9, 0.4, 0.1],
    lHand: [0.04, 1.16, 0.29],
    racketDir: [0.55, 0.05, -0.83],
    racketNormal: [0.4, 0.1, 0.9],
    lFoot: { p: [-0.1, 0.1, 0.13], turn: 25, heel: 60 },
    rFoot: { p: [0.14, 0.15, -0.24], turn: 60, heel: 60 },
  })
  // contact: full extension off the ground, hitting shoulder high over the other, toss arm tucked
  // across the stomach, head still looking up
  .key(1.62, {
    pelvis: [0.0, 1.04, 0.14],
    pelvisRot: [15, 6, -10],
    chestRot: [-5, 4, -16],
    rHand: [0.12, 2.18, 0.16],
    rPole: [0.9, 0.3, 0.2],
    lHand: [0.08, 1.08, 0.3],
    lPole: [-0.6, -0.7, 0.3],
    racketDir: [0.1, 0.98, 0.15],
    racketNormal: [-0.15, -0.1, 0.98],
    lFoot: { p: [-0.1, 0.12, 0.15], turn: 20, heel: 60 },
    rFoot: { p: [0.12, 0.18, -0.22], turn: 60, heel: 60 },
  })
  // pronation: the forearm rolls so the face turns to the right, racket travelling out and down
  .key(1.74, {
    pelvis: [-0.02, 0.97, 0.26],
    pelvisRot: [2, 12, -4],
    chestRot: [-14, 14, -6],
    rHand: [-0.02, 1.62, 0.56],
    rPole: [0.8, -0.2, 0.5],
    lHand: [-0.14, 1.1, 0.14],
    racketDir: [-0.25, 0.4, 0.88],
    racketNormal: [0.7, -0.6, 0.4],
    lFoot: { p: [-0.08, 0.02, 0.3], turn: 10, heel: 30 },
    rFoot: { p: [0.2, 0.25, -0.3], turn: 30, heel: 70 },
  })
  // landing: on the front foot inside the baseline, back leg kicked back for balance
  .key(1.9, {
    pelvis: [-0.02, 0.92, 0.36],
    pelvisRot: [-6, 14, -1],
    chestRot: [-14, 12, -2],
    rHand: [-0.22, 1.16, 0.5],
    rPole: [0.6, -0.5, 0.65],
    lHand: [-0.22, 1.04, 0.24],
    racketDir: [-0.5, -0.35, 0.8],
    racketNormal: [0.7, -0.45, 0.55],
    lFoot: { p: [-0.08, 0, 0.3], turn: 5, heel: 6 },
    rFoot: { p: [0.22, 0.18, -0.18], turn: 20, heel: 70 },
  })
  // follow-through across the left side; the back leg swings through
  .key(2.15, {
    pelvis: [0.0, 0.9, 0.44],
    pelvisRot: [-12, 14, 0],
    chestRot: [-14, 10, 0],
    rHand: [-0.22, 0.98, 0.52],
    rPole: [0.5, -0.5, 0.7],
    lHand: [-0.26, 1.0, 0.3],
    racketDir: [-0.55, -0.5, 0.67],
    racketNormal: [0.5, -0.45, 0.74],
    lFoot: { heel: 8 },
    rFoot: { p: [0.26, 0.02, 0.5], turn: 5, heel: 25 },
  })
  // racket comes back up in front, both hands meet, feet gathering for the split step
  .key(2.5, {
    pelvis: [0.0, 0.92, 0.5],
    pelvisRot: [-4, 8, 0],
    chestRot: [-4, 14, 0],
    rHand: [0.02, 1.02, 0.62],
    rPole: [0.6, -0.7, -0.2],
    lHand: [-0.1, 1.08, 0.66],
    lAttach: 1.6,
    lPole: [-0.6, -0.8, -0.2],
    racketDir: [-0.3, 0.55, 0.78],
    racketNormal: [-0.6, -0.3, 0.74],
    lFoot: { p: [-0.26, 0, 0.5], turn: -8, heel: 8 },
    rFoot: { p: [0.28, 0, 0.5], turn: 10, heel: 8 },
  })
  .ready(2.8, {
    pelvis: [0, 0.9, 0.5],
    lFoot: { p: [-0.3, 0, 0.52] },
    rFoot: { p: [0.3, 0, 0.52] },
  })
  .done()

export const serve: Stroke = {
  id: 'serve',
  clip: 'serve',
  contactRacket: { dir: [0.1, 0.97, 0.2], normal: [0, -0.2, 0.98] },
  // Arm and racket keyed from Sinner's serve (side view, ~2.7× slow motion, contact = 0): the pendulum back,
  // the trophy with the elbow at shoulder height and the forearm vertical, the racket dropping down the back
  // (max external rotation ~0.2 s before contact), full reach at contact, then pronation and the arm across.
  // the toss arm rises faster and straighter than the capture's so the hand is moving up at the ball's speed when it
  // lets go at about head height (the release is found where the two speeds match, see StrokeRuntime.tossRelease)
  leftArmKeys: [
    { t: -1.1, hand: 'clip' },
    { t: -1.0, hand: [0.22, 0.3, 0.45] },
    { t: -0.95, hand: [0.18, 0.42, 0.4] },
    { t: -0.85, hand: [0.14, 0.5, 0.33] },
    { t: -0.6, hand: 'clip' },
  ],
  armKeys: [
    { t: -1.9, racket: { dir: [-0.35, -0.5, 0.8] } },
    { t: -1.4, hand: 'clip', racket: { dir: [0.1, -0.95, -0.2] } },
    { t: -1.1, racket: { dir: [0.2, -0.6, -0.75] } },
    { t: -0.8, hand: [0.15, -0.35, -0.35], elbow: [0.1, -0.25, -0.12], racket: { dir: [0.2, -0.5, -0.85] } },
    { t: -0.67, hand: [0.2, 0.1, -0.3], elbow: [0.22, -0.05, -0.15], racket: { dir: [0.1, 0.8, -0.6] } },
    { t: -0.55, hand: [0.28, 0.19, -0.29], elbow: [0.25, 0, -0.1], racket: { dir: [0.1, 0.9, 0.3] } },
    { t: -0.37, hand: [0.28, 0.19, -0.29], elbow: [0.25, 0, -0.1], racket: { dir: [0.1, 0.9, 0.3] } },
    { t: -0.27, hand: [0.22, 0.12, -0.22], elbow: [0.25, 0.04, -0.05], racket: { dir: [0, 0.1, -1] } },
    { t: -0.2, hand: [0.23, -0.06, -0.18], elbow: [0.26, 0.06, 0.06], racket: { dir: [-0.2, -0.95, 0.1] } },
    { t: -0.12, hand: [0.22, 0.2, -0.15], elbow: [0.2, 0.18, 0.1], racket: { dir: [0, -0.6, -0.8] } },
    { t: -0.07, hand: [0.18, 0.45, -0.05], elbow: [0.16, 0.24, 0.07], racket: { dir: [-0.1, 0.3, -0.95] } },
    { t: -0.03, hand: [0.13, 0.52, 0.08], elbow: [0.12, 0.27, 0.05], racket: { dir: [-0.5, 0.65, -0.55] } },
    { t: 0, hand: [0.14, 0.55, 0.12], elbow: [0.07, 0.28, 0.06], racket: { dir: [0.1, 0.97, 0.2], normal: [0, -0.2, 0.98] } },
    { t: 0.05, hand: 'clip', racket: { dir: [0.3, 0.6, 0.75] } },
    { t: 0.12, racket: { dir: [-0.3, -0.3, 0.9] } },
    { t: 0.22, racket: { dir: [-0.5, -0.8, 0.3] } },
    { t: 0.9, racket: { dir: [-0.35, -0.5, 0.8] } },
  ],
  name: 'Serve',
  aka: 'Flat first serve, platform stance',
  category: 'serve',
  level: 'beginner',
  tagline: 'The only shot you control completely. A throw, not a hit.',
  description:
    'The serve is a throwing motion with a racket at the end of it. A continental grip lets the forearm pronate through contact, which is where the effortless pace of good servers comes from. The rhythm is down together, up together: both arms drop, then the toss arm rises with the racket arm. The legs bend into the trophy position, the racket drops down the back as the legs drive up, and contact happens at full stretch in front of the body with the body tilted shoulder over shoulder. This version shows a flat first serve from a platform stance; a slice serve brushes the ball at 2 o’clock, a kick serve brushes from 7 to 1.',
  grips: [
    { id: 'continental', note: 'Bevel 2, the hammer grip. Non-negotiable for a serve that pronates.' },
  ],
  duration: 2.8,
  origin: [0.5, -0.3],
  keys,
  ball: {
    contactT: 1.62,
    waypoints: [{ t: 0.85, p: 'lHand' }],
    out: [-1.6, -3.6, 46],
  },
  phases: [
    { id: 'stance', name: 'Stance', t0: 0, t1: 0.35, keyT: 0.05, focus: 'feet',
      summary: 'Sideways to the baseline. Front foot pointing at the right net post, back foot parallel to the baseline, weight on the front foot, racket and ball together in front.',
      cues: ['Front toe at the net post', 'Shoulders sideways to the target', 'Ball resting on the strings, hands together'] },
    { id: 'rock', name: 'Down together', t0: 0.35, t1: 0.7, keyT: 0.55, focus: 'body',
      summary: 'Both arms drop at the same time as the weight rocks onto the back foot. Slow. This sets the rhythm of everything that follows.',
      cues: ['Down together', 'Weight rocks back', 'Relaxed grip, racket edge leads'] },
    { id: 'toss', name: 'Toss', t0: 0.7, t1: 1.05, keyT: 0.85, focus: 'head',
      summary: 'The toss arm rises straight, releasing the ball at eye level with the fingers opening, not flicking. The racket arm rises behind at the same time: up together.',
      cues: ['Straight arm lift', 'Release at eye height', 'Toss slightly in front and to the right'] },
    { id: 'trophy', name: 'Trophy position', t0: 1.05, t1: 1.38, keyT: 1.25, focus: 'shoulders',
      summary: 'Toss arm pointing at the ball, racket tip up with the elbow bent and high, knees bent to about 110 degrees, hip pushed toward the net so the body forms a bow.',
      cues: ['Elbow high, tip up', 'Knees bend as the ball peaks', 'Chest to the sky, hip forward'] },
    { id: 'drop', name: 'Leg drive and racket drop', t0: 1.38, t1: 1.58, keyT: 1.5, focus: 'racket',
      summary: 'The legs explode upward while the racket head falls down the back: the deeper the drop as the legs drive, the faster the racket will be at contact.',
      cues: ['Legs go up as the racket goes down', 'Elbow leads the racket upward', 'Heels off the ground'] },
    { id: 'contact', name: 'Contact', t0: 1.58, t1: 1.68, keyT: 1.62, focus: 'racket',
      summary: 'Fully extended, off the ground, the hitting shoulder high above the other. Contact in front of the body at the top of the reach, head still looking up.',
      cues: ['Reach up, not out', 'Shoulder over shoulder', 'Keep the head up through the hit'] },
    { id: 'pronation', name: 'Pronation', t0: 1.68, t1: 1.86, keyT: 1.74, focus: 'racket',
      summary: 'The forearm rolls so the racket face turns to the right after contact. This is the natural end of the throwing motion, not something to force.',
      cues: ['Let the forearm roll', 'Racket edge finishes toward the side fence', 'Land on the front foot'] },
    { id: 'finish', name: 'Landing and finish', t0: 1.86, t1: 2.8, keyT: 1.9, focus: 'body',
      summary: 'Land inside the baseline on the left foot with the right leg kicked back, racket finishing across the left side of the body, then the back leg swings through and the racket comes back up for the split step.',
      cues: ['Land inside the court', 'Back leg kicks back for balance', 'Straight into a split step'] },
  ],
  commonErrors: [
    { error: 'Forehand grip on the serve (waiter’s tray): the face stays open and the ball floats.', fix: 'Continental grip, then serve from the service line with a throwing motion until the pronation feels natural.' },
    { error: 'Toss too low or drifting behind the head.', fix: 'Lift with a straight arm from the leg, release at eye level, catch the toss ten times without hitting.' },
    { error: 'Front foot moves before contact (foot fault) or the body opens early.', fix: 'Keep the shoulders sideways until the racket drops; practise with a ball can placed in front of the front toe.' },
    { error: 'Contact behind the head, ball goes long.', fix: 'Toss further into the court and reach up in front.' },
  ],
  drills: [
    'Throw balls over the net from the baseline with a full over-arm throw. Serving is throwing.',
    'Toss and catch: 10 tosses caught at full reach without moving the feet.',
    'Trophy freeze: pause in the trophy position for two seconds, then finish the serve.',
    'Target serving: 20 serves to the T, 20 out wide, count the makes.',
  ],
  proTags: ['serve'],
}
