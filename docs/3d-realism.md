# Making the player "more precise and more human"

Status: research + a working prototype (`model: 'skinned'` in the studio store). Written 2026-09-19.

The product owner's two complaints are separate problems and need separate fixes:

1. **"Looks toonish"** – a rendering problem. Capsule mannequin, flat lighting, no environment reflections, hard shadows.
   Fix: a real skinned humanoid mesh + PBR lighting. Cheap, done this week (see Part 2 below and the prototype).
2. **"Strokes look weird"** – a motion problem. Hand-authored keyframes moving 15 joints with a two-bone IK solver cannot
   produce the timing, weight shift and secondary motion a human eye expects. Fix: real motion data (mocap or
   video-derived), retargeted onto the same rig. Slower, but the humanoid from step 1 is the prerequisite for it.

"Build models in another app and reuse them here" is exactly the right instinct. The standard pipeline is: rigged
humanoid (any tool) → GLB with a Mixamo-compatible skeleton → three.js `SkinnedMesh`. Our existing solver can drive that
skeleton today (prototype), and mocap clips can drive it later with `AnimationMixer`. Both routes share the model.

---

## a) Rigged humanoids we can use in a web app

| Option | Licence | Format / rig | Verdict |
| --- | --- | --- | --- |
| **three.js `Xbot.glb` / `Soldier.glb`** ([repo](https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf)) | The three.js repo is MIT, but these two are Mixamo characters ("X Bot", "Y Bot") exported via Blender, so the **Mixamo terms** apply to the asset itself (royalty-free in apps, no redistribution as a standalone asset). Confirmed in the [Mixamo FAQ](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html). | GLB, `mixamorig:` skeleton, 65 bones incl. fingers, 2.9 MB, untextured grey/blue | **Used for the prototype.** Fine for dev and even shipping; not a "real person" look. |
| **Mixamo characters** ([mixamo.com](https://www.mixamo.com)) | Free with an Adobe ID. Royalty-free for personal and commercial apps; must be baked into the product, not re-distributed or used for ML training ([FAQ](https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html), [licence guide](https://www.licenseorg.com/guide/3d-assets/mixamo)). | FBX → Blender → GLB. Same skeleton as Xbot, textured. ~30 stylised-realistic humans. | Good short-term upgrade over Xbot (textured skin/clothes, same code path). |
| **Ready Player Me** | Service **shut down 31 Jan 2026** after the Netflix acquisition ([migration guide](https://avatarsdk.com/blog/2026/07/07/ready-player-me-migration-guide/)). Old exports were CC BY-NC-SA. | – | Not an option any more. |
| **Quaternius** ([site](https://quaternius.com/)) / **Kenney** | **CC0** – the only truly unrestricted option ([Cinevva survey](https://app.cinevva.com/game-assets/free-3d-character-models)). | GLB, Mixamo-compatible rigs, low-poly stylised | Great licence, but explicitly stylised – would keep the "toonish" look. |
| **Meshcapade / SMPL-X** ([smpl licence](https://smpl.is.tue.mpg.de/modellicense.html), [Meshcapade](https://meshcapade.com/smpl/)) | Body model is **non-commercial** unless sublicensed through Meshcapade (paid). Sample textures CC-BY. | SMPL-X mesh + parameters; Meshcapade exports FBX/GLB with Mixamo-like skeletons | Only relevant if we go the video-to-3D route (all those tools output SMPL params). Budget a Meshcapade licence in stage 3. |
| **MakeHuman** ([makehumancommunity.org](http://www.makehumancommunity.org/)) | App is AGPL, **exported characters are CC0**. | Blender export; Mixamo-compatible "game engine" skeleton preset | Free, realistic-ish, fully ours. Good candidate for a bespoke player if we do not want Adobe assets in the build. |
| **Reallusion Character Creator 4/5** ([pricing](https://www.reallusion.com/plan-and-pricing/individual/perpetual)) | Paid, $299+ perpetual; exported characters usable in own apps ([content licence](https://www.reallusion.com/license/content.html)). | FBX/GLB, high quality, tennis clothing packs available | The "AAA" option. Only worth it once motion is solved – a beautiful mesh moving badly is still weird. |

**Recommendation:** keep Xbot for engineering now (already wired). For the user-facing build, either a **Mixamo textured
character** (fastest, zero cost) or a **MakeHuman/Blender** player exported with the Mixamo skeleton (CC0, ours). Both
are drop-in replacements for the prototype because the bone names are identical.

## b) Motion data: real tennis motion we can legally use

**Off-the-shelf clip libraries**

- Mixamo animation library: has "Golf Swing", "Baseball Swing"/"Baseball Hit", and a few racket-like idles, but **no
  tennis set**; the library is wide but shallow per sport ([MoCap Online comparison](https://mocaponline.com/blogs/mocap-news/mixamo-alternatives-character-animations)).
- **Fab "Tennis Shots"** ([listing](https://www.fab.com/listings/78060d27-657b-413d-b442-73f8d18cab75)): 19 tennis shots (forehand, backhand, serve, volley) rigged to the Epic skeleton; retarget to Mixamo in Blender. Price not visible without login (Fab returned 403); typically $10–40 for packs this size.
- **Rokoko**: 12 free sports mocap clips + 263-asset free library, commercial use allowed ([sports pack](https://www.rokoko.com/resources/rokoko-mocap-12-free-sports-animations)). Check contents – no guaranteed tennis.
- **ActorCore** (Reallusion): per-clip $1.50–12, packs $59–200, FBX for Blender/Unity/Unreal ([CG Channel](https://www.cgchannel.com/2022/01/download-28-free-mocap-moves-from-actorcore/)). Search "tennis" there before buying anything else.
- **MoCap Online**: 2,500+ clips in themed packs incl. sports, FBX/Blender formats, free sampler ([site](https://mocaponline.com/)). No dedicated tennis pack found.

**Academic datasets**

- **CMU MoCap** ([mocap.cs.cmu.edu](http://mocap.cs.cmu.edu/)): free, usable in commercial products (not resold as data). Sports subjects exist but tennis coverage is thin/absent; quality is 2000s-era optical.
- **CalTennis** (Caltech, 2026) ([paper](https://arxiv.org/abs/2606.20542), [HF dataset](https://huggingface.co/datasets/demalenk/caltennis)): 51 h, 40 players, 2–6 synced 60 Hz cameras, SMPL fits. **The** tennis dataset. Licence must be checked on the HF page before any product use (academic datasets are usually research-only).
- **AthleticsPose** ([arXiv](https://arxiv.org/pdf/2507.12905)), **SportsPose** ([arXiv](https://arxiv.org/pdf/2304.01865)): sports mocap, research licences. AIST++ is dance only – irrelevant.
- **"Tennis player actions dataset"** ([Data in Brief 2024](https://www.sciencedirect.com/science/article/pii/S2352340924006322)): 2D poses only.

**Video-to-3D route (pro footage → skeleton)**

Tools, all open source, all output SMPL joint rotations:
[MediaPipe Pose / BlazePose GHUM](https://github.com/google-ai-edge/mediapipe/blob/master/docs/solutions/pose.md) (runs in the browser, but no temporal filtering – jittery on fast swings, [paper](https://arxiv.org/pdf/2206.11678)),
[4D-Humans / HMR 2.0](https://github.com/shubham-goel/4D-Humans), WHAM, [GVHMR](https://github.com/zju3dv/GVHMR) (world-grounded, handles the feet/ground contact – best for tennis),
TRAM, SMPLer-X. **Caveat:** the code is MIT/Apache but the SMPL body model they need is non-commercial
([discussion](https://dev.to/arkadiuss/a-3d-body-scan-for-nine-cents-without-smpl-4me1)). Using it to author animation offline that we then retarget onto our own rig is a grey area; a Meshcapade licence removes the doubt.

Concrete pipeline (1–2 days per stroke once set up):

1. Source: 120–240 fps side-on and behind-view footage of a pro (our own filming of a coach is cleanest licence-wise; broadcast footage is copyright – fine for pose extraction research, risky for a product).
2. `GVHMR` (or WHAM) → per-frame SMPL pose + world root trajectory (`.npz`/`.pkl`).
3. Blender: import with the [SMPL Blender add-on](https://github.com/Meshcapade/SMPL_blender_addon) or [CEB 4D Humans add-on](https://github.com/carlosedubarreto/CEB_4d_Humans); clean the root trajectory and foot sliding.
4. Retarget SMPL armature → Mixamo armature with the free [Rokoko Studio Live add-on](https://www.3dsecrets.com/secrets/free-retargeting-addon-rokoko) or [Auto-Rig Pro Remap](https://blendermarket.com/products/auto-rig-pro/) ($50 full tier, more robust). Fix the racket hand with an IK constraint to a racket empty.
5. Export GLB with one `AnimationClip` per stroke (`forehand_topspin`, …). Bake at 60 fps; ~150 KB per 2 s clip.
6. three.js: `AnimationMixer` on the shared skeleton; `mixer.setTime(t)` from our phase timeline.

Keeping our phases and HUD: our `Stroke.phases`, `keyT`, `ball.contactT` stay authored per clip (re-timed to the clip).
Each frame, after `mixer.update`, read `bone.getWorldPosition()` for Hips/Spine2/Shoulders/Hands/Knees/Ankles and the
racket child to fill the same `Solved` struct the HUD, camera and coil dial already consume. Nothing downstream changes.

## c) Rendering realism in three.js (biggest jump per effort first)

1. **Real skinned mesh instead of capsules** – 80 % of the "toon" impression. Done in the prototype.
2. **Image-based lighting**: drei `<Environment preset="city" />` (or a 1–2 MB HDRI in `public/`) gives skin/cloth
   speculars and correct ambient colour. `ACESFilmicToneMapping`, exposure ≈ 1.0–1.2. Done.
3. **Soft shadows**: `PCFSoftShadowMap`, `shadow-radius`, 2048 map, tight frustum; drei `<ContactShadows>` for the
   grounded feel. Done.
4. **PBR materials**: `MeshStandardMaterial` roughness 0.55–0.7 skin, 0.85 cotton, 0.35 racket frame, small
   `envMapIntensity`. Skin subsurface look-alike: `MeshPhysicalMaterial` with `sheen`/`sheenColor` warm tint or
   `transmission` 0 + slight `emissive` in the red channel. Cheap, ~0.5 day.
5. **SSAO**: [N8AO](https://github.com/N8python/n8ao) via `@react-three/postprocessing` (new dependency). Adds
   armpit/neck occlusion; costs ~2 ms on integrated GPUs. Do after 1–4.
6. **Cloth as separate meshes** (shirt/shorts/skirt as their own skinned meshes with their own materials) – comes for
   free from Mixamo/MakeHuman characters; only matters once we have a textured character.
7. Not worth it now: SSR, motion blur, real subsurface scattering, hair cards.

## d) Motion realism without mocap – what the keyframe engine lacks

Missing today: wrist flexion/extension and pronation (the hand is welded to the racket), finger articulation, a spine that
bends as a curve (we have pelvis + one interpolated chest quaternion), clavicle/scapula elevation and protraction, real
weight shift (pelvis moves but knees do not load/unload), anticipation and overshoot (linear-ish monotone interpolation
between sparse keys), secondary motion (head lag, shirt, racket whip), knee valgus / toe direction coupling, foot roll
(heel → ball → toe) and hip-shoulder separation that peaks *before* the racket drop.

Solver additions, roughly in order of visual payoff:

- **Spine as 3 segments** (Spine/Spine1/Spine2): distribute `pelvisQ → chestQ` as slerp 0.25/0.55/1.0 with an added
  forward-lean curve. The Mixamo rig already has these bones; the prototype currently uses 2 quaternions.
- **Clavicles**: raise/protract the shoulder bone toward the hand target (we already shift the shoulder 3.5 cm; convert
  that into a `Shoulder` bone rotation so the mesh deforms instead of stretching).
- **Wrist from racket**: hand bone = `racketQ` × grip offset; forearm twist = roll component of hand vs elbow axis,
  split 60 % forearm / 40 % hand (pronation/supination during the drop and follow-through).
- **Knee/toe coupling**: pole vector from `foot.turn` already does this; add valgus of a few degrees on the loaded leg.
- **Foot roll**: `heel` field → rotate `Foot` about the toe base, not the ankle, when heel > 20°.
- **Timing**: cubic Hermite with overshoot on the racket dir/normal tracks; ease-in on the hips, ease-out on the hand.
- **Head**: already gaze-driven – add a 40–60 ms lag on head yaw for weight.

These are 2–4 days of solver work and make the mannequin *and* the skinned model better, but they will not close the gap
with mocap; they buy time while stage 2 is set up.

## e) Roadmap

| Stage | What | Effort | Result |
| --- | --- | --- | --- |
| **1 – this week** | Skinned humanoid driven by the current solver (prototype in `src/studio/SkinnedPlayer.ts`, toggle `model: 'skinned'`). Finish: forearm twist, 3-segment spine, clavicles, Environment/tone mapping (done), swap Xbot for a textured Mixamo or MakeHuman character. | 3–4 dev-days | Reads as a person; strokes still "authored" |
| **2 – next 2–4 weeks** | Per-stroke animation clips: buy/download tennis packs (Fab/ActorCore) for serve/volley and derive forehand/backhand from filmed footage via GVHMR → Blender → GLB. Play with `AnimationMixer`, sample bones into `Solved` for the HUD. Keep the solver as fallback for strokes without clips. | ~2 days setup + 1–2 days per stroke; $50 Auto-Rig Pro + ~$100 clips | Human timing, weight, whip |
| **3 – later** | Session with a coach in a mocap studio (Rokoko suit rental or optical studio day, ~$500–3k) or licence CalTennis/Meshcapade for a full stroke library, multiple grips and body types. | 1–2 weeks incl. cleanup | Reference-grade demonstrations |

## Prototype status (stage 1, done today)

- `src/studio/SkinnedPlayer.ts` drives `public/models/Xbot.glb` (Mixamo "X Bot" as shipped in the three.js examples;
  Mixamo terms apply, three.js repo itself is MIT) from `Solved` every frame. `StrokeScene.tsx` renders it instead of the
  mannequin when `useStudio().model === 'skinned'`; the default is still `'mannequin'` (a UI toggle is not wired yet).
- Retarget: hips/spine×3/neck/head/feet take the solver quaternions; clavicles follow the chest with a small swing toward
  the arm; arms and legs run a two-bone IK from the *mesh* joint to the solver wrist/ankle so the racket hand and the
  feet land exactly where the mannequin's do; the right hand takes `racketQ` × an eastern-grip offset and feeds half of
  its roll into the forearm. Fingers are curled once into a fist. X-ray, left-handed mirroring, shadows and the racket,
  ball, trail and coil dial all work; one GLB download is shared by every scene (the contact sheet mounts seven).
- Verified in-browser at t = 0, 0.75, 0.9, 1.13, 1.3, 1.65 from side/front/behind/three-quarter cameras against the
  mannequin: limb placement matches. Known gaps: the wrist angle at contact is whatever `racketQ` demands of the solver
  (the mannequin's ball hand hides this), Xbot's torso is ~10 cm shorter than the solver's so the mesh shoulders sit a
  little low, the left hand does not close on the grip for two-handers, and Xbot is a grey robot, not a person.
- Lighting/materials shared by both models: procedural `Environment` (Lightformers, no network), ACES tone mapping,
  PCF shadows with a tight frustum, `ContactShadows` under the player.

## Motion engine pass (2026-09-22)

Measured with `npx tsx scripts/motion-report.ts` (240 fps, through the studio runtime). Causes found and fixed:

| Problem | Cause | Fix |
| --- | --- | --- |
| Forearm folding flat onto the upper arm (inner elbow 8–13°) | two-bone IK had no joint limit | soft minimum inner angle of 38° (`MIN_JOINT_ANGLE`, exponential knee so the wrist never kinks) |
| Elbow "snaps" straight at full extension | reach hard-clamped at 98.5 % | soft IK: the last 8 % of reach is eased exponentially (`SOFT_REACH`) |
| Elbow whipping round (peaks of 4,750–27,000 m/s²) | bend plane undefined when the arm lines up with its pole vector | fallback pole blend + the elbow bend direction is baked per stroke at 240 Hz and smoothed with a zero-phase Gaussian (σ 40 ms) in `StrokeRuntime` |
| Hand braking into every keyframe | Fritsch–Carlson tangents (harmonic mean, zeroed at extrema) on every channel | limited Bessel tangents for the upper body; monotone kept only for the feet and the left-hand attach blend |
| Racket face twisting through edge-on | handle and face vectors interpolated component-wise | racket orientation interpolated as a quaternion (hemisphere-aligned Hermite) |

Result, old → new: forehand peak elbow acceleration 236 → 159 m/s² and wrist jerk 2,738 → 1,853; tweener 27,199 → 89 m/s²; swing volley 4,750 → 493 m/s²; no stroke folds the elbow below 38°.

**Athlete model.** `public/models/athlete.glb` (1.9 MB) is built by `npx tsx scripts/build-athlete.ts` from the Mixamo X Bot: same skeleton and bind pose, the robot materials replaced by one vertex-coloured material painted by anatomy (skin, hair, short-sleeved shirt, shorts, socks, shoes with sole), classified per vertex by its dominant bone and position along that bone. It is now the studio's default body; the capsule mannequin stays under More → Body. To go further, open the GLB in Blender, sculpt/retexture on the same armature and export over the file; the retargeting needs no change as long as the Mixamo bone names are kept.
