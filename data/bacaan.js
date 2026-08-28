/*
 * BACAAN — lafaz yang dibaca di tiap gerakan.
 *
 * Teks Arab dan latinnya TIDAK diketik ulang: keduanya dipotong langsung
 * dari teks dalil di dalil.js oleh skrip kurasi, sehingga tidak mungkin
 * berbeda dari sumbernya. Yang ditulis tangan hanya arti dalam bahasa
 * sehari-hari dan catatan singkat cara membacanya.
 *
 * Setiap bacaan menyebut `dalil` tempatnya berasal, dan halaman selalu
 * menampilkan dalil itu utuh di bawahnya.
 */

(function (root) {
  'use strict';

  root.BACAAN = {
  "takbir": {
    "judul": "Takbir",
    "arab": "اللَّهُ أَكْبَرُ",
    "latin": "allahu akbaru",
    "arti": "Allah Maha Besar.",
    "catatan": "Diucapkan setiap kali berpindah gerakan. Yang pertama, saat mengangkat tangan di awal salat, disebut takbiratul ihram.",
    "dalil": [
      "abudawud-730"
    ]
  },
  "iftitah": {
    "judul": "Doa iftitah",
    "arab": "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَاىَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنَ الْخَطَايَا كَمَا يُنَقَّى الثَّوْبُ الأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْ خَطَايَاىَ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ",
    "latin": "allahumma baid bayni wabayna khathayaa kama baadta bayna almasyriqi waalmaghribi, allahumma naqqini mina alkhathaya kama yunaqqa attsawbu alabyadhu mina addanasi, allahumma aghsil khathayaa bialmai waattsalji waalbaradi",
    "arti": "Ya Allah, jauhkanlah aku dari dosa-dosaku sebagaimana Engkau menjauhkan antara timur dan barat. Ya Allah, bersihkanlah aku dari dosa-dosaku sebagaimana kain putih dibersihkan dari kotoran. Ya Allah, cucilah dosa-dosaku dengan air, salju, dan es.",
    "catatan": "Dibaca pelan sesudah takbiratul ihram, sebelum Al-Fatihah. Ada beberapa lafaz iftitah yang sama-sama sahih; ini salah satunya.",
    "dalil": [
      "bukhari-744"
    ]
  },
  "tasbih-rukuk": {
    "judul": "Bacaan rukuk",
    "arab": "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    "latin": "subhana rabbiya alazhimi",
    "arti": "Maha Suci Tuhanku Yang Maha Agung.",
    "catatan": "Diulang tiga kali atau lebih. Sebagian riwayat menambahkan \"wa bihamdih\".",
    "dalil": [
      "muslim-772"
    ]
  },
  "sami": {
    "judul": "Bacaan bangkit dari rukuk",
    "arab": "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
    "latin": "samia allahu liman hamidahu",
    "arti": "Allah mendengar orang yang memuji-Nya.",
    "catatan": "Diucapkan sambil bangkit dari rukuk.",
    "dalil": [
      "muslim-772"
    ]
  },
  "rabbana": {
    "judul": "Bacaan i'tidal",
    "arab": "رَبَّنَا لَكَ الْحَمْدُ",
    "latin": "rabbana laka alhamdu",
    "arti": "Ya Tuhan kami, bagi-Mu segala puji.",
    "catatan": "Dibaca setelah berdiri tegak. Sebagian riwayat memakai lafaz \"Allahumma rabbana lakal hamd\" atau \"wa lakal hamd\" — semuanya sahih.",
    "dalil": [
      "muslim-772"
    ]
  },
  "tasbih-sujud": {
    "judul": "Bacaan sujud",
    "arab": "سُبْحَانَ رَبِّيَ الأَعْلَى",
    "latin": "subhana rabbiya alala",
    "arti": "Maha Suci Tuhanku Yang Maha Tinggi.",
    "catatan": "Diulang tiga kali atau lebih.",
    "dalil": [
      "muslim-772"
    ]
  },
  "antara-sujud": {
    "judul": "Doa duduk antara dua sujud",
    "arab": "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَعَافِنِي وَاهْدِنِي وَارْزُقْنِي",
    "latin": "allahumma aghfir li warhamni waafini wahdini warzuqni",
    "arti": "Ya Allah, ampunilah aku, rahmatilah aku, berilah aku kesehatan, tunjukilah aku, dan berikanlah rezeki kepadaku.",
    "catatan": "Dibaca pada duduk di antara dua sujud.",
    "dalil": [
      "abudawud-850"
    ]
  },
  "tasyahud": {
    "judul": "Tasyahud",
    "arab": "التَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ. فَإِنَّكُمْ إِذَا قُلْتُمُوهَا أَصَابَتْ كُلَّ عَبْدٍ لِلَّهِ صَالِحٍ فِي السَّمَاءِ وَالأَرْضِ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    "latin": "attahiyyatu lillahi, waasshalawatu waatthayyibatu, assalamu alayka ayyuha annabiyyu warahmahu allahi wabarakatuhu, assalamu alayna waala ibadi allahi asshalihina. fainnakum idza qultumuha ashabat kulla abdin lillahi shalihin fi assamai waalardhi, asyhadu an la ilaha ila allahu, waasyhadu anna muhammadan abduhu warasuluhu",
    "arti": "Segala penghormatan, salawat, dan kebaikan hanya milik Allah. Semoga keselamatan, rahmat Allah, dan berkah-Nya tercurah kepadamu, wahai Nabi. Semoga keselamatan tercurah kepada kami dan kepada hamba-hamba Allah yang saleh. Aku bersaksi bahwa tidak ada tuhan yang berhak disembah selain Allah, dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya.",
    "catatan": "Dibaca pada duduk tasyahud awal dan akhir.",
    "dalil": [
      "bukhari-831"
    ]
  },
  "salawat": {
    "judul": "Salawat",
    "arab": "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ، وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
    "latin": "allahumma shalli ala muhammadin, waala ali muhammadin, kama shallayta ala ibrahima waala ali ibrahima, innaka hamidun majidun",
    "arti": "Ya Allah, limpahkanlah rahmat kepada Muhammad dan keluarga Muhammad, sebagaimana Engkau melimpahkan rahmat kepada Ibrahim dan keluarga Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia. Ya Allah, berkahilah Muhammad dan keluarga Muhammad, sebagaimana Engkau memberkahi Ibrahim dan keluarga Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.",
    "catatan": "Dibaca pada duduk tasyahud akhir, sesudah tasyahud.",
    "dalil": [
      "bukhari-3370"
    ]
  },
  "lindung": {
    "judul": "Doa perlindungan sebelum salam",
    "arab": "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
    "latin": "allahumma inni audzu bika min adzabi jahannama wamin adzabi alqabri wamin fitnahi almahya waalmamati wamin syarri fitnahi almasihi addajjali",
    "arti": "Ya Allah, aku berlindung kepada-Mu dari siksa neraka Jahanam, dari siksa kubur, dari fitnah kehidupan dan kematian, dan dari kejahatan fitnah Al-Masih Ad-Dajjal.",
    "catatan": "Dibaca sesudah salawat, sebelum salam.",
    "dalil": [
      "muslim-588"
    ]
  },
  "salam": {
    "judul": "Salam",
    "arab": "السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
    "latin": "assalamu alaykum warahmahu allahi",
    "arti": "Semoga keselamatan dan rahmat Allah tercurah kepada kalian.",
    "catatan": "Diucapkan sambil menoleh ke kanan, lalu ke kiri.",
    "dalil": [
      "abudawud-996"
    ]
  },
  "istighfar": {
    "judul": "Istighfar dan dzikir sesudah salam",
    "arab": "اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ تَبَارَكْتَ ذَا الْجَلاَلِ وَالإِكْرَامِ",
    "latin": "allahumma anta assalamu waminka assalamu tabarakta dza aljalali waalikrami",
    "arti": "Ya Allah, Engkaulah As-Salam (sumber keselamatan), dan dari-Mu keselamatan. Maha Berkah Engkau, wahai Pemilik Keagungan dan Kemuliaan.",
    "catatan": "Dibaca sesudah salam, didahului istighfar tiga kali.",
    "dalil": [
      "muslim-591"
    ]
  },
  "fatihah": {
    "judul": "Al-Fatihah",
    "ayat": [
      {
        "no": 1,
        "arab": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
        "latin": "Bismillāhir-raḥmānir-raḥīm(i).",
        "arti": "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang."
      },
      {
        "no": 2,
        "arab": "اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ",
        "latin": "Al-ḥamdu lillāhi rabbil-‘ālamīn(a).",
        "arti": "Segala puji bagi Allah, Tuhan semesta alam"
      },
      {
        "no": 3,
        "arab": "الرَّحْمٰنِ الرَّحِيْمِۙ",
        "latin": "Ar-raḥmānir-raḥīm(i).",
        "arti": "Yang Maha Pengasih lagi Maha Penyayang,"
      },
      {
        "no": 4,
        "arab": "مٰلِكِ يَوْمِ الدِّيْنِۗ",
        "latin": "Māliki yaumid-dīn(i).",
        "arti": "Pemilik hari Pembalasan."
      },
      {
        "no": 5,
        "arab": "اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ",
        "latin": "Iyyāka na‘budu wa iyyāka nasta‘īn(u),",
        "arti": "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan."
      },
      {
        "no": 6,
        "arab": "اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ",
        "latin": "Ihdinaṣ-ṣirāṭal-mustaqīm(a).",
        "arti": "Bimbinglah kami ke jalan yang lurus,"
      },
      {
        "no": 7,
        "arab": "صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ ࣖ",
        "latin": "Ṣirāṭal-lażīna an‘amta ‘alaihim, gairil-magḍūbi ‘alaihim wa laḍ-ḍāllīn(a).",
        "arti": "(yaitu) jalan orang-orang yang telah Engkau beri nikmat, bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) orang-orang yang sesat."
      }
    ],
    "catatan": "Wajib dibaca pada setiap rakaat. Basmalah dihitung sebagai ayat pertama menurut mazhab Syafi'i, dan dibaca pelan atau keras sesuai pendapat masing-masing.",
    "dalil": [
      "qs1"
    ]
  },
  "ikhlas": {
    "judul": "Surah pendek (contoh: Al-Ikhlas)",
    "ayat": [
      {
        "no": 1,
        "arab": "قُلْ هُوَ اللّٰهُ اَحَدٌۚ",
        "latin": "Qul huwallāhu aḥad(un).",
        "arti": "Katakanlah (Nabi Muhammad), “Dialah Allah Yang Maha Esa."
      },
      {
        "no": 2,
        "arab": "اَللّٰهُ الصَّمَدُۚ",
        "latin": "Allāhuṣ-ṣamad(u).",
        "arti": "Allah tempat meminta segala sesuatu."
      },
      {
        "no": 3,
        "arab": "لَمْ يَلِدْ وَلَمْ يُوْلَدْۙ",
        "latin": "Lam yalid wa lam yūlad.",
        "arti": "Dia tidak beranak dan tidak pula diperanakkan"
      },
      {
        "no": 4,
        "arab": "وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ ࣖ",
        "latin": "Wa lam yakul lahū kufuwan aḥad(un).",
        "arti": "serta tidak ada sesuatu pun yang setara dengan-Nya.”"
      }
    ],
    "catatan": "Sesudah Al-Fatihah pada rakaat pertama dan kedua, dibaca surah atau ayat lain yang dihafal. Al-Ikhlas dipakai di sini sebagai contoh karena pendek dan mudah.",
    "dalil": [
      "qs112"
    ]
  }
};
})(window);
