/* Page stats interne — chargement iframe Looker Studio, mobile, erreurs */
(function () {
  var MOBILE_MAX = 768;
  var LOAD_TIMEOUT_MS = 12000;

  var wrap = document.querySelector('.stats-frame-wrap');
  var frame = document.getElementById('stats-frame');
  var loading = document.getElementById('stats-loading');
  var mobileNotice = document.getElementById('stats-mobile');
  var errorNotice = document.getElementById('stats-error');
  var fallbackNotice = document.getElementById('stats-fallback');
  var retryBtn = document.getElementById('stats-retry');

  if (!wrap || !frame) return;

  var loadTimer = null;

  function isEmbedConfigured(src) {
    return src &&
      src !== 'about:blank' &&
      (src.indexOf('lookerstudio.google.com') !== -1 || src.indexOf('datastudio.google.com') !== -1);
  }

  function setMode(mode) {
    wrap.classList.remove('stats-frame-ready', 'stats-frame-error', 'stats-frame-mobile', 'stats-frame-fallback');
    if (mode) wrap.classList.add(mode);
  }

  function hide(el) {
    if (el) el.hidden = true;
  }

  function show(el) {
    if (el) el.hidden = false;
  }

  function showFrame() {
    setMode('stats-frame-ready');
    hide(mobileNotice);
    hide(errorNotice);
    hide(fallbackNotice);
  }

  function showMobile() {
    setMode('stats-frame-mobile');
    hide(errorNotice);
    hide(fallbackNotice);
    show(mobileNotice);
  }

  function showError() {
    setMode('stats-frame-error');
    hide(mobileNotice);
    hide(fallbackNotice);
    show(errorNotice);
  }

  function showFallback() {
    setMode('stats-frame-fallback');
    hide(mobileNotice);
    hide(errorNotice);
    show(fallbackNotice);
  }

  function clearLoadTimer() {
    if (loadTimer) {
      window.clearTimeout(loadTimer);
      loadTimer = null;
    }
  }

  // Lance l'écoute du chargement de l'iframe : listener `load` + garde de timeout.
  // L'événement `error` d'une iframe cross-origin n'est jamais reçu côté parent
  // (politique same-origin) : seul le timeout détecte un échec réel.
  // En cas de re-réattachement (retry, resize desktop), on remet `dataset.loaded`
  // à '' pour que le timeout fonctionne à nouveau.
  function watchLoad() {
    clearLoadTimer();
    frame.addEventListener('load', onFrameLoad, { once: true });
    loadTimer = window.setTimeout(function () {
      if (!frame.dataset.loaded) {
        frame.removeEventListener('load', onFrameLoad);
        showError();
      }
    }, LOAD_TIMEOUT_MS);
  }

  function onFrameLoad() {
    frame.dataset.loaded = 'true';
    clearLoadTimer();
    showFrame();
  }

  // Recharge l'iframe depuis le réseau en forçant un nouveau chargement :
  // réassigner frame.src à la même valeur ne relance pas toujours le load
  // sur tous les navigateurs. On passe par cloneNode pour garantir la recharge.
  function reloadFrame() {
    frame.dataset.loaded = '';
    var fresh = frame.cloneNode(true);
    frame.parentNode.replaceChild(fresh, frame);
    frame = fresh;
  }

  function showLoading() {
    setMode('');
    show(loading);
    hide(mobileNotice);
    hide(errorNotice);
    hide(fallbackNotice);
  }

  function initEmbed() {
    var src = frame.getAttribute('src') || '';

    if (!isEmbedConfigured(src)) {
      showFallback();
      return;
    }

    if (window.innerWidth <= MOBILE_MAX) {
      showMobile();
      return;
    }

    showLoading();
    watchLoad();
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', function () {
      reloadFrame();
      showLoading();
      watchLoad();
    });
  }

  // resize non debouncé : la transition mobile↔desktop est rare et peu coûteuse,
  // un debounce ajouterait de la latence sans bénéfice ici.
  window.addEventListener('resize', function () {
    var src = frame.getAttribute('src') || '';
    if (!isEmbedConfigured(src)) return;

    if (window.innerWidth <= MOBILE_MAX) {
      clearLoadTimer();
      frame.removeEventListener('load', onFrameLoad);
      showMobile();
      return;
    }

    // Repassage mobile→desktop : si l'iframe n'avait jamais chargé (mode mobile
    // précédent), il faut relancer l'écoute du load — sinon le timeout ne pourra
    // jamais détecter la fin du chargement et on aura une fausse erreur à 12 s.
    hide(mobileNotice);
    if (frame.dataset.loaded) {
      showFrame();
      return;
    }

    // Si on est déjà en état d'erreur, on laisse l'utilisateur réessayer via le bouton.
    if (errorNotice && !errorNotice.hidden) return;

    showLoading();
    watchLoad();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmbed);
  } else {
    initEmbed();
  }
})();
