document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu burger
    const nav = document.querySelector('nav');
    const menuButton = document.querySelector('.menu-toggle');

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}); 

const menu = document.getElementById('menu');

// Détection de la page actuelle pour ajuster les chemins
const currentPath = window.location.pathname;
const isInSubfolder = currentPath.includes('/services/') || currentPath.includes('/entreprise/') || currentPath.includes('/legal/');
const basePath = isInSubfolder ? '../' : '';

menu.innerHTML = `
    <div>
        <a href="${basePath}index.html">
            <img src="${basePath}assets/images/logos/logo_complet.png" alt="ERPAC">
        </a>
        <button class="menu-toggle" aria-label="Menu principal">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
    <ul role="menubar" aria-label="Menu principal">
        <li><a role="menuitem" href="${basePath}index.html">Accueil</a></li>
        <li>
            <a role="menuitem" href="${basePath}services/electronique.html">Électronique</a>
            <ul role="menu" aria-label="Sous-menu">
                <li><a role="menuitem" href="${basePath}services/electronique.html#etude">Étude</a></li>
                <li><a role="menuitem" href="${basePath}services/electronique.html#conception">Conception</a></li>
                <li><a role="menuitem" href="${basePath}services/electronique.html#programmation">Programmation électronique/informatique</a></li>
                <li><a role="menuitem" href="${basePath}services/electronique.html#production">Production</a></li>
                <li><a role="menuitem" href="${basePath}services/electronique.html#qualite">Contrôle qualité</a></li>
            </ul>
        </li>
        <li>
            <a role="menuitem" href="${basePath}services/electrotechnique.html">Électrotechnique</a>
            <ul role="menu" aria-label="Sous-menu">
                <li><a role="menuitem" href="${basePath}services/electrotechnique.html#etude">Étude</a></li>
                <li><a role="menuitem" href="${basePath}services/electrotechnique.html#conception">Conception</a></li>
                <li><a role="menuitem" href="${basePath}services/electrotechnique.html#production">Production</a></li>
                <li><a role="menuitem" href="${basePath}services/electrotechnique.html#qualite">Contrôle qualité</a></li>
                <li><a role="menuitem" href="${basePath}services/electrotechnique.html#installation">Installation/Mise en service</a></li>
            </ul>
        </li>
        <li>
            <a role="menuitem" href="${basePath}services/automatisme.html">Automatisme</a>
            <ul role="menu" aria-label="Sous-menu">
                <li><a role="menuitem" href="${basePath}services/automatisme.html#etude">Étude</a></li>
                <li><a role="menuitem" href="${basePath}services/automatisme.html#conception">Conception</a></li>
                <li><a role="menuitem" href="${basePath}services/automatisme.html#programmation">Programmation</a></li>
                <li><a role="menuitem" href="${basePath}services/automatisme.html#production">Production</a></li>
                <li><a role="menuitem" href="${basePath}services/automatisme.html#qualite">Contrôle qualité</a></li>
                <li><a role="menuitem" href="${basePath}services/automatisme.html#installation">Installation/Mise en service</a></li>
            </ul>
        </li>
        <li>
            <a role="menuitem" href="${basePath}entreprise/a-propos.html">Qui sommes-nous ?</a>
            <ul role="menu" aria-label="Sous-menu">
                <li><a role="menuitem" href="${basePath}entreprise/a-propos.html#histoire">Notre histoire</a></li>
                <li><a role="menuitem" href="${basePath}entreprise/a-propos.html#equipe">Notre équipe</a></li>
            </ul>
        </li>
    </ul>
`;
