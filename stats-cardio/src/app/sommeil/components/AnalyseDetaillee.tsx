"use client";

import React from "react";
import { SommeilData } from "./OCRSommeil";

interface AnalyseDetailleeProps {
  seance: SommeilData;
  isOpen: boolean;
  onClose: () => void;
}

// Générateur de conseils basés sur la recherche médicale
const generateSleepAdvice = (data: {
  duree?: string;
  profond?: string;
  rem?: string;
  regularite?: string;
  type: 'pre-training' | 'post-training';
  comparison?: { avant: number; apres: number };
}) => {
  const conseils: string[] = [];

  // 1. CONSEILS BASÉS SUR LA DURÉE (Walker, 2017 - "Why We Sleep")
  if (data.duree) {
    const match = data.duree.match(/(\d+)h(\d+)/);
    if (match) {
      const totalMinutes = parseInt(match[1]) * 60 + parseInt(match[2]);
      const heures = totalMinutes / 60;
      
      if (heures < 7) {
        conseils.push("🔴 Augmentez votre sommeil à 7-9h pour optimiser la récupération musculaire et la synthèse des protéines (Walker et al., 2017)");
      } else if (heures > 9.5) {
        conseils.push("🟡 Réduisez légèrement la durée - un excès peut causer de la somnolence et réduire les performances (Hirshkowitz et al., 2015)");
      } else {
        conseils.push("✅ Durée optimale - maintenez cette régularité pour une récupération maximale");
      }
    }
  }

  // 2. CONSEILS BASÉS SUR LE SOMMEIL PROFOND (Dattilo et al., 2011)
  if (data.profond) {
    const match = data.profond.match(/(\d+)/);
    if (match) {
      const profondPct = parseInt(match[1]);
      if (profondPct < 15) {
        conseils.push("🔴 Améliorez le sommeil profond : évitez écrans 2h avant coucher, température fraîche 16-19°C (Ohayon et al., 2017)");
      } else if (profondPct > 30) {
        conseils.push("🟡 Sommeil profond élevé - vérifiez si pas de dette de sommeil accumulée");
      } else {
        conseils.push("✅ Sommeil profond excellent pour la récupération physique et la consolidation mémoire");
      }
    }
  }

  // 3. CONSEILS BASÉS SUR LE REM (Mah et al., 2011)
  if (data.rem) {
    const match = data.rem.match(/(\d+)/);
    if (match) {
      const remPct = parseInt(match[1]);
      if (remPct < 15) {
        conseils.push("🔴 Phase REM insuffisante - réduisez alcool et caféine, respectez horaires réguliers (Roehrs & Roth, 2001)");
      } else if (remPct > 30) {
        conseils.push("🟡 REM élevé possible si récupération de dette ou stress - surveillez sur plusieurs nuits");
      } else {
        conseils.push("✅ REM optimal pour la récupération cognitive et l'apprentissage moteur");
      }
    }
  }

  // 4. CONSEILS SPÉCIFIQUES PRÉ-SÉANCE (optimisation performance)
  if (data.type === 'pre-training') {
    const heures = extractHours(data.duree);
    if (heures && heures < 7) {
      conseils.push("⚡ Performance réduite attendue : Échauffement prolongé +5min, intensité -15% recommandée (Mah et al., 2011)");
    } else if (heures && heures >= 8) {
      conseils.push("🚀 Conditions optimales ! Votre récupération permet une séance à haute intensité (Walker, 2017)");
    } else {
      conseils.push("⚡ Nuit correcte : Hydratation ++, échauffement progressif pour performance optimale");
    }
  }

  return conseils.slice(0, 2); // Max 2 conseils pour éviter surcharge
};

