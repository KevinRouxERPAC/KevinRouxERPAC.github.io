/* En-tête / navigation — injecté sur toutes les pages */
(function () {
  const menu = document.getElementById('menu');
  if (!menu) return;

  const path = window.location.pathname;
  const inSub = path.includes('/services/') || path.includes('/entreprise/') || path.includes('/legal/');
  const base = inSub ? '../' : '';
  const here = (frag) => (path.endsWith(frag) ? ' aria-current="page"' : '');

  menu.innerHTML = `
    <div class="wrap nav">
      <a href="${base}index.html" class="brand" aria-label="Accueil ERPAC">
        <img src="${base}assets/images/logos/logo_seul.png" alt="">
        <span class="brand-name">ERPAC<small>Solutions industrielles</small></span>
      </a>

      <nav class="nav-links" aria-label="Menu principal">
        <a href="${base}index.html"${here('index.html')}>Accueil</a>
        <span class="has-sub">
          <a href="${base}services/electronique.html"${here('electronique.html')}>Électronique</a>
          <span class="submenu">
            <a href="${base}services/electronique.html#etude">Étude</a>
            <a href="${base}services/electronique.html#conception">Conception</a>
            <a href="${base}services/electronique.html#programmation">Programmation</a>
            <a href="${base}services/electronique.html#production">Production</a>
            <a href="${base}services/electronique.html#qualite">Contrôle qualité</a>
          </span>
        </span>
        <span class="has-sub">
          <a href="${base}services/electrotechnique.html"${here('electrotechnique.html')}>Électrotechnique</a>
          <span class="submenu">
            <a href="${base}services/electrotechnique.html#etude">Étude</a>
            <a href="${base}services/electrotechnique.html#conception">Conception</a>
            <a href="${base}services/electrotechnique.html#production">Production</a>
            <a href="${base}services/electrotechnique.html#qualite">Contrôle qualité</a>
            <a href="${base}services/electrotechnique.html#installation">Installation / Mise en service</a>
          </span>
        </span>
        <span class="has-sub">
          <a href="${base}services/automatisme.html"${here('automatisme.html')}>Automatisme</a>
          <span class="submenu">
            <a href="${base}services/automatisme.html#etude">Étude</a>
            <a href="${base}services/automatisme.html#conception">Conception</a>
            <a href="${base}services/automatisme.html#programmation">Programmation</a>
            <a href="${base}services/automatisme.html#production">Production</a>
            <a href="${base}services/automatisme.html#qualite">Contrôle qualité</a>
            <a href="${base}services/automatisme.html#installation">Installation / Mise en service</a>
          </span>
        </span>
        <span class="has-sub">
          <a href="${base}entreprise/a-propos.html"${here('a-propos.html')}>Qui sommes-nous&nbsp;?</a>
          <span class="submenu">
            <a href="${base}entreprise/a-propos.html#histoire">Notre histoire</a>
            <a href="${base}entreprise/a-propos.html#equipe">Notre équipe</a>
          </span>
        </span>
        <a href="${base}index.html#contact">Contact</a>
      </nav>

      <a href="${base}index.html#contact" class="btn btn-primary nav-cta">Demander un devis</a>
      <button class="menu-btn" aria-label="Ouvrir le menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;
})();
