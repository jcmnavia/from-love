# Animation engine audit (2026-09-22)

Why the player still does not look human after the smoothing pass, in order of impact.

## 1. Poses are authored as hand targets, not joints
Every key places the hands (`rHand`, `lHand`) in space plus an elbow hint (`rPole`) and, separately, the racket's direction and face (`racketDir`, `racketNormal`). The arm is then solved backwards with IK. Consequences:
- The racket orientation is independent of the arm, so the wrist is forced into whatever angle joins them. There is no wrist joint and no limit, so extension/flexion and pronation can take any value, including anatomically impossible ones. This is the single biggest source of "weird" arms.
- Forearm pronation, the key of the serve and the forehand wiper, is not modelled; `SkinnedPlayer` fakes it by splitting the hand's roll 50/50 with the forearm.
- Shoulder external/internal rotation (170° max ER in the serve, the whip of every stroke) cannot be expressed at all.
- Biomechanics literature reports joint angles and angular velocities; hand targets cannot be checked against it.

## 2. Two skeletons that disagree
The solver has its own body (`BODY` in `solver.ts`: 30 cm upper arm, 27 cm forearm, 56 cm trunk). The mesh (Mixamo rig) has different proportions (torso ~10 cm shorter). `SkinnedPlayer` re-runs a second IK to reconcile them, so the mesh arm extends more than the solver's arm and the elbow drifts from where the solver put it. The capsule mannequin and the skinned model therefore move differently.

## 3. No kinetic-chain timing
Every channel of a key changes together; the only way to make hips lead shoulders lead arm lead racket is to add more keys. Real strokes are a proximal-to-distal wave (pelvis peak → trunk → shoulder → elbow → wrist, each tens of ms apart). Our strokes have no concept of per-joint delay, so the whole body arrives at each key at once — the "puppet" look.

## 4. No joint limits or rest behaviour
Nothing stops a knee hyperextending, a shoulder rotating through the torso, the spine twisting 90° in one segment, or the free arm hanging stiff. There is no secondary motion (free arm swing, head stabilisation lag, shirt).

## 5. Spine and shoulders are rigid blocks
Pelvis + one chest rotation (now split 40/60). No clavicle elevation/protraction, so reaching and the trophy position look shrugged or flat.

## Direction for the refactor
One skeleton (the mesh's), forward kinematics from joint angles as the primary representation, per-joint timing relative to impact, anatomical joint limits, IK only where contact matters (planted feet, second hand on a two-handed grip), and the racket rigidly attached to the hand through a grip transform so its orientation *emerges* from forearm, pronation and wrist angles instead of being authored.
