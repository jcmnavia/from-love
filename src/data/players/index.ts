import p1970 from './1970s.json'
import p1980 from './1980s.json'
import p1990 from './1990s.json'
import p2000 from './2000s.json'
import p2010 from './2010s.json'
import p2020 from './2020s.json'

export type Decade = '1970s' | '1980s' | '1990s' | '2000s' | '2010s' | '2020s'

export interface ProPlayer {
  id: string
  name: string
  country: string
  tour: 'ATP' | 'WTA'
  decade: Decade
  rankInDecade: number
  peakRanking: number
  slams: number
  hand: 'right' | 'left'
  backhand: 'one-handed' | 'two-handed'
  forehandGrip: 'continental' | 'eastern' | 'semi-western' | 'western'
  style: 'serve-and-volley' | 'aggressive-baseliner' | 'counterpuncher' | 'all-court' | 'big-server'
  signature: string[]
  techniqueNotes: { stroke: string; note: string }[]
  lesson: string
  sources: string[]
}

export const DECADES: Decade[] = ['1970s', '1980s', '1990s', '2000s', '2010s', '2020s']

export const PLAYERS: ProPlayer[] = ([...p1970, ...p1980, ...p1990, ...p2000, ...p2010, ...p2020] as ProPlayer[]).sort(
  (a, b) => a.decade.localeCompare(b.decade) || a.tour.localeCompare(b.tour) || a.rankInDecade - b.rankInDecade,
)

export const STYLE_LABEL: Record<ProPlayer['style'], string> = {
  'serve-and-volley': 'Serve and volley',
  'aggressive-baseliner': 'Aggressive baseliner',
  counterpuncher: 'Counterpuncher',
  'all-court': 'All-court',
  'big-server': 'Big server',
}

export const STROKE_TAG_LABEL: Record<string, string> = {
  forehand: 'Forehand',
  'backhand-1h': 'One-handed backhand',
  'backhand-2h': 'Two-handed backhand',
  serve: 'Serve',
  slice: 'Slice',
  volley: 'Volley',
  'swing-volley': 'Swing volley',
  smash: 'Smash',
  'drop-shot': 'Drop shot',
  lob: 'Lob',
  return: 'Return',
  tweener: 'Tweener',
  'back-smash': 'Backhand smash',
  footwork: 'Footwork',
  mental: 'Mental game',
}

/** Notes from the pro dataset that teach one of the given stroke tags, best players first. */
export function proNotesFor(tags: string[], limit = 8) {
  const out: { player: ProPlayer; note: string; stroke: string }[] = []
  for (const player of PLAYERS) {
    for (const n of player.techniqueNotes) {
      if (tags.includes(n.stroke)) out.push({ player, note: n.note, stroke: n.stroke })
    }
  }
  out.sort((a, b) => b.player.slams - a.player.slams || a.player.rankInDecade - b.player.rankInDecade)
  // spread across eras so a learner sees how the stroke evolved
  const seen = new Map<string, number>()
  const spread = out.filter((o) => {
    const c = seen.get(o.player.decade) ?? 0
    if (c >= 2) return false
    seen.set(o.player.decade, c + 1)
    return true
  })
  return spread.sort((a, b) => a.player.decade.localeCompare(b.player.decade)).slice(0, limit)
}
