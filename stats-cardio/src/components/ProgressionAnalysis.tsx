// src/components/ProgressionAnalysis.tsx
import { ArrowUp, ArrowDown } from 'lucide-react';
import { CardioData } from '@/types/data';

interface ProgressionAnalysisProps {
  currentData: CardioData;
  previousData: CardioData | null;
}

export default function ProgressionAnalysis({ currentData, previousData }: ProgressionAnalysisProps) {
  if (!previousData) {
    return null;
  }
  
  // Fonction pour calculer la différence en pourcentage
  const calculatePercentageDiff = (currentValue: number, previousValue: number) => {
    if (previousValue === 0) return 0; // Évite la division par zéro
    return ((currentValue - previousValue) / previousValue) * 100;
  };

  const distanceDiffPercent = calculatePercentageDiff(currentData.distance, previousData.distance);
  const caloriesDiffPercent = calculatePercentageDiff(currentData.calories, previousData.calories);
  const vo2MaxDiffPercent = calculatePercentageDiff(currentData.vo2Max, previousData.vo2Max);
  const fcMoyDiffPercent = calculatePercentageDiff(currentData.frequenceCardio, previousData.frequenceCardio);

  // Fonction pour déterminer la direction et la couleur pour la progression positive (plus c'est haut, mieux c'est)
  const getPositiveProgressionArrow = (value: number) => {
    if (value > 0) return <ArrowUp size={20} className="text-green-500" />;
    if (value < 0) return <ArrowDown size={20} className="text-red-500" />;
    return null;
  };
  
  // Fonction pour déterminer la direction et la couleur pour la progression négative (plus c'est bas, mieux c'est)
  const getNegativeProgressionArrow = (value: number) => {
    if (value < 0) return <ArrowUp size={20} className="text-green-500" />;
    if (value > 0) return <ArrowDown size={20} className="text-red-500" />;
    return null;
  };

  const formatDiff = (value: number) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Analyse de Progression</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        {/* Progression de la distance */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Distance</p>
          <p className="text-lg font-bold flex items-center justify-center">
            {getPositiveProgressionArrow(distanceDiffPercent)}
            {formatDiff(distanceDiffPercent)}
          </p>
        </div>
        
        {/* Progression des calories (plus il y en a, mieux c'est, dans le cadre d'un entraînement intensif) */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Calories</p>
          <p className="text-lg font-bold flex items-center justify-center">
            {getPositiveProgressionArrow(caloriesDiffPercent)}
            {formatDiff(caloriesDiffPercent)}
          </p>
        </div>
        
        {/* Progression du VO2 Max */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">VO2 Max</p>
          <p className="text-lg font-bold flex items-center justify-center">
            {getPositiveProgressionArrow(vo2MaxDiffPercent)}
            {formatDiff(vo2MaxDiffPercent)}
          </p>
        </div>
        
        {/* Progression de la FC Moyenne (plus c'est bas, mieux c'est) */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">FC Moy</p>
          <p className="text-lg font-bold flex items-center justify-center">
            {getNegativeProgressionArrow(fcMoyDiffPercent)}
            {formatDiff(fcMoyDiffPercent)}
          </p>
        </div>
      </div>
    </div>
  );
}