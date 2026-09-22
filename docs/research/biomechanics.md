# Tennis stroke biomechanics for animation authoring

Research brief, written 2026-09-22. Scope: measured kinematics (joint angles, angular velocities, event timing, linear
speeds) for re-authoring the 3D player's strokes as joint-angle curves with proximal-to-distal timing.

**How to read this file**

- Times are **ms relative to ball impact** (negative = before). "Fraction" = fraction of the stroke clip.
- Populations are given as reported ("elite male, n=6"). Values are mean ± SD unless marked.
- **verified**: I read the number in the primary paper or its official abstract (link given).
- **secondary**: the number is quoted by a review I read, but I did not read the original paper. The original is named.
- **derived**: my own arithmetic from verified numbers (the working is shown). Not a measurement.
- **unverified**: common coaching or literature figure I could not confirm against a source. Do not treat it as data.
- **qualitative**: descriptive only; no numbers exist or none were found.
- Angle conventions differ between labs (baseline-referenced alignments vs ISB joint angles). The convention is
  stated where it matters. Do not mix signs between studies without checking.

---

## 1. Serve (flat; kick where available)

### 1.1 Phase model

The Kovacs & Ellenbecker 8-stage model ([PMC3445225](https://pmc.ncbi.nlm.nih.gov/articles/PMC3445225/)) has three
phases: **preparation** (1 start, 2 release, 3 loading, 4 cocking), **acceleration** (5 acceleration, 6 contact) and
**follow-through** (7 deceleration, 8 finish). Biomechanics labs mark the events as ball release (BR), trophy
position (TP: the racket high point, usually close to maximum knee flexion), racket low point (RLP: lowest racket
point, close to maximum shoulder external rotation), and ball impact (BI)
([meta-analysis, PMC11260724](https://pmc.ncbi.nlm.nih.gov/articles/PMC11260724/)).

| Event / phase | Value | Unit | Population | Status / source |
|---|---|---|---|---|
| BR → TP | 620 ± 110 | ms after BR | high-performance male, n=10 (UTR 10.7), normal serve | verified: [Newton et al. 2025, PMC12294548](https://pmc.ncbi.nlm.nih.gov/articles/PMC12294548/) |
| BR → RLP | 840 ± 100 | ms after BR | same | verified: same |
| BR → impact (total serve duration) | 970 ± 100 | ms | same | verified: same |
| TP → impact | ≈ −350 | ms | same | derived (970 − 620) |
| RLP → impact (forward swing) | ≈ −130 | ms | same | derived (970 − 840) |
| Preparation / propulsion share of the serve | 64.5 ± 8.4 / 22.3 ± 8.0 | % | same | verified: same |
| Loading phase | 190–210 | ms | national juniors, n=4 (2M/2F), fast vs slow serve | verified: [PMC11496077](https://pmc.ncbi.nlm.nih.gov/articles/PMC11496077/) |
| Cocking phase | 160–260 | ms | same | verified: same |
| Acceleration phase (RLP → BI) | 110–130 | ms | same. The paper's text also says "<15 ms", which contradicts its own 0.11–0.13 s. | verified: same |
| Maximum shoulder external rotation | −90 ± 14 | ms | Olympic players, n=20 (8M/12F) | secondary: Fleisig 2003, quoted in [Kovacs & Ellenbecker](https://pmc.ncbi.nlm.nih.gov/articles/PMC3445225/). The same review also says "max ER to contact in <1/100 s", which contradicts this number. Use −90 ms. |
| Peak lead-knee extension velocity | −180 ± 65 | ms | same | secondary: Fleisig 2003 via Kovacs |
| Peak upper-torso rotation velocity | −58 (M), −75 (F) | ms | same | verified: [Fleisig et al. 2003 abstract](https://research-repository.uwa.edu.au/en/publications/kinematics-used-by-word-class-tennis-players-to-produce-high-velo/) |
| Pelvis → trunk peak angular-velocity gap | −28.3 ± 33.5 (1st serve), −28.9 ± 27.0 (2nd) | ms (negative: the trunk peaks **before** the pelvis) | professionals, n=8 (6M/2F), IMU at 1 kHz | verified: [van Trigt et al. 2025, PMC11746891](https://pmc.ncbi.nlm.nih.gov/articles/PMC11746891/) |
| Trunk → upper-arm peak gap | 124.5 ± 14.3 (1st), 127.3 ± 13.4 (2nd) | ms | same (3D upper-arm angular velocity from an IMU; includes post-impact motion) | verified: same |

### 1.2 Angles at key events

| Variable | Value | Unit | Population | Status / source |
|---|---|---|---|---|
| **At max ER (≈ RLP):** shoulder external rotation | 172 ± 12 | ° | Olympic, n=20 | verified (mean) in [Fleisig abstract](https://research-repository.uwa.edu.au/en/publications/kinematics-used-by-word-class-tennis-players-to-produce-high-velo/); SD secondary via Kovacs |
| shoulder abduction | 101 ± 13 | ° | same | secondary: Fleisig via Kovacs |
| shoulder horizontal adduction | 7 ± 13 | ° (anterior to the coronal plane) | same | secondary: same |
| elbow flexion | 104 ± 12 | ° | same | verified (mean) in the abstract |
| wrist extension | 66 ± 19 | ° | same | secondary: Fleisig via Kovacs |
| Racket vs trunk at max ER | racket shaft ~parallel to the spine, pointing down | – | same | qualitative (Kovacs) |
| **Loading:** front-knee flexion, recommended | > 15 | ° | coaching guideline | secondary: Elliott via Kovacs |
| max (back) knee flexion | 80 ± 14 | ° | advanced male, n=8 | verified: [Martin et al. 2016, PMC4993075](https://pmc.ncbi.nlm.nih.gov/articles/PMC4993075/) |
| front-knee extension range, foot-back / foot-up | 65.5 ± 12.6 / 54.1 ± 11.7 | ° | high-performance male, n=12 | secondary: Reid et al. 2008 via Kovacs |
| rear-knee extension range, foot-up / foot-back | 59.4 ± 6.6 / 44.8 ± 8.3 | ° | same | secondary: same |
| Shoulder & pelvis "rear lateral tilt" at loading (hitting-side shoulder low) | present in powerful servers | – | elite | qualitative (Kovacs; Bahamonde 2000) |
| **At impact:** trunk tilt above horizontal | 48 ± 7 | ° | Olympic, n=20 | verified (mean) in the abstract; SD secondary |
| shoulder abduction | 101 (≈100; "optimum 110 ± 15" proposed by Kovacs) | ° | same | verified (mean) in the abstract |
| elbow flexion | 20 ± 4 | ° | same | secondary: Fleisig via Kovacs |
| elbow included angle | 166.1 ± 5.0 (≈14° flexion) | ° | high-performance male, n=10 | verified: [PMC12294548](https://pmc.ncbi.nlm.nih.gov/articles/PMC12294548/) |
| elbow flexion, slow / fast serve | 37.6 / 24.2 | ° | national juniors, n=4 | verified: [PMC11496077](https://pmc.ncbi.nlm.nih.gov/articles/PMC11496077/) |
| wrist extension | 15 ± 8 | ° | Olympic | secondary: Fleisig via Kovacs |
| front-knee flexion | 24 ± 14 | ° | Olympic | secondary: Fleisig via Kovacs |
| trunk axial-rotation range in acceleration, slow / fast serve | 10.2 / 21.5 | ° | national juniors, n=4 | verified: PMC11496077 |
| Toss position | slightly lateral to overhead, giving contact at ~100° abduction | – | – | secondary: Kovacs |
| Kick vs flat: racket position | kick: racket 8.7 cm more posterior and 21.1 cm more medial relative to the shoulder | cm | NCAA D1 male, n=7 | verified: [Sheets et al. 2011](https://pubmed.ncbi.nlm.nih.gov/21984513/) |
| Kick vs flat: racket velocity direction | kick: largest lateral, smallest forward component; flat: smallest vertical; slice: lateral like kick, forward like flat | – | same | verified: same |
| Kick vs flat: main difference | racket-face angle, set by forearm pronation and shoulder IR; the lower body barely differs | – | review | qualitative (Kovacs, citing Elliott) |

### 1.3 Peak angular velocities (order as reported)

| Segment / joint | Value | Unit | Population | Status / source |
|---|---|---|---|---|
| Order of peaks (Fleisig) | trunk tilt → upper-torso rotation → pelvis rotation → elbow extension → wrist flexion → shoulder IR | – | Olympic, n=20 | verified: abstract |
| Trunk tilt (shoulder-over-shoulder) | 280 | °/s | same | verified |
| Upper-torso rotation | 870 | °/s | same | verified |
| Pelvis rotation | 440 | °/s | same | verified |
| Elbow extension | 1510 | °/s | same | verified |
| Wrist flexion | 1950 | °/s | same | verified |
| Shoulder internal rotation | 2420 (M), 1370 (F) | °/s | same | verified |
| Lead-knee extension | 800 ± 400 | °/s | same | secondary: Kovacs |
| Rear-knee extension, foot-up / foot-back | 9.3 ± 1.2 / 7.2 ± 0.9 rad/s (≈533 / 413 °/s) | – | high-performance male, n=12 | secondary: Reid 2008 via Kovacs |
| Rear-knee extension | 536 ± 142 | °/s | advanced male, n=8 | verified: [Martin 2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC4993075/) |
| Pelvis (3D, IMU) | 586.8 ± 58.4 (1st), 541.8 ± 49.4 (2nd) | °/s | professionals, n=8 | verified: [van Trigt 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11746891/) |
| Trunk (3D, IMU) | 897.2 ± 152.9 (1st), 846.2 ± 146.3 (2nd) | °/s | same | verified |
| Upper arm (3D, IMU) | 3206.6 ± 807.8 (1st), 2719.8 ± 715.1 (2nd) | °/s | same | verified |
| Shoulder medial rotation, slow / fast serve | 1311 / 1604 | °/s | national juniors, n=4 | verified: PMC11496077 |

### 1.4 Linear values

| Variable | Value | Unit | Population | Status / source |
|---|---|---|---|---|
| Ball speed | 50.8 (M), 41.5 (F) | m/s | Olympic | verified: Fleisig abstract |
| Ball speed | 45.6 ± 3.1 (fresh), 43.8 ± 4.1 (after 3 h) | m/s | advanced male, n=8 | verified: Martin 2016 |
| Ball speed, 1st / 2nd serve | 175.1 ± 12.3 / 145.7 ± 12.9 | km/h | professionals, n=8 | verified: van Trigt 2025 |
| Peak racket speed: foot-up / foot-back / arm only | 43.6 ± 3.0 / 42.6 ± 3.1 / 39.4 ± 3.4 | m/s | high-performance male, n=12 | verified: [Reid, Elliott, Alderson 2008](https://pubmed.ncbi.nlm.nih.gov/18202570/) |
| Racket-head speed at impact | 31.0 (racket centre) | m/s | high-performance, n=11 | verified: [Elliott, Marshall, Noffal 1995](https://research-repository.uwa.edu.au/en/publications/contributions-of-upper-limb-segment-rotations-during-the-power-se/) |
| Contributions to racket speed | upper-arm IR 54.2%, hand flexion 31.0% | % | same | verified: same |
| Elite racket speed range | 38–47 | m/s | elite | secondary: Kovacs |
| Impact height | 303.4 ± 11.9 cm; 162.5 ± 2.2 % of body height | – | ATP professionals, n=21, 945 match serves | verified: [PMC9806764](https://pmc.ncbi.nlm.nih.gov/articles/PMC9806764/) |
| Impact height / toss zenith / zenith − impact | 2.68 ± 0.13 / 3.40 ± 0.24 / 0.72 ± 0.19 | m | national junior male, n=13, 181 cm tall | verified: [PMC12641958](https://pmc.ncbi.nlm.nih.gov/articles/PMC12641958/) |
| Impact height | 2.65 ± 0.08 | m | advanced male, n=8 | verified: Martin 2016 |
| Ball projection angle at impact, 1st / 2nd | −4.37 ± 1.19 / −3.49 ± 1.35 | ° | ATP, n=21 | verified: PMC9806764 |
| Centre-of-gravity vertical velocity at impact, slow / fast serve | −0.3 / +0.3 (fast serves are hit while still rising) | m/s | national juniors, n=4 | verified: PMC11496077 |
| Vertical GRF | 1.68–2.12 × body weight | BW | – | secondary: Kovacs |
| Share of kinetic energy/force from legs and trunk | 51–55 | % | model | secondary: Kibler via Kovacs |

**Sequencing summary (serve).** Leg drive (lead-knee extension peak −180 ms) → trunk tilt → upper-torso rotation
(−58 ms, male) → pelvis → elbow extension → wrist flexion → shoulder IR, which is last and peaks at or just before
impact. The pelvis and trunk peak close together, and the trunk can peak first (−28 ms gap). IR and pronation keep
going after impact ("long-axis rotation" into the follow-through). **Elite vs junior:** elite players have more
vigorous knee extension and shorter acceleration phases. **Male vs female:** same order of events; females reach peak
torso velocity earlier (−75 vs −58 ms) and have much lower IR speed (1370 vs 2420 °/s). **1st vs 2nd serve:** same
timing, with 5–15% lower segment velocities on the 2nd serve (van Trigt).

---

## 2. Forehand (open / semi-open, topspin)

### 2.1 Timing (the best dataset: Landlinger et al. 2010)

Landlinger et al. 2010 ([JSSM PDF](https://www.jssm.org/volume09/iss4/cap/jssm-09-643.pdf)): 6 elite ATP male players
(mean career-best rank 347) vs 7 high-performance (HP) junior males, 400 Hz Vicon, 20 m/s machine feed, cross-court
(CC) and down-the-line (DL), stance not controlled. All rows are **verified** (Table 2 of the paper). Times are ms
relative to impact, elite means.

| Event | Elite | HP juniors | Note |
|---|---|---|---|
| Forward swing start (first forward racket movement) | ≈ −259 | ≈ −256 | derived: "impact time" of 0.259 ± 0.082 s after swing start |
| Forward swing total (start → end of horizontal racket travel) | 324 ± 86 ms | 326 ± 64 ms | verified |
| End of forward swing (horizontal) | ≈ +65 | ≈ +70 | derived |
| Max hip alignment (coil) | −243 ± 68 | −236 ± 39 | |
| Max shoulder alignment (coil) | −231 ± 46 | −214 ± 31 | shoulders reach full turn just after the hips start to unwind |
| Max separation angle (X-factor) | −168 ± 77 | −148 ± 19 | |
| Max racket rotation (racket lag behind the body) | −146 ± 42 | −133 ± 42 | |
| Max hip linear velocity | −97 ± 46 | −113 ± 64 | |
| **Peak pelvis angular velocity** | **−75 ± 8** | **−93 ± 12** | significant: elite peak later |
| Peak rear-leg extension velocity | −69 ± 36 | −91 ± 29 | |
| **Peak trunk angular velocity** | **−57 ± 4** | **−75 ± 11** | significant: elite peak later |
| Max wrist extension (hand lag) | −55 ± 11 | −56 ± 12 | the wrist "releases" over the last ~55 ms |
| Peak shoulder linear velocity | −45 ± 8 | −61 ± 16 | |
| Peak elbow linear velocity | −39 ± 5 | −40 ± 7 | |
| Peak wrist linear velocity | −37 ± 5 | −40 ± 4 | |
| Peak racket-head horizontal velocity | −2 ± 0 | −3 ± 1 | essentially at impact |
| Peak shoulder IR velocity | **+24 ± 11** | +24 ± 13 | IR peaks **after** impact |
| Peak elbow extension velocity | +35 ± 33 | +12 ± 49 | |
| Peak racket-head vertical velocity | +39 ± 6 | +33 ± 8 | upward "brush" continues after contact |

### 2.2 Magnitudes

| Variable | Value | Unit | Population | Status / source |
|---|---|---|---|---|
| Racket-head horizontal velocity (peak) | 33.1 ± 2.4 elite; 31.1 ± 1.9 HP | m/s | Landlinger (above) | verified |
| Racket-head vertical velocity (peak) | 18.7 ± 2.6 elite; 19.2 ± 1.3 HP | m/s | same | verified |
| Peak linear speed: hip / shoulder / elbow / wrist | 1.5 / 3.0 / 6.3 / 11.0 | m/s | elite, same | verified |
| Pelvis angular velocity | 540.5 ± 40.5 | °/s | elite, same | verified |
| Trunk angular velocity | 745.0 ± 82.1 | °/s | elite, same | verified |
| Shoulder IR velocity | 793.7 ± 83.0 (CC ~803–825, DL ~762–780) | °/s | elite, same | verified |
| Elbow extension velocity | 277.5 ± 95.9 | °/s | elite, same | verified |
| Rear-leg extension velocity | −230.2 ± 61.7 | °/s | elite, same | verified |
| Max shoulder alignment | 195.8 ± 10.0 (180 = perpendicular to the baseline, so ≈16° past side-on) | ° | elite, same | verified |
| Max hip alignment | 172.6 ± 9.7 | ° | elite, same | verified |
| Max separation angle | −27.0 ± 8.9 elite; −33.0 ± 9.8 HP | ° | same | verified |
| Max wrist extension | 88.7 ± 10.2 | ° | elite, same | verified |
| Backswing end: hip / shoulder rotation from the baseline; separation | ~90 / ~110; 20–30 | ° | mixed skilled | secondary: Takahashi 1996 via [Reid, Elliott, Crespo 2013](https://www.jssm.org/volume12/iss2/cap/jssm-12-225.pdf) |
| **End of backswing (ISB joint angles)**: shoulder alignment | −92.2 ± 8.8 | ° | elite male, n=6, IMU, match-like CC attacking forehand | verified: [Pedro et al. 2022, PMC8839899](https://pmc.ncbi.nlm.nih.gov/articles/PMC8839899/) |
| separation (toward the dominant side) | 22.1 ± 4.6 | ° | same | verified |
| shoulder flexion / abduction | 12.9 ± 8.3 / 45.1 ± 9.1 | ° | same | verified |
| shoulder rotation (int +/ext −) | −54.5 ± 9.5 | ° | same | verified |
| elbow flexion | 59.7 ± 13.3 | ° | same | verified |
| forearm pronation (+) | 72.8 ± 21.4 | ° | same | verified |
| wrist extension (−) | −18.4 ± 13.6 | ° | same | verified |
| **At impact (ISB)**: shoulder alignment | 19.3 ± 9.4 (≈ parallel to the net) | ° | same | verified |
| separation | −16.5 ± 5.1 (shoulders now ahead of the hips) | ° | same | verified |
| shoulder flexion / abduction | 54.7 ± 14.1 / 47.9 ± 4.6 | ° | same | verified |
| shoulder rotation (int +/ext −) | −84.9 ± 18.8 (sign as published) | ° | same | verified |
| elbow flexion | 66.3 ± 18.9 | ° | same | verified |
| pronation | 28.3 ± 23.0 | ° | same | verified |
| wrist extension | −30.4 ± 13.3 (still extended at impact) | ° | same | verified |
| Racket-centre speed at impact | 21.8 ± 2.2 | m/s | same | verified |
| Contributions to racket speed (anteroposterior) | upper-arm horizontal flexion/abduction 48.1%, elbow extension 17.3%, IR 15.6%, shoulder translation (legs + trunk) 10.4%, hand abduction 6.1%, hand flexion 4.5%, pronation −2.0% | % | same | verified |
| Contributions (older lab data, slow feed) | IR ~35%, horizontal flexion ~25%, hand flexion ~25%, shoulder forward speed ~10% | % | skilled players | secondary: Elliott 1997; Takahashi 1996 via Reid 2013 |
| Elbow angle at impact, eastern / western grip | ~130 / ~100 (included angle) | ° | skilled | secondary: Elliott 1989/1997 via Reid 2013 |
| Impact height, eastern / (semi-)western grip | ~4 cm below hip / ≥6 cm above hip | cm | skilled | secondary: Elliott 1989 via Reid 2013 |
| Swing path at impact: flat / topspin / topspin lob | ~20 / ~40 / ~70 above horizontal | ° | skilled | secondary: Takahashi 1996 via Reid 2013 |
| Swing path, intermediate / advanced topspin | ~20 / ~30 | ° | – | secondary: via Reid 2013 |
| Racket speed, club players | 21–24 | m/s | club | secondary: Blackwell & Knudson 2005 via Reid 2013 |
| Horizontal / vertical racket velocity: flat, topspin, lob | 17/8, 14/12, 9/13 | m/s | skilled (1989 data) | secondary: Elliott 1989 via Reid 2013 |
| Grip force | rises in the last ~50 ms before impact | – | – | secondary: Knudson & White 1989 via Reid 2013 |
| Follow-through end | "3 × 90°" (shoulder abduction, elbow, wrist ≈ 90°); the wrist varies most | – | coaching | qualitative (Reid 2013) |
| Speed scaling (post-impact ball 21.4 → 42.7 m/s) | peak wrist extension +16%, trunk rotation +28%, knee flexion +27%; peak wrist-flexion velocity +118%, trunk rotation velocity +99%, hip extension velocity +143% | % | highly skilled, n=12 | verified: [Seeley et al. 2011](https://pubmed.ncbi.nlm.nih.gov/22303791/) |
| HP vs intermediate | similar joint-angle curves. HP: more extended wrist through the forward swing, more early knee flexion, faster hip/knee angular velocity early and faster wrist velocity near impact | – | male, 9 vs 9 | verified (qualitative result): [Pedro et al. 2026, PMC13075271](https://pmc.ncbi.nlm.nih.gov/articles/PMC13075271/) |
| Open vs square stance | same racket speed; greater shoulder IR and wrist-flexion torques in square stance | – | collegiate | secondary: Bahamonde & Knudson 2003 via Reid 2013 |

**Sequencing summary (forehand).** Hips coil (−243) → shoulders coil (−231) → max X-factor (−168) → max racket lag
(−146) → pelvis peak (−75) → trunk peak (−57) → wrist release from max extension (−55) → shoulder, elbow and wrist
linear peaks (−45, −39, −37) → racket peak (≈0) → IR peak (+24) → elbow extension peak (+35). Gaps are ~18 ms
pelvis→trunk and ~20 ms trunk→arm. **Elite players time the pelvis and trunk peaks ~18 ms later** (closer to impact)
than juniors, and that later timing is the main difference, not bigger angles.

---

## 3. Two-handed backhand (2BH)

| Variable | Value | Unit | Population | Status / source |
|---|---|---|---|---|
| Shoulder alignment at end of backswing, CC / DL | 79.5 ± 11.5 / 87.2 ± 9.5 | ° from the baseline | college male, 2BH n=12 | secondary: [Reid & Elliott 2002](https://pubmed.ncbi.nlm.nih.gov/14658135/) table in [Genevois 2015](https://pmc.ncbi.nlm.nih.gov/articles/PMC4306773/); abstract gives 83.4 overall (verified) |
| Hip alignment at end of backswing, CC / DL | 58.0 ± 8.8 / 68.8 ± 10.8 | ° | same | secondary: same |
| Hip rotation at end of backswing | 117.7 ± 9.3 | ° | collegiate male, n=7 | secondary: Akutagawa & Kojima 2005 via Genevois |
| Onset of horizontal racket acceleration | −80 (1BH −130) | ms | college male, n=18 | verified: Reid & Elliott 2002 abstract |
| Peak horizontal racket velocity | ≈ −5 (same for 1BH) | ms | same | verified |
| Forward swing time | 0.4 ± 0.1 (1BH 0.5 ± 0.1) | s | collegiate male, n=14 | secondary: [Akutagawa & Kojima 2005](https://pubmed.ncbi.nlm.nih.gov/16195030/) via Genevois |
| Pelvis mean angular velocity, forward swing | 538.5 ± 194.8 (1BH 280.7 ± 108.8) | °/s | same | secondary: same |
| Shoulder / hip rotation during acceleration | 71.1 ± 13.8 / 47.4 ± 10.3 (1BH 30.1 / 19.0) | ° | coaches, n=9–10, sponge ball | verified: [Stępień et al. 2011, PMC3588639](https://pmc.ncbi.nlm.nih.gov/articles/PMC3588639/) (via Genevois table) |
| Shoulder / hip rotation during acceleration, male | 85 ± 12 / 59 ± 12 (1BH 51 / 26) | ° | collegiate, 5M | secondary: Fanchiang 2013 via Genevois |
| Separation angle at impact | −6.47 ± 4.31 (shoulders rotate past the hips) | ° | coaches, n=10 | verified: Stępień 2011 |
| Trunk twist range | 29.4 (1BH 20.1); female 40 vs male 26.3 | ° | collegiate | secondary: Fanchiang 2013 via Genevois |
| Impact in front of the hip midpoint / to the side | 0.40 / 0.70 | m | college male | verified: Reid & Elliott 2002 abstract |
| Dominant elbow at impact | more flexed than in 1BH; wrist more extended | – | same | secondary: via Genevois |
| Timing of peak linear speed (% of acceleration phase), dominant arm: hip / shoulder / elbow / wrist | 24 / 55 / 76 / 87 | % | coaches, n=10 | verified: Stępień 2011 Table 2 |
| Same, non-dominant arm | 96 / 100 / 100 / 100 (the top hand peaks at impact: the top hand drives, the bottom hand guides) | % | same | verified |
| Peak wrist speed: dominant / non-dominant | 6.31 / 6.85 (1BH 7.52) | m/s | same (sponge ball, flat) | verified |
| Racket-handle speed from trunk rotation at impact | 2.09 ± 0.50 (1BH 0.94 ± 0.61) | m/s | same | verified |
| Lower body | a large back-leg hip-extension moment drives trunk rotation (like a forehand on the other side) | – | collegiate, n=14 | verified: Akutagawa & Kojima abstract |
| Front foot | ~45° to the baseline in closed stance, to allow rotation | – | clinical advice | qualitative (Ellenbecker 2006 via Genevois) |
| Racket speed | similar to 1BH at the elite level | – | – | verified: Reid & Elliott 2002 |

**Sequencing (2BH).** Hips → shoulders (a big trunk contribution) → arms as a nearly closed chain → racket. The
racket's horizontal acceleration starts late (−80 ms), so the swing is compact and the trunk rotates *through* the
ball (negative separation at impact).

---

## 4. One-handed backhand (topspin, 1BH)

| Variable | Value | Unit | Population | Status / source |
|---|---|---|---|---|
| Shoulder alignment at end of backswing | 119.1 (CC 117.2 ± 7.0, DL 120.9 ± 6.8) | ° from the baseline (past perpendicular: the back is partly turned to the net) | college male, 1BH n=6 | verified (mean): Reid & Elliott 2002 abstract; CC/DL secondary via Genevois |
| Hip alignment at end of backswing | 90.1 ± 15.8 (CC), 88.5 ± 9.4 (DL) | ° | same | secondary: via Genevois |
| Shoulder alignment, topspin CC / DL | 123.0 / 129.1 | ° | state-ranked, n=8 | secondary: Elliott 1989 via Genevois |
| Onset of horizontal racket acceleration | −130 | ms | college male | verified: Reid & Elliott 2002 |
| Forward swing time | 0.5 ± 0.1 | s | collegiate male | secondary: Akutagawa & Kojima via Genevois |
| Separation angle at impact | +9.26 ± 7.26 (shoulders do **not** pass the hips) | ° | coaches, n=10 | verified: Stępień 2011 |
| Impact in front of the hip midpoint / to the side | 0.59 / 0.75 | m | college male | verified: Reid & Elliott 2002 |
| Elbow at impact (included angle) | ≈164 (topspin), ≈170 (backspin): near-straight, not locked | ° | skilled | secondary: Elliott 1989; Reid & Elliott 2002 via Genevois |
| Elbow extension during the acceleration phase | 35.3 ± 14.4; peak velocity just before impact | ° | skilled | secondary: Wang 1998 via Genevois |
| Main shoulder motions | flexion + abduction (topspin); plus external rotation, supported by supraspinatus/infraspinatus EMG | – | – | secondary: King 2011; Ryu 1988 via Genevois |
| Timing of peak linear speed (% of acceleration phase): hip / shoulder / elbow / wrist | 8 / 50 / 70 / 82 | % | coaches, n=10 | verified: Stępień 2011 Table 2 |
| Peak linear speed: hip / shoulder / elbow / wrist | 0.45 / 0.90 / 3.77 / 7.52 | m/s | same (sponge ball) | verified |
| Wrist at impact | extended (a flexed wrist is linked to tennis elbow) | – | clinical | secondary: Blackwell & Cole 1994 via Genevois |
| Lower body | a large front-leg hip adduction moment drives trunk rotation | – | collegiate | verified: Akutagawa & Kojima abstract |
| Sex difference | females use ~10% more hip and shoulder rotation | – | collegiate | secondary: Fanchiang 2013 via Genevois |

**Sequencing (1BH).** A clean proximal-to-distal chain of hips → shoulders → upper arm → forearm → hand/racket, with
each peak earlier than in the 2BH. The trunk rotates less and stops ("stable trunk"). The arm makes the speed with a
longer lever.

---

## 5. Backhand slice (one-handed backspin)

| Variable | Value | Unit | Population | Status / source |
|---|---|---|---|---|
| Shoulder alignment at end of backswing (DL) | ≈130 | ° from the baseline | high-performance male, n=13 | secondary: [Elliott & Christmass 1995](https://pubmed.ncbi.nlm.nih.gov/7595982/) via Genevois |
| Test ball heights | low: 5.4 cm below hip; high: 41.6 cm above hip | cm | same | verified: abstract |
| Adjustments for a high ball | more upright trunk, more rotated shoulders, larger front-knee angle, more abducted upper arm, flatter racket approach, more vertical racket face | – | same | verified: abstract |
| Trunk + upper-arm contribution to racket speed | ~15 | % | same | secondary: via Genevois |
| Elbow-extension contribution | ~25 | % | same | secondary: via Genevois |
| Elbow at impact | ≈170 (included angle) | ° | skilled | secondary: via Genevois |
| Main shoulder motions | extension + abduction (topspin 1BH: flexion + abduction) | – | – | secondary: King 2011 via Genevois |
| Trunk | stable at impact; shoulder alignment roughly constant into early follow-through | – | HP male | secondary: via Genevois |
| Impact position | further back than topspin 1BH (continental grip) | – | – | secondary: via Genevois |
| Racket speed | similar to topspin 1BH | – | – | secondary: via Genevois |
| Split-step response time after the opponent's slice | FH slice 0.369 s, BH slice 0.339 s | s | ATP + junior, 8,545 strokes | verified: [Filipčič 2017, PMC5304278](https://pmc.ncbi.nlm.nih.gov/articles/PMC5304278/) |

No study found reports slice phase durations or angular-velocity timing. **Gap.** The recommended timing for a slice
clip is derived (section 10).

---

## 6. Volley (forehand / backhand)

| Variable | Value | Unit | Population | Status / source |
|---|---|---|---|---|
| Stroke time (first racket movement → impact), middle ball | 0.466 | s | skilled male, n=15, 21.3 m/s machine feed, 3 m from net | verified: [Chao et al. 2008, ISBS](https://ojs.ub.uni-konstanz.de/cpa/article/view/1922/1790) |
| Stroke time, wide (left) ball | 0.624 | s | same | verified |
| "Pushing" phase (racket start → contralateral foot off) | 0.249 (middle) – 0.418 (left) | s | same | verified |
| Ball speed at impact | 14.6–19.0 | m/s | same | verified |
| Ball height at impact | 107–123 (mean by location) | cm | same | verified |
| Ipsilateral side step used | BH 86%, FH 67% | % | same | verified |
| FH volley shoulder rotation: backswing → impact | −45.8 ± 26.9 → −30.4 ± 15.3 (skilled); −26.4 → −18.7 (less skilled) | ° | 12 skilled / 8 less skilled | verified: [PMC13214886 (Kyoto IT, 2026)](https://pmc.ncbi.nlm.nih.gov/articles/PMC13214886/) |
| FH volley pelvis rotation: backswing → impact | −36.7 ± 20.2 → −35.8 ± 24.0 (the pelvis barely moves) | ° | skilled | verified |
| FH volley racket–forearm angle, backswing / impact | 91.2 ± 3.1 / 90.9 ± 2.1 (held at ~90°) | ° | skilled | verified |
| BH volley shoulder rotation: backswing → impact | −48.5 ± 19.2 → −52.7 ± 23.5 (no forward unwinding) | ° | skilled | verified |
| BH volley pelvis: backswing → impact | −29.6 ± 12.6 → −37.1 ± 24.0 | ° | skilled | verified |
| BH volley shoulder–pelvis twist: backswing → impact | −18.9 ± 13.1 → −15.5 ± 17.3 (twist is held, not released) | ° | skilled (less skilled release it to +10.1) | verified |
| Upper limb + racket | move as a unit with small shoulder/elbow/wrist motion; backswing stays near the hitting shoulder | – | skilled | secondary: Elliott 1988 via Chao |
| Grip / wrist | forearm muscle activity rises only shortly before impact (firm at contact, relaxed before) | – | skilled | secondary: Chow 1999 via Chao |
| Split-step response time before a volley | FH 0.242 s, BH 0.280 s (the shortest of all strokes) | s | ATP + junior | verified: [PMC5304278](https://pmc.ncbi.nlm.nih.gov/articles/PMC5304278/) |
| Player speed at split step before a volley | FH 2.30 ± 1.05, BH 2.37 ± 0.87 | m/s | ATP + junior | verified: [PMC5304280](https://pmc.ncbi.nlm.nih.gov/articles/PMC5304280/) |

---

## 7. Overhead smash

**Major gap.** I found no 3D kinematic study of the *tennis* smash with joint angular velocities or timing. The
nearest sources:

| Variable | Value | Unit | Population | Status / source |
|---|---|---|---|---|
| Soft-tennis smash joint torques | mostly smaller than the tennis serve; match smashes have a shorter forward swing and a clear elbow-extension torque peak | – | East Asian Games players, 13 trials | verified: [Ida et al. 2005](https://pubmed.ncbi.nlm.nih.gov/16498179/) |
| Player speed at split step before a smash | 1.72 ± 0.84 | m/s | ATP + junior, n=18 smashes | verified: [PMC5304280](https://pmc.ncbi.nlm.nih.gov/articles/PMC5304280/) |
| Arm action | same cocking → IR → pronation chain as the serve, with no toss; the racket is taken up early (short backswing) while the player moves sideways under the ball | – | – | qualitative / unverified (coaching) |

Animation advice: reuse the serve curves from TP onwards (section 1), with a shorter preparation. See section 10.

---

## 8. Return of serve

| Variable | Value | Unit | Population | Status / source |
|---|---|---|---|---|
| Serve speed tested | 130–140 (low), 160–170 (high) | km/h | forehand returns; 15 advanced vs 15 intermediate male, 120 Hz | verified: [Zhang & Chen 2024, Sci Rep, PMC11535041](https://pmc.ncbi.nlm.nih.gov/articles/PMC11535041/) |
| Return ball speed, advanced | 133.0 ± 32.0 (low), 136.3 ± 26.2 (high) | km/h | same | verified |
| Return ball speed, intermediate | 109.0 ± 20.0 / 106.4 ± 21.3 | km/h | same | verified |
| End of backswing (from trial start) | 0.81 ± 0.23 (low) → 0.65 ± 0.19 (high) | s | advanced | verified: the backswing ends earlier against faster serves |
| Peak racket velocity (from trial start) | 0.45 ± 0.15 / 0.44 ± 0.07 | s | advanced | verified (the time base in the paper is unclear; use only as a relative value) |
| Racket resultant speed at impact | 30.2 ± 10.6 (low), 26.3 ± 5.2 (high) | m/s | advanced | verified |
| Racket speed at impact, intermediate | 20.3 ± 2.9 / 22.3 ± 8.6 | m/s | intermediate | verified |
| Trunk rotation at end of backswing | 15.5 ± 13.4 / 19.4 ± 15.3 (small; intermediate 1.9 on fast serves) | ° | advanced | verified |
| Shoulder abduction at impact | 49.3 ± 12.2 / 39.7 ± 10.8 | ° | advanced | verified |
| Wrist extension at impact | 65.6 ± 18.7 / 69.1 ± 14.6 (intermediate 50.1 / 43.8) | ° | advanced | verified |
| Split step | started around the server's racket–ball contact; landing when early ball-flight information is available. Players with stiffer legs step laterally later. | – | ATP/WTA/ITF world-class | verified (qualitative): [Mecheri et al. 2019](https://pubmed.ncbi.nlm.nih.gov/31030639/) |
| Split-step response time in return situations | 0.281 (ATP) | s after the server's impact | ATP male, n=7; 25 Hz video | verified: [PMC5304278](https://pmc.ncbi.nlm.nih.gov/articles/PMC5304278/) |
| Player speed during split step, return situations | 1.07 ± 0.60 (ATP) | m/s | ATP | verified: [PMC5304280](https://pmc.ncbi.nlm.nih.gov/articles/PMC5304280/) |

Qualitative: returns use a shortened backswing (unit turn with little arm take-back), especially on fast serves.
Advanced players keep more wrist extension (racket lag) at impact.

---

## 9. Split step, first step, recovery

| Variable | Value | Unit | Population | Status / source |
|---|---|---|---|---|
| Split step used | 82.9% of shots | % | 7 ATP, 11 boys U14, 10 girls U14 | verified: [Filipčič 2017b, PMC5304280](https://pmc.ncbi.nlm.nih.gov/articles/PMC5304280/) |
| Split-step timing (opponent impact → split step), all situations | ATP 0.306 ± 0.062; girls 0.297 ± 0.106; boys 0.354 ± 0.147 | s | 8,545 strokes, 25 Hz (±40 ms resolution) | verified: [Filipčič 2017a, PMC5304278](https://pmc.ncbi.nlm.nih.gov/articles/PMC5304278/) |
| Timing by the opponent's shot (group labels as in the paper): 1st / 2nd serve | 0.300 / 0.334 | s | same | verified |
| Timing: FH / BH topspin rally | 0.315 / 0.333 | s | same | verified |
| Timing: FH / BH volley | 0.242 / 0.280 | s | same | verified |
| Player speed during split step: serve / return / baseline / net situations (ATP) | 1.13 / 1.07 / 1.55 / 1.86 | m/s | ATP | verified: PMC5304280 |
| Speed before → after split step, baseline (ATP) | 1.57 ± 0.90 → 1.66 ± 1.00 | m/s | ATP | verified |
| The split step shortens total reach time | 764 ± 106 vs 868 ± 63 ms without it | ms | collegiate male, n=10, lab choice-reaction task | verified: [Uzu et al. 2009](https://pubmed.ncbi.nlm.nih.gov/19735035/) |
| Best landing time | landing within the player's mean ± SD response time after the direction cue. Landing earlier gives faster steps but 7.8% misses; in-window gives 0.8% error. | – | same | verified: abstract. (The "~180 ms after the cue" figure seen in summaries: **unverified**) |
| Distance covered per groundstroke | ~70% of elite groundstrokes need 3–4 m of movement | – | elite | secondary: via Reid 2013 |
| Groundstrokes under time pressure | ~45% on hard courts, ~30% on clay | % | elite | secondary: Weber 2007 via Reid 2013 |
| Split-step flight time, first-step type (open / crossover / gravity step), recovery step pattern | – | – | – | **gap**: no verified numbers found; qualitative coaching only |

---

## 10. Implications for animation

### 10.1 Curve shapes

- **Proximal joints are smooth.** Pelvis, trunk, knees and hips have bell-shaped velocity profiles: angle curves that
  ease in and out over 150–300 ms (forehand coil to peak pelvis ≈ 170 ms; serve TP to impact ≈ 350 ms). Author them
  as broad S-curves, with the velocity peak about 60–75 ms before impact on groundstrokes.
- **Distal joints whip.** Elbow extension, wrist flexion, pronation and shoulder IR have narrow, late peaks. Most of
  their range is used in the last 40–60 ms (forehand wrist release from −55 ms; serve IR 1400–2400 °/s at impact).
  Author these as a **held pose followed by a fast release** (ease-in hard, near-linear through impact), not a
  symmetric ease.
- **Each segment's peak comes ~15–25 ms after the previous one** on groundstrokes (pelvis −75 → trunk −57 → arm
  ≈ −40). If all joints peak together, the motion looks robotic. That is the main visual cue of a real kinetic chain.
- **The racket lags the hand.** Forehand: maximum racket rotation behind the body at −146 ms, maximum wrist extension
  at −55 ms, then release. Serve: the racket drops behind the back (max ER 172°, elbow 104°, wrist extension 66°) at
  ≈ −90 to −130 ms, then turns over. Drive the racket from the wrist and forearm angles with that lag. **Do not** IK
  the racket head to a target path.
- **Long-axis rotation continues after impact.** Forehand IR peaks +24 ms and elbow extension +35 ms *after* contact;
  vertical racket speed peaks +39 ms. Serve IR and pronation keep going into the follow-through. Do not stop the arm at
  contact.
- **Deceleration is longer than acceleration.** The follow-through is the "most violent" phase in eccentric load
  (Kovacs). Use a long ease-out: 2–3× the acceleration time (derived guideline, unverified).
- **Legs lead.** Serve lead-knee extension peaks at −180 ms, before the trunk. On fast serves the centre of mass is
  still rising at impact (+0.3 m/s).
- **Two-hander vs one-hander.** The 2BH is compact and trunk-driven, with late racket acceleration (−80 ms) and the
  shoulders passing the hips (separation −6°). The 1BH is longer, arm-driven and earlier (−130 ms): the trunk stops
  (separation +9°) and the arm swings out to a near-straight elbow (~164°).

### 10.2 Suggested keyframes (t = 0 at impact)

Rows marked **M** come from measurements (section references). Rows marked **D** are derived or interpolated by me
and should be tuned by eye. Fractions are of the whole clip.

**Serve, flat.** Clip = −970 ms (ball release) → +300 ms (D, finish). Length 1.27 s.

| Key | t (ms) | Fraction | Pose / curve note | Src |
|---|---|---|---|---|
| Ball release | −970 | 0.00 | arms rising together, knees starting to flex | M (1.1) |
| Trophy / max knee flexion | −350 | 0.49 | back knee ~80°, front >15°, shoulder/pelvis tilted back, racket high | M |
| Lead-knee extension peak | −180 | 0.62 | legs drive; racket starts to drop | M |
| Racket low point / max ER | −130 → −90 | 0.66–0.69 | ER 172°, abduction 101°, elbow 104°, wrist extension 66°; racket parallel to the spine | M |
| Upper-torso velocity peak | −58 | 0.72 | trunk tilt (shoulder over shoulder) and rotation near peak; pelvis peaks close by (±30 ms) | M |
| Elbow-extension and wrist-flexion peaks | −30 → −10 | 0.74–0.76 | fast release | D (order M, timing D) |
| Impact | 0 | 0.76 | arm abduction ~100°, elbow ~15–20° flexion, wrist ~15° extension, trunk 48° above horizontal, front knee ~24°, body airborne | M |
| IR/pronation continue | 0 → +60 | 0.76–0.81 | racket face turns out (palm away) | D |
| Landing on the front foot, finish | +300 | 1.00 | the arm wraps across the body | D |

For a **kick serve**: toss and racket further behind and inside (≈9 cm posterior, 21 cm medial relative to the
shoulder); swing path more lateral (brushing up and to the side); same racket speed and timing (M, Sheets 2011).

**Forehand, open/semi-open topspin.** Clip = −700 (D, unit turn start) → +250 ms (D, finish). Length 0.95 s.

| Key | t (ms) | Fraction | Pose / curve note | Src |
|---|---|---|---|---|
| Unit turn starts | −700 | 0.00 | shoulders and racket turn together | D (backswing length not measured for elite players) |
| Max hip coil | −243 | 0.48 | hips ~90° to the baseline | M |
| Max shoulder coil / backswing end | −231 | 0.49 | shoulders ~110° (≈16° past side-on), separation 20–30°, elbow ~60° flexion, pronation ~70°, wrist extension ~20° | M |
| Forward swing starts | −259 → −230 | 0.47–0.49 | hips unwind first while the shoulders are still turning | M |
| Max X-factor | −168 | 0.56 | separation max (~27°) | M |
| Max racket lag | −146 | 0.58 | racket furthest back relative to the body (dropped, "slot") | M |
| Pelvis velocity peak | −75 | 0.66 | ~540 °/s | M |
| Trunk velocity peak | −57 | 0.68 | ~745 °/s | M |
| Max wrist extension (lag) → release | −55 | 0.68 | wrist ~89° extension, then release | M |
| Arm linear peaks | −45 → −37 | 0.69–0.70 | shoulder, then elbow, then wrist | M |
| Impact | 0 | 0.74 | shoulders ~parallel to the net (≈19°), separation −16°, elbow ~66° flexion (semi-western), wrist still extended ~30°, contact ≥ hip height, in front | M |
| IR peak; elbow-extension peak | +24; +35 | 0.76–0.77 | racket rises steeply (path ~30–40°) | M |
| End of forward racket travel | +65 | 0.80 | – | M |
| Wrap finish | +250 | 1.00 | "3 × 90°" over the opposite shoulder | D / qualitative |

**Two-handed backhand.** Clip = −700 (D) → +250 (D).

| Key | t (ms) | Fraction | Note | Src |
|---|---|---|---|---|
| Unit turn start | −700 | 0.00 | – | D |
| Backswing end: hips ~60°, shoulders ~80–87° from the baseline | −400 | 0.32 | forward swing 0.4 s | M (duration) |
| Hip-speed peak | ≈ −300 | 0.42 | 24% of acceleration × 400 ms | D (from Stępień %) |
| Shoulder-speed peak | ≈ −180 | 0.54 | 55% | D |
| Racket horizontal acceleration starts | −80 | 0.65 | late, compact | M |
| Dominant elbow / wrist peaks | ≈ −95 / −50 | 0.64 / 0.68 | top (non-dominant) hand keeps accelerating to impact | D |
| Impact | 0 | 0.74 | ~0.40 m in front of the hips, 0.70 m to the side; shoulders past the hips (−6°) | M |
| Finish | +250 | 1.00 | both hands over the shoulder | D |

**One-handed backhand (topspin).** Clip = −800 (D) → +250 (D). Forward swing 0.5 s (M). Backswing end −500 (shoulders
~120° from the baseline). Hip peak ≈ −460, shoulder ≈ −250, elbow ≈ −150, wrist ≈ −90 (D, from Stępień's 8/50/70/82%
× 500 ms). Racket acceleration starts −130 (M). Impact 0: 0.59 m in front of the hips, elbow ~164°, wrist extended,
separation +9° (M). Trunk stops at impact. The arm then continues up and out while the non-hitting arm moves back for
balance (qualitative).

**Backhand slice.** Use the 1BH layout with these changes: shoulders ~130° at the end of the backswing (secondary); a
high-to-low path with an open, vertical-ish face; shoulder extension + abduction instead of flexion; a stable trunk
from −100 ms to +100 ms; impact slightly further back than topspin; follow-through forward and low. Timing is the same
as 1BH (D, no timing data).

**Volley.** Clip ≈ 0.6 s (M: 0.466 s from racket start to impact for a middle ball, +~0.1 s follow). Keys: split-step
landing ≈ −550 (D); racket set near the shoulder with the racket–forearm angle fixed at ~90° from the start (M); a
short forward push; FH shoulders unwind ~15° (−46° → −30°); BH shoulders **do not** unwind and the twist is held (M).
Grip and wrist firm only in the last ~50 ms (qualitative). The step onto the front or ipsilateral foot lands at or just
before impact (qualitative).

**Overhead smash.** Unverified and derived. Take the serve from trophy to finish (−350 → +300 ms) and replace
"release → trophy" with a side-shuffle while the racket is raised early and the free arm points at the ball. Use
~80–90% of serve joint speeds (Ida 2005: torques lower than the serve).

**Return of serve.** Split-step unweighting ≈ at the server's impact, landing ≈ +250–300 ms after it (M, Filipčič
0.28 s; Mecheri qualitative). Then a shortened forehand/backhand: skip the unit-turn key, backswing ≈ 60% of the rally
amplitude (D), trunk turn ~15–20° (M), and contact at the same keys from −150 ms onward.

**Split step (standalone).** Unweight (small hop) starts ≈ at the opponent's contact. Land ≈ 240–330 ms later (M).
Land on the balls of the feet with knees flexed, with a speed of ~1–2 m/s already in progress (M). The first lateral
step follows immediately (D). Recovery steps have no data (gap). Use side shuffles with the centre of mass kept low
(qualitative).

---

## 11. Biggest gaps and cautions

1. **Smash, slice and volley timing**: no peak-velocity timing data found. Keyframes above are derived.
2. **Backswing duration for elite groundstrokes** (unit turn → forward swing start) is not reported. −700 ms is a
   guess; tune it by eye or from video.
3. **Footwork** (split-step flight time, first-step types, recovery) has frequency and speed data only. No joint
   kinematics.
4. **Serve**: the Fleisig SDs and the max-ER timing are quoted via Kovacs; the original is paywalled. The IMU
   upper-arm peak timing (+125 ms after the trunk) does not fit the lab IR peak at impact. Treat the lab data as the
   reference for animation.
5. **Angle conventions** differ. Landlinger/Reid use baseline-referenced alignment angles (180 = side-on); Pedro/ISB
   use joint angles from anatomical zero. Convert before mixing.
6. Not accessed: ITF *Biomechanics of Advanced Tennis* (Elliott, Reid, Crespo 2003, a book), Knudson *Biomechanical
   principles of tennis technique* (book), Brian Gordon's forehand work (only coaching articles online; no peer-reviewed
   numbers retrieved), Kibler's papers beyond what Kovacs quotes, and Rota/Genevois wrist papers.

---

## Bibliography

Serve
- Fleisig G, Nicholls R, Elliott B, Escamilla R (2003). Kinematics used by world class tennis players to produce
  high-velocity serves. *Sports Biomechanics* 2(1):51–64. Abstract:
  https://research-repository.uwa.edu.au/en/publications/kinematics-used-by-word-class-tennis-players-to-produce-high-velo/
  · PubMed https://pubmed.ncbi.nlm.nih.gov/14658245/
- Kovacs M, Ellenbecker T (2011). An 8-stage model for evaluating the tennis serve. *Sports Health* 3(6):504–513.
  https://pmc.ncbi.nlm.nih.gov/articles/PMC3445225/
- Elliott B, Marshall R, Noffal G (1995). Contributions of upper limb segment rotations during the power serve in
  tennis. *J Appl Biomech* 11(4):433–442.
  https://research-repository.uwa.edu.au/en/publications/contributions-of-upper-limb-segment-rotations-during-the-power-se/
- Reid M, Elliott B, Alderson J (2008). Lower-limb coordination and shoulder joint mechanics in the tennis serve.
  *Med Sci Sports Exerc* 40(2). https://pubmed.ncbi.nlm.nih.gov/18202570/
- Sheets AL et al. (2011). Kinematics differences between the flat, kick, and slice serves measured using a
  markerless motion capture method. *Ann Biomed Eng*. https://pubmed.ncbi.nlm.nih.gov/21984513/
- van Trigt B et al. (2025). Uncovering the hidden mechanics of upper body rotations in tennis serves using wearable
  sensors on Dutch professional players. *Front Sports Act Living*. https://pmc.ncbi.nlm.nih.gov/articles/PMC11746891/
- Martin C, Bideau B, Delamarche P, Kulpa R (2016). Influence of a prolonged tennis match play on serve biomechanics.
  *PLoS One* 11(8):e0159979. https://pmc.ncbi.nlm.nih.gov/articles/PMC4993075/
- Newton O, Girard O, Chin A, Reid M (2025). The hidden link in the kinematic chain: the influence of the tossing arm on
  head and serve kinematics in tennis. *Eur J Sport Sci* 25(8):e70022. https://pmc.ncbi.nlm.nih.gov/articles/PMC12294548/
- Are there kinematic and kinetic parameters correlated with racket velocity during the tennis serve? (2024).
  *Front Sports Act Living*. https://pmc.ncbi.nlm.nih.gov/articles/PMC11496077/
- Kinematics characteristics of key point of interest during tennis serve: a systematic review and meta-analysis
  (2024). *Front Sports Act Living*. https://pmc.ncbi.nlm.nih.gov/articles/PMC11260724/
- Influence of anthropometric, ball impact and landing location parameters on serve velocity in elite tennis
  competition (Foxtenn data, ATP event). https://pmc.ncbi.nlm.nih.gov/articles/PMC9806764/
- The role of toss zenith and impact height in the relationship between shoulder rotation strength and serve speed in
  junior tennis players (2025). https://pmc.ncbi.nlm.nih.gov/articles/PMC12641958/
- Whiteside D, Elliott B, Lay B, Reid M (2013). A kinematic comparison of successful and unsuccessful tennis serves
  across the elite development pathway. *Hum Mov Sci*. https://doi.org/10.1016/j.humov.2013.06.003 (event definitions)

Forehand
- Landlinger J, Lindinger S, Stöggl T, Wagner H, Müller E (2010). Key factors and timing patterns in the tennis
  forehand of different skill levels. *J Sports Sci Med* 9:643–651.
  https://www.jssm.org/volume09/iss4/cap/jssm-09-643.pdf
- Reid M, Elliott B, Crespo M (2013). Mechanics and learning practices associated with the tennis forehand: a review.
  *J Sports Sci Med* 12:225–231. https://www.jssm.org/volume12/iss2/cap/jssm-12-225.pdf
- Pedro B et al. (2022). Evaluation of upper limb joint contribution to racket head speed in elite tennis players using
  IMU sensors. *Sensors* 22(3):1283. https://pmc.ncbi.nlm.nih.gov/articles/PMC8839899/
- Pedro B, Cabral S, João F, Lei AMK, Veloso AP (2026). Kinematic and muscle activation differences between
  high-performance and intermediate tennis players during the forehand drive. *Sensors* 26(7):2244.
  https://pmc.ncbi.nlm.nih.gov/articles/PMC13075271/
- Seeley MK et al. (2011). Tennis forehand kinematics change as post-impact ball speed is altered. *Sports Biomech*.
  https://pubmed.ncbi.nlm.nih.gov/22303791/

Backhands and slice
- Genevois C, Reid M, Rogowski I, Crespo M (2015). Performance factors related to the different tennis backhand
  groundstrokes: a review. *J Sports Sci Med* 14:194–202. https://pmc.ncbi.nlm.nih.gov/articles/PMC4306773/ ·
  PDF https://www.jssm.org/volume14/iss1/cap/jssm-14-194.pdf
- Reid M, Elliott B (2002). The one- and two-handed backhands in tennis. *Sports Biomech* 1(1).
  https://pubmed.ncbi.nlm.nih.gov/14658135/
- Stępień A, Bober T, Zawadzki J (2011). The kinematics of trunk and upper extremities in one-handed and two-handed
  backhand stroke. *J Hum Kinet* 30:37–47. https://pmc.ncbi.nlm.nih.gov/articles/PMC3588639/
- Akutagawa S, Kojima T (2005). Trunk rotation torques through the hip joints during the one- and two-handed backhand
  tennis strokes. *J Sports Sci* 23(8). https://pubmed.ncbi.nlm.nih.gov/16195030/
- Elliott B, Christmass M (1995). A comparison of the high and low backspin backhand drives in tennis using different
  grips. *J Sports Sci* 13(2):141–151. https://pubmed.ncbi.nlm.nih.gov/7595982/

Volley, smash, return
- Chao H-W et al. (2008). Kinematic analysis of tennis volley. ISBS Conference, Seoul.
  https://ojs.ub.uni-konstanz.de/cpa/article/view/1922/1790
- Analysis of upper-limb movement characteristics in tennis volleys based on skill-level differences: kinematic
  features of the backhand versus forehand volley (2026). MDPI journal, 2026.
  https://pmc.ncbi.nlm.nih.gov/articles/PMC13214886/
- Ida H, Kusubori S, Ishii M (2005). Kinematics and kinetics of the racket-arm during the soft-tennis smash under
  match conditions. *J Appl Biomech* 21(4). https://pubmed.ncbi.nlm.nih.gov/16498179/
- Zhang Y, Chen Z (2024). Kinematic differences in forehand serve-receiving techniques of the male tennis players at
  low and high-speed serves. *Sci Rep* 14:26586. https://pmc.ncbi.nlm.nih.gov/articles/PMC11535041/

Footwork
- Filipčič A, Leskošek B, Filipčič T (2017). Split-step timing of professional and junior tennis players.
  *J Hum Kinet* 55:97–105. https://pmc.ncbi.nlm.nih.gov/articles/PMC5304278/
- Filipčič A et al. (2017). Differences in movement speed before and after a split-step between professional and
  junior tennis players. *J Hum Kinet* 55:117–125. https://pmc.ncbi.nlm.nih.gov/articles/PMC5304280/
- Uzu R, Shinya M, Oda S (2009). A split-step shortens the time to perform a choice reaction step-and-reach movement in
  a simulated tennis task. *J Sports Sci* 27(12). https://pubmed.ncbi.nlm.nih.gov/19735035/
- Mecheri S et al. (2019). Relationship between split-step timing and leg stiffness in world-class tennis players when
  returning fast serves. *J Sports Sci* 37(17). https://pubmed.ncbi.nlm.nih.gov/31030639/
