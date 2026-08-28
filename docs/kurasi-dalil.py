#!/usr/bin/env python3
"""Menyusun data/dalil.js dan data/bacaan.js dari hasil kurasi.

Teks Arab, terjemahan, dan derajat DISALIN APA ADANYA dari dalil-mentah.json
(hadits.id dan equran.id). Yang ditulis tangan di berkas ini hanya label
rujukan, ringkasan satu kalimat, dan penanda bagian mana yang disorot —
dan setiap penanda diperiksa keberadaannya, jadi salah ketik akan membuat
proses ini gagal, bukan diam-diam menghasilkan kutipan yang keliru.
"""
import json, unicodedata, sys, datetime, pathlib

MENTAH = json.load(open('dalil-mentah.json', encoding='utf-8'))
H, Q = MENTAH['hadits'], MENTAH['quran']
TUJUAN = pathlib.Path('/Users/aan/Documents/Personal Project/Business Web/salat/data')

def polos(t):
    t = ''.join(c for c in unicodedata.normalize('NFD', t) if not unicodedata.combining(c))
    return t.replace('ٱ', 'ا').replace('أ', 'ا').replace('إ', 'ا').replace('آ', 'ا').replace('ى', 'ي').replace('ة', 'ه')

def iris(teks, mulai, akhir, nama):
    """Potong `teks` dari penanda `mulai` sampai `akhir`, cocok tanpa harakat."""
    peta, rata = [], []
    for i, c in enumerate(teks):
        p = polos(c)
        for _ in p:
            peta.append(i)
        rata.append(p)
    rata = ''.join(rata)
    a = rata.find(polos(mulai))
    if a < 0:
        sys.exit('GAGAL %s: penanda awal tidak ditemukan: %s' % (nama, mulai))
    b = rata.find(polos(akhir), a)
    if b < 0:
        sys.exit('GAGAL %s: penanda akhir tidak ditemukan: %s' % (nama, akhir))
    ujung = peta[b + len(polos(akhir)) - 1] + 1
    # Ikutkan harakat yang menempel di huruf terakhir; tanpa ini potongannya
    # kehilangan tanda baca penutup, misalnya "اللَّهُ أَكْبَر" tanpa dhammah.
    while ujung < len(teks) and unicodedata.combining(teks[ujung]):
        ujung += 1
    return teks[peta[a]:ujung].strip()

def js(v, indent=2):
    return json.dumps(v, ensure_ascii=False, indent=indent)

# ─────────────────────────────────────────────────────────────────
# 1. DALIL
# Kolom yang ditulis tangan: rujukan, perawi, ringkas, sorot.
# ─────────────────────────────────────────────────────────────────

