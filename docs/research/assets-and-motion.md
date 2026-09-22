# Assets and motion for a human-looking player

Research, 2026-09-22. This follows on from `docs/3d-realism.md`, which covers rendering, the Mixamo/MakeHuman/Reallusion
overview, the video-to-3D idea and the stage 1–3 roadmap. None of that is repeated here. This round checked every licence
on the asset's own page or repo (quoted below), converted and loaded the best candidate, and **drove it with our solver in
the running studio**. The recommendation is at the end.

Candidate files downloaded to `public/models/candidates/` (nothing else in the repo was touched):

| File | Size | What | Licence |
| --- | --- | --- | --- |
| `rocketbox-sports-male-04.glb` | 1.40 MB | Microsoft Rocketbox `Sports_Male_04` (tank top, white shorts, running shoes), converted by us: 7,520 tris, 84 bones renamed to `mixamorig:*` and re-parented to the Mixamo hierarchy, 1024² JPEG colour + normal maps | MIT |
| `rocketbox-sports-male-04.fbx` | 0.54 MB | The original FBX (3ds Max Biped rig, `Bip01 *` bones), untouched | MIT |
| `LICENSE-rocketbox.txt` | 1 KB | The MIT notice, which has to ship with the model | – |
| `tennis-mocap-astrejos-forehand.bvh` | 2.26 MB | Real optical mocap of a Colombian league player hitting about 9 forehands in 30 s (100 Hz, 18 joints) | CC BY-SA 3.0 |
| `LICENSE-tennis-mocap.txt` | 1 KB | Attribution and ShareAlike note | – |

---

## 1. Base human meshes

### 1.1 Comparison

"Realism" is scored 1–5, where 5 means it reads as a real person at studio camera distance. "Effort" is the work needed to
get it into `SkinnedPlayer` with its textures.

