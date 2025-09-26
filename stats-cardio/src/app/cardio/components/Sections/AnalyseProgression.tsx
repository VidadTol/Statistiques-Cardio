import React from 'react';
import { CardioData } from '../../../../types/data';

interface Props {
  data: CardioData;
  previousData: CardioData[];
  setSelectedZone: (zone: string) => void;
  openAnalyse: boolean;
  setOpenAnalyse: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AnalyseProgression({ 
  data, 
  previousData, 
  setSelectedZone, 
  openAnalyse, 
  setOpenAnalyse 
}: Props) {
  // Calculs d'analyse basés sur vos vraies données TCX du même sport
  const lastData = previousData && previousData.length > 0 ? previousData[0] : null;
  const recentData = previousData.slice(0, 10); // 10 dernières séances pour analyse
  
  // Calcul des tendances sur les 10 dernières séances
  const distanceTrend = recentData.length >= 3 ? 
    ((data.distance - recentData[recentData.length - 1].distance) / recentData[recentData.length - 1].distance) * 100 : 0;
  
  const fcMoyenneTrend = recentData.length >= 3 ? 
    data.frequenceCardio - recentData[recentData.length - 1].frequenceCardio : 0;
    
  const vitesseTrend = recentData.length >= 3 ? 
    data.vitesseMoyenne - recentData[recentData.length - 1].vitesseMoyenne : 0;

  // Analyse de la régularité (écart-type des performances)
  const distanceVariability = recentData.length >= 3 ? 
    Math.round(Math.sqrt(recentData.reduce((sum, d) => sum + Math.pow(d.distance - (recentData.reduce((s, x) => s + x.distance, 0) + data.distance) / (recentData.length + 1), 2), 0) / recentData.length) * 100) / 100 : 0;

  // Niveau de forme basé sur les tendances
  const formeLevel = distanceTrend > 5 && vitesseTrend > 0 ? 'excellente' : 
                     distanceTrend > 0 && vitesseTrend >= 0 ? 'bonne' : 
                     distanceTrend >= -5 ? 'stable' : 'en baisse';

  return (
    <div>
      <div className="flex items-center gap-3 cursor-pointer mb-6" onClick={() => setOpenAnalyse(o => !o)}>
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
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
        <h3 className="text-lg font-semibold text-gray-800">
          Analyse de Progression
        </h3>
        <span className="ml-auto">{openAnalyse ? '▲' : '▼'}</span>
      </div>
      
      {/* Contenu déroulant */}
      {openAnalyse && (
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="space-y-3">
            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-emerald-200"
              onClick={() => setSelectedZone("Évolution distance")}
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
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Évolution Distance
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full ${
                  lastData ? (distanceTrend > 0 ? 'bg-emerald-100' : distanceTrend < 0 ? 'bg-red-100' : 'bg-gray-100') : 'bg-blue-100'
                }`}>
                  <span className={`font-bold text-sm ${
                    lastData ? (distanceTrend > 0 ? 'text-emerald-700' : distanceTrend < 0 ? 'text-red-700' : 'text-gray-700') : 'text-blue-700'
                  }`}>
                    {lastData 
                      ? `${distanceTrend > 0 ? '+' : ''}${distanceTrend.toFixed(1)}%`
                      : `${data.distance.toFixed(1)}km`}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">{lastData ? 'tendance 10 séances' : 'baseline'}</span>
              </div>
            </div>

            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-orange-200"
              onClick={() => setSelectedZone("Évolution FC")}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-200 transition-shadow duration-300">
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
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Évolution FC Moy
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full ${
                  lastData ? (fcMoyenneTrend < 0 ? 'bg-green-100' : fcMoyenneTrend > 0 ? 'bg-orange-100' : 'bg-gray-100') : 'bg-blue-100'
                }`}>
                  <span className={`font-bold text-sm ${
                    lastData ? (fcMoyenneTrend < 0 ? 'text-green-700' : fcMoyenneTrend > 0 ? 'text-orange-700' : 'text-gray-700') : 'text-blue-700'
                  }`}>
                    {lastData 
                      ? `${fcMoyenneTrend > 0 ? '+' : ''}${fcMoyenneTrend.toFixed(0)} bpm`
                      : `${data.frequenceCardio} bpm`}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">{lastData ? 'tendance 10 séances' : 'moyenne'}</span>
              </div>
            </div>

            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-purple-200"
              onClick={() => setSelectedZone("Évolution vitesse")}
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Évolution Vitesse
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-3 py-1 rounded-full ${
                  lastData ? (vitesseTrend > 0 ? 'bg-blue-100' : vitesseTrend < 0 ? 'bg-orange-100' : 'bg-gray-100') : 'bg-blue-100'
                }`}>
                  <span className={`font-bold text-sm ${
                    lastData ? (vitesseTrend > 0 ? 'text-blue-700' : vitesseTrend < 0 ? 'text-orange-700' : 'text-gray-700') : 'text-blue-700'
                  }`}>
                    {lastData 
                      ? `${vitesseTrend > 0 ? '+' : ''}${vitesseTrend.toFixed(1)} km/h`
                      : `${data.vitesseMoyenne.toFixed(1)} km/h`}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">{lastData ? 'tendance 10 séances' : 'actuelle'}</span>
              </div>
            </div>

            <div className={`bg-gradient-to-r rounded-xl p-4 mt-4 border ${
              formeLevel === 'excellente' ? 'from-emerald-50 to-teal-50 border-emerald-100' : 
              formeLevel === 'bonne' ? 'from-green-50 to-emerald-50 border-green-100' : 
              formeLevel === 'stable' ? 'from-blue-50 to-indigo-50 border-blue-100' : 
              'from-orange-50 to-red-50 border-orange-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center ${
                  formeLevel === 'excellente' ? 'from-emerald-500 to-teal-500' : 
                  formeLevel === 'bonne' ? 'from-green-500 to-emerald-500' : 
                  formeLevel === 'stable' ? 'from-blue-500 to-indigo-500' : 
                  'from-orange-500 to-red-500'
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
                      d={formeLevel === 'excellente' || formeLevel === 'bonne' ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : 
                         formeLevel === 'stable' ? "M20 12H4" : 
                         "M19 14l-7-7m0 0l-7 7m7-7v18"}
                    />
                  </svg>
                </div>
                <div>
                  <p className={`text-sm font-semibold ${
                    formeLevel === 'excellente' ? 'text-emerald-800' : 
                    formeLevel === 'bonne' ? 'text-green-800' : 
                    formeLevel === 'stable' ? 'text-blue-800' : 'text-orange-800'
                  }`}>
                    {formeLevel === 'excellente' ? '🚀 Forme excellente' : 
                     formeLevel === 'bonne' ? '📈 Bonne progression' : 
                     formeLevel === 'stable' ? '📊 Performance stable' : '⚠️ Forme en baisse'}
                  </p>
                  <p className={`text-xs ${
                    formeLevel === 'excellente' ? 'text-emerald-600' : 
                    formeLevel === 'bonne' ? 'text-green-600' : 
                    formeLevel === 'stable' ? 'text-blue-600' : 'text-orange-600'
                  }`}>
                    {recentData.length >= 3 ? 
                      `Analyse sur ${recentData.length + 1} séances • Variabilité: ${distanceVariability}km` : 
                      lastData ? 'Comparaison avec séance précédente' : 'Première séance - baseline établie'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}