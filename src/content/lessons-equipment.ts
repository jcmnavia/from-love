import type { Lesson } from './types'

export const EQUIPMENT_LESSONS: Lesson[] = [
  // ------------------------------------------------------------- racquets
  {
    id: 'racquet-anatomy-and-specs',
    section: 'racquets',
    title: 'Racquet anatomy and specs',
    summary: 'Head size, length, weight, swingweight, balance, stiffness, beam width and string pattern: what each number means and how it changes the way the racquet plays.',
    level: 'beginner',
    minutes: 9,
    blocks: [
      {
        type: 'text',
        body: 'A racquet has a **head** (the hoop holding the strings), a **throat** (the open triangle where the two sides of the frame meet), a **shaft**, a **handle** wrapped in a grip, and a **butt cap** at the end. The **beam** is the frame’s cross-section; grommets are the plastic strip the strings pass through, and the bumper guard protects the top of the head. The rules allow a frame up to 73.7 cm (29 in) long and 31.7 cm (12.5 in) wide, with a strung area no longer than 39.4 cm and no wider than 29.2 cm.\n\nEvery spec below is a trade-off between power, control, manoeuvrability and comfort. There is no best racquet, only the best match for your swing.',
      },
      {
        type: 'table',
        columns: ['Spec', 'Typical range', 'Lower end means', 'Higher end means'],
        rows: [
          ['Head size', '93–118 sq in (600–761 cm²); 100 sq in = 645 cm²', 'More control and feel, smaller sweet spot', 'More power and forgiveness, more twist on off-centre hits'],
          ['Length', '68.6 cm (27 in) standard, up to 73.7 cm (29 in) legal', 'Quicker to swing, better at the net', 'More leverage and reach on the serve, slower to manoeuvre'],
          ['Static weight (unstrung)', '255–340 g; add about 15–18 g for strings and an overgrip', 'Easy to swing fast and for long sessions, more shock', 'More stability and plow-through, less arm shock, more effort'],
          ['Swingweight', '280–345 (strung); 320 is medium', 'Whippy, fast racquet-head speed', 'Heavy through the ball, stable against pace, tiring'],
          ['Balance', '30.5–35 cm from the butt; even = 34.3 cm; 1 point = 3.175 mm (1/8 in)', 'Head-light (HL): more control and manoeuvrability', 'Head-heavy (HH): more power from a light frame'],
          ['Stiffness (RA)', '55–75', 'Flexible: more comfort and feel, less power', 'Stiff: more power, crisper, harsher on the arm'],
          ['Beam width', '17–30 mm', 'Thin: flexible, precise, lower power', 'Thick: stiff and powerful, more aerodynamic drag'],
          ['String pattern', '16x18 to 18x20', 'Open (16x19): more spin and power, strings move and break faster', 'Dense (18x20): more control and durability, flatter, more predictable'],
        ],
      },
      {
        type: 'text',
        body: '**Head size** is quoted in square inches; 1 sq in is 6.45 cm². Midsize is 85–95 sq in, mid-plus 96–104, oversize 105 and up. Almost all adult racquets today sit between 97 and 100 sq in because that is the sweet spot between forgiveness and control.\n\n**Balance** is measured from the butt cap to the point where the racquet balances on a rail. A 68.6 cm racquet balances evenly at 34.3 cm. Each 3.175 mm (1/8 in) toward the handle is one point head-light, so a frame balanced at 32 cm is about 7 points HL. Player’s frames are 6–12 pts HL; light power frames are even or head-heavy so that they still carry mass through the ball.',
      },
      {
        type: 'callout',
        title: 'Swingweight beats static weight',
        body: 'Two racquets can both weigh 300 g and feel completely different, because what your arm feels is swingweight: how the mass is distributed along the frame, measured on a machine and quoted as a number without units. A 300 g head-heavy racquet can swing heavier than a 315 g head-light one. Below 300 you get whip and speed, 310–330 is where most adults land, and above 335 you need strong shoulders. If you demo racquets, ask the shop for the swingweight, not just the weight.',
      },
      {
        type: 'text',
        body: '**Stiffness** is the RA number from a Babolat RDC machine, measuring how much the frame bends under load. Modern power frames like the Babolat Pure Drive are about 70–72 RA; the Wilson Blade 98 is about 62; older flexible frames were in the 50s. A stiffer frame returns more energy to the ball, but it also passes more vibration to your elbow. Players with arm trouble should stay at 65 or below and use a soft string.\n\n**Beam width** goes hand in hand with stiffness: a 21 mm beam is thin and flexible, a 26 mm beam is thick and stiff. Tapered beams (23–26–23 mm) try to combine both.',
      },
      {
        type: 'list',
        items: [
          '16x19 means 16 main strings (running lengthwise) and 19 cross strings. Wider gaps let the ball sink in and the strings snap back, adding spin and a livelier launch; the trade-off is faster string wear and slightly less directional control.',
          '18x20 packs more strings into the same head, giving a flatter, more controlled response and better string life, but less spin and a stiffer feel. Preferred by flat hitters and players who take the ball early.',
          '16x18 and 16x16 patterns (Wilson Spin, Prince Textreme) push spin further, at the cost of very quick string breakage.',
          'Grip size is measured around the handle: European sizes 0–5 correspond to US 4 in to 4 5/8 in (100–118 mm circumference). Most men use 3 (4 3/8 in), most women 2 (4 1/4 in).',
          'Tour players almost always customise: lead tape at 3 and 9 o’clock for stability, silicone in the handle for weight, and a leather grip to shift balance. A shop’s “matching” service can tune two frames to identical specs.',
        ],
      },
    ],
  },
  {
    id: 'choosing-your-first-racquet',
    section: 'racquets',
    title: 'Choosing your first racquet',
    summary: 'A clear starting spec for adult beginners, the junior length table, how to demo properly, and the mistakes that cost people money or elbows.',
    level: 'beginner',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'For an adult beginner nearly every coach gives the same answer: a **100 sq in head, 280–300 g unstrung, 16x19 pattern, standard 68.6 cm length, balance around 32–33 cm (4–7 pts head-light), stiffness 65–70 RA**. This is the tweener category: Babolat Pure Drive and Pure Aero, Wilson Clash and Blade 100, Head Speed and Extreme MP, Yonex EZONE 100, Tecnifibre TF-X1. Most brands also sell a “Team” or “Lite” version at 270–285 g, a good choice for smaller adults and teenagers.\n\nThe temptation is to go lighter and bigger for easy power. Resist it: a 250 g, 110 sq in frame feels wonderful for a month, then holds your technique back and hurts your arm.',
      },
      {
        type: 'table',
        columns: ['Player', 'Head', 'Unstrung weight', 'Pattern', 'Why'],
        rows: [
          ['Adult beginner, average build', '100 sq in', '285–300 g', '16x19', 'Enough mass for stability, light enough to learn a full swing'],
          ['Adult beginner, small or older, or with arm concerns', '100–105 sq in', '270–285 g, RA under 66', '16x19', 'Easier to swing, more forgiving, softer feel'],
          ['Adult beginner who played other racquet sports', '98–100 sq in', '295–305 g', '16x19', 'Already has swing speed and timing; can handle more mass'],
          ['Teenager 13–16 moving to full size', '100 sq in', '270–290 g', '16x19', 'Grows into it; avoid heavy player’s frames until 16+'],
          ['Child under 12', 'Junior lengths 19–26 in', '170–250 g strung', 'Pre-strung', 'Size by height and ball stage, not ambition'],
        ],
      },
      {
        type: 'text',
        body: 'Juniors are sized by **height first, age second**: 19 in under 100 cm, 21 in for 100–115 cm, 23 in for 115–125 cm, 25 in for 125–140 cm, 26 in for 140–150 cm, and a full 27 in adult frame from about 150 cm. Quick check: with the child standing and the racquet held straight down by the handle, the head should just reach the ground. Bent elbow means too long; well off the ground means too short.\n\nMatch the racquet to the ball stage: 19–23 in with red, 23–25 in with orange, 25–26 in with green. Aluminium is fine up to 23 in; from 25 in choose graphite composite if the child plays more than once a week.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Demo before you buy', body: 'Most specialist shops lend two or three frames for a week for a small fee that comes off the purchase. Take them all to the same session and hit the same shots with each: 20 forehands, 20 backhands, 10 serves, some volleys. Note which one you hit deep without trying and which one you can feel the ball on.' },
          { title: 'Get the grip size right', body: 'Measure from the middle crease of your palm to the tip of your ring finger. That length in inches (usually 4 1/8 to 4 5/8) is your grip size. Between sizes, choose the smaller and add an overgrip, which adds about 1/16 in.' },
          { title: 'Have it strung for you', body: 'Factory strings are cheap synthetic gut at an unknown tension. Ask for a multifilament or synthetic gut at 23–24 kg (50–53 lb), never polyester for a beginner. A fresh, softer string makes any frame more forgiving.' },
          { title: 'Buy one, not two', body: 'You do not need a second identical frame until you break strings mid-match, which for beginners is almost never. Spend the money on a lesson instead.' },
        ],
      },
      {
        type: 'callout',
        title: 'What not to do',
        body: 'Do not buy a pro’s signature racquet because you like the player: the frame they endorse is rarely what they use, and the retail version of a player’s frame is heavier and less forgiving than a beginner needs. Do not buy a 20-euro supermarket racquet for an adult: the aluminium frame and dead strings make the ball feel like a stone and encourage stiff, arm-only swings. Do not buy from a photo without checking unstrung weight and grip size; both are printed on the inside of the throat.',
      },
      { type: 'link', to: '/learn/racquets', label: 'Compare racquet types, junior sizes and strings' },
    ],
  },
  {
    id: 'strings-tension-and-restringing',
    section: 'racquets',
    title: 'Strings, tension and restringing',
    summary: 'String types in one table, how tension changes power and control, when to restring, why polyester is for advanced players only, and how to keep your arm healthy.',
    level: 'intermediate',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'Strings are the only part of the racquet that touches the ball, and they wear out. Manufacturers print a recommended tension range on the frame, typically **22–27 kg (48–60 lb)**. Within that range **lower tension gives more power, more spin and more comfort**, because the strings deflect further and hold the ball longer; **higher tension gives more control** because the ball leaves the string bed faster and more predictably. The differences are real but smaller than people think: 2 kg is about the smallest change most players can feel.\n\nMost club players do well between 23 and 25 kg (50–55 lb) with a nylon string. Polyester should be strung 2–4 kg lower than you would string a nylon, because it is stiffer.',
      },
      {
        type: 'table',
        columns: ['String', 'Feel and power', 'Spin', 'Durability', 'Comfort', 'Who', 'Tension'],
        rows: [
          ['Natural gut', 'Softest, most powerful, holds tension best', 'Medium', 'Medium, hates water', 'Best', 'Feel players, arm sufferers, hybrid mains', '23–27 kg'],
          ['Multifilament', 'Soft and lively, gut-like', 'Medium', 'Low–medium, frays', 'Excellent', 'Beginners, club players, arm pain', '23–26 kg'],
          ['Synthetic gut', 'Crisp, medium power, cheap', 'Medium', 'Medium', 'Good', 'Beginners, juniors, budget', '23–26 kg'],
          ['Polyester', 'Firm, low power, very controlled', 'Highest', 'Very high, but goes dead in 10–20 hours', 'Poor', 'Advanced fast-swingers, string breakers', '20–25 kg'],
          ['Hybrid', 'Between the two strings used', 'High with poly mains', 'Good', 'Good with gut or multi mains', 'Intermediate and advanced', 'Poly 1–2 kg lower than the soft string'],
        ],
      },
      {
        type: 'callout',
        title: 'How often to restring',
        body: 'The classic rule: restring as many times a year as you play per week. Play twice a week, restring twice a year, at minimum. That covers nylon strings, which lose tension gradually and turn dead and unresponsive long before they break. Polyester is different: it loses tension fast and should be cut out after 10–20 hours of hitting, even though it may last months without snapping. A string that has been in the frame for a year is playing at least 10–15% below the tension you asked for.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Notice the signs', body: 'The mains no longer snap back straight after a shot and sit crooked. The ball starts flying long with no change in your swing. The sound goes from a ping to a thud. Notching where mains cross the crosses is deep enough to catch a fingernail.' },
          { title: 'Choose the string', body: 'Beginners and anyone with arm pain: multifilament or synthetic gut. Intermediate players who want more spin: a hybrid with poly mains and a soft cross, or the other way round. Advanced players with fast swings who break nylon in a week: full polyester at low tension, and accept that it must be replaced often.' },
          { title: 'Choose the tension', body: 'Start in the middle of the frame’s range, for example 24 kg. If the ball flies long and you already swing fully, go up 1 kg. If you lack depth or the frame feels harsh, go down 1 kg. Write the string and tension on the frame with a marker so you can compare next time.' },
          { title: 'Ask the stringer for consistency', body: 'A good stringer uses an electronic constant-pull machine and records your string, tension and date. Have both racquets strung on the same machine, and if you are serious, the same day, because a new string plays differently from a week-old one.' },
        ],
      },
      {
        type: 'text',
        body: '**Polyester is for advanced players only.** Poly’s stiffness is what gives it control and its snap-back is what gives heavy spin, but it only works at high racquet-head speed. A beginner swinging slowly with poly gets a dead, low-powered string bed that transmits shock straight into the elbow, and then compensates by muscling the ball. Junior coaches and most sports-medicine guidance recommend no polyester under about age 13, and never in a stiff racquet for a player with a history of arm pain.\n\nIf you want poly’s spin at club level, use a hybrid: poly mains with a soft multifilament cross, strung 2 kg lower than you would string nylon.',
      },
      {
        type: 'list',
        items: [
          'Tennis elbow is caused by repeated shock and off-centre hits, not by a single factor. The gentlest set-up is a flexible frame (RA under 65) at 300 g or more, a multifilament or gut at 22–24 kg, a correct grip size and a relaxed grip.',
          'A vibration dampener changes the sound, not the shock: studies show almost no effect on the vibration reaching the arm. Use one if you like the sound.',
          'Do not string above the recommended range; frames can crack, and warranties are void.',
          'Strings lose about 10% of their tension in the first 24 hours after stringing, then slowly after that. A pre-stretched string (gut and multifilaments are often pre-stretched by the stringer) loses less.',
          'Keep a spare set of your string in your bag so the stringer can match it exactly, and never leave a racquet in a hot car: heat softens the strings and weakens the frame.',
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- grips
  {
    id: 'how-to-hold-the-racquet',
    section: 'grips',
    title: 'How to hold the racquet',
    summary: 'The eight bevels, the base-knuckle and heel-pad method for finding any grip, the trigger finger, how hard to squeeze, and how to check your grip size.',
    level: 'beginner',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'A racquet handle is an octagon with **eight bevels**. Hold the racquet on edge, strings perpendicular to the ground, and look down at the butt cap. The flat bevel on top is **bevel 1**. For a right-hander, count clockwise: 2 is the upper-right diagonal, 3 the right side, 4 the lower-right diagonal, 5 the bottom, 6 the lower-left diagonal, 7 the left side and 8 the upper-left diagonal. Left-handers count anticlockwise, so every grip mirrors.\n\nEvery grip is defined by which bevel two parts of your hand rest on: the **base knuckle of the index finger** (where the finger meets the palm) and the **heel pad** (the fleshy pad at the base of the palm below the little finger).',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Find your two landmarks', body: 'Open your hitting hand. Touch the knuckle at the base of your index finger; that is landmark one. Then press the pad on the outside of your palm below the little finger; that is landmark two, the heel pad. When both sit flat on the same bevel, the grip is clean.' },
          { title: 'Place the index knuckle', body: 'Rest the racquet on edge and lay the index base knuckle on the target bevel: 2 for continental, 3 for eastern forehand, 4 for semi-western, 1 for eastern backhand. Do not wrap your fingers yet.' },
          { title: 'Place the heel pad on the same bevel', body: 'Slide the heel pad onto the same bevel number. This aligns your palm with the racquet face. If the heel pad is on a different bevel from the knuckle, the grip is twisted and the face will be hard to control.' },
          { title: 'Spread the fingers, trigger finger up', body: 'Wrap the fingers with a gap between the index and middle finger, the index finger extended slightly up the handle like a trigger. The little finger sits at the very end of the handle, even partly on the butt cap, for maximum leverage.' },
          { title: 'Check the V', body: 'The V formed by your thumb and index finger points somewhere along the top of the handle. For continental it points at the left edge of bevel 1; for eastern forehand at the right edge; for semi-western toward bevel 2.' },
        ],
      },
      {
        type: 'callout',
        title: 'Grip pressure: 3 out of 10',
        body: 'Hold the racquet as if you were holding a small bird or a tube of toothpaste with the cap off. On a scale of 1 to 10, waiting in the ready position and swinging should be about a 3. The grip firms up to a 6 or 7 only in the moment of contact and then relaxes again. A tight grip slows the racquet, locks the wrist, kills feel and is a leading cause of tennis elbow. If your forearm is tired after an hour, you are squeezing too hard.',
      },
      {
        type: 'text',
        body: '**Grip size** is the circumference of the handle, given in inches in the US (4 in to 4 5/8 in) or as sizes 0 to 5 in Europe. Two ways to measure it.\n\n**Ruler method.** Open your hitting hand flat and measure from the middle crease of your palm to the tip of your ring finger. That distance is your grip size, usually 4 1/8 to 4 5/8 in (10.5–11.7 cm); see the table below for the conversions.\n\n**Index-finger test.** Hold the racquet in an eastern forehand grip and slide the index finger of your other hand into the gap between your fingertips and the heel of your palm. It should fit snugly. Room to spare means too big; no room means too small.',
      },
      {
        type: 'table',
        columns: ['European size', 'US size', 'Circumference', 'Typical for'],
        rows: [
          ['0', '4 in', '100–103 mm', 'Juniors moving to a full-size frame'],
          ['1', '4 1/8 in', '103–106 mm', 'Small hands, many women'],
          ['2', '4 1/4 in', '106–110 mm', 'Most women, smaller men'],
          ['3', '4 3/8 in', '110–113 mm', 'Most men'],
          ['4', '4 1/2 in', '113–118 mm', 'Large hands'],
          ['5', '4 5/8 in', '118–120 mm', 'Very large hands; rarely stocked'],
        ],
      },
      {
        type: 'list',
        items: [
          'Between sizes, choose the smaller one and add an overgrip. An overgrip adds about 1/16 in (1.5 mm) and a replacement grip about 1/8 in.',
          'A grip that is too small makes you squeeze harder to stop the racquet twisting, which loads the forearm. A grip that is too big slows wrist action on the serve and makes grip changes clumsy.',
          'Change the overgrip when it goes shiny or slick; a fresh overgrip lets you hold the racquet more loosely.',
          'A leather replacement grip gives sharper bevels, which makes it easier to feel grip changes by touch.',
        ],
      },
    ],
  },
  {
    id: 'which-grip-for-which-stroke',
    section: 'grips',
    title: 'Which grip for which stroke',
    summary: 'A map from every stroke to its usual grip, with the bevel numbers and the reason each grip suits its job.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'You need three grips to play the whole game: **continental** for everything at the net and above your head, one **forehand grip** (eastern or semi-western for most players) and one **backhand grip** (eastern backhand for a one-hander, or continental plus a left-hand eastern for a two-hander). Every other grip is a variation of these. The table below gives the standard choices for a right-hander, with bevel numbers for the index base knuckle and heel pad.',
      },
      {
        type: 'table',
        columns: ['Stroke', 'Standard grip', 'Bevel (knuckle/heel)', 'Alternatives', 'Why this grip'],
        rows: [
          ['Forehand', 'Semi-western', '4/4', 'Eastern (3/3), western (5/5)', 'Closed enough for topspin, open enough to drive through the ball'],
          ['Two-handed backhand', 'Right hand continental, left hand eastern forehand', '2/2 right, 7/7 left', 'Right hand eastern backhand (1/1), left hand semi-western (6/6)', 'Left hand provides the swing, right hand steers and lets go easily for slice'],
          ['One-handed backhand', 'Eastern backhand', '1/1', 'Extreme eastern backhand (8/8)', 'Puts the back of the hand behind the ball for a vertical face'],
          ['Serve', 'Continental', '2/2', 'Slightly toward eastern backhand for kick serves', 'Frees the wrist to pronate and allows slice, kick and flat from one grip'],
          ['Return', 'Forehand or backhand rally grip', 'As for rally', 'Continental for chip returns against a big serve', 'Short backswing, same grip you rally with, so no time is lost changing'],
          ['Slice (forehand or backhand)', 'Continental', '2/2', 'Eastern backhand for a firmer backhand slice', 'Open face slides under the ball naturally'],
          ['Forehand volley', 'Continental', '2/2', 'Slightly toward eastern forehand for beginners', 'One grip covers both volleys; open face for underspin and touch'],
          ['Backhand volley', 'Continental', '2/2', 'Eastern backhand for a punchier volley', 'Same grip as the forehand volley, so no change at the net'],
          ['Swing volley', 'Semi-western or eastern forehand', '4/4 or 3/3', 'Two-hander grip on the backhand side', 'It is a groundstroke hit in the air, so use your groundstroke grip'],
          ['Smash', 'Continental', '2/2', 'None', 'Same motion as the serve; the wrist snaps and pronates'],
          ['Back smash (scissor kick, over the shoulder)', 'Continental', '2/2', 'None', 'The only grip that lets you flick the ball back over your head'],
          ['Drop shot', 'Continental', '2/2', 'Eastern forehand on the forehand side, disguised from a rally grip', 'Open face, soft hands and backspin to kill the bounce'],
          ['Tweener', 'Continental', '2/2', 'None', 'Racquet between the legs with an open face; there is no other option'],
        ],
      },
      {
        type: 'callout',
        title: 'The continental is the grip you cannot skip',
        body: 'Beginners avoid the continental because the forehand volley feels weak and the serve feels strange for a couple of weeks. Skipping it caps your game: a forehand-grip serve cannot pronate, so it never gets pace or spin, and a forehand-grip volley has to be hit with an arm swing. Spend two weeks doing every serve and volley in continental and it becomes automatic. Every professional serves, volleys and smashes with it.',
      },
      {
        type: 'text',
        body: 'How to decide between eastern and semi-western on the forehand: if you learned on a fast court, take the ball early and like to hit flat, eastern (3/3) will feel right. If you play on clay or slow hard courts, face high bounces and want margin from topspin, semi-western (4/4) is the modern default and what most coaches teach. Western (5/5) is a specialist choice for very heavy topspin players and makes low balls and grip changes harder.\n\nOn the backhand, a two-hander is easier to learn and stronger for most juniors and adults. A one-hander gives more reach and a natural slice, but needs a stronger forearm and earlier preparation.',
      },
      { type: 'link', to: '/learn/grips', label: 'See each grip on the 3D handle' },
    ],
  },
  {
    id: 'changing-grips-quickly',
    section: 'grips',
    title: 'Changing grips quickly',
    summary: 'How the non-dominant hand turns the racquet during the unit turn so grip changes are automatic, plus a simple drill to make it happen without thinking.',
    level: 'intermediate',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Nobody changes grip by loosening and re-gripping with the hitting hand. The **non-dominant hand does the work**. In the ready position it rests on the throat of the racquet, holding most of the weight, so the hitting hand can stay soft (that 3 out of 10 pressure). As you recognise forehand or backhand and start the **unit turn** (shoulders and hips turning together), the non-dominant hand rotates the racquet to the new bevel while the hitting hand simply relaxes and lets it turn. By the time the shoulders have turned, the grip is set.\n\nThis is why a loose grip matters: a tight hand cannot let the handle rotate.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Ready position with a neutral grip', body: 'Wait between continental and eastern forehand (bevel 2 to 3) with the left hand on the throat. Some players wait in their forehand grip; either is fine as long as the left hand is on the throat carrying the racquet.' },
          { title: 'Read the ball early', body: 'Decide forehand or backhand as the ball leaves the opponent’s racquet, not when it bounces. The grip change should be finished before the ball crosses the net.' },
          { title: 'Turn the shoulders and rotate the racquet together', body: 'For a forehand, the left hand turns the frame so the hitting hand slides to bevel 4 (semi-western) as the shoulders turn right. For a one-handed backhand, the left hand pulls the racquet back and turns it so the hitting hand lands on bevel 1. For a two-hander, the left hand slides down onto the handle above the right in its eastern grip.' },
          { title: 'Release the left hand at the right moment', body: 'On the forehand the left hand leaves the throat as the racquet starts forward and points at the ball or the side fence for balance. On the one-handed backhand it stays on the throat until the racquet starts forward, which keeps the shoulders closed.' },
          { title: 'Return to neutral', body: 'After the follow-through, catch the throat with the left hand as you recover. This puts the racquet back in the ready position and sets up the next change.' },
        ],
      },
      {
        type: 'callout',
        title: 'At the net there is no change',
        body: 'Volleys, half-volleys and smashes all use continental, so once you leave the baseline your grip should stay fixed. The only net exception is the swing volley on a slow, high floater, where you have time to switch to your forehand grip. If you find yourself changing grip at the net in a fast exchange, you are probably volleying with a forehand grip and need to spend time in continental.',
      },
      {
        type: 'steps',
        steps: [
          { title: 'Drill 1: shadow changes', body: 'No ball. Stand in the ready position. A partner (or you, counting) calls “forehand” or “backhand” at random. Unit turn and grip change, freeze, check the bevel with your eyes, return to ready. 3 sets of 20 calls. Then do it with eyes closed and check by touch.' },
          { title: 'Drill 2: alternating feeds', body: 'A partner feeds alternately forehand, backhand, forehand from the service line at an easy pace. You hit each with the correct grip and call out the bevel you are on as you strike. 3 sets of 10 balls, then random feeds.' },
          { title: 'Drill 3: baseline to net', body: 'Hit two groundstrokes (one each side), then run in for two volleys, then back for two groundstrokes. Forces the change to continental going forward and back to a rally grip going back. 5 repetitions.' },
          { title: 'Drill 4: serve plus one', body: 'Serve in continental, then react to the return with a forehand or backhand. The change from continental to your rally grip during the split step after the serve is one that most club players miss; this drill fixes it.' },
        ],
      },
      {
        type: 'text',
        body: 'Common faults: gripping too hard so the handle will not rotate; making the change with the hitting hand alone, which is slow and causes the racquet face to open; and waiting for the bounce to decide. If you are late on your backhand more than your forehand, the problem is almost always a late grip change, not the swing. Film a rally from behind and watch the left hand: on a good player it is never idle.',
      },
    ],
  },
]
