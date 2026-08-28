/*
 * Halaman "Salat Lengkap".
 *
 * Menjalankan satu salat utuh dari takbiratul ihram sampai salam: gerakan
 * demi gerakan, otomatis maju sendiri, sambil menunjukkan sedang di rakaat
 * ke berapa. Gerakan dan dalilnya diambil dari data yang sama dengan
 * halaman "Gerakan", jadi tidak ada versi kedua yang bisa berbeda.
 */

(function () {
  'use strict';

  var U = window.UIDalil;
  var panggung = document.getElementById('panggung');
  if (!panggung) return;

  var elWaktu = document.getElementById('waktu');
  var elMazhab = document.getElementById('mazhab');
  var elNama = document.getElementById('panggung-nama');
  var elTahap = document.getElementById('panggung-tahap');
  var elKemajuan = document.getElementById('kemajuan');
  var elDaftar = document.getElementById('daftar-langkah');
  var elIsi = document.getElementById('isi');
  var elKeterangan = document.getElementById('keterangan-waktu');
  var btnJeda = document.getElementById('btn-jeda');
  var btnUlang = document.getElementById('btn-ulang');

  var viewer = null;
  var rangkaian = [];
  var posisi = 0;
  var pewaktu = null;

  var kini = (function () {
    var p = new URLSearchParams(location.search);
    var w = p.get('w');
    var m = p.get('m');
    return {
      waktu: window.cariWaktu(w) ? w : 'subuh',
      mazhab: window.MAZHAB[m] ? m : 'syafii'
    };
  })();

  /* ── Susun rangkaian ─────────────────────────────────────────── */

  function bangunRangkaian() {
    rangkaian = window.susunRakaat(kini.waktu, kini.mazhab).map(function (item) {
      var g = window.gerakanMenurut(window.cariGerakan(item.gerakan), kini.mazhab);
      return { info: item, bentuk: g };
    });
    posisi = 0;
  }

  // Lama satu gerakan diperagakan = jumlah waktu semua langkahnya.
  function durasi(bentuk) {
    var t = 0;
    bentuk.langkah.forEach(function (l) { t += (l.gerak || 700) + (l.tahan || 900); });
    return t;
  }

  function tampilkan(n, otomatis) {
    if (!rangkaian.length) return;
    posisi = (n + rangkaian.length) % rangkaian.length;
    var item = rangkaian[posisi];
    var w = window.cariWaktu(kini.waktu);

    elNama.textContent = item.bentuk.nama;
    elKemajuan.textContent = 'Rakaat ke-' + item.info.rakaat + ' dari ' + w.rakaat +
      ' · langkah ' + (posisi + 1) + ' dari ' + rangkaian.length;

    if (viewer && viewer.siap) viewer.setLangkah(item.bentuk.langkah, item.bentuk.sorot);

    gambarDaftar();
    gambarPanel(item);

    clearTimeout(pewaktu);
    if (otomatis !== false) {
      pewaktu = setTimeout(function () { tampilkan(posisi + 1); }, durasi(item.bentuk) + 400);
    }
  }

  function gambarDaftar() {
    elDaftar.innerHTML = rangkaian.map(function (item, i) {
      return '<button type="button" data-i="' + i + '"' +
        (i === posisi ? ' aria-current="true"' : '') + '>' +
        '<span class="urutan-nomor">' + item.info.rakaat + '</span>' +
        U.aman(item.info.label) + '</button>';
    }).join('');

    var aktif = elDaftar.querySelector('[aria-current="true"]');
    if (aktif) {
      var kw = elDaftar.getBoundingClientRect(), kc = aktif.getBoundingClientRect();
      elDaftar.scrollTo({
        left: Math.max(0, elDaftar.scrollLeft + (kc.left - kw.left) - (kw.width - kc.width) / 2),
        behavior: 'smooth'
      });
    }
  }

  function gambarPanel(item) {
    var h = '';
    h += '<div class="blok"><h3 class="blok-judul">' + U.ikon('i-mata', 'ic-sm') +
      U.aman(item.bentuk.nama) + '</h3>' +
      '<p class="flav-body-sm">' + U.aman(item.bentuk.ringkas) + '</p></div>';

    if (item.bentuk.bacaan && item.bentuk.bacaan.length) {
      h += '<div class="blok"><h3 class="blok-judul">' + U.ikon('i-kitab', 'ic-sm') +
        'Bacaannya</h3>';
      item.bentuk.bacaan.forEach(function (b) {
        // Surah pendek hanya dibaca pada dua rakaat pertama.
        if (b === 'ikhlas' && item.info.rakaat > 2) return;
        h += U.kartuBacaan(b);
      });
      h += '</div>';
    }

    var isiDalil = item.bentuk.dalil.map(function (d) { return U.kartuDalil(d.k, d.sorot); }).join('');
    h += U.akordeon('Dalil gerakan ini (' + item.bentuk.dalil.length + ')', 'i-dokumen', isiDalil, false);

    if (item.bentuk.beda) h += U.kartuBeda(item.bentuk.beda, kini.mazhab);

    elIsi.innerHTML = h;
  }

  /* ── Kontrol ─────────────────────────────────────────────────── */

  function gambarWaktu() {
    elWaktu.innerHTML = window.WAKTU_SALAT.map(function (w) {
      return '<button type="button" class="pilih-kartu" data-w="' + w.id + '"' +
        (w.id === kini.waktu ? ' aria-current="true"' : '') + '>' +
        '<span class="pilih-ikon">' + U.ikon('i-masjid') + '</span>' +
        '<span class="pilih-nama">' + U.aman(w.nama) + '</span>' +
        '<span class="pilih-desk">' + w.rakaat + ' rakaat</span></button>';
    }).join('');
  }

  function gambarMazhab() {
    elMazhab.innerHTML = window.URUTAN_MAZHAB.map(function (m) {
      return '<button type="button" data-m="' + m + '" aria-pressed="' +
        (m === kini.mazhab) + '">' + U.aman(window.MAZHAB[m].nama) + '</button>';
    }).join('');
  }

  function gambarKeterangan() {
    var w = window.cariWaktu(kini.waktu);
    var pakaiQunut = w.qunut && (kini.mazhab === 'syafii' || kini.mazhab === 'maliki');
    var h = '<strong>' + U.aman(w.nama) + ' — ' + w.rakaat + ' rakaat.</strong> ' +
      U.aman(w.suara) + ' ' + U.aman(w.catatan);
    if (w.qunut) {
      h += ' <span class="' + (pakaiQunut ? 'sorot' : '') + '">' +
        (pakaiQunut
          ? 'Menurut rujukan yang kamu pilih, qunut dibaca pada rakaat kedua.'
          : 'Menurut rujukan yang kamu pilih, tidak ada qunut pada salat Subuh.') +
        '</span>';
    }
    elKeterangan.innerHTML = h;
  }

  function perbarui() {
    gambarWaktu();
    gambarMazhab();
    gambarKeterangan();
    bangunRangkaian();
    tampilkan(0);
    history.replaceState(null, '', 'lengkap.html?w=' + kini.waktu + '&m=' + kini.mazhab);
  }

  elWaktu.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-w]');
    if (!b || b.getAttribute('data-w') === kini.waktu) return;
    kini.waktu = b.getAttribute('data-w');
    perbarui();
  });

  elMazhab.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-m]');
    if (!b || b.getAttribute('data-m') === kini.mazhab) return;
    kini.mazhab = b.getAttribute('data-m');
    perbarui();
  });

  elDaftar.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-i]');
    if (b) tampilkan(parseInt(b.getAttribute('data-i'), 10));
  });

  btnJeda.addEventListener('click', function () {
    if (!viewer || !viewer.siap) return;
    var jalan = !viewer.jalan;
    viewer.setJalan(jalan);
    if (jalan) {
      tampilkan(posisi);
    } else {
      clearTimeout(pewaktu);
    }
    btnJeda.setAttribute('aria-label', jalan ? 'Jeda' : 'Jalankan');
    btnJeda.innerHTML = '<svg class="ic" aria-hidden="true"><use href="#' +
      (jalan ? 'i-jeda' : 'i-putar') + '"></use></svg>';
  });

  btnUlang.addEventListener('click', function () { tampilkan(0); });

  /* ── Mulai ───────────────────────────────────────────────────── */

  if (window.VIEWER && window.THREE) {
    viewer = window.VIEWER.buat(panggung, {
      onTahap: function (i, langkah) { elTahap.textContent = langkah.tahap || ''; }
    });
  } else {
    panggung.classList.add('tanpa-webgl');
  }

  perbarui();
})();
