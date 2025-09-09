document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu burger
    const nav = document.querySelector('nav');
    const menuButton = document.querySelector('.menu-toggle');

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}); 

const menu = document.getElementById('menu');

menu.innerHTML = `
    <div>
        <a href="index.html">
            <img src="images/logos/logo_complet.png" alt="ERPAC">
        </a>
        <button class="menu-toggle" aria-label="Menu principal">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
    <ul role="menubar" aria-label="Menu principal">
        <li><a role="menuitem" href="index.html">Accueil</a></li>
        <li>
            <a role="menuitem" href="electronique.html">Electronique</a>
            <ul role="menu" aria-label="Sous-menu">
                <li><a role="menuitem" href="electronique.html#etude">Etude</a></li>
                <li><a role="menuitem" href="electronique.html#conception">Conception</a></li>
                <li><a role="menuitem" href="electronique.html#programmation">Programmation électronique/informatique</a></li>
                <li><a role="menuitem" href="electronique.html#production">Production</a></li>
                <li><a role="menuitem" href="electronique.html#qualite">Contrôle qualité</a></li>
            </ul>
        </li>
        <li>
            <a role="menuitem" href="electrotechnique.html">Electrotechnique</a>
            <ul role="menu" aria-label="Sous-menu">
                <li><a role="menuitem" href="electrotechnique.html#etude">Etude</a></li>
                <li><a role="menuitem" href="electrotechnique.html#conception">Conception</a></li>
                <li><a role="menuitem" href="electrotechnique.html#production">Production</a></li>
                <li><a role="menuitem" href="electrotechnique.html#qualite">Contrôle qualité</a></li>
                <li><a role="menuitem" href="electrotechnique.html#installation">Installation/Mise en service</a></li>
            </ul>
        </li>
        <li>
            <a role="menuitem" href="automatisme.html">Automatisme</a>
            <ul role="menu" aria-label="Sous-menu">
                <li><a role="menuitem" href="automatisme.html#etude">Etude</a></li>
                <li><a role="menuitem" href="automatisme.html#conception">Conception</a></li>
                <li><a role="menuitem" href="automatisme.html#programmation">Programmation</a></li>
                <li><a role="menuitem" href="automatisme.html#production">Production</a></li>
                <li><a role="menuitem" href="automatisme.html#qualite">Contrôle qualité</a></li>
                <li><a role="menuitem" href="automatisme.html#installation">Installation/Mise en service</a></li>
            </ul>
        </li>
        <li>
            <a role="menuitem" href="about.html">Qui sommes-nous ?</a>
            <ul role="menu" aria-label="Sous-menu">
                <li><a role="menuitem" href="about.html#histoire">Notre histoire</a></li>
                <li><a role="menuitem" href="about.html#equipe">Notre équipe</a></li>
            </ul>
        </li>
    </ul>
`;
