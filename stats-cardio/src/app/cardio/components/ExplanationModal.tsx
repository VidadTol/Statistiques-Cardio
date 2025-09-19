// Modale d'explication des zones et métriques cardio
"use client";

import React from "react";
import {
  zoneDefinitions,
  recoveryDefinitions,
  efficiencyDefinitions,
  progressDefinitions,
  analysisDefinitions,
  objectivesDefinitions,
} from "./definitions";

interface ExplanationModalProps {
  selectedZone: string | null;
  setSelectedZone: (zone: string | null) => void;
}

// Helper pour trouver la définition correspondante
const getDefinitionForZone = (selectedZone: string) => {
  const allDefinitions = {
    ...zoneDefinitions,
    ...recoveryDefinitions,
    ...efficiencyDefinitions,
    ...progressDefinitions,
    ...analysisDefinitions,
    ...objectivesDefinitions,
  };

  return allDefinitions[selectedZone as keyof typeof allDefinitions];
};

export default function ExplanationModal({
  selectedZone,
  setSelectedZone,
}: ExplanationModalProps) {
  if (!selectedZone) return null;

  const definition = getDefinitionForZone(selectedZone);

  if (!definition) {
    console.warn(`Aucune définition trouvée pour: ${selectedZone}`);
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {definition.title}
          </h3>
          <button
            onClick={() => setSelectedZone(null)}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            {definition.description}
          </p>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm font-medium text-blue-800">
              💡 Bénéfice principal
            </p>
            <p className="text-sm text-blue-700">{definition.benefits}</p>
          </div>
        </div>
        <button
          onClick={() => setSelectedZone(null)}
          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg py-2 font-medium hover:opacity-90 transition-opacity"
        >
          Compris !
        </button>
      </div>
    </div>
  );
}