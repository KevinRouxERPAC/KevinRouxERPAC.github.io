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

⚡ **Fait avec ❤️ par l'équipe ERPAC** ⚡