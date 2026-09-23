# Racket and arm keys from pro footage

Written 2026-09-23. Follows [mocap-pipeline.md](mocap-pipeline.md).

## The problem

The Tennis-MoCap captures give the body its weight and timing, but they have no hand markers and no racket. The
wrist rotation in the BVH is close to meaningless, so a racket held rigidly in the captured hand pointed the right way
only at the one instant the grip was calibrated for (contact). Everywhere else — the load, the lag, the drop, the
wiper — the racket was wrong, which is exactly where a player's eye looks.

We checked the capture's **hand path** against Sinner's forehand (front and side practice footage, measured frame by
frame): it agrees within ~10 cm at every phase. The arm path was not the problem. The wrist and the elbow's twist were.

## The fix: an anatomical arm and motion warping

`src/engine/rig/arm.ts` models each arm on the real skeleton as

- a **hinged elbow** (the upper arm's twist is chosen so the elbow bends in its own plane),
- **forearm pronation** about the forearm (split 50/50 between the forearm and hand bones so the skin twists evenly),
- **wrist extension / flexion and radial / ulnar deviation**, with anatomical limits
  (extension ≤ 85°, flexion ≤ 70°, radial ≤ 25°, ulnar ≤ 40°, pronation −85…100°).

It can read those angles off any posed rig (`measure`) and write an arm back from them (`apply`); the round trip is
exact to 0.01° / 0.01 mm.

`src/engine/rig/warp.ts` then **warps** a clip's arm through keys (Witkin & Popović 1995, *motion warping*):

| Key field | Meaning | How it is applied |
|---|---|---|
| `hand` | wrist position relative to the shoulder (court or chest frame) | offset from the capture, interpolated smoothly and landing exactly on each key |
| `elbow` | where the elbow points | converted to a swivel offset around the shoulder–wrist line |
| `racket` | handle→tip direction and (optionally) the palm-side face normal | turned into the reachable wrist angles closest to it: a grid search over pronation × extension × deviation within the limits, refined twice, with continuity to the previous key |
| `wrist` | explicit pronation / extension / deviation | used as is |

Between keys the wrist angles follow limited-Bessel Hermite curves, so the racket never overshoots between two keys.
The hand keeps the capture's own motion plus a smooth offset, so the texture of real movement survives.

Supporting pieces:

- **Grip geometry** (`solved.ts`): the handle crosses the palm from the heel toward the index knuckle; how far it leans
  from perpendicular toward the fingers depends on the grip (semi-western 15°, eastern 22°, continental 38°). The
  semi-western value was measured on Sinner's ready and contact frames. Bevel turns were fixed for the mirrored studio
  world (a semi-western grip used to open the face instead of closing it).
- **Fingers** (`hand.ts`): the capture has none, so the racket hand closes around the handle and the free hand relaxes.
- **Two hands** (`twohand.ts`): on two-handers the left hand holds a left-handed eastern grip just above the right.
- **Trunk** (`trunk.ts`): a per-stroke yaw correction over the spine, with the head counter-rotated. The forehand
  capture over-turned the shoulders to 126°; pros measure 92–106° (Pedro et al. 2022, Landlinger et al. 2010).

## Where the keys come from

Reference footage is captured frame by frame from YouTube slow-motion practice videos (Sinner forehand front and side,
Sinner two-handed backhand front, Sinner serve side), stored under `data/video-frames` (gitignored, never published),
measured with YOLO pose + racket segmentation (`scripts/video/measure.py`) and compared side by side with renders of the
same instants from a matching camera (`/sheet/<stroke>?times=…&camoff=…&clean=1`, `scripts/video/compare.py`).
Slow-motion segments are mapped by phase (contact, trophy, racket low point) rather than by clock time.

`scripts/arm-report.ts <stroke> [--warp] [--check]` prints the arm in these terms over time (trunk and hip turn, hand and
elbow in chest and court frames, elbow flexion, swivel, pronation, wrist angles, racket direction and face), which is
how each key was checked for reachability before rendering.

## Results

| Stroke | What changed | Checked against |
|---|---|---|
| Forehand | compact high-elbow loop, racket over the top into the slot, lag held to ~40 ms before contact, release, laid-back wrist at contact (36° extension; Pedro 2022: 30 ± 13), brush up, wrap over the left shoulder; clip re-cut to start and end square; shoulder turn eased to ~105° | Sinner side and front, frame by frame |
| Serve | trophy with the elbow at shoulder height and the racket tip up; racket drop down the back; full reach at contact (elbow ~6°); arm across afterwards | Sinner side view |
| Smash | the serve's arm with an abbreviated start (straight up into the trophy) | serve reference |
| Two-handed backhand | left hand locked on the handle for the whole stroke | Sinner front view |
| Volleys | head above the wrist throughout, open face, short punch that stops in front | coaching model; Federer at court level (real speed) |
| One-handed backhand | now on the two-hander's captured body: left hand on the throat until the forward swing, racket up behind the left shoulder, dropped late, straight-arm contact in front, arms opening like wings | Federer, side-front slow motion |
| Slice, drop shot | same body; high take-back with the left hand on the throat, forward-and-down swing nearly level through an open face; the drop shot opens the face more and absorbs with a short finish | coaching model + biomechanics |
| Return, swing volley | the forehand's body and Sinner keys: the return with the loop kept in front (half backswing), the swing volley with the whole forward swing lifted to a chest-height contact (`handShift` keys) | derived from the forehand |

| Forehand left arm | on the throat at the ready, stretched across at the load, pulled in at contact, catching the racket after the finish | Sinner front and side |
| Tweener | hand-keyed, reshaped after Federer's 2009 US Open tweener: wide base, trunk bent over the ball, left arm out | Federer broadcast slow motion |
| Split step, footwork | athletic ready stance (hips ~12 cm lower, trunk ~24° forward) and a 6 cm hop, matching the captured players' 4–7 cm hops | Tennis-MoCap takes |

| Backhand smash | hand-keyed, checked against a close-up slow-motion coaching demo filmed from the net: take-off into a scissor jump at contact, arm fully up, the arm staying high and out to the right through the landing, still turned away from the net, free arm low | coaching demo (Topspin Tennis) |

Still hand-keyed (no capture exists in the dataset): the backhand smash, the tweener and the footwork patterns, each
now checked against footage or the captured players' measurements as listed above.

## Quality checks

- `scripts/smoothness.ts` samples every stroke at 240 Hz and flags racket, hand and left-elbow speed spikes. It found and
  fixed: a left-grip orientation ~150° off (two-hander), a forced throat grip (one-hander, slice, drop shot), an unstable
  elbow swivel through straight-arm contacts (smash), and an out-of-reach preparation key (tweener). All strokes now scan
  clean; the peak racket angular speed falls at contact in every stroke.
- The body mesh's limb IK used last frame's hip and shoulder positions; fixed (it showed on paused frames, e.g. the
  tweener rendered in the splits).
