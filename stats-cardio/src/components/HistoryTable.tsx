// src/components/HistoryTable.tsx
import { CardioData } from '@/types/data';
import { Trash2, Star } from 'lucide-react';
import { useState } from 'react';

interface HistoryTableProps {
  analyses: CardioData[];
  onDelete: (id: string) => void;
  onUpdate?: (id: string, updatedData: Partial<CardioData>) => void;
}

export default function HistoryTable({ analyses, onDelete, onUpdate }: HistoryTableProps) {
  const [editingData, setEditingData] = useState<{[key: string]: Partial<CardioData>}>({});

  const typeOptions = ["Course", "Vélo", "Natation", "Football", "Autre"];
  const terrainOptions = ["Synthétique", "Herbe", "Route", "Piste", "Intérieur", "Autre"];

  // Calcule l'intensité automatiquement basée sur FC Max, VO2 et vitesse
  const calculateIntensity = (data: CardioData): number => {
    let score = 0;
    
    // Basé sur VO2 Max (0-2 points)
    if (data.vo2Max >= 80) score += 2;
    else if (data.vo2Max >= 60) score += 1.5;
    else if (data.vo2Max >= 40) score += 1;
    
    // Basé sur la vitesse (0-2 points)
    if (data.vitesseMoyenne >= 15) score += 2;
    else if (data.vitesseMoyenne >= 12) score += 1.5;
    else if (data.vitesseMoyenne >= 8) score += 1;
    
    // Basé sur FC Max réelle si disponible (0-1 point) - Maintenant avec vraies données !
    if (data.fcMax && data.fcMax >= 180) score += 1;
    else if (data.fcMax && data.fcMax >= 160) score += 0.5;
    
    return Math.min(5, Math.max(1, Math.round(score)));
  };

  const renderStars = (intensity: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < intensity ? "text-yellow-400 fill-current" : "text-gray-300"} 
      />
    ));
  };

  const handleFieldUpdate = (id: string, field: keyof CardioData, value: any) => {
    const updatedData = { ...editingData[id], [field]: value };
    setEditingData(prev => ({ ...prev, [id]: updatedData }));
    onUpdate?.(id, updatedData);
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terrain</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durée</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FC Moy.</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FC Max</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rythme</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VO2 Max</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vitesse</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intensité</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fractionné</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {analyses.map((ana) => {
              const currentIntensity = ana.intensite || calculateIntensity(ana);
              
              return (
                <tr key={ana.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ana.date}</td>
                  
                  {/* Type */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select 
                      value={ana.type || ""} 
                      onChange={(e) => handleFieldUpdate(ana.id, 'type', e.target.value)}
                      className="border rounded px-2 py-1 text-sm w-full max-w-[100px]"
                    >
                      <option value="">Sélectionner</option>
                      {typeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </td>
                  
                  {/* Terrain */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select 
                      value={ana.terrain || ""} 
                      onChange={(e) => handleFieldUpdate(ana.id, 'terrain', e.target.value)}
                      className="border rounded px-2 py-1 text-sm w-full max-w-[100px]"
                    >
                      <option value="">Sélectionner</option>
                      {terrainOptions.map(terrain => (
                        <option key={terrain} value={terrain}>{terrain}</option>
                      ))}
                    </select>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ana.distance.toFixed(2)} km</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ana.dureeExercice} min</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ana.frequenceCardio} bpm</td>
                  
                  {/* FC Max */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ana.fcMax ? `${ana.fcMax} bpm` : "Non disponible"}
                  </td>
                  
                  {/* Rythme */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ana.type === "Football" ? 
                      `${ana.frequenceCardio} bpm` :
                      (ana.dureeExercice && ana.distance ? 
                        `${Math.floor(ana.dureeExercice / ana.distance)}:${String(Math.round((ana.dureeExercice / ana.distance % 1) * 60)).padStart(2, '0')}/km` : 
                        "Non calculé"
                      )
                    }
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ana.vo2Max}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ana.calories.toFixed(0)} kcal</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ana.vitesseMoyenne.toFixed(2)} km/h</td>
                  
                  {/* Intensité avec étoiles */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-1">
                      {renderStars(currentIntensity)}
                      <span className="ml-2 text-xs text-gray-500">({currentIntensity}/5)</span>
                    </div>
                  </td>
                  
                  {/* Fractionné */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ana.intervals && ana.intervals.length > 0 ? "✅" : "❌"}
                  </td>
                  
                  {/* Bouton supprimer */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => onDelete(ana.id)} 
                      className="text-red-600 hover:text-red-900 hover:bg-red-50 p-1 rounded"
                      title="Supprimer cette séance"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}