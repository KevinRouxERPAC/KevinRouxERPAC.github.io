/* Pied de page — injecté sur toutes les pages */
(function () {
  const footer = document.getElementById('footer');
  if (!footer) return;

  const path = window.location.pathname;
  const inSub = path.includes('/services/') || path.includes('/entreprise/') || path.includes('/legal/');
  const base = inSub ? '../' : '';
  const year = new Date().getFullYear();

  footer.innerHTML = `
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <div class="foot-brand">
            <img src="${base}assets/images/logos/logo_seul.png" alt="">
            <span class="foot-brand-name">ERPAC<small>Solutions industrielles</small></span>
          </div>
          <p class="foot-about">Concepteur de solutions électroniques, électrotechniques et d'automatisme sur-mesure pour l'industrie, depuis 1989.</p>
        </div>
        <div class="foot-col">
          <h4>Expertises</h4>
          <a href="${base}services/electronique.html">Électronique</a>
          <a href="${base}services/electrotechnique.html">Électrotechnique</a>
          <a href="${base}services/automatisme.html">Automatisme</a>
          <a href="${base}entreprise/a-propos.html">Qui sommes-nous&nbsp;?</a>
        </div>
        <div class="foot-col">
          <h4>Contact</h4>
          <p>49bis Avenue de la République<br>18150 La Guerche-sur-l'Aubois</p>
          <a href="tel:+33248775210">02 48 77 52 10</a>
          <a href="mailto:contact@erpac.fr">contact@erpac.fr</a>
        </div>
      </div>
      <div class="foot-bottom">
        <span>&copy; ${year} ERPAC — Tous droits réservés</span>
        <span><a href="${base}legal/mentions-legales.html">Mentions légales</a></span>
      </div>
    </div>
  `;
})();
