import React from 'react';

interface HeartRateZones {
  [key: string]: {
    percentage: number;
    duration: number;
  };
}

interface Props {
  heartRateZones: HeartRateZones;
  setSelectedZone: (zone: string) => void;
  openZones: boolean;
  setOpenZones: (fn: (o: boolean) => boolean) => void;
}

export default function RepartitionZonesCardiaques({
  heartRateZones,
  setSelectedZone,
  openZones,
  setOpenZones,
}: Props) {
  // Trouver la zone dominante
  const zones = Object.entries(heartRateZones) as [string, {percentage: number, duration: number}][];
  const dominantZone = zones.reduce((max, current) => current[1].percentage > max[1].percentage ? current : max);
  const dominantDuration = dominantZone[1].duration;
  const dominantPercentage = dominantZone[1].percentage;

  return (
    <div>
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setOpenZones(o => !o)}>
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Répartition des Zones Cardiaques</h3>
        <span className="ml-auto">{openZones ? '▲' : '▼'}</span>
      </div>
      {openZones && (
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-4 border border-white/20 w-full max-w-xl mx-auto">
          <div className="space-y-3">
            {zones.map(([zone, info]) => (
              <div
                key={zone}
                className={`group flex items-center justify-between p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-${zone === 'VO2 Max' ? 'red' : zone === 'Anaérobie' ? 'orange' : zone === 'Aérobie' ? 'green' : zone === 'Intensif' ? 'blue' : 'gray'}-200`}
                onClick={() => setSelectedZone(zone)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-10 h-10 bg-gradient-to-br from-${zone === 'VO2 Max' ? 'red-500 to-red-600' : zone === 'Anaérobie' ? 'orange-500 to-orange-600' : zone === 'Aérobie' ? 'green-500 to-green-600' : zone === 'Intensif' ? 'blue-500 to-blue-600' : 'gray-400 to-gray-500'} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-${zone === 'VO2 Max' ? 'red' : zone === 'Anaérobie' ? 'orange' : zone === 'Aérobie' ? 'green' : zone === 'Intensif' ? 'blue' : 'gray'}-200 transition-shadow duration-300`}>
                      {/* SVG adapté à chaque zone si besoin */}
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12H20" />
                      </svg>
                    </div>
                    <div className={`absolute -top-1 -right-1 w-3 h-3 bg-${zone === 'VO2 Max' ? 'red' : zone === 'Anaérobie' ? 'orange' : zone === 'Aérobie' ? 'green' : zone === 'Intensif' ? 'blue' : 'gray'}-400 rounded-full animate-pulse`}></div>
                  </div>
                  <span className="text-gray-800 font-semibold">{zone}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className={`px-3 py-1 bg-${zone === 'VO2 Max' ? 'red' : zone === 'Anaérobie' ? 'orange' : zone === 'Aérobie' ? 'green' : zone === 'Intensif' ? 'blue' : 'gray'}-100 rounded-full`}>
                    <span className={`font-bold text-${zone === 'VO2 Max' ? 'red' : zone === 'Anaérobie' ? 'orange' : zone === 'Aérobie' ? 'green' : zone === 'Intensif' ? 'blue' : 'gray'}-700`}>{info.percentage}%</span>
                  </div>
                  <span className="text-gray-600 font-medium">{Math.floor(info.duration / 60)}:{String(info.duration % 60).padStart(2, '0')}</span>
                  {/* bpm range à adapter si besoin */}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-3">
              <span className="font-medium">Zone dominante:</span> {dominantZone[0]} ({dominantPercentage}%) pendant {Math.floor(dominantDuration / 60)}:{String(dominantDuration % 60).padStart(2, '0')}
            </p>
            <div className={`rounded-lg p-3 ${
              dominantPercentage > 40 ? 'bg-orange-100' : 
              dominantPercentage > 25 ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              <p className={`text-sm font-medium ${
                dominantPercentage > 40 ? 'text-orange-800' : 
                dominantPercentage > 25 ? 'text-green-800' : 'text-blue-800'
              }`}>🎯 Statut global</p>
              <p className={`text-xs ${
                dominantPercentage > 40 ? 'text-orange-700' : 
                dominantPercentage > 25 ? 'text-green-700' : 'text-blue-700'
              }`}>
                {dominantPercentage > 40 ? 'Séance intensive détectée' : 
                 dominantPercentage > 25 ? 'Séance d\'endurance équilibrée' : 'Séance de récupération active'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
