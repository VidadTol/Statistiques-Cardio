import React from 'react';

interface Props {
  setSelectedZone: (zone: string) => void;
  openObjectifs: boolean;
  setOpenObjectifs: React.Dispatch<React.SetStateAction<boolean>>;
  monthlyTarget: number;
  isEditingTarget: boolean;
  setIsEditingTarget: React.Dispatch<React.SetStateAction<boolean>>;
  handleTargetChange: (newTarget: number) => void;
}

export default function ObjectifsChallenges({ 
  setSelectedZone, 
  openObjectifs, 
  setOpenObjectifs, 
  monthlyTarget, 
  isEditingTarget, 
  setIsEditingTarget, 
  handleTargetChange 
}: Props) {
  return (
    <div>
      <div className="flex items-center gap-3 cursor-pointer mb-6" onClick={() => setOpenObjectifs(o => !o)}>
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
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
        <h3 className="text-lg font-semibold text-gray-800">
          Objectifs & Challenges
        </h3>
        <span className="ml-auto">{openObjectifs ? '▲' : '▼'}</span>
      </div>
      
      {/* Contenu déroulant */}
      {openObjectifs && (
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="space-y-3">
            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-amber-200"
              onClick={() => setSelectedZone("Objectif mensuel")}
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Objectif Distance
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  {(() => {
                    // Calculer le total des distances depuis localStorage
                    try {
                      const saved = localStorage.getItem("cardioAnalyses");
                      let totalDistance = 0;
                      const targetDistance = monthlyTarget; // Objectif personnalisable

                      if (saved) {
                        const analyses = JSON.parse(saved);

                        if (analyses && analyses.length > 0) {
                          totalDistance = analyses.reduce(
                            (sum: number, analysis: any) => {
                              return sum + (analysis.distance || 0);
                            },
                            0
                          );
                        }
                      }

                      const progressPercentage = Math.min(
                        (totalDistance / targetDistance) * 100,
                        100
                      );

                      return (
                        <>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <span className="text-gray-500 text-sm">
                              {totalDistance > 0
                                ? `${totalDistance.toFixed(1)}/`
                                : `Importez des TCX - Objectif: `}
                            </span>
                            {isEditingTarget ? (
                              <input
                                type="number"
                                value={monthlyTarget}
                                onChange={(e) =>
                                  handleTargetChange(
                                    parseInt(e.target.value) || 30
                                  )
                                }
                                onBlur={() => setIsEditingTarget(false)}
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  setIsEditingTarget(false)
                                }
                                onClick={(e) => e.stopPropagation()}
                                className="w-12 px-1 py-0.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                min="1"
                                max="1000"
                                autoFocus
                              />
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Empêcher l'ouverture du modal
                                  setIsEditingTarget(true);
                                }}
                                className="text-gray-700 hover:text-blue-600 text-sm font-medium underline decoration-dotted hover:decoration-solid transition-colors"
                                title="Cliquez pour modifier votre objectif mensuel"
                              >
                                {monthlyTarget}km
                              </button>
                            )}
                            {totalDistance > 0 && (
                              <span className="text-gray-400 text-xs">
                                (
                                {Math.round(
                                  (totalDistance / monthlyTarget) * 100
                                )}
                                %)
                              </span>
                            )}
                          </div>
                        </>
                      );
                    } catch (error) {
                      return (
                        <>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: "73%" }}
                            ></div>
                          </div>
                          <span className="text-gray-500 text-sm ml-2">
                            22/30km
                          </span>
                        </>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>

            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-blue-200"
              onClick={() => setSelectedZone("Challenge vitesse")}
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
                  Challenge Vitesse
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-yellow-100 rounded-full">
                  <span className="text-yellow-700 font-bold text-sm">
                    🏆 2/3
                  </span>
                </div>
              </div>
            </div>

            <div
              className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-purple-200"
              onClick={() => setSelectedZone("Badge régularité")}
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-gray-800 font-semibold">
                  Badge Régularité
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-amber-100 rounded-full">
                  <span className="text-amber-700 font-bold text-sm">
                    ⭐ Débloqué
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mt-4 border border-amber-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
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
                  <p className="text-sm text-amber-800 font-semibold">
                    Motivation du jour
                  </p>
                  <p className="text-xs text-amber-600">
                    {(() => {
                      try {
                        const saved = localStorage.getItem("cardioAnalyses");
                        let totalDistance = 0;

                        if (saved) {
                          const analyses = JSON.parse(saved);
                          if (analyses && analyses.length > 0) {
                            totalDistance = analyses.reduce(
                              (sum: number, analysis: any) => {
                                return sum + (analysis.distance || 0);
                              },
                              0
                            );
                          }
                        }

                        const remaining = monthlyTarget - totalDistance;

                        if (totalDistance === 0) {
                          return `Commencez votre aventure ! Objectif: ${monthlyTarget}km ce mois-ci 🚀`;
                        } else if (remaining > 0) {
                          return `Plus que ${remaining.toFixed(
                            1
                          )}km pour atteindre votre objectif !`;
                        } else {
                          const excess = totalDistance - monthlyTarget;
                          return `🎉 Objectif atteint ! Vous avez dépassé de ${excess.toFixed(
                            1
                          )}km !`;
                        }
                      } catch (error) {
                        return `Plus que ${(monthlyTarget - 22).toFixed(
                          1
                        )}km pour atteindre votre objectif !`;
                      }
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}