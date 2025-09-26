// Définitions centralisées pour toutes les métriques et zones du dashboard
import { CardioData } from '@/types/data';

// Configuration des zones cardiaques (utilisée par CardioUploader)
const HEART_RATE_ZONES_CONFIG = [
  { name: 'VO2 Max', minBpm: 156, maxBpm: 174, color: '#EF4444' },
  { name: 'Anaérobie', minBpm: 139, maxBpm: 155, color: '#F97316' },
  { name: 'Aérobie', minBpm: 121, maxBpm: 138, color: '#EAB308' },
  { name: 'Intensif', minBpm: 104, maxBpm: 120, color: '#22C55E' },
  { name: 'Léger', minBpm: 87, maxBpm: 103, color: '#3B82F6' },
];

// Définitions des zones cardiaques (statiques par défaut)
const staticZoneDefinitions = {
  "VO2 Max": {
    title: "VO2 Max - Zone Rouge",
    description:
      "Zone d effort maximal (90-100% FC Max). Améliore la puissance anaérobie et la VO2 max. Utilisée pour les sprints courts et les intervalles intenses.",
    benefits: "Développe la capacité maximale d oxygénation",
  },
  Anaérobie: {
    title: "Anaérobie - Zone Orange",
    description:
      "Zone d effort élevé (80-90% FC Max). Améliore le seuil lactique et la puissance. Parfaite pour les intervalles et le travail de vitesse.",
    benefits: "Augmente la tolérance à l acide lactique",
  },
  Aérobie: {
    title: "Aérobie - Zone Verte",
    description:
      "Zone d endurance modérée (70-80% FC Max). Améliore l efficacité cardiovasculaire et la capacité aérobie. Base de l entraînement d endurance.",
    benefits: "Renforce le système cardiovasculaire",
  },
  Intensif: {
    title: "Intensif - Zone Bleue",
    description:
      "Zone de tempo soutenu (60-70% FC Max). Améliore l endurance de base et l efficacité métabolique. Idéale pour les séances longues.",
    benefits: "Développe l endurance fondamentale",
  },
  Léger: {
    title: "Léger - Zone Grise",
    description:
      "Zone de récupération active (50-60% FC Max). Favorise la récupération et l échauffement. Maintient l activité sans stress.",
    benefits: "Facilite la récupération et la régénération",
  },
};

// Fonction pour générer des définitions dynamiques basées sur les vraies données
export function getDynamicZoneDefinitions(currentData?: CardioData): typeof staticZoneDefinitions {
  if (!currentData) return staticZoneDefinitions;

  const fcMax = currentData.fcMax || 180;
  const age = currentData.age || 30;
  const fcMaxTheorique = 220 - age;
  
  return {
    "VO2 Max": {
      title: "VO2 Max - Zone Rouge",
      description: currentData.heartRateZones?.find(z => z.name === 'VO2 Max')?.percentage !== undefined
        ? `Zone d effort maximal (${Math.round((156/fcMaxTheorique)*100)}-${Math.round((174/fcMaxTheorique)*100)}% FC Max). Vous avez passé ${currentData.heartRateZones.find(z => z.name === 'VO2 Max')?.percentage}% de votre séance dans cette zone. Améliore la puissance anaérobie et la VO2 max.`
        : staticZoneDefinitions["VO2 Max"].description,
      benefits: currentData.vo2Max ? `Développe la capacité maximale d oxygénation - Votre VO2 Max estimé: ${currentData.vo2Max} ml/kg/min` : staticZoneDefinitions["VO2 Max"].benefits,
    },
    Anaérobie: {
      title: "Anaérobie - Zone Orange",
      description: currentData.heartRateZones?.find(z => z.name === 'Anaérobie')?.percentage !== undefined
        ? `Zone d effort élevé (${Math.round((139/fcMaxTheorique)*100)}-${Math.round((155/fcMaxTheorique)*100)}% FC Max). Vous avez passé ${currentData.heartRateZones.find(z => z.name === 'Anaérobie')?.percentage}% de votre séance dans cette zone. Parfaite pour les intervalles et le travail de vitesse.`
        : staticZoneDefinitions.Anaérobie.description,
      benefits: "Augmente la tolérance à l acide lactique",
    },
    Aérobie: {
      title: "Aérobie - Zone Verte",
      description: currentData.heartRateZones?.find(z => z.name === 'Aérobie')?.percentage !== undefined
        ? `Zone d endurance modérée (${Math.round((121/fcMaxTheorique)*100)}-${Math.round((138/fcMaxTheorique)*100)}% FC Max). Vous avez passé ${currentData.heartRateZones.find(z => z.name === 'Aérobie')?.percentage}% de votre séance dans cette zone. Base de l entraînement d endurance.`
        : staticZoneDefinitions.Aérobie.description,
      benefits: "Renforce le système cardiovasculaire",
    },
    Intensif: {
      title: "Intensif - Zone Bleue",
      description: currentData.heartRateZones?.find(z => z.name === 'Intensif')?.percentage !== undefined
        ? `Zone de tempo soutenu (${Math.round((104/fcMaxTheorique)*100)}-${Math.round((120/fcMaxTheorique)*100)}% FC Max). Vous avez passé ${currentData.heartRateZones.find(z => z.name === 'Intensif')?.percentage}% de votre séance dans cette zone. Idéale pour les séances longues.`
        : staticZoneDefinitions.Intensif.description,
      benefits: "Développe l endurance fondamentale",
    },
    Léger: {
      title: "Léger - Zone Grise",
      description: currentData.heartRateZones?.find(z => z.name === 'Léger')?.percentage !== undefined
        ? `Zone de récupération active (${Math.round((87/fcMaxTheorique)*100)}-${Math.round((103/fcMaxTheorique)*100)}% FC Max). Vous avez passé ${currentData.heartRateZones.find(z => z.name === 'Léger')?.percentage}% de votre séance dans cette zone. Favorise la récupération et l échauffement.`
        : staticZoneDefinitions.Léger.description,
      benefits: "Facilite la récupération et la régénération",
    },
  };
}

