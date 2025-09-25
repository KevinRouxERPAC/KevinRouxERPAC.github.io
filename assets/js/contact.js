const contact = document.getElementById('contact');

contact.innerHTML = `
    <h2>Contactez-nous</h2>
    <div class="contact-container">
        <!-- Colonne gauche - Informations -->
        <div class="coordonnees">
            <h3>Nos Coordonnées</h3>
            
            <!-- Adresse -->
            <p>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <a href="https://maps.app.goo.gl/2FpqzK65qxJQTCoP9" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   aria-label="Voir notre adresse sur Google Maps">
                   49bis Avenue de la République<br>18150 La Guerche-sur-l'Aubois
                </a>
            </p>
            
            <!-- Téléphone -->
            <p>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:+33248775210" aria-label="Appeler ERPAC">02 48 77 52 10</a>
            </p>
            
            <!-- Email -->
            <p>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"/>
                    <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:contact@erpac.fr" aria-label="Envoyer un email à ERPAC">contact@erpac.fr</a>
            </p>
            
            <!-- Horaires -->
            <div class="horaires">
                <h4>Horaires d'ouverture</h4>
                <p>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    Lundi - Vendredi : 6h00 - 13h00 (horaires atelier)
                </p>
            </div>
        </div>
        
        <!-- Colonne droite - Carte -->
        <div class="map-container">
            <div id="map" role="img" aria-label="Carte de localisation d'ERPAC"></div>
        </div>
    </div>
`;
