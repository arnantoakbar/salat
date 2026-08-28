/*
 * Demo di halaman utama.
 *
 * Bukan video dan bukan gambar: yang berjalan di sini adalah panggung 3D
 * yang sama persis dengan yang dipakai di halaman gerakan, memakai data
 * gerakan dan dalil yang sama pula. Jadi yang dilihat pengunjung di layar
 * pertama memang begitulah alat ini bekerja.
 *
 * Empat adegan, berputar terus:
 *   1. takbiratul ihram menurut Syafi'i
 *   2. gerakan yang sama menurut Hanafi — memperlihatkan bahwa mengganti
 *      rujukan langsung mengubah gerakannya
 *   3. rukuk
 *   4. sujud
 */

(function () {
  'use strict';

  var panggung = document.getElementById('demo-panggung');
  if (!panggung || !window.VIEWER || !window.THREE) {
    if (panggung) panggung.classList.add('tanpa-webgl');
    return;
  }

  var elTahap = document.getElementById('demo-tahap');
  var elKeterangan = document.getElementById('demo-keterangan');
  var elTitik = document.getElementById('demo-titik');

  var ADEGAN = [
    {
      gerakan: 'takbiratul-ihram', mazhab: 'syafii',
      label: 'Langkah 1 — Pilih gerakan',
      teks: 'Pilih gerakan yang mau kamu lihat. Modelnya memperagakan berulang-ulang ' +
        'dari sudut yang paling jelas — takbiratul ihram disorot dari dekat, kepala sampai ' +
        'setengah badan.'
    },
    {
      gerakan: 'takbiratul-ihram', mazhab: 'hanafi',
      label: 'Langkah 2 — Ganti rujukan',
      teks: 'Ganti mazhab, gerakannya menyesuaikan seketika. Di sini tangan naik sampai ' +
        'sejajar telinga — riwayat Wail bin Hujr, sama sahihnya dengan yang tadi.'
    },
    {
      gerakan: 'rukuk', mazhab: 'syafii',
      label: 'Langkah 3 — Lihat bacaannya',
      teks: 'Tiap gerakan datang bersama bacaannya: teks Arab, cara bacanya, dan artinya ' +
        'dalam bahasa sehari-hari.'
    },
    {
      gerakan: 'sujud', mazhab: 'syafii',
      label: 'Langkah 4 — Periksa dalilnya',
      teks: 'Di bawah animasi ada dalilnya, ditampilkan utuh dengan tautan ke sumbernya. ' +
        'Kamu tidak perlu percaya pada situs ini — periksa sendiri.'
    }
  ];

  var idx = -1;
  var pewaktu = null;
  var viewer = window.VIEWER.buat(panggung, {});

  function gambarTitik() {
    elTitik.innerHTML = ADEGAN.map(function (a, i) {
      return '<button type="button" class="' + (i === idx ? 'on' : '') +
        '" aria-label="Adegan ' + (i + 1) + '"></button>';
    }).join('');
  }

  function tampilkan(n) {
    idx = (n + ADEGAN.length) % ADEGAN.length;
    var a = ADEGAN[idx];
    var g = window.gerakanMenurut(window.cariGerakan(a.gerakan), a.mazhab);

    elTahap.textContent = a.label;
    elKeterangan.textContent = a.teks;
    if (viewer.siap) viewer.setLangkah(g.langkah, g.sorot);
    gambarTitik();

    clearTimeout(pewaktu);
    pewaktu = setTimeout(function () { tampilkan(idx + 1); }, 7000);
  }

  elTitik.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    tampilkan(Array.prototype.indexOf.call(elTitik.children, b));
  });

  tampilkan(0);
})();
