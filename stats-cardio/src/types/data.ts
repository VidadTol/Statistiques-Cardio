// src/types/data.ts

export interface HeartRateZone {
  name: string;
  minBpm: number;
  maxBpm: number;
  durationSeconds: number; // Durée passée dans cette zone en secondes
  percentage: number;      // Pourcentage du temps total dans cette zone
  color: string;           // Couleur associée à la zone pour l'affichage
}

export interface CardioData {
  id: string;
  date: string; // Format JJ/MM/AAAA
  dureeExercice: number; // en minutes
  distance: number; // en km
  vitesseMoyenne: number; // en km/h
  frequenceCardio: number; // FC Moyenne en bpm
  calories: number; // en kcal
  vo2Max: number; // en % ou valeur absolue, à définir
  notes: string;
  heartRateZones?: HeartRateZone[]; // Nouveau champ pour les zones cardiaques
  age?: number; // Âge de l'utilisateur pour le calcul des zones
  sexe?: 'M' | 'F'; // Sexe de l'utilisateur pour le calcul des zones
}