// Générateur de conseils RÉCUPÉRATION post-séance (différent des conseils pré-séance)
const generateRecoveryAdvice = (data: {
  avant: { score: number; qualite: string };
  apres: { score: number; qualite: string };
  seanceData: {
    dureeAvant?: string;
    dureeApres?: string;
    qualiteAvant: string;
    qualiteApres: string;
  };
}) => {
  const conseils: string[] = [];
  const { avant, apres, seanceData } = data;

  // 1. ANALYSE DE L'IMPACT DE LA SÉANCE (Kredlow et al., 2015)
  const evolution = apres.score - avant.score;
  
  if (evolution > 10) {
    conseils.push("🚀 Excellente récupération ! Votre intensité d'entraînement est optimale. Maintenez ce niveau (Reid et al., 2010)");
  } else if (evolution < -10) {
    conseils.push("⚠️ Dégradation du sommeil détectée. Réduisez l'intensité de 20% ou ajoutez un jour de repos (Fullagar et al., 2015)");
  } else {
    conseils.push("📊 Sommeil stable post-séance. Bon équilibre charge/récupération maintenu");
  }

  // 2. CONSEILS SPÉCIFIQUES DE RÉCUPÉRATION
  if (apres.score < 60) {
    conseils.push("🔴 Priorité récupération : Bain froid 10-15min, étirements légers, coucher 1h plus tôt (Halson, 2014)");
  } else if (apres.score >= 60 && apres.score < 80) {
    conseils.push("🟡 Récupération active : Marche 20min, hydratation ++, évitez écrans 2h avant coucher (Chennaoui et al., 2015)");
  } else {
    conseils.push("✅ Récupération optimale ! Continuez cette routine : timing séance, nutrition et hydratation parfaits");
  }

  // 3. CONSEILS TIMING FUTUR (basés sur les patterns observés)
  const heuresAvant = extractHours(seanceData.dureeAvant);
  const heuresApres = extractHours(seanceData.dureeApres);
  
  if (heuresAvant && heuresApres && heuresApres < heuresAvant) {
    conseils.push("🕐 Séance tardive détectée : Programmez prochaines séances 4h+ avant coucher pour éviter excitation (Stutz et al., 2019)");
  }

  return conseils.slice(0, 2);
};

// Fonction utilitaire pour extraire les heures
const extractHours = (duree?: string): number | null => {
  if (!duree) return null;
  const match = duree.match(/(\d+)h(\d+)/);
  if (match) {
    return parseInt(match[1]) + parseInt(match[2]) / 60;
  }
  return null;
};

// Standards médicaux pour l'évaluation du sommeil
const evaluateSleepQuality = (data: {
  duree?: string;
  profond?: string;
  rem?: string;
  regularite?: string;
}) => {
  let score = 0;
  const details: string[] = [];
  
  // 1. Évaluation de la durée (7h30-9h = excellent)
  if (data.duree) {
    const match = data.duree.match(/(\d+)h(\d+)/);
    if (match) {
      const totalMinutes = parseInt(match[1]) * 60 + parseInt(match[2]);
      const heures = totalMinutes / 60;
      
      if (heures >= 7.5 && heures <= 9) {
        score += 25;
        details.push("Durée optimale (7h30-9h)");
      } else if ((heures >= 7 && heures < 7.5) || (heures > 9 && heures <= 9.5)) {
        score += 20;
        details.push("Bonne durée");
      } else if ((heures >= 6.5 && heures < 7) || (heures > 9.5 && heures <= 10)) {
        score += 15;
        details.push("Durée moyenne");
      } else {
        score += 5;
        details.push("Durée insuffisante");
      }
    }
  }

  // 2. Évaluation du sommeil profond (20-25% = excellent)
  if (data.profond) {
    const match = data.profond.match(/(\d+)/);
    if (match) {
      const profondPct = parseInt(match[1]);
      if (profondPct >= 20 && profondPct <= 25) {
        score += 25;
        details.push("Sommeil profond optimal");
      } else if ((profondPct >= 15 && profondPct < 20) || (profondPct > 25 && profondPct <= 30)) {
        score += 20;
        details.push("Bon sommeil profond");
      } else if ((profondPct >= 10 && profondPct < 15) || (profondPct > 30 && profondPct <= 35)) {
        score += 15;
        details.push("Sommeil profond moyen");
      } else {
        score += 5;
        details.push("Sommeil profond insuffisant");
      }
    }
  }

  // 3. Évaluation du REM (20-25% = excellent)
  if (data.rem) {
    const match = data.rem.match(/(\d+)/);
    if (match) {
      const remPct = parseInt(match[1]);
      if (remPct >= 20 && remPct <= 25) {
        score += 25;
        details.push("Phase REM optimale");
      } else if ((remPct >= 15 && remPct < 20) || (remPct > 25 && remPct <= 30)) {
        score += 20;
        details.push("Bonne phase REM");
      } else if ((remPct >= 10 && remPct < 15) || (remPct > 30 && remPct <= 35)) {
        score += 15;
        details.push("Phase REM moyenne");
      } else {
        score += 5;
        details.push("Phase REM insuffisante");
      }
    }
  }

  // 4. Évaluation de la régularité (>85% = excellent)
  if (data.regularite) {
    const match = data.regularite.match(/(\d+)%/);
    if (match) {
      const regPct = parseInt(match[1]);
      if (regPct >= 85) {
        score += 25;
        details.push("Excellente régularité");
      } else if (regPct >= 70) {
        score += 20;
        details.push("Bonne régularité");
      } else if (regPct >= 50) {
        score += 15;
        details.push("Régularité moyenne");
      } else {
        score += 5;
        details.push("Régularité faible");
      }
    }
  }

  // Déterminer la qualité globale
  let qualite = "Mauvais";
  if (score >= 85) qualite = "Excellent";
  else if (score >= 70) qualite = "Bon";  
  else if (score >= 50) qualite = "Moyen";

  return { score, qualite, details };
};

