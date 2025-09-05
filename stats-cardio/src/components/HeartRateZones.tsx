// src/components/HeartRateZones.tsx
import { HeartRateZone } from '@/types/data';

interface HeartRateZonesProps {
  zones: HeartRateZone[];
  totalDurationSeconds: number; // Durée totale de l'exercice en secondes
}

// Fonction utilitaire pour formater les secondes en MM:SS
const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function HeartRateZones({ zones, totalDurationSeconds }: HeartRateZonesProps) {
  if (!zones || zones.length === 0) {
    return <p className="text-gray-500">Aucune donnée de zone cardiaque disponible.</p>;
  }

  // Trouver la zone dominante (pour l'affichage en bas)
  const dominantZone = zones.reduce((prev, current) => 
    (prev.percentage > current.percentage ? prev : current), zones[0]
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Répartition des Zones Cardiaques</h3>
      <div className="space-y-3">
        {zones.map((zone) => (
          <div key={zone.name} className="flex items-center space-x-4">
            <div className="w-24 text-sm font-medium text-gray-700">{zone.name}</div>
            <div className="flex-grow bg-gray-200 rounded-full h-3 relative overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${zone.percentage}%`,
                  backgroundColor: zone.color,
                }}
              ></div>
            </div>
            <div className="w-16 text-right text-sm text-gray-700">{zone.percentage.toFixed(0)}%</div>
            <div className="w-20 text-right text-sm text-gray-700">{formatDuration(zone.durationSeconds)}</div>
            <div className="w-24 text-right text-sm text-gray-500">{zone.minBpm}-{zone.maxBpm} bpm</div>
          </div>
        ))}
      </div>
      {dominantZone && dominantZone.durationSeconds > 0 && (
        <p className="mt-6 text-sm text-gray-700 flex items-center">
          <span className="text-blue-500 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          Zone dominante : <span className="font-bold ml-1" style={{ color: dominantZone.color }}>{dominantZone.name} ({dominantZone.percentage.toFixed(0)}%)</span> pendant {formatDuration(dominantZone.durationSeconds)}
        </p>
      )}
    </div>
  );
}