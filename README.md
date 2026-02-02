# 📅 Mini application de réservation d'événements

**Assigné par :** Zakaria Ziane  
**créé :** 01/02/26

Application web  qui permettant de gérer des événements et leurs réservations, avec une gestion rigoureuse des rôles, de la sécurité, de la qualité logicielle et de l'industrialisation.


## 🎯 Situation professionnelle

Création d'une application MERN Fullstack

### Besoin visé ou problème rencontré

Dans le contexte web actuel, on recherche des solutions pour développer des applications web performantes et intuitives. Celles-ci doivent être à la fois simples à administrer et à déployer. Comment peut-on allier efficacement le rendu côté serveur, propre à la logique traditionnelle, à la flexibilité et la réactivité offertes par JavaScript et Node.js? La stack MERN, combinant MongoDB, Express.js, React.js et Node.js, semble être une réponse prometteuse à ce défi.


## 📋 Compétences visées

- **C01.** Planifier le travail à effectuer individuellement: niveau 2, adapter
- **C02.** Contribuer au pilotage de l'organisation du travail individuel et collectif: niveau 2, adapter
- **C03.** Définir le périmètre d'un problème rencontré en adoptant une démarche inductive: niveau 2, adapter
- **C04.** Rechercher de façon méthodique une ou des solutions au problème rencontré: niveau 2, adapter
- **C05.** Partager la solution adoptée en utilisant les moyens de partage de connaissance ou de documentation disponibles: niveau 2, adapter
- **C06.** Présenter un travail réalisé en synthétisant ses résultats, sa démarche: niveau 2, adapter
- **C07.** Interagir dans un contexte professionnel de façon respectueuse et constructive: niveau 2, adapter
- **C08.** Installer et configurer son environnement de travail en fonction du projet: niveau 2, adapter
- **C09.** Développer des interfaces utilisateur: niveau 2, adapter
- **C10.** Développer des composants métier: niveau 2, adapter
- **C11.** Contribuer à la gestion d'un projet: niveau 2, adapter
- **C12.** Analyser les besoins et maquetter une application: niveau 2, adapter
- **C13.** Définir l'architecture logicielle d'une application: niveau 2, adapter
- **C14.** Concevoir et mettre en place une base de données: niveau 2, adapter
- **C15.** Développer des composants d'accès aux données: niveau 2, adapter
- **C16.** Préparer et exécuter les plans de tests: niveau 2, adapter
- **C17.** Préparer et documenter le déploiement d'une application: niveau 2, adapter
- **C18.** Contribuer à la mise en production dans une démarche DevOps: niveau 2, adapter


## 📖 Contexte du projet

Une organisation (centre de formation, entreprise, association ou espace de coworking) organise régulièrement des événements (formations, ateliers, conférences, réunions internes).

Actuellement, la gestion des événements et des inscriptions est réalisée de manière essentiellement manuelle (tableurs Excel, formulaires simples, échanges par e-mail ou messagerie), ce qui entraîne :

- Un manque de visibilité en temps réel sur les événements disponibles et les places restantes.
- Des erreurs de réservation (doublons, surbooking).
- Des difficultés à suivre l'état des réservations (en attente, confirmée, annulée).
- Une gestion peu fiable des droits : qui peut créer un événement, qui peut valider ou refuser une réservation.
- Une absence de centralisation des informations concernant les participants et l'historique des réservations.

## ⚙️ Les fonctionnalités

Mettre en place une application web de réservation d'événements permettant de :

- Créer, modifier, publier et annuler des événements.
- Afficher un catalogue public des événements disponibles.
- Gérer les capacités et le nombre de places restantes.
- Permettre aux utilisateurs de réserver une place sur un événement.
- Gérer le cycle de vie des réservations (demande, confirmation, refus, annulation).
- Centraliser les informations liées aux événements et aux participants.
- Générer et télécharger un ticket PDF / confirmation PDF pour les réservations confirmées.

## 👥 Rôles des utilisateurs et fonctionnalités

---

### 👑 Admin

- Crée, modifie, publie et annule des événements.
- Définit les informations d'un événement : titre, description, date et heure, lieu, capacité maximale
- Consulte la liste complète des réservations : par événement, par participant, Confirme ou refuse une réservation, Annule une réservation (même confirmée) si nécessaire.
- Accède à des indicateurs simples : événements à venir, taux de remplissage, répartition des réservations par statut

### 🎫 Participant

- Consulte la liste des événements publiés.
- Consulte le détail d'un événement.
- Effectue une réservation si les règles sont respectées.
- Consulte la liste de ses réservations.
- Annule sa réservation selon les règles définies.
- Télécharge un ticket PDF / confirmation PDF uniquement si la réservation est confirmée.

## 📌 Planification sur JIRA (OBLIGATOIRE)

---

La planification du projet doit être réalisée sur JIRA et fait partie intégrante de l'évaluation.

