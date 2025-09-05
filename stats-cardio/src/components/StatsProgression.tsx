// src/components/StatsProgression.tsx
import { ArrowUp, Award, Droplet, HeartPulse } from 'lucide-react';
import { CardioData } from '@/types/data'; // Importez le type CardioData

export default function StatsProgression({ data }: { data: CardioData }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Analyse de Progression</h2>
      <div className="flex justify-between items-center space-x-4">
        <div className="flex items-center text-green-600">
          <ArrowUp className="w-6 h-6 mr-1" />
          <span className="font-medium">Progression intensive</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-blue-600">+{data.distance} km</span>
          <span className="text-sm text-gray-500">Distance</span>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-red-600">-{data.calories} kcal</span>
          <span className="text-sm text-gray-500">Calories</span>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-orange-500">-{data.vo2Max}%</span>
          <span className="text-sm text-gray-500">VO2 Max</span>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-green-500">+{data.frequenceCardio} bpm</span>
          <span className="text-sm text-gray-500">FC Moy</span>
        </div>
      </div>
    </div>
  );
}