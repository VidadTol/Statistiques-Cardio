// src/components/CardioUploader.tsx
"use client";

import { useState } from 'react';
import { FileUp, Loader2 } from 'lucide-react';
import { CardioData } from '@/types/data';

interface CardioUploaderProps {
  onAnalyseExtracted: (data: CardioData) => void;
}

export default function CardioUploader({ onAnalyseExtracted }: CardioUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.tcx')) {
      setError('Format de fichier invalide. Veuillez sélectionner un fichier .tcx.');
      return;
    }

    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');

        const activityNode = xmlDoc.getElementsByTagName('Activity')[0];
        const laps = Array.from(xmlDoc.getElementsByTagName('Lap'));

        if (!activityNode || laps.length === 0) {
          throw new Error('Le fichier TCX est mal formé ou ne contient pas d\'activité valide.');
        }

        const totalDistanceMeters = laps.reduce((sum, lap) => sum + parseFloat(lap.getElementsByTagName('DistanceMeters')[0]?.textContent || '0'), 0);
        const totalCalories = laps.reduce((sum, lap) => sum + parseFloat(lap.getElementsByTagName('Calories')[0]?.textContent || '0'), 0);
        const totalDurationSeconds = laps.reduce((sum, lap) => sum + parseFloat(lap.getElementsByTagName('TotalTimeSeconds')[0]?.textContent || '0'), 0);
        const trackpoints = Array.from(xmlDoc.getElementsByTagName('Trackpoint'));
        const averageHeartRate = trackpoints
            .map(tp => parseFloat(tp.getElementsByTagName('HeartRateBpm')[0]?.textContent || '0'))
            .filter(hr => hr > 0)
            .reduce((sum, hr, _, { length }) => sum + hr / length, 0);

        // EXTRACTION DE LA DATE À PARTIR DU NOM DU FICHIER
        const fileName = file.name;
        const dateMatch = fileName.match(/(\d{4})(\d{2})(\d{2})/);
        
        let activityDate = 'Date inconnue';
        if (dateMatch) {
          const year = dateMatch[1];
          const month = dateMatch[2];
          const day = dateMatch[3];
          activityDate = `${day}/${month}/${year}`;
        }

        const newAnalyse: CardioData = {
          id: `TCX-${Date.now()}`,
          date: activityDate, // UTILISEZ LA NOUVELLE DATE EXTRAITE
          dureeExercice: Math.round(totalDurationSeconds / 60),
          distance: parseFloat((totalDistanceMeters / 1000).toFixed(2)),
          vitesseMoyenne: parseFloat(((totalDistanceMeters / 1000) / (totalDurationSeconds / 3600)).toFixed(2)),
          frequenceCardio: Math.round(averageHeartRate),
          calories: Math.round(totalCalories),
          vo2Max: 0,
          notes: 'Analyse depuis un fichier TCX',
        };

        onAnalyseExtracted(newAnalyse);
      } catch (err) {
        setError("Une erreur est survenue lors de l'analyse du fichier. Le fichier peut être corrompu.");
        console.error("Erreur de parsing TCX:", err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-dashed border-gray-300 rounded-lg shadow-inner">
      <label htmlFor="tcx-file-upload" className="cursor-pointer">
        <div className="flex flex-col items-center">
          {loading ? (
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          ) : (
            <FileUp className="h-12 w-12 text-blue-500" />
          )}
          <p className="mt-4 text-center text-gray-700">
            {loading ? "Analyse en cours..." : "Cliquez pour sélectionner votre fichier TCX"}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Format : .tcx
          </p>
        </div>
      </label>
      <input
        id="tcx-file-upload"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && (
        <p className="mt-4 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}