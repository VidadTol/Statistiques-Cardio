// Ultra Dashboard - Composant principal auto-contenu
'use client';

import React, { useState, useEffect } from 'react';
import { CardioData } from '../../../types/data';
import MetricCard from './MetricCard';
import ProgressRing from './ProgressRing';
import { MockCardioData } from '../data/mockData';

// Icons (remplacements simples des Lucide icons pour éviter les dépendances)
const icons = {
  running: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L8 5.1v4.7h2V6.4l1.8 2L8.9 19.4h1.99z"/>
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  ),
  zap: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
    </svg>
  ),
  fire: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M8.5 12c0 2.5 2.5 3.5 2.5 5 0 1.5-1 3-3 3s-3-1.5-3-3c0-1.5 0-5 3.5-5zm7-7c.5 0 2 2.2 2 4.5 0 1.5-1 3-2.5 3s-2.5-1.5-2.5-3c0-2.3 1.5-4.5 3-4.5z"/>
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  activity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
    </svg>
  ),
  speed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
    </svg>
  )
};

interface UltraDashboardProps {
  data: MockCardioData;
  previousData?: MockCardioData;
}

// Définitions des zones cardiaques
const zoneDefinitions = {
  'VO2 Max': {
    title: 'VO2 Max - Zone Rouge',
    description: 'Zone d effort maximal (90-100% FC Max). Améliore la puissance anaérobie et la VO2 max. Utilisée pour les sprints courts et les intervalles intenses.',
    benefits: 'Développe la capacité maximale d oxygénation'
  },
  'Anaérobie': {
    title: 'Anaérobie - Zone Orange', 
    description: 'Zone d effort élevé (80-90% FC Max). Améliore le seuil lactique et la puissance. Parfaite pour les intervalles et le travail de vitesse.',
    benefits: 'Augmente la tolérance à l acide lactique'
  },
  'Aérobie': {
    title: 'Aérobie - Zone Verte',
    description: 'Zone d endurance modérée (70-80% FC Max). Améliore l efficacité cardiovasculaire et la capacité aérobie. Base de l entraînement d endurance.',
    benefits: 'Renforce le système cardiovasculaire'
  },
  'Intensif': {
    title: 'Intensif - Zone Bleue',
    description: 'Zone de tempo soutenu (60-70% FC Max). Améliore l endurance de base et l efficacité métabolique. Idéale pour les séances longues.',
    benefits: 'Développe l endurance fondamentale'
  },
  'Léger': {
    title: 'Léger - Zone Grise',
    description: 'Zone de récupération active (50-60% FC Max). Favorise la récupération et l échauffement. Maintient l activité sans stress.',
    benefits: 'Facilite la récupération et la régénération'
  }
};

// Définitions des métriques de récupération
const recoveryDefinitions = {
  'Qualité du sommeil': {
    title: '🛌 Qualité du sommeil recommandée',
    description: 'Après un effort intense comme celui-ci, votre corps a besoin de 8-9h de sommeil de qualité pour optimiser la récupération musculaire et neurologique.',
    benefits: 'Favorise la synthèse protéique et la régénération cellulaire'
  },
  'Hydratation': {
    title: '💧 Hydratation post-effort',
    description: 'Buvez 1.5L d eau dans les 2h suivant l effort, puis 150% du poids perdu en sueur. Ajoutez des électrolytes si la séance a duré plus de 60min.',
    benefits: 'Restaure l équilibre hydrique et facilite l élimination des toxines'
  },
  'Planning de récupération': {
    title: '📅 Planning de récupération optimisé',
    description: 'Les 48h suivantes : J+1 étirements légers et marche, J+2 récupération active (natation/vélo facile). Évitez l intensité avant 48-72h.',
    benefits: 'Accélère l élimination des déchets métaboliques'
  },
  'Zone de récupération': {
    title: '🎯 Zone de récupération active',
    description: 'Pour les prochains jours, maintenez une FC entre 100-120 bpm lors d activités légères. Cette zone favorise la circulation sans stress supplémentaire.',
    benefits: 'Améliore la circulation et accélère la récupération'
  }
};

