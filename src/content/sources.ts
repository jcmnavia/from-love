import type { Source } from './types'

/**
 * Official references shown at the bottom of lessons and stroke pages.
 * Every URL was fetched and confirmed to resolve on 2026-09-19.
 */
export const SOURCES: Source[] = [
  // ── ITF: rules and technical ────────────────────────────────────────────
  {
    id: 'itf-rules-of-tennis',
    name: 'ITF Rules of Tennis',
    org: 'International Tennis Federation',
    url: 'https://www.itftennis.com/en/about-us/tennis-tech/rules-of-tennis/',
    kind: 'rules',
    description:
      'The official hub for the Rules of Tennis, with the current edition, amendments and translations that every court, ball and scoring rule in this app is based on.',
    language: 'en',
  },
  {
    id: 'itf-rules-of-tennis-2026-pdf',
    name: 'ITF Rules of Tennis 2026 (PDF)',
    org: 'International Tennis Federation',
    url: 'https://www.itftennis.com/media/7221/2026-rules-of-tennis-english.pdf',
    kind: 'rules',
    description:
      'The full current rulebook as a single PDF: court dimensions, the ball and racket appendices, scoring, serving, lets, hindrance and the code of conduct basics.',
    language: 'en',
  },
  {
    id: 'itf-rules-and-regulations',
    name: 'ITF Rules and Regulations',
    org: 'International Tennis Federation',
    url: 'https://www.itftennis.com/en/about-us/governance/rules-and-regulations/',
    kind: 'rules',
    description:
      'Index of every rulebook the ITF publishes or hosts, including the Rules of Tennis, the Grand Slam Rule Book and the ATP and WTA rulebooks.',
    language: 'en',
  },
  {
    id: 'itf-approved-balls',
    name: 'ITF Approved Balls',
    org: 'International Tennis Federation',
    url: 'https://www.itftennis.com/en/about-us/tennis-tech/approved-balls/',
    kind: 'rules',
    description:
      'Searchable list of every ball approved for tournament play, with its type and manufacturer, so you can check that the balls you buy meet the specification.',
    language: 'en',
  },
  {
    id: 'itf-ball-classification',
    name: 'ITF Ball Types and Classification',
    org: 'International Tennis Federation',
    url: 'https://www.itftennis.com/en/about-us/tennis-tech/ball-classification/',
    kind: 'rules',
    description:
      'Explains the ball types (1 fast, 2 medium, 3 slow, high altitude) and the Stage 1, 2 and 3 red, orange and green balls used for beginners and juniors.',
    language: 'en',
  },
  {
    id: 'itf-courts-tech',
    name: 'ITF Courts: Dimensions and Surfaces',
    org: 'International Tennis Federation',
    url: 'https://www.itftennis.com/en/about-us/tennis-tech/courts/',
    kind: 'rules',
    description:
      'The reference for court dimensions, line widths, net height, surface types and the Tennis 10s red and orange court sizes.',
    language: 'en',
  },
  {
    id: 'itf-court-pace-classification',
    name: 'ITF Court Pace Classification',
    org: 'International Tennis Federation',
    url: 'https://www.itftennis.com/en/about-us/tennis-tech/court-pace-classification/',
    kind: 'rules',
    description:
      'How the ITF rates surfaces from slow (category 1) to fast (category 5), useful for understanding why clay, hard and grass play so differently.',
    language: 'en',
  },

  // ── ITF: coaching and development ───────────────────────────────────────
  {
    id: 'itf-play-and-stay',
    name: 'ITF Tennis Play and Stay',
    org: 'International Tennis Federation',
    url: 'https://www.itftennis.com/en/growing-the-game/tennis-play-and-stay/',
    kind: 'coaching',
    description:
      'The global beginner programme built on slower red, orange and green balls and smaller courts so new players serve, rally and score from the first lesson.',
    language: 'en',
  },
  {
    id: 'itf-coaching',
    name: 'ITF Coaching',
    org: 'International Tennis Federation',
    url: 'https://www.itftennis.com/en/growing-the-game/coaching/',
    kind: 'coaching',
    description:
      'Overview of ITF coach education, the coaching conference and the resources national federations use to train coaches.',
    language: 'en',
  },
  {
    id: 'itf-academy',
    name: 'ITF Academy',
    org: 'International Tennis Federation',
    url: 'https://www.itf-academy.com/',
    kind: 'coaching',
    description:
      'The ITF online learning platform with free and paid courses on technique, tactics, movement, fitness, psychology and coaching juniors.',
    language: 'en',
  },
  {
    id: 'itf-world-tennis-number',
    name: 'ITF World Tennis Number',
    org: 'International Tennis Federation',
    url: 'https://worldtennisnumber.com/',
    kind: 'ranking',
    description:
      'The global rating scale from 40 (beginner) to 1 (elite) that lets any player measure their level and find opponents of similar ability.',
    language: 'en',
  },
  {
    id: 'itf-juniors',
    name: 'ITF World Tennis Tour Juniors',
    org: 'International Tennis Federation',
    url: 'https://www.itftennis.com/en/itf-tours/world-tennis-tour-juniors/',
    kind: 'tournament',
    description:
      'The international under-18 circuit with its calendar, rankings and regulations, the pathway from junior tennis to the professional tours.',
    language: 'en',
  },

  // ── Professional tours ──────────────────────────────────────────────────
  {
    id: 'atp-rankings-singles',
    name: 'PIF ATP Rankings (Singles)',
    org: 'ATP Tour',
    url: 'https://www.atptour.com/en/rankings/singles',
    kind: 'ranking',
    description:
      'The official weekly singles rankings for men, with points, movement and a date filter to look up any week in history.',
    language: 'en',
  },
  {
    id: 'atp-rulebook',
    name: 'ATP Official Rulebook',
    org: 'ATP Tour',
    url: 'https://www.atptour.com/en/corporate/rulebook',
    kind: 'rules',
    description:
      'The current ATP rulebook by chapter, covering competition rules, the code of conduct, shot clock, medical timeouts and ranking points.',
    language: 'en',
  },
  {
    id: 'atp-stats',
    name: 'Infosys ATP Stats',
    org: 'ATP Tour',
    url: 'https://www.atptour.com/en/stats',
    kind: 'stats',
    description:
      'Leaderboards for serve, return and under-pressure statistics plus analytics articles that show which patterns actually win points on tour.',
    language: 'en',
  },
  {
    id: 'wta-rankings-singles',
    name: 'WTA Rankings (Singles)',
    org: 'WTA',
    url: 'https://www.wtatennis.com/rankings/singles',
    kind: 'ranking',
    description:
      'The official weekly singles rankings for women, with points, tournaments played and ranking movement.',
    language: 'en',
  },
  {
    id: 'wta-rules',
    name: 'WTA Rules and Official Rulebook',
    org: 'WTA',
    url: 'https://www.wtatennis.com/wta-rules',
    kind: 'rules',
    description:
      'The WTA rules page with the downloadable annual rulebook covering tournament formats, the code of conduct, coaching rules and ranking points.',
    language: 'en',
  },
  {
    id: 'grand-slam-rulebook-2026',
    name: 'Official Grand Slam Rule Book 2026 (PDF)',
    org: 'Grand Slam Board',
    url: 'https://www.itftennis.com/media/5986/grand-slam-rulebook-2026-f2.pdf',
    kind: 'rules',
    description:
      'The rules shared by the four majors: best-of-five sets, the 10-point final-set tiebreak, warm-up and changeover times, dress and conduct.',
    language: 'en',
  },

  // ── The four majors ─────────────────────────────────────────────────────
  {
    id: 'australian-open',
    name: 'Australian Open',
    org: 'Tennis Australia',
    url: 'https://ausopen.com/',
    kind: 'tournament',
    description:
      'The first major of the year, played on hard courts in Melbourne in January, with draws, results, history and player information.',
    language: 'en',
  },
  {
    id: 'roland-garros',
    name: 'Roland-Garros',
    org: 'Fédération Française de Tennis',
    url: 'https://www.rolandgarros.com/en-us/',
    kind: 'tournament',
    description:
      'The clay-court major in Paris each May and June, the reference for how the slowest surface changes rallies, movement and tactics.',
    language: 'en',
  },
  {
    id: 'wimbledon',
    name: 'The Championships, Wimbledon',
    org: 'All England Lawn Tennis Club',
    url: 'https://www.wimbledon.com/',
    kind: 'tournament',
    description:
      'The only grass-court major and the oldest tournament in the sport, with draws, scores, and the traditions of all-white clothing and quiet courts.',
    language: 'en',
  },
  {
    id: 'wimbledon-history',
    name: 'Wimbledon History and Records',
    org: 'All England Lawn Tennis Club',
    url: 'https://www.wimbledon.com/en_GB/about/history',
    kind: 'history',
    description:
      'The story of The Championships since 1877, past champions, records and how rules like the tiebreak and Open era changed the game.',
    language: 'en',
  },
  {
    id: 'us-open',
    name: 'US Open',
    org: 'USTA',
    url: 'https://www.usopen.org/',
    kind: 'tournament',
    description:
      'The hard-court major in New York each August and September, the first Grand Slam to adopt the tiebreak and night sessions.',
    language: 'en',
  },

  // ── Team and season-ending events ───────────────────────────────────────
  {
    id: 'davis-cup',
    name: 'Davis Cup',
    org: 'International Tennis Federation',
    url: 'https://www.daviscup.com/',
    kind: 'tournament',
    description:
      'The men\'s international team competition since 1900, with a format of singles and doubles rubbers that shows how team tennis is scored.',
    language: 'en',
  },
  {
    id: 'billie-jean-king-cup',
    name: 'Billie Jean King Cup',
    org: 'International Tennis Federation',
    url: 'https://www.billiejeankingcup.com/',
    kind: 'tournament',
    description:
      'The women\'s international team competition, formerly the Fed Cup, with results, ties and the history of the event since 1963.',
    language: 'en',
  },
  {
    id: 'laver-cup',
    name: 'Laver Cup',
    org: 'Laver Cup',
    url: 'https://lavercup.com/',
    kind: 'tournament',
    description:
      'The annual Team Europe versus Team World exhibition with its unusual points-per-day format and black court, named after Rod Laver.',
    language: 'en',
  },
  {
    id: 'nitto-atp-finals',
    name: 'Nitto ATP Finals',
    org: 'ATP Tour',
    url: 'https://www.nittoatpfinals.com/',
    kind: 'tournament',
    description:
      'The season-ending championship for the top eight men in singles and doubles, played in a round-robin then knockout format.',
    language: 'en',
  },
  {
    id: 'wta-finals',
    name: 'WTA Finals',
    org: 'WTA',
    url: 'https://www.wtafinals.com/',
    kind: 'tournament',
    description:
      'The season-ending championship for the top eight women in singles and doubles, decided by the annual race to qualify.',
    language: 'en',
  },
  {
    id: 'united-cup',
    name: 'United Cup',
    org: 'ATP Tour and WTA',
    url: 'https://www.unitedcup.com/',
    kind: 'tournament',
    description:
      'The mixed-gender team event that opens the season in Australia, with men\'s and women\'s singles plus mixed doubles deciding each tie.',
    language: 'en',
  },
  {
    id: 'olympic-tennis',
    name: 'Olympic Tennis',
    org: 'International Olympic Committee',
    url: 'https://www.olympics.com/en/sports/tennis/',
    kind: 'tournament',
    description:
      'Olympic tennis history, rules and results, including the sport\'s return to the Games in 1988 and the five medal events.',
    language: 'en',
  },

  // ── National federations: learning and ratings ─────────────────────────
  {
    id: 'usta-tips-and-instruction',
    name: 'USTA Tips and Instruction',
    org: 'USTA',
    url: 'https://www.usta.com/en/home/improve/tips-and-instruction.html',
    kind: 'coaching',
    description:
      'Free articles and videos on strokes, footwork, tactics, fitness and the mental game written for club players of every level.',
    language: 'en',
  },
  {
    id: 'usta-coach-organize',
    name: 'USTA Coach and Organize',
    org: 'USTA',
    url: 'https://www.usta.com/en/home/coach-organize.html',
    kind: 'coaching',
    description:
      'Coaching resources, lesson plans and programme tools for coaches, parents and volunteers running practices.',
    language: 'en',
  },
  {
    id: 'usta-youth-tennis',
    name: 'USTA Youth Tennis',
    org: 'USTA',
    url: 'https://www.usta.com/en/home/play/youth-tennis.html',
    kind: 'coaching',
    description:
      'How kids progress through red, orange and green ball tennis in the United States, with age-appropriate courts and racquets.',
    language: 'en',
  },
  {
    id: 'usta-ntrp',
    name: 'Understanding NTRP Ratings',
    org: 'USTA',
    url: 'https://www.usta.com/en/home/coach-organize/tennis-tool-center/run-usta-programs/national/understanding-ntrp-ratings.html',
    kind: 'ranking',
    description:
      'The National Tennis Rating Program scale from 1.5 to 7.0, how ratings are calculated and how to self-rate for league play.',
    language: 'en',
  },
  {
    id: 'usta-ntrp-guidelines-pdf',
    name: 'NTRP General and Experienced Player Guidelines (PDF)',
    org: 'USTA',
    url: 'https://www.usta.com/content/dam/usta/pdfs/10013_experience_player_ntrp_guidelines.pdf',
    kind: 'ranking',
    description:
      'The level-by-level descriptions of what a 2.5, 3.0, 3.5 and higher player can do with each stroke, ideal for setting your own goals.',
    language: 'en',
  },
  {
    id: 'lta-play',
    name: 'LTA Ways to Play',
    org: 'Lawn Tennis Association',
    url: 'https://www.lta.org.uk/play/ways-to-play/',
    kind: 'coaching',
    description:
      'The British governing body guide to getting started: coaching, LTA Youth for kids, social play and how to find a court.',
    language: 'en',
  },
  {
    id: 'lta-coaches',
    name: 'LTA Coaches',
    org: 'Lawn Tennis Association',
    url: 'https://www.lta.org.uk/roles-and-venues/coaches/',
    kind: 'coaching',
    description:
      'Coach qualifications, continuing education and resources used by accredited coaches across Great Britain.',
    language: 'en',
  },
  {
    id: 'tennis-australia-coaches-hub',
    name: 'Tennis Australia Coaches Hub',
    org: 'Tennis Australia',
    url: 'https://www.tennis.com.au/clubs-coaches-officials/coaches',
    kind: 'coaching',
    description:
      'Qualifications, workshops and coaching resources from the federation behind the Australian Open, ITF gold-level recognised.',
    language: 'en',
  },
  {
    id: 'tennis-australia-hot-shots',
    name: 'Hot Shots Tennis',
    org: 'Tennis Australia',
    url: 'https://www.tennis.com.au/play/kids-tennis/hot-shots',
    kind: 'coaching',
    description:
      'The Australian junior programme built on red, orange and green stages, showing how kids learn to rally with modified balls and courts.',
    language: 'en',
  },

  // ── History and statistics ──────────────────────────────────────────────
  {
    id: 'tennis-hall-of-fame',
    name: 'International Tennis Hall of Fame',
    org: 'International Tennis Hall of Fame',
    url: 'https://www.tennisfame.com/',
    kind: 'history',
    description:
      'Biographies of every inducted player and contributor plus the history of the sport, from the lawn tennis of the 1870s to today.',
    language: 'en',
  },
  {
    id: 'ultimate-tennis-statistics',
    name: 'Ultimate Tennis Statistics',
    org: 'Ultimate Tennis Statistics',
    url: 'https://www.ultimatetennisstatistics.com/',
    kind: 'stats',
    description:
      'Open database of ATP results with head-to-heads, surface records, GOAT lists and serve and return stats back to 1968.',
    language: 'en',
  },
  {
    id: 'tennis-abstract',
    name: 'Tennis Abstract',
    org: 'Tennis Abstract',
    url: 'https://www.tennisabstract.com/',
    kind: 'stats',
    description:
      'Player pages, match results and the Match Charting Project, which records shot-by-shot patterns from thousands of pro matches.',
    language: 'en',
  },
  {
    id: 'twu-learning-center',
    name: 'Tennis Warehouse University: Tennis Physics',
    org: 'Tennis Warehouse University',
    url: 'https://twu.tennis-warehouse.com/learning_center/tennis-physics.php',
    kind: 'coaching',
    description:
      'Lab research on racquet swingweight, stiffness, string tension and spin, explaining what the numbers on a racquet actually do.',
    language: 'en',
  },
  {
    id: 'twu-racquet-recommender',
    name: 'Tennis Warehouse University: Racquet Finder',
    org: 'Tennis Warehouse University',
    url: 'https://twu.tennis-warehouse.com/learning_center/recommender.php',
    kind: 'stats',
    description:
      'Filter hundreds of measured racquets by head size, weight, balance, stiffness and string pattern to shortlist your first frame.',
    language: 'en',
  },
  {
    id: 'twu-string-comparison',
    name: 'Tennis Warehouse University: String Comparison',
    org: 'Tennis Warehouse University',
    url: 'https://twu.tennis-warehouse.com/learning_center/comparestrings.php',
    kind: 'stats',
    description:
      'Measured stiffness, tension loss and spin potential for hundreds of strings, so you can compare polyester, multifilament and gut.',
    language: 'en',
  },
]

