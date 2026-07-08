# Rapport d'audit de sécurité — Site ERPAC

**Date** : 7 juillet 2026
**Portée** : code du dépôt + vérifications en production (erpac.fr, kevinrouxerpac.github.io)
**Note** : ce dossier `docs/` est exclu du déploiement FTP et n'est plus publié sur le site.

---

## Constats et corrections

| # | Constat | Gravité | Statut |
|---|---------|---------|--------|
| 1 | Listing des répertoires Apache activé (`/docs/`, `/assets/`… navigables) | Moyenne | ✅ Corrigé — `Options -Indexes` + blocage des fichiers cachés dans `.htaccess` |
| 2 | Déploiement en FTP non chiffré (mot de passe en clair à chaque push) | Moyenne | ⚠️ Partiel — FTPS testé mais **non supporté par l'endpoint OVH** (`AUTH TLS` → « 500 not implemented », port 990 fermé). Transport laissé en FTP simple. Alternative chiffrée = SFTP (port 22 ouvert) : évolution à prévoir (action SFTP + test identifiants) |
| 3 | Fichiers internes publiés sur le site (`docs/`, `.claude/`) | Moyenne/faible | ✅ Corrigé — `exclude` dans `deploy.yml` ; suppression du serveur au prochain déploiement |
| 4 | GA4 (`gtag.js`) chargé avant tout consentement — pings envoyés à Google même après refus (non conforme CNIL) | Moyenne (juridique) | ✅ Corrigé — chargement dynamique uniquement après consentement « accepted » (`analytics-ga4.js`) |
| 5 | Copie du site servie sur kevinrouxerpac.github.io sans en-têtes HTTP de sécurité (clickjacking possible sur cette copie, contenu dupliqué) | Faible | ⚠️ Action manuelle : désactiver GitHub Pages dans les réglages du dépôt (ou renommer le dépôt) |
| 6 | Cookie de consentement sans attribut `Secure` | Faible | ✅ Corrigé — `cookie-consent.js` |

### Points informatifs (sans action)
- Les meta `http-equiv="X-Content-Type-Options"` sont sans effet (en-tête HTTP uniquement) ; le vrai en-tête est envoyé par Apache/OVH.
- HSTS sans directive `preload` : possible d'inscrire erpac.fr sur hstspreload.org (optionnel).
- Email `contact@erpac.fr` en clair dans le HTML : récoltable par les spammeurs (choix assumé).

---

## Protections vérifiées en production (erpac.fr)

- Redirection 301 HTTP → HTTPS ; HSTS `max-age=31536000; includeSubDomains`
- `Content-Security-Policy` complète avec `frame-ancestors 'none'` ; `script-src` sans `unsafe-inline`
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`
- CSP en meta présente sur les 7 pages (filet de sécurité si les en-têtes serveur disparaissent)

## Bonnes pratiques en place dans le code

- Leaflet 1.9.4 auto-hébergé (`assets/vendor/`) : plus de dépendance CDN, plus besoin de SRI
- Tous les liens `target="_blank"` portent `rel="noopener noreferrer"` (vérifié par recherche globale)
- Aucun secret dans le dépôt ; mot de passe FTP uniquement en secret GitHub Actions
- Aucun formulaire, aucun `eval`/`innerHTML` alimenté par une entrée utilisateur
- Service worker : requêtes GET même-origine uniquement, HTML en network-first
- Consentement cookies : refus aussi simple que l'acceptation, choix conservé 6 mois

## Vérifications recommandées après le prochain déploiement

1. Le site répond toujours (si erreur 500 : remplacer `Options -Indexes` par `IndexIgnore *` dans `.htaccess`)
2. `https://erpac.fr/docs/` et `https://erpac.fr/assets/` renvoient 403/404 (plus de listing)
3. `https://erpac.fr/docs/SECURITY_AUDIT_REPORT.md` et `/.claude/launch.json` renvoient 404
4. Le déploiement GitHub Actions passe en FTPS sans erreur
5. Aucune requête vers `googletagmanager.com` avant acceptation des cookies (onglet Réseau)

---

*Audit précédent : 27 octobre 2025 (obsolète — décrivait le CDN unpkg et Matomo, remplacés depuis).*