| Candidate | Licence (verified) | Tris / rig | Textures / clothing | GLB size | Realism | Effort |
| --- | --- | --- | --- | --- | --- | --- |
| **Microsoft Rocketbox** `Sports_Male_04` ([repo](https://github.com/microsoft/Microsoft-Rocketbox/tree/master/Assets/Avatars/Professions/Sports_Male_04)) | **MIT**. Repo `LICENSE.md` is the standard MIT text, and the README says: *"12/2020: Updated license to MIT."* and *"The library of avatars is now released under MIT License."* | 7.5k tris (the FBX ships only the `hipoly` LOD, 22,560 render verts). 3ds Max Biped: `Bip01 Pelvis/Spine/Spine1/Spine2/Neck/Head`, `L/R Clavicle/UpperArm/Forearm/Hand/Thigh/Calf/Foot/Toe0`, 5×3 fingers, 28 facial bones. A-pose. | Diffuse, normal and specular maps for the body and head, each a 2048² TGA (12.6 MB apiece). Photographic skin and face. Sleeveless athletic top, shorts, running shoes. | **1.40 MB** after conversion (1024² JPEGs) | **4** | **Low. Done, see 1.3.** |
| Rocketbox, other sports avatars | MIT | same rig | `Sports_Male_01`: swim trunks. `_02`/`_03`: football kit with a fake sponsor logo. `Sports_Female_01`: bikini. `Sports_Female_02`: tank top + cargo trousers + trainers (the closest female, but the trousers need replacing). None of the 17 `Female_Adult_*` wear sportswear (checked every preview). | – | 4 | Low for male, medium for female (repaint the trousers into a skirt or shorts in Blender) |
| **MPFB2 / MakeHuman** ([LICENSE.md](https://github.com/makehumancommunity/mpfb2/blob/master/LICENSE.md)) | Code GPLv3. Assets **CC0**: *"These assets have been released under CC0 1.0 Universal"* (base mesh, targets, skins, clothes, rigs). Output: *"the MakeHuman team makes no claim whatsoever over output such as: Exports to files (FBX, OBJ, DAE, MHX2...)"*. Community asset packs are CC0 **or CC-BY**, per pack ([asset FAQ](https://static.makehumancommunity.org/assets/assetpacks/faq.html)). | Base mesh about 13k quads (proxies are lower). **Ships a `rig.mixamo.json` preset with 52 `mixamorig:*` bones and weights** (`src/mpfb/data/rigs/standard/`), plus `game_engine`, `cmu_mb` and `openpose`. | CC0 skins (fair to realistic, a little plastic). Sports clothing is thin in the system assets, so t-shirt, shorts and socks come from community packs. | 3–8 MB with 2k textures | 3–3.5 | Medium. Needs Blender 4.2+ with MPFB: build the body, apply the Mixamo rig, dress it, export GLB. Blender is **not installed** on this Mac. |
| **Blender Studio Human Base Meshes** v1.4.1 ([demo files page](https://www.blender.org/download/demo-files/)) | **CC0**: *"Human Base Meshes v1.4.1 by Blender Studio and community contributions. 49 MB – CC0"* | 17 assets, realistic and stylised male/female bodies plus heads, hands and feet, clean quads with multires. **Not rigged**, and UDIM UVs. | No textures. They are sculpting bases. | – | 2 as shipped | High: needs retopology or decimation, textures and rigging. It is a sculpting start, not a game character. |
| **Quaternius Universal Base Characters** ([page](https://quaternius.com/packs/universalbasecharacters.html)) | **CC0**: *"Free to use in personal, educational and commercial projects."* Free tier covers 60–70 % of the pack; Source costs $20. | About 13k tris, a humanoid rig shared with the CC0 Universal Animation Library (120+ clips, [UAL](https://quaternius.com/packs/universalanimationlibrary.html)). | Stylised: flat colours, 20 hairstyles in Source | about 1–2 MB | 1.5 | Low, but it keeps the toy look we are trying to lose |
| Kenney Animated Characters ([kenney.nl](https://kenney.nl/assets/animated-characters-1)) | CC0 | Blocky low-poly | Skins only | < 1 MB | 1 | Low. Wrong style. |
| **Sketchfab** (API search `downloadable=true&license=cc0`, queries "rigged human", "tennis player", "athlete") | – | **No CC0 rigged human** came back at all. CC-BY rigged humans exist ("Rigged T-Pose Human Male w 50 Face Blendshapes" by mikealger, 54k faces; "Human Male/Female Basemesh Rigged" by niclas.schoepe, 37k faces; "Basic Human Male" by DNC44, 15k), with random rigs and quality. The CC-BY "tennis player" hits are real people ("BORIS BECKER"), which rules them out. | – | – | 2–4 | Medium–high, per model. Needs attribution. |
| Poly Pizza ([search](https://poly.pizza/search/human)) / OpenGameArt | CC0/CC-BY | Low-poly only | – | – | 1 | Wrong style |
| three.js `Michelle.glb`, `Soldier.glb`, `Xbot.glb`, `readyplayer.me.glb` ([models/gltf](https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf)) | The three.js repo is MIT, but the example credits *"(model from mixamo.com)"* for the skinning examples. These are Mixamo assets under **Mixamo terms**, not MIT. The RPM avatar falls under the old Ready Player Me terms (the service shut down in Jan 2026). | Mixamo rig | Michelle is textured and stylised-realistic, but dressed as a dancer | 2–3 MB | 3 | Low. Licence is fine inside an app, but it is not ours to redistribute. |
| Khronos `CesiumMan` / `RiggedFigure` ([glTF-Sample-Assets](https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/CesiumMan)) | **CC-BY 4.0**, *"© 2017, Cesium"*. CesiumMan also carries the Cesium logo trademark. | 19-joint test rig | One low-res texture | < 0.5 MB | 1 | Not usable. These are test models. |
| Mixamo characters | Covered in `3d-realism.md`: royalty-free in apps, no standalone redistribution. Mixamo is still up but gets no maintenance (outages through 2025–26, [Cinevva](https://app.cinevva.com/guides/free-character-animations-rigging)). | Mixamo rig | Textured, stylised-realistic | 2–5 MB | 3 | Low |
| Adobe Fuse | Discontinued 13 Sept 2020 ([Wikipedia](https://en.wikipedia.org/wiki/Adobe_Fuse_CC)). Old Fuse characters fall under Mixamo terms. | – | – | – | – | Not available |

### 1.2 Ranking

1. **Microsoft Rocketbox `Sports_Male_04`**. MIT, photographic skin and face, already dressed like a tennis player,
   1.4 MB, and **verified working in our studio**. It is 2010s-era game art: 7.5k tris, a slightly low-poly silhouette at
   the shoulders and knees, and hands that are fine at a distance.
2. **MPFB2 with its built-in `mixamo` rig**. CC0 output, any body type or gender, and the bone names are exactly ours.
   It is the right source for a **female player and body-type variants**. It needs a Blender session, and its skin
   shading is less photographic than Rocketbox.
3. **Rocketbox `Sports_Female_02`** with the trousers repainted into a tennis skirt or shorts (the same rig and pipeline
   as #1).

**Pick: Rocketbox `Sports_Male_04` now, then MPFB2 for the female and body-type variants.**

### 1.3 Rocketbox, verified end to end

- **Formats.** Each avatar folder holds `Export/<name>.fbx` (binary FBX, about 0.5 MB, body only),
  `Export/<name>_facial.fbx` (about 2 MB, with the facial rig), `Textures/*.tga` (2048² diffuse, normal and specular
  maps, 12.6 MB each) and a preview PNG. The files are plain git objects, not LFS, so
  `raw.githubusercontent.com/microsoft/Microsoft-Rocketbox/master/...` downloads them directly.
- **CLI conversion on Apple Silicon.** `npx fbx2gltf` **fails**: the npm package only ships an x86_64 Darwin binary
  (`bad CPU type in executable`, and Rosetta is not installed). What works instead needs no Blender: **three.js
  `FBXLoader` in Node, then `GLTFExporter`, then `@gltf-transform/core`** to attach the textures. The script is in
  Appendix A and takes about 2 s. Textures were converted with macOS `sips` (TGA to 1024² JPEG, q85, 100–300 KB each).
  Gotchas we hit:
  1. FBXLoader's UVs assume `flipY = true` textures, so V has to be flipped (`v = 1 − v`) before export or the texture
     comes out scrambled.
  2. Units are centimetres, so scale by 0.01.
  3. Strip the ambient light the FBX brings along.
  4. `prune()` drops empty leaf nodes unless you pass `keepLeaves: true`, which matters for the end-site bones.
- **Making it a drop-in for `SkinnedPlayer`.** The Biped hierarchy differs from Mixamo: the thighs hang off `Bip01 Spine`
  and the clavicles off `Bip01 Neck`, and the `Bip01` root carries a 120° axis-swap rotation. The conversion therefore:
  - renames the bones to `mixamorig:*` (`Finger0..4` map to Thumb/Index/Middle/Ring/Pinky, segments `N`, `N1`, `N2` map
    to `1`, `2`, `3`);
  - re-parents the thighs under Hips and the clavicles under Spine2 using `Object3D.attach`, which keeps world
    transforms, so the inverse bind matrices stay valid;
  - inserts an identity-rotation `Armature` parent above Hips;
  - adds `HeadTop_End` and `Left/RightToe_End` end sites.
- **Test in the running app.** The dev server at `localhost:5183` served our GLB in place of `athlete.glb` through a
  Playwright route interception, with no source edits. Result: the model loads, is scaled to `TARGET_HEIGHT` and follows
  the solver in every phase. Ready position, unit turn, contact and finish all read as a person. Skinning at the
  elbows, knees and shoulders deforms cleanly.
- **One code change is still needed.** `SkinnedPlayer` swaps every mesh material for its single vertex-coloured
  material (line ~175), so the Rocketbox model renders black because it has no `COLOR_0`. To ship it, keep the GLB's own
  `MeshStandardMaterial` when it has a `map`. Only the vertex-colour path is needed for `athlete.glb`.
- **Polish after that.**
  - Finger curl axes differ from Mixamo (Biped fingers bend about local Z with a different sign), so tune `CURL` per
    model.
  - Re-export the textures at 2048² (about +3 MB) if close-ups matter.
  - Turn `*_specular` into a roughness map.
  - The FBX has one `hipoly` LOD only. The README's `midpoly`/`lowpoly` variants are not in the export folder.

## 2. Motion data for tennis

| Source | Format / joints / fps | Licence (verified) | Commercial | Tennis content |
| --- | --- | --- | --- | --- |
| **Tennis-MoCap (Caldas, Colombia)** ([github.com/jdpulgarin/Tennis-MoCap](https://github.com/jdpulgarin/Tennis-MoCap)) | **BVH**, OptiTrack Flex V100 at **100 Hz**, 34 markers, 18 rotating joints (Hips, Chest, Neck, Head, Collar/Shoulder/Elbow/Wrist ×2, Hip/Knee/Ankle ×2), 23 points including end sites. No fingers and no racket. About 30 s per file (2,999 frames). | *"Licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License."* (README and Copyright.md) | **Yes**, with attribution. **ShareAlike**: our retargeted clips must be released as CC BY-SA. The app code is not affected. | **100 BVH files**, 16 players (5 high-performance, 12 regular). `Derecha` = forehand, `Reves` = backhand, `Servicio` = serve, `Remate` = smash, `VDerecha`/`VReves` = volleys. Loaded one in three.js `BVHLoader`: 9 clear forehands, wrist peaks about 6 m/s. |
| **CalTennis** ([HF](https://huggingface.co/datasets/demalenk/caltennis), [arXiv 2606.20542](https://arxiv.org/abs/2606.20542)) | Multi-view video at 60 Hz (2–6 cams), `.npy` timestamps, `.json` calibration, SMPL fits. 51 h, 11.03M frames. | Dataset card: **`cc-by-nc-4.0`** | **No** | Unscripted play: serves, volleys, sprints, rallies. Also SMPL-bound, which is non-commercial on its own. |
| **CMU MoCap** ([FAQ](http://mocap.cs.cmu.edu/faqs.php)) | ASF/AMC, C3D, BVH conversions. 120 Hz, 31 joints. | Home page: *"This data is free for use in research projects. You may include this data in commercially-sold products, but you may not resell this data directly, even in converted form."* FAQ: *"may be copied, modified, or redistributed without permission."* | Yes, embedded in the product | **No tennis or racket motion** (grepped the full 2,605-motion index). Closest: golf (subjects 63, 64), baseball swing and pitch, frisbee. Useful only for split-step, shuffles and runs. |
| **AMASS** ([licence](https://amass.is.tue.mpg.de/license.html)) | SMPL-H params | *"Any other use, in particular any use for commercial purposes, is prohibited."* | No | – |
| **THETIS** ([repo](https://github.com/THETIS-dataset/dataset)) | Kinect v1, 55 players, 12 classes (3 backhands, 4 forehands, 3 serves, smash, volleys) | No licence file. The README asks for a citation, and the 2013 paper says it is for research. | No (no grant) | **The "skeleton 3D" files are `.avi` renderings, not joint coordinates**, so there is nothing to retarget. |
| "TennisSet" / "Tennis Stroke Dataset" | – | Not found as public datasets. Recent papers (e.g. [Sensors 2026 marker-set study](https://pmc.ncbi.nlm.nih.gov/articles/PMC13517808/), 40 players, 13 classes) share data only *"upon reasonable request"*. 3DTennisDS (Vicon, 10 pros) has no public download. | – | – |
| **BONES-SEED** ([HF](https://huggingface.co/datasets/bones-studio/seed), [licence](https://bones.studio/info/seed-license)) | SOMA BVH, 120 fps, 142k motions, 288 h | Custom licence: free for academia and **"Qualifying Startups" with annual gross revenue under US$1M**. A paid licence is required above that. | Conditional | Has a "Sport" package (3,973 motions). Tennis content **not verifiable**: the dataset is gated, and the viewer returned "not accessible without authentication". |
| **Mixamo** | FBX, Mixamo rig, 30 fps | Mixamo terms (see `3d-realism.md`) | Yes, embedded | Queried Mixamo's own search API directly (`/api/v1/products?type=Motion,MotionPack&query=…`): **"tennis" 0 results, "racket" 0, "serve" 0 relevant**. For comparison, "golf" returns 46 and "baseball" 22. There is **no Tennis Serve or Tennis Forehand on Mixamo.** |
| **Fab "Tennis Shots"** by effigy ([listing](https://www.fab.com/listings/78060d27-657b-413d-b442-73f8d18cab75)) | **Unreal asset package only** (UE 5.0–5.6), Epic skeleton, optical mocap of a tennis coach, cleaned. Needs UE to export FBX, then a retarget in Blender. | Fab Standard License: *"Use the assets with any compatible tools (usage is not limited to Unreal Engine)"*, *"Commercially distribute your Projects with the Fab assets incorporated"*. Not allowed: *"Resell or redistribute the asset … on a standalone basis"*. | Yes, embedded | **19 clips**: Forehand ×2, Backhand ×2, Service (ball tapping) ×3, Smash, Volley, VolleyBackhand ×2, run ×2, small steps, idle, celebrations. Price shown as **COP 323,954 ≈ US$85**. |
| Fab "Tennis Animation Pack" by Jane Gintsar ([listing](https://www.fab.com/listings/972d6704-d991-4994-8c61-53d9f4174c97)) | UE 5.7–5.8 package | Fab Standard | Yes | 14 clips: serves, forehand/backhand, court movement, ready stance. **COP 19,020–38,079 ≈ US$5–10.** |
| Fab "Tennis Animation Pack 1/2" by Ailive ([pack 2](https://www.fab.com/listings/8db59171-352b-4975-b729-98a3f9c0311f)) | **FBX** (44 MB zip), UE5 Manny skeleton, mocap with fingers, "lightly cleaned" | Fab Standard | Yes | Pack 2: 6 swings (two-handed upswing ×2, one-handed swing, jumping smash…). About US$4–10. Labelled generically, and quality is unknown. |
| Unity Asset Store "Tennis Animation Pack" (Big Animation) ([page](https://assetstore.unity.com/packages/3d/animations/tennis-animation-pack-163047)) | FBX Humanoid, 2020 | Unity EULA (single entity) | Yes, embedded | **US$99**. Clip list not public. |
| Rokoko free sports pack ([page](https://www.rokoko.com/resources/rokoko-mocap-12-free-sports-animations)) | FBX, **Mixamo skeleton, 30 fps**, fingers included | *"from passion project to commercial use"* | Yes | The 12 clip names sit behind a sign-up form, and no tennis was found in public listings. |
| ActorCore / MoCap Online | FBX | Paid royalty-free | Yes | No tennis pack found on either (searched). |

**Best legal motion source.** Nothing free is also clean and complete. In order:

1. **Tennis-MoCap (CC BY-SA)** is the only free, commercially usable, real tennis mocap covering all six strokes. It
   lacks fingers and wrist pronation data, and the retargeted clips inherit ShareAlike. It is a perfect match for our
   "Colombia" audience.
2. **Fab "Tennis Shots" (about US$85)** is the most complete cleaned coach mocap, but it only comes as an Unreal asset.
3. **Our own capture through GEM-X (section 3)**, which gives commercially clean output from our own video.

## 3. Video-to-motion on a Mac (Apple Silicon), 2026

The key finding of this round: **there is now a commercially usable pipeline**, from both the code licence and the body
model it outputs.

| Method | Code licence | Weights / body model licence | Apple Silicon | Output | Notes |
| --- | --- | --- | --- | --- | --- |
| **NVIDIA GEM-X** ([repo](https://github.com/NVlabs/GEM-X), 2026) | **Apache-2.0** | Weights: [NVIDIA Open Model License](https://www.nvidia.com/en-us/agreements/enterprise-software/nvidia-open-model-license/), *"Models are commercially usable"*, *"NVIDIA claims no ownership rights in outputs"*. Body model **SOMA** ([SOMA-X](https://github.com/NVlabs/SOMA-X), **Apache-2.0**). README: *"trained on NVIDIA-owned data only"*. | **Yes**: `docs/INSTALL_MACOS.md` and `scripts/setup_mac.sh`. `demo_soma_onnx.py --video x.mp4` runs *"well on Apple Silicon using ONNX Runtime with CoreML"*. The full offline `demo_soma.py` works best on CUDA. | 77 joints (body + hands + face), camera-space **and world-space** trajectories, `hpe_results.pt`. `--static_cam` for a tripod. | **Best fit.** Moving camera, hands included, commercially clean. SOMA-to-BVH export is in SOMA-X ("USD/NPZ I/O"); the NVIDIA `soma-retargeter` (Apache) only targets robots. |
| **Meta SAM 3D Body** ([repo](https://github.com/facebookresearch/sam-3d-body), Nov 2025) | SAM License: *"non-exclusive, worldwide, non-transferable and royalty-free limited license … to use, reproduce, distribute, copy, create derivative works"*. No non-commercial clause (restrictions cover trade controls, ITAR and reverse engineering). | Outputs **MHR** (Momentum Human Rig, [repo](https://github.com/facebookresearch/MHR), **Apache-2.0**, 7 LODs) | PyTorch. Mac not documented. CPU inference is plausible but slow (not run). | Per-image MHR mesh, body, hands and feet | **Single image, no temporal model**, so video needs smoothing. Excellent hands. |
| MediaPipe Pose Landmarker (BlazePose GHUM) ([repo](https://github.com/google-ai-edge/mediapipe)) | Apache-2.0 | Model shipped with the Apache repo | **Yes, even in-browser** (WebGPU/WASM) | 33 landmarks with metric "world" xyz, **no joint rotations** | Jitter on fast swings (see the earlier doc). Needs our own IK to reach rotations. Good for live coaching overlays, not for clip authoring. |
| RTMPose3D / RTMW3D (MMPose) ([repo](https://github.com/open-mmlab/mmpose)) | Apache-2.0 | Weights trained on public research sets. Check each checkpoint. | CPU/MPS (not run) | 3D keypoints (133 whole-body), no rotations | Same IK problem as MediaPipe |
| MotionBERT ([repo](https://github.com/Walter0807/MotionBERT)) | Apache-2.0 | Weights trained on **Human3.6M (research-only licence)**, and the mesh head uses SMPL | CPU/MPS | H36M 17 joints (and SMPL) | Weights are not commercially clean |
| GVHMR ([repo](https://github.com/zju3dv/GVHMR)) | *"educational, research and non-profit purposes only … prohibited for commercial use"* | SMPL-X (non-commercial) | CUDA-oriented (DPVO) | SMPL params + world trajectory | Best quality in 2024–25, **not commercial** |
| WHAM ([repo](https://github.com/yohanshin/WHAM)) | MIT | SMPL (non-commercial, *"production of other artefacts for commercial purposes"* is prohibited, [SMPL licence](https://smpl.is.tue.mpg.de/modellicense.html)) | CUDA (DPVO) | SMPL + world trajectory | Blocked by SMPL |
| 4D-Humans / HMR 2.0 ([repo](https://github.com/shubham-goel/4D-Humans)) | MIT | SMPL | CPU/MPS with detectron2 tweaks | SMPL per frame + tracking | Blocked by SMPL |
| TRAM ([repo](https://github.com/yufu-wang/tram)) | MIT | SMPL | CUDA (DROID-SLAM) | SMPL + world | Blocked by SMPL |
| NLF ([repo](https://github.com/isarandi/nlf)) | MIT | SMPL-family | – | SMPL | Blocked by SMPL |
| SMPLer-X ([repo](https://github.com/caizhongang/SMPLer-X)) | S-Lab License 1.0: *"use for non-commercial purpose"* | SMPL-X | CUDA | SMPL-X | Not commercial |
| PromptHMR (2025) ([repo](https://github.com/yufu-wang/PromptHMR)) | *"Non-Commercial Scientific Research Use Only"* (Meshcapade) | SMPL-X | – | – | Not commercial |
| CameraHMR (2025) ([repo](https://github.com/pixelite1201/CameraHMR)) | No licence file (so no grant) | SMPL | – | – | Not usable |
| NVIDIA GENMO ([repo](https://github.com/NVlabs/GENMO)) | *"NVIDIA OneWay Noncommercial License"* | SMPL | – | – | Not commercial |

**Retargeting to our Mixamo skeleton.**

- **SMPL-family output**: [SMPL Blender add-on](https://github.com/Meshcapade/SMPL_blender_addon) or
  [CEB 4D Humans](https://github.com/carlosedubarreto/CEB_4d_Humans), then Rokoko or Auto-Rig Pro remap to Mixamo (as in
  `3d-realism.md`). This path is licence-blocked for us unless we buy Meshcapade.
- **GEM-X / SOMA output**, which is the recommended path:
  1. Export the SOMA skeleton animation to BVH with SOMA-X's I/O utilities. BONES-SEED and soma-retargeter already use a
     "SOMA-skeleton BVH", so the format is established.
  2. Map the SOMA joints to `mixamorig:*` (pelvis, spine chain, clavicle, shoulder, elbow, wrist, hip, knee, ankle, toe,
     fingers).
  3. Retarget in our own code. `SkinnedPlayer` already works from rest-pose-relative directions (`restQ` plus the child
     axis), so the cleanest path is a Node script that samples the BVH, converts it to per-bone *directions*, feeds the
     same `setDirection` / `setAbsolute` logic and bakes a glTF `AnimationClip`. The alternative is a Blender remap.
- **Tennis-MoCap BVH**: the same script. Its joint names (Hips, Chest, Neck, Head, Collar/Shoulder/Elbow/Wrist,
  Hip/Knee/Ankle) map almost 1:1. `Chest` has to be spread over Spine/Spine1/Spine2, and the wrist and hand come from our
  racket solver, because the data has no hand or racket orientation.

## 4. Can we build our own base human?

| Approach | Licence | Verdict |
| --- | --- | --- |
| SMPL / SMPL-X / SMPL-H | MPI: *"incorporation in a commercial product, use in a commercial service, or production of other artefacts for commercial purposes"* prohibited. Commercial use only via Meshcapade. | No |
| STAR ([repo](https://github.com/ahmedosman/STAR)), SUPR, **SKEL** ([licence](https://skel.is.tue.mpg.de/license.html)) | All MPI *"non-commercial scientific research"*. SKEL: *"Any other use, in particular any use for commercial, pornographic, military, or surveillance, purposes is prohibited."* | No |
| **Anny** (NAVER LABS, 2025) ([repo](https://github.com/naver/anny), [arXiv 2511.03589](https://arxiv.org/abs/2511.03589)) | Code **Apache-2.0**. Data: *"MakeHuman assets adapted from MPFB2 that are licensed under the CC0 1.0 Universal License"*. The optional `smplx` topology is non-commercial, so avoid `pip install anny[smpl]`. | **Yes.** Differentiable parametric body (PyTorch) with semantic controls (age, gender, height, weight, muscle). Default 104-bone `anny` rig (163-bone MakeHuman rig optional). Exports meshes via trimesh. Could generate our player's body *shape* offline and bake it to GLB. |
| **MHR** (Meta, [repo](https://github.com/facebookresearch/MHR)) | Apache-2.0 | Yes. High-fidelity parametric body with 7 LODs and pose correctives. It is the output format of SAM 3D Body. |
| **SOMA** (NVIDIA, [SOMA-X](https://github.com/NVlabs/SOMA-X)) | Apache-2.0 | Yes. A unifying layer over MHR, Anny and SMPL (SMPL only with user-supplied files). It is the output format of GEM-X. |
| MPFB2 base mesh + our own skeleton | CC0 assets, GPL only for the add-on code | Yes. We don't even need our own skeleton, because MPFB ships the Mixamo rig. |
| Procedural mesh in TypeScript (capsules → SDF → marching cubes, etc.) | Ours | Technically possible, but it would take weeks to reach the realism level of a 2012 game model. Not recommended. |

**Recommendation for section 4.** Don't write a body generator. Everything that looks human comes from scans or artist
sculpts, and there are now permissive parametric bodies:

- **Short term**: Rocketbox (MIT) as the default male.
- **Variants** (female, junior, heavier or taller players):
  - **Blender + MPFB2 (CC0)** with the `mixamo` rig, which is the least code;
  - or **Anny (Apache/CC0)** in a Python script, `anny.Anny()` with shape sliders, then export, if we want the shapes
    to be data-driven. Anny uses the MakeHuman topology and MPFB2 uses the MakeHuman mesh, so the MPFB Mixamo weights
    carry over.
- **Only if we adopt GEM-X or SAM 3D Body for capture**: consider MHR/SOMA as the rig, so captured motion needs no
  cross-rig retarget. That is a bigger switch (new rig in `SkinnedPlayer`); not before the clip pipeline exists.

---

## Recommendation

**Now (this week)**

1. **Swap the body to `public/models/candidates/rocketbox-sports-male-04.glb`** (MIT, 1.4 MB, verified driving our
   solver). The code change: in `SkinnedPlayer`, keep the GLB's own textured materials instead of the vertex-colour
   override, and point `MODEL_URL` at the new file. Keep `LICENSE-rocketbox.txt` next to it and add a credit line ("3D
   avatar: Microsoft Rocketbox, MIT") to the About page.
2. Tune the finger `CURL` axes for the Biped hands, and re-export at 2048² if the zoomed views look soft.
3. **Build the BVH → Mixamo clip baker** in Node (same approach as Appendix A: three.js `BVHLoader`, sample bone
   directions, apply `SkinnedPlayer`'s rest-relative mapping, `GLTFExporter` with an `AnimationClip`). Start with
   `tennis-mocap-astrejos-forehand.bvh`: cut one forehand out of the 30 s take (wrist speed peaks mark contact, e.g.
   t ≈ 8.95 s) and compare it side by side with our authored forehand. The racket hand stays solver-driven, because the
   data has no racket.

**Next (2–4 weeks)**

4. **Motion**: bake one clip per stroke from **Tennis-MoCap** (pick the high-performance players), published under
   CC BY-SA with attribution. If quality or ShareAlike becomes a problem, buy **Fab "Tennis Shots" (≈US$85)**, export
   FBX from Unreal once and retarget it the same way.
5. **Own capture, commercially clean**: film a coach at 120–240 fps on a tripod and run **GEM-X**
   (`scripts/setup_mac.sh`, `demo_soma_onnx.py --static_cam`) on the Mac. Export SOMA → BVH → our baker. This replaces
   the SMPL-based GVHMR/WHAM route from `3d-realism.md`, which the SMPL licence blocks for a product.
6. **Female / body-type variants**: MPFB2 (CC0, `mixamo` rig) in Blender, or Rocketbox `Sports_Female_02` with repainted
   bottoms. Both use the same pipeline and the same bone names.

Avoid for the product: CalTennis (CC BY-NC), AMASS, THETIS (no licence, and the "3D" data is only rendered video),
GVHMR, SMPLer-X, PromptHMR, GENMO and anything that outputs SMPL, unless we license Meshcapade.

---

## Appendix A: FBX → GLB without Blender (Apple Silicon)

The tools are in a throwaway folder: `npm i three@0.186.0 @gltf-transform/core @gltf-transform/functions`. Convert the
textures first with `sips -s format jpeg -s formatOptions 85 -Z 1024 m026_body_color.tga --out m026_body_color.jpg` (and
the same for `body_normal`, `head_color`, `head_normal`). Then run
`MIXAMO=1 node fbx2glb.mjs Sports_Male_04.fbx out.glb <texDir> m026`.

```js
// fbx2glb.mjs: three.js FBXLoader -> GLTFExporter -> gltf-transform (textures). Node 22.
import fs from 'node:fs'; import path from 'node:path';
globalThis.self = globalThis; globalThis.window = globalThis;
globalThis.document = { createElementNS: () => ({ addEventListener() {}, removeEventListener() {}, style: {} }),
                        createElement:   () => ({ addEventListener() {}, removeEventListener() {}, style: {} }) };
globalThis.FileReader = class {
  readAsArrayBuffer(b) { b.arrayBuffer().then((x) => { this.result = x; this.onloadend?.(); }); }
  readAsDataURL(b) { b.arrayBuffer().then((x) => { this.result = 'data:application/octet-stream;base64,' + Buffer.from(x).toString('base64'); this.onloadend?.(); }); }
};
const THREE = await import('three');
const { FBXLoader } = await import('three/examples/jsm/loaders/FBXLoader.js');
const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js');
const { NodeIO } = await import('@gltf-transform/core');
const { dedup, prune, weld } = await import('@gltf-transform/functions');

const [inp, out, texDir, prefix] = process.argv.slice(2);
const buf = fs.readFileSync(inp);
const root = new FBXLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '');
const meshes = []; root.traverse((o) => { if (o.isMesh) meshes.push(o); });
for (const m of meshes) {
  for (const mat of [].concat(m.material)) for (const k of ['map', 'normalMap', 'specularMap', 'bumpMap', 'alphaMap']) mat[k] = null;
  const uv = m.geometry.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setY(i, 1 - uv.getY(i)); // FBX flipY -> glTF
  m.geometry.deleteAttribute('color');
}
const lights = []; root.traverse((o) => o.isLight && lights.push(o)); lights.forEach((l) => l.removeFromParent());
root.scale.setScalar(0.01); root.updateMatrixWorld(true); // cm -> m

if (process.env.MIXAMO) { // Biped -> mixamorig names + Mixamo hierarchy + end sites
  const map = { Pelvis: 'Hips', Spine: 'Spine', Spine1: 'Spine1', Spine2: 'Spine2', Neck: 'Neck', Head: 'Head' };
  for (const [s, S] of [['L', 'Left'], ['R', 'Right']]) {
    Object.assign(map, { [`${s}_Clavicle`]: `${S}Shoulder`, [`${s}_UpperArm`]: `${S}Arm`, [`${s}_Forearm`]: `${S}ForeArm`,
      [`${s}_Hand`]: `${S}Hand`, [`${s}_Thigh`]: `${S}UpLeg`, [`${s}_Calf`]: `${S}Leg`, [`${s}_Foot`]: `${S}Foot`, [`${s}_Toe0`]: `${S}ToeBase` });
    ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'].forEach((f, i) => {
      map[`${s}_Finger${i}`] = `${S}Hand${f}1`; map[`${s}_Finger${i}1`] = `${S}Hand${f}2`; map[`${s}_Finger${i}2`] = `${S}Hand${f}3`; });
  }
  const by = (n) => root.getObjectByName(n);
  const pelvis = by('Bip01_Pelvis'), spine2 = by('Bip01_Spine2');
  for (const s of ['L', 'R']) { pelvis.attach(by(`Bip01_${s}_Thigh`)); spine2.attach(by(`Bip01_${s}_Clavicle`)); }
  root.updateMatrixWorld(true);
  const end = (p, name, w) => { const b = new THREE.Bone(); b.name = name; p.add(b); b.position.copy(p.worldToLocal(w.clone())); };
  const bb = new THREE.Box3().setFromObject(root);
  const hp = by('Bip01_Head').getWorldPosition(new THREE.Vector3());
  end(by('Bip01_Head'), 'mixamorig:HeadTop_End', new THREE.Vector3(hp.x, bb.max.y, hp.z));
  for (const s of ['L', 'R']) { const t = by(`Bip01_${s}_Toe0`);
    end(t, `mixamorig:${s === 'L' ? 'Left' : 'Right'}Toe_End`, t.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0, 0.07))); }
  const arm = new THREE.Object3D(); arm.name = 'Armature'; root.add(arm); // identity parent (Bip01 has a 120° axis swap)
  arm.updateMatrixWorld(true); arm.attach(pelvis); arm.attach(by('Bip01'));
  root.traverse((o) => { if (o.isBone) { const k = o.name.replace(/^Bip01_/, ''); if (map[k]) o.name = 'mixamorig:' + map[k]; } });
  root.updateMatrixWorld(true);
}

const tmp = out + '.raw.glb';
fs.writeFileSync(tmp, Buffer.from(await new GLTFExporter().parseAsync(root, { binary: true, onlyVisible: false })));
const io = new NodeIO(); const doc = await io.read(tmp);
for (const mat of doc.getRoot().listMaterials()) {
  const part = /head|face/i.test(mat.getName()) ? 'head' : 'body';
  const tex = (k) => { const f = path.join(texDir, `${prefix}_${part}_${k}.jpg`);
    return fs.existsSync(f) ? doc.createTexture(`${part}_${k}`).setImage(fs.readFileSync(f)).setMimeType('image/jpeg') : null; };
  const c = tex('color'), n = tex('normal');
  if (c) mat.setBaseColorTexture(c).setBaseColorFactor([1, 1, 1, 1]);
  if (n) mat.setNormalTexture(n);
  mat.setMetallicFactor(0).setRoughnessFactor(0.65);
}
await doc.transform(weld(), dedup(), prune({ keepLeaves: true })); // keepLeaves: keep the *_End sites
await io.write(out, doc); fs.unlinkSync(tmp);
```

Source FBX and textures:
`https://raw.githubusercontent.com/microsoft/Microsoft-Rocketbox/master/Assets/Avatars/Professions/Sports_Male_04/Export/Sports_Male_04.fbx`
and `.../Sports_Male_04/Textures/m026_{body,head}_{color,normal,specular}.tga`.
