/* Interactions globales — header, menu mobile, apparition, retour haut, marquee */
(function () {
  /* État du header au défilement */
  const header = document.getElementById('header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menu mobile */
  const burger = document.querySelector('.menu-btn');
  if (burger) {
    const toggle = (open) => {
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    burger.addEventListener('click', () => toggle(!document.body.classList.contains('menu-open')));
    document.querySelectorAll('.nav-links a').forEach((a) =>
      a.addEventListener('click', () => toggle(false))
    );
  }

  /* Apparition au défilement */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* Bouton retour en haut */
  const top = document.getElementById('scrollToTop');
  if (top) {
    window.addEventListener('scroll', () => top.classList.toggle('visible', window.scrollY > 320), { passive: true });
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* Défilement infini des logos clients — les clones sont masqués
     aux technologies d'assistance et retirés de la tabulation */
  const track = document.getElementById('logos-track');
  if (track && !track.dataset.cloned) {
    Array.from(track.children).forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('tabindex', '-1');
      track.appendChild(clone);
    });
    track.dataset.cloned = 'true';
  }

  /* Service worker (PWA) — HTTPS uniquement */
  if (window.location.protocol === 'https:' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const base = window.location.pathname.match(/\/(services|entreprise|legal)\//) ? '../' : './';
      navigator.serviceWorker.register(base + 'sw.js', { scope: '/' }).catch(() => {});
    });
  }
})();
