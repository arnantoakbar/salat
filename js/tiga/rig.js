/*
 * Rig — model manusia untuk peraga gerakan salat.
 *
 * Sengaja BUKAN model realistis. Sesuai tujuan situs, modelnya berupa
 * sketsa pensil transparan tanpa detail wajah: badan dari kapsul-kapsul
 * tembus pandang, garis tepinya bergetar halus seperti coretan tangan
 * ("boiling line"), plus peci sebagai satu-satunya penanda. Yang penting
 * terbaca adalah SUDUT SENDI — itu yang diajarkan halaman ini — jadi
 * tidak ada pakaian longgar yang menutupi lutut dan siku.
 *
 * Semua sendi adalah THREE.Group dengan sumbu sejajar dunia saat berdiri
 * tegak. Konvensi arah (dipakai file pose.js saat membaca sudut):
 *   - Model menghadap +Z (arah kiblat pada tata letak panggung).
 *   - Sisi kanan tubuh model ada di dunia -X.
 *   - Lengan dan tungkai memanjang ke -Y; rotasi X negatif mengayun
 *     lengan/paha ke depan, rotasi X positif menekuk punggung ke depan.
 *
 * Butuh: THREE (js/vendor/three.min.js).
 */
(function (root) {
  'use strict';

  var GRAFIT = 0x4A4550;      // warna "pensil" — abu keunguan hangat
  var GRAFIT_GARIS = 0x3A3640;

  /* ── Bahan bersama ─────────────────────────────────────────────
     Satu bahan isi + satu bahan garis untuk seluruh tubuh, supaya
     uniform getarannya cukup diperbarui sekali per frame. */

  function buatBahan() {
    // Satu bahan "pensil" untuk seluruh tubuh: garis tepi muncul dari
    // sudut pandang (fresnel) — permukaan yang menghadap menyamping dari
    // mata digelapkan tajam, sisanya nyaris transparan. Hasilnya tiap
    // kapsul tampak sebagai coretan kontur tembus pandang, dan karena
    // tidak menulis depth, kontur anggota tubuh di baliknya ikut terlihat
    // (model memang diminta transparan). Ambang konturnya digoyang noise
    // yang berganti benih tiap beberapa frame — garisnya "mendidih"
    // seperti sketsa yang digambar ulang tangan.
    var seragam = {
      uAcak: { value: 0 },
      uWarna: { value: new THREE.Color(GRAFIT_GARIS) }
    };
    var bahan = new THREE.ShaderMaterial({
      uniforms: seragam,
      transparent: true,
      depthWrite: false,
      vertexShader: [
        'varying vec3 vN;',
        'varying vec3 vV;',
        'varying vec3 vP;',
        'void main() {',
        '  vN = normalMatrix * normal;',
        '  vec4 mv = modelViewMatrix * vec4(position, 1.0);',
        '  vV = -mv.xyz;',
        '  vP = position;',
        '  gl_Position = projectionMatrix * mv;',
        '}'
      ].join('\n'),
      fragmentShader: [
        'uniform float uAcak;',
        'uniform vec3 uWarna;',
        'varying vec3 vN;',
        'varying vec3 vV;',
        'varying vec3 vP;',
        'void main() {',
        '  float f = 1.0 - abs(dot(normalize(vN), normalize(vV)));',
        '  float goyang = sin(vP.x * 57.0 + vP.y * 43.0 + uAcak * 11.0)',
        '    * cos(vP.z * 49.0 - vP.y * 31.0 + uAcak * 5.0);',
        // Garis tepi — pita fresnel sempit yang bergoyang
        '  float tepi = smoothstep(0.55 + goyang * 0.06, 0.92, f);',
        // Isi tipis + arsiran diagonal samar ala pensil
        '  float arsir = sin((vP.x + vP.y * 1.7) * 120.0) * 0.5 + 0.5;',
        '  float isi = 0.05 + f * 0.10 + arsir * 0.025;',
        '  gl_FragColor = vec4(uWarna, min(0.92, isi + tepi * 0.62));',
        '}'
      ].join('\n')
    });
    return { sketsa: bahan, seragam: seragam };
  }

  /* ── Perakit ───────────────────────────────────────────────────── */

  function Rig() {
    this.grup = new THREE.Group();
    this.sendi = {};
    this.bahan = buatBahan();
    this._bangun();
  }

  Rig.prototype._sendi = function (nama, induk, x, y, z) {
    var g = new THREE.Group();
    g.position.set(x, y, z);
    (induk || this.grup).add(g);
    this.sendi[nama] = g;
    return g;
  };

  // Pasang satu mesh sketsa pada satu induk.
  Rig.prototype._badan = function (induk, geom, x, y, z, putarZ, putarX) {
    var m = new THREE.Mesh(geom, this.bahan.sketsa);
    m.position.set(x, y, z);
    if (putarZ) m.rotation.z = putarZ;
    if (putarX) m.rotation.x = putarX;
    induk.add(m);
    return m;
  };

  // Ruas kapsul yang menggantung dari sendi ke arah -Y.
  Rig.prototype._ruas = function (induk, radius, panjang) {
    var geom = new THREE.CapsuleGeometry(radius, panjang, 4, 12);
    return this._badan(induk, geom, 0, -(panjang / 2), 0);
  };

  Rig.prototype._bangun = function () {
    var s = this._sendi.bind(this);

    /* Kerangka. Angka = posisi sendi relatif induknya (meter).
       Tinggi total model ± 1.72 m. */
    var akar = s('akar', null, 0, 0.98, 0);          // panggul
    var pinggang = s('pinggang', akar, 0, 0.10, 0);
    var dada = s('dada', pinggang, 0, 0.21, 0);
    var leher = s('leher', dada, 0, 0.21, 0.01);
    var kepala = s('kepala', leher, 0, 0.06, 0);

    var bahuKa = s('bahuKa', dada, -0.19, 0.16, 0);
    var sikuKa = s('sikuKa', bahuKa, 0, -0.29, 0);
    var tanganKa = s('tanganKa', sikuKa, 0, -0.25, 0);
    var telunjukKa = s('telunjukKa', tanganKa, -0.005, -0.115, 0.012);

    var bahuKi = s('bahuKi', dada, 0.19, 0.16, 0);
    var sikuKi = s('sikuKi', bahuKi, 0, -0.29, 0);
    var tanganKi = s('tanganKi', sikuKi, 0, -0.25, 0);

    var pahaKa = s('pahaKa', akar, -0.095, -0.03, 0);
    var lututKa = s('lututKa', pahaKa, 0, -0.44, 0);
    var kakiKa = s('kakiKa', lututKa, 0, -0.42, 0);

    var pahaKi = s('pahaKi', akar, 0.095, -0.03, 0);
    var lututKi = s('lututKi', pahaKi, 0, -0.44, 0);
    var kakiKi = s('kakiKi', lututKi, 0, -0.42, 0);

    /* Daging kapsul. */
    // Panggul + perut + dada — tiga kapsul bertumpuk; sambungannya sengaja
    // terlihat, memberi kesan arsiran sketsa.
    this._badan(akar, new THREE.CapsuleGeometry(0.112, 0.05, 4, 14), 0, 0.03, 0);
    this._badan(pinggang, new THREE.CapsuleGeometry(0.098, 0.10, 4, 14), 0, 0.105, 0);
    this._badan(dada, new THREE.CapsuleGeometry(0.122, 0.12, 4, 14), 0, 0.10, 0.005);
    // Leher
    this._badan(leher, new THREE.CapsuleGeometry(0.045, 0.05, 4, 10), 0, 0.01, 0);

    // Kepala lonjong tanpa wajah
    var geoKepala = new THREE.SphereGeometry(0.098, 18, 14);
    this._badan(kepala, geoKepala, 0, 0.095, 0.008).scale.set(1, 1.14, 1.04);

    // Peci — silinder pendek agak miring di atas kepala; satu-satunya
    // "pakaian" yang digambar.
    var geoPeci = new THREE.CylinderGeometry(0.085, 0.099, 0.06, 20, 1);
    this._badan(kepala, geoPeci, 0, 0.168, -0.014, 0, -0.13);

    // Lengan
    this._ruas(bahuKa, 0.044, 0.242);
    this._ruas(sikuKa, 0.037, 0.208);
    this._ruas(bahuKi, 0.044, 0.242);
    this._ruas(sikuKi, 0.037, 0.208);

    // Telapak tangan — kapsul pipih
    var geoTelapak = new THREE.CapsuleGeometry(0.035, 0.075, 4, 10);
    this._badan(tanganKa, geoTelapak, 0, -0.055, 0.004).scale.set(0.82, 1, 1.15);
    this._badan(tanganKi, geoTelapak, 0, -0.055, 0.004).scale.set(0.82, 1, 1.15);

    // Telunjuk kanan — bisa ditegakkan sendiri saat tasyahud
    this._badan(telunjukKa, new THREE.CapsuleGeometry(0.0115, 0.055, 3, 8), 0, -0.03, 0);

    // Tungkai
    this._ruas(pahaKa, 0.062, 0.375);
    this._ruas(lututKa, 0.05, 0.365);
    this._ruas(pahaKi, 0.062, 0.375);
    this._ruas(lututKi, 0.05, 0.365);

    // Telapak kaki — kapsul mendatar menghadap +Z (arah kiblat)
    var geoKaki = new THREE.CapsuleGeometry(0.042, 0.13, 4, 10);
    this._badan(kakiKa, geoKaki, 0, -0.045, 0.065, 0, Math.PI / 2);
    this._badan(kakiKi, geoKaki, 0, -0.045, 0.065, 0, Math.PI / 2);
  };

  // Getaran garis pensil — dipanggil viewer beberapa kali per detik.
  Rig.prototype.goyangkan = function () {
    this.bahan.seragam.uAcak.value = Math.random() * 100;
  };

  root.RIG = { Rig: Rig, GRAFIT: GRAFIT };
})(window);
