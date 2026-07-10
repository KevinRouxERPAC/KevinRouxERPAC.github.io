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

  function startLoadWatch() {
    clearLoadTimer();
    loadTimer = window.setTimeout(function () {
      if (!frame.dataset.loaded) showError();
    }, LOAD_TIMEOUT_MS);
  }

  function onFrameLoad() {
    frame.dataset.loaded = 'true';
    clearLoadTimer();
    showFrame();
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

    setMode('');
    show(loading);
    hide(mobileNotice);
    hide(errorNotice);
    hide(fallbackNotice);

    frame.addEventListener('load', onFrameLoad, { once: true });
    frame.addEventListener('error', function () {
      clearLoadTimer();
      showError();
    }, { once: true });
    startLoadWatch();
  }

  if (retryBtn) {
    retryBtn.addEventListener('click', function () {
      frame.dataset.loaded = '';
      hide(errorNotice);
      show(loading);
      setMode('');
      frame.src = frame.getAttribute('src');
      frame.addEventListener('load', onFrameLoad, { once: true });
      startLoadWatch();
    });
  }

  window.addEventListener('resize', function () {
    var src = frame.getAttribute('src') || '';
    if (!isEmbedConfigured(src)) return;

    if (window.innerWidth <= MOBILE_MAX) {
      clearLoadTimer();
      showMobile();
      return;
    }

    hide(mobileNotice);
    if (frame.dataset.loaded) {
      showFrame();
      return;
    }

    if (errorNotice && !errorNotice.hidden) return;

    hide(fallbackNotice);
    show(loading);
    setMode('');
    startLoadWatch();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmbed);
  } else {
    initEmbed();
  }
})();