/** lesson id → source ids */
export const LESSON_SOURCES: Record<string, string[]> = {
  // fundamentals: court
  'court-anatomy': ['itf-courts-tech', 'itf-rules-of-tennis', 'itf-rules-of-tennis-2026-pdf'],
  'court-surfaces-compared': ['itf-court-pace-classification', 'itf-courts-tech', 'wimbledon', 'roland-garros'],
  'reading-the-court': ['itf-courts-tech', 'usta-tips-and-instruction', 'itf-academy'],
  // fundamentals: balls
  'ball-types-and-stages': ['itf-ball-classification', 'itf-play-and-stay', 'itf-approved-balls'],
  'choosing-and-caring-for-balls': ['itf-approved-balls', 'itf-ball-classification', 'itf-rules-of-tennis'],
  // fundamentals: scoring
  'how-a-point-is-scored': ['itf-rules-of-tennis', 'itf-rules-of-tennis-2026-pdf', 'usta-tips-and-instruction'],
  'sets-tiebreaks-and-match-formats': ['itf-rules-of-tennis', 'grand-slam-rulebook-2026', 'atp-rulebook', 'wta-rules'],
  // fundamentals: rules
  'serving-rules': ['itf-rules-of-tennis', 'itf-rules-of-tennis-2026-pdf', 'atp-rulebook'],
  'during-the-point': ['itf-rules-of-tennis', 'itf-rules-of-tennis-2026-pdf', 'itf-rules-and-regulations'],
  'changeovers-and-timing': ['itf-rules-of-tennis', 'atp-rulebook', 'wta-rules', 'grand-slam-rulebook-2026'],
  'doubles-rules': ['itf-rules-of-tennis', 'itf-rules-of-tennis-2026-pdf', 'usta-tips-and-instruction'],
  'court-etiquette': ['usta-tips-and-instruction', 'lta-play', 'itf-rules-of-tennis'],
  // equipment: racquets and strings
  'racquet-anatomy-and-specs': ['twu-learning-center', 'twu-racquet-recommender', 'itf-rules-of-tennis-2026-pdf'],
  'choosing-your-first-racquet': ['twu-racquet-recommender', 'twu-learning-center', 'usta-tips-and-instruction'],
  'strings-tension-and-restringing': ['twu-string-comparison', 'twu-learning-center'],
  // equipment: grips
  'how-to-hold-the-racquet': ['itf-academy', 'usta-tips-and-instruction', 'lta-play'],
  'which-grip-for-which-stroke': ['itf-academy', 'usta-tips-and-instruction', 'itf-coaching'],
  'changing-grips-quickly': ['itf-academy', 'usta-tips-and-instruction'],
  // movement: footwork
  'why-footwork-decides-everything': ['itf-academy', 'itf-coaching', 'usta-tips-and-instruction'],
  'the-split-step': ['itf-academy', 'usta-tips-and-instruction', 'atp-stats'],
  'stances-explained': ['itf-academy', 'usta-tips-and-instruction'],
  'recovery-and-court-positioning': ['itf-academy', 'itf-coaching', 'tennis-abstract'],
  'moving-forward-and-back': ['itf-academy', 'usta-tips-and-instruction'],
  // movement: coordination
  'hand-eye-coordination-for-juniors': ['itf-play-and-stay', 'usta-youth-tennis', 'tennis-australia-hot-shots', 'lta-play'],
  'balance-and-body-awareness': ['itf-academy', 'itf-play-and-stay', 'usta-youth-tennis'],
  // movement: fitness
  'warm-up-and-cool-down': ['itf-academy', 'usta-tips-and-instruction', 'lta-play'],
  'strength-for-tennis': ['itf-academy', 'itf-coaching', 'usta-tips-and-instruction'],
  'endurance-and-speed': ['itf-academy', 'itf-coaching', 'atp-stats'],
  // movement: tactics
  'first-tactics-consistency-and-depth': ['itf-academy', 'tennis-abstract', 'usta-tips-and-instruction'],
  'the-five-game-situations': ['itf-academy', 'itf-coaching', 'atp-stats'],
  'patterns-of-play': ['itf-academy', 'atp-stats', 'tennis-abstract', 'ultimate-tennis-statistics'],
  'doubles-tactics-basics': ['itf-academy', 'usta-tips-and-instruction', 'lta-play'],
  // movement: mental
  'between-point-routine': ['itf-academy', 'itf-coaching', 'itf-rules-of-tennis'],
  'handling-nerves-and-chokes': ['itf-academy', 'itf-coaching', 'usta-tips-and-instruction'],
  'practice-with-purpose': ['itf-academy', 'itf-world-tennis-number', 'usta-ntrp', 'usta-ntrp-guidelines-pdf'],
  'how-to-learn-a-stroke': ['itf-academy', 'usta-coach-organize', 'lta-coaches', 'tennis-australia-coaches-hub'],
}

