# 🧭 Guide de Navigation - Architecture HelloWork

## Vue d'ensemble

Le site utilise désormais une architecture en deux pages, inspirée de HelloWork :

1. **HomePage** (`/`) - Page d'accueil avec hero et recherche
2. **DashboardPage** (`/dashboard`) - Page de résultats avec filtres

---

## 📋 Routes Disponibles

| Route | Composant | Description | Protection |
|-------|-----------|-------------|------------|
| `/` | HomePage | Page d'accueil avec recherche centrale | Public |
| `/dashboard` | DashboardPage | Résultats avec filtres et offres | Public |
| `/login` | LoginPage | Connexion utilisateur | Public |
| `/mes-candidatures` | MyApplicationsPage | Liste des candidatures | Protégée 🔒 |

---

## 🏠 HomePage - Page d'Accueil

### Fonctionnalités
- **Hero section** avec titre accrocheur
- **SearchBar** centrale (Quoi / Où)
- **StatsBar** - Nombre d'offres et d'entreprises
- **Boutons d'accès rapide** - Stage, Alternance, Intérim
- **Section CTA** - "Déposez votre CV"
- **Section Entreprises** - Top entreprises qui recrutent

### Navigation depuis HomePage

```typescript
// Exemple : Recherche "Développeur" à "Paris"
handleSearch({ what: 'Développeur', where: 'Paris' })
→ Redirige vers : /dashboard?what=Développeur&where=Paris

// Exemple : Clic sur "Alternance"
navigate('/dashboard?contract=ALTERNANCE')
→ Redirige vers : /dashboard avec filtre CDI pré-sélectionné
```

### Code Clé

```typescript
const handleSearch = ({ what, where }: { what: string; where: string }) => {
  const params = new URLSearchParams();
  if (what.trim()) params.append('what', what.trim());
  if (where.trim()) params.append('where', where.trim());
  
  navigate(`/dashboard?${params.toString()}`);
};
```

---

## 📊 DashboardPage - Page de Résultats

### Fonctionnalités
- **Header sticky** avec SearchBarCompact
- **Sidebar FiltersPanel** - Filtres avancés
- **Grille d'offres** - OfferCard responsive
- **Section Entreprises** - Filtrée selon résultats
- **Gestion URL** - Paramètres dans l'URL

### Extraction des Paramètres URL

```typescript
const [searchParams] = useSearchParams();

const initialWhat = searchParams.get('what') || '';
const initialWhere = searchParams.get('where') || '';
const initialContract = searchParams.get('contract');

// Appliqué au montage
useEffect(() => {
  applyFilters({
    searchWhat: initialWhat,
    searchWhere: initialWhere,
    contractTypes: initialContract ? [initialContract] : [],
  });
}, []);
```

### Header Sticky

```typescript
<header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm">
  <h1 onClick={() => navigate('/')}>Project Handi</h1>
  <SearchBarCompact 
    initialWhat={initialWhat}
    initialWhere={initialWhere}
  />
  <nav>{/* Connexion, Mes candidatures */}</nav>
</header>
```

---

## 🔍 SearchBarCompact - Barre Compacte

### Différences avec SearchBar

| Aspect | SearchBar | SearchBarCompact |
|--------|-----------|------------------|
| Taille | Grande (hero) | Compacte (header) |
| Layout | Vertical mobile | Horizontal |
| Labels | Visibles | sr-only |
| Utilisation | HomePage | DashboardPage |

### Props

```typescript
interface SearchBarCompactProps {
  onSearch: (query: { what: string; where: string }) => void;
  isLoading?: boolean;
  initialWhat?: string;    // ✨ Nouveau
  initialWhere?: string;   // ✨ Nouveau
}
```

---

## 🔄 Flux de Navigation Complet

### Scénario 1 : Recherche depuis HomePage

