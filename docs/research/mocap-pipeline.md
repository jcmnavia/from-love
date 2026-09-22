# Mocap pipeline

Real motion for six strokes comes from **Tennis-MoCap** (OptiTrack, 100 Hz BVH, CC BY-SA 3.0, Pulgarin-Giraldo et al. 2017). Clips derived from it are CC BY-SA 3.0 too; see `public/motion/LICENSE.md`. The site footer carries the attribution.

## Rerun

```sh
./scripts/mocap/fetch.sh                 # high-performance players' takes → data/mocap-raw (gitignored)
npx tsx scripts/mocap/select.ts          # split takes into strokes, score, choose exemplars → scripts/mocap/selection.json
npx tsx scripts/mocap/retarget.ts        # clean, filter, resample to 60 fps, retarget onto public/models/player.glb → public/motion/*.json
npx tsx scripts/mocap/validate.ts        # checks against the studio's own runtime (src/engine/rig)
npx tsx scripts/rig-skeleton.ts          # only if public/models/player.glb changes
```

## Exemplars (all from high-performance players)

| Stroke | Take | Window (s) | Contact (s) | Peak hand speed |
| --- | --- | --- | --- | --- |
| forehand | jarua_Derecha_18seg | 5.14–7.16 | 6.115 | 10.3 m/s |
| backhand-two-handed | jarua_Reves | 3.10–4.85 | 4.00 | 6.4 m/s (right hand; the left hand drives) |
| serve | jarua_Servicio | 5.01–7.81 | 6.91 | 11.9 m/s |
| smash | jduribe_Remate | 27.11–29.45 | 28.51 | 10.5 m/s |
| forehand-volley | jarua_VDerecha | 5.23–7.42 | 6.46 | 6.1 m/s |
| backhand-volley | jarua_VReves | 13.06–14.82 | 14.03 | 6.5 m/s |

Validation (latest run): segment-direction error ≤ 0.01° mean / 1.5° max, studio runtime vs GLB forward kinematics within 0.25 mm, low-pass filter lowers peak hand speed by ≤ 1.1 %, no NaN, planted-foot slide 2–8 cm (source 2–8 cm), 64–101 KB per clip.

## What the runtime adds on top

- **Racket.** The capture has no racket and only coarse hand orientation. The racket is rigid in the hand through a grip; per stroke the grip is calibrated once so the racket has the orientation in `Stroke.contactRacket` at the measured contact (averaged over ±20 ms). The rest of the swing follows the captured hand.
- **Forearm roll.** Hand markers were not captured, so pronation after contact (the forehand wiper) is added from `Stroke.forearmRoll` (degrees, keyed relative to contact; biomechanics.md: pronation peaks ~0.2–0.3 s after impact).
- **Timing.** `useMotion` re-times the authored phases and ball waypoints onto each clip's events so the timeline, coach panel and ball flight match the capture.

## Known limitations

- Club-level (high-performance league) players, not tour professionals: hand speeds 6–12 m/s against ~15+ m/s for pros.
- Two-handed backhand: the left hand follows the capture and is not locked onto the grip; at some frames the hands separate by a few centimetres.
- Planted feet slide a few centimetres (as in the source); foot-lock IK is designed (`feet` intervals are in every clip) but not yet applied.
- Slice, drop shot, one-handed backhand, return, swing volley, backhand smash, tweener and footwork remain procedural (keyframes → the same body).
