// Service Worker pour ERPAC - Version basique PWA
const CACHE_NAME = 'erpac-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/services/electronique.html',
  '/services/electrotechnique.html',
  '/services/automatisme.html',
  '/entreprise/a-propos.html',
  '/legal/mentions-legales.html',
  '/assets/css/styles.css',
  '/assets/css/responsive.css',
  '/assets/css/animations.css',
  '/assets/css/footer-legal.css',
  '/assets/js/menu.js',
  '/assets/js/scroll.js',
  '/assets/js/carousel.js',
  '/assets/js/contact.js',
  '/assets/js/enhancements.js',
  '/assets/js/map.js',
  '/assets/images/logos/logo_complet.png',
  '/assets/images/logos/logo_seul.png',
  '/assets/images/locaux/Locaux.jpg',
  '/manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installation en cours...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Cache ouvert');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Tous les fichiers sont en cache');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Erreur lors de la mise en cache:', error);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activation en cours...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation terminée');
      return self.clients.claim();
    })
  );
});

// Stratégie de cache: Cache First avec fallback réseau
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non-HTTP/HTTPS
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // Ignorer les requêtes vers des APIs externes
  if (event.request.url.includes('leaflet') || 
      event.request.url.includes('unpkg.com')) {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourne la ressource du cache si elle existe
        if (response) {
          console.log('Service Worker: Ressource servie depuis le cache:', event.request.url);
          return response;
        }

        // Sinon, va chercher sur le réseau
        console.log('Service Worker: Récupération depuis le réseau:', event.request.url);
        return fetch(event.request).then((response) => {
          // Vérifie si la réponse est valide
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone la réponse car elle ne peut être utilisée qu'une fois
          const responseToCache = response.clone();

          // Ajoute la nouvelle réponse au cache pour les futures requêtes
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch((error) => {
          console.error('Service Worker: Erreur réseau:', error);
          
          // Retourne une page offline basique pour les pages HTML
          if (event.request.headers.get('accept').includes('text/html')) {
            return new Response(`
              <!DOCTYPE html>
              <html lang="fr">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Hors ligne - ERPAC</title>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          text-align: center;
                          padding: 2rem;
                          color: #333;
                      }
                      .offline-message {
                          max-width: 400px;
                          margin: 0 auto;
                      }
                      .retry-button {
                          background: #008C3A;
                          color: white;
                          padding: 10px 20px;
                          border: none;
                          border-radius: 5px;
                          cursor: pointer;
                          margin-top: 1rem;
                      }
                  </style>
              </head>
              <body>
                  <div class="offline-message">
                      <h1>🔌 Vous êtes hors ligne</h1>
                      <p>Cette page n'est pas disponible hors ligne. Vérifiez votre connexion internet et réessayez.</p>
                      <button class="retry-button" onclick="window.location.reload()">
                          Réessayer
                      </button>
                  </div>
              </body>
              </html>
            `, {
              headers: { 'Content-Type': 'text/html' }
            });
          }
        });
      })
  );
});

// Gestion des mises à jour du Service Worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker ERPAC: Script chargé');