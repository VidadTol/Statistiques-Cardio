// src/app/cardio/page.tsx - Version ultra-moderne
"use client";

import { useState, useEffect } from "react";
import UltraDashboard from "./components/UltraDashboard";
import Navbar from "./components/Navbar";
import { CardioData } from "@/types/data";

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
      <Navbar
        analyses={analyses}
        selectedSessionIndex={selectedSessionIndex}
        setSelectedSessionIndex={setSelectedSessionIndex}
        isUploading={isUploading}
        handleStartUpload={handleStartUpload}
        handleClearAllAnalyses={handleClearAllAnalyses}
        handleNewAnalyse={handleNewAnalyse}
        handleCancelUpload={handleCancelUpload}
      />

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
