import React from 'react';

interface Props {
  data: any;
  previousData: any;
  setSelectedZone: (zone: string) => void;
  openEfficiency: boolean;
  setOpenEfficiency: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EfficaciteEnergetique({ data, previousData, setSelectedZone, openEfficiency, setOpenEfficiency }: Props) {
  return (
    <section>
      {/* En-tête cliquable */}
      <div className="flex items-center gap-3 cursor-pointer mb-6" onClick={() => setOpenEfficiency(!openEfficiency)}>
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
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
        <h3 className="text-lg font-semibold text-gray-800">
          Efficacité Énergétique
        </h3>
        <span className="ml-auto">{openEfficiency ? '▲' : '▼'}</span>
      </div>
      
      {/* Contenu déroulant */}
      {openEfficiency && (
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="space-y-3">
              <div
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-red-200"
                onClick={() => setSelectedZone("Calories par km")}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-red-200 transition-shadow duration-300">
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
                          d="M17.657 18.657A8 8 0 716.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">
                    Calories/km
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-red-100 rounded-full">
                    <span className="font-semibold text-red-700">
                      {Math.round(data.calories / data.distance)} cal
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-blue-200"
                onClick={() => setSelectedZone("Calories par minute")}
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
                    Calories/minute
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-blue-100 rounded-full">
                    <span className="font-semibold text-blue-700">
                      {Math.round(data.calories / data.dureeExercice)} cal/min
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-green-200"
                onClick={() => setSelectedZone("Efficacité cardiaque")}
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">
                    Efficacité cardiaque
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-green-100 rounded-full">
                    <span className="font-semibold text-green-700">85%</span>
                  </div>
                </div>
              </div>
              <div
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-purple-200"
                onClick={() => setSelectedZone("Seuil efficacité")}
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">
                    Seuil efficacité
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-purple-100 rounded-full">
                    <span className="font-semibold text-purple-700">
                      155-165 bpm
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-emerald-200"
                onClick={() => setSelectedZone("Amélioration efficacité")}
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
                    Amélioration
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-emerald-100 rounded-full">
                    <span className="font-bold text-emerald-700">
                      {previousData
                        ? `${
                            previousData.calories > 0
                              ? Math.round(
                                  ((data.calories / data.distance -
                                    previousData.calories /
                                      previousData.distance) /
                                    (previousData.calories /
                                      previousData.distance)) *
                                    100
                                )
                              : "+8"
                          }%`
                        : "+8%"}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">efficacité</span>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 mt-2">
                <p className="text-sm text-green-700 font-medium">
                  ✅ Statut global
                </p>
                <p className="text-xs text-green-600">
                  Efficacité énergétique en progression
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }