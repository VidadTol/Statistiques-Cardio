// src/app/cardio/page.tsx - Version ultra-moderne
'use client';

import { useState, useEffect } from 'react';
import UltraDashboard from './components/UltraDashboard';
import { mockSessionData } from './data/mockData';
import CardioUploader from './components/CardioUploader';
import { CardioData } from '@/types/data';

export default function CardioPage() {
  const [analyses, setAnalyses] = useState<CardioData[]>([]);
  const [selectedSessionIndex, setSelectedSessionIndex] = useState<number>(-1); // -1 = mock data
  const [isUploading, setIsUploading] = useState(false);

  // Synchronisation avec le localStorage
  useEffect(() => {
    try {
      const savedAnalyses = localStorage.getItem('cardioAnalyses');
      if (savedAnalyses) {
        const parsedAnalyses = JSON.parse(savedAnalyses);
        setAnalyses(parsedAnalyses);
        // Auto-sélectionner la dernière session si elle existe
        if (parsedAnalyses.length > 0) {
          setSelectedSessionIndex(parsedAnalyses.length - 1);
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données depuis localStorage", error);
    }
  }, []);

  // Sauvegarder automatiquement les changements
  useEffect(() => {
    if (analyses.length > 0) {
      try {
        localStorage.setItem('cardioAnalyses', JSON.stringify(analyses));
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des données dans localStorage", error);
      }
    }
  }, [analyses]);

  const handleNewAnalyse = (newAnalyse: CardioData) => {
    setAnalyses(prev => {
      const updated = [...prev, newAnalyse];
      setSelectedSessionIndex(updated.length - 1); // Sélectionner la nouvelle session
      return updated;
    });
    setIsUploading(false);
  };

  const handleStartUpload = () => {
    setIsUploading(true);
  };

  const handleCancelUpload = () => {
    setIsUploading(false);
  };

  const handleClearAllAnalyses = () => {
    setAnalyses([]);
    setSelectedSessionIndex(-1); // Retour aux données de démo
  };

  const currentData = selectedSessionIndex >= 0 && analyses[selectedSessionIndex] 
    ? analyses[selectedSessionIndex] 
    : mockSessionData;
  
  const previousData = selectedSessionIndex > 0 && analyses[selectedSessionIndex - 1]
    ? analyses[selectedSessionIndex - 1]
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      
      {/* Navigation Header */}
      <div className="bg-white backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                ⚡ Statistiques Cardio
              </h1>
              <p className="text-sm text-gray-600">
                Analyse avancée de vos performances sportives
              </p>
            </div>
            
            <div className="flex space-x-3">
              {analyses.length > 0 && (
                <select
                  value={selectedSessionIndex}
                  onChange={(e) => setSelectedSessionIndex(parseInt(e.target.value))}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={-1}>🎭 Données de démo</option>
                  {analyses.map((analysis, index) => (
                    <option key={analysis.id} value={index}>
                      📊 {analysis.date} - {analysis.distance.toFixed(1)}km
                    </option>
                  ))}
                </select>
              )}
              
              {!isUploading && (
                <button 
                  onClick={handleStartUpload}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  📁 Importer TCX
                </button>
              )}

              {analyses.length > 0 && (
                <button 
                  onClick={handleClearAllAnalyses}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  🗑️ Tout supprimer
                </button>
              )}
              
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                🔄 Recharger
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      {isUploading && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-white rounded-xl p-6 shadow-lg border">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              📁 Importer votre fichier TCX
            </h3>
            <CardioUploader onAnalyseExtracted={handleNewAnalyse} />
            <button 
              onClick={handleCancelUpload} 
              className="mt-4 text-sm text-red-500 hover:underline"
            >
              Annuler l'import
            </button>
          </div>
        </div>
      )}

      {/* Le Dashboard Ultra-Moderne */}
      <UltraDashboard 
        data={currentData}
      />
      
    </div>
  );
}