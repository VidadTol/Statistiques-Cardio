import React from 'react';

interface Props {
  setSelectedZone: (zone: string) => void;
  openProgression: boolean;
  setOpenProgression: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProgressionComparaisons({ setSelectedZone, openProgression, setOpenProgression }: Props) {
  return (
    <section>
      {/* En-tête cliquable */}
      <div className="flex items-center gap-3 cursor-pointer mb-6" onClick={() => setOpenProgression(!openProgression)}>
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Progression & Comparaisons
        </h3>
        <span className="ml-auto">{openProgression ? '▲' : '▼'}</span>
      </div>
      
      {/* Contenu déroulant */}
      {openProgression && (
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="space-y-3">
            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-emerald-200"
              onClick={() => setSelectedZone("Évolution distance")}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-200 transition-shadow duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Évolution distance
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-emerald-100 rounded-full">
                  <span className="text-emerald-700 font-bold text-sm">
                    +12%
                  </span>
                </div>
                <span className="text-gray-500 text-sm">/semaine</span>
              </div>
            </div>

            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-rose-200"
              onClick={() => setSelectedZone("Évolution FC Max")}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-rose-200 transition-shadow duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Évolution FC Max
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-rose-100 rounded-full">
                  <span className="text-rose-700 font-bold text-sm">+8</span>
                </div>
                <span className="text-gray-500 text-sm">bpm</span>
              </div>
            </div>

            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-blue-200"
              onClick={() => setSelectedZone("Évolution vitesse")}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-200 transition-shadow duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Évolution vitesse
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-blue-100 rounded-full">
                  <span className="text-blue-700 font-bold text-sm">
                    +0.3
                  </span>
                </div>
                <span className="text-gray-500 text-sm">km/h</span>
              </div>
            </div>

            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-purple-200"
              onClick={() => setSelectedZone("Comparaison dernière")}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-200 transition-shadow duration-300">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Vs dernière séance
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-purple-100 rounded-full">
                  <span className="text-purple-700 font-bold text-sm">4</span>
                </div>
                <span className="text-gray-500 text-sm">améliorations</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mt-4 border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-purple-800 font-semibold">
                    Statut global
                  </p>
                  <p className="text-xs text-purple-600">
                    Progression constante sur tous les indicateurs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}