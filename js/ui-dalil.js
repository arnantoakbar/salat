/*
 * Penyaji dalil dan bacaan — dipakai bersama oleh semua halaman.
 *
 * Aturan yang dijaga di sini: teks dalil SELALU ditampilkan utuh. Bagian
 * yang sedang dibahas hanya disorot, sisanya diredupkan tapi tetap terbaca.
 * Kalau penanda sorotnya tidak ketemu di dalam teks, teks tetap tampil apa
 * adanya tanpa sorotan — lebih baik kehilangan sorotan daripada kehilangan
 * sebagian kutipan.
 */

(function (root) {
  'use strict';

  function aman(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function ikon(id, kelas) {
    return '<svg class="ic ' + (kelas || '') + '" aria-hidden="true"><use href="#' + id + '"></use></svg>';
  }

  /*
   * Menyorot satu penggal di dalam teks tanpa membuang apa pun. Penggal yang
   * dirujuk dibungkus <mark>, bagian lain diberi kelas redup.
   */
  function sorotkan(teks, penggal) {
    if (!penggal) return aman(teks);
    var i = teks.indexOf(penggal);
    if (i < 0) return aman(teks);
    return '<span class="ayat-redup">' + aman(teks.slice(0, i)) + '</span>' +
      '<mark class="ayat-sorot">' + aman(penggal) + '</mark>' +
      '<span class="ayat-redup">' + aman(teks.slice(i + penggal.length)) + '</span>';
  }

  // Derajat hadits ditampilkan apa adanya, termasuk ketika lemah.
  function lencanaDerajat(derajat) {
    if (!derajat) return '';
    var lemah = /dha'?if|dhaif|lemah/i.test(derajat);
    return '<span class="badge ' + (lemah ? 'badge-lemah' : 'badge-green') + '">' +
      aman(derajat) + '</span>';
  }

  function kartuDalil(kunci, namaSorot) {
    var d = root.DALIL[kunci];
    if (!d) return '';
    var penggal = namaSorot && d.sorot ? d.sorot[namaSorot] : null;
    var h = '<div class="dalil">';
    h += '<div class="dalil-rujukan">' + aman(d.rujukan);
    if (d.perawi) h += '<span class="dalil-klausa">' + aman(d.perawi) + '</span>';
    h += '</div>';

    if (d.jenis === 'quran') {
      d.ayat.forEach(function (a) {
        h += '<div class="dalil-arab" lang="ar" dir="rtl">' + aman(a.arab) + '</div>';
        h += '<div class="dalil-latin">' + aman(a.latin) + '</div>';
        h += '<div class="dalil-terjemah">' + sorotkan(a.arti, penggal) +
          ' <span class="dalil-nomor">(' + a.no + ')</span></div>';
      });
    } else {
      h += '<div class="dalil-arab" lang="ar" dir="rtl">' + aman(d.arab) + '</div>';
      h += '<div class="dalil-terjemah">' + sorotkan(d.terjemah, penggal) + '</div>';
    }

    if (d.derajat) h += '<div class="dalil-sumber">' + lencanaDerajat(d.derajat) + '</div>';
    if (d.ringkas) h += '<p class="dalil-ringkas">' + aman(d.ringkas) + '</p>';

    h += '<div class="dalil-tautan">';
    h += '<a href="' + aman(d.tautan) + '" target="_blank" rel="noopener noreferrer">' +
      ikon('i-tautan', 'ic-sm') + 'Periksa di sumbernya</a>';
    if (d.tautan2) {
      h += '<a href="' + aman(d.tautan2) + '" target="_blank" rel="noopener noreferrer">' +
        ikon('i-tautan', 'ic-sm') + 'Baca surahnya</a>';
    }
    h += '</div></div>';
    return h;
  }

  function kartuBacaan(kunci) {
    var b = root.BACAAN[kunci];
    if (!b) return '';
    var h = '<div class="bacaan">';
    h += '<div class="bacaan-kepala"><h3 class="bacaan-judul">' + aman(b.judul) + '</h3></div>';

    if (b.ayat) {
      b.ayat.forEach(function (a) {
        h += '<div class="bacaan-ayat">';
        h += '<div class="bacaan-arab" lang="ar" dir="rtl">' + aman(a.arab) + '</div>';
        h += '<div class="bacaan-latin">' + aman(a.latin) + '</div>';
        h += '<div class="bacaan-arti">' + aman(a.arti) + '</div>';
        h += '</div>';
      });
    } else {
      h += '<div class="bacaan-arab" lang="ar" dir="rtl">' + aman(b.arab) + '</div>';
      h += '<div class="bacaan-latin">' + aman(b.latin) + '</div>';
      h += '<div class="bacaan-arti">' + aman(b.arti) + '</div>';
    }

    if (b.catatan) h += '<p class="bacaan-status">' + aman(b.catatan) + '</p>';
    h += '</div>';
    return h;
  }

  /* Kotak "kenapa berbeda?" — posisi tiap mazhab, yang sedang dipilih ditandai. */
  function kartuBeda(beda, mazhabKini) {
    if (!beda) return '';
    var h = '<div class="beda">';
    h += '<div class="beda-judul">' + ikon('i-info') + aman(beda.judul) + '</div>';
    h += '<p>' + aman(beda.teks) + '</p>';

    if (beda.posisi) {
      h += '<div class="beda-tabel">';
      root.URUTAN_MAZHAB.forEach(function (m) {
        if (!beda.posisi[m]) return;
        h += '<div class="beda-baris' + (m === mazhabKini ? ' kini' : '') + '">' +
          '<b>' + aman(root.MAZHAB[m].nama) + '</b>' +
          '<span>' + aman(beda.posisi[m]) + '</span></div>';
      });
      h += '</div>';
    }

    if (beda.catatan) h += '<p class="beda-catatan">' + aman(beda.catatan) + '</p>';
    h += '</div>';
    return h;
  }

  function akordeon(judul, ikonId, isi, terbuka) {
    return '<details class="akordeon"' + (terbuka ? ' open' : '') + '>' +
      '<summary>' + ikon(ikonId, 'ic-sm') + aman(judul) +
      ikon('i-chevron', 'ic-sm akordeon-panah') + '</summary>' +
      '<div class="akordeon-isi">' + isi + '</div></details>';
  }

  root.UIDalil = {
    aman: aman,
    ikon: ikon,
    kartuDalil: kartuDalil,
    kartuBacaan: kartuBacaan,
    kartuBeda: kartuBeda,
    akordeon: akordeon
  };
})(window);
