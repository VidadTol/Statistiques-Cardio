This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 📊 Dashboard Cardio - Documentation Complète

## 🎯 Aperçu
Ce module cardio fournit des analyses avancées basées sur des données TCX, avec des visualisations interactives et des recommandations scientifiquement validées pour optimiser l'entraînement et la récupération.

---

## 📂 Structure des Fichiers

### **Composants Principaux**

- **`CardioUploader.tsx`** :
  - Permet de téléverser des fichiers TCX contenant des données cardio.
  - Gère la validation des fichiers et déclenche le traitement des données.

- **`ExplanationModal.tsx`** :
  - Affiche des explications détaillées sur les métriques cardio.
  - Utilisé pour guider l'utilisateur dans l'interprétation des données.

- **`MetricCard.tsx`** :
  - Composant pour afficher une métrique spécifique (ex. : fréquence cardiaque moyenne, VO2 max).
  - Inclut des graphiques et des descriptions.

- **`Navbar.tsx`** :
  - Barre de navigation pour accéder aux différentes sections du module cardio.
  - Inclut des liens vers les pages principales et les paramètres.

- **`ProgressRing.tsx`** :
  - Visualisation circulaire pour représenter les progrès dans une zone d'entraînement spécifique.
  - Dynamique et personnalisable.

- **`UltraDashboard.tsx`** :
  - Tableau de bord principal pour afficher toutes les analyses cardio.
  - Intègre les composants `MetricCard`, `ProgressRing`, et `ExplanationModal`.

- **`Sections/`** :
  - Contient des sous-sections spécifiques pour organiser les données (ex. : zones d'entraînement, récupération).

### **Fichiers Utilitaires**

- **`definitions.ts`** :
  - Définit les types et interfaces TypeScript utilisés dans le module cardio.
  - Garantit la cohérence des données entre les composants.

- **`icons.tsx`** :
  - Contient des icônes personnalisées utilisées dans l'interface utilisateur.
  - Optimisé pour une intégration rapide et cohérente.

---

## 🔬 Fonctionnalités Clés

### **Analyse des Zones Cardio**
- Calcul des zones d'entraînement (VO2 max, anaérobie, aérobie, etc.).
- Visualisation des données sous forme de graphiques interactifs.

### **Recommandations Scientifiques**
- Basées sur des études validées pour optimiser l'entraînement et la récupération.
- Intégrées directement dans les composants comme `ExplanationModal`.

### **Suivi des Progrès**
- Affichage des tendances et des progrès dans les zones d'entraînement.
- Utilisation de `ProgressRing` pour une visualisation claire.

### **Personnalisation**
- Interface utilisateur moderne avec Tailwind CSS.
- Composants réutilisables pour une extensibilité facile.

---

## 🚀 Instructions pour les Développeurs

### **Installation**
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/VidadTol/Statistiques-Cardio.git
   ```
2. Accédez au dossier du projet :
   ```bash
   cd Statistiques-Cardio/stats-cardio
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```

### **Lancement du Serveur**
```bash
npm run dev
```
Accédez à [http://localhost:3000](http://localhost:3000) pour voir le résultat.

---

## 📞 Contact & Feedback
Pour toute question ou suggestion, veuillez ouvrir une issue sur le dépôt GitHub ou contacter l'équipe de développement.