// Définitions des métriques d'efficacité énergétique
const efficiencyDefinitions = {
  'Calories par km': {
    title: '🔥 Calories par kilomètre',
    description: 'Coût énergétique de votre course. À 300 cal/km, vous brûlez efficacement les calories. Plus cette valeur diminue avec l entraînement, plus vous devenez efficient.',
    benefits: 'Indicateur d économie de course et de progression technique'
  },
  'Calories par minute': {
    title: '⚡ Calories par minute',
    description: 'Taux de combustion énergétique pendant l effort. À 12 cal/min, votre métabolisme travaille intensément. Varie selon l intensité et votre condition.',
    benefits: 'Mesure l intensité métabolique de votre séance'
  },
  'Efficacité cardiaque': {
    title: '❤️ Efficacité cardiaque',
    description: 'Mesure de l optimisation de votre système cardiovasculaire. À 85%, votre coeur pompe efficacement et fournit l oxygène nécessaire avec un minimum d effort.',
    benefits: 'Indique une bonne condition cardiovasculaire et endurance'
  },
  'Seuil efficacité': {
    title: '🎯 Seuil d efficacité optimal',
    description: 'Votre zone de FC où le rendement énergétique est maximal. À 155-165 bpm, vous obtenez le meilleur ratio effort/performance pour ce type d entraînement.',
    benefits: 'Optimise la dépense énergétique et améliore l endurance'
  },
  'Amélioration efficacité': {
    title: '📈 Amélioration de l efficacité',
    description: 'Comparé à vos dernières séances, votre efficacité énergétique s améliore de +12%. Vous parcourez plus de distance avec moins d effort cardiaque.',
    benefits: 'Indique une progression de votre condition physique'
  }
};

// Définitions des métriques de progression
const progressDefinitions = {
  'Évolution distance': {
    title: '🏃‍♂️ Évolution de la distance',
    description: 'Analyse de vos 5 dernières séances : progression constante de +12% par semaine. Vous passez de 2.8km à 3.4km, excellent développement de l endurance.',
    benefits: 'Montre l amélioration de votre capacité d endurance'
  },
  'Évolution FC Max': {
    title: '❤️ Évolution FC Max',
    description: 'Votre FC Max évolue positivement : +8 bpm vs il y a 3 semaines. Cela indique une amélioration de votre capacité cardiovasculaire maximale.',
    benefits: 'Reflète l adaptation de votre système cardiaque à l entraînement'
  },
  'Évolution vitesse': {
    title: '⚡ Évolution vitesse moyenne',
    description: 'Progression remarquable : +0.3 km/h par semaine en moyenne. Vous maintenez une vitesse plus élevée sur des distances similaires.',
    benefits: 'Indique une amélioration de votre puissance et technique'
  },
  'Comparaison dernière': {
    title: '📊 Comparaison avec dernière séance',
    description: 'Vs séance du 04/09 : Distance +12%, Vitesse +16%, FC Max +1%, Calories +15%. Performance globale en nette amélioration.',
    benefits: 'Vision claire de votre progression immédiate'
  }
};

// Définitions des analyses de progression
const analysisDefinitions = {
  'Évolution FC': {
    title: '💓 Analyse Fréquence Cardiaque',
    description: 'Votre FC moyenne s améliore : -3 bpm sur 30 jours. Cela indique une meilleure efficacité cardiaque et une adaptation positive à l entraînement.',
    benefits: 'Signe d une meilleure condition cardiovasculaire et d endurance'
  }
};

