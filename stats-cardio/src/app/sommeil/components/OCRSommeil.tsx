"use client";

import React, { useCallback, useEffect } from "react";
import { createWorker } from "tesseract.js";

// Interface pour les données extraites
export interface SommeilData {
  date: string;
  badge?: string;
  duree?: string;
  qualite?: string;
  regularite?: string;
  profond?: string;
  rem?: string;
  // Pour les analyses fusionnées
  nuitAvant?: {
    duree?: string;
    qualite?: string;
  };
  nuitApres?: {
    duree?: string;
    qualite?: string;
  };
  detailsAvant?: {
    duree?: string;
    regularite?: string;
    profond?: string;
    rem?: string;
  };
  detailsApres?: {
    duree?: string;
    regularite?: string;
    profond?: string;
    rem?: string;
  };
}

interface OCRProps {
  images: File[];
  onAnalysesExtracted: (analyses: SommeilData[]) => void;
}

export default function OCRSommeil({ images, onAnalysesExtracted }: OCRProps) {

  // Extraire la date depuis le nom de fichier
  const extractDateFromFilename = (filename: string): string => {
    // Pattern pour "nuit du 02 08 25 au 03 08 25"
    const match = filename.match(/(\d{2})\s+(\d{2})\s+(\d{2})\s+au\s+(\d{2})\s+(\d{2})\s+(\d{2})/);
    if (match) {
      const [, d1, m1, y1, d2, m2, y2] = match;
      return `${d1}/${m1}/${y1} - ${d2}/${m2}/${y2}`;
    }
    return new Date().toLocaleDateString();
  };

  // Analyser une image avec OCR
  const analyzeImage = async (file: File): Promise<SommeilData> => {
    console.log("🔍 Analyse OCR de:", file.name);
    
    try {
      const worker = await createWorker('fra');
      const result = await worker.recognize(file);
      const text = result.data.text;
      await worker.terminate();

      console.log("📝 Texte OCR:", text);

      // Extraction des données importantes
      const dureeMatch = text.match(/(?:durée|sommeil|dormi).*?(\d{1,2})[h:](\d{2})/i) || 
                         text.match(/(\d{1,2})[h:](\d{2}).*?(?:sommeil|dormi)/i) ||
                         text.match(/(\d{1,2})h(\d{2})/);
      const duree = dureeMatch ? `${dureeMatch[1]}h${dureeMatch[2]}` : undefined;

      const regulariteMatch = text.match(/(\d{1,3})%/);
      const regularite = regulariteMatch ? `${regulariteMatch[1]}%` : undefined;

      let qualite = undefined;
      if (text.match(/excellent|optimal/i)) qualite = "Excellente";
      else if (text.match(/bien|bonne/i)) qualite = "Bonne";
      else if (text.match(/normal/i)) qualite = "Normale";
      else if (text.match(/mauvais/i)) qualite = "Mauvaise";

      const profondMatch = text.match(/(?:profond|deep).*?(\d{1,2}[h:]?\d{2})/i) ||
                           text.match(/(\d{1,2}[h:]?\d{2}).*?(?:profond|deep)/i) ||
                           text.match(/profond.*?(\d{1,3})%/i);
      const profond = profondMatch ? profondMatch[1] : undefined;

      const remMatch = text.match(/(?:rem|r\.e\.m|paradoxal).*?(\d{1,2}[h:]?\d{2})/i) ||
                       text.match(/(\d{1,2}[h:]?\d{2}).*?(?:rem|r\.e\.m|paradoxal)/i) ||
                       text.match(/(?:rem|r\.e\.m|paradoxal).*?(\d{1,3})%/i) ||
                       text.match(/(?:rem|r\.e\.m|paradoxal).*?(\d{1,2})min/i);
      const rem = remMatch ? remMatch[1] : undefined;

      const analyse: SommeilData = {
        date: extractDateFromFilename(file.name),
        duree,
        qualite,
        regularite,
        profond,
        rem
      };

      console.log("✅ Analyse extraite:", analyse);
      return analyse;

    } catch (error) {
      console.error("❌ Erreur OCR:", error);
      return {
        date: extractDateFromFilename(file.name),
        duree: "Erreur",
        qualite: "Erreur"
      };
    }
  };

  // Traiter toutes les images
  const processImages = useCallback(async () => {
    if (!images || images.length === 0) return;

    console.log("🚀 Traitement de", images.length, "images");

    const analyses: SommeilData[] = [];
    
    for (const image of images) {
      const analyse = await analyzeImage(image);
      analyses.push(analyse);
    }

    console.log("📊 Toutes les analyses:", analyses);
    onAnalysesExtracted(analyses);

  }, [images, onAnalysesExtracted]);

  useEffect(() => {
    processImages();
  }, [processImages]);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <p className="text-blue-700 font-medium">
        🔍 Analyse OCR en cours... ({images?.length || 0} images)
      </p>
      <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
        <div className="bg-blue-600 h-2 rounded-full animate-pulse w-1/2"></div>
      </div>
    </div>
  );
}