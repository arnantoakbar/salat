/*
 * Viewer — panggung 3D peraga gerakan salat.
 *
 * Menjalankan satu Rig di atas "kertas sketsa": kanvas transparan dengan
 * lantai sajadah yang digambar tangan ke tekstur kanvas 2D. Gerakan
 * dimainkan sebagai deretan LANGKAH {pose, gerak, tahan}; perpindahan
 * antar pose memakai slerp quaternion supaya sendi berputar lewat jalur
 * pendek yang wajar, bukan jalur Euler yang bisa terpelintir.
 *
 * Ganti gerakan/mazhab tidak pernah menyentak: langkah pertama selalu
 * dianimasikan DARI pose yang sedang terlihat, apa pun itu.
 *
 * Butuh: THREE, RIG (rig.js), KAMERA (kamera.js).
 */
(function (root) {
  'use strict';

  var KURANG_GERAK = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Sajadah: digambar ke tekstur kanvas dengan garis bergelombang ── */

  // Garis "pensil": dipecah jadi ruas-ruas pendek dengan simpangan sinus
  // kecil, supaya tidak ada satu pun garis yang lurus sempurna.
  function coret(ctx, x1, y1, x2, y2, fase) {
    var n = 14, dx = x2 - x1, dy = y2 - y1;
    var jarak = Math.sqrt(dx * dx + dy * dy) || 1;
    var nx = -dy / jarak, ny = dx / jarak;
    ctx.beginPath();
    for (var i = 0; i <= n; i++) {
      var t = i / n;
      var simpang = Math.sin(t * 7.3 + fase) * 1.6 + Math.sin(t * 23 + fase * 2) * 0.7;
      var x = x1 + dx * t + nx * simpang;
      var y = y1 + dy * t + ny * simpang;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.stroke();
  }

  function kotakCoret(ctx, x, y, w, h, fase) {
    coret(ctx, x, y, x + w, y, fase);
    coret(ctx, x + w, y, x + w, y + h, fase + 2);
    coret(ctx, x + w, y + h, x, y + h, fase + 4);
    coret(ctx, x, y + h, x, y, fase + 6);
  }

  function buatSajadah() {
    var c = document.createElement('canvas');
    c.width = 340; c.height = 520;
    var ctx = c.getContext('2d');
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(96, 84, 74, 0.55)';

    kotakCoret(ctx, 16, 14, 308, 492, 0.4);
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = 'rgba(96, 84, 74, 0.38)';
    kotakCoret(ctx, 34, 32, 272, 456, 3.1);

    // Lengkung mihrab di ujung depan (arah kiblat).
    ctx.beginPath();
    ctx.moveTo(64, 118);
    ctx.bezierCurveTo(66, 62, 118, 44, 170, 44);
    ctx.bezierCurveTo(222, 44, 274, 62, 276, 118);
    ctx.stroke();

    // Rumbai di kedua ujung pendek.
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = 'rgba(96, 84, 74, 0.42)';
    for (var i = 0; i < 12; i++) {
      var x = 34 + i * 24.7;
      coret(ctx, x, 12, x + 2, 2, i);
      coret(ctx, x, 508, x + 2, 518, i + 5);
    }

    var tekstur = new THREE.CanvasTexture(c);
    tekstur.anisotropy = 4;
    var bahan = new THREE.MeshBasicMaterial({ map: tekstur, transparent: true, opacity: 0.9 });
    // Ukuran sajadah sungguhan, ± 72 x 125 cm. Model berdiri di ujung
    // belakangnya; ujung bermihrab menghadap kiblat (+Z), tempat dahinya
    // turun saat sujud.
    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 1.25), bahan);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(0, 0.002, 0.30);
    return mesh;
  }

  function buatBayangan() {
    var c = document.createElement('canvas');
    c.width = c.height = 128;
    var ctx = c.getContext('2d');
    var g = ctx.createRadialGradient(64, 64, 6, 64, 64, 62);
    g.addColorStop(0, 'rgba(70, 60, 55, 0.32)');
    g.addColorStop(1, 'rgba(70, 60, 55, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    var mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.95, 0.7),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(0, 0.004, 0.06);
    return mesh;
  }

  /* ── Pemutar langkah ─────────────────────────────────────────── */

  function landai(t) { // easeInOutCubic
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function Viewer(wadah, opsi) {
    opsi = opsi || {};
    this.wadah = wadah;
    this.onTahap = opsi.onTahap || function () {};
    this.kecepatan = 1;
    this.jalan = true;
    this.siap = false;

    try {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        // Isi kanvas biasanya dibuang setelah frame ditampilkan. Opsi ini
        // menahannya supaya kanvas masih bisa dibaca di luar loop — perlu
        // untuk memotret pose menjadi gambar diam. Tidak aktif pada
        // kunjungan biasa; dinyalakan lewat opsi atau dengan menambahkan
        // ?buffer=1 pada alamat halaman saat mengambil tangkapan layar.
        preserveDrawingBuffer: !!opsi.simpanBuffer ||
          /[?&]buffer=1/.test(location.search)
      });
    } catch (e) {
      wadah.classList.add('tanpa-webgl');
      return;
    }
    this.renderer.setClearColor(0x000000, 0);
    wadah.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.rig = new RIG.Rig();
    this.scene.add(this.rig.grup);
    this.scene.add(buatSajadah());
    this.scene.add(buatBayangan());

    this.kamera = new KAMERA.Kamera(34, 1);

    // Pemutar
    this._langkah = [];
    this._idx = 0;
    this._fase = 'tahan';
    this._t = 0;
    this._durasi = 1;
    this._transisi = null;   // {q0:{}, q1:{}, p0, p1}
    this._poseKini = 'berdiri';
    this._sorotKini = 'penuh';

    this._pasangUkuran();
    this._pasangSeret();
    this._pasangJeda();

    this._boilJeda = 0;
    this._sebelum = null;
    this._terlihat = true;
    this._raf = null;
    this._frameTerakhir = 0;
    this.siap = true;

    this._pasangPenjaga();
    this._pasangKonteks();

    this.terapkanPose('berdiri');
    this._gambarSekali();
    this._aturLoop();

    // Pegangan ke panggung lewat elemennya. Berguna untuk memeriksa keadaan
    // panggung dari konsol dan untuk mengambil gambar diam tiap pose.
    wadah.__panggung = this;
  }

  /* Ukuran mengikuti wadah. */
  Viewer.prototype._pasangUkuran = function () {
    var v = this;
    function ukur() {
      var w = v.wadah.clientWidth, h = v.wadah.clientHeight;
      if (!w || !h) return;
      v.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      v.renderer.setSize(w, h, false);
      v.kamera.obj.aspect = w / h;
      v.kamera.obj.updateProjectionMatrix();
    }
    if (window.ResizeObserver) {
      new ResizeObserver(ukur).observe(this.wadah);
    } else {
      window.addEventListener('resize', ukur);
    }
    ukur();
  };

  /* Seret mendatar memutar model sedikit; dilepas kembali sendiri. */
  Viewer.prototype._pasangSeret = function () {
    var v = this, aktif = false, xAkhir = 0;
    var el = this.renderer.domElement;
    el.addEventListener('pointerdown', function (e) {
      aktif = true; xAkhir = e.clientX;
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', function (e) {
      if (!aktif) return;
      v.kamera.seret((e.clientX - xAkhir) * 0.006);
      xAkhir = e.clientX;
    });
    function lepas() { if (aktif) { aktif = false; v.kamera.lepas(); } }
    el.addEventListener('pointerup', lepas);
    el.addEventListener('pointercancel', lepas);
  };

  /* Berhenti menggambar saat panggung tidak terlihat / tab disembunyikan. */
  Viewer.prototype._pasangJeda = function () {
    var v = this;
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entri) {
        v._terlihat = entri[0].isIntersecting;
        v._aturLoop();
      }, { threshold: 0.02 }).observe(this.wadah);
    }
    document.addEventListener('visibilitychange', function () { v._aturLoop(); });
  };

  /*
   * Penjaga loop.
   *
   * requestAnimationFrame bisa berhenti dikirim tanpa memberi tahu siapa pun:
   * peramban ponsel menghentikannya saat aplikasi ditaruh di latar belakang,
   * sebagian menahannya saat baterai menipis, dan panel yang tidak sedang
   * digambar peramban juga tidak menerimanya. Kalau itu terjadi, animasinya
   * membeku selamanya padahal panggungnya kelihatan.
   *
   * Penjaga ini memeriksa berkala: kalau panggung seharusnya berjalan tapi
   * sudah dua detik tidak ada frame yang tergambar, loopnya dinyalakan ulang.
   */
  Viewer.prototype._pasangPenjaga = function () {
    var v = this;
    this._penjaga = setInterval(function () {
      if (!v._terlihat || document.hidden || !v.jalan) return;
      if (performance.now() - v._frameTerakhir < 2000) return;
      if (v._raf !== null) cancelAnimationFrame(v._raf);
      v._raf = null;
      v._sebelum = null;
      v._mulaiLoop();
    }, 2000);
  };

  /*
   * Konteks WebGL bisa hilang — pada ponsel ini biasa terjadi saat aplikasi
   * lama di latar belakang atau memori menipis. three.js sudah memulihkan
   * sisi grafisnya sendiri, tapi loop di sini perlu dijalankan lagi, dan
   * selama konteksnya hilang pengguna berhak tahu kenapa gambarnya berhenti.
   */
  Viewer.prototype._pasangKonteks = function () {
    var v = this, kanvas = this.renderer.domElement;
    kanvas.addEventListener('webglcontextlost', function (e) {
      e.preventDefault();
      v.wadah.classList.add('konteks-hilang');
    });
    kanvas.addEventListener('webglcontextrestored', function () {
      v.wadah.classList.remove('konteks-hilang');
      v._sebelum = null;
      v._frameTerakhir = performance.now();
      v._aturLoop();
    });
  };

  /* Menggambar satu frame di luar loop.
     Dipakai saat panggung dibuat atau gerakannya diganti sementara loop
     sedang dijeda (tab di latar belakang, panggung di luar layar). Tanpa
     ini, panggung yang dimuat dalam keadaan tersembunyi tampil kosong
     sampai pengguna menggulir atau kembali ke tab. */
  Viewer.prototype._gambarSekali = function () {
    this.kamera.perbarui(0, true);
    this.renderer.render(this.scene, this.kamera.obj);
    this._frameTerakhir = performance.now();
  };

  Viewer.prototype._aturLoop = function () {
    var hidup = this._terlihat && !document.hidden;
    if (hidup && this._raf === null) this._mulaiLoop();
    if (!hidup && this._raf !== null) {
      cancelAnimationFrame(this._raf);
      this._raf = null;
      this._sebelum = null;
    }
  };

  /* ── Pose & langkah ──────────────────────────────────────────── */

  // Terapkan pose seketika (tanpa animasi).
  Viewer.prototype.terapkanPose = function (nama) {
    var pose = POSE.POSES[nama];
    if (!pose) return;
    var sendi = this.rig.sendi;
    for (var n in sendi) {
      var d = pose.rot[n] || [0, 0, 0];
      sendi[n].rotation.set(THREE.MathUtils.degToRad(d[0]),
        THREE.MathUtils.degToRad(d[1]), THREE.MathUtils.degToRad(d[2]));
    }
    sendi.akar.position.fromArray(pose.pos);
    this._poseKini = nama;
  };

  // Susun peta quaternion tujuan untuk satu pose.
  Viewer.prototype._tujuanPose = function (nama) {
    var pose = POSE.POSES[nama];
    var q = {}, e = new THREE.Euler();
    for (var n in this.rig.sendi) {
      var d = pose.rot[n] || [0, 0, 0];
      e.set(THREE.MathUtils.degToRad(d[0]), THREE.MathUtils.degToRad(d[1]),
        THREE.MathUtils.degToRad(d[2]));
      q[n] = new THREE.Quaternion().setFromEuler(e);
    }
    return { q: q, pos: new THREE.Vector3().fromArray(pose.pos) };
  };

  /*
   * Mulai rangkaian langkah baru. `daftar` = [{pose, gerak, tahan, tahap,
   * sorot, bacaan}]. Selalu bertransisi halus dari pose yang sedang tampak.
   */
  Viewer.prototype.setLangkah = function (daftar, sorotBaku) {
    this._langkah = daftar;
    this._sorotBaku = sorotBaku || 'penuh';
    this._idx = -1;
    this._majuLangkah(true);

    /*
     * Kalau loopnya sedang dijeda — panggung tergulir keluar layar, atau tab
     * sedang di latar belakang — tidak akan ada frame yang menyelesaikan
     * perpindahan pose. Tanpa penanganan ini panggung membeku pada sikap
     * gerakan SEBELUMNYA sementara keterangannya sudah menyebut gerakan yang
     * baru. Jadi saat dijeda, sikapnya dipasang langsung ke tujuan.
     */
    if (this._raf === null) {
      this.terapkanPose(this._langkah[this._idx].pose);
      this._fase = 'tahan';
      this._t = 0;
      this._gambarSekali();
    }
  };

  Viewer.prototype._majuLangkah = function (dariLuar) {
    if (!this._langkah.length) return;
    this._idx = (this._idx + 1) % this._langkah.length;
    var langkah = this._langkah[this._idx];

    // Rekam pose saat ini sebagai titik awal transisi.
    var q0 = {}, sendi = this.rig.sendi;
    for (var n in sendi) q0[n] = sendi[n].quaternion.clone();
    var tujuan = this._tujuanPose(langkah.pose);

    this._transisi = {
      q0: q0, q1: tujuan.q,
      p0: sendi.akar.position.clone(), p1: tujuan.pos
    };
    this._fase = 'gerak';
    this._t = 0;
    /*
     * Lama perpindahan. Durasi yang ditulis pada langkahnya selalu menang —
     * termasuk ketika perpindahan datang dari luar (ganti gerakan atau ganti
     * mazhab); tanpa itu, langkah yang sengaja dibuat seketika akan tetap
     * dianimasikan dan sikap yang ingin ditahan tidak pernah tercapai.
     * Angka 620 hanya bekal untuk perpindahan dari luar yang tidak menyebut
     * durasinya, supaya terasa "menyesuaikan" dan bukan memulai ulang.
     */
    this._durasi = KURANG_GERAK ? 1 : (langkah.gerak || (dariLuar ? 620 : 700));

    this.kamera.sorot(langkah.sorot || this._sorotBaku);
    this._poseKini = langkah.pose;
    this.onTahap(this._idx, langkah);
  };

  Viewer.prototype._perbaruiPemutar = function (dtMs) {
    if (!this._langkah.length || !this._transisi) return;
    this._t += dtMs * this.kecepatan;

    if (this._fase === 'gerak') {
      var u = Math.min(1, this._t / this._durasi);
      var e = landai(u);
      var tr = this._transisi, sendi = this.rig.sendi;
      for (var n in sendi) {
        sendi[n].quaternion.slerpQuaternions(tr.q0[n], tr.q1[n], e);
      }
      sendi.akar.position.lerpVectors(tr.p0, tr.p1, e);
      if (u >= 1) {
        this._fase = 'tahan';
        this._t = 0;
        this._durasi = this._langkah[this._idx].tahan || 900;
      }
    } else if (this._t >= this._durasi) {
      this._majuLangkah(false);
    }
  };

  /* ── Loop ────────────────────────────────────────────────────── */

  Viewer.prototype._mulaiLoop = function () {
    var v = this;
    function frame(kini) {
      v._raf = requestAnimationFrame(frame);
      if (v._sebelum === null) v._sebelum = kini;
      var dt = Math.min(50, kini - v._sebelum);
      v._sebelum = kini;

      if (v.jalan) v._perbaruiPemutar(dt);

      if (!KURANG_GERAK) {
        v._boilJeda += dt;
        if (v._boilJeda > 140) { v.rig.goyangkan(); v._boilJeda = 0; }
      }

      v.kamera.perbarui(dt / 1000, KURANG_GERAK);
      v.renderer.render(v.scene, v.kamera.obj);
      v._frameTerakhir = kini;
    }
    this._raf = requestAnimationFrame(frame);
  };

  /* ── API kecil untuk halaman ─────────────────────────────────── */

  /*
   * Memajukan animasi tanpa menunggu requestAnimationFrame, lalu menggambar
   * satu frame. Dipakai untuk mengambil gambar diam sebuah pose — termasuk
   * ketika loop sedang dijeda karena tab tidak terlihat.
   */
  Viewer.prototype.majuFrame = function (ms, kali) {
    ms = ms || 60;
    kali = kali || 1;
    for (var i = 0; i < kali; i++) {
      if (this.jalan) this._perbaruiPemutar(ms);
      this.kamera.perbarui(ms / 1000, true);
    }
    this.renderer.render(this.scene, this.kamera.obj);
    return this._poseKini;
  };

  Viewer.prototype.setKecepatan = function (x) { this.kecepatan = x; };
  Viewer.prototype.setJalan = function (jalan) { this.jalan = jalan; };
  Viewer.prototype.ulangi = function () { this._idx = -1; this._majuLangkah(true); };

  root.VIEWER = {
    buat: function (wadah, opsi) { return new Viewer(wadah, opsi); },
    KURANG_GERAK: KURANG_GERAK
  };
})(window);
