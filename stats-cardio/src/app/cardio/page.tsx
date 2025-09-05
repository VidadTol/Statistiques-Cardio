// src/app/cardio/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { CardioData } from '@/types/data';
import CardioUploader from '@/components/CardioUploader';
import StatsProgression from '@/components/StatsProgression';
import PersonalizedAnalysis from '@/components/PersonalizedAnalysis';
import TrainingRecommendations from '@/components/TrainingRecommendations';
import HistoryTable from '@/components/HistoryTable';
import HeartRateZones from '@/components/HeartRateZones';
import ProgressionAnalysis from '@/components/ProgressionAnalysis'; // Importez le nouveau composant
import { Trash2 } from 'lucide-react';

export default function CardioPage() {
  const [analyses, setAnalyses] = useState<CardioData[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    try {
      const savedAnalyses = localStorage.getItem('cardioAnalyses');
      if (savedAnalyses) {
        setAnalyses(JSON.parse(savedAnalyses));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données depuis localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cardioAnalyses', JSON.stringify(analyses));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données dans localStorage", error);
    }
  }, [analyses]);

  const handleNewAnalyse = (newAnalyse: CardioData) => {
    setAnalyses((prev) => [...prev, newAnalyse]);
    setIsUploading(false);
  };

  const handleStartUpload = () => {
    setIsUploading(true);
  };
  
  const handleCancelUpload = () => {
    setIsUploading(false);
  };

  const handleDeleteAnalyse = (idToDelete: string) => {
    setAnalyses(analyses.filter(ana => ana.id !== idToDelete));
  };
  
  const handleClearAllAnalyses = () => {
    setAnalyses([]);
  };

  const lastAnalyse = analyses.length > 0 ? analyses[analyses.length - 1] : null;
  const previousAnalyse = analyses.length > 1 ? analyses[analyses.length - 2] : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-center font-bold mb-8">Analyse Cardio</h1>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Dernière Séance Analysée</h2>
        <div className="flex space-x-2">
          {!isUploading && (
            <button
              onClick={handleStartUpload}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Nouvelle Analyse
            </button>
          )}
          <button
            onClick={handleClearAllAnalyses}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors flex items-center"
          >
            <Trash2 size={20} className="mr-1" />
            Tout supprimer
          </button>
        </div>
      </div>
      
      {isUploading && (
        <div className="my-8">
          <CardioUploader onAnalyseExtracted={handleNewAnalyse} />
          <button onClick={handleCancelUpload} className="mt-4 text-sm text-red-500 hover:underline">
            Annuler
          </button>
        </div>
      )}

      {lastAnalyse ? (
        <>
          {/* Nouveau composant de progression */}
          <ProgressionAnalysis 
            currentData={lastAnalyse} 
            previousData={previousAnalyse} 
          />
          
          <div className="mb-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Séance du {lastAnalyse.date}</h2>
            <StatsProgression data={lastAnalyse} />
            <PersonalizedAnalysis data={lastAnalyse} />
            <TrainingRecommendations data={lastAnalyse} />
            {lastAnalyse.heartRateZones && (
              <HeartRateZones 
                zones={lastAnalyse.heartRateZones} 
                totalDurationSeconds={lastAnalyse.dureeExercice * 60} 
              />
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Aucune analyse enregistrée. Commencez par importer un fichier.</p>
      )}

      {analyses.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Historique complet des séances</h2>
          <HistoryTable analyses={analyses} onDelete={handleDeleteAnalyse} />
        </>
      )}
    </div>
  );
}