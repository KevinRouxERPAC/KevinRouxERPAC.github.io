/* Événements GA4 orientés business — envoyés uniquement si gtag est actif (consentement cookies). */
(function () {
  function track(eventName, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params || {});
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var label = (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);

    if (href.indexOf('tel:') === 0) {
      track('contact', { method: 'phone', link_url: href });
      return;
    }

    if (href.indexOf('mailto:') === 0) {
      track('contact', { method: 'email', link_url: href });
      return;
    }

    if (
      link.classList.contains('nav-cta') ||
      link.classList.contains('nav-cta-mobile') ||
      (link.classList.contains('btn') && (href.indexOf('#contact') !== -1 || /devis/i.test(label)))
    ) {
      track('generate_lead', { method: 'devis_cta', link_text: label, link_url: href });
    }
  }, true);

  var contact = document.getElementById('contact');
  if (contact && 'IntersectionObserver' in window) {
    var contactSeen = false;
    var contactObserver = new IntersectionObserver(function (entries) {
      if (contactSeen || !entries[0].isIntersecting) return;
      contactSeen = true;
      track('view_contact', { page_path: window.location.pathname });
      contactObserver.disconnect();
    }, { threshold: 0.25 });
    contactObserver.observe(contact);
  }

  window.addEventListener('erpac:cookie-consent', function (event) {
    if (!event.detail || !event.detail.value) return;
    track('cookie_consent', { consent_status: event.detail.value });
  });
})();