```
1. Utilisateur sur "/"
2. Saisit "Développeur" et "Paris"
3. Clique sur "Rechercher"
   ↓
4. Redirigé vers "/dashboard?what=Développeur&where=Paris"
5. DashboardPage récupère les params et applique les filtres
6. Offres affichées correspondant aux critères
```

### Scénario 2 : Affinage depuis DashboardPage

```
1. Utilisateur sur "/dashboard?what=Développeur"
2. Coche "CDI" dans les filtres
3. Filtres appliqués instantanément
4. URL reste inchangée (optionnel : peut être mise à jour)
```

### Scénario 3 : Nouvelle recherche depuis DashboardPage

```
1. Utilisateur sur "/dashboard" avec résultats
2. Modifie la recherche dans SearchBarCompact
3. Clique sur rechercher
   ↓
4. URL mise à jour : "/dashboard?what=NouveauTerme"
5. Filtres appliqués
6. Nouvelles offres affichées
```

### Scénario 4 : Retour à l'accueil

```
1. Utilisateur sur "/dashboard"
2. Clique sur le logo "Project Handi"
   ↓
3. Redirigé vers "/"
4. Recherche réinitialisée
```

---

## 🎯 Avantages de Cette Architecture

### ✅ Expérience Utilisateur
- **Séparation claire** : Accueil vs Résultats
- **Navigation intuitive** : Comme HelloWork
- **URL partageables** : Les recherches sont dans l'URL
- **Bouton back** : Fonctionne correctement

### ✅ SEO & Performance
- **URL descriptives** : `/dashboard?what=Développeur&where=Paris`
- **Bookmarks** : Recherches sauvegardables
- **Analytics** : Tracking des recherches facilité

### ✅ Accessibilité RGAA
- **Header sticky** : Navigation toujours accessible
- **Focus visible** : Sur tous les éléments
- **ARIA labels** : Sur SearchBarCompact
- **Navigation clavier** : 100% fonctionnelle

---

## 🛠️ Composants Créés

### Nouveaux Fichiers

1. **HomePage.tsx** - Page d'accueil complète
2. **SearchBarCompact.tsx** - Version compacte pour header
3. **App.tsx** - Routes mises à jour

### Fichiers Modifiés

1. **DashboardPage.tsx** - Transformé en page de résultats

---

## 📱 Responsive

### Mobile
- SearchBarCompact : Reste horizontale mais adaptée
- FiltersPanel : Peut être collapsible (future amélioration)
- Grille : 1 colonne

### Tablette
- SearchBarCompact : Confortable
- FiltersPanel : Sidebar fixe
- Grille : 2 colonnes

### Desktop
- SearchBarCompact : Largeur optimale
- FiltersPanel : Sidebar sticky
- Grille : 2-3 colonnes

---

## 🚀 Pour Tester

### 1. Accueil
```
http://localhost:5173/
```

### 2. Recherche directe
```
http://localhost:5173/dashboard?what=Développeur&where=Paris
```

### 3. Filtre pré-appliqué
```
http://localhost:5173/dashboard?contract=CDI
http://localhost:5173/dashboard?contract=ALTERNANCE
```

### 4. Recherche + Filtre
```
http://localhost:5173/dashboard?what=Dev&contract=CDI
```

---

## 🔮 Améliorations Futures

### Court terme
- [ ] Filtres collapsibles sur mobile
- [ ] Animation de transition entre pages
- [ ] Sauvegarde des recherches récentes

### Moyen terme
- [ ] Pagination des résultats
- [ ] Tri des offres (date, pertinence)
- [ ] Filtres avancés (salaire, secteur)

### Long terme
- [ ] Suggestions de recherche (autocomplete)
- [ ] Carte interactive des offres
- [ ] Alertes email pour nouvelles offres

---

**Développé avec ❤️ en respectant les normes RGAA/WCAG AA**  
**Date :** Janvier 2026  
**Version :** 2.0.0 - Architecture HelloWork

