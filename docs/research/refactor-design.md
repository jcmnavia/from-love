# Animation refactor: design (2026-09-22)

Decisions: real mocap (Tennis-MoCap, CC BY-SA 3.0) for the strokes it covers, procedural motion for the rest; Microsoft Rocketbox `Sports_Male_04` (MIT) as the default body. Background: `engine-audit.md`, `biomechanics.md`, `assets-and-motion.md`.

## One skeleton
The body is the Rocketbox GLB's Mixamo skeleton (`mixamorig:*`, A-pose rest, faces +Z, metres, 1.81 m). Every motion source produces **local bone rotations for that skeleton** plus a hips position. Joint positions for the HUD, camera focus, coil dial, swing trail and ball contact are read back from the posed bones (`Solved` becomes an output of the rig, not of the solver).

## Motion sources
1. **Clip** (mocap): `public/motion/<strokeId>.json`, produced offline by `scripts/mocap/*`:
   ```jsonc
   {
     "id": "forehand", "fps": 60, "frames": 150,
     "source": { "file": "jgacosta_Derecha.bvh", "window": [t0, t1], "player": "jgacosta", "license": "CC BY-SA 3.0", "attribution": "Pulgarin-Giraldo et al. 2017, Tennis-MoCap" },
     "bones": ["mixamorig:Hips", ...],          // order of the rotation tracks
     "hips": [x, y, z, ...],                    // metres, author frame (x = player's right, y up, z toward the net), 3 × frames
     "rot": [x, y, z, w, ...],                  // local quaternions per bone per frame, 4 × bones × frames, frame-major
     "events": { "start": 0, "backswingEnd": s, "forwardStart": s, "contact": s, "finish": s, "end": s },  // seconds from clip start
     "feet": { "leftPlanted": [[s0, s1], ...], "rightPlanted": [[s0, s1], ...] }
   }
   ```
   Clips are right-handed, facing the net (+Z author), feet centred on the origin at `start`.
2. **Procedural** (existing keyframe engine) for strokes without mocap: its `Solved` output is retargeted onto the same skeleton (the current `SkinnedPlayer` path).

## Racket and wrist
The mocap has no racket. The racket is rigidly attached to the right hand bone through a **grip transform** (continental / eastern / semi-western / two-handed, from the bevel geometry). Around contact (±150 ms, smooth weight) a small wrist correction turns the hand so the string face points along the stroke's target line with the authored face tilt, because hand orientation from optical markers is the least reliable channel. For two-handers the left hand is IK'd onto the grip.

## Feet
Planted intervals from the clip lock each foot's world position (leg IK) so there is no sliding after retargeting to different leg lengths.

## Studio
`Stroke` gains `clip?: string`. When present, duration and phase timings come from the clip's events; phase text stays authored. Everything downstream (timeline, HUD, trail, ball flight ending at the racket at `contact`) keeps working because it reads `Solved`.