export default function AnalyseDetaillee({ seance, isOpen, onClose }: AnalyseDetailleeProps) {
  if (!isOpen) return null;

  // Analyser les données AVANT et APRÈS
  const analyseAvant = evaluateSleepQuality({
    duree: seance.detailsAvant?.duree || seance.nuitAvant?.duree,
    profond: seance.detailsAvant?.profond,
    rem: seance.detailsAvant?.rem,
    regularite: seance.detailsAvant?.regularite
  });

  const analyseApres = evaluateSleepQuality({
    duree: seance.detailsApres?.duree || seance.nuitApres?.duree,
    profond: seance.detailsApres?.profond,
    rem: seance.detailsApres?.rem,
    regularite: seance.detailsApres?.regularite
  });

  // Conseils DIFFÉRENTS pour avant et après la séance
  const conseilsAvantSeance = generateSleepAdvice({
    duree: seance.detailsAvant?.duree || seance.nuitAvant?.duree,
    profond: seance.detailsAvant?.profond,
    rem: seance.detailsAvant?.rem,
    regularite: seance.detailsAvant?.regularite,
    type: 'pre-training' // Conseils pour optimiser la performance
  });

  const conseilsApresSeance = generateRecoveryAdvice({
    avant: analyseAvant,
    apres: analyseApres,
    seanceData: {
      dureeAvant: seance.detailsAvant?.duree || seance.nuitAvant?.duree,
      dureeApres: seance.detailsApres?.duree || seance.nuitApres?.duree,
      qualiteAvant: analyseAvant.qualite,
      qualiteApres: analyseApres.qualite
    }
  });

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-r from-sky-100 to-blue-100 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Analyse détaillée</h2>
              <p className="text-gray-600 text-sm">{seance.date}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Comparaison AVANT/APRÈS en 2 colonnes */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* GAUCHE: Nuit AVANT */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Nuit AVANT</h3>
                  <div className="text-lg font-bold text-gray-700">{analyseAvant.qualite}</div>
                </div>
              </div>

              {/* Métriques en 2x2 */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500">Durée</div>
                  <div className="font-bold text-gray-800">{seance.detailsAvant?.duree || seance.nuitAvant?.duree || "N/A"}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500">Régularité</div>
                  <div className="font-bold text-gray-800">{seance.detailsAvant?.regularite || "N/A"}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500">Sommeil profond</div>
                  <div className="font-bold text-gray-800">{seance.detailsAvant?.profond || "N/A"}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500">Phase REM</div>
                  <div className="font-bold text-gray-800">{seance.detailsAvant?.rem || "N/A"}</div>
                </div>
              </div>

              {/* Conseils personnalisés */}
              <div className="bg-blue-50 rounded p-2 space-y-1">
                <div className="text-xs font-semibold text-blue-800 mb-1">💡 Conseils pré-séance</div>
                {conseilsAvantSeance.map((conseil, index) => (
                  <div key={index} className="text-xs text-blue-700 leading-tight">
                    {conseil}
                  </div>
                ))}
              </div>
            </div>

            {/* DROITE: Nuit APRÈS */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Nuit APRÈS</h3>
                  <div className="text-lg font-bold text-gray-700">{analyseApres.qualite}</div>
                </div>
              </div>

              {/* Métriques en 2x2 */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500">Durée</div>
                  <div className="font-bold text-gray-800">{seance.detailsApres?.duree || seance.nuitApres?.duree || "N/A"}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500">Régularité</div>
                  <div className="font-bold text-gray-800">{seance.detailsApres?.regularite || "N/A"}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500">Sommeil profond</div>
                  <div className="font-bold text-gray-800">{seance.detailsApres?.profond || "N/A"}</div>
                </div>
                <div className="bg-white rounded p-2">
                  <div className="text-gray-500">Phase REM</div>
                  <div className="font-bold text-gray-800">{seance.detailsApres?.rem || "N/A"}</div>
                </div>
              </div>

              {/* Conseils personnalisés */}
              <div className="bg-green-50 rounded p-2 space-y-1">
                <div className="text-xs font-semibold text-green-800 mb-1">🔄 Conseils récupération</div>
                {conseilsApresSeance.map((conseil, index) => (
                  <div key={index} className="text-xs text-green-700 leading-tight">
                    {conseil}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}