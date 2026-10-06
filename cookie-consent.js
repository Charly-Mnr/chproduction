/* CH Production — bandeau de consentement cookies (Google Analytics 4)
   GA4 n'est chargé qu'après acceptation explicite du visiteur, conformément
   aux recommandations de la CNIL. Le choix est mémorisé dans localStorage. */
(function () {
  'use strict';

  var CONSENT_KEY = 'chprod_cookie_consent';
  var GA_ID = 'G-ZJ1LVFNLE3';

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* ignore */ }
  }

  function loadGA() {
    if (window.__chprodGaLoaded) return;
    window.__chprodGaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);

    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function removeBanner() {
    var el = document.getElementById('cookie-banner');
    if (el) el.remove();
  }

  function showBanner() {
    if (document.getElementById('cookie-banner')) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Gestion des cookies');
    banner.style.cssText = [
      'position:fixed', 'left:0', 'right:0', 'bottom:0', 'z-index:9999',
      'background:#15100E', 'color:#F3EFE9', 'padding:18px 20px',
      'display:flex', 'flex-wrap:wrap', 'gap:14px', 'align-items:center',
      'justify-content:center', 'border-top:1px solid rgba(243,239,233,.15)',
      "font-family:'Hanken Grotesk',sans-serif", 'font-size:13px', 'line-height:1.5'
    ].join(';');

    banner.innerHTML =
      '<span style="max-width:640px">Ce site utilise des cookies de mesure d’audience (Google Analytics) ' +
      'pour mieux comprendre sa fréquentation. Vous pouvez les accepter ou les refuser. ' +
      '<a href="politique-confidentialite.html" style="color:#E07A5F;text-decoration:underline">En savoir plus</a></span>' +
      '<span style="display:flex;gap:10px;flex-shrink:0">' +
      '<button id="cookie-decline" type="button" style="background:transparent;border:1px solid rgba(243,239,233,.3);' +
      'color:#F3EFE9;padding:8px 16px;border-radius:4px;font-size:12px;font-weight:700;text-transform:uppercase;' +
      'letter-spacing:.04em;cursor:pointer">Refuser</button>' +
      '<button id="cookie-accept" type="button" style="background:#E07A5F;border:none;color:#15100E;padding:8px 16px;' +
      'border-radius:4px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;' +
      'cursor:pointer">Accepter</button>' +
      '</span>';

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      setConsent('granted');
      loadGA();
      removeBanner();
    });
    document.getElementById('cookie-decline').addEventListener('click', function () {
      setConsent('denied');
      removeBanner();
    });
  }

  function initManageLinks() {
    var links = document.querySelectorAll('.js-manage-cookies');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) {
        e.preventDefault();
        showBanner();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var consent = getConsent();
    if (consent === 'granted') {
      loadGA();
    } else if (consent !== 'denied') {
      showBanner();
    }
    initManageLinks();
  });
})();