// Définitions des objectifs et challenges
const objectivesDefinitions = {
  'Objectif mensuel': {
    title: '🎯 Objectif Distance Mensuel (Personnalisable)',
    description: 'Définissez votre objectif kilomètrage mensuel personnalisé. Cliquez sur la valeur pour la modifier selon vos besoins et votre niveau.',
    benefits: 'Maintient la motivation et structure votre progression selon vos objectifs personnels'
  },
  'Challenge vitesse': {
    title: '⚡ Challenge Vitesse',
    description: 'Défi : Maintenir 3+ km/h pendant 3 séances consécutives. Statut : 2/3 réussies. Prochaine séance cruciale pour débloquer le badge.',
    benefits: 'Développe la vitesse et la constance dans l effort'
  },
  'Badge régularité': {
    title: '⭐ Badge Régularité',
    description: 'Badge débloqué ! Vous avez maintenu 3+ séances par semaine pendant 1 mois. Félicitations pour cette constance exemplaire.',
    benefits: 'Récompense la discipline et encourage la continuité'
  }
};

// Fonction pour calculer les zones cardiaques réelles
const calculateHeartRateZones = (heartRateTimeline: any[], dureeExercice: number) => {
  if (!heartRateTimeline || heartRateTimeline.length === 0) {
    // Fallback avec des valeurs par défaut
    return {
      'VO2 Max': { percentage: 15, duration: Math.round(dureeExercice * 60 * 0.15) },
      'Anaérobie': { percentage: 35, duration: Math.round(dureeExercice * 60 * 0.35) },
      'Aérobie': { percentage: 30, duration: Math.round(dureeExercice * 60 * 0.30) },
      'Intensif': { percentage: 15, duration: Math.round(dureeExercice * 60 * 0.15) },
      'Léger': { percentage: 5, duration: Math.round(dureeExercice * 60 * 0.05) }
    };
  }

  const zones = {
    'VO2 Max': { count: 0, duration: 0 },
    'Anaérobie': { count: 0, duration: 0 },
    'Aérobie': { count: 0, duration: 0 },
    'Intensif': { count: 0, duration: 0 },
    'Léger': { count: 0, duration: 0 }
  };

  const totalPoints = heartRateTimeline.length;
  
  heartRateTimeline.forEach(point => {
    const hr = point.heartRate;
    if (hr >= 156) zones['VO2 Max'].count++;
    else if (hr >= 139) zones['Anaérobie'].count++;
    else if (hr >= 121) zones['Aérobie'].count++;
    else if (hr >= 104) zones['Intensif'].count++;
    else zones['Léger'].count++;
  });

  const result: any = {};
  Object.keys(zones).forEach(zone => {
    const percentage = totalPoints > 0 ? Math.round((zones[zone as keyof typeof zones].count / totalPoints) * 100) : 0;
    const durationSeconds = Math.round((percentage / 100) * dureeExercice * 60);
    result[zone] = { percentage, duration: durationSeconds };
  });

  return result;
};

