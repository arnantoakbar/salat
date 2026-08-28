/*
 * Menyisipkan kartu dalil dan kartu bacaan ke halaman biasa.
 *
 * Halaman seperti "Persiapan" dan "Dzikir" isinya teks biasa. Supaya
 * kutipannya tidak pernah diketik ulang di HTML — dan karenanya tidak bisa
 * menyimpang dari sumbernya — halaman cukup menandai tempatnya:
 *
 *   <div data-dalil="qs5-6" data-sorot="wudhu"></div>
 *   <div data-bacaan="istighfar"></div>
 *
 * lalu isinya diambil dari data/dalil.js dan data/bacaan.js.
 */

(function () {
  'use strict';

  var U = window.UIDalil;
  if (!U) return;

  Array.prototype.forEach.call(document.querySelectorAll('[data-dalil]'), function (el) {
    el.innerHTML = U.kartuDalil(el.getAttribute('data-dalil'), el.getAttribute('data-sorot'));
  });

  Array.prototype.forEach.call(document.querySelectorAll('[data-bacaan]'), function (el) {
    el.innerHTML = U.kartuBacaan(el.getAttribute('data-bacaan'));
  });
})();
