# Analyse Statistiques Cardio

Bienvenue sur le projet **Statistiques Cardio**, une application web qui vous permet d'analyser vos performances sportives à partir de fichiers d'entraînement au format `.tcx`.

Pour vous permettre d'avoir un suivi réel sur vos différentes séances de sport et d'en apprendre plus sur votre corps et sa façon de fonctionner, cet outil a été conçu pour vous aider à visualiser et à suivre votre progression au fil du temps, en vous offrant des statistiques détaillées et un historique complet de vos séances.

Les fichiers `.tcx` sont facilement accessibles dans la plupart des applications de montres connectées (Garmin, Suunto, etc.). Pour les obtenir, il vous suffit généralement d'aller sur la page de votre séance, de cliquer sur les trois petits points, et de choisir l'option "Exporter les données" pour les sauvegarder sur votre téléphone ou votre ordinateur.

Je travaille actuellement à rendre ce processus encore plus simple pour le futur, en permettant l'intégration directe de fichiers depuis votre téléphone vers cette page web.

## Fonctionnalités

-   **Importation de fichiers TCX** : Téléchargez facilement vos fichiers d'entraînement pour une analyse instantanée.
-   **Analyse de séance détaillée** : Obtenez un aperçu complet de chaque session, incluant la distance, la durée, la vitesse, le nombre de calories brûlées, et la fréquence cardiaque moyenne.
-   **Historique des séances** : Toutes vos analyses sont sauvegardées dans votre navigateur, vous permettant de consulter un historique complet de vos activités, même après avoir rafraîchi la page.
-   **Vue tabulaire** : Visualisez l'ensemble de vos séances dans un tableau récapitulatif pour une comparaison rapide et efficace.
-   **Gestion des données** : Supprimez des séances individuelles ou videz tout l'historique en un clic.

## Technologies Utilisées

-   **Next.js** : Framework React pour la construction de l'interface utilisateur.
-   **TypeScript** : Assure la robustesse et la scalabilité du code.
-   **Tailwind CSS** : Pour un style rapide et moderne.
-   **Lucide React** : Une collection d'icônes personnalisables pour une interface intuitive.
-   **DOMParser** : Utilisé côté client pour analyser les fichiers XML `.tcx`.
-   **localStorage** : Pour la persistance des données dans le navigateur.

## Comment Lancer le Projet

Suivez ces étapes pour installer et lancer l'application en local :

**1\. Clonez le dépôt GitHub :**

Bash

  
git clone https://github.com/VidadTol/Statistiques-Cardio
cd Statistiques-Cardio


**2\. Installez les dépendances :**

Bash

  

npm install
# ou
yarn install

**3\. Lancez le serveur de développement :**

Bash

  

npm run dev
# ou
yarn dev

L'application sera accessible sur `http://localhost:3000`.

## À Propos

Ce projet a été développé car j'ai trouvé l'application Zepp trop limitée. J'avais besoin de plus qu'une simple liste de statistiques : mon objectif était d'avoir des informations avec des analyses séance après séance pour vraiment voir mon évolution. Je voulais progresser, et cela passait par une meilleure compréhension de mes performances, ce que les données brutes ne me permettaient pas de faire.