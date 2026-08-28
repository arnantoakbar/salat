/*
 * Halaman "Lihat Gerakan".
 *
 * Alur: pilih gerakan → panggung 3D memperagakannya berulang, di bawahnya
 * bacaan dan dalilnya. Ganti gerakan atau ganti mazhab kapan pun, dan semua
 * ikut berubah SEKETIKA — animasinya tidak dimulai ulang dari nol, tapi
 * berpindah halus dari sikap badan yang sedang terlihat.
 *
 * Pilihan disimpan di alamat halaman (?g=rukuk&m=hanafi) supaya bisa
 * dibagikan dan tombol "kembali" peramban tetap masuk akal. Tidak ada yang
 * dikirim ke mana pun — semuanya berjalan di peramban sendiri.
 */

(function () {
  'use strict';

  var U = window.UIDalil;
  var panggung = document.getElementById('panggung');
  if (!panggung) return;

  var elUrutan = document.getElementById('urutan');
  var elMazhab = document.getElementById('mazhab');
  var elNama = document.getElementById('panggung-nama');
  var elTahap = document.getElementById('panggung-tahap');
  var elIsi = document.getElementById('isi');
  var elJudul = document.getElementById('judul-gerakan');
  var elRingkas = document.getElementById('ringkas-gerakan');
  var elHukum = document.getElementById('hukum-gerakan');
  var btnJeda = document.getElementById('btn-jeda');
  var btnUlang = document.getElementById('btn-ulang');
  var btnPrev = document.getElementById('btn-prev');
  var btnNext = document.getElementById('btn-next');

  var DAFTAR = window.GERAKAN;
  var viewer = null;

  /* ── Keadaan halaman ─────────────────────────────────────────── */

  function bacaAlamat() {
    var p = new URLSearchParams(location.search);
    var g = p.get('g');
    var m = p.get('m');
    return {
      gerakan: window.cariGerakan(g) ? g : DAFTAR[0].id,
      mazhab: window.MAZHAB[m] ? m : 'syafii'
    };
  }

  var kini = bacaAlamat();

  function tulisAlamat(ganti) {
    var url = 'gerakan.html?g=' + kini.gerakan + '&m=' + kini.mazhab;
    if (ganti) history.replaceState(kini, '', url);
    else history.pushState(kini, '', url);
  }

  /* ── Panggung ────────────────────────────────────────────────── */

  function bentukKini() {
    return window.gerakanMenurut(window.cariGerakan(kini.gerakan), kini.mazhab);
  }

  function jalankan() {
    var g = bentukKini();
    elNama.textContent = g.nama;
    if (viewer && viewer.siap) viewer.setLangkah(g.langkah, g.sorot);
  }

  /* ── Panel kanan ─────────────────────────────────────────────── */

  function gambarPanel() {
    var g = bentukKini();
    elJudul.textContent = g.nama;
    elRingkas.textContent = g.ringkas;
    elHukum.textContent = g.hukum;

    var h = '';

    if (g.bacaan && g.bacaan.length) {
      h += '<div class="blok"><h3 class="blok-judul">' + U.ikon('i-kitab', 'ic-sm') +
        'Bacaannya</h3>';
      g.bacaan.forEach(function (b) { h += U.kartuBacaan(b); });
      h += '</div>';
    }

    if (g.beda) {
      h += U.kartuBeda(g.beda, kini.mazhab);
    }

    var isiDalil = g.dalil.map(function (d) {
      return U.kartuDalil(d.k, d.sorot);
    }).join('');
    h += U.akordeon('Dalil gerakan ini (' + g.dalil.length + ')', 'i-dokumen', isiDalil, true);

    elIsi.innerHTML = h;
  }

  /* ── Kontrol ─────────────────────────────────────────────────── */

  function gambarUrutan() {
    elUrutan.innerHTML = DAFTAR.map(function (g, i) {
      return '<button type="button" data-g="' + g.id + '"' +
        (g.id === kini.gerakan ? ' aria-current="true"' : '') + '>' +
        '<span class="urutan-nomor">' + (i + 1) + '</span>' + U.aman(g.nama) + '</button>';
    }).join('');
  }

  function gambarMazhab() {
    elMazhab.innerHTML = window.URUTAN_MAZHAB.map(function (m) {
      return '<button type="button" data-m="' + m + '" aria-pressed="' +
        (m === kini.mazhab) + '">' + U.aman(window.MAZHAB[m].nama) + '</button>';
    }).join('');
  }

  // Menggeser chip gerakan yang aktif ke tengah, tanpa ikut menggulir halaman.
  // Posisinya dihitung dari selisih kotak layar, bukan offsetLeft: chip bukan
  // anak langsung dari elemen yang bergulir menurut tata letaknya, jadi
  // offsetLeft mengukur dari elemen lain dan menghasilkan geseran yang salah.
  function geserKeAktif() {
    var aktif = elUrutan.querySelector('[aria-current="true"]');
    if (!aktif) return;
    var kotakWadah = elUrutan.getBoundingClientRect();
    var kotakChip = aktif.getBoundingClientRect();
    var tujuan = elUrutan.scrollLeft + (kotakChip.left - kotakWadah.left) -
      (kotakWadah.width - kotakChip.width) / 2;
    elUrutan.scrollTo({
      left: Math.max(0, tujuan),
      behavior: 'smooth'
    });
  }

  function perbarui(dorongRiwayat) {
    gambarUrutan();
    gambarMazhab();
    gambarPanel();
    jalankan();
    geserKeAktif();
    tulisAlamat(!dorongRiwayat);
  }

  function pilihGerakan(id) {
    if (id === kini.gerakan) return;
    kini.gerakan = id;
    perbarui(true);
  }

  function pilihMazhab(m) {
    if (m === kini.mazhab) return;
    kini.mazhab = m;
    perbarui(true);
  }

  function geser(arah) {
    var i = 0;
    DAFTAR.forEach(function (g, n) { if (g.id === kini.gerakan) i = n; });
    pilihGerakan(DAFTAR[(i + arah + DAFTAR.length) % DAFTAR.length].id);
  }

  elUrutan.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-g]');
    if (b) pilihGerakan(b.getAttribute('data-g'));
  });

  elMazhab.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-m]');
    if (b) pilihMazhab(b.getAttribute('data-m'));
  });

  btnPrev.addEventListener('click', function () { geser(-1); });
  btnNext.addEventListener('click', function () { geser(1); });

  btnJeda.addEventListener('click', function () {
    if (!viewer || !viewer.siap) return;
    var jalan = !viewer.jalan;
    viewer.setJalan(jalan);
    btnJeda.setAttribute('aria-label', jalan ? 'Jeda gerakan' : 'Jalankan gerakan');
    btnJeda.innerHTML = '<svg class="ic" aria-hidden="true"><use href="#' +
      (jalan ? 'i-jeda' : 'i-putar') + '"></use></svg>';
  });

  btnUlang.addEventListener('click', function () {
    if (viewer && viewer.siap) viewer.ulangi();
  });

  // Panah kiri/kanan memindah gerakan, selama fokus tidak sedang di kontrol lain.
  document.addEventListener('keydown', function (e) {
    if (e.target.closest('input, textarea, select')) return;
    if (e.key === 'ArrowRight') geser(1);
    if (e.key === 'ArrowLeft') geser(-1);
  });

  window.addEventListener('popstate', function () {
    kini = bacaAlamat();
    perbarui(false);
  });

  /* ── Mulai ───────────────────────────────────────────────────── */

  if (window.VIEWER && window.THREE) {
    viewer = window.VIEWER.buat(panggung, {
      onTahap: function (i, langkah) {
        elTahap.textContent = langkah.tahap || '';
      }
    });
  } else {
    panggung.classList.add('tanpa-webgl');
  }

  perbarui(false);
})();