// Export pour compatibilité avec l'ancien code
export const zoneDefinitions = staticZoneDefinitions;

// Définitions des métriques de récupération
export const recoveryDefinitions = {
  "Qualité du sommeil": {
    title: "🛌 Qualité du sommeil recommandée",
    description:
      "Après un effort intense comme celui-ci, votre corps a besoin de 8-9h de sommeil de qualité pour optimiser la récupération musculaire et neurologique.",
    benefits: "Favorise la synthèse protéique et la régénération cellulaire",
  },
  Hydratation: {
    title: "💧 Hydratation post-effort",
    description:
      "Buvez 1.5L d eau dans les 2h suivant l effort, puis 150% du poids perdu en sueur. Ajoutez des électrolytes si la séance a duré plus de 60min.",
    benefits:
      "Restaure l équilibre hydrique et facilite l élimination des toxines",
  },
  "Planning de récupération": {
    title: "📅 Planning de récupération optimisé",
    description:
      "Les 48h suivantes : J+1 étirements légers et marche, J+2 récupération active (natation/vélo facile). Évitez l intensité avant 48-72h.",
    benefits: "Accélère l élimination des déchets métaboliques",
  },
  "Zone de récupération": {
    title: "🎯 Zone de récupération active",
    description:
      "Pour les prochains jours, maintenez une FC entre 100-120 bpm lors d activités légères. Cette zone favorise la circulation sans stress supplémentaire.",
    benefits: "Améliore la circulation et accélère la récupération",
  },
};

// Définitions des métriques d'efficacité énergétique (statiques par défaut)
const staticEfficiencyDefinitions = {
  "Calories par km": {
    title: "🔥 Calories par kilomètre",
    description:
      "Coût énergétique de votre course. À 300 cal/km, vous brûlez efficacement les calories. Plus cette valeur diminue avec l entraînement, plus vous devenez efficient.",
    benefits: "Indicateur d économie de course et de progression technique",
  },
  "Calories par minute": {
    title: "⚡ Calories par minute",
    description:
      "Taux de combustion énergétique pendant l effort. À 12 cal/min, votre métabolisme travaille intensément. Varie selon l intensité et votre condition.",
    benefits: "Mesure l intensité métabolique de votre séance",
  },
  "Efficacité cardiaque": {
    title: "❤️ Efficacité cardiaque",
    description:
      "Mesure de l optimisation de votre système cardiovasculaire. À 85%, votre coeur pompe efficacement et fournit l oxygène nécessaire avec un minimum d effort.",
    benefits: "Indique une bonne condition cardiovasculaire et endurance",
  },
  "Seuil efficacité": {
    title: "🎯 Seuil d efficacité optimal",
    description:
      "Votre zone de FC où le rendement énergétique est maximal. À 155-165 bpm, vous obtenez le meilleur ratio effort/performance pour ce type d entraînement.",
    benefits: "Optimise la dépense énergétique et améliore l endurance",
  },
  "Amélioration efficacité": {
    title: "📈 Amélioration de l efficacité",
    description:
      "Comparé à vos dernières séances, votre efficacité énergétique s améliore de +12%. Vous parcourez plus de distance avec moins d effort cardiaque.",
    benefits: "Indique une progression de votre condition physique",
  },
};