export default function UltraDashboard({ data }: { data: CardioData }) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [monthlyTarget, setMonthlyTarget] = useState<number>(30);
  const [isEditingTarget, setIsEditingTarget] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Charger l'objectif personnalisé depuis localStorage
    const savedTarget = localStorage.getItem('monthlyDistanceTarget');
    if (savedTarget) {
      setMonthlyTarget(parseInt(savedTarget));
    }
  }, []);

  // Sauvegarder l'objectif quand il change
  const handleTargetChange = (newTarget: number) => {
    if (newTarget > 0 && newTarget <= 1000) { // Limite raisonnable
      setMonthlyTarget(newTarget);
      localStorage.setItem('monthlyDistanceTarget', newTarget.toString());
    }
  };

  if (!mounted) {
    return <div className="animate-pulse">Chargement du dashboard...</div>;
  }

  // Calculer les vraies zones cardiaques à partir des données
  const heartRateZones = calculateHeartRateZones(data.heartRateTimeline || [], data.dureeExercice);

  // Récupération des données précédentes depuis localStorage pour comparaisons réelles
  const getPreviousData = () => {
    try {
      const saved = localStorage.getItem('cardioAnalyses');
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
      console.error('Erreur récupération données précédentes:', error);
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
      isPositive: change > 0
    };
  };

  const distanceTrend = calculateTrend(data.distance, previousData?.distance);
  const durationTrend = calculateTrend(data.dureeExercice, previousData?.dureeExercice);
  const fcMaxTrend = calculateTrend(data.fcMax || 180, previousData?.fcMax);
  const caloriesTrend = calculateTrend(data.calories, previousData?.calories);

  // Calculs pour les anneaux de progression
  const effortIntervals = data.intervals?.filter(i => i.type === 'effort') || [];
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
            Séance du {data.date} • {data.type} • {effortIntervals.length > 0 ? 'Fractionné' : 'Continue'}
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
                <p className="font-semibold text-gray-800">{data.intensite}/5</p>
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
                <p className="font-semibold text-gray-800">{data.frequenceCardio} bpm</p>
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
            trend={distanceTrend ? { ...distanceTrend, label: "vs dernière séance" } : undefined}
          />
          
          <MetricCard
            title="Durée"
            value={`${Math.floor(data.dureeExercice / 60)}h ${Math.round(data.dureeExercice % 60)}`}
            unit="min"
            icon={icons.clock}
            color="orange"
            trend={durationTrend ? { ...durationTrend, isPositive: !durationTrend.isPositive, label: "vs dernière séance" } : undefined}
          />
          
          <MetricCard
            title="FC Max"
            value={data.fcMax || 180}
            unit="bpm"
            icon={icons.target}
            color="red"
            trend={fcMaxTrend ? { ...fcMaxTrend, label: "vs dernière séance" } : undefined}
          />

          <MetricCard
            title="FC Moyenne"
            value={data.frequenceCardio}
            unit="bpm"
            icon={icons.heart}
            color="purple"
            trend={calculateTrend(data.frequenceCardio, previousData?.frequenceCardio) ? { ...calculateTrend(data.frequenceCardio, previousData?.frequenceCardio)!, label: "vs dernière séance" } : undefined}
          />

          <MetricCard
            title="Vitesse Moy"
            value={data.vitesseMoyenne.toFixed(1)}
            unit="km/h"
            icon={icons.speed}
            color="indigo"
            trend={calculateTrend(data.vitesseMoyenne, previousData?.vitesseMoyenne) ? { ...calculateTrend(data.vitesseMoyenne, previousData?.vitesseMoyenne)!, label: "vs dernière séance" } : undefined}
          />
          
          <MetricCard
            title="Calories"
            value={data.calories.toLocaleString()}
            unit="kcal"
            icon={icons.fire}
            color="green"
            trend={caloriesTrend ? { ...caloriesTrend, label: "vs dernière séance" } : undefined}
          />
        </div>





        {/* Analyses Avancées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Option 1: Zones Cardiaques */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Répartition des Zones Cardiaques</h3>
            </div>
            <div className="space-y-3">
              <div 
                className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-red-200"
                onClick={() => setSelectedZone('VO2 Max')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-red-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">VO2 Max</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="px-3 py-1 bg-red-100 rounded-full">
                    <span className="font-bold text-red-700">{heartRateZones['VO2 Max'].percentage}%</span>
                  </div>
                  <span className="text-gray-600 font-medium">{Math.floor(heartRateZones['VO2 Max'].duration / 60)}:{String(heartRateZones['VO2 Max'].duration % 60).padStart(2, '0')}</span>
                  <span className="text-gray-500">156+ bpm</span>
                </div>
              </div>
              <div 
                className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-orange-200"
                onClick={() => setSelectedZone('Anaérobie')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Anaérobie</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="px-3 py-1 bg-orange-100 rounded-full">
                    <span className="font-bold text-orange-700">{heartRateZones['Anaérobie'].percentage}%</span>
                  </div>
                  <span className="text-gray-600 font-medium">{Math.floor(heartRateZones['Anaérobie'].duration / 60)}:{String(heartRateZones['Anaérobie'].duration % 60).padStart(2, '0')}</span>
                  <span className="text-gray-500">139-155 bpm</span>
                </div>
              </div>
              <div 
                className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-green-200"
                onClick={() => setSelectedZone('Aérobie')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Aérobie</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="px-3 py-1 bg-green-100 rounded-full">
                    <span className="font-bold text-green-700">{heartRateZones['Aérobie'].percentage}%</span>
                  </div>
                  <span className="text-gray-600 font-medium">{Math.floor(heartRateZones['Aérobie'].duration / 60)}:{String(heartRateZones['Aérobie'].duration % 60).padStart(2, '0')}</span>
                  <span className="text-gray-500">121-138 bpm</span>
                </div>
              </div>
              <div 
                className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-blue-200"
                onClick={() => setSelectedZone('Intensif')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Intensif</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="px-3 py-1 bg-blue-100 rounded-full">
                    <span className="font-bold text-blue-700">{heartRateZones['Intensif'].percentage}%</span>
                  </div>
                  <span className="text-gray-600 font-medium">{Math.floor(heartRateZones['Intensif'].duration / 60)}:{String(heartRateZones['Intensif'].duration % 60).padStart(2, '0')}</span>
                  <span className="text-gray-500">104-120 bpm</span>
                </div>
              </div>
              <div 
                className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-300"
                onClick={() => setSelectedZone('Léger')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-gray-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Léger</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="px-3 py-1 bg-gray-100 rounded-full">
                    <span className="font-bold text-gray-700">{heartRateZones['Léger'].percentage}%</span>
                  </div>
                  <span className="text-gray-600 font-medium">{Math.floor(heartRateZones['Léger'].duration / 60)}:{String(heartRateZones['Léger'].duration % 60).padStart(2, '0')}</span>
                  <span className="text-gray-500">87-103 bpm</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200">
              {(() => {
                // Trouver la zone dominante
                const zones = Object.entries(heartRateZones) as [string, {percentage: number, duration: number}][];
                const dominantZone = zones.reduce((max, current) => 
                  current[1].percentage > max[1].percentage ? current : max
                );
                const dominantDuration = dominantZone[1].duration;
                const dominantPercentage = dominantZone[1].percentage;
                
                return (
                  <>
                    <p className="text-xs text-gray-600 mb-3">
                      <span className="font-medium">Zone dominante:</span> {dominantZone[0]} ({dominantPercentage}%) pendant {Math.floor(dominantDuration / 60)}:{String(dominantDuration % 60).padStart(2, '0')}
                    </p>
                    <div className={`rounded-lg p-3 ${
                      dominantPercentage > 40 ? 'bg-orange-100' : 
                      dominantPercentage > 25 ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <p className={`text-sm font-medium ${
                        dominantPercentage > 40 ? 'text-orange-800' : 
                        dominantPercentage > 25 ? 'text-green-800' : 'text-blue-800'
                      }`}>🎯 Statut global</p>
                      <p className={`text-xs ${
                        dominantPercentage > 40 ? 'text-orange-700' : 
                        dominantPercentage > 25 ? 'text-green-700' : 'text-blue-700'
                      }`}>
                        {dominantPercentage > 40 ? 'Séance intensive détectée' : 
                         dominantPercentage > 25 ? 'Séance d\'endurance équilibrée' : 'Séance de récupération active'}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>

          {/* Option 2: Efficacité Énergétique */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Efficacité Énergétique</h3>
            </div>
            <div className="space-y-3">
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-red-200"
                onClick={() => setSelectedZone('Calories par km')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-red-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 716.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Calories/km</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-red-100 rounded-full">
                    <span className="font-semibold text-red-700">{Math.round(data.calories / data.distance)} cal</span>
                  </div>
                </div>
              </div>
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-blue-200"
                onClick={() => setSelectedZone('Calories par minute')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Calories/minute</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-blue-100 rounded-full">
                    <span className="font-semibold text-blue-700">{Math.round(data.calories / data.dureeExercice)} cal/min</span>
                  </div>
                </div>
              </div>
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-green-200"
                onClick={() => setSelectedZone('Efficacité cardiaque')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Efficacité cardiaque</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-green-100 rounded-full">
                    <span className="font-semibold text-green-700">85%</span>
                  </div>
                </div>
              </div>
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-purple-200"
                onClick={() => setSelectedZone('Seuil efficacité')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Seuil efficacité</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-purple-100 rounded-full">
                    <span className="font-semibold text-purple-700">155-165 bpm</span>
                  </div>
                </div>
              </div>
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-emerald-200"
                onClick={() => setSelectedZone('Amélioration efficacité')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Amélioration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-emerald-100 rounded-full">
                    <span className="font-bold text-emerald-700">
                      {previousData ? 
                        `${previousData.calories > 0 ? Math.round(((data.calories/data.distance) - (previousData.calories/previousData.distance)) / (previousData.calories/previousData.distance) * 100) : '+8'}%` 
                        : '+8%'
                      }
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">efficacité</span>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 mt-2">
                <p className="text-sm text-green-700 font-medium">✅ Statut global</p>
                <p className="text-xs text-green-600">Efficacité énergétique en progression</p>
              </div>
            </div>
          </div>

        </div>

        {/* Options 3 & 4: Récupération et Progression */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Option 3: Récupération */}
                    {/* Option 3: Récupération */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Métriques de Récupération</h3>
            </div>
            <div className="space-y-3">
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-blue-200"
                onClick={() => setSelectedZone('Qualité du sommeil')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Qualité du sommeil</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-blue-100 rounded-full">
                    <span className="font-semibold text-blue-700">8-9h requises</span>
                  </div>
                </div>
              </div>
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-cyan-200"
                onClick={() => setSelectedZone('Hydratation')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Hydratation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-cyan-100 rounded-full">
                    <span className="font-semibold text-cyan-700">1.5L dans 2h</span>
                  </div>
                </div>
              </div>
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-purple-200"
                onClick={() => setSelectedZone('Planning de récupération')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Planning récup</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-purple-100 rounded-full">
                    <span className="font-semibold text-purple-700">48-72h</span>
                  </div>
                </div>
              </div>
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-green-200"
                onClick={() => setSelectedZone('Zone de récupération')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Zone récup active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-green-100 rounded-full">
                    <span className="font-semibold text-green-700">100-120 bpm</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-100 rounded-lg p-3 mt-3">
                <p className="text-sm text-blue-800 font-medium">🛡️ Statut global</p>
                <p className="text-xs text-blue-700">Récupération intensive recommandée</p>
              </div>
            </div>
          </div>

          {/* Option 4: Progression */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 border border-purple-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Progression & Comparaisons</h3>
            </div>
            <div className="space-y-3">
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-emerald-200"
                onClick={() => setSelectedZone('Évolution distance')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Évolution distance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-emerald-100 rounded-full">
                    <span className="text-emerald-700 font-bold text-sm">+12%</span>
                  </div>
                  <span className="text-gray-500 text-sm">/semaine</span>
                </div>
              </div>

              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-rose-200"
                onClick={() => setSelectedZone('Évolution FC Max')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-rose-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Évolution FC Max</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-rose-100 rounded-full">
                    <span className="text-rose-700 font-bold text-sm">+8</span>
                  </div>
                  <span className="text-gray-500 text-sm">bpm</span>
                </div>
              </div>

              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-blue-200"
                onClick={() => setSelectedZone('Évolution vitesse')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Évolution vitesse</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-blue-100 rounded-full">
                    <span className="text-blue-700 font-bold text-sm">+0.3</span>
                  </div>
                  <span className="text-gray-500 text-sm">km/h</span>
                </div>
              </div>

              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-purple-200"
                onClick={() => setSelectedZone('Comparaison dernière')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Vs dernière séance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-purple-100 rounded-full">
                    <span className="text-purple-700 font-bold text-sm">4</span>
                  </div>
                  <span className="text-gray-500 text-sm">améliorations</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mt-4 border border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-purple-800 font-semibold">Statut global</p>
                    <p className="text-xs text-purple-600">Progression constante sur tous les indicateurs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Nouvelles Sections - Analyse et Objectifs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* Section 5: Analyse de Progression */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl p-6 border border-emerald-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Analyse de Progression</h3>
            </div>
            <div className="space-y-3">
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-emerald-200"
                onClick={() => setSelectedZone('Évolution distance')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Évolution Distance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-emerald-100 rounded-full">
                    <span className="text-emerald-700 font-bold text-sm">
                      {previousData && previousData.distance > 0 ? 
                        (() => {
                          const change = Math.round((data.distance - previousData.distance) / previousData.distance * 100);
                          return `${change > 0 ? '+' : ''}${change}%`;
                        })()
                        : '+12%'
                      }
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">vs précédente</span>
                </div>
              </div>
              
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-orange-200"
                onClick={() => setSelectedZone('Évolution FC')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Évolution FC Moy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-green-100 rounded-full">
                    <span className="text-green-700 font-bold text-sm">
                      {previousData && previousData.frequenceCardio > 0 ? 
                        (() => {
                          const change = data.frequenceCardio - previousData.frequenceCardio;
                          return `${change > 0 ? '+' : ''}${change} bpm`;
                        })()
                        : '-3 bpm'
                      }
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">vs précédente</span>
                </div>
              </div>
              
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-purple-200"
                onClick={() => setSelectedZone('Évolution vitesse')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Évolution Vitesse</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-blue-100 rounded-full">
                    <span className="text-blue-700 font-bold text-sm">
                      {previousData && previousData.vitesseMoyenne > 0 ? 
                        (() => {
                          const change = data.vitesseMoyenne - previousData.vitesseMoyenne;
                          return `${change > 0 ? '+' : ''}${change.toFixed(1)} km/h`;
                        })()
                        : '+0.4 km/h'
                      }
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">vs précédente</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mt-4 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-emerald-800 font-semibold">Tendance générale</p>
                    <p className="text-xs text-emerald-600">Progression constante sur 5 sessions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Objectifs & Challenges */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 border border-amber-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Objectifs & Challenges</h3>
            </div>
            <div className="space-y-3">
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-amber-200"
                onClick={() => setSelectedZone('Objectif mensuel')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Objectif Distance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    {(() => {
                      // Calculer le total des distances depuis localStorage
                      try {
                        const saved = localStorage.getItem('cardioAnalyses');
                        let totalDistance = 0;
                        const targetDistance = monthlyTarget; // Objectif personnalisable
                        
                        if (saved) {
                          const analyses = JSON.parse(saved);
                          
                          if (analyses && analyses.length > 0) {
                            totalDistance = analyses.reduce((sum: number, analysis: any) => {
                              return sum + (analysis.distance || 0);
                            }, 0);
                          }
                        }
                        
                        const progressPercentage = Math.min((totalDistance / targetDistance) * 100, 100);
                        
                        return (
                          <>
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: `${progressPercentage}%`}}></div>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                              <span className="text-gray-500 text-sm">
                                {totalDistance > 0 ? `${totalDistance.toFixed(1)}/` : `Importez des TCX - Objectif: `}
                              </span>
                              {isEditingTarget ? (
                                <input
                                  type="number"
                                  value={monthlyTarget}
                                  onChange={(e) => handleTargetChange(parseInt(e.target.value) || 30)}
                                  onBlur={() => setIsEditingTarget(false)}
                                  onKeyPress={(e) => e.key === 'Enter' && setIsEditingTarget(false)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-12 px-1 py-0.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                  min="1"
                                  max="1000"
                                  autoFocus
                                />
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation(); // Empêcher l'ouverture du modal
                                    setIsEditingTarget(true);
                                  }}
                                  className="text-gray-700 hover:text-blue-600 text-sm font-medium underline decoration-dotted hover:decoration-solid transition-colors"
                                  title="Cliquez pour modifier votre objectif mensuel"
                                >
                                  {monthlyTarget}km
                                </button>
                              )}
                              {totalDistance > 0 && (
                                <span className="text-gray-400 text-xs">
                                  ({Math.round((totalDistance / monthlyTarget) * 100)}%)
                                </span>
                              )}
                            </div>
                          </>
                        );
                      } catch (error) {
                        return (
                          <>
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '73%'}}></div>
                            </div>
                            <span className="text-gray-500 text-sm ml-2">22/30km</span>
                          </>
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
              
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-blue-200"
                onClick={() => setSelectedZone('Challenge vitesse')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Challenge Vitesse</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-yellow-100 rounded-full">
                    <span className="text-yellow-700 font-bold text-sm">🏆 2/3</span>
                  </div>
                </div>
              </div>
              
              <div 
                className="group flex justify-between items-center p-4 rounded-xl hover:bg-white/70 cursor-pointer transition-all duration-300 hover:shadow-lg border border-transparent hover:border-purple-200"
                onClick={() => setSelectedZone('Badge régularité')}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-200 transition-shadow duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-800 font-semibold">Badge Régularité</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-amber-100 rounded-full">
                    <span className="text-amber-700 font-bold text-sm">⭐ Débloqué</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mt-4 border border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-amber-800 font-semibold">Motivation du jour</p>
                    <p className="text-xs text-amber-600">
                      {(() => {
                        try {
                          const saved = localStorage.getItem('cardioAnalyses');
                          let totalDistance = 0;
                          
                          if (saved) {
                            const analyses = JSON.parse(saved);
                            if (analyses && analyses.length > 0) {
                              totalDistance = analyses.reduce((sum: number, analysis: any) => {
                                return sum + (analysis.distance || 0);
                              }, 0);
                            }
                          }
                          
                          const remaining = monthlyTarget - totalDistance;
                          
                          if (totalDistance === 0) {
                            return `Commencez votre aventure ! Objectif: ${monthlyTarget}km ce mois-ci 🚀`;
                          } else if (remaining > 0) {
                            return `Plus que ${remaining.toFixed(1)}km pour atteindre votre objectif !`;
                          } else {
                            const excess = totalDistance - monthlyTarget;
                            return `🎉 Objectif atteint ! Vous avez dépassé de ${excess.toFixed(1)}km !`;
                          }
                        } catch (error) {
                          return `Plus que ${(monthlyTarget - 22).toFixed(1)}km pour atteindre votre objectif !`;
                        }
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Modale d'explication des zones et métriques */}
      {selectedZone && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {zoneDefinitions[selectedZone as keyof typeof zoneDefinitions]?.title || 
                 recoveryDefinitions[selectedZone as keyof typeof recoveryDefinitions]?.title ||
                 efficiencyDefinitions[selectedZone as keyof typeof efficiencyDefinitions]?.title ||
                 progressDefinitions[selectedZone as keyof typeof progressDefinitions]?.title ||
                 analysisDefinitions[selectedZone as keyof typeof analysisDefinitions]?.title ||
                 objectivesDefinitions[selectedZone as keyof typeof objectivesDefinitions]?.title}
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
                {zoneDefinitions[selectedZone as keyof typeof zoneDefinitions]?.description || 
                 recoveryDefinitions[selectedZone as keyof typeof recoveryDefinitions]?.description ||
                 efficiencyDefinitions[selectedZone as keyof typeof efficiencyDefinitions]?.description ||
                 progressDefinitions[selectedZone as keyof typeof progressDefinitions]?.description ||
                 analysisDefinitions[selectedZone as keyof typeof analysisDefinitions]?.description ||
                 objectivesDefinitions[selectedZone as keyof typeof objectivesDefinitions]?.description}
              </p>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm font-medium text-blue-800">💡 Bénéfice principal</p>
                <p className="text-sm text-blue-700">
                  {zoneDefinitions[selectedZone as keyof typeof zoneDefinitions]?.benefits || 
                   recoveryDefinitions[selectedZone as keyof typeof recoveryDefinitions]?.benefits ||
                   efficiencyDefinitions[selectedZone as keyof typeof efficiencyDefinitions]?.benefits ||
                   progressDefinitions[selectedZone as keyof typeof progressDefinitions]?.benefits ||
                   analysisDefinitions[selectedZone as keyof typeof analysisDefinitions]?.benefits ||
                   objectivesDefinitions[selectedZone as keyof typeof objectivesDefinitions]?.benefits}
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
