// src/types/data.ts

export interface HeartRateZone {
  name: string;
  minBpm: number;
  maxBpm: number;
  durationSeconds: number; // Durée passée dans cette zone en secondes
  percentage: number;      // Pourcentage du temps total dans cette zone
  color: string;           // Couleur associée à la zone pour l'affichage
}

export interface HeartRatePoint {
  timestamp: string; // Format ISO 8601
  heartRate: number; // FC en bpm
  elapsedSeconds: number; // Secondes écoulées depuis le début
}

export interface IntervalData {
  type: 'effort' | 'repos'; // Type d'intervalle
  startTime: number; // Seconde de début
  endTime: number; // Seconde de fin
  duration: number; // Durée en secondes
  avgHeartRate: number; // FC moyenne durant l'intervalle
  maxHeartRate: number; // FC max durant l'intervalle
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
  type?: string; // Type d'activité (Course, Vélo, Football, etc.)
  terrain?: string; // Type de terrain (Synthétique, Herbe, Route, etc.)
  fcMax?: number; // Fréquence cardiaque maximale atteinte
  intensite?: number; // Intensité de 1 à 5 étoiles
  heartRateTimeline?: HeartRatePoint[]; // Timeline détaillée FC
  intervals?: IntervalData[]; // Intervalles détectés (fractionné)
  fractionsCount?: number; // Nombre de fractions détectées
}