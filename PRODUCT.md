# Product

<!-- impeccable:product-schema 1 -->

Judul bagian sengaja dibiarkan dalam bahasa Inggris karena dibaca perkakas;
isinya bahasa Indonesia, sama seperti seluruh repo ini.

## Platform

web

## Users

**Pengguna utama: muslim di Indonesia yang ragu apakah salatnya sudah benar —
terutama mualaf**, dan siapa pun yang tidak pernah belajar salat secara formal.

Situasinya khas: dia melihat orang di sebelahnya mengangkat tangan sampai telinga
sementara dia sampai bahu; orang lain qunut, dia tidak. Dari situ muncul dugaan
bahwa salatnya selama ini salah. Sering kali dia **sungkan bertanya langsung**,
karena takut terlihat tidak tahu hal yang dianggap semua orang sudah tahu.

Pekerjaan yang sedang dia lakukan: memastikan gerakan dan bacaannya benar, dan
memahami kenapa orang lain melakukannya berbeda — tanpa harus menjadi penuntut
ilmu dulu.

## Product Purpose

Menunjukkan tiap gerakan salat **diperagakan**, lengkap dengan bacaannya dan
dalilnya yang bisa ditelusuri sampai ke sumber, sehingga perbedaan yang sah
berhenti menjadi sumber keraguan.

Berhasil kalau seseorang yang tadinya ragu bisa salat dengan tenang, tahu bahwa
pilihannya berdalil, dan tidak lagi menganggap gerakan orang lain sebagai
kesalahan. Berhasil juga kalau ada yang menemukan kekeliruan di situs ini dan
bisa menunjukkannya dengan tepat.

## Positioning

Yang tidak bisa ditiru begitu saja oleh situs sejenis:

- **Mengganti rujukan mazhab mengubah peragaan 3D sekaligus dalil yang
  ditampilkan** — bukan cuma teks yang berganti, tapi sudut badan yang diperagakan.
- **Kutipan tidak pernah dipenggal.** Teks Arab dan terjemahan tampil utuh; bagian
  yang dibahas hanya disorot.
- **Derajat hadits ditulis apa adanya**, termasuk ketika riwayat yang mendukung
  pendapat mayoritas dinilai lemah.
- **Seluruh korpus dikurasi sekali lalu disajikan lokal.** Saat halaman dibuka
  tidak ada mesin pencari, tidak ada AI, dan tidak ada satu pun permintaan ke luar.
- **Lafaz bacaan diiris dari teks hadits sumbernya oleh skrip**, bukan diketik
  ulang — kekeliruan penanda membuat skrip gagal, bukan menghasilkan kutipan palsu.

## Operating Context

- Dibaca **di ponsel**, sering menjelang atau sesudah waktu salat, kadang di masjid.
- Dipakai diam-diam oleh orang yang malu bertanya — jadi tidak boleh ada pendaftaran,
  formulir, atau apa pun yang membuat dirinya terekspos.
- Juga dipakai untuk memeriksa satu perbedaan yang baru saja dilihat di jamaah,
  jadi harus bisa langsung menuju satu gerakan tertentu.
- Alamat halaman menyimpan pilihan (`?g=rukuk&m=hanafi`) supaya bisa dibagikan di
  grup keluarga atau pengajian, dan `&langkah=N` menunjuk satu sikap tertentu saat
  melaporkan sudut badan yang keliru.

## Capabilities and Constraints

**Yang sudah ada**

