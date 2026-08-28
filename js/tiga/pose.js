/*
 * Pose — kamus sikap tubuh untuk peraga gerakan salat.
 *
 * Satu pose = posisi akar (panggul) + rotasi tiap sendi dalam DERAJAT.
 * Sendi yang tidak disebut berarti 0 (sikap berdiri tegak). Pose ditulis
 * LENGKAP (absolut), bukan selisih, supaya perpindahan antar pose tidak
 * pernah mewarisi sisa sudut dari pose sebelumnya.
 *
 * Konvensi sumbu ada di rig.js. Ringkasnya: model menghadap +Z; sisi
 * kanan tubuh di -X; rotasi X negatif mengayun lengan/paha ke depan;
 * rotasi X positif menekuk punggung ke depan.
 *
 * Angka-angka ini tidak dikira-kira. Untuk tiap pose ditetapkan dulu
 * SASARAN dalam meter — misalnya "telapak setinggi bahu, 12 cm di depan
 * badan" untuk takbir menurut riwayat Ibnu Umar, atau "dahi, dua telapak,
 * dua lutut, dan ujung dua kaki menyentuh lantai" untuk sujud — lalu
 * sudut sendinya dicari sampai titik dunia sendi itu jatuh pada sasaran
 * (selisih di bawah 2 cm). Lihat data/gerakan.js untuk pemetaan
 * pose → mazhab → dalil.
 */