/** stroke id → source ids */
export const STROKE_SOURCES: Record<string, string[]> = {
  forehand: ['itf-academy', 'usta-tips-and-instruction', 'atp-stats'],
  'backhand-two-handed': ['itf-academy', 'usta-tips-and-instruction'],
  'backhand-one-handed': ['itf-academy', 'usta-tips-and-instruction', 'wimbledon-history'],
  slice: ['itf-academy', 'wimbledon', 'usta-tips-and-instruction'],
  return: ['itf-academy', 'atp-stats', 'itf-rules-of-tennis'],
  serve: ['itf-academy', 'itf-rules-of-tennis', 'atp-stats'],
  'forehand-volley': ['itf-academy', 'usta-tips-and-instruction', 'wimbledon'],
  'backhand-volley': ['itf-academy', 'usta-tips-and-instruction'],
  'swing-volley': ['itf-academy', 'usta-tips-and-instruction'],
  smash: ['itf-academy', 'usta-tips-and-instruction'],
  'drop-shot': ['itf-academy', 'roland-garros'],
  'back-smash': ['itf-academy'],
  tweener: ['itf-academy', 'us-open'],
  'split-step': ['itf-academy', 'itf-coaching'],
  shuffle: ['itf-academy', 'itf-coaching'],
  crossover: ['itf-academy', 'itf-coaching'],
}

