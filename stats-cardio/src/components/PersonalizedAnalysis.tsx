// src/components/PersonalizedAnalysis.tsx
import { Compass, Zap, Heart, Droplets, Repeat, Clock } from 'lucide-react';
import { CardioData } from '@/types/data'; // Importez le type CardioData

export default function PersonalizedAnalysis({ data }: { data: CardioData }) {
  const analysisPoints = [
    { text: `Distance parcourue : ${data.distance} km`, icon: <Compass className="w-5 h-5 text-blue-500" /> },
    { text: `Durée de l'exercice : ${data.dureeExercice} min`, icon: <Clock className="w-5 h-5 text-yellow-500" /> },
    { text: `Fréquence cardiaque moyenne : ${data.frequenceCardio} bpm`, icon: <Heart className="w-5 h-5 text-red-500" /> },
    { text: `Vitesse moyenne : ${data.vitesseMoyenne} km/h`, icon: <Repeat className="w-5 h-5 text-indigo-500" /> },
    { text: `Calories brûlées : ${data.calories} kcal`, icon: <Droplets className="w-5 h-5 text-green-500" /> },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Analyse Personnalisée</h2>
      <ul className="space-y-3">
        {analysisPoints.map((point, index) => (
          <li key={index} className="flex items-start text-gray-700">
            <span className="mr-3 flex-shrink-0">{point.icon}</span>
            <span>{point.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}