HADITS_DIPAKAI = [
    ('bukhari-1', 'HR Bukhari no. 1', 'Dari Umar bin Al-Khattab',
     'Setiap amal dinilai dari niatnya. Inilah dasar bahwa salat harus diniatkan, dan niat itu tempatnya di hati.',
     {'niat': 'Sesungguhnya amal itu tergantung pada niat'}),

    ('bukhari-631', 'HR Bukhari no. 631', 'Dari Malik bin Al-Huwairits',
     'Perintah Nabi agar salat dikerjakan persis seperti yang beliau contohkan. Inilah alasan setiap gerakan di situs ini harus punya dalil.',
     {'ikut': 'Shalatlah seperti yang kalian lihat aku shalat'}),

    ('bukhari-757', 'HR Bukhari no. 757', 'Dari Abu Hurairah',
     'Nabi mengajari orang yang salatnya keliru, urut dari takbir sampai duduk — dan menekankan tuma\'ninah: setiap gerakan dikerjakan sampai tenang, tidak buru-buru.',
     {'takbir': 'Ketika kamu berdiri untuk shalat, ucapkan takbir',
      'baca': 'bacalah apa yang mudah bagimu dari Al-Qur\'an',
      'rukuk': 'rukuklah hingga kamu merasa tenang',
      'itidal': 'angkatlah kepala dan berdirilah dengan tegak',
      'sujud': 'sujudlah hingga kamu merasa tenang dalam sujudmu',
      'duduk': 'duduklah dengan tenang hingga kamu merasa tenang'}),

    ('bukhari-828', 'HR Bukhari no. 828', 'Dari Abu Humaid As-Sa\'idi',
     'Abu Humaid memperagakan salat Nabi di depan sepuluh sahabat dan mereka membenarkannya. Satu hadits ini memuat hampir seluruh sikap badan, termasuk beda duduk tasyahud awal dan akhir.',
     {'takbir': 'mengangkat kedua tangannya hingga sejajar dengan bahu saat mengucapkan Takbir',
      'rukuk': 'saat ruku beliau meletakkan kedua tangannya di kedua lutut dan membungkukkan punggungnya dengan lurus',
      'itidal': 'beliau berdiri tegak dari ruku hingga semua tulang belakang kembali ke posisi semula',
      'sujud': 'beliau meletakkan kedua tangannya di tanah dengan lengan jauh dari tanah dan jauh dari tubuhnya',
      'iftirasy': 'Saat duduk di rakaat kedua, beliau duduk di atas kaki kirinya dan mengangkat kaki kanannya',
      'tawarruk': 'di rakaat terakhir beliau mendorong kaki kirinya ke depan dan menjaga kaki lainnya tetap terangkat dan duduk di atas pantatnya'}),

    ('abudawud-730', 'HR Abu Dawud no. 730', 'Dari Abu Humaid As-Sa\'idi',
     'Riwayat Abu Humaid versi Abu Dawud, paling rinci di antara semuanya: dari takbir sampai salam, termasuk beda duduk pada rakaat kedua dan rakaat terakhir.',
     {'bahu': 'beliau mengangkat tangan hingga sejajar dengan bahunya',
      'rukuk': 'beliau ruku, meletakkan telapak tangannya di lutut dan menjaga tubuhnya tetap tegak',
      'sujud': 'menundukkan diri ke tanah (dalam sujud), menjaga lengan jauh dari sisi',
      'iftirasy': 'membengkokkan kaki kirinya dan duduk di atasnya',
      'tawarruk': 'beliau mengeluarkan kaki kirinya dan duduk di atas pinggul kirinya'}),

    ('bukhari-735', 'HR Bukhari no. 735', 'Dari Ibnu Umar',
     'Tangan diangkat sejajar bahu, dan diangkat lagi saat hendak rukuk dan bangkit darinya — tetapi tidak saat sujud.',
     {'bahu': 'mengangkat kedua tangannya sejajar dengan bahunya ketika memulai shalat',
      'rukuk': 'ketika mengucapkan Takbir untuk rukuk',
      'sujud': 'beliau tidak melakukan itu (yaitu mengangkat tangan) dalam sujud'}),

    ('muslim-391', 'HR Muslim no. 391', 'Dari Malik bin Al-Huwairits',
     'Tangan diangkat di tiga tempat: awal salat, sebelum rukuk, dan setelah bangkit dari rukuk.',
     {'tiga': 'mengangkat kedua tangannya di awal shalat dan mengangkat kedua tangannya sebelum rukuk'}),

    ('muslim-401', 'HR Muslim no. 401', 'Dari Wail bin Hujr',
     'Riwayat yang menyebut tangan diangkat sampai sejajar telinga, lalu tangan kanan diletakkan di atas tangan kiri.',
     {'telinga': 'tangan diangkat sejajar dengan telinga',
      'sedekap': 'meletakkan tangan kanannya di atas tangan kirinya'}),

    ('nasai-1265', 'HR An-Nasa\'i no. 1265', 'Dari Wail bin Hujr',
     'Wail sengaja memperhatikan cara Nabi salat: tangan diangkat sampai telinga, lalu tangan kiri dipegang tangan kanan.',
     {'telinga': 'mengangkat kedua tangannya hingga sejajar dengan telinga beliau',
      'sedekap': 'beliau memegang tangan kirinya dengan tangan kanannya'}),

    ('bukhari-740', 'HR Bukhari no. 740', 'Dari Sahl bin Sa\'d',
     'Perintah meletakkan tangan kanan di atas lengan kiri ketika salat, tanpa menyebut tinggi letaknya.',
     {'sedekap': 'meletakkan tangan kanan di atas lengan kiri dalam shalat'}),

    ('bukhari-744', 'HR Bukhari no. 744', 'Dari Abu Hurairah',
     'Doa yang dibaca Nabi pada jeda diam antara takbir dan bacaan Al-Fatihah.',
     {'iftitah': 'Ya Allah, jauhkanlah aku dari dosa-dosaku sebagaimana Engkau menjauhkan antara timur dan barat'}),

    ('bukhari-756', 'HR Bukhari no. 756', 'Dari Ubadah bin Ash-Shamit',
     'Al-Fatihah adalah bacaan yang tidak boleh ditinggalkan dalam salat.',
     {'fatihah': 'Tidak ada shalat bagi orang yang tidak membaca Al-Fatihah'}),

    ('bukhari-789', 'HR Bukhari no. 789', 'Dari Abu Hurairah',
     'Takbir diucapkan pada setiap perpindahan gerakan, kecuali saat bangkit dari rukuk yang dibaca "sami\'allahu liman hamidah".',
     {'sami': "beliau berkata, 'Sami`a llahu liman hamidah,'",
      'rabbana': "saat berdiri tegak beliau biasa berkata, 'Rabbana laka-l hamd'",
      'setiap': 'beliau mengucapkan Takbir pada awal shalat dan kemudian saat ruku'}),

    ('muslim-772', 'HR Muslim no. 772', 'Dari Hudzaifah',
     'Hudzaifah menceritakan salat malam Nabi: bacaan rukuk, i\'tidal, dan sujud, serta lamanya yang hampir sama antara satu gerakan dengan gerakan lain.',
     {'rukuk': 'rukuk dan berkata: Maha Suci Tuhan yang Maha Perkasa',
      'sujud': 'Kemudian beliau sujud dan berkata: Maha Suci Tuhan yang Maha Tinggi'}),

    ('bukhari-812', 'HR Bukhari no. 812', 'Dari Ibnu Abbas',
     'Tujuh anggota badan yang harus menyentuh lantai saat sujud.',
     {'tujuh': 'sujud di atas tujuh tulang'}),

    ('muslim-490', 'HR Muslim no. 490', 'Dari Ibnu Abbas',
     'Riwayat Muslim tentang tujuh anggota sujud.',
     {'tujuh': 'sujud di atas tujuh (tulang)'}),

    ('abudawud-838', 'HR Abu Dawud no. 838', 'Dari Wail bin Hujr',
     'Riwayat yang menyebut lutut diletakkan lebih dulu sebelum tangan ketika turun sujud.',
     {'lutut': 'meletakkan lututnya (di tanah) sebelum meletakkan tangannya ketika ia sujud'}),

    ('abudawud-840', 'HR Abu Dawud no. 840', 'Dari Abu Hurairah',
     'Riwayat yang melarang turun seperti unta dan menyebut tangan diletakkan lebih dulu sebelum lutut.',
     {'tangan': 'hendaklah meletakkan tangannya sebelum lututnya'}),

    ('abudawud-850', 'HR Abu Dawud no. 850', 'Dari Ibnu Abbas',
     'Doa yang dibaca Nabi pada duduk antara dua sujud.',
     {'doa': 'Ya Allah, ampunilah aku, rahmatilah aku'}),

    ('bukhari-824', 'HR Bukhari no. 824', 'Dari Malik bin Al-Huwairits',
     'Setelah sujud kedua beliau duduk sebentar dulu, baru berdiri — yang kemudian dikenal sebagai duduk istirahat.',
     {'istirahat': 'dia duduk sejenak dan kemudian bersandar pada tanah dan berdiri'}),

    ('bukhari-831', 'HR Bukhari no. 831', 'Dari Ibnu Mas\'ud',
     'Lafaz tasyahud yang diajarkan langsung oleh Nabi kepada para sahabat.',
     {'tasyahud': 'At-Tahiyatu li llahi wa ssalawatu wa t-taiyibat'}),

    ('muslim-402', 'HR Muslim no. 402', 'Dari Ibnu Mas\'ud',
     'Riwayat Muslim untuk lafaz tasyahud yang sama.',
     {}),

    ('muslim-580', 'HR Muslim no. 580', 'Dari Ibnu Umar',
     'Saat tasyahud, tangan diletakkan di atas lutut dan telunjuk kanan diangkat untuk berdoa.',
     {'telunjuk': 'mengangkat jari telunjuk tangan kanannya'}),

    ('bukhari-3370', 'HR Bukhari no. 3370', 'Dari Ka\'b bin Ujrah',
     'Para sahabat bertanya bagaimana bersalawat kepada Nabi, dan beliau mengajarkan lafaznya.',
     {'salawat': 'Ya Allah! Kirimkan Rahmat-Mu kepada Muhammad dan kepada keluarga Muhammad'}),

    ('muslim-588', 'HR Muslim no. 588', 'Dari Abu Hurairah',
     'Empat hal yang diminta perlindungan sesudah tasyahud, sebelum salam.',
     {'lindung': 'berlindung kepada Allah dari empat (ujian)'}),

    ('abudawud-996', 'HR Abu Dawud no. 996', 'Dari Ibnu Mas\'ud',
     'Salam diucapkan ke kanan dan ke kiri sampai pipi beliau terlihat dari belakang.',
     {'salam': 'memberi salam ke kanan dan ke kiri hingga terlihat putih pipinya'}),

    ('tirmidzi-295', 'HR Tirmidzi no. 295', 'Dari Ibnu Mas\'ud',
     'Riwayat Tirmidzi untuk salam ke kanan dan ke kiri.',
     {'salam': 'mengucapkan salam dari sebelah kanan dan sebelah kiri'}),

    ('tirmidzi-3', 'HR Tirmidzi no. 3', 'Dari Ali bin Abi Thalib',
     'Salat dibuka dengan bersuci, dimulai dengan takbir, dan diakhiri dengan salam.',
     {'kunci': 'Kunci shalat adalah thaharah'}),

    ('bukhari-1002', 'HR Bukhari no. 1002', 'Dari Anas bin Malik',
     'Anas ditanya tentang qunut. Dua riwayat darinya berbeda — sebelum atau sesudah rukuk, dan berapa lama Nabi melakukannya. Perbedaan penilaian riwayat inilah yang membuat ulama berbeda soal qunut Subuh.',
     {'sebelum': "Anas menjawab, 'Sebelum ruku.'",
      'sebulan': 'membaca Qunut setelah ruku selama satu bulan'}),

    ('muslim-677', 'HR Muslim no. 677', 'Dari Anas bin Malik',
     'Nabi berqunut pada salat Subuh selama tiga puluh hari untuk mendoakan keburukan bagi pembunuh para sahabat di Bi\'r Ma\'unah.',
     {'tigapuluh': 'shalat subuh selama tiga puluh hari'}),

    ('muslim-591', 'HR Muslim no. 591', 'Dari Tsauban',
     'Sesudah salam, Nabi beristighfar tiga kali lalu membaca "Allahumma antas-salam...".',
     {'dzikir': 'beliau memohon ampun tiga kali'}),

    ('muslim-595', 'HR Muslim no. 595', 'Dari Abu Hurairah',
     'Tasbih, tahmid, dan takbir masing-masing 33 kali sesudah salat — amalan ringan yang diajarkan Nabi kepada sahabat yang tidak punya harta untuk bersedekah.',
     {'tigapuluhtiga': 'tiga puluh tiga'}),

    ('muslim-597', 'HR Muslim no. 597', 'Dari Abu Hurairah',
     'Tasbih, tahmid, dan takbir 33 kali digenapkan menjadi seratus dengan satu kalimat tauhid.',
     {'seratus': 'untuk menyempurnakan seratus'}),

    ('muslim-394', 'HR Muslim no. 394', 'Dari Ubadah bin Ash-Shamit',
     'Riwayat Muslim tentang kewajiban membaca Al-Fatihah.',
     {}),
]

