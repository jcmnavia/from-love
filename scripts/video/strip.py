"""
Stacks a reference key sheet over one or more /sheet renders of the same instants, one column per instant, so
versions can be compared against the pro at a glance.

  <cv-env>/bin/python scripts/video/strip.py REF.jpg --ref-cols 4 --ref-cell 480x390 --render-cols 4 OUT.jpg R1.png [R2.png ...]
"""
import argparse
import cv2
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('ref')
ap.add_argument('--ref-cols', type=int, required=True)
ap.add_argument('--ref-cell', required=True)
ap.add_argument('--render-cols', type=int, required=True)
ap.add_argument('--n', type=int, default=0)
ap.add_argument('--w', type=int, default=300)
ap.add_argument('out')
ap.add_argument('renders', nargs='+')
a = ap.parse_args()
rw, rh = map(int, a.ref_cell.split('x'))
ref = cv2.imread(a.ref)
n = a.n or (ref.shape[0] // rh) * a.ref_cols
cols = []
for i in range(n):
    r, c = divmod(i, a.ref_cols)
    cell = [cv2.resize(ref[r * rh:(r + 1) * rh, c * rw:(c + 1) * rw], (a.w, round(a.w * rh / rw)))]
    for path in a.renders:
        img = cv2.imread(path)
        cw = (img.shape[1] - 8 - 4 * (a.render_cols - 1)) // a.render_cols
        ch = round(cw * 3 / 4)
        rr, cc = divmod(i, a.render_cols)
        x, y = 4 + cc * (cw + 4), 4 + rr * (ch + 4)
        cell.append(cv2.resize(img[y:y + ch, x:x + cw], (a.w, round(a.w * 3 / 4))))
    cols.append(np.vstack(cell))
cv2.imwrite(a.out, np.hstack(cols))
print('wrote', a.out)
