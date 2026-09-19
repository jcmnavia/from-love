// Content model for the written curriculum. Everything is plain data so a
// lesson can be rendered on any page, searched, and linked from the 3D studio.

export type SectionId =
  | 'court'
  | 'balls'
  | 'scoring'
  | 'rules'
  | 'etiquette'
  | 'racquets'
  | 'strings'
  | 'grips'
  | 'footwork'
  | 'coordination'
  | 'fitness'
  | 'tactics'
  | 'mental'

export type Level = 'beginner' | 'intermediate' | 'advanced'

export type Block =
  /** paragraphs separated by blank lines; **bold** is the only inline markup */
  | { type: 'text'; body: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; columns: string[]; rows: string[][] }
  | { type: 'callout'; title: string; body: string }
  /** an ordered procedure */
  | { type: 'steps'; steps: { title: string; body: string }[] }
  /** an internal link, e.g. to="/studio/forehand" */
  | { type: 'link'; to: string; label: string }

export interface Lesson {
  id: string
  section: SectionId
  title: string
  summary: string
  level: Level
  minutes: number
  blocks: Block[]
}

export interface Surface {
  id: 'hard' | 'clay' | 'grass' | 'indoor'
  name: string
  /** 1 (slow) to 5 (fast) */
  speed: number
  /** 1 (low) to 5 (high) */
  bounce: number
  typicalRally: string
  famousFor: string
  construction: string
  playingStyle: string
  footwear: string
  bodyNote: string
}

export interface BallType {
  id: string
  name: string
  color: string
  /** relative to a standard ball: 1 = same, 0.75 = 75 % of the bounce */
  bounce: number
  /** relative diameter, 1 = standard */
  size: number
  forWhom: string
  where: string
  notes: string
}

export interface Grip {
  id: string
  name: string
  /** bevel under the base knuckle of the index finger, right-handed, 1 = top bevel */
  indexKnuckle: number
  /** bevel under the heel pad of the hand */
  heelPad: number
  strokes: string[]
  feel: string
  howToFind: string
  pros: string[]
  cons: string[]
  /** pro players known for it */
  usedBy: string[]
}

export interface RacquetSpec {
  id: string
  name: string
  headSize: string
  weight: string
  balance: string
  stiffness: string
  stringPattern: string
  forWhom: string
  feel: string
}

export interface JuniorSize {
  length: string
  ageRange: string
  heightRange: string
  ballStage: string
}

export interface Drill {
  id: string
  name: string
  section: 'footwork' | 'coordination' | 'fitness'
  level: Level
  goal: string
  equipment: string
  setup: string
  steps: string[]
  reps: string
  coachingCues: string[]
  /**
   * Movement pattern on a half court for the diagram: points in metres,
   * x from -5.5 (left doubles line) to 5.5, z from 0 (baseline) to 11.9 (net).
   * Consecutive points are joined; `loop` closes the pattern.
   */
  pattern?: { points: [number, number][]; loop?: boolean; cones?: [number, number][] }
  /** id of a 3D movement in the studio, if one exists */
  studio?: string
}

export interface PathStage {
  /** 0 to 10 */
  n: number
  title: string
  range: string
  who: string
  goals: string[]
  items: { label: string; to?: string }[]
  milestone: string
}

export interface StringSpec {
  id: string
  name: string
  feel: string
  durability: string
  forWhom: string
  tension: string
}

/** An official reference: governing body, tournament, ranking page or rulebook. */
export interface Source {
  id: string
  name: string
  org: string
  url: string
  kind: 'rules' | 'ranking' | 'tournament' | 'governing-body' | 'coaching' | 'stats' | 'history'
  description: string
  language?: string
}