QURAN_DIPAKAI = [
    ('qs4-103', 4, [103], 'QS An-Nisa ayat 103',
     'Salat punya waktu-waktu yang sudah ditentukan. Masuknya waktu adalah syarat sah salat.', {}),
    ('qs2-238', 2, [238], 'QS Al-Baqarah ayat 238',
     'Perintah menjaga salat dan berdiri dengan tenang menghadap Allah.', {}),
    ('qs20-14', 20, [14], 'QS Taha ayat 14',
     'Salat ditegakkan untuk mengingat Allah — inti dari seluruh gerakan dan bacaannya.', {}),
    ('qs5-6', 5, [6], 'QS Al-Ma\'idah ayat 6',
     'Perintah berwudu sebelum salat, lengkap dengan anggota badan yang dibasuh dan diusap.', {}),
    ('qs2-144', 2, [144], 'QS Al-Baqarah ayat 144',
     'Perintah menghadap ke arah Masjidil Haram di mana pun kita berada.', {}),
    ('qs23-1', 23, [1, 2], 'QS Al-Mu\'minun ayat 1-2',
     'Orang beriman yang beruntung adalah yang khusyuk dalam salatnya.', {}),
    ('qs1', 1, list(range(1, 8)), 'QS Al-Fatihah ayat 1-7',
     'Surah yang dibaca pada setiap rakaat.', {}),
    ('qs112', 112, [1, 2, 3, 4], 'QS Al-Ikhlas ayat 1-4',
     'Salah satu surah pendek yang biasa dibaca sesudah Al-Fatihah.', {}),
]

