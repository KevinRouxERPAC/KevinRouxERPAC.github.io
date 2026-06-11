/* Service Worker ERPAC
   - Pages HTML : network-first (toujours la version la plus récente, cache en secours)
   - Assets statiques : cache-first (rapidité, mise en cache au fil de l'eau) */
const CACHE_NAME = 'erpac-cache-v4';
const PRECACHE = [
  '/',
  '/index.html',
  '/services/electronique.html',
  '/services/electrotechnique.html',
  '/services/automatisme.html',
  '/entreprise/a-propos.html',
  '/legal/mentions-legales.html',
  '/assets/css/site.css',
  '/assets/fonts/inter-latin.woff2',
  '/assets/fonts/inter-latin-ext.woff2',
  '/assets/fonts/space-grotesk-latin.woff2',
  '/assets/fonts/space-grotesk-latin-ext.woff2',
  '/assets/js/menu.js',
  '/assets/js/footer.js',
  '/assets/js/contact.js',
  '/assets/js/ui.js',
  '/assets/js/map.js',
  '/assets/images/logos/logo_complet.png',
  '/assets/images/logos/logo_seul.png',
  '/assets/images/logos/icon-192.png',
  '/assets/images/logos/icon-512.png',
  '/manifest.json'
];

const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hors ligne - ERPAC</title>
  <style>
    body{font-family:system-ui,sans-serif;text-align:center;padding:3rem 1rem;color:#1a241e}
    .box{max-width:420px;margin:0 auto}
    button{background:#008C3A;color:#fff;padding:.7rem 1.4rem;border:none;border-radius:8px;cursor:pointer;margin-top:1rem;font-size:1rem}
  </style>
</head>
<body>
  <div class="box">
    <h1>Vous êtes hors ligne</h1>
    <p>Cette page n'est pas disponible hors connexion. Vérifiez votre accès internet puis réessayez.</p>
    <button onclick="window.location.reload()">Réessayer</button>
  </div>
</body>
</html>`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET' || !request.url.startsWith('http')) return;

  // Ressources tierces (Leaflet, tuiles OSM…) : réseau direct, jamais en cache
  if (new URL(request.url).origin !== self.location.origin) return;

  const isHTML = request.mode === 'navigate' ||
    (request.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    // Network-first : la dernière version, le cache puis une page hors-ligne en secours
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) =>
            cached || new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
          )
        )
    );
    return;
  }

  // Cache-first pour les assets statiques
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
