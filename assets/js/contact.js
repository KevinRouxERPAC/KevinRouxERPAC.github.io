/* Section contact (coordonnées + carte) — injectée là où #contact existe */
(function () {
  const contact = document.getElementById('contact');
  if (!contact) return;

  contact.classList.add('block', 'contact');
  contact.innerHTML = `
    <div class="wrap">
      <div class="section-head center reveal">
        <span class="eyebrow center">Contact</span>
        <h2>Parlons de votre projet</h2>
        <p>Une question, un besoin technique, une demande de devis ? Notre équipe vous répond.</p>
      </div>

      <div class="contact-grid reveal">
        <div class="coord">
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
          </div>
        </div>

        <div class="map-wrap">
          <div id="map" role="img" aria-label="Carte de localisation d'ERPAC"></div>
          <p class="map-credit">Données cartographiques &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a></p>
        </div>
      </div>
    </div>
  `;
})();
