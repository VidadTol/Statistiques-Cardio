"use client";

import React from "react";
import { SommeilData } from "./OCRSommeil";

interface VueEnsembleProps {
  analyses: SommeilData[];
}

export default function VueEnsemble({ analyses }: VueEnsembleProps) {
  // Calculer les statistiques basées sur les images analysées
  const seances = analyses.filter(a => a.badge === "⚽ Séance");
  
  // Compter les nuits AVANT et APRÈS depuis les séances fusionnées + analyses individuelles
  let nuitsAvantCount = 0;
  let nuitsApresCount = 0;
  
  analyses.forEach(analyse => {
    if (analyse.badge === "⚽ Séance") {
      // Pour chaque séance fusionnée, on compte 1 nuit avant + 1 nuit après
      nuitsAvantCount += 1;
      nuitsApresCount += 1;
    } else {
      // Pour les analyses individuelles (si pas de fusion)
      nuitsAvantCount += 1;
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-xl">📊</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Vue d'ensemble</h2>
          <p className="text-sm text-gray-600">Vos données de sommeil avant/après football</p>
        </div>
      </div>

      {/* Cartes des séances */}
      <div className="space-y-4 mb-8">
        {seances.map((seance, index) => (
          <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6">
            {/* Date et badge */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{seance.date}</h3>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                ⚽ Séance
              </span>
            </div>

            {/* Nuits avant/après */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Nuit AVANT:</p>
                <p className="font-bold">
                  {seance.nuitAvant?.duree} ({seance.nuitAvant?.qualite})
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Nuit APRÈS:</p>
                <p className="font-bold">
                  {seance.nuitApres?.duree} ({seance.nuitApres?.qualite})
                </p>
              </div>
            </div>

            {/* Bouton détails */}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Détails complets
            </button>
          </div>
        ))}

        {/* Message si pas de séances */}
        {seances.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>Aucune séance fusionnée disponible</p>
          </div>
        )}
      </div>

      {/* Statistiques en bas */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{nuitsAvantCount}</div>
          <div className="text-sm text-gray-600">Nuits AVANT</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{nuitsApresCount}</div>
          <div className="text-sm text-gray-600">Nuits APRÈS</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{seances.length}</div>
          <div className="text-sm text-gray-600">Séances total</div>
        </div>
      </div>
    </div>
  );
}