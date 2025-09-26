import React from 'react';
import { CardioData } from '../../../../types/data';

interface Props {
  data: CardioData;
  previousData: CardioData[];
  setSelectedZone: (zone: string) => void;
  openProgression: boolean;
  setOpenProgression: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProgressionComparaisons({ data, previousData, setSelectedZone, openProgression, setOpenProgression }: Props) {
  // FILTRER par type d'activité - ne comparer que les séances du même type
  const currentType = data.type || 'Course'; // Défaut si pas de type
  const sameSportData = previousData.filter(d => (d.type || 'Course') === currentType);
  
  // Debug pour voir les données reçues
  console.log("DEBUG ProgressionComparaisons:", {
    currentData: data.id,
    currentType,
    totalPreviousData: previousData.length,
    sameSportDataLength: sameSportData.length,
    allTypes: [...new Set(previousData.map(d => d.type || 'Course'))]
  });

  // Calculs de progression basés sur VOS vraies données TCX DU MÊME SPORT
  const lastData = sameSportData && sameSportData.length > 0 ? sameSportData[0] : null; // Prendre la première (plus récente)
  const recentData = sameSportData ? sameSportData.slice(0, 5) : []; // 5 dernières séances du même sport
  
  // Si pas de données précédentes, afficher les valeurs actuelles comme baseline
  const isFirstSession = !lastData;
  
  // Calculs de progression par rapport à la dernière séance
  const distanceEvolution = lastData ? ((data.distance - lastData.distance) / lastData.distance) * 100 : 0;
  const fcMaxEvolution = lastData ? (data.fcMax || 0) - (lastData.fcMax || 0) : 0;
  const vitesseEvolution = lastData ? ((data.vitesseMoyenne - lastData.vitesseMoyenne) / lastData.vitesseMoyenne) * 100 : 0;
  const caloriesEvolution = lastData ? ((data.calories - lastData.calories) / lastData.calories) * 100 : 0;

  console.log("DEBUG evolutions vs dernière:", {
    lastData: lastData ? lastData.id : null,
    distanceEvolution,
    fcMaxEvolution, 
    vitesseEvolution,
    currentValues: {
      distance: data.distance,
      fcMax: data.fcMax,
      vitesse: data.vitesseMoyenne
    },
    lastValues: lastData ? {
      distance: lastData.distance,
      fcMax: lastData.fcMax,
      vitesse: lastData.vitesseMoyenne
    } : null
  });

  // Progression moyenne sur les 5 dernières séances
  let progressionMoyenneDistance = 0;
  if (recentData.length >= 2) {
    // Prendre la plus ancienne des 5 dernières vs actuelle
    const oldestInRecent = recentData[recentData.length - 1].distance;
    const currentDistance = data.distance;
    progressionMoyenneDistance = ((currentDistance - oldestInRecent) / oldestInRecent) * 100;
    
    console.log("DEBUG progression distance:", {
      oldestDistance: oldestInRecent,
      currentDistance,
      progression: progressionMoyenneDistance
    });
  } else if (isFirstSession) {
    // Pour la première séance, montrer la distance comme baseline
    progressionMoyenneDistance = data.distance;
  }

  // Calcul du nombre d'améliorations vs dernière séance
  let nbAmeliorations = 0;
  if (distanceEvolution > 0) nbAmeliorations++;
  if (fcMaxEvolution > 0) nbAmeliorations++;
  if (vitesseEvolution > 0) nbAmeliorations++;
  if (caloriesEvolution > 0) nbAmeliorations++;

  // Formatage des valeurs pour l'affichage
  const formatEvolution = (value: number, decimals: number = 0) => {
    if (value > 0) return `+${value.toFixed(decimals)}`;
    return value.toFixed(decimals);
  };

  return (
    <section>
      {/* En-tête cliquable */}
      <div className="flex items-center gap-3 cursor-pointer mb-6" onClick={() => setOpenProgression(!openProgression)}>
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Progression & Comparaisons
        </h3>
        <span className="ml-auto">{openProgression ? '▲' : '▼'}</span>
      </div>
      
      {/* Contenu déroulant */}
      {openProgression && (
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="space-y-3">
            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-emerald-200"
              onClick={() => setSelectedZone("Évolution distance")}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-200 transition-shadow duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Évolution distance
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full ${
                  isFirstSession ? 'bg-blue-100' : 
                  progressionMoyenneDistance > 0 ? 'bg-emerald-100' : 
                  progressionMoyenneDistance < 0 ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <span className={`font-bold text-sm ${
                    isFirstSession ? 'text-blue-700' : 
                    progressionMoyenneDistance > 0 ? 'text-emerald-700' : 
                    progressionMoyenneDistance < 0 ? 'text-red-700' : 'text-gray-700'
                  }`}>
                    {isFirstSession ? `${data.distance.toFixed(1)}km` : `${formatEvolution(progressionMoyenneDistance)}%`}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">{isFirstSession ? 'baseline' : 'sur 5 séances'}</span>
              </div>
            </div>

            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-rose-200"
              onClick={() => setSelectedZone("Évolution FC Max")}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-rose-200 transition-shadow duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Évolution FC Max
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full ${
                  isFirstSession ? 'bg-rose-100' : 
                  fcMaxEvolution > 0 ? 'bg-rose-100' : 
                  fcMaxEvolution < 0 ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <span className={`font-bold text-sm ${
                    isFirstSession ? 'text-rose-700' : 
                    fcMaxEvolution > 0 ? 'text-rose-700' : 
                    fcMaxEvolution < 0 ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {isFirstSession ? `${data.fcMax || 'N/A'}` : `${fcMaxEvolution > 0 ? '+' : ''}${fcMaxEvolution}`}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">bpm{isFirstSession ? ' max' : ''}</span>
              </div>
            </div>

            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-blue-200"
              onClick={() => setSelectedZone("Évolution vitesse")}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-200 transition-shadow duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Évolution vitesse
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full ${
                  isFirstSession ? 'bg-blue-100' : 
                  vitesseEvolution > 0 ? 'bg-blue-100' : 
                  vitesseEvolution < 0 ? 'bg-orange-100' : 'bg-gray-100'
                }`}>
                  <span className={`font-bold text-sm ${
                    isFirstSession ? 'text-blue-700' : 
                    vitesseEvolution > 0 ? 'text-blue-700' : 
                    vitesseEvolution < 0 ? 'text-orange-700' : 'text-gray-700'
                  }`}>
                    {isFirstSession ? `${data.vitesseMoyenne.toFixed(1)}` : `${formatEvolution(vitesseEvolution, 1)}%`}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">{isFirstSession ? 'km/h' : 'vs dernière'}</span>
              </div>
            </div>

            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-purple-200"
              onClick={() => setSelectedZone("Comparaison dernière")}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-200 transition-shadow duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Vs dernière séance
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full ${
                  nbAmeliorations >= 3 ? 'bg-purple-100' : 
                  nbAmeliorations >= 2 ? 'bg-green-100' : 
                  nbAmeliorations >= 1 ? 'bg-yellow-100' : 'bg-gray-100'
                }`}>
                  <span className={`font-bold text-sm ${
                    nbAmeliorations >= 3 ? 'text-purple-700' : 
                    nbAmeliorations >= 2 ? 'text-green-700' : 
                    nbAmeliorations >= 1 ? 'text-yellow-700' : 'text-gray-700'
                  }`}>
                    {nbAmeliorations}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">améliorations</span>
              </div>
            </div>
            <div className={`bg-gradient-to-r rounded-xl p-4 mt-4 border ${
              nbAmeliorations >= 3 ? 'from-purple-50 to-pink-50 border-purple-100' : 
              nbAmeliorations >= 2 ? 'from-green-50 to-emerald-50 border-green-100' : 
              nbAmeliorations >= 1 ? 'from-yellow-50 to-orange-50 border-yellow-100' : 
              'from-gray-50 to-slate-50 border-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center ${
                  nbAmeliorations >= 3 ? 'from-purple-500 to-pink-500' : 
                  nbAmeliorations >= 2 ? 'from-green-500 to-emerald-500' : 
                  nbAmeliorations >= 1 ? 'from-yellow-500 to-orange-500' : 
                  'from-gray-500 to-slate-500'
                }`}>
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={nbAmeliorations >= 2 ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : 
                         nbAmeliorations >= 1 ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : 
                         "M20 12H4"}
                    />
                  </svg>
                </div>
                <div>
                  <p className={`text-sm font-semibold ${
                    nbAmeliorations >= 3 ? 'text-purple-800' : 
                    nbAmeliorations >= 2 ? 'text-green-800' : 
                    nbAmeliorations >= 1 ? 'text-yellow-800' : 'text-gray-800'
                  }`}>
                    {nbAmeliorations >= 3 ? '🚀 Progression exceptionnelle' : 
                     nbAmeliorations >= 2 ? '📈 Bonne progression' : 
                     nbAmeliorations >= 1 ? '⚡ Progression modérée' : '📊 Performance stable'}
                  </p>
                  <p className={`text-xs ${
                    nbAmeliorations >= 3 ? 'text-purple-600' : 
                    nbAmeliorations >= 2 ? 'text-green-600' : 
                    nbAmeliorations >= 1 ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    {lastData ? 
                      `${nbAmeliorations}/4 indicateurs en amélioration vs séance précédente` : 
                      'Première séance enregistrée - pas de comparaison possible'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}