L'apprenant devra :

- Créer un projet JIRA dédié.
- Structurer le travail en :
  - Epics (ex : Authentification, Gestion des événements, Réservations, Front-end, Back-end, Tests, Docker, CI/CD)
  - User Stories / Tasks
  - Sub-tasks
- Relier JIRA avec GitHub :
  - référence des tickets dans les messages de commit (ex : SC2-15)
- Mettre en place au moins une règle d'automatisation :
  - exemple : passage automatique d'un ticket en Done lorsqu'une PR associée est mergée.
- Être capable d'expliquer la planification et l'avancement lors de la soutenance.

## 🖥️ Partie Back-end

---

Réaliser votre application avec NestJS (TypeScript) et une base de données MongoDB ou PostgreSQL.

### Exigences techniques obligatoires

- Architecture modulaire (modules, contrôleurs, services).
- Utilisation des DTO et de la validation (class-validator).
- Authentification sécurisée avec JWT.
- Mise en place d'un système d'autorisation basé sur les rôles (Admin / Participant).
- Protection des routes sensibles.
- Gestion centralisée des erreurs (Error Handling global).
- Gestion correcte des codes HTTP et messages d'erreur.

### Règles métier obligatoires

- Un événement possède un statut : DRAFT, PUBLISHED, CANCELED.
- Seuls les événements PUBLISHED sont visibles publiquement.
- Une réservation possède un statut : PENDING, CONFIRMED, REFUSED, CANCELED.
- Un participant ne peut pas réserver :
  - un événement annulé ou non publié
  - un événement complet
  - un événement déjà réservé par lui (réservation active)
- La capacité maximale d'un événement ne doit jamais être dépassée.
- Le ticket PDF ne peut être téléchargé que pour une réservation CONFIRMED.

### 🧪 Tests Back-end (OBLIGATOIRES)

- Tests unitaires (Jest) sur les services métiers critiques :
  - événements
  - réservations
  - authentification
- Tests end-to-end couvrant un scénario complet avec rôles distincts.

## 🌐 Partie Front-end (Next.js)

---

Réaliser votre application avec Next.js + TypeScript.

### Exigences techniques obligatoires

- Utilisation conjointe de :
  - SSR pour les pages publiques (liste et détail des événements)
  - CSR pour les espaces authentifiés (dashboards)
- Routing avec routes dynamiques (/events/\[id\]).
- Protection des routes selon le rôle (Admin / Participant).
- Communication sécurisée avec l'API (JWT).
- Gestion d'état global avec Redux ou Context API.
- Gestion des formulaires, validations côté client et affichage des erreurs.

### 🧪 Tests Front-end (OBLIGATOIRES)

- Tests de composants avec React Testing Library.
- Tests d'un flux fonctionnel (ex : réservation ou annulation).

## 🐳 Partie Déploiement

---

- Création d'images Docker pour :
  - Front-end
  - Back-end
  - Base de données
- Mise en place d'un réseau Docker pour la communication entre services.
- Fourniture d'un docker-compose.yml fonctionnel.
- Gestion des variables d'environnement :
  - fichier .env.example obligatoire
  - séparation dev / prod documentée

## 🔄 CI/CD (GitHub Actions) — OBLIGATOIRE

---

Le projet doit inclure une pipeline GitHub Actions fonctionnelle.

### Exigences CI/CD

- Déclenchement automatique :
  - à chaque push
  - à chaque pull\_request
- Jobs obligatoires (front + back) : Install / Cache, Lint, Tests, Build
- La pipeline doit échouer si : lint échoue, tests échouent, build échoue, Publication des images sur Docker HUB

## 📚 Modalités pédagogiques

- Travail individuel.
- Date de lancement : 02/02/2026
- Deadline : 06/02/2026
- Durée : 5 jours

## 📝 Modalités d'évaluation

- Durée totale : 45 minutes
  - Présentation rapide (10 minutes)
  - Analyse du code et des choix techniques (10 minutes)
  - Mise en situation (20 minutes)
  - Code review et questions techniques (5 minutes)

## 📦 Livrables

**Code source :**

- Lien GitHub de l'application.
- Code clair, modulaire et lisible.
- Historique de commits exploitable.

**Documentation technique :**

- Description de l'architecture globale.
- Diagramme de classes obligatoire (entités principales et relations).
- Guide d'installation et de configuration.
- Explication des règles métier implémentées.

## ✅ Critères de performance

- Organisation et structure du projet.
- Respect des principes DRY et SRP.
- Nommage explicite des fichiers, fonctions et variables.
- Validation efficace des entrées utilisateur.
- Gestion robuste des erreurs.
- Sécurité : authentification, autorisation, protection des routes.
- Qualité du code et des tests.
- Docker fonctionnel et cohérent.
- Pipeline CI/CD GitHub Actions fonctionnelle.
- Capacité à expliquer et défendre les choix de conception.