# ERPAC - Site Web Officiel

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fkevinrouxerpac.github.io)](https://kevinrouxerpac.github.io)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue)](https://kevinrouxerpac.github.io)

## 📋 Description

Site web officiel d'**ERPAC**, expert en conception de cartes électroniques, automatisation et solutions électrotechniques sur mesure depuis plus de 35 ans.

🌐 **Site en ligne** : [kevinrouxerpac.github.io](https://kevinrouxerpac.github.io)

## 🚀 Services

- **Électronique** : Conception et développement de cartes électroniques
- **Électrotechnique** : Solutions d'installation et maintenance électrique
- **Automatisme** : Systèmes d'automatisation industrielle

## 🛠️ Technologies utilisées

- **Frontend** : HTML5, CSS3, JavaScript (Vanilla)
- **Design system** : feuille de styles unique (`assets/css/site.css`)
- **Typographie** : Space Grotesk + Inter, **auto-hébergées** (woff2, aucun service tiers)
- **Responsive Design** : Design adaptatif, menu burger sous 900px
- **Animations** : transitions CSS + apparition au défilement (IntersectionObserver)
- **Composants partagés** : en-tête, pied de page et contact injectés en JS
- **Cartes interactives** : Leaflet.js
- **PWA** : Progressive Web App avec manifest.json + Service Worker
- **SEO Optimisé** : Meta tags, Open Graph, sitemap, robots.txt

## 📁 Structure du projet

```
.
├── index.html                      # Page d'accueil
├── services/
│   ├── electronique.html           # Services électronique
│   ├── electrotechnique.html       # Services électrotechnique
│   └── automatisme.html            # Services automatisme
├── entreprise/
│   └── a-propos.html               # Qui sommes-nous / Histoire
├── legal/
│   └── mentions-legales.html       # Mentions légales (RGPD)
├── 404.html                        # Page d'erreur personnalisée
├── robots.txt                      # Configuration SEO robots
├── sitemap.xml                     # Plan du site XML
├── manifest.json                   # Manifest PWA
├── sw.js                           # Service Worker (cache hors-ligne)
└── assets/
    ├── css/
    │   └── site.css                # Design system unique (refonte v2)
    ├── fonts/                      # Polices auto-hébergées (woff2)
    │   ├── inter-latin.woff2
    │   ├── inter-latin-ext.woff2
    │   ├── space-grotesk-latin.woff2
    │   └── space-grotesk-latin-ext.woff2
    ├── js/
    │   ├── menu.js                 # En-tête / navigation (injecté)
    │   ├── footer.js               # Pied de page (injecté)
    │   ├── contact.js              # Section contact + carte (injecté)
    │   ├── ui.js                   # Interactions (scroll, burger, reveal…)
    │   └── map.js                  # Carte interactive Leaflet
    └── images/
        ├── logos/                  # Logos ERPAC et partenaires
        ├── menus/                  # Images des sections
        ├── About/                  # Images page à propos
        ├── Automatisme/            # Images section automatisme
        ├── Electronique/           # Images section électronique
        ├── Electrotechnique/       # Images section électrotechnique
        └── locaux/                 # Photos des locaux
```

## 🚦 Installation et développement local

### Prérequis
- Un serveur web local (ex: Live Server VS Code, Python http.server, etc.)

### Installation
```bash
# Cloner le repository
git clone https://github.com/KevinRouxERPAC/KevinRouxERPAC.github.io.git

# Se déplacer dans le dossier
cd KevinRouxERPAC.github.io

# Lancer un serveur local (exemple avec Python)
python -m http.server 8000

# Ou avec Node.js
npx serve .

# Ou utiliser Live Server dans VS Code
```

## 📱 Progressive Web App (PWA)

Le site est configuré comme une PWA avec :
- ✅ Manifest.json configuré
- ✅ Icônes pour différentes plateformes
- ✅ Mode standalone sur mobile
- ✅ Service Worker (`sw.js`) : cache hors-ligne, activé en HTTPS uniquement

## 🔍 SEO et Performance

### Optimisations SEO
- ✅ Meta tags Open Graph et Twitter Cards
- ✅ Sitemap XML (maintenu manuellement : penser à mettre à jour `lastmod`)
- ✅ Robots.txt configuré
- ✅ Structure HTML sémantique
- ✅ URLs propres et descriptives

### Performance
- ✅ Préchargement des polices et de l'image hero
- ✅ Images optimisées (recompression JPEG/WebP, ≤ 1920px de large)
- ✅ Lazy loading (`loading="lazy"`) sur toutes les images sous la ligne de flottaison
- ✅ Cache navigateur configuré côté OVH via `.htaccess`

## 🚀 Déploiement

Le site est déployé sur **deux cibles** :

1. **OVH** : hébergement de production sur le domaine canonique
   **`https://erpac.fr`**. Les balises `canonical`, `og:url`, `og:image`,
   le `sitemap.xml` et `robots.txt` pointent tous vers ce domaine.
2. **GitHub Pages** : publication automatique de la branche `main` sur
   `https://kevinrouxerpac.github.io` (miroir). Le `canonical` vers `erpac.fr`
   indique aux moteurs de ne pas indexer ce miroir en doublon.

Le workflow [`deploy.yml`](../.github/workflows/deploy.yml) pousse le contenu
vers l'hébergement OVH à chaque push sur `main`.

### 🔄 Cache et fraîcheur du design après déploiement

Pour éviter que les visiteurs récurrents restent bloqués sur l'ancien design :

- **Service Worker** (`sw.js`) : les assets CSS/JS sont servis en
  **stale-while-revalidate** (réponse immédiate depuis le cache + récupération
  d'une version fraîche en arrière-plan). La mise à jour est appliquée au
  chargement suivant, **sans versionner chaque fichier**.
- **`.htaccess` (OVH)** : cache court (1 jour) pour HTML/CSS/JS afin que la
  revalidation du SW obtienne bien les octets à jour ; cache long pour
  polices/images (rarement modifiées).
- **Purge forcée** : pour invalider immédiatement tous les caches (changement
  majeur), **bumper `CACHE_NAME`** dans `sw.js` (`erpac-cache-v5` → `v6`). Le
  handler `activate` supprime alors tous les anciens caches.

## 🤝 Contribution

### Branches
- `main` : version de production (déclenche les déploiements)
- branches de travail (ex. `refonte-design-v2`) fusionnées via Pull Request

## 📞 Contact

**ERPAC**
- 📧 Email : [contact@erpac.fr](mailto:contact@erpac.fr)
- ☎️ Téléphone : 02 48 77 52 10
- 🌐 Site web : [erpac.fr](https://erpac.fr)
- 📍 Adresse : 49bis Avenue de la République, 18150 La Guerche-sur-l'Aubois

## 📄 License

Ce projet est sous licence propriétaire ERPAC. Tous droits réservés.

## 🔄 Historique des versions

Voir [CHANGELOG.md](CHANGELOG.md) pour l'historique détaillé des modifications.

---

---

## 🔒 Guide de sécurité

### ✅ Mesures de sécurité en place

#### 1. Protection des liens externes
- Tous les liens externes utilisent `rel="noopener noreferrer"` pour prévenir le tabnabbing

#### 2. Service Worker sécurisé
- Activation uniquement sur HTTPS
- Validation des requêtes avant mise en cache
- Gestion d'erreurs robuste

#### 3. Code JavaScript sécurisé
- Pas d'utilisation de `eval()` ou fonctions dangereuses
- Validation DOM avant manipulation
- Try-catch pour gestion d'erreurs

#### 4. En-têtes de sécurité HTTP
Deux niveaux complémentaires :

1. **`.htaccess` (hébergement OVH)** — les vrais en-têtes HTTP : CSP complète,
   `X-Frame-Options` / `frame-ancestors` (protection clickjacking, possible
   **uniquement** en en-tête HTTP, jamais en meta), `X-Content-Type-Options`,
   `Referrer-Policy`, `Permissions-Policy`, HSTS, redirection HTTPS,
   cache navigateur et compression.
2. **Meta tags dans le `<head>`** — filet de sécurité pour GitHub Pages
   (qui ne permet pas d'en-têtes personnalisés) :
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://unpkg.com; style-src 'self' 'unsafe-inline' https://unpkg.com; img-src 'self' data: https://*.tile.openstreetmap.org https://*.openstreetmap.org https://unpkg.com; font-src 'self'; connect-src 'self' https://*.tile.openstreetmap.org; base-uri 'self'; form-action 'self';">
```

> `connect-src` n'inclut **plus** `https://unpkg.com` : Leaflet est chargé via `script-src`/`style-src` et n'émet aucune requête `fetch`/`XHR` vers le CDN. Seules les tuiles OpenStreetMap sont contactées.

> `script-src` n'autorise **plus** `'unsafe-inline'` : tout le JavaScript est dans des fichiers externes (aucun script inline ni gestionnaire `onclick`/`onerror`). `style-src` conserve `'unsafe-inline'` (attributs `style` et styles injectés par map.js).
>
> Les meta `X-Frame-Options`, `X-XSS-Protection` (obsolète) et `frame-ancestors` ont été retirés des pages : ignorés par les navigateurs en balise meta, ils sont gérés dans `.htaccess`.
>
> Les polices étant auto-hébergées, `font-src` reste sur `'self'` : aucune connexion à un service de polices tiers (ex. Google Fonts).

#### 5. Subresource Integrity (SRI) pour Leaflet
- Vérification d'intégrité des ressources externes CDN
- Protection contre la compromission des dépendances

### 🔍 Checklist de sécurité

- [x] Liens externes sécurisés avec noopener noreferrer
- [x] Service Worker activé uniquement en HTTPS
- [x] Pas d'injection de code utilisateur
- [x] Pas d'eval() ou fonctions dangereuses
- [x] CSP sans `unsafe-inline` pour les scripts
- [x] En-têtes HTTP natifs via `.htaccess` (OVH)
- [x] SRI pour Leaflet
- [ ] **HSTS Preload** (optionnel, quand erpac.fr sera en service)

### 📊 Niveau de sécurité actuel

- **Score** : 8.5/10
- **Critique** : ✅ Résolu
- **Important** : ✅ Résolu
- **Recommandé** : 🔄 À améliorer (Cloudflare)

---

## ✅ Checklist de déploiement

### Avant de déployer sur GitHub Pages

#### 1. Tests locaux
- [ ] Ouvrir `index.html` dans un navigateur
- [ ] Vérifier que toutes les pages se chargent sans erreur
- [ ] Ouvrir la Console Développeur (F12)
- [ ] Vérifier qu'il n'y a **pas d'erreurs rouges** dans la console
- [ ] Vérifier que la carte Leaflet s'affiche correctement
- [ ] Tester la navigation entre les pages
- [ ] Vérifier le défilement des logos partenaires
- [ ] Vérifier le scroll smooth et l'apparition des sections

#### 2. Vérification des erreurs CSP
Si erreurs CSP dans la console :
- Ajuster la CSP dans les balises `<meta http-equiv="Content-Security-Policy">`
- Ajouter les sources manquantes aux directives appropriées

#### 3. Commit et Push
```powershell
git status
git add .
git commit -m "feat: mise à jour du site"
git push origin main
```

### Après le déploiement (2-5 minutes)

#### Tests en production
- [ ] Visiter https://kevinrouxerpac.github.io/
- [ ] Navigation : Tester tous les liens
- [ ] Carte : Vérifier Leaflet
- [ ] Contact : Vérifier les coordonnées
- [ ] Mobile : Tester le responsive

#### Tests de sécurité (Console Développeur)
- [ ] F12 > Console : Aucune erreur
- [ ] F12 > Network : Leaflet se charge correctement
- [ ] F12 > Application > Service Workers : Enregistrement OK

#### Outils de test en ligne

| Outil | URL | Attendu |
|-------|-----|---------|
| Security Headers | https://securityheaders.com | Note A ou B |
| Mozilla Observatory | https://observatory.mozilla.org | Score 70+ / 100 |
| CSP Evaluator | https://csp-evaluator.withgoogle.com | Avertissements acceptables |
| SSL Labs | https://www.ssllabs.com/ssltest/ | Grade A (GitHub) |

### Résolution des problèmes

#### Erreurs CSP dans la console
1. Noter l'URL ou le type de ressource bloqué
2. Ajouter la source à la CSP appropriée
3. Redéployer et tester

#### Carte Leaflet ne s'affiche pas
1. Ouvrir F12 > Console
2. Chercher l'erreur spécifique
3. Si "Failed to find a valid digest" : Vérifier le hash SRI
4. Régénérer sur https://www.srihash.org/ si nécessaire

#### Service Worker ne s'enregistre pas
1. Vérifier que `sw.js` est accessible
2. Vérifier la console pour l'erreur exacte
3. Vérifier les paramètres du navigateur (Confidentialité)

### Monitoring continu

**Hebdomadaire**
- Vérifier Google Search Console pour alertes
- Surveiller les erreurs JavaScript

**Mensuel**
- Relancer un scan sur SecurityHeaders.com
- Vérifier les mises à jour de Leaflet
- Régénérer les hashes SRI si mise à jour

**Trimestriel**
- Audit de sécurité complet
- Revue de la CSP
- Test de pénétration basique

---

## 📝 Historique des versions

Voir [CHANGELOG.md](CHANGELOG.md) pour l'historique détaillé.

---

⚡ **Fait avec ❤️ par l'équipe ERPAC** ⚡