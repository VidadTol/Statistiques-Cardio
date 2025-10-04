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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header violet */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">📊</span>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Vue d'ensemble</h2>
            <p className="text-white/80 text-sm">Vos données de sommeil avant/après football</p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="p-6">
        {/* Cartes des séances */}
        <div className="space-y-4 mb-6">
          {seances.map((seance, index) => (
            <div key={index} className="bg-green-50 border border-green-200 rounded-xl p-6">
              {/* Header de la séance */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">{seance.date}</h3>
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Séance
                </span>
              </div>

              {/* Données avant/après */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Nuit AVANT:</span>
                  <span className="font-bold text-gray-800">
                    {seance.nuitAvant?.duree} ({seance.nuitAvant?.qualite})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Nuit APRÈS:</span>
                  <span className="font-bold text-gray-800">
                    {seance.nuitApres?.duree} ({seance.nuitApres?.qualite})
                  </span>
                </div>
              </div>

              {/* Bouton détails */}
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                Détails complets
              </button>
            </div>
          ))}

          {/* Message si pas de séances */}
          {seances.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-2">😴</div>
              <p className="font-medium">Aucune séance fusionnée disponible</p>
              <p className="text-sm">Uploadez 2 images pour créer une analyse</p>
            </div>
          )}
        </div>

        {/* Statistiques en bas */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">{nuitsAvantCount}</div>
            <div className="text-sm text-gray-500 font-medium">Nuits AVANT</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">{nuitsApresCount}</div>
            <div className="text-sm text-gray-500 font-medium">Nuits APRÈS</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{seances.length}</div>
            <div className="text-sm text-gray-500 font-medium">Séances total</div>
          </div>
        </div>
      </div>
    </div>
  );
}