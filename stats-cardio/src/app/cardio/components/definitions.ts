// Définitions centralisées pour toutes les métriques et zones du dashboard

// Définitions des zones cardiaques
export const zoneDefinitions = {
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

// Définitions des métriques d'efficacité énergétique
export const efficiencyDefinitions = {
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

// Définitions des métriques de progression
export const progressDefinitions = {
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