dalil = {}
for kunci, rujukan, perawi, ringkas, sorot in HADITS_DIPAKAI:
    h = H[kunci]
    for nama, frasa in sorot.items():
        if frasa not in h['indo']:
            sys.exit('GAGAL sorot %s/%s: "%s" tidak ada di terjemahannya' % (kunci, nama, frasa))
    kitab, no = kunci.rsplit('-', 1)
    dalil[kunci] = {
        'jenis': 'hadits', 'rujukan': rujukan, 'perawi': perawi,
        'derajat': h['derajat'], 'ringkas': ringkas,
        'arab': h['arab'], 'terjemah': h['indo'],
        'tautan': 'https://www.hadits.id/hadits/%s/%s' % (kitab, no),
        'sorot': sorot,
    }

for kunci, surah, ayat, rujukan, ringkas, sorot in QURAN_DIPAKAI:
    s = Q[str(surah)]
    pilih = [a for a in s['ayat'] if a['no'] in ayat]
    if len(pilih) != len(ayat):
        sys.exit('GAGAL ayat %s' % kunci)
    dalil[kunci] = {
        'jenis': 'quran', 'rujukan': rujukan, 'surah': s['nama'],
        'ringkas': ringkas,
        'ayat': [{'no': a['no'], 'arab': a['arab'], 'latin': a['latin'], 'arti': a['indo']} for a in pilih],
        'tautan': 'https://quran.kemenag.go.id/quran/per-ayat/surah/%d?from=%d&to=%d' % (surah, ayat[0], ayat[-1]),
        'tautan2': 'https://equran.id/surat/%d' % surah,
        'sorot': sorot,
    }

