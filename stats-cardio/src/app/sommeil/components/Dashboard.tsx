"use client";

import React, { useState } from "react";
import OCRSommeil, { SommeilData } from "./OCRSommeil";
import VueEnsemble from "./VueEnsemble";

export default function Dashboard() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [analyses, setAnalyses] = useState<SommeilData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const imageFiles = Array.from(files);
    console.log("📷 Images sélectionnées:", imageFiles.map(f => f.name));
    
    setSelectedImages(imageFiles);
    setIsProcessing(true);
  };

  const handleAnalysesExtracted = (newAnalyses: SommeilData[]) => {
    console.log("📊 Analyses reçues:", newAnalyses);
    
    // Si on a 2 analyses, essayer de les fusionner
    if (newAnalyses.length === 2) {
      const fusionResult = tryFusionAnalyses(newAnalyses);
      if (fusionResult) {
        console.log("✅ Fusion réussie:", fusionResult);
        setAnalyses([fusionResult]);
      } else {
        console.log("❌ Pas de fusion possible, affichage séparé");
        setAnalyses(newAnalyses);
      }
    } else {
      setAnalyses(newAnalyses);
    }
    
    setIsProcessing(false);
  };

  // Fonction pour fusionner 2 analyses si possible
  const tryFusionAnalyses = (analyses: SommeilData[]): SommeilData | null => {
    if (analyses.length !== 2) return null;

    const [analyse1, analyse2] = analyses;
    
    // Extraire les dates de chaque analyse pour trouver la date commune (séance)
    const dates1 = extractDatesFromRange(analyse1.date);
    const dates2 = extractDatesFromRange(analyse2.date);
    
    // Chercher la date commune
    const dateCommune = dates1.find(d1 => dates2.some(d2 => d1 === d2));
    
    if (dateCommune) {
      console.log("🎯 Date de séance trouvée:", dateCommune);
      
      // Déterminer qui est AVANT et qui est APRÈS
      const isAnalyse1Before = dates1[0] < dateCommune;
      const avant = isAnalyse1Before ? analyse1 : analyse2;
      const apres = isAnalyse1Before ? analyse2 : analyse1;
      
      // Créer l'analyse fusionnée
      const analyseFusionnee: SommeilData = {
        date: dateCommune,
        badge: "⚽ Séance",
        nuitAvant: {
          duree: avant.duree || "N/A",
          qualite: avant.qualite || "N/A"
        },
        nuitApres: {
          duree: apres.duree || "N/A", 
          qualite: apres.qualite || "N/A"
        },
        // Garder les détails pour le modal
        detailsAvant: {
          duree: avant.duree,
          regularite: avant.regularite,
          profond: avant.profond,
          rem: avant.rem
        },
        detailsApres: {
          duree: apres.duree,
          regularite: apres.regularite,
          profond: apres.profond,
          rem: apres.rem
        }
      };
      
      return analyseFusionnee;
    }
    
    return null;
  };

  // Extraire les dates d'une plage comme "02/08/25 - 03/08/25"
  const extractDatesFromRange = (dateRange: string): string[] => {
    const matches = dateRange.match(/(\d{2}\/\d{2}\/\d{2})/g);
    return matches || [];
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Header Moderne */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Analyse du Sommeil
                </h1>
                <p className="text-sm text-gray-600">
                  Analyse avancée de vos nuits avant/après sport
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Container principal */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Upload moderne */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Upload d'Images de Sommeil</h2>
          </div>
          <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isProcessing}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-indigo-500 file:to-purple-600 file:text-white hover:file:from-indigo-600 hover:file:to-purple-700 disabled:opacity-50 transition-all"
            />
            <p className="text-sm text-gray-600 mt-3">
              📱 Glissez vos captures d'écran ici ou cliquez pour sélectionner
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Format supporté: "nuit du 02 08 25 au 03 08 25.jpg"
            </p>
          </div>
        </div>

        {/* OCR Processing */}
        {selectedImages.length > 0 && isProcessing && (
          <OCRSommeil 
            images={selectedImages} 
            onAnalysesExtracted={handleAnalysesExtracted}
          />
        )}

        {/* Vue d'ensemble */}
        {analyses.length > 0 && (
          <VueEnsemble analyses={analyses} />
        )}        {analyses.length === 0 && !isProcessing && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">😴</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Aucune analyse disponible</h3>
            <p className="text-gray-600">Uploadez vos captures d'écran de sommeil pour commencer l'analyse</p>
          </div>
        )}
      </div>
    </div>
  );
}

