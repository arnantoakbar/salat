/*
 * Kamera — sorotan per gerakan + peredam perpindahan.
 *
 * Tiap gerakan meminta satu "sorotan" (posisi + sasaran pandang) yang
 * paling jelas memperlihatkan bagian tubuh yang sedang diajarkan:
 * takbiratul ihram disorot dekat dari depan (kepala sampai setengah
 * badan), rukuk dan sujud dari samping supaya sudut punggung terbaca,
 * tasyahud dekat ke tangan. Perpindahannya diredam halus, dan pengguna
 * boleh menggeser untuk memutar sedikit — lalu kembali sendiri.
 *
 * Butuh: THREE.
 */
(function (root) {
  'use strict';

  // Model menghadap +Z. Sorotan "samping" memakai sisi kanan model (-X)
  // karena beberapa sunnah (telunjuk, kaki kanan tegak) ada di sisi itu.
  var SOROTAN = {
    // Seluruh badan, sedikit menyerong — sikap berdiri dan salam.
    'penuh': { pos: [1.15, 1.30, 2.95], sasaran: [0, 0.92, 0.05] },
    'penuh-samping': { pos: [-2.35, 1.20, 1.55], sasaran: [0, 0.90, 0.10] },
    // Kepala sampai setengah badan dari depan — takbiratul ihram.
    'atas-badan': { pos: [0.42, 1.46, 1.62], sasaran: [0, 1.30, 0.06] },
    // Tampak samping penuh — rukuk: punggung rata dan tangan di lutut.
    'samping': { pos: [-2.30, 1.05, 0.22], sasaran: [0, 0.86, 0.16] },
    // Samping rendah — sujud: sudut punggung dan tujuh anggota sujud.
    'samping-rendah': { pos: [-1.95, 0.58, 0.42], sasaran: [0, 0.28, 0.24] },
    // Duduk — iftirasy dan tawarruk, terlihat lipatan kakinya.
    'duduk': { pos: [-1.85, 0.98, 1.62], sasaran: [0, 0.52, 0.06] },
    // Dekat ke tangan kanan — isyarat telunjuk saat tasyahud.
    'tangan': { pos: [-0.86, 0.46, 0.82], sasaran: [-0.22, 0.19, 0.07] },
    // Dada ke kepala dari depan — bersedekap dan i'tidal.
    'perut': { pos: [0.34, 1.32, 2.08], sasaran: [0, 1.12, 0.06] }
  };

  function Kamera(fov, aspek) {
    this.obj = new THREE.PerspectiveCamera(fov || 34, aspek || 1, 0.1, 30);
    this._pos = new THREE.Vector3().fromArray(SOROTAN['penuh'].pos);
    this._sasaran = new THREE.Vector3().fromArray(SOROTAN['penuh'].sasaran);
    this._tujuanPos = this._pos.clone();
    this._tujuanSasaran = this._sasaran.clone();
    this._geser = 0;        // sudut orbit tambahan dari seretan pengguna
    this._geserTujuan = 0;
    this._waktu = 0;
    this._instan = true;    // frame pertama langsung menempel
  }

  Kamera.prototype.sorot = function (nama) {
    var s = SOROTAN[nama] || SOROTAN['penuh'];
    this._tujuanPos.fromArray(s.pos);
    this._tujuanSasaran.fromArray(s.sasaran);
  };

  Kamera.prototype.seret = function (deltaSudut) {
    this._geserTujuan = Math.max(-1.1, Math.min(1.1, this._geserTujuan + deltaSudut));
  };
  Kamera.prototype.lepas = function () { this._geserTujuan = 0; };

  Kamera.prototype.perbarui = function (dt, tanpaGerak) {
    this._waktu += dt;
    var halus = this._instan || tanpaGerak ? 1 : 1 - Math.exp(-dt * 3.4);
    this._instan = false;

    this._pos.lerp(this._tujuanPos, halus);
    this._sasaran.lerp(this._tujuanSasaran, halus);
    this._geser += (this._geserTujuan - this._geser) *
      (tanpaGerak ? 1 : 1 - Math.exp(-dt * 4.5));

    // Ayunan sangat pelan supaya sketsanya terasa hidup; dimatikan saat
    // pengguna memilih reduced motion.
    var ayun = tanpaGerak ? 0 : Math.sin(this._waktu * 0.35) * 0.035;

    var sudut = this._geser + ayun;
    var arah = this._pos.clone().sub(this._sasaran);
    arah.applyAxisAngle(new THREE.Vector3(0, 1, 0), sudut);

    this.obj.position.copy(this._sasaran).add(arah);
    this.obj.lookAt(this._sasaran);
  };

  root.KAMERA = { Kamera: Kamera, SOROTAN: SOROTAN };
})(window);
