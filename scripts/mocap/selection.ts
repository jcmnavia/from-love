/** The exemplar chosen per stroke id (written by select.ts, read by retarget.ts / validate.ts). */
export const SELECTION = new URL('./selection.json', import.meta.url).pathname

export interface Selection {
  id: string
  file: string
  player: string
  peak: number
  contact: number
  window: [number, number]
  /** horizontal net direction in the lab frame (x, z) */
  net: [number, number]
  netMethod: string
  mirror: boolean
  vPeak: number
  score: number
}