// Fonction pour générer des définitions d'efficacité dynamiques
export function getDynamicEfficiencyDefinitions(currentData?: CardioData, previousData?: CardioData[]): typeof staticEfficiencyDefinitions {
  if (!currentData) return staticEfficiencyDefinitions;

  const caloriesParKm = currentData.distance > 0 ? Math.round(currentData.calories / currentData.distance) : 0;
  const caloriesParMinute = currentData.dureeExercice > 0 ? Math.round(currentData.calories / currentData.dureeExercice) : 0;
  
  // Calcul de l'efficacité cardiaque basée sur la répartition des zones
  const highIntensityZones = currentData.heartRateZones?.filter(z => z.name.includes('VO2') || z.name.includes('Anaérobie')) || [];
  const highIntensityTime = highIntensityZones.reduce((sum, z) => sum + (z.percentage || 0), 0);
  const efficaciteCardiaque = Math.min(100, Math.max(0, 100 - highIntensityTime + (currentData.vo2Max || 0) / 2));

  // Calcul de l'amélioration si données précédentes disponibles
  let ameliorationText = "Données insuffisantes pour calculer l amélioration";
  if (previousData && previousData.length > 0) {
    const lastData = previousData[previousData.length - 1];
    const lastCalPerKm = lastData.distance > 0 ? lastData.calories / lastData.distance : 0;
    const improvement = caloriesParKm > 0 && lastCalPerKm > 0 ? Math.round(((lastCalPerKm - caloriesParKm) / lastCalPerKm) * 100) : 0;
    if (improvement > 0) {
      ameliorationText = `Excellente progression ! Votre efficacité s améliore de +${improvement}%. Vous dépensez moins d énergie pour la même distance.`;
    } else if (improvement < 0) {
      ameliorationText = `Légère régression de ${Math.abs(improvement)}%. Cela peut indiquer une intensité plus élevée ou une fatigue temporaire.`;
    } else {
      ameliorationText = "Efficacité stable par rapport à votre dernière séance.";
    }
  }

  return {
    "Calories par km": {
      title: "🔥 Calories par kilomètre",
      description: caloriesParKm > 0 
        ? `Coût énergétique de votre course : ${caloriesParKm} cal/km. ${caloriesParKm < 250 ? 'Excellent rendement énergétique !' : caloriesParKm < 350 ? 'Bon rendement énergétique.' : 'Rendement à améliorer avec l entraînement.'} Plus cette valeur diminue, plus vous devenez efficient.`
        : staticEfficiencyDefinitions["Calories par km"].description,
      benefits: "Indicateur d économie de course et de progression technique",
    },
    "Calories par minute": {
      title: "⚡ Calories par minute",
      description: caloriesParMinute > 0
        ? `Taux de combustion énergétique : ${caloriesParMinute} cal/min. ${caloriesParMinute > 15 ? 'Métabolisme très actif - haute intensité !' : caloriesParMinute > 10 ? 'Bon taux métabolique - intensité modérée à élevée.' : 'Rythme modéré - idéal pour l endurance.'} Varie selon l intensité et votre condition.`
        : staticEfficiencyDefinitions["Calories par minute"].description,
      benefits: "Mesure l intensité métabolique de votre séance",
    },
    "Efficacité cardiaque": {
      title: "❤️ Efficacité cardiaque",
      description: `Mesure de l optimisation de votre système cardiovasculaire : ${Math.round(efficaciteCardiaque)}%. ${efficaciteCardiaque > 80 ? 'Excellent ! Votre cœur pompe très efficacement.' : efficaciteCardiaque > 65 ? 'Bonne efficacité cardiovasculaire.' : 'Potentiel d amélioration avec l entraînement.'} Votre cœur fournit l oxygène nécessaire avec un effort optimisé.`,
      benefits: "Indique une bonne condition cardiovasculaire et endurance",
    },
    "Seuil efficacité": {
      title: "🎯 Seuil d efficacité optimal",
      description: currentData.frequenceCardio > 0
        ? `Votre zone de FC où le rendement énergétique est maximal : ${currentData.frequenceCardio - 10}-${currentData.frequenceCardio + 10} bpm. À ${currentData.frequenceCardio} bpm en moyenne, vous obtenez un ${currentData.frequenceCardio > 150 ? 'excellent' : currentData.frequenceCardio > 130 ? 'bon' : 'modéré'} ratio effort/performance.`
        : staticEfficiencyDefinitions["Seuil efficacité"].description,
      benefits: "Optimise la dépense énergétique et améliore l endurance",
    },
    "Amélioration efficacité": {
      title: "📈 Amélioration de l efficacité",
      description: ameliorationText,
      benefits: "Indique une progression de votre condition physique",
    },
  };
}

