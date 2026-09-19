import type { Lesson } from './types'

export const FUNDAMENTAL_LESSONS: Lesson[] = [
  // ---------------------------------------------------------------- court
  {
    id: 'court-anatomy',
    section: 'court',
    title: 'Court anatomy: every line and zone',
    summary: 'The exact dimensions of a tennis court, what each line is called, and why the numbers matter for how you move and aim.',
    level: 'beginner',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'A tennis court is a rectangle **23.77 m long** (78 ft) and **8.23 m wide** for singles (27 ft) or **10.97 m wide** for doubles (36 ft). The net cuts it into two halves of 11.885 m each. Every other line is placed at a fixed distance from the net or the sidelines, so once you know four or five numbers you can picture the whole court.\n\nThe ITF Rules of Tennis fix these numbers. Lines are between 2.5 cm and 5 cm wide, except the baseline, which may be up to 10 cm. All lines count as part of the court they bound, which is why a ball touching a line is in.',
      },
      {
        type: 'table',
        columns: ['Line or zone', 'Where it is', 'Dimension'],
        rows: [
          ['Baseline', 'The back edge of each half', '11.885 m from the net, 10.97 m wide (doubles)'],
          ['Singles sideline', 'Inner long line', '8.23 m apart, 4.115 m from the centre'],
          ['Doubles sideline', 'Outer long line', '10.97 m apart, 5.485 m from the centre'],
          ['Alley (tramline)', 'Between the two sidelines', '1.37 m wide, in play only in doubles'],
          ['Service line', 'Parallel to the net', '6.40 m from the net, runs between the singles sidelines'],
          ['Centre service line', 'Splits the two service boxes', '6.40 m long, from net to service line'],
          ['Service box', 'Net to service line, centre line to singles sideline', '6.40 m x 4.115 m (26.3 m²)'],
          ['No-man’s land (back court)', 'Service line to baseline', '5.485 m deep x 8.23 m wide'],
          ['Centre mark', 'Middle of each baseline, pointing inward', '10 cm long, 5 cm wide'],
        ],
      },
      {
        type: 'text',
        body: 'The **net** is 0.914 m (3 ft) high at the centre, held down by a 5 cm white strap, and 1.07 m (3 ft 6 in) at the posts. The posts stand 0.914 m outside each doubles sideline, so the net is 12.8 m long overall. When singles is played on a doubles court, two **singles sticks** 1.07 m tall are placed 0.914 m outside each singles sideline to lift the net to the correct height there. The white band along the top is 5–6.35 cm deep.\n\nThat 15 cm drop from post to centre is why crosscourt shots are safer than down-the-line shots: the net is lower where a crosscourt ball crosses it, and the diagonal is longer too (about 25.4 m corner to corner versus 23.77 m straight).',
      },
      {
        type: 'callout',
        title: 'Run-off: the court is bigger than the lines',
        body: 'The ITF recommends at least 6.40 m of clear space behind each baseline and 3.66 m outside each doubles sideline for club play, giving a total playing area of 36.57 m x 18.29 m. Tour events use 8.23 m behind and 4.57 m to the side. When you pick a court to practise on, check the run-off: a tight back fence teaches you to stand too close to the baseline.',
      },
      {
        type: 'list',
        items: [
          'Deuce court: the right-hand half of each end as you face the net. Serves start here at 0-0 and every even point.',
          'Ad (advantage) court: the left-hand half. Serves go here on odd points.',
          'T: where the service line meets the centre service line. A serve “down the T” aims at this spot.',
          'Wide serve: a serve aimed near the singles sideline of the service box.',
          'Body serve: a serve aimed at the returner’s hip.',
          'The 2.5 m or so between the service line and where most rally balls land is where you are “short”; a ball inside the service box is a short ball to attack.',
        ],
      },
      {
        type: 'text',
        body: 'Practical use of the numbers: from the middle of the baseline it is 4.115 m to each singles sideline, roughly two big steps and a lunge. A serve from the centre mark travels a minimum of 18.3 m to the far service line along the T and about 19 m to the wide corner. A good ready position after a rally ball is about 1 m behind the baseline, a little to the side of the centre mark opposite to where you just hit, because the opponent’s natural reply is crosscourt.',
      },
    ],
  },
  {
    id: 'court-surfaces-compared',
    section: 'court',
    title: 'Court surfaces compared',
    summary: 'How hard, clay, grass and indoor courts change the ball, and how to adapt your footwork, shot selection and shoes to each.',
    level: 'beginner',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'The same shot behaves differently on each surface because the court changes two things: **how much pace the ball keeps** after the bounce and **how high it bounces**. Friction between ball and surface slows the ball and lifts it; a smooth, firm surface lets it skid through low. The ITF measures this as Court Pace Rating, from category 1 (slow, 29 and under) to category 5 (fast, 45 and over).',
      },
      {
        type: 'table',
        columns: ['Surface', 'Speed', 'Bounce', 'Rally length', 'Adapt by'],
        rows: [
          ['Clay', 'Slow (CPR 1–2)', 'High and heavy', 'Long, 8–15 shots', 'Add topspin and height, slide into shots, be patient, use the drop shot'],
          ['Hard', 'Medium (CPR 3–4)', 'Medium, very even', 'Medium, 4–8 shots', 'Take the ball early, serve big, stop and start with split steps'],
          ['Grass', 'Fast (CPR 4–5)', 'Low and skidding', 'Short, 2–5 shots', 'Bend more, hit flat and slice, attack the net, shorten steps'],
          ['Indoor hard', 'Medium-fast', 'Medium-low', 'Medium-short', 'Flatten the serve, aim closer to lines, trust the toss (no wind)'],
        ],
      },
      {
        type: 'steps',
        steps: [
          { title: 'Walk on and test the bounce', body: 'Before warming up, bounce a ball hard and watch how high it comes back and how much it skids. Then hit five groundstrokes from the baseline at your normal height and see whether they land short (slow court) or long (fast court).' },
          { title: 'Adjust your net clearance', body: 'On clay add half a metre of height over the net and swing more upward. On grass and fast indoor courts, flatten the arc and aim a little shorter because the ball will run.' },
          { title: 'Adjust your position', body: 'Stand a metre further back on clay to give the high bounce time to drop, and a step closer to the baseline on grass and fast hard courts to take the ball before it dies below your knees.' },
          { title: 'Adjust your movement', body: 'On clay learn to slide: plant the outside foot and let it skid into the shot. On hard courts stop with a wide base and a split step. On grass shorten your stride and keep your knees bent; sudden turns cause slips.' },
        ],
      },
      {
        type: 'callout',
        title: 'Shoes are surface-specific for a reason',
        body: 'Clay shoes have a full herringbone sole that grips when planted and lets you slide on purpose. Hard-court shoes have a tough outsole and more cushioning because the court has no give. Grass shoes have pimpled soles and are usually mandatory at grass clubs. Indoors, soles must be non-marking. Using the wrong shoe is the fastest way to a twisted ankle.',
      },
      {
        type: 'text',
        body: 'Grips and surfaces go together. Semi-western and western forehands love clay because the high bounce sits in their comfort zone. Eastern grips and slice come alive on grass where the ball stays low. A player with an all-round game changes very little between surfaces; a specialist has to work much harder. Learning on clay tends to build patience and footwork, learning on hard courts tends to build clean technique and first-strike tennis. If you have access to both, alternate.',
      },
      { type: 'link', to: '/learn/courts', label: 'Explore each surface in detail' },
    ],
  },
  {
    id: 'reading-the-court',
    section: 'court',
    title: 'Reading the court: defence, neutral and attack zones',
    summary: 'Where you stand decides what you can do. Learn the three depth zones, where to hit from each, and where to recover to after every shot.',
    level: 'intermediate',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'Coaches divide each half of the court into three depth zones. **Defence** is behind the baseline, typically 1–3 m back. **Neutral** is on or just inside the baseline to about a metre behind the service line, the no-man’s land where most rally balls are struck. **Attack** is inside the service line, from mid-court to the net.\n\nThe zone you are in when you hit tells you what shot is sensible. From defence, your job is to get the ball back deep, high and safe. From neutral, you build the point with direction and depth. From attack, you finish: approach, volley or put away.',
      },
      {
        type: 'table',
        columns: ['Zone', 'Where you are', 'Goal', 'Typical shots', 'Target'],
        rows: [
          ['Defence', '1–3 m behind the baseline, often pulled wide', 'Survive and reset', 'High heavy topspin, deep slice, lob', 'Deep middle or deep crosscourt, 1 m inside the baseline'],
          ['Neutral', 'Baseline to 1 m inside it', 'Build the point, move the opponent', 'Rally topspin, crosscourt angles, change of direction', 'Deep into the corners, 1–1.5 m inside the lines'],
          ['Attack', 'Inside the service line', 'End the point', 'Approach shot, swing volley, volley, drop shot, smash', 'Open court, or behind the running opponent'],
        ],
      },
      {
        type: 'text',
        body: 'The opponent’s ball tells you which zone to expect. A short ball that lands inside the service line invites you into the attack zone: move forward through the ball, do not wait for it. A deep, heavy ball pushes you into defence: accept it, hit high and deep, and recover. Most beginners err in one direction: either they never move forward on short balls, or they try to attack from three metres behind the baseline.\n\nA simple rule: **only try to hit a winner from the attack zone**. From neutral, hit to a big target and make the opponent move. From defence, make the ball.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Recover toward the centre of the possible replies', body: 'After hitting, do not run to the centre mark. Bisect the angle: if you hit crosscourt from the forehand corner, the opponent can hit sharp crosscourt or down the line, so your recovery spot is about 1 m to the forehand side of centre. If you hit down the middle, recover to the centre.' },
          { title: 'Recover to the right depth', body: 'On a slow court or against a heavy hitter, recover 1–1.5 m behind the baseline. On a fast court or against a pusher, recover on the baseline. Never recover forward into no-man’s land unless you are following an approach shot to the net.' },
          { title: 'Split step as the opponent hits', body: 'Land on both feet a fraction before contact so you can push off either way. Recovering late and standing flat-footed is the most common movement error at club level.' },
          { title: 'At the net, recover to the middle of the net', body: 'After a volley, take one shuffle step toward the centre of the net and slightly toward the side you hit to, to cover the down-the-line reply which arrives fastest.' },
        ],
      },
      {
        type: 'callout',
        title: 'The one-third rule',
        body: 'Split the width of the court into thirds. If you are in an outside third and off balance, hit crosscourt: the net is lower, the court is longer and your recovery is shorter. Only change direction down the line from the middle third or when you are set and inside the baseline. Changing direction on the run from an outside third is the highest-risk shot in tennis.',
      },
      {
        type: 'text',
        body: 'Watch a professional match with the zones in mind. You will see players spend 70–80% of their time in neutral and defence, and yet almost every winner and forcing shot is struck from inside the baseline. The transition into the attack zone happens on a short ball, a weak second serve or a floating return. Reading the court is really about recognising those moments a fraction earlier than your opponent does.',
      },
    ],
  },

  // ---------------------------------------------------------------- balls
  {
    id: 'ball-types-and-stages',
    section: 'balls',
    title: 'Ball types and stages: red, orange, green, yellow',
    summary: 'Why tennis uses slower, lighter balls and smaller courts for learners, what each stage looks like, and when to move up.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'A standard yellow ball bounces to 135–147 cm when dropped from 254 cm onto concrete. On a full court that is above the head of a six-year-old and above the shoulder of most nine-year-olds. Children who learn with it develop compensations: extreme grips, no follow-through, a fear of the ball and a tendency to stand at the back and moonball.\n\nThe ITF **Tennis Play and Stay** campaign, launched in 2007, fixed this with three slower balls and two smaller courts. The rule of thumb is that the ball should bounce no higher than the player’s hip so they can swing normally from the start.',
      },
      {
        type: 'table',
        columns: ['Stage', 'Ball', 'Size vs standard', 'Speed vs standard', 'Court', 'Net', 'Usual age'],
        rows: [
          ['Stage 3', 'Red (foam or felt)', 'Up to 15% larger felt; foam 8–9 cm', '75% slower', '11 m x 5.5 m', '0.80 m', '5–8'],
          ['Stage 2', 'Orange', 'Same size, lighter', '50% slower', '18 m x 6.5 m', '0.80 m', '8–10'],
          ['Stage 1', 'Green', 'Same size, slightly lighter', '25% slower', 'Full 23.77 m x 8.23 m', '0.914 m', '9–12'],
          ['Standard', 'Yellow', '6.54–6.86 cm, 56–59.4 g', 'Full speed', 'Full court', '0.914 m', '11 and up'],
        ],
      },
      {
        type: 'text',
        body: 'The **red court** is 11 m long and 5.5 m wide, which is the width of one service box doubled: most clubs mark two or three red courts across a single full court with the net at 0.80 m or a portable mini-net. The **orange court** is 18 m long, from one service line area to the other extended by about 2.6 m, and 6.5 m wide; it is usually marked with throw-down lines inside a full court. The **green court** is the full court with the normal net.\n\nEach court is scaled so that a child covers the same relative distance as an adult on a full court. That is why footwork and tactics learned at each stage carry over.',
      },
      {
        type: 'callout',
        title: 'Moving up is about skills, not birthdays',
        body: 'A player is ready for the next stage when they can rally 10–20 balls cooperatively, serve overhead into the box more often than not, and their bounce point stays at or below shoulder height on the new court. Coaches often keep a player on a stage for competition while introducing the next ball in practice. Under-10 competition in most countries is played with orange or green balls by regulation.',
      },
      {
        type: 'list',
        items: [
          'Adults can use the stages too. Red balls are excellent for learning volleys close together; orange for learning to build a point; green for a returning player with rusty timing.',
          'Foam red balls are quieter and safer indoors, felt red balls are better outdoors because they resist wind.',
          'Stage balls are marked by the ITF: green has a solid green dot, orange is orange and yellow or yellow with an orange dot, red is red and yellow or yellow with a red dot.',
          'Pressureless versions exist for all stages and are the usual choice for coaching baskets.',
        ],
      },
    ],
  },
  {
    id: 'choosing-and-caring-for-balls',
    section: 'balls',
    title: 'Choosing and caring for balls',
    summary: 'Pressurised versus pressureless, regular versus extra duty, how to tell when a ball is dead, altitude balls, and how many to bring to practice.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'A **pressurised** ball has a hollow rubber core filled with air at about 12 psi above atmospheric pressure. It feels lively and light, and this is what every match is played with. The trade-off is that the gas leaks through the rubber: a can loses noticeable bounce two to four weeks after opening, even if the balls sit in a bag.\n\nA **pressureless** ball has a thicker, stiffer rubber core and no internal pressure. It bounces within the same ITF range but feels harder and a little heavier, and it stays that way for months. It is the right ball for baskets, ball machines and solo wall practice.',
      },
      {
        type: 'table',
        columns: ['Ball', 'Best for', 'Life', 'Cost per ball'],
        rows: [
          ['Pressurised, extra duty', 'Outdoor hard courts, matches', '2–4 weeks once opened, 1–3 sessions of hard hitting', 'Around 1.5–3 euros'],
          ['Pressurised, regular duty', 'Clay, indoor, grass, matches', '2–4 weeks once opened, felt stays thinner', 'Around 1.5–3 euros'],
          ['Pressureless', 'Baskets, ball machines, drilling', '6–12 months; felt wears before the bounce dies', 'Around 1–2 euros in bulk'],
          ['High altitude (type 3)', 'Courts above 1,219 m', 'As pressurised', 'Around 2–3 euros'],
        ],
      },
      {
        type: 'steps',
        steps: [
          { title: 'Squeeze test', body: 'Hold the ball between thumb and fingers and squeeze hard. A fresh ball gives about 5 mm and springs back firmly. If your thumb sinks in easily or the ball feels soft all around, it is dead.' },
          { title: 'Drop test', body: 'Drop it from head height next to a new ball. If it bounces noticeably lower, retire it to the practice basket. Officially a ball should come back to 135–147 cm from a 254 cm drop.' },
          { title: 'Felt check', body: 'Bald patches or a shiny, matted felt mean the ball will fly fast and unpredictably and will not grip your strings for spin. Fluffed-up, heavy felt (common on clay) makes the ball slow and tiring to hit.' },
          { title: 'Listen', body: 'A dead ball makes a dull thud instead of a crisp pop. Tour players change balls after the first 7 games and then every 9 because the difference is that audible.' },
        ],
      },
      {
        type: 'callout',
        title: 'Playing at altitude',
        body: 'Above roughly 1,219 m (4,000 ft) the thinner air lets a normal ball fly faster and bounce higher. ITF type 3 high-altitude balls have a lower rebound (122–135 cm when tested at sea level) so they play normally up there. The rules also allow pressureless balls at altitude if they have been acclimatised for at least 60 days at the venue. If you are travelling from sea level to a mountain city, buy local balls and expect to shorten your swings for the first day.',
      },
      {
        type: 'list',
        items: [
          'For a rally practice with a partner, three to four fresh balls is enough; more than that and you spend the session picking up.',
          'For serving practice or feeding drills, a basket of 50–75 pressureless balls saves time and money.',
          'For a match, open a new can of three or four. Club leagues usually require new balls for each match.',
          'Store balls out of the sun and not in a hot car; heat speeds up pressure loss and dries the felt.',
          'Pressurised balls keep almost indefinitely in a sealed can, so buying cases in bulk is fine.',
          'Old pressurised balls are still good for dogs, chair legs and, more usefully, for teaching volleys and drop shots where a dead ball is an advantage.',
        ],
      },
    ],
  },

  // -------------------------------------------------------------- scoring
  {
    id: 'how-a-point-is-scored',
    section: 'scoring',
    title: 'How a point is scored: love, 15, 30, 40',
    summary: 'The vocabulary of a tennis game, how deuce and advantage work, why it is 40 and not 45, and how to call the score properly.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'A game is a race to four points, but the points are not counted 1, 2, 3, 4. They are called **love** (zero), **15**, **30**, **40** and **game**. To win a game you need four points and a margin of two. If both players reach 40 the score is **deuce**, and from there one player must win two points in a row: the first gives them **advantage** (ad), the second gives them the game. If the player with advantage loses the next point the score returns to deuce, and this can go on indefinitely.',
      },
      {
        type: 'table',
        columns: ['Points won by server', 'Points won by receiver', 'Score called'],
        rows: [
          ['0', '0', 'Love all'],
          ['1', '0', '15–love'],
          ['1', '1', '15 all'],
          ['2', '1', '30–15'],
          ['2', '3', '30–40'],
          ['3', '3', 'Deuce (40 all)'],
          ['4', '3', 'Advantage in (ad in, server’s advantage)'],
          ['3', '4', 'Advantage out (ad out, receiver’s advantage)'],
          ['4', '2', 'Game'],
        ],
      },
      {
        type: 'callout',
        title: 'Why 40 and not 45?',
        body: 'The most accepted story is that medieval French players kept score on a clock face, moving a hand a quarter turn per point: 15, 30, 45, 60 for the game. When the advantage rule arrived, 45 was shortened to 40 so that advantage could be shown at 50 and the game at 60. “Love” for zero probably comes from the French l’oeuf, the egg, for its shape, though some prefer the idea of playing “for love” when you have nothing. Deuce comes from the French à deux, two points needed.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Server’s score first, always', body: 'The server calls the score before every serve, their own points first. If you are serving and trailing 15–30, you say “15–30”, not “30–15”. This is a rule of the game, not just politeness.' },
          { title: 'Say it loud enough to be heard across the net', body: 'Calling the score aloud prevents almost every scoring dispute. If you and your opponent disagree, go back to the last score you both agree on and replay from there.' },
          { title: 'Call the game score at the start of each game', body: 'Before the first point of a game the server calls the games, again theirs first: “3–2” means the server leads three games to two. Some players also say “first set”.' },
          { title: 'At deuce, call the advantage by name', body: 'Say “advantage server” or “ad in” when the server leads, “advantage receiver” or “ad out” when the receiver leads. Naming the player avoids confusion in doubles.' },
        ],
      },
      {
        type: 'text',
        body: 'Two variations you will meet. **No-ad scoring** removes advantage: at deuce a single deciding point is played and the receiver chooses which side to receive from (in mixed doubles, the receiver of the same gender as the server). It is used in most doubles at tour level, in World TeamTennis and in many club leagues to control match length. **Ad-in / ad-out** is just the informal way of saying who has the advantage. Everything else about the game is the same.',
      },
    ],
  },
  {
    id: 'sets-tiebreaks-and-match-formats',
    section: 'scoring',
    title: 'Sets, tiebreaks and match formats',
    summary: 'How games become sets and matches, the exact tiebreak procedure, the 10-point match tiebreak, and the shortened formats you will meet at clubs.',
    level: 'beginner',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'A **set** is won by the first player to reach six games with a margin of two: 6–4 or 7–5 win a set, 6–5 does not. If the set reaches 6–6, a **tiebreak game** is played and the winner takes the set 7–6. Sets that continue until someone leads by two games without a tiebreak are called advantage sets and are now rare.\n\nA **match** is best of three sets (first to two) at almost every level, including women’s Grand Slam matches and every ATP and WTA tour event. Men’s singles at the four Grand Slams and Davis Cup finals-day matches are best of five sets (first to three).',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Who serves first', body: 'The player who was due to serve the next game serves the first point of the tiebreak, from the deuce court. Points are counted 1, 2, 3, not 15, 30, 40.' },
          { title: 'Then two serves each', body: 'After the first point, the opponent serves points 2 and 3, starting from the ad court and then the deuce court. Players then alternate every two points, always starting the pair from the ad court.' },
          { title: 'Change ends every six points', body: 'After points 6, 12, 18 and so on the players change ends without sitting down. There is no rest at 6 points; there is a normal changeover at the end of the tiebreak.' },
          { title: 'First to 7, win by 2', body: 'The tiebreak is won at 7 points with a two-point margin: 7–5 wins, 7–6 does not, so it continues 8–6, 9–7 and so on. The set is recorded as 7–6.' },
          { title: 'Next set', body: 'The player who received the first point of the tiebreak serves the first game of the next set. Ends are changed after the first game of the new set as normal.' },
        ],
      },
      {
        type: 'text',
        body: 'The **10-point match tiebreak** (often called a super tiebreak) follows exactly the same procedure but is played to 10 points with a two-point margin. It is used instead of a full third set in most doubles events and many club matches, where it counts as the deciding set and is written 1–0 (10–7).\n\nSince 2022 **all four Grand Slams** play a 10-point tiebreak at 6–6 in the final set (third set for women, fifth for men). Before that each major had a different ending: Wimbledon played a tiebreak at 12–12, the US Open a 7-point tiebreak at 6–6, Roland Garros an advantage set with no tiebreak, and the Australian Open a 10-point tiebreak from 2019.',
      },
      {
        type: 'table',
        columns: ['Format', 'How it works', 'Where you meet it'],
        rows: [
          ['Best of 3 tiebreak sets', 'First to two sets, 7-point tiebreak at 6–6 in every set', 'Tour singles, most club and junior matches'],
          ['Best of 5 tiebreak sets', 'First to three sets, 10-point tiebreak at 6–6 in the fifth', 'Men’s Grand Slam singles'],
          ['Two sets and a match tiebreak', 'Two tiebreak sets; a 10-point tiebreak replaces the third set', 'Tour doubles, club leagues, many junior events'],
          ['No-ad scoring', 'One deciding point at deuce; receiver picks the side', 'Tour doubles, US college tennis, social leagues'],
          ['Fast4', 'First to 4 games, no-ad, tiebreak at 3–3, lets played, best of 3 or 5 short sets', 'Club nights, Tennis Australia events, some ITF juniors'],
          ['Pro set', 'One long set, first to 8 (or 10) games by two, tiebreak at 8–8', 'Practice matches, college doubles, quick club tournaments'],
          ['Short sets', 'First to 4 games with a tiebreak at 4–4 (or 3–3), often with a match tiebreak as the deciding set', 'Red, orange and green ball competition'],
        ],
      },
      {
        type: 'callout',
        title: 'Keeping track in a tiebreak',
        body: 'Tiebreak scores confuse everyone. Two habits fix it: the server calls the point score before each serve (“4–3”), and both players remember one anchor: whoever served the first point of the tiebreak serves again when the total of points is odd (1, 3, 5, 7) after the very first point. If in doubt, count backwards: the pair of serves always starts from the ad court.',
      },
      { type: 'link', to: '/learn/scoring', label: 'Practise with the interactive scoreboard' },
    ],
  },

  // ---------------------------------------------------------------- rules
  {
    id: 'serving-rules',
    section: 'rules',
    title: 'Serving rules',
    summary: 'Where to stand, where the serve must land, faults, lets, foot faults, the order of service and how the toss decides who starts.',
    level: 'beginner',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'Before every point the server stands **behind the baseline** (both feet, not touching it) and **between the imaginary extensions of the centre mark and the singles sideline** (the doubles sideline in doubles). From there the serve must be struck before the ball bounces and must land in the **service box diagonally opposite**: the deuce-court server serves into the receiver’s deuce box, the ad-court server into the ad box.\n\nThe ball may be tossed or released by hand only. You may serve underarm, and you may let the ball drop without swinging (a toss you do not hit is not a fault). Once you swing and miss, it is a fault.',
      },
      {
        type: 'list',
        items: [
          'First point of the game: serve from the right of the centre mark (deuce court). Second point: from the left (ad court). Keep alternating for the whole game, including at deuce and advantage.',
          'You have two serves per point. A first fault gives you a second serve; a second fault is a double fault and the receiver wins the point.',
          'The receiver may stand anywhere, on or off the court, but must let the serve bounce before hitting it.',
          'The receiver must be ready. If you serve while they are clearly not ready and they make no attempt to return, the serve is replayed. If they attempt a return, they were ready.',
          'In doubles the server’s partner and the receiver’s partner may stand anywhere on their side, including inside the court.',
        ],
      },
      {
        type: 'table',
        columns: ['Situation', 'Call', 'What happens'],
        rows: [
          ['Serve lands outside the correct box, or hits the net and lands out', 'Fault', 'Second serve, or point lost if it was the second serve'],
          ['Serve touches the net, strap or band and lands in the correct box', 'Let', 'The serve is replayed; a let on a second serve gives another second serve'],
          ['Serve touches the net and hits the receiver or their partner before landing', 'Let', 'Replay the serve'],
          ['Serve hits the receiver or their clothing before bouncing (no net touch)', 'Point to server', 'The receiver loses the point even if the serve was heading out'],
          ['Serve hits the server’s doubles partner', 'Fault', 'Counts as a fault'],
          ['Serve hits the net post or singles stick and lands in', 'Fault', 'Unlike a rally ball, a serve that hits a post or stick is always a fault'],
          ['Ball tossed and caught, or dropped without a swing', 'No fault', 'Serve again with the same serve'],
        ],
      },
      {
        type: 'callout',
        title: 'Foot faults',
        body: 'During the service motion, from the start of the swing until the racquet strikes the ball, the server must not: touch the baseline or the court with either foot; touch the ground outside the imaginary extension of the sideline; touch the imaginary extension of the centre mark with either foot; or change position by walking or running (small foot adjustments are fine). Jumping is allowed as long as you take off from behind the line; landing in the court after contact is fine. Club players foot fault constantly by sliding the front foot onto the line, so film yourself once.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Spin the racquet or toss a coin', body: 'Before the warm-up, one player spins their racquet and the other calls the logo up or down (or “rough or smooth” on older frames). The winner of the toss gets to choose.' },
          { title: 'Choose one of three options', body: 'The winner may choose to serve or receive first (the loser then picks the end), choose the end (the loser then picks to serve or receive), or make the opponent choose first.' },
          { title: 'Consider the conditions', body: 'Choosing to receive is common when the sun or wind is in one player’s face: you get the good end and still serve second. On a windy day, choosing the end can matter more than the serve.' },
          { title: 'Then warm up', body: 'The toss happens before the warm-up so both players can warm up serves from the correct end. The warm-up is five minutes in most events.' },
        ],
      },
      {
        type: 'text',
        body: 'Order of service: players alternate serving whole games for the entire match. At the start of each new set the sequence simply continues, so the player who received the last game of the previous set serves the first game of the next. If a player serves out of turn, the correct server takes over as soon as the mistake is noticed, but all points already played count; a single fault already served is cancelled.',
      },
    ],
  },
  {
    id: 'during-the-point',
    section: 'rules',
    title: 'During the point: what is in, what is out, what loses the point',
    summary: 'The rulings that come up every match: lines, bounces, touching or reaching over the net, fixtures, hindrance, the not-up call, double hits and balls that spin back.',
    level: 'beginner',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'The basics are simple. The ball must be hit **before it bounces twice** on your side, it must cross the net (or go around the net post, which is legal as long as it lands in), and it must land **in the court or on a line**. Any part of the ball touching any part of the line is in. The line belongs to the court it bounds, so a ball touching the outside edge of the baseline is in, and a serve clipping the service line is good.\n\nA ball that lands in and then goes anywhere afterwards, over the fence or into the net, has already earned its point. Only the first bounce matters.',
      },
      {
        type: 'table',
        columns: ['What happened', 'Ruling'],
        rows: [
          ['The ball bounces twice before you hit it (a “not up”)', 'You lose the point, even if you then hit a great shot'],
          ['You, your racquet or your clothing touch the net, strap, band or the opponent’s side while the ball is in play', 'You lose the point'],
          ['You hit the ball before it has crossed the net', 'You lose the point; the follow-through may cross the net after a legal contact'],
          ['The ball spins back over the net to the hitter’s side after landing in', 'You may reach over and hit it, but you must not touch the net or the opponent’s court'],
          ['Your shot hits the net post, singles stick or net cord and lands in', 'Good ball, play on (a serve doing this is a fault)'],
          ['The ball hits a permanent fixture (fence, umpire chair, light, roof) before landing', 'The player who hit it loses the point'],
          ['The ball hits a permanent fixture after landing in', 'The player who hit it wins the point'],
          ['You hit the ball twice in one continuous swing (a double hit)', 'Legal if it was a single, unintentional motion; deliberate double hits lose the point'],
          ['You catch the ball or it touches you, even if it was clearly going out', 'You lose the point; only the bounce decides whether a ball is out'],
          ['You hit the ball around the outside of the net post, below net height, and it lands in', 'Good ball'],
          ['You throw your racquet at the ball and hit it', 'You lose the point; the racquet must be in your hand'],
        ],
      },
      {
        type: 'callout',
        title: 'Hindrance',
        body: 'A hindrance is anything that stops your opponent playing the point. If it is deliberate (shouting, waving, stamping, talking during a rally) the offender loses the point. If it is unintentional and beyond your control (your hat falls off, a ball falls from your pocket, a ball rolls in from another court) the point is replayed as a let, but only the first time: a hat or ball that keeps falling becomes a deliberate hindrance. Grunting is not a hindrance unless an official rules it excessive.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Call your side, not theirs', body: 'You call balls that land on your side of the net. You cannot call your own shot out on the opponent’s side, and you should not call their side at all. If you clearly see your own shot land out and they call it in, be honest: tell them.' },
          { title: 'Call promptly and clearly', body: 'An out call has to be made immediately, before the ball is returned or before your return lands. Say “out” or raise a finger, and for a ball you are unsure about, the ball is in. Doubt always goes to the opponent.' },
          { title: 'Call your own faults', body: 'If you touch the net, hit a not-up or double hit deliberately, say so. The opponent often cannot see these from across the court.' },
          { title: 'A let when a ball rolls on', body: 'If a ball from another court rolls onto yours during the point, either player can call “let” immediately and the point is replayed, with a first serve. Wait until the ball is actually interfering or a player sees it; you cannot call it after the point ends.' },
        ],
      },
      {
        type: 'text',
        body: 'Ball marks on clay can be inspected. If you disagree about a call on clay, the player who made the call shows the mark; if the mark is unclear or the wrong mark, the ball is in. On hard courts there are no marks, so the call stands unless the caller changes their mind. If you call a ball out and then realise it was in, you lose the point (you cannot replay it) unless the opponent’s shot was so good that you could not have returned it anyway, in which case it is also their point. Either way, a wrong out call is your loss.',
      },
    ],
  },
  {
    id: 'changeovers-and-timing',
    section: 'rules',
    title: 'Changeovers and timing',
    summary: 'When to change ends, how long you get between points, at changeovers and between sets, and how the warm-up and shot clock work.',
    level: 'beginner',
    minutes: 5,
    blocks: [
      {
        type: 'text',
        body: 'Players **change ends after the first, third and every following odd game of each set**, and at the end of a set if the total number of games in that set is odd. If the total is even, they change after the first game of the next set. In a tiebreak game they change after every six points with no sitting down. Changing ends evens out sun, wind and lighting differences.\n\nCounting trick: add the games in the current set. Odd total, change ends. 3–2 is five games, so you change. 4–2 is six, so you stay.',
      },
      {
        type: 'table',
        columns: ['Moment', 'Time allowed', 'Notes'],
        rows: [
          ['Warm-up', '5 minutes', 'Grand Slam and tour standard; some club events allow 10. Serve practice happens inside the five minutes, no “first one in” after it.'],
          ['Between points', '25 seconds', 'ITF Rules of Tennis maximum. On the ATP, WTA and at the Slams it is shown on a shot clock that starts when the previous point ends; a violation costs a warning then a fault (server) or a point (receiver).'],
          ['Changeover after odd games', '90 seconds', 'From the end of the last point to the start of the next. There is no changeover break after the first game of a set or during a tiebreak.'],
          ['Set break', '120 seconds', 'Two minutes at the end of every set, whether or not ends are changed.'],
          ['Toilet break', 'One per match (best of 3), 3 minutes', 'Taken at a set break on tour; change of attire adds 2 minutes. Club rules vary.'],
          ['Medical timeout', '3 minutes of treatment', 'Once per condition, after evaluation by the physio. Not for cramping alone on the ATP.'],
          ['Rest between sets (some junior events)', '10 minutes after the 3rd set', 'Allowed in best-of-5 junior and some hot-weather regulations.'],
        ],
      },
      {
        type: 'callout',
        title: 'Continuous play',
        body: 'The rule behind all of these numbers is that play must be continuous. You cannot leave the court between games except at a changeover or set break, you cannot rest or take coaching between points, and the receiver must play to the reasonable pace of the server. In club tennis without a shot clock, a good habit is to be at the baseline and ready to serve within 20 seconds and never to take a drink except at a changeover.',
      },
      {
        type: 'list',
        items: [
          'Coaching from the stands with hand signals or brief words is now permitted on the ATP and WTA and at the Grand Slams (since 2023), but only when the player is at the same end of the court and not during a point.',
          'Heat rules allow a 10-minute break between the second and third set (women) or third and fourth (men) at the Slams when the heat stress index is exceeded.',
          'If play is suspended for rain, the match resumes at the exact score and the same server; a fresh warm-up is allowed after a delay of 15 minutes or more.',
          'Balls are changed after the first 7 games and then every 9 on tour, timed to coincide with a changeover; the warm-up counts as two games of wear.',
        ],
      },
    ],
  },
  {
    id: 'doubles-rules',
    section: 'rules',
    title: 'Doubles rules',
    summary: 'The wider court, how serving and receiving order is fixed for a set, the one-partner rule on the return, and the standard formations including Australian and I-formation.',
    level: 'intermediate',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'Doubles is played on the full **10.97 m wide** court: the alleys (tramlines) are in play for every shot **except the serve**, which must still land in the normal service box. The net posts are the doubles posts, so no singles sticks. Everything about scoring is the same as singles, though most doubles is played with no-ad scoring and a 10-point match tiebreak in place of the third set.\n\nAt the start of each set the serving team chooses which partner serves first, and the receiving team chooses which partner receives in the deuce court and which in the ad court. Both choices are locked for the whole set.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Serving rotation', body: 'Teams alternate serving games. Within a team, the partners alternate too, so over four games the order is A, C, B, D (A and B are one team). A player who served in the first game of a set serves again in the third and fifth. The order may be changed only at the start of a new set.' },
          { title: 'Receiving order', body: 'The partner who receives in the deuce court receives every point played in that court for the whole set, and likewise for the ad court. You cannot swap sides mid-set, even at deuce.' },
          { title: 'The one-partner rule on the return', body: 'Only the designated receiver may hit the return of serve. If the serve touches the receiver’s partner before it bounces, the serving team wins the point (unless it first touched the net, which is a let). After the return, either partner may hit any ball, including two in a row by the same partner.' },
          { title: 'Tiebreak order', body: 'The same rotation continues into the tiebreak: the player due to serve serves the first point, then the opponents’ next server serves two, and so on. The order may be changed for a match tiebreak only if it is treated as a new set (it is, in the ITF rules).' },
          { title: 'Serving out of order', body: 'If the wrong partner serves, the correct one takes over as soon as it is noticed. Points stand; a fault already served is cancelled. If the receiving pair swap sides by mistake, they stay swapped until the end of that game, then return to the correct order.' },
        ],
      },
      {
        type: 'table',
        columns: ['Formation', 'Where the server’s partner stands', 'Why use it'],
        rows: [
          ['Standard (one up, one back)', 'At the net on the opposite half from the server, about 1 m inside the service line and midway between the centre line and the singles sideline', 'Covers the natural crosscourt return and lets the net player poach. The default for most points.'],
          ['Australian', 'At the net on the same half as the server, so both partners start on one side', 'Takes away the returner’s favourite crosscourt return; forces them down the line into the open court, which is harder. Good against a returner with a strong crosscourt.'],
          ['I-formation', 'Crouched on the centre line at the net, directly in front of the server, then moving left or right on a pre-arranged signal as the serve is struck', 'Disguises where the net player is going. Excellent on second serves and to disrupt a rhythm returner. Needs hand signals and trust.'],
          ['Both back', 'Both on the baseline', 'A defensive set-up against a big server or a poaching net player; the returning team also uses it when the return is being picked off at the net.'],
        ],
      },
      {
        type: 'callout',
        title: 'Signals behind the back',
        body: 'The net player signals to the server before each point with fingers behind their back: which way the serve should go (one finger for T, two for wide, fist for body) and whether they will poach (move across) or stay. The server confirms with a quiet “yes” or “no”. Signalling is legal and every good team does it, but talking during the point is only allowed if it does not hinder the opponents, so keep it to short calls like “yours”, “mine”, “switch” and “bounce it”.',
      },
      {
        type: 'list',
        items: [
          'A ball hit by one team that touches either partner or their racquet before landing loses them the point, even if that partner was outside the court.',
          'Partners may not both hit the ball on the same shot. A shot where both racquets touch the ball loses the point.',
          'Either partner may call lines and the score. A dispute is settled by the two partners agreeing; if they disagree, the ball is in.',
          'In mixed doubles with no-ad scoring the deciding point is served to the receiver of the same sex as the server.',
          'The server’s partner may stand anywhere, but if they are hit by the serve it is a fault.',
        ],
      },
    ],
  },

  // ------------------------------------------------------------ etiquette
  {
    id: 'court-etiquette',
    section: 'etiquette',
    title: 'Court etiquette',
    summary: 'The unwritten rules that keep a match friendly: honest line calls, calling the score, crossing behind courts, stray balls, noise, and the handshake.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Almost all the tennis you will ever play has no umpire. The game only works because each player officiates their own side of the net and gives the opponent the benefit of the doubt. The rules of etiquette below are how that trust is built and kept. Most of them are also written into the ITF Code of Conduct for unofficiated matches, so they are rules as much as manners.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Call your own lines honestly and generously', body: 'You are responsible for every ball landing on your side. If you did not clearly see it out, it is in. Call “out” immediately and loudly, or raise a finger; a late or hesitant call means the ball was good. Never call the opponent’s side, and if you see your own shot land out and they play it, tell them.' },
          { title: 'Call the score before every serve', body: 'The server announces the game score at the start of each game and the point score before every point, their own first. Say it loudly enough for the receiver to hear across 24 metres. This alone prevents most arguments.' },
          { title: 'Wait before crossing behind a court', body: 'Never walk behind a court while a point is being played. Wait at the gate or fence until the point ends, then cross quickly during the gap. The same applies when leaving your own court.' },
          { title: 'Return stray balls between points', body: 'If a ball from the next court rolls onto yours, wait for their point to end, then roll or gently hit it back to the server, not into the middle of a rally. If your ball rolls onto their court, wait for their point to finish and ask politely (“thank you” with a raised hand is the universal signal).' },
          { title: 'Be quiet during points', body: 'No talking, moving behind the baseline, or racquet noise while a rally is going on next to you. On your own court, do not talk during the point except for short doubles calls.' },
          { title: 'Shake hands at the end', body: 'Win or lose, meet at the net, shake hands (or tap racquets) and say “good match”. In doubles, all four players shake. Thank the umpire if there is one.' },
        ],
      },
      {
        type: 'callout',
        title: 'A ball rolls on during your point: call a let',
        body: 'When a stray ball rolls onto your court mid-rally, either player says “let” straight away and the point is replayed with a first serve. If you see the ball but choose to play on, you cannot call a let after losing the point. If a ball rolls on between first and second serve, the server gets two serves again in most codes because their rhythm has been interrupted.',
      },
      {
        type: 'list',
        items: [
          'Warm up to your opponent, not at them: hit rally balls to the middle so both of you get loose. The warm-up is not the first set.',
          'Feed balls to the server in a way they can catch: a bounce to the hand or a gentle roll, never a hard hit or a lob.',
          'Serve only when the receiver is looking at you and ready. Hold up a ball to show you are about to serve.',
          'If a ball is unplayable (a broken ball, a clearly out serve that bounces to you), catch it and say so; do not smash it into the fence.',
          'Do not celebrate an opponent’s error. Celebrate your own winners quietly.',
          'Bring balls, be on time, and leave the court as you found it: sweep and drag clay courts, pick up your balls and rubbish, close the gate.',
          'Wear appropriate shoes. Running shoes damage clay and grass and are banned at most clubs.',
          'In practice, if you hit a ball that you know is out but your partner did not see, say “out, sorry” and move on.',
        ],
      },
      {
        type: 'text',
        body: 'When there is a real dispute, the process is calm: stop play, say what you saw, listen to what they saw, and if you cannot agree, the ball is in and the point goes to the player who was calling their side. Persistent bad calls are dealt with by asking for a roving official if there is one, not by calling their balls out in return. You will be remembered at your club for how you call lines far more than for how you hit forehands.',
      },
    ],
  },
]
