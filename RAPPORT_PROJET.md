# 📂 RAPPORT_PROJET.md - CONFIGURATION OFFICIELLE POUR L'AGENT IA

## 1. CONTEXTE GÉNÉRAL
**Projet :** Plateforme de recrutement inclusive.

**Objectif :** Mise en relation de candidats RQTH et de recruteurs engagés.

**Point stratégique :** Accessibilité numérique stricte (Normes RGAA / WCAG AA). Le code doit être 100% navigable au clavier et compatible avec les lecteurs d'écran.

---

## 2. STACK TECHNIQUE & ARCHITECTURE
- **Frontend :** Vite / React / TypeScript / Tailwind CSS.
- **Backend :** Node.js / Express / TypeScript.
- **Base de données :** PostgreSQL via Prisma ORM.

### Configuration Prisma (Crucial)
- **Localisation du Client :** Le client est généré dans l'emplacement standard : `node_modules/@prisma/client`.
- **Importation :** Toujours utiliser `import { PrismaClient } from '@prisma/client';`.
- **Note Historique :** Le dossier `src/generated` a été supprimé pour éviter les conflits de types. Toute modification du `schema.prisma` nécessite un `npx prisma generate`.

---

## 3. ÉTAT DU MODÈLE DE DONNÉES (SCHEMA.PRISMA)
Les relations ont été explicitement nommées pour permettre l'inclusion de données multidimensionnelles sans ambiguïté.

### Modèle `Application` (Table centrale)
```prisma
model Application {
  id        Int               @id @default(autoincrement())
  status    ApplicationStatus @default(PENDING) // PENDING, ACCEPTED, REJECTED
  createdAt DateTime          @default(now())

  // Relations
  userId    Int
  user      User              @relation(fields: [userId], references: [id])
  
  offerId   Int
  offer     Offer             @relation(fields: [offerId], references: [id])

  // Relation nommée pour éviter les Shadow Relations
  companyId Int?
  company   Company?          @relation("CompanyToApplications", fields: [companyId], references: [id])

  @@unique([userId, offerId]) // Empêche les doublons de candidature
}

model Company {
  id           Int           @id @default(autoincrement())
  name         String        @unique
  applications Application[] @relation("CompanyToApplications")
  offers       Offer[]
  users        User[]
}
```

## 4. DIRECTIVES D'ACCESSIBILITÉ (RGAA / WCAG) ♿️
**L'agent doit impérativement refuser de générer du code non accessible.** Les critères suivants sont éliminatoires lors de la correction par le professeur :

1. **Sémantique HTML Strict :** - Utilisation des balises structurelles (`<main>`, `<nav>`, `<header>`, `<section>`). 
   - Interdiction formelle des `div` cliquables. Utiliser `<button type="button">` pour les actions et `<a>` pour les liens.
2. **Focus & Clavier :** - Tous les éléments interactifs doivent avoir un état `:focus-visible` très distinct.
   - Styles Tailwind suggérés : `focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2`.
3. **Labels & ARIA :** - Chaque champ de formulaire doit avoir un `<label>` lié par un `id`.
   - Utilisation de `aria-label` pour les boutons iconiques et `aria-hidden="true"` pour les icônes décoratives.
   - Les alertes dynamiques (succès/erreur) doivent porter le `role="alert"`.
4. **Contrastes :** - Texte courant : Minimum `text-slate-300` sur fond sombre pour respecter le ratio 4.5:1.

---

## 5. ÉTAT D'AVANCEMENT & PROCHAINES ÉTAPES

### Backend (Statut : À finaliser)
- Les fonctions `getMyApplications`, `createApplication` et `updateApplicationStatus` sont écrites dans `applicationController.ts`.
- **Vérification requise :** S'assurer que les imports Prisma pointent bien vers `@prisma/client` maintenant que le dossier local a été supprimé.

### Frontend (Statut : Prioritaire)
L'objectif est de rendre le Dashboard interactif pour les candidats.
1. **Synchronisation des types :** Définir une interface TypeScript `Application` qui reflète les inclusions `offer` et `company`.
2. **Action de Postulation :** - Intégrer un bouton "Postuler" dans les cartes d'offres du Dashboard.
   - Implémenter la logique `POST /api/v1/applications` via l'instance Axios.
   - Gérer les états `loading`, `success` et `error` (ex: "Vous avez déjà postulé").

---

## 6. PROTOCOLE POUR L'AGENT IA (CURSOR)
1. **Vérification Systématique :** Avant de générer du code, vérifie la présence du modèle dans `schema.prisma`.
2. **Qualité TypeScript :** Ne jamais utiliser `any`. Si un type manque, propose de le créer dans un dossier `types/` ou à la racine du composant.
3. **Accessibilité Native :** Lors de la création de composants JSX, injecte automatiquement les attributs ARIA et les styles de focus.
4. **Contexte Prisma :** Si l'autocomplétion échoue sur une relation (ex: `include: { company: true }`), rappelle à l'utilisateur de lancer `npx prisma generate` car le schéma a évolué.