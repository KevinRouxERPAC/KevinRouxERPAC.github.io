# ✅ Checklist de Déploiement Post-Sécurisation

## Avant de déployer sur GitHub Pages

### 1. Tests locaux
- [ ] Ouvrir `index.html` dans un navigateur
- [ ] Vérifier que toutes les pages se chargent sans erreur
- [ ] Ouvrir la Console Développeur (F12)
- [ ] Vérifier qu'il n'y a **pas d'erreurs rouges** dans la console
- [ ] Vérifier que la carte Leaflet s'affiche correctement
- [ ] Tester la navigation entre les pages
- [ ] Tester le carousel des partenaires
- [ ] Vérifier le scroll smooth

### 2. Vérification des erreurs CSP
Si vous voyez des erreurs CSP dans la console :

**Type d'erreur** : `Refused to load the script... because it violates the following Content Security Policy directive`

**Solution** : Ajustez la CSP dans les balises `<meta http-equiv="Content-Security-Policy">` de chaque page HTML.

**CSP actuelle** :
```
default-src 'self'; 
script-src 'self' 'unsafe-inline' https://unpkg.com; 
style-src 'self' 'unsafe-inline' https://unpkg.com; 
img-src 'self' data: https://*.tile.openstreetmap.org https://*.openstreetmap.org; 
font-src 'self'; 
connect-src 'self' https://*.tile.openstreetmap.org; 
frame-ancestors 'none'; 
base-uri 'self'; 
form-action 'self';
```

### 3. Commit et Push vers GitHub

```powershell
# Vérifier les fichiers modifiés
git status

# Ajouter tous les fichiers modifiés
git add .

# Créer un commit avec un message descriptif
git commit -m "Sécurité: Ajout des en-têtes de sécurité et SRI pour Leaflet"

# Pousser vers GitHub
git push origin main
```

---

## Après le déploiement sur GitHub Pages

### 4. Tests en production

**Attendre 2-5 minutes** que GitHub Pages déploie les changements.

#### A. Test de fonctionnalité
- [ ] Visiter https://kevinrouxerpac.github.io/
- [ ] Navigation : Tester tous les liens du menu
- [ ] Carte : Vérifier que la carte Leaflet fonctionne
- [ ] Contact : Vérifier les coordonnées et la carte
- [ ] Carousel : Vérifier le défilement des logos partenaires
- [ ] Mobile : Tester sur mobile (menu burger, responsivité)

#### B. Test de sécurité (Console Développeur)
- [ ] Ouvrir F12 (Console Développeur)
- [ ] Onglet "Console" : vérifier qu'il n'y a pas d'erreurs
- [ ] Onglet "Network" : vérifier que Leaflet se charge avec le bon hash
- [ ] Onglet "Application" > "Service Workers" : vérifier l'enregistrement du SW

#### C. Outils de test en ligne

1. **Security Headers** (Critique)
   - Aller sur https://securityheaders.com
   - Entrer : `https://kevinrouxerpac.github.io/`
   - **Attendu** : Note A ou B
   - Si inférieur : voir section "Résolution des problèmes"

2. **Mozilla Observatory** (Recommandé)
   - Aller sur https://observatory.mozilla.org
   - Entrer : `https://kevinrouxerpac.github.io/`
   - **Attendu** : Score 70+ / 100
   - Analyser les recommandations

3. **CSP Evaluator** (Optionnel)
   - Aller sur https://csp-evaluator.withgoogle.com
   - Copier la CSP depuis le code source
   - **Attendu** : Avertissements sur 'unsafe-inline' (acceptable)

4. **SSL Labs** (Optionnel)
   - Aller sur https://www.ssllabs.com/ssltest/
   - Entrer : `kevinrouxerpac.github.io`
   - **Attendu** : Grade A (géré par GitHub)

---

## Résolution des problèmes

### Problème 1 : Erreurs CSP dans la console

**Symptôme** : Messages d'erreur "Refused to load..."

**Solution** :
1. Noter l'URL ou le type de ressource bloqué
2. Ajouter la source à la CSP appropriée :
   - Scripts : Ajouter à `script-src`
   - Styles : Ajouter à `style-src`
   - Images : Ajouter à `img-src`
   - Connexions : Ajouter à `connect-src`

**Exemple** : Si `https://example.com/script.js` est bloqué
```html
script-src 'self' 'unsafe-inline' https://unpkg.com https://example.com;
```

### Problème 2 : La carte Leaflet ne s'affiche pas

**Causes possibles** :
1. Hash SRI incorrect
2. Version de Leaflet différente
3. Erreur CSP

**Solution** :
1. Ouvrir la console (F12)
2. Chercher l'erreur spécifique
3. Si "Failed to find a valid digest" :
   - Vérifier la version de Leaflet (doit être 1.9.4)
   - Régénérer le hash sur https://www.srihash.org/

### Problème 3 : Service Worker ne s'enregistre pas

**Symptôme** : Message "Service Worker registration failed" dans la console

**Causes** :
- GitHub Pages utilise HTTPS ✅ (OK)
- Erreur dans `sw.js`

**Solution** :
1. Vérifier que `sw.js` est accessible : https://kevinrouxerpac.github.io/sw.js
2. Vérifier la console pour l'erreur exacte
3. Le SW peut être désactivé dans les paramètres du navigateur (Paramètres > Confidentialité)

### Problème 4 : Score SecurityHeaders.com inférieur à B

**Note C ou D** : 

Cela peut être dû au fait que GitHub Pages ne permet pas d'ajouter des en-têtes HTTP personnalisés de manière native.

**Solutions** :

1. **Solution immédiate** : Les meta tags sont en place, c'est suffisant pour une bonne protection
2. **Solution optimale** : Migrer vers Cloudflare Pages (voir `_headers` pour la config)

**Important** : Les meta tags CSP fonctionnent et protègent le site, même si le score est moindre.

---

## Monitoring continu

### Hebdomadaire
- [ ] Vérifier Google Search Console pour alertes de sécurité
- [ ] Surveiller les erreurs JavaScript (si Google Analytics configuré)

### Mensuel
- [ ] Relancer un scan sur SecurityHeaders.com
- [ ] Vérifier les mises à jour de Leaflet
- [ ] Si nouvelle version : Régénérer les hashes SRI

### Trimestriel
- [ ] Audit de sécurité complet
- [ ] Revue de la CSP (ajustements si nécessaires)
- [ ] Test de pénétration basique

---

## 🚀 Actions post-déploiement recommandées

### 1. Créer un fichier CHANGELOG.md
Documenter les changements de sécurité pour l'équipe.

### 2. Configurer Google Search Console
- Ajouter le site à Search Console
- Vérifier la propriété
- Soumettre le sitemap

### 3. Mettre à jour la documentation interne
Informer l'équipe des nouvelles pratiques de sécurité.

### 4. Planifier les prochaines améliorations
- Considérer Cloudflare Pages
- Envisager la migration des scripts inline
- Planifier l'audit de sécurité Q1 2026

---

## ✅ Validation finale

Une fois tous les tests passés :

```
✅ Site fonctionnel en production
✅ Aucune erreur dans la console
✅ Carte Leaflet opérationnelle
✅ Service Worker enregistré
✅ Score SecurityHeaders.com satisfaisant
✅ Navigation fluide
✅ Version mobile testée
```

**🎉 Déploiement réussi ! Le site est maintenant sécurisé et opérationnel.**

---

**Checklist créée le** : 27 octobre 2025  
**Dernière mise à jour** : 27 octobre 2025  
**Version** : 1.0