// Export pour compatibilité avec l'ancien code
export const efficiencyDefinitions = staticEfficiencyDefinitions;

// Fonction pour générer des définitions de récupération dynamiques
export function getDynamicRecoveryDefinitions(currentData?: CardioData): typeof recoveryDefinitions {
  if (!currentData) return recoveryDefinitions;

  const intensiteGlobale = currentData.intensite || 3;
  const dureeSeance = currentData.dureeExercice || 0;
  const caloriesDepensees = currentData.calories || 0;
  
  // Calcul du sommeil requis basé sur l'intensité réelle
  const sommeilRequis = intensiteGlobale >= 4 ? "8-9h" : intensiteGlobale >= 3 ? "7-8h" : "7h";
  const sommeilDescription = intensiteGlobale >= 4 ? "intensive" : intensiteGlobale >= 3 ? "modérée" : "légère";
  
  // Zone de récupération active basée sur la FC moyenne
  const fcRecupMin = Math.max(100, Math.round((currentData.frequenceCardio || 140) * 0.7));
  const fcRecupMax = Math.max(120, Math.round((currentData.frequenceCardio || 140) * 0.8));

  return {
    "Qualité du sommeil": {
      title: "🛌 Qualité du sommeil recommandée",
      description: `Après votre séance ${sommeilDescription} de ${dureeSeance}min (${caloriesDepensees} kcal), votre corps a besoin de ${sommeilRequis} de sommeil de qualité pour optimiser la récupération musculaire et neurologique.`,
      benefits: "Favorise la synthèse protéique et la régénération cellulaire",
    },
    Hydratation: {
      title: "💧 Hydratation post-effort",
      description: dureeSeance > 60 
        ? `Séance longue détectée (${dureeSeance}min). Buvez 2L d'eau dans les 3h suivant l'effort, puis 150% du poids perdu en sueur. Ajoutez des électrolytes pour cette durée d'effort.`
        : `Pour votre séance de ${dureeSeance}min, buvez 1.5L d'eau dans les 2h suivant l'effort, puis 150% du poids perdu en sueur.`,
      benefits: "Restaure l équilibre hydrique et facilite l élimination des toxines",
    },
    "Planning de récupération": {
      title: "📅 Planning de récupération optimisé",
      description: intensiteGlobale >= 4
        ? `Séance très intensive détectée (${intensiteGlobale}/5). Les 72h suivantes : J+1 repos complet, J+2 étirements légers, J+3 récupération active. Évitez l'intensité avant 72h.`
        : intensiteGlobale >= 3
        ? `Séance modérément intensive (${intensiteGlobale}/5). Les 48-72h suivantes : J+1 étirements légers et marche, J+2 récupération active (natation/vélo facile). Évitez l'intensité avant 48-72h.`
        : `Séance légère (${intensiteGlobale}/5). Les 24-48h suivantes : récupération active recommandée, retour à l'intensité possible après 24-48h.`,
      benefits: "Accélère l élimination des déchets métaboliques",
    },
    "Zone de récupération": {
      title: "🎯 Zone de récupération active",
      description: `Basé sur votre FC moyenne de ${currentData.frequenceCardio} bpm, maintenez une FC entre ${fcRecupMin}-${fcRecupMax} bpm lors d'activités légères les prochains jours. Cette zone favorise la circulation sans stress supplémentaire.`,
      benefits: "Améliore la circulation et accélère la récupération",
    },
  };
}

