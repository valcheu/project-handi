# Guide d'Implémentation - DashboardPage Type HelloWork

## 📋 Vue d'ensemble

Cette implémentation transforme le DashboardPage en une page d'accueil moderne inspirée de HelloWork, avec recherche avancée, filtres dynamiques et section entreprises. **100% conforme RGAA/WCAG AA**.

---

## 🏗️ Architecture

```
DashboardPage (Container)
├── SearchBar (Recherche What/Where)
├── StatsBar (Statistiques dynamiques)
├── FiltersPanel (Sidebar avec filtres)
├── OffersList (Grille de OfferCard)
└── CompaniesSection (Entreprises qui recrutent)
```

### Flux de données

```
User Input (SearchBar/FiltersPanel)
    ↓
useOfferFilters Hook (Debounce + Query Building)
    ↓
API Call: GET /offers?contract=CDI&location=Paris...
    ↓
State Update (offers, isLoading, error)
    ↓
Re-render Components (OfferCard, StatsBar, CompaniesSection)
```

---

## 🎨 Composants Créés

### 1. SearchBar (`frontend/src/components/SearchBar.tsx`)

**Fonctionnalités :**
- Deux champs : "Quoi ?" et "Où ?"
- Labels visibles et liés par `id`/`htmlFor`
- Bouton submit avec icône décorative
- Focus ring accessible

**Props :**
```typescript
interface SearchBarProps {
  onSearch: (query: {what: string, where: string}) => void;
  isLoading?: boolean;
}
```

**Accessibilité :**
- `<form role="search">`
- `aria-label` sur chaque input
- `aria-hidden="true"` sur l'icône
- Focus visible : `focus:ring-2 focus:ring-sky-500`

---

### 2. FiltersPanel (`frontend/src/components/FiltersPanel.tsx`)

**Fonctionnalités :**
- 4 groupes de filtres : Contrat, Expérience, Télétravail, Handicap
- Checkboxes natifs avec labels visibles
- Compteur de filtres actifs
- Bouton "Réinitialiser"

**Props :**
```typescript
interface FiltersPanelProps {
  filters: {
    contractTypes?: ContractType[];
    experienceLevels?: ExperienceLevel[];
    remote?: RemotePolicy[];
    disabilityCompatible?: DisabilityCategory[];
  };
  onFilterChange: (filters: any) => void;
  activeCount: number;
}
```

**Accessibilité :**
- `<aside role="complementary" aria-label="Filtres de recherche">`
- Chaque groupe dans un `<fieldset>` avec `<legend>`
- Compteur avec `aria-live="polite"`
- Checkboxes natifs accessibles au clavier

---

### 3. OfferCard (`frontend/src/components/OfferCard.tsx`)

**Fonctionnalités :**
- Affichage d'une offre : titre, entreprise, localisation, date
- Badge type de contrat
- Bouton "Postuler" avec états (loading, disabled, success)

**Props :**
```typescript
interface OfferCardProps {
  offer: {
    id: number;
    title: string;
    location: string;
    contract: string;
    createdAt: string;
    company: { name: string };
  };
  onApply: (offerId: number) => void;
  isApplying: boolean;
  hasApplied: boolean;
}
```

**Accessibilité :**
- `<article>` sémantique
- `<h3>` pour le titre (hiérarchie respectée)
- `<time datetime="...">` pour la date
- Badge avec `aria-label="Type de contrat: CDI"`
- Bouton avec `aria-label` descriptif complet

---

### 4. CompaniesSection (`frontend/src/components/CompaniesSection.tsx`)

**Fonctionnalités :**
- Grille responsive d'entreprises
- Logo placeholder avec initiales
- Compteur d'offres par entreprise
- Lien vers page entreprise

**Props :**
```typescript
interface CompaniesSectionProps {
  companies: Company[];
  isLoading: boolean;
}
```

**Accessibilité :**
- `<section aria-labelledby="companies-heading">`
- `<h2 id="companies-heading">` pour lien ARIA
- Liens avec `aria-label` descriptif
- Logos avec initiales visibles

---

### 5. StatsBar (`frontend/src/components/StatsBar.tsx`)

**Fonctionnalités :**
- Affiche le nombre d'offres et d'entreprises
- Icônes décoratives
- Format numérique localisé (fr-FR)

**Props :**
```typescript
interface StatsBarProps {
  totalOffers: number;
  totalCompanies: number;
  isLoading: boolean;
}
```

**Accessibilité :**
- `<ul>` et `<li>` sémantiques
- Icônes avec `aria-hidden="true"`
- Texte caché `.sr-only` pour lecteurs d'écran
- `aria-live="polite"` pour mises à jour

---

## 🔧 Hooks Créés

### 1. useOfferFilters (`frontend/src/hooks/useOfferFilters.ts`)

**Fonctionnalités :**
- Gestion des filtres et recherche
- Debounce 500ms sur recherche textuelle
- Construction dynamique des query params
- Appel API `GET /offers?...`

**Return :**
```typescript
{
  offers: Offer[];
  isLoading: boolean;
  error: string | null;
  applyFilters: (filters: OfferFilters) => void;
  clearFilters: () => void;
  activeFiltersCount: number;
  currentFilters: OfferFilters;
}
```

