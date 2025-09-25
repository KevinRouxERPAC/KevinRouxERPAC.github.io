const footer = document.getElementById("footer");

// Détection de la page actuelle pour ajuster les chemins
const currentPath = window.location.pathname;
const isInSubfolder = currentPath.includes('/services/') || currentPath.includes('/entreprise/') || currentPath.includes('/legal/');
const basePath = isInSubfolder ? '../' : '';

footer.innerHTML = `
    <div class="footer-content">
        <p>&copy; 2025 ERPAC. Tous droits réservés.</p>
        <div class="footer-links">
            <a href="${basePath}legal/mentions-legales.html">Mentions légales</a>
            <span class="separator">|</span>
            <a href="${basePath}legal/politique-confidentialite.html">Politique de confidentialité</a>
        </div>
    </div>
`;