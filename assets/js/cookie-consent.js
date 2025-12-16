(function(){
  function createBanner(){
    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
      <div class="cc-container" role="dialog" aria-live="polite" aria-label="Bandeau cookies">
        <div class="cc-text">
          Nous utilisons des cookies techniques nécessaires au fonctionnement du site et, avec votre consentement, des cookies facultatifs (mesure d'audience). Vous pouvez accepter, refuser ou personnaliser vos choix.
          Consultez notre <a href="${basePath()}legal/cookies.html">Page Cookies</a> et notre <a href="${basePath()}legal/politique-confidentialite.html">Politique de confidentialité</a>.
        </div>
        <div class="cc-actions">
          <button class="cc-btn" data-action="reject">Tout refuser</button>
          <button class="cc-btn" data-action="customize">Personnaliser</button>
          <button class="cc-btn cc-primary" data-action="accept">Tout accepter</button>
        </div>
        <div class="cc-customize" hidden>
          <label><input type="checkbox" disabled checked> Cookies nécessaires</label>
          <label><input id="consent-analytics" type="checkbox"> Cookies de mesure d'audience</label>
          <div class="cc-actions">
            <button class="cc-btn" data-action="save">Enregistrer</button>
          </div>
        </div>
      </div>
      <style>
        #cookie-consent-banner{position:fixed;bottom:0;left:0;right:0;z-index:10000;background:#111;color:#fff;padding:16px;border-top:1px solid #333;font-size:14px}
        #cookie-consent-banner a{color:#9bd}
        .cc-container{max-width:1200px;margin:0 auto}
        .cc-text{margin-bottom:8px;line-height:1.4}
        .cc-actions{display:flex;gap:8px;flex-wrap:wrap}
        .cc-btn{background:#333;color:#fff;border:1px solid #444;padding:8px 12px;border-radius:4px;cursor:pointer}
        .cc-btn.cc-primary{background:#0b6;border-color:#0a5}
        .cc-customize{margin-top:8px}
        .cc-customize label{display:block;margin:6px 0}
      </style>
    `;
    document.body.appendChild(banner);
    banner.addEventListener('click', function(e){
      var action = e.target && e.target.getAttribute('data-action');
      if (!action) return;
      if (action === 'reject') setConsent({necessary:true, analytics:false});
      if (action === 'accept') setConsent({necessary:true, analytics:true});
      if (action === 'customize') toggleCustomize();
      if (action === 'save') {
        var a = document.getElementById('consent-analytics').checked;
        setConsent({necessary:true, analytics:a});
      }
    });
  }
  function toggleCustomize(){
    var el = document.querySelector('#cookie-consent-banner .cc-customize');
    if (el) el.hidden = !el.hidden;
  }
  function basePath(){
    var p = window.location.pathname;
    var inSub = p.includes('/services/') || p.includes('/entreprise/') || p.includes('/legal/');
    return inSub ? '../' : '';
  }
  function setConsent(obj){
    localStorage.setItem('erpac_cookie_consent', JSON.stringify(obj));
    applyConsent(obj);
    hideBanner();
  }
  function hideBanner(){
    var el = document.getElementById('cookie-consent-banner');
    if (el) el.remove();
  }
  function applyConsent(obj){
    // Example: block analytics unless consent.analytics === true
    if (!obj.analytics) {
      window['analyticsBlocked'] = true;
      // If any analytics scripts are planned, they should check this flag
    } else {
      window['analyticsBlocked'] = false;
      // Place initialization of analytics here if added in future
    }
  }
  function load(){
    try {
      var raw = localStorage.getItem('erpac_cookie_consent');
      if (raw){
        var obj = JSON.parse(raw);
        applyConsent(obj);
      } else {
        createBanner();
      }
    } catch(e) {
      createBanner();
    }
  }
  window.showConsentBanner = function(force){
    if (force) {
      localStorage.removeItem('erpac_cookie_consent');
    }
    createBanner();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
