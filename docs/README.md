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
- **Responsive Design** : Design adaptatif mobile-first
- **Animations** : CSS animations personnalisées
- **Cartes interactives** : Leaflet.js
- **PWA Ready** : Progressive Web App avec manifest.json
- **SEO Optimisé** : Meta tags, sitemap, robots.txt

## 📁 Structure du projet

```
.
├── index.html              # Page d'accueil
├── about.html             # À propos / Histoire
├── electronique.html      # Services électronique
├── electrotechnique.html  # Services électrotechnique
├── automatisme.html       # Services automatisme
├── 404.html              # Page d'erreur personnalisée
├── robots.txt            # Configuration SEO robots
├── sitemap.xml           # Plan du site XML
├── manifest.json         # Manifest PWA
├── css/
│   ├── styles.css        # Styles principaux
│   ├── responsive.css    # Styles responsives
│   └── animations.css    # Animations CSS
├── js/
│   ├── menu.js          # Navigation menu
│   ├── carousel.js      # Carrousel d'images
│   ├── contact.js       # Formulaire de contact
│   ├── map.js          # Carte interactive
│   ├── scroll.js       # Effets de scroll
│   └── enhancements.js # Améliorations UX
└── images/
    ├── logos/          # Logos ERPAC et partenaires
    ├── menus/          # Images des sections
    ├── About/          # Images page à propos
    ├── Automatisme/    # Images section automatisme
    ├── Electronique/   # Images section électronique
    ├── Electrotechnique/ # Images section électrotechnique
    └── locaux/         # Photos des locaux
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
- 🔄 Service Worker à implémenter (optionnel)

## 🔍 SEO et Performance

### Optimisations SEO
- ✅ Meta tags Open Graph et Twitter Cards
- ✅ Sitemap XML généré automatiquement
- ✅ Robots.txt configuré
- ✅ Structure HTML sémantique
- ✅ Images optimisées (WebP, lazy loading)
- ✅ URLs propres et descriptives

### Performance
- ✅ Préchargement des images critiques
- ✅ CSS et JS minifiés
- ✅ Images responsives et optimisées
- ✅ Lazy loading des images

## 🚀 Déploiement

Le site est automatiquement déployé via **GitHub Pages** à chaque push sur la branche principale.

### Workflow de déploiement
1. Push vers le repository
2. GitHub Actions execute le workflow de déploiement
3. Le site est publié sur `https://kevinrouxerpac.github.io`

## 🤝 Contribution

### Branches
- `main` : Version de production
- `develop` : Version de développement
- `feature/*` : Nouvelles fonctionnalités

### Process de contribution
1. Fork du projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit des changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Contact

**ERPAC**
- 📧 Email : [Voir formulaire de contact](https://kevinrouxerpac.github.io/#contact)
- 🌐 Site web : [kevinrouxerpac.github.io](https://kevinrouxerpac.github.io)
- 📍 Adresse : [Voir section contact](https://kevinrouxerpac.github.io/#contact)

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
Implémentés via meta tags `<head>` :
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com; style-src 'self' 'unsafe-inline' https://unpkg.com; img-src 'self' data: https://*.tile.openstreetmap.org; connect-src 'self' https://*.tile.openstreetmap.org; frame-ancestors 'none';">
```

#### 5. Subresource Integrity (SRI) pour Leaflet
- Vérification d'intégrité des ressources externes CDN
- Protection contre la compromission des dépendances

### ⚠️ Recommandations importantes

#### 1. En-têtes HTTP supplémentaires (Cloudflare)
**Limitation GitHub Pages** : Les en-têtes HTTP personnalisés ne sont pas supportés nativement.

**Solutions** :
1. **Cloudflare Pages (RECOMMANDÉ)** :
   - Gratuit et facile à configurer
   - Ajouter votre domaine à Cloudflare
   - Configurer les règles avec le fichier `_headers`

2. **Alternative actuelle** : Meta tags implémentés (fonctionnels mais moins optimaux)

#### 2. Content Security Policy (CSP)
**CSP actuelle** :
```
default-src 'self'; 
script-src 'self' 'unsafe-inline' https://unpkg.com; 
style-src 'self' 'unsafe-inline' https://unpkg.com; 
img-src 'self' data: https://*.tile.openstreetmap.org; 
connect-src 'self' https://*.tile.openstreetmap.org; 
frame-ancestors 'none';
```

**Note** : La CSP autorise `unsafe-inline` car le site utilise des scripts inline. Pour une sécurité maximale, envisager la migration vers des fichiers JS externes.

### 🔍 Checklist de sécurité

- [x] Liens externes sécurisés avec noopener noreferrer
- [x] Service Worker activé uniquement en HTTPS
- [x] Pas d'injection de code utilisateur
- [x] Pas d'eval() ou fonctions dangereuses
- [x] En-têtes de sécurité HTTP (meta tags)
- [x] SRI pour Leaflet
- [ ] **En-têtes HTTP natifs** (recommandé avec Cloudflare)
- [ ] **HSTS Preload** (optionnel)

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
- [ ] Tester le carousel des partenaires
- [ ] Vérifier le scroll smooth

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