---
name: Salat by Flavida
description: Naskah yang dibuka utuh — kertas hangat, sketsa grafit, dan dalil yang tak pernah dipenggal.
colors:
  flame: "#E8391D"
  orange: "#F5760A"
  amber: "#F5A623"
  ember: "#A0341A"
  charcoal: "#111111"
  mid-grey: "#555555"
  light-grey: "#999999"
  cream: "#FFF8F0"
  parchment: "#FFF0E0"
  surface-card: "#FFFFFF"
  canopy-green: "#1B5E3B"
  derajat-lemah: "#8A5A00"
  grafit: "#4A4550"
  grafit-garis: "#3A3640"
  kertas-sketsa: "#FFFDF8"
  kertas-sketsa-dasar: "#FFF8EE"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Arial Black, sans-serif"
    fontSize: "clamp(42px, 7vw, 84px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque, Arial Black, sans-serif"
    fontSize: "clamp(32px, 4.5vw, 52px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bricolage Grotesque, Arial Black, sans-serif"
    fontSize: "clamp(18px, 2.5vw, 24px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "DM Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
  label:
    fontFamily: "DM Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.12em"
  arabic:
    fontFamily: "Times New Roman, Traditional Arabic, serif"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 2.1
    letterSpacing: "normal"
  arabic-dalil:
    fontFamily: "Times New Roman, Traditional Arabic, serif"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: 2
    letterSpacing: "normal"
rounded:
  xs: "6px"
  sm: "8px"
  input: "12px"
  icon: "14px"
  card: "20px"
  cta: "28px"
  pill: "100px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "7": "28px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
  "24": "96px"
components:
  button-primary:
    backgroundColor: "{colors.flame}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
  button-dark:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  card:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.card}"
    padding: "24px"
  badge:
    backgroundColor: "rgba(232, 57, 29, 0.06)"
    textColor: "{colors.ember}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  badge-sahih:
    backgroundColor: "rgba(27, 94, 59, 0.1)"
    textColor: "{colors.canopy-green}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  badge-lemah:
    backgroundColor: "rgba(245, 166, 35, 0.16)"
    textColor: "{colors.derajat-lemah}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  chip-gerakan:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.mid-grey}"
    rounded: "{rounded.pill}"
    padding: "0 16px 0 8px"
    height: "42px"
  chip-gerakan-active:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    height: "42px"
  mazhab-option:
    backgroundColor: "transparent"
    textColor: "{colors.mid-grey}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "40px"
  mazhab-option-selected:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    height: "40px"
  bacaan-card:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.card}"
    padding: "20px"
  dalil:
    backgroundColor: "transparent"
    textColor: "{colors.mid-grey}"
    typography: "{typography.body}"
    padding: "0 0 0 16px"
  panggung:
    backgroundColor: "{colors.kertas-sketsa}"
    rounded: "{rounded.cta}"
---

# Design System: Salat by Flavida

Judul bagian sengaja dalam bahasa Inggris karena dibaca perkakas; isinya bahasa
Indonesia, sama seperti seluruh repo ini.

## Overview

**Creative North Star: "Naskah yang Dibuka Utuh"**

Yang jadi pahlawan di situs ini bukan antarmukanya, melainkan **teksnya**. Dalil
tampil lengkap — teks Arab beserta sanadnya, terjemahan penuh, derajatnya apa
adanya — dan peragaan 3D-nya melayani teks itu, bukan sebaliknya. Karena itu
setiap keputusan visual di sini diukur dengan satu pertanyaan: apakah ini membuat
naskahnya lebih mudah dibaca dan diperiksa, atau justru menghalanginya.

Dari situ turun bahan-bahannya. Latar krem hangat seperti kertas, bukan putih
layar. Model manusianya digambar dengan **grafit tembus pandang** yang garis
tepinya bergetar seperti coretan pensil, jadi ia terbaca sebagai sketsa penjelas
di halaman yang sama dengan teksnya — bukan sebagai karakter 3D yang bersaing
perhatian. Amber dipakai persis seperti stabilo: menandai ruas kalimat yang sedang
dirujuk, sementara sisanya diredupkan tapi tetap terbaca. Tidak ada yang
disembunyikan supaya kartunya rapi.