(function (root) {
  'use strict';

  var TINGGI_AKAR = 0.98;

  // Pose dasar berdiri: lengan menggantung wajar, pandangan ke arah
  // tempat sujud (kepala sedikit menunduk).
  var BERDIRI = {
    pos: [0, TINGGI_AKAR, 0],
    rot: {
      kepala: [14, 0, 0],
      bahuKa: [-3, 0, -5], sikuKa: [-7, 0, 0],
      bahuKi: [-3, 0, 5], sikuKi: [-7, 0, 0],
      telunjukKa: [-24, 0, 0] // jari rapat wajar, tidak mencuat
    }
  };

  // Membentuk pose baru dari pose dasar + perubahan sebagian sendi.
  function turunan(dasar, pos, ubah) {
    var hasil = { pos: pos || dasar.pos.slice(), rot: {} };
    var k;
    for (k in dasar.rot) hasil.rot[k] = dasar.rot[k].slice();
    for (k in ubah) hasil.rot[k] = ubah[k].slice();
    return hasil;
  }

  var POSES = {

    /* ── Berdiri ─────────────────────────────────────────────── */

    'berdiri': BERDIRI,

    // Mengangkat tangan takbir — telapak sejajar bahu, ujung jari
    // sekitar daun telinga (Syafi'i, Maliki, Hambali).
    'angkat-bahu': turunan(BERDIRI, null, {
      bahuKa: [-30, 0, -20], sikuKa: [-155, 0, 0], tanganKa: [0, 90, 0], telunjukKa: [-6, 0, 0],
      bahuKi: [-30, 0, 20], sikuKi: [-155, 0, 0], tanganKi: [0, -90, 0],
      kepala: [8, 0, 0]
    }),

    // Mengangkat tangan takbir — ibu jari sejajar cuping telinga (Hanafi).
    'angkat-telinga': turunan(BERDIRI, null, {
      bahuKa: [-80, 0, -10], sikuKa: [-150, 0, 0], tanganKa: [0, 90, 0], telunjukKa: [-6, 0, 0],
      bahuKi: [-80, 0, 10], sikuKi: [-150, 0, 0], tanganKi: [0, -90, 0],
      kepala: [8, 0, 0]
    }),

    /* ── Bersedekap ──────────────────────────────────────────── */

    // Tangan kanan memegang tangan kiri di atas pusar, di bawah dada
    // (pendapat masyhur Syafi'i).
    'sedekap-atas-pusar': turunan(BERDIRI, null, {
      bahuKa: [20, 0, 35], sikuKa: [-90, 0, 0], tanganKa: [-10, 0, 14], telunjukKa: [-30, 0, 0],
      bahuKi: [20, 0, -30], sikuKi: [-85, 0, 0], tanganKi: [-10, 0, -12]
    }),

    // Bersedekap di bawah pusar (Hanafi, dan riwayat masyhur Hambali).
    'sedekap-bawah-pusar': turunan(BERDIRI, null, {
      bahuKa: [5, 0, 20], sikuKa: [-45, 0, 0], tanganKa: [-10, 0, 14], telunjukKa: [-30, 0, 0],
      bahuKi: [0, 0, -20], sikuKi: [-30, 0, 0], tanganKi: [-10, 0, -12]
    }),

    // Bersedekap di dada (pendapat sebagian ulama, dari riwayat Wail
    // bin Hujr "di atas dadanya").
    'sedekap-dada': turunan(BERDIRI, null, {
      bahuKa: [20, 0, 45], sikuKa: [-110, 0, 0], tanganKa: [-10, 0, 14], telunjukKa: [-30, 0, 0],
      bahuKi: [25, 0, -45], sikuKi: [-105, 0, 0], tanganKi: [-10, 0, -12]
    }),

    /* ── Rukuk ───────────────────────────────────────────────── */

    // Punggung rata, kepala segaris punggung, kedua telapak mencengkeram
    // lutut dengan jari terbuka, siku lurus.
    'rukuk': {
      // Punggung rata, kepala segaris punggung, kedua telapak
      // mencengkeram lutut, siku lurus. Pinggul digeser ke belakang dan
      // paha dimiringkan supaya bahu jatuh mendekati atas lutut —
      // tanpa itu tangan tidak akan sampai ke lutut.
      pos: [0, 0.948, -0.165],
      rot: {
        pinggang: [55, 0, 0], dada: [45, 0, 0],
        leher: [-6, 0, 0], kepala: [-10, 0, 0],
        // Punggung miring 100°, jadi bahu diputar balik 85° agar lengan
        // menggantung nyaris tegak lurus ke lutut.
        bahuKa: [-85, 0, -10], sikuKa: [0, 0, 0], tanganKa: [-14, 0, 0], telunjukKa: [-30, 0, 0],
        bahuKi: [-85, 0, 10], sikuKi: [0, 0, 0], tanganKi: [-14, 0, 0],
        pahaKa: [-22, 0, 0], lututKa: [22, 0, 0],
        pahaKi: [-22, 0, 0], lututKi: [22, 0, 0]
      }
    },

    /* ── Sujud ───────────────────────────────────────────────── */

    // Tujuh anggota sujud menempel: dahi+hidung, dua telapak tangan,
    // dua lutut, ujung dua kaki. Siku diangkat, lengan tidak menempel
    // lantai, perut tidak menempel paha.
    'sujud': {
      /*
       * Tujuh anggota sujud menempel lantai: dahi (dan hidung), dua
       * telapak tangan, dua lutut, dan ujung dua kaki. Siku diangkat,
       * lengan tidak menempel lantai, perut tidak menempel paha.
       *
       * Panggul ikut diputar 100° supaya seluruh ruas punggung —
       * termasuk ruas panggul — ikut melandai ke lantai. Karena paha
       * adalah anak dari panggul, sudut pahanya dibalik (-100) agar
       * tetap tegak lurus lantai seperti orang berlutut.
       */
      pos: [0, 0.475, 0.05],
      rot: {
        akar: [100, 0, 0],
        pinggang: [15, 0, 0], dada: [15, 0, 0],
        leher: [10, 0, 0], kepala: [5, 0, 0],
        // Lengan terlipat tajam: pangkal lengan hampir mendatar ke
        // depan, lengan bawah turun ke lantai di samping kepala.
        bahuKa: [185, 0, -6], sikuKa: [122, 0, 0], tanganKa: [-152, 0, 0], telunjukKa: [-10, 0, 0],
        bahuKi: [185, 0, 6], sikuKi: [122, 0, 0], tanganKi: [-152, 0, 0],
        pahaKa: [-100, 0, 0], lututKa: [90, 0, 0], kakiKa: [-70, 0, 0],
        pahaKi: [-100, 0, 0], lututKi: [90, 0, 0], kakiKi: [-70, 0, 0]
      }
    },

    // Ambang sujud — badan turun, tangan belum menyentuh lantai.
    // Dipakai sebagai titik antara supaya turunnya terbaca.
    // Lutut sudah di lantai, badan masih tegak — sikap orang yang turun
    // dengan mendahulukan lutut (riwayat Wail bin Hujr).
    'turun-lutut': {
      pos: [0, 0.475, 0.05],
      rot: {
        akar: [30, 0, 0],
        pinggang: [14, 0, 0], dada: [12, 0, 0], kepala: [10, 0, 0],
        bahuKa: [-52, 0, -10], sikuKa: [-30, 0, 0], telunjukKa: [-24, 0, 0],
        bahuKi: [-52, 0, 10], sikuKi: [-30, 0, 0],
        pahaKa: [-30, 0, 0], lututKa: [90, 0, 0], kakiKa: [-70, 0, 0],
        pahaKi: [-30, 0, 0], lututKi: [90, 0, 0], kakiKi: [-70, 0, 0]
      }
    },

    // Badan turun dengan kedua telapak tangan lebih dulu menyentuh
    // lantai, lutut masih terangkat (riwayat Abu Hurairah).
    'turun-tangan': {
      pos: [0, 0.62, -0.10],
      rot: {
        akar: [74, 0, 0],
        pinggang: [16, 0, 0], dada: [14, 0, 0], kepala: [8, 0, 0],
        bahuKa: [-112, 0, -8], sikuKa: [0, 0, 0], tanganKa: [-82, 0, 0], telunjukKa: [-10, 0, 0],
        bahuKi: [-112, 0, 8], sikuKi: [0, 0, 0], tanganKi: [-82, 0, 0],
        pahaKa: [-62, 0, 0], lututKa: [58, 0, 0], kakiKa: [-16, 0, 0],
        pahaKi: [-62, 0, 0], lututKi: [58, 0, 0], kakiKi: [-16, 0, 0]
      }
    },

    /* ── Duduk ───────────────────────────────────────────────── */

    /*
     * Iftirasy — duduk di atas kaki kiri yang direbahkan, kaki kanan
     * ditegakkan dan ujung jarinya dihadapkan ke kiblat. Kedua lutut
     * menempel lantai di depan badan: paha turun ke depan (-60°) dan
     * betis dilipat balik ke belakang (150° relatif paha) sehingga
     * tumit kiri berada tepat di bawah pinggul.
     */
    'duduk-iftirasy': {
      pos: [0, 0.28, -0.10],
      rot: {
        pinggang: [3, 0, 0], dada: [2, 0, 0], kepala: [16, 0, 0],
        bahuKa: [-16, 0, -8], sikuKa: [-6, 0, 0], tanganKa: [-10, 0, 0], telunjukKa: [-24, 0, 0],
        bahuKi: [-16, 0, 8], sikuKi: [-6, 0, 0], tanganKi: [-10, 0, 0],
        pahaKa: [-60, 0, -4], lututKa: [150, 0, 0], kakiKa: [-55, 0, 0],
        pahaKi: [-60, 0, 4], lututKi: [150, 0, 0], kakiKi: [-88, 0, 0]
      }
    },

    /*
     * Tawarruk — pinggul turun menempel lantai, kaki kiri dikeluarkan
     * ke sisi kanan di bawah betis kanan, kaki kanan tetap ditegakkan.
     * Karena pinggul menyentuh lantai, badan sedikit miring ke kiri.
     */
    'duduk-tawarruk': {
      pos: [0.045, 0.20, -0.10],
      rot: {
        akar: [0, 0, 7],
        pinggang: [3, 0, -6], dada: [2, 0, -2], kepala: [16, 0, 0],
        bahuKa: [-16, 0, -8], sikuKa: [-6, 0, 0], tanganKa: [-10, 0, 0], telunjukKa: [-24, 0, 0],
        bahuKi: [-18, 0, 8], sikuKi: [-8, 0, 0], tanganKi: [-10, 0, 0],
        pahaKa: [-75, 0, -6], lututKa: [165, 0, 0], kakiKa: [-55, 0, 0],
        // Kaki kiri melintang ke kanan di bawah betis kanan.
        pahaKi: [-70, 30, 6], lututKi: [160, 0, 0], kakiKi: [-88, 0, 0]
      }
    },

    /* ── Qunut (berdiri berdoa, telapak menengadah) ──────────── */

    'qunut': turunan(BERDIRI, null, {
      // Telapak ditengadahkan: pergelangan diputar 90° pada sumbu lengan
      // lalu ditidurkan ke depan, sehingga permukaan telapak menghadap ke atas.
      bahuKa: [-10, 0, 5], sikuKa: [-85, 0, 0], tanganKa: [-75, 90, 0], telunjukKa: [-8, 0, 0],
      bahuKi: [-10, 0, -5], sikuKi: [-85, 0, 0], tanganKi: [-75, -90, 0],
      kepala: [10, 0, 0]
    }),

    /* ── Transisi bangkit ────────────────────────────────────── */

    // Sikap antara sujud dan berdiri: lutut masih di lantai, badan
    // setengah terangkat. Dipakai sebagai titik singgah supaya bangkit
    // dari sujud tidak terlihat melompat.
    'jongkok': {
      pos: [0, 0.42, -0.05],
      rot: {
        pinggang: [18, 0, 0], dada: [14, 0, 0], kepala: [8, 0, 0],
        bahuKa: [-20, 0, -8], sikuKa: [-14, 0, 0], telunjukKa: [-24, 0, 0],
        bahuKi: [-20, 0, 8], sikuKi: [-14, 0, 0],
        pahaKa: [-40, 0, 0], lututKa: [130, 0, 0], kakiKa: [-70, 0, 0],
        pahaKi: [-40, 0, 0], lututKi: [130, 0, 0], kakiKi: [-70, 0, 0]
      }
    }
  };

  /* Varian kecil yang diturunkan dari pose di atas. */

  // Duduk tasyahud dengan telunjuk kanan berisyarat: jari telunjuk
  // ditegakkan, jari lain menggenggam.
  POSES['tasyahud-iftirasy'] = turunan(POSES['duduk-iftirasy'], null, {
    tanganKa: [-30, 0, 0], telunjukKa: [8, 0, 0]
  });
  POSES['tasyahud-tawarruk'] = turunan(POSES['duduk-tawarruk'], null, {
    tanganKa: [-30, 0, 0], telunjukKa: [8, 0, 0]
  });

  // Salam: menoleh dari pose duduk tasyahud.
  POSES['salam-kanan-iftirasy'] = turunan(POSES['tasyahud-iftirasy'], null, { kepala: [8, -62, 0], leher: [0, -12, 0] });
  POSES['salam-kiri-iftirasy'] = turunan(POSES['tasyahud-iftirasy'], null, { kepala: [8, 62, 0], leher: [0, 12, 0] });
  POSES['salam-kanan-tawarruk'] = turunan(POSES['tasyahud-tawarruk'], null, { kepala: [8, -62, 0], leher: [0, -12, 0] });
  POSES['salam-kiri-tawarruk'] = turunan(POSES['tasyahud-tawarruk'], null, { kepala: [8, 62, 0], leher: [0, 12, 0] });

  // I'tidal: kembali tegak setelah rukuk, tangan lurus di sisi badan.
  POSES['itidal'] = turunan(BERDIRI, null, {});

  root.POSE = { POSES: POSES, turunan: turunan, TINGGI_AKAR: TINGGI_AKAR };
})(window);
