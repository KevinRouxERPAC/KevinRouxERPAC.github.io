/* Page stats — affiche le fallback si l'iframe Looker Studio n'est pas configurée */
(function () {
  var frame = document.querySelector('.stats-frame');
  if (!frame) return;

  var src = frame.getAttribute('src') || '';
  if (!src || src === 'about:blank' || (src.indexOf('lookerstudio.google.com') === -1 && src.indexOf('datastudio.google.com') === -1)) {
    document.body.classList.add('stats-no-frame');
  }
})();