Wataknya **hangat dan rendah hati**. Permukaan diam saat istirahat, sudutnya
lembut, bayangannya tipis dan hanya muncul sebagai jawaban atas sentuhan.
Antarmukanya tidak pernah menuntut perhatian — ia mendampingi orang yang sedang
sungkan belajar, bukan memimpin dia. Dua rupa yang **ditolak secara sadar**:
estetika poster dakwah (hijau-emas, bingkai kaligrafi berukir, foto masjid stok,
ayat ditempel di atas gradien) yang justru membuat pemula merasa ini bukan untuk
dia; dan dashboard SaaS generik (abu dingin, biru, Inter, kartu tanpa pendirian)
yang membuat ibadah terasa seperti perkakas kantor.

**Key Characteristics:**
- Kertas hangat dan grafit, bukan layar putih dan warna solid
- Kutipan tampil utuh; penekanan lewat sorotan, tidak pernah lewat pemotongan
- Rata saat istirahat — kedalaman dibuat lewat lapisan warna, bukan bayangan
- Aksen merah konsisten tapi terkendali; teks yang memimpin halaman
- Setiap baris Arab selalu ditemani latin dan artinya

## Colors

Palet Delonix regia milik Flavida — krem hangat sampai merah nyala — dipinjam
utuh, lalu ditambah satu keluarga khas proyek ini: grafit dan kertas sketsa untuk
panggung 3D-nya.

