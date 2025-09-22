// src/app/cardio/page.tsx - Version ultra-moderne
"use client";

import { useState, useEffect } from "react";
import UltraDashboard from "./components/UltraDashboard";
import CardioUploader from "./components/CardioUploader";
import { icons } from "./components/icons";
import { CardioData } from "@/types/data";
import Link from 'next/link';

export default function CardioPage() {
  const [analyses, setAnalyses] = useState<CardioData[]>([]);
  const [selectedSessionIndex, setSelectedSessionIndex] = useState<number>(-1); // -1 = mock data
  const [isUploading, setIsUploading] = useState(false);

  // Synchronisation avec le localStorage
  useEffect(() => {
    try {
      const savedAnalyses = localStorage.getItem("cardioAnalyses");
      if (savedAnalyses) {
        const parsedAnalyses = JSON.parse(savedAnalyses);
        // Trie par date décroissante (format JJ/MM/AAAA)
        const sorted = parsedAnalyses.sort((a: CardioData, b: CardioData) => {
          const [da, ma, ya] = a.date.split("/").map(Number);
          const [db, mb, yb] = b.date.split("/").map(Number);
          const dateA = new Date(ya, ma - 1, da).getTime();
          const dateB = new Date(yb, mb - 1, db).getTime();
          return dateB - dateA;
        });
        setAnalyses(sorted);
        // Sélectionner la plus récente
        if (sorted.length > 0) {
          setSelectedSessionIndex(0);
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors du chargement des données depuis localStorage",
        error
      );
    }
  }, []);

  // Sauvegarder automatiquement les changements
  useEffect(() => {
    if (analyses.length > 0) {
      try {
        localStorage.setItem("cardioAnalyses", JSON.stringify(analyses));
      } catch (error) {
        console.error(
          "Erreur lors de la sauvegarde des données dans localStorage",
          error
        );
      }
    }
  }, [analyses]);

  const handleNewAnalyse = (newAnalyse: CardioData) => {
    setAnalyses((prev) => {
      const updated = [...prev, newAnalyse];
      // Trie par date décroissante
      const sorted = updated.sort((a: CardioData, b: CardioData) => {
        const [da, ma, ya] = a.date.split("/").map(Number);
        const [db, mb, yb] = b.date.split("/").map(Number);
        const dateA = new Date(ya, ma - 1, da).getTime();
        const dateB = new Date(yb, mb - 1, db).getTime();
        return dateB - dateA;
      });
      setSelectedSessionIndex(0); // Sélectionner la plus récente
      return sorted;
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
    localStorage.removeItem("cardioAnalyses");
  };

  const currentData =
    selectedSessionIndex >= 0 && analyses[selectedSessionIndex]
      ? analyses[selectedSessionIndex]
      : null;

  const previousData =
    selectedSessionIndex > 0 && analyses[selectedSessionIndex - 1]
      ? analyses[selectedSessionIndex - 1]
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Header */}
      <div className="bg-white backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 text-blue-600">{icons.pulse}</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Statistiques Cardio
                </h1>
                <p className="text-sm text-gray-600">
                  Analyse avancée de vos performances sportives
                </p>
              </div>
            </div>

            <div className="flex space-x-3">
              {analyses.length > 0 && (
                <select
                  value={selectedSessionIndex}
                  onChange={(e) =>
                    setSelectedSessionIndex(parseInt(e.target.value))
                  }
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {/* Importation des seances */}
                  {analyses.map((analysis, index) => (
                    <option key={analysis.id} value={index}>
                      {analysis.date} - {analysis.distance.toFixed(1)}km
                    </option>
                  ))}
                </select>
              )}

              {!isUploading && (
                <button
                  onClick={handleStartUpload}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5"
                  >
                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>{" "}
                  Importer TCX
                </button>
              )}

              {analyses.length > 0 && (
                <button
                  onClick={handleClearAllAnalyses}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5"
                  >
                    <polyline points="3,6 5,6 21,6" />
                    <path d="m19,6v14a2,2 0,0,1-2,2H7a2,2 0,0,1-2-2V6m3,0V4a2,2 0,0,1,2-2h4a2,2 0,0,1,2,2v2" />
                  </svg>{" "}
                  Tout supprimer
                </button>
              )}

              <Link
                href="/"
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                Retour à la page principale
              </Link>
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
      {currentData ? (
        <UltraDashboard data={currentData} />
      ) : (
        <div className="text-center text-gray-500 py-12">
          Aucune séance disponible. Importez un fichier TCX pour commencer !
        </div>
      )}
    </div>
  );
}
