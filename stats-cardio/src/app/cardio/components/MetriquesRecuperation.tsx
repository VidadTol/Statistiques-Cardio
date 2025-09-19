import React from 'react';

interface Props {
  setSelectedZone: (zone: string) => void;
  openRecovery: boolean;
  setOpenRecovery: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MetriquesRecuperation({ setSelectedZone, openRecovery, setOpenRecovery }: Props) {
  return (
    <section>
      {/* En-tête cliquable */}
      <div className="flex items-center gap-3 cursor-pointer mb-6" onClick={() => setOpenRecovery(!openRecovery)}>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
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
        <h3 className="text-lg font-semibold text-gray-800">
          Métriques de Récupération
        </h3>
        <span className="ml-auto">{openRecovery ? '▲' : '▼'}</span>
      </div>
      
      {/* Contenu déroulant */}
      {openRecovery && (
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="space-y-3">
            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-blue-200"
              onClick={() => setSelectedZone("Qualité du sommeil")}
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
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Qualité du sommeil
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-blue-100 rounded-full">
                  <span className="font-semibold text-blue-700">
                    8-9h requises
                  </span>
                </div>
              </div>
            </div>
            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-cyan-200"
              onClick={() => setSelectedZone("Hydratation")}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-200 transition-shadow duration-300">
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
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Hydratation
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-cyan-100 rounded-full">
                  <span className="font-semibold text-cyan-700">
                    1.5L dans 2h
                  </span>
                </div>
              </div>
            </div>
            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-purple-200"
              onClick={() => setSelectedZone("Planning de récupération")}
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Planning récup
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-purple-100 rounded-full">
                  <span className="font-semibold text-purple-700">
                    48-72h
                  </span>
                </div>
              </div>
            </div>
            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-green-200"
              onClick={() => setSelectedZone("Zone de récupération")}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-200 transition-shadow duration-300">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Zone récup active
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-green-100 rounded-full">
                  <span className="font-semibold text-green-700">
                    100-120 bpm
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 mt-2">
              <p className="text-sm text-blue-700 font-medium">
                🛡️ Statut global
              </p>
              <p className="text-xs text-blue-600">
                Récupération intensive recommandée
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}