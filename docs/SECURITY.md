# ERPAC - Guide de sécurité du site web

## ✅ Mesures de sécurité en place

### 1. Protection des liens externes
- Tous les liens externes utilisent `rel="noopener noreferrer"` pour prévenir le tabnabbing

### 2. Service Worker sécurisé
- Activation uniquement sur HTTPS
- Validation des requêtes avant mise en cache
- Gestion d'erreurs robuste

### 3. Code JavaScript sécurisé
- Pas d'utilisation de `eval()` ou fonctions dangereuses
- Validation DOM avant manipulation
- Try-catch pour gestion d'erreurs

## ⚠️ Recommandations importantes

### 1. En-têtes de sécurité HTTP (CRITIQUE)

**Problème** : GitHub Pages ne permet pas de configurer des en-têtes HTTP personnalisés.

**Solutions** :
1. **Utiliser Cloudflare (RECOMMANDÉ)** :
   - Gratuit et facile à configurer
   - Ajouter votre domaine à Cloudflare
   - Configurer les règles de page avec les en-têtes du fichier `_headers`
   
2. **Alternative** : Ajouter les meta tags dans le `<head>` de chaque page HTML :

```html
<!-- À ajouter dans TOUTES les pages HTML -->
<head>
    <!-- Sécurité de base -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    
    <!-- Content Security Policy -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com; style-src 'self' 'unsafe-inline' https://unpkg.com; img-src 'self' data: https://*.tile.openstreetmap.org; connect-src 'self' https://*.tile.openstreetmap.org; frame-ancestors 'none';">
</head>
```

### 2. Subresource Integrity (SRI) pour Leaflet

**Problème** : Le CDN Leaflet pourrait être compromis.

**Solution** : Ajouter l'attribut `integrity` aux balises Leaflet :

```html
<!-- Remplacer dans toutes les pages -->
<link rel="stylesheet" 
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin="anonymous" />

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin="anonymous"></script>
```

### 3. Service Worker - Amélioration de la sécurité du cache

**À ajouter dans `sw.js`** :

```javascript
// Définir une durée d'expiration du cache
const CACHE_EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 7 jours

// Ajouter un timestamp lors de la mise en cache
async function addToCache(request, response) {
  const cache = await caches.open(CACHE_NAME);
  const responseWithTimestamp = new Response(response.body, {
    ...response,
    headers: {
      ...response.headers,
      'sw-cache-timestamp': Date.now()
    }
  });
  await cache.put(request, responseWithTimestamp);
}
```

### 4. Correction du chemin d'image dans map.js

**Ligne à corriger** (ligne ~104 de map.js) :
```javascript
// AVANT
<img src='/assets/images/logos/logo_seul.png' ...>

// APRÈS
<img src='assets/images/logos/logo_seul.png' ...>
```

## 🔍 Checklist de sécurité

- [x] Liens externes sécurisés avec noopener noreferrer
- [x] Service Worker activé uniquement en HTTPS
- [x] Pas d'injection de code utilisateur (pas de formulaires)
- [x] Pas d'eval() ou fonctions dangereuses
- [ ] **En-têtes de sécurité HTTP** (à configurer via Cloudflare ou meta tags)
- [ ] **SRI pour Leaflet** (à ajouter)
- [ ] **Expiration du cache du Service Worker** (à améliorer)
- [ ] **Chemin d'image absolu dans map.js** (à corriger)

## 📊 Niveau de risque actuel

- **Critique** : Absence d'en-têtes de sécurité HTTP
- **Moyen** : Pas de SRI sur les dépendances externes
- **Faible** : Chemin d'image potentiellement problématique
- **Très faible** : Cache du Service Worker sans expiration

## 🎯 Priorités d'action

1. **URGENT** : Mettre en place les en-têtes de sécurité (Cloudflare ou meta tags)
2. **Important** : Ajouter SRI aux ressources Leaflet
3. **Recommandé** : Corriger le chemin d'image dans map.js
4. **Nice to have** : Améliorer la gestion du cache du Service Worker

## 📚 Ressources

- [Content Security Policy](https://developer.mozilla.org/fr/docs/Web/HTTP/CSP)
- [Subresource Integrity](https://developer.mozilla.org/fr/docs/Web/Security/Subresource_Integrity)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Guide Cloudflare](https://developers.cloudflare.com/pages/configuration/headers/)