// Définitions des métriques de progression (statiques par défaut)
const staticProgressDefinitions = {
  "Évolution distance": {
    title: "🏃‍♂️ Évolution de la distance",
    description:
      "Analyse de vos 5 dernières séances : progression constante de +12% par semaine. Vous passez de 2.8km à 3.4km, excellent développement de l endurance.",
    benefits: "Montre l amélioration de votre capacité d endurance",
  },
  "Évolution FC Max": {
    title: "❤️ Évolution FC Max",
    description:
      "Votre FC Max évolue positivement : +8 bpm vs il y a 3 semaines. Cela indique une amélioration de votre capacité cardiovasculaire maximale.",
    benefits:
      "Reflète l adaptation de votre système cardiaque à l entraînement",
  },
  "Évolution vitesse": {
    title: "⚡ Évolution vitesse moyenne",
    description:
      "Progression remarquable : +0.3 km/h par semaine en moyenne. Vous maintenez une vitesse plus élevée sur des distances similaires.",
    benefits: "Indique une amélioration de votre puissance et technique",
  },
  "Comparaison dernière": {
    title: "📊 Comparaison avec dernière séance",
    description:
      "Vs séance du 04/09 : Distance +12%, Vitesse +16%, FC Max +1%, Calories +15%. Performance globale en nette amélioration.",
    benefits: "Vision claire de votre progression immédiate",
  },
};

// Fonction pour générer des définitions de progression dynamiques
export function getDynamicProgressDefinitions(currentData?: CardioData, previousData?: CardioData[]): typeof staticProgressDefinitions {
  if (!currentData || !previousData || previousData.length === 0) return staticProgressDefinitions;

  const lastData = previousData[previousData.length - 1];
  const recentData = previousData.slice(-5); // 5 dernières séances
  
  // Calculs de progression
  const distanceEvolution = ((currentData.distance - lastData.distance) / lastData.distance) * 100;
  const fcMaxEvolution = (currentData.fcMax || 0) - (lastData.fcMax || 0);
  const vitesseEvolution = ((currentData.vitesseMoyenne - lastData.vitesseMoyenne) / lastData.vitesseMoyenne) * 100;
  const caloriesEvolution = ((currentData.calories - lastData.calories) / lastData.calories) * 100;

  // Progression moyenne sur 5 séances pour la distance
  let progressionMoyenne = 0;
  if (recentData.length >= 2) {
    const firstDistance = recentData[0].distance;
    const lastDistance = recentData[recentData.length - 1].distance;
    progressionMoyenne = ((lastDistance - firstDistance) / firstDistance) * 100;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  };

  return {
    "Évolution distance": {
      title: "🏃‍♂️ Évolution de la distance",
      description: recentData.length >= 2
        ? `Analyse de vos ${recentData.length} dernières séances : ${progressionMoyenne > 0 ? `progression de +${Math.round(progressionMoyenne)}%` : `régression de ${Math.round(Math.abs(progressionMoyenne))}%`}. Vous êtes passé de ${recentData[0].distance.toFixed(1)}km à ${currentData.distance.toFixed(1)}km, ${progressionMoyenne > 5 ? 'excellent développement' : progressionMoyenne > 0 ? 'bon développement' : 'potentiel à exploiter'} de l endurance.`
        : staticProgressDefinitions["Évolution distance"].description,
      benefits: "Montre l amélioration de votre capacité d endurance",
    },
    "Évolution FC Max": {
      title: "❤️ Évolution FC Max",
      description: `Votre FC Max évolue ${fcMaxEvolution > 0 ? 'positivement' : fcMaxEvolution < 0 ? 'négativement' : 'de manière stable'} : ${fcMaxEvolution > 0 ? '+' : ''}${fcMaxEvolution} bpm vs dernière séance. ${Math.abs(fcMaxEvolution) > 5 ? 'Changement significatif qui' : 'Évolution normale qui'} ${fcMaxEvolution > 0 ? 'indique une amélioration de votre capacité cardiovasculaire maximale.' : fcMaxEvolution < 0 ? 'peut indiquer une meilleure efficacité cardiaque.' : 'montre une stabilité de votre condition.'}`,
      benefits: "Reflète l adaptation de votre système cardiaque à l entraînement",
    },
    "Évolution vitesse": {
      title: "⚡ Évolution vitesse moyenne",
      description: `${Math.abs(vitesseEvolution) > 1 ? 'Progression remarquable' : 'Évolution'} : ${vitesseEvolution > 0 ? '+' : ''}${vitesseEvolution.toFixed(1)}% vs dernière séance (${lastData.vitesseMoyenne.toFixed(1)} → ${currentData.vitesseMoyenne.toFixed(1)} km/h). ${vitesseEvolution > 5 ? 'Excellent gain de performance !' : vitesseEvolution > 0 ? 'Bonne amélioration continue.' : 'Stabilité ou adaptation à un rythme plus contrôlé.'}`,
      benefits: "Indique une amélioration de votre puissance et technique",
    },
    "Comparaison dernière": {
      title: "📊 Comparaison avec dernière séance",
      description: `Vs séance du ${formatDate(lastData.date)} : Distance ${distanceEvolution > 0 ? '+' : ''}${distanceEvolution.toFixed(0)}%, Vitesse ${vitesseEvolution > 0 ? '+' : ''}${vitesseEvolution.toFixed(0)}%, FC Max ${fcMaxEvolution > 0 ? '+' : ''}${fcMaxEvolution} bpm, Calories ${caloriesEvolution > 0 ? '+' : ''}${caloriesEvolution.toFixed(0)}%. Performance globale ${(distanceEvolution + vitesseEvolution + caloriesEvolution) / 3 > 2 ? 'en nette amélioration' : (distanceEvolution + vitesseEvolution + caloriesEvolution) / 3 > -2 ? 'stable' : 'en phase d adaptation'}.`,
      benefits: "Vision claire de votre progression immédiate",
    },
  };
}

