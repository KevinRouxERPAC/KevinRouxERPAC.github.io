/* Section contact (coordonnées + carte) — injectée là où #contact existe */
(function () {
  const contact = document.getElementById('contact');
  if (!contact) return;

  const path = window.location.pathname;
  const inSub = path.includes('/services/') || path.includes('/entreprise/') || path.includes('/legal/');
  const base = inSub ? '../' : '';

  const coordHtml = `
    <h3>Nos coordonnées</h3>
    <div class="coord-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
      </svg>
      <a href="https://maps.app.goo.gl/2FpqzK65qxJQTCoP9" target="_blank" rel="noopener noreferrer" aria-label="Voir notre adresse sur Google Maps">
        49bis Avenue de la République<br>18150 La Guerche-sur-l'Aubois
      </a>
    </div>
    <div class="coord-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
      <a href="tel:+33248775210" aria-label="Appeler ERPAC">02 48 77 52 10</a>
    </div>
    <div class="coord-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
      <a href="mailto:contact@erpac.fr" aria-label="Envoyer un email à ERPAC">contact@erpac.fr</a>
    </div>
    <div class="coord-hours">
      <h4>Horaires d'ouverture</h4>
      <p>Lundi – Vendredi : 6h00 – 13h00<br><span style="opacity:.8">(horaires atelier)</span></p>
    </div>`;

  const mapHtml = `
    <div class="map-wrap">
      <div id="map" aria-label="Carte de localisation d'ERPAC">
        <p class="map-loading">Chargement de la carte…</p>
      </div>
      <p class="map-credit">Données cartographiques &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a></p>
    </div>`;

  contact.classList.add('block', 'contact');

  const existingCoord = contact.querySelector('.coord, address.coord');

  if (existingCoord && !contact.querySelector('#map')) {
    /* Page d'accueil : enrichir le HTML statique sans l'écraser */
    const wrap = contact.querySelector('.wrap');
    const sectionHead = wrap.querySelector('.section-head');
    if (sectionHead) {
      sectionHead.classList.add('reveal');
      if (!sectionHead.querySelector('p')) {
        const intro = document.createElement('p');
        intro.textContent = 'Une question, un besoin technique, une demande de devis ? Notre équipe vous répond.';
        sectionHead.appendChild(intro);
      }
    }

    existingCoord.className = 'coord';
    existingCoord.innerHTML = coordHtml;

    const grid = document.createElement('div');
    grid.className = 'contact-grid reveal';
    grid.appendChild(existingCoord);
    grid.insertAdjacentHTML('beforeend', mapHtml);
    wrap.appendChild(grid);
  } else {
    /* Pages internes : injection complète */
    contact.innerHTML = `
      <div class="wrap">
        <div class="section-head center reveal">
          <span class="eyebrow center">Contact</span>
          <h2>Parlons de votre projet</h2>
          <p>Une question, un besoin technique, une demande de devis ? Notre équipe vous répond.</p>
        </div>
        <div class="contact-grid reveal">
          <div class="coord">${coordHtml}</div>
          ${mapHtml}
        </div>
      </div>`;
  }

  /* Chargement différé de Leaflet quand la carte entre dans le viewport */
  const mapEl = document.getElementById('map');
  if (!mapEl || mapEl.dataset.lazyInit) return;
  mapEl.dataset.lazyInit = 'pending';

  const loadMap = () => {
    if (mapEl.dataset.lazyInit === 'loaded') return;
    mapEl.dataset.lazyInit = 'loaded';

    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = base + 'assets/vendor/leaflet/leaflet.css';
      document.head.appendChild(link);
    }

    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.body.appendChild(s);
      });

    loadScript(base + 'assets/vendor/leaflet/leaflet.js')
      .then(() => loadScript(base + 'assets/js/map.js'))
      .catch(() => {
        mapEl.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:center;min-height:200px;padding:2rem;text-align:center;color:#666">
            <div>
              <p><strong>ERPAC</strong></p>
              <p>49bis Avenue de la République<br>18150 La Guerche-sur-l'Aubois</p>
              <a href="https://www.google.fr/maps/place/ERPAC" target="_blank" rel="noopener noreferrer" style="color:#008C3A">Voir sur Google Maps →</a>
            </div>
          </div>`;
      });
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMap();
        io.disconnect();
      }
    }, { rootMargin: '200px' });
    io.observe(mapEl);
  } else {
    loadMap();
  }
})();
