// Utilitaires pour les calculs de zones cardiaques
// Fonctions métier pour analyser les données de fréquence cardiaque

import { HeartRatePoint } from "../../../types/data";

export interface HeartRateZone {
  percentage: number;
  duration: number; // en secondes
}

export interface HeartRateZones {
  [key: string]: HeartRateZone;
  "VO2 Max": HeartRateZone;
  "Anaérobie": HeartRateZone;
  "Aérobie": HeartRateZone;
  "Intensif": HeartRateZone;
  "Léger": HeartRateZone;
}

// Seuils de fréquence cardiaque pour chaque zone
const HR_THRESHOLDS = {
  VO2_MAX: 156,     // ≥ 156 bpm - Zone rouge, effort maximal
  ANAEROBIC: 139,   // 139-155 bpm - Zone orange, seuil lactique
  AEROBIC: 121,     // 121-138 bpm - Zone verte, endurance
  INTENSIVE: 104,   // 104-120 bpm - Zone bleue, tempo
  // Léger: < 104 bpm - Zone grise, récupération
};

/**
 * Calcule la répartition du temps passé dans chaque zone cardiaque
 * à partir de la timeline de fréquence cardiaque d'une séance
 * 
 * @param heartRateTimeline - Array des mesures de FC pendant la séance
 * @param dureeExercice - Durée totale de l'exercice en minutes
 * @returns Objet contenant le pourcentage et la durée pour chaque zone
 */
export function calculateHeartRateZones(
  heartRateTimeline: HeartRatePoint[],
  dureeExercice: number
): HeartRateZones {
  // Fallback avec des valeurs par défaut si pas de données
  if (!heartRateTimeline || heartRateTimeline.length === 0) {
    return {
      "VO2 Max": {
        percentage: 15,
        duration: Math.round(dureeExercice * 60 * 0.15),
      },
      Anaérobie: {
        percentage: 35,
        duration: Math.round(dureeExercice * 60 * 0.35),
      },
      Aérobie: {
        percentage: 30,
        duration: Math.round(dureeExercice * 60 * 0.3),
      },
      Intensif: {
        percentage: 15,
        duration: Math.round(dureeExercice * 60 * 0.15),
      },
      Léger: { 
        percentage: 5, 
        duration: Math.round(dureeExercice * 60 * 0.05) 
      },
    };
  }

  // Compteurs pour chaque zone
  const zones = {
    "VO2 Max": { count: 0, duration: 0 },
    Anaérobie: { count: 0, duration: 0 },
    Aérobie: { count: 0, duration: 0 },
    Intensif: { count: 0, duration: 0 },
    Léger: { count: 0, duration: 0 },
  };

  const totalPoints = heartRateTimeline.length;

  // Analyser chaque point de mesure
  heartRateTimeline.forEach((point) => {
    const hr = point.heartRate;
    
    // Classer dans la zone appropriée selon les seuils
    if (hr >= HR_THRESHOLDS.VO2_MAX) {
      zones["VO2 Max"].count++;
    } else if (hr >= HR_THRESHOLDS.ANAEROBIC) {
      zones["Anaérobie"].count++;
    } else if (hr >= HR_THRESHOLDS.AEROBIC) {
      zones["Aérobie"].count++;
    } else if (hr >= HR_THRESHOLDS.INTENSIVE) {
      zones["Intensif"].count++;
    } else {
      zones["Léger"].count++;
    }
  });

  // Calculer les pourcentages et durées
  const result: HeartRateZones = {} as HeartRateZones;
  
  Object.keys(zones).forEach((zone) => {
    const zoneKey = zone as keyof typeof zones;
    const percentage = totalPoints > 0
      ? Math.round((zones[zoneKey].count / totalPoints) * 100)
      : 0;
    const durationSeconds = Math.round((percentage / 100) * dureeExercice * 60);
    
    result[zoneKey] = { percentage, duration: durationSeconds };
  });

  return result;
}

/**
 * Détermine la zone cardiaque principale d'une séance
 * (celle où le plus de temps a été passé)
 */
export function getPrimaryHeartRateZone(zones: HeartRateZones): string {
  let maxPercentage = 0;
  let primaryZone = "Aérobie"; // par défaut
  
  Object.entries(zones).forEach(([zoneName, zoneData]) => {
    if (zoneData.percentage > maxPercentage) {
      maxPercentage = zoneData.percentage;
      primaryZone = zoneName;
    }
  });
  
  return primaryZone;
}

/**
 * Calcule l'intensité moyenne d'une séance basée sur la répartition des zones
 */
export function calculateSessionIntensity(zones: HeartRateZones): number {
  const weights = {
    "Léger": 1,
    "Intensif": 2,
    "Aérobie": 3,
    "Anaérobie": 4,
    "VO2 Max": 5,
  };
  
  let totalWeight = 0;
  let totalPercentage = 0;
  
  Object.entries(zones).forEach(([zoneName, zoneData]) => {
    const weight = weights[zoneName as keyof typeof weights];
    totalWeight += weight * zoneData.percentage;
    totalPercentage += zoneData.percentage;
  });
  
  return totalPercentage > 0 ? Math.round((totalWeight / totalPercentage) * 10) / 10 : 0;
}