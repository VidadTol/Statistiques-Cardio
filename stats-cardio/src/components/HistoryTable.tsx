// src/components/HistoryTable.tsx
import { CardioData } from '@/types/data';
import { Trash2 } from 'lucide-react';

interface HistoryTableProps {
  analyses: CardioData[];
  onDelete: (id: string) => void;
}

export default function HistoryTable({ analyses, onDelete }: HistoryTableProps) {
  // Les champs 'Type', 'Terrain', 'FC Max', 'Rythme' et 'Intensité' ne sont pas encore extraits.
  // Nous les affichons avec un placeholder '---' pour le moment.
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
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {analyses.map((ana) => (
              <tr key={ana.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ana.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">---</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">---</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ana.distance.toFixed(2)} km</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ana.dureeExercice} min</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ana.frequenceCardio} bpm</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">---</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">---</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ana.vo2Max}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ana.calories.toFixed(0)} kcal</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ana.vitesseMoyenne.toFixed(2)} km/h</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">---</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onDelete(ana.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}