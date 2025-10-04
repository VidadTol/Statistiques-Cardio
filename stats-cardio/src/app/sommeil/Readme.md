# 📊 Module Analyse du Sommeil - Documentation Technique

## 🎯 Objectif Principal
Analyser automatiquement des captures d'écran de sommeil avant/après séances de sport via OCR et créer des analyses fusionnées intelligentes.

## 🔄 Logique Fonctionnelle Core

### 1. Upload & Détection
- **Upload de 2 images** : Format "nuit du 02 08 25 au 03 08 25.jpg" et "nuit du 03 08 25 au 04 08 25.jpg"
- **Extraction dates** : Parser les dates dans les noms de fichiers (02/08/25, 03/08/25, 04/08/25)
- **Date commune** : Identifier la date qui apparaît dans les deux fichiers = date de séance de sport

### 2. Traitement OCR
- **OCR sur chaque image** : Extraire données réelles via Tesseract.js (français)
- **Données extraites** : durée (8h47), régularité (89%), sommeil profond (1h06), REM (2h12), qualité (OPTIMAL)
- **Classification automatique** : Date antérieure = "nuit AVANT", date postérieure = "nuit APRÈS"

### 3. Fusion Intelligente
- **Analyse fusionnée unique** avec :
  - Date : 03/08/25 (date de la séance)
  - Badge : "⚽ Séance"
  - Nuit AVANT : données de la première image
  - Nuit APRÈS : données de la deuxième image
  - Détails complets pour modal

## 🏗️ Architecture des Composants

### Structure des Fichiers
```
src/app/sommeil/
├── page.tsx                    # Page principale avec gradient background
├── components/
│   ├── Dashboard.tsx           # Orchestrateur principal
│   ├── OCRSommeil.tsx         # Moteur OCR et analyse des images
│   └── VueEnsemble.tsx        # Affichage des résultats fusionnés
└── Readme.md                  # Cette documentation
```

### Interfaces TypeScript
```typescript
interface SommeilData {
  date: string;
  badge?: string;              // "⚽ Séance" pour les analyses fusionnées
  duree?: string;
  qualite?: string;
  regularite?: string;
  profond?: string;
  rem?: string;
  
  // Pour les analyses fusionnées
  nuitAvant?: { duree?: string; qualite?: string; };
  nuitApres?: { duree?: string; qualite?: string; };
  detailsAvant?: { duree?: string; regularite?: string; profond?: string; rem?: string; };
  detailsApres?: { duree?: string; regularite?: string; profond?: string; rem?: string; };
}
```

## 🎨 Design System

### Palette de Couleurs
- **Header** : Gradient indigo-500 → purple-600
- **Upload** : Gradient blue-500 → indigo-600  
- **Nuit AVANT** : Gradient orange-50 → red-100
- **Nuit APRÈS** : Gradient green-50 → emerald-100
- **Séance** : Badge blue-500, fond green-50

### Composants UI
- **Navigation sticky** : backdrop-blur-sm, border-gray-200/50
- **Cards modernes** : rounded-2xl, shadow-xl, border-white/20
- **Hover effects** : hover:shadow-2xl, transition-all
- **Icônes** : Emojis + SVG Heroicons

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

## 📱 Interface Utilisateur

### Vue d'Ensemble Target
- **Header** : "Vue d'ensemble - Vos données de sommeil avant/après football"
- **Carte séance** : Date + badge "Séance" 
- **Colonnes** : Nuit AVANT / Nuit APRÈS avec durée et qualité
- **Bouton** : "Détails complets" (vert)
- **Stats** : Compteurs Nuits AVANT (0) / Nuits APRÈS (0) / Séances total (1)

## 🔧 Points Techniques Critiques

### Extraction de Dates
- **Pattern primaire** : `/(\d{2}\/\d{2}\/\d{2})/g` pour extraire toutes les dates
- **Gestion French** : Support "nuit du DD MM YY au DD MM YY" format
- **Robustesse** : Fallback sur date actuelle si échec parsing

### OCR Configuration  
- **Langue** : Tesseract worker('fra') pour français
- **Patterns regex** : `/(\d{1,2})[h:](\d{2})/` pour durées, `/(\d{1,3})%/` pour pourcentages
- **Mots-clés qualité** : OPTIMAL, BIEN, NORMAL, MAUVAIS (case insensitive)

## 🚨 Principes de Développement

### Philosophy KISS
- **Rester simple** : Pas de sur-ingénierie, code lisible
- **Composants focus** : Chaque fichier a 1 responsabilité claire  
- **Pas de frameworks** : Utiliser React natif + Tailwind CSS uniquement
- **Debug friendly** : Console.log explicites pour traçabilité

### Error Handling
- **OCR fails** : Retourner "Erreur OCR" mais continuer le processus
- **No fusion** : Afficher analyses séparées si pas de date commune
- **File format** : Accepter tous images mais prévenir du format attendu

## 🔄 Workflow de Récupération
Si tout plante, suivre dans l'ordre :
1. Vérifier cette documentation pour comprendre la logique
2. Recréer Dashboard.tsx avec upload simple + fusion logic
3. Recréer OCRSommeil.tsx avec Tesseract + regex patterns  
4. Recréer VueEnsemble.tsx avec affichage cartes
5. Garder le design moderne mais simple (gradients + shadows)

## 📋 État Actuel (Octobre 2025)
- ✅ Dashboard avec upload et fusion automatique
- ✅ OCRSommeil avec extraction de données réelles
- ✅ VueEnsemble avec affichage format target
- ✅ Interface moderne cohérente avec page cardio
- ✅ Logique de fusion basée sur dates communes fonctionnelle 