- 13 gerakan × 4 mazhab (Syafi'i baku, Hanafi, Maliki, Hambali), 42 dalil
  (8 Al-Qur'an, 34 hadits), 14 bacaan.
- Rangkaian salat utuh untuk lima waktu, termasuk qunut yang muncul/hilang dan
  cara duduk terakhir yang berbeda menurut mazhab.
- Halaman persiapan, dzikir, rujukan, dan halaman uji data.

**Batasan teknis yang harus dijaga**

- Situs **statis**: HTML, CSS, dan JavaScript biasa. Tanpa framework, tanpa
  package manager, tanpa proses build. Dijalankan cukup dengan server statis.
- **Nol permintaan ke luar saat halaman dibuka.** three.js ikut disimpan di repo;
  huruf disimpan sendiri, bukan dari Google Fonts.
- Semua diproses di peramban pembaca. Tidak ada yang disimpan, tidak ada yang
  dikirim, tidak ada analytics — dan itu tidak akan ditambahkan.
- Data dikurasi sekali lewat `docs/kurasi-dalil.py` dari hadits.id dan equran.id;
  teks tidak boleh diketik ulang di HTML.
- Harus tetap berguna tanpa WebGL, dan menghormati `prefers-reduced-motion`.

**Batasan isi yang tidak boleh dilanggar**

- Situs ini **menyusun dan mengutip, tidak berfatwa**. Tidak menambah, mengurangi,
  atau mengubah satu pun aturan syariat.
- Perbedaan yang berdalil ditampilkan sejajar; situs tidak memilihkan mana yang
  paling benar.
- Yang ditulis adalah **pendapat masyhur** tiap mazhab, bukan kesimpulan yang
  ditarik sendiri dari hadits.

**Batas cakupan produk**

- **Salat saja, digali makin dalam.** Perluasan yang wajar ke depan: salat sunnah,
  jamak dan qashar, salat sambil duduk atau berbaring, dan sujud sahwi.
- **Bukan** payung ibadah dasar. Puasa, zakat, dan haji di luar cakupan; kalau suatu
  saat dikerjakan, tempatnya proyek lain.
- Thaharah tetap seperlunya sebagai syarat sah (halaman Persiapan), tidak digali
  sedetail salatnya.

**Sudah dijanjikan, belum dikerjakan**

- **Kekhususan salat perempuan adalah komitmen produk**, bukan tambahan opsional:
  cara duduk, merapatkan anggota badan, dan aurat — dengan kurasi dalil seketat
  yang sekarang, dan peraga tersendiri. Peraga yang ada sekarang laki-laki, dan
  selama kekhususan itu belum dikerjakan, keterbatasan tersebut harus dinyatakan
  terus terang di situs supaya tidak menyesatkan.

**Belum diputuskan**

- Hosting dan domain. Untuk sekarang repo publik saja, tanpa GitHub Pages.
- Audio contoh bacaan. Sengaja di luar versi pertama; belum diputuskan akan ada.

## Brand Commitments

- Nama dan penempatan: **"Salat by Flavida"** — sub-merek, bukan merek berdiri sendiri.
- Memakai **design system Flavida** (Bricolage Grotesque + DM Sans, palet flame/cream,
  token di `css/tokens.css`). Kaki halaman: *Made with 🔥 in Indonesia*.
- Berbagi pola dengan proyek saudaranya, `arnantoakbar/waris` — statis, tanpa
  dependency, dalil ditampilkan utuh, halaman rujukan terbuka.
- **Suara**: bahasa Indonesia sehari-hari, menyapa pembaca dengan "kamu". Langsung,
  hangat, tidak menggurui, tidak memakai nada ceramah. Istilah fikih (iftirasy,
  tawarruk, i'tidal) selalu dijelaskan saat pertama muncul.
- **Terbuka dan mengundang koreksi.** Kode dan dalilnya bisa diperiksa siapa pun;
  ajakan melaporkan kekeliruan adalah bagian dari mereknya, bukan basa-basi.

## Evidence on Hand

**Ada dan bisa dipakai**

- 42 dalil terkurasi di `data/dalil.js`, masing-masing dengan tautan ke sumbernya;
  hasil ambilan mentahnya tersimpan di `docs/dalil-mentah.json`.
- Skrip kurasi (`docs/kurasi-dalil.py`, `docs/ambil-hadits.py`) dan skrip tangkapan
  layar (`docs/tangkap-layar.sh`) — cara kerjanya bisa diverifikasi ulang siapa pun.
- Tangkapan layar di `docs/gambar/`.
- Repo publik: `github.com/arnantoakbar/salat` (kode berlisensi MIT).
- Konteks hukum Indonesia: UU 18/2019 tentang Pesantren, bagian Menimbang huruf a,
  lewat Pasal.id — hanya sebagai konteks kebebasan beribadah, bukan dasar tata cara.

**Tidak ada — dan tidak boleh dikarang**

- **Belum ada ustadz, lembaga, atau organisasi mana pun yang meninjau isi situs ini.**
  Situs tidak boleh menyiratkan restu, afiliasi, atau persetujuan siapa pun. Kerjaan
  berikutnya dilarang menambahkan nama peninjau, logo lembaga, kutipan pendukung,
  atau klaim "diperiksa oleh" sebelum hal itu benar-benar terjadi.
- Tidak ada testimoni, jumlah pengguna, atau angka jangkauan — situs sengaja tanpa
  analytics, jadi data seperti itu memang tidak ada.
- Tidak ada bukti hasil belajar atau klaim efektivitas.

## Product Principles

1. **Menyusun dan mengutip, tidak berfatwa.** Setiap kalimat yang terdengar seperti
   ketetapan harus punya sumber, atau tidak ditulis.
2. **Perbedaan ditampilkan, bukan dihakimi.** Varian yang berdalil berdiri sejajar;
   pembaca memilih, situs tidak memilihkan.
3. **Jujur pada yang merugikan.** Derajat hadits dan kutipan tampil apa adanya,
   termasuk ketika melemahkan pendapat yang populer.
4. **Bisa diperiksa sampai ke sumber.** Tiap klaim punya tautan; tiap teks punya
   skrip yang mengambilnya. Pembaca tidak diminta percaya.
5. **Tidak ada yang keluar dari peramban pembaca.** Privasi di sini bukan fitur,
   melainkan syarat — penggunanya orang yang sungkan terlihat sedang belajar.

## Accessibility & Inclusion

- **Banyak penggunanya belum bisa membaca huruf Arab.** Setiap bacaan wajib punya
  tulisan latin dan artinya, bukan hanya teks Arab.
- **Penggunanya sungkan terlihat sedang belajar.** Tanpa akun, tanpa formulir, tanpa
  jejak — dan nada tulisan tidak boleh membuat pembaca merasa bodoh.
- **Ponsel adalah perangkat utama.** Rancang dari layar sempit dulu.
- Harus tetap berguna tanpa WebGL, dan menghormati `prefers-reduced-motion`.
- Kekhususan salat perempuan (lihat Capabilities and Constraints) adalah komitmen
  inklusi, bukan penambahan opsional.