# ─────────────────────────────────────────────────────────────────
# 2. BACAAN — dipotong dari teks dalil di atas, bukan ditulis ulang.
# ─────────────────────────────────────────────────────────────────

BACAAN = [
    ('takbir', 'Takbir', 'abudawud-730',
     ('الله اكبر', 'الله اكبر'), ('allahu akbaru', 'allahu akbaru'),
     'Allah Maha Besar.',
     'Diucapkan setiap kali berpindah gerakan. Yang pertama, saat mengangkat tangan di awal salat, disebut takbiratul ihram.'),

    ('iftitah', 'Doa iftitah', 'bukhari-744',
     ('اللهم باعد', 'والبرد'), ('allahumma baid', 'waalbaradi'),
     'Ya Allah, jauhkanlah aku dari dosa-dosaku sebagaimana Engkau menjauhkan antara timur dan barat. Ya Allah, bersihkanlah aku dari dosa-dosaku sebagaimana kain putih dibersihkan dari kotoran. Ya Allah, cucilah dosa-dosaku dengan air, salju, dan es.',
     'Dibaca pelan sesudah takbiratul ihram, sebelum Al-Fatihah. Ada beberapa lafaz iftitah yang sama-sama sahih; ini salah satunya.'),

    ('tasbih-rukuk', 'Bacaan rukuk', 'muslim-772',
     ('سبحان ربي العظيم', 'سبحان ربي العظيم'), ('subhana rabbiya alazhimi', 'subhana rabbiya alazhimi'),
     'Maha Suci Tuhanku Yang Maha Agung.',
     'Diulang tiga kali atau lebih. Sebagian riwayat menambahkan "wa bihamdih".'),

    ('sami', 'Bacaan bangkit dari rukuk', 'muslim-772',
     ('سمع الله لمن حمده', 'سمع الله لمن حمده'), ('samia allahu liman hamidahu', 'samia allahu liman hamidahu'),
     'Allah mendengar orang yang memuji-Nya.',
     'Diucapkan sambil bangkit dari rukuk.'),

    ('rabbana', 'Bacaan i\'tidal', 'muslim-772',
     ('ربنا لك الحمد', 'ربنا لك الحمد'), ('rabbana laka alhamdu', 'rabbana laka alhamdu'),
     'Ya Tuhan kami, bagi-Mu segala puji.',
     'Dibaca setelah berdiri tegak. Sebagian riwayat memakai lafaz "Allahumma rabbana lakal hamd" atau "wa lakal hamd" — semuanya sahih.'),

    ('tasbih-sujud', 'Bacaan sujud', 'muslim-772',
     ('سبحان ربي الاعلى', 'سبحان ربي الاعلى'), ('subhana rabbiya alala', 'subhana rabbiya alala'),
     'Maha Suci Tuhanku Yang Maha Tinggi.',
     'Diulang tiga kali atau lebih.'),

    ('antara-sujud', 'Doa duduk antara dua sujud', 'abudawud-850',
     ('اللهم اغفر لي', 'وارزقني'), ('allahumma aghfir li', 'warzuqni'),
     'Ya Allah, ampunilah aku, rahmatilah aku, berilah aku kesehatan, tunjukilah aku, dan berikanlah rezeki kepadaku.',
     'Dibaca pada duduk di antara dua sujud.'),

    ('tasyahud', 'Tasyahud', 'bukhari-831',
     ('التحيات لله', 'عبده ورسوله'), ('attahiyyatu lillahi', 'abduhu warasuluhu'),
     'Segala penghormatan, salawat, dan kebaikan hanya milik Allah. Semoga keselamatan, rahmat Allah, dan berkah-Nya tercurah kepadamu, wahai Nabi. Semoga keselamatan tercurah kepada kami dan kepada hamba-hamba Allah yang saleh. Aku bersaksi bahwa tidak ada tuhan yang berhak disembah selain Allah, dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya.',
     'Dibaca pada duduk tasyahud awal dan akhir.'),

    ('salawat', 'Salawat', 'bukhari-3370',
     ('اللهم صل على محمد', 'انك حميد مجيد'), ('allahumma shalli ala muhammadin', 'innaka hamidun majidun'),
     'Ya Allah, limpahkanlah rahmat kepada Muhammad dan keluarga Muhammad, sebagaimana Engkau melimpahkan rahmat kepada Ibrahim dan keluarga Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia. Ya Allah, berkahilah Muhammad dan keluarga Muhammad, sebagaimana Engkau memberkahi Ibrahim dan keluarga Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
     'Dibaca pada duduk tasyahud akhir, sesudah tasyahud.'),

    ('lindung', 'Doa perlindungan sebelum salam', 'muslim-588',
     ('اللهم اني اعوذ بك', 'المسيح الدجال'), ('allahumma inni audzu bika', 'almasihi addajjali'),
     'Ya Allah, aku berlindung kepada-Mu dari siksa neraka Jahanam, dari siksa kubur, dari fitnah kehidupan dan kematian, dan dari kejahatan fitnah Al-Masih Ad-Dajjal.',
     'Dibaca sesudah salawat, sebelum salam.'),

    ('salam', 'Salam', 'abudawud-996',
     ('السلام عليكم ورحمة الله', 'السلام عليكم ورحمة الله'), ('assalamu alaykum warahmahu allahi', 'assalamu alaykum warahmahu allahi'),
     'Semoga keselamatan dan rahmat Allah tercurah kepada kalian.',
     'Diucapkan sambil menoleh ke kanan, lalu ke kiri.'),

    ('istighfar', 'Istighfar dan dzikir sesudah salam', 'muslim-591',
     ('اللهم انت السلام', 'ذا الجلال والاكرام'), ('allahumma anta assalamu', 'dza aljalali waalikrami'),
     'Ya Allah, Engkaulah As-Salam (sumber keselamatan), dan dari-Mu keselamatan. Maha Berkah Engkau, wahai Pemilik Keagungan dan Kemuliaan.',
     'Dibaca sesudah salam, didahului istighfar tiga kali.'),
]

