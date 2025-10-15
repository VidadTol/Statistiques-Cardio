"use client";

import Link from "next/link";
import { icons } from "./icons";
import CardioUploader from "./CardioUploader";
import { CardioData } from "@/types/data";

interface NavbarProps {
  analyses: CardioData[];
  selectedSessionIndex: number;
  setSelectedSessionIndex: (index: number) => void;
  isUploading: boolean;
  handleStartUpload: () => void;
  handleClearAllAnalyses: () => void;
  handleNewAnalyse: (newAnalyse: CardioData) => void;
  handleCancelUpload: () => void;
}

export default function Navbar({
  analyses,
  selectedSessionIndex,
  setSelectedSessionIndex,
  isUploading,
  handleStartUpload,
  handleClearAllAnalyses,
  handleNewAnalyse,
  handleCancelUpload,
}: NavbarProps) {
  return (
    <>
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

            {/* Importation fichier TCX et gestion des analyses */}
            <div className="flex space-x-3">
              {!isUploading && (
                <button
                  onClick={handleStartUpload}
                  className="px-4 py-2 font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
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

              {/* Supprimer toutes les analyses */}
              {analyses.length > 0 && (
                <button
                  onClick={handleClearAllAnalyses}
                  className="px-4 py-2 font-bold bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
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
              
              {/* Bouton pour revenir à la page principale */}
              <Link
                href="/"
                className="px-4 py-2 font-bold bg-gradient-to-r from-gray-400 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer"
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
          <div className="bg-white rounded-xl p-6 shadow-lg border relative">
            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span className="w-8 h-8 text-blue-600 mb-6 ">{icons.refresh}</span>
              Importer votre fichier TCX
            </h3>
            <CardioUploader onAnalyseExtracted={handleNewAnalyse} />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCancelUpload}
                className="text-sm text-red-500 hover:text-red-700 hover:underline transition-colors duration-200"
              >
                Annuler l'import
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 