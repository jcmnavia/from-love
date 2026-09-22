#!/bin/sh
# Downloads the high-performance players' takes from Tennis-MoCap (CC BY-SA 3.0,
# https://github.com/jdpulgarin/Tennis-MoCap) into data/mocap-raw (gitignored).
set -e
cd "$(dirname "$0")/../.."
mkdir -p data/mocap-raw
base=https://raw.githubusercontent.com/jdpulgarin/Tennis-MoCap/HEAD/data
for f in jarua_Derecha_18seg jarua_Remate jarua_Reves jarua_Servicio jarua_VDerecha jarua_VReves \
  jduribe_Derecha jduribe_Remate jduribe_Reves jduribe_Servicio jduribe_VDerecha jduribe_VReves \
  jgacosta_Derecha jgacosta_Remate jgacosta_Reves jgacosta_Servicio jgacosta_VDerecha jgacosta_VReves \
  lvargas_Derecha_7seg lvargas_Remate lvargas_Reves lvargas_Servicio_21seg lvargas_VDerecha lvargas_VReves; do
  [ -s "data/mocap-raw/$f.bvh" ] || curl -sfL -o "data/mocap-raw/$f.bvh" "$base/$f.bvh" || echo "missing $f"
done
ls data/mocap-raw | wc -l
