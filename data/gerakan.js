/*
 * GERAKAN — daftar gerakan salat, urut dari awal sampai akhir.
 *
 * Tiap gerakan menyimpan: sikap badan yang diperagakan (pose di pose.js),
 * bacaannya (bacaan.js), dalilnya (dalil.js), dan — kalau memang ada —
 * penjelasan kenapa mazhab bisa berbeda pada gerakan itu.
 *
 * CARA MEMBACA `varian`
 * Empat mazhab dipakai sebagai pilihan rujukan karena istilahnya baku dan
 * netral. Yang ditulis di sini adalah PENDAPAT MASYHUR tiap mazhab — di
 * dalam satu mazhab pun sering ada pendapat lain, dan itu disebutkan di
 * `beda.catatan` bila penting. Isinya ringkasan posisi mazhab, bukan
 * kesimpulan yang ditarik sendiri dari hadits: dalil yang ditampilkan
 * adalah landasan yang biasa disebut para ulama untuk pendapat itu.
 *
 * TIDAK ADA YANG "PALING BENAR" DI SINI.
 * Semua varian di bawah punya dasar dari Al-Qur'an atau sunnah. Situs ini
 * menunjukkan perbedaannya apa adanya supaya orang berhenti bingung, bukan
 * supaya punya alasan baru untuk berdebat.
 */

