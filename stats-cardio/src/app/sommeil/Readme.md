# 📊 Module Analyse du Sommeil - Documentation Complète

## 🎯 Aperçu
Ce module sommeil permet d'analyser automatiquement des données de sommeil avant et après des séances de sport à partir d'images, grâce à l'OCR (Tesseract.js). Il fusionne les analyses pour fournir des insights détaillés et visuellement attrayants.

---

## 📂 Structure des Fichiers

### **Composants Principaux**

- **`Dashboard.tsx`** :
  - Orchestrateur principal du module.
  - Gère l'upload des images, le traitement OCR, et la fusion des analyses.

- **`OCRSommeil.tsx`** :
  - Moteur OCR pour extraire les données des images de sommeil.
  - Utilise Tesseract.js pour analyser les durées, régularités, et autres métriques.

- **`VueEnsemble.tsx`** :
  - Affiche les résultats fusionnés des analyses de sommeil.
  - Présente les données sous forme de cartes modernes et interactives.

- **`AnalyseDetaillee.tsx`** :
  - Modal pour afficher les détails complets des analyses de sommeil.
  - Compare les données avant et après la séance de sport.

- **`section/`** :
  - Répertoire réservé pour organiser des sous-sections spécifiques (actuellement vide).

---

## 🔬 Fonctionnalités Clés

### **Analyse des Données de Sommeil**
- Extraction des données à partir d'images (durée, qualité, sommeil profond, REM, etc.).
- Classification automatique des nuits en "AVANT" et "APRÈS" séance.

### **Fusion Intelligente**
- Combine les données des nuits avant et après une séance de sport.
- Génère une analyse unique avec un badge "⚽ Séance".

### **Visualisation Moderne**
- Interface utilisateur avec gradients et effets interactifs.
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

## ⚙️ Flux de Données

### 1. Dashboard.tsx (Orchestrateur)
```javascript
handleFileUpload() → setSelectedImages() → setIsProcessing(true)
↓
OCRSommeil component reçoit les images
↓
handleAnalysesExtracted() → tryFusionAnalyses()
↓
VueEnsemble reçoit les analyses fusionnées
```

### 2. Fusion Logic
```javascript
extractDatesFromRange() → trouve dates communes
↓
Détermine AVANT/APRÈS selon chronologie
↓
Créé SommeilData fusionnée avec badge "⚽ Séance"
```

---

## 📱 Interface Utilisateur

### Vue d'Ensemble Target
- **Header** : "Vue d'ensemble - Vos données de sommeil avant/après football"
- **Carte séance** : Date + badge "Séance"
- **Colonnes** : Nuit AVANT / Nuit APRÈS avec durée et qualité
- **Bouton** : "Détails complets" (vert)
- **Stats** : Compteurs Nuits AVANT (0) / Nuits APRÈS (0) / Séances total (1)

---

## 🔧 Points Techniques Critiques

### Extraction de Dates
- **Pattern primaire** : `/\d{2}\/\d{2}\/\d{2}/g` pour extraire toutes les dates.
- **Gestion French** : Support "nuit du DD MM YY au DD MM YY" format.
- **Fallback** : Utilise la date actuelle si parsing échoue.

### OCR Configuration
- **Langue** : Tesseract worker('fra') pour français.
- **Patterns regex** : `/\d{1,2}[h:](\d{2})/` pour durées, `/\d{1,3}%/` pour pourcentages.
- **Mots-clés qualité** : OPTIMAL, BIEN, NORMAL, MAUVAIS (case insensitive).

---

## 📞 Contact & Feedback
Pour toute question ou suggestion, veuillez ouvrir une issue sur le dépôt GitHub ou contacter l'équipe de développement.