/** learn area id (courts, balls, scoring, rules, racquets, grips, footwork, fitness, tactics, mental) → source ids */
export const AREA_SOURCES: Record<string, string[]> = {
  courts: ['itf-courts-tech', 'itf-court-pace-classification', 'itf-rules-of-tennis', 'wimbledon', 'roland-garros'],
  balls: ['itf-approved-balls', 'itf-ball-classification', 'itf-play-and-stay', 'itf-rules-of-tennis'],
  scoring: ['itf-rules-of-tennis', 'itf-rules-of-tennis-2026-pdf', 'grand-slam-rulebook-2026', 'atp-rulebook', 'wta-rules'],
  rules: ['itf-rules-of-tennis', 'itf-rules-and-regulations', 'atp-rulebook', 'wta-rules', 'grand-slam-rulebook-2026'],
  racquets: ['twu-learning-center', 'twu-racquet-recommender', 'twu-string-comparison', 'itf-rules-of-tennis-2026-pdf'],
  grips: ['itf-academy', 'usta-tips-and-instruction', 'lta-play', 'itf-coaching'],
  footwork: ['itf-academy', 'itf-coaching', 'usta-tips-and-instruction', 'atp-stats'],
  fitness: ['itf-academy', 'itf-coaching', 'usta-tips-and-instruction', 'lta-play'],
  tactics: ['itf-academy', 'atp-stats', 'tennis-abstract', 'ultimate-tennis-statistics'],
  mental: ['itf-academy', 'itf-coaching', 'usta-tips-and-instruction', 'tennis-hall-of-fame'],
}

export const sourceById = (id: string) => SOURCES.find((s) => s.id === id)
