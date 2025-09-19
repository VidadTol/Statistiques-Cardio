// Ultra Dashboard - Composant principal auto-contenu
"use client";

import React, { useState, useEffect } from "react";
import { CardioData } from "../../../types/data";
import MetricCard from "./MetricCard";
import ProgressRing from "./ProgressRing";
import RepartitionZonesCardiaques from "./Sections/RepartitionZonesCardiaques";
import EfficaciteEnergetique from "./Sections/EfficaciteEnergetique";
import MetriquesRecuperation from "./Sections/MetriquesRecuperation";
import ProgressionComparaisons from "./Sections/ProgressionComparaisons";
import AnalyseProgression from "./Sections/AnalyseProgression";
import ObjectifsChallenges from "./Sections/ObjectifsChallenges";
import {
  zoneDefinitions,
  recoveryDefinitions,
  efficiencyDefinitions,
  progressDefinitions,
  analysisDefinitions,
  objectivesDefinitions,
} from "./definitions";
import { icons } from "./icons";

interface UltraDashboardProps {
  data: CardioData;
  previousData?: CardioData;
}

// Fonction pour calculer les zones cardiaques réelles
const calculateHeartRateZones = (
  heartRateTimeline: any[],
  dureeExercice: number
) => {
  if (!heartRateTimeline || heartRateTimeline.length === 0) {
    // Fallback avec des valeurs par défaut
    return {
      "VO2 Max": {
        percentage: 15,
        duration: Math.round(dureeExercice * 60 * 0.15),
      },
      Anaérobie: {
        percentage: 35,
        duration: Math.round(dureeExercice * 60 * 0.35),
      },
      Aérobie: {
        percentage: 30,
        duration: Math.round(dureeExercice * 60 * 0.3),
      },
      Intensif: {
        percentage: 15,
        duration: Math.round(dureeExercice * 60 * 0.15),
      },
      Léger: { percentage: 5, duration: Math.round(dureeExercice * 60 * 0.05) },
    };
  }

  const zones = {
    "VO2 Max": { count: 0, duration: 0 },
    Anaérobie: { count: 0, duration: 0 },
    Aérobie: { count: 0, duration: 0 },
    Intensif: { count: 0, duration: 0 },
    Léger: { count: 0, duration: 0 },
  };

  const totalPoints = heartRateTimeline.length;

  heartRateTimeline.forEach((point) => {
    const hr = point.heartRate;
    if (hr >= 156) zones["VO2 Max"].count++;
    else if (hr >= 139) zones["Anaérobie"].count++;
    else if (hr >= 121) zones["Aérobie"].count++;
    else if (hr >= 104) zones["Intensif"].count++;
    else zones["Léger"].count++;
  });

  const result: any = {};
  Object.keys(zones).forEach((zone) => {
    const percentage =
      totalPoints > 0
        ? Math.round(
            (zones[zone as keyof typeof zones].count / totalPoints) * 100
          )
        : 0;
    const durationSeconds = Math.round((percentage / 100) * dureeExercice * 60);
    result[zone] = { percentage, duration: durationSeconds };
  });

  return result;
};

