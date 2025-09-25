const footer = document.getElementById("footer");

// Détection de la page actuelle pour ajuster les chemins
const footerCurrentPath = window.location.pathname;
const footerIsInSubfolder = footerCurrentPath.includes('/services/') || footerCurrentPath.includes('/entreprise/') || footerCurrentPath.includes('/legal/');
const footerBasePath = footerIsInSubfolder ? '../' : '';

footer.innerHTML = `
    <div class="footer-content">
        <p>&copy; 2025 ERPAC. Tous droits réservés.</p>
        <div class="footer-links">
            <a href="${footerBasePath}legal/mentions-legales.html">Mentions légales</a>
        </div>
    </div>
`;