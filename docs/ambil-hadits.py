#!/usr/bin/env python3
"""Ambil satu hadits dari hadits.id: teks Arab, latin, terjemahan, derajat.

Dipakai sekali saat kurasi. Hasilnya disalin apa adanya ke data/dalil.js
supaya teks di situs benar-benar sama dengan sumbernya.
"""
import html, json, re, subprocess, sys, time

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36"

def bersih(t):
    t = re.sub(r'<[^>]+>', '', t)
    t = html.unescape(t)
    t = t.replace(' ', ' ')
    return re.sub(r'\s+', ' ', t).strip()

def ambil(url):
    out = subprocess.run(['curl', '-s', '--max-time', '30', '-A', UA, url],
                         capture_output=True, text=True)
    s = out.stdout
    if not s:
        return {'url': url, 'gagal': 'kosong'}
    def span(idn):
        m = re.search(r'id="%s"[^>]*>(.*?)</span>' % idn, s, re.S)
        return bersih(m.group(1)) if m else None
    grade = re.search(r'class="grade-text">(.*?)</span>', s, re.S)
    judul = re.search(r'<title>(.*?)</title>', s, re.S)
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', s, re.S)
    return {
        'url': url,
        'judul': bersih(judul.group(1)) if judul else None,
        'h1': bersih(h1.group(1)) if h1 else None,
        'derajat': bersih(grade.group(1)) if grade else None,
        'arab': span('hadits-arab-text'),
        'latin': span('hadits-bacaan'),
        'indo': span('hadits-indo-text'),
    }

if __name__ == '__main__':
    hasil = []
    for u in sys.argv[1:]:
        hasil.append(ambil(u))
        time.sleep(1.2)
    print(json.dumps(hasil, ensure_ascii=False, indent=1))
