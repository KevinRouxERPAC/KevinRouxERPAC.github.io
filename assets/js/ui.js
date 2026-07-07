/* Interactions globales — header, menu mobile, apparition, retour haut, carousel */
(function () {
  document.documentElement.classList.add('js');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* État du header au défilement */
  const header = document.getElementById('header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menu mobile */
  const burger = document.querySelector('.menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const backdrop = document.querySelector('.nav-backdrop');

  if (burger && navMenu) {
    let lastFocus = null;

    const getFocusable = () =>
      Array.from(navMenu.querySelectorAll('a, button:not([disabled])')).filter(
        (el) => el.offsetParent !== null || el === burger
      );

    const isOpen = () => document.body.classList.contains('menu-open');

    const syncNavA11y = () => {
      const isMobile = window.innerWidth <= 900;
      navMenu.setAttribute('aria-hidden', isMobile && !isOpen() ? 'true' : 'false');
      if ('inert' in navMenu) navMenu.inert = isMobile && !isOpen();
    };

    const toggle = (open) => {
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');

      if (open) {
        lastFocus = document.activeElement;
        const first = getFocusable()[0];
        if (first) first.focus();
      } else {
        document.querySelectorAll('.has-sub.open').forEach((el) => {
          el.classList.remove('open');
          const btn = el.querySelector('.sub-toggle');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
        (lastFocus || burger).focus();
      }
      syncNavA11y();
    };

    burger.addEventListener('click', () => toggle(!isOpen()));
    if (backdrop) backdrop.addEventListener('click', () => toggle(false));

    navMenu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => { if (isOpen()) toggle(false); })
    );

    document.addEventListener('keydown', (e) => {
      if (!isOpen()) return;
      if (e.key === 'Escape') {
        toggle(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = [burger, ...getFocusable()];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    window.addEventListener('resize', () => {
      syncNavA11y();
      if (isOpen() && window.innerWidth > 900) toggle(false);
    });

    syncNavA11y();

    /* Sous-menus repliables sur mobile */
    document.querySelectorAll('.has-sub').forEach((group) => {
      const btn = group.querySelector('.sub-toggle');
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        if (window.innerWidth > 900) return;
        e.preventDefault();
        const open = !group.classList.contains('open');
        document.querySelectorAll('.has-sub.open').forEach((el) => {
          if (el !== group) {
            el.classList.remove('open');
            const other = el.querySelector('.sub-toggle');
            if (other) other.setAttribute('aria-expanded', 'false');
          }
        });
        group.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }

  /* Hero vidéo — desktop uniquement, pas si mouvement réduit */
  const hero = document.querySelector('.hero');
  const heroVideo = document.querySelector('.hero-video');
  if (hero && heroVideo) {
    const canPlayVideo = !reducedMotion && window.matchMedia('(min-width: 768px)').matches;
    if (canPlayVideo) {
      heroVideo.preload = 'metadata';
      const enableVideo = () => hero.classList.add('hero-has-video');
      heroVideo.addEventListener('loadeddata', enableVideo, { once: true });
      heroVideo.addEventListener('error', () => hero.classList.remove('hero-has-video'));
      heroVideo.play().catch(() => {});
    } else {
      heroVideo.pause();
      heroVideo.removeAttribute('src');
      const source = heroVideo.querySelector('source');
      if (source) source.remove();
    }
  }

  /* Délais échelonnés pour les apparitions groupées */
  document.querySelectorAll('.steps .step, .exp-grid-bento .exp-card, .atelier-track .atelier-shot').forEach((el, i) => {
    el.classList.add(`reveal-delay-${(i % 4) + 1}`);
  });

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

  /* Compteurs animés */
  const formatCount = (el, value) => {
    const suffix = el.dataset.suffix || '';
    if (el.closest('.metric') && suffix) {
      el.innerHTML = `${value}<span>${suffix}</span>`;
    } else {
      el.textContent = value + suffix;
    }
  };

  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const from = parseInt(el.dataset.from || '0', 10);
    if (Number.isNaN(target)) return;

    if (reducedMotion) {
      formatCount(el, target);
      return;
    }

    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(from + (target - from) * eased);
      formatCount(el, value);
      if (t < 1) requestAnimationFrame(tick);
      else formatCount(el, target);
    };
    requestAnimationFrame(tick);
  };

  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach((el) => formatCount(el, parseInt(el.dataset.count, 10)));
    } else {
      const counterIo = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            counterIo.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach((el) => counterIo.observe(el));
    }
  }

  /* Parallaxe légère — bande atelier (throttlé via rAF) */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !reducedMotion) {
    let ticking = false;
    const onParallax = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const mid = window.innerHeight / 2;
        parallaxEls.forEach((el) => {
          const img = el.querySelector('img');
          if (!img) return;
          const rect = el.getBoundingClientRect();
          const offset = (rect.top + rect.height / 2 - mid) * parseFloat(el.dataset.parallax);
          img.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
      });
    };
    window.addEventListener('scroll', onParallax, { passive: true });
    onParallax();
  }

  /* Bouton retour en haut */
  const top = document.getElementById('scrollToTop');
  if (top) {
    window.addEventListener('scroll', () => top.classList.toggle('visible', window.scrollY > 320), { passive: true });
    top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* Défilement infini des logos clients */
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
