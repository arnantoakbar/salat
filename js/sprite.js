/*
 * Sprite ikon.
 *
 * Ditulis lewat document.write supaya <symbol>-nya sudah ada di dokumen
 * sebelum elemen <use> di markup di-parse — ikon tidak pernah berkedip
 * kosong, dan definisinya cukup ditulis sekali untuk semua halaman.
 * (Pola yang sama dengan proyek waris.)
 *
 * Dua keluarga ikon:
 *   i-*    ikon antarmuka umum, garis 1.6px lewat kelas .ic
 *   i-g-*  piktogram gerakan salat — figur garis sederhana, sengaja tampak
 *          seperti coretan pensil supaya senada dengan model 3D-nya
 */
document.write('<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +

  // ── Ikon umum (sebagian diambil dari sprite waris) ──────────────
  '<symbol id="i-kitab" viewBox="0 0 24 24"><path d="M4 5.2A1.7 1.7 0 0 1 5.7 3.5H19v15.8H5.7A1.7 1.7 0 0 0 4 21z"/><path d="M4 5.2v13.6"/><path d="M8 8h7M8 11.5h5"/></symbol>' +
  '<symbol id="i-tautan" viewBox="0 0 24 24"><path d="M10.6 13.4a3.6 3.6 0 0 0 5.4.4l2.2-2.2a3.6 3.6 0 0 0-5.1-5.1l-1.2 1.2"/><path d="M13.4 10.6a3.6 3.6 0 0 0-5.4-.4l-2.2 2.2a3.6 3.6 0 0 0 5.1 5.1l1.2-1.2"/></symbol>' +
  '<symbol id="i-kanan" viewBox="0 0 24 24"><path d="M5 12h13.5"/><path d="m13 6.5 5.5 5.5-5.5 5.5"/></symbol>' +
  '<symbol id="i-kiri" viewBox="0 0 24 24"><path d="M19 12H5.5"/><path d="m11 17.5-5.5-5.5 5.5-5.5"/></symbol>' +
  '<symbol id="i-chevron" viewBox="0 0 24 24"><path d="m6 9.5 6 6 6-6"/></symbol>' +
  '<symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.6 4.5L19 7.5"/></symbol>' +
  '<symbol id="i-silang" viewBox="0 0 24 24"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></symbol>' +
  '<symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.4"/><path d="M12 11.2v5"/><path d="M12 8.2h.01"/></symbol>' +
  '<symbol id="i-waspada" viewBox="0 0 24 24"><path d="M12 4.2 21 19.5H3z"/><path d="M12 10v4"/><path d="M12 16.8h.01"/></symbol>' +
  '<symbol id="i-ulang" viewBox="0 0 24 24"><path d="M19.5 12a7.5 7.5 0 1 1-2.4-5.5"/><path d="M19.8 4.5v4.2h-4.2"/></symbol>' +
  '<symbol id="i-hati" viewBox="0 0 24 24"><path d="M12 19.5S4 14.6 4 9.6a4.1 4.1 0 0 1 8-1.4 4.1 4.1 0 0 1 8 1.4c0 5-8 9.9-8 9.9z"/></symbol>' +
  '<symbol id="i-kode" viewBox="0 0 24 24"><path d="m8.4 7.6-4.6 4.4 4.6 4.4"/><path d="m15.6 7.6 4.6 4.4-4.6 4.4"/><path d="M13.4 4.6 10.6 19.4"/></symbol>' +
  '<symbol id="i-dokumen" viewBox="0 0 24 24"><path d="M13.5 3.5H7a1.8 1.8 0 0 0-1.8 1.8v13.4A1.8 1.8 0 0 0 7 20.5h10a1.8 1.8 0 0 0 1.8-1.8V8.8z"/><path d="M13.5 3.5v5.3h5.3"/><path d="M8.6 13h6.8M8.6 16.4h4.5"/></symbol>' +
  '<symbol id="i-jam" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.2"/><path d="M12 7.6V12l3 1.8"/></symbol>' +
  '<symbol id="i-putar" viewBox="0 0 24 24"><path d="M9.2 7.2 17 12l-7.8 4.8z"/></symbol>' +
  '<symbol id="i-jeda" viewBox="0 0 24 24"><path d="M9.4 7.4v9.2M14.6 7.4v9.2"/></symbol>' +
  '<symbol id="i-bolak" viewBox="0 0 24 24"><path d="M4.5 9H17"/><path d="m14 6 3 3-3 3"/><path d="M19.5 15H7"/><path d="m10 12-3 3 3 3"/></symbol>' +
  '<symbol id="i-mata" viewBox="0 0 24 24"><path d="M3.4 12S6.8 5.9 12 5.9 20.6 12 20.6 12 17.2 18.1 12 18.1 3.4 12 3.4 12z"/><circle cx="12" cy="12" r="2.7"/></symbol>' +
  '<symbol id="i-kabah" viewBox="0 0 24 24"><path d="M7 7h10v10.4H7z"/><path d="M7 10.4h10"/><path d="M13.6 17.4v-3.2"/></symbol>' +
  '<symbol id="i-tetes" viewBox="0 0 24 24"><path d="M12 3.8C9.2 7.2 7.8 9.4 7.8 11.6a4.2 4.2 0 0 0 8.4 0C16.2 9.4 14.8 7.2 12 3.8z"/><path d="M5 19.6c1.6-1.2 3.1-1.2 4.7 0s3.1 1.2 4.7 0 3.1-1.2 4.6 0"/></symbol>' +
  '<symbol id="i-tasbih" viewBox="0 0 24 24"><path d="M5.2 8.4c.9 5.6 4.8 9 11 8.6"/><circle cx="5" cy="6.6" r="1.4"/><circle cx="6.6" cy="12.2" r="1.4"/><circle cx="10.2" cy="15.8" r="1.4"/><path d="m16.2 17 2.6 2.6M18 16.2l1.6 1.6"/></symbol>' +
  '<symbol id="i-masjid" viewBox="0 0 24 24"><path d="M7 13.2c0-3.6 2.2-5.6 5-7 2.8 1.4 5 3.4 5 7"/><path d="M5.4 13.2h13.2v7.2H5.4z"/><path d="M10.6 20.4v-3.6a1.4 1.4 0 0 1 2.8 0v3.6"/><path d="M12 6.2V4.4"/></symbol>' +
  '<symbol id="i-jari" viewBox="0 0 24 24"><path d="M12.4 11V4.9a1.3 1.3 0 0 1 2.6 0V11"/><path d="M8.6 12.9V11a1.3 1.3 0 0 1 2.6 0"/><path d="M15 11.6a1.3 1.3 0 0 1 2.6.4v3.4a5 5 0 0 1-5 5h-.8a5 5 0 0 1-4.2-2.3l-2.3-3.6a1.3 1.3 0 0 1 2-1.6l1.3 1.3"/></symbol>' +
  '<symbol id="i-github" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></symbol>' +

  // ── Piktogram gerakan salat ─────────────────────────────────────
  // Figur menghadap kiri (arah kiblat pada tata letak), digambar segaris
  // dengan gaya sketsa model 3D-nya.
  '<symbol id="i-g-berdiri" viewBox="0 0 24 24"><circle cx="12" cy="4.9" r="2.5"/><path d="M12 7.4v6.8"/><path d="M12 9.3 9.2 13.4M12 9.3l2.8 4.1"/><path d="M12 14.2 9.4 20.6M12 14.2l2.6 6.4"/></symbol>' +
  '<symbol id="i-g-takbir" viewBox="0 0 24 24"><circle cx="12" cy="5.4" r="2.5"/><path d="M12 7.9v6.7"/><path d="M12 9.6 8.7 8l-.3-3.6M12 9.6 15.3 8l.3-3.6"/><path d="M12 14.6 9.4 20.6M12 14.6l2.6 6z"/></symbol>' +
  '<symbol id="i-g-sedekap" viewBox="0 0 24 24"><circle cx="12" cy="4.9" r="2.5"/><path d="M12 7.4v7"/><path d="M8.9 9.6v1.6a3.1 3.1 0 0 0 6.2 0V9.6"/><path d="M12 14.4 9.4 20.6M12 14.4l2.6 6.2"/></symbol>' +
  '<symbol id="i-g-rukuk" viewBox="0 0 24 24"><circle cx="5.7" cy="10.7" r="2.2"/><path d="M7.8 11.1 16.6 12"/><path d="M16.6 12v8.6"/><path d="M16.6 20.6h-2.2"/><path d="m11.6 11.6 2.9 4.8"/></symbol>' +
  '<symbol id="i-g-itidal" viewBox="0 0 24 24"><circle cx="12" cy="4.9" r="2.5"/><path d="M12 7.4v6.8"/><path d="M12 9.3 9.8 14M12 9.3l2.2 4.7"/><path d="M12 14.2 9.4 20.6M12 14.2l2.6 6.4"/></symbol>' +
  '<symbol id="i-g-sujud" viewBox="0 0 24 24"><path d="M3.4 20.8h17.2"/><circle cx="6" cy="18.5" r="2"/><path d="M8 17.6l6.4-4.7"/><path d="m9.4 16.6-1 3.8"/><path d="m14.4 12.9 3.4 3.9.8 3.6"/></symbol>' +
  '<symbol id="i-g-duduk" viewBox="0 0 24 24"><path d="M4 20.8h16"/><circle cx="8.8" cy="6.8" r="2.3"/><path d="M9.2 9.2 10 14.6"/><path d="M10 14.6 5.8 18.2l5.2 1.6"/><path d="M9.6 12 7.2 15.2"/></symbol>' +
  '<symbol id="i-g-tasyahud" viewBox="0 0 24 24"><path d="M4 20.8h16"/><circle cx="9.4" cy="6.8" r="2.3"/><path d="M9.8 9.2l.8 5.4"/><path d="M10.6 14.6 6.4 18.2l5.2 1.6"/><path d="M10.2 12.4 7 14.4l-2.6-.6"/></symbol>' +
  '<symbol id="i-g-salam" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3"/><path d="M5.8 20.2c0-4.8 2.6-6.8 6.2-6.8s6.2 2 6.2 6.8"/><path d="M18.2 5.8 20 7.6l-1.8 1.8M5.8 5.8 4 7.6l1.8 1.8"/></symbol>' +
  '<symbol id="i-g-qunut" viewBox="0 0 24 24"><circle cx="12" cy="4.9" r="2.5"/><path d="M12 7.4v7"/><path d="M12 9.8 9 11.6l-.6-3M12 9.8l3 1.8.6-3"/><path d="M12 14.4 9.4 20.6M12 14.4l2.6 6.2"/></symbol>' +
  '<symbol id="i-g-fatihah" viewBox="0 0 24 24"><circle cx="12" cy="4.9" r="2.5"/><path d="M12 7.4v7"/><path d="M9 10.2v1.2a3 3 0 0 0 6 0v-1.2"/><path d="M12 14.4 9.4 20.6M12 14.4l2.6 6.2"/><path d="M17.4 5.2h3M17.4 7.7h2.2M17.4 10.2h3"/></symbol>' +
'</defs></svg>');