(function (root) {
  'use strict';

  /* ── Rujukan yang bisa dipilih ─────────────────────────────────── */

  var MAZHAB = {
    syafii: {
      nama: "Syafi'i",
      panjang: "Mazhab Syafi'i",
      catatan: 'Paling banyak diikuti di Indonesia, Malaysia, dan Asia Tenggara.'
    },
    hanafi: {
      nama: 'Hanafi',
      panjang: 'Mazhab Hanafi',
      catatan: 'Paling banyak diikuti di Turki, Asia Selatan, dan Asia Tengah.'
    },
    maliki: {
      nama: 'Maliki',
      panjang: 'Mazhab Maliki',
      catatan: 'Paling banyak diikuti di Afrika Utara dan Afrika Barat.'
    },
    hambali: {
      nama: 'Hambali',
      panjang: 'Mazhab Hambali',
      catatan: 'Paling banyak diikuti di Jazirah Arab.'
    }
  };

  var URUTAN_MAZHAB = ['syafii', 'hanafi', 'maliki', 'hambali'];

  /* ── Gerakan ───────────────────────────────────────────────────── */

  var GERAKAN = [

    {
      id: 'berdiri',
      nama: 'Berdiri dan niat',
      ikon: 'i-g-berdiri',
      hukum: 'Rukun',
      ringkas: 'Berdiri tegak menghadap kiblat, lalu berniat di dalam hati untuk salat yang akan dikerjakan.',
      sorot: 'penuh',
      langkah: [
        { pose: 'berdiri', tahap: 'Berdiri tegak menghadap kiblat', gerak: 700, tahan: 2600 }
      ],
      bacaan: [],
      dalil: [
        { k: 'bukhari-1', sorot: 'niat' },
        { k: 'qs2-238', sorot: null },
        { k: 'qs2-144', sorot: null }
      ],
      beda: {
        judul: 'Perlu melafalkan niat?',
        teks: 'Niat tempatnya di hati, dan soal ini semua sepakat. Yang berbeda adalah ' +
          'apakah dianjurkan mengucapkan lafal niat dengan lisan sebagai pembantu hati.',
        posisi: {
          syafii: 'Dianjurkan melafalkan niat pelan-pelan supaya hati lebih siap.',
          hanafi: 'Boleh, dan sebagian ulamanya menganggapnya baik sebagai pembantu hati.',
          maliki: 'Cukup di hati; melafalkannya tidak dianjurkan, meski tidak membatalkan.',
          hambali: 'Cukup di hati; melafalkannya tidak dicontohkan.'
        },
        catatan: 'Tidak ada hadits yang menyebutkan Nabi mengucapkan lafal niat. ' +
          'Yang melafalkannya memakainya sebagai alat bantu, bukan sebagai syarat sah. ' +
          'Salatmu tetap sah dengan cara mana pun.'
      }
    },

    {
      id: 'takbiratul-ihram',
      nama: 'Takbiratul ihram',
      ikon: 'i-g-takbir',
      hukum: 'Rukun',
      ringkas: 'Mengangkat kedua tangan sambil mengucapkan "Allahu akbar". Sejak takbir ini, ' +
        'kamu sudah masuk dalam salat — bicara dan gerakan di luar salat tidak boleh lagi.',
      sorot: 'atas-badan',
      langkah: [
        { pose: 'berdiri', tahap: 'Berdiri tegak', gerak: 600, tahan: 900 },
        { pose: 'angkat-bahu', tahap: 'Allahu akbar', gerak: 700, tahan: 1900 }
      ],
      bacaan: ['takbir'],
      dalil: [
        { k: 'bukhari-735', sorot: 'bahu' },
        { k: 'abudawud-730', sorot: 'bahu' },
        { k: 'muslim-401', sorot: 'telinga' },
        { k: 'tirmidzi-3', sorot: 'kunci' }
      ],
      varian: {
        syafii: { langkah: [
          { pose: 'berdiri', tahap: 'Berdiri tegak', gerak: 600, tahan: 900 },
          { pose: 'angkat-bahu', tahap: 'Telapak setinggi bahu', gerak: 700, tahan: 1900 }
        ], dalil: [{ k: 'bukhari-735', sorot: 'bahu' }, { k: 'abudawud-730', sorot: 'bahu' }] },
        maliki: { langkah: [
          { pose: 'berdiri', tahap: 'Berdiri tegak', gerak: 600, tahan: 900 },
          { pose: 'angkat-bahu', tahap: 'Telapak setinggi bahu', gerak: 700, tahan: 1900 }
        ], dalil: [{ k: 'bukhari-735', sorot: 'bahu' }, { k: 'abudawud-730', sorot: 'bahu' }] },
        hambali: { langkah: [
          { pose: 'berdiri', tahap: 'Berdiri tegak', gerak: 600, tahan: 900 },
          { pose: 'angkat-bahu', tahap: 'Telapak setinggi bahu', gerak: 700, tahan: 1900 }
        ], dalil: [{ k: 'bukhari-735', sorot: 'bahu' }, { k: 'abudawud-730', sorot: 'bahu' }] },
        hanafi: { langkah: [
          { pose: 'berdiri', tahap: 'Berdiri tegak', gerak: 600, tahan: 900 },
          { pose: 'angkat-telinga', tahap: 'Ibu jari setinggi telinga', gerak: 700, tahan: 1900 }
        ], dalil: [{ k: 'muslim-401', sorot: 'telinga' }, { k: 'nasai-1265', sorot: 'telinga' }] }
      },
      beda: {
        judul: 'Setinggi bahu atau setinggi telinga?',
        teks: 'Dua-duanya diriwayatkan dengan sanad sahih, dari dua sahabat yang berbeda. ' +
          'Ibnu Umar melihat Nabi mengangkat tangan sejajar bahu; Wail bin Hujr melihatnya ' +
          'sejajar telinga. Para ulama menyikapinya dengan dua cara: memilih salah satu ' +
          'riwayat, atau menganggap Nabi memang pernah melakukan keduanya.',
        posisi: {
          syafii: 'Telapak tangan setinggi bahu, ujung jari kira-kira setinggi telinga.',
          hanafi: 'Tangan diangkat lebih tinggi, ibu jari kira-kira sejajar daun telinga.',
          maliki: 'Setinggi bahu.',
          hambali: 'Setinggi bahu.'
        },
        catatan: 'Perhatikan bahwa jarak keduanya hanya beberapa sentimeter. Ini contoh ' +
          'paling jelas bahwa perbedaan yang sering dipersoalkan sebenarnya kecil sekali, ' +
          'dan dua-duanya berasal dari sunnah.'
      }
    },

    {
      id: 'bersedekap',
      nama: 'Bersedekap',
      ikon: 'i-g-sedekap',
      hukum: 'Sunnah',
      ringkas: 'Setelah takbir, tangan kanan diletakkan di atas tangan kiri. Sesudah itu ' +
        'dibaca doa iftitah pelan-pelan.',
      sorot: 'perut',
      langkah: [
        { pose: 'angkat-bahu', tahap: 'Selesai takbir', gerak: 500, tahan: 700 },
        { pose: 'sedekap-atas-pusar', tahap: 'Tangan kanan di atas tangan kiri', gerak: 750, tahan: 2200 }
      ],
      bacaan: ['iftitah'],
      dalil: [
        { k: 'bukhari-740', sorot: 'sedekap' },
        { k: 'muslim-401', sorot: 'sedekap' },
        { k: 'nasai-1265', sorot: 'sedekap' },
        { k: 'bukhari-744', sorot: 'iftitah' }
      ],
      varian: {
        syafii: { langkah: [
          { pose: 'angkat-bahu', tahap: 'Selesai takbir', gerak: 500, tahan: 700 },
          { pose: 'sedekap-atas-pusar', tahap: 'Di atas pusar, di bawah dada', gerak: 750, tahan: 2200 }
        ] },
        hanafi: { langkah: [
          { pose: 'angkat-telinga', tahap: 'Selesai takbir', gerak: 500, tahan: 700 },
          { pose: 'sedekap-bawah-pusar', tahap: 'Di bawah pusar', gerak: 750, tahan: 2200 }
        ] },
        hambali: { langkah: [
          { pose: 'angkat-bahu', tahap: 'Selesai takbir', gerak: 500, tahan: 700 },
          { pose: 'sedekap-bawah-pusar', tahap: 'Di bawah pusar', gerak: 750, tahan: 2200 }
        ] },
        maliki: { langkah: [
          { pose: 'angkat-bahu', tahap: 'Selesai takbir', gerak: 500, tahan: 700 },
          { pose: 'berdiri', tahap: 'Tangan dilepas lurus (sadl)', gerak: 750, tahan: 2200 }
        ] }
      },
      beda: {
        judul: 'Di mana letak tangannya — atau tidak bersedekap sama sekali?',
        teks: 'Hadits Sahl bin Sa\'d menyebut tangan kanan di atas lengan kiri, tapi tidak ' +
          'menyebutkan tingginya. Karena itu ulama berbeda menentukan letaknya, dan sebagian ' +
          'ulama Maliki bahkan memilih tangan dilepas lurus (sadl) pada salat wajib.',
        posisi: {
          syafii: 'Di antara pusar dan dada, sedikit ke kiri.',
          hanafi: 'Di bawah pusar.',
          maliki: 'Pendapat masyhur: tangan dilepas lurus di samping badan (sadl) pada salat wajib.',
          hambali: 'Di bawah pusar.'
        },
        catatan: 'Ada juga pendapat yang meletakkannya di dada, berdasarkan riwayat Wail ' +
          'bin Hujr. Semua letak ini masih dalam rentang yang diriwayatkan, dan tidak ada ' +
          'yang membatalkan salat.'
      }
    },

    {
      id: 'membaca',
      nama: 'Membaca Al-Fatihah',
      ikon: 'i-g-fatihah',
      hukum: 'Rukun',
      ringkas: 'Al-Fatihah dibaca pada setiap rakaat. Pada rakaat pertama dan kedua, ' +
        'sesudahnya dibaca surah atau ayat lain yang kamu hafal.',
      sorot: 'perut',
      langkah: [
        { pose: 'sedekap-atas-pusar', tahap: 'Membaca Al-Fatihah', gerak: 650, tahan: 3200 }
      ],
      bacaan: ['fatihah', 'ikhlas'],
      dalil: [
        { k: 'bukhari-756', sorot: 'fatihah' },
        { k: 'muslim-394', sorot: null },
        { k: 'bukhari-757', sorot: 'baca' },
        { k: 'qs1', sorot: null }
      ],
      varian: {
        syafii: { langkah: [{ pose: 'sedekap-atas-pusar', tahap: 'Membaca Al-Fatihah', gerak: 650, tahan: 3200 }] },
        hanafi: { langkah: [{ pose: 'sedekap-bawah-pusar', tahap: 'Membaca Al-Fatihah', gerak: 650, tahan: 3200 }] },
        hambali: { langkah: [{ pose: 'sedekap-bawah-pusar', tahap: 'Membaca Al-Fatihah', gerak: 650, tahan: 3200 }] },
        maliki: { langkah: [{ pose: 'berdiri', tahap: 'Membaca Al-Fatihah', gerak: 650, tahan: 3200 }] }
      },
      beda: {
        judul: 'Basmalah dibaca keras atau tidak, dan wajibkah Al-Fatihah bagi makmum?',
        teks: 'Semua sepakat Al-Fatihah punya kedudukan istimewa. Yang berbeda: apakah ' +
          'basmalah termasuk ayat pertama dan dibaca keras, serta apakah makmum ikut ' +
          'membacanya ketika imam membaca dengan keras.',
        posisi: {
          syafii: 'Basmalah adalah ayat Al-Fatihah dan dibaca keras pada salat jahar. Makmum tetap membaca Al-Fatihah.',
          hanafi: 'Basmalah dibaca pelan. Makmum tidak membaca — cukup mendengarkan imam.',
          maliki: 'Basmalah tidak dibaca pada salat wajib. Makmum tidak membaca saat imam membaca keras.',
          hambali: 'Basmalah dibaca pelan. Makmum membaca ketika imam diam.'
        },
        catatan: 'Kalau kamu baru belajar dan ikut salat berjamaah, cukup ikuti imam dan ' +
          'baca Al-Fatihah untuk dirimu sendiri. Tidak ada mazhab yang menganggap itu salah.'
      }
    },

    {
      id: 'rukuk',
      nama: 'Rukuk',
      ikon: 'i-g-rukuk',
      hukum: 'Rukun',
      ringkas: 'Membungkuk sampai punggung rata, kedua telapak tangan memegang lutut, ' +
        'dan berhenti sebentar sampai badan tenang.',
      sorot: 'samping',
      langkah: [
        { pose: 'sedekap-atas-pusar', tahap: 'Selesai membaca', gerak: 500, tahan: 600 },
        { pose: 'angkat-bahu', tahap: 'Allahu akbar — mengangkat tangan', gerak: 500, tahan: 700 },
        { pose: 'rukuk', tahap: 'Rukuk, punggung rata', gerak: 800, tahan: 2400 }
      ],
      bacaan: ['takbir', 'tasbih-rukuk'],
      dalil: [
        { k: 'bukhari-828', sorot: 'rukuk' },
        { k: 'abudawud-730', sorot: 'rukuk' },
        { k: 'bukhari-757', sorot: 'rukuk' },
        { k: 'muslim-772', sorot: 'rukuk' },
        { k: 'bukhari-735', sorot: 'rukuk' },
        { k: 'muslim-391', sorot: 'tiga' }
      ],
      varian: {
        syafii: { langkah: [
          { pose: 'sedekap-atas-pusar', tahap: 'Selesai membaca', gerak: 500, tahan: 600 },
          { pose: 'angkat-bahu', tahap: 'Allahu akbar — tangan diangkat', gerak: 500, tahan: 700 },
          { pose: 'rukuk', tahap: 'Rukuk, punggung rata', gerak: 800, tahan: 2400 }
        ], dalil: [
          { k: 'bukhari-828', sorot: 'rukuk' },
          { k: 'bukhari-735', sorot: 'rukuk' },
          { k: 'muslim-391', sorot: 'tiga' },
          { k: 'muslim-772', sorot: 'rukuk' }
        ] },
        hambali: { langkah: [
          { pose: 'sedekap-bawah-pusar', tahap: 'Selesai membaca', gerak: 500, tahan: 600 },
          { pose: 'angkat-bahu', tahap: 'Allahu akbar — tangan diangkat', gerak: 500, tahan: 700 },
          { pose: 'rukuk', tahap: 'Rukuk, punggung rata', gerak: 800, tahan: 2400 }
        ] },
        hanafi: { langkah: [
          { pose: 'sedekap-bawah-pusar', tahap: 'Selesai membaca', gerak: 500, tahan: 700 },
          { pose: 'rukuk', tahap: 'Allahu akbar — langsung rukuk', gerak: 900, tahan: 2400 }
        ], dalil: [
          { k: 'bukhari-828', sorot: 'rukuk' },
          { k: 'bukhari-757', sorot: 'rukuk' },
          { k: 'muslim-772', sorot: 'rukuk' }
        ] },
        maliki: { langkah: [
          { pose: 'berdiri', tahap: 'Selesai membaca', gerak: 500, tahan: 700 },
          { pose: 'rukuk', tahap: 'Allahu akbar — langsung rukuk', gerak: 900, tahan: 2400 }
        ], dalil: [
          { k: 'bukhari-828', sorot: 'rukuk' },
          { k: 'bukhari-757', sorot: 'rukuk' },
          { k: 'muslim-772', sorot: 'rukuk' }
        ] }
      },
      beda: {
        judul: 'Tangan diangkat lagi sebelum rukuk?',
        teks: 'Ibnu Umar meriwayatkan Nabi mengangkat tangan lagi saat hendak rukuk dan saat ' +
          'bangkit darinya. Riwayat lain dari Ibnu Mas\'ud menyebut beliau hanya mengangkat ' +
          'tangan sekali di awal salat. Ulama berbeda dalam menimbang kedua riwayat itu. ' +
          'Gerakan rukuknya sendiri sama persis di semua mazhab.',
        posisi: {
          syafii: 'Ya — tangan diangkat lagi sebelum rukuk dan saat bangkit darinya.',
          hanafi: 'Tidak — tangan hanya diangkat pada takbiratul ihram.',
          maliki: 'Pendapat masyhur: tidak diangkat lagi.',
          hambali: 'Ya — sama seperti Syafi\'i.'
        },
        catatan: 'Mengangkat atau tidak mengangkat tangan di sini tidak membatalkan salat ' +
          'menurut semua mazhab.'
      }
    },

    {
      id: 'itidal',
      nama: "I'tidal",
      ikon: 'i-g-itidal',
      hukum: 'Rukun',
      ringkas: 'Bangkit dari rukuk sampai berdiri tegak sempurna dan tenang, tidak langsung ' +
        'turun sujud.',
      sorot: 'penuh-samping',
      langkah: [
        { pose: 'rukuk', tahap: 'Masih rukuk', gerak: 500, tahan: 600 },
        { pose: 'angkat-bahu', tahap: "Sami'allahu liman hamidah", gerak: 600, tahan: 800 },
        { pose: 'itidal', tahap: 'Berdiri tegak dan tenang', gerak: 600, tahan: 2200 }
      ],
      bacaan: ['sami', 'rabbana'],
      dalil: [
        { k: 'bukhari-828', sorot: 'itidal' },
        { k: 'bukhari-757', sorot: 'itidal' },
        { k: 'bukhari-789', sorot: 'sami' },
        { k: 'muslim-772', sorot: null }
      ],
      varian: {
        hanafi: { langkah: [
          { pose: 'rukuk', tahap: 'Masih rukuk', gerak: 500, tahan: 600 },
          { pose: 'itidal', tahap: "Sami'allahu liman hamidah — berdiri tegak", gerak: 800, tahan: 2400 }
        ] },
        maliki: { langkah: [
          { pose: 'rukuk', tahap: 'Masih rukuk', gerak: 500, tahan: 600 },
          { pose: 'itidal', tahap: "Sami'allahu liman hamidah — berdiri tegak", gerak: 800, tahan: 2400 }
        ] }
      },
      beda: {
        judul: 'Sesudah tegak, tangan disedekapkan lagi atau dilepas?',
        teks: 'Hadits menyebut Nabi berdiri tegak sampai tulang punggung kembali ke ' +
          'tempatnya, tanpa merinci letak tangan. Karena itu ulama berbeda, dan perbedaan ' +
          'ini lebih banyak dibahas ulama belakangan.',
        posisi: {
          syafii: 'Tangan dilepas lurus di sisi badan.',
          hanafi: 'Tangan dilepas lurus di sisi badan.',
          maliki: 'Tangan dilepas lurus di sisi badan.',
          hambali: 'Sebagian ulamanya menyedekapkan tangan kembali, sebagian melepasnya.'
        },
        catatan: 'Yang wajib di sini adalah berdiri tegak dan tenang sejenak, bukan letak ' +
          'tangannya. Menurut hadits orang yang salatnya keliru, tergesa-gesa di i\'tidal ' +
          'itulah yang membuat salatnya diulang.'
      }
    },

    {
      id: 'sujud',
      nama: 'Sujud',
      ikon: 'i-g-sujud',
      hukum: 'Rukun',
      ringkas: 'Turun bersujud dengan tujuh anggota badan menyentuh lantai: dahi bersama ' +
        'hidung, dua telapak tangan, dua lutut, dan ujung jari kedua kaki.',
      sorot: 'samping-rendah',
      langkah: [
        { pose: 'itidal', tahap: 'Berdiri tegak', gerak: 500, tahan: 600 },
        { pose: 'turun-lutut', tahap: 'Allahu akbar — turun, lutut lebih dulu', gerak: 700, tahan: 500 },
        { pose: 'sujud', tahap: 'Sujud dengan tujuh anggota badan', gerak: 700, tahan: 2600 }
      ],
      bacaan: ['takbir', 'tasbih-sujud'],
      dalil: [
        { k: 'bukhari-812', sorot: 'tujuh' },
        { k: 'muslim-490', sorot: 'tujuh' },
        { k: 'bukhari-828', sorot: 'sujud' },
        { k: 'abudawud-730', sorot: 'sujud' },
        { k: 'bukhari-757', sorot: 'sujud' },
        { k: 'muslim-772', sorot: 'sujud' },
        { k: 'abudawud-838', sorot: 'lutut' },
        { k: 'abudawud-840', sorot: 'tangan' }
      ],
      varian: {
        maliki: { langkah: [
          { pose: 'itidal', tahap: 'Berdiri tegak', gerak: 500, tahan: 600 },
          { pose: 'turun-tangan', tahap: 'Allahu akbar — turun, tangan lebih dulu', gerak: 750, tahan: 500 },
          { pose: 'sujud', tahap: 'Sujud dengan tujuh anggota badan', gerak: 650, tahan: 2600 }
        ] }
      },
      beda: {
        judul: 'Lutut dulu atau tangan dulu?',
        teks: 'Ada dua riwayat. Wail bin Hujr menyebut lutut lebih dulu; Abu Hurairah ' +
          'meriwayatkan larangan turun "seperti unta" dan menyebut tangan lebih dulu. ' +
          'Yang perlu kamu tahu jujur-jujuran: riwayat Wail bin Hujr dinilai lemah oleh ' +
          'Al-Albani, sedangkan riwayat Abu Hurairah dinilai sahih olehnya. Meski begitu, ' +
          'mayoritas ulama klasik tetap memilih lutut lebih dulu karena menilai riwayat ' +
          'tersebut cukup kuat dan didukung praktik para sahabat. Dua-duanya ditampilkan ' +
          'di sini beserta derajatnya, silakan kamu nilai sendiri atau tanyakan ke ustadz.',
        posisi: {
          syafii: 'Lutut lebih dulu, baru tangan.',
          hanafi: 'Lutut lebih dulu, baru tangan.',
          maliki: 'Pendapat masyhur: tangan lebih dulu, baru lutut.',
          hambali: 'Lutut lebih dulu, baru tangan.'
        },
        catatan: 'Yang menjadi rukun adalah sujudnya, bukan urutan turunnya. Bagi yang ' +
          'lututnya sakit, turun dengan cara yang paling aman justru lebih utama.'
      }
    },

    {
      id: 'duduk-antara-sujud',
      nama: 'Duduk antara dua sujud',
      ikon: 'i-g-duduk',
      hukum: 'Rukun',
      ringkas: 'Bangkit dari sujud pertama, duduk tenang sebentar sambil berdoa, lalu ' +
        'sujud sekali lagi.',
      sorot: 'duduk',
      langkah: [
        { pose: 'sujud', tahap: 'Sujud pertama', gerak: 500, tahan: 700 },
        { pose: 'duduk-iftirasy', tahap: 'Allahu akbar — duduk tenang', gerak: 750, tahan: 2400 },
        { pose: 'sujud', tahap: 'Allahu akbar — sujud kedua', gerak: 750, tahan: 1600 }
      ],
      bacaan: ['takbir', 'antara-sujud'],
      dalil: [
        { k: 'abudawud-850', sorot: 'doa' },
        { k: 'bukhari-757', sorot: 'duduk' },
        { k: 'abudawud-730', sorot: 'iftirasy' }
      ],
      beda: {
        judul: 'Sama di semua mazhab',
        teks: 'Cara duduknya sama: duduk di atas kaki kiri yang direbahkan, kaki kanan ' +
          'ditegakkan dengan ujung jari menghadap kiblat. Yang berbeda hanya panjang doanya, ' +
          'dan itu bukan perkara sah atau tidak.',
        posisi: null,
        catatan: 'Duduk ini sering diburu-buru padahal termasuk yang diperbaiki Nabi pada ' +
          'orang yang salatnya keliru. Tenang sebentar, baru sujud lagi.'
      }
    },

    {
      id: 'bangkit',
      nama: 'Bangkit ke rakaat berikutnya',
      ikon: 'i-g-berdiri',
      hukum: 'Rukun',
      ringkas: 'Setelah sujud kedua, berdiri lagi untuk rakaat berikutnya sambil bertakbir.',
      sorot: 'penuh-samping',
      langkah: [
        { pose: 'sujud', tahap: 'Sujud kedua', gerak: 500, tahan: 700 },
        { pose: 'duduk-iftirasy', tahap: 'Duduk istirahat sejenak', gerak: 650, tahan: 1100 },
        { pose: 'jongkok', tahap: 'Bertumpu untuk berdiri', gerak: 550, tahan: 500 },
        { pose: 'berdiri', tahap: 'Allahu akbar — berdiri lagi', gerak: 700, tahan: 1600 }
      ],
      bacaan: ['takbir'],
      dalil: [
        { k: 'bukhari-824', sorot: 'istirahat' },
        { k: 'bukhari-789', sorot: 'setiap' }
      ],
      varian: {
        hanafi: { langkah: [
          { pose: 'sujud', tahap: 'Sujud kedua', gerak: 500, tahan: 700 },
          { pose: 'jongkok', tahap: 'Langsung bangkit', gerak: 650, tahan: 500 },
          { pose: 'berdiri', tahap: 'Allahu akbar — berdiri lagi', gerak: 700, tahan: 1600 }
        ] },
        maliki: { langkah: [
          { pose: 'sujud', tahap: 'Sujud kedua', gerak: 500, tahan: 700 },
          { pose: 'jongkok', tahap: 'Langsung bangkit', gerak: 650, tahan: 500 },
          { pose: 'berdiri', tahap: 'Allahu akbar — berdiri lagi', gerak: 700, tahan: 1600 }
        ] },
        hambali: { langkah: [
          { pose: 'sujud', tahap: 'Sujud kedua', gerak: 500, tahan: 700 },
          { pose: 'jongkok', tahap: 'Langsung bangkit', gerak: 650, tahan: 500 },
          { pose: 'berdiri', tahap: 'Allahu akbar — berdiri lagi', gerak: 700, tahan: 1600 }
        ] }
      },
      beda: {
        judul: 'Duduk sebentar dulu sebelum berdiri?',
        teks: 'Malik bin Al-Huwairits menyebut Nabi duduk sejenak sesudah sujud kedua ' +
          'sebelum berdiri — dikenal sebagai duduk istirahat. Ulama berbeda apakah itu ' +
          'sunnah yang tetap, atau beliau melakukannya karena keperluan tertentu.',
        posisi: {
          syafii: 'Sunnah — duduk sebentar dulu sebelum berdiri.',
          hanafi: 'Tidak — langsung berdiri.',
          maliki: 'Tidak — langsung berdiri.',
          hambali: 'Tidak, kecuali bagi yang memerlukannya.'
        },
        catatan: 'Kalau lututmu tidak kuat, duduk sebentar justru membantu. Tidak ada ' +
          'mazhab yang menganggapnya merusak salat.'
      }
    },

    {
      id: 'tasyahud-awal',
      nama: 'Tasyahud awal',
      ikon: 'i-g-tasyahud',
      hukum: 'Sunnah (wajib menurut Hambali)',
      ringkas: 'Pada rakaat kedua salat yang lebih dari dua rakaat, duduk membaca tasyahud ' +
        'sambil mengangkat telunjuk kanan, lalu berdiri lagi.',
      sorot: 'duduk',
      langkah: [
        { pose: 'sujud', tahap: 'Selesai sujud kedua', gerak: 500, tahan: 600 },
        { pose: 'duduk-iftirasy', tahap: 'Duduk iftirasy', gerak: 750, tahan: 1200 },
        { pose: 'tasyahud-iftirasy', tahap: 'Membaca tasyahud, telunjuk diangkat', gerak: 600, tahan: 2600 }
      ],
      bacaan: ['tasyahud'],
      dalil: [
        { k: 'bukhari-831', sorot: 'tasyahud' },
        { k: 'muslim-402', sorot: null },
        { k: 'muslim-580', sorot: 'telunjuk' },
        { k: 'bukhari-828', sorot: 'iftirasy' },
        { k: 'abudawud-730', sorot: 'iftirasy' }
      ],
      varian: {
        maliki: { langkah: [
          { pose: 'sujud', tahap: 'Selesai sujud kedua', gerak: 500, tahan: 600 },
          { pose: 'duduk-tawarruk', tahap: 'Duduk tawarruk', gerak: 800, tahan: 1200 },
          { pose: 'tasyahud-tawarruk', tahap: 'Membaca tasyahud, telunjuk diangkat', gerak: 600, tahan: 2600 }
        ] }
      },
      beda: {
        judul: 'Telunjuknya digerakkan atau diam?',
        teks: 'Ibnu Umar meriwayatkan Nabi mengangkat telunjuk kanan sambil berdoa. Riwayat ' +
          'Wail bin Hujr menyebut beliau menggerakkannya. Dari sini ulama berbeda: ada yang ' +
          'mengangkat lalu mendiamkannya, ada yang menggerakkannya pelan sepanjang doa.',
        posisi: {
          syafii: 'Diangkat saat lafaz "illallah", lalu dibiarkan diam.',
          hanafi: 'Diangkat saat menafikan, diturunkan saat menetapkan.',
          maliki: 'Digerakkan pelan ke kiri dan ke kanan sepanjang tasyahud.',
          hambali: 'Diangkat setiap menyebut nama Allah, tanpa digerakkan.'
        },
        catatan: 'Isyarat telunjuk ini sunnah, bukan rukun. Untuk duduknya sendiri, Maliki ' +
          'memakai tawarruk di kedua tasyahud, sedangkan tiga mazhab lain memakai iftirasy ' +
          'di tasyahud awal.'
      }
    },

    {
      id: 'tasyahud-akhir',
      nama: 'Tasyahud akhir',
      ikon: 'i-g-tasyahud',
      hukum: 'Rukun',
      ringkas: 'Duduk terakhir sebelum salam: membaca tasyahud, salawat kepada Nabi, lalu ' +
        'doa memohon perlindungan.',
      sorot: 'duduk',
      langkah: [
        { pose: 'sujud', tahap: 'Selesai sujud terakhir', gerak: 500, tahan: 600 },
        { pose: 'duduk-tawarruk', tahap: 'Duduk tawarruk', gerak: 800, tahan: 1100 },
        { pose: 'tasyahud-tawarruk', tahap: 'Tasyahud, salawat, lalu doa', gerak: 600, tahan: 3000 }
      ],
      bacaan: ['tasyahud', 'salawat', 'lindung'],
      dalil: [
        { k: 'bukhari-828', sorot: 'tawarruk' },
        { k: 'abudawud-730', sorot: 'tawarruk' },
        { k: 'bukhari-831', sorot: 'tasyahud' },
        { k: 'bukhari-3370', sorot: 'salawat' },
        { k: 'muslim-588', sorot: 'lindung' },
        { k: 'muslim-580', sorot: 'telunjuk' }
      ],
      varian: {
        hanafi: { langkah: [
          { pose: 'sujud', tahap: 'Selesai sujud terakhir', gerak: 500, tahan: 600 },
          { pose: 'duduk-iftirasy', tahap: 'Duduk iftirasy', gerak: 800, tahan: 1100 },
          { pose: 'tasyahud-iftirasy', tahap: 'Tasyahud, salawat, lalu doa', gerak: 600, tahan: 3000 }
        ] }
      },
      beda: {
        judul: 'Duduk tawarruk atau iftirasy?',
        teks: 'Abu Humaid menyebut Nabi duduk di atas kaki kiri pada rakaat kedua, tetapi ' +
          'pada rakaat terakhir mengeluarkan kaki kiri dan duduk di atas pinggul. Ulama ' +
          'berbeda menerapkannya: apakah cara duduk itu khusus untuk salat yang punya dua ' +
          'tasyahud, atau berlaku pada tiap duduk terakhir.',
        posisi: {
          syafii: 'Tawarruk pada tasyahud akhir, iftirasy pada tasyahud awal.',
          hanafi: 'Iftirasy pada kedua tasyahud.',
          maliki: 'Tawarruk pada kedua tasyahud.',
          hambali: 'Tawarruk hanya pada salat yang punya dua tasyahud.'
        },
        catatan: 'Karena itu pada salat Subuh yang cuma dua rakaat, cara duduk terakhirnya ' +
          'pun bisa berbeda antar mazhab — dan semuanya berdalil.'
      }
    },

    {
      id: 'salam',
      nama: 'Salam',
      ikon: 'i-g-salam',
      hukum: 'Rukun',
      ringkas: 'Menoleh ke kanan mengucapkan salam, lalu ke kiri. Dengan salam ini salat ' +
        'selesai.',
      sorot: 'duduk',
      langkah: [
        { pose: 'tasyahud-tawarruk', tahap: 'Selesai berdoa', gerak: 500, tahan: 700 },
        { pose: 'salam-kanan-tawarruk', tahap: "Assalamu'alaikum wa rahmatullah — ke kanan", gerak: 650, tahan: 1500 },
        { pose: 'salam-kiri-tawarruk', tahap: "Assalamu'alaikum wa rahmatullah — ke kiri", gerak: 800, tahan: 1500 },
        { pose: 'duduk-tawarruk', tahap: 'Salat selesai', gerak: 600, tahan: 1200 }
      ],
      bacaan: ['salam'],
      dalil: [
        { k: 'abudawud-996', sorot: 'salam' },
        { k: 'tirmidzi-295', sorot: 'salam' },
        { k: 'tirmidzi-3', sorot: 'kunci' }
      ],
      varian: {
        hanafi: { langkah: [
          { pose: 'tasyahud-iftirasy', tahap: 'Selesai berdoa', gerak: 500, tahan: 700 },
          { pose: 'salam-kanan-iftirasy', tahap: "Assalamu'alaikum wa rahmatullah — ke kanan", gerak: 650, tahan: 1500 },
          { pose: 'salam-kiri-iftirasy', tahap: "Assalamu'alaikum wa rahmatullah — ke kiri", gerak: 800, tahan: 1500 },
          { pose: 'duduk-iftirasy', tahap: 'Salat selesai', gerak: 600, tahan: 1200 }
        ] },
        maliki: { langkah: [
          { pose: 'tasyahud-tawarruk', tahap: 'Selesai berdoa', gerak: 500, tahan: 700 },
          { pose: 'salam-kanan-tawarruk', tahap: "Assalamu'alaikum — satu kali ke kanan", gerak: 650, tahan: 1800 },
          { pose: 'duduk-tawarruk', tahap: 'Salat selesai', gerak: 700, tahan: 1400 }
        ] }
      },
      beda: {
        judul: 'Salam dua kali atau satu kali?',
        teks: 'Riwayat Ibnu Mas\'ud menyebut Nabi bersalam ke kanan dan ke kiri. Ulama Maliki ' +
          'berpegang pada amal penduduk Madinah dan riwayat lain bahwa satu salam sudah cukup ' +
          'bagi orang yang salat sendirian atau sebagai makmum.',
        posisi: {
          syafii: 'Dua salam: ke kanan lalu ke kiri.',
          hanafi: 'Dua salam: ke kanan lalu ke kiri.',
          maliki: 'Satu salam ke kanan bagi orang yang salat sendiri; imam menambah untuk makmum.',
          hambali: 'Dua salam: ke kanan lalu ke kiri.'
        },
        catatan: 'Yang menjadi rukun adalah salam pertama. Menambah salam kedua tidak ' +
          'merusak salat menurut mazhab mana pun.'
      }
    },

    {
      id: 'qunut',
      nama: 'Qunut Subuh',
      ikon: 'i-g-qunut',
      hukum: 'Diperselisihkan',
      ringkas: 'Doa yang dibaca sambil berdiri menengadahkan tangan pada rakaat kedua salat ' +
        'Subuh. Termasuk perbedaan yang paling sering ditanyakan.',
      sorot: 'perut',
      opsional: true,
      langkah: [
        { pose: 'itidal', tahap: "I'tidal rakaat kedua", gerak: 600, tahan: 800 },
        { pose: 'qunut', tahap: 'Menengadahkan tangan, membaca qunut', gerak: 750, tahan: 3000 }
      ],
      bacaan: [],
      dalil: [
        { k: 'bukhari-1002', sorot: 'sebulan' },
        { k: 'muslim-677', sorot: 'tigapuluh' }
      ],
      beda: {
        judul: 'Qunut Subuh: dibaca setiap hari atau tidak?',
        teks: 'Riwayat dari Anas bin Malik sendiri tampak berbeda-beda: satu riwayat ' +
          'menyebut qunut dibaca sebelum rukuk, riwayat lain menyebut Nabi berqunut sesudah ' +
          'rukuk selama satu bulan untuk mendoakan keburukan bagi pembunuh para sahabat, ' +
          'lalu berhenti. Ulama berbeda menyimpulkan: apakah qunut Subuh itu sunnah yang ' +
          'tetap, atau hanya dilakukan saat ada musibah tertentu (qunut nazilah).',
        posisi: {
          syafii: 'Sunnah setiap salat Subuh, dibaca sesudah rukuk pada rakaat kedua.',
          hanafi: 'Tidak ada qunut pada Subuh; qunut tempatnya di salat Witir.',
          maliki: 'Sunnah, dibaca sebelum rukuk pada rakaat kedua.',
          hambali: 'Tidak ada qunut pada Subuh, kecuali qunut nazilah saat umat tertimpa musibah.'
        },
        catatan: 'Ini perbedaan yang paling sering membuat orang bertengkar di masjid, ' +
          'padahal keduanya berpegang pada riwayat yang sama dan cuma berbeda dalam ' +
          'menyimpulkannya. Kalau kamu makmum, ikuti imam — itu yang dicontohkan para ulama.'
      }
    }
  ];

  /* ── Alat bantu ───────────────────────────────────────────────── */

  // Mengambil bentuk satu gerakan menurut satu mazhab: bagian yang tidak
  // ditimpa varian dipakai apa adanya dari definisi umum di atas.
  function menurut(gerakan, mazhab) {
    var v = (gerakan.varian || {})[mazhab] || {};
    return {
      id: gerakan.id,
      nama: gerakan.nama,
      ikon: gerakan.ikon,
      hukum: gerakan.hukum,
      ringkas: gerakan.ringkas,
      sorot: v.sorot || gerakan.sorot,
      langkah: v.langkah || gerakan.langkah,
      bacaan: v.bacaan || gerakan.bacaan,
      dalil: v.dalil || gerakan.dalil,
      beda: gerakan.beda
    };
  }

  function cari(id) {
    for (var i = 0; i < GERAKAN.length; i++) {
      if (GERAKAN[i].id === id) return GERAKAN[i];
    }
    return null;
  }

  root.MAZHAB = MAZHAB;
  root.URUTAN_MAZHAB = URUTAN_MAZHAB;
  root.GERAKAN = GERAKAN;
  root.gerakanMenurut = menurut;
  root.cariGerakan = cari;
})(window);