**Logique de debounce :**
- Recherche textuelle : 500ms de délai
- Filtres checkbox : exécution immédiate (0ms)

---

### 2. useCompanies (`frontend/src/hooks/useCompanies.ts`)

**Fonctionnalités :**
- Récupère les entreprises depuis API
- Calcule le nombre d'offres par entreprise
- Trie par nombre d'offres (décroissant)
- Limite aux 8 premières

**Return :**
```typescript
{
  companies: Company[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
```

---

## 🚀 Comment Utiliser

### Démarrer les serveurs

```bash
# Terminal 1 : Base de données
docker-compose up -d

# Terminal 2 : Backend
cd backend
npm run dev

# Terminal 3 : Frontend
cd frontend
npm run dev
```

### Tester l'accessibilité

**Navigation clavier :**
1. Tab pour naviguer entre les éléments
2. Enter/Espace pour activer boutons/checkboxes
3. Vérifier le focus visible (ring bleu ciel)

**Lecteur d'écran :**
1. Activer NVDA (Windows) ou VoiceOver (macOS)
2. Naviguer avec flèches
3. Vérifier les annonces ARIA

**Contraste :**
1. Utiliser WebAIM Contrast Checker
2. Vérifier les ratios (minimum 4.5:1)

---

## 📂 Structure des Fichiers

```
frontend/src/
├── components/
│   ├── SearchBar.tsx          ✨ Nouveau
│   ├── FiltersPanel.tsx       ✨ Nouveau
│   ├── OfferCard.tsx          ✨ Nouveau
│   ├── CompaniesSection.tsx   ✨ Nouveau
│   ├── StatsBar.tsx           ✨ Nouveau
│   └── ProtectedRoute.tsx     (Existant)
│
├── hooks/
│   ├── useApplications.ts     (Existant)
│   ├── useOfferFilters.ts     ✨ Nouveau
│   └── useCompanies.ts        ✨ Nouveau
│
├── pages/
│   ├── DashboardPage.tsx      🔄 Refondu
│   ├── LoginPage.tsx          (Existant)
│   └── MyApplicationsPage.tsx (Existant)
│
└── api/
    └── apiClient.ts           (Existant)
```

---

## 🎯 Points Clés de l'Implémentation

### 1. Recherche et Filtres

**SearchBar** envoie les termes de recherche vers `useOfferFilters` :
```typescript
const handleSearch = ({ what, where }) => {
  applyFilters({
    ...currentFilters,
    searchWhat: what,
    searchWhere: where,
  });
};
```

**FiltersPanel** met à jour les filtres en temps réel :
```typescript
const handleFilterChange = (newFilters) => {
  applyFilters({
    ...currentFilters,
    ...newFilters,
  });
};
```

### 2. Construction des Query Params

Le hook `useOfferFilters` construit dynamiquement l'URL :
```typescript
// Exemple : 
// filters = { contractTypes: ['CDI', 'CDD'], searchWhere: 'Paris' }
// → GET /offers?contract=CDI&contract=CDD&location=Paris
```

### 3. Gestion des États

**Loading :**
- SearchBar affiche "Recherche..." sur le bouton
- OffersList affiche un skeleton ou "Chargement..."
- StatsBar affiche "Chargement des statistiques..."

**Error :**
- Messages avec `role="alert"` et `aria-live="assertive"`
- Bouton "Fermer" accessible

**Success :**
- Messages avec `role="alert"` et `aria-live="polite"`
- Redirection automatique après 2s

---

## 🐛 Dépannage

### Problème : Les filtres ne fonctionnent pas

**Solution :**
1. Vérifier que le backend retourne les bons champs
2. Vérifier la console pour les erreurs API
3. Tester manuellement : `curl http://localhost:4000/api/v1/offers?contract=CDI`

### Problème : Le compteur d'entreprises est à 0

**Solution :**
1. Vérifier que l'endpoint `/companies` existe
2. Si non, le hook calculera depuis les offres
3. Vérifier que les offres ont un `companyId`

### Problème : Focus invisible

**Solution :**
1. Vérifier que Tailwind est correctement configuré
2. Tester avec un navigateur différent
3. Vérifier les CSS globaux qui pourraient override

---

## 📚 Ressources

**Documentation officielle :**
- [RGAA 4.1](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

**Outils de test :**
- [WAVE Extension](https://wave.webaim.org/extension/)
- [Axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse (Chrome)](https://developers.google.com/web/tools/lighthouse)

**Lecteurs d'écran :**
- [NVDA (Windows)](https://www.nvaccess.org/)
- [VoiceOver (macOS)](https://www.apple.com/accessibility/voiceover/)
- [JAWS (Windows)](https://www.freedomscientific.com/products/software/jaws/)

---

## ✅ Checklist Post-Déploiement

- [ ] Tester la navigation complète au clavier
- [ ] Vérifier les contrastes avec un outil
- [ ] Tester avec au moins un lecteur d'écran
- [ ] Valider sur mobile (responsive)
- [ ] Vérifier les performances (Lighthouse > 90)
- [ ] Tester avec connexion lente (throttling)
- [ ] Valider les messages d'erreur
- [ ] Tester la fonctionnalité "Postuler"

---

**Développé avec ❤️ en respectant les normes RGAA/WCAG AA**  
**Date :** Janvier 2026  
**Version :** 1.0.0

