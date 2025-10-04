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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Header simple */}
      <div className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-gray-800 font-bold text-lg">Vue d'ensemble</h2>
            <p className="text-gray-600 text-sm">Classification automatique de votre sommeil</p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="p-6">
        {/* Grille de petites cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {seances.map((seance, index) => (
            <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
              {/* Header avec titre et badge */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800 text-sm">{seance.date}</h3>
                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                  Football
                </span>
              </div>

              {/* Données avant/après */}
              <div className="space-y-2 mb-3 text-sm">
                <div>
                  <span className="text-gray-600">Nuit AVANT:</span>
                  <div className="font-bold text-gray-800">
                    {seance.nuitAvant?.duree} ({seance.nuitAvant?.qualite?.toLowerCase()})
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Nuit APRÈS:</span>
                  <div className="font-bold text-gray-800">
                    {seance.nuitApres?.duree} ({seance.nuitApres?.qualite?.toLowerCase()})
                  </div>
                </div>
              </div>

              {/* Bouton détails */}
              <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-2 px-3 rounded text-sm transition-all">
                Détails
              </button>
            </div>
          ))}

          {/* Message si pas de séances */}
          {seances.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
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