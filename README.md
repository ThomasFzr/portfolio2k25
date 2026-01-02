# Portfolio 2025

Portfolio sobre et épuré avec un design en noir et bordeaux.

## Technologies utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **React 18** - Bibliothèque UI

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Build

```bash
npm run build
npm start
```

## Personnalisation

### Couleurs

Les couleurs sont définies dans `tailwind.config.ts` :
- **Primary (Bordeaux)** : `#8B0000`
- **Dark** : `#000000` et variantes

### Contenu

Modifiez le contenu dans `app/page.tsx` :
- Section Hero
- Section À propos
- Projets
- Formulaire de contact

## Structure

```
portfolio2k25/
├── app/
│   ├── globals.css      # Styles globaux
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Page d'accueil
├── components/
│   ├── Header.tsx       # Navigation
│   ├── Footer.tsx       # Pied de page
│   ├── Section.tsx      # Composant section
│   └── ProjectCard.tsx  # Carte de projet
└── ...
```






