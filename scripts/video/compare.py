"""
Pairs reference frames with renders of the same instants: each output cell is the
video frame on top and our render below, so differences in the racket and arm read
at a glance.

  <cv-env>/bin/python scripts/video/compare.py REF.jpg --ref-cols 3 --ref-cell 950x700 \
      RENDER.png --render-cols 3 --pad 4 --gap 4 --out OUT.jpg [--labels a,b,c]

The render screenshot is the /sheet page (grid with `pad` px outer padding and `gap` px gaps,
4:3 cells). Both grids must hold the same instants in the same order.
"""
import argparse
import cv2
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('ref')
ap.add_argument('--ref-cols', type=int, required=True)
ap.add_argument('--ref-cell', required=True)
ap.add_argument('render')
ap.add_argument('--render-cols', type=int, required=True)
ap.add_argument('--pad', type=int, default=4)
ap.add_argument('--gap', type=int, default=4)
ap.add_argument('--n', type=int, default=0)
ap.add_argument('--out', required=True)
ap.add_argument('--labels', default='')
ap.add_argument('--out-cols', type=int, default=5)
ap.add_argument('--w', type=int, default=400)
a = ap.parse_args()

ref = cv2.imread(a.ref)
ren = cv2.imread(a.render)
rw, rh = map(int, a.ref_cell.split('x'))
n = a.n or (ref.shape[0] // rh) * a.ref_cols
W = ren.shape[1]
cw = (W - 2 * a.pad - (a.render_cols - 1) * a.gap) / a.render_cols
ch = cw * 3 / 4
labels = a.labels.split(',') if a.labels else []
cells = []
for i in range(n):
    r, c = divmod(i, a.ref_cols)
    rf = ref[r * rh:(r + 1) * rh, c * rw:(c + 1) * rw]
    if rf.size == 0 or rf.mean() < 3:
        break
    r2, c2 = divmod(i, a.render_cols)
    x0 = int(round(a.pad + c2 * (cw + a.gap)))
    y0 = int(round(a.pad + r2 * (ch + a.gap)))
    rn = ren[y0:y0 + int(ch), x0:x0 + int(cw)]
    if rn.size == 0:
        break
    h1 = int(a.w * rf.shape[0] / rf.shape[1])
    h2 = int(a.w * rn.shape[0] / rn.shape[1])
    top = cv2.resize(rf, (a.w, h1))
    bot = cv2.resize(rn, (a.w, h2))
    cell = np.vstack([top, bot])
    if i < len(labels):
        cv2.putText(cell, labels[i], (6, h1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
    cells.append(cell)
H = max(c.shape[0] for c in cells)
cells = [np.vstack([c, np.zeros((H - c.shape[0], a.w, 3), np.uint8)]) for c in cells]
rows = [np.hstack(cells[i:i + a.out_cols] + [np.zeros((H, a.w, 3), np.uint8)] * (a.out_cols - len(cells[i:i + a.out_cols]))) for i in range(0, len(cells), a.out_cols)]
cv2.imwrite(a.out, np.vstack(rows))
print('wrote', a.out, len(cells), 'pairs')