bacaan = {}
for kunci, judul, sumber, (m1, a1), (m2, a2), arti, catatan in BACAAN:
    h = H[sumber]
    bacaan[kunci] = {
        'judul': judul,
        'arab': iris(h['arab'], m1, a1, kunci + '/arab'),
        'latin': iris((h['latin'] or '').replace(' Selengkapnya', ''), m2, a2, kunci + '/latin'),
        'arti': arti, 'catatan': catatan, 'dalil': [sumber],
    }

# Al-Fatihah dan Al-Ikhlas diambil utuh dari data Al-Qur'an.
for kunci, judul, dkey, catatan in [
        ('fatihah', 'Al-Fatihah', 'qs1',
         'Wajib dibaca pada setiap rakaat. Basmalah dihitung sebagai ayat pertama menurut mazhab Syafi\'i, dan dibaca pelan atau keras sesuai pendapat masing-masing.'),
        ('ikhlas', 'Surah pendek (contoh: Al-Ikhlas)', 'qs112',
         'Sesudah Al-Fatihah pada rakaat pertama dan kedua, dibaca surah atau ayat lain yang dihafal. Al-Ikhlas dipakai di sini sebagai contoh karena pendek dan mudah.')]:
    bacaan[kunci] = {
        'judul': judul,
        'ayat': dalil[dkey]['ayat'],
        'catatan': catatan, 'dalil': [dkey],
    }

