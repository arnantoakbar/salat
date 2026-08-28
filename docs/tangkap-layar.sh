#!/bin/bash
# Mengambil ulang tangkapan layar untuk README.
#
# Memakai Chrome tanpa jendela dengan WebGL perangkat lunak, supaya model
# 3D-nya ikut tergambar dan hasilnya sama di komputer siapa pun.
#
# Cara pakai — jalankan server statis dulu di folder proyek:
#   python3 -m http.server 8471
#   bash docs/tangkap-layar.sh
#
# Parameter ?langkah=N pada halaman gerakan menahan peragaan di satu sikap,
# jadi gambar yang dihasilkan selalu sikap yang sama — bukan sikap acak
# tergantung kapan tangkapan layar diambil.
set -e

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
ASAL="${ASAL:-http://localhost:8471}"
KE="$(dirname "$0")/gambar"
mkdir -p "$KE"

jepret() { # jepret <berkas> <lebar> <tinggi> <waktu-ms> <alamat>
  echo "  $1"
  "$CHROME" --headless=new --use-gl=angle --use-angle=swiftshader \
    --enable-unsafe-swiftshader --hide-scrollbars --force-device-scale-factor=2 \
    --screenshot="$KE/$1" --window-size="$2,$3" --virtual-time-budget="$4" \
    "$ASAL/$5" 2>/dev/null || true
}

echo "Mengambil tangkapan layar..."
jepret 01-beranda.png     1280 860  5000 "index.html"
jepret 02-gerakan.png     1280 900  4000 "gerakan.html?g=sujud&m=syafii&langkah=2"
jepret 03-takbir-syafii.png 1280 900 4000 "gerakan.html?g=takbiratul-ihram&m=syafii&langkah=1"
jepret 04-takbir-hanafi.png 1280 900 4000 "gerakan.html?g=takbiratul-ihram&m=hanafi&langkah=1"
jepret 05-dalil.png       1280 1100 4000 "gerakan.html?g=sujud&m=maliki&langkah=2"
jepret 06-lengkap.png     1280 1000 8000 "lengkap.html?w=subuh&m=syafii"
jepret 07-rujukan.png     1280 900  4000 "rujukan.html"
jepret 08-persiapan.png   1280 900  4000 "persiapan.html"
jepret 09-uji.png         1280 900  4000 "tests.html"
jepret 10-ponsel.png      390  844  4000 "gerakan.html?g=rukuk&m=syafii&langkah=2"
echo "Selesai. Hasilnya di $KE"
