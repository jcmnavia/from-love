import type { Lesson } from './types'

export const MOVEMENT_LESSONS: Lesson[] = [
  // ---------------------------------------------------------------- footwork
  {
    id: 'why-footwork-decides-everything',
    section: 'footwork',
    title: 'Why footwork decides everything',
    summary: 'Most bad shots are not bad swings. They are good swings from the wrong place, at the wrong time.',
    level: 'beginner',
    minutes: 5,
    blocks: [
      {
        type: 'text',
        body: 'Watch a club player miss a forehand and you will usually blame the arm. Watch it again in slow motion and you will see the real problem: they were still moving at contact, or too close to the ball, or reaching because they arrived a step late. The swing was fine. The feet put the swing in an impossible position.\n\nProfessionals hit from balance almost every time, and the reason is not talent. They take more steps than you do, and smaller ones, and they start them earlier. Footwork is the part of tennis that almost nobody practises and almost everybody needs.',
      },
      {
        type: 'callout',
        title: 'The rule of thumb',
        body: 'A well-hit ball needs three things from your feet: get there early, stop in balance, and leave immediately. If any one is missing, the stroke has to compensate and your consistency drops.',
      },
      {
        type: 'text',
        body: 'Movement in tennis is not running. A point is a chain of short bursts, mostly sideways, of two to four metres each, with a hard stop and a change of direction at the end of every one. Research on professional matches puts the average point at 5 to 8 seconds with roughly four direction changes, and less than 10 % of the running is straight ahead.\n\nThat is why footwork training is its own thing. Jogging or even sprinting will not teach you to decelerate into a wide stance, load the outside leg, and push back out of it.',
      },
      {
        type: 'list',
        items: [
          '**Split step** when the opponent hits, so you are already off the ground and ready to go.',
          '**First step** explosive and in the right direction, driven by the foot furthest from the ball.',
          '**Adjusting steps** small and quick as you arrive, so contact happens at the right distance.',
          '**Balanced base** at contact, wide enough to rotate against.',
          '**Recovery** starting the moment the ball leaves your strings, using shuffles or crossovers to the right spot.',
        ],
      },
      {
        type: 'text',
        body: 'Every lesson in this section deals with one link in that chain. Start with the split step, because everything after it depends on being on time, and time is the one thing footwork can actually buy you.',
      },
      {
        type: 'link',
        to: '/learn/footwork',
        label: 'Browse the footwork drills',
      },
    ],
  },
  {
    id: 'the-split-step',
    section: 'footwork',
    title: 'The split step',
    summary: 'A small hop, timed to your opponent’s contact, that turns a standing start into a running one.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'A body standing still is hard to get moving. Muscles need to be stretched a little before they can fire hard, and feet planted flat on the ground cannot push in any direction. The split step fixes both problems in a fraction of a second: you hop just off the ground, land wider than you started with knees bent, and the stretch in your legs becomes the spring for your first step.\n\nEvery good player does it before every single ball, including balls that come straight to them. It is not a reaction to where the ball goes. It happens before you know.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Start in ready position',
            body: 'Feet slightly wider than the shoulders, weight forward on the balls of the feet, knees soft, racquet in front of you with the non-dominant hand supporting the throat.',
          },
          {
            title: 'Hop as the swing begins',
            body: 'When you see the opponent’s racquet start forward, push off both feet. The hop is small, a few centimetres. Your head should barely rise.',
          },
          {
            title: 'Land at contact',
            body: 'Aim to land as the opponent makes contact with the ball. At that moment you will see where it is going, and your legs will be loaded and ready.',
          },
          {
            title: 'Land wide, push off the far foot',
            body: 'Feet land a little wider than they took off, knees bent, weight forward. The foot furthest from the ball drives you toward it.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Timing matters more than height',
        body: 'Studies of elite players using force plates show they land within a tenth of a second of the opponent’s contact and are moving within two tenths after it. If you land early you have to re-load, if you land late you have wasted the hop. Watch the racquet, not the ball.',
      },
      {
        type: 'table',
        columns: ['Situation', 'Split-step adjustment'],
        rows: [
          ['Returning a fast serve', 'Time the hop to the ball toss reaching its peak, land as the racquet meets the ball'],
          ['Approaching the net', 'Split wherever you are when the opponent swings, even mid-run, then keep moving forward'],
          ['At the net in doubles', 'Small, quick split with weight forward, ready to poach or cover the alley'],
          ['Deep behind the baseline', 'Wider landing, slightly more knee bend, you will need a bigger first step'],
        ],
      },
      {
        type: 'text',
        body: 'The most common fault is splitting too early and then standing flat-footed waiting for the ball, which is worse than not splitting at all. The second is jumping too high, which costs time in the air. Think of it as unweighting rather than jumping, and practise it against a wall or with a partner faking swings until the timing is automatic.',
      },
      {
        type: 'link',
        to: '/studio/split-step',
        label: 'Watch the split step in the 3D studio',
      },
    ],
  },
  {
    id: 'stances-explained',
    section: 'footwork',
    title: 'Stances explained',
    summary: 'Neutral, semi-open, open and closed: what each stance is for, and why hitting off the outside leg matters.',
    level: 'intermediate',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'Your stance is the position of your feet relative to the baseline at contact. It determines how much you can rotate, how quickly you can recover, and how well you can handle a ball that is wide, short or deep. There is no single correct stance. Good players use all four in a single point, and the choice is made by the incoming ball, not by preference.\n\nAll examples below are for a right-handed forehand. Mirror them for the backhand and for left-handers.',
      },
      {
        type: 'table',
        columns: ['Stance', 'Feet at contact', 'Best for', 'Watch out for'],
        rows: [
          ['Neutral (square)', 'Left foot steps toward the net, feet roughly in line with the target', 'Approach shots, short balls, slice, one-handed backhand, beginners learning weight transfer', 'Slow to recover from, hard to rotate on wide balls'],
          ['Semi-open', 'Left foot slightly forward and to the side, hips at about 45 degrees to the net', 'The default rally forehand and two-handed backhand', 'Can drift into full open when you are lazy with the front foot'],
          ['Open', 'Feet parallel to the baseline, weight loaded on the right (outside) leg', 'Wide balls, fast balls, when you have no time to step in, aggressive topspin', 'Must load the outside leg properly or you end up hitting with just the arm'],
          ['Closed', 'Left foot crosses past the line of the right foot toward the sideline', 'Running down a very wide forehand, some one-handed backhands', 'Blocks the hips from rotating, avoid on a normal forehand'],
        ],
      },
      {
        type: 'text',
        body: 'The idea that links all of them is **hitting off the outside leg**. Whatever the stance, the leg furthest from the net and nearest to the ball, the right leg on a forehand, has to be bent and loaded before you swing. That leg is your engine. It stores the energy on the way down and releases it as rotation on the way up.\n\nA player who reaches for a wide ball with a straight outside leg cannot rotate, cannot push back to recover, and usually frames the shot. A player who plants that leg, sinks into it and drives up will hit with power and be halfway back to the centre before the ball lands.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Neutral first',
            body: 'Learn to hit stepping into the ball with the front foot. It teaches weight transfer from back foot to front, and it is still the right choice for approaches and short balls.',
          },
          {
            title: 'Add semi-open',
            body: 'Stop stepping across so far. Let the front foot land forward and to the side. You should now be able to rotate the hips fully and recover faster.',
          },
          {
            title: 'Open when forced',
            body: 'On balls that pull you wide or arrive fast, plant the outside leg and hit without stepping in. Recovery is a push straight off that leg.',
          },
          {
            title: 'Closed only when stretched',
            body: 'If a forehand is so wide you must run past it, the last step will naturally cross. Accept it, hit a defensive shot and get back.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Backhand differences',
        body: 'The two-handed backhand behaves like the forehand and is comfortable in semi-open or open stances. The one-handed backhand needs the shoulders more sideways to protect the hitting arm, so neutral or slightly closed is normal and open stance is rare.',
      },
      {
        type: 'link',
        to: '/studio/forehand',
        label: 'Compare stances on the forehand in the 3D studio',
      },
    ],
  },
  {
    id: 'recovery-and-court-positioning',
    section: 'footwork',
    title: 'Recovery and court positioning',
    summary: 'Where to stand after you hit, and how to get there. The answer is almost never the centre mark.',
    level: 'intermediate',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'The moment the ball leaves your strings, the point becomes a geometry problem. Your opponent can hit to a range of places, and you want to stand where the two extremes, sharpest cross-court and hardest down-the-line, are equally far away. That spot is the **bisector** of the angle of their possible shots.\n\nIt is not the centre of the court. When your opponent is pulled wide, their cross-court option is much sharper than their down-the-line option, so the bisector shifts toward the cross-court side.',
      },
      {
        type: 'callout',
        title: 'The practical version',
        body: 'After you hit cross-court, recover to about a metre past the centre mark on the side you hit from. After you hit down the line, you have to get all the way across, past the centre mark on the other side, because the cross-court reply into the open court is now the biggest threat.',
      },
      {
        type: 'table',
        columns: ['Distance to recover', 'Footwork', 'Why'],
        rows: [
          ['Under 2 metres', 'Side shuffle', 'Stays square to the net, can stop and change direction instantly'],
          ['2 to 4 metres', 'One or two crossover steps, then shuffle', 'Covers ground quickly, the shuffle at the end lets you split step on time'],
          ['Over 4 metres or a lob', 'Turn and run, then shuffle into position', 'Shuffling long distances is slow and exhausting, sprint and re-square'],
        ],
      },
      {
        type: 'text',
        body: 'Depth matters as well as width. If your shot was deep and heavy, you can hold the baseline or even step inside it, since the reply is unlikely to be aggressive. If your shot was short or floated, drop a step or two behind the baseline to buy yourself time.\n\nBetween the two, keep your eyes on the opponent as you recover rather than admiring your own shot. Their preparation tells you where the ball is going before they hit it, and that half second is worth more than any amount of speed.',
      },
      {
        type: 'list',
        items: [
          'Recovery starts on your follow-through, not when the ball bounces on the other side.',
          'Arrive in position before the opponent hits, then split step. Arriving as they hit is too late.',
          'Never recover with your back to the net. Facing away means you cannot read the shot.',
          'If you cannot get to the bisector in time, at least stop and split. A late split from the wrong spot beats no split at all.',
        ],
      },
      {
        type: 'link',
        to: '/studio/shuffle',
        label: 'Watch the shuffle and crossover in the 3D studio',
      },
    ],
  },
  {
    id: 'moving-forward-and-back',
    section: 'footwork',
    title: 'Moving forward and back',
    summary: 'Approach steps for coming in, the drop step and crossover for going back, and why you should never backpedal.',
    level: 'intermediate',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Most footwork practice is lateral, but the points you win and lose most decisively are the ones where you move forward to finish or backward to survive. Both directions have specific footwork, and both are easy to get wrong.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Read the short ball early',
            body: 'The cue is the opponent’s contact, not the bounce. If they are late, jammed or hitting off the back foot, the ball is probably coming short. Start moving as they hit.',
          },
          {
            title: 'Run, then slow into the shot',
            body: 'Cover the first few metres at a run. As you get close, shorten your steps so the last two or three are small adjusting steps that set your distance.',
          },
          {
            title: 'Hit through the ball with a carioca or running step',
            body: 'On a forehand approach, hit as your front foot lands, or use a carioca (back foot crossing behind the front) on the slice backhand so you keep moving through contact.',
          },
          {
            title: 'Do not stop after contact',
            body: 'Continue toward the net, split when the opponent swings, then move diagonally to the volley. A player who stops to admire the approach gets passed.',
          },
        ],
      },
      {
        type: 'text',
        body: 'Going backward is where most players lose time, because instinct says to backpedal. Backpedalling is slow, unstable, and leaves you facing the net with no way to see where you are going. When the ball goes over your head, or you are pushed deep by a heavy ball, turn.\n\nFor a lob, the move is the **drop step**: step straight back with the foot on the side the ball is going, which turns your hips sideways at the same time. From there use **crossover steps**, driving the front leg across your body, to cover ground while keeping your shoulders turned and the ball in view over your front shoulder.',
      },
      {
        type: 'callout',
        title: 'Point at the ball',
        body: 'On the overhead, raise your non-dominant arm and point at the ball as you move back. It keeps your shoulders sideways, gives your eyes a reference, and stops you from drifting under the ball instead of behind it.',
      },
      {
        type: 'list',
        items: [
          'Approach on a short ball you can hit at or above net height. Short and low is for a drop shot or a controlled slice, not a charge.',
          'Follow the line of your approach shot to the net, it closes the easiest passing lane.',
          'On the drop step, the first step goes back and to the side, never straight back.',
          'If a lob is truly over you, turn fully and sprint, then let it bounce and play a bounce smash or a defensive lob.',
        ],
      },
      {
        type: 'link',
        to: '/studio/smash',
        label: 'Study the overhead footwork in the 3D studio',
      },
    ],
  },

  // ------------------------------------------------------------ coordination
  {
    id: 'hand-eye-coordination-for-juniors',
    section: 'coordination',
    title: 'Hand-eye coordination for juniors',
    summary: 'Why ages 5 to 9 are a window, why games beat drills, and how the red-ball court makes it all work.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Between roughly five and nine years old, children’s nervous systems are unusually good at learning to coordinate eyes, hands and feet. Coaches sometimes call it the golden age of motor learning. Skills picked up in this window, like tracking a moving ball and moving to intercept it, become automatic in a way that is much harder to achieve later.\n\nThe skills that matter are not tennis-specific. Catching, throwing, balancing, skipping and striking are the raw material. A child who can catch a bouncing ball with either hand will learn a forehand in a fraction of the time it takes a child who cannot.',
      },
      {
        type: 'callout',
        title: 'Games, not drills',
        body: 'A six-year-old will not do ten reps of anything for the sake of it. Every coordination exercise should be a game with a score, a race, a partner or a story. The tennis is hidden inside the fun. If a child is bored, the exercise is wrong, not the child.',
      },
      {
        type: 'table',
        columns: ['Stage', 'Ball', 'Court', 'Typical ages', 'What it lets kids do'],
        rows: [
          ['Red (stage 3)', 'Foam or felt, about 75 % slower, larger', '11 to 12 m long, net at 80 cm, 17 to 21 inch racquet', '5 to 8', 'Rally with real strokes and play points from the first lesson'],
          ['Orange (stage 2)', 'About 50 % slower', '18 m long, net at 80 cm, 23 to 25 inch racquet', '8 to 10', 'Learn spin, direction, serving and simple tactics'],
          ['Green (stage 1)', 'About 25 % slower', 'Full court, standard net, 25 to 26 inch racquet', '9 to 11', 'Play full-court tennis with time to develop technique'],
        ],
      },
      {
        type: 'text',
        body: 'The ITF Tennis Play and Stay framework exists because a standard ball on a full court is physically impossible for a small child. It bounces above their head and the court is too big to cover. The red ball bounces to waist height, moves slowly enough to track, and the small court means a child can actually rally, which is the only thing that keeps them coming back.\n\nDo not rush children up the stages. A player who can dominate red-ball points with good technique is building far more than one who is surviving on an orange court.',
      },
      {
        type: 'list',
        items: [
          'Throwing and catching with both hands, then one hand, then after a bounce.',
          'Balancing a ball on the racquet while walking, then running, then weaving through cones.',
          'Ups and downs with the racquet, counting streaks.',
          'Reaction games: partner drops a ball, catch it after one bounce.',
          'Simple rallies over a low net or a line on the ground, cooperative, counting how many in a row.',
        ],
      },
      {
        type: 'link',
        to: '/learn/balls',
        label: 'Learn more about ball stages and junior racquet sizes',
      },
    ],
  },
  {
    id: 'balance-and-body-awareness',
    section: 'coordination',
    title: 'Balance and body awareness',
    summary: 'The hidden skill under every stroke: knowing where your body is, and keeping it stable while everything else moves.',
    level: 'beginner',
    minutes: 5,
    blocks: [
      {
        type: 'text',
        body: 'Balance is not standing still. In tennis it means keeping your head steady and your centre of mass over your base while you run, stop, rotate and swing. Watch the best players in slow motion and the head barely moves during the stroke, even when the rest of the body is doing something violent.\n\nBody awareness, or proprioception, is the sense that tells you where your limbs are without looking. It is what lets you hit a ball behind you, adjust a volley at the last moment, or land a serve without falling over. Both improve quickly with practice, at any age.',
      },
      {
        type: 'list',
        items: [
          '**Single-leg balance**: stand on one foot for 30 seconds, then with eyes closed, then while catching a ball.',
          '**Shadow swings on one leg**: forehand on the right leg, backhand on the left. Finish balanced.',
          '**Airplane**: lean forward on one leg with arms out and the other leg extended back, hold for 10 seconds.',
          '**Walking lunges with a twist**: step into a lunge and rotate the torso toward the front leg.',
          '**Freeze game**: shadow a stroke and freeze on the finish. A partner tries to push you gently off balance.',
        ],
      },
      {
        type: 'callout',
        title: 'Head still, eyes level',
        body: 'The simplest balance cue in tennis is to keep your head still through contact. If your head bobs, your eyes lose the ball and your body compensates. Practise hitting while imagining a glass of water balanced on your head.',
      },
      {
        type: 'text',
        body: 'For children, balance work belongs in every warm-up: hopping, skipping, walking along a line, freeze games, animal walks. For adults, it belongs in the same place. A minute of single-leg work before you play does more for your ankle stability than any brace, and it costs nothing.\n\nThe payoff is not just injury prevention. A player who can stop in balance can hit from balance, and hitting from balance is where consistency comes from.',
      },
      {
        type: 'link',
        to: '/learn/footwork',
        label: 'Coordination drills for juniors and adults',
      },
    ],
  },

  // ----------------------------------------------------------------- fitness
  {
    id: 'warm-up-and-cool-down',
    section: 'fitness',
    title: 'Warm-up and cool-down',
    summary: 'Eight to ten minutes that make you play better and get injured less. Skip them and you are paying for it later.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'The old warm-up of two minutes of mini tennis and a few static stretches does not prepare your body for the first sprint to a wide ball. Cold muscles produce less force and stretch less safely, and the first few games of most amateur matches are lost before the body is ready.\n\nA proper warm-up is **dynamic**: continuous movement that raises heart rate and temperature, moves every joint through the ranges tennis will demand, and finishes with the specific movements of the sport. Eight to ten minutes is enough.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Raise the pulse (2 to 3 minutes)',
            body: 'Easy jog around the court, then side shuffles, carioca and backward jogging along the baseline. You should be warm and breathing a little harder.',
          },
          {
            title: 'Mobilise (3 to 4 minutes)',
            body: 'Walking lunges with a torso twist, leg swings forward and sideways, hip circles, arm circles both directions, trunk rotations with the racquet held across the chest, wrist and ankle circles.',
          },
          {
            title: 'Activate (2 minutes)',
            body: 'Skipping, high knees, butt kicks, a few lateral bounds and split steps. Add band external rotations for the shoulder if you are about to serve.',
          },
          {
            title: 'Specific (2 to 3 minutes)',
            body: 'Shadow swings of every stroke at increasing speed, then mini tennis inside the service boxes, moving your feet, before backing up to the baseline.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Save static stretching for afterwards',
        body: 'Holding stretches for 30 seconds before playing slightly reduces power and does not lower injury risk. Move instead. Long static holds belong in the cool-down, when they help restore range of motion.',
      },
      {
        type: 'text',
        body: 'The cool-down is shorter and easier to skip, which is exactly why most players never recover properly. Five minutes of easy walking or jogging lets the heart rate come down gradually. Follow it with static stretches of 20 to 30 seconds each for the calves, hamstrings, hip flexors, quads, glutes, chest and the back of the shoulder.\n\nThen drink, eat something within an hour, and if you have played a long match, keep moving gently for the rest of the day rather than sitting for hours.',
      },
      {
        type: 'list',
        items: [
          'Warm up before practice as well as matches. Injuries happen in training more often than in play.',
          'In cold weather, add two minutes to the pulse-raising section and keep a layer on until you are sweating.',
          'Never serve at full pace until you have hit at least 15 progressive serves from the service line and baseline.',
          'A short cool-down after every session adds up to a lot less stiffness over a season.',
        ],
      },
    ],
  },
  {
    id: 'strength-for-tennis',
    section: 'fitness',
    title: 'Strength for tennis',
    summary: 'What to train and why: legs, anti-rotation core, posterior shoulder, and the three injuries you are trying to avoid.',
    level: 'intermediate',
    minutes: 8,
    blocks: [
      {
        type: 'text',
        body: 'Tennis power comes from the ground. The legs load and drive, the hips and trunk rotate and transfer, the shoulder and arm deliver the racquet last. Strength training for tennis follows that chain, and it is less about lifting heavy and more about being strong in the positions the sport puts you in: a deep lateral lunge, a loaded single leg, a twisted trunk, an arm overhead.\n\nTwo sessions a week of 40 minutes is plenty for most club players. Three in the off-season if you are competitive.',
      },
      {
        type: 'table',
        columns: ['Area', 'Why it matters', 'Best exercises'],
        rows: [
          ['Legs and hips', 'Every stroke starts with a loaded leg, every stop is a single-leg deceleration', 'Split squats, lateral lunges, Romanian deadlifts, single-leg squats, lateral bounds'],
          ['Core (anti-rotation)', 'The trunk has to resist and then release rotation without the spine taking the load', 'Pallof press, plank with reach, side plank, dead bug, medicine ball rotational throws'],
          ['Posterior shoulder', 'Serving overworks the front of the shoulder, the back has to keep up to protect the joint', 'Band external rotations, face pulls, prone Ys and Ts, rows'],
          ['Forearm and grip', 'Absorbs impact on every ball, protects the elbow', 'Wrist extensor curls, eccentric wrist extension, farmer carries, towel wringing'],
          ['Calves and ankles', 'Thousands of small hops and pushes per match', 'Calf raises, single-leg hops, balance board work'],
        ],
      },
      {
        type: 'text',
        body: 'The three injuries that account for most lost tennis time are tennis elbow, shoulder pain and ankle sprains. All three are largely preventable, and the prevention is the same strength work above done consistently.\n\n**Tennis elbow** (lateral epicondylitis) is an overload of the wrist extensor tendons where they attach at the outside of the elbow. It is usually caused by late contact, a stiff racquet with tight strings, or a grip too small, and it is made worse by weak forearm muscles. Eccentric wrist extension, lowering a light weight slowly with the palm down, is the best-supported exercise for both prevention and rehab.',
      },
      {
        type: 'text',
        body: '**Shoulder pain** in tennis players is nearly always about the rotator cuff and the muscles that control the shoulder blade. Serving creates a big imbalance: the muscles that accelerate the arm get strong, the ones that slow it down do not. Band external rotations and scapular work before every serving session close the gap.\n\n**Ankle sprains** happen on hard stops and changes of direction, usually when fatigued. Single-leg balance, lateral bounds with a stuck landing, and calf strength are the protection. Proper tennis shoes with lateral support matter too. Running shoes are built for one direction and roll easily.',
      },
      {
        type: 'callout',
        title: 'Strength does not slow you down',
        body: 'Players sometimes worry that lifting will make them stiff or bulky. Two sessions a week of the work described here will not add noticeable size. It will make you faster out of the corners, harder to injure and stronger in the third set.',
      },
      {
        type: 'list',
        items: [
          'Train legs and core in the same session, shoulder care as a short daily routine.',
          'Two to three sets of 8 to 12 reps for strength, 12 to 15 for the small shoulder muscles.',
          'Never lift heavy the day before a match. Light, fast work or rest.',
          'If something hurts during a stroke, stop and see a physio. Playing through elbow or shoulder pain turns weeks into months.',
        ],
      },
      {
        type: 'link',
        to: '/learn/fitness',
        label: 'Fitness drills with full instructions',
      },
    ],
  },
  {
    id: 'endurance-and-speed',
    section: 'fitness',
    title: 'Endurance and speed',
    summary: 'Tennis is short bursts and short rests, repeated for hours. Train that, not marathons.',
    level: 'intermediate',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'A tennis point lasts, on average, between 5 and 8 seconds. Then you get about 20 seconds before the next one, and 90 seconds at changeovers. A three-set match might last two hours, but the ball is in play for only 15 to 20 minutes of it. The rest is walking, breathing and thinking.\n\nSo the demand is a strange mixture: repeated sprints and direction changes at maximum intensity, separated by short recoveries, over a very long time. The work-to-rest ratio is roughly **1:3**, and the fitness that matters is the ability to produce the same explosive first step in the third set as in the first.',
      },
      {
        type: 'table',
        columns: ['Quality', 'What it does for you', 'How to train it'],
        rows: [
          ['Agility and first-step speed', 'Reach more balls, reach them earlier, hit from balance', 'Spider drill, cone drills, reaction drops, short shuttles with full recovery'],
          ['Repeated sprint ability', 'Stay explosive as the match goes on', 'Interval runs of 15 to 20 seconds on, 20 to 40 seconds off, in blocks of a game'],
          ['Aerobic base', 'Recover faster between points and between matches', 'Two 30 to 40 minute sessions a week of easy running, cycling or swimming in the off-season'],
          ['Power and elasticity', 'Faster serve, harder groundstrokes, quicker hops', 'Skipping, bounds, medicine ball throws, low-volume plyometrics'],
        ],
      },
      {
        type: 'callout',
        title: 'Agility over aerobic',
        body: 'Long steady runs build a base, but they do not teach your body to stop, load and change direction. If you have limited time, spend it on interval and agility work that mimics points. A player who can sprint and stop well in the third set beats a player who can jog for an hour.',
      },
      {
        type: 'text',
        body: 'A simple weekly structure for a competitive club player: one agility session with cones and reaction work, one interval session using the 20-on 20-off pattern for four to five simulated games, and one easy aerobic session if the season allows. Everything else is on-court practice, which is itself conditioning if you move your feet properly.\n\nSpeed work goes early in a session when you are fresh. Endurance work goes late or on a separate day. Never try to train speed when you are tired, you will only rehearse being slow.',
      },
      {
        type: 'list',
        items: [
          'Match the rest to the work. Full recovery for speed, short recovery for repeated sprints.',
          'Deceleration is where injuries and lost points happen. Train stopping as hard as you train starting.',
          'Hydrate before you are thirsty. Two percent dehydration measurably slows reaction time.',
          'Log a simple test every month, like the spider drill time, to see if the training is working.',
        ],
      },
    ],
  },

  // ----------------------------------------------------------------- tactics
  {
    id: 'first-tactics-consistency-and-depth',
    section: 'tactics',
    title: 'First tactics: consistency and depth',
    summary: 'Before patterns or placement, two things win almost every match below the advanced level.',
    level: 'beginner',
    minutes: 5,
    blocks: [
      {
        type: 'text',
        body: 'At club level, roughly three out of four points end with an error rather than a winner. The player who makes fewer mistakes wins, and it is not close. This is the first tactical truth of tennis and the one most players resist, because hitting winners is more fun than making the other person miss.\n\nThe second truth is that **depth** creates errors. A ball that lands within a metre or two of the baseline forces your opponent to hit from behind their own baseline, takes away their angles, and gives you time. A ball that lands around the service line invites them forward and lets them attack.',
      },
      {
        type: 'callout',
        title: 'The one-more-ball rule',
        body: 'When in doubt, hit one more ball into the court. Cross-court, deep, with margin over the net. Let the opponent be the one to try something clever.',
      },
      {
        type: 'list',
        items: [
          'Aim over the net by at least a metre on neutral balls. Net errors are the most avoidable errors in tennis.',
          'Aim inside the lines by a metre or more. Nobody needs to hit the line to win a club match.',
          'Hit cross-court by default. The net is lower in the middle and the court is longer on the diagonal.',
          'Use topspin for depth with safety, or a high, heavy ball when you are pushed back.',
          'Play the percentage shot when the score is tight and save the ambitious one for when you are ahead.',
        ],
      },
      {
        type: 'text',
        body: 'A useful exercise is the **depth game**: rally cross-court with a partner and count only balls that land beyond the service line. Then place a target, a towel or a line of balls, two metres inside the baseline and count only balls that land beyond it. Most players are shocked by how short their normal rally ball is.\n\nAs your consistency improves you will earn the right to be more aggressive. But the aggression should always sit on top of a base of not missing, not instead of it.',
      },
      {
        type: 'link',
        to: '/learn/tactics',
        label: 'Next: the five game situations',
      },
    ],
  },
  {
    id: 'the-five-game-situations',
    section: 'tactics',
    title: 'The five game situations',
    summary: 'Every point falls into one of five situations. Knowing which one you are in tells you what to do.',
    level: 'intermediate',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'Tactical thinking gets much simpler when you realise that every ball you hit belongs to one of five situations. Each has its own goals, its own high-percentage options and its own typical mistakes. When a point feels confusing, the first question to ask is: which situation am I in right now?',
      },
      {
        type: 'table',
        columns: ['Situation', 'Your main goal', 'High-percentage play', 'Common mistake'],
        rows: [
          ['Serving', 'Start the point on your terms', 'High first-serve percentage, second serve with spin to the backhand, plan the plus-one shot', 'Going for too much on the first serve, then floating a weak second'],
          ['Returning', 'Neutralise the serve and get into the rally', 'Block or chip deep cross-court on first serves, step in and drive second serves', 'Standing too close on first serves, too far back on seconds'],
          ['Both at the baseline', 'Build the point until you get a ball to attack', 'Cross-court depth, change direction only on short balls, move the opponent', 'Changing direction on a deep ball, hitting flat and low over the net'],
          ['Approaching or at the net', 'Finish the point in two shots', 'Approach deep down the line, split step, volley into the open court', 'Stopping after the approach, volleying back to where the opponent stands'],
          ['Opponent at the net', 'Make them play a difficult first ball', 'Low dipping ball at their feet, lob over the backhand shoulder, pass only when you have a clear lane', 'Trying a low-percentage pass when a lob or a body shot was open'],
        ],
      },
      {
        type: 'text',
        body: 'Serving and returning together decide the first two shots of every point, and at every level the player who wins more of those exchanges wins the match. Your first serve percentage matters far more than your serve speed. A 65 % first-serve day with a reliable spin second serve beats a 45 % day with more aces almost every time.\n\nAt the baseline, patience is a tactic. You are waiting for a short ball, a mistake in positioning, or a mid-court ball you can move forward on. The temptation is to force something on a deep neutral ball, and that is where errors come from.',
      },
      {
        type: 'text',
        body: 'The net situations are where amateurs give up the most free points. Approaching means committing: keep moving, split on time, and volley to the open space, not back to the opponent. When your opponent is at the net, remember they have to volley whatever you give them. A heavy ball dipping at their feet is a far better option than a line-painting pass.',
      },
      {
        type: 'callout',
        title: 'Practise by situation',
        body: 'Structure practice sets around one situation at a time: serve and first ball only, or return games only, or every point starts with an approach. It is the fastest way to find your weakest situation and fix it.',
      },
      {
        type: 'link',
        to: '/studio/return',
        label: 'Study the return in the 3D studio',
      },
    ],
  },
  {
    id: 'patterns-of-play',
    section: 'tactics',
    title: 'Patterns of play',
    summary: 'Four repeatable patterns that give structure to your points: cross-court default, change on a short ball, serve plus one, and high heavy to the backhand.',
    level: 'intermediate',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'A pattern is a sequence of shots you have practised so often that you do not need to think about it under pressure. Professionals have dozens. Club players who have two or three that they trust play noticeably better than players who decide every shot from scratch. These four are the foundation of nearly every pattern you will see.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Cross-court by default',
            body: 'The diagonal is 2.4 metres longer than the sideline and the net is 15 centimetres lower in the middle. Cross-court is the safest shot in the game and it also puts you closest to the bisector for the reply. Rally cross-court until something changes.',
          },
          {
            title: 'Change direction on a short ball',
            body: 'When the opponent’s ball lands short, inside the service line or thereabouts, you can step in and go down the line or inside-out with much less risk. Change direction when you are inside the court, not from behind the baseline.',
          },
          {
            title: 'Serve plus one',
            body: 'Decide where you are serving and where the first groundstroke goes before you toss. A wide serve followed by a forehand into the open court, or a body serve followed by a deep ball to the backhand. Two shots, one decision.',
          },
          {
            title: 'High and heavy to the backhand',
            body: 'Most players below the top level dislike a high topspin ball on the backhand. Loop it deep with spin and wait for the short reply, then attack it. Boring and devastatingly effective.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Inside-out forehand',
        body: 'Once your cross-court backhand is reliable, add the inside-out forehand: run around a ball on your backhand side and hit a forehand cross-court into the opponent’s backhand corner. It combines the safety of cross-court with your best shot and is the most common attacking pattern in modern tennis.',
      },
      {
        type: 'table',
        columns: ['Pattern', 'When to use it', 'What it sets up'],
        rows: [
          ['Cross-court rally', 'Neutral balls, tight scores, when you are not sure', 'A short ball to attack, or an opponent error'],
          ['Down the line on a short ball', 'Ball inside the service line, you are balanced', 'A wrong-footed opponent or an approach to the net'],
          ['Serve wide, forehand open court', 'Deuce court for a right-hander, 30-0 or 40-15 style scores', 'A two-shot point'],
          ['High heavy to the backhand', 'Opponent with a one-handed backhand or a flat two-hander', 'A short, floating reply you can step in on'],
        ],
      },
      {
        type: 'text',
        body: 'Pick one pattern a week and play practice sets where you use it every time it is available. It will feel artificial for a few sessions. Then one day in a real match it will happen without a thought, and you will understand why professionals talk about patterns rather than shots.',
      },
      {
        type: 'link',
        to: '/studio/serve',
        label: 'Work on the serve in the 3D studio',
      },
    ],
  },
  {
    id: 'doubles-tactics-basics',
    section: 'tactics',
    title: 'Doubles tactics basics',
    summary: 'Positions, the middle, the first volley and communication. Doubles is a different game and it rewards the team that knows it.',
    level: 'intermediate',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'Doubles is not singles with a partner. The court is 2.7 metres wider but there are two people on each side, the net is where points are won, and the serve and return matter even more because every point involves at least one player already at the net. A team that understands positioning and plays the percentages beats two better singles players surprisingly often.',
      },
      {
        type: 'table',
        columns: ['Role', 'Starting position', 'Main job'],
        rows: [
          ['Server', 'Midway between the centre mark and the doubles sideline', 'Get a high percentage of first serves in and follow it forward, or hold the baseline and hit the plus-one'],
          ['Server’s partner', 'Middle of the service box, about two metres from the net', 'Cover the middle, poach on weak returns, protect the alley only when the returner shows they will go there'],
          ['Returner', 'Near the baseline, singles line to the alley depending on the serve', 'Return cross-court, low and deep, away from the net player. A lob return is a fine option against an aggressive net player'],
          ['Returner’s partner', 'Around the service line', 'Watch the net player, call the serve, move in if the return is good and back if it is weak'],
        ],
      },
      {
        type: 'list',
        items: [
          '**Down the middle solves the riddle.** A ball between two opponents creates confusion and takes away angles. When in doubt, hit through the middle.',
          '**Get the first volley in.** The server’s first volley or first groundstroke should be deep and safe. Finish on the second ball.',
          '**Move together.** Both players move as a unit, side to side and forward and back. A gap between partners is a lane for the opponents.',
          '**Return cross-court low.** The net player cannot hurt you if the ball dips below the net on the other side.',
          '**Lob when the net is crowded.** A lob over the net player forces the team to switch and defend.',
        ],
      },
      {
        type: 'text',
        body: 'Communication is not optional. Talk before every point: where is the serve going, is the net player poaching, are you staying back or coming in. Call balls in the air: yours, mine, switch. And after a lost point, a fist bump or a word says the team is fine. Silent doubles is losing doubles.\n\nFormations like the I-formation and Australian are useful against a returner who is killing you cross-court, but they belong after the basics: serve in, first volley deep, cover the middle, move together.',
      },
      {
        type: 'callout',
        title: 'The alley is a trap',
        body: 'Net players who hug the alley to protect it leave the whole middle open. The returner rarely goes down the alley because it is the hardest shot on the court. Stand in the middle of the box and dare them.',
      },
      {
        type: 'link',
        to: '/studio/forehand-volley',
        label: 'Sharpen the volley in the 3D studio',
      },
    ],
  },

  // ------------------------------------------------------------------ mental
  {
    id: 'between-point-routine',
    section: 'mental',
    title: 'The between-point routine',
    summary: 'You have 20 seconds between points. What you do with them decides how you play the next one.',
    level: 'intermediate',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Tennis is roughly 20 % playing and 80 % waiting. The waiting is where matches are lost: replaying the last error, worrying about the score, watching the opponent, tightening up. Great competitors are not people who feel nothing between points. They are people with a routine that takes them from the end of one point to the start of the next in a reliable emotional state.\n\nThe best-known version is the **16-second cure** described by sport psychologist Jim Loehr, who found that top players moved through the same four stages between points, almost like a ritual.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'React (3 to 5 seconds)',
            body: 'The point ends. Turn away from the net immediately, whatever happened. Keep your body language strong: head up, shoulders back, racquet in the non-dominant hand. A quick fist pump after a good point is fine, a slumped walk after a bad one is not.',
          },
          {
            title: 'Relax (6 to 15 seconds)',
            body: 'Walk toward the back fence or the side. Breathe out slowly. Adjust your strings, wipe your hand on a towel, let your heart rate drop. This is where the last point is allowed to finish.',
          },
          {
            title: 'Prepare (3 to 5 seconds)',
            body: 'Walk to the baseline and decide, in one sentence, what you are going to do. Where is the serve going, or where will the return go. A plan for the first two shots, nothing more.',
          },
          {
            title: 'Ritual (5 to 8 seconds)',
            body: 'The same physical sequence every time: bounce the ball the same number of times, take the same breath, look at the target, and go. The ritual tells your body that the thinking is over.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Turn away',
        body: 'The single most useful habit is turning your back to the net the moment a point ends. It removes the visual trigger for frustration, gives you a private space, and starts the routine automatically.',
      },
      {
        type: 'text',
        body: 'Build the routine in practice, not in matches. Play practice sets where you deliberately walk through all four stages between every point, even the ones that do not matter. It will feel slow. Within a couple of weeks it will feel wrong not to do it, and you will notice that the streaks of three or four quick errors in a row have largely disappeared.',
      },
      {
        type: 'link',
        to: '/learn/mental',
        label: 'Next: handling nerves and chokes',
      },
    ],
  },
  {
    id: 'handling-nerves-and-chokes',
    section: 'mental',
    title: 'Handling nerves and chokes',
    summary: 'What choking actually is, why it happens on the big points, and the practical tools that get you through it.',
    level: 'intermediate',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'Everyone chokes. Professionals choke at 5-5 in a tiebreak, club players choke serving for the set, juniors choke the moment a parent arrives. It is not a character flaw. It is a predictable response of the body to pressure, and once you know what it does you can work with it.\n\nUnder pressure, your muscles tense, your breathing shortens, your swing gets shorter and slower, and your attention narrows onto the outcome instead of the ball. The result is the pushed second serve, the forehand that lands short, the volley you never quite commit to.',
      },
      {
        type: 'table',
        columns: ['What you notice', 'What is happening', 'What to do'],
        rows: [
          ['Tight arm, short swing', 'Muscle tension from adrenaline', 'Shake the arm out, loosen the grip, swing bigger and slower on purpose'],
          ['Racing heart, shallow breath', 'Fight-or-flight breathing', 'One long exhale before the point, twice as long as the inhale'],
          ['Thinking about the score', 'Attention on outcome instead of task', 'Replace with one process cue: watch the ball, or hit through the target'],
          ['Slower feet', 'Freezing response', 'Bounce on your toes before the serve or return, exaggerate the split step'],
        ],
      },
      {
        type: 'text',
        body: 'The most reliable antidote to a tight arm is to **keep the feet moving and the racquet accelerating**. Nerves make you decelerate into the ball. Decide in advance that on big points you will swing freely to a big target with more spin, rather than steering. A confident swing to the middle of the court beats a careful swing to the line every time.\n\nThe second tool is your breath. You cannot directly relax a muscle on command, but a slow exhale does it for you. Make it part of the ritual before every point, not just the scary ones.',
      },
      {
        type: 'callout',
        title: 'Nerves mean you care',
        body: 'Trying to feel calm usually backfires. Instead, expect the nerves, name them, and treat them as a sign that the moment matters. Champions are nervous too. They have just practised playing well while nervous.',
      },
      {
        type: 'list',
        items: [
          'Play practice points with consequences: loser picks up the balls, or start every game at 30-30. Pressure is a skill you rehearse.',
          'Have a pre-decided big-point play: for many players it is a spin serve to the backhand and a cross-court plus-one.',
          'Slow down between points when you feel rushed. Use the full 20 seconds.',
          'After a choke, do not analyse it on court. Routine, next point. Analyse it in your journal that evening.',
        ],
      },
    ],
  },
  {
    id: 'practice-with-purpose',
    section: 'mental',
    title: 'Practice with purpose',
    summary: 'Hitting for an hour is not practising. Deliberate practice, a journal and a phone camera will double what you get from your court time.',
    level: 'beginner',
    minutes: 6,
    blocks: [
      {
        type: 'text',
        body: 'Most players practise the same way for years and stay at the same level, and the reason is not talent or time. It is that rallying comfortably from the baseline with a friend is enjoyable but does not change anything. It rehearses what you can already do.\n\n**Deliberate practice** is different. It targets one specific weakness, works at the edge of your current ability where you fail often, gives you immediate feedback on every attempt, and involves full attention. It is tiring, sometimes frustrating, and it is the only kind of practice that reliably moves you forward.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Pick one thing',
            body: 'Before every session, write down the single thing you are working on. Not “backhand”, but “finishing the two-handed backhand over the shoulder with the hips fully rotated”. One focus per session.',
          },
          {
            title: 'Set a measurable target',
            body: 'Twenty balls in a row cross-court past the service line. Six of ten second serves into a towel in the backhand corner. Numbers turn practice into a game and tell you if it is working.',
          },
          {
            title: 'Get feedback every ball',
            body: 'Targets on the court, a partner calling depth, a coach, or your phone on a fence clip. Without feedback you are guessing.',
          },
          {
            title: 'Stop when quality drops',
            body: 'Twenty focused minutes beats an hour of tired, sloppy repetition that grooves the wrong thing.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Film yourself',
        body: 'What you feel you are doing and what you are actually doing are often very different. A phone on the fence behind the baseline, filming at 60 frames per second or more, will show you in 30 seconds what a coach might need three lessons to convince you of. Compare the footage with the pro models in the 3D studio.',
      },
      {
        type: 'text',
        body: 'Keep a **training journal**. It does not need to be elaborate: date, what you worked on, what the numbers were, one thing you noticed, one thing to try next time. After a match, add what worked, what did not, and how you felt on the big points.\n\nOver a few months the journal shows you patterns you would never see otherwise: that your serve falls apart when you are tired, that you win more when you play cross-court early, that the backhand improved once you stopped thinking about the wrist. It also makes the next session’s one thing obvious.',
      },
      {
        type: 'list',
        items: [
          'Split practice time roughly in thirds: technique with drop feeds or a basket, live drills with a partner, and practice points or sets.',
          'Practise the shots you avoid in matches. If you never hit second serves under pressure in practice, you never will in a match.',
          'Rally partners are for cooperative drills. Ask for what you need: “feed me short balls to approach on” is a normal request.',
          'Review your journal once a month and set the next month’s focus from it.',
        ],
      },
      {
        type: 'link',
        to: '/pros',
        label: 'Compare your footage with the pros',
      },
    ],
  },
  {
    id: 'how-to-learn-a-stroke',
    section: 'mental',
    title: 'How to learn a stroke',
    summary: 'A five-stage progression from shadow swings to match play, and how to use slow motion so the picture in your head is the right one.',
    level: 'beginner',
    minutes: 7,
    blocks: [
      {
        type: 'text',
        body: 'A new stroke, or a change to an old one, does not arrive in one lesson. It moves through stages, and each stage needs a different kind of practice. Players who get stuck have usually jumped ahead: they try the new forehand in a match before it survives a drop feed, it breaks down, and they conclude it does not work.\n\nThe progression below is the one most coaches use in some form. Spend as long as you need at each stage, and drop back a stage whenever the stroke falls apart.',
      },
      {
        type: 'steps',
        steps: [
          {
            title: 'Study the picture',
            body: 'Watch the stroke in slow motion until you can describe the sequence: preparation, loading, contact, finish. Use the 3D studio to pause and rotate it. Your body copies pictures far better than words.',
          },
          {
            title: 'Shadow swings',
            body: 'No ball. Swing slowly in front of a mirror or your phone, checking key positions. Fifty slow swings a day for a week builds the pattern without the pressure of hitting anything.',
          },
          {
            title: 'Drop feed',
            body: 'Drop the ball yourself from the hand and hit it. Perfect timing is easy, so you can focus entirely on the movement. Aim for a big target on the court, not a spot.',
          },
          {
            title: 'Partner feed',
            body: 'A partner or coach feeds gentle balls from across the net, then from a basket, slowly increasing pace and adding movement. Now you have to time an incoming ball while keeping the shape.',
          },
          {
            title: 'Live rally',
            body: 'Cooperative rallying with the new stroke. Start slow and cross-court. The stroke will get worse before it gets better. Stay with it.',
          },
          {
            title: 'Match play',
            body: 'Practice sets first, then real matches. Accept that under pressure you will revert to the old stroke sometimes. Each time you hold the new one under pressure, it becomes yours.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Slow motion is the shortcut',
        body: 'Slow-motion study works because it lets you see the parts of the stroke that happen too fast to notice live: the racquet lag, the hip leading the shoulder, the wrist position at contact. Study the model, film yourself at the same angle, and compare frame by frame.',
      },
      {
        type: 'text',
        body: 'Expect a dip. Changing a stroke almost always makes it worse for two to six weeks, because the old movement was automatic and the new one still needs thought. This is the point where most people give up. If you know it is coming, you can plan for it: make the change in the off-season or a quiet period, and stay at the drop-feed and partner-feed stages until it feels boring.\n\nOne change at a time. Fix the grip, then the takeback, then the finish. Trying to change everything at once is trying to change nothing.',
      },
      {
        type: 'link',
        to: '/studio/forehand',
        label: 'Study the forehand frame by frame in the 3D studio',
      },
    ],
  },
]
