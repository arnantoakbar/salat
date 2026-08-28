/*
 * RAKAAT — merangkai gerakan menjadi satu salat utuh.
 *
 * Yang disimpan di sini hanya kerangkanya: berapa rakaat tiap waktu salat,
 * mana yang bacaannya dikeraskan, dan di rakaat mana duduk tasyahud awal
 * jatuh. Isi tiap gerakan tetap diambil dari data/gerakan.js, jadi satu
 * gerakan hanya ditulis sekali dan tidak mungkin berbeda antara halaman
 * "Gerakan" dan halaman "Salat Lengkap".
 */

(function (root) {
  'use strict';

  var WAKTU = [
    {
      id: 'subuh', nama: 'Subuh', rakaat: 2,
      suara: 'Dua rakaat dibaca dengan keras.',
      catatan: 'Waktunya dari terbit fajar sampai sebelum matahari terbit.',
      qunut: true
    },
    {
      id: 'zuhur', nama: 'Zuhur', rakaat: 4,
      suara: 'Semua rakaat dibaca dengan pelan.',
      catatan: 'Waktunya setelah matahari tergelincir dari titik tertinggi.'
    },
    {
      id: 'asar', nama: 'Asar', rakaat: 4,
      suara: 'Semua rakaat dibaca dengan pelan.',
      catatan: 'Waktunya sore hari sebelum matahari menguning dan terbenam.'
    },
    {
      id: 'maghrib', nama: 'Maghrib', rakaat: 3,
      suara: 'Dua rakaat pertama dibaca dengan keras, rakaat ketiga pelan.',
      catatan: 'Waktunya setelah matahari terbenam.'
    },
    {
      id: 'isya', nama: 'Isya', rakaat: 4,
      suara: 'Dua rakaat pertama dibaca dengan keras, sisanya pelan.',
      catatan: 'Waktunya setelah cahaya merah di langit hilang, sampai tengah malam.'
    }
  ];

  /*
   * Menyusun urutan gerakan satu salat penuh.
   *
   * Aturan yang dipakai:
   *   - Takbiratul ihram, bersedekap, dan doa iftitah hanya di rakaat pertama.
   *   - Surah pendek sesudah Al-Fatihah hanya di dua rakaat pertama; ini
   *     tercermin lewat penanda `surah`, bukan gerakan yang berbeda.
   *   - Tasyahud awal muncul di rakaat kedua, hanya kalau salatnya lebih
   *     dari dua rakaat.
   *   - Qunut hanya muncul di rakaat kedua Subuh, dan hanya untuk mazhab
   *     yang memang membacanya setiap hari.
   */
  function susun(waktuId, mazhab) {
    var w = null;
    WAKTU.forEach(function (x) { if (x.id === waktuId) w = x; });
    if (!w) return [];

    var pakaiQunut = w.qunut && (mazhab === 'syafii' || mazhab === 'maliki');
    var urut = [];

    function tambah(gerakanId, rakaat, label) {
      urut.push({ gerakan: gerakanId, rakaat: rakaat, label: label });
    }

    for (var r = 1; r <= w.rakaat; r++) {
      var akhir = (r === w.rakaat);

      if (r === 1) {
        tambah('berdiri', r, 'Berdiri dan niat');
        tambah('takbiratul-ihram', r, 'Takbiratul ihram');
        tambah('bersedekap', r, 'Bersedekap dan doa iftitah');
      }
      tambah('membaca', r, r <= 2 ? 'Al-Fatihah dan surah pendek' : 'Al-Fatihah saja');
      tambah('rukuk', r, 'Rukuk');
      tambah('itidal', r, "I'tidal");

      // Qunut dibaca sambil berdiri sesudah i'tidal rakaat kedua.
      if (pakaiQunut && r === 2) tambah('qunut', r, 'Qunut');

      tambah('sujud', r, 'Sujud pertama');
      tambah('duduk-antara-sujud', r, 'Duduk antara dua sujud');

      if (akhir) {
        tambah('tasyahud-akhir', r, 'Tasyahud akhir');
        tambah('salam', r, 'Salam');
      } else if (r === 2 && w.rakaat > 2) {
        tambah('tasyahud-awal', r, 'Tasyahud awal');
        tambah('bangkit', r, 'Bangkit ke rakaat ' + (r + 1));
      } else {
        tambah('bangkit', r, 'Bangkit ke rakaat ' + (r + 1));
      }
    }

    return urut;
  }

  function cariWaktu(id) {
    var hasil = null;
    WAKTU.forEach(function (w) { if (w.id === id) hasil = w; });
    return hasil;
  }

  root.WAKTU_SALAT = WAKTU;
  root.susunRakaat = susun;
  root.cariWaktu = cariWaktu;
})(window);
