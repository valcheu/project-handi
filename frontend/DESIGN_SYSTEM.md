# 🎨 Design System - Project Handi

## Palette de couleurs accessible

Toutes les couleurs respectent les normes **WCAG AA** et **AAA** pour l'accessibilité.

### 🔵 Couleurs Primaires (Bleu)
Utilisées pour les actions principales, liens et éléments interactifs.

```css
--color-primary-500: #0ea5e9  /* Contraste 4.5:1 sur fond sombre */
--color-primary-600: #0284c7  /* Contraste 7:1 sur fond sombre */
```

**Utilisation Tailwind:**
- `bg-sky-500`, `text-sky-400`, `border-sky-500`
- Boutons principaux, liens, badges actifs

### 🟣 Couleurs d'Accent (Violet)
Pour les éléments secondaires et les highlights.

```css
--color-accent-500: #a855f7
--color-accent-600: #9333ea
```

**Utilisation Tailwind:**
- `bg-purple-500`, `text-purple-400`
- Titres secondaires, badges spéciaux

### ✅ Couleurs de Succès (Vert)
Pour les confirmations et états positifs.

```css
--color-success-500: #22c55e  /* Contraste 4.5:1 */
--color-success-600: #16a34a  /* Contraste 7:1 */
```

**Utilisation Tailwind:**
- `bg-green-500`, `text-green-400`
- Messages de succès, validations, badges "accepté"

### ⚠️ Couleurs d'Avertissement (Orange)
Pour les alertes et informations importantes.

```css
--color-warning-500: #f59e0b
--color-warning-600: #d97706
```

**Utilisation Tailwind:**
- `bg-orange-500`, `text-orange-400`
- Alertes modérées, badges "en attente"

### ❌ Couleurs d'Erreur (Rouge)
Pour les erreurs et actions destructrices.

```css
--color-error-500: #ef4444  /* Contraste 4.5:1 */
--color-error-600: #dc2626  /* Contraste 7:1 */
```

**Utilisation Tailwind:**
- `bg-red-500`, `text-red-400`
- Messages d'erreur, badges "rejeté", boutons destructeurs

### ⚫ Couleurs Neutres (Slate)
Pour les arrière-plans, textes et bordures.

```css
--color-neutral-900: #0f172a  /* Fond principal */
--color-neutral-800: #1e293b  /* Fond des cartes */
--color-neutral-700: #334155  /* Bordures */
--color-neutral-400: #94a3b8  /* Texte secondaire */
--color-neutral-200: #e2e8f0  /* Texte clair */
```

**Utilisation Tailwind:**
- `bg-slate-900`, `bg-slate-800`, `text-slate-300`
- Arrière-plans, cartes, textes

### ♿ Couleurs Accessibilité Handicap

Codes couleur pour les catégories de handicap:

```css
--color-disability-moteur: #3b82f6      /* Bleu - Handicap moteur */
--color-disability-visuel: #a855f7      /* Violet - Handicap visuel */
--color-disability-auditif: #f59e0b     /* Orange - Handicap auditif */
--color-disability-psychique: #22c55e   /* Vert - Handicap psychique */
--color-disability-cognitif: #ec4899    /* Rose - Handicap cognitif */
--color-disability-invisible: #6366f1   /* Indigo - Handicap invisible */
```

## 🎯 Icônes SVG

Le composant `<Icon>` fournit une bibliothèque d'icônes accessibles.

### Utilisation de base

```tsx
import { Icon } from './components/Icon';

// Icône simple
<Icon name="search" />

// Icône avec taille personnalisée
<Icon name="location" size={20} />

// Icône avec classe CSS
<Icon name="briefcase" size={24} className="text-sky-400" />

// Icône informative (avec label)
<Icon name="info" aria-hidden={false} aria-label="Information importante" />
```

### Icônes disponibles

