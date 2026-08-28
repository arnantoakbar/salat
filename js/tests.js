/*
 * Uji data — dijalankan di peramban lewat tests.html.
 *
 * Yang diuji di sini bukan tampilannya, melainkan hal-hal yang kalau salah
 * akan membuat situs ini menyesatkan orang: dalil yang hilang, bacaan tanpa
 * arti, pose yang tidak ada, sorotan yang tidak cocok dengan teksnya, atau
 * gerakan yang tidak punya rujukan sama sekali.
 *
 * Kode bisa diuji seperti ini; keabsahan kutipannya tidak. Untuk itu tetap
 * perlu diperiksa orang yang paham — lihat catatan di halaman Rujukan.
 */

(function (root) {
  'use strict';

  var hasil = [];

  function uji(nama, fn) {
    try {
      var pesan = fn();
      hasil.push({ nama: nama, lulus: true, pesan: pesan || 'lulus' });
    } catch (e) {
      hasil.push({ nama: nama, lulus: false, pesan: e.message });
    }
  }

  function pastikan(syarat, pesan) {
    if (!syarat) throw new Error(pesan);
  }

  var POSE_ADA = Object.keys(root.POSE ? root.POSE.POSES : {});
  var SOROT_ADA = Object.keys(root.KAMERA ? root.KAMERA.SOROTAN : {});

  /* ── Dalil ───────────────────────────────────────────────────── */

  uji('Setiap dalil punya rujukan, teks, dan tautan', function () {
    var n = 0;
    Object.keys(root.DALIL).forEach(function (k) {
      var d = root.DALIL[k];
      pastikan(d.rujukan, k + ': tidak ada label rujukan');
      pastikan(d.tautan && /^https:\/\//.test(d.tautan), k + ': tautan tidak sah');
      pastikan(d.ringkas, k + ': tidak ada ringkasan');
      if (d.jenis === 'quran') {
        pastikan(d.ayat && d.ayat.length, k + ': tidak ada ayat');
        d.ayat.forEach(function (a) {
          pastikan(a.arab && a.latin && a.arti, k + ' ayat ' + a.no + ': ada bagian kosong');
        });
      } else {
        pastikan(d.arab && d.arab.length > 20, k + ': teks Arab kosong atau terlalu pendek');
        pastikan(d.terjemah && d.terjemah.length > 20, k + ': terjemahan kosong');
        pastikan(d.derajat, k + ': derajat hadits tidak dicantumkan');
        pastikan(d.perawi, k + ': perawi tidak dicantumkan');
      }
      n++;
    });
    return n + ' dalil diperiksa';
  });

  uji('Setiap penanda sorot benar-benar ada di dalam teksnya', function () {
    var n = 0;
    Object.keys(root.DALIL).forEach(function (k) {
      var d = root.DALIL[k];
      Object.keys(d.sorot || {}).forEach(function (nama) {
        var penggal = d.sorot[nama];
        var teks = d.jenis === 'quran'
          ? d.ayat.map(function (a) { return a.arti; }).join(' ')
          : d.terjemah;
        pastikan(teks.indexOf(penggal) >= 0,
          k + '/' + nama + ': penggal tidak ditemukan di terjemahannya');
        n++;
      });
    });
    return n + ' penanda sorot cocok dengan teksnya';
  });

  /* ── Bacaan ──────────────────────────────────────────────────── */

  uji('Setiap bacaan punya teks Arab, cara baca, arti, dan dalil', function () {
    var n = 0;
    Object.keys(root.BACAAN).forEach(function (k) {
      var b = root.BACAAN[k];
      pastikan(b.judul, k + ': tidak ada judul');
      pastikan(b.dalil && b.dalil.length, k + ': tidak menyebut dalil');
      b.dalil.forEach(function (d) {
        pastikan(root.DALIL[d], k + ': menunjuk dalil yang tidak ada — ' + d);
      });
      if (b.ayat) {
        b.ayat.forEach(function (a) {
          pastikan(a.arab && a.latin && a.arti, k + ': ada ayat yang tidak lengkap');
        });
      } else {
        pastikan(b.arab, k + ': teks Arab kosong');
        pastikan(b.latin, k + ': cara baca kosong');
        pastikan(b.arti, k + ': arti kosong');
      }
      n++;
    });
    return n + ' bacaan diperiksa';
  });

  /* ── Gerakan ─────────────────────────────────────────────────── */

  uji('Tiap gerakan lengkap untuk keempat mazhab', function () {
    var n = 0;
    root.GERAKAN.forEach(function (g) {
      root.URUTAN_MAZHAB.forEach(function (m) {
        var b = root.gerakanMenurut(g, m);
        pastikan(b.langkah && b.langkah.length, g.id + '/' + m + ': tidak ada langkah');
        pastikan(b.dalil && b.dalil.length, g.id + '/' + m + ': tidak ada dalil');
        pastikan(b.ringkas && b.hukum, g.id + ': ringkasan atau hukum kosong');
        b.langkah.forEach(function (l) {
          pastikan(POSE_ADA.indexOf(l.pose) >= 0,
            g.id + '/' + m + ': pose tidak dikenal — ' + l.pose);
          pastikan(l.tahap, g.id + '/' + m + ': ada langkah tanpa keterangan tahap');
          if (l.sorot) {
            pastikan(SOROT_ADA.indexOf(l.sorot) >= 0,
              g.id + '/' + m + ': sudut kamera langkah tidak dikenal — ' + l.sorot);
          }
        });
        pastikan(SOROT_ADA.indexOf(b.sorot) >= 0,
          g.id + '/' + m + ': sudut kamera tidak dikenal — ' + b.sorot);
        b.dalil.forEach(function (d) {
          pastikan(root.DALIL[d.k], g.id + '/' + m + ': dalil tidak ada — ' + d.k);
          if (d.sorot) {
            pastikan((root.DALIL[d.k].sorot || {})[d.sorot],
              g.id + '/' + m + ': sorot tidak ada — ' + d.k + '/' + d.sorot);
          }
        });
        (b.bacaan || []).forEach(function (x) {
          pastikan(root.BACAAN[x], g.id + '/' + m + ': bacaan tidak ada — ' + x);
        });
        n++;
      });
    });
    return n + ' kombinasi gerakan x mazhab diperiksa';
  });

  uji('Perbedaan antar mazhab dijelaskan dengan posisi keempatnya', function () {
    var n = 0;
    root.GERAKAN.forEach(function (g) {
      if (!g.beda) throw new Error(g.id + ': tidak ada penjelasan perbedaan');
      pastikan(g.beda.judul && g.beda.teks, g.id + ': penjelasan perbedaan tidak lengkap');
      if (g.beda.posisi) {
        root.URUTAN_MAZHAB.forEach(function (m) {
          pastikan(g.beda.posisi[m], g.id + ': posisi ' + m + ' tidak disebutkan');
        });
        n++;
      }
    });
    return n + ' gerakan menjelaskan posisi keempat mazhab';
  });

  uji('Gerakan yang berbeda antar mazhab benar-benar menghasilkan pose berbeda', function () {
    var beda = [];
    root.GERAKAN.forEach(function (g) {
      if (!g.varian) return;
      var sidik = {};
      root.URUTAN_MAZHAB.forEach(function (m) {
        sidik[m] = root.gerakanMenurut(g, m).langkah.map(function (l) { return l.pose; }).join('>');
      });
      var unik = {};
      Object.keys(sidik).forEach(function (m) { unik[sidik[m]] = true; });
      pastikan(Object.keys(unik).length > 1,
        g.id + ': punya varian mazhab tapi posenya sama semua');
      beda.push(g.id);
    });
    return beda.length + ' gerakan punya peragaan yang memang berbeda';
  });

  /* ── Rangkaian salat ─────────────────────────────────────────── */

  uji('Rangkaian tiap waktu salat masuk akal', function () {
    var n = 0;
    root.WAKTU_SALAT.forEach(function (w) {
      root.URUTAN_MAZHAB.forEach(function (m) {
        var r = root.susunRakaat(w.id, m);
        pastikan(r.length > 0, w.id + '/' + m + ': rangkaian kosong');

        var salam = r.filter(function (x) { return x.gerakan === 'salam'; });
        pastikan(salam.length === 1, w.id + '/' + m + ': salam harus tepat satu kali');
        pastikan(r[r.length - 1].gerakan === 'salam',
          w.id + '/' + m + ': rangkaian tidak diakhiri salam');
        pastikan(r[0].gerakan === 'berdiri', w.id + '/' + m + ': tidak dimulai dari berdiri');
        pastikan(r[1].gerakan === 'takbiratul-ihram',
          w.id + '/' + m + ': takbiratul ihram bukan yang kedua');

        var takbir = r.filter(function (x) { return x.gerakan === 'takbiratul-ihram'; });
        pastikan(takbir.length === 1, w.id + '/' + m + ': takbiratul ihram harus sekali');

        var fatihah = r.filter(function (x) { return x.gerakan === 'membaca'; });
        pastikan(fatihah.length === w.rakaat,
          w.id + '/' + m + ': Al-Fatihah harus dibaca di tiap rakaat');

        var rukuk = r.filter(function (x) { return x.gerakan === 'rukuk'; });
        pastikan(rukuk.length === w.rakaat, w.id + '/' + m + ': jumlah rukuk tidak sesuai rakaat');

        var tasyahudAwal = r.filter(function (x) { return x.gerakan === 'tasyahud-awal'; });
        pastikan(tasyahudAwal.length === (w.rakaat > 2 ? 1 : 0),
          w.id + '/' + m + ': tasyahud awal hanya untuk salat lebih dari dua rakaat');

        var qunut = r.filter(function (x) { return x.gerakan === 'qunut'; });
        var harusQunut = w.qunut && (m === 'syafii' || m === 'maliki');
        pastikan(qunut.length === (harusQunut ? 1 : 0),
          w.id + '/' + m + ': qunut tidak sesuai pendapat mazhabnya');

        n++;
      });
    });
    return n + ' rangkaian salat diperiksa';
  });

  uji('Setiap sujud selalu berpasangan dengan duduk di antaranya', function () {
    var n = 0;
    root.WAKTU_SALAT.forEach(function (w) {
      var r = root.susunRakaat(w.id, 'syafii');
      var duduk = r.filter(function (x) { return x.gerakan === 'duduk-antara-sujud'; });
      pastikan(duduk.length === w.rakaat,
        w.id + ': duduk antara dua sujud harus ada di tiap rakaat');
      n++;
    });
    return n + ' waktu salat diperiksa';
  });

  /* ── Pose ────────────────────────────────────────────────────── */

  uji('Setiap pose menyebut posisi panggul dan sudut sendi', function () {
    var n = 0;
    POSE_ADA.forEach(function (nama) {
      var p = root.POSE.POSES[nama];
      pastikan(p.pos && p.pos.length === 3, nama + ': posisi panggul tidak lengkap');
      pastikan(p.rot && Object.keys(p.rot).length, nama + ': tidak ada sudut sendi');
      Object.keys(p.rot).forEach(function (sendi) {
        var d = p.rot[sendi];
        pastikan(d.length === 3, nama + '/' + sendi + ': sudut harus tiga angka');
        d.forEach(function (x) {
          pastikan(typeof x === 'number' && isFinite(x),
            nama + '/' + sendi + ': ada sudut yang bukan angka');
        });
      });
      n++;
    });
    return n + ' pose diperiksa';
  });

  root.UJI = { jalankan: function () { return hasil; } };
})(window);
