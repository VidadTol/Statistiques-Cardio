"use client";

import React, { useState } from "react";
import OCRSommeil, { SommeilData } from "./OCRSommeil";

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
    setAnalyses(newAnalyses);
    setIsProcessing(false);
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

        {/* Résultats modernes */}
        {analyses.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Analyses Extraites</h2>
            </div>
            {analyses.map((analyse, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Nuit de Sommeil</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">📅</span>
                      <span className="text-sm font-medium text-gray-600">Date</span>
                    </div>
                    <p className="font-bold text-gray-800">{analyse.date}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">⏰</span>
                      <span className="text-sm font-medium text-gray-600">Durée</span>
                    </div>
                    <p className="font-bold text-gray-800">{analyse.duree || "Non détecté"}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">⭐</span>
                      <span className="text-sm font-medium text-gray-600">Qualité</span>
                    </div>
                    <p className="font-bold text-gray-800">{analyse.qualite || "Non détecté"}</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">📊</span>
                      <span className="text-sm font-medium text-gray-600">Régularité</span>
                    </div>
                    <p className="font-bold text-gray-800">{analyse.regularite || "Non détecté"}</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🌙</span>
                      <span className="text-sm font-medium text-gray-600">Sommeil profond</span>
                    </div>
                    <p className="font-bold text-gray-800">{analyse.profond || "Non détecté"}</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🧠</span>
                      <span className="text-sm font-medium text-gray-600">REM</span>
                    </div>
                    <p className="font-bold text-gray-800">{analyse.rem || "Non détecté"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {analyses.length === 0 && !isProcessing && (
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
