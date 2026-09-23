"""
Measures the racket and the hitting arm on every cell of a frame sheet.

  <cv-env>/bin/python scripts/video/measure.py SHEET.jpg --cols 4 --cell-w 640 [--hand right] [--out out.json]

Sheets come from the browser capture helper: a grid of equally sized frames,
each stamped with its video time in the top-left corner. For every cell:
  - YOLO pose (COCO keypoints) gives shoulders, elbows, wrists, hips
  - YOLO segmentation finds the "tennis racket" (COCO class 38) mask;
    its principal axis gives the racket line, the end farther from the wrist is the tip
Outputs, in image coordinates (y down, degrees counter-clockwise from +x as seen on screen):
  forearm angle, racket angle, lag = racket angle relative to the forearm,
  racket-head centre, and how "open" the head looks (minor/major axis ratio of the
  head's mask: ~1 face-on to the camera, ~0 edge-on).
Annotated cells are written next to the sheet for visual checking.
"""
import argparse, json, math, os
import cv2
import numpy as np
from ultralytics import YOLO

ap = argparse.ArgumentParser()
ap.add_argument('sheet')
ap.add_argument('--cols', type=int, required=True)
ap.add_argument('--cell-w', type=int, required=True)
ap.add_argument('--cell-h', type=int, default=0)
ap.add_argument('--hand', default='right')
ap.add_argument('--out', default='')
ap.add_argument('--times', default='', help='comma-separated times, one per cell (else read from the sheet order)')
args = ap.parse_args()

img = cv2.imread(args.sheet)
H, W = img.shape[:2]
cw = args.cell_w
ch = args.cell_h or round(cw * 9 / 16)
cols = args.cols
rows = H // ch
times = [float(x) for x in args.times.split(',')] if args.times else None

here = os.path.dirname(os.path.abspath(__file__))
weights = os.path.join(here, '..', '..', '..', 'cv-env')
pose = YOLO(os.path.join(weights, 'yolo11x-pose.pt'))
seg = YOLO(os.path.join(weights, 'yolo11x-seg.pt'))

KP = dict(ls=5, rs=6, le=7, re=8, lw=9, rw=10, lh=11, rh=12)
side = 'r' if args.hand == 'right' else 'l'
ang = lambda v: math.degrees(math.atan2(-v[1], v[0]))  # screen angle, y up


def wrap(a):
    return (a + 180) % 360 - 180


results = []
annotated = img.copy()
for r in range(rows):
    for c in range(cols):
        i = r * cols + c
        x0, y0 = c * cw, r * ch
        cell = img[y0:y0 + ch, x0:x0 + cw]
        if cell.size == 0 or cell.mean() < 5:
            continue
        rec = {'i': i, 't': times[i] if times and i < len(times) else None}
        # --- body: take the person with the largest box
        pr = pose.predict(cell, imgsz=960, conf=0.25, verbose=False)[0]
        if pr.keypoints is not None and len(pr.keypoints):
            areas = [(b[2] - b[0]) * (b[3] - b[1]) for b in pr.boxes.xyxy.cpu().numpy()]
            k = pr.keypoints.data.cpu().numpy()[int(np.argmax(areas))]
            for name, j in KP.items():
                rec[name] = [float(k[j][0]), float(k[j][1]), float(k[j][2])]
        # --- racket
        sr = seg.predict(cell, imgsz=1280, conf=0.15, classes=[38], verbose=False)[0]
        if sr.masks is not None and len(sr.masks):
            confs = sr.boxes.conf.cpu().numpy()
            m = sr.masks.data.cpu().numpy()[int(np.argmax(confs))]
            m = cv2.resize(m, (cw, ch)) > 0.5
            ys, xs = np.nonzero(m)
            if len(xs) > 30:
                P = np.stack([xs, ys], 1).astype(np.float64)
                mu = P.mean(0)
                U, S, Vt = np.linalg.svd(P - mu, full_matrices=False)
                axis = Vt[0]
                proj = (P - mu) @ axis
                a, b = mu + axis * proj.min(), mu + axis * proj.max()
                wrist = rec.get(side + 'w')
                if wrist and wrist[2] > 0.2:
                    wv = np.array(wrist[:2])
                    if np.linalg.norm(a - wv) > np.linalg.norm(b - wv):
                        a, b = b, a  # a = butt (near the wrist), b = tip
                # head: the far 55 % of the mask along the axis
                far = proj > (proj.min() + 0.45 * (proj.max() - proj.min())) if np.linalg.norm(b - (mu + axis * proj.max())) < 1e-6 else proj < (proj.max() - 0.45 * (proj.max() - proj.min()))
                Q = P[far]
                if len(Q) > 20:
                    qm = Q.mean(0)
                    _, s2, _ = np.linalg.svd(Q - qm, full_matrices=False)
                    rec['headCentre'] = qm.tolist()
                    rec['headOpen'] = float(s2[1] / max(s2[0], 1e-6))
                rec['butt'] = a.tolist()
                rec['tip'] = b.tolist()
                rec['racketAngle'] = ang(b - a)
                rec['racketConf'] = float(confs.max())
        # --- derived angles
        e, w, s = rec.get(side + 'e'), rec.get(side + 'w'), rec.get(side + 's')
        if e and w and e[2] > 0.2 and w[2] > 0.2:
            rec['forearmAngle'] = ang(np.array(w[:2]) - np.array(e[:2]))
            if 'racketAngle' in rec:
                rec['lag'] = wrap(rec['racketAngle'] - rec['forearmAngle'])
        if s and e and s[2] > 0.2 and e[2] > 0.2:
            rec['upperArmAngle'] = ang(np.array(e[:2]) - np.array(s[:2]))
        results.append(rec)
        # --- annotate
        g = annotated[y0:y0 + ch, x0:x0 + cw]
        for a_, b_, col in [('s', 'e', (255, 200, 0)), ('e', 'w', (0, 200, 255))]:
            A, B = rec.get(side + a_), rec.get(side + b_)
            if A and B and A[2] > 0.2 and B[2] > 0.2:
                cv2.line(g, (int(A[0]), int(A[1])), (int(B[0]), int(B[1])), col, 2)
        if 'butt' in rec:
            cv2.line(g, tuple(int(v) for v in rec['butt']), tuple(int(v) for v in rec['tip']), (60, 255, 60), 2)
            cv2.circle(g, tuple(int(v) for v in rec['tip']), 4, (0, 0, 255), -1)
        if 'lag' in rec:
            cv2.putText(g, f"lag {rec['lag']:.0f}", (4, ch - 8), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

out = args.out or os.path.splitext(args.sheet)[0] + '.measure.json'
json.dump(results, open(out, 'w'), indent=1)
cv2.imwrite(os.path.splitext(args.sheet)[0] + '.annotated.jpg', annotated)
print(f'{len(results)} cells, racket found in {sum("racketAngle" in r for r in results)}, lag in {sum("lag" in r for r in results)} -> {out}')
