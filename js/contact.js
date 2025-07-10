const contact = document.getElementById('contact');

contact.innerHTML = `
    <div>
        <div class="coordonnees">
            <h3>Nos Coordonnées</h3>
            <p>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <a id="lien" href="https://www.google.fr/maps/place/ERPAC/@46.9458777,2.9565625,274m/data=!3m1!1e3!4m6!3m5!1s0x47f0680b6c9e0475:0xd054eed2dca9475b!8m2!3d46.9457739!4d2.9562681!16s%2Fg%2F1tdm7nnr?entry=ttu&g_ep=EgoyMDI1MDIxMS4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">49bis Avenue de la République, 18150 La Guerche-sur-l'Aubois</a>
            </p>
            <p>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a id="lien" href="mailto:contact@erpac.fr">contact@erpac.fr</a>
            </p>
            <div id="map"></div>
        </div>
        <div style="display:none">
            <h2>Contactez-Nous</h2>
            <form id="contactForm">
                <div>
                    <input type="text" name="name" placeholder="Votre nom" required>
                </div>
                <div>
                    <input type="email" name="email" placeholder="Votre email" required>
                </div>
                <div>
                    <textarea name="message" placeholder="Votre message" required></textarea>
                </div>
                <button type="submit">
                    Envoyer votre message
                </button>
            </form>
        </div>
    </div>
`;
