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
import HistoriqueSeances from "./Sections/HistoriqueSeances";
import ExplanationModal from "./ExplanationModal";
import { icons } from "./icons";
import { calculateHeartRateZones } from "../utils/heartRateUtils";

interface UltraDashboardProps {
  data: CardioData;
  previousData?: CardioData;
}

export default function UltraDashboard({ data }: { data: CardioData }) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [openZones, setOpenZones] = useState<boolean>(false);
  const [openEfficiency, setOpenEfficiency] = useState<boolean>(false);
  const [openRecovery, setOpenRecovery] = useState<boolean>(false);
  const [openProgression, setOpenProgression] = useState<boolean>(false);
  const [openAnalyse, setOpenAnalyse] = useState<boolean>(false);
  const [openObjectifs, setOpenObjectifs] = useState<boolean>(false);
  const [openHistorique, setOpenHistorique] = useState<boolean>(false);
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

        {/* Section 7: Historique des Séances */}
        <div className="mt-6">
          <HistoriqueSeances
            openHistorique={openHistorique}
            setOpenHistorique={setOpenHistorique}
          />
        </div>
      </div>

      {/* Modale d'explication des zones et métriques */}
      <ExplanationModal
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
      />
    </div>
  );
}
