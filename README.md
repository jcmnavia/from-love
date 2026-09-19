# From Love

Learn tennis from zero to tournament level, built around a 3D player you can slow down, freeze and orbit.

- **Stroke studio** (`/studio/:id`): 16 strokes and movements (forehand, two- and one-handed backhand, slice, return, serve, both volleys, swing volley, smash, drop shot, backhand smash, tweener, split step, shuffle, crossover). Scrub a phase-marked timeline, play at 0.1×–1×, step frame by frame, switch camera presets, zoom to shoulders / hips / racket / feet / head, toggle the swing path, the hip–shoulder dial, the skeleton view, left-handed mirroring and the court surface. A live readout shows shoulder turn, hip turn, separation, knee bend, racket head speed and face angle.
- **Learn the game** (`/learn/*`): court anatomy with an orbitable 3D court and per-surface bounce, ball types and stages, scoring with an interactive scoreboard (standard, no-ad, Fast4), rules and etiquette, racquets, strings and junior sizing, grips on a 3D handle with bevel highlights, footwork, fitness, tactics and the mental game.
- **Footwork and training** (`/move`): 23 drills with half-court diagrams, coordination games for juniors and fitness circuits.
- **Learn from the pros** (`/pros`): the top 20 players of each decade since the 1970s (10 ATP, 10 WTA) with technique notes that also feed the studio's coaching panel.
- **Your path** (`/path`): an 11-stage curriculum with checklists and on-court tests, saved in the browser.

## Stack and structure

- React 19 + Vite 8 + TypeScript, Tailwind CSS v4, shadcn/ui (light and dark theme, `from-love.theme`), react-router 7, zustand.
- English and Spanish: UI strings in `src/i18n/ui.{en,es}.ts` (`useT()`); all teaching content is localized through `useContent()` in `src/i18n/content.tsx`, with Spanish versions in `src/content/es/`, `src/strokes/es.ts` and `src/data/players/es.json`.
- Official references (ITF rules, ATP/WTA rankings and rulebooks, the four majors, team events, coaching hubs, stats sites) live in `src/content/sources.ts` and are rendered under every lesson and learn area.
- Two player bodies in the studio ("More" menu → Body): the procedural mannequin (`src/studio/PlayerRig.ts`) and a Mixamo-rigged skinned humanoid (`src/studio/SkinnedPlayer.ts`, `public/models/Xbot.glb`) posed from the same solver. The path to real motion capture is written up in `docs/3d-realism.md`.

## Run it

```sh
pnpm install
pnpm dev
pnpm build
```

`/sheet/:strokeId?cam=side` renders every phase of a stroke side by side; it is a development aid for checking poses.

## How the 3D player works

There is no motion capture. Each stroke in `src/strokes/` is a list of keyframes in a player-friendly frame (x right, y up, z toward the net): pelvis position and rotation, chest rotation relative to the pelvis, both hand targets, racket direction and face normal, and both feet. `src/engine/pose.ts` interpolates them with a monotone cubic so planted feet never drift and every extremum eases naturally; `src/engine/solver.ts` turns targets into a skeleton with analytic two-bone IK for arms and legs, a spine that distributes the hip–shoulder twist, and a head that tracks the ball; `src/engine/runtime.ts` derives the racket trail, head speed, ball flight (ballistic segments through authored waypoints to the racket face at contact) and gaze. `src/studio/PlayerRig.ts` renders the result as a smooth mannequin.

## Data provenance

Player facts (handedness, backhand, peak ranking, majors) were checked against Wikipedia and tour sites by research agents in September 2026. Grips and technique notes reflect the most commonly cited coaching descriptions and were not individually sourced; treat them as teaching cues, not biographical fact. Stroke keyframes were reviewed against published biomechanics (ITF coaching literature, Elliott & Reid serve studies, Brian Gordon's forehand model) for turn angles, separation, knee flexion, contact position and swing timing, but remain hand-authored reconstructions rather than motion capture.
