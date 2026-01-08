# 🦽 Project Handi - Plateforme de Recrutement Inclusive

Plateforme web de recrutement accessible et inclusive, spécialement conçue pour faciliter l'insertion professionnelle des personnes en situation de handicap.

[![RGAA](https://img.shields.io/badge/RGAA-Conforme-green)](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/)
[![WCAG 2.1](https://img.shields.io/badge/WCAG%202.1-AA-blue)](https://www.w3.org/WAI/WCAG21/quickref/)

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancement du projet](#lancement-du-projet)
- [Structure du projet](#structure-du-projet)
- [API Endpoints](#api-endpoints)
- [Tests](#tests)
- [Accessibilité](#accessibilité)
- [Contribution](#contribution)

---

## ✨ Fonctionnalités

### Pour les Candidats
- 🔍 **Recherche d'offres** : Barre de recherche avec filtres avancés (contrat, expérience, télétravail, handicap)
- ♿ **Filtrage par accessibilité** : Recherche d'offres compatibles avec différents types de handicap
- 📄 **Candidature en ligne** : Postulation simplifiée avec gestion des documents (CV, lettre de motivation)
- 📊 **Suivi des candidatures** : Tableau de bord pour suivre l'état de ses candidatures
- 📱 **Responsive** : Interface adaptée mobile, tablette et desktop

### Pour les Recruteurs
- 📝 **Création d'offres** : Publication d'offres avec précision sur l'accessibilité
- 👥 **Gestion des candidatures** : Consultation et gestion des candidatures reçues
- 🏢 **Profil entreprise** : Mise en avant de la politique d'inclusion de l'entreprise

### Accessibilité (RGAA/WCAG AA)
- ✅ Navigation clavier complète
- ✅ Lecteurs d'écran compatibles
- ✅ Contrastes respectés (ratio 4.5:1 minimum)
- ✅ Focus visible sur tous les éléments interactifs
- ✅ HTML sémantique
- ✅ ARIA labels appropriés

---

## 🛠️ Technologies utilisées

### Frontend
- **React 18** avec TypeScript
- **Vite** - Build tool moderne et rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router DOM** - Routing côté client
- **Axios** - Client HTTP

### Backend
- **Node.js** avec Express
- **TypeScript** - Typage statique
- **Prisma ORM** - Gestion de base de données
- **PostgreSQL** - Base de données relationnelle
- **JWT** - Authentification sécurisée
- **bcrypt** - Hashage des mots de passe

### DevOps
- **Docker** - Containerisation
- **Docker Compose** - Orchestration multi-conteneurs

---

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure) - [Télécharger](https://nodejs.org/)
- **npm** (version 9 ou supérieure) - Inclus avec Node.js
- **Docker Desktop** - [Télécharger](https://www.docker.com/products/docker-desktop)
- **Git** - [Télécharger](https://git-scm.com/)

Vérifiez vos versions :
```bash
node --version  # doit afficher v18.x.x ou supérieur
npm --version   # doit afficher 9.x.x ou supérieur
docker --version
```

---

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/valcheu/project-handi.git
cd project-handi
```

### 2. Installation des dépendances

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

---

## 🎯 Lancement du projet

### Guide de démarrage rapide (Recommandé pour tester)

Suivez ces étapes **dans l'ordre** :

#### Étape 1 : Démarrer Docker Desktop

⚠️ **Important** : Lancez l'application **Docker Desktop** sur votre machine avant de continuer.

Vérifiez que Docker fonctionne :
```bash
docker --version
docker ps
```

#### Étape 2 : Démarrer la base de données PostgreSQL

```bash
# À la racine du projet (project-handi/)
docker-compose up -d
```

Cette commande démarre PostgreSQL en arrière-plan. Vérifiez que le conteneur fonctionne :
```bash
docker ps
# Vous devriez voir : handi_db avec le statut "Up"
```

#### Étape 3 : Configurer le backend

```bash
cd backend

# Créer le fichier .env à partir de l'exemple
cp .env.example .env

# OU créer manuellement le fichier .env avec :
cat > .env << 'EOF'
DATABASE_URL="postgresql://val:val@localhost:5432/job_db"
JWT_SECRET="dev_secret_key_change_in_production"
PORT=5000
EOF
```

⚠️ **Important** : Les identifiants de connexion (`val:val`) doivent correspondre à ceux définis dans `docker-compose.yml`.

#### Étape 4 : Initialiser la base de données

```bash
# Toujours dans le dossier backend/

# Générer le client Prisma
npx prisma generate

# Appliquer les migrations (créer les tables)
npx prisma migrate dev

# Peupler la base avec des données de test
npx prisma db seed
```

✅ Si tout s'est bien passé, vous devriez voir :
```
✅ Candidatures créées
🎉 SEEDING TERMINÉ AVEC SUCCÈS !
```

#### Étape 5 : Lancer le serveur backend

```bash
# Dans le dossier backend/
npm run dev
```

Le backend démarre sur **http://localhost:5000**

Vous devriez voir :
```
✅ Server is running on port 5000
✅ Connected to PostgreSQL
```

#### Étape 6 : Lancer le serveur frontend

**Dans un nouveau terminal** (gardez le backend en cours d'exécution) :

```bash
cd frontend
npm run dev
```

Le frontend démarre sur **http://localhost:5173**

---

## 🧪 Accès et test de l'application

### Accès à l'application

Une fois tout lancé, ouvrez votre navigateur sur :
- **Frontend** : http://localhost:5173
- **API Backend** : http://localhost:5000/api/v1

### Comptes de test

Le seed a créé des comptes de test que vous pouvez utiliser pour vous connecter immédiatement :

#### 👤 Candidats

| Email | Mot de passe | Candidatures existantes |
|-------|--------------|------------------------|
| marie.dupont@example.com | password123 | 3 candidatures (dont 1 acceptée) |
| jean.martin@example.com | password123 | 2 candidatures |
| sophie.bernard@example.com | password123 | Aucune candidature |

#### 🏢 Recruteurs

| Email | Mot de passe | Entreprise |
|-------|--------------|------------|
| recruiter@techinclusion.com | password123 | TechInclusion |
| hr@greenenergy.com | password123 | GreenEnergy |
| rh@healthplus.com | password123 | HealthPlus |

### Test recommandé

1. **Connectez-vous avec Marie Dupont** (`marie.dupont@example.com` / `password123`)
2. Allez sur la page **"Mes Candidatures"** pour voir ses 3 candidatures existantes
3. Cliquez sur une candidature pour voir les détails
4. Explorez le dashboard pour rechercher d'autres offres
5. Postulez à une nouvelle offre

### Données de test disponibles

Le seed a créé automatiquement :
- ✅ **10 offres d'emploi** variées (CDI, CDD, Stage, Alternance, Intérim)
- ✅ **5 entreprises** dans différents secteurs (Tech, Énergie, Santé, Formation, Finance)
- ✅ **6 utilisateurs** (3 candidats + 3 recruteurs)
- ✅ **5 candidatures** existantes pour tester le suivi
- ✅ **4 adaptations** de poste prédéfinies
- ✅ **4 compétences** techniques

---

## 📁 Structure du projet

```
project-handi/
├── backend/                    # Serveur Node.js/Express
│   ├── prisma/
│   │   ├── migrations/        # Migrations de la base de données
│   │   ├── schema.prisma      # Schéma de la base de données
│   │   └── seed.ts           # Données de test
│   ├── src/
│   │   ├── config/           # Configuration (Prisma, etc.)
│   │   ├── controllers/      # Contrôleurs Express
│   │   ├── middlewares/      # Middlewares (auth, etc.)
│   │   ├── routes/           # Routes de l'API
│   │   ├── services/         # Logique métier
│   │   └── app.ts            # Point d'entrée
│   ├── .env.example          # Modèle de configuration
│   └── package.json
│
├── frontend/                  # Application React
│   ├── src/
│   │   ├── api/              # Configuration Axios
│   │   ├── components/       # Composants réutilisables
│   │   │   ├── Icon.tsx      # Système d'icônes SVG
│   │   │   ├── FiltersPanel.tsx
│   │   │   ├── OfferCard.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── ...
│   │   ├── pages/            # Pages de l'application
│   │   │   ├── HomePage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── OfferDetailPage.tsx
│   │   │   ├── MyApplicationsPage.tsx
│   │   │   └── ApplicationDetailPage.tsx
│   │   ├── hooks/            # Custom React hooks
│   │   ├── types/            # Types TypeScript
│   │   ├── App.tsx           # Composant principal
│   │   └── main.tsx          # Point d'entrée
│   └── package.json
│
├── docker-compose.yml         # Configuration Docker
├── .env.example              # Variables d'environnement (exemple)
├── RAPPORT_PROJET.md         # Rapport technique détaillé
└── README.md                 # Ce fichier
```

---

## 🔌 API Endpoints

### Authentification
- `POST /api/v1/auth/register` - Inscription
- `POST /api/v1/auth/login` - Connexion

### Offres d'emploi
- `GET /api/v1/offers` - Liste des offres (avec filtres)
- `GET /api/v1/offers/:id` - Détail d'une offre
- `POST /api/v1/offers` - Créer une offre (recruteur uniquement)

### Candidatures
- `POST /api/v1/applications` - Postuler à une offre
- `GET /api/v1/applications/me` - Mes candidatures (candidat)
- `GET /api/v1/applications/:id` - Détail d'une candidature
- `GET /api/v1/applications/recruiter` - Candidatures reçues (recruteur)
- `PATCH /api/v1/applications/:id/status` - Modifier le statut (recruteur)

### Utilisateurs
- `GET /api/v1/users/me` - Profil de l'utilisateur connecté
- `PATCH /api/v1/users/me` - Modifier son profil

### Entreprises
- `GET /api/v1/companies` - Liste des entreprises
- `GET /api/v1/companies/:id` - Détail d'une entreprise

---

## 🧪 Tests

```bash
# Backend (à venir)
cd backend
npm test

# Frontend (à venir)
cd frontend
npm test
```

---

## ♿ Accessibilité

Ce projet respecte les normes **RGAA** (Référentiel Général d'Amélioration de l'Accessibilité) et **WCAG 2.1 niveau AA**.

### Bonnes pratiques implémentées

- ✅ **HTML sémantique** : `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`
- ✅ **ARIA labels** : `aria-label`, `aria-labelledby`, `aria-live`, `role`
- ✅ **Navigation clavier** : Tab, Shift+Tab, Enter, Espace
- ✅ **Focus visible** : Anneaux de focus avec bon contraste
- ✅ **Textes alternatifs** : Toutes les icônes décoratives marquées `aria-hidden="true"`
- ✅ **Contrastes** : Ratio minimum 4.5:1 pour le texte normal, 7:1 pour certains éléments
- ✅ **Formulaires** : Labels associés, instructions claires, messages d'erreur explicites
- ✅ **Responsive** : Adaptable de 320px à 4K

### Tester l'accessibilité

- **Lecteur d'écran** : NVDA (Windows), VoiceOver (Mac), JAWS
- **Navigation clavier** : Testez en utilisant uniquement Tab/Shift+Tab et Enter
- **Outils** : Axe DevTools, Lighthouse, WAVE

---

## 🛠️ Commandes utiles

### Backend

```bash
# Lancer en mode développement
npm run dev

# Build pour production
npm run build

# Lancer en production
npm start

# Prisma
npx prisma studio              # Interface graphique de la BDD
npx prisma migrate dev         # Créer une migration
npx prisma db seed             # Peupler la BDD
npx prisma generate            # Générer le client Prisma
```

### Frontend

```bash
# Lancer en mode développement
npm run dev

# Build pour production
npm run build

# Prévisualiser le build
npm run preview
```

### Docker

```bash
# Démarrer les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f

# Redémarrer les services
docker-compose restart

# Supprimer les volumes (⚠️ supprime les données)
docker-compose down -v
```

---

## 🐛 Dépannage

### Problème : Docker Desktop n'est pas lancé

**Symptôme** :
```
Cannot connect to the Docker daemon
```

**Solution** :
1. Ouvrez manuellement l'application **Docker Desktop**
2. Attendez que l'icône Docker dans votre barre de tâches indique "Docker is running"
3. Réessayez `docker-compose up -d`

---

### Problème : Le backend ne se connecte pas à la base de données

**Symptôme** :
```
Error: P1001: Can't reach database server
```

**Solution** :
1. Vérifiez que Docker est lancé : `docker ps`
2. Vérifiez que le conteneur `handi_db` est en cours d'exécution
3. Vérifiez le fichier `.env` dans `backend/` :
   ```env
   DATABASE_URL="postgresql://val:val@localhost:5432/job_db"
   ```
4. Les identifiants doivent être **val:val** (comme défini dans `docker-compose.yml`)

---

### Problème : Port déjà utilisé (5432, 5000, ou 5173)

**Symptôme** :
```
Error: Port 5432 is already in use
```

**Solution pour le port 5432 (PostgreSQL)** :
```bash
# Trouver le processus qui utilise le port
lsof -i :5432

# Option 1 : Arrêter PostgreSQL local
brew services stop postgresql  # macOS avec Homebrew
sudo systemctl stop postgresql # Linux

# Option 2 : Modifier le port Docker
# Dans docker-compose.yml, changez :
ports:
  - "5433:5432"  # Utilise 5433 au lieu de 5432

# Puis modifiez le .env :
DATABASE_URL="postgresql://val:val@localhost:5433/job_db"
```

**Solution pour le port 5000 (Backend)** :
```bash
# Trouver et tuer le processus
lsof -i :5000
kill -9 <PID>
```

**Solution pour le port 5173 (Frontend)** :
```bash
# Vite choisira automatiquement le port suivant (5174)
# Ou tuez le processus :
lsof -i :5173
kill -9 <PID>
```

---

### Problème : Erreur de migration Prisma

**Symptôme** :
```
Error: Migration engine error
```

**Solution** :
```bash
cd backend

# Reset complet de la base (⚠️ Supprime toutes les données)
npx prisma migrate reset

# Réappliquer les migrations
npx prisma migrate dev

# Repeupler avec des données de test
npx prisma db seed
```

---

### Problème : Le frontend ne communique pas avec le backend

**Symptôme** :
```
Network Error
AxiosError: Request failed with status code 404
```

**Solution** :
1. Vérifiez que le backend est bien lancé sur le port 5000
   ```bash
   curl http://localhost:5000/api/v1/offers
   ```
2. Vérifiez la configuration dans `frontend/src/api/apiClient.ts` :
   ```typescript
   baseURL: 'http://localhost:5000/api/v1'
   ```
3. Vérifiez les CORS dans `backend/src/app.ts`

---

### Problème : `npx prisma db seed` échoue

**Symptôme** :
```
TSError: Unable to compile TypeScript
```

**Solution** :
1. Vérifiez que toutes les dépendances sont installées :
   ```bash
   cd backend
   npm install
   ```
2. Vérifiez que les migrations ont bien été appliquées :
   ```bash
   npx prisma migrate dev
   ```
3. Si l'erreur persiste, consultez les logs complets

---

### Problème : `node_modules` trop volumineux

**Solution** :
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install

# Faire de même dans backend/ et frontend/
```

---

## 👥 Contribution

### Workflow Git

```bash
# Créer une branche pour votre fonctionnalité
git checkout -b feature/nom-de-la-fonctionnalite

# Faire vos modifications

# Commiter
git add .
git commit -m "feat: description de la fonctionnalité"

# Push
git push origin feature/nom-de-la-fonctionnalite

# Créer une Pull Request sur GitHub
```

### Conventions de commit

Nous utilisons les [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage (pas de changement de code)
- `refactor:` Refactorisation
- `test:` Ajout de tests
- `chore:` Maintenance

**Exemples** :
```bash
git commit -m "feat: ajout du système de filtres avancés"
git commit -m "fix: correction du calcul des contrastes"
git commit -m "docs: mise à jour du README avec Docker"
```

---

## 📞 Support

Si vous rencontrez des problèmes non couverts par ce README :

1. Vérifiez les [issues GitHub](https://github.com/valcheu/project-handi/issues)
2. Consultez le fichier `RAPPORT_PROJET.md` pour plus de détails techniques
3. Contactez l'équipe de développement

---

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 🙏 Remerciements

Ce projet a été développé dans le cadre d'une initiative pour promouvoir l'inclusion professionnelle des personnes en situation de handicap.

**Développé avec ❤️ pour l'accessibilité universelle.**
