// Section Historique des Séances - Tableau récapitulatif de toutes les séances
"use client";

import React, { useState, useEffect } from "react";
import { CardioData } from "../../../../types/data";

interface HistoriqueSeancesProps {
  openHistorique: boolean;
  setOpenHistorique: (open: boolean) => void;
  currentSessionId?: string; // Pour exclure la séance actuelle
}

type SortField = 'date' | 'distance' | 'dureeExercice' | 'fcMax' | 'frequenceCardio' | 'calories' | 'vitesseMoyenne';
type SortDirection = 'asc' | 'desc';

// Types de sport disponibles
const SPORT_TYPES = [
  { value: 'Course', label: 'Course', color: 'bg-blue-100 text-blue-700' },
  { value: 'Foot', label: 'Football', color: 'bg-green-100 text-green-700' },
  { value: 'Vélo', label: 'Vélo', color: 'bg-orange-100 text-orange-700' },
];

export default function HistoriqueSeances({
  openHistorique,
  setOpenHistorique,
  currentSessionId
}: HistoriqueSeancesProps) {
  const [seances, setSeances] = useState<CardioData[]>([]);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterType, setFilterType] = useState<string>('all');
  const [editingType, setEditingType] = useState<string | null>(null);

  // Charger les séances depuis localStorage
  useEffect(() => {
    const loadSeances = () => {
      try {
        const saved = localStorage.getItem("cardioAnalyses");
        if (saved) {
          const analyses = JSON.parse(saved) as CardioData[];
          // Exclure la séance actuelle si on est dans le dashboard
          const filteredSeances = currentSessionId 
            ? analyses.filter(seance => seance.id !== currentSessionId)
            : analyses;
          setSeances(filteredSeances);
        }
      } catch (error) {
        console.error("Erreur chargement historique:", error);
      }
    };

    if (openHistorique) {
      loadSeances();
    }
  }, [openHistorique, currentSessionId]);

  // Fonction de debug pour vérifier le localStorage
  const debugLocalStorage = () => {
    try {
      const saved = localStorage.getItem("cardioAnalyses");
      if (saved) {
        const analyses = JSON.parse(saved) as CardioData[];
        console.log("=== DEBUG LOCALSTORAGE ===");
        console.log(`Total séances: ${analyses.length}`);
        analyses.forEach((seance, index) => {
          console.log(`${index + 1}. ${seance.date} - ${seance.type} - ${seance.distance}km - ID: ${seance.id}`);
        });
        console.log("=== FIN DEBUG ===");
      } else {
        console.log("Aucune donnée dans localStorage");
      }
    } catch (error) {
      console.error("Erreur debug:", error);
    }
  };

  // Fonction de tri
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Fonction de suppression
  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette séance ?")) {
      try {
        const saved = localStorage.getItem("cardioAnalyses");
        if (saved) {
          const analyses = JSON.parse(saved) as CardioData[];
          const updatedAnalyses = analyses.filter(seance => seance.id !== id);
          localStorage.setItem("cardioAnalyses", JSON.stringify(updatedAnalyses));
          setSeances(updatedAnalyses.filter(seance => seance.id !== currentSessionId));
        }
      } catch (error) {
        console.error("Erreur suppression:", error);
      }
    }
  };

  // Fonction pour modifier le type de sport
  const handleTypeChange = (id: string, newType: string) => {
    try {
      const saved = localStorage.getItem("cardioAnalyses");
      if (saved) {
        const analyses = JSON.parse(saved) as CardioData[];
        const updatedAnalyses = analyses.map(seance => 
          seance.id === id ? { ...seance, type: newType } : seance
        );
        localStorage.setItem("cardioAnalyses", JSON.stringify(updatedAnalyses));
        
        // Mettre à jour l'état local
        setSeances(prev => prev.map(seance => 
          seance.id === id ? { ...seance, type: newType } : seance
        ));
        setEditingType(null);
      }
    } catch (error) {
      console.error("Erreur modification type:", error);
    }
  };

  // Obtenir les informations de style pour un type de sport
  const getSportTypeInfo = (type: string) => {
    const sportType = SPORT_TYPES.find(s => s.value === type);
    return sportType || { value: type, label: type, color: 'bg-gray-100 text-gray-700' };
  };

  // Trier et filtrer les séances
  const getFilteredAndSortedSeances = () => {
    let filtered = seances;

    // Filtrer par type si nécessaire
    if (filterType !== 'all') {
      filtered = seances.filter(seance => seance.type === filterType);
    }

    // Trier
    return filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Traitement spécial pour les dates (format JJ/MM/AAAA)
      if (sortField === 'date') {
        const [dayA, monthA, yearA] = a.date.split('/').map(Number);
        const [dayB, monthB, yearB] = b.date.split('/').map(Number);
        aValue = new Date(yearA, monthA - 1, dayA).getTime();
        bValue = new Date(yearB, monthB - 1, dayB).getTime();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  // Calculer les statistiques globales
  const getGlobalStats = () => {
    if (seances.length === 0) return null;

    const totalDistance = seances.reduce((sum, s) => sum + s.distance, 0);
    const totalDuration = seances.reduce((sum, s) => sum + s.dureeExercice, 0);
    const totalCalories = seances.reduce((sum, s) => sum + s.calories, 0);
    const avgFC = seances.reduce((sum, s) => sum + s.frequenceCardio, 0) / seances.length;
    const avgSpeed = seances.reduce((sum, s) => sum + s.vitesseMoyenne, 0) / seances.length;

    return {
      totalDistance: totalDistance.toFixed(1),
      totalDuration: Math.round(totalDuration),
      totalCalories,
      avgFC: Math.round(avgFC),
      avgSpeed: avgSpeed.toFixed(1),
      sessionCount: seances.length
    };
  };

  const sortedSeances = getFilteredAndSortedSeances();
  const globalStats = getGlobalStats();
  const types = [...new Set(seances.map(s => s.type).filter(Boolean))];

  // Icône de tri
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↗️' : '↘️';
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
      {/* Header avec toggle */}
      <div 
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => setOpenHistorique(!openHistorique)}
      >
        <div className="flex items-center space-x-3">
          <div className="text-2xl">📋</div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Historique des Séances
          </h2>
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {seances.length} séance{seances.length > 1 ? 's' : ''}
          </span>
          {/* Bouton debug temporaire */}
          <button
            onClick={debugLocalStorage}
            className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium hover:bg-yellow-200"
            title="Debug localStorage"
          >
            🔍 Debug
          </button>
        </div>
        <div className={`transform transition-transform duration-300 ${openHistorique ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Contenu déroulant */}
      {openHistorique && (
        <div className="mt-6 space-y-6">
          {seances.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-lg">Aucune séance enregistrée pour le moment</p>
              <p className="text-sm">Vos prochaines séances apparaîtront ici</p>
            </div>
          ) : (
            <>
              {/* Filtres */}
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-sm font-medium text-gray-700">Filtrer par type :</label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous les types</option>
                  {SPORT_TYPES.map(sport => (
                    <option key={sport.value} value={sport.value}>{sport.label}</option>
                  ))}
                </select>
              </div>

              {/* Tableau */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th 
                        className="text-left p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleSort('date')}
                      >
                        Date {getSortIcon('date')}
                      </th>
                      <th className="text-left p-3">Type</th>
                      <th 
                        className="text-left p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleSort('distance')}
                      >
                        Distance {getSortIcon('distance')}
                      </th>
                      <th 
                        className="text-left p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleSort('dureeExercice')}
                      >
                        Durée {getSortIcon('dureeExercice')}
                      </th>
                      <th 
                        className="text-left p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleSort('frequenceCardio')}
                      >
                        FC Moy {getSortIcon('frequenceCardio')}
                      </th>
                      <th
  className="text-left p-3 cursor-pointer hover:bg-gray-50 transition-colors"
  onClick={() => handleSort('fcMax')}
>
  FC Max {getSortIcon('fcMax')}
</th>
                      <th 
                        className="text-left p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleSort('calories')}
                      >
                        Calories {getSortIcon('calories')}
                      </th>
                      <th 
                        className="text-left p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleSort('vitesseMoyenne')}
                      >
                        Vitesse {getSortIcon('vitesseMoyenne')}
                      </th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedSeances.map((seance) => (
                      <tr key={seance.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-medium">{seance.date}</td>
                        <td className="p-3">
                          {editingType === seance.id ? (
                            <select
                              value={seance.type || 'Course'}
                              onChange={(e) => handleTypeChange(seance.id, e.target.value)}
                              onBlur={() => setEditingType(null)}
                              autoFocus
                              className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              {SPORT_TYPES.map(sport => (
                                <option key={sport.value} value={sport.value}>
                                  {sport.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span 
                              className={`${getSportTypeInfo(seance.type || 'Course').color} px-2 py-1 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity`}
                              onClick={() => setEditingType(seance.id)}
                              title="Cliquer pour modifier le type de sport"
                            >
                              {getSportTypeInfo(seance.type || 'Course').label}
                            </span>
                          )}
                        </td>
                        <td className="p-3">{seance.distance.toFixed(1)} km</td>
                        <td className="p-3">{Math.round(seance.dureeExercice)} min</td>
                        <td className="p-3">{seance.frequenceCardio} bpm</td>
                        <td className="p-3">{seance.fcMax || '-'} bpm</td>
                        <td className="p-3">{seance.calories.toLocaleString()} kcal</td>
                        <td className="p-3">{seance.vitesseMoyenne.toFixed(1)} km/h</td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => setEditingType(seance.id)}
                              className="text-green-600 hover:text-green-800 transition-colors"
                              title="Modifier le type de sport"
                            >
                              ✏️
                            </button>
                            <button 
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              title="Voir détails"
                            >
                              👁️
                            </button>
                            <button 
                              onClick={() => handleDelete(seance.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="Supprimer"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Statistiques globales */}
              {globalStats && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Statistiques globales</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{globalStats.sessionCount}</div>
                      <div className="text-xs text-gray-600">Séances</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{globalStats.totalDistance} km</div>
                      <div className="text-xs text-gray-600">Distance totale</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{Math.floor(globalStats.totalDuration / 60)}h{Math.round(globalStats.totalDuration % 60)}</div>
                      <div className="text-xs text-gray-600">Temps total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{globalStats.avgFC}</div>
                      <div className="text-xs text-gray-600">FC moyenne</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{globalStats.totalCalories.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Calories totales</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">{globalStats.avgSpeed} km/h</div>
                      <div className="text-xs text-gray-600">Vitesse moy</div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}