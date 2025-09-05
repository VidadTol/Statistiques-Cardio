// src/components/TrainingRecommendations.tsx
import { CheckCircle2, ThumbsUp } from 'lucide-react';
import { CardioData } from '@/types/data'; // Importez le type CardioData

export default function TrainingRecommendations({ data }: { data: CardioData }) {
  const recommendations = [
    `Votre performance d'aujourd'hui est de ${data.distance} km en ${data.dureeExercice} minutes.`,
    `Votre FC Moyenne est de ${data.frequenceCardio} bpm. Pensez à ajuster l'intensité.`,
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Recommandations d'Entraînement</h2>
      <ul className="space-y-3">
        {recommendations.map((rec, index) => (
          <li key={index} className="flex items-start text-gray-700">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
            <span>{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}