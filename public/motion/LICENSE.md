# Motion clips: licence and attribution

The clips in this folder (`forehand.json`, `backhand-two-handed.json`, `serve.json`, `smash.json`,
`forehand-volley.json`, `backhand-volley.json`) are derived from the **Tennis-MoCap** dataset and are released under the
**Creative Commons Attribution-ShareAlike 3.0 Unported** licence (CC BY-SA 3.0,
https://creativecommons.org/licenses/by-sa/3.0/), the same licence as the source.

## Attribution

Pulgarin-Giraldo J.D., Alvarez-Meza A.M., Melo-Betancourt L.G., Ramos-Bermudez S., Castellanos-Dominguez G.,
"A Similarity Indicator for Differentiating Kinematic Performance Between Qualified Tennis Players",
Lecture Notes in Computer Science 10125, Springer, 2017. https://doi.org/10.1007/978-3-319-52277-7_38

Dataset: https://github.com/jdpulgarin/Tennis-MoCap (OptiTrack, 100 Hz BVH).

## Source of each clip

| Clip | Source file | Window in the take (s) | Contact in the take (s) |
| --- | --- | --- | --- |
| forehand | `jarua_Derecha_18seg.bvh` | 5.14 – 7.16 | 6.115 |
| backhand-two-handed | `jarua_Reves.bvh` | 3.10 – 4.85 | 4.00 |
| serve | `jarua_Servicio.bvh` | 5.01 – 7.81 | 6.91 |
| smash | `jduribe_Remate.bvh` | 27.11 – 29.45 | 28.51 |
| forehand-volley | `jarua_VDerecha.bvh` | 5.23 – 7.42 | 6.46 |
| backhand-volley | `jarua_VReves.bvh` | 13.06 – 14.82 | 14.03 |

## Changes made

Cleaned, filtered, resampled, retargeted. In detail: single-frame marker glitches were repaired by interpolation; the
channels were low-pass filtered (zero-phase Butterworth, 12 Hz body / 20 Hz arms); the clips were cut to one stroke,
rotated to face the net and resampled from 100 Hz to 60 Hz; the motion was retargeted onto the Microsoft Rocketbox
`Sports_Male_04` skeleton (Mixamo bone names), with half of the wrist roll moved into the forearm. The pipeline is in
`scripts/mocap/` and documented in `docs/research/mocap-pipeline.md`.

Under ShareAlike, any adaptation of these clips must also be released under CC BY-SA 3.0 (or a compatible licence).
The application code that plays them is not affected.