# ─────────────────────────────────────────────────────────────────
# 3. Tulis berkas
# ─────────────────────────────────────────────────────────────────

TGL = datetime.date.today().strftime('%d %B %Y').replace('August', 'Agustus')

KEPALA_DALIL = '''/*
 * DALIL — seluruh sumber yang dipakai situs ini.
 *
 * Berkas ini DIHASILKAN sekali saat kurasi, bukan ditulis tangan dan bukan
 * diambil ulang setiap kali halaman dibuka. Tata cara salat sudah baku sejak
 * dicontohkan Nabi, jadi sumbernya cukup dikumpulkan sekali lalu dipanggil
 * berulang-ulang lewat lookup biasa — tanpa mesin pencari, tanpa AI.
 *
 * Teks Arab, terjemahan, dan derajat DISALIN APA ADANYA dari:
 *   - hadits.id      untuk hadits (teks Arab, terjemahan, dan derajatnya)
 *   - equran.id      untuk Al-Qur'an (mushaf dan terjemahan Kemenag)
 * Setiap entri menyimpan tautan ke halaman aslinya supaya pembaca bisa
 * memeriksa sendiri, tidak perlu percaya pada situs ini.
 * Dicocokkan pada %s.
 *
 * ATURAN YANG TIDAK BOLEH DILANGGAR
 * 1. Teks dalil tidak pernah dipenggal. Yang ditampilkan selalu utuh; bagian
 *    yang sedang dibahas cukup disorot lewat `sorot`, sisanya tetap terbaca.
 * 2. Derajat hadits ditulis apa adanya, termasuk ketika sebuah riwayat
 *    dinilai lemah — lihat abudawud-838. Situs ini tidak menyembunyikan
 *    penilaian yang kurang menguntungkan salah satu pendapat.
 * 3. Tidak ada aturan baru. Situs ini hanya menyusun dan mengutip.
 *
 * ─────────────────────────────────────────────────────────────────
 * CATATAN UNTUK PEMILIK SITUS
 * Ini menyangkut ibadah. Pencocokan dengan sumber daring memastikan nomor
 * dan teksnya benar, tapi TIDAK menggantikan pemeriksaan seorang ustadz yang
 * kompeten — terutama untuk penilaian derajat hadits, yang antar ulama pun
 * bisa berbeda. Kode bisa diuji; keabsahan kutipan tidak.
 * ─────────────────────────────────────────────────────────────────
 */

(function (root) {
  'use strict';

  root.DALIL = ''' % TGL

KEPALA_BACAAN = '''/*
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

  root.BACAAN = '''

TUJUAN.mkdir(exist_ok=True)
(TUJUAN / 'dalil.js').write_text(KEPALA_DALIL + js(dalil) + ';\n})(window);\n', encoding='utf-8')
(TUJUAN / 'bacaan.js').write_text(KEPALA_BACAAN + js(bacaan) + ';\n})(window);\n', encoding='utf-8')

print('dalil:', len(dalil), '| bacaan:', len(bacaan))
for k, v in bacaan.items():
    if 'arab' in v:
        print('  %-14s %s | %s' % (k, v['arab'][:46], v['latin'][:40]))