### Primary
- **Flame Red** (#E8391D): ajakan utama, tautan, keadaan aktif, dan ikon aksen.
  Warna yang membuat halaman terasa hidup, dipakai konsisten tapi tidak pernah
  menguasai permukaan besar.
- **Fire Orange** (#F5760A): hanya sebagai keadaan hover tombol utama dan titik
  tengah gradien. Tidak pernah berdiri sendiri sebagai warna komponen.

### Secondary
- **Amber Gold** (#F5A623): **warna stabilo.** Tugas utamanya menandai ruas kalimat
  yang sedang dirujuk di dalam dalil, dan menjadi garis tepi kiri setiap kutipan.
  Juga menandai derajat hadits yang lemah. Amber di situs ini selalu berarti
  "perhatikan bagian ini" — tidak pernah dekorasi.
- **Ember** (#A0341A): tinta wordmark dan label rujukan. Merah yang sudah tenang,
  dipakai untuk teks kecil yang perlu berwarna tapi tidak boleh berteriak.

### Tertiary
- **Canopy Green** (#1B5E3B): satu-satunya tugasnya menandai derajat hadits sahih.
  Bukan warna merek; ia lencana kebenaran sumber, jadi tidak boleh dipakai untuk
  hal lain.

### Neutral
- **Deep Charcoal** (#111111): teks utama, kaki halaman, spanduk ajakan gelap, dan
  **keadaan terpilih** pada chip gerakan dan pemilih mazhab.
- **Mid Grey** (#555555): teks isi dan label sekunder.
- **Light Grey** (#999999): keterangan, catatan kaki, teks penjelas kecil.
- **Warm Cream** (#FFF8F0): latar utama halaman, dan warna teks di atas permukaan gelap.
- **Parchment** (#FFF0E0): latar bagian sekunder, kotak "kenapa berbeda?", dan
  pembungkus pemilih mazhab.
- **Surface Card** (#FFFFFF): kartu, akordeon, dan chip yang belum terpilih — satu
  tingkat di atas parchment.
- **Derajat Lemah** (#8A5A00): teks pada lencana hadits berderajat lemah.

### Panggung 3D
- **Grafit** (#4A4550): warna model manusia. Digambar tembus pandang dengan garis
  tepi yang muncul dari sudut pandang, jadi anggota badan di baliknya ikut terlihat.
- **Grafit Garis** (#3A3640): kontur model, sedikit lebih pekat dari isinya.
- **Kertas Sketsa** (#FFFDF8 ke #FFF8EE): gradien latar panggung, ditumpuk noise
  halus supaya terbaca sebagai kertas dan bukan bidang kosong.

### Named Rules

**Aturan Stabilo.** Amber hanya boleh menandai ruas teks yang sedang dirujuk.
Kalau amber muncul tanpa ada sumber yang sedang ditunjuk, itu dekorasi dan harus
dicabut.

**Aturan Dua Belas Persen.** Flame menutup paling banyak ~12% permukaan layar mana
pun, mengikuti proporsi Flavida (60% krem / 20% charcoal / 12% flame). Naskahnya
yang memimpin halaman, bukan aksennya.

**Aturan Hitam untuk Pilihan.** Keadaan terpilih dinyatakan dengan Deep Charcoal
penuh, bukan dengan merah. Merah menandai apa yang bisa dilakukan; hitam menandai
di mana kamu berada sekarang.

## Typography

**Display Font:** Bricolage Grotesque (fallback Arial Black, sans-serif)
**Body Font:** DM Sans (fallback Helvetica Neue, Arial, sans-serif)
**Arabic Font:** Times New Roman / Traditional Arabic, serif — dipilih karena
tersedia di hampir semua perangkat tanpa unduhan tambahan, sejalan dengan janji
situs untuk tidak memanggil apa pun dari luar.

**Character:** Bricolage Grotesque yang tebal dan rapat memberi judul suara yang
tegas dan sedikit editorial; DM Sans yang lapang membuat isinya enak dibaca
panjang-panjang. Pasangannya sengaja tidak berkesan religius — kesan seriusnya
datang dari kerapian, bukan dari ornamen.

Kedua huruf **disimpan sendiri di `assets/font/`** dan dimuat lewat `css/font.css`;
memanggil Google Fonts akan membocorkan alamat IP pembaca dan melanggar janji
situs. Hanya subset latin dan latin-ext yang ikut.

### Hierarchy
- **Display** (800, clamp 42–84px, lh 1.05, ls −0.04em): judul hero, satu per halaman.
- **Headline** (800, clamp 32–52px, lh 1.1, ls −0.025em): judul bagian.
- **Title** (700, clamp 18–24px, lh 1.15): judul kartu dan blok.
- **Body** (400, 16px, lh 1.7): teks isi. Lebar baris dibatasi 60–64ch pada teks
  panjang.
- **Label** (700, 11px, ls 0.12em, HURUF BESAR): overline, lencana, penanda tahap.
- **Arabic** (26px, lh 2.1, rtl): bacaan salat pada kartu bacaan.
- **Arabic Dalil** (21px, lh 2, rtl): teks Arab di dalam kutipan dalil, sedikit
  lebih kecil karena memuat sanad yang panjang.

### Named Rules

**Aturan Latin Selalu Menemani.** Tidak ada baris Arab yang berdiri sendiri.
Setiap teks Arab wajib punya tulisan latin dan artinya di bawahnya — banyak
penggunanya belum bisa membaca huruf Arab, dan menampilkan Arab saja akan
memulangkan mereka dengan tangan kosong.

**Aturan Arab Tidak Pernah Dikecilkan.** Teks Arab tidak pernah turun di bawah
21px dan tinggi barisnya tidak pernah di bawah 2. Kalau ruang kurang, yang
menyusut adalah elemen lain.

**Aturan Istilah Dijelaskan.** Istilah fikih (iftirasy, tawarruk, i'tidal) diberi
penjelasan singkat saat pertama muncul di sebuah halaman, bukan diasumsikan.

## Layout

Wadah tunggal selebar **1120px** dengan padding 20px di ponsel dan 32px mulai
768px; varian sempit **720px** untuk halaman yang isinya teks panjang (Persiapan,
Dzikir, Rujukan). Jarak antar bagian 64px di ponsel, 96px mulai 768px.

Ritme jaraknya kelipatan **4px** (4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96).

Tata letak halaman gerakan adalah **dua kolom asimetris** mulai 1024px —
panggung 3D 5 bagian di kiri (menempel saat digulir, `top: 76px`), teks dan dalil
4 bagian di kanan — dan menumpuk jadi satu kolom di bawah itu. Panggung selalu
lebih dulu daripada teksnya, karena yang dicari pengunjung pertama-tama adalah
gerakannya.

Titik pindah yang dipakai: **420px** (chip menyempit), **640px** (grid kartu jadi
tiga kolom, rasio panggung melebar), **768px** (menu hamburger berubah jadi baris,
padding membesar), **860px** dan **940px** (blok batasan dan blok kode jadi dua
kolom), **1024px** (dua kolom halaman gerakan).

Barisan chip gerakan sengaja **digulir sampai tepi layar di ponsel** lewat margin
negatif, supaya jelas masih ada isi di sebelah kanan; mulai 768px ia kembali
sejajar dengan kolom teks.

Rasio panggung 3D berubah menurut lebar: 112% (ponsel, jangkung), 88% (≥640px),
106% (≥1024px). Rasio dijaga lewat padding sehingga tingginya sudah stabil
sebelum JavaScript jalan — tidak ada lompatan tata letak saat kanvas muncul.

## Elevation & Depth

**Rata sampai disentuh.** Permukaan tidak punya bayangan saat istirahat. Kedalaman
dibuat dari **lapisan warna**: krem (#FFF8F0) sebagai dasar halaman, parchment
(#FFF0E0) untuk bagian sekunder, putih (#FFFFFF) untuk kartu — tiga tingkat yang
dibedakan warna, bukan oleh jarak semu.

Bayangan hanya muncul sebagai **jawaban atas perbuatan pengguna**: kartu terangkat
4px saat hover, tombol utama terangkat 2px dan menyala, chip terpilih mendapat
bayangan pendek. Tidak ada bayangan permanen di mana pun.

### Shadow Vocabulary
- **Kartu hover** (`box-shadow: 0 4px 32px rgba(232, 57, 29, 0.08)`): angkatan
  lembut berwarna merah samar, dipasangkan dengan `translateY(-4px)`.
- **Tombol utama hover** (`box-shadow: 0 8px 24px rgba(232, 57, 29, 0.3)`): nyala
  hangat di bawah tombol, dipasangkan dengan `translateY(-2px)`.
- **Pilihan aktif** (`box-shadow: 0 2px 10px rgba(17, 17, 17, 0.18)`): bayangan
  pendek netral untuk tombol mazhab yang sedang dipilih.
- **Panggung 3D** (`box-shadow: 0 4px 32px rgba(232, 57, 29, 0.08)`): satu-satunya
  bayangan tetap di situs, karena panggung adalah lembar kertas yang diletakkan
  di atas halaman.

Bayangan situs ini **selalu berwarna merah samar**, bukan hitam netral — supaya
kedalamannya tetap terasa hangat dan menyatu dengan kertasnya.

### Named Rules

**Aturan Rata Sampai Disentuh.** Kalau sebuah permukaan punya bayangan saat
istirahat, itu keliru — kecuali panggung 3D, yang memang lembar terpisah.

## Shapes

Bahasa bentuknya lembut dan konsisten: **pil untuk yang bisa dipilih, kartu 20px
untuk yang menampung.**

- **Pil (100px)**: tombol, lencana, chip gerakan, tombol mazhab, dan pembungkus
  pemilih mazhab. Apa pun yang bisa ditekan atau menyatakan status berbentuk pil.
- **Kartu (20px)**: kartu, kartu bacaan, akordeon, kotak "kenapa berbeda?".
- **Spanduk (28px)**: panggung 3D dan spanduk ajakan gelap — radius paling besar
  untuk bidang paling besar.
- **Ikon (14px)**: kotak ikon 48×48 di kartu.
- **Isian (12px)**, **kecil (8px)**, **kecil sekali (6px)**: elemen kecil dan
  cincin fokus.
- **Bulat penuh (50%)**: nomor urut gerakan dan tombol lingkaran di panggung.

Garis tepinya **selalu 1px merah samar** (`rgba(232, 57, 29, 0.15)`), tidak pernah
abu-abu netral. Ini yang membuat kartu putih terasa duduk di atas kertas hangat
alih-alih mengambang di atas layar.

Satu bentuk khas yang perlu dijaga: **garis tepi kiri amber setebal 3px** pada
setiap kutipan dalil. Itu penanda "ini kutipan, bukan tulisan kami" dan tidak
boleh dipakai untuk hal lain.

### Named Rules

**Aturan Pil dan Kartu.** Bisa ditekan atau menyatakan status → pil. Menampung isi
→ kartu 20px. Tidak ada bentuk ketiga tanpa alasan yang bisa dijelaskan.

## Components

### Buttons
- **Shape:** pil penuh (100px), tinggi 48px, padding mendatar 28px; varian kecil
  44px dengan padding 20px.
- **Primary:** Flame Red dengan teks krem. Hover berpindah ke Fire Orange,
  terangkat 2px, dan mendapat nyala merah.
- **Dark:** Deep Charcoal dengan teks krem — dipakai untuk ajakan sekunder yang
  tetap harus terlihat kuat, misalnya tautan ke GitHub. Hover berubah jadi Flame.
- **Ghost:** transparan dengan garis tepi merah samar. Hover mengubah teks dan
  garis tepinya jadi Flame.
- **Fokus:** garis luar 2px Flame dengan jarak 3px — sama untuk semua elemen.
- Tombol nonaktif turun ke opacity 0.45 dan kehilangan angkatan serta bayangannya.

### Cards / Containers
- **Corner Style:** 20px.
- **Background:** putih di atas krem atau parchment.
- **Border:** 1px merah samar.
- **Shadow Strategy:** tidak ada saat istirahat; lihat Elevation & Depth.
- **Internal Padding:** 24px di ponsel, 32px mulai 768px.
- Varian `card-hover` menambahkan **garis gradien 3px** (Flame → Amber) di tepi
  atas yang hanya muncul saat hover — tanda kecil bahwa kartu itu bisa diketuk.

### Chips
- **Chip gerakan:** pil putih bergaris merah samar, tinggi 42px, dengan lingkaran
  nomor 26px berlatar merah samar di sebelah kiri. Terpilih → seluruh chip menjadi
  Deep Charcoal, dan lingkaran nomornya berubah jadi amber di atas latar transparan.
- **Lencana:** pil kecil huruf besar 11px. Tiga peran: merah samar/Ember untuk
  status umum (hukum gerakan), hijau untuk derajat sahih, amber untuk derajat lemah.

### Navigation
- Bar menempel di atas dengan latar krem 92% dan `backdrop-filter: blur(12px)`,
  garis bawah merah samar, tinggi minimal 60px.
- Wordmark memakai tinta Ember dengan sub-label "by Flavida" abu terang di
  sebelahnya, dipisah jarak 7px.
- Tautan 13px semibold abu; hover dan halaman aktif menjadi Flame.
- Di bawah 768px seluruh menu pindah ke balik tombol hamburger 44×44, membuka
  sebagai panel penuh dengan tiap baris setinggi 48px.

### Panggung 3D (signature)
Lembar kertas tempat model diperagakan: radius 28px, garis tepi merah samar,
latar gradien Kertas Sketsa yang ditumpuk noise SVG halus, dan satu-satunya
bayangan tetap di situs. Di dalamnya: nama gerakan di kiri atas, penanda tahap
huruf besar Ember di kanan atas dengan latar krem 85%, dan dua tombol lingkaran
40px di kanan bawah (ulangi, jeda).

Modelnya digambar grafit tembus pandang tanpa detail wajah, garis tepinya
bergetar halus supaya terbaca sebagai coretan tangan. Rasionya berubah menurut
lebar layar, dan tingginya dijaga lewat padding sehingga tidak pernah ada
lompatan tata letak. Saat WebGL tidak tersedia, kanvas disembunyikan dan
pesannya tampil di tengah — halaman tetap utuh.

### Pemilih Mazhab (signature)
Kontrol tersegmen dalam pembungkus parchment: baris pil berlatar hitam 5% dengan
empat tombol setinggi 40px yang membagi lebar rata. Yang terpilih menjadi Deep
Charcoal dengan bayangan pendek. Di atasnya label huruf besar Ember beserta ikon
kitab; di bawahnya catatan abu terang yang menjelaskan bahwa semua pilihan
berdalil.

### Kutipan Dalil (signature)
Bukan kartu, melainkan blok bergaris tepi kiri **amber 3px** dengan padding kiri
16px. Susunannya tetap: label rujukan huruf besar Ember, nama perawi abu terang di
bawahnya, teks Arab rata kanan, terjemahan penuh dengan ruas yang dirujuk
**distabilo amber** dan sisanya diredupkan ke opacity 0.55, lencana derajat, satu
kalimat ringkasan, lalu tautan "Periksa di sumbernya" berikon rantai dengan garis
putus-putus di atasnya.

Kutipan kedua dan seterusnya dipisah garis penuh dan jarak 24px — tidak pernah
digabung atau dipendekkan.

### Kartu Bacaan (signature)
Kartu putih 20px berisi judul bacaan, teks Arab besar rata kanan (26px, tinggi
baris 2.1), tulisan latin miring, arti dalam bahasa sehari-hari, lalu catatan
abu terang tentang cara membacanya. Untuk surah, tiap ayat dipisah garis
putus-putus.

## Do's and Don'ts

### Do:
- **Do** tampilkan kutipan **utuh** dan tandai bagian yang dirujuk dengan
  `mark.ayat-sorot` (amber 32%), sambil meredupkan sisanya ke opacity 0.55.
  Penekanan lewat sorotan, tidak pernah lewat pemotongan.
- **Do** sertakan lencana derajat pada setiap hadits — hijau untuk sahih, amber
  untuk lemah. Derajat yang merugikan pendapat populer tetap ditampilkan.
- **Do** beri setiap baris Arab tulisan latin dan artinya.
- **Do** pakai Deep Charcoal untuk menyatakan keadaan terpilih, dan Flame untuk
  menyatakan apa yang bisa dilakukan.
- **Do** biarkan permukaan rata saat istirahat; bayangan hanya sebagai jawaban
  atas hover atau keadaan aktif.
- **Do** pakai garis tepi 1px merah samar (`rgba(232, 57, 29, 0.15)`), bukan abu netral.
- **Do** hormati `prefers-reduced-motion` — pose berpindah tanpa animasi, pola
  latar berhenti bergerak.
- **Do** pastikan halaman tetap utuh tanpa WebGL.

### Don't:
- **Don't** memakai estetika poster dakwah: hijau-emas, bingkai kaligrafi berukir,
  foto masjid stok, atau ayat yang ditempel di atas gradien.
- **Don't** memakai rupa dashboard SaaS generik: abu dingin, biru, Inter, atau
  kartu tanpa sudut pandang.
- **Don't** memenggal kutipan supaya muat di kartu. Kalau ruangnya kurang, yang
  diubah tata letaknya.
- **Don't** memakai amber untuk hiasan. Amber selalu berarti "perhatikan bagian ini".
- **Don't** memakai Canopy Green untuk apa pun selain lencana derajat sahih.
- **Don't** memberi bayangan pada permukaan yang sedang diam.
- **Don't** memakai Flame pada bidang besar; ia aksen, bukan latar.
- **Don't** memanggil huruf, skrip, atau gambar dari server luar — huruf disimpan
  sendiri di `assets/font/`, dan situs harus tetap nol permintaan ke luar.
- **Don't** menambahkan lencana pencapaian, runtutan hari, atau elemen gamifikasi
  apa pun.