export default function UltraDashboard({ data }: { data: CardioData }) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [openZones, setOpenZones] = useState<boolean>(false);
  const [openEfficiency, setOpenEfficiency] = useState<boolean>(false);
  const [openRecovery, setOpenRecovery] = useState<boolean>(false);
  const [openProgression, setOpenProgression] = useState<boolean>(false);
  const [openAnalyse, setOpenAnalyse] = useState<boolean>(false);
  const [openObjectifs, setOpenObjectifs] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [monthlyTarget, setMonthlyTarget] = useState<number>(30);
  const [isEditingTarget, setIsEditingTarget] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Charger l'objectif personnalisé depuis localStorage
    const savedTarget = localStorage.getItem("monthlyDistanceTarget");
    if (savedTarget) {
      setMonthlyTarget(parseInt(savedTarget));
    }
  }, []);

  // Sauvegarder l'objectif quand il change
  const handleTargetChange = (newTarget: number) => {
    if (newTarget > 0 && newTarget <= 1000) {
      // Limite raisonnable
      setMonthlyTarget(newTarget);
      localStorage.setItem("monthlyDistanceTarget", newTarget.toString());
    }
  };

  if (!mounted) {
    return <div className="animate-pulse">Chargement du dashboard...</div>;
  }

  // Calculer les vraies zones cardiaques à partir des données
  const heartRateZones = calculateHeartRateZones(
    data.heartRateTimeline || [],
    data.dureeExercice
  );

  // Récupération des données précédentes depuis localStorage pour comparaisons réelles
  const getPreviousData = () => {
    try {
      const saved = localStorage.getItem("cardioAnalyses");
      if (saved) {
        const analyses = JSON.parse(saved);
        if (analyses.length > 1) {
          // Trouver l'index de la session actuelle
          const currentIndex = analyses.findIndex((a: any) => a.id === data.id);
          if (currentIndex > 0) {
            return analyses[currentIndex - 1];
          }
        }
      }
    } catch (error) {
      console.error("Erreur récupération données précédentes:", error);
    }
    return null;
  };

  const previousData = getPreviousData();

  // Calculs des trends
  const calculateTrend = (current: number, previous?: number) => {
    if (!previous || previous === 0) return null;
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.round(change),
      isPositive: change > 0,
    };
  };

  const distanceTrend = calculateTrend(data.distance, previousData?.distance);
  const durationTrend = calculateTrend(
    data.dureeExercice,
    previousData?.dureeExercice
  );
  const fcMaxTrend = calculateTrend(data.fcMax || 180, previousData?.fcMax);
  const caloriesTrend = calculateTrend(data.calories, previousData?.calories);

  // Calculs pour les anneaux de progression
  const effortIntervals =
    data.intervals?.filter((i: any) => i.type === "effort") || [];
  const intensityPercentage = ((data.intensite || 3) / 5) * 100;
  const vo2Percentage = Math.min((data.vo2Max / 50) * 100, 100); // VO2 Max sur 50 pour une personne normale
  const fcMaxPercentage = Math.min(((data.fcMax || 180) / 200) * 100, 100); // FC Max sur 200 bpm

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            🏃‍♂️ Statistiques Cardio
          </h1>
          <p className="text-gray-600">
            Séance du {data.date} • {data.type} •{" "}
            {effortIntervals.length > 0 ? "Fractionné" : "Continue"}
          </p>
        </div>

        {/* Performance Rings Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            🎯 Performance Rings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
            <div className="text-center space-y-3">
              <ProgressRing
                value={intensityPercentage}
                max={100}
                size={140}
                color="rgb(59, 130, 246)"
                label="Intensité"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {data.intensite}/5
                </p>
                <p className="text-sm text-gray-500">Niveau d'effort</p>
              </div>
            </div>

            <div className="text-center space-y-3">
              <ProgressRing
                value={fcMaxPercentage}
                max={100}
                size={140}
                color="rgb(239, 68, 68)"
                label="FC Max"
              />
              <div>
                <p className="font-semibold text-gray-800">{data.fcMax} bpm</p>
                <p className="text-sm text-gray-500">Fréquence maximale</p>
              </div>
            </div>

            <div className="text-center space-y-3">
              <ProgressRing
                value={Math.min((data.frequenceCardio / 200) * 100, 100)}
                max={100}
                size={140}
                color="rgb(249, 115, 22)"
                label="FC Moy"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {data.frequenceCardio} bpm
                </p>
                <p className="text-sm text-gray-500">Fréquence moyenne</p>
              </div>
            </div>

            <div className="text-center space-y-3">
              <ProgressRing
                value={vo2Percentage}
                max={100}
                size={140}
                color="rgb(34, 197, 94)"
                label="VO2 Max"
              />
              <div>
                <p className="font-semibold text-gray-800">{data.vo2Max}%</p>
                <p className="text-sm text-gray-500">Capacité aérobie</p>
              </div>
            </div>
          </div>
        </div>

        {/* Métriques Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <MetricCard
            title="Distance"
            value={data.distance.toFixed(2)}
            unit="km"
            icon={icons.running}
            color="blue"
            trend={
              distanceTrend
                ? { ...distanceTrend, label: "vs dernière séance" }
                : undefined
            }
          />

          <MetricCard
            title="Durée"
            value={`${Math.floor(data.dureeExercice / 60)}h ${Math.round(
              data.dureeExercice % 60
            )}`}
            unit="min"
            icon={icons.clock}
            color="orange"
            trend={
              durationTrend
                ? {
                    ...durationTrend,
                    isPositive: !durationTrend.isPositive,
                    label: "vs dernière séance",
                  }
                : undefined
            }
          />

          <MetricCard
            title="FC Max"
            value={data.fcMax || 180}
            unit="bpm"
            icon={icons.target}
            color="red"
            trend={
              fcMaxTrend
                ? { ...fcMaxTrend, label: "vs dernière séance" }
                : undefined
            }
          />

          <MetricCard
            title="FC Moyenne"
            value={data.frequenceCardio}
            unit="bpm"
            icon={icons.heart}
            color="purple"
            trend={
              calculateTrend(
                data.frequenceCardio,
                previousData?.frequenceCardio
              )
                ? {
                    ...calculateTrend(
                      data.frequenceCardio,
                      previousData?.frequenceCardio
                    )!,
                    label: "vs dernière séance",
                  }
                : undefined
            }
          />

          <MetricCard
            title="Vitesse Moy"
            value={data.vitesseMoyenne.toFixed(1)}
            unit="km/h"
            icon={icons.speed}
            color="indigo"
            trend={
              calculateTrend(data.vitesseMoyenne, previousData?.vitesseMoyenne)
                ? {
                    ...calculateTrend(
                      data.vitesseMoyenne,
                      previousData?.vitesseMoyenne
                    )!,
                    label: "vs dernière séance",
                  }
                : undefined
            }
          />

          <MetricCard
            title="Calories"
            value={data.calories.toLocaleString()}
            unit="kcal"
            icon={icons.fire}
            color="green"
            trend={
              caloriesTrend
                ? { ...caloriesTrend, label: "vs dernière séance" }
                : undefined
            }
          />
        </div>

        {/* Analyses Avancées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option 1: Zones Cardiaques */}
          <RepartitionZonesCardiaques
            heartRateZones={heartRateZones}
            setSelectedZone={setSelectedZone}
            openZones={openZones}
            setOpenZones={setOpenZones}
          />

          {/* Option 2: Efficacité Énergétique */}
          <EfficaciteEnergetique
            data={data}
            previousData={previousData}
            setSelectedZone={setSelectedZone}
            openEfficiency={openEfficiency}
            setOpenEfficiency={setOpenEfficiency}
          />
        </div>

        {/* Options 3 & 4: Récupération et Progression */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option 3: Récupération */}
          <MetriquesRecuperation
            setSelectedZone={setSelectedZone}
            openRecovery={openRecovery}
            setOpenRecovery={setOpenRecovery}
          />

          {/* Option 4: Progression */}
          <ProgressionComparaisons
            setSelectedZone={setSelectedZone}
            openProgression={openProgression}
            setOpenProgression={setOpenProgression}
          />
        </div>

        {/* Nouvelles Sections - Analyse et Objectifs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Section 5: Analyse de Progression */}
          <AnalyseProgression
            data={data}
            previousData={previousData}
            setSelectedZone={setSelectedZone}
            openAnalyse={openAnalyse}
            setOpenAnalyse={setOpenAnalyse}
          />

          {/* Section 6: Objectifs & Challenges */}
          <ObjectifsChallenges
            setSelectedZone={setSelectedZone}
            openObjectifs={openObjectifs}
            setOpenObjectifs={setOpenObjectifs}
            monthlyTarget={monthlyTarget}
            isEditingTarget={isEditingTarget}
            setIsEditingTarget={setIsEditingTarget}
            handleTargetChange={handleTargetChange}
          />
        </div>
      </div>

      {/* Modale d'explication des zones et métriques */}
      {selectedZone && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {zoneDefinitions[selectedZone as keyof typeof zoneDefinitions]
                  ?.title ||
                  recoveryDefinitions[
                    selectedZone as keyof typeof recoveryDefinitions
                  ]?.title ||
                  efficiencyDefinitions[
                    selectedZone as keyof typeof efficiencyDefinitions
                  ]?.title ||
                  progressDefinitions[
                    selectedZone as keyof typeof progressDefinitions
                  ]?.title ||
                  analysisDefinitions[
                    selectedZone as keyof typeof analysisDefinitions
                  ]?.title ||
                  objectivesDefinitions[
                    selectedZone as keyof typeof objectivesDefinitions
                  ]?.title}
              </h3>
              <button
                onClick={() => setSelectedZone(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                {zoneDefinitions[selectedZone as keyof typeof zoneDefinitions]
                  ?.description ||
                  recoveryDefinitions[
                    selectedZone as keyof typeof recoveryDefinitions
                  ]?.description ||
                  efficiencyDefinitions[
                    selectedZone as keyof typeof efficiencyDefinitions
                  ]?.description ||
                  progressDefinitions[
                    selectedZone as keyof typeof progressDefinitions
                  ]?.description ||
                  analysisDefinitions[
                    selectedZone as keyof typeof analysisDefinitions
                  ]?.description ||
                  objectivesDefinitions[
                    selectedZone as keyof typeof objectivesDefinitions
                  ]?.description}
              </p>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm font-medium text-blue-800">
                  💡 Bénéfice principal
                </p>
                <p className="text-sm text-blue-700">
                  {zoneDefinitions[selectedZone as keyof typeof zoneDefinitions]
                    ?.benefits ||
                    recoveryDefinitions[
                      selectedZone as keyof typeof recoveryDefinitions
                    ]?.benefits ||
                    efficiencyDefinitions[
                      selectedZone as keyof typeof efficiencyDefinitions
                    ]?.benefits ||
                    progressDefinitions[
                      selectedZone as keyof typeof progressDefinitions
                    ]?.benefits ||
                    analysisDefinitions[
                      selectedZone as keyof typeof analysisDefinitions
                    ]?.benefits ||
                    objectivesDefinitions[
                      selectedZone as keyof typeof objectivesDefinitions
                    ]?.benefits}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedZone(null)}
              className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg py-2 font-medium hover:opacity-90 transition-opacity"
            >
              Compris !
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