// Export pour compatibilité avec l'ancien code
export const progressDefinitions = staticProgressDefinitions;

// Fonction principale pour obtenir toutes les définitions dynamiques
export function getAllDynamicDefinitions(currentData?: CardioData, previousData?: CardioData[]) {
  return {
    zones: getDynamicZoneDefinitions(currentData),
    efficiency: getDynamicEfficiencyDefinitions(currentData, previousData),
    progress: getDynamicProgressDefinitions(currentData, previousData),
    recovery: getDynamicRecoveryDefinitions(currentData), // Maintenant dynamique !
    analysis: analysisDefinitions, // Reste statique pour l'instant
    objectives: objectivesDefinitions, // Reste statique pour l'instant
  };
}

// Définitions des analyses de progression
export const analysisDefinitions = {
  "Évolution FC": {
    title: "💓 Analyse Fréquence Cardiaque",
    description:
      "Votre FC moyenne s améliore : -3 bpm sur 30 jours. Cela indique une meilleure efficacité cardiaque et une adaptation positive à l entraînement.",
    benefits: "Signe d une meilleure condition cardiovasculaire et d endurance",
  },
};

// Définitions des objectifs et challenges
export const objectivesDefinitions = {
  "Objectif mensuel": {
    title: "🎯 Objectif Distance Mensuel (Personnalisable)",
    description:
      "Définissez votre objectif kilomètrage mensuel personnalisé. Cliquez sur la valeur pour la modifier selon vos besoins et votre niveau.",
    benefits:
      "Maintient la motivation et structure votre progression selon vos objectifs personnels",
  },
  "Challenge vitesse": {
    title: "⚡ Challenge Vitesse",
    description:
      "Défi : Maintenir 3+ km/h pendant 3 séances consécutives. Statut : 2/3 réussies. Prochaine séance cruciale pour débloquer le badge.",
    benefits: "Développe la vitesse et la constance dans l effort",
  },
  "Badge régularité": {
    title: "⭐ Badge Régularité",
    description:
      "Badge débloqué ! Vous avez maintenu 3+ séances par semaine pendant 1 mois. Félicitations pour cette constance exemplaire.",
    benefits: "Récompense la discipline et encourage la continuité",
  },
};