// src/components/PersonalizedAnalysis.tsx
import { Compass, Zap, Heart, Droplets, Repeat, Clock, Target, Activity } from 'lucide-react';
import { CardioData } from '@/types/data'; // Importez le type CardioData

export default function PersonalizedAnalysis({ data }: { data: CardioData }) {
  const analysisPoints = [
    { text: `Distance parcourue : ${data.distance} km`, icon: <Compass className="w-5 h-5 text-blue-500" /> },
    { text: `Durée de l'exercice : ${Math.floor(data.dureeExercice / 60)}h ${Math.round(data.dureeExercice % 60)}min`, icon: <Clock className="w-5 h-5 text-yellow-500" /> },
    { text: `Fréquence cardiaque moyenne : ${data.frequenceCardio} bpm`, icon: <Heart className="w-5 h-5 text-red-500" /> },
    { text: `FC Max atteinte : ${data.fcMax || 'Non disponible'} bpm`, icon: <Target className="w-5 h-5 text-red-600" /> },
    { text: `Vitesse moyenne : ${data.vitesseMoyenne?.toFixed(1) || 0} km/h`, icon: <Repeat className="w-5 h-5 text-indigo-500" /> },
    { text: `Calories brûlées : ${data.calories} kcal`, icon: <Droplets className="w-5 h-5 text-green-500" /> },
  ];

  // Ajouter les informations sur le fractionné si disponibles
  if (data.intervals && data.intervals.length > 0) {
    const effortIntervals = data.intervals.filter(interval => interval.type === 'effort');
    const reposIntervals = data.intervals.filter(interval => interval.type === 'repos');
    
    analysisPoints.push(
      { text: `Type d'entraînement : Fractionné détecté`, icon: <Zap className="w-5 h-5 text-orange-500" /> },
    );

    if (effortIntervals.length > 0) {
      const avgEffortHR = Math.round(effortIntervals.reduce((sum, interval) => sum + interval.avgHeartRate, 0) / effortIntervals.length);
      const avgEffortDuration = Math.round(effortIntervals.reduce((sum, interval) => sum + interval.duration, 0) / effortIntervals.length);
      analysisPoints.push(
        { text: `FC moyenne des efforts : ${avgEffortHR} bpm`, icon: <Heart className="w-5 h-5 text-orange-600" /> },
        { text: `Durée moyenne des efforts : ${Math.floor(avgEffortDuration / 60)}min ${avgEffortDuration % 60}s`, icon: <Clock className="w-5 h-5 text-orange-400" /> }
      );
    }
  } else {
    analysisPoints.push(
      { text: `Type d'entraînement : Séance continue`, icon: <Repeat className="w-5 h-5 text-green-500" /> }
    );
  }

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