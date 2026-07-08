# Audit juridique — Site ERPAC (erpac.fr)

**Date** : 7 juillet 2026
**Contexte** : site vitrine B2B, sans vente en ligne, sans formulaire, édité par ERPAC (SAS française). Audit réalisé après la mise en conformité technique du chargement de Google Analytics (consentement préalable effectif).

---

## 1. Mentions légales (LCEN, art. 6-III-1) — quasi conformes

Présents et conformes : dénomination, forme juridique (SAS), capital (154 000 €), SIREN/SIRET, RCS Bourges, code APE, n° TVA intracommunautaire, siège social, téléphone, email, directeur de la publication (Philippe Roux), identité et adresse de l'hébergeur (OVH SAS).

**À corriger :**
- **Numéro de téléphone de l'hébergeur manquant.** L'art. 6-III-1 LCEN exige le nom, la dénomination, l'adresse **et le numéro de téléphone** de l'hébergeur. Ajouter : OVH SAS — +33 9 72 10 10 07.
- **Second hébergeur non déclaré.** Tant que la copie du site reste servie par GitHub Pages (kevinrouxerpac.github.io), GitHub Inc. (États-Unis) est de facto un hébergeur du site, non mentionné. Désactiver GitHub Pages (recommandé, aussi pour la sécurité) ou l'ajouter aux mentions.

## 2. RGPD / politique de confidentialité — bonne base, une incohérence

Présents et conformes : responsable de traitement, données traitées, finalités, destinataires, durées de conservation, droits des personnes, voie de réclamation CNIL, transferts internationaux. Pas de DPO désigné : non obligatoire pour une PME sans traitement à grande échelle.

**À corriger :**
- **Base légale de la mesure d'audience erronée.** La section « Finalités et bases légales » indique *intérêt légitime* pour la mesure d'audience, alors que le site recueille (à juste titre) le **consentement** — seule base valable pour GA4, qui ne remplit pas les critères d'exemption CNIL. Remplacer par : « mesurer l'audience du site (consentement, art. 6(1)(a) RGPD) ».
- **Transfert vers Google.** Le texte invoque les Clauses Contractuelles Types ; Google LLC est certifié au **EU-US Data Privacy Framework** (décision d'adéquation du 10 juillet 2023). Mentionner le DPF en base principale (les CCT pouvant rester en secours) serait plus exact.

**Rappel interne (hors site)** : tenir le registre des traitements (art. 30 RGPD) — obligation documentaire interne, même pour une PME.

## 3. Cookies (art. 82 loi Informatique et Libertés, lignes directrices CNIL)

Conformes : bannière avec « Accepter » et « Refuser » au même niveau, pas de consentement implicite, choix mémorisé 6 mois (durée recommandée CNIL), et — depuis le correctif du 7 juillet 2026 — **aucune requête vers Google avant acceptation**, ce qui rend exacte la déclaration « Sans votre consentement, Google Analytics n'est pas chargé ».

**À améliorer :**
- **Retrait du consentement.** La CNIL exige que retirer son consentement soit aussi simple que le donner. Le texte actuel renvoie à la suppression manuelle des cookies du navigateur : insuffisant. Ajouter un lien « Gérer les cookies » (pied de page) qui rouvre la bannière et supprime les cookies `_ga*` en cas de refus.
- **Durée de vie des cookies GA4.** Par défaut, `_ga` dure 24 mois ; la CNIL recommande 13 mois maximum. Ajouter `cookie_expires: 33696000` (13 mois) dans l'appel `gtag('config', …)`.
- **Liste nominative des traceurs.** Idéalement, lister les cookies déposés (`erpac_cookie_consent` — 6 mois, exempté ; `_ga`, `_ga_F366DB75JE` — mesure d'audience, soumis à consentement) avec leurs durées.

## 4. Propriété intellectuelle et droit à l'image — vérifications internes

- **Logos clients** (SNCF, Stromag, AMADA, Saur, Swisslog, Acticom, Geneol, Genialis, CMD, Bourges Plus ; CAPTRONIC et CRESITT sur la page électronique) : les clients ont donné leur autorisation d'utiliser leur logo comme référence commerciale (confirmé par ERPAC le 7 juillet 2026). ✅ Conforme. Recommandation : conserver ces accords par écrit (email ou clause contractuelle) et retirer un logo si un client venait à retirer son autorisation.
- **Photos d'atelier** : si des salariés sont identifiables, une autorisation écrite de droit à l'image est nécessaire.
- **Organigramme** : s'il contient des noms de salariés, ceux-ci doivent en être informés (art. 13 RGPD) ; privilégier les fonctions sans noms.
- Conformes : attribution OpenStreetMap (ODbL) affichée ; Leaflet (BSD-2) avec entête de licence conservé ; polices Inter et Space Grotesk (SIL OFL) auto-hébergées licitement.

## 5. Obligations non applicables (vérifiées)

- **CGV en ligne** : non requises (aucune vente en ligne).
- **Médiateur de la consommation** : non requis (activité B2B, pas de consommateurs).
- **Accessibilité RGAA / European Accessibility Act** : hors champ (pas de secteur public, pas de e-commerce). Les bonnes pratiques (skip-link, ARIA, `prefers-reduced-motion`) sont néanmoins déjà présentes.
- **Loi Toubon** : site intégralement en français — conforme.
- **Prospection électronique** : aucune collecte d'emails, pas de newsletter — rien à encadrer.

---

## Synthèse

| Point | Gravité | Statut |
|-------|---------|--------|
| Base légale analytics « intérêt légitime » au lieu de « consentement » | Moyenne | ✅ Corrigé le 7 juillet 2026 (mentions légales) |
| Téléphone de l'hébergeur absent | Faible (exigence textuelle LCEN) | ✅ Corrigé — n° OVH ajouté |
| Pas de mécanisme de retrait du consentement sur le site | Moyenne (exigence CNIL) | ✅ Corrigé — lien « Gérer les cookies » au pied de chaque page, suppression des cookies `_ga*` au refus (vérifié en navigateur) |
| Durée de vie `_ga` de 24 mois (> 13 mois recommandés) | Faible | ✅ Corrigé — `cookie_expires: 33696000` dans `analytics-ga4.js` |
| Liste nominative des cookies absente | Faible | ✅ Corrigé — cookies et durées listés dans les mentions légales |
| GitHub Pages = hébergeur non déclaré | Faible | ⚠️ Action manuelle : désactiver GitHub Pages dans les réglages du dépôt |
| Logos clients | Résolu | ✅ Autorisations obtenues (confirmé le 7 juillet 2026) ; conserver les accords par écrit |
| Droit à l'image (photos d'atelier) / organigramme nominatif | À vérifier | ⚠️ Contrôle interne des accords salariés |

Aucun manquement bloquant : le site est globalement licite. Toutes les corrections applicables au code ont été mises en œuvre le 7 juillet 2026 ; restent une action dans les réglages GitHub et des vérifications contractuelles internes.

*Ce document est une analyse technique et documentaire, pas un avis d'avocat.*
