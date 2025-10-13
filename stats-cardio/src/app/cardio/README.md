Il s'agit d'un projet [Next.js](https://nextjs.org) démarré avec [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Premiers pas

Commencez par exécuter le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

Vous pouvez commencer à modifier la page en modifiant `app/page.tsx`. La page se met à jour automatiquement à mesure que vous modifiez le fichier.

Ce projet utilise [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) pour optimiser et charger automatiquement [Geist](https://vercel.com/font), une nouvelle famille de polices pour Vercel.

## En savoir plus

Pour en savoir plus sur Next.js, consultez les ressources suivantes :

- [Documentation Next.js](https://nextjs.org/docs) - découvrez les fonctionnalités et l'API Next.js.
- [Apprendre Next.js](https://nextjs.org/learn) - un tutoriel interactif Next.js.

Vous pouvez consulter le dépôt GitHub Next.js (https://github.com/vercel/next.js) - vos commentaires et contributions sont les bienvenus !

## Déployer sur Vercel

Le moyen le plus simple de déployer votre application Next.js est d'utiliser la [Plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) des créateurs de Next.js.

Consultez notre [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.

# 📊 Tableau de bord Cardio - Documentation Complète

## 🎯Aperçu

Ce module cardio fournit des analyses avancées basées sur des données TCX, avec des visualisations interactives et des recommandations scientifiquement validées pour optimiser l'entraînement et la récupération.

---

## 📂 Structure des Fichiers

### **Composants Principaux**

- **`CardioUploader.tsx`** : 
- Permet de téléverser des fichiers TCX contenant des données cardio. 
- Gère la validation des fichiers et déclenche le traitement des données.

- **`ExplicationModal.tsx`** : 
- Affiche des explications détaillées sur les métriques cardio. 
- Utilisé pour guider l'utilisateur dans l'interprétation des données.

- **`MetricCard.tsx`** : 
- Composant pour afficher une métrique spécifique (ex. : fréquence cardiaque moyenne, VO2 max). 
- Inclut des graphiques et des descriptions.

- **`Navbar.tsx`** : 
- Barre de navigation pour aux différentes sections du module cardio. 
- Inclut des liens vers les pages principales et les paramètres.

- **`ProgressRing.tsx`** : 
- Visualisation circulaire pour représenter les progrès dans une zone d'entraînement spécifique. 
- Dynamique et personnalisable.

- **`UltraDashboard.tsx`** : 
- Tableau de bord principal pour afficher toutes les analyses cardio. 
- Intégrer les composants `MetricCard`, `ProgressRing` et `ExplanationModal`.

- **`Sections/`** : 
- Contient des sous-sections spécifiques pour organiser les données (ex. : zones d'entraînement, récupération).

### **Fichiers Utilitaires**

- **`définitions.ts`** : 
- Définit les types et interfaces TypeScript utilisés dans le module cardio. 
- Garantir la cohérence des données entre les composants.

- **`icons.tsx`** : 
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
clone git https://github.com/VidadTol/Statistiques-Cardio.git 
```
2. Accédez au dossier du projet : 
```bash 
cd Statistiques-Cardio/stats-cardio 
```
3. Installer les dépendances : 
```bash 
installation npm 
```

### **Lancement du Serveur**
```bash
npm exécuter le développement
```
Accédez à [http://localhost:3000](http://localhost:3000) pour voir le résultat.

---

## 📞 Contacts et commentaires
Pour toute question ou suggestion, veuillez contacter l'équipe de développement sur github.