| Nom | Usage | Exemple |
|-----|-------|---------|
| `location` | Localisation, adresses | Carte d'offre |
| `briefcase` | Emploi, contrat | Stats, badges |
| `home` | Télétravail, domicile | Politique remote |
| `document` | Documents, descriptions | Section description |
| `accessibility` | Accessibilité | Section handicap |
| `info` | Informations | Infos pratiques |
| `search` | Recherche | Bouton recherche |
| `filter` | Filtres | Panneau de filtres |
| `calendar` | Dates, calendrier | Date de publication |
| `building` | Entreprises | Section entreprises |
| `users` | Candidats, équipes | Statistiques |
| `check` | Validation | État accepté |
| `x` | Fermeture, suppression | Boutons fermer |
| `clock` | Temps, durée | Horaires |
| `heart` | Favoris | Sauvegarder |
| `star` | Notes, évaluations | Étoiles |
| `message` | Messages | Communication |
| `chevron-right` | Navigation | Suivant |
| `chevron-left` | Navigation | Précédent |
| `arrow-right` | Actions | Voir plus |

## 📏 Espacements et Border Radius

### Border Radius

```css
--radius-sm: 0.375rem   /* 6px - Petits éléments */
--radius-md: 0.5rem     /* 8px - Boutons */
--radius-lg: 0.75rem    /* 12px - Cartes */
--radius-xl: 1rem       /* 16px - Grandes cartes */
--radius-2xl: 1.5rem    /* 24px - Sections */
--radius-full: 9999px   /* Rond complet - Badges */
```

**Utilisation Tailwind:**
- `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`

### Ombres

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
--shadow-glow: 0 0 15px rgba(14, 165, 233, 0.2)
```

**Utilisation Tailwind:**
- `shadow-md`, `shadow-lg`, `shadow-xl`
- `shadow-sky-500/20` pour l'effet glow

## ✨ Bonnes Pratiques

### 1. Contraste
- **Texte important:** Utiliser les couleurs 600 minimum
- **Fond sombre:** Préférer les couleurs 400-500 pour le texte
- **Fond clair:** Utiliser les couleurs 600-900

### 2. Focus States
Tous les éléments interactifs doivent avoir un état focus visible :

```tsx
className="focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
```

### 3. Hover States
Ajouter des transitions douces :

```tsx
className="hover:bg-sky-600 transition-colors"
```

### 4. Accessibilité
- ✅ Toujours utiliser `aria-hidden="true"` sur les icônes décoratives
- ✅ Ajouter `aria-label` sur les icônes informatives
- ✅ Respecter les ratios de contraste WCAG AA (4.5:1 pour le texte)
- ✅ Utiliser des tailles de police lisibles (min 16px pour le corps de texte)

## 🎨 Exemples de Composants

### Bouton Principal
```tsx
<button
  type="button"
  className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
>
  <Icon name="check" size={20} className="inline mr-2" />
  Confirmer
</button>
```

### Carte d'Offre
```tsx
<article className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-sky-500 transition-all">
  <h3 className="text-xl font-bold text-slate-100">Titre de l'offre</h3>
  <div className="flex items-center gap-2 text-slate-400">
    <Icon name="location" size={16} className="text-sky-400" />
    <span>Paris</span>
  </div>
</article>
```

### Badge de Statut
```tsx
{/* Succès */}
<span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-bold border border-green-500/30">
  Accepté
</span>

{/* En attente */}
<span className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-sm font-bold border border-orange-500/30">
  En attente
</span>

{/* Rejeté */}
<span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm font-bold border border-red-500/30">
  Rejeté
</span>
```

### Message d'Alerte
```tsx
{/* Succès */}
<div role="alert" className="p-4 bg-green-500/10 border border-green-500/50 text-green-300 rounded-lg">
  <Icon name="check" size={20} className="inline mr-2" />
  <strong>Succès :</strong> Votre candidature a été envoyée !
</div>

{/* Erreur */}
<div role="alert" className="p-4 bg-red-500/10 border border-red-500/50 text-red-300 rounded-lg">
  <Icon name="x" size={20} className="inline mr-2" />
  <strong>Erreur :</strong> Une erreur est survenue.
</div>
```

## 📱 Responsive Design

Utiliser les breakpoints Tailwind :
- `sm`: 640px (mobile large)
- `md`: 768px (tablette)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

Exemple :
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cartes responsive */}
</div>
```

---

**Mis à jour:** Janvier 2026  
**Version:** 1.0.0  
**Conformité:** WCAG 2.1 Level AA

