/*
 * Halaman "Rujukan" — mendaftar SELURUH dalil yang dipakai situs.
 *
 * Daftarnya dibangun dari data/dalil.js, bukan diketik ulang. Jadi tidak
 * mungkin ada dalil yang dipakai di halaman gerakan tapi tidak muncul di
 * sini, atau sebaliknya.
 */

(function () {
  'use strict';

  var U = window.UIDalil;
  var wadahQuran = document.getElementById('daftar-quran');
  var wadahHadits = document.getElementById('daftar-hadits');
  var elJumlah = document.getElementById('jumlah-dalil');
  if (!wadahQuran || !wadahHadits) return;

  var kunci = Object.keys(window.DALIL);
  var quran = kunci.filter(function (k) { return window.DALIL[k].jenis === 'quran'; });
  var hadits = kunci.filter(function (k) { return window.DALIL[k].jenis === 'hadits'; });

  // Hadits diurutkan menurut kitabnya lalu nomornya, supaya mudah dicari.
  hadits.sort(function (a, b) {
    var pa = a.split('-'), pb = b.split('-');
    if (pa[0] !== pb[0]) return pa[0] < pb[0] ? -1 : 1;
    return parseInt(pa[1], 10) - parseInt(pb[1], 10);
  });

  /*
   * Menandai dalil dipakai di mana saja, supaya pembaca bisa menelusuri
   * balik dari sumber ke tempat pemakaiannya.
   *
   * Pemakaian di halaman gerakan dibaca langsung dari datanya. Pemakaian
   * di halaman teks (Persiapan dan Dzikir) tidak bisa dibaca dari sini —
   * halamannya tidak dimuat — jadi didaftar tangan di bawah. Kalau ada
   * dalil yang dipakai di halaman teks tapi lupa didaftarkan, akibatnya
   * hanya keterangan "dipakai pada" yang kurang lengkap, bukan kutipan
   * yang salah.
   */
  var HALAMAN_TEKS = {
    'qs5-6': 'halaman Persiapan',
    'qs4-103': 'halaman Persiapan',
    'qs2-144': 'halaman Persiapan',
    'tirmidzi-3': 'halaman Persiapan',
    'bukhari-1': 'halaman Persiapan',
    'qs20-14': 'halaman Persiapan',
    'qs23-1': 'halaman Persiapan',
    'muslim-591': 'halaman Dzikir',
    'muslim-595': 'halaman Dzikir',
    'muslim-597': 'halaman Dzikir',
    'bukhari-631': 'halaman Beranda'
  };

  var pemakai = {};
  Object.keys(HALAMAN_TEKS).forEach(function (k) {
    pemakai[k] = {};
    pemakai[k][HALAMAN_TEKS[k]] = true;
  });

  function tandai(kunci, nama) {
    pemakai[kunci] = pemakai[kunci] || {};
    pemakai[kunci][nama] = true;
  }

  window.GERAKAN.forEach(function (g) {
    window.URUTAN_MAZHAB.forEach(function (m) {
      var bentuk = window.gerakanMenurut(g, m);
      bentuk.dalil.forEach(function (d) { tandai(d.k, g.nama); });
      // Bacaan menyimpan dalilnya sendiri — misalnya Al-Fatihah dan surah
      // pendek — dan itu ikut dihitung sebagai pemakaian.
      (bentuk.bacaan || []).forEach(function (b) {
        ((window.BACAAN[b] || {}).dalil || []).forEach(function (k) { tandai(k, g.nama); });
      });
    });
  });

  function gambar(daftar, wadah) {
    wadah.innerHTML = daftar.map(function (k) {
      var dipakai = Object.keys(pemakai[k] || {});
      var jejak = dipakai.length
        ? '<p class="rujukan-jejak">Dipakai pada: ' + U.aman(dipakai.join(', ')) + '</p>'
        : '';
      return '<div class="rujukan-item">' + U.kartuDalil(k, null) + jejak + '</div>';
    }).join('');
  }

  gambar(quran, wadahQuran);
  gambar(hadits, wadahHadits);
  if (elJumlah) {
    elJumlah.textContent = kunci.length + ' sumber — ' + quran.length +
      ' dari Al-Qur\'an, ' + hadits.length + ' dari hadits';
  }
})();
