/*
 * Daftar sudut kamera untuk halaman uji.
 *
 * tests.html hanya memeriksa data, jadi tidak memuat three.js. Berkas ini
 * memuat kamera.js apa adanya dengan THREE yang dipalsukan seperlunya,
 * supaya daftar sudut kamera yang diuji benar-benar berasal dari berkas
 * yang dipakai situs — bukan salinan yang bisa ketinggalan zaman.
 */
(function (root) {
  'use strict';
  if (root.THREE) return;
  root.THREE = {
    PerspectiveCamera: function () { this.position = {}; },
    Vector3: function () {
      this.fromArray = function () { return this; };
      this.clone = function () { return this; };
    }
  };
})(window);
